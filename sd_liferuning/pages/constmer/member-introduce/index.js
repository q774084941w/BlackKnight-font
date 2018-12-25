/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var e = require("../../../../api.js"),
    r = getApp();
Page({
    data: {
        levelArr: [],
        data: "",
        icons: ""
    },
    onLoad: function() {
        var e = this;
        e.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
        for (var r = [], a = 1; a < 6; a++) r.push({
            defaultImg: e.data.icons + "/resource/common/image/customer/member-center/level" + a + ".png",
            activeImg: e.data.icons + "/resource/common/image/customer/member-center/level" + a + "_1.png",
            needScore: 400 * a
        });
        _this.setData({
            levelArr: r,
            currentScore: 1200,
            progressPercent: 60,
            mark: 387.5
        })
    },
    onShow: function(a) {
        var t = this;
        wx.getStorageSync("uid");
        r.request({
            url: e.member.memberinfo,
            data: "",
            method: "post",
            success: function(e) {
                console.log("rerere", e.data);
                var r = e.data;
                t.setData({
                    data: r
                })
            }
        })
    }
});