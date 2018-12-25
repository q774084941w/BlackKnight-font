var a = require("../../../../api.js"), 
e = (require("../../../../qqmap-wx.js"),
  getApp()),
o = require("../../../../qqmap-wx.js")
  ;

Page({
  data: {
    sendType : ['電單車','私家車'],
    sendNum:0,
    brands: [],
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
    index1: 0,
    userType: "",
    name: '',
    idcard: '',
    
    cardImg: "",
    cardImgf: "",
    carcardImg: "",
    carcardImgf: "",
    carcodes: '',
    lessprice:0,
    largeprice:0,
    uarea:'澳門半島下環區',
    select_name: '電單車',
    price : 0,
  },
  onLoad : function (o) {
    var t = this;
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: a.default.getseller,
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
            id : e.data.id,
            cardImg: !e.data.uimg ? '' : e.data.uimg,
            thisType: 2
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
            }),wx.showToast({
              title: "您未通過審核，請重新提交申請",
              icon: "none",
              mask: !0
            }) ) : '') :t.setData({
              thisType : 1
            }), t.AddressPrice()
      }
    });
     var objectArray = this.data.objectArray
    var brands = []
    for (var i = 0; i < objectArray.length; i++) {
      brands.push(objectArray[i].brand)
    }
    this.setData({ brands: brands, object: objectArray[this.data.brandindex].array })
  
  },
  userTypePickerChange: function (a) {
    var e = a.detail.value, t = this.data.userTypeArr[e];
    this.setData({
      userType: t
    });
  },
  changeInputData: function (a) {
    var e = this, t = a.currentTarget.dataset.name, c = a.detail.value;
    "name" == t && e.setData({
      name: c//姓名
    }), "idcard" == t && e.setData({
      idcard: c//電話
    }), "carname" == t && e.setData({
      carname: c//商家名称
    }), "carcodes" == t && e.setData({
      carcodes: c//商家地址
    });
  },
  sendRequest: function () {
    var t = this;
    console.log(t.data)
    t.validate() && e.request({
      url: a.default.sellerordersave,
      method: "post",
      data: {

        uid: wx.getStorageSync("uid"),//商家id
        uname: t.data.name,//商家名字
        utel: t.data.idcard,//電話
        uaddress: t.data.carcodes,//地址
        uarea: t.data.uarea,//區域
        select_name: t.data.select_name,//配送方式
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
    }), !1) : !a.data.idcard ? (wx.showToast({
      title: "電話不能為空！",
      icon: "none",
      mask: !0
    }), !1) : 11 != a.data.idcard.length  && 8 != a.data.idcard.length ? (wx.showToast({
      title: "電話位數暫時支持8位，11位！",
      icon: "none",
      mask: !0
      }), !1) : !(!a.data.carcodes || "" == a.data.carcodes) || (wx.showToast({
      title: "地址不能為空",
      icon: "none",
      mask: !0
    }), !1);
  },
  chooseLocation: function (e) {
    console.log(e);
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          carcodes: res.address+res.name
        })
      }
    })
  },
  sendRequest1: function () {
    var t = this;
    t.validate1() && e.request({
      url: a.default.sellersave,
      method: "post",
      data: {
        id : t.data.id,
        thisType: t.data.thisType,//狀態
        uid: wx.getStorageSync("uid"),//商家id
        uname: t.data.name,//負責人姓名
        utel: t.data.idcard,//負責人電話
        uaddress: t.data.carcodes,//地址
        uimg: t.data.cardImg,//執照圖
        carname: t.data.carname,//商家名稱
        formId: t.data.formId,//formid
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
  validate1: function () {
    var a = this;
    return !a.data.name || a.data.name.length <= 0 ? (wx.showToast({
      title: "姓名不得為空",
      icon: "none",
      mask: !0
    }), !1) : !a.data.idcard ? (wx.showToast({
      title: "手機號碼不得為空",
      icon: "none",
      mask: !0
    }), !1) : !a.data.carname ? (wx.showToast({
      title: "商家名稱不得為空",
      icon: "none",
      mask: !0
    }), !1) : !a.data.carcodes ? (wx.showToast({
      title: "商家地址不得為空",
      icon: "none",
      mask: !0
    }), !1) : 11 != a.data.idcard.length && 8 != a.data.idcard.length ? (wx.showToast({
      title: "手機證號碼不正確，請重新輸入！",
      icon: "none",
      mask: !0
    }), !1) : !(!a.data.cardImg || "" == a.data.cardImg) || (wx.showToast({
      title: "請上傳營業執照",
      icon: "none",
      mask: !0
    }), !1);
  },
  chooseCard: function () {
    var e = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (t) {
        var c = t.tempFilePaths;
        wx.saveFile({
          tempFilePath: c[0],
          success: function (t) {
            var c = t.savedFilePath;
            wx.uploadFile({
              url: a.default.uploadfile,
              filePath: c,
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              name: "image",
              success: function (a) {
                var t = JSON.parse(a.data);
                1 == t.code ? e.setData({
                  cardImg: t.src
                }) : wx.showModal({
                  title: "提示",
                  content: "圖片上傳失敗",
                  showCancel: !1
                });
              }
            });
          }
        });
      }
    });
  },
  AddressPrice: function () {
    var s = this; console.log(s.data.carcodes); 
    var select = s.data.brands[s.data.brandindex] + s.data.object[s.data.index1];
    console.log(select);
    s.setData ({
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
                 t.code==1 ? s.setData ({
                   lessprice: t.data.distance,
                   largeprice: (t.data.price +s.data.price).toFixed(2),
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
  bindPickerChange2: function (e) {
    var myprice = this.data.price;
    var index = e.detail.value;
   
    var price = 0;
    switch (index) {
        case '0':
        price=0
        break;
        case '1':
        price = 9
        break;
    }
    this.setData({
      sendNum : e.detail.value,
      select_name: this.data.sendType[e.detail.value],
      price:price,
      largeprice: (this.data.largeprice - myprice + price).toFixed(2),
    });
  },
  formSubmit: function (e) {
    this.setData({
      formId: e.detail.formId
    });
    }
});