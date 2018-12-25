/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:50*/
var e = require("../../../../api.js"),
    t = getApp();
Page({
    data: {
        money: 0
    },
    changeInputData: function(e) {
        var t = this,
            a = e.currentTarget.dataset.name,
            n = e.detail.value;
        "money" == a && t.setData({
            money: n
        })
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        })
    },
  //点击开始的时间  
  timestart: function (e) {
    var _this = this;
    _this.setData({ timestart: e.timeStamp });
  },
  //点击结束的时间
  timeend: function (e) {
    var _this = this;
    _this.setData({ timeend: e.timeStamp });
  },

  //保存图片
  saveImg: function (e) {
    var _this = this;
    var times = _this.data.timeend - _this.data.timestart;
    if (times > 300) {
      console.log("长按");
      wx.getSetting({
        success: function (res) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
              console.log("授权成功");
              var imgUrl = "https://xam.chaojiyuanma.com/addons/sd_liferuning/tp/public/uploads/img/1.jpg";
              wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
                url: imgUrl,
                success: function (res) {
                  // 下载成功后再保存到本地
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
                    success: function (res) {
                      wx.showToast({
                        title: '成功保存到相册',
                        icon: 'success'
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  },
    sendRequest: function() {
        var a = this;
        if (!a.data.money) return wx.showToast({
            title: "請輸入金額",
            icon: "none"
        }), !1;
        var n = a.data.money;
        t.request({
            url: e.order.rechargePay,
            data: {
                uid: wx.getStorageSync("uid"),
                bid: wx.getStorageSync("bid"),
                money: n
            },
            success: function(e) {
                var t = e.data.weixin;
                wx.requestPayment({
                    timeStamp: t.timeStamp,
                    nonceStr: t.nonceStr,
                    package: t.package,
                    signType: t.signType,
                    paySign: t.paySign,
                    success: function(e) {
                        wx.showToast({
                            title: "充值成功",
                            duration: 1e3,
                            success: function() {
                                setTimeout(function() {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }, 1e3)
                            }
                        })
                    }
                })
            }
        })
    }
});