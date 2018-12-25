/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
Page({
    data: {
        phoneNumber: null,
        identifyingCode: null,
        passWord: null,
        repassWord: null,
        btnType: 1,
        defaultWaitTime: 60,
        waitTime: null,
        defaultWaitText: "驗證",
        waitInterval: null
    },
    onLoad: function(e) {},
    changeUserType: function(e) {
        var t = this;
        console.log(e.currentTarget.dataset.usertype), t.setData({
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
    getIdentifyingCode: function() {
        var e = this,
            t = new RegExp("^[1][3,5,8][0-9]{9}$"),
            a = wx.getStorageSync("bid");
        if (!t.test(e.data.phoneNumber)) return wx.showToast({
            title: "手機號不正確",
            icon: "none",
            mask: !0
        }), !1;
        e.setData({
            btnType: 0,
            waitTime: e.data.defaultWaitTime,
            waitInterval: setInterval(function() {
                e.data.waitTime <= 0 && (clearInterval(e.data.waitInterval), e.setData({
                    btnType: 1
                })), e.setData({
                    waitTime: --e.data.waitTime
                })
            }, 1e3)
        }), app.request({
            url: api.
            default.checkcode,
            method: "post",
            data: {
                bid: a,
                phone: e.data.phoneNumber
            },
            success: function(t) {
                e.setData({
                    Smscode: t.code
                })
            }
        })
    },
    sendRequest: function() {
        var e = this;
        e.validate() && app.request({
            url: api.
            default.reset,
            method: "post",
            data: {
                phone: e.data.phoneNumber,
                password: e.data.passWord,
                type: e.data.userType,
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                1 == e.code ? (wx.removeStorageSync("cash"), wx.removeStorageSync("phone"), wx.showToast({
                    title: e.msg,
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateTo({
                                url: "../login/index"
                            })
                        }, 2e3)
                    }
                })) : wx.showToast({
                    title: e.msg,
                    icon: "none",
                    mask: !0
                })
            }
        })
    },
    validate: function() {
        var e = this;
        return new RegExp("^[1][3,5,8][0-9]{9}$").test(e.data.phoneNumber) ? (console.log(e.data.identifyingCode), !e.data.identifyingCode || e.data.identifyingCode.length <= 0 ? (wx.showToast({
            title: "驗證碼不得為空",
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