var e = require("../../../../api.js"), t = (require("../../../../qqmap-wx.js"), 
getApp()), r = wx.createInnerAudioContext();

Page({
    data: {
        currentItemId: "1",
        orderNumber: "",
        startTime: "",
        endTime: "",
        data: [],
        pageSize: 5,
        currentPageSize: 5,
        soundRecording: {
            tempPath: "",
            duration: "",
            isPlay: !1
        },
        thisStatic : 0
    },
    onLoad: function(r) {
        var a = this;
        a.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), t.request({
            url: e.order.CheckOpenid,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                2 == e.code && a.setData({
                    service_url: e.url
                });
            }
        });
    },
    selectSwiper: function(e) {
        var t = this, r = e.currentTarget.dataset.listid;
        t.initCurrentPageSize(), t.setData({
            currentItemId: r
        }), t.list();
    },
    changeSwiper: function(e) {
        var t = this, r = e.detail.currentItemId;
        t.initCurrentPageSize(), t.setData({
            currentItemId: r
        }), t.list();
    },
    onShow: function() {
        var e = this;
        this.userinfo(), e.check(), e.list();
    },
    list: function() {
        var r = this;
        console.log(r.data.currentPageSize), t.request({
            url: e.default.ServerOrder,
            data: {
                bid: wx.getStorageSync("bid"),
                status: r.data.currentItemId,
                uid: wx.getStorageSync("uid"),
                limit: r.data.currentPageSize,
                thisStatic: r.data.thisStatic,
            },
            success: function(e) {
                console.log("服务订单", e);
                r.setData({
                    data: e.data
                });
                e.count ? r.setData({
                  data_count:e.count,
                  thisStatic:1
                }) : ''
            }
        });
    },
    check: function() {
        return "" == wx.getStorageSync("phone") ? (wx.redirectTo({
            url: "/sd_liferuning/pages/login/login"
        }), !1) : 1 == wx.getStorageSync("cash").status ? (wx.redirectTo({
            url: "../authentication/index"
        }), !1) : 2 == wx.getStorageSync("cash").status ? (wx.redirectTo({
            url: "../auth-success/index"
        }), !1) : -1 == wx.getStorageSync("cash").status ? (wx.showModal({
            title: "提示",
            content: "您已被管理員封禁，請與管理員聯系",
            showCancel: !1,
            success: function() {
                wx.redirectTo({
                    url: "../../login/index"
                });
            }
        }), !1) : -1 == wx.getStorageSync("cash").cashstatus ? (wx.redirectTo({
            url: "../auth-success/index"
        }), !1) : 3 == wx.getStorageSync("cash").status && 0 == wx.getStorageSync("cash").cashstatus ? (wx.showModal({
                    title: "提示" + wx.getStorageSync("cash").status + wx.getStorageSync("cash").cashstatus,
            content: "您還未繳納保證金",
            showCancel: !1,
            success: function() {
                wx.redirectTo({
                    url: "../userauth-pay/index"
                });
            }
        }), !1) : void 0;
    },
    userinfo: function() {
        var r = this;
        t.request({
            url: e.default.userinfos,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                1 == e.code ? (r.setData({
                    info: e.data
                }), -1 == e.data.status && wx.removeStorage({
                    key: "cash",
                    success: function(e) {
                        wx.showModal({
                            title: "提示",
                            content: "您已經被管理員封禁",
                            showCancel: !1,
                            success: function() {
                                wx.redirectTo({
                                    url: "../../login/index"
                                });
                            }
                        });
                    }
                })) : wx.showModal({
                    title: "提示",
                    content: "獲取用戶資訊失敗"
                });
            }
        });
    },
    navToUrl: function(e) {
        var t = e.currentTarget.dataset.url;
        console.log(t), wx.navigateTo({
            url: t
        });
    },
    GiveOrder: function(r) {
        t.request({
            url: e.default.GiveOrder,
            data: {
                orderid: r.currentTarget.dataset.id,
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(a) {
                console.log("订单详情", a.data), console.log(a), 1 == a.data ? (t.request({
                    url: e.user.mess,
                    data: {
                        bid: wx.getStorageSync("bid"),
                        order_no: r.currentTarget.dataset.order_no,
                        type: "order"
                    },
                    success: function(e) {
                        console.log(e);
                    }
                }), wx.showToast({
                    title: "恭喜，搶單成功啦！",
                    duration: 1e3,
                    success: function() {
                        setTimeout(function() {
                            wx.redirectTo({
                                url: "/service/pages/service/index/index"
                            });
                        }, 1500);
                    }
                })) : 0 == a.status ? wx.showToast({
                    title: "手慢啦，已被搶走！",
                    duration: 1e3,
                    success: function() {
                        setTimeout(function() {
                            wx.redirectTo({
                                url: "/service/pages/service/index/index"
                            });
                        }, 1500);
                    }
                }) : -1 == a.status && wx.showToast({
                    title: "您已滿單！",
                    duration: 1e3,
                    success: function() {
                        setTimeout(function() {
                            wx.redirectTo({
                                url: "/service/pages/service/index/index"
                            });
                        }, 1500);
                    }
                });
            }
        });
    },
    OkOrder: function(r) {
        t.request({
            url: e.default.OkOrder,
            data: {
                orderid: r.currentTarget.dataset.id,
                bid: wx.getStorageSync("bid"),
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                console.log("订单详情", e.data), 1 == e.data && wx.showToast({
                    title: "感謝您的付出，您將有豐厚的回報！",
                    duration: 1e3,
                    success: function() {
                        return setTimeout(function() {
                            wx.redirectTo({
                                url: "/service/pages/service/index/index"
                            });
                        }, 1e3), !1;
                    }
                });
            }
        });
    },
    refreshData: function() {
        var e = this, t = e.data.currentItemId, r = e.data.pageSize, a = e.data.currentPageSize;
        a += r, e.setData({
            currentPageSize: a
        }), e.sendRequestByCurrentPageSize({
            currentItemId: t,
            currentPageSize: a
        });
    },
    sendRequestByCurrentPageSize: function(e) {
        e.currentItemId, e.currentPageSize;
        this.list();
    },
    initCurrentPageSize: function() {
        var e = this, t = e.data.pageSize;
        e.setData({
            currentPageSize: t
        });
    },
    previewPic: function(e) {
        var t = e.currentTarget.dataset.value;
        wx.previewImage({
            current: t.xphoto,
            urls: [ t.xphoto ]
        });
    },
    soundRecordingPlay: function(e) {
        var t = e.currentTarget.dataset.value, a = this;
        r.src = t.yinpin;
        var n = r.paused, i = a.data.soundRecording;
        n ? (r.play(), i.isPlay = !0, setTimeout(function() {
            var e = a.data.soundRecording;
            e.isPlay = !1, a.setData({
                soundRecording: e
            });
        }, 1e3 * i.duration)) : (r.stop(), i.isPlay = !1), a.setData({
            soundRecording: i
        });
    }
});