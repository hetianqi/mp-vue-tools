import { isArray } from './util';

// 是否是DOM节点元素
export function isElement(el) {
    return el && el.nodeType === Node.ELEMENT_NODE;
}

// 从父节点删除子节点
export function removeDom(el) {
    isElement(el) && isElement(el.parentNode) && el.parentNode.removeChild(el);
}

// 增加class
export function addClass(el, className) {
    if (!isElement(el)) {
        return;
    }
    if (el.className) {
        let classes = el.className.split(' ');
        if (!isArray(className)) {
            className = [className];
        }
        className.forEach(c => {            
            if (classes.indexOf(c) === -1) {
                classes.push(c);
            }
        });
        el.className = classes.join(' ');
    } else {
        el.className = className;
    }
}

// 删除class
export function removeClass(el, className) {
    if (!isElement(el)) {
        return;
    }
    if (el.className) {
        let classes = el.className.split(' ');
        if (!isArray(className)) {
            className = [className];
        }
        let newClasses = [];
        for (let i = 0, l = classes.length; i < l; i++) {
            if (className.indexOf(classes[i]) === -1) {
                newClasses.push(classes[i])
            }
        }
        el.className = newClasses.join(' ');
    }
}

// 是否含有class
export function hasClass(el, className) {
    if (!isElement(el)) {
        return false;
    }
    let classes = el.className.split(' ');
    for (let i = 0, l = classes.length; i < l; i++) {
        if (classes[i] === className) {
            return true;
        }
    }
    return false;
}

// 克隆vnode
export function cloneVNodes(vnodes, createElement) {
    function cloneVNode (vnode) {
        const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode));
        const cloned = createElement(vnode.tag, vnode.data, clonedChildren);
        cloned.text = vnode.text;
        cloned.isComment = vnode.isComment;
        cloned.componentOptions = vnode.componentOptions;
        cloned.elm = vnode.elm;
        cloned.context = vnode.context;
        cloned.ns = vnode.ns;
        cloned.isStatic = vnode.isStatic;
        cloned.key = vnode.key;
        return cloned;
    }
    const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode));
    return clonedVNodes;
}

// mouseenter/mouseleave事件使用mouseover/mouseout处理
const specialEvent = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
};

// 事件绑定，支持委托
export function on(el, eventName, selector, listener) {
    if (typeof selector === 'function') {
        listener = selector;
        selector = undefined;
    }

    el.addEventListener(specialEvent[eventName] || eventName, evt => {
        let eventTarget = evt.target;
        // 事件委托
        if (selector) {
            let triggerEls = el.querySelectorAll(selector);
            let isTrigger = false;

            // 向上查找触发的元素以判断是否触发事件
            for (; eventTarget && eventTarget !== el; eventTarget = eventTarget.parentNode || el) {
                if (contains(triggerEls, eventTarget)) {
                    isTrigger = true;
                    break;
                }
            }
            if (!isTrigger) return;
            // 针对mousenter/mouseleave，如果还在当前元素或其子元素中则不触发listener
            if (eventName === 'mouseenter' || eventName === 'mouseleave') {
                if (evt.relatedTarget && (eventTarget === evt.relatedTarget || domContains(eventTarget, evt.relatedTarget))) return;
            }
            evt.eventTarget = eventTarget;
        }
        listener && listener(evt);
    }, false);
}

// 解除事件绑定
export function off(el, eventName, handler) {
    el.removeEventListener(eventName, handler);
}

// 是否包含子元素
export function contains(nodeList, item) {
    return Array.prototype.indexOf.call(nodeList, item) > -1;
}

// 判断一个元素是否包含另一个元素
export function domContains(a, b) {
    let adown = a.nodeType === 9 ? a.documentElement : a;
    let bup = b && b.parentNode;
    return a === bup || !!(bup && bup.nodeType === 1 && (
        adown.contains ?
            adown.contains( bup ) :
            a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
    ));
}

// 返回元素的计算样式
export function getComputedStyle(el) {
    return window.getComputedStyle(el)
}

// 获取滚动条宽度
let SCROLLBAR_WIDTH;
let BODY_SCROLLBAR_WIDTH;
export function getScrollbarWidth(isBody) {
    let body = document.body
    if (isBody) {
        if (typeof SCROLLBAR_WIDTH === 'undefined') {
            body.className = body.className + ' mp-body-scrollbar-measure';
            BODY_SCROLLBAR_WIDTH = window.innerWidth - body.clientWidth;
            BODY_SCROLLBAR_WIDTH = isFinite(BODY_SCROLLBAR_WIDTH) ? BODY_SCROLLBAR_WIDTH : 0;
            body.className = body.className.replace(' mpui-body-scrollbar-measure', '');
        }
        return BODY_SCROLLBAR_WIDTH;
    } else {
        if (typeof SCROLLBAR_WIDTH === 'undefined') {
          var div = document.createElement('div');
          div.className = 'mp-scrollbar-measure';
          body.appendChild(div);
          SCROLLBAR_WIDTH = div.offsetWidth - div.clientWidth;
          SCROLLBAR_WIDTH = isFinite(SCROLLBAR_WIDTH) ? SCROLLBAR_WIDTH : 0;
          body.removeChild(div);
        }
        return SCROLLBAR_WIDTH;
    }
}

const MODAL_OPEN = 'modal-open';
let originalBodyPaddingRight;
export function toggleBodyOverflow(show) {    
    const body = document.body;
    if (show) {
        let bodyIsOverflowing = body.clientWidth < window.innerWidth;
        originalBodyPaddingRight = body.style.paddingRight || '';
        let bodyPaddingRight = parseInt((originalBodyPaddingRight || 0), 10);
        if (bodyIsOverflowing) {
            body.style.paddingRight = `${bodyPaddingRight + getScrollbarWidth()}px`;
        }
        addClass(body, MODAL_OPEN);
    } else {
        body.style.paddingRight = originalBodyPaddingRight;
        removeClass(body, MODAL_OPEN);
    }
}