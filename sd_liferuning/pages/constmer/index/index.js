/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:49*/
function t(e) {
    var a = e.page;
    setTimeout(function() {
        a.setData({
            currentScrollIcon: a.data.currentScrollIcon++ >= 3 ? 1 : a.data.currentScrollIcon
        }), t({
            page: a
        })
    }, 3e3)
}
function e() {
    wx.getLocation({
        type: "wgs84",
        success: function(t) {
            t.latitude, t.longitude, t.speed, t.accuracy
        }
    }), wx.getSetting({
        success: function(t) {
            t.authSetting["scope.userLocation"] || a()
        }
    })
}
function a() {
    wx.openSetting({
        success: function(t) {
            t.authSetting["scope.userLocation"] || showRemind()
        },
        fail: function(t) {
            t.authSetting["scope.userLocation"] || showRemind()
        }
    })
}
var n = require("../../../../api.js"),
    o = require("../../../../qqmap-wx.js"),
    i = getApp();
Page({
    data: {
        panel: 0,
        carryIndex: 0,
        weight: 1,
        worth: 10,
        wareText: "",
        authStatus: !0,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        phone:0,
        iphoneModule: !1,
        currentScrollIcon: 1,
        thisRed : 1,
    },
  getPhoneNumber: function (e) {
    var b = this;
    console.log(e.detail)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.login({
        
        success:function(a){
          
          console.log(a.code)
          console.log(wx.getStorageSync("bid"))
          wx.request({
            url: n.default.getLogin,
            method:'POST',
            data: {
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData,
              code: a.code,
              bid: wx.getStorageSync("bid"),
            },
            success: function (e) {
              
              var phone = e.data.purePhoneNumber;
              
              console.log(e.data.purePhoneNumber)
              console.log(e.data.purePhoneNumber.length)
              if (e.data.purePhoneNumber && e.data.purePhoneNumber.length>4){
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: '同意授权',
                  success: function (a) {
                    b.setData({
                      phone: phone
                    })
                   }
                })
              }else{
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: '未授权',
                  success: function (res) { }
                })
              }

            },
          })
        }
      })
      
    }
  },
  
    onReady: function() {
        var e = wx.getSystemInfoSync(),
            a = e.model.split(" ")[0];
            
        e.system.split(".")[0].split(" ")[1];
        "iPhone" == a && this.setData({
            iphoneModule: !0,
            panel: 0
        }), t({
            page: this
        }), this.getLocaltion()
    },
    switchPanel: function(t) {
        var e = this,
            a = t.currentTarget.dataset.panel;
        e.setData({
            panel: a
        })
    },
    tel: function () {
      wx.makePhoneCall({
        phoneNumber: '+85363085880'
      })
    },
    changeInputData: function(t) {
        var e = this,
            a = t.currentTarget.dataset.name,
            n = t.detail.value;
        "wareText" == a && e.setData({
            wareText: n
        })
    },
    checkCarryItem: function(t) {
        var e = this,
            a = t.currentTarget.dataset.index;
        e.setData({
            carryIndex: a
        })
    },
    
    pickerSelector: function(t) {
        var e = this,
            a = t.currentTarget.dataset.type,
            n = t.detail.value;
        "weight" == a && e.setData({
            weight: e.data.weightArr[n]
        }), "worth" == a && e.setData({
            worth: e.data.worthArr[n]
        })
    },
    navToPage: function(t) {
        var e = this,
            a = t.currentTarget.dataset.pagetype,
            n = this.findPageByPageType(a) + "?id=" + t.currentTarget.dataset.id + "&cid=" + t.currentTarget.id;
        e.isLogin() ? wx.navigateTo({
            url: n
        }) : e.gotoLogin()
    },
    findPageByPageType: function(t) {
        var e = null;
        return this.data.pageUrlArr.forEach(function(a, n) {
            t == a.id && (e = a.pageUrl)
        }), e
    },
    navToUserPage: function(t) {
        var e = this;
        e.isLogin() ? wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/user/index"
        }) : e.gotoLogin()
    },
    naveClick: function(t) {
        i.navigatorClick(t, this)
    },
    setSearch: function(t) {
        this.setData({
            search: t.detail.value
        })
    },
    searchAct: function() {
        var t = this,
            e = t.data.pageConfig.mainConfig.searchConfig.searchLinkedUrl,
            a = t.data.search ? t.data.search : "";
        wx.navigateTo({
            url: e + "?wareText=" + a
        })
    },
    onShow: function() {

      
        var t = this;
        i.request({
            url: n.member.viptime,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(t) {
                wx.setStorageSync("huiyuan", t.data)
            }
        }), i.request({
            url: n.message.list,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
              console.log(e), t.setData({
                    notice: e.data
                });
            }
        }), wx.getLocation({
            type: "wgs84",
            success: function(e) {
                console.log(e), new o({
                    key: "EKJBZ-72L3P-FHXDL-VSLEP-JEAGJ-JTFSD"
                }).reverseGeocoder({
                    location: {
                        latitude: e.latitude,
                        longitude: e.longitude
                    },
                    success: function(e) {
                        t.setData({
                            locationNow: e.result.address_component.district
                        })
                    }
                }), i.request({
                    url: n.user.getmap,
                    data: {
                        latitude: e.latitude,
                        longitude: e.longitude,
                        bid: wx.getStorageSync("bid")
                    },
                    success: function(e) {
                        console.log(e), 1 == e.code && t.setData({
                            markers: e.data
                        })
                    }
                })
            },
            fail: function() {
                wx.showModal({
                    title: "溫馨提醒",
                    content: "需要獲取您的地理位置才能使用小程式",
                    showCancel: !1,
                    confirmText: "獲取位置",
                    success: function(t) {
                        t.confirm && e()
                    },
                    fail: function(t) {
                        e()
                    }
                })
            }
        })
        // setTimeout(function(){
        //   t.setData({
        //     thisRed:0
        //   })
        // },5e3)
    },
    onLoad: function(t) {
        t.scene && wx.setStorageSync("referee", t.scene);
        var e = this;
        i.request({
            url: n.
            default.store,
            success: function(t) {
              
                wx.setStorageSync("bid", t.bid.bid), e.loadpage()
            }
        }), e.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), i.pageOnLoad(e)
    },
    loadpage: function() {
        var t = this;
        if (wx.getStorageSync("index")) {
            var e = wx.getStorageSync("index");
            wx.setNavigationBarTitle({
                title: e.titleConfig.pageTitle
            }), wx.setNavigationBarColor({
                frontColor: e.titleConfig.fontColor.toLocaleLowerCase(),
                backgroundColor: e.titleConfig.navigationBgColor,
                animation: {
                    duration: 400,
                    timingFunc: "easeIn"
                }
            }), t.setData({
                pageConfig: e
            })
        }
        i.request({
            method: "POST",
            url: n.
            default.indexGetPageConfig,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                var a = e.status,
                    n = JSON.parse(e.diy);
                wx.setStorageSync("index", n), a && (wx.setNavigationBarTitle({
                    title: n.titleConfig.pageTitle
                }), wx.setNavigationBarColor({
                    frontColor: n.titleConfig.fontColor.toLocaleLowerCase(),
                    backgroundColor: n.titleConfig.navigationBgColor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    pageConfig: n
                }))
            }
        }), wx.getStorage({
            key: "uid",
            success: function(e) {
                t.setData({
                    authStatus: !0
                })
            },
            fail: function(e) {
                i.request({
                    url: n.
                    default.homeimg,
                    data: {
                        bid: wx.getStorageSync("bid")
                    },
                    success: function(e) {
                        1 == e.code && t.setData({
                            homeimg: e.src
                        })
                    }
                }), t.setData({
                    authStatus: !1
                })
            }
        })
    },
    onShareAppMessage: function(t) {
        var e = this.data.shareImgUrl;
        return {
            title: "您的好友" + wx.getStorageSync("nickname") + "邀您使用黑騎士",
            imageUrl: e,
            desc: "發現一個很好用的程式",
            path: "sd_liferuning/pages/constmer/index/index",
            success: function(t) {
                t && i.request({
                    url: n.Coupon.list,
                    data: {
                        bid: wx.getStorageSync("bid"),
                        type: 5
                    },
                    success: function(t) {
                        1 == t.code && i.request({
                            url: n.Coupon.getcoupon,
                            data: {
                                disid: t.data[0].disid,
                                uid: wx.getStorageSync("uid")
                            },
                            success: function(e) {
                                1 == e.code && wx.showModal({
                                    title: "提示",
                                    content: "恭喜你獲得" + t.data[0].money + "元紅包",
                                    showCancel: !1
                                })
                            }
                        })
                    }
                })
            }
        }
    },
    isLogin: function() {
        return !0
    },
    gotoLogin: function() {
        wx.redirectTo({
            url: "/sd_liferuning/pages/login/index"
        })
    },
    getUserInfo: function(t) {
        var e = this,
            a = t.detail.rawData;
      console.log(e.data.phone)
        console.log(a), a && wx.showLoading({
            title: "請稍後",
            success: function() {
                 wx.login({
                    success: function(a) {
                        wx.request({
                            url: n.
                            default.user,
                            method: "POST",
                            data: {
                                bid: wx.getStorageSync("bid"),
                                utoken: "",
                                code: a.code,
                                encryptedData: t.detail.encryptedData,
                                iv: t.detail.iv,
                                tel:e.data.phone
                            },
                          
                            success: function(t) {
                              console.log(t)
                                10 == t.data.success ? (wx.setStorageSync("openid", t.data.openid), wx.request({
                                    url: n.
                                    default.userid,
                                    method: "POST",
                                    data: {
                                        openid: t.data.openid
                                    },
                                    success: function(t) {
                                      console.log(t)
                                      "沒有獲取權限" != t.data.data ? (wx.hideLoading(), wx.setStorageSync("uid", t.data.data), wx.setStorageSync("head", t.data.head), wx.setStorageSync("nickname", t.data.nickname), wx.setStorageSync("sellerid", t.data.sellerid), i.request({
                                            url: n.
                                            default.login,
                                            data: {
                                                uid: t.data.data,
                                                bid: wx.getStorageSync("bid")
                                            },
                                            success: function(t) {
                                                wx.setStorageSync("phone", t.phone), wx.setStorageSync("cash", t.cash), e.setData({
                                                    authStatus: !0
                                                })
                                            }
                                        })) : (wx.hideLoading(), wx.showModal({
                                            title: "提示",
                                            content: "請重新點擊授權",
                                            showCancel: !1
                                        }))
                                    },
                                    fail: function() {
                                        wx.hideLoading(), wx.showToast({
                                            title: "網絡錯誤",
                                            icon: "none"
                                        })
                                    }
                                })) : (wx.hideLoading(), wx.showToast({
                                    title: "服務器請求錯誤",
                                    icon: "none"
                                }))
                            },
                            fail: function() {
                                wx.hideLoading(), wx.showToast({
                                    title: "網絡錯誤",
                                    icon: "none"
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    closePanel: function() {
        this.setData({
            authStatus: !0
        })
    },
    getLocaltion: function() {
        var t = this;
        wx.getLocation({
            type: "wgs84",
            success: function(e) {
                t.setData({
                    mapData: e
                })
            }
        })
    },
  formSubmit: function (e) {
    var o = this,
      url = e.currentTarget.dataset.url,
      formId = e.detail.formId;
    console.log(formId)
    console.log(url)
    i.request({
      url: n.user.getOneFormId,
      data: {
        uid: wx.getStorageSync("uid"),
        formId: formId
      },
      success: function (t) {
        console.log(t)
        wx.navigateTo ({
          url: url
        })
      }
    })
  },

});