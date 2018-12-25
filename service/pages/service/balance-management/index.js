function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a = require("../../../../api.js"), t = getApp();

Page({
    data: {
        actions: [ {
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
        }*/ ],
        cancelText: "取消"
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
    onShow: function() {
        var e = this;
        e.setData({
            site: wx.getStorageSync("site")
        }), t.request({
            url: a.default.Income,
            data: {
                cid: wx.getStorageSync("cash").cid
            },
            success: function(a) {
                console.log("r", a);
                e.setData({
                    data: a.data,
                    price: Number(a.data.res3) + Number(a.data.res1)
                });
            }
        }), t.request({
            url: a.default.capital,
            method: "POST",
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(a) {
                console.log("res:", a), e.setData({
                    data: a,
                    orderCompletePrice: a.orderCompletePrice.toFixed(2)
                });
            }
        });
    },
    openActionsheet: function() {
        this.setData({
            show: !0
        });
    },
    closeActionSheet: function() {
        this.setData({
            show: !1
        });
    },
    clickAction: function(a) {
        var t, i = this, s = a.detail.index;
        switch (this.setData((t = {}, e(t, "actions[" + s + "].loading", !0), e(t, "actionType", s), 
        t)), s) {
          case 0:
            wx.navigateTo({
                url: "/service/pages/service/withdraw-money/index"
            });
            break;

          case 1:
            wx.navigateTo({
                url: "/sd_liferuning/pages/constmer/withdraw-ali/index?type=2"
            });
            break;

          case 2:
            wx.navigateTo({
                url: "/service/pages/service/withdraw-wechat/index"
            });
        }
        setTimeout(function() {
            var a;
            i.setData((a = {}, e(a, "show", !1), e(a, "actions[" + s + "].loading", !1), a));
        }, 100);
    }
});