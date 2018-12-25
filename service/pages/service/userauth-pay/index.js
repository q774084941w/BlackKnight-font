var t = require("../../../../api.js"), e = getApp();


Page({
    data: {
     
    },
    onLoad: function(n) {
        var a = this;
        e.request({
            url: t.default.userinfo,
            method: "post",
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(n) {
                1 != n.data.cashstatus ? e.request({
                    url: t.user.balance,
                    data: {
                        bid: wx.getStorageSync("bid")
                    },
                    success: function(t) {
                        a.setData({
                            money: t.money
                        });
                    }
                }) : e.request({
                    url: t.user.balance,
                    data: {
                        cid: wx.getStorageSync("cash").cid
                    },
                    success: function(t) {
                        a.setData({
                            money: t.money
                        });
                    }
                }), a.setData({
                    status: n.data.cashstatus
                });
            }
        });
    },
    pay: function() {
      wx.redirectTo({
        url: "../index/index"
      });
        e.request({
          url: t.default.insertPrice,
          data: {
            uid: wx.getStorageSync("uid"),
            bid: wx.getStorageSync("bid")
          },
          
                    success: function(n) {
                        1 == n.code ? e.request({
                          url: t.order.yezfbzj,
                          method: "post",
                          data: {
                            order_no: n.order_no,
                            money:500,
                            uid: wx.getStorageSync("uid")
                          },
                         
                          success:function(n){
                            console.log(n)
                           
                              n && wx.showToast({
                                    title: "支付成功",
                                    duration: 2e3,
                                    success: function() {
                                        e.request({
                                            url: t.default.userinfo,
                                            method: "post",
                                            data: {
                                                uid: wx.getStorageSync("uid")
                                            },
                                            success: function(t) {
                                                wx.setStorage({
                                                    key: "cash",
                                                    data: t.data
                                                }), setTimeout(function() {
                                                    wx.redirectTo({
                                                        url: "../index/index"
                                                    });
                                                }, 2e3);
                                            }
                                        });
                                    }
                                });
                            
                          } 
                        })
                                     : wx.showModal({
                            title: "提示",
                            content: "支付失敗"
                        });
                    }
          
        });
        // e.request({
        //     url: t.default.insertPrice,
        //     data: {
        //         uid: wx.getStorageSync("uid"),
        //         bid: wx.getStorageSync("bid")
        //     },
        //     success: function(n) {
        //         1 == n.code ? e.request({
        //             url: t.default.orderpay,
        //             data: {
        //                 order_no: n.order_no,
        //                 title: "保證金",
        //                 uid: wx.getStorageSync("uid")
        //             },
        //             success: function(n) {
        //                 1 == n.code ? wx.requestPayment({
        //                     timeStamp: n.data.weixin.timeStamp,
        //                     nonceStr: n.data.weixin.nonceStr,
        //                     package: n.data.weixin.package,
        //                     signType: "MD5",
        //                     paySign: n.data.weixin.paySign,
        //                     success: function(n) {
        //                         n && wx.showToast({
        //                             title: "支付成功",
        //                             duration: 2e3,
        //                             success: function() {
        //                                 e.request({
        //                                     url: t.default.userinfo,
        //                                     method: "post",
        //                                     data: {
        //                                         uid: wx.getStorageSync("uid")
        //                                     },
        //                                     success: function(t) {
        //                                         wx.setStorage({
        //                                             key: "cash",
        //                                             data: t.data
        //                                         }), setTimeout(function() {
        //                                             wx.redirectTo({
        //                                                 url: "../index/index"
        //                                             });
        //                                         }, 2e3);
        //                                     }
        //                                 });
        //                             }
        //                         });
        //                     }
        //                 }) : wx.showModal({
        //                     title: "提示",
        //                     content: "支付失敗"
        //                 });
        //             }
        //         }) : wx.showModal({
        //             title: "提示",
        //             content: "支付失敗"
        //         });
        //     }
        // });
    },
    outpay: function() {
        wx.showModal({
            title: "提示",
            content: "您確定要退還押金？",
            success: function(n) {
                n.confirm ? wx.showModal({
                    title: "提示",
                    content: "退款需要人工稽核，退還到銀行卡",
                    success: function(n) {
                        e.request({
                            url: t.user.bank,
                            method: "post",
                            data: {
                                cid: wx.getStorageSync("cash").cid
                            },
                            success: function(n) {
                                null == n.cardnumber || null == n.name || null == n.cid ? e.request({
                                    url: t.order.out_balance,
                                    method: "post",
                                    data: {
                                        bid: wx.getStorageSync("bid"),
                                        cid: wx.getStorageSync("cash").cid
                                    },
                                    success: function(a) {
                                        1 == a.code ? wx.showToast({
                                            title: "退款成功",
                                            duration: 2e3,
                                            success: function() {
                                                e.request({
                                                    url: t.default.userinfo,
                                                    method: "post",
                                                    data: {
                                                        uid: wx.getStorageSync("uid")
                                                    },
                                                    success: function(t) {
                                                        wx.setStorage({
                                                            key: "cash",
                                                            data: t.data
                                                        }), wx.redirectTo({
                                                            url: "../auth-success/index"
                                                        });
                                                    }
                                                });
                                            }
                                        }) : wx.showModal({
                                            title: "提示",
                                            content: n.msg
                                        });
                                    }
                                }) : wx.showModal({
                                    title: "提示",
                                    content: "請先添加銀行卡資訊",
                                    showCancel: !1
                                });
                            }
                        });
                    }
                }) : console.log("-------");
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});