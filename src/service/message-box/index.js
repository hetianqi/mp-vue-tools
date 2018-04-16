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

function alert(options) {
    return new Promise((resolve, reject) => {
        init(options, TYPES.ALERT, resolve, reject);
    });
}

function confirm(options) {
    return new Promise((resolve, reject) => {
        init(options, TYPES.CONFIRM, resolve, reject);
    });
}

export default { alert, confirm };