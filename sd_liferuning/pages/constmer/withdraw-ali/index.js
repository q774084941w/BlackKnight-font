/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var e = require("../../../../api.js"),
    a = getApp();
Page({
    data: {
        money: 0,
        balance: 0,
        account: ""
    },
    onLoad: function(e) {
        this.setData({
            type: e.type
        })
    },
    onShow: function() {
        var t = this;
        a.request({
            url: e.order.UpMoney,
            data: {
                uid: wx.getStorageSync("uid"),
                type: t.data.type
            },
            success: function(e) {
                console.log("=======", e), 1 == e.code && t.setData({
                    balance: e.money
                })
            }
        })
    },
    changeInputData: function(e) {
        var a = this,
            t = e.currentTarget.dataset.name,
            n = e.detail.value;
        "money" == t && a.setData({
            money: n
        }), "account" == t && a.setData({
            account: n
        })
    },
    sendRequest: function() {
        var t = this,
            n = t.data.money,
            o = t.data.balance,
            i = t.data.account;
        return "" == i ? (wx.showToast({
            title: "支付寶帳號不得為空",
            icon: "none"
        }), !1) : n > o || "" == n || 0 == n ? (wx.showToast({
            title: "請正確填寫金額",
            icon: "none"
        }), !1) : (console.log(n, o, i), void a.request({
            url: e.order.alipaySend,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid"),
                money: n,
                name: wx.getStorageSync("nickname"),
                alipay: i,
                type: t.data.type
            },
            success: function(e) {
                wx.showToast({
                    title: "提現成功!！",
                    icon: "none",
                    duration: 2e3
                }), 1 == t.data.type ? wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/balance-management/index"
                }) : wx.navigateTo({
                    url: "/sd_liferuning/pages/service/balance-management/index"
                })
            }
        }))
    }
});