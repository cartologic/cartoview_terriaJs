/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/string-replace-webpack-plugin/loader.js?id=76z1falrfuw!./node_modules/string-replace-webpack-plugin/loader.js?id=a5434ipahyn!./node_modules/terriajs/buildprocess/removeCesiumDebugPragmas.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/inflate.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/string-replace-webpack-plugin/loader.js?id=76z1falrfuw!./node_modules/string-replace-webpack-plugin/loader.js?id=a5434ipahyn!./node_modules/terriajs/buildprocess/removeCesiumDebugPragmas.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/inflate.js":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/string-replace-webpack-plugin/loader.js?id=76z1falrfuw!./node_modules/string-replace-webpack-plugin/loader.js?id=a5434ipahyn!./node_modules/terriajs/buildprocess/removeCesiumDebugPragmas.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/inflate.js ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
 * JZlib is based on zlib-1.1.3, so all credit should go authors
 * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
 * and contributors of zlib.
 */

(function(obj) {

	// Global
	var MAX_BITS = 15;

	var Z_OK = 0;
	var Z_STREAM_END = 1;
	var Z_NEED_DICT = 2;
	var Z_STREAM_ERROR = -2;
	var Z_DATA_ERROR = -3;
	var Z_MEM_ERROR = -4;
	var Z_BUF_ERROR = -5;

	var inflate_mask = [ 0x00000000, 0x00000001, 0x00000003, 0x00000007, 0x0000000f, 0x0000001f, 0x0000003f, 0x0000007f, 0x000000ff, 0x000001ff, 0x000003ff,
			0x000007ff, 0x00000fff, 0x00001fff, 0x00003fff, 0x00007fff, 0x0000ffff ];

	var MANY = 1440;

	// JZlib version : "1.0.2"
	var Z_NO_FLUSH = 0;
	var Z_FINISH = 4;

	// InfTree
	var fixed_bl = 9;
	var fixed_bd = 5;

	var fixed_tl = [ 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0,
			0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40,
			0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13,
			0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60,
			0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7,
			35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8,
			26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80,
			7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8, 6, 0, 8, 134, 0,
			8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0,
			8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97,
			0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210,
			81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117,
			0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154,
			84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83,
			0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230,
			80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139,
			0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174,
			0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111,
			0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9,
			193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8,
			120, 0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8,
			227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8,
			92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9,
			249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8,
			130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9,
			181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8,
			102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9,
			221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0,
			8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9,
			147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8,
			85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9,
			235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8,
			141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9,
			167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8,
			107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9,
			207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8,
			127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255 ];
	var fixed_td = [ 80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5,
			8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5,
			24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577 ];

	// Tables for deflate from PKZIP's appnote.txt.
	var cplens = [ // Copy lengths for literal codes 257..285
	3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0 ];

	// see note #13 above about 258
	var cplext = [ // Extra bits for literal codes 257..285
	0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112 // 112==invalid
	];

	var cpdist = [ // Copy offsets for distance codes 0..29
	1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577 ];

	var cpdext = [ // Extra bits for distance codes
	0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 ];

	// If BMAX needs to be larger than 16, then h and x[] should be uLong.
	var BMAX = 15; // maximum bit length of any code

	function InfTree() {
		var that = this;

		var hn; // hufts used in space
		var v; // work area for huft_build
		var c; // bit length count table
		var r; // table entry for structure assignment
		var u; // table stack
		var x; // bit offsets, then code stack

		function huft_build(b, // code lengths in bits (all assumed <=
		// BMAX)
		bindex, n, // number of codes (assumed <= 288)
		s, // number of simple-valued codes (0..s-1)
		d, // list of base values for non-simple codes
		e, // list of extra bits for non-simple codes
		t, // result: starting table
		m, // maximum lookup bits, returns actual
		hp,// space for trees
		hn,// hufts used in space
		v // working area: values in order of bit length
		) {
			// Given a list of code lengths and a maximum table size, make a set of
			// tables to decode that set of codes. Return Z_OK on success,
			// Z_BUF_ERROR
			// if the given code set is incomplete (the tables are still built in
			// this
			// case), Z_DATA_ERROR if the input is invalid (an over-subscribed set
			// of
			// lengths), or Z_MEM_ERROR if not enough memory.

			var a; // counter for codes of length k
			var f; // i repeats in table every f entries
			var g; // maximum code length
			var h; // table level
			var i; // counter, current code
			var j; // counter
			var k; // number of bits in current code
			var l; // bits per table (returned in m)
			var mask; // (1 << w) - 1, to avoid cc -O bug on HP
			var p; // pointer into c[], b[], or v[]
			var q; // points to current table
			var w; // bits before this table == (l * h)
			var xp; // pointer into x
			var y; // number of dummy codes added
			var z; // number of entries in current table

			// Generate counts for each bit length

			p = 0;
			i = n;
			do {
				c[b[bindex + p]]++;
				p++;
				i--; // assume all entries <= BMAX
			} while (i !== 0);

			if (c[0] == n) { // null input--all zero length codes
				t[0] = -1;
				m[0] = 0;
				return Z_OK;
			}

			// Find minimum and maximum length, bound *m by those
			l = m[0];
			for (j = 1; j <= BMAX; j++)
				if (c[j] !== 0)
					break;
			k = j; // minimum code length
			if (l < j) {
				l = j;
			}
			for (i = BMAX; i !== 0; i--) {
				if (c[i] !== 0)
					break;
			}
			g = i; // maximum code length
			if (l > i) {
				l = i;
			}
			m[0] = l;

			// Adjust last length count to fill out codes, if needed
			for (y = 1 << j; j < i; j++, y <<= 1) {
				if ((y -= c[j]) < 0) {
					return Z_DATA_ERROR;
				}
			}
			if ((y -= c[i]) < 0) {
				return Z_DATA_ERROR;
			}
			c[i] += y;

			// Generate starting offsets into the value table for each length
			x[1] = j = 0;
			p = 1;
			xp = 2;
			while (--i !== 0) { // note that i == g from above
				x[xp] = (j += c[p]);
				xp++;
				p++;
			}

			// Make a table of values in order of bit lengths
			i = 0;
			p = 0;
			do {
				if ((j = b[bindex + p]) !== 0) {
					v[x[j]++] = i;
				}
				p++;
			} while (++i < n);
			n = x[g]; // set n to length of v

			// Generate the Huffman codes and for each, make the table entries
			x[0] = i = 0; // first Huffman code is zero
			p = 0; // grab values in bit order
			h = -1; // no tables yet--level -1
			w = -l; // bits decoded == (l * h)
			u[0] = 0; // just to keep compilers happy
			q = 0; // ditto
			z = 0; // ditto

			// go through the bit lengths (k already is bits in shortest code)
			for (; k <= g; k++) {
				a = c[k];
				while (a-- !== 0) {
					// here i is the Huffman code of length k bits for value *p
					// make tables up to required level
					while (k > w + l) {
						h++;
						w += l; // previous table always l bits
						// compute minimum size table less than or equal to l bits
						z = g - w;
						z = (z > l) ? l : z; // table size upper limit
						if ((f = 1 << (j = k - w)) > a + 1) { // try a k-w bit table
							// too few codes for
							// k-w bit table
							f -= a + 1; // deduct codes from patterns left
							xp = k;
							if (j < z) {
								while (++j < z) { // try smaller tables up to z bits
									if ((f <<= 1) <= c[++xp])
										break; // enough codes to use up j bits
									f -= c[xp]; // else deduct codes from patterns
								}
							}
						}
						z = 1 << j; // table entries for j-bit table

						// allocate new table
						if (hn[0] + z > MANY) { // (note: doesn't matter for fixed)
							return Z_DATA_ERROR; // overflow of MANY
						}
						u[h] = q = /* hp+ */hn[0]; // DEBUG
						hn[0] += z;

						// connect to last table, if there is one
						if (h !== 0) {
							x[h] = i; // save pattern for backing up
							r[0] = /* (byte) */j; // bits in this table
							r[1] = /* (byte) */l; // bits to dump before this table
							j = i >>> (w - l);
							r[2] = /* (int) */(q - u[h - 1] - j); // offset to this table
							hp.set(r, (u[h - 1] + j) * 3);
							// to
							// last
							// table
						} else {
							t[0] = q; // first table is returned result
						}
					}

					// set up table entry in r
					r[1] = /* (byte) */(k - w);
					if (p >= n) {
						r[0] = 128 + 64; // out of values--invalid code
					} else if (v[p] < s) {
						r[0] = /* (byte) */(v[p] < 256 ? 0 : 32 + 64); // 256 is
						// end-of-block
						r[2] = v[p++]; // simple code is just the value
					} else {
						r[0] = /* (byte) */(e[v[p] - s] + 16 + 64); // non-simple--look
						// up in lists
						r[2] = d[v[p++] - s];
					}

					// fill code-like entries with r
					f = 1 << (k - w);
					for (j = i >>> w; j < z; j += f) {
						hp.set(r, (q + j) * 3);
					}

					// backwards increment the k-bit code i
					for (j = 1 << (k - 1); (i & j) !== 0; j >>>= 1) {
						i ^= j;
					}
					i ^= j;

					// backup over finished tables
					mask = (1 << w) - 1; // needed on HP, cc -O bug
					while ((i & mask) != x[h]) {
						h--; // don't need to update q
						w -= l;
						mask = (1 << w) - 1;
					}
				}
			}
			// Return Z_BUF_ERROR if we were given an incomplete table
			return y !== 0 && g != 1 ? Z_BUF_ERROR : Z_OK;
		}

		function initWorkArea(vsize) {
			var i;
			if (!hn) {
				hn = []; // []; //new Array(1);
				v = []; // new Array(vsize);
				c = new Int32Array(BMAX + 1); // new Array(BMAX + 1);
				r = []; // new Array(3);
				u = new Int32Array(BMAX); // new Array(BMAX);
				x = new Int32Array(BMAX + 1); // new Array(BMAX + 1);
			}
			if (v.length < vsize) {
				v = []; // new Array(vsize);
			}
			for (i = 0; i < vsize; i++) {
				v[i] = 0;
			}
			for (i = 0; i < BMAX + 1; i++) {
				c[i] = 0;
			}
			for (i = 0; i < 3; i++) {
				r[i] = 0;
			}
			// for(int i=0; i<BMAX; i++){u[i]=0;}
			u.set(c.subarray(0, BMAX), 0);
			// for(int i=0; i<BMAX+1; i++){x[i]=0;}
			x.set(c.subarray(0, BMAX + 1), 0);
		}

		that.inflate_trees_bits = function(c, // 19 code lengths
		bb, // bits tree desired/actual depth
		tb, // bits tree result
		hp, // space for trees
		z // for messages
		) {
			var result;
			initWorkArea(19);
			hn[0] = 0;
			result = huft_build(c, 0, 19, 19, null, null, tb, bb, hp, hn, v);

			if (result == Z_DATA_ERROR) {
				z.msg = "oversubscribed dynamic bit lengths tree";
			} else if (result == Z_BUF_ERROR || bb[0] === 0) {
				z.msg = "incomplete dynamic bit lengths tree";
				result = Z_DATA_ERROR;
			}
			return result;
		};

		that.inflate_trees_dynamic = function(nl, // number of literal/length codes
		nd, // number of distance codes
		c, // that many (total) code lengths
		bl, // literal desired/actual bit depth
		bd, // distance desired/actual bit depth
		tl, // literal/length tree result
		td, // distance tree result
		hp, // space for trees
		z // for messages
		) {
			var result;

			// build literal/length tree
			initWorkArea(288);
			hn[0] = 0;
			result = huft_build(c, 0, nl, 257, cplens, cplext, tl, bl, hp, hn, v);
			if (result != Z_OK || bl[0] === 0) {
				if (result == Z_DATA_ERROR) {
					z.msg = "oversubscribed literal/length tree";
				} else if (result != Z_MEM_ERROR) {
					z.msg = "incomplete literal/length tree";
					result = Z_DATA_ERROR;
				}
				return result;
			}

			// build distance tree
			initWorkArea(288);
			result = huft_build(c, nl, nd, 0, cpdist, cpdext, td, bd, hp, hn, v);

			if (result != Z_OK || (bd[0] === 0 && nl > 257)) {
				if (result == Z_DATA_ERROR) {
					z.msg = "oversubscribed distance tree";
				} else if (result == Z_BUF_ERROR) {
					z.msg = "incomplete distance tree";
					result = Z_DATA_ERROR;
				} else if (result != Z_MEM_ERROR) {
					z.msg = "empty distance tree with lengths";
					result = Z_DATA_ERROR;
				}
				return result;
			}

			return Z_OK;
		};

	}

	InfTree.inflate_trees_fixed = function(bl, // literal desired/actual bit depth
	bd, // distance desired/actual bit depth
	tl,// literal/length tree result
	td// distance tree result
	) {
		bl[0] = fixed_bl;
		bd[0] = fixed_bd;
		tl[0] = fixed_tl;
		td[0] = fixed_td;
		return Z_OK;
	};

	// InfCodes

	// waiting for "i:"=input,
	// "o:"=output,
	// "x:"=nothing
	var START = 0; // x: set up for LEN
	var LEN = 1; // i: get length/literal/eob next
	var LENEXT = 2; // i: getting length extra (have base)
	var DIST = 3; // i: get distance next
	var DISTEXT = 4;// i: getting distance extra
	var COPY = 5; // o: copying bytes in window, waiting
	// for space
	var LIT = 6; // o: got literal, waiting for output
	// space
	var WASH = 7; // o: got eob, possibly still output
	// waiting
	var END = 8; // x: got eob and all data flushed
	var BADCODE = 9;// x: got error

	function InfCodes() {
		var that = this;

		var mode; // current inflate_codes mode

		// mode dependent information
		var len = 0;

		var tree; // pointer into tree
		var tree_index = 0;
		var need = 0; // bits needed

		var lit = 0;

		// if EXT or COPY, where and how much
		var get = 0; // bits to get for extra
		var dist = 0; // distance back to copy from

		var lbits = 0; // ltree bits decoded per branch
		var dbits = 0; // dtree bits decoder per branch
		var ltree; // literal/length/eob tree
		var ltree_index = 0; // literal/length/eob tree
		var dtree; // distance tree
		var dtree_index = 0; // distance tree

		// Called with number of bytes left to write in window at least 258
		// (the maximum string length) and number of input bytes available
		// at least ten. The ten bytes are six bytes for the longest length/
		// distance pair plus four bytes for overloading the bit buffer.

		function inflate_fast(bl, bd, tl, tl_index, td, td_index, s, z) {
			var t; // temporary pointer
			var tp; // temporary pointer
			var tp_index; // temporary pointer
			var e; // extra bits or operation
			var b; // bit buffer
			var k; // bits in bit buffer
			var p; // input data pointer
			var n; // bytes available there
			var q; // output window write pointer
			var m; // bytes to end of window or read pointer
			var ml; // mask for literal/length tree
			var md; // mask for distance tree
			var c; // bytes to copy
			var d; // distance back to copy from
			var r; // copy source pointer

			var tp_index_t_3; // (tp_index+t)*3

			// load input, output, bit values
			p = z.next_in_index;
			n = z.avail_in;
			b = s.bitb;
			k = s.bitk;
			q = s.write;
			m = q < s.read ? s.read - q - 1 : s.end - q;

			// initialize masks
			ml = inflate_mask[bl];
			md = inflate_mask[bd];

			// do until not enough input or output space for fast loop
			do { // assume called with m >= 258 && n >= 10
				// get literal/length code
				while (k < (20)) { // max bits for literal/length code
					n--;
					b |= (z.read_byte(p++) & 0xff) << k;
					k += 8;
				}

				t = b & ml;
				tp = tl;
				tp_index = tl_index;
				tp_index_t_3 = (tp_index + t) * 3;
				if ((e = tp[tp_index_t_3]) === 0) {
					b >>= (tp[tp_index_t_3 + 1]);
					k -= (tp[tp_index_t_3 + 1]);

					s.window[q++] = /* (byte) */tp[tp_index_t_3 + 2];
					m--;
					continue;
				}
				do {

					b >>= (tp[tp_index_t_3 + 1]);
					k -= (tp[tp_index_t_3 + 1]);

					if ((e & 16) !== 0) {
						e &= 15;
						c = tp[tp_index_t_3 + 2] + (/* (int) */b & inflate_mask[e]);

						b >>= e;
						k -= e;

						// decode distance base of block to copy
						while (k < (15)) { // max bits for distance code
							n--;
							b |= (z.read_byte(p++) & 0xff) << k;
							k += 8;
						}

						t = b & md;
						tp = td;
						tp_index = td_index;
						tp_index_t_3 = (tp_index + t) * 3;
						e = tp[tp_index_t_3];

						do {

							b >>= (tp[tp_index_t_3 + 1]);
							k -= (tp[tp_index_t_3 + 1]);

							if ((e & 16) !== 0) {
								// get extra bits to add to distance base
								e &= 15;
								while (k < (e)) { // get extra bits (up to 13)
									n--;
									b |= (z.read_byte(p++) & 0xff) << k;
									k += 8;
								}

								d = tp[tp_index_t_3 + 2] + (b & inflate_mask[e]);

								b >>= (e);
								k -= (e);

								// do the copy
								m -= c;
								if (q >= d) { // offset before dest
									// just copy
									r = q - d;
									if (q - r > 0 && 2 > (q - r)) {
										s.window[q++] = s.window[r++]; // minimum
										// count is
										// three,
										s.window[q++] = s.window[r++]; // so unroll
										// loop a
										// little
										c -= 2;
									} else {
										s.window.set(s.window.subarray(r, r + 2), q);
										q += 2;
										r += 2;
										c -= 2;
									}
								} else { // else offset after destination
									r = q - d;
									do {
										r += s.end; // force pointer in window
									} while (r < 0); // covers invalid distances
									e = s.end - r;
									if (c > e) { // if source crosses,
										c -= e; // wrapped copy
										if (q - r > 0 && e > (q - r)) {
											do {
												s.window[q++] = s.window[r++];
											} while (--e !== 0);
										} else {
											s.window.set(s.window.subarray(r, r + e), q);
											q += e;
											r += e;
											e = 0;
										}
										r = 0; // copy rest from start of window
									}

								}

								// copy all or what's left
								if (q - r > 0 && c > (q - r)) {
									do {
										s.window[q++] = s.window[r++];
									} while (--c !== 0);
								} else {
									s.window.set(s.window.subarray(r, r + c), q);
									q += c;
									r += c;
									c = 0;
								}
								break;
							} else if ((e & 64) === 0) {
								t += tp[tp_index_t_3 + 2];
								t += (b & inflate_mask[e]);
								tp_index_t_3 = (tp_index + t) * 3;
								e = tp[tp_index_t_3];
							} else {
								z.msg = "invalid distance code";

								c = z.avail_in - n;
								c = (k >> 3) < c ? k >> 3 : c;
								n += c;
								p -= c;
								k -= c << 3;

								s.bitb = b;
								s.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								s.write = q;

								return Z_DATA_ERROR;
							}
						} while (true);
						break;
					}

					if ((e & 64) === 0) {
						t += tp[tp_index_t_3 + 2];
						t += (b & inflate_mask[e]);
						tp_index_t_3 = (tp_index + t) * 3;
						if ((e = tp[tp_index_t_3]) === 0) {

							b >>= (tp[tp_index_t_3 + 1]);
							k -= (tp[tp_index_t_3 + 1]);

							s.window[q++] = /* (byte) */tp[tp_index_t_3 + 2];
							m--;
							break;
						}
					} else if ((e & 32) !== 0) {

						c = z.avail_in - n;
						c = (k >> 3) < c ? k >> 3 : c;
						n += c;
						p -= c;
						k -= c << 3;

						s.bitb = b;
						s.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						s.write = q;

						return Z_STREAM_END;
					} else {
						z.msg = "invalid literal/length code";

						c = z.avail_in - n;
						c = (k >> 3) < c ? k >> 3 : c;
						n += c;
						p -= c;
						k -= c << 3;

						s.bitb = b;
						s.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						s.write = q;

						return Z_DATA_ERROR;
					}
				} while (true);
			} while (m >= 258 && n >= 10);

			// not enough input or output--restore pointers and return
			c = z.avail_in - n;
			c = (k >> 3) < c ? k >> 3 : c;
			n += c;
			p -= c;
			k -= c << 3;

			s.bitb = b;
			s.bitk = k;
			z.avail_in = n;
			z.total_in += p - z.next_in_index;
			z.next_in_index = p;
			s.write = q;

			return Z_OK;
		}

		that.init = function(bl, bd, tl, tl_index, td, td_index) {
			mode = START;
			lbits = /* (byte) */bl;
			dbits = /* (byte) */bd;
			ltree = tl;
			ltree_index = tl_index;
			dtree = td;
			dtree_index = td_index;
			tree = null;
		};

		that.proc = function(s, z, r) {
			var j; // temporary storage
			var tindex; // temporary pointer
			var e; // extra bits or operation
			var b = 0; // bit buffer
			var k = 0; // bits in bit buffer
			var p = 0; // input data pointer
			var n; // bytes available there
			var q; // output window write pointer
			var m; // bytes to end of window or read pointer
			var f; // pointer to copy strings from

			// copy input/output information to locals (UPDATE macro restores)
			p = z.next_in_index;
			n = z.avail_in;
			b = s.bitb;
			k = s.bitk;
			q = s.write;
			m = q < s.read ? s.read - q - 1 : s.end - q;

			// process input and output based on current state
			while (true) {
				switch (mode) {
				// waiting for "i:"=input, "o:"=output, "x:"=nothing
				case START: // x: set up for LEN
					if (m >= 258 && n >= 10) {

						s.bitb = b;
						s.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						s.write = q;
						r = inflate_fast(lbits, dbits, ltree, ltree_index, dtree, dtree_index, s, z);

						p = z.next_in_index;
						n = z.avail_in;
						b = s.bitb;
						k = s.bitk;
						q = s.write;
						m = q < s.read ? s.read - q - 1 : s.end - q;

						if (r != Z_OK) {
							mode = r == Z_STREAM_END ? WASH : BADCODE;
							break;
						}
					}
					need = lbits;
					tree = ltree;
					tree_index = ltree_index;

					mode = LEN;
				case LEN: // i: get length/literal/eob next
					j = need;

					while (k < (j)) {
						if (n !== 0)
							r = Z_OK;
						else {

							s.bitb = b;
							s.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							s.write = q;
							return s.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					tindex = (tree_index + (b & inflate_mask[j])) * 3;

					b >>>= (tree[tindex + 1]);
					k -= (tree[tindex + 1]);

					e = tree[tindex];

					if (e === 0) { // literal
						lit = tree[tindex + 2];
						mode = LIT;
						break;
					}
					if ((e & 16) !== 0) { // length
						get = e & 15;
						len = tree[tindex + 2];
						mode = LENEXT;
						break;
					}
					if ((e & 64) === 0) { // next table
						need = e;
						tree_index = tindex / 3 + tree[tindex + 2];
						break;
					}
					if ((e & 32) !== 0) { // end of block
						mode = WASH;
						break;
					}
					mode = BADCODE; // invalid code
					z.msg = "invalid literal/length code";
					r = Z_DATA_ERROR;

					s.bitb = b;
					s.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					s.write = q;
					return s.inflate_flush(z, r);

				case LENEXT: // i: getting length extra (have base)
					j = get;

					while (k < (j)) {
						if (n !== 0)
							r = Z_OK;
						else {

							s.bitb = b;
							s.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							s.write = q;
							return s.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					len += (b & inflate_mask[j]);

					b >>= j;
					k -= j;

					need = dbits;
					tree = dtree;
					tree_index = dtree_index;
					mode = DIST;
				case DIST: // i: get distance next
					j = need;

					while (k < (j)) {
						if (n !== 0)
							r = Z_OK;
						else {

							s.bitb = b;
							s.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							s.write = q;
							return s.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					tindex = (tree_index + (b & inflate_mask[j])) * 3;

					b >>= tree[tindex + 1];
					k -= tree[tindex + 1];

					e = (tree[tindex]);
					if ((e & 16) !== 0) { // distance
						get = e & 15;
						dist = tree[tindex + 2];
						mode = DISTEXT;
						break;
					}
					if ((e & 64) === 0) { // next table
						need = e;
						tree_index = tindex / 3 + tree[tindex + 2];
						break;
					}
					mode = BADCODE; // invalid code
					z.msg = "invalid distance code";
					r = Z_DATA_ERROR;

					s.bitb = b;
					s.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					s.write = q;
					return s.inflate_flush(z, r);

				case DISTEXT: // i: getting distance extra
					j = get;

					while (k < (j)) {
						if (n !== 0)
							r = Z_OK;
						else {

							s.bitb = b;
							s.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							s.write = q;
							return s.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					dist += (b & inflate_mask[j]);

					b >>= j;
					k -= j;

					mode = COPY;
				case COPY: // o: copying bytes in window, waiting for space
					f = q - dist;
					while (f < 0) { // modulo window size-"while" instead
						f += s.end; // of "if" handles invalid distances
					}
					while (len !== 0) {

						if (m === 0) {
							if (q == s.end && s.read !== 0) {
								q = 0;
								m = q < s.read ? s.read - q - 1 : s.end - q;
							}
							if (m === 0) {
								s.write = q;
								r = s.inflate_flush(z, r);
								q = s.write;
								m = q < s.read ? s.read - q - 1 : s.end - q;

								if (q == s.end && s.read !== 0) {
									q = 0;
									m = q < s.read ? s.read - q - 1 : s.end - q;
								}

								if (m === 0) {
									s.bitb = b;
									s.bitk = k;
									z.avail_in = n;
									z.total_in += p - z.next_in_index;
									z.next_in_index = p;
									s.write = q;
									return s.inflate_flush(z, r);
								}
							}
						}

						s.window[q++] = s.window[f++];
						m--;

						if (f == s.end)
							f = 0;
						len--;
					}
					mode = START;
					break;
				case LIT: // o: got literal, waiting for output space
					if (m === 0) {
						if (q == s.end && s.read !== 0) {
							q = 0;
							m = q < s.read ? s.read - q - 1 : s.end - q;
						}
						if (m === 0) {
							s.write = q;
							r = s.inflate_flush(z, r);
							q = s.write;
							m = q < s.read ? s.read - q - 1 : s.end - q;

							if (q == s.end && s.read !== 0) {
								q = 0;
								m = q < s.read ? s.read - q - 1 : s.end - q;
							}
							if (m === 0) {
								s.bitb = b;
								s.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								s.write = q;
								return s.inflate_flush(z, r);
							}
						}
					}
					r = Z_OK;

					s.window[q++] = /* (byte) */lit;
					m--;

					mode = START;
					break;
				case WASH: // o: got eob, possibly more output
					if (k > 7) { // return unused byte, if any
						k -= 8;
						n++;
						p--; // can always return one
					}

					s.write = q;
					r = s.inflate_flush(z, r);
					q = s.write;
					m = q < s.read ? s.read - q - 1 : s.end - q;

					if (s.read != s.write) {
						s.bitb = b;
						s.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						s.write = q;
						return s.inflate_flush(z, r);
					}
					mode = END;
				case END:
					r = Z_STREAM_END;
					s.bitb = b;
					s.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					s.write = q;
					return s.inflate_flush(z, r);

				case BADCODE: // x: got error

					r = Z_DATA_ERROR;

					s.bitb = b;
					s.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					s.write = q;
					return s.inflate_flush(z, r);

				default:
					r = Z_STREAM_ERROR;

					s.bitb = b;
					s.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					s.write = q;
					return s.inflate_flush(z, r);
				}
			}
		};

		that.free = function() {
			// ZFREE(z, c);
		};

	}

	// InfBlocks

	// Table for deflate from PKZIP's appnote.txt.
	var border = [ // Order of the bit length code lengths
	16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];

	var TYPE = 0; // get type bits (3, including end bit)
	var LENS = 1; // get lengths for stored
	var STORED = 2;// processing stored block
	var TABLE = 3; // get table lengths
	var BTREE = 4; // get bit lengths tree for a dynamic
	// block
	var DTREE = 5; // get length, distance trees for a
	// dynamic block
	var CODES = 6; // processing fixed or dynamic block
	var DRY = 7; // output remaining window bytes
	var DONELOCKS = 8; // finished last block, done
	var BADBLOCKS = 9; // ot a data error--stuck here

	function InfBlocks(z, w) {
		var that = this;

		var mode = TYPE; // current inflate_block mode

		var left = 0; // if STORED, bytes left to copy

		var table = 0; // table lengths (14 bits)
		var index = 0; // index into blens (or border)
		var blens; // bit lengths of codes
		var bb = [ 0 ]; // bit length tree depth
		var tb = [ 0 ]; // bit length decoding tree

		var codes = new InfCodes(); // if CODES, current state

		var last = 0; // true if this block is the last block

		var hufts = new Int32Array(MANY * 3); // single malloc for tree space
		var check = 0; // check on output
		var inftree = new InfTree();

		that.bitk = 0; // bits in bit buffer
		that.bitb = 0; // bit buffer
		that.window = new Uint8Array(w); // sliding window
		that.end = w; // one byte after sliding window
		that.read = 0; // window read pointer
		that.write = 0; // window write pointer

		that.reset = function(z, c) {
			if (c)
				c[0] = check;
			// if (mode == BTREE || mode == DTREE) {
			// }
			if (mode == CODES) {
				codes.free(z);
			}
			mode = TYPE;
			that.bitk = 0;
			that.bitb = 0;
			that.read = that.write = 0;
		};

		that.reset(z, null);

		// copy as much as possible from the sliding window to the output area
		that.inflate_flush = function(z, r) {
			var n;
			var p;
			var q;

			// local copies of source and destination pointers
			p = z.next_out_index;
			q = that.read;

			// compute number of bytes to copy as far as end of window
			n = /* (int) */((q <= that.write ? that.write : that.end) - q);
			if (n > z.avail_out)
				n = z.avail_out;
			if (n !== 0 && r == Z_BUF_ERROR)
				r = Z_OK;

			// update counters
			z.avail_out -= n;
			z.total_out += n;

			// copy as far as end of window
			z.next_out.set(that.window.subarray(q, q + n), p);
			p += n;
			q += n;

			// see if more to copy at beginning of window
			if (q == that.end) {
				// wrap pointers
				q = 0;
				if (that.write == that.end)
					that.write = 0;

				// compute bytes to copy
				n = that.write - q;
				if (n > z.avail_out)
					n = z.avail_out;
				if (n !== 0 && r == Z_BUF_ERROR)
					r = Z_OK;

				// update counters
				z.avail_out -= n;
				z.total_out += n;

				// copy
				z.next_out.set(that.window.subarray(q, q + n), p);
				p += n;
				q += n;
			}

			// update pointers
			z.next_out_index = p;
			that.read = q;

			// done
			return r;
		};

		that.proc = function(z, r) {
			var t; // temporary storage
			var b; // bit buffer
			var k; // bits in bit buffer
			var p; // input data pointer
			var n; // bytes available there
			var q; // output window write pointer
			var m; // bytes to end of window or read pointer

			var i;

			// copy input/output information to locals (UPDATE macro restores)
			// {
			p = z.next_in_index;
			n = z.avail_in;
			b = that.bitb;
			k = that.bitk;
			// }
			// {
			q = that.write;
			m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);
			// }

			// process input based on current state
			// DEBUG dtree
			while (true) {
				switch (mode) {
				case TYPE:

					while (k < (3)) {
						if (n !== 0) {
							r = Z_OK;
						} else {
							that.bitb = b;
							that.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							that.write = q;
							return that.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}
					t = /* (int) */(b & 7);
					last = t & 1;

					switch (t >>> 1) {
					case 0: // stored
						// {
						b >>>= (3);
						k -= (3);
						// }
						t = k & 7; // go to byte boundary

						// {
						b >>>= (t);
						k -= (t);
						// }
						mode = LENS; // get length of stored block
						break;
					case 1: // fixed
						// {
						var bl = []; // new Array(1);
						var bd = []; // new Array(1);
						var tl = [ [] ]; // new Array(1);
						var td = [ [] ]; // new Array(1);

						InfTree.inflate_trees_fixed(bl, bd, tl, td);
						codes.init(bl[0], bd[0], tl[0], 0, td[0], 0);
						// }

						// {
						b >>>= (3);
						k -= (3);
						// }

						mode = CODES;
						break;
					case 2: // dynamic

						// {
						b >>>= (3);
						k -= (3);
						// }

						mode = TABLE;
						break;
					case 3: // illegal

						// {
						b >>>= (3);
						k -= (3);
						// }
						mode = BADBLOCKS;
						z.msg = "invalid block type";
						r = Z_DATA_ERROR;

						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}
					break;
				case LENS:

					while (k < (32)) {
						if (n !== 0) {
							r = Z_OK;
						} else {
							that.bitb = b;
							that.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							that.write = q;
							return that.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					if ((((~b) >>> 16) & 0xffff) != (b & 0xffff)) {
						mode = BADBLOCKS;
						z.msg = "invalid stored block lengths";
						r = Z_DATA_ERROR;

						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}
					left = (b & 0xffff);
					b = k = 0; // dump bits
					mode = left !== 0 ? STORED : (last !== 0 ? DRY : TYPE);
					break;
				case STORED:
					if (n === 0) {
						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}

					if (m === 0) {
						if (q == that.end && that.read !== 0) {
							q = 0;
							m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);
						}
						if (m === 0) {
							that.write = q;
							r = that.inflate_flush(z, r);
							q = that.write;
							m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);
							if (q == that.end && that.read !== 0) {
								q = 0;
								m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);
							}
							if (m === 0) {
								that.bitb = b;
								that.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								that.write = q;
								return that.inflate_flush(z, r);
							}
						}
					}
					r = Z_OK;

					t = left;
					if (t > n)
						t = n;
					if (t > m)
						t = m;
					that.window.set(z.read_buf(p, t), q);
					p += t;
					n -= t;
					q += t;
					m -= t;
					if ((left -= t) !== 0)
						break;
					mode = last !== 0 ? DRY : TYPE;
					break;
				case TABLE:

					while (k < (14)) {
						if (n !== 0) {
							r = Z_OK;
						} else {
							that.bitb = b;
							that.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							that.write = q;
							return that.inflate_flush(z, r);
						}

						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					table = t = (b & 0x3fff);
					if ((t & 0x1f) > 29 || ((t >> 5) & 0x1f) > 29) {
						mode = BADBLOCKS;
						z.msg = "too many length or distance symbols";
						r = Z_DATA_ERROR;

						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}
					t = 258 + (t & 0x1f) + ((t >> 5) & 0x1f);
					if (!blens || blens.length < t) {
						blens = []; // new Array(t);
					} else {
						for (i = 0; i < t; i++) {
							blens[i] = 0;
						}
					}

					// {
					b >>>= (14);
					k -= (14);
					// }

					index = 0;
					mode = BTREE;
				case BTREE:
					while (index < 4 + (table >>> 10)) {
						while (k < (3)) {
							if (n !== 0) {
								r = Z_OK;
							} else {
								that.bitb = b;
								that.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								that.write = q;
								return that.inflate_flush(z, r);
							}
							n--;
							b |= (z.read_byte(p++) & 0xff) << k;
							k += 8;
						}

						blens[border[index++]] = b & 7;

						// {
						b >>>= (3);
						k -= (3);
						// }
					}

					while (index < 19) {
						blens[border[index++]] = 0;
					}

					bb[0] = 7;
					t = inftree.inflate_trees_bits(blens, bb, tb, hufts, z);
					if (t != Z_OK) {
						r = t;
						if (r == Z_DATA_ERROR) {
							blens = null;
							mode = BADBLOCKS;
						}

						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}

					index = 0;
					mode = DTREE;
				case DTREE:
					while (true) {
						t = table;
						if (!(index < 258 + (t & 0x1f) + ((t >> 5) & 0x1f))) {
							break;
						}

						var j, c;

						t = bb[0];

						while (k < (t)) {
							if (n !== 0) {
								r = Z_OK;
							} else {
								that.bitb = b;
								that.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								that.write = q;
								return that.inflate_flush(z, r);
							}
							n--;
							b |= (z.read_byte(p++) & 0xff) << k;
							k += 8;
						}

						// if (tb[0] == -1) {
						// System.err.println("null...");
						// }

						t = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 1];
						c = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 2];

						if (c < 16) {
							b >>>= (t);
							k -= (t);
							blens[index++] = c;
						} else { // c == 16..18
							i = c == 18 ? 7 : c - 14;
							j = c == 18 ? 11 : 3;

							while (k < (t + i)) {
								if (n !== 0) {
									r = Z_OK;
								} else {
									that.bitb = b;
									that.bitk = k;
									z.avail_in = n;
									z.total_in += p - z.next_in_index;
									z.next_in_index = p;
									that.write = q;
									return that.inflate_flush(z, r);
								}
								n--;
								b |= (z.read_byte(p++) & 0xff) << k;
								k += 8;
							}

							b >>>= (t);
							k -= (t);

							j += (b & inflate_mask[i]);

							b >>>= (i);
							k -= (i);

							i = index;
							t = table;
							if (i + j > 258 + (t & 0x1f) + ((t >> 5) & 0x1f) || (c == 16 && i < 1)) {
								blens = null;
								mode = BADBLOCKS;
								z.msg = "invalid bit length repeat";
								r = Z_DATA_ERROR;

								that.bitb = b;
								that.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								that.write = q;
								return that.inflate_flush(z, r);
							}

							c = c == 16 ? blens[i - 1] : 0;
							do {
								blens[i++] = c;
							} while (--j !== 0);
							index = i;
						}
					}

					tb[0] = -1;
					// {
					var bl_ = []; // new Array(1);
					var bd_ = []; // new Array(1);
					var tl_ = []; // new Array(1);
					var td_ = []; // new Array(1);
					bl_[0] = 9; // must be <= 9 for lookahead assumptions
					bd_[0] = 6; // must be <= 9 for lookahead assumptions

					t = table;
					t = inftree.inflate_trees_dynamic(257 + (t & 0x1f), 1 + ((t >> 5) & 0x1f), blens, bl_, bd_, tl_, td_, hufts, z);

					if (t != Z_OK) {
						if (t == Z_DATA_ERROR) {
							blens = null;
							mode = BADBLOCKS;
						}
						r = t;

						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}
					codes.init(bl_[0], bd_[0], hufts, tl_[0], hufts, td_[0]);
					// }
					mode = CODES;
				case CODES:
					that.bitb = b;
					that.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					that.write = q;

					if ((r = codes.proc(that, z, r)) != Z_STREAM_END) {
						return that.inflate_flush(z, r);
					}
					r = Z_OK;
					codes.free(z);

					p = z.next_in_index;
					n = z.avail_in;
					b = that.bitb;
					k = that.bitk;
					q = that.write;
					m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);

					if (last === 0) {
						mode = TYPE;
						break;
					}
					mode = DRY;
				case DRY:
					that.write = q;
					r = that.inflate_flush(z, r);
					q = that.write;
					m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);
					if (that.read != that.write) {
						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}
					mode = DONELOCKS;
				case DONELOCKS:
					r = Z_STREAM_END;

					that.bitb = b;
					that.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					that.write = q;
					return that.inflate_flush(z, r);
				case BADBLOCKS:
					r = Z_DATA_ERROR;

					that.bitb = b;
					that.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					that.write = q;
					return that.inflate_flush(z, r);

				default:
					r = Z_STREAM_ERROR;

					that.bitb = b;
					that.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					that.write = q;
					return that.inflate_flush(z, r);
				}
			}
		};

		that.free = function(z) {
			that.reset(z, null);
			that.window = null;
			hufts = null;
			// ZFREE(z, s);
		};

		that.set_dictionary = function(d, start, n) {
			that.window.set(d.subarray(start, start + n), 0);
			that.read = that.write = n;
		};

		// Returns true if inflate is currently at the end of a block generated
		// by Z_SYNC_FLUSH or Z_FULL_FLUSH.
		that.sync_point = function() {
			return mode == LENS ? 1 : 0;
		};

	}

	// Inflate

	// preset dictionary flag in zlib header
	var PRESET_DICT = 0x20;

	var Z_DEFLATED = 8;

	var METHOD = 0; // waiting for method byte
	var FLAG = 1; // waiting for flag byte
	var DICT4 = 2; // four dictionary check bytes to go
	var DICT3 = 3; // three dictionary check bytes to go
	var DICT2 = 4; // two dictionary check bytes to go
	var DICT1 = 5; // one dictionary check byte to go
	var DICT0 = 6; // waiting for inflateSetDictionary
	var BLOCKS = 7; // decompressing blocks
	var DONE = 12; // finished check, done
	var BAD = 13; // got an error--stay here

	var mark = [ 0, 0, 0xff, 0xff ];

	function Inflate() {
		var that = this;

		that.mode = 0; // current inflate mode

		// mode dependent information
		that.method = 0; // if FLAGS, method byte

		// if CHECK, check values to compare
		that.was = [ 0 ]; // new Array(1); // computed check value
		that.need = 0; // stream check value

		// if BAD, inflateSync's marker bytes count
		that.marker = 0;

		// mode independent information
		that.wbits = 0; // log2(window size) (8..15, defaults to 15)

		// this.blocks; // current inflate_blocks state

		function inflateReset(z) {
			if (!z || !z.istate)
				return Z_STREAM_ERROR;

			z.total_in = z.total_out = 0;
			z.msg = null;
			z.istate.mode = BLOCKS;
			z.istate.blocks.reset(z, null);
			return Z_OK;
		}

		that.inflateEnd = function(z) {
			if (that.blocks)
				that.blocks.free(z);
			that.blocks = null;
			// ZFREE(z, z->state);
			return Z_OK;
		};

		that.inflateInit = function(z, w) {
			z.msg = null;
			that.blocks = null;

			// set window size
			if (w < 8 || w > 15) {
				that.inflateEnd(z);
				return Z_STREAM_ERROR;
			}
			that.wbits = w;

			z.istate.blocks = new InfBlocks(z, 1 << w);

			// reset state
			inflateReset(z);
			return Z_OK;
		};

		that.inflate = function(z, f) {
			var r;
			var b;

			if (!z || !z.istate || !z.next_in)
				return Z_STREAM_ERROR;
			f = f == Z_FINISH ? Z_BUF_ERROR : Z_OK;
			r = Z_BUF_ERROR;
			while (true) {
				// System.out.println("mode: "+z.istate.mode);
				switch (z.istate.mode) {
				case METHOD:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					if (((z.istate.method = z.read_byte(z.next_in_index++)) & 0xf) != Z_DEFLATED) {
						z.istate.mode = BAD;
						z.msg = "unknown compression method";
						z.istate.marker = 5; // can't try inflateSync
						break;
					}
					if ((z.istate.method >> 4) + 8 > z.istate.wbits) {
						z.istate.mode = BAD;
						z.msg = "invalid window size";
						z.istate.marker = 5; // can't try inflateSync
						break;
					}
					z.istate.mode = FLAG;
				case FLAG:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					b = (z.read_byte(z.next_in_index++)) & 0xff;

					if ((((z.istate.method << 8) + b) % 31) !== 0) {
						z.istate.mode = BAD;
						z.msg = "incorrect header check";
						z.istate.marker = 5; // can't try inflateSync
						break;
					}

					if ((b & PRESET_DICT) === 0) {
						z.istate.mode = BLOCKS;
						break;
					}
					z.istate.mode = DICT4;
				case DICT4:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					z.istate.need = ((z.read_byte(z.next_in_index++) & 0xff) << 24) & 0xff000000;
					z.istate.mode = DICT3;
				case DICT3:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					z.istate.need += ((z.read_byte(z.next_in_index++) & 0xff) << 16) & 0xff0000;
					z.istate.mode = DICT2;
				case DICT2:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					z.istate.need += ((z.read_byte(z.next_in_index++) & 0xff) << 8) & 0xff00;
					z.istate.mode = DICT1;
				case DICT1:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					z.istate.need += (z.read_byte(z.next_in_index++) & 0xff);
					z.istate.mode = DICT0;
					return Z_NEED_DICT;
				case DICT0:
					z.istate.mode = BAD;
					z.msg = "need dictionary";
					z.istate.marker = 0; // can try inflateSync
					return Z_STREAM_ERROR;
				case BLOCKS:

					r = z.istate.blocks.proc(z, r);
					if (r == Z_DATA_ERROR) {
						z.istate.mode = BAD;
						z.istate.marker = 0; // can try inflateSync
						break;
					}
					if (r == Z_OK) {
						r = f;
					}
					if (r != Z_STREAM_END) {
						return r;
					}
					r = f;
					z.istate.blocks.reset(z, z.istate.was);
					z.istate.mode = DONE;
				case DONE:
					return Z_STREAM_END;
				case BAD:
					return Z_DATA_ERROR;
				default:
					return Z_STREAM_ERROR;
				}
			}
		};

		that.inflateSetDictionary = function(z, dictionary, dictLength) {
			var index = 0;
			var length = dictLength;
			if (!z || !z.istate || z.istate.mode != DICT0)
				return Z_STREAM_ERROR;

			if (length >= (1 << z.istate.wbits)) {
				length = (1 << z.istate.wbits) - 1;
				index = dictLength - length;
			}
			z.istate.blocks.set_dictionary(dictionary, index, length);
			z.istate.mode = BLOCKS;
			return Z_OK;
		};

		that.inflateSync = function(z) {
			var n; // number of bytes to look at
			var p; // pointer to bytes
			var m; // number of marker bytes found in a row
			var r, w; // temporaries to save total_in and total_out

			// set up
			if (!z || !z.istate)
				return Z_STREAM_ERROR;
			if (z.istate.mode != BAD) {
				z.istate.mode = BAD;
				z.istate.marker = 0;
			}
			if ((n = z.avail_in) === 0)
				return Z_BUF_ERROR;
			p = z.next_in_index;
			m = z.istate.marker;

			// search
			while (n !== 0 && m < 4) {
				if (z.read_byte(p) == mark[m]) {
					m++;
				} else if (z.read_byte(p) !== 0) {
					m = 0;
				} else {
					m = 4 - m;
				}
				p++;
				n--;
			}

			// restore
			z.total_in += p - z.next_in_index;
			z.next_in_index = p;
			z.avail_in = n;
			z.istate.marker = m;

			// return no joy or set up to restart on a new block
			if (m != 4) {
				return Z_DATA_ERROR;
			}
			r = z.total_in;
			w = z.total_out;
			inflateReset(z);
			z.total_in = r;
			z.total_out = w;
			z.istate.mode = BLOCKS;
			return Z_OK;
		};

		// Returns true if inflate is currently at the end of a block generated
		// by Z_SYNC_FLUSH or Z_FULL_FLUSH. This function is used by one PPP
		// implementation to provide an additional safety check. PPP uses
		// Z_SYNC_FLUSH
		// but removes the length bytes of the resulting empty stored block. When
		// decompressing, PPP checks that at the end of input packet, inflate is
		// waiting for these length bytes.
		that.inflateSyncPoint = function(z) {
			if (!z || !z.istate || !z.istate.blocks)
				return Z_STREAM_ERROR;
			return z.istate.blocks.sync_point();
		};
	}

	// ZStream

	function ZStream() {
	}

	ZStream.prototype = {
		inflateInit : function(bits) {
			var that = this;
			that.istate = new Inflate();
			if (!bits)
				bits = MAX_BITS;
			return that.istate.inflateInit(that, bits);
		},

		inflate : function(f) {
			var that = this;
			if (!that.istate)
				return Z_STREAM_ERROR;
			return that.istate.inflate(that, f);
		},

		inflateEnd : function() {
			var that = this;
			if (!that.istate)
				return Z_STREAM_ERROR;
			var ret = that.istate.inflateEnd(that);
			that.istate = null;
			return ret;
		},

		inflateSync : function() {
			var that = this;
			if (!that.istate)
				return Z_STREAM_ERROR;
			return that.istate.inflateSync(that);
		},
		inflateSetDictionary : function(dictionary, dictLength) {
			var that = this;
			if (!that.istate)
				return Z_STREAM_ERROR;
			return that.istate.inflateSetDictionary(that, dictionary, dictLength);
		},
		read_byte : function(start) {
			var that = this;
			return that.next_in.subarray(start, start + 1)[0];
		},
		read_buf : function(start, size) {
			var that = this;
			return that.next_in.subarray(start, start + size);
		}
	};

	// Inflater

	function Inflater() {
		var that = this;
		var z = new ZStream();
		var bufsize = 512;
		var flush = Z_NO_FLUSH;
		var buf = new Uint8Array(bufsize);
		var nomoreinput = false;

		z.inflateInit();
		z.next_out = buf;

		that.append = function(data, onprogress) {
			var err, buffers = [], lastIndex = 0, bufferIndex = 0, bufferSize = 0, array;
			if (data.length === 0)
				return;
			z.next_in_index = 0;
			z.next_in = data;
			z.avail_in = data.length;
			do {
				z.next_out_index = 0;
				z.avail_out = bufsize;
				if ((z.avail_in === 0) && (!nomoreinput)) { // if buffer is empty and more input is available, refill it
					z.next_in_index = 0;
					nomoreinput = true;
				}
				err = z.inflate(flush);
				if (nomoreinput && (err == Z_BUF_ERROR))
					return -1;
				if (err != Z_OK && err != Z_STREAM_END)
					throw "inflating: " + z.msg;
				if ((nomoreinput || err == Z_STREAM_END) && (z.avail_in == data.length))
					return -1;
				if (z.next_out_index)
					if (z.next_out_index == bufsize)
						buffers.push(new Uint8Array(buf));
					else
						buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
				bufferSize += z.next_out_index;
				if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
					onprogress(z.next_in_index);
					lastIndex = z.next_in_index;
				}
			} while (z.avail_in > 0 || z.avail_out === 0);
			array = new Uint8Array(bufferSize);
			buffers.forEach(function(chunk) {
				array.set(chunk, bufferIndex);
				bufferIndex += chunk.length;
			});
			return array;
		};
		that.flush = function() {
			z.inflateEnd();
		};
	}

	var inflater;

	if (obj.zip)
		obj.zip.Inflater = Inflater;
	else {
		inflater = new Inflater();
		obj.addEventListener("message", function(event) {
			var message = event.data;

			if (message.append)
				obj.postMessage({
					onappend : true,
					data : inflater.append(message.data, function(current) {
						obj.postMessage({
							progress : true,
							current : current
						});
					})
				});
			if (message.flush) {
				inflater.flush();
				obj.postMessage({
					onflush : true
				});
			}
		}, false);
	}

})(self);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjQ3OGIxY2QyYTgzNTk2OWYwYTYud29ya2VyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL1RoaXJkUGFydHkvV29ya2Vycy9pbmZsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiYnVpbGQvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vbm9kZV9tb2R1bGVzL3N0cmluZy1yZXBsYWNlLXdlYnBhY2stcGx1Z2luL2xvYWRlci5qcz9pZD03NnoxZmFscmZ1dyEuL25vZGVfbW9kdWxlcy9zdHJpbmctcmVwbGFjZS13ZWJwYWNrLXBsdWdpbi9sb2FkZXIuanM/aWQ9YTU0MzRpcGFoeW4hLi9ub2RlX21vZHVsZXMvdGVycmlhanMvYnVpbGRwcm9jZXNzL3JlbW92ZUNlc2l1bURlYnVnUHJhZ21hcy5qcyEuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL1RoaXJkUGFydHkvV29ya2Vycy9pbmZsYXRlLmpzXCIpO1xuIiwiLypcbiBDb3B5cmlnaHQgKGMpIDIwMTMgR2lsZGFzIExvcm1lYXUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cbiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuXG4gMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgXG4gbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIFxuIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG4gMy4gVGhlIG5hbWVzIG9mIHRoZSBhdXRob3JzIG1heSBub3QgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHNcbiBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cblxuIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgYGBBUyBJUycnIEFORCBBTlkgRVhQUkVTU0VEIE9SIElNUExJRUQgV0FSUkFOVElFUyxcbiBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIEpDUkFGVCxcbiBJTkMuIE9SIEFOWSBDT05UUklCVVRPUlMgVE8gVEhJUyBTT0ZUV0FSRSBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULFxuIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1RcbiBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSxcbiBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkdcbiBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsXG4gRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuXG4vKlxuICogVGhpcyBwcm9ncmFtIGlzIGJhc2VkIG9uIEpabGliIDEuMC4yIHltbmssIEpDcmFmdCxJbmMuXG4gKiBKWmxpYiBpcyBiYXNlZCBvbiB6bGliLTEuMS4zLCBzbyBhbGwgY3JlZGl0IHNob3VsZCBnbyBhdXRob3JzXG4gKiBKZWFuLWxvdXAgR2FpbGx5KGpsb3VwQGd6aXAub3JnKSBhbmQgTWFyayBBZGxlcihtYWRsZXJAYWx1bW5pLmNhbHRlY2guZWR1KVxuICogYW5kIGNvbnRyaWJ1dG9ycyBvZiB6bGliLlxuICovXG5cbihmdW5jdGlvbihvYmopIHtcblxuXHQvLyBHbG9iYWxcblx0dmFyIE1BWF9CSVRTID0gMTU7XG5cblx0dmFyIFpfT0sgPSAwO1xuXHR2YXIgWl9TVFJFQU1fRU5EID0gMTtcblx0dmFyIFpfTkVFRF9ESUNUID0gMjtcblx0dmFyIFpfU1RSRUFNX0VSUk9SID0gLTI7XG5cdHZhciBaX0RBVEFfRVJST1IgPSAtMztcblx0dmFyIFpfTUVNX0VSUk9SID0gLTQ7XG5cdHZhciBaX0JVRl9FUlJPUiA9IC01O1xuXG5cdHZhciBpbmZsYXRlX21hc2sgPSBbIDB4MDAwMDAwMDAsIDB4MDAwMDAwMDEsIDB4MDAwMDAwMDMsIDB4MDAwMDAwMDcsIDB4MDAwMDAwMGYsIDB4MDAwMDAwMWYsIDB4MDAwMDAwM2YsIDB4MDAwMDAwN2YsIDB4MDAwMDAwZmYsIDB4MDAwMDAxZmYsIDB4MDAwMDAzZmYsXG5cdFx0XHQweDAwMDAwN2ZmLCAweDAwMDAwZmZmLCAweDAwMDAxZmZmLCAweDAwMDAzZmZmLCAweDAwMDA3ZmZmLCAweDAwMDBmZmZmIF07XG5cblx0dmFyIE1BTlkgPSAxNDQwO1xuXG5cdC8vIEpabGliIHZlcnNpb24gOiBcIjEuMC4yXCJcblx0dmFyIFpfTk9fRkxVU0ggPSAwO1xuXHR2YXIgWl9GSU5JU0ggPSA0O1xuXG5cdC8vIEluZlRyZWVcblx0dmFyIGZpeGVkX2JsID0gOTtcblx0dmFyIGZpeGVkX2JkID0gNTtcblxuXHR2YXIgZml4ZWRfdGwgPSBbIDk2LCA3LCAyNTYsIDAsIDgsIDgwLCAwLCA4LCAxNiwgODQsIDgsIDExNSwgODIsIDcsIDMxLCAwLCA4LCAxMTIsIDAsIDgsIDQ4LCAwLCA5LCAxOTIsIDgwLCA3LCAxMCwgMCwgOCwgOTYsIDAsIDgsIDMyLCAwLCA5LCAxNjAsIDAsIDgsIDAsXG5cdFx0XHQwLCA4LCAxMjgsIDAsIDgsIDY0LCAwLCA5LCAyMjQsIDgwLCA3LCA2LCAwLCA4LCA4OCwgMCwgOCwgMjQsIDAsIDksIDE0NCwgODMsIDcsIDU5LCAwLCA4LCAxMjAsIDAsIDgsIDU2LCAwLCA5LCAyMDgsIDgxLCA3LCAxNywgMCwgOCwgMTA0LCAwLCA4LCA0MCxcblx0XHRcdDAsIDksIDE3NiwgMCwgOCwgOCwgMCwgOCwgMTM2LCAwLCA4LCA3MiwgMCwgOSwgMjQwLCA4MCwgNywgNCwgMCwgOCwgODQsIDAsIDgsIDIwLCA4NSwgOCwgMjI3LCA4MywgNywgNDMsIDAsIDgsIDExNiwgMCwgOCwgNTIsIDAsIDksIDIwMCwgODEsIDcsIDEzLFxuXHRcdFx0MCwgOCwgMTAwLCAwLCA4LCAzNiwgMCwgOSwgMTY4LCAwLCA4LCA0LCAwLCA4LCAxMzIsIDAsIDgsIDY4LCAwLCA5LCAyMzIsIDgwLCA3LCA4LCAwLCA4LCA5MiwgMCwgOCwgMjgsIDAsIDksIDE1MiwgODQsIDcsIDgzLCAwLCA4LCAxMjQsIDAsIDgsIDYwLFxuXHRcdFx0MCwgOSwgMjE2LCA4MiwgNywgMjMsIDAsIDgsIDEwOCwgMCwgOCwgNDQsIDAsIDksIDE4NCwgMCwgOCwgMTIsIDAsIDgsIDE0MCwgMCwgOCwgNzYsIDAsIDksIDI0OCwgODAsIDcsIDMsIDAsIDgsIDgyLCAwLCA4LCAxOCwgODUsIDgsIDE2MywgODMsIDcsXG5cdFx0XHQzNSwgMCwgOCwgMTE0LCAwLCA4LCA1MCwgMCwgOSwgMTk2LCA4MSwgNywgMTEsIDAsIDgsIDk4LCAwLCA4LCAzNCwgMCwgOSwgMTY0LCAwLCA4LCAyLCAwLCA4LCAxMzAsIDAsIDgsIDY2LCAwLCA5LCAyMjgsIDgwLCA3LCA3LCAwLCA4LCA5MCwgMCwgOCxcblx0XHRcdDI2LCAwLCA5LCAxNDgsIDg0LCA3LCA2NywgMCwgOCwgMTIyLCAwLCA4LCA1OCwgMCwgOSwgMjEyLCA4MiwgNywgMTksIDAsIDgsIDEwNiwgMCwgOCwgNDIsIDAsIDksIDE4MCwgMCwgOCwgMTAsIDAsIDgsIDEzOCwgMCwgOCwgNzQsIDAsIDksIDI0NCwgODAsXG5cdFx0XHQ3LCA1LCAwLCA4LCA4NiwgMCwgOCwgMjIsIDE5MiwgOCwgMCwgODMsIDcsIDUxLCAwLCA4LCAxMTgsIDAsIDgsIDU0LCAwLCA5LCAyMDQsIDgxLCA3LCAxNSwgMCwgOCwgMTAyLCAwLCA4LCAzOCwgMCwgOSwgMTcyLCAwLCA4LCA2LCAwLCA4LCAxMzQsIDAsXG5cdFx0XHQ4LCA3MCwgMCwgOSwgMjM2LCA4MCwgNywgOSwgMCwgOCwgOTQsIDAsIDgsIDMwLCAwLCA5LCAxNTYsIDg0LCA3LCA5OSwgMCwgOCwgMTI2LCAwLCA4LCA2MiwgMCwgOSwgMjIwLCA4MiwgNywgMjcsIDAsIDgsIDExMCwgMCwgOCwgNDYsIDAsIDksIDE4OCwgMCxcblx0XHRcdDgsIDE0LCAwLCA4LCAxNDIsIDAsIDgsIDc4LCAwLCA5LCAyNTIsIDk2LCA3LCAyNTYsIDAsIDgsIDgxLCAwLCA4LCAxNywgODUsIDgsIDEzMSwgODIsIDcsIDMxLCAwLCA4LCAxMTMsIDAsIDgsIDQ5LCAwLCA5LCAxOTQsIDgwLCA3LCAxMCwgMCwgOCwgOTcsXG5cdFx0XHQwLCA4LCAzMywgMCwgOSwgMTYyLCAwLCA4LCAxLCAwLCA4LCAxMjksIDAsIDgsIDY1LCAwLCA5LCAyMjYsIDgwLCA3LCA2LCAwLCA4LCA4OSwgMCwgOCwgMjUsIDAsIDksIDE0NiwgODMsIDcsIDU5LCAwLCA4LCAxMjEsIDAsIDgsIDU3LCAwLCA5LCAyMTAsXG5cdFx0XHQ4MSwgNywgMTcsIDAsIDgsIDEwNSwgMCwgOCwgNDEsIDAsIDksIDE3OCwgMCwgOCwgOSwgMCwgOCwgMTM3LCAwLCA4LCA3MywgMCwgOSwgMjQyLCA4MCwgNywgNCwgMCwgOCwgODUsIDAsIDgsIDIxLCA4MCwgOCwgMjU4LCA4MywgNywgNDMsIDAsIDgsIDExNyxcblx0XHRcdDAsIDgsIDUzLCAwLCA5LCAyMDIsIDgxLCA3LCAxMywgMCwgOCwgMTAxLCAwLCA4LCAzNywgMCwgOSwgMTcwLCAwLCA4LCA1LCAwLCA4LCAxMzMsIDAsIDgsIDY5LCAwLCA5LCAyMzQsIDgwLCA3LCA4LCAwLCA4LCA5MywgMCwgOCwgMjksIDAsIDksIDE1NCxcblx0XHRcdDg0LCA3LCA4MywgMCwgOCwgMTI1LCAwLCA4LCA2MSwgMCwgOSwgMjE4LCA4MiwgNywgMjMsIDAsIDgsIDEwOSwgMCwgOCwgNDUsIDAsIDksIDE4NiwgMCwgOCwgMTMsIDAsIDgsIDE0MSwgMCwgOCwgNzcsIDAsIDksIDI1MCwgODAsIDcsIDMsIDAsIDgsIDgzLFxuXHRcdFx0MCwgOCwgMTksIDg1LCA4LCAxOTUsIDgzLCA3LCAzNSwgMCwgOCwgMTE1LCAwLCA4LCA1MSwgMCwgOSwgMTk4LCA4MSwgNywgMTEsIDAsIDgsIDk5LCAwLCA4LCAzNSwgMCwgOSwgMTY2LCAwLCA4LCAzLCAwLCA4LCAxMzEsIDAsIDgsIDY3LCAwLCA5LCAyMzAsXG5cdFx0XHQ4MCwgNywgNywgMCwgOCwgOTEsIDAsIDgsIDI3LCAwLCA5LCAxNTAsIDg0LCA3LCA2NywgMCwgOCwgMTIzLCAwLCA4LCA1OSwgMCwgOSwgMjE0LCA4MiwgNywgMTksIDAsIDgsIDEwNywgMCwgOCwgNDMsIDAsIDksIDE4MiwgMCwgOCwgMTEsIDAsIDgsIDEzOSxcblx0XHRcdDAsIDgsIDc1LCAwLCA5LCAyNDYsIDgwLCA3LCA1LCAwLCA4LCA4NywgMCwgOCwgMjMsIDE5MiwgOCwgMCwgODMsIDcsIDUxLCAwLCA4LCAxMTksIDAsIDgsIDU1LCAwLCA5LCAyMDYsIDgxLCA3LCAxNSwgMCwgOCwgMTAzLCAwLCA4LCAzOSwgMCwgOSwgMTc0LFxuXHRcdFx0MCwgOCwgNywgMCwgOCwgMTM1LCAwLCA4LCA3MSwgMCwgOSwgMjM4LCA4MCwgNywgOSwgMCwgOCwgOTUsIDAsIDgsIDMxLCAwLCA5LCAxNTgsIDg0LCA3LCA5OSwgMCwgOCwgMTI3LCAwLCA4LCA2MywgMCwgOSwgMjIyLCA4MiwgNywgMjcsIDAsIDgsIDExMSxcblx0XHRcdDAsIDgsIDQ3LCAwLCA5LCAxOTAsIDAsIDgsIDE1LCAwLCA4LCAxNDMsIDAsIDgsIDc5LCAwLCA5LCAyNTQsIDk2LCA3LCAyNTYsIDAsIDgsIDgwLCAwLCA4LCAxNiwgODQsIDgsIDExNSwgODIsIDcsIDMxLCAwLCA4LCAxMTIsIDAsIDgsIDQ4LCAwLCA5LFxuXHRcdFx0MTkzLCA4MCwgNywgMTAsIDAsIDgsIDk2LCAwLCA4LCAzMiwgMCwgOSwgMTYxLCAwLCA4LCAwLCAwLCA4LCAxMjgsIDAsIDgsIDY0LCAwLCA5LCAyMjUsIDgwLCA3LCA2LCAwLCA4LCA4OCwgMCwgOCwgMjQsIDAsIDksIDE0NSwgODMsIDcsIDU5LCAwLCA4LFxuXHRcdFx0MTIwLCAwLCA4LCA1NiwgMCwgOSwgMjA5LCA4MSwgNywgMTcsIDAsIDgsIDEwNCwgMCwgOCwgNDAsIDAsIDksIDE3NywgMCwgOCwgOCwgMCwgOCwgMTM2LCAwLCA4LCA3MiwgMCwgOSwgMjQxLCA4MCwgNywgNCwgMCwgOCwgODQsIDAsIDgsIDIwLCA4NSwgOCxcblx0XHRcdDIyNywgODMsIDcsIDQzLCAwLCA4LCAxMTYsIDAsIDgsIDUyLCAwLCA5LCAyMDEsIDgxLCA3LCAxMywgMCwgOCwgMTAwLCAwLCA4LCAzNiwgMCwgOSwgMTY5LCAwLCA4LCA0LCAwLCA4LCAxMzIsIDAsIDgsIDY4LCAwLCA5LCAyMzMsIDgwLCA3LCA4LCAwLCA4LFxuXHRcdFx0OTIsIDAsIDgsIDI4LCAwLCA5LCAxNTMsIDg0LCA3LCA4MywgMCwgOCwgMTI0LCAwLCA4LCA2MCwgMCwgOSwgMjE3LCA4MiwgNywgMjMsIDAsIDgsIDEwOCwgMCwgOCwgNDQsIDAsIDksIDE4NSwgMCwgOCwgMTIsIDAsIDgsIDE0MCwgMCwgOCwgNzYsIDAsIDksXG5cdFx0XHQyNDksIDgwLCA3LCAzLCAwLCA4LCA4MiwgMCwgOCwgMTgsIDg1LCA4LCAxNjMsIDgzLCA3LCAzNSwgMCwgOCwgMTE0LCAwLCA4LCA1MCwgMCwgOSwgMTk3LCA4MSwgNywgMTEsIDAsIDgsIDk4LCAwLCA4LCAzNCwgMCwgOSwgMTY1LCAwLCA4LCAyLCAwLCA4LFxuXHRcdFx0MTMwLCAwLCA4LCA2NiwgMCwgOSwgMjI5LCA4MCwgNywgNywgMCwgOCwgOTAsIDAsIDgsIDI2LCAwLCA5LCAxNDksIDg0LCA3LCA2NywgMCwgOCwgMTIyLCAwLCA4LCA1OCwgMCwgOSwgMjEzLCA4MiwgNywgMTksIDAsIDgsIDEwNiwgMCwgOCwgNDIsIDAsIDksXG5cdFx0XHQxODEsIDAsIDgsIDEwLCAwLCA4LCAxMzgsIDAsIDgsIDc0LCAwLCA5LCAyNDUsIDgwLCA3LCA1LCAwLCA4LCA4NiwgMCwgOCwgMjIsIDE5MiwgOCwgMCwgODMsIDcsIDUxLCAwLCA4LCAxMTgsIDAsIDgsIDU0LCAwLCA5LCAyMDUsIDgxLCA3LCAxNSwgMCwgOCxcblx0XHRcdDEwMiwgMCwgOCwgMzgsIDAsIDksIDE3MywgMCwgOCwgNiwgMCwgOCwgMTM0LCAwLCA4LCA3MCwgMCwgOSwgMjM3LCA4MCwgNywgOSwgMCwgOCwgOTQsIDAsIDgsIDMwLCAwLCA5LCAxNTcsIDg0LCA3LCA5OSwgMCwgOCwgMTI2LCAwLCA4LCA2MiwgMCwgOSxcblx0XHRcdDIyMSwgODIsIDcsIDI3LCAwLCA4LCAxMTAsIDAsIDgsIDQ2LCAwLCA5LCAxODksIDAsIDgsIDE0LCAwLCA4LCAxNDIsIDAsIDgsIDc4LCAwLCA5LCAyNTMsIDk2LCA3LCAyNTYsIDAsIDgsIDgxLCAwLCA4LCAxNywgODUsIDgsIDEzMSwgODIsIDcsIDMxLCAwLFxuXHRcdFx0OCwgMTEzLCAwLCA4LCA0OSwgMCwgOSwgMTk1LCA4MCwgNywgMTAsIDAsIDgsIDk3LCAwLCA4LCAzMywgMCwgOSwgMTYzLCAwLCA4LCAxLCAwLCA4LCAxMjksIDAsIDgsIDY1LCAwLCA5LCAyMjcsIDgwLCA3LCA2LCAwLCA4LCA4OSwgMCwgOCwgMjUsIDAsIDksXG5cdFx0XHQxNDcsIDgzLCA3LCA1OSwgMCwgOCwgMTIxLCAwLCA4LCA1NywgMCwgOSwgMjExLCA4MSwgNywgMTcsIDAsIDgsIDEwNSwgMCwgOCwgNDEsIDAsIDksIDE3OSwgMCwgOCwgOSwgMCwgOCwgMTM3LCAwLCA4LCA3MywgMCwgOSwgMjQzLCA4MCwgNywgNCwgMCwgOCxcblx0XHRcdDg1LCAwLCA4LCAyMSwgODAsIDgsIDI1OCwgODMsIDcsIDQzLCAwLCA4LCAxMTcsIDAsIDgsIDUzLCAwLCA5LCAyMDMsIDgxLCA3LCAxMywgMCwgOCwgMTAxLCAwLCA4LCAzNywgMCwgOSwgMTcxLCAwLCA4LCA1LCAwLCA4LCAxMzMsIDAsIDgsIDY5LCAwLCA5LFxuXHRcdFx0MjM1LCA4MCwgNywgOCwgMCwgOCwgOTMsIDAsIDgsIDI5LCAwLCA5LCAxNTUsIDg0LCA3LCA4MywgMCwgOCwgMTI1LCAwLCA4LCA2MSwgMCwgOSwgMjE5LCA4MiwgNywgMjMsIDAsIDgsIDEwOSwgMCwgOCwgNDUsIDAsIDksIDE4NywgMCwgOCwgMTMsIDAsIDgsXG5cdFx0XHQxNDEsIDAsIDgsIDc3LCAwLCA5LCAyNTEsIDgwLCA3LCAzLCAwLCA4LCA4MywgMCwgOCwgMTksIDg1LCA4LCAxOTUsIDgzLCA3LCAzNSwgMCwgOCwgMTE1LCAwLCA4LCA1MSwgMCwgOSwgMTk5LCA4MSwgNywgMTEsIDAsIDgsIDk5LCAwLCA4LCAzNSwgMCwgOSxcblx0XHRcdDE2NywgMCwgOCwgMywgMCwgOCwgMTMxLCAwLCA4LCA2NywgMCwgOSwgMjMxLCA4MCwgNywgNywgMCwgOCwgOTEsIDAsIDgsIDI3LCAwLCA5LCAxNTEsIDg0LCA3LCA2NywgMCwgOCwgMTIzLCAwLCA4LCA1OSwgMCwgOSwgMjE1LCA4MiwgNywgMTksIDAsIDgsXG5cdFx0XHQxMDcsIDAsIDgsIDQzLCAwLCA5LCAxODMsIDAsIDgsIDExLCAwLCA4LCAxMzksIDAsIDgsIDc1LCAwLCA5LCAyNDcsIDgwLCA3LCA1LCAwLCA4LCA4NywgMCwgOCwgMjMsIDE5MiwgOCwgMCwgODMsIDcsIDUxLCAwLCA4LCAxMTksIDAsIDgsIDU1LCAwLCA5LFxuXHRcdFx0MjA3LCA4MSwgNywgMTUsIDAsIDgsIDEwMywgMCwgOCwgMzksIDAsIDksIDE3NSwgMCwgOCwgNywgMCwgOCwgMTM1LCAwLCA4LCA3MSwgMCwgOSwgMjM5LCA4MCwgNywgOSwgMCwgOCwgOTUsIDAsIDgsIDMxLCAwLCA5LCAxNTksIDg0LCA3LCA5OSwgMCwgOCxcblx0XHRcdDEyNywgMCwgOCwgNjMsIDAsIDksIDIyMywgODIsIDcsIDI3LCAwLCA4LCAxMTEsIDAsIDgsIDQ3LCAwLCA5LCAxOTEsIDAsIDgsIDE1LCAwLCA4LCAxNDMsIDAsIDgsIDc5LCAwLCA5LCAyNTUgXTtcblx0dmFyIGZpeGVkX3RkID0gWyA4MCwgNSwgMSwgODcsIDUsIDI1NywgODMsIDUsIDE3LCA5MSwgNSwgNDA5NywgODEsIDUsIDUsIDg5LCA1LCAxMDI1LCA4NSwgNSwgNjUsIDkzLCA1LCAxNjM4NSwgODAsIDUsIDMsIDg4LCA1LCA1MTMsIDg0LCA1LCAzMywgOTIsIDUsXG5cdFx0XHQ4MTkzLCA4MiwgNSwgOSwgOTAsIDUsIDIwNDksIDg2LCA1LCAxMjksIDE5MiwgNSwgMjQ1NzcsIDgwLCA1LCAyLCA4NywgNSwgMzg1LCA4MywgNSwgMjUsIDkxLCA1LCA2MTQ1LCA4MSwgNSwgNywgODksIDUsIDE1MzcsIDg1LCA1LCA5NywgOTMsIDUsXG5cdFx0XHQyNDU3NywgODAsIDUsIDQsIDg4LCA1LCA3NjksIDg0LCA1LCA0OSwgOTIsIDUsIDEyMjg5LCA4MiwgNSwgMTMsIDkwLCA1LCAzMDczLCA4NiwgNSwgMTkzLCAxOTIsIDUsIDI0NTc3IF07XG5cblx0Ly8gVGFibGVzIGZvciBkZWZsYXRlIGZyb20gUEtaSVAncyBhcHBub3RlLnR4dC5cblx0dmFyIGNwbGVucyA9IFsgLy8gQ29weSBsZW5ndGhzIGZvciBsaXRlcmFsIGNvZGVzIDI1Ny4uMjg1XG5cdDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTMsIDE1LCAxNywgMTksIDIzLCAyNywgMzEsIDM1LCA0MywgNTEsIDU5LCA2NywgODMsIDk5LCAxMTUsIDEzMSwgMTYzLCAxOTUsIDIyNywgMjU4LCAwLCAwIF07XG5cblx0Ly8gc2VlIG5vdGUgIzEzIGFib3ZlIGFib3V0IDI1OFxuXHR2YXIgY3BsZXh0ID0gWyAvLyBFeHRyYSBiaXRzIGZvciBsaXRlcmFsIGNvZGVzIDI1Ny4uMjg1XG5cdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDEsIDEsIDIsIDIsIDIsIDIsIDMsIDMsIDMsIDMsIDQsIDQsIDQsIDQsIDUsIDUsIDUsIDUsIDAsIDExMiwgMTEyIC8vIDExMj09aW52YWxpZFxuXHRdO1xuXG5cdHZhciBjcGRpc3QgPSBbIC8vIENvcHkgb2Zmc2V0cyBmb3IgZGlzdGFuY2UgY29kZXMgMC4uMjlcblx0MSwgMiwgMywgNCwgNSwgNywgOSwgMTMsIDE3LCAyNSwgMzMsIDQ5LCA2NSwgOTcsIDEyOSwgMTkzLCAyNTcsIDM4NSwgNTEzLCA3NjksIDEwMjUsIDE1MzcsIDIwNDksIDMwNzMsIDQwOTcsIDYxNDUsIDgxOTMsIDEyMjg5LCAxNjM4NSwgMjQ1NzcgXTtcblxuXHR2YXIgY3BkZXh0ID0gWyAvLyBFeHRyYSBiaXRzIGZvciBkaXN0YW5jZSBjb2Rlc1xuXHQwLCAwLCAwLCAwLCAxLCAxLCAyLCAyLCAzLCAzLCA0LCA0LCA1LCA1LCA2LCA2LCA3LCA3LCA4LCA4LCA5LCA5LCAxMCwgMTAsIDExLCAxMSwgMTIsIDEyLCAxMywgMTMgXTtcblxuXHQvLyBJZiBCTUFYIG5lZWRzIHRvIGJlIGxhcmdlciB0aGFuIDE2LCB0aGVuIGggYW5kIHhbXSBzaG91bGQgYmUgdUxvbmcuXG5cdHZhciBCTUFYID0gMTU7IC8vIG1heGltdW0gYml0IGxlbmd0aCBvZiBhbnkgY29kZVxuXG5cdGZ1bmN0aW9uIEluZlRyZWUoKSB7XG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdFx0dmFyIGhuOyAvLyBodWZ0cyB1c2VkIGluIHNwYWNlXG5cdFx0dmFyIHY7IC8vIHdvcmsgYXJlYSBmb3IgaHVmdF9idWlsZFxuXHRcdHZhciBjOyAvLyBiaXQgbGVuZ3RoIGNvdW50IHRhYmxlXG5cdFx0dmFyIHI7IC8vIHRhYmxlIGVudHJ5IGZvciBzdHJ1Y3R1cmUgYXNzaWdubWVudFxuXHRcdHZhciB1OyAvLyB0YWJsZSBzdGFja1xuXHRcdHZhciB4OyAvLyBiaXQgb2Zmc2V0cywgdGhlbiBjb2RlIHN0YWNrXG5cblx0XHRmdW5jdGlvbiBodWZ0X2J1aWxkKGIsIC8vIGNvZGUgbGVuZ3RocyBpbiBiaXRzIChhbGwgYXNzdW1lZCA8PVxuXHRcdC8vIEJNQVgpXG5cdFx0YmluZGV4LCBuLCAvLyBudW1iZXIgb2YgY29kZXMgKGFzc3VtZWQgPD0gMjg4KVxuXHRcdHMsIC8vIG51bWJlciBvZiBzaW1wbGUtdmFsdWVkIGNvZGVzICgwLi5zLTEpXG5cdFx0ZCwgLy8gbGlzdCBvZiBiYXNlIHZhbHVlcyBmb3Igbm9uLXNpbXBsZSBjb2Rlc1xuXHRcdGUsIC8vIGxpc3Qgb2YgZXh0cmEgYml0cyBmb3Igbm9uLXNpbXBsZSBjb2Rlc1xuXHRcdHQsIC8vIHJlc3VsdDogc3RhcnRpbmcgdGFibGVcblx0XHRtLCAvLyBtYXhpbXVtIGxvb2t1cCBiaXRzLCByZXR1cm5zIGFjdHVhbFxuXHRcdGhwLC8vIHNwYWNlIGZvciB0cmVlc1xuXHRcdGhuLC8vIGh1ZnRzIHVzZWQgaW4gc3BhY2Vcblx0XHR2IC8vIHdvcmtpbmcgYXJlYTogdmFsdWVzIGluIG9yZGVyIG9mIGJpdCBsZW5ndGhcblx0XHQpIHtcblx0XHRcdC8vIEdpdmVuIGEgbGlzdCBvZiBjb2RlIGxlbmd0aHMgYW5kIGEgbWF4aW11bSB0YWJsZSBzaXplLCBtYWtlIGEgc2V0IG9mXG5cdFx0XHQvLyB0YWJsZXMgdG8gZGVjb2RlIHRoYXQgc2V0IG9mIGNvZGVzLiBSZXR1cm4gWl9PSyBvbiBzdWNjZXNzLFxuXHRcdFx0Ly8gWl9CVUZfRVJST1Jcblx0XHRcdC8vIGlmIHRoZSBnaXZlbiBjb2RlIHNldCBpcyBpbmNvbXBsZXRlICh0aGUgdGFibGVzIGFyZSBzdGlsbCBidWlsdCBpblxuXHRcdFx0Ly8gdGhpc1xuXHRcdFx0Ly8gY2FzZSksIFpfREFUQV9FUlJPUiBpZiB0aGUgaW5wdXQgaXMgaW52YWxpZCAoYW4gb3Zlci1zdWJzY3JpYmVkIHNldFxuXHRcdFx0Ly8gb2Zcblx0XHRcdC8vIGxlbmd0aHMpLCBvciBaX01FTV9FUlJPUiBpZiBub3QgZW5vdWdoIG1lbW9yeS5cblxuXHRcdFx0dmFyIGE7IC8vIGNvdW50ZXIgZm9yIGNvZGVzIG9mIGxlbmd0aCBrXG5cdFx0XHR2YXIgZjsgLy8gaSByZXBlYXRzIGluIHRhYmxlIGV2ZXJ5IGYgZW50cmllc1xuXHRcdFx0dmFyIGc7IC8vIG1heGltdW0gY29kZSBsZW5ndGhcblx0XHRcdHZhciBoOyAvLyB0YWJsZSBsZXZlbFxuXHRcdFx0dmFyIGk7IC8vIGNvdW50ZXIsIGN1cnJlbnQgY29kZVxuXHRcdFx0dmFyIGo7IC8vIGNvdW50ZXJcblx0XHRcdHZhciBrOyAvLyBudW1iZXIgb2YgYml0cyBpbiBjdXJyZW50IGNvZGVcblx0XHRcdHZhciBsOyAvLyBiaXRzIHBlciB0YWJsZSAocmV0dXJuZWQgaW4gbSlcblx0XHRcdHZhciBtYXNrOyAvLyAoMSA8PCB3KSAtIDEsIHRvIGF2b2lkIGNjIC1PIGJ1ZyBvbiBIUFxuXHRcdFx0dmFyIHA7IC8vIHBvaW50ZXIgaW50byBjW10sIGJbXSwgb3IgdltdXG5cdFx0XHR2YXIgcTsgLy8gcG9pbnRzIHRvIGN1cnJlbnQgdGFibGVcblx0XHRcdHZhciB3OyAvLyBiaXRzIGJlZm9yZSB0aGlzIHRhYmxlID09IChsICogaClcblx0XHRcdHZhciB4cDsgLy8gcG9pbnRlciBpbnRvIHhcblx0XHRcdHZhciB5OyAvLyBudW1iZXIgb2YgZHVtbXkgY29kZXMgYWRkZWRcblx0XHRcdHZhciB6OyAvLyBudW1iZXIgb2YgZW50cmllcyBpbiBjdXJyZW50IHRhYmxlXG5cblx0XHRcdC8vIEdlbmVyYXRlIGNvdW50cyBmb3IgZWFjaCBiaXQgbGVuZ3RoXG5cblx0XHRcdHAgPSAwO1xuXHRcdFx0aSA9IG47XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGNbYltiaW5kZXggKyBwXV0rKztcblx0XHRcdFx0cCsrO1xuXHRcdFx0XHRpLS07IC8vIGFzc3VtZSBhbGwgZW50cmllcyA8PSBCTUFYXG5cdFx0XHR9IHdoaWxlIChpICE9PSAwKTtcblxuXHRcdFx0aWYgKGNbMF0gPT0gbikgeyAvLyBudWxsIGlucHV0LS1hbGwgemVybyBsZW5ndGggY29kZXNcblx0XHRcdFx0dFswXSA9IC0xO1xuXHRcdFx0XHRtWzBdID0gMDtcblx0XHRcdFx0cmV0dXJuIFpfT0s7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZpbmQgbWluaW11bSBhbmQgbWF4aW11bSBsZW5ndGgsIGJvdW5kICptIGJ5IHRob3NlXG5cdFx0XHRsID0gbVswXTtcblx0XHRcdGZvciAoaiA9IDE7IGogPD0gQk1BWDsgaisrKVxuXHRcdFx0XHRpZiAoY1tqXSAhPT0gMClcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdGsgPSBqOyAvLyBtaW5pbXVtIGNvZGUgbGVuZ3RoXG5cdFx0XHRpZiAobCA8IGopIHtcblx0XHRcdFx0bCA9IGo7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGkgPSBCTUFYOyBpICE9PSAwOyBpLS0pIHtcblx0XHRcdFx0aWYgKGNbaV0gIT09IDApXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRnID0gaTsgLy8gbWF4aW11bSBjb2RlIGxlbmd0aFxuXHRcdFx0aWYgKGwgPiBpKSB7XG5cdFx0XHRcdGwgPSBpO1xuXHRcdFx0fVxuXHRcdFx0bVswXSA9IGw7XG5cblx0XHRcdC8vIEFkanVzdCBsYXN0IGxlbmd0aCBjb3VudCB0byBmaWxsIG91dCBjb2RlcywgaWYgbmVlZGVkXG5cdFx0XHRmb3IgKHkgPSAxIDw8IGo7IGogPCBpOyBqKyssIHkgPDw9IDEpIHtcblx0XHRcdFx0aWYgKCh5IC09IGNbal0pIDwgMCkge1xuXHRcdFx0XHRcdHJldHVybiBaX0RBVEFfRVJST1I7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICgoeSAtPSBjW2ldKSA8IDApIHtcblx0XHRcdFx0cmV0dXJuIFpfREFUQV9FUlJPUjtcblx0XHRcdH1cblx0XHRcdGNbaV0gKz0geTtcblxuXHRcdFx0Ly8gR2VuZXJhdGUgc3RhcnRpbmcgb2Zmc2V0cyBpbnRvIHRoZSB2YWx1ZSB0YWJsZSBmb3IgZWFjaCBsZW5ndGhcblx0XHRcdHhbMV0gPSBqID0gMDtcblx0XHRcdHAgPSAxO1xuXHRcdFx0eHAgPSAyO1xuXHRcdFx0d2hpbGUgKC0taSAhPT0gMCkgeyAvLyBub3RlIHRoYXQgaSA9PSBnIGZyb20gYWJvdmVcblx0XHRcdFx0eFt4cF0gPSAoaiArPSBjW3BdKTtcblx0XHRcdFx0eHArKztcblx0XHRcdFx0cCsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWtlIGEgdGFibGUgb2YgdmFsdWVzIGluIG9yZGVyIG9mIGJpdCBsZW5ndGhzXG5cdFx0XHRpID0gMDtcblx0XHRcdHAgPSAwO1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRpZiAoKGogPSBiW2JpbmRleCArIHBdKSAhPT0gMCkge1xuXHRcdFx0XHRcdHZbeFtqXSsrXSA9IGk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cCsrO1xuXHRcdFx0fSB3aGlsZSAoKytpIDwgbik7XG5cdFx0XHRuID0geFtnXTsgLy8gc2V0IG4gdG8gbGVuZ3RoIG9mIHZcblxuXHRcdFx0Ly8gR2VuZXJhdGUgdGhlIEh1ZmZtYW4gY29kZXMgYW5kIGZvciBlYWNoLCBtYWtlIHRoZSB0YWJsZSBlbnRyaWVzXG5cdFx0XHR4WzBdID0gaSA9IDA7IC8vIGZpcnN0IEh1ZmZtYW4gY29kZSBpcyB6ZXJvXG5cdFx0XHRwID0gMDsgLy8gZ3JhYiB2YWx1ZXMgaW4gYml0IG9yZGVyXG5cdFx0XHRoID0gLTE7IC8vIG5vIHRhYmxlcyB5ZXQtLWxldmVsIC0xXG5cdFx0XHR3ID0gLWw7IC8vIGJpdHMgZGVjb2RlZCA9PSAobCAqIGgpXG5cdFx0XHR1WzBdID0gMDsgLy8ganVzdCB0byBrZWVwIGNvbXBpbGVycyBoYXBweVxuXHRcdFx0cSA9IDA7IC8vIGRpdHRvXG5cdFx0XHR6ID0gMDsgLy8gZGl0dG9cblxuXHRcdFx0Ly8gZ28gdGhyb3VnaCB0aGUgYml0IGxlbmd0aHMgKGsgYWxyZWFkeSBpcyBiaXRzIGluIHNob3J0ZXN0IGNvZGUpXG5cdFx0XHRmb3IgKDsgayA8PSBnOyBrKyspIHtcblx0XHRcdFx0YSA9IGNba107XG5cdFx0XHRcdHdoaWxlIChhLS0gIT09IDApIHtcblx0XHRcdFx0XHQvLyBoZXJlIGkgaXMgdGhlIEh1ZmZtYW4gY29kZSBvZiBsZW5ndGggayBiaXRzIGZvciB2YWx1ZSAqcFxuXHRcdFx0XHRcdC8vIG1ha2UgdGFibGVzIHVwIHRvIHJlcXVpcmVkIGxldmVsXG5cdFx0XHRcdFx0d2hpbGUgKGsgPiB3ICsgbCkge1xuXHRcdFx0XHRcdFx0aCsrO1xuXHRcdFx0XHRcdFx0dyArPSBsOyAvLyBwcmV2aW91cyB0YWJsZSBhbHdheXMgbCBiaXRzXG5cdFx0XHRcdFx0XHQvLyBjb21wdXRlIG1pbmltdW0gc2l6ZSB0YWJsZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gbCBiaXRzXG5cdFx0XHRcdFx0XHR6ID0gZyAtIHc7XG5cdFx0XHRcdFx0XHR6ID0gKHogPiBsKSA/IGwgOiB6OyAvLyB0YWJsZSBzaXplIHVwcGVyIGxpbWl0XG5cdFx0XHRcdFx0XHRpZiAoKGYgPSAxIDw8IChqID0gayAtIHcpKSA+IGEgKyAxKSB7IC8vIHRyeSBhIGstdyBiaXQgdGFibGVcblx0XHRcdFx0XHRcdFx0Ly8gdG9vIGZldyBjb2RlcyBmb3Jcblx0XHRcdFx0XHRcdFx0Ly8gay13IGJpdCB0YWJsZVxuXHRcdFx0XHRcdFx0XHRmIC09IGEgKyAxOyAvLyBkZWR1Y3QgY29kZXMgZnJvbSBwYXR0ZXJucyBsZWZ0XG5cdFx0XHRcdFx0XHRcdHhwID0gaztcblx0XHRcdFx0XHRcdFx0aWYgKGogPCB6KSB7XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCsraiA8IHopIHsgLy8gdHJ5IHNtYWxsZXIgdGFibGVzIHVwIHRvIHogYml0c1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKChmIDw8PSAxKSA8PSBjWysreHBdKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhazsgLy8gZW5vdWdoIGNvZGVzIHRvIHVzZSB1cCBqIGJpdHNcblx0XHRcdFx0XHRcdFx0XHRcdGYgLT0gY1t4cF07IC8vIGVsc2UgZGVkdWN0IGNvZGVzIGZyb20gcGF0dGVybnNcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHogPSAxIDw8IGo7IC8vIHRhYmxlIGVudHJpZXMgZm9yIGotYml0IHRhYmxlXG5cblx0XHRcdFx0XHRcdC8vIGFsbG9jYXRlIG5ldyB0YWJsZVxuXHRcdFx0XHRcdFx0aWYgKGhuWzBdICsgeiA+IE1BTlkpIHsgLy8gKG5vdGU6IGRvZXNuJ3QgbWF0dGVyIGZvciBmaXhlZClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFpfREFUQV9FUlJPUjsgLy8gb3ZlcmZsb3cgb2YgTUFOWVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dVtoXSA9IHEgPSAvKiBocCsgKi9oblswXTsgLy8gREVCVUdcblx0XHRcdFx0XHRcdGhuWzBdICs9IHo7XG5cblx0XHRcdFx0XHRcdC8vIGNvbm5lY3QgdG8gbGFzdCB0YWJsZSwgaWYgdGhlcmUgaXMgb25lXG5cdFx0XHRcdFx0XHRpZiAoaCAhPT0gMCkge1xuXHRcdFx0XHRcdFx0XHR4W2hdID0gaTsgLy8gc2F2ZSBwYXR0ZXJuIGZvciBiYWNraW5nIHVwXG5cdFx0XHRcdFx0XHRcdHJbMF0gPSAvKiAoYnl0ZSkgKi9qOyAvLyBiaXRzIGluIHRoaXMgdGFibGVcblx0XHRcdFx0XHRcdFx0clsxXSA9IC8qIChieXRlKSAqL2w7IC8vIGJpdHMgdG8gZHVtcCBiZWZvcmUgdGhpcyB0YWJsZVxuXHRcdFx0XHRcdFx0XHRqID0gaSA+Pj4gKHcgLSBsKTtcblx0XHRcdFx0XHRcdFx0clsyXSA9IC8qIChpbnQpICovKHEgLSB1W2ggLSAxXSAtIGopOyAvLyBvZmZzZXQgdG8gdGhpcyB0YWJsZVxuXHRcdFx0XHRcdFx0XHRocC5zZXQociwgKHVbaCAtIDFdICsgaikgKiAzKTtcblx0XHRcdFx0XHRcdFx0Ly8gdG9cblx0XHRcdFx0XHRcdFx0Ly8gbGFzdFxuXHRcdFx0XHRcdFx0XHQvLyB0YWJsZVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dFswXSA9IHE7IC8vIGZpcnN0IHRhYmxlIGlzIHJldHVybmVkIHJlc3VsdFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIHNldCB1cCB0YWJsZSBlbnRyeSBpbiByXG5cdFx0XHRcdFx0clsxXSA9IC8qIChieXRlKSAqLyhrIC0gdyk7XG5cdFx0XHRcdFx0aWYgKHAgPj0gbikge1xuXHRcdFx0XHRcdFx0clswXSA9IDEyOCArIDY0OyAvLyBvdXQgb2YgdmFsdWVzLS1pbnZhbGlkIGNvZGVcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHZbcF0gPCBzKSB7XG5cdFx0XHRcdFx0XHRyWzBdID0gLyogKGJ5dGUpICovKHZbcF0gPCAyNTYgPyAwIDogMzIgKyA2NCk7IC8vIDI1NiBpc1xuXHRcdFx0XHRcdFx0Ly8gZW5kLW9mLWJsb2NrXG5cdFx0XHRcdFx0XHRyWzJdID0gdltwKytdOyAvLyBzaW1wbGUgY29kZSBpcyBqdXN0IHRoZSB2YWx1ZVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyWzBdID0gLyogKGJ5dGUpICovKGVbdltwXSAtIHNdICsgMTYgKyA2NCk7IC8vIG5vbi1zaW1wbGUtLWxvb2tcblx0XHRcdFx0XHRcdC8vIHVwIGluIGxpc3RzXG5cdFx0XHRcdFx0XHRyWzJdID0gZFt2W3ArK10gLSBzXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBmaWxsIGNvZGUtbGlrZSBlbnRyaWVzIHdpdGggclxuXHRcdFx0XHRcdGYgPSAxIDw8IChrIC0gdyk7XG5cdFx0XHRcdFx0Zm9yIChqID0gaSA+Pj4gdzsgaiA8IHo7IGogKz0gZikge1xuXHRcdFx0XHRcdFx0aHAuc2V0KHIsIChxICsgaikgKiAzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBiYWNrd2FyZHMgaW5jcmVtZW50IHRoZSBrLWJpdCBjb2RlIGlcblx0XHRcdFx0XHRmb3IgKGogPSAxIDw8IChrIC0gMSk7IChpICYgaikgIT09IDA7IGogPj4+PSAxKSB7XG5cdFx0XHRcdFx0XHRpIF49IGo7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGkgXj0gajtcblxuXHRcdFx0XHRcdC8vIGJhY2t1cCBvdmVyIGZpbmlzaGVkIHRhYmxlc1xuXHRcdFx0XHRcdG1hc2sgPSAoMSA8PCB3KSAtIDE7IC8vIG5lZWRlZCBvbiBIUCwgY2MgLU8gYnVnXG5cdFx0XHRcdFx0d2hpbGUgKChpICYgbWFzaykgIT0geFtoXSkge1xuXHRcdFx0XHRcdFx0aC0tOyAvLyBkb24ndCBuZWVkIHRvIHVwZGF0ZSBxXG5cdFx0XHRcdFx0XHR3IC09IGw7XG5cdFx0XHRcdFx0XHRtYXNrID0gKDEgPDwgdykgLSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gUmV0dXJuIFpfQlVGX0VSUk9SIGlmIHdlIHdlcmUgZ2l2ZW4gYW4gaW5jb21wbGV0ZSB0YWJsZVxuXHRcdFx0cmV0dXJuIHkgIT09IDAgJiYgZyAhPSAxID8gWl9CVUZfRVJST1IgOiBaX09LO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGluaXRXb3JrQXJlYSh2c2l6ZSkge1xuXHRcdFx0dmFyIGk7XG5cdFx0XHRpZiAoIWhuKSB7XG5cdFx0XHRcdGhuID0gW107IC8vIFtdOyAvL25ldyBBcnJheSgxKTtcblx0XHRcdFx0diA9IFtdOyAvLyBuZXcgQXJyYXkodnNpemUpO1xuXHRcdFx0XHRjID0gbmV3IEludDMyQXJyYXkoQk1BWCArIDEpOyAvLyBuZXcgQXJyYXkoQk1BWCArIDEpO1xuXHRcdFx0XHRyID0gW107IC8vIG5ldyBBcnJheSgzKTtcblx0XHRcdFx0dSA9IG5ldyBJbnQzMkFycmF5KEJNQVgpOyAvLyBuZXcgQXJyYXkoQk1BWCk7XG5cdFx0XHRcdHggPSBuZXcgSW50MzJBcnJheShCTUFYICsgMSk7IC8vIG5ldyBBcnJheShCTUFYICsgMSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodi5sZW5ndGggPCB2c2l6ZSkge1xuXHRcdFx0XHR2ID0gW107IC8vIG5ldyBBcnJheSh2c2l6ZSk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdnNpemU7IGkrKykge1xuXHRcdFx0XHR2W2ldID0gMDtcblx0XHRcdH1cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBCTUFYICsgMTsgaSsrKSB7XG5cdFx0XHRcdGNbaV0gPSAwO1xuXHRcdFx0fVxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdFx0XHRyW2ldID0gMDtcblx0XHRcdH1cblx0XHRcdC8vIGZvcihpbnQgaT0wOyBpPEJNQVg7IGkrKyl7dVtpXT0wO31cblx0XHRcdHUuc2V0KGMuc3ViYXJyYXkoMCwgQk1BWCksIDApO1xuXHRcdFx0Ly8gZm9yKGludCBpPTA7IGk8Qk1BWCsxOyBpKyspe3hbaV09MDt9XG5cdFx0XHR4LnNldChjLnN1YmFycmF5KDAsIEJNQVggKyAxKSwgMCk7XG5cdFx0fVxuXG5cdFx0dGhhdC5pbmZsYXRlX3RyZWVzX2JpdHMgPSBmdW5jdGlvbihjLCAvLyAxOSBjb2RlIGxlbmd0aHNcblx0XHRiYiwgLy8gYml0cyB0cmVlIGRlc2lyZWQvYWN0dWFsIGRlcHRoXG5cdFx0dGIsIC8vIGJpdHMgdHJlZSByZXN1bHRcblx0XHRocCwgLy8gc3BhY2UgZm9yIHRyZWVzXG5cdFx0eiAvLyBmb3IgbWVzc2FnZXNcblx0XHQpIHtcblx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRpbml0V29ya0FyZWEoMTkpO1xuXHRcdFx0aG5bMF0gPSAwO1xuXHRcdFx0cmVzdWx0ID0gaHVmdF9idWlsZChjLCAwLCAxOSwgMTksIG51bGwsIG51bGwsIHRiLCBiYiwgaHAsIGhuLCB2KTtcblxuXHRcdFx0aWYgKHJlc3VsdCA9PSBaX0RBVEFfRVJST1IpIHtcblx0XHRcdFx0ei5tc2cgPSBcIm92ZXJzdWJzY3JpYmVkIGR5bmFtaWMgYml0IGxlbmd0aHMgdHJlZVwiO1xuXHRcdFx0fSBlbHNlIGlmIChyZXN1bHQgPT0gWl9CVUZfRVJST1IgfHwgYmJbMF0gPT09IDApIHtcblx0XHRcdFx0ei5tc2cgPSBcImluY29tcGxldGUgZHluYW1pYyBiaXQgbGVuZ3RocyB0cmVlXCI7XG5cdFx0XHRcdHJlc3VsdCA9IFpfREFUQV9FUlJPUjtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fTtcblxuXHRcdHRoYXQuaW5mbGF0ZV90cmVlc19keW5hbWljID0gZnVuY3Rpb24obmwsIC8vIG51bWJlciBvZiBsaXRlcmFsL2xlbmd0aCBjb2Rlc1xuXHRcdG5kLCAvLyBudW1iZXIgb2YgZGlzdGFuY2UgY29kZXNcblx0XHRjLCAvLyB0aGF0IG1hbnkgKHRvdGFsKSBjb2RlIGxlbmd0aHNcblx0XHRibCwgLy8gbGl0ZXJhbCBkZXNpcmVkL2FjdHVhbCBiaXQgZGVwdGhcblx0XHRiZCwgLy8gZGlzdGFuY2UgZGVzaXJlZC9hY3R1YWwgYml0IGRlcHRoXG5cdFx0dGwsIC8vIGxpdGVyYWwvbGVuZ3RoIHRyZWUgcmVzdWx0XG5cdFx0dGQsIC8vIGRpc3RhbmNlIHRyZWUgcmVzdWx0XG5cdFx0aHAsIC8vIHNwYWNlIGZvciB0cmVlc1xuXHRcdHogLy8gZm9yIG1lc3NhZ2VzXG5cdFx0KSB7XG5cdFx0XHR2YXIgcmVzdWx0O1xuXG5cdFx0XHQvLyBidWlsZCBsaXRlcmFsL2xlbmd0aCB0cmVlXG5cdFx0XHRpbml0V29ya0FyZWEoMjg4KTtcblx0XHRcdGhuWzBdID0gMDtcblx0XHRcdHJlc3VsdCA9IGh1ZnRfYnVpbGQoYywgMCwgbmwsIDI1NywgY3BsZW5zLCBjcGxleHQsIHRsLCBibCwgaHAsIGhuLCB2KTtcblx0XHRcdGlmIChyZXN1bHQgIT0gWl9PSyB8fCBibFswXSA9PT0gMCkge1xuXHRcdFx0XHRpZiAocmVzdWx0ID09IFpfREFUQV9FUlJPUikge1xuXHRcdFx0XHRcdHoubXNnID0gXCJvdmVyc3Vic2NyaWJlZCBsaXRlcmFsL2xlbmd0aCB0cmVlXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0ICE9IFpfTUVNX0VSUk9SKSB7XG5cdFx0XHRcdFx0ei5tc2cgPSBcImluY29tcGxldGUgbGl0ZXJhbC9sZW5ndGggdHJlZVwiO1xuXHRcdFx0XHRcdHJlc3VsdCA9IFpfREFUQV9FUlJPUjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBidWlsZCBkaXN0YW5jZSB0cmVlXG5cdFx0XHRpbml0V29ya0FyZWEoMjg4KTtcblx0XHRcdHJlc3VsdCA9IGh1ZnRfYnVpbGQoYywgbmwsIG5kLCAwLCBjcGRpc3QsIGNwZGV4dCwgdGQsIGJkLCBocCwgaG4sIHYpO1xuXG5cdFx0XHRpZiAocmVzdWx0ICE9IFpfT0sgfHwgKGJkWzBdID09PSAwICYmIG5sID4gMjU3KSkge1xuXHRcdFx0XHRpZiAocmVzdWx0ID09IFpfREFUQV9FUlJPUikge1xuXHRcdFx0XHRcdHoubXNnID0gXCJvdmVyc3Vic2NyaWJlZCBkaXN0YW5jZSB0cmVlXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0ID09IFpfQlVGX0VSUk9SKSB7XG5cdFx0XHRcdFx0ei5tc2cgPSBcImluY29tcGxldGUgZGlzdGFuY2UgdHJlZVwiO1xuXHRcdFx0XHRcdHJlc3VsdCA9IFpfREFUQV9FUlJPUjtcblx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQgIT0gWl9NRU1fRVJST1IpIHtcblx0XHRcdFx0XHR6Lm1zZyA9IFwiZW1wdHkgZGlzdGFuY2UgdHJlZSB3aXRoIGxlbmd0aHNcIjtcblx0XHRcdFx0XHRyZXN1bHQgPSBaX0RBVEFfRVJST1I7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFpfT0s7XG5cdFx0fTtcblxuXHR9XG5cblx0SW5mVHJlZS5pbmZsYXRlX3RyZWVzX2ZpeGVkID0gZnVuY3Rpb24oYmwsIC8vIGxpdGVyYWwgZGVzaXJlZC9hY3R1YWwgYml0IGRlcHRoXG5cdGJkLCAvLyBkaXN0YW5jZSBkZXNpcmVkL2FjdHVhbCBiaXQgZGVwdGhcblx0dGwsLy8gbGl0ZXJhbC9sZW5ndGggdHJlZSByZXN1bHRcblx0dGQvLyBkaXN0YW5jZSB0cmVlIHJlc3VsdFxuXHQpIHtcblx0XHRibFswXSA9IGZpeGVkX2JsO1xuXHRcdGJkWzBdID0gZml4ZWRfYmQ7XG5cdFx0dGxbMF0gPSBmaXhlZF90bDtcblx0XHR0ZFswXSA9IGZpeGVkX3RkO1xuXHRcdHJldHVybiBaX09LO1xuXHR9O1xuXG5cdC8vIEluZkNvZGVzXG5cblx0Ly8gd2FpdGluZyBmb3IgXCJpOlwiPWlucHV0LFxuXHQvLyBcIm86XCI9b3V0cHV0LFxuXHQvLyBcIng6XCI9bm90aGluZ1xuXHR2YXIgU1RBUlQgPSAwOyAvLyB4OiBzZXQgdXAgZm9yIExFTlxuXHR2YXIgTEVOID0gMTsgLy8gaTogZ2V0IGxlbmd0aC9saXRlcmFsL2VvYiBuZXh0XG5cdHZhciBMRU5FWFQgPSAyOyAvLyBpOiBnZXR0aW5nIGxlbmd0aCBleHRyYSAoaGF2ZSBiYXNlKVxuXHR2YXIgRElTVCA9IDM7IC8vIGk6IGdldCBkaXN0YW5jZSBuZXh0XG5cdHZhciBESVNURVhUID0gNDsvLyBpOiBnZXR0aW5nIGRpc3RhbmNlIGV4dHJhXG5cdHZhciBDT1BZID0gNTsgLy8gbzogY29weWluZyBieXRlcyBpbiB3aW5kb3csIHdhaXRpbmdcblx0Ly8gZm9yIHNwYWNlXG5cdHZhciBMSVQgPSA2OyAvLyBvOiBnb3QgbGl0ZXJhbCwgd2FpdGluZyBmb3Igb3V0cHV0XG5cdC8vIHNwYWNlXG5cdHZhciBXQVNIID0gNzsgLy8gbzogZ290IGVvYiwgcG9zc2libHkgc3RpbGwgb3V0cHV0XG5cdC8vIHdhaXRpbmdcblx0dmFyIEVORCA9IDg7IC8vIHg6IGdvdCBlb2IgYW5kIGFsbCBkYXRhIGZsdXNoZWRcblx0dmFyIEJBRENPREUgPSA5Oy8vIHg6IGdvdCBlcnJvclxuXG5cdGZ1bmN0aW9uIEluZkNvZGVzKCkge1xuXHRcdHZhciB0aGF0ID0gdGhpcztcblxuXHRcdHZhciBtb2RlOyAvLyBjdXJyZW50IGluZmxhdGVfY29kZXMgbW9kZVxuXG5cdFx0Ly8gbW9kZSBkZXBlbmRlbnQgaW5mb3JtYXRpb25cblx0XHR2YXIgbGVuID0gMDtcblxuXHRcdHZhciB0cmVlOyAvLyBwb2ludGVyIGludG8gdHJlZVxuXHRcdHZhciB0cmVlX2luZGV4ID0gMDtcblx0XHR2YXIgbmVlZCA9IDA7IC8vIGJpdHMgbmVlZGVkXG5cblx0XHR2YXIgbGl0ID0gMDtcblxuXHRcdC8vIGlmIEVYVCBvciBDT1BZLCB3aGVyZSBhbmQgaG93IG11Y2hcblx0XHR2YXIgZ2V0ID0gMDsgLy8gYml0cyB0byBnZXQgZm9yIGV4dHJhXG5cdFx0dmFyIGRpc3QgPSAwOyAvLyBkaXN0YW5jZSBiYWNrIHRvIGNvcHkgZnJvbVxuXG5cdFx0dmFyIGxiaXRzID0gMDsgLy8gbHRyZWUgYml0cyBkZWNvZGVkIHBlciBicmFuY2hcblx0XHR2YXIgZGJpdHMgPSAwOyAvLyBkdHJlZSBiaXRzIGRlY29kZXIgcGVyIGJyYW5jaFxuXHRcdHZhciBsdHJlZTsgLy8gbGl0ZXJhbC9sZW5ndGgvZW9iIHRyZWVcblx0XHR2YXIgbHRyZWVfaW5kZXggPSAwOyAvLyBsaXRlcmFsL2xlbmd0aC9lb2IgdHJlZVxuXHRcdHZhciBkdHJlZTsgLy8gZGlzdGFuY2UgdHJlZVxuXHRcdHZhciBkdHJlZV9pbmRleCA9IDA7IC8vIGRpc3RhbmNlIHRyZWVcblxuXHRcdC8vIENhbGxlZCB3aXRoIG51bWJlciBvZiBieXRlcyBsZWZ0IHRvIHdyaXRlIGluIHdpbmRvdyBhdCBsZWFzdCAyNThcblx0XHQvLyAodGhlIG1heGltdW0gc3RyaW5nIGxlbmd0aCkgYW5kIG51bWJlciBvZiBpbnB1dCBieXRlcyBhdmFpbGFibGVcblx0XHQvLyBhdCBsZWFzdCB0ZW4uIFRoZSB0ZW4gYnl0ZXMgYXJlIHNpeCBieXRlcyBmb3IgdGhlIGxvbmdlc3QgbGVuZ3RoL1xuXHRcdC8vIGRpc3RhbmNlIHBhaXIgcGx1cyBmb3VyIGJ5dGVzIGZvciBvdmVybG9hZGluZyB0aGUgYml0IGJ1ZmZlci5cblxuXHRcdGZ1bmN0aW9uIGluZmxhdGVfZmFzdChibCwgYmQsIHRsLCB0bF9pbmRleCwgdGQsIHRkX2luZGV4LCBzLCB6KSB7XG5cdFx0XHR2YXIgdDsgLy8gdGVtcG9yYXJ5IHBvaW50ZXJcblx0XHRcdHZhciB0cDsgLy8gdGVtcG9yYXJ5IHBvaW50ZXJcblx0XHRcdHZhciB0cF9pbmRleDsgLy8gdGVtcG9yYXJ5IHBvaW50ZXJcblx0XHRcdHZhciBlOyAvLyBleHRyYSBiaXRzIG9yIG9wZXJhdGlvblxuXHRcdFx0dmFyIGI7IC8vIGJpdCBidWZmZXJcblx0XHRcdHZhciBrOyAvLyBiaXRzIGluIGJpdCBidWZmZXJcblx0XHRcdHZhciBwOyAvLyBpbnB1dCBkYXRhIHBvaW50ZXJcblx0XHRcdHZhciBuOyAvLyBieXRlcyBhdmFpbGFibGUgdGhlcmVcblx0XHRcdHZhciBxOyAvLyBvdXRwdXQgd2luZG93IHdyaXRlIHBvaW50ZXJcblx0XHRcdHZhciBtOyAvLyBieXRlcyB0byBlbmQgb2Ygd2luZG93IG9yIHJlYWQgcG9pbnRlclxuXHRcdFx0dmFyIG1sOyAvLyBtYXNrIGZvciBsaXRlcmFsL2xlbmd0aCB0cmVlXG5cdFx0XHR2YXIgbWQ7IC8vIG1hc2sgZm9yIGRpc3RhbmNlIHRyZWVcblx0XHRcdHZhciBjOyAvLyBieXRlcyB0byBjb3B5XG5cdFx0XHR2YXIgZDsgLy8gZGlzdGFuY2UgYmFjayB0byBjb3B5IGZyb21cblx0XHRcdHZhciByOyAvLyBjb3B5IHNvdXJjZSBwb2ludGVyXG5cblx0XHRcdHZhciB0cF9pbmRleF90XzM7IC8vICh0cF9pbmRleCt0KSozXG5cblx0XHRcdC8vIGxvYWQgaW5wdXQsIG91dHB1dCwgYml0IHZhbHVlc1xuXHRcdFx0cCA9IHoubmV4dF9pbl9pbmRleDtcblx0XHRcdG4gPSB6LmF2YWlsX2luO1xuXHRcdFx0YiA9IHMuYml0Yjtcblx0XHRcdGsgPSBzLmJpdGs7XG5cdFx0XHRxID0gcy53cml0ZTtcblx0XHRcdG0gPSBxIDwgcy5yZWFkID8gcy5yZWFkIC0gcSAtIDEgOiBzLmVuZCAtIHE7XG5cblx0XHRcdC8vIGluaXRpYWxpemUgbWFza3Ncblx0XHRcdG1sID0gaW5mbGF0ZV9tYXNrW2JsXTtcblx0XHRcdG1kID0gaW5mbGF0ZV9tYXNrW2JkXTtcblxuXHRcdFx0Ly8gZG8gdW50aWwgbm90IGVub3VnaCBpbnB1dCBvciBvdXRwdXQgc3BhY2UgZm9yIGZhc3QgbG9vcFxuXHRcdFx0ZG8geyAvLyBhc3N1bWUgY2FsbGVkIHdpdGggbSA+PSAyNTggJiYgbiA+PSAxMFxuXHRcdFx0XHQvLyBnZXQgbGl0ZXJhbC9sZW5ndGggY29kZVxuXHRcdFx0XHR3aGlsZSAoayA8ICgyMCkpIHsgLy8gbWF4IGJpdHMgZm9yIGxpdGVyYWwvbGVuZ3RoIGNvZGVcblx0XHRcdFx0XHRuLS07XG5cdFx0XHRcdFx0YiB8PSAoei5yZWFkX2J5dGUocCsrKSAmIDB4ZmYpIDw8IGs7XG5cdFx0XHRcdFx0ayArPSA4O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dCA9IGIgJiBtbDtcblx0XHRcdFx0dHAgPSB0bDtcblx0XHRcdFx0dHBfaW5kZXggPSB0bF9pbmRleDtcblx0XHRcdFx0dHBfaW5kZXhfdF8zID0gKHRwX2luZGV4ICsgdCkgKiAzO1xuXHRcdFx0XHRpZiAoKGUgPSB0cFt0cF9pbmRleF90XzNdKSA9PT0gMCkge1xuXHRcdFx0XHRcdGIgPj49ICh0cFt0cF9pbmRleF90XzMgKyAxXSk7XG5cdFx0XHRcdFx0ayAtPSAodHBbdHBfaW5kZXhfdF8zICsgMV0pO1xuXG5cdFx0XHRcdFx0cy53aW5kb3dbcSsrXSA9IC8qIChieXRlKSAqL3RwW3RwX2luZGV4X3RfMyArIDJdO1xuXHRcdFx0XHRcdG0tLTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkbyB7XG5cblx0XHRcdFx0XHRiID4+PSAodHBbdHBfaW5kZXhfdF8zICsgMV0pO1xuXHRcdFx0XHRcdGsgLT0gKHRwW3RwX2luZGV4X3RfMyArIDFdKTtcblxuXHRcdFx0XHRcdGlmICgoZSAmIDE2KSAhPT0gMCkge1xuXHRcdFx0XHRcdFx0ZSAmPSAxNTtcblx0XHRcdFx0XHRcdGMgPSB0cFt0cF9pbmRleF90XzMgKyAyXSArICgvKiAoaW50KSAqL2IgJiBpbmZsYXRlX21hc2tbZV0pO1xuXG5cdFx0XHRcdFx0XHRiID4+PSBlO1xuXHRcdFx0XHRcdFx0ayAtPSBlO1xuXG5cdFx0XHRcdFx0XHQvLyBkZWNvZGUgZGlzdGFuY2UgYmFzZSBvZiBibG9jayB0byBjb3B5XG5cdFx0XHRcdFx0XHR3aGlsZSAoayA8ICgxNSkpIHsgLy8gbWF4IGJpdHMgZm9yIGRpc3RhbmNlIGNvZGVcblx0XHRcdFx0XHRcdFx0bi0tO1xuXHRcdFx0XHRcdFx0XHRiIHw9ICh6LnJlYWRfYnl0ZShwKyspICYgMHhmZikgPDwgaztcblx0XHRcdFx0XHRcdFx0ayArPSA4O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0ID0gYiAmIG1kO1xuXHRcdFx0XHRcdFx0dHAgPSB0ZDtcblx0XHRcdFx0XHRcdHRwX2luZGV4ID0gdGRfaW5kZXg7XG5cdFx0XHRcdFx0XHR0cF9pbmRleF90XzMgPSAodHBfaW5kZXggKyB0KSAqIDM7XG5cdFx0XHRcdFx0XHRlID0gdHBbdHBfaW5kZXhfdF8zXTtcblxuXHRcdFx0XHRcdFx0ZG8ge1xuXG5cdFx0XHRcdFx0XHRcdGIgPj49ICh0cFt0cF9pbmRleF90XzMgKyAxXSk7XG5cdFx0XHRcdFx0XHRcdGsgLT0gKHRwW3RwX2luZGV4X3RfMyArIDFdKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoKGUgJiAxNikgIT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBnZXQgZXh0cmEgYml0cyB0byBhZGQgdG8gZGlzdGFuY2UgYmFzZVxuXHRcdFx0XHRcdFx0XHRcdGUgJj0gMTU7XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKGsgPCAoZSkpIHsgLy8gZ2V0IGV4dHJhIGJpdHMgKHVwIHRvIDEzKVxuXHRcdFx0XHRcdFx0XHRcdFx0bi0tO1xuXHRcdFx0XHRcdFx0XHRcdFx0YiB8PSAoei5yZWFkX2J5dGUocCsrKSAmIDB4ZmYpIDw8IGs7XG5cdFx0XHRcdFx0XHRcdFx0XHRrICs9IDg7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0ZCA9IHRwW3RwX2luZGV4X3RfMyArIDJdICsgKGIgJiBpbmZsYXRlX21hc2tbZV0pO1xuXG5cdFx0XHRcdFx0XHRcdFx0YiA+Pj0gKGUpO1xuXHRcdFx0XHRcdFx0XHRcdGsgLT0gKGUpO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZG8gdGhlIGNvcHlcblx0XHRcdFx0XHRcdFx0XHRtIC09IGM7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHEgPj0gZCkgeyAvLyBvZmZzZXQgYmVmb3JlIGRlc3Rcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGp1c3QgY29weVxuXHRcdFx0XHRcdFx0XHRcdFx0ciA9IHEgLSBkO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHEgLSByID4gMCAmJiAyID4gKHEgLSByKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzLndpbmRvd1txKytdID0gcy53aW5kb3dbcisrXTsgLy8gbWluaW11bVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBjb3VudCBpc1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyB0aHJlZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0cy53aW5kb3dbcSsrXSA9IHMud2luZG93W3IrK107IC8vIHNvIHVucm9sbFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBsb29wIGFcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gbGl0dGxlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGMgLT0gMjtcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHMud2luZG93LnNldChzLndpbmRvdy5zdWJhcnJheShyLCByICsgMiksIHEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRxICs9IDI7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHIgKz0gMjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YyAtPSAyO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7IC8vIGVsc2Ugb2Zmc2V0IGFmdGVyIGRlc3RpbmF0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRyID0gcSAtIGQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHIgKz0gcy5lbmQ7IC8vIGZvcmNlIHBvaW50ZXIgaW4gd2luZG93XG5cdFx0XHRcdFx0XHRcdFx0XHR9IHdoaWxlIChyIDwgMCk7IC8vIGNvdmVycyBpbnZhbGlkIGRpc3RhbmNlc1xuXHRcdFx0XHRcdFx0XHRcdFx0ZSA9IHMuZW5kIC0gcjtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjID4gZSkgeyAvLyBpZiBzb3VyY2UgY3Jvc3Nlcyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0YyAtPSBlOyAvLyB3cmFwcGVkIGNvcHlcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHEgLSByID4gMCAmJiBlID4gKHEgLSByKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHMud2luZG93W3ErK10gPSBzLndpbmRvd1tyKytdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gd2hpbGUgKC0tZSAhPT0gMCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cy53aW5kb3cuc2V0KHMud2luZG93LnN1YmFycmF5KHIsIHIgKyBlKSwgcSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cSArPSBlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHIgKz0gZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlID0gMDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyID0gMDsgLy8gY29weSByZXN0IGZyb20gc3RhcnQgb2Ygd2luZG93XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBjb3B5IGFsbCBvciB3aGF0J3MgbGVmdFxuXHRcdFx0XHRcdFx0XHRcdGlmIChxIC0gciA+IDAgJiYgYyA+IChxIC0gcikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cy53aW5kb3dbcSsrXSA9IHMud2luZG93W3IrK107XG5cdFx0XHRcdFx0XHRcdFx0XHR9IHdoaWxlICgtLWMgIT09IDApO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzLndpbmRvdy5zZXQocy53aW5kb3cuc3ViYXJyYXkociwgciArIGMpLCBxKTtcblx0XHRcdFx0XHRcdFx0XHRcdHEgKz0gYztcblx0XHRcdFx0XHRcdFx0XHRcdHIgKz0gYztcblx0XHRcdFx0XHRcdFx0XHRcdGMgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICgoZSAmIDY0KSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdHQgKz0gdHBbdHBfaW5kZXhfdF8zICsgMl07XG5cdFx0XHRcdFx0XHRcdFx0dCArPSAoYiAmIGluZmxhdGVfbWFza1tlXSk7XG5cdFx0XHRcdFx0XHRcdFx0dHBfaW5kZXhfdF8zID0gKHRwX2luZGV4ICsgdCkgKiAzO1xuXHRcdFx0XHRcdFx0XHRcdGUgPSB0cFt0cF9pbmRleF90XzNdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHoubXNnID0gXCJpbnZhbGlkIGRpc3RhbmNlIGNvZGVcIjtcblxuXHRcdFx0XHRcdFx0XHRcdGMgPSB6LmF2YWlsX2luIC0gbjtcblx0XHRcdFx0XHRcdFx0XHRjID0gKGsgPj4gMykgPCBjID8gayA+PiAzIDogYztcblx0XHRcdFx0XHRcdFx0XHRuICs9IGM7XG5cdFx0XHRcdFx0XHRcdFx0cCAtPSBjO1xuXHRcdFx0XHRcdFx0XHRcdGsgLT0gYyA8PCAzO1xuXG5cdFx0XHRcdFx0XHRcdFx0cy5iaXRiID0gYjtcblx0XHRcdFx0XHRcdFx0XHRzLmJpdGsgPSBrO1xuXHRcdFx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xuXHRcdFx0XHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdFx0XHRcdHMud3JpdGUgPSBxO1xuXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFpfREFUQV9FUlJPUjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSB3aGlsZSAodHJ1ZSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoKGUgJiA2NCkgPT09IDApIHtcblx0XHRcdFx0XHRcdHQgKz0gdHBbdHBfaW5kZXhfdF8zICsgMl07XG5cdFx0XHRcdFx0XHR0ICs9IChiICYgaW5mbGF0ZV9tYXNrW2VdKTtcblx0XHRcdFx0XHRcdHRwX2luZGV4X3RfMyA9ICh0cF9pbmRleCArIHQpICogMztcblx0XHRcdFx0XHRcdGlmICgoZSA9IHRwW3RwX2luZGV4X3RfM10pID09PSAwKSB7XG5cblx0XHRcdFx0XHRcdFx0YiA+Pj0gKHRwW3RwX2luZGV4X3RfMyArIDFdKTtcblx0XHRcdFx0XHRcdFx0ayAtPSAodHBbdHBfaW5kZXhfdF8zICsgMV0pO1xuXG5cdFx0XHRcdFx0XHRcdHMud2luZG93W3ErK10gPSAvKiAoYnl0ZSkgKi90cFt0cF9pbmRleF90XzMgKyAyXTtcblx0XHRcdFx0XHRcdFx0bS0tO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKChlICYgMzIpICE9PSAwKSB7XG5cblx0XHRcdFx0XHRcdGMgPSB6LmF2YWlsX2luIC0gbjtcblx0XHRcdFx0XHRcdGMgPSAoayA+PiAzKSA8IGMgPyBrID4+IDMgOiBjO1xuXHRcdFx0XHRcdFx0biArPSBjO1xuXHRcdFx0XHRcdFx0cCAtPSBjO1xuXHRcdFx0XHRcdFx0ayAtPSBjIDw8IDM7XG5cblx0XHRcdFx0XHRcdHMuYml0YiA9IGI7XG5cdFx0XHRcdFx0XHRzLmJpdGsgPSBrO1xuXHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdFx0cy53cml0ZSA9IHE7XG5cblx0XHRcdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FTkQ7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHoubXNnID0gXCJpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGVcIjtcblxuXHRcdFx0XHRcdFx0YyA9IHouYXZhaWxfaW4gLSBuO1xuXHRcdFx0XHRcdFx0YyA9IChrID4+IDMpIDwgYyA/IGsgPj4gMyA6IGM7XG5cdFx0XHRcdFx0XHRuICs9IGM7XG5cdFx0XHRcdFx0XHRwIC09IGM7XG5cdFx0XHRcdFx0XHRrIC09IGMgPDwgMztcblxuXHRcdFx0XHRcdFx0cy5iaXRiID0gYjtcblx0XHRcdFx0XHRcdHMuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcblx0XHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHRzLndyaXRlID0gcTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIFpfREFUQV9FUlJPUjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gd2hpbGUgKHRydWUpO1xuXHRcdFx0fSB3aGlsZSAobSA+PSAyNTggJiYgbiA+PSAxMCk7XG5cblx0XHRcdC8vIG5vdCBlbm91Z2ggaW5wdXQgb3Igb3V0cHV0LS1yZXN0b3JlIHBvaW50ZXJzIGFuZCByZXR1cm5cblx0XHRcdGMgPSB6LmF2YWlsX2luIC0gbjtcblx0XHRcdGMgPSAoayA+PiAzKSA8IGMgPyBrID4+IDMgOiBjO1xuXHRcdFx0biArPSBjO1xuXHRcdFx0cCAtPSBjO1xuXHRcdFx0ayAtPSBjIDw8IDM7XG5cblx0XHRcdHMuYml0YiA9IGI7XG5cdFx0XHRzLmJpdGsgPSBrO1xuXHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0cy53cml0ZSA9IHE7XG5cblx0XHRcdHJldHVybiBaX09LO1xuXHRcdH1cblxuXHRcdHRoYXQuaW5pdCA9IGZ1bmN0aW9uKGJsLCBiZCwgdGwsIHRsX2luZGV4LCB0ZCwgdGRfaW5kZXgpIHtcblx0XHRcdG1vZGUgPSBTVEFSVDtcblx0XHRcdGxiaXRzID0gLyogKGJ5dGUpICovYmw7XG5cdFx0XHRkYml0cyA9IC8qIChieXRlKSAqL2JkO1xuXHRcdFx0bHRyZWUgPSB0bDtcblx0XHRcdGx0cmVlX2luZGV4ID0gdGxfaW5kZXg7XG5cdFx0XHRkdHJlZSA9IHRkO1xuXHRcdFx0ZHRyZWVfaW5kZXggPSB0ZF9pbmRleDtcblx0XHRcdHRyZWUgPSBudWxsO1xuXHRcdH07XG5cblx0XHR0aGF0LnByb2MgPSBmdW5jdGlvbihzLCB6LCByKSB7XG5cdFx0XHR2YXIgajsgLy8gdGVtcG9yYXJ5IHN0b3JhZ2Vcblx0XHRcdHZhciB0aW5kZXg7IC8vIHRlbXBvcmFyeSBwb2ludGVyXG5cdFx0XHR2YXIgZTsgLy8gZXh0cmEgYml0cyBvciBvcGVyYXRpb25cblx0XHRcdHZhciBiID0gMDsgLy8gYml0IGJ1ZmZlclxuXHRcdFx0dmFyIGsgPSAwOyAvLyBiaXRzIGluIGJpdCBidWZmZXJcblx0XHRcdHZhciBwID0gMDsgLy8gaW5wdXQgZGF0YSBwb2ludGVyXG5cdFx0XHR2YXIgbjsgLy8gYnl0ZXMgYXZhaWxhYmxlIHRoZXJlXG5cdFx0XHR2YXIgcTsgLy8gb3V0cHV0IHdpbmRvdyB3cml0ZSBwb2ludGVyXG5cdFx0XHR2YXIgbTsgLy8gYnl0ZXMgdG8gZW5kIG9mIHdpbmRvdyBvciByZWFkIHBvaW50ZXJcblx0XHRcdHZhciBmOyAvLyBwb2ludGVyIHRvIGNvcHkgc3RyaW5ncyBmcm9tXG5cblx0XHRcdC8vIGNvcHkgaW5wdXQvb3V0cHV0IGluZm9ybWF0aW9uIHRvIGxvY2FscyAoVVBEQVRFIG1hY3JvIHJlc3RvcmVzKVxuXHRcdFx0cCA9IHoubmV4dF9pbl9pbmRleDtcblx0XHRcdG4gPSB6LmF2YWlsX2luO1xuXHRcdFx0YiA9IHMuYml0Yjtcblx0XHRcdGsgPSBzLmJpdGs7XG5cdFx0XHRxID0gcy53cml0ZTtcblx0XHRcdG0gPSBxIDwgcy5yZWFkID8gcy5yZWFkIC0gcSAtIDEgOiBzLmVuZCAtIHE7XG5cblx0XHRcdC8vIHByb2Nlc3MgaW5wdXQgYW5kIG91dHB1dCBiYXNlZCBvbiBjdXJyZW50IHN0YXRlXG5cdFx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0XHRzd2l0Y2ggKG1vZGUpIHtcblx0XHRcdFx0Ly8gd2FpdGluZyBmb3IgXCJpOlwiPWlucHV0LCBcIm86XCI9b3V0cHV0LCBcIng6XCI9bm90aGluZ1xuXHRcdFx0XHRjYXNlIFNUQVJUOiAvLyB4OiBzZXQgdXAgZm9yIExFTlxuXHRcdFx0XHRcdGlmIChtID49IDI1OCAmJiBuID49IDEwKSB7XG5cblx0XHRcdFx0XHRcdHMuYml0YiA9IGI7XG5cdFx0XHRcdFx0XHRzLmJpdGsgPSBrO1xuXHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdFx0cy53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRyID0gaW5mbGF0ZV9mYXN0KGxiaXRzLCBkYml0cywgbHRyZWUsIGx0cmVlX2luZGV4LCBkdHJlZSwgZHRyZWVfaW5kZXgsIHMsIHopO1xuXG5cdFx0XHRcdFx0XHRwID0gei5uZXh0X2luX2luZGV4O1xuXHRcdFx0XHRcdFx0biA9IHouYXZhaWxfaW47XG5cdFx0XHRcdFx0XHRiID0gcy5iaXRiO1xuXHRcdFx0XHRcdFx0ayA9IHMuYml0aztcblx0XHRcdFx0XHRcdHEgPSBzLndyaXRlO1xuXHRcdFx0XHRcdFx0bSA9IHEgPCBzLnJlYWQgPyBzLnJlYWQgLSBxIC0gMSA6IHMuZW5kIC0gcTtcblxuXHRcdFx0XHRcdFx0aWYgKHIgIT0gWl9PSykge1xuXHRcdFx0XHRcdFx0XHRtb2RlID0gciA9PSBaX1NUUkVBTV9FTkQgPyBXQVNIIDogQkFEQ09ERTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5lZWQgPSBsYml0cztcblx0XHRcdFx0XHR0cmVlID0gbHRyZWU7XG5cdFx0XHRcdFx0dHJlZV9pbmRleCA9IGx0cmVlX2luZGV4O1xuXG5cdFx0XHRcdFx0bW9kZSA9IExFTjtcblx0XHRcdFx0Y2FzZSBMRU46IC8vIGk6IGdldCBsZW5ndGgvbGl0ZXJhbC9lb2IgbmV4dFxuXHRcdFx0XHRcdGogPSBuZWVkO1xuXG5cdFx0XHRcdFx0d2hpbGUgKGsgPCAoaikpIHtcblx0XHRcdFx0XHRcdGlmIChuICE9PSAwKVxuXHRcdFx0XHRcdFx0XHRyID0gWl9PSztcblx0XHRcdFx0XHRcdGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdHMuYml0YiA9IGI7XG5cdFx0XHRcdFx0XHRcdHMuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xuXHRcdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHRcdHMud3JpdGUgPSBxO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcy5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bi0tO1xuXHRcdFx0XHRcdFx0YiB8PSAoei5yZWFkX2J5dGUocCsrKSAmIDB4ZmYpIDw8IGs7XG5cdFx0XHRcdFx0XHRrICs9IDg7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGluZGV4ID0gKHRyZWVfaW5kZXggKyAoYiAmIGluZmxhdGVfbWFza1tqXSkpICogMztcblxuXHRcdFx0XHRcdGIgPj4+PSAodHJlZVt0aW5kZXggKyAxXSk7XG5cdFx0XHRcdFx0ayAtPSAodHJlZVt0aW5kZXggKyAxXSk7XG5cblx0XHRcdFx0XHRlID0gdHJlZVt0aW5kZXhdO1xuXG5cdFx0XHRcdFx0aWYgKGUgPT09IDApIHsgLy8gbGl0ZXJhbFxuXHRcdFx0XHRcdFx0bGl0ID0gdHJlZVt0aW5kZXggKyAyXTtcblx0XHRcdFx0XHRcdG1vZGUgPSBMSVQ7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKChlICYgMTYpICE9PSAwKSB7IC8vIGxlbmd0aFxuXHRcdFx0XHRcdFx0Z2V0ID0gZSAmIDE1O1xuXHRcdFx0XHRcdFx0bGVuID0gdHJlZVt0aW5kZXggKyAyXTtcblx0XHRcdFx0XHRcdG1vZGUgPSBMRU5FWFQ7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKChlICYgNjQpID09PSAwKSB7IC8vIG5leHQgdGFibGVcblx0XHRcdFx0XHRcdG5lZWQgPSBlO1xuXHRcdFx0XHRcdFx0dHJlZV9pbmRleCA9IHRpbmRleCAvIDMgKyB0cmVlW3RpbmRleCArIDJdO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICgoZSAmIDMyKSAhPT0gMCkgeyAvLyBlbmQgb2YgYmxvY2tcblx0XHRcdFx0XHRcdG1vZGUgPSBXQVNIO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG1vZGUgPSBCQURDT0RFOyAvLyBpbnZhbGlkIGNvZGVcblx0XHRcdFx0XHR6Lm1zZyA9IFwiaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlXCI7XG5cdFx0XHRcdFx0ciA9IFpfREFUQV9FUlJPUjtcblxuXHRcdFx0XHRcdHMuYml0YiA9IGI7XG5cdFx0XHRcdFx0cy5iaXRrID0gaztcblx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcblx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcblx0XHRcdFx0XHRzLndyaXRlID0gcTtcblx0XHRcdFx0XHRyZXR1cm4gcy5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXG5cdFx0XHRcdGNhc2UgTEVORVhUOiAvLyBpOiBnZXR0aW5nIGxlbmd0aCBleHRyYSAoaGF2ZSBiYXNlKVxuXHRcdFx0XHRcdGogPSBnZXQ7XG5cblx0XHRcdFx0XHR3aGlsZSAoayA8IChqKSkge1xuXHRcdFx0XHRcdFx0aWYgKG4gIT09IDApXG5cdFx0XHRcdFx0XHRcdHIgPSBaX09LO1xuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0cy5iaXRiID0gYjtcblx0XHRcdFx0XHRcdFx0cy5iaXRrID0gaztcblx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcblx0XHRcdFx0XHRcdFx0cy53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBzLmluZmxhdGVfZmx1c2goeiwgcik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRuLS07XG5cdFx0XHRcdFx0XHRiIHw9ICh6LnJlYWRfYnl0ZShwKyspICYgMHhmZikgPDwgaztcblx0XHRcdFx0XHRcdGsgKz0gODtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRsZW4gKz0gKGIgJiBpbmZsYXRlX21hc2tbal0pO1xuXG5cdFx0XHRcdFx0YiA+Pj0gajtcblx0XHRcdFx0XHRrIC09IGo7XG5cblx0XHRcdFx0XHRuZWVkID0gZGJpdHM7XG5cdFx0XHRcdFx0dHJlZSA9IGR0cmVlO1xuXHRcdFx0XHRcdHRyZWVfaW5kZXggPSBkdHJlZV9pbmRleDtcblx0XHRcdFx0XHRtb2RlID0gRElTVDtcblx0XHRcdFx0Y2FzZSBESVNUOiAvLyBpOiBnZXQgZGlzdGFuY2UgbmV4dFxuXHRcdFx0XHRcdGogPSBuZWVkO1xuXG5cdFx0XHRcdFx0d2hpbGUgKGsgPCAoaikpIHtcblx0XHRcdFx0XHRcdGlmIChuICE9PSAwKVxuXHRcdFx0XHRcdFx0XHRyID0gWl9PSztcblx0XHRcdFx0XHRcdGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdHMuYml0YiA9IGI7XG5cdFx0XHRcdFx0XHRcdHMuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xuXHRcdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHRcdHMud3JpdGUgPSBxO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcy5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bi0tO1xuXHRcdFx0XHRcdFx0YiB8PSAoei5yZWFkX2J5dGUocCsrKSAmIDB4ZmYpIDw8IGs7XG5cdFx0XHRcdFx0XHRrICs9IDg7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGluZGV4ID0gKHRyZWVfaW5kZXggKyAoYiAmIGluZmxhdGVfbWFza1tqXSkpICogMztcblxuXHRcdFx0XHRcdGIgPj49IHRyZWVbdGluZGV4ICsgMV07XG5cdFx0XHRcdFx0ayAtPSB0cmVlW3RpbmRleCArIDFdO1xuXG5cdFx0XHRcdFx0ZSA9ICh0cmVlW3RpbmRleF0pO1xuXHRcdFx0XHRcdGlmICgoZSAmIDE2KSAhPT0gMCkgeyAvLyBkaXN0YW5jZVxuXHRcdFx0XHRcdFx0Z2V0ID0gZSAmIDE1O1xuXHRcdFx0XHRcdFx0ZGlzdCA9IHRyZWVbdGluZGV4ICsgMl07XG5cdFx0XHRcdFx0XHRtb2RlID0gRElTVEVYVDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoKGUgJiA2NCkgPT09IDApIHsgLy8gbmV4dCB0YWJsZVxuXHRcdFx0XHRcdFx0bmVlZCA9IGU7XG5cdFx0XHRcdFx0XHR0cmVlX2luZGV4ID0gdGluZGV4IC8gMyArIHRyZWVbdGluZGV4ICsgMl07XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bW9kZSA9IEJBRENPREU7IC8vIGludmFsaWQgY29kZVxuXHRcdFx0XHRcdHoubXNnID0gXCJpbnZhbGlkIGRpc3RhbmNlIGNvZGVcIjtcblx0XHRcdFx0XHRyID0gWl9EQVRBX0VSUk9SO1xuXG5cdFx0XHRcdFx0cy5iaXRiID0gYjtcblx0XHRcdFx0XHRzLmJpdGsgPSBrO1xuXHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xuXHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdHMud3JpdGUgPSBxO1xuXHRcdFx0XHRcdHJldHVybiBzLmluZmxhdGVfZmx1c2goeiwgcik7XG5cblx0XHRcdFx0Y2FzZSBESVNURVhUOiAvLyBpOiBnZXR0aW5nIGRpc3RhbmNlIGV4dHJhXG5cdFx0XHRcdFx0aiA9IGdldDtcblxuXHRcdFx0XHRcdHdoaWxlIChrIDwgKGopKSB7XG5cdFx0XHRcdFx0XHRpZiAobiAhPT0gMClcblx0XHRcdFx0XHRcdFx0ciA9IFpfT0s7XG5cdFx0XHRcdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHRzLmJpdGIgPSBiO1xuXHRcdFx0XHRcdFx0XHRzLmJpdGsgPSBrO1xuXHRcdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcblx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xuXHRcdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdFx0XHRzLndyaXRlID0gcTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHMuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG4tLTtcblx0XHRcdFx0XHRcdGIgfD0gKHoucmVhZF9ieXRlKHArKykgJiAweGZmKSA8PCBrO1xuXHRcdFx0XHRcdFx0ayArPSA4O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGRpc3QgKz0gKGIgJiBpbmZsYXRlX21hc2tbal0pO1xuXG5cdFx0XHRcdFx0YiA+Pj0gajtcblx0XHRcdFx0XHRrIC09IGo7XG5cblx0XHRcdFx0XHRtb2RlID0gQ09QWTtcblx0XHRcdFx0Y2FzZSBDT1BZOiAvLyBvOiBjb3B5aW5nIGJ5dGVzIGluIHdpbmRvdywgd2FpdGluZyBmb3Igc3BhY2Vcblx0XHRcdFx0XHRmID0gcSAtIGRpc3Q7XG5cdFx0XHRcdFx0d2hpbGUgKGYgPCAwKSB7IC8vIG1vZHVsbyB3aW5kb3cgc2l6ZS1cIndoaWxlXCIgaW5zdGVhZFxuXHRcdFx0XHRcdFx0ZiArPSBzLmVuZDsgLy8gb2YgXCJpZlwiIGhhbmRsZXMgaW52YWxpZCBkaXN0YW5jZXNcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0d2hpbGUgKGxlbiAhPT0gMCkge1xuXG5cdFx0XHRcdFx0XHRpZiAobSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRpZiAocSA9PSBzLmVuZCAmJiBzLnJlYWQgIT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRxID0gMDtcblx0XHRcdFx0XHRcdFx0XHRtID0gcSA8IHMucmVhZCA/IHMucmVhZCAtIHEgLSAxIDogcy5lbmQgLSBxO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmIChtID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0cy53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdFx0ciA9IHMuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblx0XHRcdFx0XHRcdFx0XHRxID0gcy53cml0ZTtcblx0XHRcdFx0XHRcdFx0XHRtID0gcSA8IHMucmVhZCA/IHMucmVhZCAtIHEgLSAxIDogcy5lbmQgLSBxO1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHEgPT0gcy5lbmQgJiYgcy5yZWFkICE9PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRxID0gMDtcblx0XHRcdFx0XHRcdFx0XHRcdG0gPSBxIDwgcy5yZWFkID8gcy5yZWFkIC0gcSAtIDEgOiBzLmVuZCAtIHE7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG0gPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHMuYml0YiA9IGI7XG5cdFx0XHRcdFx0XHRcdFx0XHRzLmJpdGsgPSBrO1xuXHRcdFx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdFx0XHRcdFx0cy53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcy5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzLndpbmRvd1txKytdID0gcy53aW5kb3dbZisrXTtcblx0XHRcdFx0XHRcdG0tLTtcblxuXHRcdFx0XHRcdFx0aWYgKGYgPT0gcy5lbmQpXG5cdFx0XHRcdFx0XHRcdGYgPSAwO1xuXHRcdFx0XHRcdFx0bGVuLS07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG1vZGUgPSBTVEFSVDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBMSVQ6IC8vIG86IGdvdCBsaXRlcmFsLCB3YWl0aW5nIGZvciBvdXRwdXQgc3BhY2Vcblx0XHRcdFx0XHRpZiAobSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0aWYgKHEgPT0gcy5lbmQgJiYgcy5yZWFkICE9PSAwKSB7XG5cdFx0XHRcdFx0XHRcdHEgPSAwO1xuXHRcdFx0XHRcdFx0XHRtID0gcSA8IHMucmVhZCA/IHMucmVhZCAtIHEgLSAxIDogcy5lbmQgLSBxO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKG0gPT09IDApIHtcblx0XHRcdFx0XHRcdFx0cy53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdHIgPSBzLmluZmxhdGVfZmx1c2goeiwgcik7XG5cdFx0XHRcdFx0XHRcdHEgPSBzLndyaXRlO1xuXHRcdFx0XHRcdFx0XHRtID0gcSA8IHMucmVhZCA/IHMucmVhZCAtIHEgLSAxIDogcy5lbmQgLSBxO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChxID09IHMuZW5kICYmIHMucmVhZCAhPT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdHEgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdG0gPSBxIDwgcy5yZWFkID8gcy5yZWFkIC0gcSAtIDEgOiBzLmVuZCAtIHE7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKG0gPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRzLmJpdGIgPSBiO1xuXHRcdFx0XHRcdFx0XHRcdHMuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xuXHRcdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHRcdFx0cy53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHMuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyID0gWl9PSztcblxuXHRcdFx0XHRcdHMud2luZG93W3ErK10gPSAvKiAoYnl0ZSkgKi9saXQ7XG5cdFx0XHRcdFx0bS0tO1xuXG5cdFx0XHRcdFx0bW9kZSA9IFNUQVJUO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFdBU0g6IC8vIG86IGdvdCBlb2IsIHBvc3NpYmx5IG1vcmUgb3V0cHV0XG5cdFx0XHRcdFx0aWYgKGsgPiA3KSB7IC8vIHJldHVybiB1bnVzZWQgYnl0ZSwgaWYgYW55XG5cdFx0XHRcdFx0XHRrIC09IDg7XG5cdFx0XHRcdFx0XHRuKys7XG5cdFx0XHRcdFx0XHRwLS07IC8vIGNhbiBhbHdheXMgcmV0dXJuIG9uZVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHMud3JpdGUgPSBxO1xuXHRcdFx0XHRcdHIgPSBzLmluZmxhdGVfZmx1c2goeiwgcik7XG5cdFx0XHRcdFx0cSA9IHMud3JpdGU7XG5cdFx0XHRcdFx0bSA9IHEgPCBzLnJlYWQgPyBzLnJlYWQgLSBxIC0gMSA6IHMuZW5kIC0gcTtcblxuXHRcdFx0XHRcdGlmIChzLnJlYWQgIT0gcy53cml0ZSkge1xuXHRcdFx0XHRcdFx0cy5iaXRiID0gYjtcblx0XHRcdFx0XHRcdHMuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcblx0XHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHRzLndyaXRlID0gcTtcblx0XHRcdFx0XHRcdHJldHVybiBzLmluZmxhdGVfZmx1c2goeiwgcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG1vZGUgPSBFTkQ7XG5cdFx0XHRcdGNhc2UgRU5EOlxuXHRcdFx0XHRcdHIgPSBaX1NUUkVBTV9FTkQ7XG5cdFx0XHRcdFx0cy5iaXRiID0gYjtcblx0XHRcdFx0XHRzLmJpdGsgPSBrO1xuXHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xuXHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdHMud3JpdGUgPSBxO1xuXHRcdFx0XHRcdHJldHVybiBzLmluZmxhdGVfZmx1c2goeiwgcik7XG5cblx0XHRcdFx0Y2FzZSBCQURDT0RFOiAvLyB4OiBnb3QgZXJyb3JcblxuXHRcdFx0XHRcdHIgPSBaX0RBVEFfRVJST1I7XG5cblx0XHRcdFx0XHRzLmJpdGIgPSBiO1xuXHRcdFx0XHRcdHMuYml0ayA9IGs7XG5cdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xuXHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0cy53cml0ZSA9IHE7XG5cdFx0XHRcdFx0cmV0dXJuIHMuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHIgPSBaX1NUUkVBTV9FUlJPUjtcblxuXHRcdFx0XHRcdHMuYml0YiA9IGI7XG5cdFx0XHRcdFx0cy5iaXRrID0gaztcblx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcblx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcblx0XHRcdFx0XHRzLndyaXRlID0gcTtcblx0XHRcdFx0XHRyZXR1cm4gcy5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoYXQuZnJlZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gWkZSRUUoeiwgYyk7XG5cdFx0fTtcblxuXHR9XG5cblx0Ly8gSW5mQmxvY2tzXG5cblx0Ly8gVGFibGUgZm9yIGRlZmxhdGUgZnJvbSBQS1pJUCdzIGFwcG5vdGUudHh0LlxuXHR2YXIgYm9yZGVyID0gWyAvLyBPcmRlciBvZiB0aGUgYml0IGxlbmd0aCBjb2RlIGxlbmd0aHNcblx0MTYsIDE3LCAxOCwgMCwgOCwgNywgOSwgNiwgMTAsIDUsIDExLCA0LCAxMiwgMywgMTMsIDIsIDE0LCAxLCAxNSBdO1xuXG5cdHZhciBUWVBFID0gMDsgLy8gZ2V0IHR5cGUgYml0cyAoMywgaW5jbHVkaW5nIGVuZCBiaXQpXG5cdHZhciBMRU5TID0gMTsgLy8gZ2V0IGxlbmd0aHMgZm9yIHN0b3JlZFxuXHR2YXIgU1RPUkVEID0gMjsvLyBwcm9jZXNzaW5nIHN0b3JlZCBibG9ja1xuXHR2YXIgVEFCTEUgPSAzOyAvLyBnZXQgdGFibGUgbGVuZ3Roc1xuXHR2YXIgQlRSRUUgPSA0OyAvLyBnZXQgYml0IGxlbmd0aHMgdHJlZSBmb3IgYSBkeW5hbWljXG5cdC8vIGJsb2NrXG5cdHZhciBEVFJFRSA9IDU7IC8vIGdldCBsZW5ndGgsIGRpc3RhbmNlIHRyZWVzIGZvciBhXG5cdC8vIGR5bmFtaWMgYmxvY2tcblx0dmFyIENPREVTID0gNjsgLy8gcHJvY2Vzc2luZyBmaXhlZCBvciBkeW5hbWljIGJsb2NrXG5cdHZhciBEUlkgPSA3OyAvLyBvdXRwdXQgcmVtYWluaW5nIHdpbmRvdyBieXRlc1xuXHR2YXIgRE9ORUxPQ0tTID0gODsgLy8gZmluaXNoZWQgbGFzdCBibG9jaywgZG9uZVxuXHR2YXIgQkFEQkxPQ0tTID0gOTsgLy8gb3QgYSBkYXRhIGVycm9yLS1zdHVjayBoZXJlXG5cblx0ZnVuY3Rpb24gSW5mQmxvY2tzKHosIHcpIHtcblx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0XHR2YXIgbW9kZSA9IFRZUEU7IC8vIGN1cnJlbnQgaW5mbGF0ZV9ibG9jayBtb2RlXG5cblx0XHR2YXIgbGVmdCA9IDA7IC8vIGlmIFNUT1JFRCwgYnl0ZXMgbGVmdCB0byBjb3B5XG5cblx0XHR2YXIgdGFibGUgPSAwOyAvLyB0YWJsZSBsZW5ndGhzICgxNCBiaXRzKVxuXHRcdHZhciBpbmRleCA9IDA7IC8vIGluZGV4IGludG8gYmxlbnMgKG9yIGJvcmRlcilcblx0XHR2YXIgYmxlbnM7IC8vIGJpdCBsZW5ndGhzIG9mIGNvZGVzXG5cdFx0dmFyIGJiID0gWyAwIF07IC8vIGJpdCBsZW5ndGggdHJlZSBkZXB0aFxuXHRcdHZhciB0YiA9IFsgMCBdOyAvLyBiaXQgbGVuZ3RoIGRlY29kaW5nIHRyZWVcblxuXHRcdHZhciBjb2RlcyA9IG5ldyBJbmZDb2RlcygpOyAvLyBpZiBDT0RFUywgY3VycmVudCBzdGF0ZVxuXG5cdFx0dmFyIGxhc3QgPSAwOyAvLyB0cnVlIGlmIHRoaXMgYmxvY2sgaXMgdGhlIGxhc3QgYmxvY2tcblxuXHRcdHZhciBodWZ0cyA9IG5ldyBJbnQzMkFycmF5KE1BTlkgKiAzKTsgLy8gc2luZ2xlIG1hbGxvYyBmb3IgdHJlZSBzcGFjZVxuXHRcdHZhciBjaGVjayA9IDA7IC8vIGNoZWNrIG9uIG91dHB1dFxuXHRcdHZhciBpbmZ0cmVlID0gbmV3IEluZlRyZWUoKTtcblxuXHRcdHRoYXQuYml0ayA9IDA7IC8vIGJpdHMgaW4gYml0IGJ1ZmZlclxuXHRcdHRoYXQuYml0YiA9IDA7IC8vIGJpdCBidWZmZXJcblx0XHR0aGF0LndpbmRvdyA9IG5ldyBVaW50OEFycmF5KHcpOyAvLyBzbGlkaW5nIHdpbmRvd1xuXHRcdHRoYXQuZW5kID0gdzsgLy8gb25lIGJ5dGUgYWZ0ZXIgc2xpZGluZyB3aW5kb3dcblx0XHR0aGF0LnJlYWQgPSAwOyAvLyB3aW5kb3cgcmVhZCBwb2ludGVyXG5cdFx0dGhhdC53cml0ZSA9IDA7IC8vIHdpbmRvdyB3cml0ZSBwb2ludGVyXG5cblx0XHR0aGF0LnJlc2V0ID0gZnVuY3Rpb24oeiwgYykge1xuXHRcdFx0aWYgKGMpXG5cdFx0XHRcdGNbMF0gPSBjaGVjaztcblx0XHRcdC8vIGlmIChtb2RlID09IEJUUkVFIHx8IG1vZGUgPT0gRFRSRUUpIHtcblx0XHRcdC8vIH1cblx0XHRcdGlmIChtb2RlID09IENPREVTKSB7XG5cdFx0XHRcdGNvZGVzLmZyZWUoeik7XG5cdFx0XHR9XG5cdFx0XHRtb2RlID0gVFlQRTtcblx0XHRcdHRoYXQuYml0ayA9IDA7XG5cdFx0XHR0aGF0LmJpdGIgPSAwO1xuXHRcdFx0dGhhdC5yZWFkID0gdGhhdC53cml0ZSA9IDA7XG5cdFx0fTtcblxuXHRcdHRoYXQucmVzZXQoeiwgbnVsbCk7XG5cblx0XHQvLyBjb3B5IGFzIG11Y2ggYXMgcG9zc2libGUgZnJvbSB0aGUgc2xpZGluZyB3aW5kb3cgdG8gdGhlIG91dHB1dCBhcmVhXG5cdFx0dGhhdC5pbmZsYXRlX2ZsdXNoID0gZnVuY3Rpb24oeiwgcikge1xuXHRcdFx0dmFyIG47XG5cdFx0XHR2YXIgcDtcblx0XHRcdHZhciBxO1xuXG5cdFx0XHQvLyBsb2NhbCBjb3BpZXMgb2Ygc291cmNlIGFuZCBkZXN0aW5hdGlvbiBwb2ludGVyc1xuXHRcdFx0cCA9IHoubmV4dF9vdXRfaW5kZXg7XG5cdFx0XHRxID0gdGhhdC5yZWFkO1xuXG5cdFx0XHQvLyBjb21wdXRlIG51bWJlciBvZiBieXRlcyB0byBjb3B5IGFzIGZhciBhcyBlbmQgb2Ygd2luZG93XG5cdFx0XHRuID0gLyogKGludCkgKi8oKHEgPD0gdGhhdC53cml0ZSA/IHRoYXQud3JpdGUgOiB0aGF0LmVuZCkgLSBxKTtcblx0XHRcdGlmIChuID4gei5hdmFpbF9vdXQpXG5cdFx0XHRcdG4gPSB6LmF2YWlsX291dDtcblx0XHRcdGlmIChuICE9PSAwICYmIHIgPT0gWl9CVUZfRVJST1IpXG5cdFx0XHRcdHIgPSBaX09LO1xuXG5cdFx0XHQvLyB1cGRhdGUgY291bnRlcnNcblx0XHRcdHouYXZhaWxfb3V0IC09IG47XG5cdFx0XHR6LnRvdGFsX291dCArPSBuO1xuXG5cdFx0XHQvLyBjb3B5IGFzIGZhciBhcyBlbmQgb2Ygd2luZG93XG5cdFx0XHR6Lm5leHRfb3V0LnNldCh0aGF0LndpbmRvdy5zdWJhcnJheShxLCBxICsgbiksIHApO1xuXHRcdFx0cCArPSBuO1xuXHRcdFx0cSArPSBuO1xuXG5cdFx0XHQvLyBzZWUgaWYgbW9yZSB0byBjb3B5IGF0IGJlZ2lubmluZyBvZiB3aW5kb3dcblx0XHRcdGlmIChxID09IHRoYXQuZW5kKSB7XG5cdFx0XHRcdC8vIHdyYXAgcG9pbnRlcnNcblx0XHRcdFx0cSA9IDA7XG5cdFx0XHRcdGlmICh0aGF0LndyaXRlID09IHRoYXQuZW5kKVxuXHRcdFx0XHRcdHRoYXQud3JpdGUgPSAwO1xuXG5cdFx0XHRcdC8vIGNvbXB1dGUgYnl0ZXMgdG8gY29weVxuXHRcdFx0XHRuID0gdGhhdC53cml0ZSAtIHE7XG5cdFx0XHRcdGlmIChuID4gei5hdmFpbF9vdXQpXG5cdFx0XHRcdFx0biA9IHouYXZhaWxfb3V0O1xuXHRcdFx0XHRpZiAobiAhPT0gMCAmJiByID09IFpfQlVGX0VSUk9SKVxuXHRcdFx0XHRcdHIgPSBaX09LO1xuXG5cdFx0XHRcdC8vIHVwZGF0ZSBjb3VudGVyc1xuXHRcdFx0XHR6LmF2YWlsX291dCAtPSBuO1xuXHRcdFx0XHR6LnRvdGFsX291dCArPSBuO1xuXG5cdFx0XHRcdC8vIGNvcHlcblx0XHRcdFx0ei5uZXh0X291dC5zZXQodGhhdC53aW5kb3cuc3ViYXJyYXkocSwgcSArIG4pLCBwKTtcblx0XHRcdFx0cCArPSBuO1xuXHRcdFx0XHRxICs9IG47XG5cdFx0XHR9XG5cblx0XHRcdC8vIHVwZGF0ZSBwb2ludGVyc1xuXHRcdFx0ei5uZXh0X291dF9pbmRleCA9IHA7XG5cdFx0XHR0aGF0LnJlYWQgPSBxO1xuXG5cdFx0XHQvLyBkb25lXG5cdFx0XHRyZXR1cm4gcjtcblx0XHR9O1xuXG5cdFx0dGhhdC5wcm9jID0gZnVuY3Rpb24oeiwgcikge1xuXHRcdFx0dmFyIHQ7IC8vIHRlbXBvcmFyeSBzdG9yYWdlXG5cdFx0XHR2YXIgYjsgLy8gYml0IGJ1ZmZlclxuXHRcdFx0dmFyIGs7IC8vIGJpdHMgaW4gYml0IGJ1ZmZlclxuXHRcdFx0dmFyIHA7IC8vIGlucHV0IGRhdGEgcG9pbnRlclxuXHRcdFx0dmFyIG47IC8vIGJ5dGVzIGF2YWlsYWJsZSB0aGVyZVxuXHRcdFx0dmFyIHE7IC8vIG91dHB1dCB3aW5kb3cgd3JpdGUgcG9pbnRlclxuXHRcdFx0dmFyIG07IC8vIGJ5dGVzIHRvIGVuZCBvZiB3aW5kb3cgb3IgcmVhZCBwb2ludGVyXG5cblx0XHRcdHZhciBpO1xuXG5cdFx0XHQvLyBjb3B5IGlucHV0L291dHB1dCBpbmZvcm1hdGlvbiB0byBsb2NhbHMgKFVQREFURSBtYWNybyByZXN0b3Jlcylcblx0XHRcdC8vIHtcblx0XHRcdHAgPSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRuID0gei5hdmFpbF9pbjtcblx0XHRcdGIgPSB0aGF0LmJpdGI7XG5cdFx0XHRrID0gdGhhdC5iaXRrO1xuXHRcdFx0Ly8gfVxuXHRcdFx0Ly8ge1xuXHRcdFx0cSA9IHRoYXQud3JpdGU7XG5cdFx0XHRtID0gLyogKGludCkgKi8ocSA8IHRoYXQucmVhZCA/IHRoYXQucmVhZCAtIHEgLSAxIDogdGhhdC5lbmQgLSBxKTtcblx0XHRcdC8vIH1cblxuXHRcdFx0Ly8gcHJvY2VzcyBpbnB1dCBiYXNlZCBvbiBjdXJyZW50IHN0YXRlXG5cdFx0XHQvLyBERUJVRyBkdHJlZVxuXHRcdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdFx0c3dpdGNoIChtb2RlKSB7XG5cdFx0XHRcdGNhc2UgVFlQRTpcblxuXHRcdFx0XHRcdHdoaWxlIChrIDwgKDMpKSB7XG5cdFx0XHRcdFx0XHRpZiAobiAhPT0gMCkge1xuXHRcdFx0XHRcdFx0XHRyID0gWl9PSztcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XG5cdFx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xuXHRcdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bi0tO1xuXHRcdFx0XHRcdFx0YiB8PSAoei5yZWFkX2J5dGUocCsrKSAmIDB4ZmYpIDw8IGs7XG5cdFx0XHRcdFx0XHRrICs9IDg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHQgPSAvKiAoaW50KSAqLyhiICYgNyk7XG5cdFx0XHRcdFx0bGFzdCA9IHQgJiAxO1xuXG5cdFx0XHRcdFx0c3dpdGNoICh0ID4+PiAxKSB7XG5cdFx0XHRcdFx0Y2FzZSAwOiAvLyBzdG9yZWRcblx0XHRcdFx0XHRcdC8vIHtcblx0XHRcdFx0XHRcdGIgPj4+PSAoMyk7XG5cdFx0XHRcdFx0XHRrIC09ICgzKTtcblx0XHRcdFx0XHRcdC8vIH1cblx0XHRcdFx0XHRcdHQgPSBrICYgNzsgLy8gZ28gdG8gYnl0ZSBib3VuZGFyeVxuXG5cdFx0XHRcdFx0XHQvLyB7XG5cdFx0XHRcdFx0XHRiID4+Pj0gKHQpO1xuXHRcdFx0XHRcdFx0ayAtPSAodCk7XG5cdFx0XHRcdFx0XHQvLyB9XG5cdFx0XHRcdFx0XHRtb2RlID0gTEVOUzsgLy8gZ2V0IGxlbmd0aCBvZiBzdG9yZWQgYmxvY2tcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgMTogLy8gZml4ZWRcblx0XHRcdFx0XHRcdC8vIHtcblx0XHRcdFx0XHRcdHZhciBibCA9IFtdOyAvLyBuZXcgQXJyYXkoMSk7XG5cdFx0XHRcdFx0XHR2YXIgYmQgPSBbXTsgLy8gbmV3IEFycmF5KDEpO1xuXHRcdFx0XHRcdFx0dmFyIHRsID0gWyBbXSBdOyAvLyBuZXcgQXJyYXkoMSk7XG5cdFx0XHRcdFx0XHR2YXIgdGQgPSBbIFtdIF07IC8vIG5ldyBBcnJheSgxKTtcblxuXHRcdFx0XHRcdFx0SW5mVHJlZS5pbmZsYXRlX3RyZWVzX2ZpeGVkKGJsLCBiZCwgdGwsIHRkKTtcblx0XHRcdFx0XHRcdGNvZGVzLmluaXQoYmxbMF0sIGJkWzBdLCB0bFswXSwgMCwgdGRbMF0sIDApO1xuXHRcdFx0XHRcdFx0Ly8gfVxuXG5cdFx0XHRcdFx0XHQvLyB7XG5cdFx0XHRcdFx0XHRiID4+Pj0gKDMpO1xuXHRcdFx0XHRcdFx0ayAtPSAoMyk7XG5cdFx0XHRcdFx0XHQvLyB9XG5cblx0XHRcdFx0XHRcdG1vZGUgPSBDT0RFUztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgMjogLy8gZHluYW1pY1xuXG5cdFx0XHRcdFx0XHQvLyB7XG5cdFx0XHRcdFx0XHRiID4+Pj0gKDMpO1xuXHRcdFx0XHRcdFx0ayAtPSAoMyk7XG5cdFx0XHRcdFx0XHQvLyB9XG5cblx0XHRcdFx0XHRcdG1vZGUgPSBUQUJMRTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgMzogLy8gaWxsZWdhbFxuXG5cdFx0XHRcdFx0XHQvLyB7XG5cdFx0XHRcdFx0XHRiID4+Pj0gKDMpO1xuXHRcdFx0XHRcdFx0ayAtPSAoMyk7XG5cdFx0XHRcdFx0XHQvLyB9XG5cdFx0XHRcdFx0XHRtb2RlID0gQkFEQkxPQ0tTO1xuXHRcdFx0XHRcdFx0ei5tc2cgPSBcImludmFsaWQgYmxvY2sgdHlwZVwiO1xuXHRcdFx0XHRcdFx0ciA9IFpfREFUQV9FUlJPUjtcblxuXHRcdFx0XHRcdFx0dGhhdC5iaXRiID0gYjtcblx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcblx0XHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHR0aGF0LndyaXRlID0gcTtcblx0XHRcdFx0XHRcdHJldHVybiB0aGF0LmluZmxhdGVfZmx1c2goeiwgcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIExFTlM6XG5cblx0XHRcdFx0XHR3aGlsZSAoayA8ICgzMikpIHtcblx0XHRcdFx0XHRcdGlmIChuICE9PSAwKSB7XG5cdFx0XHRcdFx0XHRcdHIgPSBaX09LO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhhdC5iaXRiID0gYjtcblx0XHRcdFx0XHRcdFx0dGhhdC5iaXRrID0gaztcblx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcblx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGF0LmluZmxhdGVfZmx1c2goeiwgcik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRuLS07XG5cdFx0XHRcdFx0XHRiIHw9ICh6LnJlYWRfYnl0ZShwKyspICYgMHhmZikgPDwgaztcblx0XHRcdFx0XHRcdGsgKz0gODtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoKCgofmIpID4+PiAxNikgJiAweGZmZmYpICE9IChiICYgMHhmZmZmKSkge1xuXHRcdFx0XHRcdFx0bW9kZSA9IEJBREJMT0NLUztcblx0XHRcdFx0XHRcdHoubXNnID0gXCJpbnZhbGlkIHN0b3JlZCBibG9jayBsZW5ndGhzXCI7XG5cdFx0XHRcdFx0XHRyID0gWl9EQVRBX0VSUk9SO1xuXG5cdFx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xuXHRcdFx0XHRcdFx0dGhhdC5iaXRrID0gaztcblx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xuXHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xuXHRcdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcblx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bGVmdCA9IChiICYgMHhmZmZmKTtcblx0XHRcdFx0XHRiID0gayA9IDA7IC8vIGR1bXAgYml0c1xuXHRcdFx0XHRcdG1vZGUgPSBsZWZ0ICE9PSAwID8gU1RPUkVEIDogKGxhc3QgIT09IDAgPyBEUlkgOiBUWVBFKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBTVE9SRUQ6XG5cdFx0XHRcdFx0aWYgKG4gPT09IDApIHtcblx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XG5cdFx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xuXHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChtID09PSAwKSB7XG5cdFx0XHRcdFx0XHRpZiAocSA9PSB0aGF0LmVuZCAmJiB0aGF0LnJlYWQgIT09IDApIHtcblx0XHRcdFx0XHRcdFx0cSA9IDA7XG5cdFx0XHRcdFx0XHRcdG0gPSAvKiAoaW50KSAqLyhxIDwgdGhhdC5yZWFkID8gdGhhdC5yZWFkIC0gcSAtIDEgOiB0aGF0LmVuZCAtIHEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKG0gPT09IDApIHtcblx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdHIgPSB0aGF0LmluZmxhdGVfZmx1c2goeiwgcik7XG5cdFx0XHRcdFx0XHRcdHEgPSB0aGF0LndyaXRlO1xuXHRcdFx0XHRcdFx0XHRtID0gLyogKGludCkgKi8ocSA8IHRoYXQucmVhZCA/IHRoYXQucmVhZCAtIHEgLSAxIDogdGhhdC5lbmQgLSBxKTtcblx0XHRcdFx0XHRcdFx0aWYgKHEgPT0gdGhhdC5lbmQgJiYgdGhhdC5yZWFkICE9PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0cSA9IDA7XG5cdFx0XHRcdFx0XHRcdFx0bSA9IC8qIChpbnQpICovKHEgPCB0aGF0LnJlYWQgPyB0aGF0LnJlYWQgLSBxIC0gMSA6IHRoYXQuZW5kIC0gcSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKG0gPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xuXHRcdFx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xuXHRcdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyID0gWl9PSztcblxuXHRcdFx0XHRcdHQgPSBsZWZ0O1xuXHRcdFx0XHRcdGlmICh0ID4gbilcblx0XHRcdFx0XHRcdHQgPSBuO1xuXHRcdFx0XHRcdGlmICh0ID4gbSlcblx0XHRcdFx0XHRcdHQgPSBtO1xuXHRcdFx0XHRcdHRoYXQud2luZG93LnNldCh6LnJlYWRfYnVmKHAsIHQpLCBxKTtcblx0XHRcdFx0XHRwICs9IHQ7XG5cdFx0XHRcdFx0biAtPSB0O1xuXHRcdFx0XHRcdHEgKz0gdDtcblx0XHRcdFx0XHRtIC09IHQ7XG5cdFx0XHRcdFx0aWYgKChsZWZ0IC09IHQpICE9PSAwKVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0bW9kZSA9IGxhc3QgIT09IDAgPyBEUlkgOiBUWVBFO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFRBQkxFOlxuXG5cdFx0XHRcdFx0d2hpbGUgKGsgPCAoMTQpKSB7XG5cdFx0XHRcdFx0XHRpZiAobiAhPT0gMCkge1xuXHRcdFx0XHRcdFx0XHRyID0gWl9PSztcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XG5cdFx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xuXHRcdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRuLS07XG5cdFx0XHRcdFx0XHRiIHw9ICh6LnJlYWRfYnl0ZShwKyspICYgMHhmZikgPDwgaztcblx0XHRcdFx0XHRcdGsgKz0gODtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0YWJsZSA9IHQgPSAoYiAmIDB4M2ZmZik7XG5cdFx0XHRcdFx0aWYgKCh0ICYgMHgxZikgPiAyOSB8fCAoKHQgPj4gNSkgJiAweDFmKSA+IDI5KSB7XG5cdFx0XHRcdFx0XHRtb2RlID0gQkFEQkxPQ0tTO1xuXHRcdFx0XHRcdFx0ei5tc2cgPSBcInRvbyBtYW55IGxlbmd0aCBvciBkaXN0YW5jZSBzeW1ib2xzXCI7XG5cdFx0XHRcdFx0XHRyID0gWl9EQVRBX0VSUk9SO1xuXG5cdFx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xuXHRcdFx0XHRcdFx0dGhhdC5iaXRrID0gaztcblx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xuXHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xuXHRcdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcblx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dCA9IDI1OCArICh0ICYgMHgxZikgKyAoKHQgPj4gNSkgJiAweDFmKTtcblx0XHRcdFx0XHRpZiAoIWJsZW5zIHx8IGJsZW5zLmxlbmd0aCA8IHQpIHtcblx0XHRcdFx0XHRcdGJsZW5zID0gW107IC8vIG5ldyBBcnJheSh0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IHQ7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRibGVuc1tpXSA9IDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8ge1xuXHRcdFx0XHRcdGIgPj4+PSAoMTQpO1xuXHRcdFx0XHRcdGsgLT0gKDE0KTtcblx0XHRcdFx0XHQvLyB9XG5cblx0XHRcdFx0XHRpbmRleCA9IDA7XG5cdFx0XHRcdFx0bW9kZSA9IEJUUkVFO1xuXHRcdFx0XHRjYXNlIEJUUkVFOlxuXHRcdFx0XHRcdHdoaWxlIChpbmRleCA8IDQgKyAodGFibGUgPj4+IDEwKSkge1xuXHRcdFx0XHRcdFx0d2hpbGUgKGsgPCAoMykpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG4gIT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRyID0gWl9PSztcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xuXHRcdFx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xuXHRcdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRuLS07XG5cdFx0XHRcdFx0XHRcdGIgfD0gKHoucmVhZF9ieXRlKHArKykgJiAweGZmKSA8PCBrO1xuXHRcdFx0XHRcdFx0XHRrICs9IDg7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGJsZW5zW2JvcmRlcltpbmRleCsrXV0gPSBiICYgNztcblxuXHRcdFx0XHRcdFx0Ly8ge1xuXHRcdFx0XHRcdFx0YiA+Pj49ICgzKTtcblx0XHRcdFx0XHRcdGsgLT0gKDMpO1xuXHRcdFx0XHRcdFx0Ly8gfVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHdoaWxlIChpbmRleCA8IDE5KSB7XG5cdFx0XHRcdFx0XHRibGVuc1tib3JkZXJbaW5kZXgrK11dID0gMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRiYlswXSA9IDc7XG5cdFx0XHRcdFx0dCA9IGluZnRyZWUuaW5mbGF0ZV90cmVlc19iaXRzKGJsZW5zLCBiYiwgdGIsIGh1ZnRzLCB6KTtcblx0XHRcdFx0XHRpZiAodCAhPSBaX09LKSB7XG5cdFx0XHRcdFx0XHRyID0gdDtcblx0XHRcdFx0XHRcdGlmIChyID09IFpfREFUQV9FUlJPUikge1xuXHRcdFx0XHRcdFx0XHRibGVucyA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdG1vZGUgPSBCQURCTE9DS1M7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XG5cdFx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xuXHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZGV4ID0gMDtcblx0XHRcdFx0XHRtb2RlID0gRFRSRUU7XG5cdFx0XHRcdGNhc2UgRFRSRUU6XG5cdFx0XHRcdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdFx0XHRcdHQgPSB0YWJsZTtcblx0XHRcdFx0XHRcdGlmICghKGluZGV4IDwgMjU4ICsgKHQgJiAweDFmKSArICgodCA+PiA1KSAmIDB4MWYpKSkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGosIGM7XG5cblx0XHRcdFx0XHRcdHQgPSBiYlswXTtcblxuXHRcdFx0XHRcdFx0d2hpbGUgKGsgPCAodCkpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG4gIT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRyID0gWl9PSztcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xuXHRcdFx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xuXHRcdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRuLS07XG5cdFx0XHRcdFx0XHRcdGIgfD0gKHoucmVhZF9ieXRlKHArKykgJiAweGZmKSA8PCBrO1xuXHRcdFx0XHRcdFx0XHRrICs9IDg7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIGlmICh0YlswXSA9PSAtMSkge1xuXHRcdFx0XHRcdFx0Ly8gU3lzdGVtLmVyci5wcmludGxuKFwibnVsbC4uLlwiKTtcblx0XHRcdFx0XHRcdC8vIH1cblxuXHRcdFx0XHRcdFx0dCA9IGh1ZnRzWyh0YlswXSArIChiICYgaW5mbGF0ZV9tYXNrW3RdKSkgKiAzICsgMV07XG5cdFx0XHRcdFx0XHRjID0gaHVmdHNbKHRiWzBdICsgKGIgJiBpbmZsYXRlX21hc2tbdF0pKSAqIDMgKyAyXTtcblxuXHRcdFx0XHRcdFx0aWYgKGMgPCAxNikge1xuXHRcdFx0XHRcdFx0XHRiID4+Pj0gKHQpO1xuXHRcdFx0XHRcdFx0XHRrIC09ICh0KTtcblx0XHRcdFx0XHRcdFx0YmxlbnNbaW5kZXgrK10gPSBjO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHsgLy8gYyA9PSAxNi4uMThcblx0XHRcdFx0XHRcdFx0aSA9IGMgPT0gMTggPyA3IDogYyAtIDE0O1xuXHRcdFx0XHRcdFx0XHRqID0gYyA9PSAxOCA/IDExIDogMztcblxuXHRcdFx0XHRcdFx0XHR3aGlsZSAoayA8ICh0ICsgaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAobiAhPT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ciA9IFpfT0s7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xuXHRcdFx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRuLS07XG5cdFx0XHRcdFx0XHRcdFx0YiB8PSAoei5yZWFkX2J5dGUocCsrKSAmIDB4ZmYpIDw8IGs7XG5cdFx0XHRcdFx0XHRcdFx0ayArPSA4O1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0YiA+Pj49ICh0KTtcblx0XHRcdFx0XHRcdFx0ayAtPSAodCk7XG5cblx0XHRcdFx0XHRcdFx0aiArPSAoYiAmIGluZmxhdGVfbWFza1tpXSk7XG5cblx0XHRcdFx0XHRcdFx0YiA+Pj49IChpKTtcblx0XHRcdFx0XHRcdFx0ayAtPSAoaSk7XG5cblx0XHRcdFx0XHRcdFx0aSA9IGluZGV4O1xuXHRcdFx0XHRcdFx0XHR0ID0gdGFibGU7XG5cdFx0XHRcdFx0XHRcdGlmIChpICsgaiA+IDI1OCArICh0ICYgMHgxZikgKyAoKHQgPj4gNSkgJiAweDFmKSB8fCAoYyA9PSAxNiAmJiBpIDwgMSkpIHtcblx0XHRcdFx0XHRcdFx0XHRibGVucyA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdFx0bW9kZSA9IEJBREJMT0NLUztcblx0XHRcdFx0XHRcdFx0XHR6Lm1zZyA9IFwiaW52YWxpZCBiaXQgbGVuZ3RoIHJlcGVhdFwiO1xuXHRcdFx0XHRcdFx0XHRcdHIgPSBaX0RBVEFfRVJST1I7XG5cblx0XHRcdFx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xuXHRcdFx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xuXHRcdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGMgPSBjID09IDE2ID8gYmxlbnNbaSAtIDFdIDogMDtcblx0XHRcdFx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdFx0XHRcdGJsZW5zW2krK10gPSBjO1xuXHRcdFx0XHRcdFx0XHR9IHdoaWxlICgtLWogIT09IDApO1xuXHRcdFx0XHRcdFx0XHRpbmRleCA9IGk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGJbMF0gPSAtMTtcblx0XHRcdFx0XHQvLyB7XG5cdFx0XHRcdFx0dmFyIGJsXyA9IFtdOyAvLyBuZXcgQXJyYXkoMSk7XG5cdFx0XHRcdFx0dmFyIGJkXyA9IFtdOyAvLyBuZXcgQXJyYXkoMSk7XG5cdFx0XHRcdFx0dmFyIHRsXyA9IFtdOyAvLyBuZXcgQXJyYXkoMSk7XG5cdFx0XHRcdFx0dmFyIHRkXyA9IFtdOyAvLyBuZXcgQXJyYXkoMSk7XG5cdFx0XHRcdFx0YmxfWzBdID0gOTsgLy8gbXVzdCBiZSA8PSA5IGZvciBsb29rYWhlYWQgYXNzdW1wdGlvbnNcblx0XHRcdFx0XHRiZF9bMF0gPSA2OyAvLyBtdXN0IGJlIDw9IDkgZm9yIGxvb2thaGVhZCBhc3N1bXB0aW9uc1xuXG5cdFx0XHRcdFx0dCA9IHRhYmxlO1xuXHRcdFx0XHRcdHQgPSBpbmZ0cmVlLmluZmxhdGVfdHJlZXNfZHluYW1pYygyNTcgKyAodCAmIDB4MWYpLCAxICsgKCh0ID4+IDUpICYgMHgxZiksIGJsZW5zLCBibF8sIGJkXywgdGxfLCB0ZF8sIGh1ZnRzLCB6KTtcblxuXHRcdFx0XHRcdGlmICh0ICE9IFpfT0spIHtcblx0XHRcdFx0XHRcdGlmICh0ID09IFpfREFUQV9FUlJPUikge1xuXHRcdFx0XHRcdFx0XHRibGVucyA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdG1vZGUgPSBCQURCTE9DS1M7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyID0gdDtcblxuXHRcdFx0XHRcdFx0dGhhdC5iaXRiID0gYjtcblx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XG5cdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcblx0XHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0XHR0aGF0LndyaXRlID0gcTtcblx0XHRcdFx0XHRcdHJldHVybiB0aGF0LmluZmxhdGVfZmx1c2goeiwgcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvZGVzLmluaXQoYmxfWzBdLCBiZF9bMF0sIGh1ZnRzLCB0bF9bMF0sIGh1ZnRzLCB0ZF9bMF0pO1xuXHRcdFx0XHRcdC8vIH1cblx0XHRcdFx0XHRtb2RlID0gQ09ERVM7XG5cdFx0XHRcdGNhc2UgQ09ERVM6XG5cdFx0XHRcdFx0dGhhdC5iaXRiID0gYjtcblx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xuXHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xuXHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xuXG5cdFx0XHRcdFx0aWYgKChyID0gY29kZXMucHJvYyh0aGF0LCB6LCByKSkgIT0gWl9TVFJFQU1fRU5EKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyID0gWl9PSztcblx0XHRcdFx0XHRjb2Rlcy5mcmVlKHopO1xuXG5cdFx0XHRcdFx0cCA9IHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHRuID0gei5hdmFpbF9pbjtcblx0XHRcdFx0XHRiID0gdGhhdC5iaXRiO1xuXHRcdFx0XHRcdGsgPSB0aGF0LmJpdGs7XG5cdFx0XHRcdFx0cSA9IHRoYXQud3JpdGU7XG5cdFx0XHRcdFx0bSA9IC8qIChpbnQpICovKHEgPCB0aGF0LnJlYWQgPyB0aGF0LnJlYWQgLSBxIC0gMSA6IHRoYXQuZW5kIC0gcSk7XG5cblx0XHRcdFx0XHRpZiAobGFzdCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0bW9kZSA9IFRZUEU7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bW9kZSA9IERSWTtcblx0XHRcdFx0Y2FzZSBEUlk6XG5cdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0ciA9IHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblx0XHRcdFx0XHRxID0gdGhhdC53cml0ZTtcblx0XHRcdFx0XHRtID0gLyogKGludCkgKi8ocSA8IHRoYXQucmVhZCA/IHRoYXQucmVhZCAtIHEgLSAxIDogdGhhdC5lbmQgLSBxKTtcblx0XHRcdFx0XHRpZiAodGhhdC5yZWFkICE9IHRoYXQud3JpdGUpIHtcblx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XG5cdFx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xuXHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRtb2RlID0gRE9ORUxPQ0tTO1xuXHRcdFx0XHRjYXNlIERPTkVMT0NLUzpcblx0XHRcdFx0XHRyID0gWl9TVFJFQU1fRU5EO1xuXG5cdFx0XHRcdFx0dGhhdC5iaXRiID0gYjtcblx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xuXHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xuXHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcblx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xuXHRcdFx0XHRcdHJldHVybiB0aGF0LmluZmxhdGVfZmx1c2goeiwgcik7XG5cdFx0XHRcdGNhc2UgQkFEQkxPQ0tTOlxuXHRcdFx0XHRcdHIgPSBaX0RBVEFfRVJST1I7XG5cblx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xuXHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XG5cdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xuXHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XG5cdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XG5cdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHIgPSBaX1NUUkVBTV9FUlJPUjtcblxuXHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XG5cdFx0XHRcdFx0dGhhdC5iaXRrID0gaztcblx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcblx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcblx0XHRcdFx0XHR0aGF0LndyaXRlID0gcTtcblx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoYXQuZnJlZSA9IGZ1bmN0aW9uKHopIHtcblx0XHRcdHRoYXQucmVzZXQoeiwgbnVsbCk7XG5cdFx0XHR0aGF0LndpbmRvdyA9IG51bGw7XG5cdFx0XHRodWZ0cyA9IG51bGw7XG5cdFx0XHQvLyBaRlJFRSh6LCBzKTtcblx0XHR9O1xuXG5cdFx0dGhhdC5zZXRfZGljdGlvbmFyeSA9IGZ1bmN0aW9uKGQsIHN0YXJ0LCBuKSB7XG5cdFx0XHR0aGF0LndpbmRvdy5zZXQoZC5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBuKSwgMCk7XG5cdFx0XHR0aGF0LnJlYWQgPSB0aGF0LndyaXRlID0gbjtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJucyB0cnVlIGlmIGluZmxhdGUgaXMgY3VycmVudGx5IGF0IHRoZSBlbmQgb2YgYSBibG9jayBnZW5lcmF0ZWRcblx0XHQvLyBieSBaX1NZTkNfRkxVU0ggb3IgWl9GVUxMX0ZMVVNILlxuXHRcdHRoYXQuc3luY19wb2ludCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIG1vZGUgPT0gTEVOUyA/IDEgOiAwO1xuXHRcdH07XG5cblx0fVxuXG5cdC8vIEluZmxhdGVcblxuXHQvLyBwcmVzZXQgZGljdGlvbmFyeSBmbGFnIGluIHpsaWIgaGVhZGVyXG5cdHZhciBQUkVTRVRfRElDVCA9IDB4MjA7XG5cblx0dmFyIFpfREVGTEFURUQgPSA4O1xuXG5cdHZhciBNRVRIT0QgPSAwOyAvLyB3YWl0aW5nIGZvciBtZXRob2QgYnl0ZVxuXHR2YXIgRkxBRyA9IDE7IC8vIHdhaXRpbmcgZm9yIGZsYWcgYnl0ZVxuXHR2YXIgRElDVDQgPSAyOyAvLyBmb3VyIGRpY3Rpb25hcnkgY2hlY2sgYnl0ZXMgdG8gZ29cblx0dmFyIERJQ1QzID0gMzsgLy8gdGhyZWUgZGljdGlvbmFyeSBjaGVjayBieXRlcyB0byBnb1xuXHR2YXIgRElDVDIgPSA0OyAvLyB0d28gZGljdGlvbmFyeSBjaGVjayBieXRlcyB0byBnb1xuXHR2YXIgRElDVDEgPSA1OyAvLyBvbmUgZGljdGlvbmFyeSBjaGVjayBieXRlIHRvIGdvXG5cdHZhciBESUNUMCA9IDY7IC8vIHdhaXRpbmcgZm9yIGluZmxhdGVTZXREaWN0aW9uYXJ5XG5cdHZhciBCTE9DS1MgPSA3OyAvLyBkZWNvbXByZXNzaW5nIGJsb2Nrc1xuXHR2YXIgRE9ORSA9IDEyOyAvLyBmaW5pc2hlZCBjaGVjaywgZG9uZVxuXHR2YXIgQkFEID0gMTM7IC8vIGdvdCBhbiBlcnJvci0tc3RheSBoZXJlXG5cblx0dmFyIG1hcmsgPSBbIDAsIDAsIDB4ZmYsIDB4ZmYgXTtcblxuXHRmdW5jdGlvbiBJbmZsYXRlKCkge1xuXHRcdHZhciB0aGF0ID0gdGhpcztcblxuXHRcdHRoYXQubW9kZSA9IDA7IC8vIGN1cnJlbnQgaW5mbGF0ZSBtb2RlXG5cblx0XHQvLyBtb2RlIGRlcGVuZGVudCBpbmZvcm1hdGlvblxuXHRcdHRoYXQubWV0aG9kID0gMDsgLy8gaWYgRkxBR1MsIG1ldGhvZCBieXRlXG5cblx0XHQvLyBpZiBDSEVDSywgY2hlY2sgdmFsdWVzIHRvIGNvbXBhcmVcblx0XHR0aGF0LndhcyA9IFsgMCBdOyAvLyBuZXcgQXJyYXkoMSk7IC8vIGNvbXB1dGVkIGNoZWNrIHZhbHVlXG5cdFx0dGhhdC5uZWVkID0gMDsgLy8gc3RyZWFtIGNoZWNrIHZhbHVlXG5cblx0XHQvLyBpZiBCQUQsIGluZmxhdGVTeW5jJ3MgbWFya2VyIGJ5dGVzIGNvdW50XG5cdFx0dGhhdC5tYXJrZXIgPSAwO1xuXG5cdFx0Ly8gbW9kZSBpbmRlcGVuZGVudCBpbmZvcm1hdGlvblxuXHRcdHRoYXQud2JpdHMgPSAwOyAvLyBsb2cyKHdpbmRvdyBzaXplKSAoOC4uMTUsIGRlZmF1bHRzIHRvIDE1KVxuXG5cdFx0Ly8gdGhpcy5ibG9ja3M7IC8vIGN1cnJlbnQgaW5mbGF0ZV9ibG9ja3Mgc3RhdGVcblxuXHRcdGZ1bmN0aW9uIGluZmxhdGVSZXNldCh6KSB7XG5cdFx0XHRpZiAoIXogfHwgIXouaXN0YXRlKVxuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XG5cblx0XHRcdHoudG90YWxfaW4gPSB6LnRvdGFsX291dCA9IDA7XG5cdFx0XHR6Lm1zZyA9IG51bGw7XG5cdFx0XHR6LmlzdGF0ZS5tb2RlID0gQkxPQ0tTO1xuXHRcdFx0ei5pc3RhdGUuYmxvY2tzLnJlc2V0KHosIG51bGwpO1xuXHRcdFx0cmV0dXJuIFpfT0s7XG5cdFx0fVxuXG5cdFx0dGhhdC5pbmZsYXRlRW5kID0gZnVuY3Rpb24oeikge1xuXHRcdFx0aWYgKHRoYXQuYmxvY2tzKVxuXHRcdFx0XHR0aGF0LmJsb2Nrcy5mcmVlKHopO1xuXHRcdFx0dGhhdC5ibG9ja3MgPSBudWxsO1xuXHRcdFx0Ly8gWkZSRUUoeiwgei0+c3RhdGUpO1xuXHRcdFx0cmV0dXJuIFpfT0s7XG5cdFx0fTtcblxuXHRcdHRoYXQuaW5mbGF0ZUluaXQgPSBmdW5jdGlvbih6LCB3KSB7XG5cdFx0XHR6Lm1zZyA9IG51bGw7XG5cdFx0XHR0aGF0LmJsb2NrcyA9IG51bGw7XG5cblx0XHRcdC8vIHNldCB3aW5kb3cgc2l6ZVxuXHRcdFx0aWYgKHcgPCA4IHx8IHcgPiAxNSkge1xuXHRcdFx0XHR0aGF0LmluZmxhdGVFbmQoeik7XG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcblx0XHRcdH1cblx0XHRcdHRoYXQud2JpdHMgPSB3O1xuXG5cdFx0XHR6LmlzdGF0ZS5ibG9ja3MgPSBuZXcgSW5mQmxvY2tzKHosIDEgPDwgdyk7XG5cblx0XHRcdC8vIHJlc2V0IHN0YXRlXG5cdFx0XHRpbmZsYXRlUmVzZXQoeik7XG5cdFx0XHRyZXR1cm4gWl9PSztcblx0XHR9O1xuXG5cdFx0dGhhdC5pbmZsYXRlID0gZnVuY3Rpb24oeiwgZikge1xuXHRcdFx0dmFyIHI7XG5cdFx0XHR2YXIgYjtcblxuXHRcdFx0aWYgKCF6IHx8ICF6LmlzdGF0ZSB8fCAhei5uZXh0X2luKVxuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XG5cdFx0XHRmID0gZiA9PSBaX0ZJTklTSCA/IFpfQlVGX0VSUk9SIDogWl9PSztcblx0XHRcdHIgPSBaX0JVRl9FUlJPUjtcblx0XHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRcdC8vIFN5c3RlbS5vdXQucHJpbnRsbihcIm1vZGU6IFwiK3ouaXN0YXRlLm1vZGUpO1xuXHRcdFx0XHRzd2l0Y2ggKHouaXN0YXRlLm1vZGUpIHtcblx0XHRcdFx0Y2FzZSBNRVRIT0Q6XG5cblx0XHRcdFx0XHRpZiAoei5hdmFpbF9pbiA9PT0gMClcblx0XHRcdFx0XHRcdHJldHVybiByO1xuXHRcdFx0XHRcdHIgPSBmO1xuXG5cdFx0XHRcdFx0ei5hdmFpbF9pbi0tO1xuXHRcdFx0XHRcdHoudG90YWxfaW4rKztcblx0XHRcdFx0XHRpZiAoKCh6LmlzdGF0ZS5tZXRob2QgPSB6LnJlYWRfYnl0ZSh6Lm5leHRfaW5faW5kZXgrKykpICYgMHhmKSAhPSBaX0RFRkxBVEVEKSB7XG5cdFx0XHRcdFx0XHR6LmlzdGF0ZS5tb2RlID0gQkFEO1xuXHRcdFx0XHRcdFx0ei5tc2cgPSBcInVua25vd24gY29tcHJlc3Npb24gbWV0aG9kXCI7XG5cdFx0XHRcdFx0XHR6LmlzdGF0ZS5tYXJrZXIgPSA1OyAvLyBjYW4ndCB0cnkgaW5mbGF0ZVN5bmNcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoKHouaXN0YXRlLm1ldGhvZCA+PiA0KSArIDggPiB6LmlzdGF0ZS53Yml0cykge1xuXHRcdFx0XHRcdFx0ei5pc3RhdGUubW9kZSA9IEJBRDtcblx0XHRcdFx0XHRcdHoubXNnID0gXCJpbnZhbGlkIHdpbmRvdyBzaXplXCI7XG5cdFx0XHRcdFx0XHR6LmlzdGF0ZS5tYXJrZXIgPSA1OyAvLyBjYW4ndCB0cnkgaW5mbGF0ZVN5bmNcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR6LmlzdGF0ZS5tb2RlID0gRkxBRztcblx0XHRcdFx0Y2FzZSBGTEFHOlxuXG5cdFx0XHRcdFx0aWYgKHouYXZhaWxfaW4gPT09IDApXG5cdFx0XHRcdFx0XHRyZXR1cm4gcjtcblx0XHRcdFx0XHRyID0gZjtcblxuXHRcdFx0XHRcdHouYXZhaWxfaW4tLTtcblx0XHRcdFx0XHR6LnRvdGFsX2luKys7XG5cdFx0XHRcdFx0YiA9ICh6LnJlYWRfYnl0ZSh6Lm5leHRfaW5faW5kZXgrKykpICYgMHhmZjtcblxuXHRcdFx0XHRcdGlmICgoKCh6LmlzdGF0ZS5tZXRob2QgPDwgOCkgKyBiKSAlIDMxKSAhPT0gMCkge1xuXHRcdFx0XHRcdFx0ei5pc3RhdGUubW9kZSA9IEJBRDtcblx0XHRcdFx0XHRcdHoubXNnID0gXCJpbmNvcnJlY3QgaGVhZGVyIGNoZWNrXCI7XG5cdFx0XHRcdFx0XHR6LmlzdGF0ZS5tYXJrZXIgPSA1OyAvLyBjYW4ndCB0cnkgaW5mbGF0ZVN5bmNcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICgoYiAmIFBSRVNFVF9ESUNUKSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0ei5pc3RhdGUubW9kZSA9IEJMT0NLUztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR6LmlzdGF0ZS5tb2RlID0gRElDVDQ7XG5cdFx0XHRcdGNhc2UgRElDVDQ6XG5cblx0XHRcdFx0XHRpZiAoei5hdmFpbF9pbiA9PT0gMClcblx0XHRcdFx0XHRcdHJldHVybiByO1xuXHRcdFx0XHRcdHIgPSBmO1xuXG5cdFx0XHRcdFx0ei5hdmFpbF9pbi0tO1xuXHRcdFx0XHRcdHoudG90YWxfaW4rKztcblx0XHRcdFx0XHR6LmlzdGF0ZS5uZWVkID0gKCh6LnJlYWRfYnl0ZSh6Lm5leHRfaW5faW5kZXgrKykgJiAweGZmKSA8PCAyNCkgJiAweGZmMDAwMDAwO1xuXHRcdFx0XHRcdHouaXN0YXRlLm1vZGUgPSBESUNUMztcblx0XHRcdFx0Y2FzZSBESUNUMzpcblxuXHRcdFx0XHRcdGlmICh6LmF2YWlsX2luID09PSAwKVxuXHRcdFx0XHRcdFx0cmV0dXJuIHI7XG5cdFx0XHRcdFx0ciA9IGY7XG5cblx0XHRcdFx0XHR6LmF2YWlsX2luLS07XG5cdFx0XHRcdFx0ei50b3RhbF9pbisrO1xuXHRcdFx0XHRcdHouaXN0YXRlLm5lZWQgKz0gKCh6LnJlYWRfYnl0ZSh6Lm5leHRfaW5faW5kZXgrKykgJiAweGZmKSA8PCAxNikgJiAweGZmMDAwMDtcblx0XHRcdFx0XHR6LmlzdGF0ZS5tb2RlID0gRElDVDI7XG5cdFx0XHRcdGNhc2UgRElDVDI6XG5cblx0XHRcdFx0XHRpZiAoei5hdmFpbF9pbiA9PT0gMClcblx0XHRcdFx0XHRcdHJldHVybiByO1xuXHRcdFx0XHRcdHIgPSBmO1xuXG5cdFx0XHRcdFx0ei5hdmFpbF9pbi0tO1xuXHRcdFx0XHRcdHoudG90YWxfaW4rKztcblx0XHRcdFx0XHR6LmlzdGF0ZS5uZWVkICs9ICgoei5yZWFkX2J5dGUoei5uZXh0X2luX2luZGV4KyspICYgMHhmZikgPDwgOCkgJiAweGZmMDA7XG5cdFx0XHRcdFx0ei5pc3RhdGUubW9kZSA9IERJQ1QxO1xuXHRcdFx0XHRjYXNlIERJQ1QxOlxuXG5cdFx0XHRcdFx0aWYgKHouYXZhaWxfaW4gPT09IDApXG5cdFx0XHRcdFx0XHRyZXR1cm4gcjtcblx0XHRcdFx0XHRyID0gZjtcblxuXHRcdFx0XHRcdHouYXZhaWxfaW4tLTtcblx0XHRcdFx0XHR6LnRvdGFsX2luKys7XG5cdFx0XHRcdFx0ei5pc3RhdGUubmVlZCArPSAoei5yZWFkX2J5dGUoei5uZXh0X2luX2luZGV4KyspICYgMHhmZik7XG5cdFx0XHRcdFx0ei5pc3RhdGUubW9kZSA9IERJQ1QwO1xuXHRcdFx0XHRcdHJldHVybiBaX05FRURfRElDVDtcblx0XHRcdFx0Y2FzZSBESUNUMDpcblx0XHRcdFx0XHR6LmlzdGF0ZS5tb2RlID0gQkFEO1xuXHRcdFx0XHRcdHoubXNnID0gXCJuZWVkIGRpY3Rpb25hcnlcIjtcblx0XHRcdFx0XHR6LmlzdGF0ZS5tYXJrZXIgPSAwOyAvLyBjYW4gdHJ5IGluZmxhdGVTeW5jXG5cdFx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuXHRcdFx0XHRjYXNlIEJMT0NLUzpcblxuXHRcdFx0XHRcdHIgPSB6LmlzdGF0ZS5ibG9ja3MucHJvYyh6LCByKTtcblx0XHRcdFx0XHRpZiAociA9PSBaX0RBVEFfRVJST1IpIHtcblx0XHRcdFx0XHRcdHouaXN0YXRlLm1vZGUgPSBCQUQ7XG5cdFx0XHRcdFx0XHR6LmlzdGF0ZS5tYXJrZXIgPSAwOyAvLyBjYW4gdHJ5IGluZmxhdGVTeW5jXG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHIgPT0gWl9PSykge1xuXHRcdFx0XHRcdFx0ciA9IGY7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChyICE9IFpfU1RSRUFNX0VORCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHIgPSBmO1xuXHRcdFx0XHRcdHouaXN0YXRlLmJsb2Nrcy5yZXNldCh6LCB6LmlzdGF0ZS53YXMpO1xuXHRcdFx0XHRcdHouaXN0YXRlLm1vZGUgPSBET05FO1xuXHRcdFx0XHRjYXNlIERPTkU6XG5cdFx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VORDtcblx0XHRcdFx0Y2FzZSBCQUQ6XG5cdFx0XHRcdFx0cmV0dXJuIFpfREFUQV9FUlJPUjtcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhhdC5pbmZsYXRlU2V0RGljdGlvbmFyeSA9IGZ1bmN0aW9uKHosIGRpY3Rpb25hcnksIGRpY3RMZW5ndGgpIHtcblx0XHRcdHZhciBpbmRleCA9IDA7XG5cdFx0XHR2YXIgbGVuZ3RoID0gZGljdExlbmd0aDtcblx0XHRcdGlmICgheiB8fCAhei5pc3RhdGUgfHwgei5pc3RhdGUubW9kZSAhPSBESUNUMClcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuXG5cdFx0XHRpZiAobGVuZ3RoID49ICgxIDw8IHouaXN0YXRlLndiaXRzKSkge1xuXHRcdFx0XHRsZW5ndGggPSAoMSA8PCB6LmlzdGF0ZS53Yml0cykgLSAxO1xuXHRcdFx0XHRpbmRleCA9IGRpY3RMZW5ndGggLSBsZW5ndGg7XG5cdFx0XHR9XG5cdFx0XHR6LmlzdGF0ZS5ibG9ja3Muc2V0X2RpY3Rpb25hcnkoZGljdGlvbmFyeSwgaW5kZXgsIGxlbmd0aCk7XG5cdFx0XHR6LmlzdGF0ZS5tb2RlID0gQkxPQ0tTO1xuXHRcdFx0cmV0dXJuIFpfT0s7XG5cdFx0fTtcblxuXHRcdHRoYXQuaW5mbGF0ZVN5bmMgPSBmdW5jdGlvbih6KSB7XG5cdFx0XHR2YXIgbjsgLy8gbnVtYmVyIG9mIGJ5dGVzIHRvIGxvb2sgYXRcblx0XHRcdHZhciBwOyAvLyBwb2ludGVyIHRvIGJ5dGVzXG5cdFx0XHR2YXIgbTsgLy8gbnVtYmVyIG9mIG1hcmtlciBieXRlcyBmb3VuZCBpbiBhIHJvd1xuXHRcdFx0dmFyIHIsIHc7IC8vIHRlbXBvcmFyaWVzIHRvIHNhdmUgdG90YWxfaW4gYW5kIHRvdGFsX291dFxuXG5cdFx0XHQvLyBzZXQgdXBcblx0XHRcdGlmICgheiB8fCAhei5pc3RhdGUpXG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcblx0XHRcdGlmICh6LmlzdGF0ZS5tb2RlICE9IEJBRCkge1xuXHRcdFx0XHR6LmlzdGF0ZS5tb2RlID0gQkFEO1xuXHRcdFx0XHR6LmlzdGF0ZS5tYXJrZXIgPSAwO1xuXHRcdFx0fVxuXHRcdFx0aWYgKChuID0gei5hdmFpbF9pbikgPT09IDApXG5cdFx0XHRcdHJldHVybiBaX0JVRl9FUlJPUjtcblx0XHRcdHAgPSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRtID0gei5pc3RhdGUubWFya2VyO1xuXG5cdFx0XHQvLyBzZWFyY2hcblx0XHRcdHdoaWxlIChuICE9PSAwICYmIG0gPCA0KSB7XG5cdFx0XHRcdGlmICh6LnJlYWRfYnl0ZShwKSA9PSBtYXJrW21dKSB7XG5cdFx0XHRcdFx0bSsrO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHoucmVhZF9ieXRlKHApICE9PSAwKSB7XG5cdFx0XHRcdFx0bSA9IDA7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bSA9IDQgLSBtO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHArKztcblx0XHRcdFx0bi0tO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByZXN0b3JlXG5cdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xuXHRcdFx0ei5hdmFpbF9pbiA9IG47XG5cdFx0XHR6LmlzdGF0ZS5tYXJrZXIgPSBtO1xuXG5cdFx0XHQvLyByZXR1cm4gbm8gam95IG9yIHNldCB1cCB0byByZXN0YXJ0IG9uIGEgbmV3IGJsb2NrXG5cdFx0XHRpZiAobSAhPSA0KSB7XG5cdFx0XHRcdHJldHVybiBaX0RBVEFfRVJST1I7XG5cdFx0XHR9XG5cdFx0XHRyID0gei50b3RhbF9pbjtcblx0XHRcdHcgPSB6LnRvdGFsX291dDtcblx0XHRcdGluZmxhdGVSZXNldCh6KTtcblx0XHRcdHoudG90YWxfaW4gPSByO1xuXHRcdFx0ei50b3RhbF9vdXQgPSB3O1xuXHRcdFx0ei5pc3RhdGUubW9kZSA9IEJMT0NLUztcblx0XHRcdHJldHVybiBaX09LO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm5zIHRydWUgaWYgaW5mbGF0ZSBpcyBjdXJyZW50bHkgYXQgdGhlIGVuZCBvZiBhIGJsb2NrIGdlbmVyYXRlZFxuXHRcdC8vIGJ5IFpfU1lOQ19GTFVTSCBvciBaX0ZVTExfRkxVU0guIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCBieSBvbmUgUFBQXG5cdFx0Ly8gaW1wbGVtZW50YXRpb24gdG8gcHJvdmlkZSBhbiBhZGRpdGlvbmFsIHNhZmV0eSBjaGVjay4gUFBQIHVzZXNcblx0XHQvLyBaX1NZTkNfRkxVU0hcblx0XHQvLyBidXQgcmVtb3ZlcyB0aGUgbGVuZ3RoIGJ5dGVzIG9mIHRoZSByZXN1bHRpbmcgZW1wdHkgc3RvcmVkIGJsb2NrLiBXaGVuXG5cdFx0Ly8gZGVjb21wcmVzc2luZywgUFBQIGNoZWNrcyB0aGF0IGF0IHRoZSBlbmQgb2YgaW5wdXQgcGFja2V0LCBpbmZsYXRlIGlzXG5cdFx0Ly8gd2FpdGluZyBmb3IgdGhlc2UgbGVuZ3RoIGJ5dGVzLlxuXHRcdHRoYXQuaW5mbGF0ZVN5bmNQb2ludCA9IGZ1bmN0aW9uKHopIHtcblx0XHRcdGlmICgheiB8fCAhei5pc3RhdGUgfHwgIXouaXN0YXRlLmJsb2Nrcylcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuXHRcdFx0cmV0dXJuIHouaXN0YXRlLmJsb2Nrcy5zeW5jX3BvaW50KCk7XG5cdFx0fTtcblx0fVxuXG5cdC8vIFpTdHJlYW1cblxuXHRmdW5jdGlvbiBaU3RyZWFtKCkge1xuXHR9XG5cblx0WlN0cmVhbS5wcm90b3R5cGUgPSB7XG5cdFx0aW5mbGF0ZUluaXQgOiBmdW5jdGlvbihiaXRzKSB7XG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0XHR0aGF0LmlzdGF0ZSA9IG5ldyBJbmZsYXRlKCk7XG5cdFx0XHRpZiAoIWJpdHMpXG5cdFx0XHRcdGJpdHMgPSBNQVhfQklUUztcblx0XHRcdHJldHVybiB0aGF0LmlzdGF0ZS5pbmZsYXRlSW5pdCh0aGF0LCBiaXRzKTtcblx0XHR9LFxuXG5cdFx0aW5mbGF0ZSA6IGZ1bmN0aW9uKGYpIHtcblx0XHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHRcdGlmICghdGhhdC5pc3RhdGUpXG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcblx0XHRcdHJldHVybiB0aGF0LmlzdGF0ZS5pbmZsYXRlKHRoYXQsIGYpO1xuXHRcdH0sXG5cblx0XHRpbmZsYXRlRW5kIDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0XHRpZiAoIXRoYXQuaXN0YXRlKVxuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XG5cdFx0XHR2YXIgcmV0ID0gdGhhdC5pc3RhdGUuaW5mbGF0ZUVuZCh0aGF0KTtcblx0XHRcdHRoYXQuaXN0YXRlID0gbnVsbDtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fSxcblxuXHRcdGluZmxhdGVTeW5jIDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0XHRpZiAoIXRoYXQuaXN0YXRlKVxuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XG5cdFx0XHRyZXR1cm4gdGhhdC5pc3RhdGUuaW5mbGF0ZVN5bmModGhhdCk7XG5cdFx0fSxcblx0XHRpbmZsYXRlU2V0RGljdGlvbmFyeSA6IGZ1bmN0aW9uKGRpY3Rpb25hcnksIGRpY3RMZW5ndGgpIHtcblx0XHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHRcdGlmICghdGhhdC5pc3RhdGUpXG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcblx0XHRcdHJldHVybiB0aGF0LmlzdGF0ZS5pbmZsYXRlU2V0RGljdGlvbmFyeSh0aGF0LCBkaWN0aW9uYXJ5LCBkaWN0TGVuZ3RoKTtcblx0XHR9LFxuXHRcdHJlYWRfYnl0ZSA6IGZ1bmN0aW9uKHN0YXJ0KSB7XG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gdGhhdC5uZXh0X2luLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIDEpWzBdO1xuXHRcdH0sXG5cdFx0cmVhZF9idWYgOiBmdW5jdGlvbihzdGFydCwgc2l6ZSkge1xuXHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdFx0cmV0dXJuIHRoYXQubmV4dF9pbi5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBzaXplKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gSW5mbGF0ZXJcblxuXHRmdW5jdGlvbiBJbmZsYXRlcigpIHtcblx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0dmFyIHogPSBuZXcgWlN0cmVhbSgpO1xuXHRcdHZhciBidWZzaXplID0gNTEyO1xuXHRcdHZhciBmbHVzaCA9IFpfTk9fRkxVU0g7XG5cdFx0dmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGJ1ZnNpemUpO1xuXHRcdHZhciBub21vcmVpbnB1dCA9IGZhbHNlO1xuXG5cdFx0ei5pbmZsYXRlSW5pdCgpO1xuXHRcdHoubmV4dF9vdXQgPSBidWY7XG5cblx0XHR0aGF0LmFwcGVuZCA9IGZ1bmN0aW9uKGRhdGEsIG9ucHJvZ3Jlc3MpIHtcblx0XHRcdHZhciBlcnIsIGJ1ZmZlcnMgPSBbXSwgbGFzdEluZGV4ID0gMCwgYnVmZmVySW5kZXggPSAwLCBidWZmZXJTaXplID0gMCwgYXJyYXk7XG5cdFx0XHRpZiAoZGF0YS5sZW5ndGggPT09IDApXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdHoubmV4dF9pbl9pbmRleCA9IDA7XG5cdFx0XHR6Lm5leHRfaW4gPSBkYXRhO1xuXHRcdFx0ei5hdmFpbF9pbiA9IGRhdGEubGVuZ3RoO1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHR6Lm5leHRfb3V0X2luZGV4ID0gMDtcblx0XHRcdFx0ei5hdmFpbF9vdXQgPSBidWZzaXplO1xuXHRcdFx0XHRpZiAoKHouYXZhaWxfaW4gPT09IDApICYmICghbm9tb3JlaW5wdXQpKSB7IC8vIGlmIGJ1ZmZlciBpcyBlbXB0eSBhbmQgbW9yZSBpbnB1dCBpcyBhdmFpbGFibGUsIHJlZmlsbCBpdFxuXHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IDA7XG5cdFx0XHRcdFx0bm9tb3JlaW5wdXQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVyciA9IHouaW5mbGF0ZShmbHVzaCk7XG5cdFx0XHRcdGlmIChub21vcmVpbnB1dCAmJiAoZXJyID09IFpfQlVGX0VSUk9SKSlcblx0XHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHRcdGlmIChlcnIgIT0gWl9PSyAmJiBlcnIgIT0gWl9TVFJFQU1fRU5EKVxuXHRcdFx0XHRcdHRocm93IFwiaW5mbGF0aW5nOiBcIiArIHoubXNnO1xuXHRcdFx0XHRpZiAoKG5vbW9yZWlucHV0IHx8IGVyciA9PSBaX1NUUkVBTV9FTkQpICYmICh6LmF2YWlsX2luID09IGRhdGEubGVuZ3RoKSlcblx0XHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHRcdGlmICh6Lm5leHRfb3V0X2luZGV4KVxuXHRcdFx0XHRcdGlmICh6Lm5leHRfb3V0X2luZGV4ID09IGJ1ZnNpemUpXG5cdFx0XHRcdFx0XHRidWZmZXJzLnB1c2gobmV3IFVpbnQ4QXJyYXkoYnVmKSk7XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0YnVmZmVycy5wdXNoKG5ldyBVaW50OEFycmF5KGJ1Zi5zdWJhcnJheSgwLCB6Lm5leHRfb3V0X2luZGV4KSkpO1xuXHRcdFx0XHRidWZmZXJTaXplICs9IHoubmV4dF9vdXRfaW5kZXg7XG5cdFx0XHRcdGlmIChvbnByb2dyZXNzICYmIHoubmV4dF9pbl9pbmRleCA+IDAgJiYgei5uZXh0X2luX2luZGV4ICE9IGxhc3RJbmRleCkge1xuXHRcdFx0XHRcdG9ucHJvZ3Jlc3Moei5uZXh0X2luX2luZGV4KTtcblx0XHRcdFx0XHRsYXN0SW5kZXggPSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH0gd2hpbGUgKHouYXZhaWxfaW4gPiAwIHx8IHouYXZhaWxfb3V0ID09PSAwKTtcblx0XHRcdGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyU2l6ZSk7XG5cdFx0XHRidWZmZXJzLmZvckVhY2goZnVuY3Rpb24oY2h1bmspIHtcblx0XHRcdFx0YXJyYXkuc2V0KGNodW5rLCBidWZmZXJJbmRleCk7XG5cdFx0XHRcdGJ1ZmZlckluZGV4ICs9IGNodW5rLmxlbmd0aDtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGFycmF5O1xuXHRcdH07XG5cdFx0dGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0ei5pbmZsYXRlRW5kKCk7XG5cdFx0fTtcblx0fVxuXG5cdHZhciBpbmZsYXRlcjtcblxuXHRpZiAob2JqLnppcClcblx0XHRvYmouemlwLkluZmxhdGVyID0gSW5mbGF0ZXI7XG5cdGVsc2Uge1xuXHRcdGluZmxhdGVyID0gbmV3IEluZmxhdGVyKCk7XG5cdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHR2YXIgbWVzc2FnZSA9IGV2ZW50LmRhdGE7XG5cblx0XHRcdGlmIChtZXNzYWdlLmFwcGVuZClcblx0XHRcdFx0b2JqLnBvc3RNZXNzYWdlKHtcblx0XHRcdFx0XHRvbmFwcGVuZCA6IHRydWUsXG5cdFx0XHRcdFx0ZGF0YSA6IGluZmxhdGVyLmFwcGVuZChtZXNzYWdlLmRhdGEsIGZ1bmN0aW9uKGN1cnJlbnQpIHtcblx0XHRcdFx0XHRcdG9iai5wb3N0TWVzc2FnZSh7XG5cdFx0XHRcdFx0XHRcdHByb2dyZXNzIDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0Y3VycmVudCA6IGN1cnJlbnRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0pO1xuXHRcdFx0aWYgKG1lc3NhZ2UuZmx1c2gpIHtcblx0XHRcdFx0aW5mbGF0ZXIuZmx1c2goKTtcblx0XHRcdFx0b2JqLnBvc3RNZXNzYWdlKHtcblx0XHRcdFx0XHRvbmZsdXNoIDogdHJ1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LCBmYWxzZSk7XG5cdH1cblxufSkoc2VsZik7XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9