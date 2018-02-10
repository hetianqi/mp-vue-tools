
var requestAnimationFrame = require('./util').default.requestAnimationFrame;;

// 检测是否支持passive events
var passiveEvents = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function() {
            passiveEvents = { passive: true };
        }
    });
    window.addEventListener('test', null, opts);
} catch (e) {}

export default function onElementResize(ele, handler) {
    if (!(ele instanceof HTMLElement)) {
        throw new TypeError('ele is not instance of HTMLElement.');
    }
    // https://www.w3.org/TR/html/syntax.html#writing-html-documents-elements
    if (/^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr|script|style|textarea|title)$/i.test(ele.tagName)) {
        throw new TypeError('Unsupported tag type. Change the tag or wrap it in a supported tag(e.g. div).');
    }

    var lastWidth = ele.offsetWidth || 1;
    var lastHeight = ele.offsetHeight || 1;
    var maxWidth = 10000 * (lastWidth);
    var maxHeight = 10000 * (lastHeight);

    var expand = document.createElement('div')
    expand.style.cssText = `
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -10000;
        overflow: hidden;
        visibility: hidden;`;
    var shrink = expand.cloneNode(false);

    var expandChild = document.createElement('div');
    expandChild.style.cssText = `transition: 0s; animation:none;`;
    var shrinkChild = expandChild.cloneNode(false);

    expandChild.style.width = maxWidth + 'px';
    expandChild.style.height = maxHeight + 'px';
    shrinkChild.style.width = '250%';
    shrinkChild.style.height = '250%';

    expand.appendChild(expandChild);
    shrink.appendChild(shrinkChild);
    ele.appendChild(expand);
    ele.appendChild(shrink);

    if (expand.offsetParent !== ele) {
        ele.style.position = 'relative';
    }

    expand.scrollLeft = shrink.scrollLeft = maxWidth;
    expand.scrollTop = shrink.scrollTop = maxHeight;

    var newWidth = 0;
    var newHeight = 0;

    function onResize () {
        if (newWidth !== lastWidth || newHeight !== lastHeight) {
            lastWidth = newWidth;
            lastHeight = newHeight;
            handler && handler();
        }
    }

    function onScroll () {
        newWidth = ele.offsetWidth || 1;
        newHeight = ele.offsetHeight || 1;
        if (newWidth !== lastWidth || newHeight !== lastHeight) {
            requestAnimationFrame(onResize);
        }
        expand.scrollTop = shrink.scrollTop = maxHeight;
        expand.scrollLeft = shrink.scrollLeft = maxWidth;
    }

    expand.addEventListener('scroll', onScroll, passiveEvents);
    shrink.addEventListener('scroll', onScroll, passiveEvents);
}