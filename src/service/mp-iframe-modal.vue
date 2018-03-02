<template>
    <modal
    v-model="isShow"
    :title="title"
    :backdrop="false"
    :footer="false"
    :class="['iframe-modal']"
    @hide="onHide"
    ref="modal"
    >
        <div class="iframe-box" ref="iframeBox">
            <iframe :src="src" frameborder="0"></iframe>
        </div>
    </modal>
</template>

<script>
import { Modal } from 'uiv';

export default {
    components: {
        Modal
    },
    props: {
        title: {
            type: String,
            required: true
        },
        src: {
            type: String,
            required: true
        },
        width: {
            type: [Number, String],
            default: 600
        },
        height: {
            type: [Number, String],
            default: 400
        },
        onHide: Function
    },
    data() {
        return {
            isShow: false
        }
    },
    mounted() {
        this.$refs.modal.$refs.dialog.style.width = typeof this.width === 'number' ? this.width + 'px' : this.width;
        this.$refs.iframeBox.style.height = typeof this.height === 'number' ? this.height + 'px' : this.height;
    },
    methods: {
        toggle(isShow) {
            this.isShow = isShow;
        }
    }
}
</script>

<style>
.iframe-modal .modal-body {
    padding: 0;
}
.iframe-box iframe {
    width: 100%;
    height: 100%;
}
</style>