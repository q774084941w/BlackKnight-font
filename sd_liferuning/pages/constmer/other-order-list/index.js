/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:49*/
var e = require("../../../../api.js"),
    t = (require("../../../../qqmap-wx.js"), getApp());
Page({
    data: {
        currentOrderType: 1,
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
        var r = this;
        r.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), e.orderNumber && r.setData({
            orderNumber: e.orderNumber
        }), e.startTime && r.setData({
            startTime: e.startTime
        }), e.endTime && r.setData({
            endTime: e.endTime
        })
    },
    navToPage: function(e) {
        var t = this,
            r = e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id + "&cid=" + e.currentTarget.id;
        t.isLogin() ? wx.navigateTo({
            url: r
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
        this.orderlist()
    },
    orderlist: function() {
        var r = this;
        t.request({
            url: e.
            default.orderlists,
            data: {
                type: r.data.currentOrderType,
                status: r.data.currentItemId,
                uid: wx.getStorageSync("uid"),
                limit: r.data.currentPageSize
            },
            success: function(e) {
                r.setData({
                    data: e.data
                })
            }
        })
    },
    selectCurrentOrderType: function(e) {
        var t = this,
            r = e.currentTarget.dataset.type;
        this.setData({
            currentOrderType: r
        }), t.orderlist()
    },
    changeSidebar: function() {
        this.openSidebar()
    },
    selectSwiper: function(e) {
        var t = this,
            r = e.currentTarget.dataset.listid;
        t.initCurrentPageSize(), t.setData({
            currentItemId: r
        }), (t = this).orderlist()
    },
    changeSwiper: function(e) {
        var t = this,
            r = e.detail.current;
        t.initCurrentPageSize(), t.setData({
            currentItemId: r
        }), t.orderlist()
    },
    refreshData: function() {
        var e = this,
            t = e.data.currentItemId,
            r = e.data.pageSize,
            a = e.data.currentPageSize;
        a += r, e.setData({
            currentPageSize: a
        }), e.sendRequestByCurrentPageSize({
            currentItemId: t,
            currentPageSize: a
        })
    },
    sendRequestByCurrentPageSize: function(r) {
        var a = this,
            i = r.currentItemId,
            n = r.currentPageSize;
        t.request({
            url: e.
            default.orderlist,
            data: {
                status: i,
                uid: wx.getStorageSync("uid"),
                limit: n
            },
            success: function(e) {
                a.setData({
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