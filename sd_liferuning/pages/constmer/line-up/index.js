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
var r = require("../../../../api.js"),
    s = require("../../../../qqmap-wx.js"),
    n = getApp();
Page({
    data: {
        status: 0,
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
        stepper: {
            stepper: 0
        },
        huiyuan: "",
        full_money: "",
        time: "",
        price: 0,
        paiduiprice: 0,
        reward: 0,
        coupon: 0,
        lastPrice: 0,
        detail_info: "",
        addressId: "",
        clickpay: !0,
        wareText: "",
        didianprice: 0,
        timeprice: 0,
        inputAddressText: "",
        isReadProtocol: !0,
        selectionService: 0,
        proxy_id: 0,
        service: [{
            tid: 1,
            sname: "僅排隊"
        }, {
            tid: 2,
            sname: "取物件"
        }, {
            tid: 3,
            sname: "取送物件"
        }],
        isBargaining: !1,
        isOpenPreference: !1,
        isOpenIntegralDeduction: !1,
        integral: "",
        show: !1,
        cancelWithMask: !0,
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
        n.request({
            url: r.Coupon.coupon,
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                e.setData({
                    couponArr: t.data
                })
            }
        })
    },
    onLoad: function(e) {
        var t = this;
        n.request({
            method: "POST",
            url: r.
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
        var s = [];
        n.request({
            url: r.
            default.timelist,
            data: {
                time: 0
            },
            success: function(e) {
                s[0] = i._weekArr, s[1] = e.data, s[2] = e.data, t.setData({
                    timeArr: s
                })
            }
        });
        var d = e.id;
        n.request({
            url: r.
            default.classBq,
            data: {
                bid: wx.getStorageSync("bid"),
                id: d
            },
            success: function(e) {
                console.log("服务", e), "" == e.data ? wx.navigateTo({
                    url: "/sd_liferuning/pages/constmer/index/index"
                }) : (e.data.three != [] ? a.setData({
                    service: e.data.three
                }) : a.setData({
                    service: e.data.three,
                    wareText: e.data.three[0].sname,
                    cid: e.data.three[0].tid
                }), "" != e.data.biaoqian ? a.setData({
                    wareText: e.data.name,
                    biaoqian: e.data.biaoqian
                }) : a.setData({
                    wareText: e.data.name,
                    biaoqian: []
                }))
            }
        })
    },
    onShow: function(e) {
        var t = this;
        t.couponurl(), n.request({
            url: r.
            default.mrAddress,
            data: {
                bid: wx.getStorageSync("bid"),
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                console.log(e.data.phone), "" == e.data.adress ? wx.showToast({
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
                }) : t.setData({
                    detail_info: e.data.adress,
                    username: e.data.name,
                    phone: e.data.phone,
                    uaid: e.data.uaid
                })
            }
        }), n.request({
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
                    new s({
                        key: "EKJBZ-72L3P-FHXDL-VSLEP-JEAGJ-JTFSD"
                    }).geocoder({
                        address: e.data.detail_info,
                        success: function(t) {
                            n.request({
                                url: r.
                                default.addprice,
                                metho: "post",
                                data: {
                                    myaddsjd: t.result.location.lng,
                                    myaddswd: t.result.location.lat,
                                    mudaddswd: a,
                                    mudaddsjd: i,
                                    bid: wx.getStorageSync("bid")
                                },
                                success: function(t) {
                                    var a = e.data.didianprice;
                                    console.log("区域代理", t), 0 != e.data.status && (e.setData({
                                        didianprice: t.data,
                                        price: e.data.price - a + t.data
                                    }), e.countPrice()), t.data.region_id && e.setData({
                                        proxy_id: t.data.proxy_id ? t.data.proxy_id : 0
                                    })
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
            if (t.data.timeArr[1][i[1]].timechuo >= t.data.timeArr[2][i[2]].timechuo) return wx.showToast({
                icon: "none",
                title: "請至少間隔半個小時的排隊時間"
            }), !1;
            t.setData({
                time: {
                    week: t.data.timeArr[0][i[0]],
                    firstHour: t.data.timeArr[1][i[1]],
                    lastHour: t.data.timeArr[2][i[2]]
                }
            });
            t = this;
            console.log(t.data.time), n.request({
                url: r.
                default.time_price,
                data: {
                    wid: t.data.timeArr[0][i[0]].name,
                    hid: t.data.timeArr[1][i[1]].name
                },
                success: function(e) {
                    t.data.timeprice;
                    console.log(e), t.setData({
                        timeprice: (t.data.time.lastHour.timechuo - t.data.time.firstHour.timechuo) / 60 * .6,
                        paiduiprice: (t.data.time.lastHour.timechuo - t.data.time.firstHour.timechuo) / 60 * .6
                    }), t.countPrice()
                }
            })
        }
        "reward" == a && t.setData({
            reward: t.data.rewardArr[i].price
        }), "coupon" == a && 0 != t.data.couponArr.length && (t.setData({
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
            s = e.detail.value;
        0 == i && n.request({
            url: r.
            default.timelist,
            data: {
                time: s
            },
            success: function(e) {
                a[1] = e.data, a[2] = e.data, t.setData({
                    timeArr: a
                })
            }
        })
    },
    countPrice: function() {
        var e = this,
            t = Number(e.data.price) + Number(e.data.timeprice) + Number(e.data.stepper.stepper) + Number(e.data.ins) + Number(e.data.reward) - Number(e.data.integral);
        t < e.data.full_money ? (t = Number(e.data.price) + Number(e.data.timeprice) + Number(e.data.stepper.stepper) + Number(e.data.ins) + Number(e.data.reward) - Number(e.data.integral), e.setData({
            coupon: 0
        })) : t = Number(e.data.price) + Number(e.data.timeprice) + Number(e.data.stepper.stepper) + Number(e.data.ins) + Number(e.data.reward) - Number(e.data.coupon) - Number(e.data.integral), t < .01 && (t = 0), e.setData({
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
    formSubmit: function(e) {
        var t = this;
        "" != e.detail.value.goodsname && "NaN" != e.detail.value.mytimes && !0 === t.data.isReadProtocol ? (t.setData({
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
    selectionService: function(e) {
        var t = e.currentTarget.dataset.index;
        console.log(e), this.setData({
            selectionService: t,
            wareText: this.data.pageConfig.mainConfig.templet3.serviceConfig.serviceGroups[t].name
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
            t = e.data.formData;
        console.log("表单数据=>", t), console.log("微信支付"), n.request({
            url: r.
            default.insertorder,
            data: {
                distype: t.distype,
                goodsname: t.goodsname,
                mudadds: t.mudadds + t.mudaddsinfors,
                myadds: t.myadds,
                xphoto: 0,
                yinpin: 0,
                times: t.mytimes,
                price: t.price,
                uid: wx.getStorageSync("uid"),
                redbao: t.redbao,
                tip: t.tip,
                bid: wx.getStorageSync("bid"),
                ins: t.ins,
                message: t.message,
                type: "排队",
                username: e.data.username,
                phone: e.data.phone,
                proxy_id: e.data.proxy_id ? e.data.proxy_id : 0,
                imgurl: ""
            },
            success: function(t) {
                t.data && n.request({
                    url: r.
                    default.orderpay,
                    data: {
                        order_no: t.data,
                        title: "微猫源码 提供   QQ:2058430070支付",
                        uid: wx.getStorageSync("uid")
                    },
                    success: function(t) {
                        e.setData({
                            clickpay: !0
                        }), wx.requestPayment({
                            timeStamp: t.data.weixin.timeStamp,
                            nonceStr: t.data.weixin.nonceStr,
                            package: t.data.weixin.package,
                            signType: "MD5",
                            paySign: t.data.weixin.paySign,
                            success: function(a) {
                                e.data.useid && n.request({
                                    url: r.Coupon.status,
                                    data: {
                                        useid: e.data.useid
                                    },
                                    success: function(e) {}
                                }), n.request({
                                    url: r.user.mess,
                                    data: {
                                        bid: wx.getStorageSync("bid"),
                                        openid: wx.getStorageSync("openid"),
                                        order_no: t.data.weixin.order_no,
                                        type: "apply"
                                    },
                                    success: function(e) {}
                                }), wx.redirectTo({
                                    url: "/sd_liferuning/pages/constmer/order-list/index"
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
    },
    balancePay: function() {
        var e = this,
            t = e.data.formData,
            a = e.data.formId;
        console.log("表单数据=>", t), n.request({
            url: r.
            default.insertorder,
            data: {
                distype: t.distype,
                goodsname: t.goodsname,
                mudadds: t.mudadds + t.mudaddsinfors,
                myadds: t.myadds,
                times: t.mytimes,
                price: t.price,
                xphoto: 0,
                yinpin: 0,
                imgurl: "",
                uid: wx.getStorageSync("uid"),
                redbao: t.redbao,
                tip: t.tip,
                bid: wx.getStorageSync("bid"),
                ins: t.ins,
                message: t.message,
                type: "排队",
                username: e.data.username,
                phone: e.data.phone,
                proxy_id: e.data.proxy_id ? e.data.proxy_id : 0
            },
            success: function(t) {
                e.setData({
                    clickpay: !0
                }), 1 == t.code && n.request({
                    url: r.order.pricePay,
                    method: "post",
                    data: {
                        uid: wx.getStorageSync("uid"),
                        order_no: t.data,
                        openid: wx.getStorageSync("openid"),
                        formId: a
                    },
                    success: function(t) {
                        1 == t.code ? (e.data.useid && n.request({
                            url: r.Coupon.status,
                            data: {
                                useid: e.data.useid
                            },
                            success: function(e) {
                                console.log(e)
                            }
                        }), wx.showToast({
                            title: t.msg,
                            duration: 1e3,
                            success: function() {
                                setTimeout(function() {
                                    wx.redirectTo({
                                        url: "/sd_liferuning/pages/constmer/order-list/index"
                                    })
                                }, 1e3)
                            }
                        })) : wx.showToast({
                            title: t.msg
                        })
                    }
                })
            }
        }), console.log("餘額支付")
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
            url: r.member.rebate,
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
    isOpenIntegralDeduction: function() {
        var e = this,
            t = this.data.isOpenIntegralDeduction;
        0 == t ? wx.request({
            url: r.member.integral,
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