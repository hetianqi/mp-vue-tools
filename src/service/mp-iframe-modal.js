import Vue from 'vue'
import MpIframeModal from './mp-iframe-modal.vue';
import { removeDom, removeOf } from '../lib/util';

const queue = [];

export default function init(options) {
    const instance = new Vue({
        extends: MpIframeModal,
        propsData: {
            ...options,
            onHide() {                
                removeDom(instance.$el);
                instance.$destroy();
                removeOf(queue, instance);
            }
        }
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.toggle(true);
    queue.push(instance);
    return instance;
};

init.close = function (instance) {
    instance.toggle(false);
};