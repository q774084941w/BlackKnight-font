var a = require("../../../../api.js"), e = (require("../../../../qqmap-wx.js"),
  getApp());

Page({
  data: {
    userType: "",
    name: "",
    idcard: "",
    cardImg: "",
    cardImgf: "",
    carcardImg: "",
    carcardImgf: "",
    carcodes: ""
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
    t.validate1() && e.request({
      url: a.default.sellersave,
      method: "post",
      data: {
        id: t.data.id,
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
  chooseCardf: function () {
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
                  cardImgf: t.src
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
  chooseCarCard: function () {
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
            console.log(c), wx.uploadFile({
              url: a.default.uploadfile,
              filePath: c,
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              name: "image",
              success: function (a) {
                var t = JSON.parse(a.data);
                1 == t.code ? e.setData({
                  carcardImg: t.src
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
  chooseCarCards: function () {
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
            console.log(c), wx.uploadFile({
              url: a.default.uploadfile,
              filePath: c,
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              name: "image",
              success: function (a) {
                var t = JSON.parse(a.data);
                1 == t.code ? e.setData({
                  carcardImgf: t.src
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
  }
});