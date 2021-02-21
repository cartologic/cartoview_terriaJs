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
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/string-replace-webpack-plugin/loader.js?id=76z1falrfuw!./node_modules/string-replace-webpack-plugin/loader.js?id=a5434ipahyn!./node_modules/terriajs/buildprocess/removeCesiumDebugPragmas.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/deflate.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/string-replace-webpack-plugin/loader.js?id=76z1falrfuw!./node_modules/string-replace-webpack-plugin/loader.js?id=a5434ipahyn!./node_modules/terriajs/buildprocess/removeCesiumDebugPragmas.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/deflate.js":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/string-replace-webpack-plugin/loader.js?id=76z1falrfuw!./node_modules/string-replace-webpack-plugin/loader.js?id=a5434ipahyn!./node_modules/terriajs/buildprocess/removeCesiumDebugPragmas.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/deflate.js ***!
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
	var D_CODES = 30;
	var BL_CODES = 19;

	var LENGTH_CODES = 29;
	var LITERALS = 256;
	var L_CODES = (LITERALS + 1 + LENGTH_CODES);
	var HEAP_SIZE = (2 * L_CODES + 1);

	var END_BLOCK = 256;

	// Bit length codes must not exceed MAX_BL_BITS bits
	var MAX_BL_BITS = 7;

	// repeat previous bit length 3-6 times (2 bits of repeat count)
	var REP_3_6 = 16;

	// repeat a zero length 3-10 times (3 bits of repeat count)
	var REPZ_3_10 = 17;

	// repeat a zero length 11-138 times (7 bits of repeat count)
	var REPZ_11_138 = 18;

	// The lengths of the bit length codes are sent in order of decreasing
	// probability, to avoid transmitting the lengths for unused bit
	// length codes.

	var Buf_size = 8 * 2;

	// JZlib version : "1.0.2"
	var Z_DEFAULT_COMPRESSION = -1;

	// compression strategy
	var Z_FILTERED = 1;
	var Z_HUFFMAN_ONLY = 2;
	var Z_DEFAULT_STRATEGY = 0;

	var Z_NO_FLUSH = 0;
	var Z_PARTIAL_FLUSH = 1;
	var Z_FULL_FLUSH = 3;
	var Z_FINISH = 4;

	var Z_OK = 0;
	var Z_STREAM_END = 1;
	var Z_NEED_DICT = 2;
	var Z_STREAM_ERROR = -2;
	var Z_DATA_ERROR = -3;
	var Z_BUF_ERROR = -5;

	// Tree

	// see definition of array dist_code below
	var _dist_code = [ 0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
			10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
			12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
			13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
			14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
			14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
			15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18, 19, 19,
			20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
			26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,
			27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
			28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29,
			29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
			29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29 ];

	function Tree() {
		var that = this;

		// dyn_tree; // the dynamic tree
		// max_code; // largest code with non zero frequency
		// stat_desc; // the corresponding static tree

		// Compute the optimal bit lengths for a tree and update the total bit
		// length
		// for the current block.
		// IN assertion: the fields freq and dad are set, heap[heap_max] and
		// above are the tree nodes sorted by increasing frequency.
		// OUT assertions: the field len is set to the optimal bit length, the
		// array bl_count contains the frequencies for each bit length.
		// The length opt_len is updated; static_len is also updated if stree is
		// not null.
		function gen_bitlen(s) {
			var tree = that.dyn_tree;
			var stree = that.stat_desc.static_tree;
			var extra = that.stat_desc.extra_bits;
			var base = that.stat_desc.extra_base;
			var max_length = that.stat_desc.max_length;
			var h; // heap index
			var n, m; // iterate over the tree elements
			var bits; // bit length
			var xbits; // extra bits
			var f; // frequency
			var overflow = 0; // number of elements with bit length too large

			for (bits = 0; bits <= MAX_BITS; bits++)
				s.bl_count[bits] = 0;

			// In a first pass, compute the optimal bit lengths (which may
			// overflow in the case of the bit length tree).
			tree[s.heap[s.heap_max] * 2 + 1] = 0; // root of the heap

			for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
				n = s.heap[h];
				bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
				if (bits > max_length) {
					bits = max_length;
					overflow++;
				}
				tree[n * 2 + 1] = bits;
				// We overwrite tree[n*2+1] which is no longer needed

				if (n > that.max_code)
					continue; // not a leaf node

				s.bl_count[bits]++;
				xbits = 0;
				if (n >= base)
					xbits = extra[n - base];
				f = tree[n * 2];
				s.opt_len += f * (bits + xbits);
				if (stree)
					s.static_len += f * (stree[n * 2 + 1] + xbits);
			}
			if (overflow === 0)
				return;

			// This happens for example on obj2 and pic of the Calgary corpus
			// Find the first bit length which could increase:
			do {
				bits = max_length - 1;
				while (s.bl_count[bits] === 0)
					bits--;
				s.bl_count[bits]--; // move one leaf down the tree
				s.bl_count[bits + 1] += 2; // move one overflow item as its brother
				s.bl_count[max_length]--;
				// The brother of the overflow item also moves one step up,
				// but this does not affect bl_count[max_length]
				overflow -= 2;
			} while (overflow > 0);

			for (bits = max_length; bits !== 0; bits--) {
				n = s.bl_count[bits];
				while (n !== 0) {
					m = s.heap[--h];
					if (m > that.max_code)
						continue;
					if (tree[m * 2 + 1] != bits) {
						s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
						tree[m * 2 + 1] = bits;
					}
					n--;
				}
			}
		}

		// Reverse the first len bits of a code, using straightforward code (a
		// faster
		// method would use a table)
		// IN assertion: 1 <= len <= 15
		function bi_reverse(code, // the value to invert
		len // its bit length
		) {
			var res = 0;
			do {
				res |= code & 1;
				code >>>= 1;
				res <<= 1;
			} while (--len > 0);
			return res >>> 1;
		}

		// Generate the codes for a given tree and bit counts (which need not be
		// optimal).
		// IN assertion: the array bl_count contains the bit length statistics for
		// the given tree and the field len is set for all tree elements.
		// OUT assertion: the field code is set for all tree elements of non
		// zero code length.
		function gen_codes(tree, // the tree to decorate
		max_code, // largest code with non zero frequency
		bl_count // number of codes at each bit length
		) {
			var next_code = []; // next code value for each
			// bit length
			var code = 0; // running code value
			var bits; // bit index
			var n; // code index
			var len;

			// The distribution counts are first used to generate the code values
			// without bit reversal.
			for (bits = 1; bits <= MAX_BITS; bits++) {
				next_code[bits] = code = ((code + bl_count[bits - 1]) << 1);
			}

			// Check that the bit counts in bl_count are consistent. The last code
			// must be all ones.
			// Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
			// "inconsistent bit counts");
			// Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

			for (n = 0; n <= max_code; n++) {
				len = tree[n * 2 + 1];
				if (len === 0)
					continue;
				// Now reverse the bits
				tree[n * 2] = bi_reverse(next_code[len]++, len);
			}
		}

		// Construct one Huffman tree and assigns the code bit strings and lengths.
		// Update the total bit length for the current block.
		// IN assertion: the field freq is set for all tree elements.
		// OUT assertions: the fields len and code are set to the optimal bit length
		// and corresponding code. The length opt_len is updated; static_len is
		// also updated if stree is not null. The field max_code is set.
		that.build_tree = function(s) {
			var tree = that.dyn_tree;
			var stree = that.stat_desc.static_tree;
			var elems = that.stat_desc.elems;
			var n, m; // iterate over heap elements
			var max_code = -1; // largest code with non zero frequency
			var node; // new node being created

			// Construct the initial heap, with least frequent element in
			// heap[1]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
			// heap[0] is not used.
			s.heap_len = 0;
			s.heap_max = HEAP_SIZE;

			for (n = 0; n < elems; n++) {
				if (tree[n * 2] !== 0) {
					s.heap[++s.heap_len] = max_code = n;
					s.depth[n] = 0;
				} else {
					tree[n * 2 + 1] = 0;
				}
			}

			// The pkzip format requires that at least one distance code exists,
			// and that at least one bit should be sent even if there is only one
			// possible code. So to avoid special checks later on we force at least
			// two codes of non zero frequency.
			while (s.heap_len < 2) {
				node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
				tree[node * 2] = 1;
				s.depth[node] = 0;
				s.opt_len--;
				if (stree)
					s.static_len -= stree[node * 2 + 1];
				// node is 0 or 1 so it does not have extra bits
			}
			that.max_code = max_code;

			// The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
			// establish sub-heaps of increasing lengths:

			for (n = Math.floor(s.heap_len / 2); n >= 1; n--)
				s.pqdownheap(tree, n);

			// Construct the Huffman tree by repeatedly combining the least two
			// frequent nodes.

			node = elems; // next internal node of the tree
			do {
				// n = node of least frequency
				n = s.heap[1];
				s.heap[1] = s.heap[s.heap_len--];
				s.pqdownheap(tree, 1);
				m = s.heap[1]; // m = node of next least frequency

				s.heap[--s.heap_max] = n; // keep the nodes sorted by frequency
				s.heap[--s.heap_max] = m;

				// Create a new node father of n and m
				tree[node * 2] = (tree[n * 2] + tree[m * 2]);
				s.depth[node] = Math.max(s.depth[n], s.depth[m]) + 1;
				tree[n * 2 + 1] = tree[m * 2 + 1] = node;

				// and insert the new node in the heap
				s.heap[1] = node++;
				s.pqdownheap(tree, 1);
			} while (s.heap_len >= 2);

			s.heap[--s.heap_max] = s.heap[1];

			// At this point, the fields freq and dad are set. We can now
			// generate the bit lengths.

			gen_bitlen(s);

			// The field len is now set, we can generate the bit codes
			gen_codes(tree, that.max_code, s.bl_count);
		};

	}

	Tree._length_code = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16,
			16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20,
			20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
			22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
			25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
			26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28 ];

	Tree.base_length = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0 ];

	Tree.base_dist = [ 0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384,
			24576 ];

	// Mapping from a distance to a distance code. dist is the distance - 1 and
	// must not have side effects. _dist_code[256] and _dist_code[257] are never
	// used.
	Tree.d_code = function(dist) {
		return ((dist) < 256 ? _dist_code[dist] : _dist_code[256 + ((dist) >>> 7)]);
	};

	// extra bits for each length code
	Tree.extra_lbits = [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0 ];

	// extra bits for each distance code
	Tree.extra_dbits = [ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 ];

	// extra bits for each bit length code
	Tree.extra_blbits = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7 ];

	Tree.bl_order = [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];

	// StaticTree

	function StaticTree(static_tree, extra_bits, extra_base, elems, max_length) {
		var that = this;
		that.static_tree = static_tree;
		that.extra_bits = extra_bits;
		that.extra_base = extra_base;
		that.elems = elems;
		that.max_length = max_length;
	}

	StaticTree.static_ltree = [ 12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8,
			130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42,
			8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8,
			22, 8, 150, 8, 86, 8, 214, 8, 54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8,
			222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225, 8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113,
			8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8,
			69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8,
			173, 8, 109, 8, 237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9,
			51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75, 9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9,
			427, 9, 107, 9, 363, 9, 235, 9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379,
			9, 251, 9, 507, 9, 7, 9, 263, 9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23,
			9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9,
			399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9,
			223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7, 16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7,
			40, 7, 104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8, 195, 8, 35, 8, 163, 8,
			99, 8, 227, 8 ];

	StaticTree.static_dtree = [ 0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5,
			25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5 ];

	StaticTree.static_l_desc = new StaticTree(StaticTree.static_ltree, Tree.extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);

	StaticTree.static_d_desc = new StaticTree(StaticTree.static_dtree, Tree.extra_dbits, 0, D_CODES, MAX_BITS);

	StaticTree.static_bl_desc = new StaticTree(null, Tree.extra_blbits, 0, BL_CODES, MAX_BL_BITS);

	// Deflate

	var MAX_MEM_LEVEL = 9;
	var DEF_MEM_LEVEL = 8;

	function Config(good_length, max_lazy, nice_length, max_chain, func) {
		var that = this;
		that.good_length = good_length;
		that.max_lazy = max_lazy;
		that.nice_length = nice_length;
		that.max_chain = max_chain;
		that.func = func;
	}

	var STORED = 0;
	var FAST = 1;
	var SLOW = 2;
	var config_table = [ new Config(0, 0, 0, 0, STORED), new Config(4, 4, 8, 4, FAST), new Config(4, 5, 16, 8, FAST), new Config(4, 6, 32, 32, FAST),
			new Config(4, 4, 16, 16, SLOW), new Config(8, 16, 32, 32, SLOW), new Config(8, 16, 128, 128, SLOW), new Config(8, 32, 128, 256, SLOW),
			new Config(32, 128, 258, 1024, SLOW), new Config(32, 258, 258, 4096, SLOW) ];

	var z_errmsg = [ "need dictionary", // Z_NEED_DICT
	// 2
	"stream end", // Z_STREAM_END 1
	"", // Z_OK 0
	"", // Z_ERRNO (-1)
	"stream error", // Z_STREAM_ERROR (-2)
	"data error", // Z_DATA_ERROR (-3)
	"", // Z_MEM_ERROR (-4)
	"buffer error", // Z_BUF_ERROR (-5)
	"",// Z_VERSION_ERROR (-6)
	"" ];

	// block not completed, need more input or more output
	var NeedMore = 0;

	// block flush performed
	var BlockDone = 1;

	// finish started, need only more output at next deflate
	var FinishStarted = 2;

	// finish done, accept no more input or output
	var FinishDone = 3;

	// preset dictionary flag in zlib header
	var PRESET_DICT = 0x20;

	var INIT_STATE = 42;
	var BUSY_STATE = 113;
	var FINISH_STATE = 666;

	// The deflate compression method
	var Z_DEFLATED = 8;

	var STORED_BLOCK = 0;
	var STATIC_TREES = 1;
	var DYN_TREES = 2;

	var MIN_MATCH = 3;
	var MAX_MATCH = 258;
	var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

	function smaller(tree, n, m, depth) {
		var tn2 = tree[n * 2];
		var tm2 = tree[m * 2];
		return (tn2 < tm2 || (tn2 == tm2 && depth[n] <= depth[m]));
	}

	function Deflate() {

		var that = this;
		var strm; // pointer back to this zlib stream
		var status; // as the name implies
		// pending_buf; // output still pending
		var pending_buf_size; // size of pending_buf
		// pending_out; // next pending byte to output to the stream
		// pending; // nb of bytes in the pending buffer
		var method; // STORED (for zip only) or DEFLATED
		var last_flush; // value of flush param for previous deflate call

		var w_size; // LZ77 window size (32K by default)
		var w_bits; // log2(w_size) (8..16)
		var w_mask; // w_size - 1

		var window;
		// Sliding window. Input bytes are read into the second half of the window,
		// and move to the first half later to keep a dictionary of at least wSize
		// bytes. With this organization, matches are limited to a distance of
		// wSize-MAX_MATCH bytes, but this ensures that IO is always
		// performed with a length multiple of the block size. Also, it limits
		// the window size to 64K, which is quite useful on MSDOS.
		// To do: use the user input buffer as sliding window.

		var window_size;
		// Actual size of window: 2*wSize, except when the user input buffer
		// is directly used as sliding window.

		var prev;
		// Link to older string with same hash index. To limit the size of this
		// array to 64K, this link is maintained only for the last 32K strings.
		// An index in this array is thus a window index modulo 32K.

		var head; // Heads of the hash chains or NIL.

		var ins_h; // hash index of string to be inserted
		var hash_size; // number of elements in hash table
		var hash_bits; // log2(hash_size)
		var hash_mask; // hash_size-1

		// Number of bits by which ins_h must be shifted at each input
		// step. It must be such that after MIN_MATCH steps, the oldest
		// byte no longer takes part in the hash key, that is:
		// hash_shift * MIN_MATCH >= hash_bits
		var hash_shift;

		// Window position at the beginning of the current output block. Gets
		// negative when the window is moved backwards.

		var block_start;

		var match_length; // length of best match
		var prev_match; // previous match
		var match_available; // set if previous match exists
		var strstart; // start of string to insert
		var match_start; // start of matching string
		var lookahead; // number of valid bytes ahead in window

		// Length of the best match at previous step. Matches not greater than this
		// are discarded. This is used in the lazy match evaluation.
		var prev_length;

		// To speed up deflation, hash chains are never searched beyond this
		// length. A higher limit improves compression ratio but degrades the speed.
		var max_chain_length;

		// Attempt to find a better match only when the current match is strictly
		// smaller than this value. This mechanism is used only for compression
		// levels >= 4.
		var max_lazy_match;

		// Insert new strings in the hash table only if the match length is not
		// greater than this length. This saves time but degrades compression.
		// max_insert_length is used only for compression levels <= 3.

		var level; // compression level (1..9)
		var strategy; // favor or force Huffman coding

		// Use a faster search when the previous match is longer than this
		var good_match;

		// Stop searching when current match exceeds this
		var nice_match;

		var dyn_ltree; // literal and length tree
		var dyn_dtree; // distance tree
		var bl_tree; // Huffman tree for bit lengths

		var l_desc = new Tree(); // desc for literal tree
		var d_desc = new Tree(); // desc for distance tree
		var bl_desc = new Tree(); // desc for bit length tree

		// that.heap_len; // number of elements in the heap
		// that.heap_max; // element of largest frequency
		// The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
		// The same heap array is used to build all trees.

		// Depth of each subtree used as tie breaker for trees of equal frequency
		that.depth = [];

		var l_buf; // index for literals or lengths */

		// Size of match buffer for literals/lengths. There are 4 reasons for
		// limiting lit_bufsize to 64K:
		// - frequencies can be kept in 16 bit counters
		// - if compression is not successful for the first block, all input
		// data is still in the window so we can still emit a stored block even
		// when input comes from standard input. (This can also be done for
		// all blocks if lit_bufsize is not greater than 32K.)
		// - if compression is not successful for a file smaller than 64K, we can
		// even emit a stored file instead of a stored block (saving 5 bytes).
		// This is applicable only for zip (not gzip or zlib).
		// - creating new Huffman trees less frequently may not provide fast
		// adaptation to changes in the input data statistics. (Take for
		// example a binary file with poorly compressible code followed by
		// a highly compressible string table.) Smaller buffer sizes give
		// fast adaptation but have of course the overhead of transmitting
		// trees more frequently.
		// - I can't count above 4
		var lit_bufsize;

		var last_lit; // running index in l_buf

		// Buffer for distances. To simplify the code, d_buf and l_buf have
		// the same number of elements. To use different lengths, an extra flag
		// array would be necessary.

		var d_buf; // index of pendig_buf

		// that.opt_len; // bit length of current block with optimal trees
		// that.static_len; // bit length of current block with static trees
		var matches; // number of string matches in current block
		var last_eob_len; // bit length of EOB code for last block

		// Output buffer. bits are inserted starting at the bottom (least
		// significant bits).
		var bi_buf;

		// Number of valid bits in bi_buf. All bits above the last valid bit
		// are always zero.
		var bi_valid;

		// number of codes at each bit length for an optimal tree
		that.bl_count = [];

		// heap used to build the Huffman trees
		that.heap = [];

		dyn_ltree = [];
		dyn_dtree = [];
		bl_tree = [];

		function lm_init() {
			var i;
			window_size = 2 * w_size;

			head[hash_size - 1] = 0;
			for (i = 0; i < hash_size - 1; i++) {
				head[i] = 0;
			}

			// Set the default configuration parameters:
			max_lazy_match = config_table[level].max_lazy;
			good_match = config_table[level].good_length;
			nice_match = config_table[level].nice_length;
			max_chain_length = config_table[level].max_chain;

			strstart = 0;
			block_start = 0;
			lookahead = 0;
			match_length = prev_length = MIN_MATCH - 1;
			match_available = 0;
			ins_h = 0;
		}

		function init_block() {
			var i;
			// Initialize the trees.
			for (i = 0; i < L_CODES; i++)
				dyn_ltree[i * 2] = 0;
			for (i = 0; i < D_CODES; i++)
				dyn_dtree[i * 2] = 0;
			for (i = 0; i < BL_CODES; i++)
				bl_tree[i * 2] = 0;

			dyn_ltree[END_BLOCK * 2] = 1;
			that.opt_len = that.static_len = 0;
			last_lit = matches = 0;
		}

		// Initialize the tree data structures for a new zlib stream.
		function tr_init() {

			l_desc.dyn_tree = dyn_ltree;
			l_desc.stat_desc = StaticTree.static_l_desc;

			d_desc.dyn_tree = dyn_dtree;
			d_desc.stat_desc = StaticTree.static_d_desc;

			bl_desc.dyn_tree = bl_tree;
			bl_desc.stat_desc = StaticTree.static_bl_desc;

			bi_buf = 0;
			bi_valid = 0;
			last_eob_len = 8; // enough lookahead for inflate

			// Initialize the first block of the first file:
			init_block();
		}

		// Restore the heap property by moving down the tree starting at node k,
		// exchanging a node with the smallest of its two sons if necessary,
		// stopping
		// when the heap property is re-established (each father smaller than its
		// two sons).
		that.pqdownheap = function(tree, // the tree to restore
		k // node to move down
		) {
			var heap = that.heap;
			var v = heap[k];
			var j = k << 1; // left son of k
			while (j <= that.heap_len) {
				// Set j to the smallest of the two sons:
				if (j < that.heap_len && smaller(tree, heap[j + 1], heap[j], that.depth)) {
					j++;
				}
				// Exit if v is smaller than both sons
				if (smaller(tree, v, heap[j], that.depth))
					break;

				// Exchange v with the smallest son
				heap[k] = heap[j];
				k = j;
				// And continue down the tree, setting j to the left son of k
				j <<= 1;
			}
			heap[k] = v;
		};

		// Scan a literal or distance tree to determine the frequencies of the codes
		// in the bit length tree.
		function scan_tree(tree,// the tree to be scanned
		max_code // and its largest code of non zero frequency
		) {
			var n; // iterates over all tree elements
			var prevlen = -1; // last emitted length
			var curlen; // length of current code
			var nextlen = tree[0 * 2 + 1]; // length of next code
			var count = 0; // repeat count of the current code
			var max_count = 7; // max repeat count
			var min_count = 4; // min repeat count

			if (nextlen === 0) {
				max_count = 138;
				min_count = 3;
			}
			tree[(max_code + 1) * 2 + 1] = 0xffff; // guard

			for (n = 0; n <= max_code; n++) {
				curlen = nextlen;
				nextlen = tree[(n + 1) * 2 + 1];
				if (++count < max_count && curlen == nextlen) {
					continue;
				} else if (count < min_count) {
					bl_tree[curlen * 2] += count;
				} else if (curlen !== 0) {
					if (curlen != prevlen)
						bl_tree[curlen * 2]++;
					bl_tree[REP_3_6 * 2]++;
				} else if (count <= 10) {
					bl_tree[REPZ_3_10 * 2]++;
				} else {
					bl_tree[REPZ_11_138 * 2]++;
				}
				count = 0;
				prevlen = curlen;
				if (nextlen === 0) {
					max_count = 138;
					min_count = 3;
				} else if (curlen == nextlen) {
					max_count = 6;
					min_count = 3;
				} else {
					max_count = 7;
					min_count = 4;
				}
			}
		}

		// Construct the Huffman tree for the bit lengths and return the index in
		// bl_order of the last bit length code to send.
		function build_bl_tree() {
			var max_blindex; // index of last bit length code of non zero freq

			// Determine the bit length frequencies for literal and distance trees
			scan_tree(dyn_ltree, l_desc.max_code);
			scan_tree(dyn_dtree, d_desc.max_code);

			// Build the bit length tree:
			bl_desc.build_tree(that);
			// opt_len now includes the length of the tree representations, except
			// the lengths of the bit lengths codes and the 5+5+4 bits for the
			// counts.

			// Determine the number of bit length codes to send. The pkzip format
			// requires that at least 4 bit length codes be sent. (appnote.txt says
			// 3 but the actual value used is 4.)
			for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
				if (bl_tree[Tree.bl_order[max_blindex] * 2 + 1] !== 0)
					break;
			}
			// Update opt_len to include the bit length tree and counts
			that.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;

			return max_blindex;
		}

		// Output a byte on the stream.
		// IN assertion: there is enough room in pending_buf.
		function put_byte(p) {
			that.pending_buf[that.pending++] = p;
		}

		function put_short(w) {
			put_byte(w & 0xff);
			put_byte((w >>> 8) & 0xff);
		}

		function putShortMSB(b) {
			put_byte((b >> 8) & 0xff);
			put_byte((b & 0xff) & 0xff);
		}

		function send_bits(value, length) {
			var val, len = length;
			if (bi_valid > Buf_size - len) {
				val = value;
				// bi_buf |= (val << bi_valid);
				bi_buf |= ((val << bi_valid) & 0xffff);
				put_short(bi_buf);
				bi_buf = val >>> (Buf_size - bi_valid);
				bi_valid += len - Buf_size;
			} else {
				// bi_buf |= (value) << bi_valid;
				bi_buf |= (((value) << bi_valid) & 0xffff);
				bi_valid += len;
			}
		}

		function send_code(c, tree) {
			var c2 = c * 2;
			send_bits(tree[c2] & 0xffff, tree[c2 + 1] & 0xffff);
		}

		// Send a literal or distance tree in compressed form, using the codes in
		// bl_tree.
		function send_tree(tree,// the tree to be sent
		max_code // and its largest code of non zero frequency
		) {
			var n; // iterates over all tree elements
			var prevlen = -1; // last emitted length
			var curlen; // length of current code
			var nextlen = tree[0 * 2 + 1]; // length of next code
			var count = 0; // repeat count of the current code
			var max_count = 7; // max repeat count
			var min_count = 4; // min repeat count

			if (nextlen === 0) {
				max_count = 138;
				min_count = 3;
			}

			for (n = 0; n <= max_code; n++) {
				curlen = nextlen;
				nextlen = tree[(n + 1) * 2 + 1];
				if (++count < max_count && curlen == nextlen) {
					continue;
				} else if (count < min_count) {
					do {
						send_code(curlen, bl_tree);
					} while (--count !== 0);
				} else if (curlen !== 0) {
					if (curlen != prevlen) {
						send_code(curlen, bl_tree);
						count--;
					}
					send_code(REP_3_6, bl_tree);
					send_bits(count - 3, 2);
				} else if (count <= 10) {
					send_code(REPZ_3_10, bl_tree);
					send_bits(count - 3, 3);
				} else {
					send_code(REPZ_11_138, bl_tree);
					send_bits(count - 11, 7);
				}
				count = 0;
				prevlen = curlen;
				if (nextlen === 0) {
					max_count = 138;
					min_count = 3;
				} else if (curlen == nextlen) {
					max_count = 6;
					min_count = 3;
				} else {
					max_count = 7;
					min_count = 4;
				}
			}
		}

		// Send the header for a block using dynamic Huffman trees: the counts, the
		// lengths of the bit length codes, the literal tree and the distance tree.
		// IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
		function send_all_trees(lcodes, dcodes, blcodes) {
			var rank; // index in bl_order

			send_bits(lcodes - 257, 5); // not +255 as stated in appnote.txt
			send_bits(dcodes - 1, 5);
			send_bits(blcodes - 4, 4); // not -3 as stated in appnote.txt
			for (rank = 0; rank < blcodes; rank++) {
				send_bits(bl_tree[Tree.bl_order[rank] * 2 + 1], 3);
			}
			send_tree(dyn_ltree, lcodes - 1); // literal tree
			send_tree(dyn_dtree, dcodes - 1); // distance tree
		}

		// Flush the bit buffer, keeping at most 7 bits in it.
		function bi_flush() {
			if (bi_valid == 16) {
				put_short(bi_buf);
				bi_buf = 0;
				bi_valid = 0;
			} else if (bi_valid >= 8) {
				put_byte(bi_buf & 0xff);
				bi_buf >>>= 8;
				bi_valid -= 8;
			}
		}

		// Send one empty static block to give enough lookahead for inflate.
		// This takes 10 bits, of which 7 may remain in the bit buffer.
		// The current inflate code requires 9 bits of lookahead. If the
		// last two codes for the previous block (real code plus EOB) were coded
		// on 5 bits or less, inflate may have only 5+3 bits of lookahead to decode
		// the last real code. In this case we send two empty static blocks instead
		// of one. (There are no problems if the previous block is stored or fixed.)
		// To simplify the code, we assume the worst case of last real code encoded
		// on one bit only.
		function _tr_align() {
			send_bits(STATIC_TREES << 1, 3);
			send_code(END_BLOCK, StaticTree.static_ltree);

			bi_flush();

			// Of the 10 bits for the empty block, we have already sent
			// (10 - bi_valid) bits. The lookahead for the last real code (before
			// the EOB of the previous block) was thus at least one plus the length
			// of the EOB plus what we have just sent of the empty static block.
			if (1 + last_eob_len + 10 - bi_valid < 9) {
				send_bits(STATIC_TREES << 1, 3);
				send_code(END_BLOCK, StaticTree.static_ltree);
				bi_flush();
			}
			last_eob_len = 7;
		}

		// Save the match info and tally the frequency counts. Return true if
		// the current block must be flushed.
		function _tr_tally(dist, // distance of matched string
		lc // match length-MIN_MATCH or unmatched char (if dist==0)
		) {
			var out_length, in_length, dcode;
			that.pending_buf[d_buf + last_lit * 2] = (dist >>> 8) & 0xff;
			that.pending_buf[d_buf + last_lit * 2 + 1] = dist & 0xff;

			that.pending_buf[l_buf + last_lit] = lc & 0xff;
			last_lit++;

			if (dist === 0) {
				// lc is the unmatched char
				dyn_ltree[lc * 2]++;
			} else {
				matches++;
				// Here, lc is the match length - MIN_MATCH
				dist--; // dist = match distance - 1
				dyn_ltree[(Tree._length_code[lc] + LITERALS + 1) * 2]++;
				dyn_dtree[Tree.d_code(dist) * 2]++;
			}

			if ((last_lit & 0x1fff) === 0 && level > 2) {
				// Compute an upper bound for the compressed length
				out_length = last_lit * 8;
				in_length = strstart - block_start;
				for (dcode = 0; dcode < D_CODES; dcode++) {
					out_length += dyn_dtree[dcode * 2] * (5 + Tree.extra_dbits[dcode]);
				}
				out_length >>>= 3;
				if ((matches < Math.floor(last_lit / 2)) && out_length < Math.floor(in_length / 2))
					return true;
			}

			return (last_lit == lit_bufsize - 1);
			// We avoid equality with lit_bufsize because of wraparound at 64K
			// on 16 bit machines and because stored blocks are restricted to
			// 64K-1 bytes.
		}

		// Send the block data compressed using the given Huffman trees
		function compress_block(ltree, dtree) {
			var dist; // distance of matched string
			var lc; // match length or unmatched char (if dist === 0)
			var lx = 0; // running index in l_buf
			var code; // the code to send
			var extra; // number of extra bits to send

			if (last_lit !== 0) {
				do {
					dist = ((that.pending_buf[d_buf + lx * 2] << 8) & 0xff00) | (that.pending_buf[d_buf + lx * 2 + 1] & 0xff);
					lc = (that.pending_buf[l_buf + lx]) & 0xff;
					lx++;

					if (dist === 0) {
						send_code(lc, ltree); // send a literal byte
					} else {
						// Here, lc is the match length - MIN_MATCH
						code = Tree._length_code[lc];

						send_code(code + LITERALS + 1, ltree); // send the length
						// code
						extra = Tree.extra_lbits[code];
						if (extra !== 0) {
							lc -= Tree.base_length[code];
							send_bits(lc, extra); // send the extra length bits
						}
						dist--; // dist is now the match distance - 1
						code = Tree.d_code(dist);

						send_code(code, dtree); // send the distance code
						extra = Tree.extra_dbits[code];
						if (extra !== 0) {
							dist -= Tree.base_dist[code];
							send_bits(dist, extra); // send the extra distance bits
						}
					} // literal or match pair ?

					// Check that the overlay between pending_buf and d_buf+l_buf is
					// ok:
				} while (lx < last_lit);
			}

			send_code(END_BLOCK, ltree);
			last_eob_len = ltree[END_BLOCK * 2 + 1];
		}

		// Flush the bit buffer and align the output on a byte boundary
		function bi_windup() {
			if (bi_valid > 8) {
				put_short(bi_buf);
			} else if (bi_valid > 0) {
				put_byte(bi_buf & 0xff);
			}
			bi_buf = 0;
			bi_valid = 0;
		}

		// Copy a stored block, storing first the length and its
		// one's complement if requested.
		function copy_block(buf, // the input data
		len, // its length
		header // true if block header must be written
		) {
			bi_windup(); // align on byte boundary
			last_eob_len = 8; // enough lookahead for inflate

			if (header) {
				put_short(len);
				put_short(~len);
			}

			that.pending_buf.set(window.subarray(buf, buf + len), that.pending);
			that.pending += len;
		}

		// Send a stored block
		function _tr_stored_block(buf, // input block
		stored_len, // length of input block
		eof // true if this is the last block for a file
		) {
			send_bits((STORED_BLOCK << 1) + (eof ? 1 : 0), 3); // send block type
			copy_block(buf, stored_len, true); // with header
		}

		// Determine the best encoding for the current block: dynamic trees, static
		// trees or store, and output the encoded block to the zip file.
		function _tr_flush_block(buf, // input block, or NULL if too old
		stored_len, // length of input block
		eof // true if this is the last block for a file
		) {
			var opt_lenb, static_lenb;// opt_len and static_len in bytes
			var max_blindex = 0; // index of last bit length code of non zero freq

			// Build the Huffman trees unless a stored block is forced
			if (level > 0) {
				// Construct the literal and distance trees
				l_desc.build_tree(that);

				d_desc.build_tree(that);

				// At this point, opt_len and static_len are the total bit lengths
				// of
				// the compressed block data, excluding the tree representations.

				// Build the bit length tree for the above two trees, and get the
				// index
				// in bl_order of the last bit length code to send.
				max_blindex = build_bl_tree();

				// Determine the best encoding. Compute first the block length in
				// bytes
				opt_lenb = (that.opt_len + 3 + 7) >>> 3;
				static_lenb = (that.static_len + 3 + 7) >>> 3;

				if (static_lenb <= opt_lenb)
					opt_lenb = static_lenb;
			} else {
				opt_lenb = static_lenb = stored_len + 5; // force a stored block
			}

			if ((stored_len + 4 <= opt_lenb) && buf != -1) {
				// 4: two words for the lengths
				// The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
				// Otherwise we can't have processed more than WSIZE input bytes
				// since
				// the last block flush, because compression would have been
				// successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
				// transform a block into a stored block.
				_tr_stored_block(buf, stored_len, eof);
			} else if (static_lenb == opt_lenb) {
				send_bits((STATIC_TREES << 1) + (eof ? 1 : 0), 3);
				compress_block(StaticTree.static_ltree, StaticTree.static_dtree);
			} else {
				send_bits((DYN_TREES << 1) + (eof ? 1 : 0), 3);
				send_all_trees(l_desc.max_code + 1, d_desc.max_code + 1, max_blindex + 1);
				compress_block(dyn_ltree, dyn_dtree);
			}

			// The above check is made mod 2^32, for files larger than 512 MB
			// and uLong implemented on 32 bits.

			init_block();

			if (eof) {
				bi_windup();
			}
		}

		function flush_block_only(eof) {
			_tr_flush_block(block_start >= 0 ? block_start : -1, strstart - block_start, eof);
			block_start = strstart;
			strm.flush_pending();
		}

		// Fill the window when the lookahead becomes insufficient.
		// Updates strstart and lookahead.
		//
		// IN assertion: lookahead < MIN_LOOKAHEAD
		// OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
		// At least one byte has been read, or avail_in === 0; reads are
		// performed for at least two bytes (required for the zip translate_eol
		// option -- not supported here).
		function fill_window() {
			var n, m;
			var p;
			var more; // Amount of free space at the end of the window.

			do {
				more = (window_size - lookahead - strstart);

				// Deal with !@#$% 64K limit:
				if (more === 0 && strstart === 0 && lookahead === 0) {
					more = w_size;
				} else if (more == -1) {
					// Very unlikely, but possible on 16 bit machine if strstart ==
					// 0
					// and lookahead == 1 (input done one byte at time)
					more--;

					// If the window is almost full and there is insufficient
					// lookahead,
					// move the upper half to the lower one to make room in the
					// upper half.
				} else if (strstart >= w_size + w_size - MIN_LOOKAHEAD) {
					window.set(window.subarray(w_size, w_size + w_size), 0);

					match_start -= w_size;
					strstart -= w_size; // we now have strstart >= MAX_DIST
					block_start -= w_size;

					// Slide the hash table (could be avoided with 32 bit values
					// at the expense of memory usage). We slide even when level ==
					// 0
					// to keep the hash table consistent if we switch back to level
					// > 0
					// later. (Using level 0 permanently is not an optimal usage of
					// zlib, so we don't care about this pathological case.)

					n = hash_size;
					p = n;
					do {
						m = (head[--p] & 0xffff);
						head[p] = (m >= w_size ? m - w_size : 0);
					} while (--n !== 0);

					n = w_size;
					p = n;
					do {
						m = (prev[--p] & 0xffff);
						prev[p] = (m >= w_size ? m - w_size : 0);
						// If n is not on any hash chain, prev[n] is garbage but
						// its value will never be used.
					} while (--n !== 0);
					more += w_size;
				}

				if (strm.avail_in === 0)
					return;

				// If there was no sliding:
				// strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
				// more == window_size - lookahead - strstart
				// => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
				// => more >= window_size - 2*WSIZE + 2
				// In the BIG_MEM or MMAP case (not yet supported),
				// window_size == input_size + MIN_LOOKAHEAD &&
				// strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
				// Otherwise, window_size == 2*WSIZE so more >= 2.
				// If there was sliding, more >= WSIZE. So in all cases, more >= 2.

				n = strm.read_buf(window, strstart + lookahead, more);
				lookahead += n;

				// Initialize the hash value now that we have some input:
				if (lookahead >= MIN_MATCH) {
					ins_h = window[strstart] & 0xff;
					ins_h = (((ins_h) << hash_shift) ^ (window[strstart + 1] & 0xff)) & hash_mask;
				}
				// If the whole input has less than MIN_MATCH bytes, ins_h is
				// garbage,
				// but this is not important since only literal bytes will be
				// emitted.
			} while (lookahead < MIN_LOOKAHEAD && strm.avail_in !== 0);
		}

		// Copy without compression as much as possible from the input stream,
		// return
		// the current block state.
		// This function does not insert new strings in the dictionary since
		// uncompressible data is probably not useful. This function is used
		// only for the level=0 compression option.
		// NOTE: this function should be optimized to avoid extra copying from
		// window to pending_buf.
		function deflate_stored(flush) {
			// Stored blocks are limited to 0xffff bytes, pending_buf is limited
			// to pending_buf_size, and each stored block has a 5 byte header:

			var max_block_size = 0xffff;
			var max_start;

			if (max_block_size > pending_buf_size - 5) {
				max_block_size = pending_buf_size - 5;
			}

			// Copy as much as possible from input to output:
			while (true) {
				// Fill the window as much as possible:
				if (lookahead <= 1) {
					fill_window();
					if (lookahead === 0 && flush == Z_NO_FLUSH)
						return NeedMore;
					if (lookahead === 0)
						break; // flush the current block
				}

				strstart += lookahead;
				lookahead = 0;

				// Emit a stored block if pending_buf will be full:
				max_start = block_start + max_block_size;
				if (strstart === 0 || strstart >= max_start) {
					// strstart === 0 is possible when wraparound on 16-bit machine
					lookahead = (strstart - max_start);
					strstart = max_start;

					flush_block_only(false);
					if (strm.avail_out === 0)
						return NeedMore;

				}

				// Flush if we may have to slide, otherwise block_start may become
				// negative and the data will be gone:
				if (strstart - block_start >= w_size - MIN_LOOKAHEAD) {
					flush_block_only(false);
					if (strm.avail_out === 0)
						return NeedMore;
				}
			}

			flush_block_only(flush == Z_FINISH);
			if (strm.avail_out === 0)
				return (flush == Z_FINISH) ? FinishStarted : NeedMore;

			return flush == Z_FINISH ? FinishDone : BlockDone;
		}

		function longest_match(cur_match) {
			var chain_length = max_chain_length; // max hash chain length
			var scan = strstart; // current string
			var match; // matched string
			var len; // length of current match
			var best_len = prev_length; // best match length so far
			var limit = strstart > (w_size - MIN_LOOKAHEAD) ? strstart - (w_size - MIN_LOOKAHEAD) : 0;
			var _nice_match = nice_match;

			// Stop when cur_match becomes <= limit. To simplify the code,
			// we prevent matches with the string of window index 0.

			var wmask = w_mask;

			var strend = strstart + MAX_MATCH;
			var scan_end1 = window[scan + best_len - 1];
			var scan_end = window[scan + best_len];

			// The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of
			// 16.
			// It is easy to get rid of this optimization if necessary.

			// Do not waste too much time if we already have a good match:
			if (prev_length >= good_match) {
				chain_length >>= 2;
			}

			// Do not look for matches beyond the end of the input. This is
			// necessary
			// to make deflate deterministic.
			if (_nice_match > lookahead)
				_nice_match = lookahead;

			do {
				match = cur_match;

				// Skip to next match if the match length cannot increase
				// or if the match length is less than 2:
				if (window[match + best_len] != scan_end || window[match + best_len - 1] != scan_end1 || window[match] != window[scan]
						|| window[++match] != window[scan + 1])
					continue;

				// The check at best_len-1 can be removed because it will be made
				// again later. (This heuristic is not always a win.)
				// It is not necessary to compare scan[2] and match[2] since they
				// are always equal when the other bytes match, given that
				// the hash keys are equal and that HASH_BITS >= 8.
				scan += 2;
				match++;

				// We check for insufficient lookahead only every 8th comparison;
				// the 256th check will be made at strstart+258.
				do {
				} while (window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match]
						&& window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match]
						&& window[++scan] == window[++match] && window[++scan] == window[++match] && scan < strend);

				len = MAX_MATCH - (strend - scan);
				scan = strend - MAX_MATCH;

				if (len > best_len) {
					match_start = cur_match;
					best_len = len;
					if (len >= _nice_match)
						break;
					scan_end1 = window[scan + best_len - 1];
					scan_end = window[scan + best_len];
				}

			} while ((cur_match = (prev[cur_match & wmask] & 0xffff)) > limit && --chain_length !== 0);

			if (best_len <= lookahead)
				return best_len;
			return lookahead;
		}

		// Compress as much as possible from the input stream, return the current
		// block state.
		// This function does not perform lazy evaluation of matches and inserts
		// new strings in the dictionary only for unmatched strings or for short
		// matches. It is used only for the fast compression options.
		function deflate_fast(flush) {
			// short hash_head = 0; // head of the hash chain
			var hash_head = 0; // head of the hash chain
			var bflush; // set if current block must be flushed

			while (true) {
				// Make sure that we always have enough lookahead, except
				// at the end of the input file. We need MAX_MATCH bytes
				// for the next match, plus MIN_MATCH bytes to insert the
				// string following the next match.
				if (lookahead < MIN_LOOKAHEAD) {
					fill_window();
					if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
						return NeedMore;
					}
					if (lookahead === 0)
						break; // flush the current block
				}

				// Insert the string window[strstart .. strstart+2] in the
				// dictionary, and set hash_head to the head of the hash chain:
				if (lookahead >= MIN_MATCH) {
					ins_h = (((ins_h) << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;

					// prev[strstart&w_mask]=hash_head=head[ins_h];
					hash_head = (head[ins_h] & 0xffff);
					prev[strstart & w_mask] = head[ins_h];
					head[ins_h] = strstart;
				}

				// Find the longest match, discarding those <= prev_length.
				// At this point we have always match_length < MIN_MATCH

				if (hash_head !== 0 && ((strstart - hash_head) & 0xffff) <= w_size - MIN_LOOKAHEAD) {
					// To simplify the code, we prevent matches with the string
					// of window index 0 (in particular we have to avoid a match
					// of the string with itself at the start of the input file).
					if (strategy != Z_HUFFMAN_ONLY) {
						match_length = longest_match(hash_head);
					}
					// longest_match() sets match_start
				}
				if (match_length >= MIN_MATCH) {
					// check_match(strstart, match_start, match_length);

					bflush = _tr_tally(strstart - match_start, match_length - MIN_MATCH);

					lookahead -= match_length;

					// Insert new strings in the hash table only if the match length
					// is not too large. This saves time but degrades compression.
					if (match_length <= max_lazy_match && lookahead >= MIN_MATCH) {
						match_length--; // string at strstart already in hash table
						do {
							strstart++;

							ins_h = ((ins_h << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
							// prev[strstart&w_mask]=hash_head=head[ins_h];
							hash_head = (head[ins_h] & 0xffff);
							prev[strstart & w_mask] = head[ins_h];
							head[ins_h] = strstart;

							// strstart never exceeds WSIZE-MAX_MATCH, so there are
							// always MIN_MATCH bytes ahead.
						} while (--match_length !== 0);
						strstart++;
					} else {
						strstart += match_length;
						match_length = 0;
						ins_h = window[strstart] & 0xff;

						ins_h = (((ins_h) << hash_shift) ^ (window[strstart + 1] & 0xff)) & hash_mask;
						// If lookahead < MIN_MATCH, ins_h is garbage, but it does
						// not
						// matter since it will be recomputed at next deflate call.
					}
				} else {
					// No match, output a literal byte

					bflush = _tr_tally(0, window[strstart] & 0xff);
					lookahead--;
					strstart++;
				}
				if (bflush) {

					flush_block_only(false);
					if (strm.avail_out === 0)
						return NeedMore;
				}
			}

			flush_block_only(flush == Z_FINISH);
			if (strm.avail_out === 0) {
				if (flush == Z_FINISH)
					return FinishStarted;
				else
					return NeedMore;
			}
			return flush == Z_FINISH ? FinishDone : BlockDone;
		}

		// Same as above, but achieves better compression. We use a lazy
		// evaluation for matches: a match is finally adopted only if there is
		// no better match at the next window position.
		function deflate_slow(flush) {
			// short hash_head = 0; // head of hash chain
			var hash_head = 0; // head of hash chain
			var bflush; // set if current block must be flushed
			var max_insert;

			// Process the input block.
			while (true) {
				// Make sure that we always have enough lookahead, except
				// at the end of the input file. We need MAX_MATCH bytes
				// for the next match, plus MIN_MATCH bytes to insert the
				// string following the next match.

				if (lookahead < MIN_LOOKAHEAD) {
					fill_window();
					if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
						return NeedMore;
					}
					if (lookahead === 0)
						break; // flush the current block
				}

				// Insert the string window[strstart .. strstart+2] in the
				// dictionary, and set hash_head to the head of the hash chain:

				if (lookahead >= MIN_MATCH) {
					ins_h = (((ins_h) << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
					// prev[strstart&w_mask]=hash_head=head[ins_h];
					hash_head = (head[ins_h] & 0xffff);
					prev[strstart & w_mask] = head[ins_h];
					head[ins_h] = strstart;
				}

				// Find the longest match, discarding those <= prev_length.
				prev_length = match_length;
				prev_match = match_start;
				match_length = MIN_MATCH - 1;

				if (hash_head !== 0 && prev_length < max_lazy_match && ((strstart - hash_head) & 0xffff) <= w_size - MIN_LOOKAHEAD) {
					// To simplify the code, we prevent matches with the string
					// of window index 0 (in particular we have to avoid a match
					// of the string with itself at the start of the input file).

					if (strategy != Z_HUFFMAN_ONLY) {
						match_length = longest_match(hash_head);
					}
					// longest_match() sets match_start

					if (match_length <= 5 && (strategy == Z_FILTERED || (match_length == MIN_MATCH && strstart - match_start > 4096))) {

						// If prev_match is also MIN_MATCH, match_start is garbage
						// but we will ignore the current match anyway.
						match_length = MIN_MATCH - 1;
					}
				}

				// If there was a match at the previous step and the current
				// match is not better, output the previous match:
				if (prev_length >= MIN_MATCH && match_length <= prev_length) {
					max_insert = strstart + lookahead - MIN_MATCH;
					// Do not insert strings in hash table beyond this.

					// check_match(strstart-1, prev_match, prev_length);

					bflush = _tr_tally(strstart - 1 - prev_match, prev_length - MIN_MATCH);

					// Insert in hash table all strings up to the end of the match.
					// strstart-1 and strstart are already inserted. If there is not
					// enough lookahead, the last two strings are not inserted in
					// the hash table.
					lookahead -= prev_length - 1;
					prev_length -= 2;
					do {
						if (++strstart <= max_insert) {
							ins_h = (((ins_h) << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
							// prev[strstart&w_mask]=hash_head=head[ins_h];
							hash_head = (head[ins_h] & 0xffff);
							prev[strstart & w_mask] = head[ins_h];
							head[ins_h] = strstart;
						}
					} while (--prev_length !== 0);
					match_available = 0;
					match_length = MIN_MATCH - 1;
					strstart++;

					if (bflush) {
						flush_block_only(false);
						if (strm.avail_out === 0)
							return NeedMore;
					}
				} else if (match_available !== 0) {

					// If there was no match at the previous position, output a
					// single literal. If there was a match but the current match
					// is longer, truncate the previous match to a single literal.

					bflush = _tr_tally(0, window[strstart - 1] & 0xff);

					if (bflush) {
						flush_block_only(false);
					}
					strstart++;
					lookahead--;
					if (strm.avail_out === 0)
						return NeedMore;
				} else {
					// There is no previous match to compare with, wait for
					// the next step to decide.

					match_available = 1;
					strstart++;
					lookahead--;
				}
			}

			if (match_available !== 0) {
				bflush = _tr_tally(0, window[strstart - 1] & 0xff);
				match_available = 0;
			}
			flush_block_only(flush == Z_FINISH);

			if (strm.avail_out === 0) {
				if (flush == Z_FINISH)
					return FinishStarted;
				else
					return NeedMore;
			}

			return flush == Z_FINISH ? FinishDone : BlockDone;
		}

		function deflateReset(strm) {
			strm.total_in = strm.total_out = 0;
			strm.msg = null; //
			
			that.pending = 0;
			that.pending_out = 0;

			status = BUSY_STATE;

			last_flush = Z_NO_FLUSH;

			tr_init();
			lm_init();
			return Z_OK;
		}

		that.deflateInit = function(strm, _level, bits, _method, memLevel, _strategy) {
			if (!_method)
				_method = Z_DEFLATED;
			if (!memLevel)
				memLevel = DEF_MEM_LEVEL;
			if (!_strategy)
				_strategy = Z_DEFAULT_STRATEGY;

			// byte[] my_version=ZLIB_VERSION;

			//
			// if (!version || version[0] != my_version[0]
			// || stream_size != sizeof(z_stream)) {
			// return Z_VERSION_ERROR;
			// }

			strm.msg = null;

			if (_level == Z_DEFAULT_COMPRESSION)
				_level = 6;

			if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || _method != Z_DEFLATED || bits < 9 || bits > 15 || _level < 0 || _level > 9 || _strategy < 0
					|| _strategy > Z_HUFFMAN_ONLY) {
				return Z_STREAM_ERROR;
			}

			strm.dstate = that;

			w_bits = bits;
			w_size = 1 << w_bits;
			w_mask = w_size - 1;

			hash_bits = memLevel + 7;
			hash_size = 1 << hash_bits;
			hash_mask = hash_size - 1;
			hash_shift = Math.floor((hash_bits + MIN_MATCH - 1) / MIN_MATCH);

			window = new Uint8Array(w_size * 2);
			prev = [];
			head = [];

			lit_bufsize = 1 << (memLevel + 6); // 16K elements by default

			// We overlay pending_buf and d_buf+l_buf. This works since the average
			// output size for (length,distance) codes is <= 24 bits.
			that.pending_buf = new Uint8Array(lit_bufsize * 4);
			pending_buf_size = lit_bufsize * 4;

			d_buf = Math.floor(lit_bufsize / 2);
			l_buf = (1 + 2) * lit_bufsize;

			level = _level;

			strategy = _strategy;
			method = _method & 0xff;

			return deflateReset(strm);
		};

		that.deflateEnd = function() {
			if (status != INIT_STATE && status != BUSY_STATE && status != FINISH_STATE) {
				return Z_STREAM_ERROR;
			}
			// Deallocate in reverse order of allocations:
			that.pending_buf = null;
			head = null;
			prev = null;
			window = null;
			// free
			that.dstate = null;
			return status == BUSY_STATE ? Z_DATA_ERROR : Z_OK;
		};

		that.deflateParams = function(strm, _level, _strategy) {
			var err = Z_OK;

			if (_level == Z_DEFAULT_COMPRESSION) {
				_level = 6;
			}
			if (_level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
				return Z_STREAM_ERROR;
			}

			if (config_table[level].func != config_table[_level].func && strm.total_in !== 0) {
				// Flush the last buffer:
				err = strm.deflate(Z_PARTIAL_FLUSH);
			}

			if (level != _level) {
				level = _level;
				max_lazy_match = config_table[level].max_lazy;
				good_match = config_table[level].good_length;
				nice_match = config_table[level].nice_length;
				max_chain_length = config_table[level].max_chain;
			}
			strategy = _strategy;
			return err;
		};

		that.deflateSetDictionary = function(strm, dictionary, dictLength) {
			var length = dictLength;
			var n, index = 0;

			if (!dictionary || status != INIT_STATE)
				return Z_STREAM_ERROR;

			if (length < MIN_MATCH)
				return Z_OK;
			if (length > w_size - MIN_LOOKAHEAD) {
				length = w_size - MIN_LOOKAHEAD;
				index = dictLength - length; // use the tail of the dictionary
			}
			window.set(dictionary.subarray(index, index + length), 0);

			strstart = length;
			block_start = length;

			// Insert all strings in the hash table (except for the last two bytes).
			// s->lookahead stays null, so s->ins_h will be recomputed at the next
			// call of fill_window.

			ins_h = window[0] & 0xff;
			ins_h = (((ins_h) << hash_shift) ^ (window[1] & 0xff)) & hash_mask;

			for (n = 0; n <= length - MIN_MATCH; n++) {
				ins_h = (((ins_h) << hash_shift) ^ (window[(n) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
				prev[n & w_mask] = head[ins_h];
				head[ins_h] = n;
			}
			return Z_OK;
		};

		that.deflate = function(_strm, flush) {
			var i, header, level_flags, old_flush, bstate;

			if (flush > Z_FINISH || flush < 0) {
				return Z_STREAM_ERROR;
			}

			if (!_strm.next_out || (!_strm.next_in && _strm.avail_in !== 0) || (status == FINISH_STATE && flush != Z_FINISH)) {
				_strm.msg = z_errmsg[Z_NEED_DICT - (Z_STREAM_ERROR)];
				return Z_STREAM_ERROR;
			}
			if (_strm.avail_out === 0) {
				_strm.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
				return Z_BUF_ERROR;
			}

			strm = _strm; // just in case
			old_flush = last_flush;
			last_flush = flush;

			// Write the zlib header
			if (status == INIT_STATE) {
				header = (Z_DEFLATED + ((w_bits - 8) << 4)) << 8;
				level_flags = ((level - 1) & 0xff) >> 1;

				if (level_flags > 3)
					level_flags = 3;
				header |= (level_flags << 6);
				if (strstart !== 0)
					header |= PRESET_DICT;
				header += 31 - (header % 31);

				status = BUSY_STATE;
				putShortMSB(header);
			}

			// Flush as much pending output as possible
			if (that.pending !== 0) {
				strm.flush_pending();
				if (strm.avail_out === 0) {
					// console.log(" avail_out==0");
					// Since avail_out is 0, deflate will be called again with
					// more output space, but possibly with both pending and
					// avail_in equal to zero. There won't be anything to do,
					// but this is not an error situation so make sure we
					// return OK instead of BUF_ERROR at next call of deflate:
					last_flush = -1;
					return Z_OK;
				}

				// Make sure there is something to do and avoid duplicate
				// consecutive
				// flushes. For repeated and useless calls with Z_FINISH, we keep
				// returning Z_STREAM_END instead of Z_BUFF_ERROR.
			} else if (strm.avail_in === 0 && flush <= old_flush && flush != Z_FINISH) {
				strm.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
				return Z_BUF_ERROR;
			}

			// User must not provide more input after the first FINISH:
			if (status == FINISH_STATE && strm.avail_in !== 0) {
				_strm.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
				return Z_BUF_ERROR;
			}

			// Start a new block or continue the current one.
			if (strm.avail_in !== 0 || lookahead !== 0 || (flush != Z_NO_FLUSH && status != FINISH_STATE)) {
				bstate = -1;
				switch (config_table[level].func) {
				case STORED:
					bstate = deflate_stored(flush);
					break;
				case FAST:
					bstate = deflate_fast(flush);
					break;
				case SLOW:
					bstate = deflate_slow(flush);
					break;
				default:
				}

				if (bstate == FinishStarted || bstate == FinishDone) {
					status = FINISH_STATE;
				}
				if (bstate == NeedMore || bstate == FinishStarted) {
					if (strm.avail_out === 0) {
						last_flush = -1; // avoid BUF_ERROR next call, see above
					}
					return Z_OK;
					// If flush != Z_NO_FLUSH && avail_out === 0, the next call
					// of deflate should use the same flush parameter to make sure
					// that the flush is complete. So we don't have to output an
					// empty block here, this will be done at next call. This also
					// ensures that for a very small output buffer, we emit at most
					// one empty block.
				}

				if (bstate == BlockDone) {
					if (flush == Z_PARTIAL_FLUSH) {
						_tr_align();
					} else { // FULL_FLUSH or SYNC_FLUSH
						_tr_stored_block(0, 0, false);
						// For a full flush, this empty block will be recognized
						// as a special marker by inflate_sync().
						if (flush == Z_FULL_FLUSH) {
							// state.head[s.hash_size-1]=0;
							for (i = 0; i < hash_size/*-1*/; i++)
								// forget history
								head[i] = 0;
						}
					}
					strm.flush_pending();
					if (strm.avail_out === 0) {
						last_flush = -1; // avoid BUF_ERROR at next call, see above
						return Z_OK;
					}
				}
			}

			if (flush != Z_FINISH)
				return Z_OK;
			return Z_STREAM_END;
		};
	}

	// ZStream

	function ZStream() {
		var that = this;
		that.next_in_index = 0;
		that.next_out_index = 0;
		// that.next_in; // next input byte
		that.avail_in = 0; // number of bytes available at next_in
		that.total_in = 0; // total nb of input bytes read so far
		// that.next_out; // next output byte should be put there
		that.avail_out = 0; // remaining free space at next_out
		that.total_out = 0; // total nb of bytes output so far
		// that.msg;
		// that.dstate;
	}

	ZStream.prototype = {
		deflateInit : function(level, bits) {
			var that = this;
			that.dstate = new Deflate();
			if (!bits)
				bits = MAX_BITS;
			return that.dstate.deflateInit(that, level, bits);
		},

		deflate : function(flush) {
			var that = this;
			if (!that.dstate) {
				return Z_STREAM_ERROR;
			}
			return that.dstate.deflate(that, flush);
		},

		deflateEnd : function() {
			var that = this;
			if (!that.dstate)
				return Z_STREAM_ERROR;
			var ret = that.dstate.deflateEnd();
			that.dstate = null;
			return ret;
		},

		deflateParams : function(level, strategy) {
			var that = this;
			if (!that.dstate)
				return Z_STREAM_ERROR;
			return that.dstate.deflateParams(that, level, strategy);
		},

		deflateSetDictionary : function(dictionary, dictLength) {
			var that = this;
			if (!that.dstate)
				return Z_STREAM_ERROR;
			return that.dstate.deflateSetDictionary(that, dictionary, dictLength);
		},

		// Read a new buffer from the current input stream, update the
		// total number of bytes read. All deflate() input goes through
		// this function so some applications may wish to modify it to avoid
		// allocating a large strm->next_in buffer and copying from it.
		// (See also flush_pending()).
		read_buf : function(buf, start, size) {
			var that = this;
			var len = that.avail_in;
			if (len > size)
				len = size;
			if (len === 0)
				return 0;
			that.avail_in -= len;
			buf.set(that.next_in.subarray(that.next_in_index, that.next_in_index + len), start);
			that.next_in_index += len;
			that.total_in += len;
			return len;
		},

		// Flush as much pending output as possible. All deflate() output goes
		// through this function so some applications may wish to modify it
		// to avoid allocating a large strm->next_out buffer and copying into it.
		// (See also read_buf()).
		flush_pending : function() {
			var that = this;
			var len = that.dstate.pending;

			if (len > that.avail_out)
				len = that.avail_out;
			if (len === 0)
				return;

			// if (that.dstate.pending_buf.length <= that.dstate.pending_out || that.next_out.length <= that.next_out_index
			// || that.dstate.pending_buf.length < (that.dstate.pending_out + len) || that.next_out.length < (that.next_out_index +
			// len)) {
			// console.log(that.dstate.pending_buf.length + ", " + that.dstate.pending_out + ", " + that.next_out.length + ", " +
			// that.next_out_index + ", " + len);
			// console.log("avail_out=" + that.avail_out);
			// }

			that.next_out.set(that.dstate.pending_buf.subarray(that.dstate.pending_out, that.dstate.pending_out + len), that.next_out_index);

			that.next_out_index += len;
			that.dstate.pending_out += len;
			that.total_out += len;
			that.avail_out -= len;
			that.dstate.pending -= len;
			if (that.dstate.pending === 0) {
				that.dstate.pending_out = 0;
			}
		}
	};

	// Deflater

	function Deflater(level) {
		var that = this;
		var z = new ZStream();
		var bufsize = 512;
		var flush = Z_NO_FLUSH;
		var buf = new Uint8Array(bufsize);

		if (typeof level == "undefined")
			level = Z_DEFAULT_COMPRESSION;
		z.deflateInit(level);
		z.next_out = buf;

		that.append = function(data, onprogress) {
			var err, buffers = [], lastIndex = 0, bufferIndex = 0, bufferSize = 0, array;
			if (!data.length)
				return;
			z.next_in_index = 0;
			z.next_in = data;
			z.avail_in = data.length;
			do {
				z.next_out_index = 0;
				z.avail_out = bufsize;
				err = z.deflate(flush);
				if (err != Z_OK)
					throw "deflating: " + z.msg;
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
			var err, buffers = [], bufferIndex = 0, bufferSize = 0, array;
			do {
				z.next_out_index = 0;
				z.avail_out = bufsize;
				err = z.deflate(Z_FINISH);
				if (err != Z_STREAM_END && err != Z_OK)
					throw "deflating: " + z.msg;
				if (bufsize - z.avail_out > 0)
					buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
				bufferSize += z.next_out_index;
			} while (z.avail_in > 0 || z.avail_out === 0);
			z.deflateEnd();
			array = new Uint8Array(bufferSize);
			buffers.forEach(function(chunk) {
				array.set(chunk, bufferIndex);
				bufferIndex += chunk.length;
			});
			return array;
		};
	}

	var deflater;

	if (obj.zip)
		obj.zip.Deflater = Deflater;
	else {
		deflater = new Deflater();
		obj.addEventListener("message", function(event) {
			var message = event.data;
			if (message.init) {
				deflater = new Deflater(message.level);
				obj.postMessage({
					oninit : true
				});
			}
			if (message.append)
				obj.postMessage({
					onappend : true,
					data : deflater.append(message.data, function(current) {
						obj.postMessage({
							progress : true,
							current : current
						});
					})
				});
			if (message.flush)
				obj.postMessage({
					onflush : true,
					data : deflater.flush()
				});
		}, false);
	}

})(self);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYzE0N2E1N2Y5ZmJlN2I3N2RiODMud29ya2VyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL1RoaXJkUGFydHkvV29ya2Vycy9kZWZsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiYnVpbGQvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vbm9kZV9tb2R1bGVzL3N0cmluZy1yZXBsYWNlLXdlYnBhY2stcGx1Z2luL2xvYWRlci5qcz9pZD03NnoxZmFscmZ1dyEuL25vZGVfbW9kdWxlcy9zdHJpbmctcmVwbGFjZS13ZWJwYWNrLXBsdWdpbi9sb2FkZXIuanM/aWQ9YTU0MzRpcGFoeW4hLi9ub2RlX21vZHVsZXMvdGVycmlhanMvYnVpbGRwcm9jZXNzL3JlbW92ZUNlc2l1bURlYnVnUHJhZ21hcy5qcyEuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL1RoaXJkUGFydHkvV29ya2Vycy9kZWZsYXRlLmpzXCIpO1xuIiwiLypcbiBDb3B5cmlnaHQgKGMpIDIwMTMgR2lsZGFzIExvcm1lYXUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cbiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuXG4gMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgXG4gbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIFxuIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG4gMy4gVGhlIG5hbWVzIG9mIHRoZSBhdXRob3JzIG1heSBub3QgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHNcbiBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cblxuIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgYGBBUyBJUycnIEFORCBBTlkgRVhQUkVTU0VEIE9SIElNUExJRUQgV0FSUkFOVElFUyxcbiBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIEpDUkFGVCxcbiBJTkMuIE9SIEFOWSBDT05UUklCVVRPUlMgVE8gVEhJUyBTT0ZUV0FSRSBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULFxuIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1RcbiBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSxcbiBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkdcbiBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsXG4gRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuXG4vKlxuICogVGhpcyBwcm9ncmFtIGlzIGJhc2VkIG9uIEpabGliIDEuMC4yIHltbmssIEpDcmFmdCxJbmMuXG4gKiBKWmxpYiBpcyBiYXNlZCBvbiB6bGliLTEuMS4zLCBzbyBhbGwgY3JlZGl0IHNob3VsZCBnbyBhdXRob3JzXG4gKiBKZWFuLWxvdXAgR2FpbGx5KGpsb3VwQGd6aXAub3JnKSBhbmQgTWFyayBBZGxlcihtYWRsZXJAYWx1bW5pLmNhbHRlY2guZWR1KVxuICogYW5kIGNvbnRyaWJ1dG9ycyBvZiB6bGliLlxuICovXG5cbihmdW5jdGlvbihvYmopIHtcblxuXHQvLyBHbG9iYWxcblxuXHR2YXIgTUFYX0JJVFMgPSAxNTtcblx0dmFyIERfQ09ERVMgPSAzMDtcblx0dmFyIEJMX0NPREVTID0gMTk7XG5cblx0dmFyIExFTkdUSF9DT0RFUyA9IDI5O1xuXHR2YXIgTElURVJBTFMgPSAyNTY7XG5cdHZhciBMX0NPREVTID0gKExJVEVSQUxTICsgMSArIExFTkdUSF9DT0RFUyk7XG5cdHZhciBIRUFQX1NJWkUgPSAoMiAqIExfQ09ERVMgKyAxKTtcblxuXHR2YXIgRU5EX0JMT0NLID0gMjU2O1xuXG5cdC8vIEJpdCBsZW5ndGggY29kZXMgbXVzdCBub3QgZXhjZWVkIE1BWF9CTF9CSVRTIGJpdHNcblx0dmFyIE1BWF9CTF9CSVRTID0gNztcblxuXHQvLyByZXBlYXQgcHJldmlvdXMgYml0IGxlbmd0aCAzLTYgdGltZXMgKDIgYml0cyBvZiByZXBlYXQgY291bnQpXG5cdHZhciBSRVBfM182ID0gMTY7XG5cblx0Ly8gcmVwZWF0IGEgemVybyBsZW5ndGggMy0xMCB0aW1lcyAoMyBiaXRzIG9mIHJlcGVhdCBjb3VudClcblx0dmFyIFJFUFpfM18xMCA9IDE3O1xuXG5cdC8vIHJlcGVhdCBhIHplcm8gbGVuZ3RoIDExLTEzOCB0aW1lcyAoNyBiaXRzIG9mIHJlcGVhdCBjb3VudClcblx0dmFyIFJFUFpfMTFfMTM4ID0gMTg7XG5cblx0Ly8gVGhlIGxlbmd0aHMgb2YgdGhlIGJpdCBsZW5ndGggY29kZXMgYXJlIHNlbnQgaW4gb3JkZXIgb2YgZGVjcmVhc2luZ1xuXHQvLyBwcm9iYWJpbGl0eSwgdG8gYXZvaWQgdHJhbnNtaXR0aW5nIHRoZSBsZW5ndGhzIGZvciB1bnVzZWQgYml0XG5cdC8vIGxlbmd0aCBjb2Rlcy5cblxuXHR2YXIgQnVmX3NpemUgPSA4ICogMjtcblxuXHQvLyBKWmxpYiB2ZXJzaW9uIDogXCIxLjAuMlwiXG5cdHZhciBaX0RFRkFVTFRfQ09NUFJFU1NJT04gPSAtMTtcblxuXHQvLyBjb21wcmVzc2lvbiBzdHJhdGVneVxuXHR2YXIgWl9GSUxURVJFRCA9IDE7XG5cdHZhciBaX0hVRkZNQU5fT05MWSA9IDI7XG5cdHZhciBaX0RFRkFVTFRfU1RSQVRFR1kgPSAwO1xuXG5cdHZhciBaX05PX0ZMVVNIID0gMDtcblx0dmFyIFpfUEFSVElBTF9GTFVTSCA9IDE7XG5cdHZhciBaX0ZVTExfRkxVU0ggPSAzO1xuXHR2YXIgWl9GSU5JU0ggPSA0O1xuXG5cdHZhciBaX09LID0gMDtcblx0dmFyIFpfU1RSRUFNX0VORCA9IDE7XG5cdHZhciBaX05FRURfRElDVCA9IDI7XG5cdHZhciBaX1NUUkVBTV9FUlJPUiA9IC0yO1xuXHR2YXIgWl9EQVRBX0VSUk9SID0gLTM7XG5cdHZhciBaX0JVRl9FUlJPUiA9IC01O1xuXG5cdC8vIFRyZWVcblxuXHQvLyBzZWUgZGVmaW5pdGlvbiBvZiBhcnJheSBkaXN0X2NvZGUgYmVsb3dcblx0dmFyIF9kaXN0X2NvZGUgPSBbIDAsIDEsIDIsIDMsIDQsIDQsIDUsIDUsIDYsIDYsIDYsIDYsIDcsIDcsIDcsIDcsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDksIDksIDksIDksIDksIDksIDksIDksIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLFxuXHRcdFx0MTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTEsIDExLCAxMSwgMTEsIDExLCAxMSwgMTEsIDExLCAxMSwgMTEsIDExLCAxMSwgMTEsIDExLCAxMSwgMTEsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsXG5cdFx0XHQxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMyxcblx0XHRcdDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LFxuXHRcdFx0MTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsXG5cdFx0XHQxNCwgMTQsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSxcblx0XHRcdDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMCwgMCwgMTYsIDE3LCAxOCwgMTgsIDE5LCAxOSxcblx0XHRcdDIwLCAyMCwgMjAsIDIwLCAyMSwgMjEsIDIxLCAyMSwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LFxuXHRcdFx0MjQsIDI0LCAyNCwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsXG5cdFx0XHQyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNyxcblx0XHRcdDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LFxuXHRcdFx0MjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjksXG5cdFx0XHQyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSxcblx0XHRcdDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSBdO1xuXG5cdGZ1bmN0aW9uIFRyZWUoKSB7XG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdFx0Ly8gZHluX3RyZWU7IC8vIHRoZSBkeW5hbWljIHRyZWVcblx0XHQvLyBtYXhfY29kZTsgLy8gbGFyZ2VzdCBjb2RlIHdpdGggbm9uIHplcm8gZnJlcXVlbmN5XG5cdFx0Ly8gc3RhdF9kZXNjOyAvLyB0aGUgY29ycmVzcG9uZGluZyBzdGF0aWMgdHJlZVxuXG5cdFx0Ly8gQ29tcHV0ZSB0aGUgb3B0aW1hbCBiaXQgbGVuZ3RocyBmb3IgYSB0cmVlIGFuZCB1cGRhdGUgdGhlIHRvdGFsIGJpdFxuXHRcdC8vIGxlbmd0aFxuXHRcdC8vIGZvciB0aGUgY3VycmVudCBibG9jay5cblx0XHQvLyBJTiBhc3NlcnRpb246IHRoZSBmaWVsZHMgZnJlcSBhbmQgZGFkIGFyZSBzZXQsIGhlYXBbaGVhcF9tYXhdIGFuZFxuXHRcdC8vIGFib3ZlIGFyZSB0aGUgdHJlZSBub2RlcyBzb3J0ZWQgYnkgaW5jcmVhc2luZyBmcmVxdWVuY3kuXG5cdFx0Ly8gT1VUIGFzc2VydGlvbnM6IHRoZSBmaWVsZCBsZW4gaXMgc2V0IHRvIHRoZSBvcHRpbWFsIGJpdCBsZW5ndGgsIHRoZVxuXHRcdC8vIGFycmF5IGJsX2NvdW50IGNvbnRhaW5zIHRoZSBmcmVxdWVuY2llcyBmb3IgZWFjaCBiaXQgbGVuZ3RoLlxuXHRcdC8vIFRoZSBsZW5ndGggb3B0X2xlbiBpcyB1cGRhdGVkOyBzdGF0aWNfbGVuIGlzIGFsc28gdXBkYXRlZCBpZiBzdHJlZSBpc1xuXHRcdC8vIG5vdCBudWxsLlxuXHRcdGZ1bmN0aW9uIGdlbl9iaXRsZW4ocykge1xuXHRcdFx0dmFyIHRyZWUgPSB0aGF0LmR5bl90cmVlO1xuXHRcdFx0dmFyIHN0cmVlID0gdGhhdC5zdGF0X2Rlc2Muc3RhdGljX3RyZWU7XG5cdFx0XHR2YXIgZXh0cmEgPSB0aGF0LnN0YXRfZGVzYy5leHRyYV9iaXRzO1xuXHRcdFx0dmFyIGJhc2UgPSB0aGF0LnN0YXRfZGVzYy5leHRyYV9iYXNlO1xuXHRcdFx0dmFyIG1heF9sZW5ndGggPSB0aGF0LnN0YXRfZGVzYy5tYXhfbGVuZ3RoO1xuXHRcdFx0dmFyIGg7IC8vIGhlYXAgaW5kZXhcblx0XHRcdHZhciBuLCBtOyAvLyBpdGVyYXRlIG92ZXIgdGhlIHRyZWUgZWxlbWVudHNcblx0XHRcdHZhciBiaXRzOyAvLyBiaXQgbGVuZ3RoXG5cdFx0XHR2YXIgeGJpdHM7IC8vIGV4dHJhIGJpdHNcblx0XHRcdHZhciBmOyAvLyBmcmVxdWVuY3lcblx0XHRcdHZhciBvdmVyZmxvdyA9IDA7IC8vIG51bWJlciBvZiBlbGVtZW50cyB3aXRoIGJpdCBsZW5ndGggdG9vIGxhcmdlXG5cblx0XHRcdGZvciAoYml0cyA9IDA7IGJpdHMgPD0gTUFYX0JJVFM7IGJpdHMrKylcblx0XHRcdFx0cy5ibF9jb3VudFtiaXRzXSA9IDA7XG5cblx0XHRcdC8vIEluIGEgZmlyc3QgcGFzcywgY29tcHV0ZSB0aGUgb3B0aW1hbCBiaXQgbGVuZ3RocyAod2hpY2ggbWF5XG5cdFx0XHQvLyBvdmVyZmxvdyBpbiB0aGUgY2FzZSBvZiB0aGUgYml0IGxlbmd0aCB0cmVlKS5cblx0XHRcdHRyZWVbcy5oZWFwW3MuaGVhcF9tYXhdICogMiArIDFdID0gMDsgLy8gcm9vdCBvZiB0aGUgaGVhcFxuXG5cdFx0XHRmb3IgKGggPSBzLmhlYXBfbWF4ICsgMTsgaCA8IEhFQVBfU0laRTsgaCsrKSB7XG5cdFx0XHRcdG4gPSBzLmhlYXBbaF07XG5cdFx0XHRcdGJpdHMgPSB0cmVlW3RyZWVbbiAqIDIgKyAxXSAqIDIgKyAxXSArIDE7XG5cdFx0XHRcdGlmIChiaXRzID4gbWF4X2xlbmd0aCkge1xuXHRcdFx0XHRcdGJpdHMgPSBtYXhfbGVuZ3RoO1xuXHRcdFx0XHRcdG92ZXJmbG93Kys7XG5cdFx0XHRcdH1cblx0XHRcdFx0dHJlZVtuICogMiArIDFdID0gYml0cztcblx0XHRcdFx0Ly8gV2Ugb3ZlcndyaXRlIHRyZWVbbioyKzFdIHdoaWNoIGlzIG5vIGxvbmdlciBuZWVkZWRcblxuXHRcdFx0XHRpZiAobiA+IHRoYXQubWF4X2NvZGUpXG5cdFx0XHRcdFx0Y29udGludWU7IC8vIG5vdCBhIGxlYWYgbm9kZVxuXG5cdFx0XHRcdHMuYmxfY291bnRbYml0c10rKztcblx0XHRcdFx0eGJpdHMgPSAwO1xuXHRcdFx0XHRpZiAobiA+PSBiYXNlKVxuXHRcdFx0XHRcdHhiaXRzID0gZXh0cmFbbiAtIGJhc2VdO1xuXHRcdFx0XHRmID0gdHJlZVtuICogMl07XG5cdFx0XHRcdHMub3B0X2xlbiArPSBmICogKGJpdHMgKyB4Yml0cyk7XG5cdFx0XHRcdGlmIChzdHJlZSlcblx0XHRcdFx0XHRzLnN0YXRpY19sZW4gKz0gZiAqIChzdHJlZVtuICogMiArIDFdICsgeGJpdHMpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG92ZXJmbG93ID09PSAwKVxuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdC8vIFRoaXMgaGFwcGVucyBmb3IgZXhhbXBsZSBvbiBvYmoyIGFuZCBwaWMgb2YgdGhlIENhbGdhcnkgY29ycHVzXG5cdFx0XHQvLyBGaW5kIHRoZSBmaXJzdCBiaXQgbGVuZ3RoIHdoaWNoIGNvdWxkIGluY3JlYXNlOlxuXHRcdFx0ZG8ge1xuXHRcdFx0XHRiaXRzID0gbWF4X2xlbmd0aCAtIDE7XG5cdFx0XHRcdHdoaWxlIChzLmJsX2NvdW50W2JpdHNdID09PSAwKVxuXHRcdFx0XHRcdGJpdHMtLTtcblx0XHRcdFx0cy5ibF9jb3VudFtiaXRzXS0tOyAvLyBtb3ZlIG9uZSBsZWFmIGRvd24gdGhlIHRyZWVcblx0XHRcdFx0cy5ibF9jb3VudFtiaXRzICsgMV0gKz0gMjsgLy8gbW92ZSBvbmUgb3ZlcmZsb3cgaXRlbSBhcyBpdHMgYnJvdGhlclxuXHRcdFx0XHRzLmJsX2NvdW50W21heF9sZW5ndGhdLS07XG5cdFx0XHRcdC8vIFRoZSBicm90aGVyIG9mIHRoZSBvdmVyZmxvdyBpdGVtIGFsc28gbW92ZXMgb25lIHN0ZXAgdXAsXG5cdFx0XHRcdC8vIGJ1dCB0aGlzIGRvZXMgbm90IGFmZmVjdCBibF9jb3VudFttYXhfbGVuZ3RoXVxuXHRcdFx0XHRvdmVyZmxvdyAtPSAyO1xuXHRcdFx0fSB3aGlsZSAob3ZlcmZsb3cgPiAwKTtcblxuXHRcdFx0Zm9yIChiaXRzID0gbWF4X2xlbmd0aDsgYml0cyAhPT0gMDsgYml0cy0tKSB7XG5cdFx0XHRcdG4gPSBzLmJsX2NvdW50W2JpdHNdO1xuXHRcdFx0XHR3aGlsZSAobiAhPT0gMCkge1xuXHRcdFx0XHRcdG0gPSBzLmhlYXBbLS1oXTtcblx0XHRcdFx0XHRpZiAobSA+IHRoYXQubWF4X2NvZGUpXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRpZiAodHJlZVttICogMiArIDFdICE9IGJpdHMpIHtcblx0XHRcdFx0XHRcdHMub3B0X2xlbiArPSAoYml0cyAtIHRyZWVbbSAqIDIgKyAxXSkgKiB0cmVlW20gKiAyXTtcblx0XHRcdFx0XHRcdHRyZWVbbSAqIDIgKyAxXSA9IGJpdHM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG4tLTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJldmVyc2UgdGhlIGZpcnN0IGxlbiBiaXRzIG9mIGEgY29kZSwgdXNpbmcgc3RyYWlnaHRmb3J3YXJkIGNvZGUgKGFcblx0XHQvLyBmYXN0ZXJcblx0XHQvLyBtZXRob2Qgd291bGQgdXNlIGEgdGFibGUpXG5cdFx0Ly8gSU4gYXNzZXJ0aW9uOiAxIDw9IGxlbiA8PSAxNVxuXHRcdGZ1bmN0aW9uIGJpX3JldmVyc2UoY29kZSwgLy8gdGhlIHZhbHVlIHRvIGludmVydFxuXHRcdGxlbiAvLyBpdHMgYml0IGxlbmd0aFxuXHRcdCkge1xuXHRcdFx0dmFyIHJlcyA9IDA7XG5cdFx0XHRkbyB7XG5cdFx0XHRcdHJlcyB8PSBjb2RlICYgMTtcblx0XHRcdFx0Y29kZSA+Pj49IDE7XG5cdFx0XHRcdHJlcyA8PD0gMTtcblx0XHRcdH0gd2hpbGUgKC0tbGVuID4gMCk7XG5cdFx0XHRyZXR1cm4gcmVzID4+PiAxO1xuXHRcdH1cblxuXHRcdC8vIEdlbmVyYXRlIHRoZSBjb2RlcyBmb3IgYSBnaXZlbiB0cmVlIGFuZCBiaXQgY291bnRzICh3aGljaCBuZWVkIG5vdCBiZVxuXHRcdC8vIG9wdGltYWwpLlxuXHRcdC8vIElOIGFzc2VydGlvbjogdGhlIGFycmF5IGJsX2NvdW50IGNvbnRhaW5zIHRoZSBiaXQgbGVuZ3RoIHN0YXRpc3RpY3MgZm9yXG5cdFx0Ly8gdGhlIGdpdmVuIHRyZWUgYW5kIHRoZSBmaWVsZCBsZW4gaXMgc2V0IGZvciBhbGwgdHJlZSBlbGVtZW50cy5cblx0XHQvLyBPVVQgYXNzZXJ0aW9uOiB0aGUgZmllbGQgY29kZSBpcyBzZXQgZm9yIGFsbCB0cmVlIGVsZW1lbnRzIG9mIG5vblxuXHRcdC8vIHplcm8gY29kZSBsZW5ndGguXG5cdFx0ZnVuY3Rpb24gZ2VuX2NvZGVzKHRyZWUsIC8vIHRoZSB0cmVlIHRvIGRlY29yYXRlXG5cdFx0bWF4X2NvZGUsIC8vIGxhcmdlc3QgY29kZSB3aXRoIG5vbiB6ZXJvIGZyZXF1ZW5jeVxuXHRcdGJsX2NvdW50IC8vIG51bWJlciBvZiBjb2RlcyBhdCBlYWNoIGJpdCBsZW5ndGhcblx0XHQpIHtcblx0XHRcdHZhciBuZXh0X2NvZGUgPSBbXTsgLy8gbmV4dCBjb2RlIHZhbHVlIGZvciBlYWNoXG5cdFx0XHQvLyBiaXQgbGVuZ3RoXG5cdFx0XHR2YXIgY29kZSA9IDA7IC8vIHJ1bm5pbmcgY29kZSB2YWx1ZVxuXHRcdFx0dmFyIGJpdHM7IC8vIGJpdCBpbmRleFxuXHRcdFx0dmFyIG47IC8vIGNvZGUgaW5kZXhcblx0XHRcdHZhciBsZW47XG5cblx0XHRcdC8vIFRoZSBkaXN0cmlidXRpb24gY291bnRzIGFyZSBmaXJzdCB1c2VkIHRvIGdlbmVyYXRlIHRoZSBjb2RlIHZhbHVlc1xuXHRcdFx0Ly8gd2l0aG91dCBiaXQgcmV2ZXJzYWwuXG5cdFx0XHRmb3IgKGJpdHMgPSAxOyBiaXRzIDw9IE1BWF9CSVRTOyBiaXRzKyspIHtcblx0XHRcdFx0bmV4dF9jb2RlW2JpdHNdID0gY29kZSA9ICgoY29kZSArIGJsX2NvdW50W2JpdHMgLSAxXSkgPDwgMSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNrIHRoYXQgdGhlIGJpdCBjb3VudHMgaW4gYmxfY291bnQgYXJlIGNvbnNpc3RlbnQuIFRoZSBsYXN0IGNvZGVcblx0XHRcdC8vIG11c3QgYmUgYWxsIG9uZXMuXG5cdFx0XHQvLyBBc3NlcnQgKGNvZGUgKyBibF9jb3VudFtNQVhfQklUU10tMSA9PSAoMTw8TUFYX0JJVFMpLTEsXG5cdFx0XHQvLyBcImluY29uc2lzdGVudCBiaXQgY291bnRzXCIpO1xuXHRcdFx0Ly8gVHJhY2V2KChzdGRlcnIsXCJcXG5nZW5fY29kZXM6IG1heF9jb2RlICVkIFwiLCBtYXhfY29kZSkpO1xuXG5cdFx0XHRmb3IgKG4gPSAwOyBuIDw9IG1heF9jb2RlOyBuKyspIHtcblx0XHRcdFx0bGVuID0gdHJlZVtuICogMiArIDFdO1xuXHRcdFx0XHRpZiAobGVuID09PSAwKVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHQvLyBOb3cgcmV2ZXJzZSB0aGUgYml0c1xuXHRcdFx0XHR0cmVlW24gKiAyXSA9IGJpX3JldmVyc2UobmV4dF9jb2RlW2xlbl0rKywgbGVuKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDb25zdHJ1Y3Qgb25lIEh1ZmZtYW4gdHJlZSBhbmQgYXNzaWducyB0aGUgY29kZSBiaXQgc3RyaW5ncyBhbmQgbGVuZ3Rocy5cblx0XHQvLyBVcGRhdGUgdGhlIHRvdGFsIGJpdCBsZW5ndGggZm9yIHRoZSBjdXJyZW50IGJsb2NrLlxuXHRcdC8vIElOIGFzc2VydGlvbjogdGhlIGZpZWxkIGZyZXEgaXMgc2V0IGZvciBhbGwgdHJlZSBlbGVtZW50cy5cblx0XHQvLyBPVVQgYXNzZXJ0aW9uczogdGhlIGZpZWxkcyBsZW4gYW5kIGNvZGUgYXJlIHNldCB0byB0aGUgb3B0aW1hbCBiaXQgbGVuZ3RoXG5cdFx0Ly8gYW5kIGNvcnJlc3BvbmRpbmcgY29kZS4gVGhlIGxlbmd0aCBvcHRfbGVuIGlzIHVwZGF0ZWQ7IHN0YXRpY19sZW4gaXNcblx0XHQvLyBhbHNvIHVwZGF0ZWQgaWYgc3RyZWUgaXMgbm90IG51bGwuIFRoZSBmaWVsZCBtYXhfY29kZSBpcyBzZXQuXG5cdFx0dGhhdC5idWlsZF90cmVlID0gZnVuY3Rpb24ocykge1xuXHRcdFx0dmFyIHRyZWUgPSB0aGF0LmR5bl90cmVlO1xuXHRcdFx0dmFyIHN0cmVlID0gdGhhdC5zdGF0X2Rlc2Muc3RhdGljX3RyZWU7XG5cdFx0XHR2YXIgZWxlbXMgPSB0aGF0LnN0YXRfZGVzYy5lbGVtcztcblx0XHRcdHZhciBuLCBtOyAvLyBpdGVyYXRlIG92ZXIgaGVhcCBlbGVtZW50c1xuXHRcdFx0dmFyIG1heF9jb2RlID0gLTE7IC8vIGxhcmdlc3QgY29kZSB3aXRoIG5vbiB6ZXJvIGZyZXF1ZW5jeVxuXHRcdFx0dmFyIG5vZGU7IC8vIG5ldyBub2RlIGJlaW5nIGNyZWF0ZWRcblxuXHRcdFx0Ly8gQ29uc3RydWN0IHRoZSBpbml0aWFsIGhlYXAsIHdpdGggbGVhc3QgZnJlcXVlbnQgZWxlbWVudCBpblxuXHRcdFx0Ly8gaGVhcFsxXS4gVGhlIHNvbnMgb2YgaGVhcFtuXSBhcmUgaGVhcFsyKm5dIGFuZCBoZWFwWzIqbisxXS5cblx0XHRcdC8vIGhlYXBbMF0gaXMgbm90IHVzZWQuXG5cdFx0XHRzLmhlYXBfbGVuID0gMDtcblx0XHRcdHMuaGVhcF9tYXggPSBIRUFQX1NJWkU7XG5cblx0XHRcdGZvciAobiA9IDA7IG4gPCBlbGVtczsgbisrKSB7XG5cdFx0XHRcdGlmICh0cmVlW24gKiAyXSAhPT0gMCkge1xuXHRcdFx0XHRcdHMuaGVhcFsrK3MuaGVhcF9sZW5dID0gbWF4X2NvZGUgPSBuO1xuXHRcdFx0XHRcdHMuZGVwdGhbbl0gPSAwO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRyZWVbbiAqIDIgKyAxXSA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVGhlIHBremlwIGZvcm1hdCByZXF1aXJlcyB0aGF0IGF0IGxlYXN0IG9uZSBkaXN0YW5jZSBjb2RlIGV4aXN0cyxcblx0XHRcdC8vIGFuZCB0aGF0IGF0IGxlYXN0IG9uZSBiaXQgc2hvdWxkIGJlIHNlbnQgZXZlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZVxuXHRcdFx0Ly8gcG9zc2libGUgY29kZS4gU28gdG8gYXZvaWQgc3BlY2lhbCBjaGVja3MgbGF0ZXIgb24gd2UgZm9yY2UgYXQgbGVhc3Rcblx0XHRcdC8vIHR3byBjb2RlcyBvZiBub24gemVybyBmcmVxdWVuY3kuXG5cdFx0XHR3aGlsZSAocy5oZWFwX2xlbiA8IDIpIHtcblx0XHRcdFx0bm9kZSA9IHMuaGVhcFsrK3MuaGVhcF9sZW5dID0gbWF4X2NvZGUgPCAyID8gKyttYXhfY29kZSA6IDA7XG5cdFx0XHRcdHRyZWVbbm9kZSAqIDJdID0gMTtcblx0XHRcdFx0cy5kZXB0aFtub2RlXSA9IDA7XG5cdFx0XHRcdHMub3B0X2xlbi0tO1xuXHRcdFx0XHRpZiAoc3RyZWUpXG5cdFx0XHRcdFx0cy5zdGF0aWNfbGVuIC09IHN0cmVlW25vZGUgKiAyICsgMV07XG5cdFx0XHRcdC8vIG5vZGUgaXMgMCBvciAxIHNvIGl0IGRvZXMgbm90IGhhdmUgZXh0cmEgYml0c1xuXHRcdFx0fVxuXHRcdFx0dGhhdC5tYXhfY29kZSA9IG1heF9jb2RlO1xuXG5cdFx0XHQvLyBUaGUgZWxlbWVudHMgaGVhcFtoZWFwX2xlbi8yKzEgLi4gaGVhcF9sZW5dIGFyZSBsZWF2ZXMgb2YgdGhlIHRyZWUsXG5cdFx0XHQvLyBlc3RhYmxpc2ggc3ViLWhlYXBzIG9mIGluY3JlYXNpbmcgbGVuZ3RoczpcblxuXHRcdFx0Zm9yIChuID0gTWF0aC5mbG9vcihzLmhlYXBfbGVuIC8gMik7IG4gPj0gMTsgbi0tKVxuXHRcdFx0XHRzLnBxZG93bmhlYXAodHJlZSwgbik7XG5cblx0XHRcdC8vIENvbnN0cnVjdCB0aGUgSHVmZm1hbiB0cmVlIGJ5IHJlcGVhdGVkbHkgY29tYmluaW5nIHRoZSBsZWFzdCB0d29cblx0XHRcdC8vIGZyZXF1ZW50IG5vZGVzLlxuXG5cdFx0XHRub2RlID0gZWxlbXM7IC8vIG5leHQgaW50ZXJuYWwgbm9kZSBvZiB0aGUgdHJlZVxuXHRcdFx0ZG8ge1xuXHRcdFx0XHQvLyBuID0gbm9kZSBvZiBsZWFzdCBmcmVxdWVuY3lcblx0XHRcdFx0biA9IHMuaGVhcFsxXTtcblx0XHRcdFx0cy5oZWFwWzFdID0gcy5oZWFwW3MuaGVhcF9sZW4tLV07XG5cdFx0XHRcdHMucHFkb3duaGVhcCh0cmVlLCAxKTtcblx0XHRcdFx0bSA9IHMuaGVhcFsxXTsgLy8gbSA9IG5vZGUgb2YgbmV4dCBsZWFzdCBmcmVxdWVuY3lcblxuXHRcdFx0XHRzLmhlYXBbLS1zLmhlYXBfbWF4XSA9IG47IC8vIGtlZXAgdGhlIG5vZGVzIHNvcnRlZCBieSBmcmVxdWVuY3lcblx0XHRcdFx0cy5oZWFwWy0tcy5oZWFwX21heF0gPSBtO1xuXG5cdFx0XHRcdC8vIENyZWF0ZSBhIG5ldyBub2RlIGZhdGhlciBvZiBuIGFuZCBtXG5cdFx0XHRcdHRyZWVbbm9kZSAqIDJdID0gKHRyZWVbbiAqIDJdICsgdHJlZVttICogMl0pO1xuXHRcdFx0XHRzLmRlcHRoW25vZGVdID0gTWF0aC5tYXgocy5kZXB0aFtuXSwgcy5kZXB0aFttXSkgKyAxO1xuXHRcdFx0XHR0cmVlW24gKiAyICsgMV0gPSB0cmVlW20gKiAyICsgMV0gPSBub2RlO1xuXG5cdFx0XHRcdC8vIGFuZCBpbnNlcnQgdGhlIG5ldyBub2RlIGluIHRoZSBoZWFwXG5cdFx0XHRcdHMuaGVhcFsxXSA9IG5vZGUrKztcblx0XHRcdFx0cy5wcWRvd25oZWFwKHRyZWUsIDEpO1xuXHRcdFx0fSB3aGlsZSAocy5oZWFwX2xlbiA+PSAyKTtcblxuXHRcdFx0cy5oZWFwWy0tcy5oZWFwX21heF0gPSBzLmhlYXBbMV07XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQsIHRoZSBmaWVsZHMgZnJlcSBhbmQgZGFkIGFyZSBzZXQuIFdlIGNhbiBub3dcblx0XHRcdC8vIGdlbmVyYXRlIHRoZSBiaXQgbGVuZ3Rocy5cblxuXHRcdFx0Z2VuX2JpdGxlbihzKTtcblxuXHRcdFx0Ly8gVGhlIGZpZWxkIGxlbiBpcyBub3cgc2V0LCB3ZSBjYW4gZ2VuZXJhdGUgdGhlIGJpdCBjb2Rlc1xuXHRcdFx0Z2VuX2NvZGVzKHRyZWUsIHRoYXQubWF4X2NvZGUsIHMuYmxfY291bnQpO1xuXHRcdH07XG5cblx0fVxuXG5cdFRyZWUuX2xlbmd0aF9jb2RlID0gWyAwLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA4LCA5LCA5LCAxMCwgMTAsIDExLCAxMSwgMTIsIDEyLCAxMiwgMTIsIDEzLCAxMywgMTMsIDEzLCAxNCwgMTQsIDE0LCAxNCwgMTUsIDE1LCAxNSwgMTUsIDE2LCAxNiwgMTYsIDE2LFxuXHRcdFx0MTYsIDE2LCAxNiwgMTYsIDE3LCAxNywgMTcsIDE3LCAxNywgMTcsIDE3LCAxNywgMTgsIDE4LCAxOCwgMTgsIDE4LCAxOCwgMTgsIDE4LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsXG5cdFx0XHQyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMixcblx0XHRcdDIyLCAyMiwgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LFxuXHRcdFx0MjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsXG5cdFx0XHQyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNixcblx0XHRcdDI2LCAyNiwgMjYsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyOCBdO1xuXG5cdFRyZWUuYmFzZV9sZW5ndGggPSBbIDAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDEwLCAxMiwgMTQsIDE2LCAyMCwgMjQsIDI4LCAzMiwgNDAsIDQ4LCA1NiwgNjQsIDgwLCA5NiwgMTEyLCAxMjgsIDE2MCwgMTkyLCAyMjQsIDAgXTtcblxuXHRUcmVlLmJhc2VfZGlzdCA9IFsgMCwgMSwgMiwgMywgNCwgNiwgOCwgMTIsIDE2LCAyNCwgMzIsIDQ4LCA2NCwgOTYsIDEyOCwgMTkyLCAyNTYsIDM4NCwgNTEyLCA3NjgsIDEwMjQsIDE1MzYsIDIwNDgsIDMwNzIsIDQwOTYsIDYxNDQsIDgxOTIsIDEyMjg4LCAxNjM4NCxcblx0XHRcdDI0NTc2IF07XG5cblx0Ly8gTWFwcGluZyBmcm9tIGEgZGlzdGFuY2UgdG8gYSBkaXN0YW5jZSBjb2RlLiBkaXN0IGlzIHRoZSBkaXN0YW5jZSAtIDEgYW5kXG5cdC8vIG11c3Qgbm90IGhhdmUgc2lkZSBlZmZlY3RzLiBfZGlzdF9jb2RlWzI1Nl0gYW5kIF9kaXN0X2NvZGVbMjU3XSBhcmUgbmV2ZXJcblx0Ly8gdXNlZC5cblx0VHJlZS5kX2NvZGUgPSBmdW5jdGlvbihkaXN0KSB7XG5cdFx0cmV0dXJuICgoZGlzdCkgPCAyNTYgPyBfZGlzdF9jb2RlW2Rpc3RdIDogX2Rpc3RfY29kZVsyNTYgKyAoKGRpc3QpID4+PiA3KV0pO1xuXHR9O1xuXG5cdC8vIGV4dHJhIGJpdHMgZm9yIGVhY2ggbGVuZ3RoIGNvZGVcblx0VHJlZS5leHRyYV9sYml0cyA9IFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMiwgMiwgMiwgMiwgMywgMywgMywgMywgNCwgNCwgNCwgNCwgNSwgNSwgNSwgNSwgMCBdO1xuXG5cdC8vIGV4dHJhIGJpdHMgZm9yIGVhY2ggZGlzdGFuY2UgY29kZVxuXHRUcmVlLmV4dHJhX2RiaXRzID0gWyAwLCAwLCAwLCAwLCAxLCAxLCAyLCAyLCAzLCAzLCA0LCA0LCA1LCA1LCA2LCA2LCA3LCA3LCA4LCA4LCA5LCA5LCAxMCwgMTAsIDExLCAxMSwgMTIsIDEyLCAxMywgMTMgXTtcblxuXHQvLyBleHRyYSBiaXRzIGZvciBlYWNoIGJpdCBsZW5ndGggY29kZVxuXHRUcmVlLmV4dHJhX2JsYml0cyA9IFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMiwgMywgNyBdO1xuXG5cdFRyZWUuYmxfb3JkZXIgPSBbIDE2LCAxNywgMTgsIDAsIDgsIDcsIDksIDYsIDEwLCA1LCAxMSwgNCwgMTIsIDMsIDEzLCAyLCAxNCwgMSwgMTUgXTtcblxuXHQvLyBTdGF0aWNUcmVlXG5cblx0ZnVuY3Rpb24gU3RhdGljVHJlZShzdGF0aWNfdHJlZSwgZXh0cmFfYml0cywgZXh0cmFfYmFzZSwgZWxlbXMsIG1heF9sZW5ndGgpIHtcblx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0dGhhdC5zdGF0aWNfdHJlZSA9IHN0YXRpY190cmVlO1xuXHRcdHRoYXQuZXh0cmFfYml0cyA9IGV4dHJhX2JpdHM7XG5cdFx0dGhhdC5leHRyYV9iYXNlID0gZXh0cmFfYmFzZTtcblx0XHR0aGF0LmVsZW1zID0gZWxlbXM7XG5cdFx0dGhhdC5tYXhfbGVuZ3RoID0gbWF4X2xlbmd0aDtcblx0fVxuXG5cdFN0YXRpY1RyZWUuc3RhdGljX2x0cmVlID0gWyAxMiwgOCwgMTQwLCA4LCA3NiwgOCwgMjA0LCA4LCA0NCwgOCwgMTcyLCA4LCAxMDgsIDgsIDIzNiwgOCwgMjgsIDgsIDE1NiwgOCwgOTIsIDgsIDIyMCwgOCwgNjAsIDgsIDE4OCwgOCwgMTI0LCA4LCAyNTIsIDgsIDIsIDgsXG5cdFx0XHQxMzAsIDgsIDY2LCA4LCAxOTQsIDgsIDM0LCA4LCAxNjIsIDgsIDk4LCA4LCAyMjYsIDgsIDE4LCA4LCAxNDYsIDgsIDgyLCA4LCAyMTAsIDgsIDUwLCA4LCAxNzgsIDgsIDExNCwgOCwgMjQyLCA4LCAxMCwgOCwgMTM4LCA4LCA3NCwgOCwgMjAyLCA4LCA0Mixcblx0XHRcdDgsIDE3MCwgOCwgMTA2LCA4LCAyMzQsIDgsIDI2LCA4LCAxNTQsIDgsIDkwLCA4LCAyMTgsIDgsIDU4LCA4LCAxODYsIDgsIDEyMiwgOCwgMjUwLCA4LCA2LCA4LCAxMzQsIDgsIDcwLCA4LCAxOTgsIDgsIDM4LCA4LCAxNjYsIDgsIDEwMiwgOCwgMjMwLCA4LFxuXHRcdFx0MjIsIDgsIDE1MCwgOCwgODYsIDgsIDIxNCwgOCwgNTQsIDgsIDE4MiwgOCwgMTE4LCA4LCAyNDYsIDgsIDE0LCA4LCAxNDIsIDgsIDc4LCA4LCAyMDYsIDgsIDQ2LCA4LCAxNzQsIDgsIDExMCwgOCwgMjM4LCA4LCAzMCwgOCwgMTU4LCA4LCA5NCwgOCxcblx0XHRcdDIyMiwgOCwgNjIsIDgsIDE5MCwgOCwgMTI2LCA4LCAyNTQsIDgsIDEsIDgsIDEyOSwgOCwgNjUsIDgsIDE5MywgOCwgMzMsIDgsIDE2MSwgOCwgOTcsIDgsIDIyNSwgOCwgMTcsIDgsIDE0NSwgOCwgODEsIDgsIDIwOSwgOCwgNDksIDgsIDE3NywgOCwgMTEzLFxuXHRcdFx0OCwgMjQxLCA4LCA5LCA4LCAxMzcsIDgsIDczLCA4LCAyMDEsIDgsIDQxLCA4LCAxNjksIDgsIDEwNSwgOCwgMjMzLCA4LCAyNSwgOCwgMTUzLCA4LCA4OSwgOCwgMjE3LCA4LCA1NywgOCwgMTg1LCA4LCAxMjEsIDgsIDI0OSwgOCwgNSwgOCwgMTMzLCA4LFxuXHRcdFx0NjksIDgsIDE5NywgOCwgMzcsIDgsIDE2NSwgOCwgMTAxLCA4LCAyMjksIDgsIDIxLCA4LCAxNDksIDgsIDg1LCA4LCAyMTMsIDgsIDUzLCA4LCAxODEsIDgsIDExNywgOCwgMjQ1LCA4LCAxMywgOCwgMTQxLCA4LCA3NywgOCwgMjA1LCA4LCA0NSwgOCxcblx0XHRcdDE3MywgOCwgMTA5LCA4LCAyMzcsIDgsIDI5LCA4LCAxNTcsIDgsIDkzLCA4LCAyMjEsIDgsIDYxLCA4LCAxODksIDgsIDEyNSwgOCwgMjUzLCA4LCAxOSwgOSwgMjc1LCA5LCAxNDcsIDksIDQwMywgOSwgODMsIDksIDMzOSwgOSwgMjExLCA5LCA0NjcsIDksXG5cdFx0XHQ1MSwgOSwgMzA3LCA5LCAxNzksIDksIDQzNSwgOSwgMTE1LCA5LCAzNzEsIDksIDI0MywgOSwgNDk5LCA5LCAxMSwgOSwgMjY3LCA5LCAxMzksIDksIDM5NSwgOSwgNzUsIDksIDMzMSwgOSwgMjAzLCA5LCA0NTksIDksIDQzLCA5LCAyOTksIDksIDE3MSwgOSxcblx0XHRcdDQyNywgOSwgMTA3LCA5LCAzNjMsIDksIDIzNSwgOSwgNDkxLCA5LCAyNywgOSwgMjgzLCA5LCAxNTUsIDksIDQxMSwgOSwgOTEsIDksIDM0NywgOSwgMjE5LCA5LCA0NzUsIDksIDU5LCA5LCAzMTUsIDksIDE4NywgOSwgNDQzLCA5LCAxMjMsIDksIDM3OSxcblx0XHRcdDksIDI1MSwgOSwgNTA3LCA5LCA3LCA5LCAyNjMsIDksIDEzNSwgOSwgMzkxLCA5LCA3MSwgOSwgMzI3LCA5LCAxOTksIDksIDQ1NSwgOSwgMzksIDksIDI5NSwgOSwgMTY3LCA5LCA0MjMsIDksIDEwMywgOSwgMzU5LCA5LCAyMzEsIDksIDQ4NywgOSwgMjMsXG5cdFx0XHQ5LCAyNzksIDksIDE1MSwgOSwgNDA3LCA5LCA4NywgOSwgMzQzLCA5LCAyMTUsIDksIDQ3MSwgOSwgNTUsIDksIDMxMSwgOSwgMTgzLCA5LCA0MzksIDksIDExOSwgOSwgMzc1LCA5LCAyNDcsIDksIDUwMywgOSwgMTUsIDksIDI3MSwgOSwgMTQzLCA5LFxuXHRcdFx0Mzk5LCA5LCA3OSwgOSwgMzM1LCA5LCAyMDcsIDksIDQ2MywgOSwgNDcsIDksIDMwMywgOSwgMTc1LCA5LCA0MzEsIDksIDExMSwgOSwgMzY3LCA5LCAyMzksIDksIDQ5NSwgOSwgMzEsIDksIDI4NywgOSwgMTU5LCA5LCA0MTUsIDksIDk1LCA5LCAzNTEsIDksXG5cdFx0XHQyMjMsIDksIDQ3OSwgOSwgNjMsIDksIDMxOSwgOSwgMTkxLCA5LCA0NDcsIDksIDEyNywgOSwgMzgzLCA5LCAyNTUsIDksIDUxMSwgOSwgMCwgNywgNjQsIDcsIDMyLCA3LCA5NiwgNywgMTYsIDcsIDgwLCA3LCA0OCwgNywgMTEyLCA3LCA4LCA3LCA3MiwgNyxcblx0XHRcdDQwLCA3LCAxMDQsIDcsIDI0LCA3LCA4OCwgNywgNTYsIDcsIDEyMCwgNywgNCwgNywgNjgsIDcsIDM2LCA3LCAxMDAsIDcsIDIwLCA3LCA4NCwgNywgNTIsIDcsIDExNiwgNywgMywgOCwgMTMxLCA4LCA2NywgOCwgMTk1LCA4LCAzNSwgOCwgMTYzLCA4LFxuXHRcdFx0OTksIDgsIDIyNywgOCBdO1xuXG5cdFN0YXRpY1RyZWUuc3RhdGljX2R0cmVlID0gWyAwLCA1LCAxNiwgNSwgOCwgNSwgMjQsIDUsIDQsIDUsIDIwLCA1LCAxMiwgNSwgMjgsIDUsIDIsIDUsIDE4LCA1LCAxMCwgNSwgMjYsIDUsIDYsIDUsIDIyLCA1LCAxNCwgNSwgMzAsIDUsIDEsIDUsIDE3LCA1LCA5LCA1LFxuXHRcdFx0MjUsIDUsIDUsIDUsIDIxLCA1LCAxMywgNSwgMjksIDUsIDMsIDUsIDE5LCA1LCAxMSwgNSwgMjcsIDUsIDcsIDUsIDIzLCA1IF07XG5cblx0U3RhdGljVHJlZS5zdGF0aWNfbF9kZXNjID0gbmV3IFN0YXRpY1RyZWUoU3RhdGljVHJlZS5zdGF0aWNfbHRyZWUsIFRyZWUuZXh0cmFfbGJpdHMsIExJVEVSQUxTICsgMSwgTF9DT0RFUywgTUFYX0JJVFMpO1xuXG5cdFN0YXRpY1RyZWUuc3RhdGljX2RfZGVzYyA9IG5ldyBTdGF0aWNUcmVlKFN0YXRpY1RyZWUuc3RhdGljX2R0cmVlLCBUcmVlLmV4dHJhX2RiaXRzLCAwLCBEX0NPREVTLCBNQVhfQklUUyk7XG5cblx0U3RhdGljVHJlZS5zdGF0aWNfYmxfZGVzYyA9IG5ldyBTdGF0aWNUcmVlKG51bGwsIFRyZWUuZXh0cmFfYmxiaXRzLCAwLCBCTF9DT0RFUywgTUFYX0JMX0JJVFMpO1xuXG5cdC8vIERlZmxhdGVcblxuXHR2YXIgTUFYX01FTV9MRVZFTCA9IDk7XG5cdHZhciBERUZfTUVNX0xFVkVMID0gODtcblxuXHRmdW5jdGlvbiBDb25maWcoZ29vZF9sZW5ndGgsIG1heF9sYXp5LCBuaWNlX2xlbmd0aCwgbWF4X2NoYWluLCBmdW5jKSB7XG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdHRoYXQuZ29vZF9sZW5ndGggPSBnb29kX2xlbmd0aDtcblx0XHR0aGF0Lm1heF9sYXp5ID0gbWF4X2xhenk7XG5cdFx0dGhhdC5uaWNlX2xlbmd0aCA9IG5pY2VfbGVuZ3RoO1xuXHRcdHRoYXQubWF4X2NoYWluID0gbWF4X2NoYWluO1xuXHRcdHRoYXQuZnVuYyA9IGZ1bmM7XG5cdH1cblxuXHR2YXIgU1RPUkVEID0gMDtcblx0dmFyIEZBU1QgPSAxO1xuXHR2YXIgU0xPVyA9IDI7XG5cdHZhciBjb25maWdfdGFibGUgPSBbIG5ldyBDb25maWcoMCwgMCwgMCwgMCwgU1RPUkVEKSwgbmV3IENvbmZpZyg0LCA0LCA4LCA0LCBGQVNUKSwgbmV3IENvbmZpZyg0LCA1LCAxNiwgOCwgRkFTVCksIG5ldyBDb25maWcoNCwgNiwgMzIsIDMyLCBGQVNUKSxcblx0XHRcdG5ldyBDb25maWcoNCwgNCwgMTYsIDE2LCBTTE9XKSwgbmV3IENvbmZpZyg4LCAxNiwgMzIsIDMyLCBTTE9XKSwgbmV3IENvbmZpZyg4LCAxNiwgMTI4LCAxMjgsIFNMT1cpLCBuZXcgQ29uZmlnKDgsIDMyLCAxMjgsIDI1NiwgU0xPVyksXG5cdFx0XHRuZXcgQ29uZmlnKDMyLCAxMjgsIDI1OCwgMTAyNCwgU0xPVyksIG5ldyBDb25maWcoMzIsIDI1OCwgMjU4LCA0MDk2LCBTTE9XKSBdO1xuXG5cdHZhciB6X2Vycm1zZyA9IFsgXCJuZWVkIGRpY3Rpb25hcnlcIiwgLy8gWl9ORUVEX0RJQ1Rcblx0Ly8gMlxuXHRcInN0cmVhbSBlbmRcIiwgLy8gWl9TVFJFQU1fRU5EIDFcblx0XCJcIiwgLy8gWl9PSyAwXG5cdFwiXCIsIC8vIFpfRVJSTk8gKC0xKVxuXHRcInN0cmVhbSBlcnJvclwiLCAvLyBaX1NUUkVBTV9FUlJPUiAoLTIpXG5cdFwiZGF0YSBlcnJvclwiLCAvLyBaX0RBVEFfRVJST1IgKC0zKVxuXHRcIlwiLCAvLyBaX01FTV9FUlJPUiAoLTQpXG5cdFwiYnVmZmVyIGVycm9yXCIsIC8vIFpfQlVGX0VSUk9SICgtNSlcblx0XCJcIiwvLyBaX1ZFUlNJT05fRVJST1IgKC02KVxuXHRcIlwiIF07XG5cblx0Ly8gYmxvY2sgbm90IGNvbXBsZXRlZCwgbmVlZCBtb3JlIGlucHV0IG9yIG1vcmUgb3V0cHV0XG5cdHZhciBOZWVkTW9yZSA9IDA7XG5cblx0Ly8gYmxvY2sgZmx1c2ggcGVyZm9ybWVkXG5cdHZhciBCbG9ja0RvbmUgPSAxO1xuXG5cdC8vIGZpbmlzaCBzdGFydGVkLCBuZWVkIG9ubHkgbW9yZSBvdXRwdXQgYXQgbmV4dCBkZWZsYXRlXG5cdHZhciBGaW5pc2hTdGFydGVkID0gMjtcblxuXHQvLyBmaW5pc2ggZG9uZSwgYWNjZXB0IG5vIG1vcmUgaW5wdXQgb3Igb3V0cHV0XG5cdHZhciBGaW5pc2hEb25lID0gMztcblxuXHQvLyBwcmVzZXQgZGljdGlvbmFyeSBmbGFnIGluIHpsaWIgaGVhZGVyXG5cdHZhciBQUkVTRVRfRElDVCA9IDB4MjA7XG5cblx0dmFyIElOSVRfU1RBVEUgPSA0Mjtcblx0dmFyIEJVU1lfU1RBVEUgPSAxMTM7XG5cdHZhciBGSU5JU0hfU1RBVEUgPSA2NjY7XG5cblx0Ly8gVGhlIGRlZmxhdGUgY29tcHJlc3Npb24gbWV0aG9kXG5cdHZhciBaX0RFRkxBVEVEID0gODtcblxuXHR2YXIgU1RPUkVEX0JMT0NLID0gMDtcblx0dmFyIFNUQVRJQ19UUkVFUyA9IDE7XG5cdHZhciBEWU5fVFJFRVMgPSAyO1xuXG5cdHZhciBNSU5fTUFUQ0ggPSAzO1xuXHR2YXIgTUFYX01BVENIID0gMjU4O1xuXHR2YXIgTUlOX0xPT0tBSEVBRCA9IChNQVhfTUFUQ0ggKyBNSU5fTUFUQ0ggKyAxKTtcblxuXHRmdW5jdGlvbiBzbWFsbGVyKHRyZWUsIG4sIG0sIGRlcHRoKSB7XG5cdFx0dmFyIHRuMiA9IHRyZWVbbiAqIDJdO1xuXHRcdHZhciB0bTIgPSB0cmVlW20gKiAyXTtcblx0XHRyZXR1cm4gKHRuMiA8IHRtMiB8fCAodG4yID09IHRtMiAmJiBkZXB0aFtuXSA8PSBkZXB0aFttXSkpO1xuXHR9XG5cblx0ZnVuY3Rpb24gRGVmbGF0ZSgpIHtcblxuXHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHR2YXIgc3RybTsgLy8gcG9pbnRlciBiYWNrIHRvIHRoaXMgemxpYiBzdHJlYW1cblx0XHR2YXIgc3RhdHVzOyAvLyBhcyB0aGUgbmFtZSBpbXBsaWVzXG5cdFx0Ly8gcGVuZGluZ19idWY7IC8vIG91dHB1dCBzdGlsbCBwZW5kaW5nXG5cdFx0dmFyIHBlbmRpbmdfYnVmX3NpemU7IC8vIHNpemUgb2YgcGVuZGluZ19idWZcblx0XHQvLyBwZW5kaW5nX291dDsgLy8gbmV4dCBwZW5kaW5nIGJ5dGUgdG8gb3V0cHV0IHRvIHRoZSBzdHJlYW1cblx0XHQvLyBwZW5kaW5nOyAvLyBuYiBvZiBieXRlcyBpbiB0aGUgcGVuZGluZyBidWZmZXJcblx0XHR2YXIgbWV0aG9kOyAvLyBTVE9SRUQgKGZvciB6aXAgb25seSkgb3IgREVGTEFURURcblx0XHR2YXIgbGFzdF9mbHVzaDsgLy8gdmFsdWUgb2YgZmx1c2ggcGFyYW0gZm9yIHByZXZpb3VzIGRlZmxhdGUgY2FsbFxuXG5cdFx0dmFyIHdfc2l6ZTsgLy8gTFo3NyB3aW5kb3cgc2l6ZSAoMzJLIGJ5IGRlZmF1bHQpXG5cdFx0dmFyIHdfYml0czsgLy8gbG9nMih3X3NpemUpICg4Li4xNilcblx0XHR2YXIgd19tYXNrOyAvLyB3X3NpemUgLSAxXG5cblx0XHR2YXIgd2luZG93O1xuXHRcdC8vIFNsaWRpbmcgd2luZG93LiBJbnB1dCBieXRlcyBhcmUgcmVhZCBpbnRvIHRoZSBzZWNvbmQgaGFsZiBvZiB0aGUgd2luZG93LFxuXHRcdC8vIGFuZCBtb3ZlIHRvIHRoZSBmaXJzdCBoYWxmIGxhdGVyIHRvIGtlZXAgYSBkaWN0aW9uYXJ5IG9mIGF0IGxlYXN0IHdTaXplXG5cdFx0Ly8gYnl0ZXMuIFdpdGggdGhpcyBvcmdhbml6YXRpb24sIG1hdGNoZXMgYXJlIGxpbWl0ZWQgdG8gYSBkaXN0YW5jZSBvZlxuXHRcdC8vIHdTaXplLU1BWF9NQVRDSCBieXRlcywgYnV0IHRoaXMgZW5zdXJlcyB0aGF0IElPIGlzIGFsd2F5c1xuXHRcdC8vIHBlcmZvcm1lZCB3aXRoIGEgbGVuZ3RoIG11bHRpcGxlIG9mIHRoZSBibG9jayBzaXplLiBBbHNvLCBpdCBsaW1pdHNcblx0XHQvLyB0aGUgd2luZG93IHNpemUgdG8gNjRLLCB3aGljaCBpcyBxdWl0ZSB1c2VmdWwgb24gTVNET1MuXG5cdFx0Ly8gVG8gZG86IHVzZSB0aGUgdXNlciBpbnB1dCBidWZmZXIgYXMgc2xpZGluZyB3aW5kb3cuXG5cblx0XHR2YXIgd2luZG93X3NpemU7XG5cdFx0Ly8gQWN0dWFsIHNpemUgb2Ygd2luZG93OiAyKndTaXplLCBleGNlcHQgd2hlbiB0aGUgdXNlciBpbnB1dCBidWZmZXJcblx0XHQvLyBpcyBkaXJlY3RseSB1c2VkIGFzIHNsaWRpbmcgd2luZG93LlxuXG5cdFx0dmFyIHByZXY7XG5cdFx0Ly8gTGluayB0byBvbGRlciBzdHJpbmcgd2l0aCBzYW1lIGhhc2ggaW5kZXguIFRvIGxpbWl0IHRoZSBzaXplIG9mIHRoaXNcblx0XHQvLyBhcnJheSB0byA2NEssIHRoaXMgbGluayBpcyBtYWludGFpbmVkIG9ubHkgZm9yIHRoZSBsYXN0IDMySyBzdHJpbmdzLlxuXHRcdC8vIEFuIGluZGV4IGluIHRoaXMgYXJyYXkgaXMgdGh1cyBhIHdpbmRvdyBpbmRleCBtb2R1bG8gMzJLLlxuXG5cdFx0dmFyIGhlYWQ7IC8vIEhlYWRzIG9mIHRoZSBoYXNoIGNoYWlucyBvciBOSUwuXG5cblx0XHR2YXIgaW5zX2g7IC8vIGhhc2ggaW5kZXggb2Ygc3RyaW5nIHRvIGJlIGluc2VydGVkXG5cdFx0dmFyIGhhc2hfc2l6ZTsgLy8gbnVtYmVyIG9mIGVsZW1lbnRzIGluIGhhc2ggdGFibGVcblx0XHR2YXIgaGFzaF9iaXRzOyAvLyBsb2cyKGhhc2hfc2l6ZSlcblx0XHR2YXIgaGFzaF9tYXNrOyAvLyBoYXNoX3NpemUtMVxuXG5cdFx0Ly8gTnVtYmVyIG9mIGJpdHMgYnkgd2hpY2ggaW5zX2ggbXVzdCBiZSBzaGlmdGVkIGF0IGVhY2ggaW5wdXRcblx0XHQvLyBzdGVwLiBJdCBtdXN0IGJlIHN1Y2ggdGhhdCBhZnRlciBNSU5fTUFUQ0ggc3RlcHMsIHRoZSBvbGRlc3Rcblx0XHQvLyBieXRlIG5vIGxvbmdlciB0YWtlcyBwYXJ0IGluIHRoZSBoYXNoIGtleSwgdGhhdCBpczpcblx0XHQvLyBoYXNoX3NoaWZ0ICogTUlOX01BVENIID49IGhhc2hfYml0c1xuXHRcdHZhciBoYXNoX3NoaWZ0O1xuXG5cdFx0Ly8gV2luZG93IHBvc2l0aW9uIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGN1cnJlbnQgb3V0cHV0IGJsb2NrLiBHZXRzXG5cdFx0Ly8gbmVnYXRpdmUgd2hlbiB0aGUgd2luZG93IGlzIG1vdmVkIGJhY2t3YXJkcy5cblxuXHRcdHZhciBibG9ja19zdGFydDtcblxuXHRcdHZhciBtYXRjaF9sZW5ndGg7IC8vIGxlbmd0aCBvZiBiZXN0IG1hdGNoXG5cdFx0dmFyIHByZXZfbWF0Y2g7IC8vIHByZXZpb3VzIG1hdGNoXG5cdFx0dmFyIG1hdGNoX2F2YWlsYWJsZTsgLy8gc2V0IGlmIHByZXZpb3VzIG1hdGNoIGV4aXN0c1xuXHRcdHZhciBzdHJzdGFydDsgLy8gc3RhcnQgb2Ygc3RyaW5nIHRvIGluc2VydFxuXHRcdHZhciBtYXRjaF9zdGFydDsgLy8gc3RhcnQgb2YgbWF0Y2hpbmcgc3RyaW5nXG5cdFx0dmFyIGxvb2thaGVhZDsgLy8gbnVtYmVyIG9mIHZhbGlkIGJ5dGVzIGFoZWFkIGluIHdpbmRvd1xuXG5cdFx0Ly8gTGVuZ3RoIG9mIHRoZSBiZXN0IG1hdGNoIGF0IHByZXZpb3VzIHN0ZXAuIE1hdGNoZXMgbm90IGdyZWF0ZXIgdGhhbiB0aGlzXG5cdFx0Ly8gYXJlIGRpc2NhcmRlZC4gVGhpcyBpcyB1c2VkIGluIHRoZSBsYXp5IG1hdGNoIGV2YWx1YXRpb24uXG5cdFx0dmFyIHByZXZfbGVuZ3RoO1xuXG5cdFx0Ly8gVG8gc3BlZWQgdXAgZGVmbGF0aW9uLCBoYXNoIGNoYWlucyBhcmUgbmV2ZXIgc2VhcmNoZWQgYmV5b25kIHRoaXNcblx0XHQvLyBsZW5ndGguIEEgaGlnaGVyIGxpbWl0IGltcHJvdmVzIGNvbXByZXNzaW9uIHJhdGlvIGJ1dCBkZWdyYWRlcyB0aGUgc3BlZWQuXG5cdFx0dmFyIG1heF9jaGFpbl9sZW5ndGg7XG5cblx0XHQvLyBBdHRlbXB0IHRvIGZpbmQgYSBiZXR0ZXIgbWF0Y2ggb25seSB3aGVuIHRoZSBjdXJyZW50IG1hdGNoIGlzIHN0cmljdGx5XG5cdFx0Ly8gc21hbGxlciB0aGFuIHRoaXMgdmFsdWUuIFRoaXMgbWVjaGFuaXNtIGlzIHVzZWQgb25seSBmb3IgY29tcHJlc3Npb25cblx0XHQvLyBsZXZlbHMgPj0gNC5cblx0XHR2YXIgbWF4X2xhenlfbWF0Y2g7XG5cblx0XHQvLyBJbnNlcnQgbmV3IHN0cmluZ3MgaW4gdGhlIGhhc2ggdGFibGUgb25seSBpZiB0aGUgbWF0Y2ggbGVuZ3RoIGlzIG5vdFxuXHRcdC8vIGdyZWF0ZXIgdGhhbiB0aGlzIGxlbmd0aC4gVGhpcyBzYXZlcyB0aW1lIGJ1dCBkZWdyYWRlcyBjb21wcmVzc2lvbi5cblx0XHQvLyBtYXhfaW5zZXJ0X2xlbmd0aCBpcyB1c2VkIG9ubHkgZm9yIGNvbXByZXNzaW9uIGxldmVscyA8PSAzLlxuXG5cdFx0dmFyIGxldmVsOyAvLyBjb21wcmVzc2lvbiBsZXZlbCAoMS4uOSlcblx0XHR2YXIgc3RyYXRlZ3k7IC8vIGZhdm9yIG9yIGZvcmNlIEh1ZmZtYW4gY29kaW5nXG5cblx0XHQvLyBVc2UgYSBmYXN0ZXIgc2VhcmNoIHdoZW4gdGhlIHByZXZpb3VzIG1hdGNoIGlzIGxvbmdlciB0aGFuIHRoaXNcblx0XHR2YXIgZ29vZF9tYXRjaDtcblxuXHRcdC8vIFN0b3Agc2VhcmNoaW5nIHdoZW4gY3VycmVudCBtYXRjaCBleGNlZWRzIHRoaXNcblx0XHR2YXIgbmljZV9tYXRjaDtcblxuXHRcdHZhciBkeW5fbHRyZWU7IC8vIGxpdGVyYWwgYW5kIGxlbmd0aCB0cmVlXG5cdFx0dmFyIGR5bl9kdHJlZTsgLy8gZGlzdGFuY2UgdHJlZVxuXHRcdHZhciBibF90cmVlOyAvLyBIdWZmbWFuIHRyZWUgZm9yIGJpdCBsZW5ndGhzXG5cblx0XHR2YXIgbF9kZXNjID0gbmV3IFRyZWUoKTsgLy8gZGVzYyBmb3IgbGl0ZXJhbCB0cmVlXG5cdFx0dmFyIGRfZGVzYyA9IG5ldyBUcmVlKCk7IC8vIGRlc2MgZm9yIGRpc3RhbmNlIHRyZWVcblx0XHR2YXIgYmxfZGVzYyA9IG5ldyBUcmVlKCk7IC8vIGRlc2MgZm9yIGJpdCBsZW5ndGggdHJlZVxuXG5cdFx0Ly8gdGhhdC5oZWFwX2xlbjsgLy8gbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBoZWFwXG5cdFx0Ly8gdGhhdC5oZWFwX21heDsgLy8gZWxlbWVudCBvZiBsYXJnZXN0IGZyZXF1ZW5jeVxuXHRcdC8vIFRoZSBzb25zIG9mIGhlYXBbbl0gYXJlIGhlYXBbMipuXSBhbmQgaGVhcFsyKm4rMV0uIGhlYXBbMF0gaXMgbm90IHVzZWQuXG5cdFx0Ly8gVGhlIHNhbWUgaGVhcCBhcnJheSBpcyB1c2VkIHRvIGJ1aWxkIGFsbCB0cmVlcy5cblxuXHRcdC8vIERlcHRoIG9mIGVhY2ggc3VidHJlZSB1c2VkIGFzIHRpZSBicmVha2VyIGZvciB0cmVlcyBvZiBlcXVhbCBmcmVxdWVuY3lcblx0XHR0aGF0LmRlcHRoID0gW107XG5cblx0XHR2YXIgbF9idWY7IC8vIGluZGV4IGZvciBsaXRlcmFscyBvciBsZW5ndGhzICovXG5cblx0XHQvLyBTaXplIG9mIG1hdGNoIGJ1ZmZlciBmb3IgbGl0ZXJhbHMvbGVuZ3Rocy4gVGhlcmUgYXJlIDQgcmVhc29ucyBmb3Jcblx0XHQvLyBsaW1pdGluZyBsaXRfYnVmc2l6ZSB0byA2NEs6XG5cdFx0Ly8gLSBmcmVxdWVuY2llcyBjYW4gYmUga2VwdCBpbiAxNiBiaXQgY291bnRlcnNcblx0XHQvLyAtIGlmIGNvbXByZXNzaW9uIGlzIG5vdCBzdWNjZXNzZnVsIGZvciB0aGUgZmlyc3QgYmxvY2ssIGFsbCBpbnB1dFxuXHRcdC8vIGRhdGEgaXMgc3RpbGwgaW4gdGhlIHdpbmRvdyBzbyB3ZSBjYW4gc3RpbGwgZW1pdCBhIHN0b3JlZCBibG9jayBldmVuXG5cdFx0Ly8gd2hlbiBpbnB1dCBjb21lcyBmcm9tIHN0YW5kYXJkIGlucHV0LiAoVGhpcyBjYW4gYWxzbyBiZSBkb25lIGZvclxuXHRcdC8vIGFsbCBibG9ja3MgaWYgbGl0X2J1ZnNpemUgaXMgbm90IGdyZWF0ZXIgdGhhbiAzMksuKVxuXHRcdC8vIC0gaWYgY29tcHJlc3Npb24gaXMgbm90IHN1Y2Nlc3NmdWwgZm9yIGEgZmlsZSBzbWFsbGVyIHRoYW4gNjRLLCB3ZSBjYW5cblx0XHQvLyBldmVuIGVtaXQgYSBzdG9yZWQgZmlsZSBpbnN0ZWFkIG9mIGEgc3RvcmVkIGJsb2NrIChzYXZpbmcgNSBieXRlcykuXG5cdFx0Ly8gVGhpcyBpcyBhcHBsaWNhYmxlIG9ubHkgZm9yIHppcCAobm90IGd6aXAgb3IgemxpYikuXG5cdFx0Ly8gLSBjcmVhdGluZyBuZXcgSHVmZm1hbiB0cmVlcyBsZXNzIGZyZXF1ZW50bHkgbWF5IG5vdCBwcm92aWRlIGZhc3Rcblx0XHQvLyBhZGFwdGF0aW9uIHRvIGNoYW5nZXMgaW4gdGhlIGlucHV0IGRhdGEgc3RhdGlzdGljcy4gKFRha2UgZm9yXG5cdFx0Ly8gZXhhbXBsZSBhIGJpbmFyeSBmaWxlIHdpdGggcG9vcmx5IGNvbXByZXNzaWJsZSBjb2RlIGZvbGxvd2VkIGJ5XG5cdFx0Ly8gYSBoaWdobHkgY29tcHJlc3NpYmxlIHN0cmluZyB0YWJsZS4pIFNtYWxsZXIgYnVmZmVyIHNpemVzIGdpdmVcblx0XHQvLyBmYXN0IGFkYXB0YXRpb24gYnV0IGhhdmUgb2YgY291cnNlIHRoZSBvdmVyaGVhZCBvZiB0cmFuc21pdHRpbmdcblx0XHQvLyB0cmVlcyBtb3JlIGZyZXF1ZW50bHkuXG5cdFx0Ly8gLSBJIGNhbid0IGNvdW50IGFib3ZlIDRcblx0XHR2YXIgbGl0X2J1ZnNpemU7XG5cblx0XHR2YXIgbGFzdF9saXQ7IC8vIHJ1bm5pbmcgaW5kZXggaW4gbF9idWZcblxuXHRcdC8vIEJ1ZmZlciBmb3IgZGlzdGFuY2VzLiBUbyBzaW1wbGlmeSB0aGUgY29kZSwgZF9idWYgYW5kIGxfYnVmIGhhdmVcblx0XHQvLyB0aGUgc2FtZSBudW1iZXIgb2YgZWxlbWVudHMuIFRvIHVzZSBkaWZmZXJlbnQgbGVuZ3RocywgYW4gZXh0cmEgZmxhZ1xuXHRcdC8vIGFycmF5IHdvdWxkIGJlIG5lY2Vzc2FyeS5cblxuXHRcdHZhciBkX2J1ZjsgLy8gaW5kZXggb2YgcGVuZGlnX2J1ZlxuXG5cdFx0Ly8gdGhhdC5vcHRfbGVuOyAvLyBiaXQgbGVuZ3RoIG9mIGN1cnJlbnQgYmxvY2sgd2l0aCBvcHRpbWFsIHRyZWVzXG5cdFx0Ly8gdGhhdC5zdGF0aWNfbGVuOyAvLyBiaXQgbGVuZ3RoIG9mIGN1cnJlbnQgYmxvY2sgd2l0aCBzdGF0aWMgdHJlZXNcblx0XHR2YXIgbWF0Y2hlczsgLy8gbnVtYmVyIG9mIHN0cmluZyBtYXRjaGVzIGluIGN1cnJlbnQgYmxvY2tcblx0XHR2YXIgbGFzdF9lb2JfbGVuOyAvLyBiaXQgbGVuZ3RoIG9mIEVPQiBjb2RlIGZvciBsYXN0IGJsb2NrXG5cblx0XHQvLyBPdXRwdXQgYnVmZmVyLiBiaXRzIGFyZSBpbnNlcnRlZCBzdGFydGluZyBhdCB0aGUgYm90dG9tIChsZWFzdFxuXHRcdC8vIHNpZ25pZmljYW50IGJpdHMpLlxuXHRcdHZhciBiaV9idWY7XG5cblx0XHQvLyBOdW1iZXIgb2YgdmFsaWQgYml0cyBpbiBiaV9idWYuIEFsbCBiaXRzIGFib3ZlIHRoZSBsYXN0IHZhbGlkIGJpdFxuXHRcdC8vIGFyZSBhbHdheXMgemVyby5cblx0XHR2YXIgYmlfdmFsaWQ7XG5cblx0XHQvLyBudW1iZXIgb2YgY29kZXMgYXQgZWFjaCBiaXQgbGVuZ3RoIGZvciBhbiBvcHRpbWFsIHRyZWVcblx0XHR0aGF0LmJsX2NvdW50ID0gW107XG5cblx0XHQvLyBoZWFwIHVzZWQgdG8gYnVpbGQgdGhlIEh1ZmZtYW4gdHJlZXNcblx0XHR0aGF0LmhlYXAgPSBbXTtcblxuXHRcdGR5bl9sdHJlZSA9IFtdO1xuXHRcdGR5bl9kdHJlZSA9IFtdO1xuXHRcdGJsX3RyZWUgPSBbXTtcblxuXHRcdGZ1bmN0aW9uIGxtX2luaXQoKSB7XG5cdFx0XHR2YXIgaTtcblx0XHRcdHdpbmRvd19zaXplID0gMiAqIHdfc2l6ZTtcblxuXHRcdFx0aGVhZFtoYXNoX3NpemUgLSAxXSA9IDA7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgaGFzaF9zaXplIC0gMTsgaSsrKSB7XG5cdFx0XHRcdGhlYWRbaV0gPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzOlxuXHRcdFx0bWF4X2xhenlfbWF0Y2ggPSBjb25maWdfdGFibGVbbGV2ZWxdLm1heF9sYXp5O1xuXHRcdFx0Z29vZF9tYXRjaCA9IGNvbmZpZ190YWJsZVtsZXZlbF0uZ29vZF9sZW5ndGg7XG5cdFx0XHRuaWNlX21hdGNoID0gY29uZmlnX3RhYmxlW2xldmVsXS5uaWNlX2xlbmd0aDtcblx0XHRcdG1heF9jaGFpbl9sZW5ndGggPSBjb25maWdfdGFibGVbbGV2ZWxdLm1heF9jaGFpbjtcblxuXHRcdFx0c3Ryc3RhcnQgPSAwO1xuXHRcdFx0YmxvY2tfc3RhcnQgPSAwO1xuXHRcdFx0bG9va2FoZWFkID0gMDtcblx0XHRcdG1hdGNoX2xlbmd0aCA9IHByZXZfbGVuZ3RoID0gTUlOX01BVENIIC0gMTtcblx0XHRcdG1hdGNoX2F2YWlsYWJsZSA9IDA7XG5cdFx0XHRpbnNfaCA9IDA7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gaW5pdF9ibG9jaygpIHtcblx0XHRcdHZhciBpO1xuXHRcdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgdHJlZXMuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgTF9DT0RFUzsgaSsrKVxuXHRcdFx0XHRkeW5fbHRyZWVbaSAqIDJdID0gMDtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBEX0NPREVTOyBpKyspXG5cdFx0XHRcdGR5bl9kdHJlZVtpICogMl0gPSAwO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IEJMX0NPREVTOyBpKyspXG5cdFx0XHRcdGJsX3RyZWVbaSAqIDJdID0gMDtcblxuXHRcdFx0ZHluX2x0cmVlW0VORF9CTE9DSyAqIDJdID0gMTtcblx0XHRcdHRoYXQub3B0X2xlbiA9IHRoYXQuc3RhdGljX2xlbiA9IDA7XG5cdFx0XHRsYXN0X2xpdCA9IG1hdGNoZXMgPSAwO1xuXHRcdH1cblxuXHRcdC8vIEluaXRpYWxpemUgdGhlIHRyZWUgZGF0YSBzdHJ1Y3R1cmVzIGZvciBhIG5ldyB6bGliIHN0cmVhbS5cblx0XHRmdW5jdGlvbiB0cl9pbml0KCkge1xuXG5cdFx0XHRsX2Rlc2MuZHluX3RyZWUgPSBkeW5fbHRyZWU7XG5cdFx0XHRsX2Rlc2Muc3RhdF9kZXNjID0gU3RhdGljVHJlZS5zdGF0aWNfbF9kZXNjO1xuXG5cdFx0XHRkX2Rlc2MuZHluX3RyZWUgPSBkeW5fZHRyZWU7XG5cdFx0XHRkX2Rlc2Muc3RhdF9kZXNjID0gU3RhdGljVHJlZS5zdGF0aWNfZF9kZXNjO1xuXG5cdFx0XHRibF9kZXNjLmR5bl90cmVlID0gYmxfdHJlZTtcblx0XHRcdGJsX2Rlc2Muc3RhdF9kZXNjID0gU3RhdGljVHJlZS5zdGF0aWNfYmxfZGVzYztcblxuXHRcdFx0YmlfYnVmID0gMDtcblx0XHRcdGJpX3ZhbGlkID0gMDtcblx0XHRcdGxhc3RfZW9iX2xlbiA9IDg7IC8vIGVub3VnaCBsb29rYWhlYWQgZm9yIGluZmxhdGVcblxuXHRcdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgZmlyc3QgYmxvY2sgb2YgdGhlIGZpcnN0IGZpbGU6XG5cdFx0XHRpbml0X2Jsb2NrKCk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVzdG9yZSB0aGUgaGVhcCBwcm9wZXJ0eSBieSBtb3ZpbmcgZG93biB0aGUgdHJlZSBzdGFydGluZyBhdCBub2RlIGssXG5cdFx0Ly8gZXhjaGFuZ2luZyBhIG5vZGUgd2l0aCB0aGUgc21hbGxlc3Qgb2YgaXRzIHR3byBzb25zIGlmIG5lY2Vzc2FyeSxcblx0XHQvLyBzdG9wcGluZ1xuXHRcdC8vIHdoZW4gdGhlIGhlYXAgcHJvcGVydHkgaXMgcmUtZXN0YWJsaXNoZWQgKGVhY2ggZmF0aGVyIHNtYWxsZXIgdGhhbiBpdHNcblx0XHQvLyB0d28gc29ucykuXG5cdFx0dGhhdC5wcWRvd25oZWFwID0gZnVuY3Rpb24odHJlZSwgLy8gdGhlIHRyZWUgdG8gcmVzdG9yZVxuXHRcdGsgLy8gbm9kZSB0byBtb3ZlIGRvd25cblx0XHQpIHtcblx0XHRcdHZhciBoZWFwID0gdGhhdC5oZWFwO1xuXHRcdFx0dmFyIHYgPSBoZWFwW2tdO1xuXHRcdFx0dmFyIGogPSBrIDw8IDE7IC8vIGxlZnQgc29uIG9mIGtcblx0XHRcdHdoaWxlIChqIDw9IHRoYXQuaGVhcF9sZW4pIHtcblx0XHRcdFx0Ly8gU2V0IGogdG8gdGhlIHNtYWxsZXN0IG9mIHRoZSB0d28gc29uczpcblx0XHRcdFx0aWYgKGogPCB0aGF0LmhlYXBfbGVuICYmIHNtYWxsZXIodHJlZSwgaGVhcFtqICsgMV0sIGhlYXBbal0sIHRoYXQuZGVwdGgpKSB7XG5cdFx0XHRcdFx0aisrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIEV4aXQgaWYgdiBpcyBzbWFsbGVyIHRoYW4gYm90aCBzb25zXG5cdFx0XHRcdGlmIChzbWFsbGVyKHRyZWUsIHYsIGhlYXBbal0sIHRoYXQuZGVwdGgpKVxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8vIEV4Y2hhbmdlIHYgd2l0aCB0aGUgc21hbGxlc3Qgc29uXG5cdFx0XHRcdGhlYXBba10gPSBoZWFwW2pdO1xuXHRcdFx0XHRrID0gajtcblx0XHRcdFx0Ly8gQW5kIGNvbnRpbnVlIGRvd24gdGhlIHRyZWUsIHNldHRpbmcgaiB0byB0aGUgbGVmdCBzb24gb2Yga1xuXHRcdFx0XHRqIDw8PSAxO1xuXHRcdFx0fVxuXHRcdFx0aGVhcFtrXSA9IHY7XG5cdFx0fTtcblxuXHRcdC8vIFNjYW4gYSBsaXRlcmFsIG9yIGRpc3RhbmNlIHRyZWUgdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY2llcyBvZiB0aGUgY29kZXNcblx0XHQvLyBpbiB0aGUgYml0IGxlbmd0aCB0cmVlLlxuXHRcdGZ1bmN0aW9uIHNjYW5fdHJlZSh0cmVlLC8vIHRoZSB0cmVlIHRvIGJlIHNjYW5uZWRcblx0XHRtYXhfY29kZSAvLyBhbmQgaXRzIGxhcmdlc3QgY29kZSBvZiBub24gemVybyBmcmVxdWVuY3lcblx0XHQpIHtcblx0XHRcdHZhciBuOyAvLyBpdGVyYXRlcyBvdmVyIGFsbCB0cmVlIGVsZW1lbnRzXG5cdFx0XHR2YXIgcHJldmxlbiA9IC0xOyAvLyBsYXN0IGVtaXR0ZWQgbGVuZ3RoXG5cdFx0XHR2YXIgY3VybGVuOyAvLyBsZW5ndGggb2YgY3VycmVudCBjb2RlXG5cdFx0XHR2YXIgbmV4dGxlbiA9IHRyZWVbMCAqIDIgKyAxXTsgLy8gbGVuZ3RoIG9mIG5leHQgY29kZVxuXHRcdFx0dmFyIGNvdW50ID0gMDsgLy8gcmVwZWF0IGNvdW50IG9mIHRoZSBjdXJyZW50IGNvZGVcblx0XHRcdHZhciBtYXhfY291bnQgPSA3OyAvLyBtYXggcmVwZWF0IGNvdW50XG5cdFx0XHR2YXIgbWluX2NvdW50ID0gNDsgLy8gbWluIHJlcGVhdCBjb3VudFxuXG5cdFx0XHRpZiAobmV4dGxlbiA9PT0gMCkge1xuXHRcdFx0XHRtYXhfY291bnQgPSAxMzg7XG5cdFx0XHRcdG1pbl9jb3VudCA9IDM7XG5cdFx0XHR9XG5cdFx0XHR0cmVlWyhtYXhfY29kZSArIDEpICogMiArIDFdID0gMHhmZmZmOyAvLyBndWFyZFxuXG5cdFx0XHRmb3IgKG4gPSAwOyBuIDw9IG1heF9jb2RlOyBuKyspIHtcblx0XHRcdFx0Y3VybGVuID0gbmV4dGxlbjtcblx0XHRcdFx0bmV4dGxlbiA9IHRyZWVbKG4gKyAxKSAqIDIgKyAxXTtcblx0XHRcdFx0aWYgKCsrY291bnQgPCBtYXhfY291bnQgJiYgY3VybGVuID09IG5leHRsZW4pIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fSBlbHNlIGlmIChjb3VudCA8IG1pbl9jb3VudCkge1xuXHRcdFx0XHRcdGJsX3RyZWVbY3VybGVuICogMl0gKz0gY291bnQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAoY3VybGVuICE9PSAwKSB7XG5cdFx0XHRcdFx0aWYgKGN1cmxlbiAhPSBwcmV2bGVuKVxuXHRcdFx0XHRcdFx0YmxfdHJlZVtjdXJsZW4gKiAyXSsrO1xuXHRcdFx0XHRcdGJsX3RyZWVbUkVQXzNfNiAqIDJdKys7XG5cdFx0XHRcdH0gZWxzZSBpZiAoY291bnQgPD0gMTApIHtcblx0XHRcdFx0XHRibF90cmVlW1JFUFpfM18xMCAqIDJdKys7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YmxfdHJlZVtSRVBaXzExXzEzOCAqIDJdKys7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y291bnQgPSAwO1xuXHRcdFx0XHRwcmV2bGVuID0gY3VybGVuO1xuXHRcdFx0XHRpZiAobmV4dGxlbiA9PT0gMCkge1xuXHRcdFx0XHRcdG1heF9jb3VudCA9IDEzODtcblx0XHRcdFx0XHRtaW5fY291bnQgPSAzO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGN1cmxlbiA9PSBuZXh0bGVuKSB7XG5cdFx0XHRcdFx0bWF4X2NvdW50ID0gNjtcblx0XHRcdFx0XHRtaW5fY291bnQgPSAzO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG1heF9jb3VudCA9IDc7XG5cdFx0XHRcdFx0bWluX2NvdW50ID0gNDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENvbnN0cnVjdCB0aGUgSHVmZm1hbiB0cmVlIGZvciB0aGUgYml0IGxlbmd0aHMgYW5kIHJldHVybiB0aGUgaW5kZXggaW5cblx0XHQvLyBibF9vcmRlciBvZiB0aGUgbGFzdCBiaXQgbGVuZ3RoIGNvZGUgdG8gc2VuZC5cblx0XHRmdW5jdGlvbiBidWlsZF9ibF90cmVlKCkge1xuXHRcdFx0dmFyIG1heF9ibGluZGV4OyAvLyBpbmRleCBvZiBsYXN0IGJpdCBsZW5ndGggY29kZSBvZiBub24gemVybyBmcmVxXG5cblx0XHRcdC8vIERldGVybWluZSB0aGUgYml0IGxlbmd0aCBmcmVxdWVuY2llcyBmb3IgbGl0ZXJhbCBhbmQgZGlzdGFuY2UgdHJlZXNcblx0XHRcdHNjYW5fdHJlZShkeW5fbHRyZWUsIGxfZGVzYy5tYXhfY29kZSk7XG5cdFx0XHRzY2FuX3RyZWUoZHluX2R0cmVlLCBkX2Rlc2MubWF4X2NvZGUpO1xuXG5cdFx0XHQvLyBCdWlsZCB0aGUgYml0IGxlbmd0aCB0cmVlOlxuXHRcdFx0YmxfZGVzYy5idWlsZF90cmVlKHRoYXQpO1xuXHRcdFx0Ly8gb3B0X2xlbiBub3cgaW5jbHVkZXMgdGhlIGxlbmd0aCBvZiB0aGUgdHJlZSByZXByZXNlbnRhdGlvbnMsIGV4Y2VwdFxuXHRcdFx0Ly8gdGhlIGxlbmd0aHMgb2YgdGhlIGJpdCBsZW5ndGhzIGNvZGVzIGFuZCB0aGUgNSs1KzQgYml0cyBmb3IgdGhlXG5cdFx0XHQvLyBjb3VudHMuXG5cblx0XHRcdC8vIERldGVybWluZSB0aGUgbnVtYmVyIG9mIGJpdCBsZW5ndGggY29kZXMgdG8gc2VuZC4gVGhlIHBremlwIGZvcm1hdFxuXHRcdFx0Ly8gcmVxdWlyZXMgdGhhdCBhdCBsZWFzdCA0IGJpdCBsZW5ndGggY29kZXMgYmUgc2VudC4gKGFwcG5vdGUudHh0IHNheXNcblx0XHRcdC8vIDMgYnV0IHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpcyA0Lilcblx0XHRcdGZvciAobWF4X2JsaW5kZXggPSBCTF9DT0RFUyAtIDE7IG1heF9ibGluZGV4ID49IDM7IG1heF9ibGluZGV4LS0pIHtcblx0XHRcdFx0aWYgKGJsX3RyZWVbVHJlZS5ibF9vcmRlclttYXhfYmxpbmRleF0gKiAyICsgMV0gIT09IDApXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHQvLyBVcGRhdGUgb3B0X2xlbiB0byBpbmNsdWRlIHRoZSBiaXQgbGVuZ3RoIHRyZWUgYW5kIGNvdW50c1xuXHRcdFx0dGhhdC5vcHRfbGVuICs9IDMgKiAobWF4X2JsaW5kZXggKyAxKSArIDUgKyA1ICsgNDtcblxuXHRcdFx0cmV0dXJuIG1heF9ibGluZGV4O1xuXHRcdH1cblxuXHRcdC8vIE91dHB1dCBhIGJ5dGUgb24gdGhlIHN0cmVhbS5cblx0XHQvLyBJTiBhc3NlcnRpb246IHRoZXJlIGlzIGVub3VnaCByb29tIGluIHBlbmRpbmdfYnVmLlxuXHRcdGZ1bmN0aW9uIHB1dF9ieXRlKHApIHtcblx0XHRcdHRoYXQucGVuZGluZ19idWZbdGhhdC5wZW5kaW5nKytdID0gcDtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBwdXRfc2hvcnQodykge1xuXHRcdFx0cHV0X2J5dGUodyAmIDB4ZmYpO1xuXHRcdFx0cHV0X2J5dGUoKHcgPj4+IDgpICYgMHhmZik7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcHV0U2hvcnRNU0IoYikge1xuXHRcdFx0cHV0X2J5dGUoKGIgPj4gOCkgJiAweGZmKTtcblx0XHRcdHB1dF9ieXRlKChiICYgMHhmZikgJiAweGZmKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZW5kX2JpdHModmFsdWUsIGxlbmd0aCkge1xuXHRcdFx0dmFyIHZhbCwgbGVuID0gbGVuZ3RoO1xuXHRcdFx0aWYgKGJpX3ZhbGlkID4gQnVmX3NpemUgLSBsZW4pIHtcblx0XHRcdFx0dmFsID0gdmFsdWU7XG5cdFx0XHRcdC8vIGJpX2J1ZiB8PSAodmFsIDw8IGJpX3ZhbGlkKTtcblx0XHRcdFx0YmlfYnVmIHw9ICgodmFsIDw8IGJpX3ZhbGlkKSAmIDB4ZmZmZik7XG5cdFx0XHRcdHB1dF9zaG9ydChiaV9idWYpO1xuXHRcdFx0XHRiaV9idWYgPSB2YWwgPj4+IChCdWZfc2l6ZSAtIGJpX3ZhbGlkKTtcblx0XHRcdFx0YmlfdmFsaWQgKz0gbGVuIC0gQnVmX3NpemU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBiaV9idWYgfD0gKHZhbHVlKSA8PCBiaV92YWxpZDtcblx0XHRcdFx0YmlfYnVmIHw9ICgoKHZhbHVlKSA8PCBiaV92YWxpZCkgJiAweGZmZmYpO1xuXHRcdFx0XHRiaV92YWxpZCArPSBsZW47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2VuZF9jb2RlKGMsIHRyZWUpIHtcblx0XHRcdHZhciBjMiA9IGMgKiAyO1xuXHRcdFx0c2VuZF9iaXRzKHRyZWVbYzJdICYgMHhmZmZmLCB0cmVlW2MyICsgMV0gJiAweGZmZmYpO1xuXHRcdH1cblxuXHRcdC8vIFNlbmQgYSBsaXRlcmFsIG9yIGRpc3RhbmNlIHRyZWUgaW4gY29tcHJlc3NlZCBmb3JtLCB1c2luZyB0aGUgY29kZXMgaW5cblx0XHQvLyBibF90cmVlLlxuXHRcdGZ1bmN0aW9uIHNlbmRfdHJlZSh0cmVlLC8vIHRoZSB0cmVlIHRvIGJlIHNlbnRcblx0XHRtYXhfY29kZSAvLyBhbmQgaXRzIGxhcmdlc3QgY29kZSBvZiBub24gemVybyBmcmVxdWVuY3lcblx0XHQpIHtcblx0XHRcdHZhciBuOyAvLyBpdGVyYXRlcyBvdmVyIGFsbCB0cmVlIGVsZW1lbnRzXG5cdFx0XHR2YXIgcHJldmxlbiA9IC0xOyAvLyBsYXN0IGVtaXR0ZWQgbGVuZ3RoXG5cdFx0XHR2YXIgY3VybGVuOyAvLyBsZW5ndGggb2YgY3VycmVudCBjb2RlXG5cdFx0XHR2YXIgbmV4dGxlbiA9IHRyZWVbMCAqIDIgKyAxXTsgLy8gbGVuZ3RoIG9mIG5leHQgY29kZVxuXHRcdFx0dmFyIGNvdW50ID0gMDsgLy8gcmVwZWF0IGNvdW50IG9mIHRoZSBjdXJyZW50IGNvZGVcblx0XHRcdHZhciBtYXhfY291bnQgPSA3OyAvLyBtYXggcmVwZWF0IGNvdW50XG5cdFx0XHR2YXIgbWluX2NvdW50ID0gNDsgLy8gbWluIHJlcGVhdCBjb3VudFxuXG5cdFx0XHRpZiAobmV4dGxlbiA9PT0gMCkge1xuXHRcdFx0XHRtYXhfY291bnQgPSAxMzg7XG5cdFx0XHRcdG1pbl9jb3VudCA9IDM7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAobiA9IDA7IG4gPD0gbWF4X2NvZGU7IG4rKykge1xuXHRcdFx0XHRjdXJsZW4gPSBuZXh0bGVuO1xuXHRcdFx0XHRuZXh0bGVuID0gdHJlZVsobiArIDEpICogMiArIDFdO1xuXHRcdFx0XHRpZiAoKytjb3VudCA8IG1heF9jb3VudCAmJiBjdXJsZW4gPT0gbmV4dGxlbikge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGNvdW50IDwgbWluX2NvdW50KSB7XG5cdFx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdFx0c2VuZF9jb2RlKGN1cmxlbiwgYmxfdHJlZSk7XG5cdFx0XHRcdFx0fSB3aGlsZSAoLS1jb3VudCAhPT0gMCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoY3VybGVuICE9PSAwKSB7XG5cdFx0XHRcdFx0aWYgKGN1cmxlbiAhPSBwcmV2bGVuKSB7XG5cdFx0XHRcdFx0XHRzZW5kX2NvZGUoY3VybGVuLCBibF90cmVlKTtcblx0XHRcdFx0XHRcdGNvdW50LS07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHNlbmRfY29kZShSRVBfM182LCBibF90cmVlKTtcblx0XHRcdFx0XHRzZW5kX2JpdHMoY291bnQgLSAzLCAyKTtcblx0XHRcdFx0fSBlbHNlIGlmIChjb3VudCA8PSAxMCkge1xuXHRcdFx0XHRcdHNlbmRfY29kZShSRVBaXzNfMTAsIGJsX3RyZWUpO1xuXHRcdFx0XHRcdHNlbmRfYml0cyhjb3VudCAtIDMsIDMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlbmRfY29kZShSRVBaXzExXzEzOCwgYmxfdHJlZSk7XG5cdFx0XHRcdFx0c2VuZF9iaXRzKGNvdW50IC0gMTEsIDcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvdW50ID0gMDtcblx0XHRcdFx0cHJldmxlbiA9IGN1cmxlbjtcblx0XHRcdFx0aWYgKG5leHRsZW4gPT09IDApIHtcblx0XHRcdFx0XHRtYXhfY291bnQgPSAxMzg7XG5cdFx0XHRcdFx0bWluX2NvdW50ID0gMztcblx0XHRcdFx0fSBlbHNlIGlmIChjdXJsZW4gPT0gbmV4dGxlbikge1xuXHRcdFx0XHRcdG1heF9jb3VudCA9IDY7XG5cdFx0XHRcdFx0bWluX2NvdW50ID0gMztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtYXhfY291bnQgPSA3O1xuXHRcdFx0XHRcdG1pbl9jb3VudCA9IDQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBTZW5kIHRoZSBoZWFkZXIgZm9yIGEgYmxvY2sgdXNpbmcgZHluYW1pYyBIdWZmbWFuIHRyZWVzOiB0aGUgY291bnRzLCB0aGVcblx0XHQvLyBsZW5ndGhzIG9mIHRoZSBiaXQgbGVuZ3RoIGNvZGVzLCB0aGUgbGl0ZXJhbCB0cmVlIGFuZCB0aGUgZGlzdGFuY2UgdHJlZS5cblx0XHQvLyBJTiBhc3NlcnRpb246IGxjb2RlcyA+PSAyNTcsIGRjb2RlcyA+PSAxLCBibGNvZGVzID49IDQuXG5cdFx0ZnVuY3Rpb24gc2VuZF9hbGxfdHJlZXMobGNvZGVzLCBkY29kZXMsIGJsY29kZXMpIHtcblx0XHRcdHZhciByYW5rOyAvLyBpbmRleCBpbiBibF9vcmRlclxuXG5cdFx0XHRzZW5kX2JpdHMobGNvZGVzIC0gMjU3LCA1KTsgLy8gbm90ICsyNTUgYXMgc3RhdGVkIGluIGFwcG5vdGUudHh0XG5cdFx0XHRzZW5kX2JpdHMoZGNvZGVzIC0gMSwgNSk7XG5cdFx0XHRzZW5kX2JpdHMoYmxjb2RlcyAtIDQsIDQpOyAvLyBub3QgLTMgYXMgc3RhdGVkIGluIGFwcG5vdGUudHh0XG5cdFx0XHRmb3IgKHJhbmsgPSAwOyByYW5rIDwgYmxjb2RlczsgcmFuaysrKSB7XG5cdFx0XHRcdHNlbmRfYml0cyhibF90cmVlW1RyZWUuYmxfb3JkZXJbcmFua10gKiAyICsgMV0sIDMpO1xuXHRcdFx0fVxuXHRcdFx0c2VuZF90cmVlKGR5bl9sdHJlZSwgbGNvZGVzIC0gMSk7IC8vIGxpdGVyYWwgdHJlZVxuXHRcdFx0c2VuZF90cmVlKGR5bl9kdHJlZSwgZGNvZGVzIC0gMSk7IC8vIGRpc3RhbmNlIHRyZWVcblx0XHR9XG5cblx0XHQvLyBGbHVzaCB0aGUgYml0IGJ1ZmZlciwga2VlcGluZyBhdCBtb3N0IDcgYml0cyBpbiBpdC5cblx0XHRmdW5jdGlvbiBiaV9mbHVzaCgpIHtcblx0XHRcdGlmIChiaV92YWxpZCA9PSAxNikge1xuXHRcdFx0XHRwdXRfc2hvcnQoYmlfYnVmKTtcblx0XHRcdFx0YmlfYnVmID0gMDtcblx0XHRcdFx0YmlfdmFsaWQgPSAwO1xuXHRcdFx0fSBlbHNlIGlmIChiaV92YWxpZCA+PSA4KSB7XG5cdFx0XHRcdHB1dF9ieXRlKGJpX2J1ZiAmIDB4ZmYpO1xuXHRcdFx0XHRiaV9idWYgPj4+PSA4O1xuXHRcdFx0XHRiaV92YWxpZCAtPSA4O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFNlbmQgb25lIGVtcHR5IHN0YXRpYyBibG9jayB0byBnaXZlIGVub3VnaCBsb29rYWhlYWQgZm9yIGluZmxhdGUuXG5cdFx0Ly8gVGhpcyB0YWtlcyAxMCBiaXRzLCBvZiB3aGljaCA3IG1heSByZW1haW4gaW4gdGhlIGJpdCBidWZmZXIuXG5cdFx0Ly8gVGhlIGN1cnJlbnQgaW5mbGF0ZSBjb2RlIHJlcXVpcmVzIDkgYml0cyBvZiBsb29rYWhlYWQuIElmIHRoZVxuXHRcdC8vIGxhc3QgdHdvIGNvZGVzIGZvciB0aGUgcHJldmlvdXMgYmxvY2sgKHJlYWwgY29kZSBwbHVzIEVPQikgd2VyZSBjb2RlZFxuXHRcdC8vIG9uIDUgYml0cyBvciBsZXNzLCBpbmZsYXRlIG1heSBoYXZlIG9ubHkgNSszIGJpdHMgb2YgbG9va2FoZWFkIHRvIGRlY29kZVxuXHRcdC8vIHRoZSBsYXN0IHJlYWwgY29kZS4gSW4gdGhpcyBjYXNlIHdlIHNlbmQgdHdvIGVtcHR5IHN0YXRpYyBibG9ja3MgaW5zdGVhZFxuXHRcdC8vIG9mIG9uZS4gKFRoZXJlIGFyZSBubyBwcm9ibGVtcyBpZiB0aGUgcHJldmlvdXMgYmxvY2sgaXMgc3RvcmVkIG9yIGZpeGVkLilcblx0XHQvLyBUbyBzaW1wbGlmeSB0aGUgY29kZSwgd2UgYXNzdW1lIHRoZSB3b3JzdCBjYXNlIG9mIGxhc3QgcmVhbCBjb2RlIGVuY29kZWRcblx0XHQvLyBvbiBvbmUgYml0IG9ubHkuXG5cdFx0ZnVuY3Rpb24gX3RyX2FsaWduKCkge1xuXHRcdFx0c2VuZF9iaXRzKFNUQVRJQ19UUkVFUyA8PCAxLCAzKTtcblx0XHRcdHNlbmRfY29kZShFTkRfQkxPQ0ssIFN0YXRpY1RyZWUuc3RhdGljX2x0cmVlKTtcblxuXHRcdFx0YmlfZmx1c2goKTtcblxuXHRcdFx0Ly8gT2YgdGhlIDEwIGJpdHMgZm9yIHRoZSBlbXB0eSBibG9jaywgd2UgaGF2ZSBhbHJlYWR5IHNlbnRcblx0XHRcdC8vICgxMCAtIGJpX3ZhbGlkKSBiaXRzLiBUaGUgbG9va2FoZWFkIGZvciB0aGUgbGFzdCByZWFsIGNvZGUgKGJlZm9yZVxuXHRcdFx0Ly8gdGhlIEVPQiBvZiB0aGUgcHJldmlvdXMgYmxvY2spIHdhcyB0aHVzIGF0IGxlYXN0IG9uZSBwbHVzIHRoZSBsZW5ndGhcblx0XHRcdC8vIG9mIHRoZSBFT0IgcGx1cyB3aGF0IHdlIGhhdmUganVzdCBzZW50IG9mIHRoZSBlbXB0eSBzdGF0aWMgYmxvY2suXG5cdFx0XHRpZiAoMSArIGxhc3RfZW9iX2xlbiArIDEwIC0gYmlfdmFsaWQgPCA5KSB7XG5cdFx0XHRcdHNlbmRfYml0cyhTVEFUSUNfVFJFRVMgPDwgMSwgMyk7XG5cdFx0XHRcdHNlbmRfY29kZShFTkRfQkxPQ0ssIFN0YXRpY1RyZWUuc3RhdGljX2x0cmVlKTtcblx0XHRcdFx0YmlfZmx1c2goKTtcblx0XHRcdH1cblx0XHRcdGxhc3RfZW9iX2xlbiA9IDc7XG5cdFx0fVxuXG5cdFx0Ly8gU2F2ZSB0aGUgbWF0Y2ggaW5mbyBhbmQgdGFsbHkgdGhlIGZyZXF1ZW5jeSBjb3VudHMuIFJldHVybiB0cnVlIGlmXG5cdFx0Ly8gdGhlIGN1cnJlbnQgYmxvY2sgbXVzdCBiZSBmbHVzaGVkLlxuXHRcdGZ1bmN0aW9uIF90cl90YWxseShkaXN0LCAvLyBkaXN0YW5jZSBvZiBtYXRjaGVkIHN0cmluZ1xuXHRcdGxjIC8vIG1hdGNoIGxlbmd0aC1NSU5fTUFUQ0ggb3IgdW5tYXRjaGVkIGNoYXIgKGlmIGRpc3Q9PTApXG5cdFx0KSB7XG5cdFx0XHR2YXIgb3V0X2xlbmd0aCwgaW5fbGVuZ3RoLCBkY29kZTtcblx0XHRcdHRoYXQucGVuZGluZ19idWZbZF9idWYgKyBsYXN0X2xpdCAqIDJdID0gKGRpc3QgPj4+IDgpICYgMHhmZjtcblx0XHRcdHRoYXQucGVuZGluZ19idWZbZF9idWYgKyBsYXN0X2xpdCAqIDIgKyAxXSA9IGRpc3QgJiAweGZmO1xuXG5cdFx0XHR0aGF0LnBlbmRpbmdfYnVmW2xfYnVmICsgbGFzdF9saXRdID0gbGMgJiAweGZmO1xuXHRcdFx0bGFzdF9saXQrKztcblxuXHRcdFx0aWYgKGRpc3QgPT09IDApIHtcblx0XHRcdFx0Ly8gbGMgaXMgdGhlIHVubWF0Y2hlZCBjaGFyXG5cdFx0XHRcdGR5bl9sdHJlZVtsYyAqIDJdKys7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtYXRjaGVzKys7XG5cdFx0XHRcdC8vIEhlcmUsIGxjIGlzIHRoZSBtYXRjaCBsZW5ndGggLSBNSU5fTUFUQ0hcblx0XHRcdFx0ZGlzdC0tOyAvLyBkaXN0ID0gbWF0Y2ggZGlzdGFuY2UgLSAxXG5cdFx0XHRcdGR5bl9sdHJlZVsoVHJlZS5fbGVuZ3RoX2NvZGVbbGNdICsgTElURVJBTFMgKyAxKSAqIDJdKys7XG5cdFx0XHRcdGR5bl9kdHJlZVtUcmVlLmRfY29kZShkaXN0KSAqIDJdKys7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgobGFzdF9saXQgJiAweDFmZmYpID09PSAwICYmIGxldmVsID4gMikge1xuXHRcdFx0XHQvLyBDb21wdXRlIGFuIHVwcGVyIGJvdW5kIGZvciB0aGUgY29tcHJlc3NlZCBsZW5ndGhcblx0XHRcdFx0b3V0X2xlbmd0aCA9IGxhc3RfbGl0ICogODtcblx0XHRcdFx0aW5fbGVuZ3RoID0gc3Ryc3RhcnQgLSBibG9ja19zdGFydDtcblx0XHRcdFx0Zm9yIChkY29kZSA9IDA7IGRjb2RlIDwgRF9DT0RFUzsgZGNvZGUrKykge1xuXHRcdFx0XHRcdG91dF9sZW5ndGggKz0gZHluX2R0cmVlW2Rjb2RlICogMl0gKiAoNSArIFRyZWUuZXh0cmFfZGJpdHNbZGNvZGVdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRvdXRfbGVuZ3RoID4+Pj0gMztcblx0XHRcdFx0aWYgKChtYXRjaGVzIDwgTWF0aC5mbG9vcihsYXN0X2xpdCAvIDIpKSAmJiBvdXRfbGVuZ3RoIDwgTWF0aC5mbG9vcihpbl9sZW5ndGggLyAyKSlcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChsYXN0X2xpdCA9PSBsaXRfYnVmc2l6ZSAtIDEpO1xuXHRcdFx0Ly8gV2UgYXZvaWQgZXF1YWxpdHkgd2l0aCBsaXRfYnVmc2l6ZSBiZWNhdXNlIG9mIHdyYXBhcm91bmQgYXQgNjRLXG5cdFx0XHQvLyBvbiAxNiBiaXQgbWFjaGluZXMgYW5kIGJlY2F1c2Ugc3RvcmVkIGJsb2NrcyBhcmUgcmVzdHJpY3RlZCB0b1xuXHRcdFx0Ly8gNjRLLTEgYnl0ZXMuXG5cdFx0fVxuXG5cdFx0Ly8gU2VuZCB0aGUgYmxvY2sgZGF0YSBjb21wcmVzc2VkIHVzaW5nIHRoZSBnaXZlbiBIdWZmbWFuIHRyZWVzXG5cdFx0ZnVuY3Rpb24gY29tcHJlc3NfYmxvY2sobHRyZWUsIGR0cmVlKSB7XG5cdFx0XHR2YXIgZGlzdDsgLy8gZGlzdGFuY2Ugb2YgbWF0Y2hlZCBzdHJpbmdcblx0XHRcdHZhciBsYzsgLy8gbWF0Y2ggbGVuZ3RoIG9yIHVubWF0Y2hlZCBjaGFyIChpZiBkaXN0ID09PSAwKVxuXHRcdFx0dmFyIGx4ID0gMDsgLy8gcnVubmluZyBpbmRleCBpbiBsX2J1ZlxuXHRcdFx0dmFyIGNvZGU7IC8vIHRoZSBjb2RlIHRvIHNlbmRcblx0XHRcdHZhciBleHRyYTsgLy8gbnVtYmVyIG9mIGV4dHJhIGJpdHMgdG8gc2VuZFxuXG5cdFx0XHRpZiAobGFzdF9saXQgIT09IDApIHtcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdGRpc3QgPSAoKHRoYXQucGVuZGluZ19idWZbZF9idWYgKyBseCAqIDJdIDw8IDgpICYgMHhmZjAwKSB8ICh0aGF0LnBlbmRpbmdfYnVmW2RfYnVmICsgbHggKiAyICsgMV0gJiAweGZmKTtcblx0XHRcdFx0XHRsYyA9ICh0aGF0LnBlbmRpbmdfYnVmW2xfYnVmICsgbHhdKSAmIDB4ZmY7XG5cdFx0XHRcdFx0bHgrKztcblxuXHRcdFx0XHRcdGlmIChkaXN0ID09PSAwKSB7XG5cdFx0XHRcdFx0XHRzZW5kX2NvZGUobGMsIGx0cmVlKTsgLy8gc2VuZCBhIGxpdGVyYWwgYnl0ZVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBIZXJlLCBsYyBpcyB0aGUgbWF0Y2ggbGVuZ3RoIC0gTUlOX01BVENIXG5cdFx0XHRcdFx0XHRjb2RlID0gVHJlZS5fbGVuZ3RoX2NvZGVbbGNdO1xuXG5cdFx0XHRcdFx0XHRzZW5kX2NvZGUoY29kZSArIExJVEVSQUxTICsgMSwgbHRyZWUpOyAvLyBzZW5kIHRoZSBsZW5ndGhcblx0XHRcdFx0XHRcdC8vIGNvZGVcblx0XHRcdFx0XHRcdGV4dHJhID0gVHJlZS5leHRyYV9sYml0c1tjb2RlXTtcblx0XHRcdFx0XHRcdGlmIChleHRyYSAhPT0gMCkge1xuXHRcdFx0XHRcdFx0XHRsYyAtPSBUcmVlLmJhc2VfbGVuZ3RoW2NvZGVdO1xuXHRcdFx0XHRcdFx0XHRzZW5kX2JpdHMobGMsIGV4dHJhKTsgLy8gc2VuZCB0aGUgZXh0cmEgbGVuZ3RoIGJpdHNcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRpc3QtLTsgLy8gZGlzdCBpcyBub3cgdGhlIG1hdGNoIGRpc3RhbmNlIC0gMVxuXHRcdFx0XHRcdFx0Y29kZSA9IFRyZWUuZF9jb2RlKGRpc3QpO1xuXG5cdFx0XHRcdFx0XHRzZW5kX2NvZGUoY29kZSwgZHRyZWUpOyAvLyBzZW5kIHRoZSBkaXN0YW5jZSBjb2RlXG5cdFx0XHRcdFx0XHRleHRyYSA9IFRyZWUuZXh0cmFfZGJpdHNbY29kZV07XG5cdFx0XHRcdFx0XHRpZiAoZXh0cmEgIT09IDApIHtcblx0XHRcdFx0XHRcdFx0ZGlzdCAtPSBUcmVlLmJhc2VfZGlzdFtjb2RlXTtcblx0XHRcdFx0XHRcdFx0c2VuZF9iaXRzKGRpc3QsIGV4dHJhKTsgLy8gc2VuZCB0aGUgZXh0cmEgZGlzdGFuY2UgYml0c1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gLy8gbGl0ZXJhbCBvciBtYXRjaCBwYWlyID9cblxuXHRcdFx0XHRcdC8vIENoZWNrIHRoYXQgdGhlIG92ZXJsYXkgYmV0d2VlbiBwZW5kaW5nX2J1ZiBhbmQgZF9idWYrbF9idWYgaXNcblx0XHRcdFx0XHQvLyBvazpcblx0XHRcdFx0fSB3aGlsZSAobHggPCBsYXN0X2xpdCk7XG5cdFx0XHR9XG5cblx0XHRcdHNlbmRfY29kZShFTkRfQkxPQ0ssIGx0cmVlKTtcblx0XHRcdGxhc3RfZW9iX2xlbiA9IGx0cmVlW0VORF9CTE9DSyAqIDIgKyAxXTtcblx0XHR9XG5cblx0XHQvLyBGbHVzaCB0aGUgYml0IGJ1ZmZlciBhbmQgYWxpZ24gdGhlIG91dHB1dCBvbiBhIGJ5dGUgYm91bmRhcnlcblx0XHRmdW5jdGlvbiBiaV93aW5kdXAoKSB7XG5cdFx0XHRpZiAoYmlfdmFsaWQgPiA4KSB7XG5cdFx0XHRcdHB1dF9zaG9ydChiaV9idWYpO1xuXHRcdFx0fSBlbHNlIGlmIChiaV92YWxpZCA+IDApIHtcblx0XHRcdFx0cHV0X2J5dGUoYmlfYnVmICYgMHhmZik7XG5cdFx0XHR9XG5cdFx0XHRiaV9idWYgPSAwO1xuXHRcdFx0YmlfdmFsaWQgPSAwO1xuXHRcdH1cblxuXHRcdC8vIENvcHkgYSBzdG9yZWQgYmxvY2ssIHN0b3JpbmcgZmlyc3QgdGhlIGxlbmd0aCBhbmQgaXRzXG5cdFx0Ly8gb25lJ3MgY29tcGxlbWVudCBpZiByZXF1ZXN0ZWQuXG5cdFx0ZnVuY3Rpb24gY29weV9ibG9jayhidWYsIC8vIHRoZSBpbnB1dCBkYXRhXG5cdFx0bGVuLCAvLyBpdHMgbGVuZ3RoXG5cdFx0aGVhZGVyIC8vIHRydWUgaWYgYmxvY2sgaGVhZGVyIG11c3QgYmUgd3JpdHRlblxuXHRcdCkge1xuXHRcdFx0Ymlfd2luZHVwKCk7IC8vIGFsaWduIG9uIGJ5dGUgYm91bmRhcnlcblx0XHRcdGxhc3RfZW9iX2xlbiA9IDg7IC8vIGVub3VnaCBsb29rYWhlYWQgZm9yIGluZmxhdGVcblxuXHRcdFx0aWYgKGhlYWRlcikge1xuXHRcdFx0XHRwdXRfc2hvcnQobGVuKTtcblx0XHRcdFx0cHV0X3Nob3J0KH5sZW4pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGF0LnBlbmRpbmdfYnVmLnNldCh3aW5kb3cuc3ViYXJyYXkoYnVmLCBidWYgKyBsZW4pLCB0aGF0LnBlbmRpbmcpO1xuXHRcdFx0dGhhdC5wZW5kaW5nICs9IGxlbjtcblx0XHR9XG5cblx0XHQvLyBTZW5kIGEgc3RvcmVkIGJsb2NrXG5cdFx0ZnVuY3Rpb24gX3RyX3N0b3JlZF9ibG9jayhidWYsIC8vIGlucHV0IGJsb2NrXG5cdFx0c3RvcmVkX2xlbiwgLy8gbGVuZ3RoIG9mIGlucHV0IGJsb2NrXG5cdFx0ZW9mIC8vIHRydWUgaWYgdGhpcyBpcyB0aGUgbGFzdCBibG9jayBmb3IgYSBmaWxlXG5cdFx0KSB7XG5cdFx0XHRzZW5kX2JpdHMoKFNUT1JFRF9CTE9DSyA8PCAxKSArIChlb2YgPyAxIDogMCksIDMpOyAvLyBzZW5kIGJsb2NrIHR5cGVcblx0XHRcdGNvcHlfYmxvY2soYnVmLCBzdG9yZWRfbGVuLCB0cnVlKTsgLy8gd2l0aCBoZWFkZXJcblx0XHR9XG5cblx0XHQvLyBEZXRlcm1pbmUgdGhlIGJlc3QgZW5jb2RpbmcgZm9yIHRoZSBjdXJyZW50IGJsb2NrOiBkeW5hbWljIHRyZWVzLCBzdGF0aWNcblx0XHQvLyB0cmVlcyBvciBzdG9yZSwgYW5kIG91dHB1dCB0aGUgZW5jb2RlZCBibG9jayB0byB0aGUgemlwIGZpbGUuXG5cdFx0ZnVuY3Rpb24gX3RyX2ZsdXNoX2Jsb2NrKGJ1ZiwgLy8gaW5wdXQgYmxvY2ssIG9yIE5VTEwgaWYgdG9vIG9sZFxuXHRcdHN0b3JlZF9sZW4sIC8vIGxlbmd0aCBvZiBpbnB1dCBibG9ja1xuXHRcdGVvZiAvLyB0cnVlIGlmIHRoaXMgaXMgdGhlIGxhc3QgYmxvY2sgZm9yIGEgZmlsZVxuXHRcdCkge1xuXHRcdFx0dmFyIG9wdF9sZW5iLCBzdGF0aWNfbGVuYjsvLyBvcHRfbGVuIGFuZCBzdGF0aWNfbGVuIGluIGJ5dGVzXG5cdFx0XHR2YXIgbWF4X2JsaW5kZXggPSAwOyAvLyBpbmRleCBvZiBsYXN0IGJpdCBsZW5ndGggY29kZSBvZiBub24gemVybyBmcmVxXG5cblx0XHRcdC8vIEJ1aWxkIHRoZSBIdWZmbWFuIHRyZWVzIHVubGVzcyBhIHN0b3JlZCBibG9jayBpcyBmb3JjZWRcblx0XHRcdGlmIChsZXZlbCA+IDApIHtcblx0XHRcdFx0Ly8gQ29uc3RydWN0IHRoZSBsaXRlcmFsIGFuZCBkaXN0YW5jZSB0cmVlc1xuXHRcdFx0XHRsX2Rlc2MuYnVpbGRfdHJlZSh0aGF0KTtcblxuXHRcdFx0XHRkX2Rlc2MuYnVpbGRfdHJlZSh0aGF0KTtcblxuXHRcdFx0XHQvLyBBdCB0aGlzIHBvaW50LCBvcHRfbGVuIGFuZCBzdGF0aWNfbGVuIGFyZSB0aGUgdG90YWwgYml0IGxlbmd0aHNcblx0XHRcdFx0Ly8gb2Zcblx0XHRcdFx0Ly8gdGhlIGNvbXByZXNzZWQgYmxvY2sgZGF0YSwgZXhjbHVkaW5nIHRoZSB0cmVlIHJlcHJlc2VudGF0aW9ucy5cblxuXHRcdFx0XHQvLyBCdWlsZCB0aGUgYml0IGxlbmd0aCB0cmVlIGZvciB0aGUgYWJvdmUgdHdvIHRyZWVzLCBhbmQgZ2V0IHRoZVxuXHRcdFx0XHQvLyBpbmRleFxuXHRcdFx0XHQvLyBpbiBibF9vcmRlciBvZiB0aGUgbGFzdCBiaXQgbGVuZ3RoIGNvZGUgdG8gc2VuZC5cblx0XHRcdFx0bWF4X2JsaW5kZXggPSBidWlsZF9ibF90cmVlKCk7XG5cblx0XHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBiZXN0IGVuY29kaW5nLiBDb21wdXRlIGZpcnN0IHRoZSBibG9jayBsZW5ndGggaW5cblx0XHRcdFx0Ly8gYnl0ZXNcblx0XHRcdFx0b3B0X2xlbmIgPSAodGhhdC5vcHRfbGVuICsgMyArIDcpID4+PiAzO1xuXHRcdFx0XHRzdGF0aWNfbGVuYiA9ICh0aGF0LnN0YXRpY19sZW4gKyAzICsgNykgPj4+IDM7XG5cblx0XHRcdFx0aWYgKHN0YXRpY19sZW5iIDw9IG9wdF9sZW5iKVxuXHRcdFx0XHRcdG9wdF9sZW5iID0gc3RhdGljX2xlbmI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvcHRfbGVuYiA9IHN0YXRpY19sZW5iID0gc3RvcmVkX2xlbiArIDU7IC8vIGZvcmNlIGEgc3RvcmVkIGJsb2NrXG5cdFx0XHR9XG5cblx0XHRcdGlmICgoc3RvcmVkX2xlbiArIDQgPD0gb3B0X2xlbmIpICYmIGJ1ZiAhPSAtMSkge1xuXHRcdFx0XHQvLyA0OiB0d28gd29yZHMgZm9yIHRoZSBsZW5ndGhzXG5cdFx0XHRcdC8vIFRoZSB0ZXN0IGJ1ZiAhPSBOVUxMIGlzIG9ubHkgbmVjZXNzYXJ5IGlmIExJVF9CVUZTSVpFID4gV1NJWkUuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSB3ZSBjYW4ndCBoYXZlIHByb2Nlc3NlZCBtb3JlIHRoYW4gV1NJWkUgaW5wdXQgYnl0ZXNcblx0XHRcdFx0Ly8gc2luY2Vcblx0XHRcdFx0Ly8gdGhlIGxhc3QgYmxvY2sgZmx1c2gsIGJlY2F1c2UgY29tcHJlc3Npb24gd291bGQgaGF2ZSBiZWVuXG5cdFx0XHRcdC8vIHN1Y2Nlc3NmdWwuIElmIExJVF9CVUZTSVpFIDw9IFdTSVpFLCBpdCBpcyBuZXZlciB0b28gbGF0ZSB0b1xuXHRcdFx0XHQvLyB0cmFuc2Zvcm0gYSBibG9jayBpbnRvIGEgc3RvcmVkIGJsb2NrLlxuXHRcdFx0XHRfdHJfc3RvcmVkX2Jsb2NrKGJ1Ziwgc3RvcmVkX2xlbiwgZW9mKTtcblx0XHRcdH0gZWxzZSBpZiAoc3RhdGljX2xlbmIgPT0gb3B0X2xlbmIpIHtcblx0XHRcdFx0c2VuZF9iaXRzKChTVEFUSUNfVFJFRVMgPDwgMSkgKyAoZW9mID8gMSA6IDApLCAzKTtcblx0XHRcdFx0Y29tcHJlc3NfYmxvY2soU3RhdGljVHJlZS5zdGF0aWNfbHRyZWUsIFN0YXRpY1RyZWUuc3RhdGljX2R0cmVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbmRfYml0cygoRFlOX1RSRUVTIDw8IDEpICsgKGVvZiA/IDEgOiAwKSwgMyk7XG5cdFx0XHRcdHNlbmRfYWxsX3RyZWVzKGxfZGVzYy5tYXhfY29kZSArIDEsIGRfZGVzYy5tYXhfY29kZSArIDEsIG1heF9ibGluZGV4ICsgMSk7XG5cdFx0XHRcdGNvbXByZXNzX2Jsb2NrKGR5bl9sdHJlZSwgZHluX2R0cmVlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVGhlIGFib3ZlIGNoZWNrIGlzIG1hZGUgbW9kIDJeMzIsIGZvciBmaWxlcyBsYXJnZXIgdGhhbiA1MTIgTUJcblx0XHRcdC8vIGFuZCB1TG9uZyBpbXBsZW1lbnRlZCBvbiAzMiBiaXRzLlxuXG5cdFx0XHRpbml0X2Jsb2NrKCk7XG5cblx0XHRcdGlmIChlb2YpIHtcblx0XHRcdFx0Ymlfd2luZHVwKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZmx1c2hfYmxvY2tfb25seShlb2YpIHtcblx0XHRcdF90cl9mbHVzaF9ibG9jayhibG9ja19zdGFydCA+PSAwID8gYmxvY2tfc3RhcnQgOiAtMSwgc3Ryc3RhcnQgLSBibG9ja19zdGFydCwgZW9mKTtcblx0XHRcdGJsb2NrX3N0YXJ0ID0gc3Ryc3RhcnQ7XG5cdFx0XHRzdHJtLmZsdXNoX3BlbmRpbmcoKTtcblx0XHR9XG5cblx0XHQvLyBGaWxsIHRoZSB3aW5kb3cgd2hlbiB0aGUgbG9va2FoZWFkIGJlY29tZXMgaW5zdWZmaWNpZW50LlxuXHRcdC8vIFVwZGF0ZXMgc3Ryc3RhcnQgYW5kIGxvb2thaGVhZC5cblx0XHQvL1xuXHRcdC8vIElOIGFzc2VydGlvbjogbG9va2FoZWFkIDwgTUlOX0xPT0tBSEVBRFxuXHRcdC8vIE9VVCBhc3NlcnRpb25zOiBzdHJzdGFydCA8PSB3aW5kb3dfc2l6ZS1NSU5fTE9PS0FIRUFEXG5cdFx0Ly8gQXQgbGVhc3Qgb25lIGJ5dGUgaGFzIGJlZW4gcmVhZCwgb3IgYXZhaWxfaW4gPT09IDA7IHJlYWRzIGFyZVxuXHRcdC8vIHBlcmZvcm1lZCBmb3IgYXQgbGVhc3QgdHdvIGJ5dGVzIChyZXF1aXJlZCBmb3IgdGhlIHppcCB0cmFuc2xhdGVfZW9sXG5cdFx0Ly8gb3B0aW9uIC0tIG5vdCBzdXBwb3J0ZWQgaGVyZSkuXG5cdFx0ZnVuY3Rpb24gZmlsbF93aW5kb3coKSB7XG5cdFx0XHR2YXIgbiwgbTtcblx0XHRcdHZhciBwO1xuXHRcdFx0dmFyIG1vcmU7IC8vIEFtb3VudCBvZiBmcmVlIHNwYWNlIGF0IHRoZSBlbmQgb2YgdGhlIHdpbmRvdy5cblxuXHRcdFx0ZG8ge1xuXHRcdFx0XHRtb3JlID0gKHdpbmRvd19zaXplIC0gbG9va2FoZWFkIC0gc3Ryc3RhcnQpO1xuXG5cdFx0XHRcdC8vIERlYWwgd2l0aCAhQCMkJSA2NEsgbGltaXQ6XG5cdFx0XHRcdGlmIChtb3JlID09PSAwICYmIHN0cnN0YXJ0ID09PSAwICYmIGxvb2thaGVhZCA9PT0gMCkge1xuXHRcdFx0XHRcdG1vcmUgPSB3X3NpemU7XG5cdFx0XHRcdH0gZWxzZSBpZiAobW9yZSA9PSAtMSkge1xuXHRcdFx0XHRcdC8vIFZlcnkgdW5saWtlbHksIGJ1dCBwb3NzaWJsZSBvbiAxNiBiaXQgbWFjaGluZSBpZiBzdHJzdGFydCA9PVxuXHRcdFx0XHRcdC8vIDBcblx0XHRcdFx0XHQvLyBhbmQgbG9va2FoZWFkID09IDEgKGlucHV0IGRvbmUgb25lIGJ5dGUgYXQgdGltZSlcblx0XHRcdFx0XHRtb3JlLS07XG5cblx0XHRcdFx0XHQvLyBJZiB0aGUgd2luZG93IGlzIGFsbW9zdCBmdWxsIGFuZCB0aGVyZSBpcyBpbnN1ZmZpY2llbnRcblx0XHRcdFx0XHQvLyBsb29rYWhlYWQsXG5cdFx0XHRcdFx0Ly8gbW92ZSB0aGUgdXBwZXIgaGFsZiB0byB0aGUgbG93ZXIgb25lIHRvIG1ha2Ugcm9vbSBpbiB0aGVcblx0XHRcdFx0XHQvLyB1cHBlciBoYWxmLlxuXHRcdFx0XHR9IGVsc2UgaWYgKHN0cnN0YXJ0ID49IHdfc2l6ZSArIHdfc2l6ZSAtIE1JTl9MT09LQUhFQUQpIHtcblx0XHRcdFx0XHR3aW5kb3cuc2V0KHdpbmRvdy5zdWJhcnJheSh3X3NpemUsIHdfc2l6ZSArIHdfc2l6ZSksIDApO1xuXG5cdFx0XHRcdFx0bWF0Y2hfc3RhcnQgLT0gd19zaXplO1xuXHRcdFx0XHRcdHN0cnN0YXJ0IC09IHdfc2l6ZTsgLy8gd2Ugbm93IGhhdmUgc3Ryc3RhcnQgPj0gTUFYX0RJU1Rcblx0XHRcdFx0XHRibG9ja19zdGFydCAtPSB3X3NpemU7XG5cblx0XHRcdFx0XHQvLyBTbGlkZSB0aGUgaGFzaCB0YWJsZSAoY291bGQgYmUgYXZvaWRlZCB3aXRoIDMyIGJpdCB2YWx1ZXNcblx0XHRcdFx0XHQvLyBhdCB0aGUgZXhwZW5zZSBvZiBtZW1vcnkgdXNhZ2UpLiBXZSBzbGlkZSBldmVuIHdoZW4gbGV2ZWwgPT1cblx0XHRcdFx0XHQvLyAwXG5cdFx0XHRcdFx0Ly8gdG8ga2VlcCB0aGUgaGFzaCB0YWJsZSBjb25zaXN0ZW50IGlmIHdlIHN3aXRjaCBiYWNrIHRvIGxldmVsXG5cdFx0XHRcdFx0Ly8gPiAwXG5cdFx0XHRcdFx0Ly8gbGF0ZXIuIChVc2luZyBsZXZlbCAwIHBlcm1hbmVudGx5IGlzIG5vdCBhbiBvcHRpbWFsIHVzYWdlIG9mXG5cdFx0XHRcdFx0Ly8gemxpYiwgc28gd2UgZG9uJ3QgY2FyZSBhYm91dCB0aGlzIHBhdGhvbG9naWNhbCBjYXNlLilcblxuXHRcdFx0XHRcdG4gPSBoYXNoX3NpemU7XG5cdFx0XHRcdFx0cCA9IG47XG5cdFx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdFx0bSA9IChoZWFkWy0tcF0gJiAweGZmZmYpO1xuXHRcdFx0XHRcdFx0aGVhZFtwXSA9IChtID49IHdfc2l6ZSA/IG0gLSB3X3NpemUgOiAwKTtcblx0XHRcdFx0XHR9IHdoaWxlICgtLW4gIT09IDApO1xuXG5cdFx0XHRcdFx0biA9IHdfc2l6ZTtcblx0XHRcdFx0XHRwID0gbjtcblx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHRtID0gKHByZXZbLS1wXSAmIDB4ZmZmZik7XG5cdFx0XHRcdFx0XHRwcmV2W3BdID0gKG0gPj0gd19zaXplID8gbSAtIHdfc2l6ZSA6IDApO1xuXHRcdFx0XHRcdFx0Ly8gSWYgbiBpcyBub3Qgb24gYW55IGhhc2ggY2hhaW4sIHByZXZbbl0gaXMgZ2FyYmFnZSBidXRcblx0XHRcdFx0XHRcdC8vIGl0cyB2YWx1ZSB3aWxsIG5ldmVyIGJlIHVzZWQuXG5cdFx0XHRcdFx0fSB3aGlsZSAoLS1uICE9PSAwKTtcblx0XHRcdFx0XHRtb3JlICs9IHdfc2l6ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzdHJtLmF2YWlsX2luID09PSAwKVxuXHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHQvLyBJZiB0aGVyZSB3YXMgbm8gc2xpZGluZzpcblx0XHRcdFx0Ly8gc3Ryc3RhcnQgPD0gV1NJWkUrTUFYX0RJU1QtMSAmJiBsb29rYWhlYWQgPD0gTUlOX0xPT0tBSEVBRCAtIDEgJiZcblx0XHRcdFx0Ly8gbW9yZSA9PSB3aW5kb3dfc2l6ZSAtIGxvb2thaGVhZCAtIHN0cnN0YXJ0XG5cdFx0XHRcdC8vID0+IG1vcmUgPj0gd2luZG93X3NpemUgLSAoTUlOX0xPT0tBSEVBRC0xICsgV1NJWkUgKyBNQVhfRElTVC0xKVxuXHRcdFx0XHQvLyA9PiBtb3JlID49IHdpbmRvd19zaXplIC0gMipXU0laRSArIDJcblx0XHRcdFx0Ly8gSW4gdGhlIEJJR19NRU0gb3IgTU1BUCBjYXNlIChub3QgeWV0IHN1cHBvcnRlZCksXG5cdFx0XHRcdC8vIHdpbmRvd19zaXplID09IGlucHV0X3NpemUgKyBNSU5fTE9PS0FIRUFEICYmXG5cdFx0XHRcdC8vIHN0cnN0YXJ0ICsgcy0+bG9va2FoZWFkIDw9IGlucHV0X3NpemUgPT4gbW9yZSA+PSBNSU5fTE9PS0FIRUFELlxuXHRcdFx0XHQvLyBPdGhlcndpc2UsIHdpbmRvd19zaXplID09IDIqV1NJWkUgc28gbW9yZSA+PSAyLlxuXHRcdFx0XHQvLyBJZiB0aGVyZSB3YXMgc2xpZGluZywgbW9yZSA+PSBXU0laRS4gU28gaW4gYWxsIGNhc2VzLCBtb3JlID49IDIuXG5cblx0XHRcdFx0biA9IHN0cm0ucmVhZF9idWYod2luZG93LCBzdHJzdGFydCArIGxvb2thaGVhZCwgbW9yZSk7XG5cdFx0XHRcdGxvb2thaGVhZCArPSBuO1xuXG5cdFx0XHRcdC8vIEluaXRpYWxpemUgdGhlIGhhc2ggdmFsdWUgbm93IHRoYXQgd2UgaGF2ZSBzb21lIGlucHV0OlxuXHRcdFx0XHRpZiAobG9va2FoZWFkID49IE1JTl9NQVRDSCkge1xuXHRcdFx0XHRcdGluc19oID0gd2luZG93W3N0cnN0YXJ0XSAmIDB4ZmY7XG5cdFx0XHRcdFx0aW5zX2ggPSAoKChpbnNfaCkgPDwgaGFzaF9zaGlmdCkgXiAod2luZG93W3N0cnN0YXJ0ICsgMV0gJiAweGZmKSkgJiBoYXNoX21hc2s7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gSWYgdGhlIHdob2xlIGlucHV0IGhhcyBsZXNzIHRoYW4gTUlOX01BVENIIGJ5dGVzLCBpbnNfaCBpc1xuXHRcdFx0XHQvLyBnYXJiYWdlLFxuXHRcdFx0XHQvLyBidXQgdGhpcyBpcyBub3QgaW1wb3J0YW50IHNpbmNlIG9ubHkgbGl0ZXJhbCBieXRlcyB3aWxsIGJlXG5cdFx0XHRcdC8vIGVtaXR0ZWQuXG5cdFx0XHR9IHdoaWxlIChsb29rYWhlYWQgPCBNSU5fTE9PS0FIRUFEICYmIHN0cm0uYXZhaWxfaW4gIT09IDApO1xuXHRcdH1cblxuXHRcdC8vIENvcHkgd2l0aG91dCBjb21wcmVzc2lvbiBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gdGhlIGlucHV0IHN0cmVhbSxcblx0XHQvLyByZXR1cm5cblx0XHQvLyB0aGUgY3VycmVudCBibG9jayBzdGF0ZS5cblx0XHQvLyBUaGlzIGZ1bmN0aW9uIGRvZXMgbm90IGluc2VydCBuZXcgc3RyaW5ncyBpbiB0aGUgZGljdGlvbmFyeSBzaW5jZVxuXHRcdC8vIHVuY29tcHJlc3NpYmxlIGRhdGEgaXMgcHJvYmFibHkgbm90IHVzZWZ1bC4gVGhpcyBmdW5jdGlvbiBpcyB1c2VkXG5cdFx0Ly8gb25seSBmb3IgdGhlIGxldmVsPTAgY29tcHJlc3Npb24gb3B0aW9uLlxuXHRcdC8vIE5PVEU6IHRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIG9wdGltaXplZCB0byBhdm9pZCBleHRyYSBjb3B5aW5nIGZyb21cblx0XHQvLyB3aW5kb3cgdG8gcGVuZGluZ19idWYuXG5cdFx0ZnVuY3Rpb24gZGVmbGF0ZV9zdG9yZWQoZmx1c2gpIHtcblx0XHRcdC8vIFN0b3JlZCBibG9ja3MgYXJlIGxpbWl0ZWQgdG8gMHhmZmZmIGJ5dGVzLCBwZW5kaW5nX2J1ZiBpcyBsaW1pdGVkXG5cdFx0XHQvLyB0byBwZW5kaW5nX2J1Zl9zaXplLCBhbmQgZWFjaCBzdG9yZWQgYmxvY2sgaGFzIGEgNSBieXRlIGhlYWRlcjpcblxuXHRcdFx0dmFyIG1heF9ibG9ja19zaXplID0gMHhmZmZmO1xuXHRcdFx0dmFyIG1heF9zdGFydDtcblxuXHRcdFx0aWYgKG1heF9ibG9ja19zaXplID4gcGVuZGluZ19idWZfc2l6ZSAtIDUpIHtcblx0XHRcdFx0bWF4X2Jsb2NrX3NpemUgPSBwZW5kaW5nX2J1Zl9zaXplIC0gNTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29weSBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gaW5wdXQgdG8gb3V0cHV0OlxuXHRcdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdFx0Ly8gRmlsbCB0aGUgd2luZG93IGFzIG11Y2ggYXMgcG9zc2libGU6XG5cdFx0XHRcdGlmIChsb29rYWhlYWQgPD0gMSkge1xuXHRcdFx0XHRcdGZpbGxfd2luZG93KCk7XG5cdFx0XHRcdFx0aWYgKGxvb2thaGVhZCA9PT0gMCAmJiBmbHVzaCA9PSBaX05PX0ZMVVNIKVxuXHRcdFx0XHRcdFx0cmV0dXJuIE5lZWRNb3JlO1xuXHRcdFx0XHRcdGlmIChsb29rYWhlYWQgPT09IDApXG5cdFx0XHRcdFx0XHRicmVhazsgLy8gZmx1c2ggdGhlIGN1cnJlbnQgYmxvY2tcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHN0cnN0YXJ0ICs9IGxvb2thaGVhZDtcblx0XHRcdFx0bG9va2FoZWFkID0gMDtcblxuXHRcdFx0XHQvLyBFbWl0IGEgc3RvcmVkIGJsb2NrIGlmIHBlbmRpbmdfYnVmIHdpbGwgYmUgZnVsbDpcblx0XHRcdFx0bWF4X3N0YXJ0ID0gYmxvY2tfc3RhcnQgKyBtYXhfYmxvY2tfc2l6ZTtcblx0XHRcdFx0aWYgKHN0cnN0YXJ0ID09PSAwIHx8IHN0cnN0YXJ0ID49IG1heF9zdGFydCkge1xuXHRcdFx0XHRcdC8vIHN0cnN0YXJ0ID09PSAwIGlzIHBvc3NpYmxlIHdoZW4gd3JhcGFyb3VuZCBvbiAxNi1iaXQgbWFjaGluZVxuXHRcdFx0XHRcdGxvb2thaGVhZCA9IChzdHJzdGFydCAtIG1heF9zdGFydCk7XG5cdFx0XHRcdFx0c3Ryc3RhcnQgPSBtYXhfc3RhcnQ7XG5cblx0XHRcdFx0XHRmbHVzaF9ibG9ja19vbmx5KGZhbHNlKTtcblx0XHRcdFx0XHRpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApXG5cdFx0XHRcdFx0XHRyZXR1cm4gTmVlZE1vcmU7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZsdXNoIGlmIHdlIG1heSBoYXZlIHRvIHNsaWRlLCBvdGhlcndpc2UgYmxvY2tfc3RhcnQgbWF5IGJlY29tZVxuXHRcdFx0XHQvLyBuZWdhdGl2ZSBhbmQgdGhlIGRhdGEgd2lsbCBiZSBnb25lOlxuXHRcdFx0XHRpZiAoc3Ryc3RhcnQgLSBibG9ja19zdGFydCA+PSB3X3NpemUgLSBNSU5fTE9PS0FIRUFEKSB7XG5cdFx0XHRcdFx0Zmx1c2hfYmxvY2tfb25seShmYWxzZSk7XG5cdFx0XHRcdFx0aWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKVxuXHRcdFx0XHRcdFx0cmV0dXJuIE5lZWRNb3JlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZsdXNoX2Jsb2NrX29ubHkoZmx1c2ggPT0gWl9GSU5JU0gpO1xuXHRcdFx0aWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKVxuXHRcdFx0XHRyZXR1cm4gKGZsdXNoID09IFpfRklOSVNIKSA/IEZpbmlzaFN0YXJ0ZWQgOiBOZWVkTW9yZTtcblxuXHRcdFx0cmV0dXJuIGZsdXNoID09IFpfRklOSVNIID8gRmluaXNoRG9uZSA6IEJsb2NrRG9uZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBsb25nZXN0X21hdGNoKGN1cl9tYXRjaCkge1xuXHRcdFx0dmFyIGNoYWluX2xlbmd0aCA9IG1heF9jaGFpbl9sZW5ndGg7IC8vIG1heCBoYXNoIGNoYWluIGxlbmd0aFxuXHRcdFx0dmFyIHNjYW4gPSBzdHJzdGFydDsgLy8gY3VycmVudCBzdHJpbmdcblx0XHRcdHZhciBtYXRjaDsgLy8gbWF0Y2hlZCBzdHJpbmdcblx0XHRcdHZhciBsZW47IC8vIGxlbmd0aCBvZiBjdXJyZW50IG1hdGNoXG5cdFx0XHR2YXIgYmVzdF9sZW4gPSBwcmV2X2xlbmd0aDsgLy8gYmVzdCBtYXRjaCBsZW5ndGggc28gZmFyXG5cdFx0XHR2YXIgbGltaXQgPSBzdHJzdGFydCA+ICh3X3NpemUgLSBNSU5fTE9PS0FIRUFEKSA/IHN0cnN0YXJ0IC0gKHdfc2l6ZSAtIE1JTl9MT09LQUhFQUQpIDogMDtcblx0XHRcdHZhciBfbmljZV9tYXRjaCA9IG5pY2VfbWF0Y2g7XG5cblx0XHRcdC8vIFN0b3Agd2hlbiBjdXJfbWF0Y2ggYmVjb21lcyA8PSBsaW1pdC4gVG8gc2ltcGxpZnkgdGhlIGNvZGUsXG5cdFx0XHQvLyB3ZSBwcmV2ZW50IG1hdGNoZXMgd2l0aCB0aGUgc3RyaW5nIG9mIHdpbmRvdyBpbmRleCAwLlxuXG5cdFx0XHR2YXIgd21hc2sgPSB3X21hc2s7XG5cblx0XHRcdHZhciBzdHJlbmQgPSBzdHJzdGFydCArIE1BWF9NQVRDSDtcblx0XHRcdHZhciBzY2FuX2VuZDEgPSB3aW5kb3dbc2NhbiArIGJlc3RfbGVuIC0gMV07XG5cdFx0XHR2YXIgc2Nhbl9lbmQgPSB3aW5kb3dbc2NhbiArIGJlc3RfbGVuXTtcblxuXHRcdFx0Ly8gVGhlIGNvZGUgaXMgb3B0aW1pemVkIGZvciBIQVNIX0JJVFMgPj0gOCBhbmQgTUFYX01BVENILTIgbXVsdGlwbGUgb2Zcblx0XHRcdC8vIDE2LlxuXHRcdFx0Ly8gSXQgaXMgZWFzeSB0byBnZXQgcmlkIG9mIHRoaXMgb3B0aW1pemF0aW9uIGlmIG5lY2Vzc2FyeS5cblxuXHRcdFx0Ly8gRG8gbm90IHdhc3RlIHRvbyBtdWNoIHRpbWUgaWYgd2UgYWxyZWFkeSBoYXZlIGEgZ29vZCBtYXRjaDpcblx0XHRcdGlmIChwcmV2X2xlbmd0aCA+PSBnb29kX21hdGNoKSB7XG5cdFx0XHRcdGNoYWluX2xlbmd0aCA+Pj0gMjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRG8gbm90IGxvb2sgZm9yIG1hdGNoZXMgYmV5b25kIHRoZSBlbmQgb2YgdGhlIGlucHV0LiBUaGlzIGlzXG5cdFx0XHQvLyBuZWNlc3Nhcnlcblx0XHRcdC8vIHRvIG1ha2UgZGVmbGF0ZSBkZXRlcm1pbmlzdGljLlxuXHRcdFx0aWYgKF9uaWNlX21hdGNoID4gbG9va2FoZWFkKVxuXHRcdFx0XHRfbmljZV9tYXRjaCA9IGxvb2thaGVhZDtcblxuXHRcdFx0ZG8ge1xuXHRcdFx0XHRtYXRjaCA9IGN1cl9tYXRjaDtcblxuXHRcdFx0XHQvLyBTa2lwIHRvIG5leHQgbWF0Y2ggaWYgdGhlIG1hdGNoIGxlbmd0aCBjYW5ub3QgaW5jcmVhc2Vcblx0XHRcdFx0Ly8gb3IgaWYgdGhlIG1hdGNoIGxlbmd0aCBpcyBsZXNzIHRoYW4gMjpcblx0XHRcdFx0aWYgKHdpbmRvd1ttYXRjaCArIGJlc3RfbGVuXSAhPSBzY2FuX2VuZCB8fCB3aW5kb3dbbWF0Y2ggKyBiZXN0X2xlbiAtIDFdICE9IHNjYW5fZW5kMSB8fCB3aW5kb3dbbWF0Y2hdICE9IHdpbmRvd1tzY2FuXVxuXHRcdFx0XHRcdFx0fHwgd2luZG93WysrbWF0Y2hdICE9IHdpbmRvd1tzY2FuICsgMV0pXG5cdFx0XHRcdFx0Y29udGludWU7XG5cblx0XHRcdFx0Ly8gVGhlIGNoZWNrIGF0IGJlc3RfbGVuLTEgY2FuIGJlIHJlbW92ZWQgYmVjYXVzZSBpdCB3aWxsIGJlIG1hZGVcblx0XHRcdFx0Ly8gYWdhaW4gbGF0ZXIuIChUaGlzIGhldXJpc3RpYyBpcyBub3QgYWx3YXlzIGEgd2luLilcblx0XHRcdFx0Ly8gSXQgaXMgbm90IG5lY2Vzc2FyeSB0byBjb21wYXJlIHNjYW5bMl0gYW5kIG1hdGNoWzJdIHNpbmNlIHRoZXlcblx0XHRcdFx0Ly8gYXJlIGFsd2F5cyBlcXVhbCB3aGVuIHRoZSBvdGhlciBieXRlcyBtYXRjaCwgZ2l2ZW4gdGhhdFxuXHRcdFx0XHQvLyB0aGUgaGFzaCBrZXlzIGFyZSBlcXVhbCBhbmQgdGhhdCBIQVNIX0JJVFMgPj0gOC5cblx0XHRcdFx0c2NhbiArPSAyO1xuXHRcdFx0XHRtYXRjaCsrO1xuXG5cdFx0XHRcdC8vIFdlIGNoZWNrIGZvciBpbnN1ZmZpY2llbnQgbG9va2FoZWFkIG9ubHkgZXZlcnkgOHRoIGNvbXBhcmlzb247XG5cdFx0XHRcdC8vIHRoZSAyNTZ0aCBjaGVjayB3aWxsIGJlIG1hZGUgYXQgc3Ryc3RhcnQrMjU4LlxuXHRcdFx0XHRkbyB7XG5cdFx0XHRcdH0gd2hpbGUgKHdpbmRvd1srK3NjYW5dID09IHdpbmRvd1srK21hdGNoXSAmJiB3aW5kb3dbKytzY2FuXSA9PSB3aW5kb3dbKyttYXRjaF0gJiYgd2luZG93Wysrc2Nhbl0gPT0gd2luZG93WysrbWF0Y2hdXG5cdFx0XHRcdFx0XHQmJiB3aW5kb3dbKytzY2FuXSA9PSB3aW5kb3dbKyttYXRjaF0gJiYgd2luZG93Wysrc2Nhbl0gPT0gd2luZG93WysrbWF0Y2hdICYmIHdpbmRvd1srK3NjYW5dID09IHdpbmRvd1srK21hdGNoXVxuXHRcdFx0XHRcdFx0JiYgd2luZG93Wysrc2Nhbl0gPT0gd2luZG93WysrbWF0Y2hdICYmIHdpbmRvd1srK3NjYW5dID09IHdpbmRvd1srK21hdGNoXSAmJiBzY2FuIDwgc3RyZW5kKTtcblxuXHRcdFx0XHRsZW4gPSBNQVhfTUFUQ0ggLSAoc3RyZW5kIC0gc2Nhbik7XG5cdFx0XHRcdHNjYW4gPSBzdHJlbmQgLSBNQVhfTUFUQ0g7XG5cblx0XHRcdFx0aWYgKGxlbiA+IGJlc3RfbGVuKSB7XG5cdFx0XHRcdFx0bWF0Y2hfc3RhcnQgPSBjdXJfbWF0Y2g7XG5cdFx0XHRcdFx0YmVzdF9sZW4gPSBsZW47XG5cdFx0XHRcdFx0aWYgKGxlbiA+PSBfbmljZV9tYXRjaClcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdHNjYW5fZW5kMSA9IHdpbmRvd1tzY2FuICsgYmVzdF9sZW4gLSAxXTtcblx0XHRcdFx0XHRzY2FuX2VuZCA9IHdpbmRvd1tzY2FuICsgYmVzdF9sZW5dO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gd2hpbGUgKChjdXJfbWF0Y2ggPSAocHJldltjdXJfbWF0Y2ggJiB3bWFza10gJiAweGZmZmYpKSA+IGxpbWl0ICYmIC0tY2hhaW5fbGVuZ3RoICE9PSAwKTtcblxuXHRcdFx0aWYgKGJlc3RfbGVuIDw9IGxvb2thaGVhZClcblx0XHRcdFx0cmV0dXJuIGJlc3RfbGVuO1xuXHRcdFx0cmV0dXJuIGxvb2thaGVhZDtcblx0XHR9XG5cblx0XHQvLyBDb21wcmVzcyBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gdGhlIGlucHV0IHN0cmVhbSwgcmV0dXJuIHRoZSBjdXJyZW50XG5cdFx0Ly8gYmxvY2sgc3RhdGUuXG5cdFx0Ly8gVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBwZXJmb3JtIGxhenkgZXZhbHVhdGlvbiBvZiBtYXRjaGVzIGFuZCBpbnNlcnRzXG5cdFx0Ly8gbmV3IHN0cmluZ3MgaW4gdGhlIGRpY3Rpb25hcnkgb25seSBmb3IgdW5tYXRjaGVkIHN0cmluZ3Mgb3IgZm9yIHNob3J0XG5cdFx0Ly8gbWF0Y2hlcy4gSXQgaXMgdXNlZCBvbmx5IGZvciB0aGUgZmFzdCBjb21wcmVzc2lvbiBvcHRpb25zLlxuXHRcdGZ1bmN0aW9uIGRlZmxhdGVfZmFzdChmbHVzaCkge1xuXHRcdFx0Ly8gc2hvcnQgaGFzaF9oZWFkID0gMDsgLy8gaGVhZCBvZiB0aGUgaGFzaCBjaGFpblxuXHRcdFx0dmFyIGhhc2hfaGVhZCA9IDA7IC8vIGhlYWQgb2YgdGhlIGhhc2ggY2hhaW5cblx0XHRcdHZhciBiZmx1c2g7IC8vIHNldCBpZiBjdXJyZW50IGJsb2NrIG11c3QgYmUgZmx1c2hlZFxuXG5cdFx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSBhbHdheXMgaGF2ZSBlbm91Z2ggbG9va2FoZWFkLCBleGNlcHRcblx0XHRcdFx0Ly8gYXQgdGhlIGVuZCBvZiB0aGUgaW5wdXQgZmlsZS4gV2UgbmVlZCBNQVhfTUFUQ0ggYnl0ZXNcblx0XHRcdFx0Ly8gZm9yIHRoZSBuZXh0IG1hdGNoLCBwbHVzIE1JTl9NQVRDSCBieXRlcyB0byBpbnNlcnQgdGhlXG5cdFx0XHRcdC8vIHN0cmluZyBmb2xsb3dpbmcgdGhlIG5leHQgbWF0Y2guXG5cdFx0XHRcdGlmIChsb29rYWhlYWQgPCBNSU5fTE9PS0FIRUFEKSB7XG5cdFx0XHRcdFx0ZmlsbF93aW5kb3coKTtcblx0XHRcdFx0XHRpZiAobG9va2FoZWFkIDwgTUlOX0xPT0tBSEVBRCAmJiBmbHVzaCA9PSBaX05PX0ZMVVNIKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTmVlZE1vcmU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChsb29rYWhlYWQgPT09IDApXG5cdFx0XHRcdFx0XHRicmVhazsgLy8gZmx1c2ggdGhlIGN1cnJlbnQgYmxvY2tcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEluc2VydCB0aGUgc3RyaW5nIHdpbmRvd1tzdHJzdGFydCAuLiBzdHJzdGFydCsyXSBpbiB0aGVcblx0XHRcdFx0Ly8gZGljdGlvbmFyeSwgYW5kIHNldCBoYXNoX2hlYWQgdG8gdGhlIGhlYWQgb2YgdGhlIGhhc2ggY2hhaW46XG5cdFx0XHRcdGlmIChsb29rYWhlYWQgPj0gTUlOX01BVENIKSB7XG5cdFx0XHRcdFx0aW5zX2ggPSAoKChpbnNfaCkgPDwgaGFzaF9zaGlmdCkgXiAod2luZG93WyhzdHJzdGFydCkgKyAoTUlOX01BVENIIC0gMSldICYgMHhmZikpICYgaGFzaF9tYXNrO1xuXG5cdFx0XHRcdFx0Ly8gcHJldltzdHJzdGFydCZ3X21hc2tdPWhhc2hfaGVhZD1oZWFkW2luc19oXTtcblx0XHRcdFx0XHRoYXNoX2hlYWQgPSAoaGVhZFtpbnNfaF0gJiAweGZmZmYpO1xuXHRcdFx0XHRcdHByZXZbc3Ryc3RhcnQgJiB3X21hc2tdID0gaGVhZFtpbnNfaF07XG5cdFx0XHRcdFx0aGVhZFtpbnNfaF0gPSBzdHJzdGFydDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZpbmQgdGhlIGxvbmdlc3QgbWF0Y2gsIGRpc2NhcmRpbmcgdGhvc2UgPD0gcHJldl9sZW5ndGguXG5cdFx0XHRcdC8vIEF0IHRoaXMgcG9pbnQgd2UgaGF2ZSBhbHdheXMgbWF0Y2hfbGVuZ3RoIDwgTUlOX01BVENIXG5cblx0XHRcdFx0aWYgKGhhc2hfaGVhZCAhPT0gMCAmJiAoKHN0cnN0YXJ0IC0gaGFzaF9oZWFkKSAmIDB4ZmZmZikgPD0gd19zaXplIC0gTUlOX0xPT0tBSEVBRCkge1xuXHRcdFx0XHRcdC8vIFRvIHNpbXBsaWZ5IHRoZSBjb2RlLCB3ZSBwcmV2ZW50IG1hdGNoZXMgd2l0aCB0aGUgc3RyaW5nXG5cdFx0XHRcdFx0Ly8gb2Ygd2luZG93IGluZGV4IDAgKGluIHBhcnRpY3VsYXIgd2UgaGF2ZSB0byBhdm9pZCBhIG1hdGNoXG5cdFx0XHRcdFx0Ly8gb2YgdGhlIHN0cmluZyB3aXRoIGl0c2VsZiBhdCB0aGUgc3RhcnQgb2YgdGhlIGlucHV0IGZpbGUpLlxuXHRcdFx0XHRcdGlmIChzdHJhdGVneSAhPSBaX0hVRkZNQU5fT05MWSkge1xuXHRcdFx0XHRcdFx0bWF0Y2hfbGVuZ3RoID0gbG9uZ2VzdF9tYXRjaChoYXNoX2hlYWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBsb25nZXN0X21hdGNoKCkgc2V0cyBtYXRjaF9zdGFydFxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChtYXRjaF9sZW5ndGggPj0gTUlOX01BVENIKSB7XG5cdFx0XHRcdFx0Ly8gY2hlY2tfbWF0Y2goc3Ryc3RhcnQsIG1hdGNoX3N0YXJ0LCBtYXRjaF9sZW5ndGgpO1xuXG5cdFx0XHRcdFx0YmZsdXNoID0gX3RyX3RhbGx5KHN0cnN0YXJ0IC0gbWF0Y2hfc3RhcnQsIG1hdGNoX2xlbmd0aCAtIE1JTl9NQVRDSCk7XG5cblx0XHRcdFx0XHRsb29rYWhlYWQgLT0gbWF0Y2hfbGVuZ3RoO1xuXG5cdFx0XHRcdFx0Ly8gSW5zZXJ0IG5ldyBzdHJpbmdzIGluIHRoZSBoYXNoIHRhYmxlIG9ubHkgaWYgdGhlIG1hdGNoIGxlbmd0aFxuXHRcdFx0XHRcdC8vIGlzIG5vdCB0b28gbGFyZ2UuIFRoaXMgc2F2ZXMgdGltZSBidXQgZGVncmFkZXMgY29tcHJlc3Npb24uXG5cdFx0XHRcdFx0aWYgKG1hdGNoX2xlbmd0aCA8PSBtYXhfbGF6eV9tYXRjaCAmJiBsb29rYWhlYWQgPj0gTUlOX01BVENIKSB7XG5cdFx0XHRcdFx0XHRtYXRjaF9sZW5ndGgtLTsgLy8gc3RyaW5nIGF0IHN0cnN0YXJ0IGFscmVhZHkgaW4gaGFzaCB0YWJsZVxuXHRcdFx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdFx0XHRzdHJzdGFydCsrO1xuXG5cdFx0XHRcdFx0XHRcdGluc19oID0gKChpbnNfaCA8PCBoYXNoX3NoaWZ0KSBeICh3aW5kb3dbKHN0cnN0YXJ0KSArIChNSU5fTUFUQ0ggLSAxKV0gJiAweGZmKSkgJiBoYXNoX21hc2s7XG5cdFx0XHRcdFx0XHRcdC8vIHByZXZbc3Ryc3RhcnQmd19tYXNrXT1oYXNoX2hlYWQ9aGVhZFtpbnNfaF07XG5cdFx0XHRcdFx0XHRcdGhhc2hfaGVhZCA9IChoZWFkW2luc19oXSAmIDB4ZmZmZik7XG5cdFx0XHRcdFx0XHRcdHByZXZbc3Ryc3RhcnQgJiB3X21hc2tdID0gaGVhZFtpbnNfaF07XG5cdFx0XHRcdFx0XHRcdGhlYWRbaW5zX2hdID0gc3Ryc3RhcnQ7XG5cblx0XHRcdFx0XHRcdFx0Ly8gc3Ryc3RhcnQgbmV2ZXIgZXhjZWVkcyBXU0laRS1NQVhfTUFUQ0gsIHNvIHRoZXJlIGFyZVxuXHRcdFx0XHRcdFx0XHQvLyBhbHdheXMgTUlOX01BVENIIGJ5dGVzIGFoZWFkLlxuXHRcdFx0XHRcdFx0fSB3aGlsZSAoLS1tYXRjaF9sZW5ndGggIT09IDApO1xuXHRcdFx0XHRcdFx0c3Ryc3RhcnQrKztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c3Ryc3RhcnQgKz0gbWF0Y2hfbGVuZ3RoO1xuXHRcdFx0XHRcdFx0bWF0Y2hfbGVuZ3RoID0gMDtcblx0XHRcdFx0XHRcdGluc19oID0gd2luZG93W3N0cnN0YXJ0XSAmIDB4ZmY7XG5cblx0XHRcdFx0XHRcdGluc19oID0gKCgoaW5zX2gpIDw8IGhhc2hfc2hpZnQpIF4gKHdpbmRvd1tzdHJzdGFydCArIDFdICYgMHhmZikpICYgaGFzaF9tYXNrO1xuXHRcdFx0XHRcdFx0Ly8gSWYgbG9va2FoZWFkIDwgTUlOX01BVENILCBpbnNfaCBpcyBnYXJiYWdlLCBidXQgaXQgZG9lc1xuXHRcdFx0XHRcdFx0Ly8gbm90XG5cdFx0XHRcdFx0XHQvLyBtYXR0ZXIgc2luY2UgaXQgd2lsbCBiZSByZWNvbXB1dGVkIGF0IG5leHQgZGVmbGF0ZSBjYWxsLlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBObyBtYXRjaCwgb3V0cHV0IGEgbGl0ZXJhbCBieXRlXG5cblx0XHRcdFx0XHRiZmx1c2ggPSBfdHJfdGFsbHkoMCwgd2luZG93W3N0cnN0YXJ0XSAmIDB4ZmYpO1xuXHRcdFx0XHRcdGxvb2thaGVhZC0tO1xuXHRcdFx0XHRcdHN0cnN0YXJ0Kys7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGJmbHVzaCkge1xuXG5cdFx0XHRcdFx0Zmx1c2hfYmxvY2tfb25seShmYWxzZSk7XG5cdFx0XHRcdFx0aWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKVxuXHRcdFx0XHRcdFx0cmV0dXJuIE5lZWRNb3JlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZsdXNoX2Jsb2NrX29ubHkoZmx1c2ggPT0gWl9GSU5JU0gpO1xuXHRcdFx0aWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG5cdFx0XHRcdGlmIChmbHVzaCA9PSBaX0ZJTklTSClcblx0XHRcdFx0XHRyZXR1cm4gRmluaXNoU3RhcnRlZDtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHJldHVybiBOZWVkTW9yZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmbHVzaCA9PSBaX0ZJTklTSCA/IEZpbmlzaERvbmUgOiBCbG9ja0RvbmU7XG5cdFx0fVxuXG5cdFx0Ly8gU2FtZSBhcyBhYm92ZSwgYnV0IGFjaGlldmVzIGJldHRlciBjb21wcmVzc2lvbi4gV2UgdXNlIGEgbGF6eVxuXHRcdC8vIGV2YWx1YXRpb24gZm9yIG1hdGNoZXM6IGEgbWF0Y2ggaXMgZmluYWxseSBhZG9wdGVkIG9ubHkgaWYgdGhlcmUgaXNcblx0XHQvLyBubyBiZXR0ZXIgbWF0Y2ggYXQgdGhlIG5leHQgd2luZG93IHBvc2l0aW9uLlxuXHRcdGZ1bmN0aW9uIGRlZmxhdGVfc2xvdyhmbHVzaCkge1xuXHRcdFx0Ly8gc2hvcnQgaGFzaF9oZWFkID0gMDsgLy8gaGVhZCBvZiBoYXNoIGNoYWluXG5cdFx0XHR2YXIgaGFzaF9oZWFkID0gMDsgLy8gaGVhZCBvZiBoYXNoIGNoYWluXG5cdFx0XHR2YXIgYmZsdXNoOyAvLyBzZXQgaWYgY3VycmVudCBibG9jayBtdXN0IGJlIGZsdXNoZWRcblx0XHRcdHZhciBtYXhfaW5zZXJ0O1xuXG5cdFx0XHQvLyBQcm9jZXNzIHRoZSBpbnB1dCBibG9jay5cblx0XHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlIGFsd2F5cyBoYXZlIGVub3VnaCBsb29rYWhlYWQsIGV4Y2VwdFxuXHRcdFx0XHQvLyBhdCB0aGUgZW5kIG9mIHRoZSBpbnB1dCBmaWxlLiBXZSBuZWVkIE1BWF9NQVRDSCBieXRlc1xuXHRcdFx0XHQvLyBmb3IgdGhlIG5leHQgbWF0Y2gsIHBsdXMgTUlOX01BVENIIGJ5dGVzIHRvIGluc2VydCB0aGVcblx0XHRcdFx0Ly8gc3RyaW5nIGZvbGxvd2luZyB0aGUgbmV4dCBtYXRjaC5cblxuXHRcdFx0XHRpZiAobG9va2FoZWFkIDwgTUlOX0xPT0tBSEVBRCkge1xuXHRcdFx0XHRcdGZpbGxfd2luZG93KCk7XG5cdFx0XHRcdFx0aWYgKGxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQgJiYgZmx1c2ggPT0gWl9OT19GTFVTSCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIE5lZWRNb3JlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAobG9va2FoZWFkID09PSAwKVxuXHRcdFx0XHRcdFx0YnJlYWs7IC8vIGZsdXNoIHRoZSBjdXJyZW50IGJsb2NrXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJbnNlcnQgdGhlIHN0cmluZyB3aW5kb3dbc3Ryc3RhcnQgLi4gc3Ryc3RhcnQrMl0gaW4gdGhlXG5cdFx0XHRcdC8vIGRpY3Rpb25hcnksIGFuZCBzZXQgaGFzaF9oZWFkIHRvIHRoZSBoZWFkIG9mIHRoZSBoYXNoIGNoYWluOlxuXG5cdFx0XHRcdGlmIChsb29rYWhlYWQgPj0gTUlOX01BVENIKSB7XG5cdFx0XHRcdFx0aW5zX2ggPSAoKChpbnNfaCkgPDwgaGFzaF9zaGlmdCkgXiAod2luZG93WyhzdHJzdGFydCkgKyAoTUlOX01BVENIIC0gMSldICYgMHhmZikpICYgaGFzaF9tYXNrO1xuXHRcdFx0XHRcdC8vIHByZXZbc3Ryc3RhcnQmd19tYXNrXT1oYXNoX2hlYWQ9aGVhZFtpbnNfaF07XG5cdFx0XHRcdFx0aGFzaF9oZWFkID0gKGhlYWRbaW5zX2hdICYgMHhmZmZmKTtcblx0XHRcdFx0XHRwcmV2W3N0cnN0YXJ0ICYgd19tYXNrXSA9IGhlYWRbaW5zX2hdO1xuXHRcdFx0XHRcdGhlYWRbaW5zX2hdID0gc3Ryc3RhcnQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGaW5kIHRoZSBsb25nZXN0IG1hdGNoLCBkaXNjYXJkaW5nIHRob3NlIDw9IHByZXZfbGVuZ3RoLlxuXHRcdFx0XHRwcmV2X2xlbmd0aCA9IG1hdGNoX2xlbmd0aDtcblx0XHRcdFx0cHJldl9tYXRjaCA9IG1hdGNoX3N0YXJ0O1xuXHRcdFx0XHRtYXRjaF9sZW5ndGggPSBNSU5fTUFUQ0ggLSAxO1xuXG5cdFx0XHRcdGlmIChoYXNoX2hlYWQgIT09IDAgJiYgcHJldl9sZW5ndGggPCBtYXhfbGF6eV9tYXRjaCAmJiAoKHN0cnN0YXJ0IC0gaGFzaF9oZWFkKSAmIDB4ZmZmZikgPD0gd19zaXplIC0gTUlOX0xPT0tBSEVBRCkge1xuXHRcdFx0XHRcdC8vIFRvIHNpbXBsaWZ5IHRoZSBjb2RlLCB3ZSBwcmV2ZW50IG1hdGNoZXMgd2l0aCB0aGUgc3RyaW5nXG5cdFx0XHRcdFx0Ly8gb2Ygd2luZG93IGluZGV4IDAgKGluIHBhcnRpY3VsYXIgd2UgaGF2ZSB0byBhdm9pZCBhIG1hdGNoXG5cdFx0XHRcdFx0Ly8gb2YgdGhlIHN0cmluZyB3aXRoIGl0c2VsZiBhdCB0aGUgc3RhcnQgb2YgdGhlIGlucHV0IGZpbGUpLlxuXG5cdFx0XHRcdFx0aWYgKHN0cmF0ZWd5ICE9IFpfSFVGRk1BTl9PTkxZKSB7XG5cdFx0XHRcdFx0XHRtYXRjaF9sZW5ndGggPSBsb25nZXN0X21hdGNoKGhhc2hfaGVhZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGxvbmdlc3RfbWF0Y2goKSBzZXRzIG1hdGNoX3N0YXJ0XG5cblx0XHRcdFx0XHRpZiAobWF0Y2hfbGVuZ3RoIDw9IDUgJiYgKHN0cmF0ZWd5ID09IFpfRklMVEVSRUQgfHwgKG1hdGNoX2xlbmd0aCA9PSBNSU5fTUFUQ0ggJiYgc3Ryc3RhcnQgLSBtYXRjaF9zdGFydCA+IDQwOTYpKSkge1xuXG5cdFx0XHRcdFx0XHQvLyBJZiBwcmV2X21hdGNoIGlzIGFsc28gTUlOX01BVENILCBtYXRjaF9zdGFydCBpcyBnYXJiYWdlXG5cdFx0XHRcdFx0XHQvLyBidXQgd2Ugd2lsbCBpZ25vcmUgdGhlIGN1cnJlbnQgbWF0Y2ggYW55d2F5LlxuXHRcdFx0XHRcdFx0bWF0Y2hfbGVuZ3RoID0gTUlOX01BVENIIC0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJZiB0aGVyZSB3YXMgYSBtYXRjaCBhdCB0aGUgcHJldmlvdXMgc3RlcCBhbmQgdGhlIGN1cnJlbnRcblx0XHRcdFx0Ly8gbWF0Y2ggaXMgbm90IGJldHRlciwgb3V0cHV0IHRoZSBwcmV2aW91cyBtYXRjaDpcblx0XHRcdFx0aWYgKHByZXZfbGVuZ3RoID49IE1JTl9NQVRDSCAmJiBtYXRjaF9sZW5ndGggPD0gcHJldl9sZW5ndGgpIHtcblx0XHRcdFx0XHRtYXhfaW5zZXJ0ID0gc3Ryc3RhcnQgKyBsb29rYWhlYWQgLSBNSU5fTUFUQ0g7XG5cdFx0XHRcdFx0Ly8gRG8gbm90IGluc2VydCBzdHJpbmdzIGluIGhhc2ggdGFibGUgYmV5b25kIHRoaXMuXG5cblx0XHRcdFx0XHQvLyBjaGVja19tYXRjaChzdHJzdGFydC0xLCBwcmV2X21hdGNoLCBwcmV2X2xlbmd0aCk7XG5cblx0XHRcdFx0XHRiZmx1c2ggPSBfdHJfdGFsbHkoc3Ryc3RhcnQgLSAxIC0gcHJldl9tYXRjaCwgcHJldl9sZW5ndGggLSBNSU5fTUFUQ0gpO1xuXG5cdFx0XHRcdFx0Ly8gSW5zZXJ0IGluIGhhc2ggdGFibGUgYWxsIHN0cmluZ3MgdXAgdG8gdGhlIGVuZCBvZiB0aGUgbWF0Y2guXG5cdFx0XHRcdFx0Ly8gc3Ryc3RhcnQtMSBhbmQgc3Ryc3RhcnQgYXJlIGFscmVhZHkgaW5zZXJ0ZWQuIElmIHRoZXJlIGlzIG5vdFxuXHRcdFx0XHRcdC8vIGVub3VnaCBsb29rYWhlYWQsIHRoZSBsYXN0IHR3byBzdHJpbmdzIGFyZSBub3QgaW5zZXJ0ZWQgaW5cblx0XHRcdFx0XHQvLyB0aGUgaGFzaCB0YWJsZS5cblx0XHRcdFx0XHRsb29rYWhlYWQgLT0gcHJldl9sZW5ndGggLSAxO1xuXHRcdFx0XHRcdHByZXZfbGVuZ3RoIC09IDI7XG5cdFx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdFx0aWYgKCsrc3Ryc3RhcnQgPD0gbWF4X2luc2VydCkge1xuXHRcdFx0XHRcdFx0XHRpbnNfaCA9ICgoKGluc19oKSA8PCBoYXNoX3NoaWZ0KSBeICh3aW5kb3dbKHN0cnN0YXJ0KSArIChNSU5fTUFUQ0ggLSAxKV0gJiAweGZmKSkgJiBoYXNoX21hc2s7XG5cdFx0XHRcdFx0XHRcdC8vIHByZXZbc3Ryc3RhcnQmd19tYXNrXT1oYXNoX2hlYWQ9aGVhZFtpbnNfaF07XG5cdFx0XHRcdFx0XHRcdGhhc2hfaGVhZCA9IChoZWFkW2luc19oXSAmIDB4ZmZmZik7XG5cdFx0XHRcdFx0XHRcdHByZXZbc3Ryc3RhcnQgJiB3X21hc2tdID0gaGVhZFtpbnNfaF07XG5cdFx0XHRcdFx0XHRcdGhlYWRbaW5zX2hdID0gc3Ryc3RhcnQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSB3aGlsZSAoLS1wcmV2X2xlbmd0aCAhPT0gMCk7XG5cdFx0XHRcdFx0bWF0Y2hfYXZhaWxhYmxlID0gMDtcblx0XHRcdFx0XHRtYXRjaF9sZW5ndGggPSBNSU5fTUFUQ0ggLSAxO1xuXHRcdFx0XHRcdHN0cnN0YXJ0Kys7XG5cblx0XHRcdFx0XHRpZiAoYmZsdXNoKSB7XG5cdFx0XHRcdFx0XHRmbHVzaF9ibG9ja19vbmx5KGZhbHNlKTtcblx0XHRcdFx0XHRcdGlmIChzdHJtLmF2YWlsX291dCA9PT0gMClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIE5lZWRNb3JlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChtYXRjaF9hdmFpbGFibGUgIT09IDApIHtcblxuXHRcdFx0XHRcdC8vIElmIHRoZXJlIHdhcyBubyBtYXRjaCBhdCB0aGUgcHJldmlvdXMgcG9zaXRpb24sIG91dHB1dCBhXG5cdFx0XHRcdFx0Ly8gc2luZ2xlIGxpdGVyYWwuIElmIHRoZXJlIHdhcyBhIG1hdGNoIGJ1dCB0aGUgY3VycmVudCBtYXRjaFxuXHRcdFx0XHRcdC8vIGlzIGxvbmdlciwgdHJ1bmNhdGUgdGhlIHByZXZpb3VzIG1hdGNoIHRvIGEgc2luZ2xlIGxpdGVyYWwuXG5cblx0XHRcdFx0XHRiZmx1c2ggPSBfdHJfdGFsbHkoMCwgd2luZG93W3N0cnN0YXJ0IC0gMV0gJiAweGZmKTtcblxuXHRcdFx0XHRcdGlmIChiZmx1c2gpIHtcblx0XHRcdFx0XHRcdGZsdXNoX2Jsb2NrX29ubHkoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzdHJzdGFydCsrO1xuXHRcdFx0XHRcdGxvb2thaGVhZC0tO1xuXHRcdFx0XHRcdGlmIChzdHJtLmF2YWlsX291dCA9PT0gMClcblx0XHRcdFx0XHRcdHJldHVybiBOZWVkTW9yZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBUaGVyZSBpcyBubyBwcmV2aW91cyBtYXRjaCB0byBjb21wYXJlIHdpdGgsIHdhaXQgZm9yXG5cdFx0XHRcdFx0Ly8gdGhlIG5leHQgc3RlcCB0byBkZWNpZGUuXG5cblx0XHRcdFx0XHRtYXRjaF9hdmFpbGFibGUgPSAxO1xuXHRcdFx0XHRcdHN0cnN0YXJ0Kys7XG5cdFx0XHRcdFx0bG9va2FoZWFkLS07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKG1hdGNoX2F2YWlsYWJsZSAhPT0gMCkge1xuXHRcdFx0XHRiZmx1c2ggPSBfdHJfdGFsbHkoMCwgd2luZG93W3N0cnN0YXJ0IC0gMV0gJiAweGZmKTtcblx0XHRcdFx0bWF0Y2hfYXZhaWxhYmxlID0gMDtcblx0XHRcdH1cblx0XHRcdGZsdXNoX2Jsb2NrX29ubHkoZmx1c2ggPT0gWl9GSU5JU0gpO1xuXG5cdFx0XHRpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcblx0XHRcdFx0aWYgKGZsdXNoID09IFpfRklOSVNIKVxuXHRcdFx0XHRcdHJldHVybiBGaW5pc2hTdGFydGVkO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIE5lZWRNb3JlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmx1c2ggPT0gWl9GSU5JU0ggPyBGaW5pc2hEb25lIDogQmxvY2tEb25lO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlZmxhdGVSZXNldChzdHJtKSB7XG5cdFx0XHRzdHJtLnRvdGFsX2luID0gc3RybS50b3RhbF9vdXQgPSAwO1xuXHRcdFx0c3RybS5tc2cgPSBudWxsOyAvL1xuXHRcdFx0XG5cdFx0XHR0aGF0LnBlbmRpbmcgPSAwO1xuXHRcdFx0dGhhdC5wZW5kaW5nX291dCA9IDA7XG5cblx0XHRcdHN0YXR1cyA9IEJVU1lfU1RBVEU7XG5cblx0XHRcdGxhc3RfZmx1c2ggPSBaX05PX0ZMVVNIO1xuXG5cdFx0XHR0cl9pbml0KCk7XG5cdFx0XHRsbV9pbml0KCk7XG5cdFx0XHRyZXR1cm4gWl9PSztcblx0XHR9XG5cblx0XHR0aGF0LmRlZmxhdGVJbml0ID0gZnVuY3Rpb24oc3RybSwgX2xldmVsLCBiaXRzLCBfbWV0aG9kLCBtZW1MZXZlbCwgX3N0cmF0ZWd5KSB7XG5cdFx0XHRpZiAoIV9tZXRob2QpXG5cdFx0XHRcdF9tZXRob2QgPSBaX0RFRkxBVEVEO1xuXHRcdFx0aWYgKCFtZW1MZXZlbClcblx0XHRcdFx0bWVtTGV2ZWwgPSBERUZfTUVNX0xFVkVMO1xuXHRcdFx0aWYgKCFfc3RyYXRlZ3kpXG5cdFx0XHRcdF9zdHJhdGVneSA9IFpfREVGQVVMVF9TVFJBVEVHWTtcblxuXHRcdFx0Ly8gYnl0ZVtdIG15X3ZlcnNpb249WkxJQl9WRVJTSU9OO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gaWYgKCF2ZXJzaW9uIHx8IHZlcnNpb25bMF0gIT0gbXlfdmVyc2lvblswXVxuXHRcdFx0Ly8gfHwgc3RyZWFtX3NpemUgIT0gc2l6ZW9mKHpfc3RyZWFtKSkge1xuXHRcdFx0Ly8gcmV0dXJuIFpfVkVSU0lPTl9FUlJPUjtcblx0XHRcdC8vIH1cblxuXHRcdFx0c3RybS5tc2cgPSBudWxsO1xuXG5cdFx0XHRpZiAoX2xldmVsID09IFpfREVGQVVMVF9DT01QUkVTU0lPTilcblx0XHRcdFx0X2xldmVsID0gNjtcblxuXHRcdFx0aWYgKG1lbUxldmVsIDwgMSB8fCBtZW1MZXZlbCA+IE1BWF9NRU1fTEVWRUwgfHwgX21ldGhvZCAhPSBaX0RFRkxBVEVEIHx8IGJpdHMgPCA5IHx8IGJpdHMgPiAxNSB8fCBfbGV2ZWwgPCAwIHx8IF9sZXZlbCA+IDkgfHwgX3N0cmF0ZWd5IDwgMFxuXHRcdFx0XHRcdHx8IF9zdHJhdGVneSA+IFpfSFVGRk1BTl9PTkxZKSB7XG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcblx0XHRcdH1cblxuXHRcdFx0c3RybS5kc3RhdGUgPSB0aGF0O1xuXG5cdFx0XHR3X2JpdHMgPSBiaXRzO1xuXHRcdFx0d19zaXplID0gMSA8PCB3X2JpdHM7XG5cdFx0XHR3X21hc2sgPSB3X3NpemUgLSAxO1xuXG5cdFx0XHRoYXNoX2JpdHMgPSBtZW1MZXZlbCArIDc7XG5cdFx0XHRoYXNoX3NpemUgPSAxIDw8IGhhc2hfYml0cztcblx0XHRcdGhhc2hfbWFzayA9IGhhc2hfc2l6ZSAtIDE7XG5cdFx0XHRoYXNoX3NoaWZ0ID0gTWF0aC5mbG9vcigoaGFzaF9iaXRzICsgTUlOX01BVENIIC0gMSkgLyBNSU5fTUFUQ0gpO1xuXG5cdFx0XHR3aW5kb3cgPSBuZXcgVWludDhBcnJheSh3X3NpemUgKiAyKTtcblx0XHRcdHByZXYgPSBbXTtcblx0XHRcdGhlYWQgPSBbXTtcblxuXHRcdFx0bGl0X2J1ZnNpemUgPSAxIDw8IChtZW1MZXZlbCArIDYpOyAvLyAxNksgZWxlbWVudHMgYnkgZGVmYXVsdFxuXG5cdFx0XHQvLyBXZSBvdmVybGF5IHBlbmRpbmdfYnVmIGFuZCBkX2J1ZitsX2J1Zi4gVGhpcyB3b3JrcyBzaW5jZSB0aGUgYXZlcmFnZVxuXHRcdFx0Ly8gb3V0cHV0IHNpemUgZm9yIChsZW5ndGgsZGlzdGFuY2UpIGNvZGVzIGlzIDw9IDI0IGJpdHMuXG5cdFx0XHR0aGF0LnBlbmRpbmdfYnVmID0gbmV3IFVpbnQ4QXJyYXkobGl0X2J1ZnNpemUgKiA0KTtcblx0XHRcdHBlbmRpbmdfYnVmX3NpemUgPSBsaXRfYnVmc2l6ZSAqIDQ7XG5cblx0XHRcdGRfYnVmID0gTWF0aC5mbG9vcihsaXRfYnVmc2l6ZSAvIDIpO1xuXHRcdFx0bF9idWYgPSAoMSArIDIpICogbGl0X2J1ZnNpemU7XG5cblx0XHRcdGxldmVsID0gX2xldmVsO1xuXG5cdFx0XHRzdHJhdGVneSA9IF9zdHJhdGVneTtcblx0XHRcdG1ldGhvZCA9IF9tZXRob2QgJiAweGZmO1xuXG5cdFx0XHRyZXR1cm4gZGVmbGF0ZVJlc2V0KHN0cm0pO1xuXHRcdH07XG5cblx0XHR0aGF0LmRlZmxhdGVFbmQgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmIChzdGF0dXMgIT0gSU5JVF9TVEFURSAmJiBzdGF0dXMgIT0gQlVTWV9TVEFURSAmJiBzdGF0dXMgIT0gRklOSVNIX1NUQVRFKSB7XG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcblx0XHRcdH1cblx0XHRcdC8vIERlYWxsb2NhdGUgaW4gcmV2ZXJzZSBvcmRlciBvZiBhbGxvY2F0aW9uczpcblx0XHRcdHRoYXQucGVuZGluZ19idWYgPSBudWxsO1xuXHRcdFx0aGVhZCA9IG51bGw7XG5cdFx0XHRwcmV2ID0gbnVsbDtcblx0XHRcdHdpbmRvdyA9IG51bGw7XG5cdFx0XHQvLyBmcmVlXG5cdFx0XHR0aGF0LmRzdGF0ZSA9IG51bGw7XG5cdFx0XHRyZXR1cm4gc3RhdHVzID09IEJVU1lfU1RBVEUgPyBaX0RBVEFfRVJST1IgOiBaX09LO1xuXHRcdH07XG5cblx0XHR0aGF0LmRlZmxhdGVQYXJhbXMgPSBmdW5jdGlvbihzdHJtLCBfbGV2ZWwsIF9zdHJhdGVneSkge1xuXHRcdFx0dmFyIGVyciA9IFpfT0s7XG5cblx0XHRcdGlmIChfbGV2ZWwgPT0gWl9ERUZBVUxUX0NPTVBSRVNTSU9OKSB7XG5cdFx0XHRcdF9sZXZlbCA9IDY7XG5cdFx0XHR9XG5cdFx0XHRpZiAoX2xldmVsIDwgMCB8fCBfbGV2ZWwgPiA5IHx8IF9zdHJhdGVneSA8IDAgfHwgX3N0cmF0ZWd5ID4gWl9IVUZGTUFOX09OTFkpIHtcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY29uZmlnX3RhYmxlW2xldmVsXS5mdW5jICE9IGNvbmZpZ190YWJsZVtfbGV2ZWxdLmZ1bmMgJiYgc3RybS50b3RhbF9pbiAhPT0gMCkge1xuXHRcdFx0XHQvLyBGbHVzaCB0aGUgbGFzdCBidWZmZXI6XG5cdFx0XHRcdGVyciA9IHN0cm0uZGVmbGF0ZShaX1BBUlRJQUxfRkxVU0gpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobGV2ZWwgIT0gX2xldmVsKSB7XG5cdFx0XHRcdGxldmVsID0gX2xldmVsO1xuXHRcdFx0XHRtYXhfbGF6eV9tYXRjaCA9IGNvbmZpZ190YWJsZVtsZXZlbF0ubWF4X2xhenk7XG5cdFx0XHRcdGdvb2RfbWF0Y2ggPSBjb25maWdfdGFibGVbbGV2ZWxdLmdvb2RfbGVuZ3RoO1xuXHRcdFx0XHRuaWNlX21hdGNoID0gY29uZmlnX3RhYmxlW2xldmVsXS5uaWNlX2xlbmd0aDtcblx0XHRcdFx0bWF4X2NoYWluX2xlbmd0aCA9IGNvbmZpZ190YWJsZVtsZXZlbF0ubWF4X2NoYWluO1xuXHRcdFx0fVxuXHRcdFx0c3RyYXRlZ3kgPSBfc3RyYXRlZ3k7XG5cdFx0XHRyZXR1cm4gZXJyO1xuXHRcdH07XG5cblx0XHR0aGF0LmRlZmxhdGVTZXREaWN0aW9uYXJ5ID0gZnVuY3Rpb24oc3RybSwgZGljdGlvbmFyeSwgZGljdExlbmd0aCkge1xuXHRcdFx0dmFyIGxlbmd0aCA9IGRpY3RMZW5ndGg7XG5cdFx0XHR2YXIgbiwgaW5kZXggPSAwO1xuXG5cdFx0XHRpZiAoIWRpY3Rpb25hcnkgfHwgc3RhdHVzICE9IElOSVRfU1RBVEUpXG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcblxuXHRcdFx0aWYgKGxlbmd0aCA8IE1JTl9NQVRDSClcblx0XHRcdFx0cmV0dXJuIFpfT0s7XG5cdFx0XHRpZiAobGVuZ3RoID4gd19zaXplIC0gTUlOX0xPT0tBSEVBRCkge1xuXHRcdFx0XHRsZW5ndGggPSB3X3NpemUgLSBNSU5fTE9PS0FIRUFEO1xuXHRcdFx0XHRpbmRleCA9IGRpY3RMZW5ndGggLSBsZW5ndGg7IC8vIHVzZSB0aGUgdGFpbCBvZiB0aGUgZGljdGlvbmFyeVxuXHRcdFx0fVxuXHRcdFx0d2luZG93LnNldChkaWN0aW9uYXJ5LnN1YmFycmF5KGluZGV4LCBpbmRleCArIGxlbmd0aCksIDApO1xuXG5cdFx0XHRzdHJzdGFydCA9IGxlbmd0aDtcblx0XHRcdGJsb2NrX3N0YXJ0ID0gbGVuZ3RoO1xuXG5cdFx0XHQvLyBJbnNlcnQgYWxsIHN0cmluZ3MgaW4gdGhlIGhhc2ggdGFibGUgKGV4Y2VwdCBmb3IgdGhlIGxhc3QgdHdvIGJ5dGVzKS5cblx0XHRcdC8vIHMtPmxvb2thaGVhZCBzdGF5cyBudWxsLCBzbyBzLT5pbnNfaCB3aWxsIGJlIHJlY29tcHV0ZWQgYXQgdGhlIG5leHRcblx0XHRcdC8vIGNhbGwgb2YgZmlsbF93aW5kb3cuXG5cblx0XHRcdGluc19oID0gd2luZG93WzBdICYgMHhmZjtcblx0XHRcdGluc19oID0gKCgoaW5zX2gpIDw8IGhhc2hfc2hpZnQpIF4gKHdpbmRvd1sxXSAmIDB4ZmYpKSAmIGhhc2hfbWFzaztcblxuXHRcdFx0Zm9yIChuID0gMDsgbiA8PSBsZW5ndGggLSBNSU5fTUFUQ0g7IG4rKykge1xuXHRcdFx0XHRpbnNfaCA9ICgoKGluc19oKSA8PCBoYXNoX3NoaWZ0KSBeICh3aW5kb3dbKG4pICsgKE1JTl9NQVRDSCAtIDEpXSAmIDB4ZmYpKSAmIGhhc2hfbWFzaztcblx0XHRcdFx0cHJldltuICYgd19tYXNrXSA9IGhlYWRbaW5zX2hdO1xuXHRcdFx0XHRoZWFkW2luc19oXSA9IG47XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gWl9PSztcblx0XHR9O1xuXG5cdFx0dGhhdC5kZWZsYXRlID0gZnVuY3Rpb24oX3N0cm0sIGZsdXNoKSB7XG5cdFx0XHR2YXIgaSwgaGVhZGVyLCBsZXZlbF9mbGFncywgb2xkX2ZsdXNoLCBic3RhdGU7XG5cblx0XHRcdGlmIChmbHVzaCA+IFpfRklOSVNIIHx8IGZsdXNoIDwgMCkge1xuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghX3N0cm0ubmV4dF9vdXQgfHwgKCFfc3RybS5uZXh0X2luICYmIF9zdHJtLmF2YWlsX2luICE9PSAwKSB8fCAoc3RhdHVzID09IEZJTklTSF9TVEFURSAmJiBmbHVzaCAhPSBaX0ZJTklTSCkpIHtcblx0XHRcdFx0X3N0cm0ubXNnID0gel9lcnJtc2dbWl9ORUVEX0RJQ1QgLSAoWl9TVFJFQU1fRVJST1IpXTtcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuXHRcdFx0fVxuXHRcdFx0aWYgKF9zdHJtLmF2YWlsX291dCA9PT0gMCkge1xuXHRcdFx0XHRfc3RybS5tc2cgPSB6X2Vycm1zZ1taX05FRURfRElDVCAtIChaX0JVRl9FUlJPUildO1xuXHRcdFx0XHRyZXR1cm4gWl9CVUZfRVJST1I7XG5cdFx0XHR9XG5cblx0XHRcdHN0cm0gPSBfc3RybTsgLy8ganVzdCBpbiBjYXNlXG5cdFx0XHRvbGRfZmx1c2ggPSBsYXN0X2ZsdXNoO1xuXHRcdFx0bGFzdF9mbHVzaCA9IGZsdXNoO1xuXG5cdFx0XHQvLyBXcml0ZSB0aGUgemxpYiBoZWFkZXJcblx0XHRcdGlmIChzdGF0dXMgPT0gSU5JVF9TVEFURSkge1xuXHRcdFx0XHRoZWFkZXIgPSAoWl9ERUZMQVRFRCArICgod19iaXRzIC0gOCkgPDwgNCkpIDw8IDg7XG5cdFx0XHRcdGxldmVsX2ZsYWdzID0gKChsZXZlbCAtIDEpICYgMHhmZikgPj4gMTtcblxuXHRcdFx0XHRpZiAobGV2ZWxfZmxhZ3MgPiAzKVxuXHRcdFx0XHRcdGxldmVsX2ZsYWdzID0gMztcblx0XHRcdFx0aGVhZGVyIHw9IChsZXZlbF9mbGFncyA8PCA2KTtcblx0XHRcdFx0aWYgKHN0cnN0YXJ0ICE9PSAwKVxuXHRcdFx0XHRcdGhlYWRlciB8PSBQUkVTRVRfRElDVDtcblx0XHRcdFx0aGVhZGVyICs9IDMxIC0gKGhlYWRlciAlIDMxKTtcblxuXHRcdFx0XHRzdGF0dXMgPSBCVVNZX1NUQVRFO1xuXHRcdFx0XHRwdXRTaG9ydE1TQihoZWFkZXIpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGbHVzaCBhcyBtdWNoIHBlbmRpbmcgb3V0cHV0IGFzIHBvc3NpYmxlXG5cdFx0XHRpZiAodGhhdC5wZW5kaW5nICE9PSAwKSB7XG5cdFx0XHRcdHN0cm0uZmx1c2hfcGVuZGluZygpO1xuXHRcdFx0XHRpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhcIiBhdmFpbF9vdXQ9PTBcIik7XG5cdFx0XHRcdFx0Ly8gU2luY2UgYXZhaWxfb3V0IGlzIDAsIGRlZmxhdGUgd2lsbCBiZSBjYWxsZWQgYWdhaW4gd2l0aFxuXHRcdFx0XHRcdC8vIG1vcmUgb3V0cHV0IHNwYWNlLCBidXQgcG9zc2libHkgd2l0aCBib3RoIHBlbmRpbmcgYW5kXG5cdFx0XHRcdFx0Ly8gYXZhaWxfaW4gZXF1YWwgdG8gemVyby4gVGhlcmUgd29uJ3QgYmUgYW55dGhpbmcgdG8gZG8sXG5cdFx0XHRcdFx0Ly8gYnV0IHRoaXMgaXMgbm90IGFuIGVycm9yIHNpdHVhdGlvbiBzbyBtYWtlIHN1cmUgd2Vcblx0XHRcdFx0XHQvLyByZXR1cm4gT0sgaW5zdGVhZCBvZiBCVUZfRVJST1IgYXQgbmV4dCBjYWxsIG9mIGRlZmxhdGU6XG5cdFx0XHRcdFx0bGFzdF9mbHVzaCA9IC0xO1xuXHRcdFx0XHRcdHJldHVybiBaX09LO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoZXJlIGlzIHNvbWV0aGluZyB0byBkbyBhbmQgYXZvaWQgZHVwbGljYXRlXG5cdFx0XHRcdC8vIGNvbnNlY3V0aXZlXG5cdFx0XHRcdC8vIGZsdXNoZXMuIEZvciByZXBlYXRlZCBhbmQgdXNlbGVzcyBjYWxscyB3aXRoIFpfRklOSVNILCB3ZSBrZWVwXG5cdFx0XHRcdC8vIHJldHVybmluZyBaX1NUUkVBTV9FTkQgaW5zdGVhZCBvZiBaX0JVRkZfRVJST1IuXG5cdFx0XHR9IGVsc2UgaWYgKHN0cm0uYXZhaWxfaW4gPT09IDAgJiYgZmx1c2ggPD0gb2xkX2ZsdXNoICYmIGZsdXNoICE9IFpfRklOSVNIKSB7XG5cdFx0XHRcdHN0cm0ubXNnID0gel9lcnJtc2dbWl9ORUVEX0RJQ1QgLSAoWl9CVUZfRVJST1IpXTtcblx0XHRcdFx0cmV0dXJuIFpfQlVGX0VSUk9SO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBVc2VyIG11c3Qgbm90IHByb3ZpZGUgbW9yZSBpbnB1dCBhZnRlciB0aGUgZmlyc3QgRklOSVNIOlxuXHRcdFx0aWYgKHN0YXR1cyA9PSBGSU5JU0hfU1RBVEUgJiYgc3RybS5hdmFpbF9pbiAhPT0gMCkge1xuXHRcdFx0XHRfc3RybS5tc2cgPSB6X2Vycm1zZ1taX05FRURfRElDVCAtIChaX0JVRl9FUlJPUildO1xuXHRcdFx0XHRyZXR1cm4gWl9CVUZfRVJST1I7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0YXJ0IGEgbmV3IGJsb2NrIG9yIGNvbnRpbnVlIHRoZSBjdXJyZW50IG9uZS5cblx0XHRcdGlmIChzdHJtLmF2YWlsX2luICE9PSAwIHx8IGxvb2thaGVhZCAhPT0gMCB8fCAoZmx1c2ggIT0gWl9OT19GTFVTSCAmJiBzdGF0dXMgIT0gRklOSVNIX1NUQVRFKSkge1xuXHRcdFx0XHRic3RhdGUgPSAtMTtcblx0XHRcdFx0c3dpdGNoIChjb25maWdfdGFibGVbbGV2ZWxdLmZ1bmMpIHtcblx0XHRcdFx0Y2FzZSBTVE9SRUQ6XG5cdFx0XHRcdFx0YnN0YXRlID0gZGVmbGF0ZV9zdG9yZWQoZmx1c2gpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIEZBU1Q6XG5cdFx0XHRcdFx0YnN0YXRlID0gZGVmbGF0ZV9mYXN0KGZsdXNoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBTTE9XOlxuXHRcdFx0XHRcdGJzdGF0ZSA9IGRlZmxhdGVfc2xvdyhmbHVzaCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYnN0YXRlID09IEZpbmlzaFN0YXJ0ZWQgfHwgYnN0YXRlID09IEZpbmlzaERvbmUpIHtcblx0XHRcdFx0XHRzdGF0dXMgPSBGSU5JU0hfU1RBVEU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGJzdGF0ZSA9PSBOZWVkTW9yZSB8fCBic3RhdGUgPT0gRmluaXNoU3RhcnRlZCkge1xuXHRcdFx0XHRcdGlmIChzdHJtLmF2YWlsX291dCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0bGFzdF9mbHVzaCA9IC0xOyAvLyBhdm9pZCBCVUZfRVJST1IgbmV4dCBjYWxsLCBzZWUgYWJvdmVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIFpfT0s7XG5cdFx0XHRcdFx0Ly8gSWYgZmx1c2ggIT0gWl9OT19GTFVTSCAmJiBhdmFpbF9vdXQgPT09IDAsIHRoZSBuZXh0IGNhbGxcblx0XHRcdFx0XHQvLyBvZiBkZWZsYXRlIHNob3VsZCB1c2UgdGhlIHNhbWUgZmx1c2ggcGFyYW1ldGVyIHRvIG1ha2Ugc3VyZVxuXHRcdFx0XHRcdC8vIHRoYXQgdGhlIGZsdXNoIGlzIGNvbXBsZXRlLiBTbyB3ZSBkb24ndCBoYXZlIHRvIG91dHB1dCBhblxuXHRcdFx0XHRcdC8vIGVtcHR5IGJsb2NrIGhlcmUsIHRoaXMgd2lsbCBiZSBkb25lIGF0IG5leHQgY2FsbC4gVGhpcyBhbHNvXG5cdFx0XHRcdFx0Ly8gZW5zdXJlcyB0aGF0IGZvciBhIHZlcnkgc21hbGwgb3V0cHV0IGJ1ZmZlciwgd2UgZW1pdCBhdCBtb3N0XG5cdFx0XHRcdFx0Ly8gb25lIGVtcHR5IGJsb2NrLlxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGJzdGF0ZSA9PSBCbG9ja0RvbmUpIHtcblx0XHRcdFx0XHRpZiAoZmx1c2ggPT0gWl9QQVJUSUFMX0ZMVVNIKSB7XG5cdFx0XHRcdFx0XHRfdHJfYWxpZ24oKTtcblx0XHRcdFx0XHR9IGVsc2UgeyAvLyBGVUxMX0ZMVVNIIG9yIFNZTkNfRkxVU0hcblx0XHRcdFx0XHRcdF90cl9zdG9yZWRfYmxvY2soMCwgMCwgZmFsc2UpO1xuXHRcdFx0XHRcdFx0Ly8gRm9yIGEgZnVsbCBmbHVzaCwgdGhpcyBlbXB0eSBibG9jayB3aWxsIGJlIHJlY29nbml6ZWRcblx0XHRcdFx0XHRcdC8vIGFzIGEgc3BlY2lhbCBtYXJrZXIgYnkgaW5mbGF0ZV9zeW5jKCkuXG5cdFx0XHRcdFx0XHRpZiAoZmx1c2ggPT0gWl9GVUxMX0ZMVVNIKSB7XG5cdFx0XHRcdFx0XHRcdC8vIHN0YXRlLmhlYWRbcy5oYXNoX3NpemUtMV09MDtcblx0XHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGhhc2hfc2l6ZS8qLTEqLzsgaSsrKVxuXHRcdFx0XHRcdFx0XHRcdC8vIGZvcmdldCBoaXN0b3J5XG5cdFx0XHRcdFx0XHRcdFx0aGVhZFtpXSA9IDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN0cm0uZmx1c2hfcGVuZGluZygpO1xuXHRcdFx0XHRcdGlmIChzdHJtLmF2YWlsX291dCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0bGFzdF9mbHVzaCA9IC0xOyAvLyBhdm9pZCBCVUZfRVJST1IgYXQgbmV4dCBjYWxsLCBzZWUgYWJvdmVcblx0XHRcdFx0XHRcdHJldHVybiBaX09LO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmx1c2ggIT0gWl9GSU5JU0gpXG5cdFx0XHRcdHJldHVybiBaX09LO1xuXHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VORDtcblx0XHR9O1xuXHR9XG5cblx0Ly8gWlN0cmVhbVxuXG5cdGZ1bmN0aW9uIFpTdHJlYW0oKSB7XG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdHRoYXQubmV4dF9pbl9pbmRleCA9IDA7XG5cdFx0dGhhdC5uZXh0X291dF9pbmRleCA9IDA7XG5cdFx0Ly8gdGhhdC5uZXh0X2luOyAvLyBuZXh0IGlucHV0IGJ5dGVcblx0XHR0aGF0LmF2YWlsX2luID0gMDsgLy8gbnVtYmVyIG9mIGJ5dGVzIGF2YWlsYWJsZSBhdCBuZXh0X2luXG5cdFx0dGhhdC50b3RhbF9pbiA9IDA7IC8vIHRvdGFsIG5iIG9mIGlucHV0IGJ5dGVzIHJlYWQgc28gZmFyXG5cdFx0Ly8gdGhhdC5uZXh0X291dDsgLy8gbmV4dCBvdXRwdXQgYnl0ZSBzaG91bGQgYmUgcHV0IHRoZXJlXG5cdFx0dGhhdC5hdmFpbF9vdXQgPSAwOyAvLyByZW1haW5pbmcgZnJlZSBzcGFjZSBhdCBuZXh0X291dFxuXHRcdHRoYXQudG90YWxfb3V0ID0gMDsgLy8gdG90YWwgbmIgb2YgYnl0ZXMgb3V0cHV0IHNvIGZhclxuXHRcdC8vIHRoYXQubXNnO1xuXHRcdC8vIHRoYXQuZHN0YXRlO1xuXHR9XG5cblx0WlN0cmVhbS5wcm90b3R5cGUgPSB7XG5cdFx0ZGVmbGF0ZUluaXQgOiBmdW5jdGlvbihsZXZlbCwgYml0cykge1xuXHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdFx0dGhhdC5kc3RhdGUgPSBuZXcgRGVmbGF0ZSgpO1xuXHRcdFx0aWYgKCFiaXRzKVxuXHRcdFx0XHRiaXRzID0gTUFYX0JJVFM7XG5cdFx0XHRyZXR1cm4gdGhhdC5kc3RhdGUuZGVmbGF0ZUluaXQodGhhdCwgbGV2ZWwsIGJpdHMpO1xuXHRcdH0sXG5cblx0XHRkZWZsYXRlIDogZnVuY3Rpb24oZmx1c2gpIHtcblx0XHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHRcdGlmICghdGhhdC5kc3RhdGUpIHtcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoYXQuZHN0YXRlLmRlZmxhdGUodGhhdCwgZmx1c2gpO1xuXHRcdH0sXG5cblx0XHRkZWZsYXRlRW5kIDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0XHRpZiAoIXRoYXQuZHN0YXRlKVxuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XG5cdFx0XHR2YXIgcmV0ID0gdGhhdC5kc3RhdGUuZGVmbGF0ZUVuZCgpO1xuXHRcdFx0dGhhdC5kc3RhdGUgPSBudWxsO1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9LFxuXG5cdFx0ZGVmbGF0ZVBhcmFtcyA6IGZ1bmN0aW9uKGxldmVsLCBzdHJhdGVneSkge1xuXHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdFx0aWYgKCF0aGF0LmRzdGF0ZSlcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuXHRcdFx0cmV0dXJuIHRoYXQuZHN0YXRlLmRlZmxhdGVQYXJhbXModGhhdCwgbGV2ZWwsIHN0cmF0ZWd5KTtcblx0XHR9LFxuXG5cdFx0ZGVmbGF0ZVNldERpY3Rpb25hcnkgOiBmdW5jdGlvbihkaWN0aW9uYXJ5LCBkaWN0TGVuZ3RoKSB7XG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0XHRpZiAoIXRoYXQuZHN0YXRlKVxuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XG5cdFx0XHRyZXR1cm4gdGhhdC5kc3RhdGUuZGVmbGF0ZVNldERpY3Rpb25hcnkodGhhdCwgZGljdGlvbmFyeSwgZGljdExlbmd0aCk7XG5cdFx0fSxcblxuXHRcdC8vIFJlYWQgYSBuZXcgYnVmZmVyIGZyb20gdGhlIGN1cnJlbnQgaW5wdXQgc3RyZWFtLCB1cGRhdGUgdGhlXG5cdFx0Ly8gdG90YWwgbnVtYmVyIG9mIGJ5dGVzIHJlYWQuIEFsbCBkZWZsYXRlKCkgaW5wdXQgZ29lcyB0aHJvdWdoXG5cdFx0Ly8gdGhpcyBmdW5jdGlvbiBzbyBzb21lIGFwcGxpY2F0aW9ucyBtYXkgd2lzaCB0byBtb2RpZnkgaXQgdG8gYXZvaWRcblx0XHQvLyBhbGxvY2F0aW5nIGEgbGFyZ2Ugc3RybS0+bmV4dF9pbiBidWZmZXIgYW5kIGNvcHlpbmcgZnJvbSBpdC5cblx0XHQvLyAoU2VlIGFsc28gZmx1c2hfcGVuZGluZygpKS5cblx0XHRyZWFkX2J1ZiA6IGZ1bmN0aW9uKGJ1Ziwgc3RhcnQsIHNpemUpIHtcblx0XHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHRcdHZhciBsZW4gPSB0aGF0LmF2YWlsX2luO1xuXHRcdFx0aWYgKGxlbiA+IHNpemUpXG5cdFx0XHRcdGxlbiA9IHNpemU7XG5cdFx0XHRpZiAobGVuID09PSAwKVxuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdHRoYXQuYXZhaWxfaW4gLT0gbGVuO1xuXHRcdFx0YnVmLnNldCh0aGF0Lm5leHRfaW4uc3ViYXJyYXkodGhhdC5uZXh0X2luX2luZGV4LCB0aGF0Lm5leHRfaW5faW5kZXggKyBsZW4pLCBzdGFydCk7XG5cdFx0XHR0aGF0Lm5leHRfaW5faW5kZXggKz0gbGVuO1xuXHRcdFx0dGhhdC50b3RhbF9pbiArPSBsZW47XG5cdFx0XHRyZXR1cm4gbGVuO1xuXHRcdH0sXG5cblx0XHQvLyBGbHVzaCBhcyBtdWNoIHBlbmRpbmcgb3V0cHV0IGFzIHBvc3NpYmxlLiBBbGwgZGVmbGF0ZSgpIG91dHB1dCBnb2VzXG5cdFx0Ly8gdGhyb3VnaCB0aGlzIGZ1bmN0aW9uIHNvIHNvbWUgYXBwbGljYXRpb25zIG1heSB3aXNoIHRvIG1vZGlmeSBpdFxuXHRcdC8vIHRvIGF2b2lkIGFsbG9jYXRpbmcgYSBsYXJnZSBzdHJtLT5uZXh0X291dCBidWZmZXIgYW5kIGNvcHlpbmcgaW50byBpdC5cblx0XHQvLyAoU2VlIGFsc28gcmVhZF9idWYoKSkuXG5cdFx0Zmx1c2hfcGVuZGluZyA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdFx0dmFyIGxlbiA9IHRoYXQuZHN0YXRlLnBlbmRpbmc7XG5cblx0XHRcdGlmIChsZW4gPiB0aGF0LmF2YWlsX291dClcblx0XHRcdFx0bGVuID0gdGhhdC5hdmFpbF9vdXQ7XG5cdFx0XHRpZiAobGVuID09PSAwKVxuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdC8vIGlmICh0aGF0LmRzdGF0ZS5wZW5kaW5nX2J1Zi5sZW5ndGggPD0gdGhhdC5kc3RhdGUucGVuZGluZ19vdXQgfHwgdGhhdC5uZXh0X291dC5sZW5ndGggPD0gdGhhdC5uZXh0X291dF9pbmRleFxuXHRcdFx0Ly8gfHwgdGhhdC5kc3RhdGUucGVuZGluZ19idWYubGVuZ3RoIDwgKHRoYXQuZHN0YXRlLnBlbmRpbmdfb3V0ICsgbGVuKSB8fCB0aGF0Lm5leHRfb3V0Lmxlbmd0aCA8ICh0aGF0Lm5leHRfb3V0X2luZGV4ICtcblx0XHRcdC8vIGxlbikpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHRoYXQuZHN0YXRlLnBlbmRpbmdfYnVmLmxlbmd0aCArIFwiLCBcIiArIHRoYXQuZHN0YXRlLnBlbmRpbmdfb3V0ICsgXCIsIFwiICsgdGhhdC5uZXh0X291dC5sZW5ndGggKyBcIiwgXCIgK1xuXHRcdFx0Ly8gdGhhdC5uZXh0X291dF9pbmRleCArIFwiLCBcIiArIGxlbik7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcImF2YWlsX291dD1cIiArIHRoYXQuYXZhaWxfb3V0KTtcblx0XHRcdC8vIH1cblxuXHRcdFx0dGhhdC5uZXh0X291dC5zZXQodGhhdC5kc3RhdGUucGVuZGluZ19idWYuc3ViYXJyYXkodGhhdC5kc3RhdGUucGVuZGluZ19vdXQsIHRoYXQuZHN0YXRlLnBlbmRpbmdfb3V0ICsgbGVuKSwgdGhhdC5uZXh0X291dF9pbmRleCk7XG5cblx0XHRcdHRoYXQubmV4dF9vdXRfaW5kZXggKz0gbGVuO1xuXHRcdFx0dGhhdC5kc3RhdGUucGVuZGluZ19vdXQgKz0gbGVuO1xuXHRcdFx0dGhhdC50b3RhbF9vdXQgKz0gbGVuO1xuXHRcdFx0dGhhdC5hdmFpbF9vdXQgLT0gbGVuO1xuXHRcdFx0dGhhdC5kc3RhdGUucGVuZGluZyAtPSBsZW47XG5cdFx0XHRpZiAodGhhdC5kc3RhdGUucGVuZGluZyA9PT0gMCkge1xuXHRcdFx0XHR0aGF0LmRzdGF0ZS5wZW5kaW5nX291dCA9IDA7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdC8vIERlZmxhdGVyXG5cblx0ZnVuY3Rpb24gRGVmbGF0ZXIobGV2ZWwpIHtcblx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0dmFyIHogPSBuZXcgWlN0cmVhbSgpO1xuXHRcdHZhciBidWZzaXplID0gNTEyO1xuXHRcdHZhciBmbHVzaCA9IFpfTk9fRkxVU0g7XG5cdFx0dmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGJ1ZnNpemUpO1xuXG5cdFx0aWYgKHR5cGVvZiBsZXZlbCA9PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0bGV2ZWwgPSBaX0RFRkFVTFRfQ09NUFJFU1NJT047XG5cdFx0ei5kZWZsYXRlSW5pdChsZXZlbCk7XG5cdFx0ei5uZXh0X291dCA9IGJ1ZjtcblxuXHRcdHRoYXQuYXBwZW5kID0gZnVuY3Rpb24oZGF0YSwgb25wcm9ncmVzcykge1xuXHRcdFx0dmFyIGVyciwgYnVmZmVycyA9IFtdLCBsYXN0SW5kZXggPSAwLCBidWZmZXJJbmRleCA9IDAsIGJ1ZmZlclNpemUgPSAwLCBhcnJheTtcblx0XHRcdGlmICghZGF0YS5sZW5ndGgpXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdHoubmV4dF9pbl9pbmRleCA9IDA7XG5cdFx0XHR6Lm5leHRfaW4gPSBkYXRhO1xuXHRcdFx0ei5hdmFpbF9pbiA9IGRhdGEubGVuZ3RoO1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHR6Lm5leHRfb3V0X2luZGV4ID0gMDtcblx0XHRcdFx0ei5hdmFpbF9vdXQgPSBidWZzaXplO1xuXHRcdFx0XHRlcnIgPSB6LmRlZmxhdGUoZmx1c2gpO1xuXHRcdFx0XHRpZiAoZXJyICE9IFpfT0spXG5cdFx0XHRcdFx0dGhyb3cgXCJkZWZsYXRpbmc6IFwiICsgei5tc2c7XG5cdFx0XHRcdGlmICh6Lm5leHRfb3V0X2luZGV4KVxuXHRcdFx0XHRcdGlmICh6Lm5leHRfb3V0X2luZGV4ID09IGJ1ZnNpemUpXG5cdFx0XHRcdFx0XHRidWZmZXJzLnB1c2gobmV3IFVpbnQ4QXJyYXkoYnVmKSk7XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0YnVmZmVycy5wdXNoKG5ldyBVaW50OEFycmF5KGJ1Zi5zdWJhcnJheSgwLCB6Lm5leHRfb3V0X2luZGV4KSkpO1xuXHRcdFx0XHRidWZmZXJTaXplICs9IHoubmV4dF9vdXRfaW5kZXg7XG5cdFx0XHRcdGlmIChvbnByb2dyZXNzICYmIHoubmV4dF9pbl9pbmRleCA+IDAgJiYgei5uZXh0X2luX2luZGV4ICE9IGxhc3RJbmRleCkge1xuXHRcdFx0XHRcdG9ucHJvZ3Jlc3Moei5uZXh0X2luX2luZGV4KTtcblx0XHRcdFx0XHRsYXN0SW5kZXggPSB6Lm5leHRfaW5faW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH0gd2hpbGUgKHouYXZhaWxfaW4gPiAwIHx8IHouYXZhaWxfb3V0ID09PSAwKTtcblx0XHRcdGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyU2l6ZSk7XG5cdFx0XHRidWZmZXJzLmZvckVhY2goZnVuY3Rpb24oY2h1bmspIHtcblx0XHRcdFx0YXJyYXkuc2V0KGNodW5rLCBidWZmZXJJbmRleCk7XG5cdFx0XHRcdGJ1ZmZlckluZGV4ICs9IGNodW5rLmxlbmd0aDtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGFycmF5O1xuXHRcdH07XG5cdFx0dGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGVyciwgYnVmZmVycyA9IFtdLCBidWZmZXJJbmRleCA9IDAsIGJ1ZmZlclNpemUgPSAwLCBhcnJheTtcblx0XHRcdGRvIHtcblx0XHRcdFx0ei5uZXh0X291dF9pbmRleCA9IDA7XG5cdFx0XHRcdHouYXZhaWxfb3V0ID0gYnVmc2l6ZTtcblx0XHRcdFx0ZXJyID0gei5kZWZsYXRlKFpfRklOSVNIKTtcblx0XHRcdFx0aWYgKGVyciAhPSBaX1NUUkVBTV9FTkQgJiYgZXJyICE9IFpfT0spXG5cdFx0XHRcdFx0dGhyb3cgXCJkZWZsYXRpbmc6IFwiICsgei5tc2c7XG5cdFx0XHRcdGlmIChidWZzaXplIC0gei5hdmFpbF9vdXQgPiAwKVxuXHRcdFx0XHRcdGJ1ZmZlcnMucHVzaChuZXcgVWludDhBcnJheShidWYuc3ViYXJyYXkoMCwgei5uZXh0X291dF9pbmRleCkpKTtcblx0XHRcdFx0YnVmZmVyU2l6ZSArPSB6Lm5leHRfb3V0X2luZGV4O1xuXHRcdFx0fSB3aGlsZSAoei5hdmFpbF9pbiA+IDAgfHwgei5hdmFpbF9vdXQgPT09IDApO1xuXHRcdFx0ei5kZWZsYXRlRW5kKCk7XG5cdFx0XHRhcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlclNpemUpO1xuXHRcdFx0YnVmZmVycy5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rKSB7XG5cdFx0XHRcdGFycmF5LnNldChjaHVuaywgYnVmZmVySW5kZXgpO1xuXHRcdFx0XHRidWZmZXJJbmRleCArPSBjaHVuay5sZW5ndGg7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBhcnJheTtcblx0XHR9O1xuXHR9XG5cblx0dmFyIGRlZmxhdGVyO1xuXG5cdGlmIChvYmouemlwKVxuXHRcdG9iai56aXAuRGVmbGF0ZXIgPSBEZWZsYXRlcjtcblx0ZWxzZSB7XG5cdFx0ZGVmbGF0ZXIgPSBuZXcgRGVmbGF0ZXIoKTtcblx0XHRvYmouYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdHZhciBtZXNzYWdlID0gZXZlbnQuZGF0YTtcblx0XHRcdGlmIChtZXNzYWdlLmluaXQpIHtcblx0XHRcdFx0ZGVmbGF0ZXIgPSBuZXcgRGVmbGF0ZXIobWVzc2FnZS5sZXZlbCk7XG5cdFx0XHRcdG9iai5wb3N0TWVzc2FnZSh7XG5cdFx0XHRcdFx0b25pbml0IDogdHJ1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmIChtZXNzYWdlLmFwcGVuZClcblx0XHRcdFx0b2JqLnBvc3RNZXNzYWdlKHtcblx0XHRcdFx0XHRvbmFwcGVuZCA6IHRydWUsXG5cdFx0XHRcdFx0ZGF0YSA6IGRlZmxhdGVyLmFwcGVuZChtZXNzYWdlLmRhdGEsIGZ1bmN0aW9uKGN1cnJlbnQpIHtcblx0XHRcdFx0XHRcdG9iai5wb3N0TWVzc2FnZSh7XG5cdFx0XHRcdFx0XHRcdHByb2dyZXNzIDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0Y3VycmVudCA6IGN1cnJlbnRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0pO1xuXHRcdFx0aWYgKG1lc3NhZ2UuZmx1c2gpXG5cdFx0XHRcdG9iai5wb3N0TWVzc2FnZSh7XG5cdFx0XHRcdFx0b25mbHVzaCA6IHRydWUsXG5cdFx0XHRcdFx0ZGF0YSA6IGRlZmxhdGVyLmZsdXNoKClcblx0XHRcdFx0fSk7XG5cdFx0fSwgZmFsc2UpO1xuXHR9XG5cbn0pKHNlbGYpO1xuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==