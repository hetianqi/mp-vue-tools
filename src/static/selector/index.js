(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mp-vue-tools"));
	else if(typeof define === 'function' && define.amd)
		define(["mp-vue-tools"], factory);
	else if(typeof exports === 'object')
		exports["selector"] = factory(require("mp-vue-tools"));
	else
		root["selector"] = factory(root["mp-vue-tools"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mp_vue_tools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__);
/**
 * [selector 组织架构、产品选择器]
 */



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

		let instance = Object(__WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__["MpIframeModal"])({
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
		
		let instance = Object(__WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__["MpIframeModal"])({
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
		
		let instance = Object(__WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__["MpIframeModal"])({
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
		
		let instance = Object(__WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__["MpIframeModal"])({
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
		
		let instance = Object(__WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__["MpIframeModal"])({
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
		
		let instance = Object(__WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__["MpIframeModal"])({
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
		
		let instance = Object(__WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__["MpIframeModal"])({
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
		
		let instance = Object(__WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__["MpIframeModal"])({
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
		
		let instance = Object(__WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__["MpIframeModal"])({
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
		
		let instance = Object(__WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__["MpIframeModal"])({
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
		instance && __WEBPACK_IMPORTED_MODULE_0_mp_vue_tools__["MpIframeModal"].close(instance);
	}
};

/* harmony default export */ __webpack_exports__["default"] = (selector);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});