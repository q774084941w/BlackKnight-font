/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:49*/
var a = require("../../../../api.js"),
    t = getApp();
Page({
    data: {
        region: [],
        tagArr: [],
        tag: 0,
        person: "",
        phone: "",
        address: "",
        multiIndex: [0, 0, 0]
    },
    onLoad: function(e) {
        var s = this,
            i = e.id;
           
        s.setData({
            uaid: e.id,
            
        }), i && t.request({
            url: a.
            default.addslist,
            method: "get",
            data: {
                uid: wx.getStorageSync("uid"),
                uaid: i,
                bid: wx.getStorageSync("bid")
            },
            success: function(a) {
                console.log(a, "addslist");
                var t = a.data[0];
                s.setData({
                    person: t.name
                }), s.setData({
                    phone: t.phone
                }), s.setData({
                    region: [t.province, t.city, t.area]
                }), s.setData({
                    address: t.address
                })
            }
        }), t.request({
            url: a.
            default.getarea,
            method: "post",
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(a) {
              console.log(a)
                var t = a.data;
                s.setData({
                    areaList: t,
                    multiArray: [t[0], t[1][0], t[2][0][0]]
                })
            }
        }), t.request({
            url: a.
            default.areaLimit,
            method: "post",
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(a) {
                console.log(a, "limitlimit"), s.setData({
                    limit: a.limit
                })
            }
        })
    },
  chooseLocation: function (e) {
    console.log(e);
    var that = this;
    wx.showModal({
      title: '提示',
      content: '由於騰訊地圖在澳門定位暫不精確，請在選擇地址時確認無誤。若不準確請手動拖動選擇，給您帶來的不便敬請諒解！',
      cancelText: "取消",//默认是“取消”
      confirmText: "確定",//默认是“确定”
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
     wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          region: [res.address, res.name, res.name]
        
        
        })
        }
      })

        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
    bindRegionChange: function(a) {
        this.setData({
            region: a.detail.value
        })
    },
    bindMultiPickerChange: function(a) {
        var t = this,
            e = a.detail.value,
            s = this.data.multiArray;
        t.setData({
            region: [s[0][e[0]], s[1][e[1]], s[2][e[1]]]
        })
    },
    bindMultiPickerColumnChange: function(a) {
        var t = this,
            e = {
                multiArray: this.data.multiArray,
                multiIndex: this.data.multiIndex
            };
        switch (e.multiIndex[a.detail.column] = a.detail.value, a.detail.column) {
            case 0:
                for (var s = 0; s <= t.data.areaList[0].length - 1; s++) s == a.detail.value && (e.multiArray[1] = t.data.areaList[1][s], e.multiArray[2] = t.data.areaList[2][s][0]);
                e.multiIndex[1] = 0, e.multiIndex[2] = 0;
                break;
            case 1:
                for (var i = 0; i <= t.data.areaList[1].length - 1; i++) i == a.detail.value && (e.multiArray[2] = t.data.areaList[2][this.data.multiIndex[0]][i]);
                e.multiIndex[2] = 0
        }
        this.setData(e)
    },
    checkTag: function(a) {
        var t = this,
            e = a.currentTarget.dataset.index;
        t.setData({
            tag: e
        })
    },
    changeInputData: function(a) {
        var t = this,
            e = a.currentTarget.dataset.name,
            s = a.detail.value;
        "person" == e && t.setData({
            person: s
        }), "identifyingCode" == e && t.setData({
            identifyingCode: s
        }), "phone" == e && t.setData({
            phone: s
        }), "address" == e && t.setData({
            address: s
        })
    },
    sendRequest: function() {
        var e = this.data.region,
            s = this.data.address,
            i = this.data.phone,
            n = this.data.person;
        t.request({
            url: a.
            default.addsadd,
            method: "POST",
            data: {
                uid: wx.getStorageSync("uid"),
                address: s,
                name: n,
                phone: i,
                province: e[0],
                city: e[1],
                area: e[2],
                default: 0,
                bid: wx.getStorageSync("bid")
            },
            success: function(a) {
                1 == a.data.success && wx.showToast({
                    title: "添加成功",
                    icon: "success",
                    duration: 3e3,
                    success: function() {
                        wx.navigateBack({})
                    }
                })
            }
        })
    },
    UpsendRequest: function(e) {
        var s = e.currentTarget.dataset.id,
            i = this.data.region,
            n = this.data.address,
            d = this.data.phone,
            r = this.data.person;
            console.log(s);
        t.request({
            url: a.
            default.siteupdate,
            method: "POST",
            data: {
                uaid: s,
                address: n,
                name: r,
                phone: d,
                province: i[0],
                city: i[1],
                area: i[2]
            },
            success: function(a) {
                1 == a.data.success && wx.showToast({
                    title: "修改成功",
                    icon: "success",
                    duration: 1e4,
                    success: function() {
                        wx.navigateBack({})
                    }
                })
            }
        })
    },
    validate: function() {
        var a = this;
        return !a.data.person || a.data.person.length <= 0 ? (wx.showToast({
            title: "收貨人不得為空",
            icon: "none",
            mask: !0
        }), !1) : new RegExp("^[1][3,5,8][0-9]{9}$").test(a.data.phone) ? a.data.region.length <= 0 ? (wx.showToast({
            title: "請選擇地區",
            icon: "none",
            mask: !0
        }), !1) : !(!a.data.address || a.data.address.length <= 0) || (wx.showToast({
            title: "地址不得為空",
            icon: "none",
            mask: !0
        }), !1) : (wx.showToast({
            title: "手機號不正確",
            icon: "none",
            mask: !0
        }), !1)
    },
    adds: function() {
        var a = this;
        wx.chooseAddress({
            success: function(t) {
                var e = Array();
                e.push(t.provinceName), e.push(t.cityName), e.push(t.countyName), a.setData({
                    person: t.userName,
                    address: t.detailInfo,
                    phone: t.telNumber,
                    region: e
                })
            }
        })
    }
});