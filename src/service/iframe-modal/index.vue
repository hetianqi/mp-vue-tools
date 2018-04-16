<template>
    <mp-modal
    class="iframe-modal"
    v-model="isShow"
    :title="title"
    :footer="false"
    ref="modal"
    @hide="onClose"
    >
        <div class="iframe-box" ref="iframeBox">
            <iframe :src="src" frameborder="0" @load="onLoad"></iframe>
        </div>
    </mp-modal>
</template>

<script>
import MpModal from '../../component/mp-modal/index.vue';
import props from './props';

export default {
    components: {
        [MpModal.name]: MpModal
    },
    props,
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