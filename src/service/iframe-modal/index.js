import Vue from 'vue'
import IframeModal from './index.vue';
import { removeDom } from '../../lib/dom-util';

const queue = [];

export default function iframeModal(options) {
    let oldOnClose = options.onClose;
    options.onClose = function (...args) {
        removeDom(instance.$el);
        instance.$destroy();
        oldOnClose && oldOnClose.apply(this, args);
    };
    const instance = new Vue({
        extends: IframeModal,
        propsData: options
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.toggle(true);
    queue.push(instance);
    return instance;
};

iframeModal.close = function (instance) {
    if (!instance) {
        instance = queue.pop();
    }
    instance && instance.toggle(false);
};