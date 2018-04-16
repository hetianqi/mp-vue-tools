<template>
    <div class="mp-table">
        <div
            class="mp-table-header"
            :style="{'width': headerWidth}">
            <div class="mp-table-header-outer">
                <div class="mp-table-header-inner" ref="tableHeaderInner">
                    <slot pos="tableHeader"></slot>
                </div>
            </div>
        </div>
        <div
            class="mp-table-body" 
            ref="tableBody"
            :style="{maxHeight: maxHeight + 'px'}"
            @scroll="onScroll">
            <div class="mp-table-body-inner" ref="tableBodyInner">
                <slot pos="tableBody"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import onElementResize from '../../lib/on-element-resize';
import { requestAnimationFrame, removeOf } from '../../lib/util';
import { on, domContains, removeDom, addClass, removeClass, getScrollbarWidth } from '../../lib/dom-util';
import props from './props';

const queue = [];

export default {
    props: props,
    data() {
        return {
            headerWidth: '100%',
            orderBy: this.defaultOrderBy,
            orderSort: this.defaultOrderSort
        };
    },
    created() {
        queue.push(this);
    },
    mounted() {
        this.$nextTick(() => {
            // 移除表头table的tbody
            let tbody = this.$refs.tableHeaderInner.querySelector('tbody');
            tbody && tbody.parentNode.removeChild(tbody);
            // 监听dom宽高变化
            onElementResize(this.$refs.tableBodyInner, () => {
                this.headerWidth = this.$refs.tableBody.clientWidth + 'px';
            });
            if (this.resize) {
                this.enableResize();
            }
        });
    },
    beforeDestroy() {
        queue.removeOf(this);
    },
    methods: {
        onScroll(evt) {
            this.$refs.tableHeaderInner.style.left = -evt.target.scrollLeft + 'px';
        },
        // 表头拖动
        enableResize() {
            let tableHeader = this.$refs.tableHeaderInner.querySelector('table');
            let tableBody = this.$refs.tableBodyInner.querySelector('table');

            // 鼠标滑过表头添加可拖动标识
            on(tableHeader, 'mouseenter', 'thead > tr > th', evt => {
                let th = evt.eventTarget;
                if (!th.querySelector('.mp-table-resize-line')) {
                    addClass(th, 'mp-table-resize');
                    let resizeLine = document.createElement('div');
                    addClass(resizeLine, 'mp-table-resize-line');
                    th.appendChild(resizeLine);
                }
            });

            // 鼠标移开表头删除可拖动标识
            on(tableHeader, 'mouseleave', 'thead > tr > th', evt => {
                let th = evt.eventTarget;
                removeClass(th, 'mp-table-resize');
                removeDom(th.querySelector('.mp-table-resize-line'));
            });

            // 拖动
            on(tableHeader, 'mousedown', '.mp-table-resize-line', evt => {
                evt.stopPropagation();
                evt.preventDefault();
                
                let line = evt.eventTarget;
                let th = line.parentNode;
                let headerThs = tableHeader.querySelectorAll('thead > tr > th');
                let headerCols = tableHeader.querySelectorAll('colgroup > col');
                let bodyThs = tableBody.querySelectorAll('thead > tr > th');
                let bodyCols = tableBody.querySelectorAll('colgroup > col');
                let index = Array.prototype.indexOf.call(headerThs, th);
                let oldClientX = evt.clientX;
                let oldWidth = th.offsetWidth;
                let resizeMask = document.createElement('div');
                addClass(resizeMask, 'mp-table-resize-mask');
                document.body.appendChild(resizeMask);

                on(resizeMask, 'mousemove', evt => {
                    evt.preventDefault();
                    evt.stopPropagation();

                    let newWidth = Math.max(evt.clientX - oldClientX + oldWidth, 20);
                    if (headerCols.length) {
                        headerCols[index].style.width = newWidth + 'px';
                        bodyCols[index].style.width = newWidth + 'px';
                    } else {
                        headerThs[index].style.width = newWidth + 'px';
                        bodyThs[index].style.width = newWidth + 'px';
                    }
                });
                
                on(resizeMask, 'mouseup', evt => {
                    evt.preventDefault();
                    evt.stopPropagation();

                    removeDom(resizeMask);
                });
            });
        },
        // 排序
        onOrder(orderBy, orderSort) {
            this.orderBy = orderBy;
            this.orderSort = orderSort;
            this.$emit('on-order', orderBy, orderSort);
        }
    }
};
export { queue };
</script>

<style lang="less">
mp-table {
    display: block;
    visibility: hidden;
    overflow: hidden;
}
.mp-table {
    position: relative;
}
.mp-table-header {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    overflow: hidden;
}
.mp-table-header-outer {
    overflow: hidden;
}
.mp-table-header-inner {    
    position: relative;
}
.mp-table-body {
    min-height: 0%;
    overflow: auto;
}
.mp-table-resize {
    position: relative;
    background-clip: padding-box; /* 解决th设置了position后border不显示的BUG */
}
.mp-table-resize-line {
    position: absolute;
    right: -1px;
    top: 0;
    z-index: 1;
    width: 5px;
    height: 100%;
    padding-left: 4px;
    cursor: col-resize;
}
.mp-table-resize-line::before {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background-color: #ddd;
}
.mp-table-resize-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    cursor: col-resize;
}
.mp-table-order.asc,
.mp-table-order.desc {
    color: #428bca;
}
.mp-table-order-icon {
    position: relative;
    margin-left: 5px;
    cursor: pointer;
}
.mp-table-order-icon::before,
.mp-table-order-icon::after {
    content: "";
    position: absolute;
    left: 100%;
    top: 50%;
    border: solid transparent;
    border-width: 0 4px;
}
.mp-table-order-icon::before {
    margin-top: -6px;
    border-bottom-width: 6px;
    border-bottom-color: #ccc;
}
.mp-table-order-icon::after {
    margin-top: 1px;
    border-top-width: 6px;
    border-top-color: #ccc;
}
.mp-table-order.asc .mp-table-order-icon::before,
.mp-table-order.desc .mp-table-order-icon::after {
    margin-top: -3px;
}
.mp-table-order.asc .mp-table-order-icon::before {
    border-bottom-color: #428bca;
}
.mp-table-order.desc .mp-table-order-icon::after {
    border-top-color: #428bca;
}
.mp-table-order.asc .mp-table-order-icon::after,
.mp-table-order.desc .mp-table-order-icon::before {
    display: none;
}
/* 表格排序end */
</style>