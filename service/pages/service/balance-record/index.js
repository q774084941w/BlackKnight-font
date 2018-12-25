var t = getApp(), a = require("../../../../api.js");

Page({
    data: {
        data: [ {} ]
    },
    onLoad: function(e) {
        var d = this, i = wx.getStorageSync("uid"), s = wx.getStorageSync("bid");
        t.request({
            url: a.default.branklist,
            method: "post",
            data: {
                uid: i,
                bid: s
            },
            success: function(t) {
                d.setData({
                    data: t.data
                });
            }
        });
    }
});