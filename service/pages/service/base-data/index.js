Page({
    data: {
        facePath: ""
    },
    chooseFace: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var s = a.tempFilePaths;
                wx.saveFile({
                    tempFilePath: s[0],
                    success: function(a) {
                        var s = a.savedFilePath;
                        e.setData({
                            facePath: s
                        });
                    }
                });
            }
        });
    }
});