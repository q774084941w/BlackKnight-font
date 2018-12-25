/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var e = require("../../../../api.js"),
    t = getApp();
Page({
    data: {
        src: "",
        data: "",
        icons: ""
    },
    pay: function(a) {
        console.log("eee", a);
        var r = a.currentTarget.id,
            o = wx.getStorageSync("uid");
        t.request({
            url: e.member.pay,
            data: {
                uid: o,
                money: r
            },
            method: "get",
            success: function(a) {
                console.log("rerere", a);
                var r = a.data.weixin;
                wx.requestPayment({
                    timeStamp: r.timeStamp,
                    nonceStr: r.nonceStr,
                    package: r.package,
                    signType: r.signType,
                    paySign: r.paySign,
                    success: function(a) {
                        wx.showToast({
                            title: "購買成功",
                            duration: 1e3,
                            success: function() {
                                t.request({
                                    url: e.member.study,
                                    data: {
                                        uid: o
                                    },
                                    method: "get",
                                    success: function(e) {
                                        console.log("eeeee", e)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    onLoad: function(e) {},
    onShow: function(a) {
        var r = this;
        r.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
        var o = wx.getStorageSync("uid");
        t.request({
            url: e.member.info,
            data: {
                uid: o
            },
            method: "post",
            success: function(e) {
                var t = e.data.member_grade;
                if (1001 == e.data) a = "";
                else if (1 == t) a = r.data.icons + "/resource/common/image/customer/member-center/level1_1.png";
                else if (2 == t) a = r.data.icons + "/resource/common/image/customer/member-center/level2_1.png";
                else if (3 == t) a = r.data.icons + "/resource/common/image/customer/member-center/level3_1.png";
                else if (4 == t) a = r.data.icons + "/resource/common/image/customer/member-center/level4_1.png";
                else if (5 == t) var a = r.data.icons + "/resource/common/image/customer/member-center/level5_1.png";
                r.setData({
                    src: a
                })
            }
        }), t.request({
            url: e.member.memberin,
            data: {
                bid: wx.getStorageSync("bid")
            },
            method: "get",
            success: function(e) {
                console.log("rerere", e.data);
                var t = e.data;
                r.setData({
                    data: t
                })
            }
        })
    }
});