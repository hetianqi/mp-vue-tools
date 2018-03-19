<template>
    <ul class="mp-tree__list">
        <li
            class="mp-tree-node"
            v-for="(item, index) in data"
            :key="setItemAndReturnKey(item, index)">
            <mp-tree-node
                :show-checkbox="item.showCheckbox === undefined ? showCheckbox : item.showCheckbox" 
                :label="item.label"
                :is-leaf="item.isLeaf"
                :is-open="item.isOpen"
                :is-check="item.isCheck"
                :icon-class="item.iconClass"
                @toggle-expand="toggleExpand(item)"
                @toggle-check="toggleCheck(item, arguments)"
                @click-node="clickNode(item)">
            </mp-tree-node>
            <div
                class="mp-tree-node__children"
                v-if="!item.isLeaf && item.children && item.children.length"
                v-show="item.isOpen">
                <mp-tree-list 
                    :data="item.children"
                    :show-checkbox="showCheckbox"
                    :on-expand="onExpand"
                    ref="recursive"
                    >
                </mp-tree-list>
            </div>
        </li>        
    </ul>
</template>

<script>
import props from './props';

export default {
    name: 'mp-tree-list',
    props: props,
    beforeCreate() {
        this.$options.components.MpTreeNode = require('./mp-tree-node.vue').default;
    },
    methods: {
        toggleExpand(item) {
            if (item.isLoading) return;
            if (!item.isOpen) {
                if (item.children) {
                    item.isOpen = true;
                    return;
                }
                this.isLoading = true;
                new Promise((resolve, reject) => {
                    if (this.onExpand) {
                        this.onExpand(item, resolve);
                    } else {
                        resolve();
                    }
                })
                .then(() => {
                    if (item.children && item.children.length === 0) {
                        item.isLeaf = true;
                    }
                    item.isLoading = false;
                    item.isOpen = true;
                });
            } else {
                item.isOpen = false;
            }
        },
        toggleCheck(item, args) {
            item.isCheck = args[0];
        },
        setItemAndReturnKey(item, index) {
            this.$set(item, 'isLeaf', item.isLeaf);
            this.$set(item, 'children', item.children);
            this.$set(item, 'isLoading', item.isLoading);
            this.$set(item, 'isOpen', item.isOpen);
            this.$set(item, 'isCheck', item.isCheck);
            this.$set(item, 'iconClass', item.iconClass);
            return index;
        },
        getCheckedNodes() {
            var nodes = this.data.filter(item => item.isCheck);
            if (this.$refs.recursive) {
                this.$refs.recursive.forEach(me => {
                    nodes = nodes.concat(me.getCheckedNodes());
                });                
            }            
            return nodes;
        },
        clickNode(item) {
            this.$emit('click-node', item);
        }
    }
}
</script>

<style lang="less">
.mp-tree__list .mp-tree__list > .mp-tree-node {
    padding-left: 20px;
}
.mp-tree-node__content {
    display: flex;
    align-items: center;
    user-select: none;
}
.mp-tree-node__content:hover {
    background-color: #eee;
}
.mp-tree-node__toggle {
    display: inline-block;
    width: 18px;
    height: 18px;
}
.mp-tree-node__toggle .glyphicon {
    cursor: pointer;
    color: #666;
}
.mp-tree-node__checkbox {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    background-color: #fff;
    transition: border-color .05s cubic-bezier(.71,-.46,.29,1.46), background-color .05s cubic-bezier(.71,-.46,.29,1.46);
    vertical-align: middle;
    cursor: pointer;
}
.mp-tree-node__checkbox:after {
    content: "";
    position: absolute;
    left: 5px;
    top: 1px;
    width: 5px;
    height: 9px;
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    transform: rotate(45deg) scaleY(0);
    transition: transform .05s cubic-bezier(.71,-.46,.88,.6) .05s;
    transform-origin: center;
}
.mp-tree-node__checkbox.checked {
    background-color: #409eff;
    border-color: #409eff;
}
.mp-tree-node__checkbox.checked:after {
    transform: rotate(45deg) scaleY(1);
}
.mp-tree-node__icon {
    display: inline-block;
    padding-right: 5px;
    cursor: pointer;
}
.mp-tree-node__label {
    flex: 1;
}
.mp-tree-node__label span {
    cursor: pointer;
}
</style>
