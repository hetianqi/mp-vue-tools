
const util = {
    // 是否是函数
    isFunction (it) {
        return Object.prototype.toString.call(it) === '[object Function]';
    },

    // 是否是数组
    isArray (it) {
        return Object.prototype.toString.call(it) === '[object Array]';
    },

    // 是否是对象
    isObject (it) {
        return Object.prototype.toString.call(it) === '[object Object]';
    },

    /**
     * [isNumber 数字判断]
     * @param  {[type]}  it         [description]
     * @param  {Boolean} isNullable [是否可以为null]
     * @param  {Boolean} isNegative [是否可以为负数]
     */
    isNumber (it, isNullable, isNegative) {
        return (isNullable && it === null || Object.prototype.toString.call(it) === '[object Number]' && !isNaN(it)) && (isNegative || it >= 0);
    },

    /**
     * [isStringNumber 字符串数字判断]
     * @param  {[type]}  it         [description]
     * @param  {Boolean} isNullable [是否可以为null]
     * @param  {Boolean} isNegative [是否可以为负数]
     */
    isStringNumber (it, isNullable, isNegative) {
        if (it === undefined) {
            return false;
        }
        return isNullable && (it === null || it === '') || !isNaN(Number(it)) && !isNaN(parseFloat(it)) && (isNegative || +it >= 0);
    },

    // 是否为整数
    isInteger (it, isNullable, isNegative) {
        return (isNullable && it === null || Math.floor(it) === it) && (isNegative || it >= 0);
    },

    // 是否为字符串整数
    isStringInteger (it, isNullable, isNegative) {
        if (it === undefined) {
            return false;
        }
        return isNullable && (it === null || it === '') || String(it).indexOf('.') === -1 && Math.floor(it) === Number(it) && (isNegative || +it >= 0);
    },

    // 删除数组中某一项
    removeOf (arr, value, key) {
        if (!util.isArray(arr)) {
            throw new TypeError(arr + ' is not a Array');
        }

        var index = util.indexOf(arr, value, key);

        if (index >= 0) {
            arr.splice(index, 1);
        }
    },

    // 格式化时间参数
    // 参数1： date 日期对象或可转为日期对象的值
    // 参数2： format 字符串，格式化形式，年月日用大写Y、M、D代表，时分秒分别用h、m、s代表，毫秒用S代表
    formatDate (date, format) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        if (isNaN(date.getDate())) {
            return null;
        }

        format = format || 'YYYY/MM/DD hh:mm:ss';

        var o = {
            'M+': date.getMonth() + 1,                      //month 
            'D+': date.getDate(),                           //day 
            'h+': date.getHours(),                          //hour 
            'm+': date.getMinutes(),                        //minute 
            's+': date.getSeconds(),                        //second
            'S': date.getMilliseconds()                     //millisecond 
        }

        if (/(Y+)/.test(format)) {      //格式化年份
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }

        return format;
    },

    // 格式化c#后台返回的/Date(1473133893427)/类型的时间
    formatMSDate (str, format) {
        var match = /\/Date\((\d+)\)\//.exec(str);
        return match ? util.formatDate(new Date(+match[1]), format) : '';
    }
};

export default util;