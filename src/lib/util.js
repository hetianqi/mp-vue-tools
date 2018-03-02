
/**
 * 所有系统均可用的公用工具库
 */

// 是否是函数
export function isFunction(it) {
    return Object.prototype.toString.call(it) === '[object Function]';
}

// 是否是数组
export function isArray(it) {
    return Object.prototype.toString.call(it) === '[object Array]';
}

// 是否是对象
export function isObject(it) {
    return Object.prototype.toString.call(it) === '[object Object]';
}

// 是否是字符串
export function isString(it) {
    return Object.prototype.toString.call(it) === '[object String]';
}

// 是否为数字
export function isNumber(it, isNullable, isNegative) {
    return (isNullable && it === null || Object.prototype.toString.call(it) === '[object Number]' && !isNaN(it)) && (isNegative || it >= 0);
}

// 是否为数字或字符串数字
export function isStringNumber(it, isNullable, isNegative) {
    if (it === undefined) {
        return false;
    }
    return isNumber(it, isNullable, isNegative) 
        || isNullable && (it === null || it === '') 
        || !isNaN(Number(it)) && !isNaN(parseFloat(it)) && (isNegative || +it >= 0);
}

// 是否为整数
export function isInteger(it, isNullable, isNegative) {
    return (isNullable && it === null || Math.floor(it) === it) && (isNegative || it >= 0);
}

// 是否为整数或字符串整数
export function isStringInteger(it, isNullable, isNegative) {
    if (it === undefined) {
        return false;
    }
    return isInteger(it, isNullable, isNegative)
        || isNullable && (it === null || it === '')
        || String(it).indexOf('.') === -1 && Math.floor(it) === Number(it) && (isNegative || +it >= 0);
}

// 在数组中查找指定元素
export function indexOf(arr, item, keys) {
    var index = -1;

    if (!isArray(arr)) {
        throw new TypeError(arr + ' is not a array');
    }
    if (!keys) {
        index = arr.indexOf(item);
    } else if (isArray(keys)) {
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
}

//在数组中删除元素
export function removeOf(arr, item, keys) {
    let index = indexOf(arr, item, keys);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

// 保留数字的小数位数
// 不同于Number.prototype.toFiexed，不足位数的不会补全
export function toFixed(num, digits) {
    if (!isNumber(num, false, true)) {
        throw new TypeError(num + ' is not a number');
    }
    num = num.toString();
    if (num.indexOf('.') === -1) return num;
    var parts = num.split('.');
    return parts[0] + '.' + parts[1].substr(0, digits);
}

// 是否为字符串日期
export function isStringDate(dateStr) {
    return isString(dateStr) && Date.parse(dateStr.replace(/\-/g, '/'));
}

// 格式化时间参数
// 参数1： date 日期对象或可转为日期对象的值
// 参数2： format 字符串，格式化形式，年月日用大写Y、M、D代表，时分秒分别用h、m、s代表，毫秒用S代表
export function formatDate(date, format) {
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
}

// 格式化c#后台返回的/Date(1473133893427)/类型的时间
export function formatMSDate(str, format) {
    var match = /\/Date\((\d+)\)\//.exec(str);
    return match ? formatDate(new Date(+match[1]), format) : '';
}

// requestAnimationFrame polyfill
export const requestAnimationFrame = window.requestAnimationFrame 
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (fn) {
    setTimeout(fn, 20);
};

export function isElement(el) {
    return el && el.nodeType === Node.ELEMENT_NODE;
}

export function removeDom(el) {
    isElement(el) && isElement(el.parentNode) && el.parentNode.removeChild(el);
}