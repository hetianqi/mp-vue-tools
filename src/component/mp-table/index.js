import MpTable from './mp-table.vue';
import { cloneVNodes } from '../../lib/dom-util';
import props from './props';

export default {
    name: 'mp-table',
    props: props,
    render(h) {
        let tableBody = this.$slots.default;
        let tableHeader = cloneVNodes(tableBody, h);
        let vm = this;
        
        return h(MpTable, {
            props: this.$props,
            scopedSlots: {
                default(props) {
                    if (props.pos === 'tableHeader') {
                        return tableHeader;
                    }
                    return tableBody;
                }
            },
            on: {
                'on-order': function(orderBy, orderSort) {
                    vm.$emit('on-order', orderBy, orderSort);
                }
            }
        });
    }
}