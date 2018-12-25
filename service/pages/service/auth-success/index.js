var t = getApp(), e = require("../../../../api.js");

Page({
    data: {},
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        t.request({
            url: e.default.userinfo,
            method: "post",
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                1 == t.code ? (1 == t.data.status && wx.showModal({
                    title: "提示",
                    content: "您的稽核沒有通過，請重新填寫",
                    showCancel: !1,
                    success: function() {
                        wx.setStorage({
                            key: "cash",
                            data: t.data
                        }), wx.redirectTo({
                            url: "../authentication/index"
                        });
                    }
                }), -1 == t.data.cashstatus ? 0 == t.data.cashstatus && wx.showToast({
                    title: "退款成功",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.removeStorageSync("cash"), wx.redirectTo({
                                url: "../../login/index"
                            });
                        });
                    }
                }) : 3 == t.data.status && wx.showToast({
                    title: "恭喜你稽核通過",
                    duration: 1e3,
                    success: function() {
                        setTimeout(function() {
                            wx.setStorage({
                                key: "cash",
                                data: t.data
                            }), wx.redirectTo({
                                url: "../index/index"
                            });
                        }, 1e3);
                    }
                })) : wx.showModal({
                    title: "提示",
                    content: "獲取資訊出錯",
                    showCancel: !1
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});