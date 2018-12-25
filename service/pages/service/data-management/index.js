var e = getApp(), t = require("../../../../api.js");

Page({
    data: {
        sexArr: [ {
            type: 0,
            value: "女"
        }, {
            type: 1,
            value: "男"
        } ],
        userSex: ""
    },
    userChangeSex: function(e) {
        var t = e.detail.value, a = this;
        a.setData({
            userSex: a.data.sexArr[t]
        });
    },
    onShow: function() {
        var a = this;
        e.request({
            url: t.default.userinfos,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                1 == e.code ? a.setData({
                    info: e.data
                }) : wx.showModal({
                    title: "提示",
                    content: "獲取用戶資訊失敗"
                });
            }
        });
    }
});