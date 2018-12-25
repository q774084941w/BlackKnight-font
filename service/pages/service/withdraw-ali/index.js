require("../../../../api.js"), getApp();

Page({
    data: {
        money: 0,
        balance: 50,
        account: ""
    },
    changeInputData: function(a) {
        var t = this, n = a.currentTarget.dataset.name, e = a.detail.value;
        "money" == n && t.setData({
            money: e
        }), "account" == n && t.setData({
            account: e
        });
    },
    sendRequest: function() {
        var a = this, t = a.data.money, n = a.data.balance;
        return "" == a.data.account ? (wx.showToast({
            title: "支付寶帳號不得為空",
            icon: "none"
        }), !1) : t > n || "" == t ? (wx.showToast({
            title: "請正確填寫金額",
            icon: "none"
        }), !1) : void 0;
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    }
});