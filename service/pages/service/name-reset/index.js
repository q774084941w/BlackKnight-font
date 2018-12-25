Page({
    data: {
        username: ""
    },
    inputChange: function(a) {
        var e = this, t = a.detail.value;
        e.setData({
            username: t
        });
    },
    confim: function() {}
});