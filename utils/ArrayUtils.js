/*微猫源码 提供   QQ:2058430070   time:2018-09-16 10:08:48*/
module.exports = {
    deleteByIndex: function(e) {
        for (var t = e.dataArr, r = e.index; r < t.length; r++) r < t.length - 1 ? t[r] = t[r + 1] : t.pop();
        return t
    }
};