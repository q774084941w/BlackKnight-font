var e = require("../../../../api.js"), t = (require("../../../../qqmap-wx.js"), 
getApp());

Page({
    data: {
        isShow: !1,
        moduleArr: [ {
            joint_id: 1,
            j_name: "AAA"
        }, {
            joint_id: 2,
            j_name: "BBB"
        }, {
            joint_id: 3,
            j_name: "CCC"
        } ]
    },
    formSubmit: function(e) {
        var t = this, a = e.detail.value;
        t.sendRequest(a);
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
    onShow: function() {
        var a = this;
        t.request({
            url: e.order.YesJoint,
            success: function(e) {
                a.setData({
                    moduleArr: e.mess,
                    moduleIndex: 0
                });
            }
        });
    },
    sendRequest: function(a) {
        var i = a.wechatID, n = a.appID, s = a.appName, o = a.j_name, u = a.userType, d = a.shopName;
        void 0 == d && (d = ""), console.log("TODO 执行请求"), t.request({
            url: e.order.sumbit_ShenHe,
            method: "post",
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid"),
                name: s,
                appid: n,
                hjmall_id: i,
                is_zguanli: u,
                type: o,
                shop_name: d
            },
            success: function(e) {
                console.log(e), 1 == e.code ? (wx.showToast({
                    title: "成功",
                    icon: "succes",
                    duration: 1e3,
                    mask: !0
                }), wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/user/index"
                })) : (wx.showToast({
                    title: "失败",
                    duration: 1e3,
                    mask: !0
                }), wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/user/index"
                }));
            }
        });
    },
    userTypeBindChange: function(e) {
        var t = e.detail.value;
        this.setData({
            isShow: 0 == t
        });
    },
    bindModulePickerChange: function(e) {
        var t = e.detail.value;
        this.setData({
            moduleIndex: t
        });
    }
});