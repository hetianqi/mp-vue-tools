/**
 * [selector 组织架构、产品选择器]
 */

import iframeModal from '../iframe-modal';

// 占用全局变量
let selectorGlobal = window.selectorGlobal || (window.selectorGlobal = {});
// 实例队列
let queue = [];
// 回调函数队列
let callbackQueue = [];

function show(evt, option) {
	let win = evt.target.contentWindow;
	let listener = function (evt) {
		if (selector.rootUrl.indexOf(evt.origin) === -1) return;
		option.callback(JSON.parse(evt.data));
	}
	window.addEventListener('message', listener, false);
	callbackQueue.push({
		callback: option.callback,
		listener: listener
	});
	// 将选项传到iframe中
	win.postMessage(JSON.stringify(option), selector.rootUrl);
}

function hide(option) {
	let index = -1;
	callbackQueue.forEach((item, idx) => {
		if (item.callback === option.callback) {
			window.removeEventListener('message', item.listener, false);
			index = idx;
		}
	});
	if (index > -1) {
		callbackQueue.splice(index, 1);
	}
}

let selector = {
	rootUrl: 'http://webapi.maipu.com/Selector-v2/',
	badge: '',
	// 单人
	singlePeople(option) {
		option = option || {};
		if (!option.callback) {
			throw new Error('请指定callback');
		}
		let instance = iframeModal({
			title: '单人',
			width: 932,
			height: 480,
			src: this.rootUrl + 'Selector/SinglePeople?origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.hostname),
			onHide() {
				hide(option);
			},
			onLoad(evt) {
				show(evt, option);
			}
		});
		queue.push(instance);
		return instance;
	},
	// 多人
	multiPeople(option) {
		option = option || {};
		if (!option.callback) {
			throw new Error('请指定callback');
		}
		let instance = iframeModal({
			title: '多人',
			width: 932,
			height: 480,
			src: this.rootUrl + 'Selector/MultiPeople?origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.hostname),
			onHide() {
				hide(option);
			},
			onLoad(evt) {
				show(evt, option);
			}
		});
		queue.push(instance);
		return instance;
	},
	// 单部门
	singleDep(option) {
		option = option || {};
		if (!option.callback) {
			throw new Error('请指定callback');
		}
		let instance = iframeModal({
			title: '单部门',
			width: 802,
			height: 480,
			src: this.rootUrl + 'Selector/SingleDep?origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.hostname),
			onHide() {
				hide(option);
			},
			onLoad(evt) {
				show(evt, option);
			}
		});
		queue.push(instance);
		return instance;
	},
	// 多部门
	multiDep(option) {
		option = option || {};
		if (!option.callback) {
			throw new Error('请指定callback');
		}
		let instance = iframeModal({
			title: '多部门',
			width: 802,
			height: 480,
			src: this.rootUrl + 'Selector/MultiDep?origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.hostname),
			onHide() {
				hide(option);
			},
			onLoad(evt) {
				show(evt, option);
			}
		});
		queue.push(instance);
		return instance;
	},
	// 单职位
	singleJob(option) {
		option = option || {};
		if (!option.callback) {
			throw new Error('请指定callback');
		}
		let instance = iframeModal({
			title: '单职位',
			width: 502,
			height: 480,
			src: this.rootUrl + 'Selector/SingleJob?origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.hostname),
			onHide() {
				hide(option);
			},
			onLoad(evt) {
				show(evt, option);
			}
		});
		queue.push(instance);
		return instance;
	},
	// 多职位
	multiJob(option) {
		option = option || {};
		if (!option.callback) {
			throw new Error('请指定callback');
		}
		let instance = iframeModal({
			title: '多职位',
			width: 502,
			height: 480,
			src: this.rootUrl + 'Selector/MultiJob?origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.hostname),
			onHide() {
				hide(option);
			},
			onLoad(evt) {
				show(evt, option);
			}
		});
		queue.push(instance);
		return instance;
	},
	// 单部门职位
	singleDepJob (option) {
		option = option || {};
		if (!option.callback) {
			throw new Error('请指定callback');
		}
		let instance = iframeModal({
			title: '单部门职位',
			width: 802,
			height: 480,
			src: this.rootUrl + 'Selector/SingleDepJob?origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.hostname),
			onHide() {
				hide(option);
			},
			onLoad(evt) {
				show(evt, option);
			}
		});
		queue.push(instance);
		return instance;
	},
	// 多部门职位
	multiDepJob (option) {
		option = option || {};
		if (!option.callback) {
			throw new Error('请指定callback');
		}
		let instance = iframeModal({
			title: '多部门职位',
			width: 802,
			height: 480,
			src: this.rootUrl + 'Selector/MultiDepJob?origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.hostname),
			onHide() {
				hide(option);
			},
			onLoad(evt) {
				show(evt, option);
			}
		});
		queue.push(instance);
		return instance;
	},		
	// 单产品
	singleProduct (option) {
		option = option || {};
		if (!option.callback) {
			throw new Error('请指定callback');
		}
		let instance = iframeModal({
			title: '单产品',
			width: 532,
			height: 480,
			src: this.rootUrl + 'Selector/SingleProduct?origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.hostname),
			onHide() {
				hide(option);
			},
			onLoad(evt) {
				show(evt, option);
			}
		});
		queue.push(instance);
		return instance;
	},
	// 多产品
	multiProduct (option) {
		option = option || {};
		if (!option.callback) {
			throw new Error('请指定callback');
		}
		let instance = iframeModal({
			title: '多产品',
			width: 802,
			height: 480,
			src: this.rootUrl + 'Selector/MultiProduct?origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.hostname),
			onHide() {
				hide(option);
			},
			onLoad(evt) {
				show(evt, option);
			}
		});
		queue.push(instance);
		return instance;
	},
	// 关闭选择器
	close(instance) {
		if (!instance) {
			instance = queue.pop();
		}
		instance && iframeModal.close(instance);
	}
};

export default selector;