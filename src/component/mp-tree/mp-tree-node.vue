<template>
    <div class="mp-tree-node__content" @dblclick="toggleExpand">
        <span class="mp-tree-node__toggle">
            <span v-if="!isLeaf" :class="toggleClass" @click="toggleExpand"></span>
        </span>
        <span class="mp-tree-node__checkbox" v-if="showCheckbox" :class="{'checked': isCheck}" @click="toggleCheck"></span>
        <span class="mp-tree-node__icon" v-if="iconClass" @click="clickNode">
            <span :class="iconClassComputed"></span>
        </span>
        <span class="mp-tree-node__label text-ellipsis">
            <span v-text="label" :title="label" @click="clickNode"></span>
        </span>
    </div>
</template>

<script>
import MpTreeList from './mp-tree-list.vue';

export default {
    name: 'mp-tree-node',
    components: {
        MpTreeList
    },
    props: {
        label: String,
        isLeaf: Boolean,
        isOpen: Boolean,
        isLoading: Boolean,
        showCheckbox: Boolean,
        isCheck: Boolean,
        iconClass: String,
        onExpand: Function
    },
    computed: {
        toggleClass() {
            return ['glyphicon', {
                'glyphicon-refresh': this.isLoading,
                'glyphicon-triangle-bottom': !this.isLoading && this.isOpen, 'glyphicon-triangle-right': !this.isLoading && !this.isOpen
            }];
        },
        iconClassComputed() {
            return this.iconClass ? this.iconClass.split(' ') : [];
        }
    },
    methods: {
        toggleExpand() {
            if (this.isLeaf) return;
            this.$emit('toggle-expand');
        },
        toggleCheck(evt) {
            this.$emit('toggle-check', !this.isCheck);
        },
        clickNode() {
            this.$emit('click-node');
        }
    }
}
</script>
