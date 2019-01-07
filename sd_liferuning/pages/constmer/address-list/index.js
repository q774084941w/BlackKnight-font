/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var t = require("../../../../api.js"),
    e = getApp();
Page({
    data: {
        list: [],
        type:0,
      type_name:'收貨'
    },
    navToEdit: function(t) {
    
        wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/address-insert/index?id=" + t.currentTarget.dataset.id+"&type=" + this.data.type
        })
    },
    onLoad: function (c) { 
      console.log(c);
      if (c.addressClass==1) {
        this.setData({ type_name: '取貨' })
        }
      this.setData({ type: c.addressClass })
      },
    onShow: function(c) {
        e.pageOnLoad(this);
        
        var a = this,
            s = wx.getStorageSync("uid");
        var type = a.data.type;
        
        e.request({
            url: t.
            default.addslist,
            method: "get",
            data: {
                uid: s,
                bid: wx.getStorageSync("bid"),
                type:type
            },
            success: function(t) {
                for (var e = t.data, s = 0; s < e.length; s++) 1 == e[s].
                default ? e[s].
                default = "success" : e[s].
                default = "circle", e[s].address = e[s].province + e[s].city + e[s].area + e[s].address;
                a.setData({
                    list: t.data
                })
              console.log(t);
            }
        })
    },
    radio: function(a) {
        var s = this,
            d = a.currentTarget.dataset.index,
            i = s.data.list;
            console.log(d)
      var type = s.data.type;
        e.request({
            url: t.
            default.defaultsite,
            method: "get",
            data: {
                uid: wx.getStorageSync("uid"),
                uaid: d,
                type:type
            },
            success: function(t) {
                if (1 == t.data.success) {
                    for (var e = 0; e < i.length; e++) i[e].uaid == d ? i[e].
                    default = "success" : i[e].
                    default = "circle";
                    s.setData({
                        list: i
                    }), wx.showToast({
                        title: "設定成功",
                        icon: "success"
                    }), wx.navigateBack({})
                }
            }
        })
    },
    dellist: function(a) {
        var s = this,
            d = a.currentTarget.dataset.id,
            i = a.currentTarget.dataset.index,
            u = s.data.list;
      var type = s.data.type;
        wx.showModal({
            title: "提示",
            content: "是否删除該地址",
            success: function(a) {
                a.confirm && e.request({
                    url: t.
                    default.delAddress,
                    method: "get",                  
                    data: {
                        uaid: d,
                      
                    },
                    success: function(t) {
                        1 == t.data.success && (u.splice(i, 1), s.setData({
                            list: u
                        }))
                    }
                })
            }
        })
    }
});