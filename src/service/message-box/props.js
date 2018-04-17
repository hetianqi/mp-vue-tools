export default {
    type: {
        type: Number,
        required: true
    },    
    size: {
        type: String,
        default: 'sm'
    },
    title: {
        type: String,
        default: '提示'
    },
    content: {
        type: String,
        required: true
    },
    html: {
        type: Boolean,
        default: false
    },
    okText: {
        type: String,
        default: '确定'
    },
    okType: {
        type: String,
        default: 'primary'
    },
    cancelText: {
        type: String,
        default: '取消'
    },
    cancelType: {
        type: String,
        default: 'default'
    },
    customClass: String,
    beforeClose: Function,
    onClose: Function
};