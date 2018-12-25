var t = getApp(), e = require("../../../../api.js");

Page({
    data: {
        summary: ""
    },
    changeInputData: function(t) {
        var e = this, a = t.currentTarget.dataset.name, s = t.detail.value;
        "summary" == a && e.setData({
            summary: s
        });
    },
    sendRequest: function() {
        var a = this.data.summary;
        t.request({
            url: e.user.content,
            method: "post",
            data: {
                cid: wx.getStorageSync("cash").cid,
                content: a
            },
            success: function(t) {
                1 == t.code ? wx.showToast({
                    title: t.msg
                }) : wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: t.msg
                });
            }
        });
    },
    onShow: function() {
        var a = this;
        t.request({
            url: e.user.content,
            data: {
                cid: wx.getStorageSync("cash").cid
            },
            success: function(t) {
                a.setData({
                    content: t.content
                });
            }
        });
    }
});