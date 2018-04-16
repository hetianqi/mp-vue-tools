<template>
    <div class="modal fade">
        <div class="modal-dialog" :class="modalSizeClass" ref="dialog">
            <div class="modal-content">
                <div class="modal-header" v-if="header">
                    <slot name="header">
                        <button
                            type="button"
                            class="close"
                            @click="toggle(false)"
                            v-if="dismissBtn">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">
                            <slot name="title">{{title}}</slot>
                        </h4>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot/>
                </div>
                <div class="modal-footer" v-if="!!$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
        <div class="modal-backdrop" :class="{fade: transitionDuration > 0}" ref="backdrop" @click="backdropClicked"></div>
    </div>
</template>

<script>
import props from './props';
import { on, off, removeDom, toggleBodyOverflow, getComputedStyle, addClass, removeClass } from '../../lib/dom-util';
import { isFunction } from '../../lib/util';

const getOpenModalNum = () => document.querySelectorAll('.modal-backdrop').length;

export default {
    name: 'mp-modal',
    props: props,
    data () {
        return {
            msg: '',
            timeoutId: 0
        }
    },
    computed: {
      modalSizeClass() {
        return {
            [`modal-${this.size}`]: Boolean(this.size)
        };
      }
    },
    watch: {
        value(v) {
            this.$toggle(v)
        }
    },
    mounted() {
        removeDom(this.$refs.backdrop);
        on(window, 'keyup', this.onKeyPress);
        if (this.value) {
            this.$toggle(true);
        }
    },
    beforeDestroy() {
        clearTimeout(this.timeoutId);
        removeDom(this.$refs.backdrop);
        removeDom(this.$el);
        off(window, 'keyup', this.onKeyPress);
    },
    methods: {
        $toggle(show) {
            const modal = this.$el;
            const backdrop = this.$refs.backdrop;

            clearTimeout(this.timeoutId);
            if (show) {         
                document.body.appendChild(backdrop);       
                if (this.appendToBody) {
                    document.body.appendChild(modal);
                }
                modal.style.display = 'block';
                modal.scrollTop = 0;
                backdrop.offsetHeight; // force repaint
                addClass(modal, 'in');
                addClass(backdrop, 'in');
                toggleBodyOverflow(true);
                
                let alreadyOpenModalNum = getOpenModalNum();
                // 多个modal打开时，需要保证后面打开的modal的层级比前面的高
                if (alreadyOpenModalNum > 0) {
                    const modalBaseZ = parseInt(getComputedStyle(modal).zIndex) || 1050;
                    const backdropBaseZ = parseInt(getComputedStyle(backdrop).zIndex) || 1040;
                    const offset = alreadyOpenModalNum * this.zOffset;
                    modal.style.zIndex = `${modalBaseZ + offset}`;
                    backdrop.style.zIndex = `${backdropBaseZ + offset}`;
                }
                
                // 等待动画结束触发show时间
                this.timeoutId = setTimeout(() => {
                    this.$emit('show');
                    this.timeoutId = 0;
                }, this.transitionDuration);
            } else {
                removeClass(backdrop, 'in');
                removeClass(modal, 'in');
                this.timeoutId = setTimeout(() => {
                    modal.style.display = 'none';
                    removeDom(backdrop);
                    if (this.appendToBody) {
                        removeDom(modal);
                    }
                    this.$emit('hide', this.msg || 'dismiss');
                    this.msg = '';
                    this.timeoutId = 0;
                    
                    // 还原zIndex
                    modal.style.zIndex = '';
                    backdrop.style.zIndex = '';

                    if (getOpenModalNum() === 0) {
                        toggleBodyOverflow(false);
                    }
                }, this.transitionDuration);
            }
        },
        // 切换显示状态
        toggle(show, msg) {
            // 如果beforeClose返回falsely在不关闭
            if (!show && isFunction(this.beforeClose) && !this.beforeClose(msg)) {
                return;
            }
            this.msg = msg;
            this.$emit('input', show);
        },
        // 按esc退出
        onKeyPress(event) {
            if (this.keyboard && this.value && event.keyCode === 27) {
                this.toggle(false);
            }
        },
        // 点击遮罩
        backdropClicked(event) {
            if (this.backdrop) {
                this.toggle(false);
            }
        }
    }
}
</script>

<style lang="less">
mp-modal {
    display: none;
}
.modal-title {
    font-weight: bold;
    color: #0775BE;
}
.modal-footer .btn + .btn {
    margin-left: 15px;
}
.modal-xl {
    width: 1200px;
}
</style>