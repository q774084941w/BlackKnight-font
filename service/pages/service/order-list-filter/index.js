Page({
    data: {
        orderNumber: "",
        startTime: "",
        endTime: ""
    },
    inputChange: function(e) {
        var t = this, a = e.detail.value;
        t.setData({
            orderNumber: a
        });
    },
    bindPickerChange: function(e) {
        var t = this, a = e.currentTarget.dataset.name, r = e.detail.value;
        "startTime" == a ? t.setData({
            startTime: r
        }) : "endTime" == a && t.setData({
            endTime: r
        });
    },
    reset: function() {
        this.setData({
            orderNumber: "",
            startTime: "",
            endTime: ""
        });
    },
    confirm: function() {
        var e = this;
        wx.redirectTo({
            url: "/pages/service/order-list/index?orderNumber=" + e.data.orderNumber + "&startTime=" + e.data.startTime + "&endTime=" + e.data.endTime
        });
    }
});