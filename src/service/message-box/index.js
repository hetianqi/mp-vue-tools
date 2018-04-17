import Vue from 'vue'
import MessageBox from './index.vue';
import { removeDom } from '../../lib/dom-util';
import { TYPES } from './constant';

const queue = {
    [TYPES.ALERT]: [],
    [TYPES.CONFIRM]: []
};

function init(options, type, resolve, reject) {
    options = Object.assign({ 
        type,
        onClose(msg) {
            removeDom(instance.$el);
            instance.$destroy();
            msg === 'ok' ? resolve(instance) : reject(instance);
        }
    }, options);
    const instance = new Vue({
        extends: MessageBox,
        propsData: options
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.toggle(true);
    queue[type].push(instance);
}

function initModal(options, type) {
    if (typeof options === 'string') {
        options = {
            content: options
        };
    }
    return new Promise((resolve, reject) => {
        init(options, type, resolve, reject);
    });
}

function alert(options) {
    return initModal(options, TYPES.ALERT);
}

function confirm(options) {
    return initModal(options, TYPES.CONFIRM);
}

export default { alert, confirm };