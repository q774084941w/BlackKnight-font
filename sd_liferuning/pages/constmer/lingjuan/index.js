/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var t = getApp(),
    e = require("../../../../api.js");
Page({
    data: {
        showList: !0,
        couponArr: []
    },
    onShow: function() {
        t.pageOnLoad(this);
        var e = this;
        e.setData({
            site: wx.getStorageSync("site")
        }), e.getRedList()
    },
    getRedList: function() {
        var a = this;
        t.request({
            url: e.Coupon.actRed,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(t) {
                console.log(t);
                t.data;
                1 == t.code ? a.setData({
                    couponArr: t.data
                }) : a.setData({
                    showList: !1
                })
            }
        })
    },
    receive: function(a) {
        var s = this,
            o = a.target.dataset.id,
            i = a.target.dataset.money,
            n = a.target.dataset.createtime,
            c = a.target.dataset.pasttime;
        t.request({
            url: e.Coupon.getActCoupon,
            data: {
                uid: wx.getStorageSync("uid"),
                disid: o,
                createtime: n,
                pasttime: c
            },
            success: function(t) {
                1 == t.code ? (wx.showModal({
                    title: "提示",
                    content: "恭喜你獲得" + i + "元紅包",
                    showCancel: !1
                }), s.getRedList()) : wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1
                })
            }
        })
    }
});