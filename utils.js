/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:48*/
var e = {
    scene_decode: function(e) {
        var r = (e + "").split(","),
            t = {};
        for (var n in r) {
            var l = r[n].split(":");
            0 < l.length && l[0] && (t[l[0]] = l[1] || null)
        }
        return t
    }
};
module.exports = e;