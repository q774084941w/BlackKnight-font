/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:49*/
Component({
    externalClasses: ["mask-class", "container-class"],
    properties: {
        actions: {
            type: Array,
            value: []
        },
        show: {
            type: Boolean,
            value: !1
        },
        cancelWithMask: {
            type: Boolean,
            value: !0
        },
        cancelText: {
            type: String,
            value: ""
        }
    },
    methods: {
        onMaskClick: function() {
            this.data.cancelWithMask && this.cancelClick()
        },
        cancelClick: function() {
            this.triggerEvent("cancel")
        },
        handleBtnClick: function(e) {
            var t = e.currentTarget,
                a = ((void 0 === t ? {} : t).dataset || {}).index;
            this.triggerEvent("actionclick", {
                index: a
            })
        }
    }
});