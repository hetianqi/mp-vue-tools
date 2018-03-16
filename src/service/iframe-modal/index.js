import Vue from 'vue'
import IframeModal from './iframe-modal.vue';
import { removeOf } from '../../lib/util';
import { removeDom } from '../../lib/dom-util';

const queue = [];

export default function init(option) {
    let oldOnHide = option.onHide;
    option.onHide = function (...args) {
        removeDom(instance.$el);
        instance.$destroy();
        oldOnHide && oldOnHide.apply(this, args);
    };
    const instance = new Vue({
        extends: IframeModal,
        propsData: option
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.toggle(true);
    queue.push(instance);
    return instance;
};

init.close = function (instance) {
    if (!instance) {
        instance = queue.pop();
    }
    instance && instance.toggle(false);
};