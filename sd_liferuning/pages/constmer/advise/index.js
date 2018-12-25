/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var e = require("../../../../api.js"),
    s = getApp();
Page({
    data: {
        userAdvise: {
            value: "",
            cursor: 0
        },
        message: ""
    },
    userInput: function(e) {
        var s = e.detail.value,
            t = e.detail.cursor;
        this.setData({
            userAdvise: {
                value: s,
                cursor: t
            }
        })
    },
    message: function() {
        var t = this,
            a = t.data.userAdvise.value;
        return a ? a.length < 5 ? (wx.showToast({
            title: "回饋意見不能小於5個字",
            icon: "none",
            duration: 1e3
        }), !1) : void s.request({
            url: e.user.message,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid"),
                message: t.data.userAdvise.value
            },
            success: function(e) {
                1 == e ? (wx.showToast({
                    title: "迴響成功",
                    icon: "succes",
                    duration: 1e3,
                    mask: !0
                }), setTimeout(function() {
                    wx.hideLoading(), wx.navigateBack({
                        url: "../user/index"
                    })
                }, 1e3)) : wx.showToast({
                    title: "失敗",
                    icon: "none",
                    duration: 1e3,
                    mask: !1
                })
            }
        }) : (wx.showToast({
            title: "回饋意見不能為空",
            icon: "none",
            duration: 1e3
        }), !1)
    }
});