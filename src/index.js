import axios from 'axios';
import axiosJsonp from './lib/axios-jsonp';
import * as util from './lib/util';
import { Carousel, Slide, Collapse, Dropdown, Modal, Tab, Tabs, DatePicker, Affix, Alert, Pagination, Tooltip, Popover, TimePicker, Typeahead, ProgressBar, ProgressBarStack, Breadcrumbs, BreadcrumbItem, Btn, BtnGroup, BtnToolbar, MultiSelect, Navbar, NavbarNav, NavbarForm, NavbarText, tooltip, popover, scrollspy, MessageBox, Notification, install as uivInstall } from 'uiv';

import MpTable from './component/mp-table/index.vue';
import MpPager from './component/mp-pager/index.vue';
import MpAutocomplete from './component/mp-autocomplete/index.vue';

import MpShowDirective from './directive/mp-show';
import TextEllipsisDirective from './directive/text-ellipsis';

import MpIframeModal from './service/mp-iframe-modal';

// promise polyfill
import esPromise from 'es6-promise';
esPromise.polyfill();
// classList polyfill
import './lib/classlist-polyfill';

// 引入styles
import './style/index.less';

// 为axio增加jsonp支持
axios.jsonp = axios.create({
    adapter: axiosJsonp
});

function install(Vue) {
    // 注册组件
    Vue.component(MpTable.name, MpTable);
    Vue.component(MpPager.name, MpPager);
    Vue.component(MpAutocomplete.name, MpAutocomplete);

    // 注册指令
    Vue.directive(MpShowDirective.directiveName, MpShowDirective);
    Vue.directive(TextEllipsisDirective.directiveName, TextEllipsisDirective);

    // 注册插件
    Vue.prototype.$http = axios;
    Vue.http = axios;

    uivInstall(Vue);
}

// 自动注册mp-vue-tools
if (typeof Vue !== 'undefined') {
    Vue.use({ install });
}

export {
    // 组件
    MpTable,
    MpPager,
    MpAutocomplete,

    // 服务
    MpIframeModal,

    // 工具类
    util,
    axios as http,

    install
};
// 导出uiv
export { Carousel, Slide, Collapse, Dropdown, Modal, Tab, Tabs, DatePicker, Affix, Alert, Pagination, Tooltip, Popover, TimePicker, Typeahead, ProgressBar, ProgressBarStack, Breadcrumbs, BreadcrumbItem, Btn, BtnGroup, BtnToolbar, MultiSelect, Navbar, NavbarNav, NavbarForm, NavbarText, tooltip, popover, scrollspy, MessageBox, Notification };