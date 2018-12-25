/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var e = require("../../../../api.js"),
    t = (require("../../../../qqmap-wx.js"), getApp()),
    o = wx.createInnerAudioContext();
Page(function(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e
}({
    data: {
        num: 0,
        orderid: '',
        commentContent: '',
        orderStatus: 1,
        orderText: "已取單",
        soundRecording: {
            tempPath: "",
            duration: "",
            isPlay: !1
        }
    },
    onLoad: function(n) {
        var a = this;
        a.setData({
            star1:1,
            star2: 2,
            star3: 3,
            num_star:0,
            src1: 'http://83img.chaojiyuanma.com/img/star1.png',
            src2: 'http://83img.chaojiyuanma.com/img/star1.png',
            src3: 'http://83img.chaojiyuanma.com/img/star1.png',
            src4: 'http://83img.chaojiyuanma.com/img/star1.png',
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), console.log("订单id", n), t.request({
            url: e.
            default.getOrderInfo,
            data: {
                orderid: n.orderid
            },
            success: function(e) {
                console.log(e);
                var t = e.data;
                console.log(t), "" != t.yinpin && 0 != t.yinpin && (o.src = t.yinpin, o.autoplay = !0, a.data.soundRecording.tempPath = t.yinpin, a.data.soundRecording.duration = o.duration), a.setData({
                    data: e.data,
                    order_no:e.data.order_no,
                    orderid: e.data.id,
                    num_star: e.data.num_star,
                    src1: 'http://83img.chaojiyuanma.com/img/star.png',
                    src2: 'http://83img.chaojiyuanma.com/img/star.png',
                    src3: 'http://83img.chaojiyuanma.com/img/star.png',
                    src4: 'http://83img.chaojiyuanma.com/img/star1.png',
                    commentContent: e.data.why_text,
                });
              console.log(t.why_text)
            }
        }), wx.request({
            url: e.
            default.getPhone,
            data: {
                bid: wx.getStorageSync("bid")
            },
            method: "get",
            success: function(e) {
                a.setData({
                    phoneNumber: e.data.data.phone
                })
            }
        })
    },
    callPhone: function() {
        var e = this;
        wx.makePhoneCall({
            phoneNumber: e.data.phoneNumber
        })
  },
  toPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
    
    cancelOrder: function(o) {
        console.log("订单号", o.currentTarget.dataset.order_no), wx.showModal({
            title: "提示",
            content: "您是否取消訂單，紅包不予退款",
            success: function(n) {
                1 == n.confirm && t.request({
                    url: e.order.out_price,
                    data: {
                        order_no: o.currentTarget.dataset.order_no
                    },
                    method: "POST",
                    success: function(n) {
                        1 == n.code ? (console.log(n), wx.showToast({
                            title: "退款成功",
                            duration: 1e3,
                            success: function() {
                                setTimeout(function() {
                                    t.request({
                                        url: e.user.mess,
                                        data: {
                                            bid: wx.getStorageSync("bid"),
                                            openid: wx.getStorageSync("openid"),
                                            order_no: o.currentTarget.dataset.order_no,
                                            type: "cancel"
                                        },
                                        success: function(e) {
                                            console.log(e)
                                        }
                                    }), wx.redirectTo({
                                        url: "../order-list/index"
                                    })
                                }, 1e3)
                            }
                        })) : wx.showModal({
                            title: "提示",
                            content: "退款失敗"
                        })
                    }
                })
            }
        })
  },
  confirmOrder: function (o) {
    wx.showModal({
      title: "提示",
      content: "您是否確認收貨",
      success: function (n) {
        1 == n.confirm && t.request({
          url: e.order.confirmOrder,
          data: {
            order_no: o.currentTarget.dataset.order_no
          },
          method: "POST",
          success: function (e) {
            1 == e.code ? (console.log(e), wx.showToast({
              title: "成功",
              icon: "succes",
              duration: 1e3,
              mask: !0
            }), setTimeout(function () {
              wx.navigateBack()
            }, 1e3)) : wx.showModal({
              title: "提示",
              content: "收貨失敗"
            })
          }
        })
      }
    })
  },
  payWorth: function (o) {
    // console.log(o)
         t.request({
           url: e.order.payWorth,
          data: {
            order_no: o.currentTarget.dataset.order_no,
            orderid: o.currentTarget.dataset.id,
            uid: wx.getStorageSync("uid"),
            worth: o.currentTarget.dataset.numbers,
            formId: o.detail.formId,
          },
          method: "POST",
          success: function (e) {
            1 == e.code ? (console.log(e), wx.showToast({
              title: e.msg,
              icon: "succes",
              duration: 1e3,
              mask: !0
            }), setTimeout(function () {
                wx.navigateBack()
            }, 1e3)) : wx.showModal({
              title: "提示",
              content: e.msg
            })
          }
        })
   
  },
    comment: function () {
        var t=this;
          t.setData({
            orderComment: 3,
          });
          
        
    },
    oneStar: function () {
      var t = this;
      t.setData({
        num:1,
        src1: 'http://83img.chaojiyuanma.com/img/star.png',
        src2: 'http://83img.chaojiyuanma.com/img/star1.png',
        src3: 'http://83img.chaojiyuanma.com/img/star1.png',
      })
    },
    twoStar: function () {
      var t = this;
      t.setData({
        num: 2,
        src2: 'http://83img.chaojiyuanma.com/img/star.png',
        src1: 'http://83img.chaojiyuanma.com/img/star.png',
        src3: 'http://83img.chaojiyuanma.com/img/star1.png',
      })
    },
    threeStar: function () {
      var t = this;
      t.setData({
        num: 3,
        src3: 'http://83img.chaojiyuanma.com/img/star.png',
        src2: 'http://83img.chaojiyuanma.com/img/star.png',
        src1: 'http://83img.chaojiyuanma.com/img/star.png',
      })
    },
    bindTextAreaBlur: function (e) {
      this.setData({
        commentContent: e.detail.value
      })

    }, 
    formSubmit:function(o){
    
      console.log(this.data.orderid), console.log(this.data.num),
        console.log(this.data.commentContent)
      wx.request({
        url: e.
          order.commentSave,
        
        data: {
          comment: this.data.commentContent,
          num:this.data.num,
          orderNo: this.data.orderid

        },
        method: "post",
        success: function (e) {
          console.log(e)
          1 == e.data.code ? (console.log(e.data.code), wx.showToast({
            title: "成功",
            icon: "succes",
            duration: 1e3,
            mask: !0
          }), setTimeout(function () {
            wx.navigateBack()
          }, 1e3)) : wx.showModal({
            title: "失敗",
            content: "評論失敗"
          })
        
        }
      })
    },
    previewPic: function() {
        wx.previewImage({
            current: this.data.data.xphoto,
            urls: [this.data.data.xphoto]
        })
    },
    soundRecordingPlay: function() {
        var e = this,
            t = o.paused,
            n = e.data.soundRecording;
        t ? (o.play(), n.isPlay = !0, setTimeout(function() {
            var t = e.data.soundRecording;
            t.isPlay = !1, e.setData({
                soundRecording: t
            })
        }, 1e3 * n.duration)) : (o.stop(), n.isPlay = !1), e.setData({
            soundRecording: n
        })
    }
}, "previewPic", function(e) {
    var t = e.currentTarget.dataset.value;
    wx.previewImage({
        current: t,
        urls: [t]
    })
      
}));