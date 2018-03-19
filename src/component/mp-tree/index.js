import MpTreeList from './mp-tree-list.vue';
import props from './props';

export default {
    name: 'mp-tree',
    components: {
        MpTreeList
    },
    props: props,
    render(h) {
        var vm = this;
        return h('div', {
            'class': ['mp-tree']
        }, [
            h('mp-tree-list', {
                props: this.$props,
                ref: 'treeList',
                on: {
                    'click-node': function(node) {
                        vm.$emit('click-node', node);
                    }
                }
            })
        ]);
    },
    methods: {
        getCheckedNodes() {
            return this.$refs.treeList.getCheckedNodes();
        }
    }
}