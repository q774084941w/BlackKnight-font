/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:49*/
var e = require("../../../../api.js"),
    t = (require("../../../../qqmap-wx.js"), getApp());
Page({
    data: {
        phoneNumber: "",
        sharePosterPanel: !1,
        pic: ""
    },
    navToUser: function() {
        wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/user-info/index"
        })
    },
    callPhone: function() {
        var a = this;
        t.request({
            url: e.
            default.getPhone,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                a.setData({
                    phoneNumber: e.data.phone
                }), wx.makePhoneCall({
                    phoneNumber: a.data.phoneNumber
                })
            }
        })
    },
    naveClick: function(e) {
        t.navigatorClick(e, this)
    },
    onShow: function() {
        var e = this;
        e.setData({
            head: wx.getStorageSync("head"),
            nickname: wx.getStorageSync("nickname"),
            site: wx.getStorageSync("site")
        });
        var t = wx.getStorageSync("member");
        t ? e.setData(t) : wx.showLoading({
            title: "請稍後"
        }), e.member()
    },
    member: function() {
        var a = this,
            s = {};
        t.request({
            url: e.user.UserMember,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(n) {
                t.request({
                    url: e.order.Is_ShenHe,
                    data: {
                        uid: wx.getStorageSync("uid"),
                        bid: wx.getStorageSync("bid")
                    },
                    success: function(e) {
                        a.setData({
                            is_status: e.code
                        }), 0 == e.code ? (a.setData({
                            userConfig: e.data
                        }), s.userConfig = e.data, wx.setStorageSync("member", s)) : 99 == e.code ? (a.setData({
                            userConfig: e.data
                        }), s.userConfig = e.data, wx.setStorageSync("member", s)) : (s.is_status = e.code, a.setData({
                            userConfig: n.data
                        }), s.userConfig = n.data, wx.setStorageSync("member", s))
                    }
                })
            }
        }), t.request({
            url: e.user.membertag,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                a.setData({
                    tag: e.data
                }), s.tag = e.data, wx.setStorageSync("member", s)
            }
        }), t.request({
            url: e.member.show,
            data: {
                uid: wx.getStorageSync("uid")
            },
            method: "post",
            success: function(e) {
                t = e.data;
                if (100 == e.code);
                else {
                    var t = e.data;
                    a.setData({
                        pic: t
                    }), s.pic = e.data, wx.setStorageSync("member", s)
                }
            }
        }), wx.hideLoading()
    },
    onLoad: function() {
        t.pageOnLoad(this), this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        })
    },
    openSharePosterPanel: function() {
        var a = this;
        a.data.sharePosterPanel;
        wx.showLoading({
            title: "請稍後",
            success: function() {
                t.request({
                    url: e.user.qrcode,
                    data: {
                        uid: wx.getStorageSync("uid"),
                        bid: wx.getStorageSync("bid")
                    },
                    success: function(e) {
                        1 == e.code ? (wx.hideLoading(), a.setData({
                            sharePosterPanel: !0,
                            qrcode: e.src
                        })) : (wx.hideLoading(), wx.showToast({
                            title: "請重新點擊生成",
                            duration: 1e3,
                            icon: "none"
                        }))
                    }
                })
            }
        })
    },
    closeSharePosterPanel: function() {
        this.data.sharePosterPanel;
        this.setData({
            sharePosterPanel: !1
        })
    },
    saveImage: function(e) {
        var t = this,
            a = e.currentTarget.dataset.url;
        wx.downloadFile({
            url: a,
            success: function(e) {
                if (200 === e.statusCode) {
                    var a = e.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: a,
                        success: function() {
                            wx.showToast({
                                icon: "none",
                                title: "保存成功"
                            })
                        },
                        complete: function() {
                            t.closeSharePosterPanel()
                        }
                    })
                }
            }
        })
    }
});