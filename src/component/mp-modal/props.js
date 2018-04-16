export default {
    value: {
        type: Boolean,
        default: false
    },
    title: String,
    size: String,
    backdrop: {
        type: Boolean,
        default: false
    },
    header: {
        type: Boolean,
        default: true
    },
    okText: {
        type: String,
        default: '确定'
    },
    cancelText: {
        type: String,
        default: '取消'
    },
    dismissBtn: {
        type: Boolean,
        default: true
    },
    transitionDuration: {
        type: Number,
        default: 150
    },
    keyboard: {
        type: Boolean,
        default: true
    },
    beforeClose: Function,
    appendToBody: {
        type: Boolean,
        default: false
    },
    zOffset: {
        type: Number,
        default: 20
    }
};