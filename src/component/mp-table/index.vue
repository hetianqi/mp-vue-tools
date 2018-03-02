<template>
    <div class="mp-table">
        <div
            class="mp-table-header"
            :style="{'padding-right': headerPaddingRight + 'px'}">
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
import getScrollbarWidth from '../../lib/get-scrollbar-width';
import requestAnimationFrame from '../../lib/util';

export default {
    name: 'mp-table',
    props: {
        maxHeight: Number
    },
    data () {
        return {
            headerPaddingRight: 0
        };
    },
    mounted: function () {
        this.$nextTick(() => {
            // 移除表头table的tbody
            var tbody = this.$refs.tableHeaderInner.querySelector('tbody');
            tbody && tbody.parentNode.removeChild(tbody);
            // 监听dom宽高变化
            onElementResize(this.$refs.tableBodyInner, () => {
                this.headerPaddingRight = this.$refs.tableBody.offsetWidth - this.$refs.tableBody.clientWidth;
            });
        });
    },
    methods: {
        onScroll (evt) {
            this.$refs.tableHeaderInner.style.left = -evt.target.scrollLeft + 'px';
        }
    }
}
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
    width: 100%;
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
.mpui-th-resize {
    position: relative;
    background-clip: padding-box; /* 解决th设置了position后border不显示的BUG */
}
.mpui-th-resize-line {
    position: absolute;
    right: -0.5px;
    top: 0;
    z-index: 1;
    width: 5px;
    height: 100%;
    padding-left: 4px;
    cursor: col-resize;
}
.mpui-th-resize-line::before {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background-color: #ddd;
}
.mpui-resize-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    cursor: col-resize;
}
</style>