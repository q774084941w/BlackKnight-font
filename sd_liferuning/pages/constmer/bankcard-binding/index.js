/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var a = getApp(),
    t = require("../../../../api.js");
Page({
    data: {
        bankArr: [],
        bank: "",
        bankaccount: "",
        bankname: ""
    },
    bindBankChange: function(a) {
        var t = this;
        t.setData({
            bank: t.data.bankArr[a.detail.value]
        })
    },
    changeInputData: function(a) {
        var t = this,
            n = a.currentTarget.dataset.name,
            e = a.detail.value;
        "bank" == n && (console.log(e), t.setData({
            bank: e
        })), "bankName" == n && t.setData({
            bankname: e
        }), "bankAccount" == n && t.setData({
            bankaccount: e
        })
    },
    onShow: function() {
        var n = this;
        a.request({
            url: t.card.list,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(a) {
                1 == a.code && n.setData({
                    bankArr: a.data
                })
            }
        })
    },
    sendRequest: function() {
        var n = this;
        n.validate() && a.request({
            url: t.card.add,
            method: "POST",
            data: {
                cardnumber: n.data.bankaccount,
                cid: n.data.bank.id,
                uname: n.data.bankname,
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                1 == a.data ? wx.showToast({
                    title: "添加成功",
                    duration: 1e3,
                    success: function() {
                        setTimeout(function() {}, 1e3)
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "添加失敗",
                    showCancel: !1
                })
            }
        })
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
        }), !1)
    }
});