var t = require("../../../../api.js");

getApp();

Page({
    data: {
        money: 0,
        balance: 50
    },
    changeInputData: function(t) {
        var a = this, e = t.currentTarget.dataset.name, n = t.detail.value;
        "money" == e && a.setData({
            money: n
        });
    },
    sendRequest: function() {
        var a = this, e = a.data.money;
        if (e > a.data.balance || "" == e) return wx.showToast({
            title: "請正確填寫金額",
            icon: "none"
        }), !1;
        wx.request({
            url: t.default.BusinessPay,
            data: {
                uid: wx.getStorageSync("uid"),
                price: e,
                type: 2
            },
            method: "post",
            success: function(t) {
                console.log(t.data);
            }
        });
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    }
});