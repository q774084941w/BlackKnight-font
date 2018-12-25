/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var a = getApp(),
    e = require("../../../../api.js");
Page({
    data: {},
    onShow: function() {
        var t = this;
        a.request({
            url: e.order.balance,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                1 == a.code && t.setData({
                    money: a.data
                })
            }
        }), a.request({
            url: e.card.CardDefault,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                1 == a.code && t.setData({
                    data: a.data
                })
            }
        })
    },
    changeInputData: function(a) {
        var e = this,
            t = a.currentTarget.dataset.name,
            n = a.detail.value;
        "balance" == t && e.setData({
            balance: n
        })
    },
    sendRequest: function() {
        var t = this,
            n = wx.getStorageSync("uid"),
            c = wx.getStorageSync("bid"),
            o = t.data.balance;
        t.validate() && a.request({
            url: e.outprice.out,
            method: "post",
            data: {
                uid: n,
                bid: c,
                money: o
            },
            success: function(a) {
                1 == a.code ? wx.showModal({
                    title: "提示",
                    content: "提現申請成功",
                    success: function(a) {
                        a.confirm ? wx.navigateTo({
                            url: "/sd_liferuning/pages/constmer/balance-management/index"
                        }) : a.cancel && wx.navigateTo({
                            url: "/sd_liferuning/pages/constmer/withdraw-money/index"
                        })
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: a.msg,
                    showCancel: !1
                })
            }
        })
    },
    validate: function() {
        var a = this,
            e = a.data.balance,
            t = a.data.money;
        return !a.data.balance || a.data.balance < 1 ? (wx.showModal({
            title: "提示",
            content: "取现金额不足1元",
            showCancel: !1
        }), !1) : !(!a.data.balance || Number(e) > Number(t)) || (wx.showModal({
            title: "提示",
            content: "取現餘額不足",
            showCancel: !1
        }), !1)
    },
    click: function() {
        console.log("111"), wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/bankcard-list/index"
        })
    }
});