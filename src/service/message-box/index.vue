<template>
    <mp-modal
    class="message-box"
    :class="[customClass]"
    v-model="isShow"
    ref="modal"
    :title="title"
    :beforeClose="beforeClose"
    @hide="onHide"
    >
        <div v-if="html" v-html="content"></div>
        <div v-else>{{content}}</div>
        <template v-if="type === TYPES.ALERT" slot="footer">
            <button class="btn" :class="['btn-' + okType]" @click="close('ok')">{{okText}}</button>
        </template>
        <template v-else-if="type === TYPES.CONFIRM" slot="footer">
            <button class="btn" :class="['btn-' + okType]" @click="close('ok')">{{okText}}</button>
            <button class="btn" :class="['btn-' + cancelType]" @click="close('cancel')">{{cancelText}}</button>
        </template>
    </mp-modal>
</template>

<script>
import MpModal from '../../component/mp-modal/index.vue';
import { TYPES } from './constant';
import props from './props';

export default {
    components: {
        [MpModal.name]: MpModal
    },
    props,
    data() {
        return {
            TYPES,
            isShow: false,
            msg: ''
        }
    },
    methods: {
        toggle(isShow) {
            this.isShow = isShow;
        },
        close(msg) {
            this.toggle(false);
            this.msg = msg;
        },
        onHide() {
            this.onClose(this.msg);
        }
    }
}
</script>

<style>
.message-box .modal-body {
    margin: 0 0 10px;
}
</style>