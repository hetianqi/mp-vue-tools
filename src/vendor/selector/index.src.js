/**
 * [selector 组织架构、产品选择器]
 */

import { MpIframeModal } from 'mp-vue-tools';

// 占用全局变量
let selectorGlobal = window.selectorGlobal || (window.selectorGlobal = {});
// 实例队列
let queue = [];

let selector = {
	apiUrl: 'http://webapi.maipu.com/Selector-v2/',
	baseUrl: './',
	badge: '',
	// 单人
	singlePeople(option) {
		option.apiUrl = option.apiUrl || this.apiUrl;
		option.badge = option.badge || this.badge;
		selectorGlobal.singlePeople = option;	

		let instance = MpIframeModal({
			title: '单人',
			width: 932,
			height: 480,
			src: this.baseUrl + 'singlePeople.html?t=' + new Date().getTime()
		});
		queue.push(instance);
		return instance;
	},
	// 多人
	multiPeople(option) {
		option.apiUrl = option.apiUrl || this.apiUrl;
		option.badge = option.badge || this.badge;
		selectorGlobal.multiPeople = option;
		
		let instance = MpIframeModal({
			title: '多人',
			width: 932,
			height: 480,
			src: this.baseUrl + 'multiPeople.html?t=' + new Date().getTime()
		});
		queue.push(instance);
		return instance;
	},
	// 单部门
	singleDep(option) {
		option.apiUrl = option.apiUrl || this.apiUrl;
		selectorGlobal.singleDep = option;
		
		let instance = MpIframeModal({
			title: '单部门',
			width: 802,
			height: 480,
			src: this.baseUrl + 'singleDep.html?t=' + new Date().getTime()
		});
		queue.push(instance);
		return instance;
	},
	// 多部门
	multiDep(option) {
		option.apiUrl = option.apiUrl || this.apiUrl;
		selectorGlobal.multiDep = option;
		
		let instance = MpIframeModal({
			title: '多部门',
			width: 802,
			height: 480,
			src: this.baseUrl + 'multiDep.html?t=' + new Date().getTime()
		});
		queue.push(instance);
		return instance;
	},
	// 单职位
	singleJob(option) {
		option.apiUrl = option.apiUrl || this.apiUrl;
		selectorGlobal.singleJob = option;
		
		let instance = MpIframeModal({
			title: '单职位',
			width: 802,
			height: 480,
			src: this.baseUrl + 'singleJob.html?t=' + new Date().getTime()
		});
		queue.push(instance);
		return instance;
	},
	// 多职位
	multiJob(option) {
		option.apiUrl = option.apiUrl || this.apiUrl;
		selectorGlobal.multiJob = option;
		
		let instance = MpIframeModal({
			title: '多职位',
			width: 802,
			height: 480,
			src: this.baseUrl + 'multiJob.html?t=' + new Date().getTime()
		});
		queue.push(instance);
		return instance;
	},
	// 单部门职位
	singleDepJob (option) {
		option.apiUrl = option.apiUrl || this.apiUrl;
		selectorGlobal.singleDepJob = option;
		
		let instance = MpIframeModal({
			title: '单部门职位',
			width: 802,
			height: 480,
			src: this.baseUrl + 'singleDepJob.html?t=' + new Date().getTime()
		});
		queue.push(instance);
		return instance;
	},
	// 多部门职位
	multiDepJob (option) {
		option.apiUrl = option.apiUrl || this.apiUrl;
		selectorGlobal.multiDepJob = option;
		
		let instance = MpIframeModal({
			title: '多部门职位',
			width: 802,
			height: 480,
			src: this.baseUrl + 'multiDepJob.html?t=' + new Date().getTime()
		});
		queue.push(instance);
		return instance;
	},		
	// 单产品
	singleProduct (option) {
		option.apiUrl = option.apiUrl || this.apiUrl;
		selectorGlobal.singleProduct = option;
		
		let instance = MpIframeModal({
			title: '单产品',
			width: 532,
			height: 480,
			src: this.baseUrl + 'singleProduct.html?t=' + new Date().getTime()
		});
		queue.push(instance);
		return instance;
	},
	// 多产品
	multiProduct (option) {
		option.apiUrl = option.apiUrl || this.apiUrl;
		selectorGlobal.multiProduct = option;
		
		let instance = MpIframeModal({
			title: '多产品',
			width: 802,
			height: 480,
			src: this.baseUrl + 'multiProduct.html?t=' + new Date().getTime()
		});
		queue.push(instance);
		return instance;
	},
	// 关闭选择器
	close(instance) {
		if (!instance) {
			instance = queue.pop();
		}
		instance && MpIframeModal.close(instance);
	}
};

export default selector;