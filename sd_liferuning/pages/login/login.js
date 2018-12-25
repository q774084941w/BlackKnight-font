/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
function t(e) {
    var o = e.data.countdown_time;
    if (0 != o) setTimeout(function() {
        e.setData({
            countdown_time: o - 1
        }), t(e)
    }, 1e3);
    else e.setData({
        showtime1: !0,
        showtime2: !1,
        reg_hqyzm: "重新獲取",
        countdown_time: 60
    })
}
var e = getApp(),
    o = require("../../../api.js");
Page({
    data: {
        bindcolor: !1,
        phone: "",
        yzm: "",
        yhmima: "",
        showtime1: !0,
        showtime2: !1,
        reg_hqyzm: "獲取驗證碼",
        countdown_time: 60,
        winWidth: 0,
        winHeight: 0,
        currentTab: 0
    },
    reset: function() {
        wx.navigateTo({
            url: "../reset/reset"
        })
    },
    reg_yanzhengma_huoqu: function() {
        var a = this.data.phone,
            i = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      console.log(a);
        if (0 == a.length) return wx.showModal({
            title: "手機號不能為空"
        }), !1;
        if (a.length < 8) return wx.showModal({
            title: "手機號長度有誤！"
        }), !1;
       /* if (!i.test(a)) return wx.showModal({
            title: "手機號有誤！"
        }), !1;*/
        this.setData({
            showtime1: !1,
            showtime2: !0
        });
        var s = this;
        e.request({
            url: o.
            default.checkcode,
            method: "post",
            data: {
                phone: a,
                bid: wx.getStorageSync("bid")
            },
          
            success: function(t) {
              
                console.log("驗證碼", t), 0 != t.code ? (t.code > 0 && wx.showToast({
                    title: "發送成功",
                    icon: "success",
                    duration: 2e3
                }), s.setData({
                    yzm: t.code
                })) : wx.showToast({
                    title: "網絡錯誤，錯誤碼1005",
                    icon: "loading",
                    duration: 2e3
                })
            }
        }), t(this)
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), e.pageOnLoad(this)
    },
    showok: function(t) {
        var a = this;
        return console.log("shuru", t.detail.value.yz), console.log("fa", a.data.yzm), "" == t.detail.value.yz ? (wx.showModal({
            title: "請輸入驗證碼"
        }), !1) : t.detail.value.yz != this.data.yzm ? (wx.showModal({
            title: "驗證碼錯誤"
        }), !1) : void e.request({
            url: o.
            default.phone,
            method: "post",
            data: {
                bid: wx.getStorageSync("bid"),
                phone: this.data.phone,
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                console.log(t), 1 == t.code ? wx.showToast({
                    title: "綁定成功",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.setStorageSync("phone", t.phone), e.request({
                                url: o.
                                default.userinfo,
                                data: {
                                    uid: wx.getStorageSync("uid")
                                },
                                success: function(t) {
                                    wx.setStorage({
                                        key: "cash",
                                        data: t.data
                                    })
                                }
                            }), wx.redirectTo({
                                url: "/service/pages/service/authentication/index"
                            })
                        }, 2e3)
                    }
                }) : wx.showToast({
                    title: "已綁定手機號",
                    duration: 1e3
                })
            }
        })
    },
    blur1: function(t) {
        this.setData({
            phone: t.detail.value
        })
    },
    blur2: function(t) {
        this.setData({
            yhmima: t.detail.value
        });
        var e = this.data.yhname,
            o = this.data.yhmima;
        "" == e || "" == o ? this.setData({
            bindcolor: !1
        }) : this.setData({
            bindcolor: !0
        })
    },
    onShareAppMessage: function() {}
});