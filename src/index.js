// 引入styles
import './style/bootstrap.min.css';
import './style/common.css';
import './style/index.less';

import axios from 'axios';
import axiosJsonp from './lib/axios-jsonp';
import * as util from './lib/util';
import * as domUtil from './lib/dom-util';

import MpTable from './component/mp-table/index';
import MpPager from './component/mp-pager/index.vue';
import MpAutocomplete from './component/mp-autocomplete/index.vue';
import MpModal from './component/mp-modal/index.vue';

import MpShow from './directive/mp-show';
import TextEllipsis from './directive/text-ellipsis';
import TableOrder from './directive/table-order';

import messageBox from './service/message-box';
import iframeModal from './service/iframe-modal';
import selector from './service/selector';

// polyfill
import 'babel-polyfill';

// 为axio增加jsonp支持
axios.jsonp = axios.create({
    adapter: axiosJsonp
});

// http通用设置
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['Cache-Control'] = 'no-cache';
axios.defaults.headers.get['If-Modified-Since'] = 0;

const MpVueTools = {
    // 安装方法
    install(Vue) {
        // 注册组件
        Vue.component(MpTable.name, MpTable);
        Vue.component(MpPager.name, MpPager);
        Vue.component(MpAutocomplete.name, MpAutocomplete);
        Vue.component(MpModal.name, MpModal);

        // 注册指令
        Vue.directive(MpShow.directiveName, MpShow);
        Vue.directive(TextEllipsis.directiveName, TextEllipsis);
        Vue.directive(TableOrder.directiveName, TableOrder);
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
    MpModal,

    // 服务
    messageBox,
    iframeModal,
    selector,

    // 工具类
    util,
    domUtil,
    axios as http
};