var t = getApp(), a = require("../../../../api.js");

Page({
    data: {},
    onShow: function() {
        this.mylist();
    },
    mylist: function() {
        var e = this;
        t.request({
            url: a.default.cardList,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(t) {
                e.setData({
                    data: t.data
                });
            }
        });
    },
    bankSetup: function(e) {
        var s = this, n = e.currentTarget.dataset.id;
        t.request({
            url: a.default.cardmoren,
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
                        s.mylist();
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "設定失敗",
                    showCancel: !1
                });
            }
        });
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
    del: function(e) {
        var s = this, n = e.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "您確定删除嗎",
            success: function(e) {
                1 == e.confirm && t.request({
                    url: a.card.del,
                    data: {
                        id: n
                    },
                    success: function(t) {
                        s.mylist();
                    }
                });
            }
        });
    }
});