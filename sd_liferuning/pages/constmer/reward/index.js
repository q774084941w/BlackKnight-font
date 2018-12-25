/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:49*/
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
var n = wx.getRecorderManager(),
    s = wx.createInnerAudioContext(),
    r = require("../../../../api.js"),
    o = require("../../../../qqmap-wx.js"),
    d = getApp();
Page({
    data: {
        timeArr: null,
        cid: "",
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
        time: "",
        price: 0,
        reward: 0,
        coupon: 0,
        lastPrice: 0,
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
        show: !1,
        yinpin: "",
        cancelWithMask: !0,
        pictrueTempPath: "",
        data: "",
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
        cancelText: "取消"
    },
    couponurl: function() {
        var e = this;
        d.request({
            url: r.Coupon.coupon,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                console.log(t), e.setData({
                    couponArr: t.data
                })
            }
        })
    },
    naveClick: function(e) {
        d.navigatorClick(e, this)
    },
    onLoad: function(e) {
        d.pageOnLoad(this);
        var t = this;
        t.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background",
            cid: e.cid
        }), e.addressId ? t.setData({
            time: e.time,
            price: e.price,
            reward: e.reward,
            coupon: e.coupon,
            lastPrice: e.lastPrice,
            addressId: e.addressId,
            inputAddressText: e.inputAddressText,
            wareText: e.wareText,
            cid: e.cid
        }) : t.setData({
            wareText: e.wareText
        });
        var a = this,
            n = [];
        d.request({
            url: r.
            default.timelist,
            data: {
                time: 0
            },
            success: function(e) {
                n[0] = i._weekArr, n[1] = e.data, a.setData({
                    timeArr: n
                })
            }
        });
        var s = e.id;
        d.request({
            url: r.
            default.classBq,
            data: {
                bid: wx.getStorageSync("bid"),
                id: s
            },
            success: function(e) {
                console.log(e), "" == e.data ? wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/index/index"
                }) : "" != e.data.biaoqian ? t.setData({
                    wareText: e.data.name,
                    biaoqian: e.data.biaoqian
                }) : t.setData({
                    wareText: e.data.name,
                    biaoqian: []
                })
            }
        })
    },
    onShow: function(e) {
        var t = this;
        t.couponurl(), d.request({
            url: r.
            default.mrAddress,
            data: {
                bid: wx.getStorageSync("bid"),
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                console.log("地址", e), "" == e.data ? wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/address-list/index"
                }) : t.setData({
                    detail_info: e.data.adress,
                    username: e.data.name,
                    phone: e.data.phone,
                    uaid: e.data.uaid
                })
            }
        }), d.request({
            url: r.
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
            url: r.user.rewardmoney,
            data: "",
            method: "post",
            success: function(e) {
                console.log("rerere", e.data);
                var a = e.data;
                t.setData({
                    data: a
                })
            }
        })
    },
    GetAddress: function() {
        var e = this;
        wx.chooseLocation({
            success: function(t) {
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
            complete: function(t) {
                if ("" != e.data.detail_info && void 0 != e.data.wd && void 0 != e.data.jd && "" != e.data.detail_infos && "" != e.data.wd && "" != e.data.jd) {
                    var a = e.data.wd,
                        i = e.data.jd;
                    new o({
                        key: "EKJBZ-72L3P-FHXDL-VSLEP-JEAGJ-JTFSD"
                    }).geocoder({
                        address: e.data.detail_info,
                        success: function(t) {
                            d.request({
                                url: r.
                                default.addprice,
                                metho: "post",
                                data: {
                                    myaddsjd: t.result.location.lng,
                                    myaddswd: t.result.location.lat,
                                    mudaddswd: a,
                                    mudaddsjd: i,
                                    bid: wx.getStorageSync("uid")
                                },
                                success: function(t) {
                                    var a = e.data.didianprice;
                                    console.log(a), console.log("金额", t), e.setData({
                                        didianprice: t.data,
                                        price: e.data.price - a + t.data
                                    }), e.countPrice()
                                }
                            })
                        }
                    })
                }
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
                url: r.
                default.time_price,
                data: {
                    wid: t.data.timeArr[0][i[0]].name,
                    hid: t.data.timeArr[1][i[1]].name
                },
                success: function(e) {
                    t.data.timeprice;
                    console.log(e), t.setData({
                        timeprice: e.data
                    }), t.countPrice()
                }
            })
        }
        "reward" == a && t.setData({
            reward: t.data.rewardArr[i].price
        }), "coupon" == a && t.setData({
            coupon: t.data.couponArr[i].price,
            useid: t.data.couponArr[i].id
        }), t.countPrice()
    },
    bindColumnChange: function(e) {
        var t = this,
            a = t.data.timeArr,
            i = e.detail.column,
            n = e.detail.value;
        0 == i && d.request({
            url: r.
            default.timelist,
            data: {
                time: n
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
            t = Number(e.data.price) + Number(e.data.timeprice) + Number(e.data.ins) + Number(e.data.reward) - Number(e.data.coupon);
        t < .01 && (t = .01), e.setData({
            lastPrice: t
        })
    },
    changeInputData: function(e) {
        var t = this,
            a = e.currentTarget.dataset.name,
            i = e.detail.value;
        "wareText" == a && t.setData({
            wareText: i
        }), "inputAddressText" == a && t.setData({
            inputAddressText: i
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
                            url: r.
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
    formSubmit: function(e) {
        console.log(e);
        var t = this,
            a = t.data.pictrueTempPath,
            i = t.data.yinpin;
        ("" != e.detail.value.goodsname || "" != a || "" != i) && e.detail.value.mudadds && e.detail.value.myadds && "NaN" != e.detail.value.mytimes ? (console.log(a), console.log(i), e.detail.value.xphoto = a, e.detail.value.yinpin = i, console.log("e.detail.value", e.detail.value), t.setData({
            formData: e.detail.value,
            formId: e.detail.formId
        }), t.openActionsheet()) : wx.showToast({
            title: "資訊不完善，無法下單。"
        })
    },
    addWareItem: function(e) {
        var t = this,
            a = e.currentTarget.dataset.tag,
            i = t.data.wareText;
        t.setData({
            wareText: i + ", " + a
        }), console.log(a)
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
            n = t.detail.index;
        switch (this.setData((a = {}, e(a, "actions[" + n + "].loading", !0), e(a, "actionType", n), a)), n) {
            case 0:
                wx.showToast({              title: "暫未開通"            });
                break;
            case 1:
                this.balancePay()
        }
        setTimeout(function() {
            var t;
            i.setData((t = {}, e(t, "show", !1), e(t, "actions[" + n + "].loading", !1), t))
        }, 100)
    },
    wechatPay: function() {
        var e = this,
            t = e.data.formData;
        console.log("表单数据=>", t), console.log("微信支付"), d.request({
            url: r.
            default.insertorder,
            data: {
                distype: t.distype,
                goodsname: t.goodsname,
                mudadds: t.mudadds,
                myadds: t.myadds,
                times: t.mytimes,
                price: .01,
                uid: wx.getStorageSync("uid"),
                redbao: t.redbao,
                xphoto: t.xphoto,
                yinpin: t.yinpin,
                tip: t.tip,
                bid: wx.getStorageSync("bid"),
                ins: t.ins,
                message: t.message,
                type: 8,
                username: t.username,
                phone: t.phone
            },
            success: function(t) {
                t.data && d.request({
                    url: r.
                    default.orderpay,
                    data: {
                        order_no: t.data,
                        title: "微猫源码 提供   QQ:2058430070支付",
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
                                console.log("支付成功", a), e.data.useid && d.request({
                                    url: r.Coupon.status,
                                    data: {
                                        useid: e.data.useid
                                    },
                                    success: function(e) {
                                        console.log(e)
                                    }
                                }), d.request({
                                    url: r.user.mess,
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
                            complete: function(e) {}
                        })
                    }
                })
            }
        })
    },
    balancePay: function() {
        var e = this,
            t = e.data.formData,
            a = e.data.formId;
        console.log("表单数据=>", t), d.request({
            url: r.
            default.insertorder,
            data: {
                distype: t.distype,
                goodsname: t.goodsname,
                mudadds: t.mudadds,
                myadds: t.myadds,
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
                type: e.data.cid,
                username: t.username,
                phone: t.phone
            },
            success: function(e) {
                1 == e.code && d.request({
                    url: r.order.pricePay,
                    method: "post",
                    data: {
                        uid: wx.getStorageSync("uid"),
                        order_no: e.data,
                        openid: wx.getStorageSync("openid"),
                        formId: a
                    },
                    success: function(e) {
                        1 == e.code ? wx.showToast({
                            title: e.msg,
                            duration: 1e3,
                            success: function() {
                                setTimeout(function() {
                                    wx.redirectTo({
                                        url: "/sd_liferuning/pages/constmer/order-list/index"
                                    })
                                }, 1e3)
                            }
                        }) : wx.showToast({
                            title: e.msg
                        })
                    }
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
        n.start(e)
    },
    soundRecordingEnd: function() {
        var e = this;
        n.stop(), n.onStop(function(t) {
            var a = t.tempFilePath,
                i = Math.ceil(t.duration / 1e3);
            s.src = a, e.setData({
                soundRecording: {
                    tempPath: a,
                    duration: i,
                    isPlay: !1
                }
            });
            var n = e.data.soundRecording.tempPath;
            n && (console.log("tempPath", n), wx.uploadFile({
                url: r.order.uploadimg,
                filePath: n,
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
            t = s.paused,
            a = e.data.soundRecording;
        t ? (s.play(), a.isPlay = !0, setTimeout(function() {
            var t = e.data.soundRecording;
            t.isPlay = !1, e.setData({
                soundRecording: t
            })
        }, 1e3 * a.duration)) : (s.stop(), a.isPlay = !1), e.setData({
            soundRecording: a
        })
    },
    soundRecordingRemove: function() {
        var e = this;
        s.stop(), e.setData({
            soundRecording: {
                tempPath: "",
                duration: "",
                isPlay: !1
            }
        })
    },
    takePictrue: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function(t) {
                var a = t.tempFilePaths;
                e.setData({
                    pictrueTempPath: a[0]
                })
            }
        })
    },
    handleStepperChange: function(t) {
        var a = t.detail,
            i = t.target.dataset.componentId;
        this.setData(e({}, i + ".stepper", a))
    },
    isBargaining: function(e) {
        var t = this.data.isBargaining;
        this.setData({
            isBargaining: !t
        })
    },
    isOpenPreference: function() {
        var e = this.data.isOpenPreference;
        this.setData({
            isOpenPreference: !e
        })
    },
    weightSliderChange: function(e) {
        var t = this,
            a = e.detail.value;
        t.setData({
            weight: a
        })
    },
    isOpenIntegralDeduction: function() {
        var e = this.data.isOpenIntegralDeduction;
        this.setData({
            isOpenIntegralDeduction: !e
        })
    }
});