/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var t = require("../../../../api.js"),
    e = getApp();
Page({
    data: {
        tagArr: []
    },
    onShow: function() {
        var a = this,
            r = a.data.tagArr;
        e.request({
            url: t.user.usertag,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(t) {
                r[0] = {
                    title: "標籤",
                    tagGroup: t.data.tag_list
                };
                var e = t.data.my_tag;
                r.forEach(function(t, a) {
                    t.tagGroup.forEach(function(t, a) {
                        e.forEach(function(e, a) {
                            e == t.id && (t.select = !0)
                        })
                    })
                }), a.setData({
                    tagArr: r,
                    myTagArr: e
                })
            }
        })
    },
    chooseTag: function(a) {
        var r = this,
            n = r.data.tagArr,
            o = a.currentTarget.dataset.id,
            i = r.data.myTagArr,
            u = r.searchIndex(i, o);
        if (-1 == u && 5 == i.length) return wx.showToast({
            icon: "none",
            title: "最多只能添加5個標籤"
        }), !1; - 1 == u ? e.request({
            url: t.user.tagadd,
            data: {
                id: o,
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                1 == t.code ? i.push(o) : wx.showToast({
                    title: t.msg,
                    icon: "none"
                })
            }
        }) : (e.request({
            url: t.user.tagdel,
            data: {
                id: u,
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                1 == t.code ? i.push(o) : wx.showToast({
                    title: t.msg,
                    icon: "none"
                })
            }
        }), r.deleteIndexByArr(i, u)), n.forEach(function(t, e) {
            t.tagGroup.forEach(function(t, e) {
                o == t.id && (t.select = !t.select)
            })
        }), r.setData({
            tagArr: n
        })
    },
    searchIndex: function(t, e) {
        var a = void 0;
        for (a = 0; a < t.length; a++) if (e == t[a]) return a;
        return -1
    },
    deleteIndexByArr: function(t, e) {
        var a = void 0;
        if (e == t.length - 1) return t.pop();
        for (a = e; a < t.length; a++) {
            if (!(a < t.length - 1)) return t.pop();
            t[a] = t[a + 1]
        }
        return -1
    },
    goBack: function() {
        wx.navigateBack()
    }
});