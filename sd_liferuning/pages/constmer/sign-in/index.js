/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var t = require("../../../../api.js"),
    e = getApp(),
    a = new Date,
    n = a.getFullYear(),
    r = a.getMonth() + 1,
    o = {
        year: n,
        month: r
    }, i = function(t) {
        return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
    }, s = function(t, e) {
        return 1 == e | 3 == e | 5 == e | 7 == e | 8 == e | 10 == e | 12 == e ? 31 : 4 == e | 6 == e | 9 == e | 11 == e ? 30 : 2 == e ? i(t) ? 29 : 28 : void 0
    }(n, r),
    c = [],
    u = function(t, e) {
        return new Date(t + "-" + e + "-1").getDay()
    }(n, r),
    d = void 0,
    g = [];
for (d = 0; d < u; d++) g.push({
    name: ""
});
for (d = 0; d < s; d++) u++, g.push({
    name: n + "-" + r + "-" + (d + 1),
    value: d + 1,
    flag: !1
}), u % 7 != 0 && d != s - 1 || (c.push(g), g = []);
Page({
    data: {
        dateArr: o,
        monthArr: c,
        isSign: "",
        data: ""
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background",
            cid: t.cid
        });
        var a = e.data.monthArr,
            n = ["2018-5-3", "2018-5-4", "2018-5-8", "2018-5-10", "2018-5-11", "2018-5-12"];
        a.forEach(function(t, e) {
            t && t.forEach(function(t, e) {
                n.forEach(function(e, a) {
                    t.name == e && (t.flag = !0)
                })
            })
        }), e.setData({
            monthArr: a
        })
    },
    signIn: function() {
        var a = this,
            n = wx.getStorageSync("uid"),
            r = wx.getStorageSync("bid");
        console.log("发送签到请求"), e.request({
            url: t.member.sign,
            data: {
                uid: n,
                bid: r
            },
            method: "post",
            success: function(t) {
                console.log("rerere", t);
                var e = t.data;
                a.setData({
                    data: e
                })
            }
        }), a.setData({
            isSign: !0
        })
    },
    onShow: function(a) {
        var n = this,
            r = wx.getStorageSync("uid"),
            o = "";
        e.request({
            url: t.member.info,
            data: {
                uid: r
            },
            method: "post",
            success: function(t) {
                console.log("rerere", t.data);
                var e = t.data;
                1001 == e && wx.showModal({
                    title: "提示",
                    content: "你還不是會員，請先購買會員！",
                    success: function(t) {
                        t.confirm ? wx.redirectTo({
                            url: "../member-purchase/index"
                        }) : t.cancel && wx.redirectTo({
                            url: "../member-center/index"
                        })
                    }
                }), o = !t.data.msg, n.setData({
                    data: e,
                    isSign: o
                })
            }
        })
    }
});