/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var n = require("../../../../api.js"),
    a = require("../../../../wxParse/wxParse.js"),
    e = getApp();
Page({
    data: {},
    onLoad: function(o) {
        e.pageOnLoad(this);
        var t = this;
        e.request({
            url: n.message.info,
            data: {
                id: o.id
            },
            success: function(n) {
                t.setData({
                    info: n.data
                }), a.wxParse("article", "html", n.data.content, t, 5)
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