/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var n = getApp();
Page({
    data: {
        url: ""
    },
    onLoad: function(o) {
        n.pageOnLoad(this), wx.canIUse("web-view") ? (console.log(decodeURIComponent(o.url)), this.setData({
            url: decodeURIComponent(o.url)
        })) : wx.showModal({
            title: "提示",
            content: "您的微信版本過低，無法打開本頁面，請陞級微信至最新版。",
            showCancel: !1,
            success: function(n) {
                n.confirm && wx.navigateBack({
                    delta: 1
                })
            }
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});