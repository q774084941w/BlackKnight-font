var e = require("../../../../api.js"), t = (require("../../../../qqmap-wx.js"), 
getApp());

Page({
    data: {
        currentItemId: "1",
        dataArr: [ {}, {
            id: 1,
            wareArr: [ {
                id: 0,
                old_order_no: 123,
                goodsname: "商品",
                price: "10.0",
                myadds: "地址",
                laiyuan: "UU跑腿",
                time: "2分钟前"
            } ]
        } ]
    },
    onLoad: function(a) {
        var r = this;
        r.setData({
            head: wx.getStorageSync("head"),
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), t.request({
            url: e.default.HeJiangOrder,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                console.log("订单", e), r.setData({
                    dataArr: e
                });
            }
        });
    },
    selectSwiper: function(e) {
        var t = this, a = e.currentTarget.dataset.listid;
        console.log(a), t.setData({
            currentItemId: a
        });
    },
    changeSwiper: function(e) {
        var t = this, a = e.detail.currentItemId;
        t.setData({
            currentItemId: a
        });
    },
    refreshData: function(e) {
        var t = this, a = e.currentTarget.dataset.id, r = t.data.dataArr;
        r.forEach(function(e, r) {
            if (e.id == a) {
                var n = t.sendRequest(a);
                -1 != n && (e.wareArr = e.wareArr.concat(n));
            }
        }), t.setData({
            dataArr: r
        });
    },
    pushOrder: function(e) {
        var t = e.currentTarget.dataset.id, a = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/largess/index?type_id=" + t + "&type=" + a
        });
    },
    sendRequest: function(e) {
        return [];
    }
});