/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var e = getApp(),
    n = require("../../../../api.js"),
    t = require("../../../../wxParse/wxParse.js");
Page({
    data: {},
    onLoad: function(a) {
        var o = this;
        e.request({
            url: n.message.clause,
            data: {
                bid: wx.getStorageSync("bid"),
                type: a.type
            },
            success: function(e) {
                1 == e.code && (o.setData({
                    info: e.data
                }), t.wxParse("article", "html", e.data.content, o, 5))
            }
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});