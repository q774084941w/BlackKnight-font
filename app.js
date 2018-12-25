/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:49*/
function t() {
    new e, setTimeout(t, 2e4)
}
function e() {
    1 == wx.getStorageSync("cash").cashstatus && "" != wx.getStorageSync("site") && "" != wx.getStorageSync("uid") && wx.getLocation({
        success: function(t) {
            wx.request({
                url: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/api.php/order/playMsg",
                data: {
                    uid: wx.getStorageSync("uid"),
                    bid: wx.getStorageSync("bid"),
                    latitude: t.latitude,
                    longitude: t.longitude
                },
                success: function(t) {
                    1 == t.data.code && new o({
                        src: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/static/remind.mp3",
                        duration: "14"
                    })
                }
            })
        }
    })
}
require("./utils/utils.js");
var a, n = wx.createInnerAudioContext(),
    o = function(t) {
        var e = t.src,
            a = t.duration;
        e && a && (n.src = e, n.play())
    };
new t, App({
    is_on_launch: !0,
    onLaunch: function() {
      console.log('123');
      //wx.clearStorage();
        this.setApi(), a = this.api, this.getStoreData(), this.getUserDataToken();
      // 获取小程序更新机制兼容
      if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            updateManager.onUpdateReady(function () {
              wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate()
                  }
                }
              })
            })
            updateManager.onUpdateFailed(function () {
              // 新的版本下载失败
              wx.showModal({
                title: '已经有新版本了哟~',
                content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
              })
            })
          }
        })
      } else {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    },
    getmenu: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#ff0000",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        })
    },
  
    getStoreData: function() {
        wx.getStorageSync("bid") || this.request({
            url: a.
            default.store,
            success: function(t) {
                wx.setStorageSync("bid", t.bid.bid)
            }
        }), wx.getStorageSync("site") || this.request({
            url: a.
            default.site,
            success: function(t) {
                wx.setStorageSync("site", t.site)
            }
        })
    },
    getUserDataToken: function() {
        wx.getStorageSync("utoken")
    },
    getMenu: function() {},
    request: function(t) {
        t.data || (t.data = {});
        var e = wx.getStorageSync("access_token");
        e && (t.data.access_token = e), t.data._uniacid = this.siteInfo.uniacid, t.data._acid = this.siteInfo.acid, wx.request({
            url: t.url,
            header: t.header || {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: t.data || {},
            method: t.method || "GET",
            dataType: t.dataType || "json",
            success: function(e) {
                -1 == e.data.code ? getApp().login() : t.success && t.success(e.data)
            },
            fail: function(e) {
                console.warn("--- request fail >>>"), console.warn(e), console.warn("<<< request fail ---");
                var a = getApp();
                a.is_on_launch ? (a.is_on_launch = !1, wx.showModal({
                    title: "网络请求出错",
                    content: e.errMsg,
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && t.fail && t.fail(e)
                    }
                })) : (wx.showToast({
                    title: e.errMsg,
                    image: "/images/icon-warning.png"
                }), t.fail && t.fail(e))
            },
            complete: function(e) {
                200 != e.statusCode && (console.log("--- request http error >>>"), console.log(e.statusCode), console.log(e.data), console.log("<<< request http error ---")), t.complete && t.complete(e)
            }
        })
    },
    saveFormId: function(t) {
        this.request({
            url: a.user.save_form_id,
            data: {
                form_id: t
            }
        })
    },
    loginBindParent: function(t) {
        if ("" == wx.getStorageSync("access_token")) return !0;
        getApp().bindParent(t)
    },
    bindParent: function(t) {
        if ("undefined" != t.parent_id && 0 != t.parent_id) {
            console.log("Try To Bind Parent With User Id:" + t.parent_id);
            var e = wx.getStorageSync("user_info");
            0 < wx.getStorageSync("share_setting").level && 0 != t.parent_id && getApp().request({
                url: a.share.bind_parent,
                data: {
                    parent_id: t.parent_id
                },
                success: function(t) {
                    0 == t.code && (e.parent = t.data, wx.setStorageSync("user_info", e))
                }
            })
        }
    },
    shareSendCoupon: function(t) {
        wx.showLoading({
            mask: !0
        }), t.hideGetCoupon || (t.hideGetCoupon = function(e) {
            var a = e.currentTarget.dataset.url || !1;
            t.setData({
                get_coupon_list: null
            }), a && wx.navigateTo({
                url: a
            })
        }), this.request({
            url: a.coupon.share_send,
            success: function(e) {
                0 == e.code && t.setData({
                    get_coupon_list: e.data.list
                })
            },
            complete: function() {
                wx.hideLoading()
            }
        })
    },
    getauth: function(t) {
        wx.showModal({
            title: "是否打开设置页面重新授权",
            content: t.content,
            confirmText: "去设置",
            success: function(e) {
                e.confirm ? wx.openSetting({
                    success: function(e) {
                        t.success && t.success(e)
                    },
                    fail: function(e) {
                        t.fail && t.fail(e)
                    },
                    complete: function(e) {
                        t.complete && t.complete(e)
                    }
                }) : t.cancel && getApp().getauth(t)
            }
        })
    },
    api: require("api.js"),
    setApi: function() {
        var t = this.siteInfo.siteroot;
        t = t.replace("app/index.php", ""), t += "addons/sd_liferuning/tp/api.php/", this.api = function e(a) {
            for (var n in a) "string" == typeof a[n] ? a[n] = a[n].replace("{$_api_root}", t) : a[n] = e(a[n]);
            return a
        }(this.api);
        var e = this.api.
        default.index, a = e.substr(0, e.indexOf("/index.php"));
        this.webRoot = a
    },
    webRoot: null,
    siteInfo: require("siteinfo.js"),
    currentPage: null,
    pageOnLoad: function(t) {
        this.setPageNavbar(t)
    },
    pageShowToast: function(t) {
        console.log("--- pageToast ---");
        var e = this.currentPage,
            a = t.duration || 2500,
            n = t.title || "",
            o = (t.success, t.fail, t.complete || null);
        e._toast_timer && clearTimeout(e._toast_timer), e.setData({
            _toast: {
                title: n
            }
        }), e._toast_timer = setTimeout(function() {
            var t = e.data._toast;
            t.hide = !0, e.setData({
                _toast: t
            }), "function" == typeof o && o()
        }, a)
    },
    setPageNavbar: function(t) {
        function e(e) {
            var a = !1,
                n = t.route || t.__route__ || null;
            console.log(t.route, "route-----------------------");
            for (var o in e.navbar) e.navbar[o].url === "/" + n ? a = e.navbar[o].active = !0 : e.navbar[o].active = !1;
            a && t.setData({
                nav: e.navbar
            })
        }
        var n = this;
        console.log("----setPageNavbar----");
        var o = wx.getStorageSync("nav");
        console.log(t, "nav207"), o && e(o), n.request({
            url: a.
            default.navlist,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(t) {
                1 == t.code && (e(t.data), wx.setStorageSync("nav", t.data))
            }
        })
    },
    navigatorClick: function(t, e) {
        var a = t.currentTarget.dataset.open_type;
        if ("navigate" == a && wx.navigateTo({
            url: t.currentTarget.dataset.url
        }), "redirect" == a) return !0;
        if ("wxapp" == a) {
            var n = t.currentTarget.dataset.path;
            "/" != n.substr(0, 1) && (n = "/" + n)
        }
        if ("tel" == a) {
            var o = t.currentTarget.dataset.tel;
            wx.makePhoneCall({
                phoneNumber: o
            })
        }
        return !1
    }
});