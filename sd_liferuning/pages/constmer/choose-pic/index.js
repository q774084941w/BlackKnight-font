/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var a = getApp();
Page({
    data: {
        src: ""
    },
    deletePic: function() {
        a.pageOperate = 1, wx.navigateBack({
            delta: 1
        })
    },
    goBack: function() {
        a.pageOperate = 0, wx.navigateBack({
            delta: 1
        })
    },
    onLoad: function(a) {
        console.log(a.src), this.setData({
            src: a.src
        })
    }
});