// pages/purchase/purchase.js
//index.js
//获取应用实例
//const app = getApp();
const { $Toast } = require('../../components/ui/base/index');
var s = require("../../../../api.js"),
  o = require("../../../../qqmap-wx.js"),
  d = getApp();
var until = require("../../../../utils/utils.js");

Page({
  data: {
    deliveryAddress: '', //取货地址
    deliveryDateilsAddress: '',//取貨詳細地址
    receivingAddress: '',   //收货地址
    receivingTel: "", //收貨電話
    receivingName: "",//收貨人名字
    receiving:'請填寫聯繫人電話',
    defaultDelyTime: [0, 16],
    deliveryTime: [],   //配送的时间
    dlyTypeId: 0, //配送方式
    chooseImageList: [], //图片列表
    uploadphoto: [], //图片列表
    audioCtx: {},
    isPlay: false,
    voiceList: '', //录音内容
    voiceDuration: '',  //录音时长
    recordText: '按住 說話',
    isRecord: false,
    toastDuration: 6000,
    isRecordSend: false,
    startPoint: {},
    recorderManager: {},
    lastPrice: 0.00,//訂單價格
    price: 0.00,//距離價格
    timeprice: 0,
    reward: 0,
    my_phone: '',
    ins: 0,
    stepper: {
      stepper: 0
    },
    weight_price: 0,//配送方式價格
    integral: "",
    didianprice: 0,
    distance: '0.00',//公里數
    pre_price: '',//預計金額
    makeTime: '20',//冷卻時間
    formId: '',
    formData: '',
  },
  onLoad: function () {
    this.setDeliveryTime(); //设置配送的时间
    this.initRecordermanager();
    this.initAudio();
    this.countPrice();
    //服務協議
    var t = this;
    d.request({
      method: "POST",
      url: s.
        default.orderGetPageConfig,
      data: {
        bid: wx.getStorageSync("bid")
      },
      success: function (e) {
        var a = e.status,
          i = JSON.parse(e.diy);
        a && (wx.setNavigationBarTitle({
          title: i.titleConfig.pageTitle
        }), wx.setNavigationBarColor({
          frontColor: i.titleConfig.fontColor.toLocaleLowerCase(),
          backgroundColor: i.titleConfig.navigationBgColor,
          animation: {
            duration: 400,
            timingFunc: "easeIn"
          }
        }), t.setData({
          pageConfig: i
        }))
      }
    });
  },
 
  
  onShow: function () {

    d.pageOnLoad(this);
    //取货常用地址
    var a = this,
      t = wx.getStorageSync("uid");

    '' == a.data.deliveryAddress ? 
    a.deliveryAddress()
    :'';
    //收货地址
    '' == a.data.receivingAddress ? 
    a.receivingAddress()
   :'';
   
    //時間調整
    var date = new Date();
    var h = date.getHours();
    var i = date.getMinutes();
    switch (h) {
      case 21: h = 17; break;
      case 1: h = 4; break;
      case 2: h = 6; break;
      case 3: h = 8; break;
      case 4: h = 10; break;
      case 5: h = 12; break;
      case 6: h = 14; break;
      case 7: h = 16; break;
      case 8: h = 18; break;
      case 9: h = 20; break;
      case 10: h = 22; break;
      case 11: h = 23; break;
      case 12: h = 2; break;
      case 13: h = 4; break;
      case 14: h = 5; break;
      case 15: h = 7; break;
      case 16: h = 10; break;
      case 17: h = 12; break;
      case 18: h = 14; break;
      case 19: h = 16; break;
      case 20: h = 18; break;
      case 22: h = 22; break;
      case 23: h = 23; break;
      case 0: h = 1; break;



    }
    a.setData({
      defaultDelyTime: [0, h]
    })
    console.log(date.getHours());
   
  },
  listenerTimeInput: function (e) {
    this.data.time = e.detail.value;
    console.log('哒哒this.data.time', this.data.time)
  },
  //设置配送的时间
  setDeliveryTime() {
    var startDate = new Date();
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);
    var dataArr = [];
    var weeks = ['日', '壹', '二', '三', '四', '五', '六'];
    while ((endDate.getTime() - startDate.getTime()) >= 0) {
      var month = (startDate.getMonth() + 1).toString().length == 1 ? "0" + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1);
      var day = startDate.getDate().toString().length == 1 ? "0" + startDate.getDate() : startDate.getDate();
      var week = weeks[startDate.getDay()];
      dataArr.push(month + "月" + day + '日（周' + week + '）');
      startDate.setDate(startDate.getDate() + 1);

    }
    dataArr[0] = '今天' + dataArr[0].slice(6, 10);
    dataArr[1] = '明天' + dataArr[1].slice(6, 10);
    dataArr[2] = '後天' + dataArr[2].slice(6, 10);
    this.setData({
      deliveryTime: [
        dataArr,
        ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]
      ]
    });
  },
  bindMultiPickerChange(e) {
    console.log(e);
    this.setData({
      defaultDelyTime: e.detail.value
    })
  },
  handleDlyType(e) {
    var type = e.currentTarget.dataset.id;
    this.setData({
      dlyTypeId: type,
    });
    if (type == 1) {
      this.setData({
        weight_price: 9
      })
    } else {
      this.setData({
        weight_price: 0
      })
    } this.countPrice()
  },
  checkboxChange(e) {
    //console.log(e.detail);
  },
  chooseLocation(e) {
    var t = this;
    wx.showLoading({
      title: '載入地圖中...',
    });

    let type = e.currentTarget.dataset.type;

    wx.chooseLocation({
      success: (res) => {
        if (type == 0) {
          //取货地址
          this.setData({
            deliveryAddress: res.address,
          });
        } else if (type == 1) {
          //收货地址
          this.setData({
            receivingAddress: res.address,
          });
        }
        console.log(res);

      },
      complete: function () {
        wx.hideLoading();
        t.AddressPrice();
      }
    });
  },
  AddressPrice: function () {
    var e = this; 
    console.log(e.data)
    console.log(e.data.deliveryAddress); 
    console.log(e.data.receivingAddress);
    var objects = new o({
      key: "EKJBZ-72L3P-FHXDL-VSLEP-JEAGJ-JTFSD"
    });
    objects.geocoder({
      address: e.data.deliveryAddress,
      success: function (t) {
        console.log(t)
        objects.geocoder({
          address: e.data.receivingAddress,
          success: function (f) {
            console.log(f)
        d.request({
          url: s.
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

            var a = e.data.didianprice;
            console.log(a), console.log("金額", t), e.setData({
              didianprice: t.data.price,
              price: e.data.price - a + t.data.price,
              proxy_id: t.data.proxy_id ? t.data.proxy_id : 0,
              distance: t.data.distance
            });
            var gap = t.data.distance;
            var time = gap * 3 + 20;
            if (time) {
              e.setData({
                makeTime: time.toFixed(0),
              })
            } e.countPrice()
          }
        })
          }
        })
      }
    })
  },

  nearby: function (e) {
    var t = this,
      a = e.currentTarget.dataset.tags;
    var m = t.data.didianprice;
    t.setData({
      deliveryAddress: '就近購買',
      deliveryDateilsAddress: '就近購買',
      didianprice: 40,
      distance: 5,
      price: t.data.price - m + 40,
      makeTime: 35,
    }), t.countPrice()
  },
  initAudio() {
    this.data.audioCtx = wx.createInnerAudioContext()
      ;
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
  //录音
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
            content: '錄音時間太短',
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
    var a = m.data.uploadphoto;
    wx.showLoading({
      title: '載入相冊中...',
    });
    wx.chooseImage({
      count: 10,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.hideLoading();
        res.tempFilePaths.forEach(function (i, r) {
          t.push(i), console.log("", i), wx.uploadFile({
            url: s.
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
              }, 1500), 1 == e.code ? a.push(e.url) : wx.showModal({
                title: "提示",
                content: "圖片上傳失敗",
                showCancel: !1
              })
            },
            fail: function (e) { }
          }), m.setData({
            chooseImageList: t,
            uploadphoto: a
          })

        }), console.log(m.data)
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  commonly : function (e) {
    var t=this,
     a = e.currentTarget.dataset.id;
     0==a ?
     t.setData ({
       receivingAddress:''
       }) : 
       t.setData({
         deliveryAddress: ''
       });
      wx.navigateTo({
        url: '/sd_liferuning/pages/constmer/address-list/index?addressClass='+a,
      })
  },
  changeInput:function (e) {
    var t = this,
      a = e.currentTarget.dataset.name,
      i = e.detail.value;
      ''!=i && undefined !=i ?
    "receivingTel" == a && t.setData({
      receivingTel: i,
      receivingName:''
        }) || 
        "deliveryTel" == a && t.setData({
          deliveryTel: i
        })
    :'';
  },
  countPrice: function () {
    var e = this,
      t = Number(e.data.price) + Number(e.data.timeprice) + Number(e.data.weight_price);
    e.setData({
      lastPrice: t.toFixed(2)
    })
  },
  //验证预计商品金额
  validate: function (res) {
    var t = this;
    console.log(res.detail.value)
    var regNum = new RegExp('[0-9]', 'g');//判断用户输入的是否为数字
    var rsNum = regNum.exec(res.detail.value);
    if (rsNum) {

    } else {
      wx.showModal({
        title: '提示',
        content: '金額隻能是數字',
        success: function (res) {
          if (res.confirm) {
            t.setData({
              pre_price: '',
            })
          } else {
            t.setData({
              pre_price: '',
            })
          }

        }
      })

    }
  },
  //表單提交
  formSubmit: function (e) {
    var formId = e.detail.formId;
    console.log(formId);
    var t = this;

    var talk = t.data.voiceList;
    var talktime = t.data.voiceDuration;

    var f = e.detail.value;
    if (f.getAddress) {

    } else {
      wx.showToast({
        title: '請填寫收貨信息',
        icon: 'none',
        duration: 2000
      })
    }
    var cartype = t.data.dlyTypeId;
    if (cartype == 0) {
      cartype = '電單車';
    } else {
      cartype = '私家車';
    }
    console.log(cartype)
    wx.showLoading({
      title: "正在支付"
    });

    console.log(f); console.log(t.data);
    t.validates() && d.request({
      url: s.
       default.insertorder,
      data: {
        distype: 0,
        goodsname: '',
        select_name: cartype,
        myadds: f.buyAddress + f.dateilsAddress,//取貨地址
        mudadds: f.getAddress + f.getDateilsAddress,//收貨地址
        times: f.sendTime,//配送時間
        price: t.data.lastPrice,//價格
        uid: wx.getStorageSync("uid"),
        redbao: 0,//紅包
        xphoto: '',//圖片 
        yinpin: talk,//語音文件
        tip: 0,//小費
        bid: wx.getStorageSync("bid"),
        ins: 0,//保險金額
        message: '',//備註
        type: "帮我送",
        username: f.getName,//收貨人姓名
        phone: f.getNameTel,//收貨電話
        distance: f.distance,//距離
        proxy_id: 0,
        audiotime: talktime,//语音时长
        imgurl: t.data.uploadphoto.join(','),//圖片集
        my_phone: f.buyNameTel,//取货人电话
        pre_price: f.pre_price//預計價格

      },
    
      success: function (t) {
        console.log(t);
        1 == t.code ? d.request({
          url: s.order.pricePay,
          method: "post",
          data: {
            uid: wx.getStorageSync("uid"),
            order_no: t.data,
            openid: wx.getStorageSync("openid"),
            formId: formId,
          },
          success: function (e) {
            console.log(e)
            wx.hideLoading(), 1 == e.code ? wx.showToast({
              title: e.msg,
              duration: 1e3,
              success: function () {
                wx.showModal({
                  title: '提示',
                  content: '代購商品需經車手確認商品金額后再次向車手支付，請確保您的錢包餘額充足 車手并無義務墊付資金，金額將支付給車手做爲墊付商品金額的交收！',
                  cancelText: "知道了",
                  confirmText: "立即充值",
                  success: function (res) {
                    if (res.confirm) {//这里是点击了立即充值
                      setTimeout(function () {
                        wx.redirectTo({
                          url: "/sd_liferuning/pages/constmer/balance-management/index"
                        })
                      }, 1e3)
                      console.log('立即充值')
                    } else {//这里是点击了知道了
                      setTimeout(function () {
                        wx.redirectTo({
                          url: "/sd_liferuning/pages/constmer/order-list/index"
                        })
                      }, 1e3)
                      console.log('知道了')
                    }
                  }
                })

              }
            }) : wx.showToast({
              title: e.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }) : wx.showToast({
          title: t.msg,
          icon: 'none',
          duration: 2000
        })
      }
    });


  },
  validates: function () {
    var a = this;
    return !a.data.voiceList || a.data.voiceList.length <= 0 ? (wx.showToast({
      title: "錄音不得為空",
      icon: "none",
      mask: !0
    }), !1) : !a.data.deliveryAddress || a.data.deliveryAddress.length <= 0 ? (wx.showToast({
      title: "取貨地址不得為空",
      icon: "none",
      mask: !0
    }), !1) : !a.data.receivingAddress || a.data.receivingAddress.length <= 0 ? (wx.showToast({
      title: "收貨地址不得為空",
      icon: "none",
      mask: !0
    }), !1) : !(!a.data.lastPrice || 0 == a.data.lastPrice) || (wx.showToast({
      title: "價格不能為0",
      icon: "none",
      mask: !0
    }), !1);
  },
  deliveryAddress: function () {
    var a = this,
      t = wx.getStorageSync("uid");
    d.request({
      url: s.default.mrAddress,
      method: "get",
      data: {
        uid: t,
        bid: wx.getStorageSync("bid"),
        type: 1
      },
      success: function (t) {
        console.log(t)
        a.setData({
          deliveryAddress: t.data.adress,
          deliveryTel: t.data.phone,
        })
        a.AddressPrice();
      }
    })
  },
  receivingAddress: function () {
    var a = this,
      t = wx.getStorageSync("uid");
    d.request({
      url: s.default.mrAddress,
      method: "get",
      data: {
        uid: t,
        bid: wx.getStorageSync("bid"),
        type: 0
      },
      success: function (t) {
        console.log(t)
        a.setData({
          receivingAddress: t.data.adress,
          receivingTel: t.data.phone,
          receivingName: t.data.name,
          receiving: t.data.name + "," + t.data.phone
        })
        a.AddressPrice();
      }
    })
  }

});