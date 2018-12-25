var a = getApp(), t = require("../../../../api.js");

Page({
    data: {
        bankArr: [ {
            id: 0,
            name: "中國銀行"
        }, {
            id: 0,
            name: "工商銀行"
        } ],
        bank: "",
        bankaccount: "",
        bankname: ""
    },
    bindBankChange: function(a) {
        var t = this;
        t.setData({
            bank: t.data.bankArr[a.detail.value]
        });
    },
    changeInputData: function(a) {
        var t = this, n = a.currentTarget.dataset.name, e = a.detail.value;
        "bank" == n && (console.log(e), t.setData({
            bank: e
        })), "bankName" == n && t.setData({
            bankname: e
        }), "bankAccount" == n && t.setData({
            bankaccount: e
        });
    },
    onShow: function() {
        var n = this;
        a.request({
            url: t.card.list,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(a) {
                console.log(a), n.setData({
                    bankArr: a.data
                });
            }
        });
    },
    sendRequest: function() {
        var n = this;
        n.validate() && a.request({
            url: t.card.add,
            method: "post",
            data: {
                uid: wx.getStorageSync("uid"),
                cid: n.data.bank.id,
                name: n.data.bankname,
                cardnumber: n.data.bankaccount
            },
            success: function(a) {
                1 == a.data ? wx.showToast({
                    title: "提交成功",
                    duration: 1e3,
                    success: function(a) {
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1e3);
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "提交失敗",
                    showCancel: !1
                });
            }
        });
    },
    validate: function() {
        var a = this;
        return a.data.bank && "" != a.data.bank ? a.data.bankname && "" != a.data.bankname ? !(!a.data.bankaccount || "" == a.data.bankaccount) || (wx.showToast({
            title: "帳號不得為空",
            icon: "none",
            mask: !0
        }), !1) : (wx.showToast({
            title: "開戶人不得為空",
            icon: "none",
            mask: !0
        }), !1) : (wx.showToast({
            title: "請選擇開戶行",
            icon: "none",
            mask: !0
        }), !1);
    }
});