/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
Page({
    data: {
        money: "0.00",
        price: "0.00",
        vipprice: "0.00",
        integral: "0.00",
        lastPrice: "0.00"
    },
    onLoad: function(e) {
        var a = Number(e.money),
            t = (Number(e.vipprice), this);
        0 == e.money || NaN == e.money ? t.setData({
            money: 0
        }) : t.setData({
            money: e.money
        }), 0 == e.price || NaN == e.price ? t.setData({
            price: 0
        }) : t.setData({
            price: e.price
        }), 0 == e.vipprice || NaN == e.vipprice ? t.setData({
            vipprice: 0
        }) : t.setData({
            vipprice: e.vipprice
        }), 0 == e.integral || NaN == e.integral ? t.setData({
            integral: 0
        }) : t.setData({
            integral: e.integral
        }), 0 == e.lastPrice || NaN == e.lastPrice ? t.setData({
            lastPrice: 0
        }) : t.setData({
            lastPrice: e.lastPrice
        })
    },
    onReady: function() {}
});