var e = require("../../../../api.js"), a = getApp();

Page({
    data: {
        phoneNumber: "",
        formId:"",
        ison_tb:1,
    },
    navToUser: function() {
        wx.navigateTo({
            url: "/service/pages/constmer/user-info/index"
        });
    },
    callPhone: function() {
        var e = this;
        wx.makePhoneCall({
            phoneNumber: e.data.phoneNumber
        });
    },
    onShow: function() {
        var n = this;
        n.setData({
            head: wx.getStorageSync("head"),
            nickname: wx.getStorageSync("nickname")
        }), a.request({
            url: e.default.userinfos,
            method: "post",
            data: {
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
              console.log(e)
                1 == e.code ? n.setData({
                    userinfo: e.data
                }) : console.log("獲取用戶資訊失敗");
            }
        });
    },
    onLoad: function() {
        this.setData({
            icons: wx.getStorageSync("site") + "/addons/sd_liferuning/tp/public/uploads/background"
        });
    },
  formSubmit: function (t) {
    var i=this;
    console.log(t.detail.formId)
    console.log(wx.getStorageSync("uid"))
    var type = i.data.ison_tb;
    console.log(type);
    if (type == 1) {
      i.setData({
        ison_tb: 0
      })

        a.request({
          method: "post",
          url: e.default.insertOpenIdFormId,
          data: {
            uid: wx.getStorageSync("uid"),
            formId: t.detail.formId,
          },
          success: function (e) {
            console.log(e), e.code == 1 ?
              setTimeout(function () {
                wx.redirectTo({
                  url: "/service/pages/service/user/index"
                })
              })
              : wx.showModal({
                title: "提示",
                content: e.msg
              });
          }
        });
    } else {
      wx.showModal({
        title: "提示",
        content: "正在处理"
      });
    }
  },
    isOn : function(t){
      var o = this;
      var type = o.data.ison_tb;
      console.log(type);
      if (type==1) {
        o.setData({
          ison_tb:0
        })
        a.request({
          method: "post",
          url: e.default.isOn,
          data: {
            cid: o.data.userinfo.cid,
            isOn: t.target.dataset.id
          },
          success: function (e) {
            console.log(e), e.code == 1 ?

              setTimeout(function () {
                wx.redirectTo({
                  url: "/service/pages/service/user/index"
                })
              })
              : wx.showModal({
                title: "提示",
                content: e.msg
              });
          },
          fail: function (error) {//超时处理
            wx.showModal({
              title: "提示",
              content: "请求超时"
            });
          }
        });
      } else {
        wx.showModal({
          title: "提示",
          content: "正在处理"
        });
      }

      }
      

});