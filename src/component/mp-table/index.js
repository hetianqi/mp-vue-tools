import MpTable from './mp-table.vue';
import { cloneVNodes } from '../../lib/util';

export default {
    name: 'mp-table',
    props: {
        maxHeight: Number,
        resize: {
            type: Boolean,
            default: false
        }
    },
    render(h) {
        let tableBody = this.$slots.default;
        let tableHeader = cloneVNodes(tableBody, h);
        
        return h(MpTable, {
            props: this.$props,
            scopedSlots: {
                default(props) {
                    if (props.pos === 'tableHeader') {
                        return tableHeader;
                    }
                    return tableBody;
                }
            }
        });
    }
}