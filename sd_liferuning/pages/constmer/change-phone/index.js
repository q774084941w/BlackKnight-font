/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
Page({
    data: {
        phoneNumber: null,
        identifyingCode: null,
        btnType: 1,
        defaultWaitTime: 60,
        waitTime: null,
        defaultWaitText: "驗證",
        waitInterval: null
    },
    onLoad: function(t) {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        })
    },
    changeUserType: function(t) {
        this.setData({
            userType: t.currentTarget.dataset.usertype
        })
    },
    changeInputData: function(t) {
        var e = this,
            a = t.currentTarget.dataset.name,
            n = t.detail.value;
        "phoneNumber" == a && e.setData({
            phoneNumber: n
        }), "identifyingCode" == a && e.setData({
            identifyingCode: n
        })
    },
    getIdentifyingCode: function() {
        var t = this;
        if (!new RegExp("^[1][3,5,8][0-9]{9}$").test(t.data.phoneNumber)) return wx.showToast({
            title: "手機號不正確",
            icon: "none",
            mask: !0
        }), !1;
        t.setData({
            btnType: 0,
            waitTime: t.data.defaultWaitTime,
            waitInterval: setInterval(function() {
                t.data.waitTime <= 0 && (clearInterval(t.data.waitInterval), t.setData({
                    btnType: 1
                })), t.setData({
                    waitTime: --t.data.waitTime
                })
            }, 1e3)
        }), wx.request({
            url: "/",
            success: function() {}
        })
    },
    sendRequest: function() {
        this.validate() && wx.request({
            url: "/",
            success: function(t) {}
        })
    },
    validate: function() {
        var t = this;
        return new RegExp("^[1][3,5,8][0-9]{9}$").test(t.data.phoneNumber) ? !(!t.data.identifyingCode || t.data.identifyingCode.length <= 0) || (wx.showToast({
            title: "驗證碼不得為空",
            icon: "none",
            mask: !0
        }), !1) : (wx.showToast({
            title: "手機號不正確",
            icon: "none",
            mask: !0
        }), !1)
    }
});