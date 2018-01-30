import axios from 'axios';
import axiosJsonp from './libs/axios-jsonp';
import MpTable from './components/mp-table';
import MpPager from './components/mp-pager';

// promise polyfill
require('es6-promise').polyfill();

// 引入styles
require('./styles/index.less');

// 为axio增加jsonp支持
axios.jsonp = axios.create({
    adapter: axiosJsonp
});

function install(Vue) {
    // 注册组件
    Vue.component('MpTable', MpTable);
    Vue.component('MpPager', MpPager);

    // 注册插件
    Vue.prototype.$http = axios;
    Vue.http = axios;
}

let MpVueTools = {
    install,
    MpTable,
    MpPager
};

// 自动注册mp-vue-tools
if (typeof Vue !== 'undefined') {
    Vue.use(MpVueTools);
}

export default MpVueTools;