var a = require("../../../../api.js"), e = (require("../../../../qqmap-wx.js"), 
getApp());

Page({
    data: {
        userTypeArr: [ {
            id: 1,
            name: "跑腿秘書（代購/代辦/代寫）"
        }, {
            id: 2,
            name: "服務秘書"
        }, {
            id: 3,
            name: "代駕秘書"
        } ],
      userType: {
        id: 1,
        name: "跑腿秘書（代購/代辦/代寫）"
      },
        name: "",
        idcard: "",
        cardImg: "",
        cardImgf: "",
        carcardImg: "",
        carcardImgf: "",
        carcodes: ""
    },
    userTypePickerChange: function(a) {
        var e = a.detail.value, t = this.data.userTypeArr[e];
        this.setData({
            userType: t
        });
    },
    changeInputData: function(a) {
        var e = this, t = a.currentTarget.dataset.name, c = a.detail.value;
        "name" == t && e.setData({
            name: c
        }), "idcard" == t && e.setData({
            idcard: c
        }), "carcodes" == t && e.setData({
            carcodes: c
        });
    },
    sendRequest: function() {
        var t = this;
        t.validate() && e.request({
            url: a.default.attestation,
            method: "post",
            data: {
                usertype: t.data.userType.id,
                cid: wx.getStorageSync("cash").cid,
                uname: t.data.name,
                card: t.data.idcard,
                carcodes: t.data.carcodes,
                cardimg: t.data.cardImg,
                cardimgf: t.data.cardImgf,
                carcardimgs: t.data.carcardImg,
                carcardImg: t.data.carcardImgf
            },
            success: function(a) {
                1 == a.code ? (wx.setStorage({
                    key: "cash",
                    data: {
                        status: 2
                    }
                }), wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: a.msg,
                    success: function() {
                        wx.redirectTo({
                            url: "../auth-success/index"
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
    validate: function() {
        var a = this;
        return !a.data.name || a.data.name.length <= 0 ? (wx.showToast({
            title: "姓名不得為空",
            icon: "none",
            mask: !0
        }), !1) : !a.data.idcard ? (wx.showToast({
          title: "身份證號碼不能爲空！",
          icon: "none",
          mask: !0
          }), !1) : !a.data.carcodes ? (wx.showToast({
            title: "車牌號不能爲空！",
            icon: "none",
            mask: !0
          }), !1) : 8 != a.data.idcard.length? (wx.showToast({
            title: "身份證號碼位數不對，請重新輸入！",
            icon: "none",
            mask: !0
        }), !1) : (!a.data.cardImg || "" == a.data.cardImg) ? (wx.showToast({
            title: "請上傳正面身份證照片",
            icon: "none",
            mask: !0
        }), !1) : (!a.data.cardImgf || "" == a.data.cardImgf) ? (wx.showToast({
            title: "請上傳反面身份證照片",
            icon: "none",
            mask: !0
        }), !1) : (!a.data.carcardImg || "" == a.data.carcardImg) ? (wx.showToast({
            title: "請上傳正面駕駛證照片",
            icon: "none",
             mask: !0
        }), !1) : !(!a.data.carcardImgf || "" == a.data.carcardImgf) || (wx.showToast({
             title: "請上傳反面駕駛證照片",
            icon: "none",
            mask: !0
        }), !1);
    },
    chooseCard: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var c = t.tempFilePaths;
                wx.saveFile({
                    tempFilePath: c[0],
                    success: function(t) {
                        var c = t.savedFilePath;
                        wx.uploadFile({
                            url: a.default.uploadfile,
                            filePath: c,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "image",
                            success: function(a) {
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
    chooseCardf: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var c = t.tempFilePaths;
                wx.saveFile({
                    tempFilePath: c[0],
                    success: function(t) {
                        var c = t.savedFilePath;
                        wx.uploadFile({
                            url: a.default.uploadfile,
                            filePath: c,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "image",
                            success: function(a) {
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
    chooseCarCard: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var c = t.tempFilePaths;
                wx.saveFile({
                    tempFilePath: c[0],
                    success: function(t) {
                        var c = t.savedFilePath;
                        console.log(c), wx.uploadFile({
                            url: a.default.uploadfile,
                            filePath: c,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "image",
                            success: function(a) {
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
    chooseCarCards: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var c = t.tempFilePaths;
                wx.saveFile({
                    tempFilePath: c[0],
                    success: function(t) {
                        var c = t.savedFilePath;
                        console.log(c), wx.uploadFile({
                            url: a.default.uploadfile,
                            filePath: c,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "image",
                            success: function(a) {
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