export default {
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
    onLoad: Function,
    onClose: Function
};