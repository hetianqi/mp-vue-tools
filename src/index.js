// 引入styles
import './style/index.less';

import axios from 'axios';
import axiosJsonp from './lib/axios-jsonp';
import * as util from './lib/util';
import { Carousel, Slide, Collapse, Dropdown, Modal, Tab, Tabs, DatePicker, Affix, Alert, Pagination, Tooltip, Popover, TimePicker, Typeahead, ProgressBar, ProgressBarStack, Breadcrumbs, BreadcrumbItem, Btn, BtnGroup, BtnToolbar, MultiSelect, Navbar, NavbarNav, NavbarForm, NavbarText, tooltip, popover, scrollspy, MessageBox, Notification, install as uivInstall } from 'uiv';

import MpTable from './component/mp-table/index';
import MpPager from './component/mp-pager/index.vue';
import MpAutocomplete from './component/mp-autocomplete/index.vue';
import MpTree from './component/mp-tree/index';

import MpShow from './directive/mp-show';
import TextEllipsis from './directive/text-ellipsis';
import TableOrder from './directive/table-order';

import iframeModal from './service/iframe-modal';
import selector from './service/selector';

// promise polyfill
import esPromise from 'es6-promise';
esPromise.polyfill();
import './lib/classlist-polyfill';
import './lib/array-polyfill';

// 为axio增加jsonp支持
axios.jsonp = axios.create({
    adapter: axiosJsonp
});

const MpVueTools = {
    // 组件
    MpTable,
    MpPager,
    MpAutocomplete,
    MpTree,

    // 服务
    iframeModal,
    selector,

    // 工具类
    util,
    http: axios,

    // 安装方法
    install(Vue) {
        // 注册组件
        Vue.component(MpTable.name, MpTable);
        Vue.component(MpPager.name, MpPager);
        Vue.component(MpAutocomplete.name, MpAutocomplete);
        Vue.component(MpTree.name, MpTree);

        // 注册指令
        Vue.directive(MpShow.directiveName, MpShow);
        Vue.directive(TextEllipsis.directiveName, TextEllipsis);
        Vue.directive(TableOrder.directiveName, TableOrder);

        // 注册插件
        Vue.prototype.$http = axios;
        Vue.http = axios;

        uivInstall(Vue);
    }
};

// 自动注册mp-vue-tools
if (typeof Vue !== 'undefined') {
    Vue.use(MpVueTools);
}

export default MpVueTools;
export {
    // 组件
    MpTable,
    MpPager,
    MpAutocomplete,
    MpTree,

    // 服务
    iframeModal,
    selector,

    // 工具类
    util,
    axios as http
};
// 导出uiv
export { Carousel, Slide, Collapse, Dropdown, Modal, Tab, Tabs, DatePicker, Affix, Alert, Pagination, Tooltip, Popover, TimePicker, Typeahead, ProgressBar, ProgressBarStack, Breadcrumbs, BreadcrumbItem, Btn, BtnGroup, BtnToolbar, MultiSelect, Navbar, NavbarNav, NavbarForm, NavbarText, tooltip, popover, scrollspy, MessageBox, Notification };