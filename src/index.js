import axios from 'axios';
import axiosJsonp from './libs/axios-jsonp';
import util from './libs/util';

import MpTable from './components/mp-table';
import MpPager from './components/mp-pager';
import MpAutocomplete from './components/mp-autocomplete';

import MpShowDirective from './directives/mp-show';
import TextEllipsisDirective from './directives/text-ellipsis';

// promise polyfill
require('es6-promise').polyfill();
// classList polyfill
require('./libs/classlist-polyfill');

// 引入styles
require('./styles/index.less');

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
}

const MpVueTools = {
    install,

    // 组件
    MpTable,
    MpPager,
    MpAutocomplete,

    // 工具类
    util,    
    http: axios
};

// 自动注册mp-vue-tools
if (typeof Vue !== 'undefined') {
    Vue.use(MpVueTools);
}

module.exports = MpVueTools;