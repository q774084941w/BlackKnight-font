/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e
}
function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var a = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t
    }
}(),
    i = new(function() {
        function e() {
            t(this, e), this._date = new Date, this._year = this._date.getFullYear(), this._month = this._date.getMonth() + 1, this._day = this._date.getDate(), this._hours = this._date.getHours(), this._minutes = this._date.getMinutes(), this._dayTag = this._date.getDay()
        }
        return a(e, [{
            key: "init",
            value: function() {
                this._todayTimeArr = [], this._defaultTimeArr = [], this._timeArr = [], this._weekArr = [], this._hourArr = [], this.createTodayTimeArr(this._todayTimeArr, this._hours, this._minutes), this.createDefaultTimeArr(this._defaultTimeArr);
                var e = void 0,
                    t = this._dayTag;
                for (e = 0; e < 14; e++) e > 0 && ++t, t > 13 && (t = 0), this._weekArr.push({
                    id: e,
                    name: this.switchWeek(t)
                })
            }
        }, {
            key: "createTodayTimeArr",
            value: function(e, t, a) {
                if (e) {
                    var i = void 0;
                    for (i = t; i < 24; i++) i == t ? a < 30 && e.push({
                        name: i + ":30"
                    }) : (e.push({
                        name: i + ":00"
                    }), e.push({
                        name: i + ":30"
                    }))
                }
            }
        }, {
            key: "createDefaultTimeArr",
            value: function(e) {
                if (e) {
                    var t = void 0;
                    for (t = 0; t < 24; t++) e.push({
                        name: t + ":00"
                    }), e.push({
                        name: t + ":30"
                    })
                }
            }
        }, {
            key: "switchWeek",
            value: function(e) {
                switch (e > 6 ? e - 7 : e) {
                    case 0:
                        return "星期天";
                    case 1:
                        return "星期一";
                    case 2:
                        return "星期二";
                    case 3:
                        return "星期三";
                    case 4:
                        return "星期四";
                    case 5:
                        return "星期五";
                    case 6:
                        return "星期六"
                }
                return -1
            }
        }]), e
    }());
i.init();
var r = wx.getRecorderManager(),
    n = wx.createInnerAudioContext(),
    s = require("../../../../api.js"),
    o = require("../../../../qqmap-wx.js"),
    d = getApp();
Page({
    data: {
        timeArr: null,
        cid: "",
        formId:"",
        distance:0,
        select_name: '電單車',
        weight_price: 0,
        rewardArr: [{
            price: 0,
            text: "0元"
        }, {
            price: 1,
            text: "1元"
        }, {
            price: 2,
            text: "2元"
        }, {
            price: 3,
            text: "3元"
        }, {
            price: 4,
            text: "4元"
        }, {
            price: 5,
            text: "6元"
        }, {
            price: 10,
            text: "10元"
        }, {
            price: 15,
            text: "15元"
        }, {
            price: 20,
            text: "20元"
        }],
        couponArr: [{
            price: 0,
            text: ""
        }],
        clickpay: !0,
        stepper: {
            stepper: 0
        },
        time: "",
        price: 0,
        reward: 0,
        coupon: 0,
        lastPrice: 0,
        vipprice: "",
        full_money: "",
        detail_info: "",
        addressId: "",
        wareText: "",
        didianprice: 0,
        timeprice: 0,
        inputAddressText: "",
        isReadProtocol: !0,
        isBargaining: !1,
        isOpenPreference: !1,
        isOpenIntegralDeduction: !1,
        integral: "",
        show: !1,
        cancelWithMask: !0,
        yinpin: "",
        proxy_id: 0,
        pictrueTempPath: "",
        soundRecording: {
            tempPath: "",
            duration: "",
            isPlay: !1
        },
        actions: [{
            name: "微信支付",
            subname: "微信支付正在升級維護中，敬請期待",
            className: "action-class",
            loading: !1
        }, {
            name: "餘額支付",
            subname: "平臺帳戶餘額支付,可通過錢包充值",
            className: "action-class",
            loading: !1
        }],
      weightTop: [
        {
          id: 5,
          name: '電單車',
          checked: '#20AF1F',
          weight: 0
        }, {
          id: 10,
          name: '私家車',
          checked: '',
          weight: 9
        }, {
          id: 20,
          name: '小貨車(暫未開放)',
          checked: '',
          weight: 44
        }],
        cancelText: "取消"
    },
    couponurl: function() {
        var e = this;
        d.request({
            url: s.Coupon.coupon,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                console.log("11111111111", t), e.setData({
                    couponArr: t.data
                })
            }
        })
    },
    xphoto: function() {
        var e = this;
        e.data.xphoto;
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function(t) {
                var a = t.tempFilePaths;
                wx.saveFile({
                    tempFilePath: a[0],
                    success: function(t) {
                        var a = t.savedFilePath;
                        wx.uploadFile({
                            url: s.
                            default.uploadfile,
                            filePath: a,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            name: "image",
                            success: function(t) {
                                var a = JSON.parse(t.data);
                                if (console.log("圖片:", a), 1 == a.code) {
                                    e.setData({
                                        pictrueTempPath: a.src
                                    })
                                } else wx.showModal({
                                    title: "提示",
                                    content: "圖片上傳失敗",
                                    showCancel: !1
                                })
                            },
                            fail: function(e) {
                                console.log("res fail", e)
                            }
                        })
                    }
                })
            }
        })
    },
    xphotos: function(e) {
        console.log("eee", e);
        var t = e.currentTarget.id;
        wx.navigateTo({
            url: "/sd_liferuning/pages/constmer/choose-pic/index?src=" + t
        })
    },
    onLoad: function(e) {
        var t = this;
        d.request({
            method: "POST",
            url: s.
            default.orderGetPageConfig,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                var a = e.status,
                    i = JSON.parse(e.diy);
                a && (wx.setNavigationBarTitle({
                    title: i.titleConfig.pageTitle
                }), wx.setNavigationBarColor({
                    frontColor: i.titleConfig.fontColor.toLocaleLowerCase(),
                    backgroundColor: i.titleConfig.navigationBgColor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    pageConfig: i
                }))
            }
        });
        var a = this;
        a.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), "非会员用户" == wx.getStorageSync("huiyuan") && a.setData({
            huiyuan: 1
        }), e.addressId ? a.setData({
            time: e.time,
            price: e.price,
            reward: e.reward,
            coupon: e.coupon,
            lastPrice: e.lastPrice,
            addressId: e.addressId,
            inputAddressText: e.inputAddressText,
            wareText: e.wareText,
            cid: e.cid
        }) : a.setData({
            wareText: e.wareText ? e.wareText : ""
        });
        var r = [];
        if (d.request({
            url: s.
            default.timelist,
            data: {
                time: 0
            },
            success: function(e) {
                console.log("============", e), r[0] = i._weekArr, r[1] = e.data, t.setData({
                    timeArr: r
                })
            }
        }), e.tags) {
            var n = e.tags.split(",");
            t.setData({
                tags: n
            })
        }
    },
    onShow: function(e) {
        var t = this;
        t.couponurl(), d.request({
            url: s.
            default.mrAddress,
            data: {
                bid: wx.getStorageSync("bid"),
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                console.log("地址1", e), "" == e.data.adress ? wx.showToast({
                    title: "請添加收貨地址",
                    icon: "succes",
                    duration: 1500,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateTo({
                                url: "/sd_liferuning/pages/constmer/address-list/index"
                            })
                        }, 2e3)
                    }
                }) : (t.setData({
                    detail_info: e.data.adress,
                    username: e.data.name,
                    phone: e.data.phone,
                    uaid: e.data.uaid
                }), t.AddressPrice())
            }
        }), d.request({
            url: s.
            default.Insprice,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                void 0 != e.data.insprice ? (t.setData({
                    ins: e.data.insprice
                }), t.countPrice()) : (t.setData({
                    ins: 0
                }), t.countPrice())
            }
        }), d.request({
            url: s.
            default.distype,
            data: {
                bid: wx.getStorageSync("bid")
            },
            success: function(e) {
                t.setData({
                    distype: e.data.distype
                })
            }
        });
        var a = this,
            i = d.pageOperate;
        i && 1 == i && a.setData({
            pictrueTempPath: ""
        })
    },
    GetAddress: function() {
        var e = this;
      wx.showModal({
        title: '提示',
        content: '由於騰訊地圖在澳門定位暫不精確，請在選擇地址時確認無誤。若不準確請手動拖動選擇，給您帶來的不便敬請諒解！',
        cancelText: "取消",//默认是“取消”
        confirmText: "確定",//默认是“确定”
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            wx.chooseLocation({
              success: function (t) {
                e.setData({
                  hasLocation: !0,
                  location: {
                    longitude: t.longitude,
                    latitude: t.latitude
                  },
                  detail_infos: t.address,
                  wd: t.latitude,
                  jd: t.longitude
                })
              },
              complete: function (t) {
                "" != e.data.detail_info && void 0 != e.data.wd && void 0 != e.data.jd && "" != e.data.detail_infos && "" != e.data.wd && "" != e.data.jd && e.AddressPrice()
              }
            })
            console.log('用户点击确定')
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
        
    },
    AddressPrice: function() {
      var e = this; console.log(e.data.detail_infos);
        void 0 != e.data.detail_infos && new o({
            key: "EKJBZ-72L3P-FHXDL-VSLEP-JEAGJ-JTFSD"
        }).geocoder({
            address: e.data.detail_info,
            success: function(t) {
                d.request({
                    url: s.
                    default.addprice,
                    metho: "post",
                    data: {
                        myaddsjd: t.result.location.lng,
                        myaddswd: t.result.location.lat,
                        mudaddswd: e.data.wd,
                        mudaddsjd: e.data.jd,
                        bid: wx.getStorageSync("bid")
                    },
                    success: function(t) {
                        var a = e.data.didianprice;
                        console.log(a), console.log("金额", t), e.setData({
                            didianprice: t.data.price,
                            price: e.data.price - a + t.data.price,
                            proxy_id: t.data.proxy_id ? t.data.proxy_id : 0,
                            distance: t.data.distance
                        }), e.countPrice()
                    }
                })
            }
        })
    },
    pickerSelector: function(e) {
        var t = this,
            a = e.currentTarget.dataset.type,
            i = e.detail.value;
        if ("time" == a) {
            t.setData({
                time: {
                    week: t.data.timeArr[0][i[0]],
                    hour: t.data.timeArr[1][i[1]]
                }
            });
            t = this;
            d.request({
                url: s.
                default.time_price,
                data: {
                    wid: t.data.timeArr[0][i[0]].name,
                    hid: t.data.timeArr[1][i[1]].name
                },
                success: function(e) {
                    t.data.timeprice;
                    console.log("sssss", e), t.setData({
                        timeprice: e.data
                    }), t.countPrice()
                }
            })
        }
        "reward" == a && t.setData({
            reward: t.data.rewardArr[i].price
        }), "coupon" == a && (t.setData({
            coupon: t.data.couponArr[i].price,
            full_money: t.data.couponArr[i].full_money,
            useid: t.data.couponArr[i].id
        }), t.data.lastPrice < t.data.full_money && wx.showToast({
            title: "未達到使用要求"
        })), t.countPrice()
    },
    bindColumnChange: function(e) {
        var t = this,
            a = t.data.timeArr,
            i = e.detail.column,
            r = e.detail.value;
        0 == i && d.request({
            url: s.
            default.timelist,
            data: {
                time: r
            },
            success: function(e) {
                a[1] = e.data, t.setData({
                    timeArr: a
                })
            }
        })
    },
    countPrice: function() {
        var e = this,
          t = Number(e.data.price) + Number(e.data.timeprice) + Number(e.data.reward) + Number(e.data.ins) + Number(e.data.stepper.stepper) + Number(e.data.weight_price) - Number(e.data.integral);
      t < e.data.full_money ? (t = Number(e.data.price) + Number(e.data.timeprice) + Number(e.data.reward) + Number(e.data.weight_price) + Number(e.data.ins) + Number(e.data.stepper.stepper) - Number(e.data.integral), e.setData({
            coupon: 0
      })) : t = Number(e.data.price) + Number(e.data.timeprice) + Number(e.data.reward) + Number(e.data.ins) + Number(e.data.weight_price) + Number(e.data.stepper.stepper) - Number(e.data.coupon) - Number(e.data.integral), t = t < .01 ? 0 : t, e.setData({
            lastPrice: t.toFixed(2)
        })
    },
    changeInputData: function(e) {
        console.log("地址", e);
        var t = this,
            a = e.currentTarget.dataset.name,
            i = e.detail.value;
        "wareText" == a && t.setData({
            wareText: i
        }), "inputAddressText" == a && t.setData({
            inputAddressText: i
        }), t.AddressPrice()
    },
    formSubmit: function(e) {
      this.setData({
        formId:e.detail.formId
      });
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
        var t = this,
            a = t.data.pictrueTempPath,
            i = t.data.yinpin;
        ("" != e.detail.value.goodsname || "" != a || "" != i) && e.detail.value.mudadds && e.detail.value.myadds && "NaN" != e.detail.value.mytimes && !0 === t.data.isReadProtocol ? (console.log(a), console.log(i), e.detail.value.xphoto = a, e.detail.value.yinpin = i, console.log("e.detail.value", e.detail.value), t.setData({
            formData: e.detail.value,
            formId: e.detail.formId
        }), t.openActionsheet()) : wx.showToast({
            title: "資訊不完善，無法下單。",
            icon: 'none',
            duration: 2000
        })
    },
    addWareItem1: function (e) {
      var t = this,
        a = e.currentTarget.dataset.tags;
      var m = t.data.didianprice;
        t.setData({
          wareText1: '五公里內就近購買，費用按五公里計算。',
          detail_infos:'就近購買',
          didianprice:40,
          distance : 5,
          price:t.data.price-m+40,
        }), t.countPrice()
    },
    addWareItem: function(e) {
        var t = this,
            a = e.currentTarget.dataset.tag,
            i = t.data.wareText,
            r = "" == i.trim() ? a : i + ", " + a;
        t.setData({
            wareText: r
        })
    },
    isRead: function(e) {
        var t = this.data.isReadProtocol;
        this.setData({
            isReadProtocol: !t
        })
    },
    radioChanged: function(e) {
        var t = e.detail.value;
        "bargaining" == e.currentTarget.dataset.name && this.setData({
            bargaining: t
        })
    },
    openActionsheet: function() {
        this.setData({
            show: !0
        })
    },
    closeActionSheet: function() {
        this.setData({
            show: !1
        })
    },
    clickAction: function(t) {
        var a, i = this,
            r = t.detail.index;
        switch (this.setData((a = {}, e(a, "actions[" + r + "].loading", !0), e(a, "actionType", r), e(a, "clickpay", !1), a)), r) {
            case 0:
            wx.showToast({
              title: "暫未開通"
            });
                // wx.showToast({              title: "暫未開通"            });
                break;
            case 1:
                this.balancePay()
        }
        setTimeout(function() {
            var t;
            i.setData((t = {}, e(t, "show", !1), e(t, "actions[" + r + "].loading", !1), t))
        }, 100)
    },
    /*wechatPay: function() {
      
        var e = this,
            t = e.data.formData;
        console.log("表单数据=>", t), d.request({
            url: s.
            default.insertorder,
            data: {
                distype: t.distype,
                goodsname: t.goodsname,
                mudadds: t.myadds,
                myadds: t.mudadds + t.mudaddsinfos,
                times: t.mytimes,
                price: t.price,
                uid: wx.getStorageSync("uid"),
                redbao: t.redbao,
                xphoto: t.xphoto,
                yinpin: t.yinpin,
                tip: t.tip,
                bid: wx.getStorageSync("bid"),
                ins: t.ins,
                message: t.message,
                type: "帮我买",
                proxy_id: e.data.proxy_id,
                username: t.username,
                phone: t.phone,
                audiotime: this.data.soundRecording.duration,
                imgurl: 0
            },
            success: function(t) {
                t.data && d.request({
                    url: s.
                    default.orderpay,
                    data: {
                        order_no: t.data,
                        title: "微猫源碼提供QQ:2058430070支付",
                        uid: wx.getStorageSync("uid")
                    },
                    success: function(t) {
                        console.log("支付参数", t.data.weixin), wx.requestPayment({
                            timeStamp: t.data.weixin.timeStamp,
                            nonceStr: t.data.weixin.nonceStr,
                            package: t.data.weixin.package,
                            signType: "MD5",
                            paySign: t.data.weixin.paySign,
                            success: function(a) {
                                console.log("支付成功", a), e.data.useid && (e.setData({
                                    clickpay: !0
                                }), d.request({
                                    url: s.Coupon.status,
                                    data: {
                                        useid: e.data.useid
                                    },
                                    success: function(e) {
                                        console.log(e)
                                    }
                                })), d.request({
                                    url: s.user.mess,
                                    data: {
                                        bid: wx.getStorageSync("bid"),
                                        openid: wx.getStorageSync("openid"),
                                        order_no: t.data.weixin.order_no,
                                        type: "apply"
                                    },
                                    success: function(e) {
                                        console.log(e)
                                    }
                                }), wx.redirectTo({
                                    url: "/sd_liferuning/pages/constmer/order-list/index"
                                })
                            },
                            fail: function(t) {
                                e.setData({
                                    clickpay: !0
                                })
                            },
                            complete: function(t) {
                                e.setData({
                                    clickpay: !0
                                })
                            }
                        })
                    }
                })
            }
        })
    },*/
    balancePay: function() {
        wx.showLoading({
            title: "正在支付"
        });
        var e = this,
            t = e.data.formData,
            a = e.data.formId;
      console.log(e.data)
        console.log("表单数据=>", t), d.request({
            url: s.
            default.insertorder,
            data: {
                distype: t.distype,
                goodsname: t.goodsname,
              select_name: e.data.select_name,
                mudadds: t.myadds,
                myadds: t.mudadds + t.mudaddsinfos,
                times: t.mytimes,
                price: t.price,
                uid: wx.getStorageSync("uid"),
                redbao: t.redbao,
                xphoto: t.xphoto,
                yinpin: t.yinpin,
                tip: t.tip,
                bid: wx.getStorageSync("bid"),
                ins: t.ins,
                message: t.message,
                type: "帮我买",
                username: t.username,
                phone: t.phone,
                distance: e.data.distance,
                proxy_id: e.data.proxy_id,
                audiotime: this.data.soundRecording.duration,
                imgurl: 0,
                id: this.data.formId
            },
            success: function(t) {
              console.log(t)
                e.setData({
                    clickpay: !0
                }), 1 == t.code ? d.request({
                    url: s.order.pricePay,
                    method: "post",
                    data: {
                        uid: wx.getStorageSync("uid"),
                        order_no: t.data,
                        openid: wx.getStorageSync("openid"),
                        formId: a
                    },
                    success: function(e) {
                    console.log(e)
                        wx.hideLoading(), 1 == e.code ? wx.showToast({
                            title: e.msg,
                            duration: 1e3,
                            success: function() {
                              wx.showModal({
                                title: '提示',
                                content: '代購商品需經車手確認商品金額后再次向車手支付，請確保您的錢包餘額充足 車手并無義務墊付資金，金額將支付給車手做爲墊付商品金額的交收！',
                                cancelText: "知道了",
                                confirmText: "立即充值",
                                success: function (res) {
                                  if (res.confirm) {//这里是点击了立即充值
                                    setTimeout(function () {
                                      wx.redirectTo({
                                        url: "/sd_liferuning/pages/constmer/balance-management/index"
                                      })
                                    }, 1e3)
                                    console.log('立即充值')
                                  } else {//这里是点击了知道了
                                    setTimeout(function () {
                                      wx.redirectTo({
                                        url:            "/sd_liferuning/pages/constmer/order-list/index"
                                      })
                                    }, 1e3)
                                    console.log('知道了')
                                  }
                                }
                              })
                                
                            }
                        }) : wx.showToast({
                            title: e.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }) : wx.showToast({
                  title: t.msg,
                    icon: 'none',
                    duration: 2000
                })
            },
            fail: function(t) {
                e.setData({
                    clickpay: !0
                })
            }
        }), console.log("餘額支付")
    },
    soundRecordingStart: function() {
        var e = {
            duration: 6e4,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192e3,
            format: "mp3",
            frameSize: 50
        };
        r.start(e)
    },
    soundRecordingEnd: function() {
        var e = this;
        r.stop(), r.onStop(function(t) {
            var a = t.tempFilePath,
                i = Math.ceil(t.duration / 1e3);
            n.src = a, e.setData({
                soundRecording: {
                    tempPath: a,
                    duration: i,
                    isPlay: !1
                }
            });
            var r = e.data.soundRecording.tempPath;
            r && (console.log("tempPath", r), wx.uploadFile({
                url: s.order.uploadimg,
                filePath: r,
                name: "file",
                success: function(t) {
                    console.log("resres", t);
                    var a = t.data;
                    e.setData({
                        yinpin: a
                    })
                }
            }))
        })
    },
    soundRecordingPlay: function() {
        var e = this,
            t = n.paused,
            a = e.data.soundRecording;
        t ? (n.play(), a.isPlay = !0, setTimeout(function() {
            var t = e.data.soundRecording;
            t.isPlay = !1, e.setData({
                soundRecording: t
            })
        }, 1e3 * a.duration)) : (n.stop(), a.isPlay = !1), e.setData({
            soundRecording: a
        })
    },
    soundRecordingRemove: function() {
        var e = this;
        n.stop(), e.setData({
            soundRecording: {
                tempPath: "",
                duration: "",
                isPlay: !1
            }
        })
    },
    handleStepperChange: function(t) {
        var a = t.detail,
            i = t.target.dataset.componentId;
        this.setData(e({}, i + ".stepper", a)), this.countPrice()
    },
    isBargaining: function(e) {
        var t = this.data.isBargaining;
        this.setData({
            isBargaining: !t
        })
    },
    isOpenPreference: function() {
        var e = this,
            t = this.data.isOpenPreference;
        0 == t ? wx.request({
            url: s.member.rebate,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            method: "get",
            success: function(t) {
                e.setData({
                    vipprice: t.data.data.zhekou
                })
            }
        }) : e.setData({
            vipprice: 0
        }), this.setData({
            isOpenPreference: !t
        })
    },
  takeWeight: function (e) {
    var that = this;
    var this_checked = e.currentTarget.dataset.id;
    if (this_checked == 20) {
      return false
    }
    var weight = e.currentTarget.dataset.num;
    var name = e.currentTarget.dataset.name;
    var parameterList = this.data.weightTop;//获取Json数组
    for (var i = 0; i < parameterList.length; i++) {
      if (parameterList[i].id == this_checked) {
        parameterList[i].checked = '#20AF1F';//当前点击的位置为true即选中
      }
      else {
        parameterList[i].checked = '#eee';//其他的位置为false
      }
    }
    that.setData({
      weightTop: parameterList,
      weight: this_checked,
      weight_price: weight,
      select_name: name
    }), that.countPrice()

  },
    isOpenIntegralDeduction: function() {
        var e = this,
            t = this.data.isOpenIntegralDeduction;
        0 == t ? wx.request({
            url: s.member.integral,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid")
            },
            method: "post",
            success: function(t) {
                e.setData({
                    integral: t.data.data.integral
                })
            }
        }) : e.setData({
            integral: 0
        }), this.setData({
            isOpenIntegralDeduction: !t
        })
    }
});