import { queue } from '../component/mp-table/mp-table.vue';
import { on, domContains, addClass, removeClass } from '../lib/dom-util';

export default {
    directiveName: 'table-order',
    inserted(el, { value }) {
        addClass(el, 'mp-table-order');
        let sortIcon = document.createElement('span');
        addClass(sortIcon, 'mp-table-order-icon');
        el.appendChild(sortIcon);
        
        // 查找当前table-order对应的table
        let table;
        queue.forEach(ins => {
            if (domContains(ins.$el, el)) {
                table = ins;
            }
        });

        // 监听点击事件，执行排序
        on(el, 'click', evt => {
            var orderSort = '';

            if (table.orderBy !== value) {
                orderSort = 'asc';
            } else {
                if (table.cancelOrder) {
                    orderSort = table.orderSort === '' ? 'asc' : table.orderSort === 'asc' ? 'desc' : '';
                } else {
                    orderSort = table.orderSort === 'asc' ? 'desc' : 'asc';
                }					
            }
            table.onOrder(orderSort ? value : '', orderSort);
            evt.preventDefault();
            evt.stopPropagation();
        });

        function setClass() {
            removeClass(el, ['asc', 'desc']);
            if (table.orderBy === value) {
                addClass(el, table.orderSort);
            }
        }
        setClass();
        table.$watch('orderBy', setClass);
        table.$watch('orderSort', setClass);
    }
};