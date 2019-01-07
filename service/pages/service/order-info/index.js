var t = require("../../../../api.js"), e = require("../../../../qqmap-wx.js"), a = getApp(), o = wx.createInnerAudioContext();

Page({
    data: {
        confirmCodeStatus: !1,
        shou: "",
        fa: "",
        distype: "",
        soundRecording: {
            tempPath: "",
            duration: "",
            isPlay: !1
        },
        markers: [],
        latitude: 0,
        longitude: 0,
        controls: [ {
            id: 1,
            iconPath: "/sd_liferuning/resource/common/image/timg.jpg",
            position: {
                left: 0,
                top: 250,
                width: 50,
                height: 50
            },
            clickable: !0
        } ],
      hiddenmodalput:true,
      yupay:0.00,
      dianpay:0.00,
      getpay:0.00,
      uid:0,
      runid:0,
      orderid:0,
      worth_type:0,
      pay_type: 0,
    },
    markertap: function(t) {
        var e = this, a = t.markerId, o = e.data.markers[a];
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                var e = o.latitude, a = o.longitude;
                wx.openLocation({
                    latitude: e,
                    longitude: a,
                    scale: 28
                });
            }
        });
    },
    onLoad: function(i) {
        var n = this;
        n.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), wx.getLocation({
            type: "wgs84",
            success: function(t) {
                var e = t.latitude, a = t.longitude;
                n.setData({
                    latitude: e,
                    longitude: a
                });
            }
        }), a.request({
            url: t.default.stores,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(t) {
                console.log(t), n.setData({
                    distype: t.bid
                });
            }
        }), a.request({
            url: t.default.ServerOrderInfor,
            data: {
                orderid: i.id
            },
            success: function(t) {
                console.log("訂單詳情", t);
                var a = t.data;
                "" != a.yinpin && 0 != a.yinpin && (o.src = a.yinpin, o.autoplay = !0, n.data.soundRecording.tempPath = a.yinpin, 
                n.data.soundRecording.duration = o.duration), n.setData({
                    data: t.data,
                    yupay: t.data.pre_price,
                    dianpay: t.data.worth,
                    uid: t.data.uid,
                    runid: t.data.rid,
                    orderid: t.data.id,
                    worth_type: t.data.worth_type,
                }), "帮我买" == a.type ? n.setData({
                    fa: "購買地址",
                    shou: "收貨地址"
                }) : "帮我送" == a.type ? n.setData({
                    fa: "取貨地址",
                    shou: "收貨地址"
                }) : "代排队" == a.type || "排队" == a.type || "代办" == a.type ? n.setData({
                    fa: "取貨地址",
                    shou: "服務地址"
                }) : "家政" == a.type ? n.setData({
                    fa: "服務地址"
                }) : "代驾" == a.type ? n.setData({
                    fa: "代駕終點",
                    shou: "代駕起點"
                }) : "代排队" != a.type && "排队" != a.type || n.setData({
                    fa: "服務地址"
                });
                var i = new e({
                    key: "EKJBZ-72L3P-FHXDL-VSLEP-JEAGJ-JTFSD"
                }), s = "";

              t.data.myadds == '就近購買五公里內就近購買，費用按五公里計算。' ?  
              s = t.data.mudadds  : s = "代排队" == t.data.type || "排队" == t.data.type ? t.data.mudadds : t.data.myadds, 
               
              console.log(s)
                i.geocoder({
                    address: s,
                    success: function(e) {
                      console.log(e);
                        var a = n.data.markers;
                        a.push({
                            iconPath: "/sd_liferuning/resource/common/image/mudadds.png",
                            id: 0,
                            latitude: e.result.location.lat,
                            longitude: e.result.location.lng,
                            width: 30,
                            height: 30,
                            callout: {
                                content: n.data.fa,
                                color: "#FFFFFF",
                                fontSize: 12,
                                borderRadius: 3,
                                bgColor: "#0FA9F6",
                                display: "ALWAYS",
                                textAlign: "textAlign",
                                padding: 10
                            }
                        }), n.setData({
                            markers: a
                        }), i.geocoder({
                            address: t.data.mudadds,
                            success: function(t) {
                                var e = n.data.markers;
                                e.push({
                                    iconPath: "/sd_liferuning/resource/common/image/myadds.png",
                                    id: 1,
                                    latitude: t.result.location.lat,
                                    longitude: t.result.location.lng,
                                    width: 30,
                                    height: 30,
                                    callout: {
                                        content: n.data.shou,
                                        color: "#FFFFFF",
                                        fontSize: 12,
                                        borderRadius: 3,
                                        bgColor: "#0FA9F6",
                                        display: "ALWAYS",
                                        textAlign: "textAlign",
                                        padding: 10
                                    }
                                }), n.setData({
                                    markers: e
                                }), console.log("两个标注", n.data.markers);
                            }
                        });
                    }
                });
            }
        });
    },
    toPhone: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.phone
        });
    },
    GiveOrder: function(e) {
        a.request({
            url: t.default.GiveOrder,
            data: {
                orderid: e.currentTarget.dataset.id,
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            success: function(o) {
                console.log("订单详情", o.data), 1 == o.data && (a.request({
                    url: t.user.mess,
                    data: {
                        bid: wx.getStorageSync("bid"),
                        order_no: e.currentTarget.dataset.order_no,
                        type: "order"
                    },
                    success: function(t) {
                        console.log(t);
                    }
                }), wx.showToast({
                    title: "恭喜，搶單成功啦！",
                    duration: 1e3,
                    success: function() {
                        setTimeout(function() {
                            wx.redirectTo({
                                url: "/service/pages/service/index/index"
                            });
                        }, 1e3);
                    }
                }));
            }
        });
    },
    OkOrder: function(e) {
        var o = this;
        wx.showLoading({
          title: '結算中...',
        })
        a.request({
            url: t.default.OkOrder,
            data: {
                orderid: e.currentTarget.dataset.id,
                bid: wx.getStorageSync("bid"),
                uid: wx.getStorageSync("uid"),
                pay_type: o.data.pay_type,
                code: o.data.confirmCode ? o.data.confirmCode : ""
            },
            success: function(t) {
                console.log("订单详情", t), 1 == t.code ? 
                wx.showToast({
                    title: t.msg,
                    duration: 1e3,
                    success: function() {
                        setTimeout(function() {
                            wx.redirectTo({
                                url: "/service/pages/service/index/index"
                            });
                        }, 1e3);
                    }
                }) : wx.showToast({
                    title: t.msg,
                    icon: 'none',
                    duration: 1e3,
                });
            }
        });
    },
  OkWorth: function (e) {
    var o = this;
    a.request({
      url: t.default.OkWorth,
      data: {
        orderid: e.currentTarget.dataset.id,
        bid: wx.getStorageSync("bid"),
        uid: wx.getStorageSync("uid"),
        code: o.data.ConfirmWorth ? o.data.ConfirmWorth : ""
      },
      success: function (t) {
        console.log("订单详情", t), wx.showToast({
          title: "等待結算",
          duration: 1e3,
          success: function () {
            setTimeout(function () {
              wx.redirectTo({
                url: "/service/pages/service/index/index"
              });
            }, 1e3);
          }
        }) ;
      }
    });
  },
    inputConfirmCode: function(t) {
        this.setData({
            confirmCode: t.detail.value
        });
   },
    inputConfirmWorth: function (t) {
      this.setData({
        ConfirmWorth: t.detail.value
      });
    },
    
    maps: function(t) {
        var e = this, a = t.currentTarget.dataset.id;
        
        var o = e.data.markers[a];
      console.log("marke", e.data.markers),
        !o ? (wx.showToast({
          title: "未能獲取到位置,請電話確認",
          icon: "none",
          mask: !0
        }), !1)
        : wx.getLocation({
            type: "gcj02",
            success: function(t) {
                var e = o.latitude, a = o.longitude;
                wx.openLocation({
                    latitude: e,
                    longitude: a,
                    scale: 28
                });
            },
        });
    },
    soundRecordingPlay: function() {
        var t = this, e = o.paused, a = t.data.soundRecording;
        e ? (o.play(), a.isPlay = !0, setTimeout(function() {
            var e = t.data.soundRecording;
            e.isPlay = !1, t.setData({
                soundRecording: e
            });
        }, 1e3 * a.duration)) : (o.stop(), a.isPlay = !1), t.setData({
            soundRecording: a
        });
    },
    previewPic: function(t) {
        var e = t.currentTarget.dataset.value;
        console.log(t), wx.previewImage({
            current: e,
            urls: [ e ]
        });
    },
    changeConfirmCodeStatus: function() {
      var t=this.data;
      if(t.worth_type==0){
        if (t.yupay < t.dianpay) {
          var payment = t.dianpay - t.yupay;
          this.setData({
            hiddenmodalput: !this.data.hiddenmodalput,
            getpay: payment.toFixed(2)

          })
        } else {
          this.setData({
            confirmCodeStatus: !this.data.confirmCodeStatus
          });
        } 
      }else{
        this.setData({
          confirmCodeStatus: !this.data.confirmCodeStatus
        });
      }
       
    },
  changeConfirmCodeStatus1:function(){
      console.log(this.data.distype), 1 == this.data.distype && this.setData({
             confirmCodeStatus: !this.data.confirmCodeStatus
         });
  },
  //现金按钮  
  cancel: function () {
    
    this.setData({
      hiddenmodalput: true,
      confirmCodeStatus: !this.data.confirmCodeStatus,
      pay_type: 1
    });
    
      
    
  },
  //钱包确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true,
      confirmCodeStatus: !this.data.confirmCodeStatus,
      pay_type: 2
    })
  }
});