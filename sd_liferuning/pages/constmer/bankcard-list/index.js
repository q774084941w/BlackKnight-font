/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var t = getApp(),
    a = require("../../../../api.js");
Page({
    data: {},
    onShow: function() {
        this.mylist()
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        })
    },
    mylist: function() {
        var s = this;
        t.request({
            url: a.card.mylist,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                s.setData({
                    data: t.data
                })
            }
        })
    },
    bankSetup: function(s) {
        var e = this,
            n = s.currentTarget.dataset.id;
        t.request({
            url: a.card.
            default,
            data: {
                uid: wx.getStorageSync("uid"),
                id: n
            },
            success: function(t) {
                1 == t.data ? wx.showModal({
                    title: "提示",
                    content: "設定成功",
                    showCancel: !1,
                    success: function() {
                        e.mylist()
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "設定失敗",
                    showCancel: !1
                })
            }
        })
    },
    del: function(s) {
        var e = this,
            n = s.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "您確定删除嗎",
            success: function(s) {
                1 == s.confirm && t.request({
                    url: a.card.del,
                    data: {
                        id: n
                    },
                    success: function(t) {
                        e.mylist()
                    }
                })
            }
        })
    }
});