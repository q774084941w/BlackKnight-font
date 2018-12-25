/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e
}
var a = require("../../../../api.js"),
    t = getApp();
Page({
    data: {
        site: "",
        actions: [{
            name: "提現到銀行卡",
            subname: "提現到默認綁定的銀行卡中",
            className: "action-class",
            loading: !1
        }/*, {
            name: "提現到支付寶",
            subname: "提現到支付寶餘額中",
            className: "action-class",
            loading: !1
        }, {
            name: "提現到餘額",
            subname: "提現到微信餘額中",
            className: "action-class",
            loading: !1
        }*/],
        cancelText: "取消"
    },
    onShow: function() {
        t.pageOnLoad(this);
        var e = this;
        e.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background",
            site: wx.getStorageSync("site"),
            bgurl: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background/bg.png"
        }), t.request({
            url: a.order.balance,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                1 == a.code && e.setData({
                    money: a.data
                })
            }
        }), t.request({
            url: a.order.priceMsg,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                e.setData({
                    datas: a.data
                })
            }
        }), t.request({
            url: a.order.orderMsg,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                e.setData({
                    price: a.money
                })
            }
        })
    },
    openActionsheet: function() {
        this.setData({
            show: !0
        })
    },
    closeActionSheet: function() {
        this.setData({
            show: !1
        })
    },
    clickAction: function(a) {
        var t, n = this,
            s = a.detail.index;
        switch (this.setData((t = {}, e(t, "actions[" + s + "].loading", !0), e(t, "actionType", s), t)), s) {
            case 0:
                wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/withdraw-money/index"
                });
                break;
            case 1:
                wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/withdraw-ali/index?type=1"
                });
                break;
            case 2:
                wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/withdraw-wechat/index"
                })
        }
        setTimeout(function() {
            var a;
            n.setData((a = {}, e(a, "show", !1), e(a, "actions[" + s + "].loading", !1), a))
        }, 100)
    }
});