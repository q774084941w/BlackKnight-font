/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:47*/
module.exports = Behavior({
    properties: {
        loading: Boolean,
        openType: String,
        appParameter: String,
        hoverStopPropagation: Boolean,
        hoverStartTime: {
            type: Number,
            value: 20
        },
        hoverStayTime: {
            type: Number,
            value: 70
        },
        lang: {
            type: String,
            value: "en"
        },
        sessionFrom: {
            type: String,
            value: ""
        },
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: String
    },
    methods: {
        bindgetuserinfo: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).detail,
                t = void 0 === e ? {} : e;
            this.triggerEvent("getuserinfo", t)
        },
        bindcontact: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).detail,
                t = void 0 === e ? {} : e;
            this.triggerEvent("contact", t)
        },
        bindgetphonenumber: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).detail,
                t = void 0 === e ? {} : e;
            this.triggerEvent("getphonenumber", t)
        },
        binderror: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).detail,
                t = void 0 === e ? {} : e;
            this.triggerEvent("error", t)
        }
    }
});