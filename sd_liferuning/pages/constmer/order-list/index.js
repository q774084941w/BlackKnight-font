/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var e = require("../../../../api.js"),
    t = (require("../../../../qqmap-wx.js"), getApp());
Page({
    data: {
        currentItemId: "0",
        orderNumber: "",
        startTime: "",
        endTime: "",
        data: [],
        pageSize: 5,
        currentPageSize: 5
    },
    onLoad: function(e) {
        this.setData({
            currentItemId: e.currentItemId ? e.currentItemId : 0
        }), t.pageOnLoad(this);
        var a = this;
        a.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), e.orderNumber && a.setData({
            orderNumber: e.orderNumber
        }), e.startTime && a.setData({
            startTime: e.startTime
        }), e.endTime && a.setData({
            endTime: e.endTime
        })
    },
    navToPage: function(e) {
        var t = this,
            a = e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id + "&cid=" + e.currentTarget.id;
        t.isLogin() ? wx.navigateTo({
            url: a
        }) : t.gotoLogin()
    },
    navToUserPage: function(e) {
        var t = this;
        t.isLogin() ? wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/user/index"
        }) : t.gotoLogin()
    },
    naveClick: function(e) {
        t.navigatorClick(e, this)
    },
    onShow: function() {
        this.orderlist();
    },
    orderlist: function() {
        var a = this;
        t.request({
            url: e.
            default.orderlist,
            data: {
                status: a.data.currentItemId,
                uid: wx.getStorageSync("uid"),
                limit: a.data.currentPageSize
            },
            success: function(e) {
              console.log(e)
                console.log("訂單清單", e.data), a.setData({
                    data: e.data
                })
                e.count ? a.setData({
                  data_count : e.count
                }) : '';
                var f = new Date;
            }
        })
    },
    changeSidebar: function() {
        this.openSidebar()
    },
    selectSwiper: function(e) {
        var t = this,
            a = e.currentTarget.dataset.listid;
        t.initCurrentPageSize(), t.setData({
            currentItemId: a
        }), (t = this).orderlist()
    },
    changeSwiper: function(e) {
        var t = this,
            a = e.detail.current;
        t.initCurrentPageSize(), t.setData({
            currentItemId: a
        }), t.orderlist()
    },
    refreshData: function() {
        var e = this,
            t = e.data.currentItemId,
            a = e.data.pageSize,
            r = e.data.currentPageSize;
        r += a, e.setData({
            currentPageSize: r
        }), e.sendRequestByCurrentPageSize({
            currentItemId: t,
            currentPageSize: r
        })
    },
    sendRequestByCurrentPageSize: function(a) {
        var r = this,
            i = a.currentItemId,
            n = a.currentPageSize;
        t.request({
            url: e.
            default.orderlist,
            data: {
                status: i,
                uid: wx.getStorageSync("uid"),
                limit: n
            },
            success: function(e) {
                r.setData({
                    data: e.data
                }), wx.hideLoading()
            },
            fail: function() {
                wx.hideLoading()
            }
        })
    },
    initCurrentPageSize: function() {
        var e = this,
            t = e.data.pageSize;
        e.setData({
            currentPageSize: t
        })
    }
});