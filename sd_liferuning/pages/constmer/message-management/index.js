/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var t = require("../../../../api.js"),
    a = getApp();
Page({
    data: {
        data: [{
            status: "",
            givetime: ""
        }]
    },
    onShow: function() {
        a.pageOnLoad(this);
        var e = this,
            i = wx.getStorageSync("bid"),
            s = wx.getStorageSync("uid");
        a.request({
            url: t.user.xiaoxi,
            method: "post",
            data: {
                uid: s,
                bid: i
            },
            success: function(t) {
                console.log(t), e.setData({
                    data: t.data
                })
            }
        })
    }
});