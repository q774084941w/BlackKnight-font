/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var e = require("../../../../api.js"),
    a = getApp();
Page({
    data: {
        levelArr: [],
        head: wx.getStorageSync("head"),
        data: "",
        icons: "",
        juli: ""
    },
    onLoad: function() {
        var r = this,
            t = wx.getStorageSync("uid"),
            o = this;
        o.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), a.request({
            url: e.member.show,
            data: {
                uid: t
            },
            method: "post",
            success: function(e) {
                console.log("rererea", e.data);
                var a = e.data,
                    t = [],
                    d = "";
                1 == a.member_grade ? d = 1e3 : 2 == a.member_grade ? d = 2e3 : 3 == a.member_grade ? d = 3e3 : 4 == a.member_grade ? d = 4e3 : 5 == a.member_grade && (d = 5e3);
                for (var m = d - a.hyintegral, s = a.hyintegral, n = .02 * s, c = 7 * n - 32.5, g = 1; g < 6; g++) t.push({
                    defaultImg: o.data.icons + "/resource/common/image/customer/member-center/level" + g + ".png",
                    activeImg: o.data.icons + "/resource/common/image/customer/member-center/level" + g + "_1.png",
                    needScore: 1e3 * (g - 1)
                });
                0 == m && (m = 1e3), e.data.juli = m, r.setData({
                    levelArr: t,
                    currentScore: s,
                    progressPercent: n,
                    mark: c,
                    data: e.data
                })
            }
        })
    },
    onShow: function() {
        var r = this,
            t = wx.getStorageSync("uid");
        a.request({
            url: e.member.show,
            data: {
                uid: t
            },
            method: "post",
            success: function(e) {
                console.log("rerere", e);
                var a = e.data,
                    t = "";
                1 == a.member_grade ? t = 1e3 : 2 == a.member_grade ? t = 2e3 : 3 == a.member_grade ? t = 3e3 : 4 == a.member_grade ? t = 4e3 : 5 == a.member_grade && (t = 5e3);
                var o = t - a.hyintegral;
                0 == o && (o = 1e3), e.data.juli = o, r.setData({
                    data: e.data
                })
            }
        })
    }
});