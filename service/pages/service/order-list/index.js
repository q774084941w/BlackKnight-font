var t = require("../../../../api.js"), e = getApp();

Page({
    data: {
        currentItemId: "3",
        orderNumber: "",
        startTime: "",
        endTime: "",
        data: []
    },
    onLoad: function(t) {
        var e = this;
        t.orderNumber && e.setData({
            orderNumber: t.orderNumber
        }), t.startTime && e.setData({
            startTime: t.startTime
        }), t.endTime && e.setData({
            endTime: t.endTime
        });
    },
    changeSidebar: function() {
        this.openSidebar();
    },
    selectSwiper: function(t) {
        var e = this, r = t.currentTarget.dataset.listid;
        e.setData({
            currentItemId: r
        });
    },
    changeSwiper: function(t) {
        var e = this, r = t.detail.current + 1;
        e.setData({
            currentItemId: "list-" + r
        });
    },
    list: function() {
        var r = this;
        e.request({
            url: t.default.ServerOrder,
            data: {
                bid: wx.getStorageSync("bid"),
                status: r.data.currentItemId,
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                console.log("服務訂單", t);
                r.setData({
                    data: t.data
                });
            }
        });
    },
    onShow: function() {
        this.list();
    }
});