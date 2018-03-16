<template>
    <div class="mp-autocomplete">
        <input type="text" :class="inputClassConverted" :value="value" @input="handleInput" @focus="handleFocus" @blur="handleBlur">
        <div class="mp-autocomplete-result" :class="[align, isShowResult ? 'show' : '']" :style="resultStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mp-autocomplete',
    props: {
        width: {
            type: [Number, String],
            default: '100%'
        },
        maxHeight: {
            type: Number,
            default: 300
        },
        align: {
            type: String,
            default: 'left'
        },
        // 输入框样式
        inputClass: String,
        // input框输入值，通过v-model绑定
        value: String,
        // 是否显示候选框
        showResult: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            isFocus: false,
            isMousein: false
        };
    },
    computed: {
        resultStyle () {
            return {
                width: typeof this.width === 'number' ? this.width + 'px' : this.width,
                maxHeight: this.maxHeight + 'px'
            }
        },
        inputClassConverted () {
            return (this.inputClass || '').split(' ');
        },
        isShowResult () {
            return this.isFocus && this.showResult;
        }
    },
    methods: {
        handleInput (evt) {
            var value = evt.target.value;
            this.$emit('input', value);
        },
        handleFocus (evt) {
            this.isFocus = true;
            this.$emit('input', evt.target.value);
        },
        handleBlur (evt) {
            setTimeout(() => {
                this.isFocus = false;
            }, 300);
        }
    }
}
</script>

<style lang="less">
mp-autocomplete {
    visibility: hidden;
}
.mp-autocomplete {
    position: relative;
}
.mp-autocomplete-result {
    display: none;
    position: absolute;
    z-index: 999;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    overflow: auto;
}
.mp-autocomplete-result.show {
    display: block;
}
.mp-autocomplete-result.left {
    left: 0;
}
.mp-autocomplete-result.right {
    right: 0;
}
.mp-autocomplete-result table {
    width: 100%;
}
.mp-autocomplete-result table th,
.mp-autocomplete-result table td {
    padding: 4px 10px;
}
.mp-autocomplete-result table td {
    word-break: break-all;
}
.mp-autocomplete-result table thead tr {
    border-bottom: 1px dashed #ddd;
}
.mp-autocomplete-result table tbody tr + tr {
    border-top: 1px dashed #ddd;
}
.mp-autocomplete-result table tbody tr:hover {
    background-color: #eee;
    color: #0088cc;
    cursor: default;
}
</style>