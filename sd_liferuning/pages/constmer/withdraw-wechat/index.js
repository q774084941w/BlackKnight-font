/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
require("../../../../api.js"), getApp();
Page({
    data: {
        money: 0,
        balance: 50
    },
    changeInputData: function(a) {
        var t = this,
            e = a.currentTarget.dataset.name,
            n = a.detail.value;
        "money" == e && t.setData({
            money: n
        })
    },
    sendRequest: function() {
        var a = this,
            t = a.data.money;
        if (t > a.data.balance || "" == t) return wx.showToast({
            title: "請正確填寫金額",
            icon: "none"
        }), !1
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        })
    }
});