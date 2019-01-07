// pages/sellerDelivery/sellerDelivery.js
//获取应用实例
const app = getApp();
const {
  $Toast
} = require('../../components/ui/base/index');
var a = require("../../../../api.js"),
  e = (require("../../../../qqmap-wx.js"),
    getApp()),
  o = require("../../../../qqmap-wx.js");
Page({
  data: {
    deliveryAddress: '', //取货地址
    receivingAddress: '', //收货地址
    dlyTypeId: 5, //配送方式
    price:0,
    select_name:'電單車',
    weightTop: [
      {
        id: 5,
        name: '電單車',
        checked: '#20AF1F',
        weight: 0
      }, {
        id: 10,
        name: '私家車',
        checked: '',
        weight: 9
      }, {
        id: 20,
        name: '小貨車(暫未開放)',
        checked: '',
        weight: 44
      }],
    brands: [],
    pretime:0,
    seller_type: 'disabled',
    objectArray: [
      {
        brand: "澳門半島",
        id: 0,
        array: [
          "下環區",
          "高士德區",
          "台山區",
          "黑沙環區",
          "皇朝區",
          "南灣區",
        ]
      },
      {
        brand: "氹仔",
        id: 1,
        array: ['花城区',
          '濠景区',
          '威尼斯',
          '銀河（東西）冀',
          '巴黎人',
          '新濠影記',
          '金沙城',
          '永利皇宮',
          '氹仔新濠天地',
          '美獅美高梅',
          '海洋花園區']
      },
      {
        brand: "路環區",
        id: 2,
        array: ['金鋒南岸',
          '石排灣社屋']
      }
    ],
    object: [],
    brandindex: 0,
    index1:0,
    pickerIndex1: 0,
    pickerIndex2: 0,
    chooseImageList: [], //图片列表
    uploadphoto: [],
    audioCtx: {},
    isPlay: false,
    voiceList: '', //录音内容
    voiceDuration: '', //录音时长
    recordText: '按住 說話',
    isRecord: false,
    toastDuration: 6000,
    isRecordSend: false,
    startPoint: {},
    recorderManager: {},
    countorder:0,
    countprice:0.00
  },
  onLoad: function () {
    this.initRecordermanager();
    this.initAudio();

    var t = this;
    var uid = wx.getStorageSync('uid');
  
    wx.request({
      url: a.default.getseller,
      method: 'POST',
      data: {
        uid: uid
      },
      method: 'POST',
      data: {
        uid: uid
      },
      success: function (e) {
        console.log(e.data),
          e.data.id != 0 ? (
            t.setData({
              uid: uid,//商家id
              name: e.data.uname,//商家名字
              idcard: e.data.utel,//電話
              carcodes: e.data.uaddress,//地址
              carname: e.data.carname,
              id: e.data.id,
              cardImg: !e.data.uimg ? '' : e.data.uimg,
              thisType: 2,
              countorder:e.data.number,
              countprice:e.data.price
            }),
            e.data.status == 0 ? (wx.showToast({
              title: "您的申請還在審核中",
              icon: "none",
              mask: !0
            }), !1,
              setTimeout(function () {
                wx.navigateBack({ changed: true })
              }, 2e3)
            ) : e.data.status == 2 ? (t.setData({
              thisType: 3
            }), wx.showToast({
              title: "您未通過審核，請重新提交申請",
              icon: "none",
              mask: !0
            })) : '') : 
            wx.redirectTo({
              url: "/sd_liferuning/pages/constmer/seller/register"
            })
            , t.AddressPrice()
      }
    });
    var objectArray = this.data.objectArray
    var brands = []
    for (var i = 0; i < objectArray.length; i++) {
      brands.push(objectArray[i].brand)
    }
    this.setData({ brands: brands, object: objectArray[this.data.brandindex].array })
  },
  handleDlyType(e) {
    var type = e.currentTarget.dataset.id;
    if (type == 20) {
      return false
    }
    var price = e.currentTarget.dataset.num;
    var select_name = e.currentTarget.dataset.name;
    var myprice = this.data.price;
    this.setData({
      dlyTypeId: type,
      price: price,
      select_name: select_name,
      largeprice: (this.data.largeprice - myprice + price).toFixed(2),
    });

  },
  //选择配送区域
  bindPickerChange(e) {
    let id = parseInt(e.currentTarget.dataset.id);
    if (id == 0) {
      this.setData({
        pickerIndex1: e.detail.value
      });
    } else if (id == 1) {
      this.setData({
        pickerIndex2: e.detail.value
      });
    }

  },
  checkboxChange(e) {
    //console.log(e.detail);
  },
  //音频
  initAudio() {
    this.data.audioCtx = wx.createInnerAudioContext();
    this.data.audioCtx.onEnded(() => {
      this.setData({
        isPlay: false
      });
      this.data.audioCtx.pause();
    });
  },
  handleAudioPlay() {
    if (this.data.audioCtx.paused) {
      this.setData({
        isPlay: true
      });
      this.data.audioCtx.play();

    } else {
      this.setData({
        isPlay: false
      });
      this.data.audioCtx.pause();
    }

  },
  handleDelRecorder() {
    this.setData({
      voiceList: '',
      voiceDuration: ''
    });
    this.data.audioCtx.pause();
    this.data.audioCtx.src = '';
  },
  initRecordermanager() {
    this.setData({
      recorderManager: wx.getRecorderManager()
    });
    this.handleRecorderManager();
  },
  handleStartRecord(e) {
    wx.vibrateShort({
      complete: () => {
        this.data.recorderManager.start();
        this.setData({
          isRecord: true,
          recordText: "松開 結束",
          isRecordSend: true,
          startPoint: e.touches[0]
        });

        $Toast({
          image: 'http://83img.chaojiyuanma.com/img/icon-recorder.png',
          duration: 0,
          mask: false,
          content: '手指上滑，取消發送',
        });
      }
    });

  },
  handleTouchMove(e) {
    let moveLength = Math.abs(e.touches[e.touches.length - 1].clientY - this.data.startPoint.clientY);

    if (moveLength > 100) {
      $Toast({
        image: 'http://83img.chaojiyuanma.com/img/icon-cancel.png',
        duration: 0,
        mask: false,
        content: '松開手指，取消發送',
      });

      this.setData({
        isRecordSend: false
      });
    } else {
      $Toast({
        image: 'http://83img.chaojiyuanma.com/img/icon-recorder.png',
        duration: 0,
        mask: false,
        content: '手指上滑，取消發送',
      });

      this.setData({
        isRecordSend: true
      });
    }

  },
  handleStopRecord() {
    this.setData({
      isRecord: false,
      recordText: "按住 說話"
    });
    wx.hideToast();
    $Toast.hide();
    this.data.recorderManager.stop();
  },
  handleRecorderManager() {
    this.data.recorderManager.onStop((res) => {
      if (this.data.isRecordSend) {
        if (res.duration < 1000) {
          $Toast({
            image: 'http://83img.chaojiyuanma.com/img/icon-warning.png',
            duration: 1,
            mask: false,
            content: '录音时间太短',
          });
        } else {
          var duration = res.duration / 1000;
          if (typeof duration === 'number' && duration % 1 === 0) {
            duration = duration;
          } else {
            duration = duration.toFixed(1);
          }

          this.setData({
            voiceList: res.tempFilePath,
            voiceDuration: duration
          });
          this.data.audioCtx.src = res.tempFilePath;

        }
      }

    });
  },
  chooseImage() {
    var m = this;
    var t = m.data.chooseImageList;
    var s = m.data.uploadphoto;
    wx.showLoading({
      title: '载入相册中...',
    });
    wx.chooseImage({
      count: 10,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.hideLoading();
        res.tempFilePaths.forEach(function (i, r) {
          t.push(i), console.log("", i), wx.uploadFile({
            url: a.
              default.OrderUploadsImg,
            filePath: i,
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            name: "image",
            success: function (e) {
              var e = JSON.parse(e.data);
              setTimeout(function () {
                wx.hideLoading()
              }, 1500), 1 == e.code ? s.push(e.url) : wx.showModal({
                title: "提示",
                content: "圖片上傳失敗",
                showCancel: !1
              })
            },
            fail: function (e) { }
          }), m.setData({
            chooseImageList: t,
            uploadphoto: s
          })

        }), console.log(m.data)
      },
      complete() {
        wx.hideLoading();
      }
    })

  },
  AddressPrice: function () {
    var s = this; console.log(s.data.carcodes);
    var select = s.data.brands[s.data.brandindex] + s.data.object[s.data.index1];
    console.log(select);
    s.setData({
      'uarea': select
    })
    var objects = new o({
      key: "EKJBZ-72L3P-FHXDL-VSLEP-JEAGJ-JTFSD"
    });
    void 0 != s.data.carcodes ?
      objects.geocoder({
        address: select,
        success: function (t) {
          console.log(t)
          objects.geocoder({
            address: s.data.carcodes,
            success: function (f) {
              console.log(f)
              e.request({
                url: a.
                  default.addprice,
                metho: "post",
                data: {
                  myaddsjd: t.result.location.lng,
                  myaddswd: t.result.location.lat,
                  mudaddswd: f.result.location.lat,
                  mudaddsjd: f.result.location.lng,
                  bid: wx.getStorageSync("bid")
                },
                success: function (t) {
                  console.log("金额", t)
                  t.code == 1 ? s.setData({
                    lessprice: t.data.distance,
                    largeprice: (t.data.price + s.data.price).toFixed(2),
                    pretime: (20 + t.data.distance*3).toFixed(0)
                  }) : wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1
                  })
                }
              })
            }
          })

        }
      }) : ''
  },
  changesellertype:function () {
    this.setData ({
      seller_type: ''
    })
  },
  sendRequest: function () {
    var t = this;
  
      console.log(t.data); console.log(t.data.uploadphoto)
      t.validate() && e.request({
        url: a.default.sellerordersave,
        method: "post",
        data: {

          uid: wx.getStorageSync("uid"),//商家id
          uname: t.data.name,//商家名字
          my_phone: t.data.idcard,//電話
          uaddress: t.data.carcodes,//地址
          uarea: t.data.uarea,//區域
          select_name: t.data.select_name,//配送方式
          formId: t.data.formId,//formid
          yinpin: t.data.voiceList,//录音内容
          audiotime: t.data.voiceDuration,//录音时长
          imgurl: t.data.uploadphoto,//图片列表
          pre_price: t.data.largeprice,//预计价格
          distance: t.data.lessprice,//预计公里數
          pretime: t.data.pretime,//預計時長
        },
        success: function (a) {
          1 == a.code ? (wx.setStorage({
            key: "cash",
            data: {
              status: 2
            }
          }), wx.showModal({
            title: "提示",
            showCancel: !1,
            content: a.msg,
            success: function () {
              wx.redirectTo({
                url: "../index/index"
              });
            }
          })) : wx.showToast({
            icon: "none",
            mask: !1,
            title: a.msg
          });
        }
      });
    
  },

  validate: function () {
    var a = this;
    return !a.data.name || a.data.name.length <= 0 ? (wx.showToast({
      title: "姓名不得為空",
      icon: "none",
      mask: !0
    }), !1) : !a.data.voiceList || a.data.voiceList.length <= 0 ? (wx.showToast({
      title: "錄音不得為空",
      icon: "none",
      mask: !0
    }), !1) : !a.data.idcard ? (wx.showToast({
      title: "電話不能為空！",
      icon: "none",
      mask: !0
      }), !1) : 11 != a.data.idcard.length && 8 != a.data.idcard.length ? (wx.showToast({
        title: "電話位數暫時支持8位，11位！",
        icon: "none",
        mask: !0
      }), !1) : !(!a.data.carcodes || "" == a.data.carcodes) || (wx.showToast({
      title: "地址不能為空",
      icon: "none",
      mask: !0
    }), !1);
  },
  bindPickerChange0: function (e) {

    this.setData({ brandindex: e.detail.value, index1: 0 })
    var objectArray = this.data.objectArray
    this.setData({
      object: objectArray[this.data.brandindex].array
    });
    this.AddressPrice()
  },
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value
    });
    this.AddressPrice()
  },
  formSubmit: function (e) {
    this.setData({
      formId: e.detail.formId
    });
    this.sendRequest();
  }
});