
/**
 * 所有系统均可用的公用工具库
 */

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

    // 是否是字符串
    isString (it) {
        return Object.prototype.toString.call(it) === '[object String]';
    },

    // 是否为数字
    isNumber (it, isNullable, isNegative) {
        return (isNullable && it === null || Object.prototype.toString.call(it) === '[object Number]' && !isNaN(it)) && (isNegative || it >= 0);
    },

    // 是否为数字或字符串数字
    isStringNumber (it, isNullable, isNegative) {
        if (it === undefined) {
            return false;
        }
        return util.isNumber(it, isNullable, isNegative) 
            || isNullable && (it === null || it === '') 
            || !isNaN(Number(it)) && !isNaN(parseFloat(it)) && (isNegative || +it >= 0);
    },

    // 是否为整数
    isInteger (it, isNullable, isNegative) {
        return (isNullable && it === null || Math.floor(it) === it) && (isNegative || it >= 0);
    },

    // 是否为整数或字符串整数
    isStringInteger (it, isNullable, isNegative) {
        if (it === undefined) {
            return false;
        }
        return util.isInteger(it, isNullable, isNegative)
            || isNullable && (it === null || it === '')
            || String(it).indexOf('.') === -1 && Math.floor(it) === Number(it) && (isNegative || +it >= 0);
    },

    // 在数组中查找指定元素
    indexOf (arr, item, keys) {
        var index = -1;

        if (!util.isArray(arr)) {
            throw new TypeError(arr + ' is not a array');
        }
        if (!keys) {
            index = arr.indexOf(item);
        } else if (util.isArray(keys)) {
            for (var i in arr) {
                var temp = arr[i];
                var key;
                var isMathch = true;
                for (var j in keys) {
                    key = keys[j];
                    if (temp[key] !== item[key]) {
                        isMathch = false;
                        break;
                    }
                }
                if (isMathch) {
                    index = i;
                    break;
                }
            }
        } else {
            for (var i in arr) {
                var temp = arr[i];
                var key;
                if (temp[keys] === item[keys]) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    },

    // 保留数字的小数位数
    // 不同于Number.prototype.toFiexed，不足位数的不会补全
    toFixed (num, digits) {
        if (!util.isNumber(num, false, true)) {
            throw new TypeError(num + ' is not a number');
        }
        num = num.toString();
        if (num.indexOf('.') === -1) return num;
        var parts = num.split('.');
        return parts[0] + '.' + parts[1].substr(0, digits);
    },

    // 是否为字符串日期
    isStringDate (dateStr) {
        return util.isString(dateStr) && Date.parse(dateStr.replace(/\-/g, '/'));
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

        format = format || 'yyyy-MM-dd';

        var o = {
            'M+': date.getMonth() + 1, // 月
            'd+': date.getDate(), // 天 
            'h+': date.getHours() % 12, // 小时，12小时制
            'H+': date.getHours(), // 小时，24小时制 
            'm+': date.getMinutes(), // 分钟
            's+': date.getSeconds(), // 秒钟
            'S': date.getMilliseconds() // 毫秒
        }

        if (/(y+)/.test(format)) {      //格式化年份
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
    },

    // requestAnimationFrame polyfill
    requestAnimationFrame: window.requestAnimationFrame 
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || function (fn) {
        setTimeout(fn, 20);
    },

    // 将Y/N转换为是/否
    boolToText (value) {
        if (!util.isString(value)) {
            return '';
        }
        return value === 'Y' ? '是' : '否';
    }
};

export default util;