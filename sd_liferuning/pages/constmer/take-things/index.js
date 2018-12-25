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
var r = wx.getRecorderManager(),
    o = wx.createInnerAudioContext(),
    s = require("../../../../api.js"),
    n = require("../../../../qqmap-wx.js"),
    d = getApp(),
    c = require("../../../../utils/ArrayUtils.js");
Page({
    data: {
        timeArr: i._timeArr,
        hourArr: i._hourArr,
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
        stepper: {
            stepper: 0
        },
        time: "",
        vipprice: "",
        price: 0,
        reward: 0,
        coupon: 0,
        lastPrice: 0,
        weight_price: "",
        integral: "",
        yinpin: "",
        clickpay: !0,
        Imagecollection: [],
        detail_info: "",
        full_money: "",
        addressId: "",
        wareText: "",
        didianprice: 0,
        timeprice: 0,
        inputAddressText: "",
        isReadProtocol: !0,
        weighprice: 0,
        isBargaining: !1,
        isOpenPreference: !1,
        isOpenIntegralDeduction: !1,
        show: !1,
        cancelWithMask: !0,
        pictrueTempPath: "",
        weight: 0,
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
        cancelText: "取消",
        multiImage: []
    },
    couponurl: function() {
        var e = this;
        d.request({
            url: s.Coupon.coupon,
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
                                if (console.log("图片:", a), 1 == a.code) {
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
        if (a.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        }), "非会员用户" == wx.getStorageSync("huiyuan") && a.setData({
            huiyuan: 1
        }), e.cid && a.setData({
            cid: e.cid
        }), e.type_id && (a.setData({
            typeid: e.type_id
        }), a.setData({
            type_status: e.type
        })), a.data.typeid) {
            var r = a.data.typeid,
                o = a.data.type_status;
            a.setData({
                typeid: r
            }), d.request({
                url: s.
                default.TuiSongList,
                data: {
                    id: r,
                    type_status: o
                },
                success: function(e) {
                    console.log("+++++++", e), a.setData({
                        wareText: e.goods_name,
                        detail_info: e.adress,
                        username: e.name,
                        phone: e.mobile,
                        inputAddressText: e.address,
                        old_order_no: e.order_no
                    })
                }
            })
        }
        e.addressId ? a.setData({
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
        var n = [];
        if (d.request({
            url: s.
            default.timelist,
            data: {
                time: 0
            },
            success: function(e) {
                n[0] = i._weekArr, n[1] = e.data, t.setData({
                    timeArr: n
                })
            }
        }), e.tags) {
            var c = e.tags.split(",");
            t.setData({
                tags: c
            })
        }
    },
    onShow: function() {
        var e = this;
        e.couponurl(), e.data.typeid || (d.request({
            url: s.
            default.mrAddress,
            data: {
                bid: wx.getStorageSync("bid"),
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                console.log("地址2：", t), "" == t.data.adress ? wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/address-list/index"
                }) : e.setData({
                    detail_info: t.data.adress ? t.data.adress : ""
                })
            }
        }), d.request({
            url: s.
            default.mrAddress,
            data: {
                bid: wx.getStorageSync("bid"),
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                console.log("地址", t), "" == t.data ? wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/address-list/index"
                }) : (e.setData({
                    detail_info: t.data.adress,
                    username: t.data.name,
                    phone: t.data.phone
                }), e.AddressPrice())
            }
        }))
    },
    GetAddress: function() {
        var e = this;
        console.log("----------", e.data.detail_info), wx.chooseLocation({
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
                    e.data.wd, e.data.jd;
                    e.AddressPrice()
                }
            }
        })
    },
    AddressPrice: function() {
        var e = this;
        void 0 != e.data.detail_infos && new n({
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
                        if (console.log(a), console.log("金额", t), e.setData({
                            didianprice: t.data.price,
                            price: e.data.price - a + t.data.price,
                            proxy_id: t.data.proxy_id ? t.data.proxy_id : 0,
                            region_id: t.data.region_id ? t.data.region_id : 0
                        }), t.data.region_id) return console.log(t.data.region_id), !1;
                        e.countPrice()
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
                    var a = t.data.timeprice;
                    console.log(a), t.setData({
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
            title: "未达到使用要求"
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
            t = Number(e.data.price) + Number(e.data.stepper.stepper) + Number(e.data.reward) + Number(e.data.weight_price) - Number(e.data.integral);
        t < e.data.full_money ? (t = Number(e.data.price) + Number(e.data.stepper.stepper) + Number(e.data.reward) + Number(e.data.weight_price) - Number(e.data.integral), e.setData({
            coupon: 0
        })) : t = Number(e.data.price) + Number(e.data.stepper.stepper) + Number(e.data.reward) - Number(e.data.coupon) + Number(e.data.weight_price) - Number(e.data.integral), t = t < .01 ? 0 : t, e.setData({
            lastPrice: t.toFixed(2)
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
    weight: function(e) {
        console.log(e.detail.value);
        var t = this;
        d.request({
            url: s.
            default.WeightPrice,
            data: {
                bid: wx.getStorageSync("bid"),
                weight: e.detail.value
            },
            success: function(e) {
                "" != e.data && (t.setData({
                    weighprice: e.data,
                    price: t.data.price + e.data - weighprice
                }), t.countPrice())
            }
        })
    },
    formSubmit: function(e) {
        console.log(e);
        var t = this,
            a = t.data.pictrueTempPath,
            i = t.data.yinpin;
        ("" != e.detail.value.goodsname || "" != a || "" != i) && e.detail.value.mudadds && e.detail.value.myadds && "NaN" != e.detail.value.mytimes && !0 === t.data.isReadProtocol ? (console.log(a), console.log(i), e.detail.value.xphoto = a, e.detail.value.yinpin = i, console.log("e.detail.value", e.detail.value), t.setData({
            formData: e.detail.value,
            formId: e.detail.formId
        }), t.openActionsheet()) : wx.showToast({
            title: "信息不完善，无法下单。"
        })
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
                wx.showToast({              title: "暫未開通"            });
                break;
            case 1:
                this.balancePay()
        }
        setTimeout(function() {
            var t;
            i.setData((t = {}, e(t, "show", !1), e(t, "actions[" + r + "].loading", !1), t))
        }, 100)
    },
    wechatPay: function() {
        var e = this,
            t = e.data.formData,
            a = e.data.Imagecollection.join(","),
            i = e.data.type_status;
        if (i) r = i;
        else var r = 0;
        d.request({
            url: s.
            default.insertorder,
            data: {
                goodsname: t.goodsname,
                mudadds: t.mudadds + t.mudaddsinfos,
                myadds: t.myadds,
                times: t.mytimes,
                price: t.price,
                order_type: r,
                old_order_no: t.old_order_no,
                xphoto: t.xphoto,
                yinpin: t.yinpin,
                uid: wx.getStorageSync("uid"),
                redbao: t.redbao,
                tip: t.tip,
                bid: wx.getStorageSync("bid"),
                type: "代取",
                ins: 0,
                distype: 0,
                message: t.message,
                username: t.username,
                phone: t.phone,
                proxy_id: e.data.proxy_id ? e.data.proxy_id : 0,
                imgurl: a,
                audiotime: this.data.soundRecording.duration
            },
            success: function(t) {
                if (t.data) {
                    var a = t.data;
                    d.request({
                        url: s.
                        default.orderpay,
                        data: {
                            order_no: t.data,
                            title: "微猫源码 提供   QQ:2058430070支付",
                            uid: wx.getStorageSync("uid")
                        },
                        success: function(t) {
                            e.setData({
                                clickpay: !0
                            }), console.log("支付参数", t.data.weixin), wx.requestPayment({
                                timeStamp: t.data.weixin.timeStamp,
                                nonceStr: t.data.weixin.nonceStr,
                                package: t.data.weixin.package,
                                signType: "MD5",
                                paySign: t.data.weixin.paySign,
                                success: function(t) {
                                    e.data.useid && d.request({
                                        url: s.Coupon.status,
                                        data: {
                                            useid: e.data.useid
                                        },
                                        success: function(e) {
                                            console.log(e)
                                        }
                                    }), d.request({
                                        url: s.user.mess,
                                        data: {
                                            bid: wx.getStorageSync("bid"),
                                            openid: wx.getStorageSync("openid"),
                                            order_no: a,
                                            type: "apply"
                                        },
                                        success: function(e) {
                                            console.log(e), wx.redirectTo({
                                                url: "/sd_liferuning/pages/constmer/order-list/index"
                                            })
                                        }
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
            }
        })
    },
    balancePay: function() {
        var t;
        wx.showLoading({
            title: "请稍后"
        });
        var a = this,
            i = a.data.formData,
            r = a.data.formId,
            o = a.data.type_status,
            n = a.data.Imagecollection.join(",");
        if (o) c = o;
        else var c = 0;
        d.request({
            url: s.
            default.insertorder,
            data: (t = {
                distype: i.distype,
                goodsname: i.goodsname,
                mudadds: i.mudadds + i.mudaddsinfos,
                myadds: i.myadds,
                times: i.mytimes,
                price: i.price,
                xphoto: i.xphoto,
                yinpin: i.yinpin,
                order_type: c,
                uid: wx.getStorageSync("uid"),
                redbao: i.redbao,
                tip: i.tip,
                bid: wx.getStorageSync("bid"),
                ins: i.ins,
                message: i.message,
                type: "代取",
                username: i.username,
                phone: i.phone
            }, e(t, "order_type", c), e(t, "old_order_no", i.old_order_no), e(t, "proxy_id", a.data.proxy_id ? a.data.proxy_id : 0), e(t, "imgurl", n), e(t, "audiotime", this.data.soundRecording.duration), t),
            success: function(e) {
                a.setData({
                    clickpay: !0
                }), 1 == e.code && d.request({
                    url: s.order.pricePay,
                    method: "post",
                    data: {
                        uid: wx.getStorageSync("uid"),
                        order_no: e.data,
                        openid: wx.getStorageSync("openid"),
                        formId: r
                    },
                    success: function(e) {
                        wx.hideLoading(), 1 == e.code ? (a.data.useid && d.request({
                            url: s.Coupon.status,
                            data: {
                                useid: a.data.useid
                            },
                            success: function(e) {
                                console.log(e)
                            }
                        }), wx.showToast({
                            title: e.msg,
                            duration: 1e3,
                            success: function() {
                                setTimeout(function() {
                                    wx.redirectTo({
                                        url: "/sd_liferuning/pages/constmer/order-list/index"
                                    })
                                }, 1e3)
                            }
                        })) : wx.showToast({
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
        r.start(e)
    },
    soundRecordingEnd: function() {
        var e = this;
        r.stop(), r.onStop(function(t) {
            var a = t.tempFilePath,
                i = Math.ceil(t.duration / 1e3);
            o.src = a, e.setData({
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
            t = o.paused,
            a = e.data.soundRecording;
        t ? (o.play(), a.isPlay = !0, setTimeout(function() {
            var t = e.data.soundRecording;
            t.isPlay = !1, e.setData({
                soundRecording: t
            })
        }, 1e3 * a.duration)) : (o.stop(), a.isPlay = !1), e.setData({
            soundRecording: a
        })
    },
    soundRecordingRemove: function() {
        var e = this;
        o.stop(), e.setData({
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
    weightSliderChange: function(e) {
        var t = this,
            a = e.detail.value;
        t.setData({
            weight: a
        }), 0 == a ? (t.setData({
            weight_price: 0
        }), t.countPrice()) : wx.request({
            url: s.
            default.WeightPrice,
            data: {
                bid: wx.getStorageSync("bid"),
                weight: a,
                region_id: t.data.region_id ? t.data.region_id : 0
            },
            method: "get",
            success: function(e) {
                t.setData({
                    weight_price: e.data.data
                }), t.countPrice()
            }
        })
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
    },
    multiUploadImage: function() {
        var e = this,
            t = e.data.multiImage,
            a = e.data.Imagecollection;
        wx.chooseImage({
            count: 9,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function(i) {
                wx.showLoading({
                    title: "正在上传"
                }), i.tempFilePaths.forEach(function(i, r) {
                    t.push(i), console.log("", i), wx.uploadFile({
                        url: s.
                        default.OrderUploadsImg,
                        filePath: i,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        name: "image",
                        success: function(e) {
                            var e = JSON.parse(e.data);
                            setTimeout(function() {
                                wx.hideLoading()
                            }, 1500), 1 == e.code ? a.push(e.url) : wx.showModal({
                                title: "提示",
                                content: "圖片上傳失敗",
                                showCancel: !1
                            })
                        },
                        fail: function(e) {}
                    }), e.setData({
                        multiImage: t,
                        Imagecollection: a
                    })
                })
            }
        })
    },
    multiImageDeleteByIndex: function(e) {
        var t = e.currentTarget.dataset.index,
            a = this.data.multiImage,
            i = c.deleteByIndex({
                dataArr: a,
                index: t
            }),
            r = this.data.Imagecollection;
        r.splice(t, 1), console.log(r, "Imagecollection"), this.setData({
            multiImage: i,
            Imagecollection: r
        })
    }
});