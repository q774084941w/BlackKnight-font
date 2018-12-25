var a = getApp(), e = require("../../../../api.js");

Page({
    data: {},
    onShow: function() {
        var t = this, n = wx.getStorageSync("cash");
        a.request({
            url: e.user.bank,
            method: "post",
            data: {
                cid: n.cid,
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(a) {
                1 == a.code ? (t.setData({
                    data: a.data
                }), console.log(t.data.data)) : 0 == a.code ? wx.showModal({
                    title: "提示",
                    content: "未設定銀行卡",
                    success: function(a) {
                        a.confirm ? wx.navigateTo({
                            url: "/service/pages/service/bankcard-binding/index"
                        }) : a.cancel && wx.navigateTo({
                            url: "/service/pages/service/balance-management/index"
                        });
                    }
                }) : wx.showToast({
                    title: "網絡錯誤！！",
                    icon: "loading",
                    duration: 2e3
                });
            }
        });
    },
    changeInputData: function(a) {
        var e = this, t = a.currentTarget.dataset.name, n = a.detail.value;
        "balance" == t && e.setData({
            balance: n
        });
    },
    sendRequest: function() {
        var t = this, n = wx.getStorageSync("uid"), i = wx.getStorageSync("bid"), c = t.data.balance;
        t.validate() && a.request({
            url: e.default.moneysub,
            method: "post",
            data: {
                uid: n,
                bid: i,
                money: c
            },
            success: function(a) {
                console.log(a), 1 == a.code ? wx.showModal({
                    title: "提示",
                    content: "提現申請成功",
                    success: function(a) {
                        a.confirm ? wx.navigateTo({
                            url: "/service/pages/service/balance-management/index"
                        }) : a.cancel && wx.navigateTo({
                            url: "/service/pages/service/withdraw-money/index"
                        });
                    }
                }) : wx.showToast({
                    title: "網絡錯誤！！",
                    icon: "loading",
                    duration: 2e3
                });
            }
        });
    },
    validate: function() {
        var a = this, e = a.data.balance, t = a.data.data.money;
        return !a.data.balance || a.data.balance < 1 ? (wx.showToast({
            title: "取現金額不足1元",
            icon: "none",
            mask: !0
        }), !1) : !(!a.data.balance || Number(e) > Number(t)) || (wx.showToast({
            title: "取現餘額不足",
            icon: "none",
            mask: !0
        }), !1);
    }
});