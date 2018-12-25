/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
Page({
    data: {
        username: ""
    },
    inputChange: function(a) {
        var e = this,
            t = a.detail.value;
        e.setData({
            username: t
        })
    },
    confim: function() {}
});