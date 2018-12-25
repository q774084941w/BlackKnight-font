/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
Page({
    data: {
        facePath: "http://img4.imgtn.bdimg.com/it/u=2222268564,1498447840&fm=27&gp=0.jpg",
        sexArr: [{
            type: 0,
            value: "女"
        }, {
            type: 1,
            value: "男"
        }],
        userSex: ""
    },
    chooseFace: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function(a) {
                var t = a.tempFilePaths;
                wx.saveFile({
                    tempFilePath: t[0],
                    success: function(a) {
                        var t = a.savedFilePath;
                        e.setData({
                            facePath: t
                        })
                    }
                })
            }
        })
    },
    userChangeSex: function(e) {
        var a = e.detail.value,
            t = this;
        t.setData({
            userSex: t.data.sexArr[a]
        })
    }
});