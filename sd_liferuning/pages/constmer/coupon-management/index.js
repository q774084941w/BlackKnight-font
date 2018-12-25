/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var t = getApp(),
    e = require("../../../../api.js");
Page({
    data: {
        couponArr: []
    },
    onShow: function() {
        t.pageOnLoad(this);
        var a = this;
        a.setData({
            site: wx.getStorageSync("site")
        }), t.request({
            url: e.Coupon.RedUser,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                1 == t.code && a.setData({
                    couponArr: t.data
                })
            }
        })
    }
});