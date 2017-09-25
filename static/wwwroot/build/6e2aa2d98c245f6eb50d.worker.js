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
/******/ 	__webpack_require__.p = "/static/wwwroot/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNmUyYWEyZDk4YzI0NWY2ZWI1MGQud29ya2VyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDZlMmFhMmQ5OGMyNDVmNmViNTBkIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL1RoaXJkUGFydHkvV29ya2Vycy9pbmZsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9zdGF0aWMvd3d3cm9vdC9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2ZTJhYTJkOThjMjQ1ZjZlYjUwZCIsIi8qXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMgR2lsZGFzIExvcm1lYXUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG4gUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XHJcbiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcclxuXHJcbiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXHJcbiB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxyXG5cclxuIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IFxyXG4gbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIFxyXG4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXHJcblxyXG4gMy4gVGhlIG5hbWVzIG9mIHRoZSBhdXRob3JzIG1heSBub3QgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHNcclxuIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxyXG5cclxuIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgYGBBUyBJUycnIEFORCBBTlkgRVhQUkVTU0VEIE9SIElNUExJRUQgV0FSUkFOVElFUyxcclxuIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkRcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBKQ1JBRlQsXHJcbiBJTkMuIE9SIEFOWSBDT05UUklCVVRPUlMgVE8gVEhJUyBTT0ZUV0FSRSBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULFxyXG4gSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVFxyXG4gTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsXHJcbiBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElOR1xyXG4gTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLFxyXG4gRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cclxuICovXHJcblxyXG4vKlxyXG4gKiBUaGlzIHByb2dyYW0gaXMgYmFzZWQgb24gSlpsaWIgMS4wLjIgeW1uaywgSkNyYWZ0LEluYy5cclxuICogSlpsaWIgaXMgYmFzZWQgb24gemxpYi0xLjEuMywgc28gYWxsIGNyZWRpdCBzaG91bGQgZ28gYXV0aG9yc1xyXG4gKiBKZWFuLWxvdXAgR2FpbGx5KGpsb3VwQGd6aXAub3JnKSBhbmQgTWFyayBBZGxlcihtYWRsZXJAYWx1bW5pLmNhbHRlY2guZWR1KVxyXG4gKiBhbmQgY29udHJpYnV0b3JzIG9mIHpsaWIuXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uKG9iaikge1xyXG5cclxuXHQvLyBHbG9iYWxcclxuXHR2YXIgTUFYX0JJVFMgPSAxNTtcclxuXHJcblx0dmFyIFpfT0sgPSAwO1xyXG5cdHZhciBaX1NUUkVBTV9FTkQgPSAxO1xyXG5cdHZhciBaX05FRURfRElDVCA9IDI7XHJcblx0dmFyIFpfU1RSRUFNX0VSUk9SID0gLTI7XHJcblx0dmFyIFpfREFUQV9FUlJPUiA9IC0zO1xyXG5cdHZhciBaX01FTV9FUlJPUiA9IC00O1xyXG5cdHZhciBaX0JVRl9FUlJPUiA9IC01O1xyXG5cclxuXHR2YXIgaW5mbGF0ZV9tYXNrID0gWyAweDAwMDAwMDAwLCAweDAwMDAwMDAxLCAweDAwMDAwMDAzLCAweDAwMDAwMDA3LCAweDAwMDAwMDBmLCAweDAwMDAwMDFmLCAweDAwMDAwMDNmLCAweDAwMDAwMDdmLCAweDAwMDAwMGZmLCAweDAwMDAwMWZmLCAweDAwMDAwM2ZmLFxyXG5cdFx0XHQweDAwMDAwN2ZmLCAweDAwMDAwZmZmLCAweDAwMDAxZmZmLCAweDAwMDAzZmZmLCAweDAwMDA3ZmZmLCAweDAwMDBmZmZmIF07XHJcblxyXG5cdHZhciBNQU5ZID0gMTQ0MDtcclxuXHJcblx0Ly8gSlpsaWIgdmVyc2lvbiA6IFwiMS4wLjJcIlxyXG5cdHZhciBaX05PX0ZMVVNIID0gMDtcclxuXHR2YXIgWl9GSU5JU0ggPSA0O1xyXG5cclxuXHQvLyBJbmZUcmVlXHJcblx0dmFyIGZpeGVkX2JsID0gOTtcclxuXHR2YXIgZml4ZWRfYmQgPSA1O1xyXG5cclxuXHR2YXIgZml4ZWRfdGwgPSBbIDk2LCA3LCAyNTYsIDAsIDgsIDgwLCAwLCA4LCAxNiwgODQsIDgsIDExNSwgODIsIDcsIDMxLCAwLCA4LCAxMTIsIDAsIDgsIDQ4LCAwLCA5LCAxOTIsIDgwLCA3LCAxMCwgMCwgOCwgOTYsIDAsIDgsIDMyLCAwLCA5LCAxNjAsIDAsIDgsIDAsXHJcblx0XHRcdDAsIDgsIDEyOCwgMCwgOCwgNjQsIDAsIDksIDIyNCwgODAsIDcsIDYsIDAsIDgsIDg4LCAwLCA4LCAyNCwgMCwgOSwgMTQ0LCA4MywgNywgNTksIDAsIDgsIDEyMCwgMCwgOCwgNTYsIDAsIDksIDIwOCwgODEsIDcsIDE3LCAwLCA4LCAxMDQsIDAsIDgsIDQwLFxyXG5cdFx0XHQwLCA5LCAxNzYsIDAsIDgsIDgsIDAsIDgsIDEzNiwgMCwgOCwgNzIsIDAsIDksIDI0MCwgODAsIDcsIDQsIDAsIDgsIDg0LCAwLCA4LCAyMCwgODUsIDgsIDIyNywgODMsIDcsIDQzLCAwLCA4LCAxMTYsIDAsIDgsIDUyLCAwLCA5LCAyMDAsIDgxLCA3LCAxMyxcclxuXHRcdFx0MCwgOCwgMTAwLCAwLCA4LCAzNiwgMCwgOSwgMTY4LCAwLCA4LCA0LCAwLCA4LCAxMzIsIDAsIDgsIDY4LCAwLCA5LCAyMzIsIDgwLCA3LCA4LCAwLCA4LCA5MiwgMCwgOCwgMjgsIDAsIDksIDE1MiwgODQsIDcsIDgzLCAwLCA4LCAxMjQsIDAsIDgsIDYwLFxyXG5cdFx0XHQwLCA5LCAyMTYsIDgyLCA3LCAyMywgMCwgOCwgMTA4LCAwLCA4LCA0NCwgMCwgOSwgMTg0LCAwLCA4LCAxMiwgMCwgOCwgMTQwLCAwLCA4LCA3NiwgMCwgOSwgMjQ4LCA4MCwgNywgMywgMCwgOCwgODIsIDAsIDgsIDE4LCA4NSwgOCwgMTYzLCA4MywgNyxcclxuXHRcdFx0MzUsIDAsIDgsIDExNCwgMCwgOCwgNTAsIDAsIDksIDE5NiwgODEsIDcsIDExLCAwLCA4LCA5OCwgMCwgOCwgMzQsIDAsIDksIDE2NCwgMCwgOCwgMiwgMCwgOCwgMTMwLCAwLCA4LCA2NiwgMCwgOSwgMjI4LCA4MCwgNywgNywgMCwgOCwgOTAsIDAsIDgsXHJcblx0XHRcdDI2LCAwLCA5LCAxNDgsIDg0LCA3LCA2NywgMCwgOCwgMTIyLCAwLCA4LCA1OCwgMCwgOSwgMjEyLCA4MiwgNywgMTksIDAsIDgsIDEwNiwgMCwgOCwgNDIsIDAsIDksIDE4MCwgMCwgOCwgMTAsIDAsIDgsIDEzOCwgMCwgOCwgNzQsIDAsIDksIDI0NCwgODAsXHJcblx0XHRcdDcsIDUsIDAsIDgsIDg2LCAwLCA4LCAyMiwgMTkyLCA4LCAwLCA4MywgNywgNTEsIDAsIDgsIDExOCwgMCwgOCwgNTQsIDAsIDksIDIwNCwgODEsIDcsIDE1LCAwLCA4LCAxMDIsIDAsIDgsIDM4LCAwLCA5LCAxNzIsIDAsIDgsIDYsIDAsIDgsIDEzNCwgMCxcclxuXHRcdFx0OCwgNzAsIDAsIDksIDIzNiwgODAsIDcsIDksIDAsIDgsIDk0LCAwLCA4LCAzMCwgMCwgOSwgMTU2LCA4NCwgNywgOTksIDAsIDgsIDEyNiwgMCwgOCwgNjIsIDAsIDksIDIyMCwgODIsIDcsIDI3LCAwLCA4LCAxMTAsIDAsIDgsIDQ2LCAwLCA5LCAxODgsIDAsXHJcblx0XHRcdDgsIDE0LCAwLCA4LCAxNDIsIDAsIDgsIDc4LCAwLCA5LCAyNTIsIDk2LCA3LCAyNTYsIDAsIDgsIDgxLCAwLCA4LCAxNywgODUsIDgsIDEzMSwgODIsIDcsIDMxLCAwLCA4LCAxMTMsIDAsIDgsIDQ5LCAwLCA5LCAxOTQsIDgwLCA3LCAxMCwgMCwgOCwgOTcsXHJcblx0XHRcdDAsIDgsIDMzLCAwLCA5LCAxNjIsIDAsIDgsIDEsIDAsIDgsIDEyOSwgMCwgOCwgNjUsIDAsIDksIDIyNiwgODAsIDcsIDYsIDAsIDgsIDg5LCAwLCA4LCAyNSwgMCwgOSwgMTQ2LCA4MywgNywgNTksIDAsIDgsIDEyMSwgMCwgOCwgNTcsIDAsIDksIDIxMCxcclxuXHRcdFx0ODEsIDcsIDE3LCAwLCA4LCAxMDUsIDAsIDgsIDQxLCAwLCA5LCAxNzgsIDAsIDgsIDksIDAsIDgsIDEzNywgMCwgOCwgNzMsIDAsIDksIDI0MiwgODAsIDcsIDQsIDAsIDgsIDg1LCAwLCA4LCAyMSwgODAsIDgsIDI1OCwgODMsIDcsIDQzLCAwLCA4LCAxMTcsXHJcblx0XHRcdDAsIDgsIDUzLCAwLCA5LCAyMDIsIDgxLCA3LCAxMywgMCwgOCwgMTAxLCAwLCA4LCAzNywgMCwgOSwgMTcwLCAwLCA4LCA1LCAwLCA4LCAxMzMsIDAsIDgsIDY5LCAwLCA5LCAyMzQsIDgwLCA3LCA4LCAwLCA4LCA5MywgMCwgOCwgMjksIDAsIDksIDE1NCxcclxuXHRcdFx0ODQsIDcsIDgzLCAwLCA4LCAxMjUsIDAsIDgsIDYxLCAwLCA5LCAyMTgsIDgyLCA3LCAyMywgMCwgOCwgMTA5LCAwLCA4LCA0NSwgMCwgOSwgMTg2LCAwLCA4LCAxMywgMCwgOCwgMTQxLCAwLCA4LCA3NywgMCwgOSwgMjUwLCA4MCwgNywgMywgMCwgOCwgODMsXHJcblx0XHRcdDAsIDgsIDE5LCA4NSwgOCwgMTk1LCA4MywgNywgMzUsIDAsIDgsIDExNSwgMCwgOCwgNTEsIDAsIDksIDE5OCwgODEsIDcsIDExLCAwLCA4LCA5OSwgMCwgOCwgMzUsIDAsIDksIDE2NiwgMCwgOCwgMywgMCwgOCwgMTMxLCAwLCA4LCA2NywgMCwgOSwgMjMwLFxyXG5cdFx0XHQ4MCwgNywgNywgMCwgOCwgOTEsIDAsIDgsIDI3LCAwLCA5LCAxNTAsIDg0LCA3LCA2NywgMCwgOCwgMTIzLCAwLCA4LCA1OSwgMCwgOSwgMjE0LCA4MiwgNywgMTksIDAsIDgsIDEwNywgMCwgOCwgNDMsIDAsIDksIDE4MiwgMCwgOCwgMTEsIDAsIDgsIDEzOSxcclxuXHRcdFx0MCwgOCwgNzUsIDAsIDksIDI0NiwgODAsIDcsIDUsIDAsIDgsIDg3LCAwLCA4LCAyMywgMTkyLCA4LCAwLCA4MywgNywgNTEsIDAsIDgsIDExOSwgMCwgOCwgNTUsIDAsIDksIDIwNiwgODEsIDcsIDE1LCAwLCA4LCAxMDMsIDAsIDgsIDM5LCAwLCA5LCAxNzQsXHJcblx0XHRcdDAsIDgsIDcsIDAsIDgsIDEzNSwgMCwgOCwgNzEsIDAsIDksIDIzOCwgODAsIDcsIDksIDAsIDgsIDk1LCAwLCA4LCAzMSwgMCwgOSwgMTU4LCA4NCwgNywgOTksIDAsIDgsIDEyNywgMCwgOCwgNjMsIDAsIDksIDIyMiwgODIsIDcsIDI3LCAwLCA4LCAxMTEsXHJcblx0XHRcdDAsIDgsIDQ3LCAwLCA5LCAxOTAsIDAsIDgsIDE1LCAwLCA4LCAxNDMsIDAsIDgsIDc5LCAwLCA5LCAyNTQsIDk2LCA3LCAyNTYsIDAsIDgsIDgwLCAwLCA4LCAxNiwgODQsIDgsIDExNSwgODIsIDcsIDMxLCAwLCA4LCAxMTIsIDAsIDgsIDQ4LCAwLCA5LFxyXG5cdFx0XHQxOTMsIDgwLCA3LCAxMCwgMCwgOCwgOTYsIDAsIDgsIDMyLCAwLCA5LCAxNjEsIDAsIDgsIDAsIDAsIDgsIDEyOCwgMCwgOCwgNjQsIDAsIDksIDIyNSwgODAsIDcsIDYsIDAsIDgsIDg4LCAwLCA4LCAyNCwgMCwgOSwgMTQ1LCA4MywgNywgNTksIDAsIDgsXHJcblx0XHRcdDEyMCwgMCwgOCwgNTYsIDAsIDksIDIwOSwgODEsIDcsIDE3LCAwLCA4LCAxMDQsIDAsIDgsIDQwLCAwLCA5LCAxNzcsIDAsIDgsIDgsIDAsIDgsIDEzNiwgMCwgOCwgNzIsIDAsIDksIDI0MSwgODAsIDcsIDQsIDAsIDgsIDg0LCAwLCA4LCAyMCwgODUsIDgsXHJcblx0XHRcdDIyNywgODMsIDcsIDQzLCAwLCA4LCAxMTYsIDAsIDgsIDUyLCAwLCA5LCAyMDEsIDgxLCA3LCAxMywgMCwgOCwgMTAwLCAwLCA4LCAzNiwgMCwgOSwgMTY5LCAwLCA4LCA0LCAwLCA4LCAxMzIsIDAsIDgsIDY4LCAwLCA5LCAyMzMsIDgwLCA3LCA4LCAwLCA4LFxyXG5cdFx0XHQ5MiwgMCwgOCwgMjgsIDAsIDksIDE1MywgODQsIDcsIDgzLCAwLCA4LCAxMjQsIDAsIDgsIDYwLCAwLCA5LCAyMTcsIDgyLCA3LCAyMywgMCwgOCwgMTA4LCAwLCA4LCA0NCwgMCwgOSwgMTg1LCAwLCA4LCAxMiwgMCwgOCwgMTQwLCAwLCA4LCA3NiwgMCwgOSxcclxuXHRcdFx0MjQ5LCA4MCwgNywgMywgMCwgOCwgODIsIDAsIDgsIDE4LCA4NSwgOCwgMTYzLCA4MywgNywgMzUsIDAsIDgsIDExNCwgMCwgOCwgNTAsIDAsIDksIDE5NywgODEsIDcsIDExLCAwLCA4LCA5OCwgMCwgOCwgMzQsIDAsIDksIDE2NSwgMCwgOCwgMiwgMCwgOCxcclxuXHRcdFx0MTMwLCAwLCA4LCA2NiwgMCwgOSwgMjI5LCA4MCwgNywgNywgMCwgOCwgOTAsIDAsIDgsIDI2LCAwLCA5LCAxNDksIDg0LCA3LCA2NywgMCwgOCwgMTIyLCAwLCA4LCA1OCwgMCwgOSwgMjEzLCA4MiwgNywgMTksIDAsIDgsIDEwNiwgMCwgOCwgNDIsIDAsIDksXHJcblx0XHRcdDE4MSwgMCwgOCwgMTAsIDAsIDgsIDEzOCwgMCwgOCwgNzQsIDAsIDksIDI0NSwgODAsIDcsIDUsIDAsIDgsIDg2LCAwLCA4LCAyMiwgMTkyLCA4LCAwLCA4MywgNywgNTEsIDAsIDgsIDExOCwgMCwgOCwgNTQsIDAsIDksIDIwNSwgODEsIDcsIDE1LCAwLCA4LFxyXG5cdFx0XHQxMDIsIDAsIDgsIDM4LCAwLCA5LCAxNzMsIDAsIDgsIDYsIDAsIDgsIDEzNCwgMCwgOCwgNzAsIDAsIDksIDIzNywgODAsIDcsIDksIDAsIDgsIDk0LCAwLCA4LCAzMCwgMCwgOSwgMTU3LCA4NCwgNywgOTksIDAsIDgsIDEyNiwgMCwgOCwgNjIsIDAsIDksXHJcblx0XHRcdDIyMSwgODIsIDcsIDI3LCAwLCA4LCAxMTAsIDAsIDgsIDQ2LCAwLCA5LCAxODksIDAsIDgsIDE0LCAwLCA4LCAxNDIsIDAsIDgsIDc4LCAwLCA5LCAyNTMsIDk2LCA3LCAyNTYsIDAsIDgsIDgxLCAwLCA4LCAxNywgODUsIDgsIDEzMSwgODIsIDcsIDMxLCAwLFxyXG5cdFx0XHQ4LCAxMTMsIDAsIDgsIDQ5LCAwLCA5LCAxOTUsIDgwLCA3LCAxMCwgMCwgOCwgOTcsIDAsIDgsIDMzLCAwLCA5LCAxNjMsIDAsIDgsIDEsIDAsIDgsIDEyOSwgMCwgOCwgNjUsIDAsIDksIDIyNywgODAsIDcsIDYsIDAsIDgsIDg5LCAwLCA4LCAyNSwgMCwgOSxcclxuXHRcdFx0MTQ3LCA4MywgNywgNTksIDAsIDgsIDEyMSwgMCwgOCwgNTcsIDAsIDksIDIxMSwgODEsIDcsIDE3LCAwLCA4LCAxMDUsIDAsIDgsIDQxLCAwLCA5LCAxNzksIDAsIDgsIDksIDAsIDgsIDEzNywgMCwgOCwgNzMsIDAsIDksIDI0MywgODAsIDcsIDQsIDAsIDgsXHJcblx0XHRcdDg1LCAwLCA4LCAyMSwgODAsIDgsIDI1OCwgODMsIDcsIDQzLCAwLCA4LCAxMTcsIDAsIDgsIDUzLCAwLCA5LCAyMDMsIDgxLCA3LCAxMywgMCwgOCwgMTAxLCAwLCA4LCAzNywgMCwgOSwgMTcxLCAwLCA4LCA1LCAwLCA4LCAxMzMsIDAsIDgsIDY5LCAwLCA5LFxyXG5cdFx0XHQyMzUsIDgwLCA3LCA4LCAwLCA4LCA5MywgMCwgOCwgMjksIDAsIDksIDE1NSwgODQsIDcsIDgzLCAwLCA4LCAxMjUsIDAsIDgsIDYxLCAwLCA5LCAyMTksIDgyLCA3LCAyMywgMCwgOCwgMTA5LCAwLCA4LCA0NSwgMCwgOSwgMTg3LCAwLCA4LCAxMywgMCwgOCxcclxuXHRcdFx0MTQxLCAwLCA4LCA3NywgMCwgOSwgMjUxLCA4MCwgNywgMywgMCwgOCwgODMsIDAsIDgsIDE5LCA4NSwgOCwgMTk1LCA4MywgNywgMzUsIDAsIDgsIDExNSwgMCwgOCwgNTEsIDAsIDksIDE5OSwgODEsIDcsIDExLCAwLCA4LCA5OSwgMCwgOCwgMzUsIDAsIDksXHJcblx0XHRcdDE2NywgMCwgOCwgMywgMCwgOCwgMTMxLCAwLCA4LCA2NywgMCwgOSwgMjMxLCA4MCwgNywgNywgMCwgOCwgOTEsIDAsIDgsIDI3LCAwLCA5LCAxNTEsIDg0LCA3LCA2NywgMCwgOCwgMTIzLCAwLCA4LCA1OSwgMCwgOSwgMjE1LCA4MiwgNywgMTksIDAsIDgsXHJcblx0XHRcdDEwNywgMCwgOCwgNDMsIDAsIDksIDE4MywgMCwgOCwgMTEsIDAsIDgsIDEzOSwgMCwgOCwgNzUsIDAsIDksIDI0NywgODAsIDcsIDUsIDAsIDgsIDg3LCAwLCA4LCAyMywgMTkyLCA4LCAwLCA4MywgNywgNTEsIDAsIDgsIDExOSwgMCwgOCwgNTUsIDAsIDksXHJcblx0XHRcdDIwNywgODEsIDcsIDE1LCAwLCA4LCAxMDMsIDAsIDgsIDM5LCAwLCA5LCAxNzUsIDAsIDgsIDcsIDAsIDgsIDEzNSwgMCwgOCwgNzEsIDAsIDksIDIzOSwgODAsIDcsIDksIDAsIDgsIDk1LCAwLCA4LCAzMSwgMCwgOSwgMTU5LCA4NCwgNywgOTksIDAsIDgsXHJcblx0XHRcdDEyNywgMCwgOCwgNjMsIDAsIDksIDIyMywgODIsIDcsIDI3LCAwLCA4LCAxMTEsIDAsIDgsIDQ3LCAwLCA5LCAxOTEsIDAsIDgsIDE1LCAwLCA4LCAxNDMsIDAsIDgsIDc5LCAwLCA5LCAyNTUgXTtcclxuXHR2YXIgZml4ZWRfdGQgPSBbIDgwLCA1LCAxLCA4NywgNSwgMjU3LCA4MywgNSwgMTcsIDkxLCA1LCA0MDk3LCA4MSwgNSwgNSwgODksIDUsIDEwMjUsIDg1LCA1LCA2NSwgOTMsIDUsIDE2Mzg1LCA4MCwgNSwgMywgODgsIDUsIDUxMywgODQsIDUsIDMzLCA5MiwgNSxcclxuXHRcdFx0ODE5MywgODIsIDUsIDksIDkwLCA1LCAyMDQ5LCA4NiwgNSwgMTI5LCAxOTIsIDUsIDI0NTc3LCA4MCwgNSwgMiwgODcsIDUsIDM4NSwgODMsIDUsIDI1LCA5MSwgNSwgNjE0NSwgODEsIDUsIDcsIDg5LCA1LCAxNTM3LCA4NSwgNSwgOTcsIDkzLCA1LFxyXG5cdFx0XHQyNDU3NywgODAsIDUsIDQsIDg4LCA1LCA3NjksIDg0LCA1LCA0OSwgOTIsIDUsIDEyMjg5LCA4MiwgNSwgMTMsIDkwLCA1LCAzMDczLCA4NiwgNSwgMTkzLCAxOTIsIDUsIDI0NTc3IF07XHJcblxyXG5cdC8vIFRhYmxlcyBmb3IgZGVmbGF0ZSBmcm9tIFBLWklQJ3MgYXBwbm90ZS50eHQuXHJcblx0dmFyIGNwbGVucyA9IFsgLy8gQ29weSBsZW5ndGhzIGZvciBsaXRlcmFsIGNvZGVzIDI1Ny4uMjg1XHJcblx0MywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMywgMTUsIDE3LCAxOSwgMjMsIDI3LCAzMSwgMzUsIDQzLCA1MSwgNTksIDY3LCA4MywgOTksIDExNSwgMTMxLCAxNjMsIDE5NSwgMjI3LCAyNTgsIDAsIDAgXTtcclxuXHJcblx0Ly8gc2VlIG5vdGUgIzEzIGFib3ZlIGFib3V0IDI1OFxyXG5cdHZhciBjcGxleHQgPSBbIC8vIEV4dHJhIGJpdHMgZm9yIGxpdGVyYWwgY29kZXMgMjU3Li4yODVcclxuXHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAxLCAxLCAyLCAyLCAyLCAyLCAzLCAzLCAzLCAzLCA0LCA0LCA0LCA0LCA1LCA1LCA1LCA1LCAwLCAxMTIsIDExMiAvLyAxMTI9PWludmFsaWRcclxuXHRdO1xyXG5cclxuXHR2YXIgY3BkaXN0ID0gWyAvLyBDb3B5IG9mZnNldHMgZm9yIGRpc3RhbmNlIGNvZGVzIDAuLjI5XHJcblx0MSwgMiwgMywgNCwgNSwgNywgOSwgMTMsIDE3LCAyNSwgMzMsIDQ5LCA2NSwgOTcsIDEyOSwgMTkzLCAyNTcsIDM4NSwgNTEzLCA3NjksIDEwMjUsIDE1MzcsIDIwNDksIDMwNzMsIDQwOTcsIDYxNDUsIDgxOTMsIDEyMjg5LCAxNjM4NSwgMjQ1NzcgXTtcclxuXHJcblx0dmFyIGNwZGV4dCA9IFsgLy8gRXh0cmEgYml0cyBmb3IgZGlzdGFuY2UgY29kZXNcclxuXHQwLCAwLCAwLCAwLCAxLCAxLCAyLCAyLCAzLCAzLCA0LCA0LCA1LCA1LCA2LCA2LCA3LCA3LCA4LCA4LCA5LCA5LCAxMCwgMTAsIDExLCAxMSwgMTIsIDEyLCAxMywgMTMgXTtcclxuXHJcblx0Ly8gSWYgQk1BWCBuZWVkcyB0byBiZSBsYXJnZXIgdGhhbiAxNiwgdGhlbiBoIGFuZCB4W10gc2hvdWxkIGJlIHVMb25nLlxyXG5cdHZhciBCTUFYID0gMTU7IC8vIG1heGltdW0gYml0IGxlbmd0aCBvZiBhbnkgY29kZVxyXG5cclxuXHRmdW5jdGlvbiBJbmZUcmVlKCkge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdHZhciBobjsgLy8gaHVmdHMgdXNlZCBpbiBzcGFjZVxyXG5cdFx0dmFyIHY7IC8vIHdvcmsgYXJlYSBmb3IgaHVmdF9idWlsZFxyXG5cdFx0dmFyIGM7IC8vIGJpdCBsZW5ndGggY291bnQgdGFibGVcclxuXHRcdHZhciByOyAvLyB0YWJsZSBlbnRyeSBmb3Igc3RydWN0dXJlIGFzc2lnbm1lbnRcclxuXHRcdHZhciB1OyAvLyB0YWJsZSBzdGFja1xyXG5cdFx0dmFyIHg7IC8vIGJpdCBvZmZzZXRzLCB0aGVuIGNvZGUgc3RhY2tcclxuXHJcblx0XHRmdW5jdGlvbiBodWZ0X2J1aWxkKGIsIC8vIGNvZGUgbGVuZ3RocyBpbiBiaXRzIChhbGwgYXNzdW1lZCA8PVxyXG5cdFx0Ly8gQk1BWClcclxuXHRcdGJpbmRleCwgbiwgLy8gbnVtYmVyIG9mIGNvZGVzIChhc3N1bWVkIDw9IDI4OClcclxuXHRcdHMsIC8vIG51bWJlciBvZiBzaW1wbGUtdmFsdWVkIGNvZGVzICgwLi5zLTEpXHJcblx0XHRkLCAvLyBsaXN0IG9mIGJhc2UgdmFsdWVzIGZvciBub24tc2ltcGxlIGNvZGVzXHJcblx0XHRlLCAvLyBsaXN0IG9mIGV4dHJhIGJpdHMgZm9yIG5vbi1zaW1wbGUgY29kZXNcclxuXHRcdHQsIC8vIHJlc3VsdDogc3RhcnRpbmcgdGFibGVcclxuXHRcdG0sIC8vIG1heGltdW0gbG9va3VwIGJpdHMsIHJldHVybnMgYWN0dWFsXHJcblx0XHRocCwvLyBzcGFjZSBmb3IgdHJlZXNcclxuXHRcdGhuLC8vIGh1ZnRzIHVzZWQgaW4gc3BhY2VcclxuXHRcdHYgLy8gd29ya2luZyBhcmVhOiB2YWx1ZXMgaW4gb3JkZXIgb2YgYml0IGxlbmd0aFxyXG5cdFx0KSB7XHJcblx0XHRcdC8vIEdpdmVuIGEgbGlzdCBvZiBjb2RlIGxlbmd0aHMgYW5kIGEgbWF4aW11bSB0YWJsZSBzaXplLCBtYWtlIGEgc2V0IG9mXHJcblx0XHRcdC8vIHRhYmxlcyB0byBkZWNvZGUgdGhhdCBzZXQgb2YgY29kZXMuIFJldHVybiBaX09LIG9uIHN1Y2Nlc3MsXHJcblx0XHRcdC8vIFpfQlVGX0VSUk9SXHJcblx0XHRcdC8vIGlmIHRoZSBnaXZlbiBjb2RlIHNldCBpcyBpbmNvbXBsZXRlICh0aGUgdGFibGVzIGFyZSBzdGlsbCBidWlsdCBpblxyXG5cdFx0XHQvLyB0aGlzXHJcblx0XHRcdC8vIGNhc2UpLCBaX0RBVEFfRVJST1IgaWYgdGhlIGlucHV0IGlzIGludmFsaWQgKGFuIG92ZXItc3Vic2NyaWJlZCBzZXRcclxuXHRcdFx0Ly8gb2ZcclxuXHRcdFx0Ly8gbGVuZ3RocyksIG9yIFpfTUVNX0VSUk9SIGlmIG5vdCBlbm91Z2ggbWVtb3J5LlxyXG5cclxuXHRcdFx0dmFyIGE7IC8vIGNvdW50ZXIgZm9yIGNvZGVzIG9mIGxlbmd0aCBrXHJcblx0XHRcdHZhciBmOyAvLyBpIHJlcGVhdHMgaW4gdGFibGUgZXZlcnkgZiBlbnRyaWVzXHJcblx0XHRcdHZhciBnOyAvLyBtYXhpbXVtIGNvZGUgbGVuZ3RoXHJcblx0XHRcdHZhciBoOyAvLyB0YWJsZSBsZXZlbFxyXG5cdFx0XHR2YXIgaTsgLy8gY291bnRlciwgY3VycmVudCBjb2RlXHJcblx0XHRcdHZhciBqOyAvLyBjb3VudGVyXHJcblx0XHRcdHZhciBrOyAvLyBudW1iZXIgb2YgYml0cyBpbiBjdXJyZW50IGNvZGVcclxuXHRcdFx0dmFyIGw7IC8vIGJpdHMgcGVyIHRhYmxlIChyZXR1cm5lZCBpbiBtKVxyXG5cdFx0XHR2YXIgbWFzazsgLy8gKDEgPDwgdykgLSAxLCB0byBhdm9pZCBjYyAtTyBidWcgb24gSFBcclxuXHRcdFx0dmFyIHA7IC8vIHBvaW50ZXIgaW50byBjW10sIGJbXSwgb3IgdltdXHJcblx0XHRcdHZhciBxOyAvLyBwb2ludHMgdG8gY3VycmVudCB0YWJsZVxyXG5cdFx0XHR2YXIgdzsgLy8gYml0cyBiZWZvcmUgdGhpcyB0YWJsZSA9PSAobCAqIGgpXHJcblx0XHRcdHZhciB4cDsgLy8gcG9pbnRlciBpbnRvIHhcclxuXHRcdFx0dmFyIHk7IC8vIG51bWJlciBvZiBkdW1teSBjb2RlcyBhZGRlZFxyXG5cdFx0XHR2YXIgejsgLy8gbnVtYmVyIG9mIGVudHJpZXMgaW4gY3VycmVudCB0YWJsZVxyXG5cclxuXHRcdFx0Ly8gR2VuZXJhdGUgY291bnRzIGZvciBlYWNoIGJpdCBsZW5ndGhcclxuXHJcblx0XHRcdHAgPSAwO1xyXG5cdFx0XHRpID0gbjtcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdGNbYltiaW5kZXggKyBwXV0rKztcclxuXHRcdFx0XHRwKys7XHJcblx0XHRcdFx0aS0tOyAvLyBhc3N1bWUgYWxsIGVudHJpZXMgPD0gQk1BWFxyXG5cdFx0XHR9IHdoaWxlIChpICE9PSAwKTtcclxuXHJcblx0XHRcdGlmIChjWzBdID09IG4pIHsgLy8gbnVsbCBpbnB1dC0tYWxsIHplcm8gbGVuZ3RoIGNvZGVzXHJcblx0XHRcdFx0dFswXSA9IC0xO1xyXG5cdFx0XHRcdG1bMF0gPSAwO1xyXG5cdFx0XHRcdHJldHVybiBaX09LO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBGaW5kIG1pbmltdW0gYW5kIG1heGltdW0gbGVuZ3RoLCBib3VuZCAqbSBieSB0aG9zZVxyXG5cdFx0XHRsID0gbVswXTtcclxuXHRcdFx0Zm9yIChqID0gMTsgaiA8PSBCTUFYOyBqKyspXHJcblx0XHRcdFx0aWYgKGNbal0gIT09IDApXHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0ayA9IGo7IC8vIG1pbmltdW0gY29kZSBsZW5ndGhcclxuXHRcdFx0aWYgKGwgPCBqKSB7XHJcblx0XHRcdFx0bCA9IGo7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yIChpID0gQk1BWDsgaSAhPT0gMDsgaS0tKSB7XHJcblx0XHRcdFx0aWYgKGNbaV0gIT09IDApXHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHRnID0gaTsgLy8gbWF4aW11bSBjb2RlIGxlbmd0aFxyXG5cdFx0XHRpZiAobCA+IGkpIHtcclxuXHRcdFx0XHRsID0gaTtcclxuXHRcdFx0fVxyXG5cdFx0XHRtWzBdID0gbDtcclxuXHJcblx0XHRcdC8vIEFkanVzdCBsYXN0IGxlbmd0aCBjb3VudCB0byBmaWxsIG91dCBjb2RlcywgaWYgbmVlZGVkXHJcblx0XHRcdGZvciAoeSA9IDEgPDwgajsgaiA8IGk7IGorKywgeSA8PD0gMSkge1xyXG5cdFx0XHRcdGlmICgoeSAtPSBjW2pdKSA8IDApIHtcclxuXHRcdFx0XHRcdHJldHVybiBaX0RBVEFfRVJST1I7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICgoeSAtPSBjW2ldKSA8IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gWl9EQVRBX0VSUk9SO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNbaV0gKz0geTtcclxuXHJcblx0XHRcdC8vIEdlbmVyYXRlIHN0YXJ0aW5nIG9mZnNldHMgaW50byB0aGUgdmFsdWUgdGFibGUgZm9yIGVhY2ggbGVuZ3RoXHJcblx0XHRcdHhbMV0gPSBqID0gMDtcclxuXHRcdFx0cCA9IDE7XHJcblx0XHRcdHhwID0gMjtcclxuXHRcdFx0d2hpbGUgKC0taSAhPT0gMCkgeyAvLyBub3RlIHRoYXQgaSA9PSBnIGZyb20gYWJvdmVcclxuXHRcdFx0XHR4W3hwXSA9IChqICs9IGNbcF0pO1xyXG5cdFx0XHRcdHhwKys7XHJcblx0XHRcdFx0cCsrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBNYWtlIGEgdGFibGUgb2YgdmFsdWVzIGluIG9yZGVyIG9mIGJpdCBsZW5ndGhzXHJcblx0XHRcdGkgPSAwO1xyXG5cdFx0XHRwID0gMDtcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdGlmICgoaiA9IGJbYmluZGV4ICsgcF0pICE9PSAwKSB7XHJcblx0XHRcdFx0XHR2W3hbal0rK10gPSBpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRwKys7XHJcblx0XHRcdH0gd2hpbGUgKCsraSA8IG4pO1xyXG5cdFx0XHRuID0geFtnXTsgLy8gc2V0IG4gdG8gbGVuZ3RoIG9mIHZcclxuXHJcblx0XHRcdC8vIEdlbmVyYXRlIHRoZSBIdWZmbWFuIGNvZGVzIGFuZCBmb3IgZWFjaCwgbWFrZSB0aGUgdGFibGUgZW50cmllc1xyXG5cdFx0XHR4WzBdID0gaSA9IDA7IC8vIGZpcnN0IEh1ZmZtYW4gY29kZSBpcyB6ZXJvXHJcblx0XHRcdHAgPSAwOyAvLyBncmFiIHZhbHVlcyBpbiBiaXQgb3JkZXJcclxuXHRcdFx0aCA9IC0xOyAvLyBubyB0YWJsZXMgeWV0LS1sZXZlbCAtMVxyXG5cdFx0XHR3ID0gLWw7IC8vIGJpdHMgZGVjb2RlZCA9PSAobCAqIGgpXHJcblx0XHRcdHVbMF0gPSAwOyAvLyBqdXN0IHRvIGtlZXAgY29tcGlsZXJzIGhhcHB5XHJcblx0XHRcdHEgPSAwOyAvLyBkaXR0b1xyXG5cdFx0XHR6ID0gMDsgLy8gZGl0dG9cclxuXHJcblx0XHRcdC8vIGdvIHRocm91Z2ggdGhlIGJpdCBsZW5ndGhzIChrIGFscmVhZHkgaXMgYml0cyBpbiBzaG9ydGVzdCBjb2RlKVxyXG5cdFx0XHRmb3IgKDsgayA8PSBnOyBrKyspIHtcclxuXHRcdFx0XHRhID0gY1trXTtcclxuXHRcdFx0XHR3aGlsZSAoYS0tICE9PSAwKSB7XHJcblx0XHRcdFx0XHQvLyBoZXJlIGkgaXMgdGhlIEh1ZmZtYW4gY29kZSBvZiBsZW5ndGggayBiaXRzIGZvciB2YWx1ZSAqcFxyXG5cdFx0XHRcdFx0Ly8gbWFrZSB0YWJsZXMgdXAgdG8gcmVxdWlyZWQgbGV2ZWxcclxuXHRcdFx0XHRcdHdoaWxlIChrID4gdyArIGwpIHtcclxuXHRcdFx0XHRcdFx0aCsrO1xyXG5cdFx0XHRcdFx0XHR3ICs9IGw7IC8vIHByZXZpb3VzIHRhYmxlIGFsd2F5cyBsIGJpdHNcclxuXHRcdFx0XHRcdFx0Ly8gY29tcHV0ZSBtaW5pbXVtIHNpemUgdGFibGUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGwgYml0c1xyXG5cdFx0XHRcdFx0XHR6ID0gZyAtIHc7XHJcblx0XHRcdFx0XHRcdHogPSAoeiA+IGwpID8gbCA6IHo7IC8vIHRhYmxlIHNpemUgdXBwZXIgbGltaXRcclxuXHRcdFx0XHRcdFx0aWYgKChmID0gMSA8PCAoaiA9IGsgLSB3KSkgPiBhICsgMSkgeyAvLyB0cnkgYSBrLXcgYml0IHRhYmxlXHJcblx0XHRcdFx0XHRcdFx0Ly8gdG9vIGZldyBjb2RlcyBmb3JcclxuXHRcdFx0XHRcdFx0XHQvLyBrLXcgYml0IHRhYmxlXHJcblx0XHRcdFx0XHRcdFx0ZiAtPSBhICsgMTsgLy8gZGVkdWN0IGNvZGVzIGZyb20gcGF0dGVybnMgbGVmdFxyXG5cdFx0XHRcdFx0XHRcdHhwID0gaztcclxuXHRcdFx0XHRcdFx0XHRpZiAoaiA8IHopIHtcclxuXHRcdFx0XHRcdFx0XHRcdHdoaWxlICgrK2ogPCB6KSB7IC8vIHRyeSBzbWFsbGVyIHRhYmxlcyB1cCB0byB6IGJpdHNcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKChmIDw8PSAxKSA8PSBjWysreHBdKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrOyAvLyBlbm91Z2ggY29kZXMgdG8gdXNlIHVwIGogYml0c1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRmIC09IGNbeHBdOyAvLyBlbHNlIGRlZHVjdCBjb2RlcyBmcm9tIHBhdHRlcm5zXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHogPSAxIDw8IGo7IC8vIHRhYmxlIGVudHJpZXMgZm9yIGotYml0IHRhYmxlXHJcblxyXG5cdFx0XHRcdFx0XHQvLyBhbGxvY2F0ZSBuZXcgdGFibGVcclxuXHRcdFx0XHRcdFx0aWYgKGhuWzBdICsgeiA+IE1BTlkpIHsgLy8gKG5vdGU6IGRvZXNuJ3QgbWF0dGVyIGZvciBmaXhlZClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gWl9EQVRBX0VSUk9SOyAvLyBvdmVyZmxvdyBvZiBNQU5ZXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dVtoXSA9IHEgPSAvKiBocCsgKi9oblswXTsgLy8gREVCVUdcclxuXHRcdFx0XHRcdFx0aG5bMF0gKz0gejtcclxuXHJcblx0XHRcdFx0XHRcdC8vIGNvbm5lY3QgdG8gbGFzdCB0YWJsZSwgaWYgdGhlcmUgaXMgb25lXHJcblx0XHRcdFx0XHRcdGlmIChoICE9PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0eFtoXSA9IGk7IC8vIHNhdmUgcGF0dGVybiBmb3IgYmFja2luZyB1cFxyXG5cdFx0XHRcdFx0XHRcdHJbMF0gPSAvKiAoYnl0ZSkgKi9qOyAvLyBiaXRzIGluIHRoaXMgdGFibGVcclxuXHRcdFx0XHRcdFx0XHRyWzFdID0gLyogKGJ5dGUpICovbDsgLy8gYml0cyB0byBkdW1wIGJlZm9yZSB0aGlzIHRhYmxlXHJcblx0XHRcdFx0XHRcdFx0aiA9IGkgPj4+ICh3IC0gbCk7XHJcblx0XHRcdFx0XHRcdFx0clsyXSA9IC8qIChpbnQpICovKHEgLSB1W2ggLSAxXSAtIGopOyAvLyBvZmZzZXQgdG8gdGhpcyB0YWJsZVxyXG5cdFx0XHRcdFx0XHRcdGhwLnNldChyLCAodVtoIC0gMV0gKyBqKSAqIDMpO1xyXG5cdFx0XHRcdFx0XHRcdC8vIHRvXHJcblx0XHRcdFx0XHRcdFx0Ly8gbGFzdFxyXG5cdFx0XHRcdFx0XHRcdC8vIHRhYmxlXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dFswXSA9IHE7IC8vIGZpcnN0IHRhYmxlIGlzIHJldHVybmVkIHJlc3VsdFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gc2V0IHVwIHRhYmxlIGVudHJ5IGluIHJcclxuXHRcdFx0XHRcdHJbMV0gPSAvKiAoYnl0ZSkgKi8oayAtIHcpO1xyXG5cdFx0XHRcdFx0aWYgKHAgPj0gbikge1xyXG5cdFx0XHRcdFx0XHRyWzBdID0gMTI4ICsgNjQ7IC8vIG91dCBvZiB2YWx1ZXMtLWludmFsaWQgY29kZVxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh2W3BdIDwgcykge1xyXG5cdFx0XHRcdFx0XHRyWzBdID0gLyogKGJ5dGUpICovKHZbcF0gPCAyNTYgPyAwIDogMzIgKyA2NCk7IC8vIDI1NiBpc1xyXG5cdFx0XHRcdFx0XHQvLyBlbmQtb2YtYmxvY2tcclxuXHRcdFx0XHRcdFx0clsyXSA9IHZbcCsrXTsgLy8gc2ltcGxlIGNvZGUgaXMganVzdCB0aGUgdmFsdWVcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJbMF0gPSAvKiAoYnl0ZSkgKi8oZVt2W3BdIC0gc10gKyAxNiArIDY0KTsgLy8gbm9uLXNpbXBsZS0tbG9va1xyXG5cdFx0XHRcdFx0XHQvLyB1cCBpbiBsaXN0c1xyXG5cdFx0XHRcdFx0XHRyWzJdID0gZFt2W3ArK10gLSBzXTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBmaWxsIGNvZGUtbGlrZSBlbnRyaWVzIHdpdGggclxyXG5cdFx0XHRcdFx0ZiA9IDEgPDwgKGsgLSB3KTtcclxuXHRcdFx0XHRcdGZvciAoaiA9IGkgPj4+IHc7IGogPCB6OyBqICs9IGYpIHtcclxuXHRcdFx0XHRcdFx0aHAuc2V0KHIsIChxICsgaikgKiAzKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBiYWNrd2FyZHMgaW5jcmVtZW50IHRoZSBrLWJpdCBjb2RlIGlcclxuXHRcdFx0XHRcdGZvciAoaiA9IDEgPDwgKGsgLSAxKTsgKGkgJiBqKSAhPT0gMDsgaiA+Pj49IDEpIHtcclxuXHRcdFx0XHRcdFx0aSBePSBqO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aSBePSBqO1xyXG5cclxuXHRcdFx0XHRcdC8vIGJhY2t1cCBvdmVyIGZpbmlzaGVkIHRhYmxlc1xyXG5cdFx0XHRcdFx0bWFzayA9ICgxIDw8IHcpIC0gMTsgLy8gbmVlZGVkIG9uIEhQLCBjYyAtTyBidWdcclxuXHRcdFx0XHRcdHdoaWxlICgoaSAmIG1hc2spICE9IHhbaF0pIHtcclxuXHRcdFx0XHRcdFx0aC0tOyAvLyBkb24ndCBuZWVkIHRvIHVwZGF0ZSBxXHJcblx0XHRcdFx0XHRcdHcgLT0gbDtcclxuXHRcdFx0XHRcdFx0bWFzayA9ICgxIDw8IHcpIC0gMTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gUmV0dXJuIFpfQlVGX0VSUk9SIGlmIHdlIHdlcmUgZ2l2ZW4gYW4gaW5jb21wbGV0ZSB0YWJsZVxyXG5cdFx0XHRyZXR1cm4geSAhPT0gMCAmJiBnICE9IDEgPyBaX0JVRl9FUlJPUiA6IFpfT0s7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gaW5pdFdvcmtBcmVhKHZzaXplKSB7XHJcblx0XHRcdHZhciBpO1xyXG5cdFx0XHRpZiAoIWhuKSB7XHJcblx0XHRcdFx0aG4gPSBbXTsgLy8gW107IC8vbmV3IEFycmF5KDEpO1xyXG5cdFx0XHRcdHYgPSBbXTsgLy8gbmV3IEFycmF5KHZzaXplKTtcclxuXHRcdFx0XHRjID0gbmV3IEludDMyQXJyYXkoQk1BWCArIDEpOyAvLyBuZXcgQXJyYXkoQk1BWCArIDEpO1xyXG5cdFx0XHRcdHIgPSBbXTsgLy8gbmV3IEFycmF5KDMpO1xyXG5cdFx0XHRcdHUgPSBuZXcgSW50MzJBcnJheShCTUFYKTsgLy8gbmV3IEFycmF5KEJNQVgpO1xyXG5cdFx0XHRcdHggPSBuZXcgSW50MzJBcnJheShCTUFYICsgMSk7IC8vIG5ldyBBcnJheShCTUFYICsgMSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHYubGVuZ3RoIDwgdnNpemUpIHtcclxuXHRcdFx0XHR2ID0gW107IC8vIG5ldyBBcnJheSh2c2l6ZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHZzaXplOyBpKyspIHtcclxuXHRcdFx0XHR2W2ldID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgQk1BWCArIDE7IGkrKykge1xyXG5cdFx0XHRcdGNbaV0gPSAwO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuXHRcdFx0XHRyW2ldID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBmb3IoaW50IGk9MDsgaTxCTUFYOyBpKyspe3VbaV09MDt9XHJcblx0XHRcdHUuc2V0KGMuc3ViYXJyYXkoMCwgQk1BWCksIDApO1xyXG5cdFx0XHQvLyBmb3IoaW50IGk9MDsgaTxCTUFYKzE7IGkrKyl7eFtpXT0wO31cclxuXHRcdFx0eC5zZXQoYy5zdWJhcnJheSgwLCBCTUFYICsgMSksIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoYXQuaW5mbGF0ZV90cmVlc19iaXRzID0gZnVuY3Rpb24oYywgLy8gMTkgY29kZSBsZW5ndGhzXHJcblx0XHRiYiwgLy8gYml0cyB0cmVlIGRlc2lyZWQvYWN0dWFsIGRlcHRoXHJcblx0XHR0YiwgLy8gYml0cyB0cmVlIHJlc3VsdFxyXG5cdFx0aHAsIC8vIHNwYWNlIGZvciB0cmVlc1xyXG5cdFx0eiAvLyBmb3IgbWVzc2FnZXNcclxuXHRcdCkge1xyXG5cdFx0XHR2YXIgcmVzdWx0O1xyXG5cdFx0XHRpbml0V29ya0FyZWEoMTkpO1xyXG5cdFx0XHRoblswXSA9IDA7XHJcblx0XHRcdHJlc3VsdCA9IGh1ZnRfYnVpbGQoYywgMCwgMTksIDE5LCBudWxsLCBudWxsLCB0YiwgYmIsIGhwLCBobiwgdik7XHJcblxyXG5cdFx0XHRpZiAocmVzdWx0ID09IFpfREFUQV9FUlJPUikge1xyXG5cdFx0XHRcdHoubXNnID0gXCJvdmVyc3Vic2NyaWJlZCBkeW5hbWljIGJpdCBsZW5ndGhzIHRyZWVcIjtcclxuXHRcdFx0fSBlbHNlIGlmIChyZXN1bHQgPT0gWl9CVUZfRVJST1IgfHwgYmJbMF0gPT09IDApIHtcclxuXHRcdFx0XHR6Lm1zZyA9IFwiaW5jb21wbGV0ZSBkeW5hbWljIGJpdCBsZW5ndGhzIHRyZWVcIjtcclxuXHRcdFx0XHRyZXN1bHQgPSBaX0RBVEFfRVJST1I7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhhdC5pbmZsYXRlX3RyZWVzX2R5bmFtaWMgPSBmdW5jdGlvbihubCwgLy8gbnVtYmVyIG9mIGxpdGVyYWwvbGVuZ3RoIGNvZGVzXHJcblx0XHRuZCwgLy8gbnVtYmVyIG9mIGRpc3RhbmNlIGNvZGVzXHJcblx0XHRjLCAvLyB0aGF0IG1hbnkgKHRvdGFsKSBjb2RlIGxlbmd0aHNcclxuXHRcdGJsLCAvLyBsaXRlcmFsIGRlc2lyZWQvYWN0dWFsIGJpdCBkZXB0aFxyXG5cdFx0YmQsIC8vIGRpc3RhbmNlIGRlc2lyZWQvYWN0dWFsIGJpdCBkZXB0aFxyXG5cdFx0dGwsIC8vIGxpdGVyYWwvbGVuZ3RoIHRyZWUgcmVzdWx0XHJcblx0XHR0ZCwgLy8gZGlzdGFuY2UgdHJlZSByZXN1bHRcclxuXHRcdGhwLCAvLyBzcGFjZSBmb3IgdHJlZXNcclxuXHRcdHogLy8gZm9yIG1lc3NhZ2VzXHJcblx0XHQpIHtcclxuXHRcdFx0dmFyIHJlc3VsdDtcclxuXHJcblx0XHRcdC8vIGJ1aWxkIGxpdGVyYWwvbGVuZ3RoIHRyZWVcclxuXHRcdFx0aW5pdFdvcmtBcmVhKDI4OCk7XHJcblx0XHRcdGhuWzBdID0gMDtcclxuXHRcdFx0cmVzdWx0ID0gaHVmdF9idWlsZChjLCAwLCBubCwgMjU3LCBjcGxlbnMsIGNwbGV4dCwgdGwsIGJsLCBocCwgaG4sIHYpO1xyXG5cdFx0XHRpZiAocmVzdWx0ICE9IFpfT0sgfHwgYmxbMF0gPT09IDApIHtcclxuXHRcdFx0XHRpZiAocmVzdWx0ID09IFpfREFUQV9FUlJPUikge1xyXG5cdFx0XHRcdFx0ei5tc2cgPSBcIm92ZXJzdWJzY3JpYmVkIGxpdGVyYWwvbGVuZ3RoIHRyZWVcIjtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdCAhPSBaX01FTV9FUlJPUikge1xyXG5cdFx0XHRcdFx0ei5tc2cgPSBcImluY29tcGxldGUgbGl0ZXJhbC9sZW5ndGggdHJlZVwiO1xyXG5cdFx0XHRcdFx0cmVzdWx0ID0gWl9EQVRBX0VSUk9SO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBidWlsZCBkaXN0YW5jZSB0cmVlXHJcblx0XHRcdGluaXRXb3JrQXJlYSgyODgpO1xyXG5cdFx0XHRyZXN1bHQgPSBodWZ0X2J1aWxkKGMsIG5sLCBuZCwgMCwgY3BkaXN0LCBjcGRleHQsIHRkLCBiZCwgaHAsIGhuLCB2KTtcclxuXHJcblx0XHRcdGlmIChyZXN1bHQgIT0gWl9PSyB8fCAoYmRbMF0gPT09IDAgJiYgbmwgPiAyNTcpKSB7XHJcblx0XHRcdFx0aWYgKHJlc3VsdCA9PSBaX0RBVEFfRVJST1IpIHtcclxuXHRcdFx0XHRcdHoubXNnID0gXCJvdmVyc3Vic2NyaWJlZCBkaXN0YW5jZSB0cmVlXCI7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQgPT0gWl9CVUZfRVJST1IpIHtcclxuXHRcdFx0XHRcdHoubXNnID0gXCJpbmNvbXBsZXRlIGRpc3RhbmNlIHRyZWVcIjtcclxuXHRcdFx0XHRcdHJlc3VsdCA9IFpfREFUQV9FUlJPUjtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdCAhPSBaX01FTV9FUlJPUikge1xyXG5cdFx0XHRcdFx0ei5tc2cgPSBcImVtcHR5IGRpc3RhbmNlIHRyZWUgd2l0aCBsZW5ndGhzXCI7XHJcblx0XHRcdFx0XHRyZXN1bHQgPSBaX0RBVEFfRVJST1I7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBaX09LO1xyXG5cdFx0fTtcclxuXHJcblx0fVxyXG5cclxuXHRJbmZUcmVlLmluZmxhdGVfdHJlZXNfZml4ZWQgPSBmdW5jdGlvbihibCwgLy8gbGl0ZXJhbCBkZXNpcmVkL2FjdHVhbCBiaXQgZGVwdGhcclxuXHRiZCwgLy8gZGlzdGFuY2UgZGVzaXJlZC9hY3R1YWwgYml0IGRlcHRoXHJcblx0dGwsLy8gbGl0ZXJhbC9sZW5ndGggdHJlZSByZXN1bHRcclxuXHR0ZC8vIGRpc3RhbmNlIHRyZWUgcmVzdWx0XHJcblx0KSB7XHJcblx0XHRibFswXSA9IGZpeGVkX2JsO1xyXG5cdFx0YmRbMF0gPSBmaXhlZF9iZDtcclxuXHRcdHRsWzBdID0gZml4ZWRfdGw7XHJcblx0XHR0ZFswXSA9IGZpeGVkX3RkO1xyXG5cdFx0cmV0dXJuIFpfT0s7XHJcblx0fTtcclxuXHJcblx0Ly8gSW5mQ29kZXNcclxuXHJcblx0Ly8gd2FpdGluZyBmb3IgXCJpOlwiPWlucHV0LFxyXG5cdC8vIFwibzpcIj1vdXRwdXQsXHJcblx0Ly8gXCJ4OlwiPW5vdGhpbmdcclxuXHR2YXIgU1RBUlQgPSAwOyAvLyB4OiBzZXQgdXAgZm9yIExFTlxyXG5cdHZhciBMRU4gPSAxOyAvLyBpOiBnZXQgbGVuZ3RoL2xpdGVyYWwvZW9iIG5leHRcclxuXHR2YXIgTEVORVhUID0gMjsgLy8gaTogZ2V0dGluZyBsZW5ndGggZXh0cmEgKGhhdmUgYmFzZSlcclxuXHR2YXIgRElTVCA9IDM7IC8vIGk6IGdldCBkaXN0YW5jZSBuZXh0XHJcblx0dmFyIERJU1RFWFQgPSA0Oy8vIGk6IGdldHRpbmcgZGlzdGFuY2UgZXh0cmFcclxuXHR2YXIgQ09QWSA9IDU7IC8vIG86IGNvcHlpbmcgYnl0ZXMgaW4gd2luZG93LCB3YWl0aW5nXHJcblx0Ly8gZm9yIHNwYWNlXHJcblx0dmFyIExJVCA9IDY7IC8vIG86IGdvdCBsaXRlcmFsLCB3YWl0aW5nIGZvciBvdXRwdXRcclxuXHQvLyBzcGFjZVxyXG5cdHZhciBXQVNIID0gNzsgLy8gbzogZ290IGVvYiwgcG9zc2libHkgc3RpbGwgb3V0cHV0XHJcblx0Ly8gd2FpdGluZ1xyXG5cdHZhciBFTkQgPSA4OyAvLyB4OiBnb3QgZW9iIGFuZCBhbGwgZGF0YSBmbHVzaGVkXHJcblx0dmFyIEJBRENPREUgPSA5Oy8vIHg6IGdvdCBlcnJvclxyXG5cclxuXHRmdW5jdGlvbiBJbmZDb2RlcygpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHR2YXIgbW9kZTsgLy8gY3VycmVudCBpbmZsYXRlX2NvZGVzIG1vZGVcclxuXHJcblx0XHQvLyBtb2RlIGRlcGVuZGVudCBpbmZvcm1hdGlvblxyXG5cdFx0dmFyIGxlbiA9IDA7XHJcblxyXG5cdFx0dmFyIHRyZWU7IC8vIHBvaW50ZXIgaW50byB0cmVlXHJcblx0XHR2YXIgdHJlZV9pbmRleCA9IDA7XHJcblx0XHR2YXIgbmVlZCA9IDA7IC8vIGJpdHMgbmVlZGVkXHJcblxyXG5cdFx0dmFyIGxpdCA9IDA7XHJcblxyXG5cdFx0Ly8gaWYgRVhUIG9yIENPUFksIHdoZXJlIGFuZCBob3cgbXVjaFxyXG5cdFx0dmFyIGdldCA9IDA7IC8vIGJpdHMgdG8gZ2V0IGZvciBleHRyYVxyXG5cdFx0dmFyIGRpc3QgPSAwOyAvLyBkaXN0YW5jZSBiYWNrIHRvIGNvcHkgZnJvbVxyXG5cclxuXHRcdHZhciBsYml0cyA9IDA7IC8vIGx0cmVlIGJpdHMgZGVjb2RlZCBwZXIgYnJhbmNoXHJcblx0XHR2YXIgZGJpdHMgPSAwOyAvLyBkdHJlZSBiaXRzIGRlY29kZXIgcGVyIGJyYW5jaFxyXG5cdFx0dmFyIGx0cmVlOyAvLyBsaXRlcmFsL2xlbmd0aC9lb2IgdHJlZVxyXG5cdFx0dmFyIGx0cmVlX2luZGV4ID0gMDsgLy8gbGl0ZXJhbC9sZW5ndGgvZW9iIHRyZWVcclxuXHRcdHZhciBkdHJlZTsgLy8gZGlzdGFuY2UgdHJlZVxyXG5cdFx0dmFyIGR0cmVlX2luZGV4ID0gMDsgLy8gZGlzdGFuY2UgdHJlZVxyXG5cclxuXHRcdC8vIENhbGxlZCB3aXRoIG51bWJlciBvZiBieXRlcyBsZWZ0IHRvIHdyaXRlIGluIHdpbmRvdyBhdCBsZWFzdCAyNThcclxuXHRcdC8vICh0aGUgbWF4aW11bSBzdHJpbmcgbGVuZ3RoKSBhbmQgbnVtYmVyIG9mIGlucHV0IGJ5dGVzIGF2YWlsYWJsZVxyXG5cdFx0Ly8gYXQgbGVhc3QgdGVuLiBUaGUgdGVuIGJ5dGVzIGFyZSBzaXggYnl0ZXMgZm9yIHRoZSBsb25nZXN0IGxlbmd0aC9cclxuXHRcdC8vIGRpc3RhbmNlIHBhaXIgcGx1cyBmb3VyIGJ5dGVzIGZvciBvdmVybG9hZGluZyB0aGUgYml0IGJ1ZmZlci5cclxuXHJcblx0XHRmdW5jdGlvbiBpbmZsYXRlX2Zhc3QoYmwsIGJkLCB0bCwgdGxfaW5kZXgsIHRkLCB0ZF9pbmRleCwgcywgeikge1xyXG5cdFx0XHR2YXIgdDsgLy8gdGVtcG9yYXJ5IHBvaW50ZXJcclxuXHRcdFx0dmFyIHRwOyAvLyB0ZW1wb3JhcnkgcG9pbnRlclxyXG5cdFx0XHR2YXIgdHBfaW5kZXg7IC8vIHRlbXBvcmFyeSBwb2ludGVyXHJcblx0XHRcdHZhciBlOyAvLyBleHRyYSBiaXRzIG9yIG9wZXJhdGlvblxyXG5cdFx0XHR2YXIgYjsgLy8gYml0IGJ1ZmZlclxyXG5cdFx0XHR2YXIgazsgLy8gYml0cyBpbiBiaXQgYnVmZmVyXHJcblx0XHRcdHZhciBwOyAvLyBpbnB1dCBkYXRhIHBvaW50ZXJcclxuXHRcdFx0dmFyIG47IC8vIGJ5dGVzIGF2YWlsYWJsZSB0aGVyZVxyXG5cdFx0XHR2YXIgcTsgLy8gb3V0cHV0IHdpbmRvdyB3cml0ZSBwb2ludGVyXHJcblx0XHRcdHZhciBtOyAvLyBieXRlcyB0byBlbmQgb2Ygd2luZG93IG9yIHJlYWQgcG9pbnRlclxyXG5cdFx0XHR2YXIgbWw7IC8vIG1hc2sgZm9yIGxpdGVyYWwvbGVuZ3RoIHRyZWVcclxuXHRcdFx0dmFyIG1kOyAvLyBtYXNrIGZvciBkaXN0YW5jZSB0cmVlXHJcblx0XHRcdHZhciBjOyAvLyBieXRlcyB0byBjb3B5XHJcblx0XHRcdHZhciBkOyAvLyBkaXN0YW5jZSBiYWNrIHRvIGNvcHkgZnJvbVxyXG5cdFx0XHR2YXIgcjsgLy8gY29weSBzb3VyY2UgcG9pbnRlclxyXG5cclxuXHRcdFx0dmFyIHRwX2luZGV4X3RfMzsgLy8gKHRwX2luZGV4K3QpKjNcclxuXHJcblx0XHRcdC8vIGxvYWQgaW5wdXQsIG91dHB1dCwgYml0IHZhbHVlc1xyXG5cdFx0XHRwID0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRuID0gei5hdmFpbF9pbjtcclxuXHRcdFx0YiA9IHMuYml0YjtcclxuXHRcdFx0ayA9IHMuYml0aztcclxuXHRcdFx0cSA9IHMud3JpdGU7XHJcblx0XHRcdG0gPSBxIDwgcy5yZWFkID8gcy5yZWFkIC0gcSAtIDEgOiBzLmVuZCAtIHE7XHJcblxyXG5cdFx0XHQvLyBpbml0aWFsaXplIG1hc2tzXHJcblx0XHRcdG1sID0gaW5mbGF0ZV9tYXNrW2JsXTtcclxuXHRcdFx0bWQgPSBpbmZsYXRlX21hc2tbYmRdO1xyXG5cclxuXHRcdFx0Ly8gZG8gdW50aWwgbm90IGVub3VnaCBpbnB1dCBvciBvdXRwdXQgc3BhY2UgZm9yIGZhc3QgbG9vcFxyXG5cdFx0XHRkbyB7IC8vIGFzc3VtZSBjYWxsZWQgd2l0aCBtID49IDI1OCAmJiBuID49IDEwXHJcblx0XHRcdFx0Ly8gZ2V0IGxpdGVyYWwvbGVuZ3RoIGNvZGVcclxuXHRcdFx0XHR3aGlsZSAoayA8ICgyMCkpIHsgLy8gbWF4IGJpdHMgZm9yIGxpdGVyYWwvbGVuZ3RoIGNvZGVcclxuXHRcdFx0XHRcdG4tLTtcclxuXHRcdFx0XHRcdGIgfD0gKHoucmVhZF9ieXRlKHArKykgJiAweGZmKSA8PCBrO1xyXG5cdFx0XHRcdFx0ayArPSA4O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dCA9IGIgJiBtbDtcclxuXHRcdFx0XHR0cCA9IHRsO1xyXG5cdFx0XHRcdHRwX2luZGV4ID0gdGxfaW5kZXg7XHJcblx0XHRcdFx0dHBfaW5kZXhfdF8zID0gKHRwX2luZGV4ICsgdCkgKiAzO1xyXG5cdFx0XHRcdGlmICgoZSA9IHRwW3RwX2luZGV4X3RfM10pID09PSAwKSB7XHJcblx0XHRcdFx0XHRiID4+PSAodHBbdHBfaW5kZXhfdF8zICsgMV0pO1xyXG5cdFx0XHRcdFx0ayAtPSAodHBbdHBfaW5kZXhfdF8zICsgMV0pO1xyXG5cclxuXHRcdFx0XHRcdHMud2luZG93W3ErK10gPSAvKiAoYnl0ZSkgKi90cFt0cF9pbmRleF90XzMgKyAyXTtcclxuXHRcdFx0XHRcdG0tLTtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkbyB7XHJcblxyXG5cdFx0XHRcdFx0YiA+Pj0gKHRwW3RwX2luZGV4X3RfMyArIDFdKTtcclxuXHRcdFx0XHRcdGsgLT0gKHRwW3RwX2luZGV4X3RfMyArIDFdKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoKGUgJiAxNikgIT09IDApIHtcclxuXHRcdFx0XHRcdFx0ZSAmPSAxNTtcclxuXHRcdFx0XHRcdFx0YyA9IHRwW3RwX2luZGV4X3RfMyArIDJdICsgKC8qIChpbnQpICovYiAmIGluZmxhdGVfbWFza1tlXSk7XHJcblxyXG5cdFx0XHRcdFx0XHRiID4+PSBlO1xyXG5cdFx0XHRcdFx0XHRrIC09IGU7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBkZWNvZGUgZGlzdGFuY2UgYmFzZSBvZiBibG9jayB0byBjb3B5XHJcblx0XHRcdFx0XHRcdHdoaWxlIChrIDwgKDE1KSkgeyAvLyBtYXggYml0cyBmb3IgZGlzdGFuY2UgY29kZVxyXG5cdFx0XHRcdFx0XHRcdG4tLTtcclxuXHRcdFx0XHRcdFx0XHRiIHw9ICh6LnJlYWRfYnl0ZShwKyspICYgMHhmZikgPDwgaztcclxuXHRcdFx0XHRcdFx0XHRrICs9IDg7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHQgPSBiICYgbWQ7XHJcblx0XHRcdFx0XHRcdHRwID0gdGQ7XHJcblx0XHRcdFx0XHRcdHRwX2luZGV4ID0gdGRfaW5kZXg7XHJcblx0XHRcdFx0XHRcdHRwX2luZGV4X3RfMyA9ICh0cF9pbmRleCArIHQpICogMztcclxuXHRcdFx0XHRcdFx0ZSA9IHRwW3RwX2luZGV4X3RfM107XHJcblxyXG5cdFx0XHRcdFx0XHRkbyB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGIgPj49ICh0cFt0cF9pbmRleF90XzMgKyAxXSk7XHJcblx0XHRcdFx0XHRcdFx0ayAtPSAodHBbdHBfaW5kZXhfdF8zICsgMV0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoKGUgJiAxNikgIT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdC8vIGdldCBleHRyYSBiaXRzIHRvIGFkZCB0byBkaXN0YW5jZSBiYXNlXHJcblx0XHRcdFx0XHRcdFx0XHRlICY9IDE1O1xyXG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKGsgPCAoZSkpIHsgLy8gZ2V0IGV4dHJhIGJpdHMgKHVwIHRvIDEzKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRuLS07XHJcblx0XHRcdFx0XHRcdFx0XHRcdGIgfD0gKHoucmVhZF9ieXRlKHArKykgJiAweGZmKSA8PCBrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRrICs9IDg7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0ZCA9IHRwW3RwX2luZGV4X3RfMyArIDJdICsgKGIgJiBpbmZsYXRlX21hc2tbZV0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGIgPj49IChlKTtcclxuXHRcdFx0XHRcdFx0XHRcdGsgLT0gKGUpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdC8vIGRvIHRoZSBjb3B5XHJcblx0XHRcdFx0XHRcdFx0XHRtIC09IGM7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocSA+PSBkKSB7IC8vIG9mZnNldCBiZWZvcmUgZGVzdFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBqdXN0IGNvcHlcclxuXHRcdFx0XHRcdFx0XHRcdFx0ciA9IHEgLSBkO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocSAtIHIgPiAwICYmIDIgPiAocSAtIHIpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cy53aW5kb3dbcSsrXSA9IHMud2luZG93W3IrK107IC8vIG1pbmltdW1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBjb3VudCBpc1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIHRocmVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHMud2luZG93W3ErK10gPSBzLndpbmRvd1tyKytdOyAvLyBzbyB1bnJvbGxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBsb29wIGFcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBsaXR0bGVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjIC09IDI7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cy53aW5kb3cuc2V0KHMud2luZG93LnN1YmFycmF5KHIsIHIgKyAyKSwgcSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cSArPSAyO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHIgKz0gMjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjIC09IDI7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7IC8vIGVsc2Ugb2Zmc2V0IGFmdGVyIGRlc3RpbmF0aW9uXHJcblx0XHRcdFx0XHRcdFx0XHRcdHIgPSBxIC0gZDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZG8ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHIgKz0gcy5lbmQ7IC8vIGZvcmNlIHBvaW50ZXIgaW4gd2luZG93XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gd2hpbGUgKHIgPCAwKTsgLy8gY292ZXJzIGludmFsaWQgZGlzdGFuY2VzXHJcblx0XHRcdFx0XHRcdFx0XHRcdGUgPSBzLmVuZCAtIHI7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjID4gZSkgeyAvLyBpZiBzb3VyY2UgY3Jvc3NlcyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjIC09IGU7IC8vIHdyYXBwZWQgY29weVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChxIC0gciA+IDAgJiYgZSA+IChxIC0gcikpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRvIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cy53aW5kb3dbcSsrXSA9IHMud2luZG93W3IrK107XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IHdoaWxlICgtLWUgIT09IDApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzLndpbmRvdy5zZXQocy53aW5kb3cuc3ViYXJyYXkociwgciArIGUpLCBxKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHEgKz0gZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHIgKz0gZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGUgPSAwO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyID0gMDsgLy8gY29weSByZXN0IGZyb20gc3RhcnQgb2Ygd2luZG93XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gY29weSBhbGwgb3Igd2hhdCdzIGxlZnRcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChxIC0gciA+IDAgJiYgYyA+IChxIC0gcikpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZG8ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHMud2luZG93W3ErK10gPSBzLndpbmRvd1tyKytdO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IHdoaWxlICgtLWMgIT09IDApO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cy53aW5kb3cuc2V0KHMud2luZG93LnN1YmFycmF5KHIsIHIgKyBjKSwgcSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHEgKz0gYztcclxuXHRcdFx0XHRcdFx0XHRcdFx0ciArPSBjO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjID0gMDtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoKGUgJiA2NCkgPT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdHQgKz0gdHBbdHBfaW5kZXhfdF8zICsgMl07XHJcblx0XHRcdFx0XHRcdFx0XHR0ICs9IChiICYgaW5mbGF0ZV9tYXNrW2VdKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRwX2luZGV4X3RfMyA9ICh0cF9pbmRleCArIHQpICogMztcclxuXHRcdFx0XHRcdFx0XHRcdGUgPSB0cFt0cF9pbmRleF90XzNdO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHR6Lm1zZyA9IFwiaW52YWxpZCBkaXN0YW5jZSBjb2RlXCI7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0YyA9IHouYXZhaWxfaW4gLSBuO1xyXG5cdFx0XHRcdFx0XHRcdFx0YyA9IChrID4+IDMpIDwgYyA/IGsgPj4gMyA6IGM7XHJcblx0XHRcdFx0XHRcdFx0XHRuICs9IGM7XHJcblx0XHRcdFx0XHRcdFx0XHRwIC09IGM7XHJcblx0XHRcdFx0XHRcdFx0XHRrIC09IGMgPDwgMztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRzLmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHRcdFx0cy5iaXRrID0gaztcclxuXHRcdFx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xyXG5cdFx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcclxuXHRcdFx0XHRcdFx0XHRcdHMud3JpdGUgPSBxO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBaX0RBVEFfRVJST1I7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9IHdoaWxlICh0cnVlKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKChlICYgNjQpID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdHQgKz0gdHBbdHBfaW5kZXhfdF8zICsgMl07XHJcblx0XHRcdFx0XHRcdHQgKz0gKGIgJiBpbmZsYXRlX21hc2tbZV0pO1xyXG5cdFx0XHRcdFx0XHR0cF9pbmRleF90XzMgPSAodHBfaW5kZXggKyB0KSAqIDM7XHJcblx0XHRcdFx0XHRcdGlmICgoZSA9IHRwW3RwX2luZGV4X3RfM10pID09PSAwKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGIgPj49ICh0cFt0cF9pbmRleF90XzMgKyAxXSk7XHJcblx0XHRcdFx0XHRcdFx0ayAtPSAodHBbdHBfaW5kZXhfdF8zICsgMV0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzLndpbmRvd1txKytdID0gLyogKGJ5dGUpICovdHBbdHBfaW5kZXhfdF8zICsgMl07XHJcblx0XHRcdFx0XHRcdFx0bS0tO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKChlICYgMzIpICE9PSAwKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRjID0gei5hdmFpbF9pbiAtIG47XHJcblx0XHRcdFx0XHRcdGMgPSAoayA+PiAzKSA8IGMgPyBrID4+IDMgOiBjO1xyXG5cdFx0XHRcdFx0XHRuICs9IGM7XHJcblx0XHRcdFx0XHRcdHAgLT0gYztcclxuXHRcdFx0XHRcdFx0ayAtPSBjIDw8IDM7XHJcblxyXG5cdFx0XHRcdFx0XHRzLmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHRzLmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0XHRzLndyaXRlID0gcTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FTkQ7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR6Lm1zZyA9IFwiaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlXCI7XHJcblxyXG5cdFx0XHRcdFx0XHRjID0gei5hdmFpbF9pbiAtIG47XHJcblx0XHRcdFx0XHRcdGMgPSAoayA+PiAzKSA8IGMgPyBrID4+IDMgOiBjO1xyXG5cdFx0XHRcdFx0XHRuICs9IGM7XHJcblx0XHRcdFx0XHRcdHAgLT0gYztcclxuXHRcdFx0XHRcdFx0ayAtPSBjIDw8IDM7XHJcblxyXG5cdFx0XHRcdFx0XHRzLmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHRzLmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0XHRzLndyaXRlID0gcTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBaX0RBVEFfRVJST1I7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSB3aGlsZSAodHJ1ZSk7XHJcblx0XHRcdH0gd2hpbGUgKG0gPj0gMjU4ICYmIG4gPj0gMTApO1xyXG5cclxuXHRcdFx0Ly8gbm90IGVub3VnaCBpbnB1dCBvciBvdXRwdXQtLXJlc3RvcmUgcG9pbnRlcnMgYW5kIHJldHVyblxyXG5cdFx0XHRjID0gei5hdmFpbF9pbiAtIG47XHJcblx0XHRcdGMgPSAoayA+PiAzKSA8IGMgPyBrID4+IDMgOiBjO1xyXG5cdFx0XHRuICs9IGM7XHJcblx0XHRcdHAgLT0gYztcclxuXHRcdFx0ayAtPSBjIDw8IDM7XHJcblxyXG5cdFx0XHRzLmJpdGIgPSBiO1xyXG5cdFx0XHRzLmJpdGsgPSBrO1xyXG5cdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRzLndyaXRlID0gcTtcclxuXHJcblx0XHRcdHJldHVybiBaX09LO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoYXQuaW5pdCA9IGZ1bmN0aW9uKGJsLCBiZCwgdGwsIHRsX2luZGV4LCB0ZCwgdGRfaW5kZXgpIHtcclxuXHRcdFx0bW9kZSA9IFNUQVJUO1xyXG5cdFx0XHRsYml0cyA9IC8qIChieXRlKSAqL2JsO1xyXG5cdFx0XHRkYml0cyA9IC8qIChieXRlKSAqL2JkO1xyXG5cdFx0XHRsdHJlZSA9IHRsO1xyXG5cdFx0XHRsdHJlZV9pbmRleCA9IHRsX2luZGV4O1xyXG5cdFx0XHRkdHJlZSA9IHRkO1xyXG5cdFx0XHRkdHJlZV9pbmRleCA9IHRkX2luZGV4O1xyXG5cdFx0XHR0cmVlID0gbnVsbDtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhhdC5wcm9jID0gZnVuY3Rpb24ocywgeiwgcikge1xyXG5cdFx0XHR2YXIgajsgLy8gdGVtcG9yYXJ5IHN0b3JhZ2VcclxuXHRcdFx0dmFyIHRpbmRleDsgLy8gdGVtcG9yYXJ5IHBvaW50ZXJcclxuXHRcdFx0dmFyIGU7IC8vIGV4dHJhIGJpdHMgb3Igb3BlcmF0aW9uXHJcblx0XHRcdHZhciBiID0gMDsgLy8gYml0IGJ1ZmZlclxyXG5cdFx0XHR2YXIgayA9IDA7IC8vIGJpdHMgaW4gYml0IGJ1ZmZlclxyXG5cdFx0XHR2YXIgcCA9IDA7IC8vIGlucHV0IGRhdGEgcG9pbnRlclxyXG5cdFx0XHR2YXIgbjsgLy8gYnl0ZXMgYXZhaWxhYmxlIHRoZXJlXHJcblx0XHRcdHZhciBxOyAvLyBvdXRwdXQgd2luZG93IHdyaXRlIHBvaW50ZXJcclxuXHRcdFx0dmFyIG07IC8vIGJ5dGVzIHRvIGVuZCBvZiB3aW5kb3cgb3IgcmVhZCBwb2ludGVyXHJcblx0XHRcdHZhciBmOyAvLyBwb2ludGVyIHRvIGNvcHkgc3RyaW5ncyBmcm9tXHJcblxyXG5cdFx0XHQvLyBjb3B5IGlucHV0L291dHB1dCBpbmZvcm1hdGlvbiB0byBsb2NhbHMgKFVQREFURSBtYWNybyByZXN0b3JlcylcclxuXHRcdFx0cCA9IHoubmV4dF9pbl9pbmRleDtcclxuXHRcdFx0biA9IHouYXZhaWxfaW47XHJcblx0XHRcdGIgPSBzLmJpdGI7XHJcblx0XHRcdGsgPSBzLmJpdGs7XHJcblx0XHRcdHEgPSBzLndyaXRlO1xyXG5cdFx0XHRtID0gcSA8IHMucmVhZCA/IHMucmVhZCAtIHEgLSAxIDogcy5lbmQgLSBxO1xyXG5cclxuXHRcdFx0Ly8gcHJvY2VzcyBpbnB1dCBhbmQgb3V0cHV0IGJhc2VkIG9uIGN1cnJlbnQgc3RhdGVcclxuXHRcdFx0d2hpbGUgKHRydWUpIHtcclxuXHRcdFx0XHRzd2l0Y2ggKG1vZGUpIHtcclxuXHRcdFx0XHQvLyB3YWl0aW5nIGZvciBcImk6XCI9aW5wdXQsIFwibzpcIj1vdXRwdXQsIFwieDpcIj1ub3RoaW5nXHJcblx0XHRcdFx0Y2FzZSBTVEFSVDogLy8geDogc2V0IHVwIGZvciBMRU5cclxuXHRcdFx0XHRcdGlmIChtID49IDI1OCAmJiBuID49IDEwKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRzLmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHRzLmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0XHRzLndyaXRlID0gcTtcclxuXHRcdFx0XHRcdFx0ciA9IGluZmxhdGVfZmFzdChsYml0cywgZGJpdHMsIGx0cmVlLCBsdHJlZV9pbmRleCwgZHRyZWUsIGR0cmVlX2luZGV4LCBzLCB6KTtcclxuXHJcblx0XHRcdFx0XHRcdHAgPSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHRcdG4gPSB6LmF2YWlsX2luO1xyXG5cdFx0XHRcdFx0XHRiID0gcy5iaXRiO1xyXG5cdFx0XHRcdFx0XHRrID0gcy5iaXRrO1xyXG5cdFx0XHRcdFx0XHRxID0gcy53cml0ZTtcclxuXHRcdFx0XHRcdFx0bSA9IHEgPCBzLnJlYWQgPyBzLnJlYWQgLSBxIC0gMSA6IHMuZW5kIC0gcTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChyICE9IFpfT0spIHtcclxuXHRcdFx0XHRcdFx0XHRtb2RlID0gciA9PSBaX1NUUkVBTV9FTkQgPyBXQVNIIDogQkFEQ09ERTtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bmVlZCA9IGxiaXRzO1xyXG5cdFx0XHRcdFx0dHJlZSA9IGx0cmVlO1xyXG5cdFx0XHRcdFx0dHJlZV9pbmRleCA9IGx0cmVlX2luZGV4O1xyXG5cclxuXHRcdFx0XHRcdG1vZGUgPSBMRU47XHJcblx0XHRcdFx0Y2FzZSBMRU46IC8vIGk6IGdldCBsZW5ndGgvbGl0ZXJhbC9lb2IgbmV4dFxyXG5cdFx0XHRcdFx0aiA9IG5lZWQ7XHJcblxyXG5cdFx0XHRcdFx0d2hpbGUgKGsgPCAoaikpIHtcclxuXHRcdFx0XHRcdFx0aWYgKG4gIT09IDApXHJcblx0XHRcdFx0XHRcdFx0ciA9IFpfT0s7XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzLmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHRcdHMuYml0ayA9IGs7XHJcblx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XHJcblx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRcdFx0cy53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHMuaW5mbGF0ZV9mbHVzaCh6LCByKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRuLS07XHJcblx0XHRcdFx0XHRcdGIgfD0gKHoucmVhZF9ieXRlKHArKykgJiAweGZmKSA8PCBrO1xyXG5cdFx0XHRcdFx0XHRrICs9IDg7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGluZGV4ID0gKHRyZWVfaW5kZXggKyAoYiAmIGluZmxhdGVfbWFza1tqXSkpICogMztcclxuXHJcblx0XHRcdFx0XHRiID4+Pj0gKHRyZWVbdGluZGV4ICsgMV0pO1xyXG5cdFx0XHRcdFx0ayAtPSAodHJlZVt0aW5kZXggKyAxXSk7XHJcblxyXG5cdFx0XHRcdFx0ZSA9IHRyZWVbdGluZGV4XTtcclxuXHJcblx0XHRcdFx0XHRpZiAoZSA9PT0gMCkgeyAvLyBsaXRlcmFsXHJcblx0XHRcdFx0XHRcdGxpdCA9IHRyZWVbdGluZGV4ICsgMl07XHJcblx0XHRcdFx0XHRcdG1vZGUgPSBMSVQ7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKChlICYgMTYpICE9PSAwKSB7IC8vIGxlbmd0aFxyXG5cdFx0XHRcdFx0XHRnZXQgPSBlICYgMTU7XHJcblx0XHRcdFx0XHRcdGxlbiA9IHRyZWVbdGluZGV4ICsgMl07XHJcblx0XHRcdFx0XHRcdG1vZGUgPSBMRU5FWFQ7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKChlICYgNjQpID09PSAwKSB7IC8vIG5leHQgdGFibGVcclxuXHRcdFx0XHRcdFx0bmVlZCA9IGU7XHJcblx0XHRcdFx0XHRcdHRyZWVfaW5kZXggPSB0aW5kZXggLyAzICsgdHJlZVt0aW5kZXggKyAyXTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoKGUgJiAzMikgIT09IDApIHsgLy8gZW5kIG9mIGJsb2NrXHJcblx0XHRcdFx0XHRcdG1vZGUgPSBXQVNIO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdG1vZGUgPSBCQURDT0RFOyAvLyBpbnZhbGlkIGNvZGVcclxuXHRcdFx0XHRcdHoubXNnID0gXCJpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGVcIjtcclxuXHRcdFx0XHRcdHIgPSBaX0RBVEFfRVJST1I7XHJcblxyXG5cdFx0XHRcdFx0cy5iaXRiID0gYjtcclxuXHRcdFx0XHRcdHMuYml0ayA9IGs7XHJcblx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcclxuXHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRzLndyaXRlID0gcTtcclxuXHRcdFx0XHRcdHJldHVybiBzLmluZmxhdGVfZmx1c2goeiwgcik7XHJcblxyXG5cdFx0XHRcdGNhc2UgTEVORVhUOiAvLyBpOiBnZXR0aW5nIGxlbmd0aCBleHRyYSAoaGF2ZSBiYXNlKVxyXG5cdFx0XHRcdFx0aiA9IGdldDtcclxuXHJcblx0XHRcdFx0XHR3aGlsZSAoayA8IChqKSkge1xyXG5cdFx0XHRcdFx0XHRpZiAobiAhPT0gMClcclxuXHRcdFx0XHRcdFx0XHRyID0gWl9PSztcclxuXHRcdFx0XHRcdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHMuYml0YiA9IGI7XHJcblx0XHRcdFx0XHRcdFx0cy5iaXRrID0gaztcclxuXHRcdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcclxuXHRcdFx0XHRcdFx0XHRzLndyaXRlID0gcTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcy5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdG4tLTtcclxuXHRcdFx0XHRcdFx0YiB8PSAoei5yZWFkX2J5dGUocCsrKSAmIDB4ZmYpIDw8IGs7XHJcblx0XHRcdFx0XHRcdGsgKz0gODtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRsZW4gKz0gKGIgJiBpbmZsYXRlX21hc2tbal0pO1xyXG5cclxuXHRcdFx0XHRcdGIgPj49IGo7XHJcblx0XHRcdFx0XHRrIC09IGo7XHJcblxyXG5cdFx0XHRcdFx0bmVlZCA9IGRiaXRzO1xyXG5cdFx0XHRcdFx0dHJlZSA9IGR0cmVlO1xyXG5cdFx0XHRcdFx0dHJlZV9pbmRleCA9IGR0cmVlX2luZGV4O1xyXG5cdFx0XHRcdFx0bW9kZSA9IERJU1Q7XHJcblx0XHRcdFx0Y2FzZSBESVNUOiAvLyBpOiBnZXQgZGlzdGFuY2UgbmV4dFxyXG5cdFx0XHRcdFx0aiA9IG5lZWQ7XHJcblxyXG5cdFx0XHRcdFx0d2hpbGUgKGsgPCAoaikpIHtcclxuXHRcdFx0XHRcdFx0aWYgKG4gIT09IDApXHJcblx0XHRcdFx0XHRcdFx0ciA9IFpfT0s7XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzLmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHRcdHMuYml0ayA9IGs7XHJcblx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XHJcblx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRcdFx0cy53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHMuaW5mbGF0ZV9mbHVzaCh6LCByKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRuLS07XHJcblx0XHRcdFx0XHRcdGIgfD0gKHoucmVhZF9ieXRlKHArKykgJiAweGZmKSA8PCBrO1xyXG5cdFx0XHRcdFx0XHRrICs9IDg7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGluZGV4ID0gKHRyZWVfaW5kZXggKyAoYiAmIGluZmxhdGVfbWFza1tqXSkpICogMztcclxuXHJcblx0XHRcdFx0XHRiID4+PSB0cmVlW3RpbmRleCArIDFdO1xyXG5cdFx0XHRcdFx0ayAtPSB0cmVlW3RpbmRleCArIDFdO1xyXG5cclxuXHRcdFx0XHRcdGUgPSAodHJlZVt0aW5kZXhdKTtcclxuXHRcdFx0XHRcdGlmICgoZSAmIDE2KSAhPT0gMCkgeyAvLyBkaXN0YW5jZVxyXG5cdFx0XHRcdFx0XHRnZXQgPSBlICYgMTU7XHJcblx0XHRcdFx0XHRcdGRpc3QgPSB0cmVlW3RpbmRleCArIDJdO1xyXG5cdFx0XHRcdFx0XHRtb2RlID0gRElTVEVYVDtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoKGUgJiA2NCkgPT09IDApIHsgLy8gbmV4dCB0YWJsZVxyXG5cdFx0XHRcdFx0XHRuZWVkID0gZTtcclxuXHRcdFx0XHRcdFx0dHJlZV9pbmRleCA9IHRpbmRleCAvIDMgKyB0cmVlW3RpbmRleCArIDJdO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdG1vZGUgPSBCQURDT0RFOyAvLyBpbnZhbGlkIGNvZGVcclxuXHRcdFx0XHRcdHoubXNnID0gXCJpbnZhbGlkIGRpc3RhbmNlIGNvZGVcIjtcclxuXHRcdFx0XHRcdHIgPSBaX0RBVEFfRVJST1I7XHJcblxyXG5cdFx0XHRcdFx0cy5iaXRiID0gYjtcclxuXHRcdFx0XHRcdHMuYml0ayA9IGs7XHJcblx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcclxuXHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRzLndyaXRlID0gcTtcclxuXHRcdFx0XHRcdHJldHVybiBzLmluZmxhdGVfZmx1c2goeiwgcik7XHJcblxyXG5cdFx0XHRcdGNhc2UgRElTVEVYVDogLy8gaTogZ2V0dGluZyBkaXN0YW5jZSBleHRyYVxyXG5cdFx0XHRcdFx0aiA9IGdldDtcclxuXHJcblx0XHRcdFx0XHR3aGlsZSAoayA8IChqKSkge1xyXG5cdFx0XHRcdFx0XHRpZiAobiAhPT0gMClcclxuXHRcdFx0XHRcdFx0XHRyID0gWl9PSztcclxuXHRcdFx0XHRcdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHMuYml0YiA9IGI7XHJcblx0XHRcdFx0XHRcdFx0cy5iaXRrID0gaztcclxuXHRcdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcclxuXHRcdFx0XHRcdFx0XHRzLndyaXRlID0gcTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcy5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdG4tLTtcclxuXHRcdFx0XHRcdFx0YiB8PSAoei5yZWFkX2J5dGUocCsrKSAmIDB4ZmYpIDw8IGs7XHJcblx0XHRcdFx0XHRcdGsgKz0gODtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRkaXN0ICs9IChiICYgaW5mbGF0ZV9tYXNrW2pdKTtcclxuXHJcblx0XHRcdFx0XHRiID4+PSBqO1xyXG5cdFx0XHRcdFx0ayAtPSBqO1xyXG5cclxuXHRcdFx0XHRcdG1vZGUgPSBDT1BZO1xyXG5cdFx0XHRcdGNhc2UgQ09QWTogLy8gbzogY29weWluZyBieXRlcyBpbiB3aW5kb3csIHdhaXRpbmcgZm9yIHNwYWNlXHJcblx0XHRcdFx0XHRmID0gcSAtIGRpc3Q7XHJcblx0XHRcdFx0XHR3aGlsZSAoZiA8IDApIHsgLy8gbW9kdWxvIHdpbmRvdyBzaXplLVwid2hpbGVcIiBpbnN0ZWFkXHJcblx0XHRcdFx0XHRcdGYgKz0gcy5lbmQ7IC8vIG9mIFwiaWZcIiBoYW5kbGVzIGludmFsaWQgZGlzdGFuY2VzXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR3aGlsZSAobGVuICE9PSAwKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAobSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChxID09IHMuZW5kICYmIHMucmVhZCAhPT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cSA9IDA7XHJcblx0XHRcdFx0XHRcdFx0XHRtID0gcSA8IHMucmVhZCA/IHMucmVhZCAtIHEgLSAxIDogcy5lbmQgLSBxO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRpZiAobSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cy53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRcdFx0XHRyID0gcy5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0cSA9IHMud3JpdGU7XHJcblx0XHRcdFx0XHRcdFx0XHRtID0gcSA8IHMucmVhZCA/IHMucmVhZCAtIHEgLSAxIDogcy5lbmQgLSBxO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChxID09IHMuZW5kICYmIHMucmVhZCAhPT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRxID0gMDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bSA9IHEgPCBzLnJlYWQgPyBzLnJlYWQgLSBxIC0gMSA6IHMuZW5kIC0gcTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAobSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzLmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzLmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzLndyaXRlID0gcTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHMuaW5mbGF0ZV9mbHVzaCh6LCByKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHMud2luZG93W3ErK10gPSBzLndpbmRvd1tmKytdO1xyXG5cdFx0XHRcdFx0XHRtLS07XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZiA9PSBzLmVuZClcclxuXHRcdFx0XHRcdFx0XHRmID0gMDtcclxuXHRcdFx0XHRcdFx0bGVuLS07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRtb2RlID0gU1RBUlQ7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIExJVDogLy8gbzogZ290IGxpdGVyYWwsIHdhaXRpbmcgZm9yIG91dHB1dCBzcGFjZVxyXG5cdFx0XHRcdFx0aWYgKG0gPT09IDApIHtcclxuXHRcdFx0XHRcdFx0aWYgKHEgPT0gcy5lbmQgJiYgcy5yZWFkICE9PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0cSA9IDA7XHJcblx0XHRcdFx0XHRcdFx0bSA9IHEgPCBzLnJlYWQgPyBzLnJlYWQgLSBxIC0gMSA6IHMuZW5kIC0gcTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAobSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHMud3JpdGUgPSBxO1xyXG5cdFx0XHRcdFx0XHRcdHIgPSBzLmluZmxhdGVfZmx1c2goeiwgcik7XHJcblx0XHRcdFx0XHRcdFx0cSA9IHMud3JpdGU7XHJcblx0XHRcdFx0XHRcdFx0bSA9IHEgPCBzLnJlYWQgPyBzLnJlYWQgLSBxIC0gMSA6IHMuZW5kIC0gcTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKHEgPT0gcy5lbmQgJiYgcy5yZWFkICE9PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRxID0gMDtcclxuXHRcdFx0XHRcdFx0XHRcdG0gPSBxIDwgcy5yZWFkID8gcy5yZWFkIC0gcSAtIDEgOiBzLmVuZCAtIHE7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGlmIChtID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzLmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHRcdFx0cy5iaXRrID0gaztcclxuXHRcdFx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xyXG5cdFx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcclxuXHRcdFx0XHRcdFx0XHRcdHMud3JpdGUgPSBxO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHMuaW5mbGF0ZV9mbHVzaCh6LCByKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHIgPSBaX09LO1xyXG5cclxuXHRcdFx0XHRcdHMud2luZG93W3ErK10gPSAvKiAoYnl0ZSkgKi9saXQ7XHJcblx0XHRcdFx0XHRtLS07XHJcblxyXG5cdFx0XHRcdFx0bW9kZSA9IFNUQVJUO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBXQVNIOiAvLyBvOiBnb3QgZW9iLCBwb3NzaWJseSBtb3JlIG91dHB1dFxyXG5cdFx0XHRcdFx0aWYgKGsgPiA3KSB7IC8vIHJldHVybiB1bnVzZWQgYnl0ZSwgaWYgYW55XHJcblx0XHRcdFx0XHRcdGsgLT0gODtcclxuXHRcdFx0XHRcdFx0bisrO1xyXG5cdFx0XHRcdFx0XHRwLS07IC8vIGNhbiBhbHdheXMgcmV0dXJuIG9uZVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHMud3JpdGUgPSBxO1xyXG5cdFx0XHRcdFx0ciA9IHMuaW5mbGF0ZV9mbHVzaCh6LCByKTtcclxuXHRcdFx0XHRcdHEgPSBzLndyaXRlO1xyXG5cdFx0XHRcdFx0bSA9IHEgPCBzLnJlYWQgPyBzLnJlYWQgLSBxIC0gMSA6IHMuZW5kIC0gcTtcclxuXHJcblx0XHRcdFx0XHRpZiAocy5yZWFkICE9IHMud3JpdGUpIHtcclxuXHRcdFx0XHRcdFx0cy5iaXRiID0gYjtcclxuXHRcdFx0XHRcdFx0cy5iaXRrID0gaztcclxuXHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XHJcblx0XHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcclxuXHRcdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcclxuXHRcdFx0XHRcdFx0cy53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRcdHJldHVybiBzLmluZmxhdGVfZmx1c2goeiwgcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRtb2RlID0gRU5EO1xyXG5cdFx0XHRcdGNhc2UgRU5EOlxyXG5cdFx0XHRcdFx0ciA9IFpfU1RSRUFNX0VORDtcclxuXHRcdFx0XHRcdHMuYml0YiA9IGI7XHJcblx0XHRcdFx0XHRzLmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XHJcblx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0cy53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRyZXR1cm4gcy5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cclxuXHRcdFx0XHRjYXNlIEJBRENPREU6IC8vIHg6IGdvdCBlcnJvclxyXG5cclxuXHRcdFx0XHRcdHIgPSBaX0RBVEFfRVJST1I7XHJcblxyXG5cdFx0XHRcdFx0cy5iaXRiID0gYjtcclxuXHRcdFx0XHRcdHMuYml0ayA9IGs7XHJcblx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcclxuXHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRzLndyaXRlID0gcTtcclxuXHRcdFx0XHRcdHJldHVybiBzLmluZmxhdGVfZmx1c2goeiwgcik7XHJcblxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyID0gWl9TVFJFQU1fRVJST1I7XHJcblxyXG5cdFx0XHRcdFx0cy5iaXRiID0gYjtcclxuXHRcdFx0XHRcdHMuYml0ayA9IGs7XHJcblx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcclxuXHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRzLndyaXRlID0gcTtcclxuXHRcdFx0XHRcdHJldHVybiBzLmluZmxhdGVfZmx1c2goeiwgcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoYXQuZnJlZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBaRlJFRSh6LCBjKTtcclxuXHRcdH07XHJcblxyXG5cdH1cclxuXHJcblx0Ly8gSW5mQmxvY2tzXHJcblxyXG5cdC8vIFRhYmxlIGZvciBkZWZsYXRlIGZyb20gUEtaSVAncyBhcHBub3RlLnR4dC5cclxuXHR2YXIgYm9yZGVyID0gWyAvLyBPcmRlciBvZiB0aGUgYml0IGxlbmd0aCBjb2RlIGxlbmd0aHNcclxuXHQxNiwgMTcsIDE4LCAwLCA4LCA3LCA5LCA2LCAxMCwgNSwgMTEsIDQsIDEyLCAzLCAxMywgMiwgMTQsIDEsIDE1IF07XHJcblxyXG5cdHZhciBUWVBFID0gMDsgLy8gZ2V0IHR5cGUgYml0cyAoMywgaW5jbHVkaW5nIGVuZCBiaXQpXHJcblx0dmFyIExFTlMgPSAxOyAvLyBnZXQgbGVuZ3RocyBmb3Igc3RvcmVkXHJcblx0dmFyIFNUT1JFRCA9IDI7Ly8gcHJvY2Vzc2luZyBzdG9yZWQgYmxvY2tcclxuXHR2YXIgVEFCTEUgPSAzOyAvLyBnZXQgdGFibGUgbGVuZ3Roc1xyXG5cdHZhciBCVFJFRSA9IDQ7IC8vIGdldCBiaXQgbGVuZ3RocyB0cmVlIGZvciBhIGR5bmFtaWNcclxuXHQvLyBibG9ja1xyXG5cdHZhciBEVFJFRSA9IDU7IC8vIGdldCBsZW5ndGgsIGRpc3RhbmNlIHRyZWVzIGZvciBhXHJcblx0Ly8gZHluYW1pYyBibG9ja1xyXG5cdHZhciBDT0RFUyA9IDY7IC8vIHByb2Nlc3NpbmcgZml4ZWQgb3IgZHluYW1pYyBibG9ja1xyXG5cdHZhciBEUlkgPSA3OyAvLyBvdXRwdXQgcmVtYWluaW5nIHdpbmRvdyBieXRlc1xyXG5cdHZhciBET05FTE9DS1MgPSA4OyAvLyBmaW5pc2hlZCBsYXN0IGJsb2NrLCBkb25lXHJcblx0dmFyIEJBREJMT0NLUyA9IDk7IC8vIG90IGEgZGF0YSBlcnJvci0tc3R1Y2sgaGVyZVxyXG5cclxuXHRmdW5jdGlvbiBJbmZCbG9ja3Moeiwgdykge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdHZhciBtb2RlID0gVFlQRTsgLy8gY3VycmVudCBpbmZsYXRlX2Jsb2NrIG1vZGVcclxuXHJcblx0XHR2YXIgbGVmdCA9IDA7IC8vIGlmIFNUT1JFRCwgYnl0ZXMgbGVmdCB0byBjb3B5XHJcblxyXG5cdFx0dmFyIHRhYmxlID0gMDsgLy8gdGFibGUgbGVuZ3RocyAoMTQgYml0cylcclxuXHRcdHZhciBpbmRleCA9IDA7IC8vIGluZGV4IGludG8gYmxlbnMgKG9yIGJvcmRlcilcclxuXHRcdHZhciBibGVuczsgLy8gYml0IGxlbmd0aHMgb2YgY29kZXNcclxuXHRcdHZhciBiYiA9IFsgMCBdOyAvLyBiaXQgbGVuZ3RoIHRyZWUgZGVwdGhcclxuXHRcdHZhciB0YiA9IFsgMCBdOyAvLyBiaXQgbGVuZ3RoIGRlY29kaW5nIHRyZWVcclxuXHJcblx0XHR2YXIgY29kZXMgPSBuZXcgSW5mQ29kZXMoKTsgLy8gaWYgQ09ERVMsIGN1cnJlbnQgc3RhdGVcclxuXHJcblx0XHR2YXIgbGFzdCA9IDA7IC8vIHRydWUgaWYgdGhpcyBibG9jayBpcyB0aGUgbGFzdCBibG9ja1xyXG5cclxuXHRcdHZhciBodWZ0cyA9IG5ldyBJbnQzMkFycmF5KE1BTlkgKiAzKTsgLy8gc2luZ2xlIG1hbGxvYyBmb3IgdHJlZSBzcGFjZVxyXG5cdFx0dmFyIGNoZWNrID0gMDsgLy8gY2hlY2sgb24gb3V0cHV0XHJcblx0XHR2YXIgaW5mdHJlZSA9IG5ldyBJbmZUcmVlKCk7XHJcblxyXG5cdFx0dGhhdC5iaXRrID0gMDsgLy8gYml0cyBpbiBiaXQgYnVmZmVyXHJcblx0XHR0aGF0LmJpdGIgPSAwOyAvLyBiaXQgYnVmZmVyXHJcblx0XHR0aGF0LndpbmRvdyA9IG5ldyBVaW50OEFycmF5KHcpOyAvLyBzbGlkaW5nIHdpbmRvd1xyXG5cdFx0dGhhdC5lbmQgPSB3OyAvLyBvbmUgYnl0ZSBhZnRlciBzbGlkaW5nIHdpbmRvd1xyXG5cdFx0dGhhdC5yZWFkID0gMDsgLy8gd2luZG93IHJlYWQgcG9pbnRlclxyXG5cdFx0dGhhdC53cml0ZSA9IDA7IC8vIHdpbmRvdyB3cml0ZSBwb2ludGVyXHJcblxyXG5cdFx0dGhhdC5yZXNldCA9IGZ1bmN0aW9uKHosIGMpIHtcclxuXHRcdFx0aWYgKGMpXHJcblx0XHRcdFx0Y1swXSA9IGNoZWNrO1xyXG5cdFx0XHQvLyBpZiAobW9kZSA9PSBCVFJFRSB8fCBtb2RlID09IERUUkVFKSB7XHJcblx0XHRcdC8vIH1cclxuXHRcdFx0aWYgKG1vZGUgPT0gQ09ERVMpIHtcclxuXHRcdFx0XHRjb2Rlcy5mcmVlKHopO1xyXG5cdFx0XHR9XHJcblx0XHRcdG1vZGUgPSBUWVBFO1xyXG5cdFx0XHR0aGF0LmJpdGsgPSAwO1xyXG5cdFx0XHR0aGF0LmJpdGIgPSAwO1xyXG5cdFx0XHR0aGF0LnJlYWQgPSB0aGF0LndyaXRlID0gMDtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhhdC5yZXNldCh6LCBudWxsKTtcclxuXHJcblx0XHQvLyBjb3B5IGFzIG11Y2ggYXMgcG9zc2libGUgZnJvbSB0aGUgc2xpZGluZyB3aW5kb3cgdG8gdGhlIG91dHB1dCBhcmVhXHJcblx0XHR0aGF0LmluZmxhdGVfZmx1c2ggPSBmdW5jdGlvbih6LCByKSB7XHJcblx0XHRcdHZhciBuO1xyXG5cdFx0XHR2YXIgcDtcclxuXHRcdFx0dmFyIHE7XHJcblxyXG5cdFx0XHQvLyBsb2NhbCBjb3BpZXMgb2Ygc291cmNlIGFuZCBkZXN0aW5hdGlvbiBwb2ludGVyc1xyXG5cdFx0XHRwID0gei5uZXh0X291dF9pbmRleDtcclxuXHRcdFx0cSA9IHRoYXQucmVhZDtcclxuXHJcblx0XHRcdC8vIGNvbXB1dGUgbnVtYmVyIG9mIGJ5dGVzIHRvIGNvcHkgYXMgZmFyIGFzIGVuZCBvZiB3aW5kb3dcclxuXHRcdFx0biA9IC8qIChpbnQpICovKChxIDw9IHRoYXQud3JpdGUgPyB0aGF0LndyaXRlIDogdGhhdC5lbmQpIC0gcSk7XHJcblx0XHRcdGlmIChuID4gei5hdmFpbF9vdXQpXHJcblx0XHRcdFx0biA9IHouYXZhaWxfb3V0O1xyXG5cdFx0XHRpZiAobiAhPT0gMCAmJiByID09IFpfQlVGX0VSUk9SKVxyXG5cdFx0XHRcdHIgPSBaX09LO1xyXG5cclxuXHRcdFx0Ly8gdXBkYXRlIGNvdW50ZXJzXHJcblx0XHRcdHouYXZhaWxfb3V0IC09IG47XHJcblx0XHRcdHoudG90YWxfb3V0ICs9IG47XHJcblxyXG5cdFx0XHQvLyBjb3B5IGFzIGZhciBhcyBlbmQgb2Ygd2luZG93XHJcblx0XHRcdHoubmV4dF9vdXQuc2V0KHRoYXQud2luZG93LnN1YmFycmF5KHEsIHEgKyBuKSwgcCk7XHJcblx0XHRcdHAgKz0gbjtcclxuXHRcdFx0cSArPSBuO1xyXG5cclxuXHRcdFx0Ly8gc2VlIGlmIG1vcmUgdG8gY29weSBhdCBiZWdpbm5pbmcgb2Ygd2luZG93XHJcblx0XHRcdGlmIChxID09IHRoYXQuZW5kKSB7XHJcblx0XHRcdFx0Ly8gd3JhcCBwb2ludGVyc1xyXG5cdFx0XHRcdHEgPSAwO1xyXG5cdFx0XHRcdGlmICh0aGF0LndyaXRlID09IHRoYXQuZW5kKVxyXG5cdFx0XHRcdFx0dGhhdC53cml0ZSA9IDA7XHJcblxyXG5cdFx0XHRcdC8vIGNvbXB1dGUgYnl0ZXMgdG8gY29weVxyXG5cdFx0XHRcdG4gPSB0aGF0LndyaXRlIC0gcTtcclxuXHRcdFx0XHRpZiAobiA+IHouYXZhaWxfb3V0KVxyXG5cdFx0XHRcdFx0biA9IHouYXZhaWxfb3V0O1xyXG5cdFx0XHRcdGlmIChuICE9PSAwICYmIHIgPT0gWl9CVUZfRVJST1IpXHJcblx0XHRcdFx0XHRyID0gWl9PSztcclxuXHJcblx0XHRcdFx0Ly8gdXBkYXRlIGNvdW50ZXJzXHJcblx0XHRcdFx0ei5hdmFpbF9vdXQgLT0gbjtcclxuXHRcdFx0XHR6LnRvdGFsX291dCArPSBuO1xyXG5cclxuXHRcdFx0XHQvLyBjb3B5XHJcblx0XHRcdFx0ei5uZXh0X291dC5zZXQodGhhdC53aW5kb3cuc3ViYXJyYXkocSwgcSArIG4pLCBwKTtcclxuXHRcdFx0XHRwICs9IG47XHJcblx0XHRcdFx0cSArPSBuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyB1cGRhdGUgcG9pbnRlcnNcclxuXHRcdFx0ei5uZXh0X291dF9pbmRleCA9IHA7XHJcblx0XHRcdHRoYXQucmVhZCA9IHE7XHJcblxyXG5cdFx0XHQvLyBkb25lXHJcblx0XHRcdHJldHVybiByO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGF0LnByb2MgPSBmdW5jdGlvbih6LCByKSB7XHJcblx0XHRcdHZhciB0OyAvLyB0ZW1wb3Jhcnkgc3RvcmFnZVxyXG5cdFx0XHR2YXIgYjsgLy8gYml0IGJ1ZmZlclxyXG5cdFx0XHR2YXIgazsgLy8gYml0cyBpbiBiaXQgYnVmZmVyXHJcblx0XHRcdHZhciBwOyAvLyBpbnB1dCBkYXRhIHBvaW50ZXJcclxuXHRcdFx0dmFyIG47IC8vIGJ5dGVzIGF2YWlsYWJsZSB0aGVyZVxyXG5cdFx0XHR2YXIgcTsgLy8gb3V0cHV0IHdpbmRvdyB3cml0ZSBwb2ludGVyXHJcblx0XHRcdHZhciBtOyAvLyBieXRlcyB0byBlbmQgb2Ygd2luZG93IG9yIHJlYWQgcG9pbnRlclxyXG5cclxuXHRcdFx0dmFyIGk7XHJcblxyXG5cdFx0XHQvLyBjb3B5IGlucHV0L291dHB1dCBpbmZvcm1hdGlvbiB0byBsb2NhbHMgKFVQREFURSBtYWNybyByZXN0b3JlcylcclxuXHRcdFx0Ly8ge1xyXG5cdFx0XHRwID0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRuID0gei5hdmFpbF9pbjtcclxuXHRcdFx0YiA9IHRoYXQuYml0YjtcclxuXHRcdFx0ayA9IHRoYXQuYml0aztcclxuXHRcdFx0Ly8gfVxyXG5cdFx0XHQvLyB7XHJcblx0XHRcdHEgPSB0aGF0LndyaXRlO1xyXG5cdFx0XHRtID0gLyogKGludCkgKi8ocSA8IHRoYXQucmVhZCA/IHRoYXQucmVhZCAtIHEgLSAxIDogdGhhdC5lbmQgLSBxKTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0Ly8gcHJvY2VzcyBpbnB1dCBiYXNlZCBvbiBjdXJyZW50IHN0YXRlXHJcblx0XHRcdC8vIERFQlVHIGR0cmVlXHJcblx0XHRcdHdoaWxlICh0cnVlKSB7XHJcblx0XHRcdFx0c3dpdGNoIChtb2RlKSB7XHJcblx0XHRcdFx0Y2FzZSBUWVBFOlxyXG5cclxuXHRcdFx0XHRcdHdoaWxlIChrIDwgKDMpKSB7XHJcblx0XHRcdFx0XHRcdGlmIChuICE9PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0ciA9IFpfT0s7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGhhdC5iaXRiID0gYjtcclxuXHRcdFx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xyXG5cdFx0XHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcclxuXHRcdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGF0LmluZmxhdGVfZmx1c2goeiwgcik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0bi0tO1xyXG5cdFx0XHRcdFx0XHRiIHw9ICh6LnJlYWRfYnl0ZShwKyspICYgMHhmZikgPDwgaztcclxuXHRcdFx0XHRcdFx0ayArPSA4O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dCA9IC8qIChpbnQpICovKGIgJiA3KTtcclxuXHRcdFx0XHRcdGxhc3QgPSB0ICYgMTtcclxuXHJcblx0XHRcdFx0XHRzd2l0Y2ggKHQgPj4+IDEpIHtcclxuXHRcdFx0XHRcdGNhc2UgMDogLy8gc3RvcmVkXHJcblx0XHRcdFx0XHRcdC8vIHtcclxuXHRcdFx0XHRcdFx0YiA+Pj49ICgzKTtcclxuXHRcdFx0XHRcdFx0ayAtPSAoMyk7XHJcblx0XHRcdFx0XHRcdC8vIH1cclxuXHRcdFx0XHRcdFx0dCA9IGsgJiA3OyAvLyBnbyB0byBieXRlIGJvdW5kYXJ5XHJcblxyXG5cdFx0XHRcdFx0XHQvLyB7XHJcblx0XHRcdFx0XHRcdGIgPj4+PSAodCk7XHJcblx0XHRcdFx0XHRcdGsgLT0gKHQpO1xyXG5cdFx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0XHRcdG1vZGUgPSBMRU5TOyAvLyBnZXQgbGVuZ3RoIG9mIHN0b3JlZCBibG9ja1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgMTogLy8gZml4ZWRcclxuXHRcdFx0XHRcdFx0Ly8ge1xyXG5cdFx0XHRcdFx0XHR2YXIgYmwgPSBbXTsgLy8gbmV3IEFycmF5KDEpO1xyXG5cdFx0XHRcdFx0XHR2YXIgYmQgPSBbXTsgLy8gbmV3IEFycmF5KDEpO1xyXG5cdFx0XHRcdFx0XHR2YXIgdGwgPSBbIFtdIF07IC8vIG5ldyBBcnJheSgxKTtcclxuXHRcdFx0XHRcdFx0dmFyIHRkID0gWyBbXSBdOyAvLyBuZXcgQXJyYXkoMSk7XHJcblxyXG5cdFx0XHRcdFx0XHRJbmZUcmVlLmluZmxhdGVfdHJlZXNfZml4ZWQoYmwsIGJkLCB0bCwgdGQpO1xyXG5cdFx0XHRcdFx0XHRjb2Rlcy5pbml0KGJsWzBdLCBiZFswXSwgdGxbMF0sIDAsIHRkWzBdLCAwKTtcclxuXHRcdFx0XHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0XHRcdFx0Ly8ge1xyXG5cdFx0XHRcdFx0XHRiID4+Pj0gKDMpO1xyXG5cdFx0XHRcdFx0XHRrIC09ICgzKTtcclxuXHRcdFx0XHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0XHRcdFx0bW9kZSA9IENPREVTO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgMjogLy8gZHluYW1pY1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8ge1xyXG5cdFx0XHRcdFx0XHRiID4+Pj0gKDMpO1xyXG5cdFx0XHRcdFx0XHRrIC09ICgzKTtcclxuXHRcdFx0XHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0XHRcdFx0bW9kZSA9IFRBQkxFO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgMzogLy8gaWxsZWdhbFxyXG5cclxuXHRcdFx0XHRcdFx0Ly8ge1xyXG5cdFx0XHRcdFx0XHRiID4+Pj0gKDMpO1xyXG5cdFx0XHRcdFx0XHRrIC09ICgzKTtcclxuXHRcdFx0XHRcdFx0Ly8gfVxyXG5cdFx0XHRcdFx0XHRtb2RlID0gQkFEQkxPQ0tTO1xyXG5cdFx0XHRcdFx0XHR6Lm1zZyA9IFwiaW52YWxpZCBibG9jayB0eXBlXCI7XHJcblx0XHRcdFx0XHRcdHIgPSBaX0RBVEFfRVJST1I7XHJcblxyXG5cdFx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0XHR0aGF0LndyaXRlID0gcTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgTEVOUzpcclxuXHJcblx0XHRcdFx0XHR3aGlsZSAoayA8ICgzMikpIHtcclxuXHRcdFx0XHRcdFx0aWYgKG4gIT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRyID0gWl9PSztcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XHJcblx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XHJcblx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRuLS07XHJcblx0XHRcdFx0XHRcdGIgfD0gKHoucmVhZF9ieXRlKHArKykgJiAweGZmKSA8PCBrO1xyXG5cdFx0XHRcdFx0XHRrICs9IDg7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKCgoKH5iKSA+Pj4gMTYpICYgMHhmZmZmKSAhPSAoYiAmIDB4ZmZmZikpIHtcclxuXHRcdFx0XHRcdFx0bW9kZSA9IEJBREJMT0NLUztcclxuXHRcdFx0XHRcdFx0ei5tc2cgPSBcImludmFsaWQgc3RvcmVkIGJsb2NrIGxlbmd0aHNcIjtcclxuXHRcdFx0XHRcdFx0ciA9IFpfREFUQV9FUlJPUjtcclxuXHJcblx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XHJcblx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XHJcblx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xyXG5cdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGVmdCA9IChiICYgMHhmZmZmKTtcclxuXHRcdFx0XHRcdGIgPSBrID0gMDsgLy8gZHVtcCBiaXRzXHJcblx0XHRcdFx0XHRtb2RlID0gbGVmdCAhPT0gMCA/IFNUT1JFRCA6IChsYXN0ICE9PSAwID8gRFJZIDogVFlQRSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIFNUT1JFRDpcclxuXHRcdFx0XHRcdGlmIChuID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XHJcblx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XHJcblx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xyXG5cdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChtID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdGlmIChxID09IHRoYXQuZW5kICYmIHRoYXQucmVhZCAhPT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHEgPSAwO1xyXG5cdFx0XHRcdFx0XHRcdG0gPSAvKiAoaW50KSAqLyhxIDwgdGhhdC5yZWFkID8gdGhhdC5yZWFkIC0gcSAtIDEgOiB0aGF0LmVuZCAtIHEpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChtID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRcdFx0ciA9IHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcclxuXHRcdFx0XHRcdFx0XHRxID0gdGhhdC53cml0ZTtcclxuXHRcdFx0XHRcdFx0XHRtID0gLyogKGludCkgKi8ocSA8IHRoYXQucmVhZCA/IHRoYXQucmVhZCAtIHEgLSAxIDogdGhhdC5lbmQgLSBxKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAocSA9PSB0aGF0LmVuZCAmJiB0aGF0LnJlYWQgIT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdHEgPSAwO1xyXG5cdFx0XHRcdFx0XHRcdFx0bSA9IC8qIChpbnQpICovKHEgPCB0aGF0LnJlYWQgPyB0aGF0LnJlYWQgLSBxIC0gMSA6IHRoYXQuZW5kIC0gcSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGlmIChtID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhhdC5iaXRrID0gaztcclxuXHRcdFx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xyXG5cdFx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHRcdFx0ei5uZXh0X2luX2luZGV4ID0gcDtcclxuXHRcdFx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHIgPSBaX09LO1xyXG5cclxuXHRcdFx0XHRcdHQgPSBsZWZ0O1xyXG5cdFx0XHRcdFx0aWYgKHQgPiBuKVxyXG5cdFx0XHRcdFx0XHR0ID0gbjtcclxuXHRcdFx0XHRcdGlmICh0ID4gbSlcclxuXHRcdFx0XHRcdFx0dCA9IG07XHJcblx0XHRcdFx0XHR0aGF0LndpbmRvdy5zZXQoei5yZWFkX2J1ZihwLCB0KSwgcSk7XHJcblx0XHRcdFx0XHRwICs9IHQ7XHJcblx0XHRcdFx0XHRuIC09IHQ7XHJcblx0XHRcdFx0XHRxICs9IHQ7XHJcblx0XHRcdFx0XHRtIC09IHQ7XHJcblx0XHRcdFx0XHRpZiAoKGxlZnQgLT0gdCkgIT09IDApXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0bW9kZSA9IGxhc3QgIT09IDAgPyBEUlkgOiBUWVBFO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBUQUJMRTpcclxuXHJcblx0XHRcdFx0XHR3aGlsZSAoayA8ICgxNCkpIHtcclxuXHRcdFx0XHRcdFx0aWYgKG4gIT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRyID0gWl9PSztcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XHJcblx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XHJcblx0XHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0bi0tO1xyXG5cdFx0XHRcdFx0XHRiIHw9ICh6LnJlYWRfYnl0ZShwKyspICYgMHhmZikgPDwgaztcclxuXHRcdFx0XHRcdFx0ayArPSA4O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRhYmxlID0gdCA9IChiICYgMHgzZmZmKTtcclxuXHRcdFx0XHRcdGlmICgodCAmIDB4MWYpID4gMjkgfHwgKCh0ID4+IDUpICYgMHgxZikgPiAyOSkge1xyXG5cdFx0XHRcdFx0XHRtb2RlID0gQkFEQkxPQ0tTO1xyXG5cdFx0XHRcdFx0XHR6Lm1zZyA9IFwidG9vIG1hbnkgbGVuZ3RoIG9yIGRpc3RhbmNlIHN5bWJvbHNcIjtcclxuXHRcdFx0XHRcdFx0ciA9IFpfREFUQV9FUlJPUjtcclxuXHJcblx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XHJcblx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XHJcblx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xyXG5cdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dCA9IDI1OCArICh0ICYgMHgxZikgKyAoKHQgPj4gNSkgJiAweDFmKTtcclxuXHRcdFx0XHRcdGlmICghYmxlbnMgfHwgYmxlbnMubGVuZ3RoIDwgdCkge1xyXG5cdFx0XHRcdFx0XHRibGVucyA9IFtdOyAvLyBuZXcgQXJyYXkodCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgdDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0YmxlbnNbaV0gPSAwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8ge1xyXG5cdFx0XHRcdFx0YiA+Pj49ICgxNCk7XHJcblx0XHRcdFx0XHRrIC09ICgxNCk7XHJcblx0XHRcdFx0XHQvLyB9XHJcblxyXG5cdFx0XHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0XHRcdFx0bW9kZSA9IEJUUkVFO1xyXG5cdFx0XHRcdGNhc2UgQlRSRUU6XHJcblx0XHRcdFx0XHR3aGlsZSAoaW5kZXggPCA0ICsgKHRhYmxlID4+PiAxMCkpIHtcclxuXHRcdFx0XHRcdFx0d2hpbGUgKGsgPCAoMykpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAobiAhPT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0ciA9IFpfT0s7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XHJcblx0XHRcdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRuLS07XHJcblx0XHRcdFx0XHRcdFx0YiB8PSAoei5yZWFkX2J5dGUocCsrKSAmIDB4ZmYpIDw8IGs7XHJcblx0XHRcdFx0XHRcdFx0ayArPSA4O1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRibGVuc1tib3JkZXJbaW5kZXgrK11dID0gYiAmIDc7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyB7XHJcblx0XHRcdFx0XHRcdGIgPj4+PSAoMyk7XHJcblx0XHRcdFx0XHRcdGsgLT0gKDMpO1xyXG5cdFx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0d2hpbGUgKGluZGV4IDwgMTkpIHtcclxuXHRcdFx0XHRcdFx0YmxlbnNbYm9yZGVyW2luZGV4KytdXSA9IDA7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YmJbMF0gPSA3O1xyXG5cdFx0XHRcdFx0dCA9IGluZnRyZWUuaW5mbGF0ZV90cmVlc19iaXRzKGJsZW5zLCBiYiwgdGIsIGh1ZnRzLCB6KTtcclxuXHRcdFx0XHRcdGlmICh0ICE9IFpfT0spIHtcclxuXHRcdFx0XHRcdFx0ciA9IHQ7XHJcblx0XHRcdFx0XHRcdGlmIChyID09IFpfREFUQV9FUlJPUikge1xyXG5cdFx0XHRcdFx0XHRcdGJsZW5zID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0XHRtb2RlID0gQkFEQkxPQ0tTO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR0aGF0LmJpdGIgPSBiO1xyXG5cdFx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdFx0ei50b3RhbF9pbiArPSBwIC0gei5uZXh0X2luX2luZGV4O1xyXG5cdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0XHR0aGF0LndyaXRlID0gcTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoYXQuaW5mbGF0ZV9mbHVzaCh6LCByKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpbmRleCA9IDA7XHJcblx0XHRcdFx0XHRtb2RlID0gRFRSRUU7XHJcblx0XHRcdFx0Y2FzZSBEVFJFRTpcclxuXHRcdFx0XHRcdHdoaWxlICh0cnVlKSB7XHJcblx0XHRcdFx0XHRcdHQgPSB0YWJsZTtcclxuXHRcdFx0XHRcdFx0aWYgKCEoaW5kZXggPCAyNTggKyAodCAmIDB4MWYpICsgKCh0ID4+IDUpICYgMHgxZikpKSB7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBqLCBjO1xyXG5cclxuXHRcdFx0XHRcdFx0dCA9IGJiWzBdO1xyXG5cclxuXHRcdFx0XHRcdFx0d2hpbGUgKGsgPCAodCkpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAobiAhPT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0ciA9IFpfT0s7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XHJcblx0XHRcdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRuLS07XHJcblx0XHRcdFx0XHRcdFx0YiB8PSAoei5yZWFkX2J5dGUocCsrKSAmIDB4ZmYpIDw8IGs7XHJcblx0XHRcdFx0XHRcdFx0ayArPSA4O1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBpZiAodGJbMF0gPT0gLTEpIHtcclxuXHRcdFx0XHRcdFx0Ly8gU3lzdGVtLmVyci5wcmludGxuKFwibnVsbC4uLlwiKTtcclxuXHRcdFx0XHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0XHRcdFx0dCA9IGh1ZnRzWyh0YlswXSArIChiICYgaW5mbGF0ZV9tYXNrW3RdKSkgKiAzICsgMV07XHJcblx0XHRcdFx0XHRcdGMgPSBodWZ0c1sodGJbMF0gKyAoYiAmIGluZmxhdGVfbWFza1t0XSkpICogMyArIDJdO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGMgPCAxNikge1xyXG5cdFx0XHRcdFx0XHRcdGIgPj4+PSAodCk7XHJcblx0XHRcdFx0XHRcdFx0ayAtPSAodCk7XHJcblx0XHRcdFx0XHRcdFx0YmxlbnNbaW5kZXgrK10gPSBjO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgeyAvLyBjID09IDE2Li4xOFxyXG5cdFx0XHRcdFx0XHRcdGkgPSBjID09IDE4ID8gNyA6IGMgLSAxNDtcclxuXHRcdFx0XHRcdFx0XHRqID0gYyA9PSAxOCA/IDExIDogMztcclxuXHJcblx0XHRcdFx0XHRcdFx0d2hpbGUgKGsgPCAodCArIGkpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAobiAhPT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyID0gWl9PSztcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0bi0tO1xyXG5cdFx0XHRcdFx0XHRcdFx0YiB8PSAoei5yZWFkX2J5dGUocCsrKSAmIDB4ZmYpIDw8IGs7XHJcblx0XHRcdFx0XHRcdFx0XHRrICs9IDg7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRiID4+Pj0gKHQpO1xyXG5cdFx0XHRcdFx0XHRcdGsgLT0gKHQpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRqICs9IChiICYgaW5mbGF0ZV9tYXNrW2ldKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0YiA+Pj49IChpKTtcclxuXHRcdFx0XHRcdFx0XHRrIC09IChpKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aSA9IGluZGV4O1xyXG5cdFx0XHRcdFx0XHRcdHQgPSB0YWJsZTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoaSArIGogPiAyNTggKyAodCAmIDB4MWYpICsgKCh0ID4+IDUpICYgMHgxZikgfHwgKGMgPT0gMTYgJiYgaSA8IDEpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRibGVucyA9IG51bGw7XHJcblx0XHRcdFx0XHRcdFx0XHRtb2RlID0gQkFEQkxPQ0tTO1xyXG5cdFx0XHRcdFx0XHRcdFx0ei5tc2cgPSBcImludmFsaWQgYml0IGxlbmd0aCByZXBlYXRcIjtcclxuXHRcdFx0XHRcdFx0XHRcdHIgPSBaX0RBVEFfRVJST1I7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0dGhhdC5iaXRiID0gYjtcclxuXHRcdFx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XHJcblx0XHRcdFx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcclxuXHRcdFx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGF0LndyaXRlID0gcTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0aGF0LmluZmxhdGVfZmx1c2goeiwgcik7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRjID0gYyA9PSAxNiA/IGJsZW5zW2kgLSAxXSA6IDA7XHJcblx0XHRcdFx0XHRcdFx0ZG8ge1xyXG5cdFx0XHRcdFx0XHRcdFx0YmxlbnNbaSsrXSA9IGM7XHJcblx0XHRcdFx0XHRcdFx0fSB3aGlsZSAoLS1qICE9PSAwKTtcclxuXHRcdFx0XHRcdFx0XHRpbmRleCA9IGk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0YlswXSA9IC0xO1xyXG5cdFx0XHRcdFx0Ly8ge1xyXG5cdFx0XHRcdFx0dmFyIGJsXyA9IFtdOyAvLyBuZXcgQXJyYXkoMSk7XHJcblx0XHRcdFx0XHR2YXIgYmRfID0gW107IC8vIG5ldyBBcnJheSgxKTtcclxuXHRcdFx0XHRcdHZhciB0bF8gPSBbXTsgLy8gbmV3IEFycmF5KDEpO1xyXG5cdFx0XHRcdFx0dmFyIHRkXyA9IFtdOyAvLyBuZXcgQXJyYXkoMSk7XHJcblx0XHRcdFx0XHRibF9bMF0gPSA5OyAvLyBtdXN0IGJlIDw9IDkgZm9yIGxvb2thaGVhZCBhc3N1bXB0aW9uc1xyXG5cdFx0XHRcdFx0YmRfWzBdID0gNjsgLy8gbXVzdCBiZSA8PSA5IGZvciBsb29rYWhlYWQgYXNzdW1wdGlvbnNcclxuXHJcblx0XHRcdFx0XHR0ID0gdGFibGU7XHJcblx0XHRcdFx0XHR0ID0gaW5mdHJlZS5pbmZsYXRlX3RyZWVzX2R5bmFtaWMoMjU3ICsgKHQgJiAweDFmKSwgMSArICgodCA+PiA1KSAmIDB4MWYpLCBibGVucywgYmxfLCBiZF8sIHRsXywgdGRfLCBodWZ0cywgeik7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHQgIT0gWl9PSykge1xyXG5cdFx0XHRcdFx0XHRpZiAodCA9PSBaX0RBVEFfRVJST1IpIHtcclxuXHRcdFx0XHRcdFx0XHRibGVucyA9IG51bGw7XHJcblx0XHRcdFx0XHRcdFx0bW9kZSA9IEJBREJMT0NLUztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyID0gdDtcclxuXHJcblx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XHJcblx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XHJcblx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xyXG5cdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29kZXMuaW5pdChibF9bMF0sIGJkX1swXSwgaHVmdHMsIHRsX1swXSwgaHVmdHMsIHRkX1swXSk7XHJcblx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0XHRtb2RlID0gQ09ERVM7XHJcblx0XHRcdFx0Y2FzZSBDT0RFUzpcclxuXHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XHJcblx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XHJcblx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XHJcblxyXG5cdFx0XHRcdFx0aWYgKChyID0gY29kZXMucHJvYyh0aGF0LCB6LCByKSkgIT0gWl9TVFJFQU1fRU5EKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGF0LmluZmxhdGVfZmx1c2goeiwgcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyID0gWl9PSztcclxuXHRcdFx0XHRcdGNvZGVzLmZyZWUoeik7XHJcblxyXG5cdFx0XHRcdFx0cCA9IHoubmV4dF9pbl9pbmRleDtcclxuXHRcdFx0XHRcdG4gPSB6LmF2YWlsX2luO1xyXG5cdFx0XHRcdFx0YiA9IHRoYXQuYml0YjtcclxuXHRcdFx0XHRcdGsgPSB0aGF0LmJpdGs7XHJcblx0XHRcdFx0XHRxID0gdGhhdC53cml0ZTtcclxuXHRcdFx0XHRcdG0gPSAvKiAoaW50KSAqLyhxIDwgdGhhdC5yZWFkID8gdGhhdC5yZWFkIC0gcSAtIDEgOiB0aGF0LmVuZCAtIHEpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChsYXN0ID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdG1vZGUgPSBUWVBFO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdG1vZGUgPSBEUlk7XHJcblx0XHRcdFx0Y2FzZSBEUlk6XHJcblx0XHRcdFx0XHR0aGF0LndyaXRlID0gcTtcclxuXHRcdFx0XHRcdHIgPSB0aGF0LmluZmxhdGVfZmx1c2goeiwgcik7XHJcblx0XHRcdFx0XHRxID0gdGhhdC53cml0ZTtcclxuXHRcdFx0XHRcdG0gPSAvKiAoaW50KSAqLyhxIDwgdGhhdC5yZWFkID8gdGhhdC5yZWFkIC0gcSAtIDEgOiB0aGF0LmVuZCAtIHEpO1xyXG5cdFx0XHRcdFx0aWYgKHRoYXQucmVhZCAhPSB0aGF0LndyaXRlKSB7XHJcblx0XHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XHJcblx0XHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XHJcblx0XHRcdFx0XHRcdHouYXZhaWxfaW4gPSBuO1xyXG5cdFx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHRcdHRoYXQud3JpdGUgPSBxO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bW9kZSA9IERPTkVMT0NLUztcclxuXHRcdFx0XHRjYXNlIERPTkVMT0NLUzpcclxuXHRcdFx0XHRcdHIgPSBaX1NUUkVBTV9FTkQ7XHJcblxyXG5cdFx0XHRcdFx0dGhhdC5iaXRiID0gYjtcclxuXHRcdFx0XHRcdHRoYXQuYml0ayA9IGs7XHJcblx0XHRcdFx0XHR6LmF2YWlsX2luID0gbjtcclxuXHRcdFx0XHRcdHoudG90YWxfaW4gKz0gcCAtIHoubmV4dF9pbl9pbmRleDtcclxuXHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdFx0XHR0aGF0LndyaXRlID0gcTtcclxuXHRcdFx0XHRcdHJldHVybiB0aGF0LmluZmxhdGVfZmx1c2goeiwgcik7XHJcblx0XHRcdFx0Y2FzZSBCQURCTE9DS1M6XHJcblx0XHRcdFx0XHRyID0gWl9EQVRBX0VSUk9SO1xyXG5cclxuXHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XHJcblx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XHJcblx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0ciA9IFpfU1RSRUFNX0VSUk9SO1xyXG5cclxuXHRcdFx0XHRcdHRoYXQuYml0YiA9IGI7XHJcblx0XHRcdFx0XHR0aGF0LmJpdGsgPSBrO1xyXG5cdFx0XHRcdFx0ei5hdmFpbF9pbiA9IG47XHJcblx0XHRcdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0XHR6Lm5leHRfaW5faW5kZXggPSBwO1xyXG5cdFx0XHRcdFx0dGhhdC53cml0ZSA9IHE7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhhdC5pbmZsYXRlX2ZsdXNoKHosIHIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGF0LmZyZWUgPSBmdW5jdGlvbih6KSB7XHJcblx0XHRcdHRoYXQucmVzZXQoeiwgbnVsbCk7XHJcblx0XHRcdHRoYXQud2luZG93ID0gbnVsbDtcclxuXHRcdFx0aHVmdHMgPSBudWxsO1xyXG5cdFx0XHQvLyBaRlJFRSh6LCBzKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhhdC5zZXRfZGljdGlvbmFyeSA9IGZ1bmN0aW9uKGQsIHN0YXJ0LCBuKSB7XHJcblx0XHRcdHRoYXQud2luZG93LnNldChkLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIG4pLCAwKTtcclxuXHRcdFx0dGhhdC5yZWFkID0gdGhhdC53cml0ZSA9IG47XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFJldHVybnMgdHJ1ZSBpZiBpbmZsYXRlIGlzIGN1cnJlbnRseSBhdCB0aGUgZW5kIG9mIGEgYmxvY2sgZ2VuZXJhdGVkXHJcblx0XHQvLyBieSBaX1NZTkNfRkxVU0ggb3IgWl9GVUxMX0ZMVVNILlxyXG5cdFx0dGhhdC5zeW5jX3BvaW50ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBtb2RlID09IExFTlMgPyAxIDogMDtcclxuXHRcdH07XHJcblxyXG5cdH1cclxuXHJcblx0Ly8gSW5mbGF0ZVxyXG5cclxuXHQvLyBwcmVzZXQgZGljdGlvbmFyeSBmbGFnIGluIHpsaWIgaGVhZGVyXHJcblx0dmFyIFBSRVNFVF9ESUNUID0gMHgyMDtcclxuXHJcblx0dmFyIFpfREVGTEFURUQgPSA4O1xyXG5cclxuXHR2YXIgTUVUSE9EID0gMDsgLy8gd2FpdGluZyBmb3IgbWV0aG9kIGJ5dGVcclxuXHR2YXIgRkxBRyA9IDE7IC8vIHdhaXRpbmcgZm9yIGZsYWcgYnl0ZVxyXG5cdHZhciBESUNUNCA9IDI7IC8vIGZvdXIgZGljdGlvbmFyeSBjaGVjayBieXRlcyB0byBnb1xyXG5cdHZhciBESUNUMyA9IDM7IC8vIHRocmVlIGRpY3Rpb25hcnkgY2hlY2sgYnl0ZXMgdG8gZ29cclxuXHR2YXIgRElDVDIgPSA0OyAvLyB0d28gZGljdGlvbmFyeSBjaGVjayBieXRlcyB0byBnb1xyXG5cdHZhciBESUNUMSA9IDU7IC8vIG9uZSBkaWN0aW9uYXJ5IGNoZWNrIGJ5dGUgdG8gZ29cclxuXHR2YXIgRElDVDAgPSA2OyAvLyB3YWl0aW5nIGZvciBpbmZsYXRlU2V0RGljdGlvbmFyeVxyXG5cdHZhciBCTE9DS1MgPSA3OyAvLyBkZWNvbXByZXNzaW5nIGJsb2Nrc1xyXG5cdHZhciBET05FID0gMTI7IC8vIGZpbmlzaGVkIGNoZWNrLCBkb25lXHJcblx0dmFyIEJBRCA9IDEzOyAvLyBnb3QgYW4gZXJyb3ItLXN0YXkgaGVyZVxyXG5cclxuXHR2YXIgbWFyayA9IFsgMCwgMCwgMHhmZiwgMHhmZiBdO1xyXG5cclxuXHRmdW5jdGlvbiBJbmZsYXRlKCkge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdHRoYXQubW9kZSA9IDA7IC8vIGN1cnJlbnQgaW5mbGF0ZSBtb2RlXHJcblxyXG5cdFx0Ly8gbW9kZSBkZXBlbmRlbnQgaW5mb3JtYXRpb25cclxuXHRcdHRoYXQubWV0aG9kID0gMDsgLy8gaWYgRkxBR1MsIG1ldGhvZCBieXRlXHJcblxyXG5cdFx0Ly8gaWYgQ0hFQ0ssIGNoZWNrIHZhbHVlcyB0byBjb21wYXJlXHJcblx0XHR0aGF0LndhcyA9IFsgMCBdOyAvLyBuZXcgQXJyYXkoMSk7IC8vIGNvbXB1dGVkIGNoZWNrIHZhbHVlXHJcblx0XHR0aGF0Lm5lZWQgPSAwOyAvLyBzdHJlYW0gY2hlY2sgdmFsdWVcclxuXHJcblx0XHQvLyBpZiBCQUQsIGluZmxhdGVTeW5jJ3MgbWFya2VyIGJ5dGVzIGNvdW50XHJcblx0XHR0aGF0Lm1hcmtlciA9IDA7XHJcblxyXG5cdFx0Ly8gbW9kZSBpbmRlcGVuZGVudCBpbmZvcm1hdGlvblxyXG5cdFx0dGhhdC53Yml0cyA9IDA7IC8vIGxvZzIod2luZG93IHNpemUpICg4Li4xNSwgZGVmYXVsdHMgdG8gMTUpXHJcblxyXG5cdFx0Ly8gdGhpcy5ibG9ja3M7IC8vIGN1cnJlbnQgaW5mbGF0ZV9ibG9ja3Mgc3RhdGVcclxuXHJcblx0XHRmdW5jdGlvbiBpbmZsYXRlUmVzZXQoeikge1xyXG5cdFx0XHRpZiAoIXogfHwgIXouaXN0YXRlKVxyXG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcclxuXHJcblx0XHRcdHoudG90YWxfaW4gPSB6LnRvdGFsX291dCA9IDA7XHJcblx0XHRcdHoubXNnID0gbnVsbDtcclxuXHRcdFx0ei5pc3RhdGUubW9kZSA9IEJMT0NLUztcclxuXHRcdFx0ei5pc3RhdGUuYmxvY2tzLnJlc2V0KHosIG51bGwpO1xyXG5cdFx0XHRyZXR1cm4gWl9PSztcclxuXHRcdH1cclxuXHJcblx0XHR0aGF0LmluZmxhdGVFbmQgPSBmdW5jdGlvbih6KSB7XHJcblx0XHRcdGlmICh0aGF0LmJsb2NrcylcclxuXHRcdFx0XHR0aGF0LmJsb2Nrcy5mcmVlKHopO1xyXG5cdFx0XHR0aGF0LmJsb2NrcyA9IG51bGw7XHJcblx0XHRcdC8vIFpGUkVFKHosIHotPnN0YXRlKTtcclxuXHRcdFx0cmV0dXJuIFpfT0s7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoYXQuaW5mbGF0ZUluaXQgPSBmdW5jdGlvbih6LCB3KSB7XHJcblx0XHRcdHoubXNnID0gbnVsbDtcclxuXHRcdFx0dGhhdC5ibG9ja3MgPSBudWxsO1xyXG5cclxuXHRcdFx0Ly8gc2V0IHdpbmRvdyBzaXplXHJcblx0XHRcdGlmICh3IDwgOCB8fCB3ID4gMTUpIHtcclxuXHRcdFx0XHR0aGF0LmluZmxhdGVFbmQoeik7XHJcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoYXQud2JpdHMgPSB3O1xyXG5cclxuXHRcdFx0ei5pc3RhdGUuYmxvY2tzID0gbmV3IEluZkJsb2Nrcyh6LCAxIDw8IHcpO1xyXG5cclxuXHRcdFx0Ly8gcmVzZXQgc3RhdGVcclxuXHRcdFx0aW5mbGF0ZVJlc2V0KHopO1xyXG5cdFx0XHRyZXR1cm4gWl9PSztcclxuXHRcdH07XHJcblxyXG5cdFx0dGhhdC5pbmZsYXRlID0gZnVuY3Rpb24oeiwgZikge1xyXG5cdFx0XHR2YXIgcjtcclxuXHRcdFx0dmFyIGI7XHJcblxyXG5cdFx0XHRpZiAoIXogfHwgIXouaXN0YXRlIHx8ICF6Lm5leHRfaW4pXHJcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xyXG5cdFx0XHRmID0gZiA9PSBaX0ZJTklTSCA/IFpfQlVGX0VSUk9SIDogWl9PSztcclxuXHRcdFx0ciA9IFpfQlVGX0VSUk9SO1xyXG5cdFx0XHR3aGlsZSAodHJ1ZSkge1xyXG5cdFx0XHRcdC8vIFN5c3RlbS5vdXQucHJpbnRsbihcIm1vZGU6IFwiK3ouaXN0YXRlLm1vZGUpO1xyXG5cdFx0XHRcdHN3aXRjaCAoei5pc3RhdGUubW9kZSkge1xyXG5cdFx0XHRcdGNhc2UgTUVUSE9EOlxyXG5cclxuXHRcdFx0XHRcdGlmICh6LmF2YWlsX2luID09PSAwKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcjtcclxuXHRcdFx0XHRcdHIgPSBmO1xyXG5cclxuXHRcdFx0XHRcdHouYXZhaWxfaW4tLTtcclxuXHRcdFx0XHRcdHoudG90YWxfaW4rKztcclxuXHRcdFx0XHRcdGlmICgoKHouaXN0YXRlLm1ldGhvZCA9IHoucmVhZF9ieXRlKHoubmV4dF9pbl9pbmRleCsrKSkgJiAweGYpICE9IFpfREVGTEFURUQpIHtcclxuXHRcdFx0XHRcdFx0ei5pc3RhdGUubW9kZSA9IEJBRDtcclxuXHRcdFx0XHRcdFx0ei5tc2cgPSBcInVua25vd24gY29tcHJlc3Npb24gbWV0aG9kXCI7XHJcblx0XHRcdFx0XHRcdHouaXN0YXRlLm1hcmtlciA9IDU7IC8vIGNhbid0IHRyeSBpbmZsYXRlU3luY1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICgoei5pc3RhdGUubWV0aG9kID4+IDQpICsgOCA+IHouaXN0YXRlLndiaXRzKSB7XHJcblx0XHRcdFx0XHRcdHouaXN0YXRlLm1vZGUgPSBCQUQ7XHJcblx0XHRcdFx0XHRcdHoubXNnID0gXCJpbnZhbGlkIHdpbmRvdyBzaXplXCI7XHJcblx0XHRcdFx0XHRcdHouaXN0YXRlLm1hcmtlciA9IDU7IC8vIGNhbid0IHRyeSBpbmZsYXRlU3luY1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHouaXN0YXRlLm1vZGUgPSBGTEFHO1xyXG5cdFx0XHRcdGNhc2UgRkxBRzpcclxuXHJcblx0XHRcdFx0XHRpZiAoei5hdmFpbF9pbiA9PT0gMClcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHI7XHJcblx0XHRcdFx0XHRyID0gZjtcclxuXHJcblx0XHRcdFx0XHR6LmF2YWlsX2luLS07XHJcblx0XHRcdFx0XHR6LnRvdGFsX2luKys7XHJcblx0XHRcdFx0XHRiID0gKHoucmVhZF9ieXRlKHoubmV4dF9pbl9pbmRleCsrKSkgJiAweGZmO1xyXG5cclxuXHRcdFx0XHRcdGlmICgoKCh6LmlzdGF0ZS5tZXRob2QgPDwgOCkgKyBiKSAlIDMxKSAhPT0gMCkge1xyXG5cdFx0XHRcdFx0XHR6LmlzdGF0ZS5tb2RlID0gQkFEO1xyXG5cdFx0XHRcdFx0XHR6Lm1zZyA9IFwiaW5jb3JyZWN0IGhlYWRlciBjaGVja1wiO1xyXG5cdFx0XHRcdFx0XHR6LmlzdGF0ZS5tYXJrZXIgPSA1OyAvLyBjYW4ndCB0cnkgaW5mbGF0ZVN5bmNcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKChiICYgUFJFU0VUX0RJQ1QpID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdHouaXN0YXRlLm1vZGUgPSBCTE9DS1M7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ei5pc3RhdGUubW9kZSA9IERJQ1Q0O1xyXG5cdFx0XHRcdGNhc2UgRElDVDQ6XHJcblxyXG5cdFx0XHRcdFx0aWYgKHouYXZhaWxfaW4gPT09IDApXHJcblx0XHRcdFx0XHRcdHJldHVybiByO1xyXG5cdFx0XHRcdFx0ciA9IGY7XHJcblxyXG5cdFx0XHRcdFx0ei5hdmFpbF9pbi0tO1xyXG5cdFx0XHRcdFx0ei50b3RhbF9pbisrO1xyXG5cdFx0XHRcdFx0ei5pc3RhdGUubmVlZCA9ICgoei5yZWFkX2J5dGUoei5uZXh0X2luX2luZGV4KyspICYgMHhmZikgPDwgMjQpICYgMHhmZjAwMDAwMDtcclxuXHRcdFx0XHRcdHouaXN0YXRlLm1vZGUgPSBESUNUMztcclxuXHRcdFx0XHRjYXNlIERJQ1QzOlxyXG5cclxuXHRcdFx0XHRcdGlmICh6LmF2YWlsX2luID09PSAwKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcjtcclxuXHRcdFx0XHRcdHIgPSBmO1xyXG5cclxuXHRcdFx0XHRcdHouYXZhaWxfaW4tLTtcclxuXHRcdFx0XHRcdHoudG90YWxfaW4rKztcclxuXHRcdFx0XHRcdHouaXN0YXRlLm5lZWQgKz0gKCh6LnJlYWRfYnl0ZSh6Lm5leHRfaW5faW5kZXgrKykgJiAweGZmKSA8PCAxNikgJiAweGZmMDAwMDtcclxuXHRcdFx0XHRcdHouaXN0YXRlLm1vZGUgPSBESUNUMjtcclxuXHRcdFx0XHRjYXNlIERJQ1QyOlxyXG5cclxuXHRcdFx0XHRcdGlmICh6LmF2YWlsX2luID09PSAwKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcjtcclxuXHRcdFx0XHRcdHIgPSBmO1xyXG5cclxuXHRcdFx0XHRcdHouYXZhaWxfaW4tLTtcclxuXHRcdFx0XHRcdHoudG90YWxfaW4rKztcclxuXHRcdFx0XHRcdHouaXN0YXRlLm5lZWQgKz0gKCh6LnJlYWRfYnl0ZSh6Lm5leHRfaW5faW5kZXgrKykgJiAweGZmKSA8PCA4KSAmIDB4ZmYwMDtcclxuXHRcdFx0XHRcdHouaXN0YXRlLm1vZGUgPSBESUNUMTtcclxuXHRcdFx0XHRjYXNlIERJQ1QxOlxyXG5cclxuXHRcdFx0XHRcdGlmICh6LmF2YWlsX2luID09PSAwKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcjtcclxuXHRcdFx0XHRcdHIgPSBmO1xyXG5cclxuXHRcdFx0XHRcdHouYXZhaWxfaW4tLTtcclxuXHRcdFx0XHRcdHoudG90YWxfaW4rKztcclxuXHRcdFx0XHRcdHouaXN0YXRlLm5lZWQgKz0gKHoucmVhZF9ieXRlKHoubmV4dF9pbl9pbmRleCsrKSAmIDB4ZmYpO1xyXG5cdFx0XHRcdFx0ei5pc3RhdGUubW9kZSA9IERJQ1QwO1xyXG5cdFx0XHRcdFx0cmV0dXJuIFpfTkVFRF9ESUNUO1xyXG5cdFx0XHRcdGNhc2UgRElDVDA6XHJcblx0XHRcdFx0XHR6LmlzdGF0ZS5tb2RlID0gQkFEO1xyXG5cdFx0XHRcdFx0ei5tc2cgPSBcIm5lZWQgZGljdGlvbmFyeVwiO1xyXG5cdFx0XHRcdFx0ei5pc3RhdGUubWFya2VyID0gMDsgLy8gY2FuIHRyeSBpbmZsYXRlU3luY1xyXG5cdFx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xyXG5cdFx0XHRcdGNhc2UgQkxPQ0tTOlxyXG5cclxuXHRcdFx0XHRcdHIgPSB6LmlzdGF0ZS5ibG9ja3MucHJvYyh6LCByKTtcclxuXHRcdFx0XHRcdGlmIChyID09IFpfREFUQV9FUlJPUikge1xyXG5cdFx0XHRcdFx0XHR6LmlzdGF0ZS5tb2RlID0gQkFEO1xyXG5cdFx0XHRcdFx0XHR6LmlzdGF0ZS5tYXJrZXIgPSAwOyAvLyBjYW4gdHJ5IGluZmxhdGVTeW5jXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKHIgPT0gWl9PSykge1xyXG5cdFx0XHRcdFx0XHRyID0gZjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChyICE9IFpfU1RSRUFNX0VORCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHIgPSBmO1xyXG5cdFx0XHRcdFx0ei5pc3RhdGUuYmxvY2tzLnJlc2V0KHosIHouaXN0YXRlLndhcyk7XHJcblx0XHRcdFx0XHR6LmlzdGF0ZS5tb2RlID0gRE9ORTtcclxuXHRcdFx0XHRjYXNlIERPTkU6XHJcblx0XHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRU5EO1xyXG5cdFx0XHRcdGNhc2UgQkFEOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFpfREFUQV9FUlJPUjtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGF0LmluZmxhdGVTZXREaWN0aW9uYXJ5ID0gZnVuY3Rpb24oeiwgZGljdGlvbmFyeSwgZGljdExlbmd0aCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSAwO1xyXG5cdFx0XHR2YXIgbGVuZ3RoID0gZGljdExlbmd0aDtcclxuXHRcdFx0aWYgKCF6IHx8ICF6LmlzdGF0ZSB8fCB6LmlzdGF0ZS5tb2RlICE9IERJQ1QwKVxyXG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcclxuXHJcblx0XHRcdGlmIChsZW5ndGggPj0gKDEgPDwgei5pc3RhdGUud2JpdHMpKSB7XHJcblx0XHRcdFx0bGVuZ3RoID0gKDEgPDwgei5pc3RhdGUud2JpdHMpIC0gMTtcclxuXHRcdFx0XHRpbmRleCA9IGRpY3RMZW5ndGggLSBsZW5ndGg7XHJcblx0XHRcdH1cclxuXHRcdFx0ei5pc3RhdGUuYmxvY2tzLnNldF9kaWN0aW9uYXJ5KGRpY3Rpb25hcnksIGluZGV4LCBsZW5ndGgpO1xyXG5cdFx0XHR6LmlzdGF0ZS5tb2RlID0gQkxPQ0tTO1xyXG5cdFx0XHRyZXR1cm4gWl9PSztcclxuXHRcdH07XHJcblxyXG5cdFx0dGhhdC5pbmZsYXRlU3luYyA9IGZ1bmN0aW9uKHopIHtcclxuXHRcdFx0dmFyIG47IC8vIG51bWJlciBvZiBieXRlcyB0byBsb29rIGF0XHJcblx0XHRcdHZhciBwOyAvLyBwb2ludGVyIHRvIGJ5dGVzXHJcblx0XHRcdHZhciBtOyAvLyBudW1iZXIgb2YgbWFya2VyIGJ5dGVzIGZvdW5kIGluIGEgcm93XHJcblx0XHRcdHZhciByLCB3OyAvLyB0ZW1wb3JhcmllcyB0byBzYXZlIHRvdGFsX2luIGFuZCB0b3RhbF9vdXRcclxuXHJcblx0XHRcdC8vIHNldCB1cFxyXG5cdFx0XHRpZiAoIXogfHwgIXouaXN0YXRlKVxyXG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcclxuXHRcdFx0aWYgKHouaXN0YXRlLm1vZGUgIT0gQkFEKSB7XHJcblx0XHRcdFx0ei5pc3RhdGUubW9kZSA9IEJBRDtcclxuXHRcdFx0XHR6LmlzdGF0ZS5tYXJrZXIgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICgobiA9IHouYXZhaWxfaW4pID09PSAwKVxyXG5cdFx0XHRcdHJldHVybiBaX0JVRl9FUlJPUjtcclxuXHRcdFx0cCA9IHoubmV4dF9pbl9pbmRleDtcclxuXHRcdFx0bSA9IHouaXN0YXRlLm1hcmtlcjtcclxuXHJcblx0XHRcdC8vIHNlYXJjaFxyXG5cdFx0XHR3aGlsZSAobiAhPT0gMCAmJiBtIDwgNCkge1xyXG5cdFx0XHRcdGlmICh6LnJlYWRfYnl0ZShwKSA9PSBtYXJrW21dKSB7XHJcblx0XHRcdFx0XHRtKys7XHJcblx0XHRcdFx0fSBlbHNlIGlmICh6LnJlYWRfYnl0ZShwKSAhPT0gMCkge1xyXG5cdFx0XHRcdFx0bSA9IDA7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdG0gPSA0IC0gbTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cCsrO1xyXG5cdFx0XHRcdG4tLTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gcmVzdG9yZVxyXG5cdFx0XHR6LnRvdGFsX2luICs9IHAgLSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdHoubmV4dF9pbl9pbmRleCA9IHA7XHJcblx0XHRcdHouYXZhaWxfaW4gPSBuO1xyXG5cdFx0XHR6LmlzdGF0ZS5tYXJrZXIgPSBtO1xyXG5cclxuXHRcdFx0Ly8gcmV0dXJuIG5vIGpveSBvciBzZXQgdXAgdG8gcmVzdGFydCBvbiBhIG5ldyBibG9ja1xyXG5cdFx0XHRpZiAobSAhPSA0KSB7XHJcblx0XHRcdFx0cmV0dXJuIFpfREFUQV9FUlJPUjtcclxuXHRcdFx0fVxyXG5cdFx0XHRyID0gei50b3RhbF9pbjtcclxuXHRcdFx0dyA9IHoudG90YWxfb3V0O1xyXG5cdFx0XHRpbmZsYXRlUmVzZXQoeik7XHJcblx0XHRcdHoudG90YWxfaW4gPSByO1xyXG5cdFx0XHR6LnRvdGFsX291dCA9IHc7XHJcblx0XHRcdHouaXN0YXRlLm1vZGUgPSBCTE9DS1M7XHJcblx0XHRcdHJldHVybiBaX09LO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBSZXR1cm5zIHRydWUgaWYgaW5mbGF0ZSBpcyBjdXJyZW50bHkgYXQgdGhlIGVuZCBvZiBhIGJsb2NrIGdlbmVyYXRlZFxyXG5cdFx0Ly8gYnkgWl9TWU5DX0ZMVVNIIG9yIFpfRlVMTF9GTFVTSC4gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIGJ5IG9uZSBQUFBcclxuXHRcdC8vIGltcGxlbWVudGF0aW9uIHRvIHByb3ZpZGUgYW4gYWRkaXRpb25hbCBzYWZldHkgY2hlY2suIFBQUCB1c2VzXHJcblx0XHQvLyBaX1NZTkNfRkxVU0hcclxuXHRcdC8vIGJ1dCByZW1vdmVzIHRoZSBsZW5ndGggYnl0ZXMgb2YgdGhlIHJlc3VsdGluZyBlbXB0eSBzdG9yZWQgYmxvY2suIFdoZW5cclxuXHRcdC8vIGRlY29tcHJlc3NpbmcsIFBQUCBjaGVja3MgdGhhdCBhdCB0aGUgZW5kIG9mIGlucHV0IHBhY2tldCwgaW5mbGF0ZSBpc1xyXG5cdFx0Ly8gd2FpdGluZyBmb3IgdGhlc2UgbGVuZ3RoIGJ5dGVzLlxyXG5cdFx0dGhhdC5pbmZsYXRlU3luY1BvaW50ID0gZnVuY3Rpb24oeikge1xyXG5cdFx0XHRpZiAoIXogfHwgIXouaXN0YXRlIHx8ICF6LmlzdGF0ZS5ibG9ja3MpXHJcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xyXG5cdFx0XHRyZXR1cm4gei5pc3RhdGUuYmxvY2tzLnN5bmNfcG9pbnQoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvLyBaU3RyZWFtXHJcblxyXG5cdGZ1bmN0aW9uIFpTdHJlYW0oKSB7XHJcblx0fVxyXG5cclxuXHRaU3RyZWFtLnByb3RvdHlwZSA9IHtcclxuXHRcdGluZmxhdGVJbml0IDogZnVuY3Rpb24oYml0cykge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdHRoYXQuaXN0YXRlID0gbmV3IEluZmxhdGUoKTtcclxuXHRcdFx0aWYgKCFiaXRzKVxyXG5cdFx0XHRcdGJpdHMgPSBNQVhfQklUUztcclxuXHRcdFx0cmV0dXJuIHRoYXQuaXN0YXRlLmluZmxhdGVJbml0KHRoYXQsIGJpdHMpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRpbmZsYXRlIDogZnVuY3Rpb24oZikge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdGlmICghdGhhdC5pc3RhdGUpXHJcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xyXG5cdFx0XHRyZXR1cm4gdGhhdC5pc3RhdGUuaW5mbGF0ZSh0aGF0LCBmKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0aW5mbGF0ZUVuZCA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdGlmICghdGhhdC5pc3RhdGUpXHJcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xyXG5cdFx0XHR2YXIgcmV0ID0gdGhhdC5pc3RhdGUuaW5mbGF0ZUVuZCh0aGF0KTtcclxuXHRcdFx0dGhhdC5pc3RhdGUgPSBudWxsO1xyXG5cdFx0XHRyZXR1cm4gcmV0O1xyXG5cdFx0fSxcclxuXHJcblx0XHRpbmZsYXRlU3luYyA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdGlmICghdGhhdC5pc3RhdGUpXHJcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xyXG5cdFx0XHRyZXR1cm4gdGhhdC5pc3RhdGUuaW5mbGF0ZVN5bmModGhhdCk7XHJcblx0XHR9LFxyXG5cdFx0aW5mbGF0ZVNldERpY3Rpb25hcnkgOiBmdW5jdGlvbihkaWN0aW9uYXJ5LCBkaWN0TGVuZ3RoKSB7XHJcblx0XHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHRcdFx0aWYgKCF0aGF0LmlzdGF0ZSlcclxuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XHJcblx0XHRcdHJldHVybiB0aGF0LmlzdGF0ZS5pbmZsYXRlU2V0RGljdGlvbmFyeSh0aGF0LCBkaWN0aW9uYXJ5LCBkaWN0TGVuZ3RoKTtcclxuXHRcdH0sXHJcblx0XHRyZWFkX2J5dGUgOiBmdW5jdGlvbihzdGFydCkge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdHJldHVybiB0aGF0Lm5leHRfaW4uc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgMSlbMF07XHJcblx0XHR9LFxyXG5cdFx0cmVhZF9idWYgOiBmdW5jdGlvbihzdGFydCwgc2l6ZSkge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdHJldHVybiB0aGF0Lm5leHRfaW4uc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgc2l6ZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0Ly8gSW5mbGF0ZXJcclxuXHJcblx0ZnVuY3Rpb24gSW5mbGF0ZXIoKSB7XHJcblx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHR2YXIgeiA9IG5ldyBaU3RyZWFtKCk7XHJcblx0XHR2YXIgYnVmc2l6ZSA9IDUxMjtcclxuXHRcdHZhciBmbHVzaCA9IFpfTk9fRkxVU0g7XHJcblx0XHR2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYnVmc2l6ZSk7XHJcblx0XHR2YXIgbm9tb3JlaW5wdXQgPSBmYWxzZTtcclxuXHJcblx0XHR6LmluZmxhdGVJbml0KCk7XHJcblx0XHR6Lm5leHRfb3V0ID0gYnVmO1xyXG5cclxuXHRcdHRoYXQuYXBwZW5kID0gZnVuY3Rpb24oZGF0YSwgb25wcm9ncmVzcykge1xyXG5cdFx0XHR2YXIgZXJyLCBidWZmZXJzID0gW10sIGxhc3RJbmRleCA9IDAsIGJ1ZmZlckluZGV4ID0gMCwgYnVmZmVyU2l6ZSA9IDAsIGFycmF5O1xyXG5cdFx0XHRpZiAoZGF0YS5sZW5ndGggPT09IDApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR6Lm5leHRfaW5faW5kZXggPSAwO1xyXG5cdFx0XHR6Lm5leHRfaW4gPSBkYXRhO1xyXG5cdFx0XHR6LmF2YWlsX2luID0gZGF0YS5sZW5ndGg7XHJcblx0XHRcdGRvIHtcclxuXHRcdFx0XHR6Lm5leHRfb3V0X2luZGV4ID0gMDtcclxuXHRcdFx0XHR6LmF2YWlsX291dCA9IGJ1ZnNpemU7XHJcblx0XHRcdFx0aWYgKCh6LmF2YWlsX2luID09PSAwKSAmJiAoIW5vbW9yZWlucHV0KSkgeyAvLyBpZiBidWZmZXIgaXMgZW1wdHkgYW5kIG1vcmUgaW5wdXQgaXMgYXZhaWxhYmxlLCByZWZpbGwgaXRcclxuXHRcdFx0XHRcdHoubmV4dF9pbl9pbmRleCA9IDA7XHJcblx0XHRcdFx0XHRub21vcmVpbnB1dCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVyciA9IHouaW5mbGF0ZShmbHVzaCk7XHJcblx0XHRcdFx0aWYgKG5vbW9yZWlucHV0ICYmIChlcnIgPT0gWl9CVUZfRVJST1IpKVxyXG5cdFx0XHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0XHRcdGlmIChlcnIgIT0gWl9PSyAmJiBlcnIgIT0gWl9TVFJFQU1fRU5EKVxyXG5cdFx0XHRcdFx0dGhyb3cgXCJpbmZsYXRpbmc6IFwiICsgei5tc2c7XHJcblx0XHRcdFx0aWYgKChub21vcmVpbnB1dCB8fCBlcnIgPT0gWl9TVFJFQU1fRU5EKSAmJiAoei5hdmFpbF9pbiA9PSBkYXRhLmxlbmd0aCkpXHJcblx0XHRcdFx0XHRyZXR1cm4gLTE7XHJcblx0XHRcdFx0aWYgKHoubmV4dF9vdXRfaW5kZXgpXHJcblx0XHRcdFx0XHRpZiAoei5uZXh0X291dF9pbmRleCA9PSBidWZzaXplKVxyXG5cdFx0XHRcdFx0XHRidWZmZXJzLnB1c2gobmV3IFVpbnQ4QXJyYXkoYnVmKSk7XHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdGJ1ZmZlcnMucHVzaChuZXcgVWludDhBcnJheShidWYuc3ViYXJyYXkoMCwgei5uZXh0X291dF9pbmRleCkpKTtcclxuXHRcdFx0XHRidWZmZXJTaXplICs9IHoubmV4dF9vdXRfaW5kZXg7XHJcblx0XHRcdFx0aWYgKG9ucHJvZ3Jlc3MgJiYgei5uZXh0X2luX2luZGV4ID4gMCAmJiB6Lm5leHRfaW5faW5kZXggIT0gbGFzdEluZGV4KSB7XHJcblx0XHRcdFx0XHRvbnByb2dyZXNzKHoubmV4dF9pbl9pbmRleCk7XHJcblx0XHRcdFx0XHRsYXN0SW5kZXggPSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IHdoaWxlICh6LmF2YWlsX2luID4gMCB8fCB6LmF2YWlsX291dCA9PT0gMCk7XHJcblx0XHRcdGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyU2l6ZSk7XHJcblx0XHRcdGJ1ZmZlcnMuZm9yRWFjaChmdW5jdGlvbihjaHVuaykge1xyXG5cdFx0XHRcdGFycmF5LnNldChjaHVuaywgYnVmZmVySW5kZXgpO1xyXG5cdFx0XHRcdGJ1ZmZlckluZGV4ICs9IGNodW5rLmxlbmd0aDtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBhcnJheTtcclxuXHRcdH07XHJcblx0XHR0aGF0LmZsdXNoID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHouaW5mbGF0ZUVuZCgpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHZhciBpbmZsYXRlcjtcclxuXHJcblx0aWYgKG9iai56aXApXHJcblx0XHRvYmouemlwLkluZmxhdGVyID0gSW5mbGF0ZXI7XHJcblx0ZWxzZSB7XHJcblx0XHRpbmZsYXRlciA9IG5ldyBJbmZsYXRlcigpO1xyXG5cdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdHZhciBtZXNzYWdlID0gZXZlbnQuZGF0YTtcclxuXHJcblx0XHRcdGlmIChtZXNzYWdlLmFwcGVuZClcclxuXHRcdFx0XHRvYmoucG9zdE1lc3NhZ2Uoe1xyXG5cdFx0XHRcdFx0b25hcHBlbmQgOiB0cnVlLFxyXG5cdFx0XHRcdFx0ZGF0YSA6IGluZmxhdGVyLmFwcGVuZChtZXNzYWdlLmRhdGEsIGZ1bmN0aW9uKGN1cnJlbnQpIHtcclxuXHRcdFx0XHRcdFx0b2JqLnBvc3RNZXNzYWdlKHtcclxuXHRcdFx0XHRcdFx0XHRwcm9ncmVzcyA6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudCA6IGN1cnJlbnRcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRpZiAobWVzc2FnZS5mbHVzaCkge1xyXG5cdFx0XHRcdGluZmxhdGVyLmZsdXNoKCk7XHJcblx0XHRcdFx0b2JqLnBvc3RNZXNzYWdlKHtcclxuXHRcdFx0XHRcdG9uZmx1c2ggOiB0cnVlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0sIGZhbHNlKTtcclxuXHR9XHJcblxyXG59KShzZWxmKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3RyaW5nLXJlcGxhY2Utd2VicGFjay1wbHVnaW4vbG9hZGVyLmpzP2lkPWc2ZDlmc3A1ZGxnIS4vbm9kZV9tb2R1bGVzL3N0cmluZy1yZXBsYWNlLXdlYnBhY2stcGx1Z2luL2xvYWRlci5qcz9pZD1kaDVmd3J1MHhxbyEuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy9idWlsZHByb2Nlc3MvcmVtb3ZlQ2VzaXVtRGVidWdQcmFnbWFzLmpzIS4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvVGhpcmRQYXJ0eS9Xb3JrZXJzL2luZmxhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0E7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=