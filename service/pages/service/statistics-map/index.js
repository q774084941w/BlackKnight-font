var e = getApp(), a = require("../../../../api.js");

Page({
    data: {
        panel: "panel1",
        num_day: "",
        num_wee: "",
        num_month: "",
        num_total: "",
        price_day: "",
        price_week: "",
        price_month: "",
        price_total: "",
        arrweek: null,
        arrmonth: null,
        incomeweek: null,
        incomemonth: null
    },
    onLoad: function(t) {
        var n = this, r = wx.getStorageSync("uid");
        e.request({
            url: a.default.statistics,
            data: {
                uid: r
            },
            method: "post",
            success: function(e) {
              console.log(e)
                for (var a = [], t = 0; t <= e.arr7.length - 1; t++) {
                    var r = {};
                    r.time = e.arr7[t], r.size = e.num7[t], a.push(r);
                }
                for (var o = [], i = 0; i <= e.arr30.length - 1; i++) {
                    var m = {};
                    m.time = e.arr30[i], m.size = e.num30[i], o.push(m);
                }
                for (var s = [], c = 0; c <= e.prcie7.length - 1; c++) {
                    var u = {};
                    u.time = e.arr7[c], u.size = e.prcie7[c], s.push(u);
                }
                for (var l = [], d = 0; d <= e.prcie30.length - 1; d++) {
                    var p = {};
                    p.time = e.arr30[d], p.size = e.prcie30[d], l.push(p);
                }
                n.setData({
                    arrweek: a,
                    arrmonth: o,
                    incomeweek: s,
                    incomemonth: l,
                    num_day: e.num.num_day,
                    num_week: e.num.num_week,
                    num_month: e.num.num_month,
                    num_total: e.num.num_total,
                    price_day: e.num.price_day,
                    price_week: e.num.price_week,
                    price_month: e.num.price_month,
                    price_total: e.num.price_total
                }), n.drawCanvas({
                    canvasId: "order-map1",
                    data: n.data.arrweek,
                    power: 100,
                    showText: !0
                }), n.drawCanvas({
                    canvasId: "order-map2",
                    data: n.data.arrmonth,
                    power: 100,
                    showText: !1
                }), n.drawCanvas({
                    canvasId: "income-map1",
                    data: n.data.incomeweek,
                    power: 150,
                    showText: !0
                }), n.drawCanvas({
                    canvasId: "income-map2",
                    data: n.data.incomemonth,
                    power: 150,
                    showText: !1
                });
            }
        });
    },
    switchPanel: function(e) {
        var a = this, t = e.currentTarget.dataset.panel;
        a.setData({
            panel: t
        });
    },
    drawCanvas: function(e) {
        var a = e.canvasId, t = e.data, n = e.power, r = e.showText, o = wx.getSystemInfoSync().windowWidth / 750 * 700, i = wx.getSystemInfoSync().windowWidth / 750 * 250, m = t.length, s = wx.createCanvasContext(a);
        s.setStrokeStyle("#ccc"), s.setFillStyle("#14B5FA"), s.setFontSize(8);
        for (c = 5; c > 0; c--) s.beginPath(), s.lineTo(0, i / 5 * c), s.lineTo(o, i / 5 * c), 
        s.stroke(), s.fillText(10 - 2 * c, 0, i / 5 * c);
        for (c = m; c >= 0; c--) s.beginPath(), s.lineTo(o / m * c, 0), s.lineTo(o / m * c, i), 
        s.stroke(), r && c < t.length && s.fillText(t[c].time, o / m * c + o / m / 3, i - 5);
        s.setStrokeStyle("#f90"), s.beginPath();
        for (var c = 0; c < m; c++) s.lineTo(o / m * (c + 1), i - i / n * t[c].size);
        s.stroke(), s.draw(), s.save();
    }
});