/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var e = getApp(),
    t = require("../../../api.js");
Page({
    data: {
        userType: null,
        phoneNumber: null,
        identifyingCode: null,
        passWord: null,
        repassWord: null,
        btnType: 1,
        defaultWaitTime: 3,
        waitTime: null,
        defaultWaitText: "驗證",
        waitInterval: null
    },
    onLoad: function(e) {
        this.setData({
            userType: e.userType
        })
    },
    changeUserType: function(e) {
        this.setData({
            userType: e.currentTarget.dataset.usertype
        })
    },
    changeInputData: function(e) {
        var t = this,
            a = e.currentTarget.dataset.name,
            n = e.detail.value;
        "phoneNumber" == a && t.setData({
            phoneNumber: n
        }), "identifyingCode" == a && t.setData({
            identifyingCode: n
        }), "passWord" == a && t.setData({
            passWord: n
        }), "repassWord" == a && t.setData({
            repassWord: n
        })
    },
    getIdentifyingCode: function(a) {
        var n = this;
        if (!new RegExp("^[1][3,5,7,6,8][0-9]{9}$").test(n.data.phoneNumber)) return wx.showToast({
            title: "手機號不正確",
            icon: "none",
            mask: !0
        }), !1;
        n.setData({
            btnType: 0,
            waitTime: n.data.defaultWaitTime,
            waitInterval: setInterval(function() {
                n.data.waitTime <= 0 && (clearInterval(n.data.waitInterval), n.setData({
                    btnType: 1
                })), n.setData({
                    waitTime: --n.data.waitTime
                })
            }, 1e3)
        }), e.request({
            url: t.
            default.checkcode,
            method: "post",
            data: {
                bid: wx.getStorageSync("bid"),
                phone: n.data.phoneNumber
            },
            success: function(e) {
                n.setData({
                    Smscode: e.code
                })
            }
        })
    },
    UserInfo: function(e) {
        wx.login({
            success: function(a) {
                wx.request({
                    url: t.
                    default.user,
                    method: "POST",
                    data: {
                        bid: wx.getStorageSync("bid"),
                        utoken: "",
                        code: a.code,
                        encryptedData: e.encryptedData,
                        iv: e.iv
                    },
                    success: function(e) {
                        10 == e.data.success && (wx.setStorageSync("openid", e.data.openid), wx.request({
                            url: t.
                            default.userid,
                            method: "POST",
                            data: {
                                openid: e.data.openid
                            },
                            success: function(e) {
                                wx.setStorageSync("uid", e.data.data), wx.setStorageSync("head", e.data.head), wx.setStorageSync("nickname", e.data.nickname)
                            }
                        }))
                    }
                })
            }
        })
    },
    sendRequest: function(a) {
        var n = this;
        n.UserInfo(a.detail), n.validate() && e.request({
            url: t.
            default.userreg,
            method: "post",
            data: {
                uid: wx.getStorageSync("uid"),
                phone: n.data.phoneNumber,
                password: n.data.passWord,
                type: this.data.userType,
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                console.log(e), 1 == e.code ? wx.showToast({
                    title: e.msg,
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateTo({
                                url: "../login/index"
                            })
                        }, 2e3)
                    }
                }) : wx.showToast({
                    title: e.msg,
                    icon: "none",
                    mask: !0
                })
            }
        })
    },
    validate: function() {
        var e = this;
        return new RegExp("^[1][3,5,7,6,8][0-9]{9}$").test(e.data.phoneNumber) ? (console.log(e.data.identifyingCode), !e.data.identifyingCode || e.data.identifyingCode.length <= 0 ? (wx.showToast({
            title: "驗證碼不得為空",
            icon: "none",
            mask: !0
        }), !1) : e.data.identifyingCode != e.data.Smscode ? (wx.showToast({
            title: "驗證碼不正確",
            icon: "none",
            mask: !0
        }), !1) : !e.data.passWord || e.data.passWord.length <= 0 ? (wx.showToast({
            title: "密碼不得為空",
            icon: "none",
            mask: !0
        }), !1) : e.data.repassWord == e.data.passWord || (wx.showToast({
            title: "確認密碼有誤",
            icon: "none",
            mask: !0
        }), !1)) : (wx.showToast({
            title: "手機號不正確",
            icon: "none",
            mask: !0
        }), !1)
    }
});