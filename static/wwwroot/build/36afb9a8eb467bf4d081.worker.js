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
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzZhZmI5YThlYjQ2N2JmNGQwODEud29ya2VyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDM2YWZiOWE4ZWI0NjdiZjRkMDgxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL1RoaXJkUGFydHkvV29ya2Vycy9kZWZsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9zdGF0aWMvd3d3cm9vdC9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNmFmYjlhOGViNDY3YmY0ZDA4MSIsIi8qXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMgR2lsZGFzIExvcm1lYXUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG4gUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XHJcbiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcclxuXHJcbiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXHJcbiB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxyXG5cclxuIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IFxyXG4gbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIFxyXG4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXHJcblxyXG4gMy4gVGhlIG5hbWVzIG9mIHRoZSBhdXRob3JzIG1heSBub3QgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHNcclxuIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxyXG5cclxuIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgYGBBUyBJUycnIEFORCBBTlkgRVhQUkVTU0VEIE9SIElNUExJRUQgV0FSUkFOVElFUyxcclxuIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkRcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBKQ1JBRlQsXHJcbiBJTkMuIE9SIEFOWSBDT05UUklCVVRPUlMgVE8gVEhJUyBTT0ZUV0FSRSBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULFxyXG4gSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVFxyXG4gTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsXHJcbiBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElOR1xyXG4gTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLFxyXG4gRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cclxuICovXHJcblxyXG4vKlxyXG4gKiBUaGlzIHByb2dyYW0gaXMgYmFzZWQgb24gSlpsaWIgMS4wLjIgeW1uaywgSkNyYWZ0LEluYy5cclxuICogSlpsaWIgaXMgYmFzZWQgb24gemxpYi0xLjEuMywgc28gYWxsIGNyZWRpdCBzaG91bGQgZ28gYXV0aG9yc1xyXG4gKiBKZWFuLWxvdXAgR2FpbGx5KGpsb3VwQGd6aXAub3JnKSBhbmQgTWFyayBBZGxlcihtYWRsZXJAYWx1bW5pLmNhbHRlY2guZWR1KVxyXG4gKiBhbmQgY29udHJpYnV0b3JzIG9mIHpsaWIuXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uKG9iaikge1xyXG5cclxuXHQvLyBHbG9iYWxcclxuXHJcblx0dmFyIE1BWF9CSVRTID0gMTU7XHJcblx0dmFyIERfQ09ERVMgPSAzMDtcclxuXHR2YXIgQkxfQ09ERVMgPSAxOTtcclxuXHJcblx0dmFyIExFTkdUSF9DT0RFUyA9IDI5O1xyXG5cdHZhciBMSVRFUkFMUyA9IDI1NjtcclxuXHR2YXIgTF9DT0RFUyA9IChMSVRFUkFMUyArIDEgKyBMRU5HVEhfQ09ERVMpO1xyXG5cdHZhciBIRUFQX1NJWkUgPSAoMiAqIExfQ09ERVMgKyAxKTtcclxuXHJcblx0dmFyIEVORF9CTE9DSyA9IDI1NjtcclxuXHJcblx0Ly8gQml0IGxlbmd0aCBjb2RlcyBtdXN0IG5vdCBleGNlZWQgTUFYX0JMX0JJVFMgYml0c1xyXG5cdHZhciBNQVhfQkxfQklUUyA9IDc7XHJcblxyXG5cdC8vIHJlcGVhdCBwcmV2aW91cyBiaXQgbGVuZ3RoIDMtNiB0aW1lcyAoMiBiaXRzIG9mIHJlcGVhdCBjb3VudClcclxuXHR2YXIgUkVQXzNfNiA9IDE2O1xyXG5cclxuXHQvLyByZXBlYXQgYSB6ZXJvIGxlbmd0aCAzLTEwIHRpbWVzICgzIGJpdHMgb2YgcmVwZWF0IGNvdW50KVxyXG5cdHZhciBSRVBaXzNfMTAgPSAxNztcclxuXHJcblx0Ly8gcmVwZWF0IGEgemVybyBsZW5ndGggMTEtMTM4IHRpbWVzICg3IGJpdHMgb2YgcmVwZWF0IGNvdW50KVxyXG5cdHZhciBSRVBaXzExXzEzOCA9IDE4O1xyXG5cclxuXHQvLyBUaGUgbGVuZ3RocyBvZiB0aGUgYml0IGxlbmd0aCBjb2RlcyBhcmUgc2VudCBpbiBvcmRlciBvZiBkZWNyZWFzaW5nXHJcblx0Ly8gcHJvYmFiaWxpdHksIHRvIGF2b2lkIHRyYW5zbWl0dGluZyB0aGUgbGVuZ3RocyBmb3IgdW51c2VkIGJpdFxyXG5cdC8vIGxlbmd0aCBjb2Rlcy5cclxuXHJcblx0dmFyIEJ1Zl9zaXplID0gOCAqIDI7XHJcblxyXG5cdC8vIEpabGliIHZlcnNpb24gOiBcIjEuMC4yXCJcclxuXHR2YXIgWl9ERUZBVUxUX0NPTVBSRVNTSU9OID0gLTE7XHJcblxyXG5cdC8vIGNvbXByZXNzaW9uIHN0cmF0ZWd5XHJcblx0dmFyIFpfRklMVEVSRUQgPSAxO1xyXG5cdHZhciBaX0hVRkZNQU5fT05MWSA9IDI7XHJcblx0dmFyIFpfREVGQVVMVF9TVFJBVEVHWSA9IDA7XHJcblxyXG5cdHZhciBaX05PX0ZMVVNIID0gMDtcclxuXHR2YXIgWl9QQVJUSUFMX0ZMVVNIID0gMTtcclxuXHR2YXIgWl9GVUxMX0ZMVVNIID0gMztcclxuXHR2YXIgWl9GSU5JU0ggPSA0O1xyXG5cclxuXHR2YXIgWl9PSyA9IDA7XHJcblx0dmFyIFpfU1RSRUFNX0VORCA9IDE7XHJcblx0dmFyIFpfTkVFRF9ESUNUID0gMjtcclxuXHR2YXIgWl9TVFJFQU1fRVJST1IgPSAtMjtcclxuXHR2YXIgWl9EQVRBX0VSUk9SID0gLTM7XHJcblx0dmFyIFpfQlVGX0VSUk9SID0gLTU7XHJcblxyXG5cdC8vIFRyZWVcclxuXHJcblx0Ly8gc2VlIGRlZmluaXRpb24gb2YgYXJyYXkgZGlzdF9jb2RlIGJlbG93XHJcblx0dmFyIF9kaXN0X2NvZGUgPSBbIDAsIDEsIDIsIDMsIDQsIDQsIDUsIDUsIDYsIDYsIDYsIDYsIDcsIDcsIDcsIDcsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDksIDksIDksIDksIDksIDksIDksIDksIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLFxyXG5cdFx0XHQxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMSwgMTEsIDExLCAxMSwgMTEsIDExLCAxMSwgMTEsIDExLCAxMSwgMTEsIDExLCAxMSwgMTEsIDExLCAxMSwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMixcclxuXHRcdFx0MTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMiwgMTIsIDEyLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsXHJcblx0XHRcdDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDEzLCAxMywgMTMsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LFxyXG5cdFx0XHQxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCwgMTQsIDE0LCAxNCxcclxuXHRcdFx0MTQsIDE0LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsXHJcblx0XHRcdDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMTUsIDE1LCAxNSwgMCwgMCwgMTYsIDE3LCAxOCwgMTgsIDE5LCAxOSxcclxuXHRcdFx0MjAsIDIwLCAyMCwgMjAsIDIxLCAyMSwgMjEsIDIxLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsXHJcblx0XHRcdDI0LCAyNCwgMjQsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LFxyXG5cdFx0XHQyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNyxcclxuXHRcdFx0MjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsXHJcblx0XHRcdDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI4LCAyOCwgMjgsIDI5LFxyXG5cdFx0XHQyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSxcclxuXHRcdFx0MjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5LCAyOSwgMjksIDI5IF07XHJcblxyXG5cdGZ1bmN0aW9uIFRyZWUoKSB7XHJcblx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gZHluX3RyZWU7IC8vIHRoZSBkeW5hbWljIHRyZWVcclxuXHRcdC8vIG1heF9jb2RlOyAvLyBsYXJnZXN0IGNvZGUgd2l0aCBub24gemVybyBmcmVxdWVuY3lcclxuXHRcdC8vIHN0YXRfZGVzYzsgLy8gdGhlIGNvcnJlc3BvbmRpbmcgc3RhdGljIHRyZWVcclxuXHJcblx0XHQvLyBDb21wdXRlIHRoZSBvcHRpbWFsIGJpdCBsZW5ndGhzIGZvciBhIHRyZWUgYW5kIHVwZGF0ZSB0aGUgdG90YWwgYml0XHJcblx0XHQvLyBsZW5ndGhcclxuXHRcdC8vIGZvciB0aGUgY3VycmVudCBibG9jay5cclxuXHRcdC8vIElOIGFzc2VydGlvbjogdGhlIGZpZWxkcyBmcmVxIGFuZCBkYWQgYXJlIHNldCwgaGVhcFtoZWFwX21heF0gYW5kXHJcblx0XHQvLyBhYm92ZSBhcmUgdGhlIHRyZWUgbm9kZXMgc29ydGVkIGJ5IGluY3JlYXNpbmcgZnJlcXVlbmN5LlxyXG5cdFx0Ly8gT1VUIGFzc2VydGlvbnM6IHRoZSBmaWVsZCBsZW4gaXMgc2V0IHRvIHRoZSBvcHRpbWFsIGJpdCBsZW5ndGgsIHRoZVxyXG5cdFx0Ly8gYXJyYXkgYmxfY291bnQgY29udGFpbnMgdGhlIGZyZXF1ZW5jaWVzIGZvciBlYWNoIGJpdCBsZW5ndGguXHJcblx0XHQvLyBUaGUgbGVuZ3RoIG9wdF9sZW4gaXMgdXBkYXRlZDsgc3RhdGljX2xlbiBpcyBhbHNvIHVwZGF0ZWQgaWYgc3RyZWUgaXNcclxuXHRcdC8vIG5vdCBudWxsLlxyXG5cdFx0ZnVuY3Rpb24gZ2VuX2JpdGxlbihzKSB7XHJcblx0XHRcdHZhciB0cmVlID0gdGhhdC5keW5fdHJlZTtcclxuXHRcdFx0dmFyIHN0cmVlID0gdGhhdC5zdGF0X2Rlc2Muc3RhdGljX3RyZWU7XHJcblx0XHRcdHZhciBleHRyYSA9IHRoYXQuc3RhdF9kZXNjLmV4dHJhX2JpdHM7XHJcblx0XHRcdHZhciBiYXNlID0gdGhhdC5zdGF0X2Rlc2MuZXh0cmFfYmFzZTtcclxuXHRcdFx0dmFyIG1heF9sZW5ndGggPSB0aGF0LnN0YXRfZGVzYy5tYXhfbGVuZ3RoO1xyXG5cdFx0XHR2YXIgaDsgLy8gaGVhcCBpbmRleFxyXG5cdFx0XHR2YXIgbiwgbTsgLy8gaXRlcmF0ZSBvdmVyIHRoZSB0cmVlIGVsZW1lbnRzXHJcblx0XHRcdHZhciBiaXRzOyAvLyBiaXQgbGVuZ3RoXHJcblx0XHRcdHZhciB4Yml0czsgLy8gZXh0cmEgYml0c1xyXG5cdFx0XHR2YXIgZjsgLy8gZnJlcXVlbmN5XHJcblx0XHRcdHZhciBvdmVyZmxvdyA9IDA7IC8vIG51bWJlciBvZiBlbGVtZW50cyB3aXRoIGJpdCBsZW5ndGggdG9vIGxhcmdlXHJcblxyXG5cdFx0XHRmb3IgKGJpdHMgPSAwOyBiaXRzIDw9IE1BWF9CSVRTOyBiaXRzKyspXHJcblx0XHRcdFx0cy5ibF9jb3VudFtiaXRzXSA9IDA7XHJcblxyXG5cdFx0XHQvLyBJbiBhIGZpcnN0IHBhc3MsIGNvbXB1dGUgdGhlIG9wdGltYWwgYml0IGxlbmd0aHMgKHdoaWNoIG1heVxyXG5cdFx0XHQvLyBvdmVyZmxvdyBpbiB0aGUgY2FzZSBvZiB0aGUgYml0IGxlbmd0aCB0cmVlKS5cclxuXHRcdFx0dHJlZVtzLmhlYXBbcy5oZWFwX21heF0gKiAyICsgMV0gPSAwOyAvLyByb290IG9mIHRoZSBoZWFwXHJcblxyXG5cdFx0XHRmb3IgKGggPSBzLmhlYXBfbWF4ICsgMTsgaCA8IEhFQVBfU0laRTsgaCsrKSB7XHJcblx0XHRcdFx0biA9IHMuaGVhcFtoXTtcclxuXHRcdFx0XHRiaXRzID0gdHJlZVt0cmVlW24gKiAyICsgMV0gKiAyICsgMV0gKyAxO1xyXG5cdFx0XHRcdGlmIChiaXRzID4gbWF4X2xlbmd0aCkge1xyXG5cdFx0XHRcdFx0Yml0cyA9IG1heF9sZW5ndGg7XHJcblx0XHRcdFx0XHRvdmVyZmxvdysrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0cmVlW24gKiAyICsgMV0gPSBiaXRzO1xyXG5cdFx0XHRcdC8vIFdlIG92ZXJ3cml0ZSB0cmVlW24qMisxXSB3aGljaCBpcyBubyBsb25nZXIgbmVlZGVkXHJcblxyXG5cdFx0XHRcdGlmIChuID4gdGhhdC5tYXhfY29kZSlcclxuXHRcdFx0XHRcdGNvbnRpbnVlOyAvLyBub3QgYSBsZWFmIG5vZGVcclxuXHJcblx0XHRcdFx0cy5ibF9jb3VudFtiaXRzXSsrO1xyXG5cdFx0XHRcdHhiaXRzID0gMDtcclxuXHRcdFx0XHRpZiAobiA+PSBiYXNlKVxyXG5cdFx0XHRcdFx0eGJpdHMgPSBleHRyYVtuIC0gYmFzZV07XHJcblx0XHRcdFx0ZiA9IHRyZWVbbiAqIDJdO1xyXG5cdFx0XHRcdHMub3B0X2xlbiArPSBmICogKGJpdHMgKyB4Yml0cyk7XHJcblx0XHRcdFx0aWYgKHN0cmVlKVxyXG5cdFx0XHRcdFx0cy5zdGF0aWNfbGVuICs9IGYgKiAoc3RyZWVbbiAqIDIgKyAxXSArIHhiaXRzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAob3ZlcmZsb3cgPT09IDApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0Ly8gVGhpcyBoYXBwZW5zIGZvciBleGFtcGxlIG9uIG9iajIgYW5kIHBpYyBvZiB0aGUgQ2FsZ2FyeSBjb3JwdXNcclxuXHRcdFx0Ly8gRmluZCB0aGUgZmlyc3QgYml0IGxlbmd0aCB3aGljaCBjb3VsZCBpbmNyZWFzZTpcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdGJpdHMgPSBtYXhfbGVuZ3RoIC0gMTtcclxuXHRcdFx0XHR3aGlsZSAocy5ibF9jb3VudFtiaXRzXSA9PT0gMClcclxuXHRcdFx0XHRcdGJpdHMtLTtcclxuXHRcdFx0XHRzLmJsX2NvdW50W2JpdHNdLS07IC8vIG1vdmUgb25lIGxlYWYgZG93biB0aGUgdHJlZVxyXG5cdFx0XHRcdHMuYmxfY291bnRbYml0cyArIDFdICs9IDI7IC8vIG1vdmUgb25lIG92ZXJmbG93IGl0ZW0gYXMgaXRzIGJyb3RoZXJcclxuXHRcdFx0XHRzLmJsX2NvdW50W21heF9sZW5ndGhdLS07XHJcblx0XHRcdFx0Ly8gVGhlIGJyb3RoZXIgb2YgdGhlIG92ZXJmbG93IGl0ZW0gYWxzbyBtb3ZlcyBvbmUgc3RlcCB1cCxcclxuXHRcdFx0XHQvLyBidXQgdGhpcyBkb2VzIG5vdCBhZmZlY3QgYmxfY291bnRbbWF4X2xlbmd0aF1cclxuXHRcdFx0XHRvdmVyZmxvdyAtPSAyO1xyXG5cdFx0XHR9IHdoaWxlIChvdmVyZmxvdyA+IDApO1xyXG5cclxuXHRcdFx0Zm9yIChiaXRzID0gbWF4X2xlbmd0aDsgYml0cyAhPT0gMDsgYml0cy0tKSB7XHJcblx0XHRcdFx0biA9IHMuYmxfY291bnRbYml0c107XHJcblx0XHRcdFx0d2hpbGUgKG4gIT09IDApIHtcclxuXHRcdFx0XHRcdG0gPSBzLmhlYXBbLS1oXTtcclxuXHRcdFx0XHRcdGlmIChtID4gdGhhdC5tYXhfY29kZSlcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHRpZiAodHJlZVttICogMiArIDFdICE9IGJpdHMpIHtcclxuXHRcdFx0XHRcdFx0cy5vcHRfbGVuICs9IChiaXRzIC0gdHJlZVttICogMiArIDFdKSAqIHRyZWVbbSAqIDJdO1xyXG5cdFx0XHRcdFx0XHR0cmVlW20gKiAyICsgMV0gPSBiaXRzO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bi0tO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJldmVyc2UgdGhlIGZpcnN0IGxlbiBiaXRzIG9mIGEgY29kZSwgdXNpbmcgc3RyYWlnaHRmb3J3YXJkIGNvZGUgKGFcclxuXHRcdC8vIGZhc3RlclxyXG5cdFx0Ly8gbWV0aG9kIHdvdWxkIHVzZSBhIHRhYmxlKVxyXG5cdFx0Ly8gSU4gYXNzZXJ0aW9uOiAxIDw9IGxlbiA8PSAxNVxyXG5cdFx0ZnVuY3Rpb24gYmlfcmV2ZXJzZShjb2RlLCAvLyB0aGUgdmFsdWUgdG8gaW52ZXJ0XHJcblx0XHRsZW4gLy8gaXRzIGJpdCBsZW5ndGhcclxuXHRcdCkge1xyXG5cdFx0XHR2YXIgcmVzID0gMDtcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdHJlcyB8PSBjb2RlICYgMTtcclxuXHRcdFx0XHRjb2RlID4+Pj0gMTtcclxuXHRcdFx0XHRyZXMgPDw9IDE7XHJcblx0XHRcdH0gd2hpbGUgKC0tbGVuID4gMCk7XHJcblx0XHRcdHJldHVybiByZXMgPj4+IDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gR2VuZXJhdGUgdGhlIGNvZGVzIGZvciBhIGdpdmVuIHRyZWUgYW5kIGJpdCBjb3VudHMgKHdoaWNoIG5lZWQgbm90IGJlXHJcblx0XHQvLyBvcHRpbWFsKS5cclxuXHRcdC8vIElOIGFzc2VydGlvbjogdGhlIGFycmF5IGJsX2NvdW50IGNvbnRhaW5zIHRoZSBiaXQgbGVuZ3RoIHN0YXRpc3RpY3MgZm9yXHJcblx0XHQvLyB0aGUgZ2l2ZW4gdHJlZSBhbmQgdGhlIGZpZWxkIGxlbiBpcyBzZXQgZm9yIGFsbCB0cmVlIGVsZW1lbnRzLlxyXG5cdFx0Ly8gT1VUIGFzc2VydGlvbjogdGhlIGZpZWxkIGNvZGUgaXMgc2V0IGZvciBhbGwgdHJlZSBlbGVtZW50cyBvZiBub25cclxuXHRcdC8vIHplcm8gY29kZSBsZW5ndGguXHJcblx0XHRmdW5jdGlvbiBnZW5fY29kZXModHJlZSwgLy8gdGhlIHRyZWUgdG8gZGVjb3JhdGVcclxuXHRcdG1heF9jb2RlLCAvLyBsYXJnZXN0IGNvZGUgd2l0aCBub24gemVybyBmcmVxdWVuY3lcclxuXHRcdGJsX2NvdW50IC8vIG51bWJlciBvZiBjb2RlcyBhdCBlYWNoIGJpdCBsZW5ndGhcclxuXHRcdCkge1xyXG5cdFx0XHR2YXIgbmV4dF9jb2RlID0gW107IC8vIG5leHQgY29kZSB2YWx1ZSBmb3IgZWFjaFxyXG5cdFx0XHQvLyBiaXQgbGVuZ3RoXHJcblx0XHRcdHZhciBjb2RlID0gMDsgLy8gcnVubmluZyBjb2RlIHZhbHVlXHJcblx0XHRcdHZhciBiaXRzOyAvLyBiaXQgaW5kZXhcclxuXHRcdFx0dmFyIG47IC8vIGNvZGUgaW5kZXhcclxuXHRcdFx0dmFyIGxlbjtcclxuXHJcblx0XHRcdC8vIFRoZSBkaXN0cmlidXRpb24gY291bnRzIGFyZSBmaXJzdCB1c2VkIHRvIGdlbmVyYXRlIHRoZSBjb2RlIHZhbHVlc1xyXG5cdFx0XHQvLyB3aXRob3V0IGJpdCByZXZlcnNhbC5cclxuXHRcdFx0Zm9yIChiaXRzID0gMTsgYml0cyA8PSBNQVhfQklUUzsgYml0cysrKSB7XHJcblx0XHRcdFx0bmV4dF9jb2RlW2JpdHNdID0gY29kZSA9ICgoY29kZSArIGJsX2NvdW50W2JpdHMgLSAxXSkgPDwgMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENoZWNrIHRoYXQgdGhlIGJpdCBjb3VudHMgaW4gYmxfY291bnQgYXJlIGNvbnNpc3RlbnQuIFRoZSBsYXN0IGNvZGVcclxuXHRcdFx0Ly8gbXVzdCBiZSBhbGwgb25lcy5cclxuXHRcdFx0Ly8gQXNzZXJ0IChjb2RlICsgYmxfY291bnRbTUFYX0JJVFNdLTEgPT0gKDE8PE1BWF9CSVRTKS0xLFxyXG5cdFx0XHQvLyBcImluY29uc2lzdGVudCBiaXQgY291bnRzXCIpO1xyXG5cdFx0XHQvLyBUcmFjZXYoKHN0ZGVycixcIlxcbmdlbl9jb2RlczogbWF4X2NvZGUgJWQgXCIsIG1heF9jb2RlKSk7XHJcblxyXG5cdFx0XHRmb3IgKG4gPSAwOyBuIDw9IG1heF9jb2RlOyBuKyspIHtcclxuXHRcdFx0XHRsZW4gPSB0cmVlW24gKiAyICsgMV07XHJcblx0XHRcdFx0aWYgKGxlbiA9PT0gMClcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdC8vIE5vdyByZXZlcnNlIHRoZSBiaXRzXHJcblx0XHRcdFx0dHJlZVtuICogMl0gPSBiaV9yZXZlcnNlKG5leHRfY29kZVtsZW5dKyssIGxlbik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBDb25zdHJ1Y3Qgb25lIEh1ZmZtYW4gdHJlZSBhbmQgYXNzaWducyB0aGUgY29kZSBiaXQgc3RyaW5ncyBhbmQgbGVuZ3Rocy5cclxuXHRcdC8vIFVwZGF0ZSB0aGUgdG90YWwgYml0IGxlbmd0aCBmb3IgdGhlIGN1cnJlbnQgYmxvY2suXHJcblx0XHQvLyBJTiBhc3NlcnRpb246IHRoZSBmaWVsZCBmcmVxIGlzIHNldCBmb3IgYWxsIHRyZWUgZWxlbWVudHMuXHJcblx0XHQvLyBPVVQgYXNzZXJ0aW9uczogdGhlIGZpZWxkcyBsZW4gYW5kIGNvZGUgYXJlIHNldCB0byB0aGUgb3B0aW1hbCBiaXQgbGVuZ3RoXHJcblx0XHQvLyBhbmQgY29ycmVzcG9uZGluZyBjb2RlLiBUaGUgbGVuZ3RoIG9wdF9sZW4gaXMgdXBkYXRlZDsgc3RhdGljX2xlbiBpc1xyXG5cdFx0Ly8gYWxzbyB1cGRhdGVkIGlmIHN0cmVlIGlzIG5vdCBudWxsLiBUaGUgZmllbGQgbWF4X2NvZGUgaXMgc2V0LlxyXG5cdFx0dGhhdC5idWlsZF90cmVlID0gZnVuY3Rpb24ocykge1xyXG5cdFx0XHR2YXIgdHJlZSA9IHRoYXQuZHluX3RyZWU7XHJcblx0XHRcdHZhciBzdHJlZSA9IHRoYXQuc3RhdF9kZXNjLnN0YXRpY190cmVlO1xyXG5cdFx0XHR2YXIgZWxlbXMgPSB0aGF0LnN0YXRfZGVzYy5lbGVtcztcclxuXHRcdFx0dmFyIG4sIG07IC8vIGl0ZXJhdGUgb3ZlciBoZWFwIGVsZW1lbnRzXHJcblx0XHRcdHZhciBtYXhfY29kZSA9IC0xOyAvLyBsYXJnZXN0IGNvZGUgd2l0aCBub24gemVybyBmcmVxdWVuY3lcclxuXHRcdFx0dmFyIG5vZGU7IC8vIG5ldyBub2RlIGJlaW5nIGNyZWF0ZWRcclxuXHJcblx0XHRcdC8vIENvbnN0cnVjdCB0aGUgaW5pdGlhbCBoZWFwLCB3aXRoIGxlYXN0IGZyZXF1ZW50IGVsZW1lbnQgaW5cclxuXHRcdFx0Ly8gaGVhcFsxXS4gVGhlIHNvbnMgb2YgaGVhcFtuXSBhcmUgaGVhcFsyKm5dIGFuZCBoZWFwWzIqbisxXS5cclxuXHRcdFx0Ly8gaGVhcFswXSBpcyBub3QgdXNlZC5cclxuXHRcdFx0cy5oZWFwX2xlbiA9IDA7XHJcblx0XHRcdHMuaGVhcF9tYXggPSBIRUFQX1NJWkU7XHJcblxyXG5cdFx0XHRmb3IgKG4gPSAwOyBuIDwgZWxlbXM7IG4rKykge1xyXG5cdFx0XHRcdGlmICh0cmVlW24gKiAyXSAhPT0gMCkge1xyXG5cdFx0XHRcdFx0cy5oZWFwWysrcy5oZWFwX2xlbl0gPSBtYXhfY29kZSA9IG47XHJcblx0XHRcdFx0XHRzLmRlcHRoW25dID0gMDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dHJlZVtuICogMiArIDFdID0gMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFRoZSBwa3ppcCBmb3JtYXQgcmVxdWlyZXMgdGhhdCBhdCBsZWFzdCBvbmUgZGlzdGFuY2UgY29kZSBleGlzdHMsXHJcblx0XHRcdC8vIGFuZCB0aGF0IGF0IGxlYXN0IG9uZSBiaXQgc2hvdWxkIGJlIHNlbnQgZXZlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZVxyXG5cdFx0XHQvLyBwb3NzaWJsZSBjb2RlLiBTbyB0byBhdm9pZCBzcGVjaWFsIGNoZWNrcyBsYXRlciBvbiB3ZSBmb3JjZSBhdCBsZWFzdFxyXG5cdFx0XHQvLyB0d28gY29kZXMgb2Ygbm9uIHplcm8gZnJlcXVlbmN5LlxyXG5cdFx0XHR3aGlsZSAocy5oZWFwX2xlbiA8IDIpIHtcclxuXHRcdFx0XHRub2RlID0gcy5oZWFwWysrcy5oZWFwX2xlbl0gPSBtYXhfY29kZSA8IDIgPyArK21heF9jb2RlIDogMDtcclxuXHRcdFx0XHR0cmVlW25vZGUgKiAyXSA9IDE7XHJcblx0XHRcdFx0cy5kZXB0aFtub2RlXSA9IDA7XHJcblx0XHRcdFx0cy5vcHRfbGVuLS07XHJcblx0XHRcdFx0aWYgKHN0cmVlKVxyXG5cdFx0XHRcdFx0cy5zdGF0aWNfbGVuIC09IHN0cmVlW25vZGUgKiAyICsgMV07XHJcblx0XHRcdFx0Ly8gbm9kZSBpcyAwIG9yIDEgc28gaXQgZG9lcyBub3QgaGF2ZSBleHRyYSBiaXRzXHJcblx0XHRcdH1cclxuXHRcdFx0dGhhdC5tYXhfY29kZSA9IG1heF9jb2RlO1xyXG5cclxuXHRcdFx0Ly8gVGhlIGVsZW1lbnRzIGhlYXBbaGVhcF9sZW4vMisxIC4uIGhlYXBfbGVuXSBhcmUgbGVhdmVzIG9mIHRoZSB0cmVlLFxyXG5cdFx0XHQvLyBlc3RhYmxpc2ggc3ViLWhlYXBzIG9mIGluY3JlYXNpbmcgbGVuZ3RoczpcclxuXHJcblx0XHRcdGZvciAobiA9IE1hdGguZmxvb3Iocy5oZWFwX2xlbiAvIDIpOyBuID49IDE7IG4tLSlcclxuXHRcdFx0XHRzLnBxZG93bmhlYXAodHJlZSwgbik7XHJcblxyXG5cdFx0XHQvLyBDb25zdHJ1Y3QgdGhlIEh1ZmZtYW4gdHJlZSBieSByZXBlYXRlZGx5IGNvbWJpbmluZyB0aGUgbGVhc3QgdHdvXHJcblx0XHRcdC8vIGZyZXF1ZW50IG5vZGVzLlxyXG5cclxuXHRcdFx0bm9kZSA9IGVsZW1zOyAvLyBuZXh0IGludGVybmFsIG5vZGUgb2YgdGhlIHRyZWVcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdC8vIG4gPSBub2RlIG9mIGxlYXN0IGZyZXF1ZW5jeVxyXG5cdFx0XHRcdG4gPSBzLmhlYXBbMV07XHJcblx0XHRcdFx0cy5oZWFwWzFdID0gcy5oZWFwW3MuaGVhcF9sZW4tLV07XHJcblx0XHRcdFx0cy5wcWRvd25oZWFwKHRyZWUsIDEpO1xyXG5cdFx0XHRcdG0gPSBzLmhlYXBbMV07IC8vIG0gPSBub2RlIG9mIG5leHQgbGVhc3QgZnJlcXVlbmN5XHJcblxyXG5cdFx0XHRcdHMuaGVhcFstLXMuaGVhcF9tYXhdID0gbjsgLy8ga2VlcCB0aGUgbm9kZXMgc29ydGVkIGJ5IGZyZXF1ZW5jeVxyXG5cdFx0XHRcdHMuaGVhcFstLXMuaGVhcF9tYXhdID0gbTtcclxuXHJcblx0XHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IG5vZGUgZmF0aGVyIG9mIG4gYW5kIG1cclxuXHRcdFx0XHR0cmVlW25vZGUgKiAyXSA9ICh0cmVlW24gKiAyXSArIHRyZWVbbSAqIDJdKTtcclxuXHRcdFx0XHRzLmRlcHRoW25vZGVdID0gTWF0aC5tYXgocy5kZXB0aFtuXSwgcy5kZXB0aFttXSkgKyAxO1xyXG5cdFx0XHRcdHRyZWVbbiAqIDIgKyAxXSA9IHRyZWVbbSAqIDIgKyAxXSA9IG5vZGU7XHJcblxyXG5cdFx0XHRcdC8vIGFuZCBpbnNlcnQgdGhlIG5ldyBub2RlIGluIHRoZSBoZWFwXHJcblx0XHRcdFx0cy5oZWFwWzFdID0gbm9kZSsrO1xyXG5cdFx0XHRcdHMucHFkb3duaGVhcCh0cmVlLCAxKTtcclxuXHRcdFx0fSB3aGlsZSAocy5oZWFwX2xlbiA+PSAyKTtcclxuXHJcblx0XHRcdHMuaGVhcFstLXMuaGVhcF9tYXhdID0gcy5oZWFwWzFdO1xyXG5cclxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgdGhlIGZpZWxkcyBmcmVxIGFuZCBkYWQgYXJlIHNldC4gV2UgY2FuIG5vd1xyXG5cdFx0XHQvLyBnZW5lcmF0ZSB0aGUgYml0IGxlbmd0aHMuXHJcblxyXG5cdFx0XHRnZW5fYml0bGVuKHMpO1xyXG5cclxuXHRcdFx0Ly8gVGhlIGZpZWxkIGxlbiBpcyBub3cgc2V0LCB3ZSBjYW4gZ2VuZXJhdGUgdGhlIGJpdCBjb2Rlc1xyXG5cdFx0XHRnZW5fY29kZXModHJlZSwgdGhhdC5tYXhfY29kZSwgcy5ibF9jb3VudCk7XHJcblx0XHR9O1xyXG5cclxuXHR9XHJcblxyXG5cdFRyZWUuX2xlbmd0aF9jb2RlID0gWyAwLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA4LCA5LCA5LCAxMCwgMTAsIDExLCAxMSwgMTIsIDEyLCAxMiwgMTIsIDEzLCAxMywgMTMsIDEzLCAxNCwgMTQsIDE0LCAxNCwgMTUsIDE1LCAxNSwgMTUsIDE2LCAxNiwgMTYsIDE2LFxyXG5cdFx0XHQxNiwgMTYsIDE2LCAxNiwgMTcsIDE3LCAxNywgMTcsIDE3LCAxNywgMTcsIDE3LCAxOCwgMTgsIDE4LCAxOCwgMTgsIDE4LCAxOCwgMTgsIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCxcclxuXHRcdFx0MjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsXHJcblx0XHRcdDIyLCAyMiwgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LFxyXG5cdFx0XHQyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNSxcclxuXHRcdFx0MjUsIDI1LCAyNSwgMjUsIDI1LCAyNSwgMjUsIDI1LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsIDI2LCAyNiwgMjYsXHJcblx0XHRcdDI2LCAyNiwgMjYsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyNywgMjcsIDI3LCAyOCBdO1xyXG5cclxuXHRUcmVlLmJhc2VfbGVuZ3RoID0gWyAwLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxMCwgMTIsIDE0LCAxNiwgMjAsIDI0LCAyOCwgMzIsIDQwLCA0OCwgNTYsIDY0LCA4MCwgOTYsIDExMiwgMTI4LCAxNjAsIDE5MiwgMjI0LCAwIF07XHJcblxyXG5cdFRyZWUuYmFzZV9kaXN0ID0gWyAwLCAxLCAyLCAzLCA0LCA2LCA4LCAxMiwgMTYsIDI0LCAzMiwgNDgsIDY0LCA5NiwgMTI4LCAxOTIsIDI1NiwgMzg0LCA1MTIsIDc2OCwgMTAyNCwgMTUzNiwgMjA0OCwgMzA3MiwgNDA5NiwgNjE0NCwgODE5MiwgMTIyODgsIDE2Mzg0LFxyXG5cdFx0XHQyNDU3NiBdO1xyXG5cclxuXHQvLyBNYXBwaW5nIGZyb20gYSBkaXN0YW5jZSB0byBhIGRpc3RhbmNlIGNvZGUuIGRpc3QgaXMgdGhlIGRpc3RhbmNlIC0gMSBhbmRcclxuXHQvLyBtdXN0IG5vdCBoYXZlIHNpZGUgZWZmZWN0cy4gX2Rpc3RfY29kZVsyNTZdIGFuZCBfZGlzdF9jb2RlWzI1N10gYXJlIG5ldmVyXHJcblx0Ly8gdXNlZC5cclxuXHRUcmVlLmRfY29kZSA9IGZ1bmN0aW9uKGRpc3QpIHtcclxuXHRcdHJldHVybiAoKGRpc3QpIDwgMjU2ID8gX2Rpc3RfY29kZVtkaXN0XSA6IF9kaXN0X2NvZGVbMjU2ICsgKChkaXN0KSA+Pj4gNyldKTtcclxuXHR9O1xyXG5cclxuXHQvLyBleHRyYSBiaXRzIGZvciBlYWNoIGxlbmd0aCBjb2RlXHJcblx0VHJlZS5leHRyYV9sYml0cyA9IFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMiwgMiwgMiwgMiwgMywgMywgMywgMywgNCwgNCwgNCwgNCwgNSwgNSwgNSwgNSwgMCBdO1xyXG5cclxuXHQvLyBleHRyYSBiaXRzIGZvciBlYWNoIGRpc3RhbmNlIGNvZGVcclxuXHRUcmVlLmV4dHJhX2RiaXRzID0gWyAwLCAwLCAwLCAwLCAxLCAxLCAyLCAyLCAzLCAzLCA0LCA0LCA1LCA1LCA2LCA2LCA3LCA3LCA4LCA4LCA5LCA5LCAxMCwgMTAsIDExLCAxMSwgMTIsIDEyLCAxMywgMTMgXTtcclxuXHJcblx0Ly8gZXh0cmEgYml0cyBmb3IgZWFjaCBiaXQgbGVuZ3RoIGNvZGVcclxuXHRUcmVlLmV4dHJhX2JsYml0cyA9IFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMiwgMywgNyBdO1xyXG5cclxuXHRUcmVlLmJsX29yZGVyID0gWyAxNiwgMTcsIDE4LCAwLCA4LCA3LCA5LCA2LCAxMCwgNSwgMTEsIDQsIDEyLCAzLCAxMywgMiwgMTQsIDEsIDE1IF07XHJcblxyXG5cdC8vIFN0YXRpY1RyZWVcclxuXHJcblx0ZnVuY3Rpb24gU3RhdGljVHJlZShzdGF0aWNfdHJlZSwgZXh0cmFfYml0cywgZXh0cmFfYmFzZSwgZWxlbXMsIG1heF9sZW5ndGgpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHRcdHRoYXQuc3RhdGljX3RyZWUgPSBzdGF0aWNfdHJlZTtcclxuXHRcdHRoYXQuZXh0cmFfYml0cyA9IGV4dHJhX2JpdHM7XHJcblx0XHR0aGF0LmV4dHJhX2Jhc2UgPSBleHRyYV9iYXNlO1xyXG5cdFx0dGhhdC5lbGVtcyA9IGVsZW1zO1xyXG5cdFx0dGhhdC5tYXhfbGVuZ3RoID0gbWF4X2xlbmd0aDtcclxuXHR9XHJcblxyXG5cdFN0YXRpY1RyZWUuc3RhdGljX2x0cmVlID0gWyAxMiwgOCwgMTQwLCA4LCA3NiwgOCwgMjA0LCA4LCA0NCwgOCwgMTcyLCA4LCAxMDgsIDgsIDIzNiwgOCwgMjgsIDgsIDE1NiwgOCwgOTIsIDgsIDIyMCwgOCwgNjAsIDgsIDE4OCwgOCwgMTI0LCA4LCAyNTIsIDgsIDIsIDgsXHJcblx0XHRcdDEzMCwgOCwgNjYsIDgsIDE5NCwgOCwgMzQsIDgsIDE2MiwgOCwgOTgsIDgsIDIyNiwgOCwgMTgsIDgsIDE0NiwgOCwgODIsIDgsIDIxMCwgOCwgNTAsIDgsIDE3OCwgOCwgMTE0LCA4LCAyNDIsIDgsIDEwLCA4LCAxMzgsIDgsIDc0LCA4LCAyMDIsIDgsIDQyLFxyXG5cdFx0XHQ4LCAxNzAsIDgsIDEwNiwgOCwgMjM0LCA4LCAyNiwgOCwgMTU0LCA4LCA5MCwgOCwgMjE4LCA4LCA1OCwgOCwgMTg2LCA4LCAxMjIsIDgsIDI1MCwgOCwgNiwgOCwgMTM0LCA4LCA3MCwgOCwgMTk4LCA4LCAzOCwgOCwgMTY2LCA4LCAxMDIsIDgsIDIzMCwgOCxcclxuXHRcdFx0MjIsIDgsIDE1MCwgOCwgODYsIDgsIDIxNCwgOCwgNTQsIDgsIDE4MiwgOCwgMTE4LCA4LCAyNDYsIDgsIDE0LCA4LCAxNDIsIDgsIDc4LCA4LCAyMDYsIDgsIDQ2LCA4LCAxNzQsIDgsIDExMCwgOCwgMjM4LCA4LCAzMCwgOCwgMTU4LCA4LCA5NCwgOCxcclxuXHRcdFx0MjIyLCA4LCA2MiwgOCwgMTkwLCA4LCAxMjYsIDgsIDI1NCwgOCwgMSwgOCwgMTI5LCA4LCA2NSwgOCwgMTkzLCA4LCAzMywgOCwgMTYxLCA4LCA5NywgOCwgMjI1LCA4LCAxNywgOCwgMTQ1LCA4LCA4MSwgOCwgMjA5LCA4LCA0OSwgOCwgMTc3LCA4LCAxMTMsXHJcblx0XHRcdDgsIDI0MSwgOCwgOSwgOCwgMTM3LCA4LCA3MywgOCwgMjAxLCA4LCA0MSwgOCwgMTY5LCA4LCAxMDUsIDgsIDIzMywgOCwgMjUsIDgsIDE1MywgOCwgODksIDgsIDIxNywgOCwgNTcsIDgsIDE4NSwgOCwgMTIxLCA4LCAyNDksIDgsIDUsIDgsIDEzMywgOCxcclxuXHRcdFx0NjksIDgsIDE5NywgOCwgMzcsIDgsIDE2NSwgOCwgMTAxLCA4LCAyMjksIDgsIDIxLCA4LCAxNDksIDgsIDg1LCA4LCAyMTMsIDgsIDUzLCA4LCAxODEsIDgsIDExNywgOCwgMjQ1LCA4LCAxMywgOCwgMTQxLCA4LCA3NywgOCwgMjA1LCA4LCA0NSwgOCxcclxuXHRcdFx0MTczLCA4LCAxMDksIDgsIDIzNywgOCwgMjksIDgsIDE1NywgOCwgOTMsIDgsIDIyMSwgOCwgNjEsIDgsIDE4OSwgOCwgMTI1LCA4LCAyNTMsIDgsIDE5LCA5LCAyNzUsIDksIDE0NywgOSwgNDAzLCA5LCA4MywgOSwgMzM5LCA5LCAyMTEsIDksIDQ2NywgOSxcclxuXHRcdFx0NTEsIDksIDMwNywgOSwgMTc5LCA5LCA0MzUsIDksIDExNSwgOSwgMzcxLCA5LCAyNDMsIDksIDQ5OSwgOSwgMTEsIDksIDI2NywgOSwgMTM5LCA5LCAzOTUsIDksIDc1LCA5LCAzMzEsIDksIDIwMywgOSwgNDU5LCA5LCA0MywgOSwgMjk5LCA5LCAxNzEsIDksXHJcblx0XHRcdDQyNywgOSwgMTA3LCA5LCAzNjMsIDksIDIzNSwgOSwgNDkxLCA5LCAyNywgOSwgMjgzLCA5LCAxNTUsIDksIDQxMSwgOSwgOTEsIDksIDM0NywgOSwgMjE5LCA5LCA0NzUsIDksIDU5LCA5LCAzMTUsIDksIDE4NywgOSwgNDQzLCA5LCAxMjMsIDksIDM3OSxcclxuXHRcdFx0OSwgMjUxLCA5LCA1MDcsIDksIDcsIDksIDI2MywgOSwgMTM1LCA5LCAzOTEsIDksIDcxLCA5LCAzMjcsIDksIDE5OSwgOSwgNDU1LCA5LCAzOSwgOSwgMjk1LCA5LCAxNjcsIDksIDQyMywgOSwgMTAzLCA5LCAzNTksIDksIDIzMSwgOSwgNDg3LCA5LCAyMyxcclxuXHRcdFx0OSwgMjc5LCA5LCAxNTEsIDksIDQwNywgOSwgODcsIDksIDM0MywgOSwgMjE1LCA5LCA0NzEsIDksIDU1LCA5LCAzMTEsIDksIDE4MywgOSwgNDM5LCA5LCAxMTksIDksIDM3NSwgOSwgMjQ3LCA5LCA1MDMsIDksIDE1LCA5LCAyNzEsIDksIDE0MywgOSxcclxuXHRcdFx0Mzk5LCA5LCA3OSwgOSwgMzM1LCA5LCAyMDcsIDksIDQ2MywgOSwgNDcsIDksIDMwMywgOSwgMTc1LCA5LCA0MzEsIDksIDExMSwgOSwgMzY3LCA5LCAyMzksIDksIDQ5NSwgOSwgMzEsIDksIDI4NywgOSwgMTU5LCA5LCA0MTUsIDksIDk1LCA5LCAzNTEsIDksXHJcblx0XHRcdDIyMywgOSwgNDc5LCA5LCA2MywgOSwgMzE5LCA5LCAxOTEsIDksIDQ0NywgOSwgMTI3LCA5LCAzODMsIDksIDI1NSwgOSwgNTExLCA5LCAwLCA3LCA2NCwgNywgMzIsIDcsIDk2LCA3LCAxNiwgNywgODAsIDcsIDQ4LCA3LCAxMTIsIDcsIDgsIDcsIDcyLCA3LFxyXG5cdFx0XHQ0MCwgNywgMTA0LCA3LCAyNCwgNywgODgsIDcsIDU2LCA3LCAxMjAsIDcsIDQsIDcsIDY4LCA3LCAzNiwgNywgMTAwLCA3LCAyMCwgNywgODQsIDcsIDUyLCA3LCAxMTYsIDcsIDMsIDgsIDEzMSwgOCwgNjcsIDgsIDE5NSwgOCwgMzUsIDgsIDE2MywgOCxcclxuXHRcdFx0OTksIDgsIDIyNywgOCBdO1xyXG5cclxuXHRTdGF0aWNUcmVlLnN0YXRpY19kdHJlZSA9IFsgMCwgNSwgMTYsIDUsIDgsIDUsIDI0LCA1LCA0LCA1LCAyMCwgNSwgMTIsIDUsIDI4LCA1LCAyLCA1LCAxOCwgNSwgMTAsIDUsIDI2LCA1LCA2LCA1LCAyMiwgNSwgMTQsIDUsIDMwLCA1LCAxLCA1LCAxNywgNSwgOSwgNSxcclxuXHRcdFx0MjUsIDUsIDUsIDUsIDIxLCA1LCAxMywgNSwgMjksIDUsIDMsIDUsIDE5LCA1LCAxMSwgNSwgMjcsIDUsIDcsIDUsIDIzLCA1IF07XHJcblxyXG5cdFN0YXRpY1RyZWUuc3RhdGljX2xfZGVzYyA9IG5ldyBTdGF0aWNUcmVlKFN0YXRpY1RyZWUuc3RhdGljX2x0cmVlLCBUcmVlLmV4dHJhX2xiaXRzLCBMSVRFUkFMUyArIDEsIExfQ09ERVMsIE1BWF9CSVRTKTtcclxuXHJcblx0U3RhdGljVHJlZS5zdGF0aWNfZF9kZXNjID0gbmV3IFN0YXRpY1RyZWUoU3RhdGljVHJlZS5zdGF0aWNfZHRyZWUsIFRyZWUuZXh0cmFfZGJpdHMsIDAsIERfQ09ERVMsIE1BWF9CSVRTKTtcclxuXHJcblx0U3RhdGljVHJlZS5zdGF0aWNfYmxfZGVzYyA9IG5ldyBTdGF0aWNUcmVlKG51bGwsIFRyZWUuZXh0cmFfYmxiaXRzLCAwLCBCTF9DT0RFUywgTUFYX0JMX0JJVFMpO1xyXG5cclxuXHQvLyBEZWZsYXRlXHJcblxyXG5cdHZhciBNQVhfTUVNX0xFVkVMID0gOTtcclxuXHR2YXIgREVGX01FTV9MRVZFTCA9IDg7XHJcblxyXG5cdGZ1bmN0aW9uIENvbmZpZyhnb29kX2xlbmd0aCwgbWF4X2xhenksIG5pY2VfbGVuZ3RoLCBtYXhfY2hhaW4sIGZ1bmMpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHRcdHRoYXQuZ29vZF9sZW5ndGggPSBnb29kX2xlbmd0aDtcclxuXHRcdHRoYXQubWF4X2xhenkgPSBtYXhfbGF6eTtcclxuXHRcdHRoYXQubmljZV9sZW5ndGggPSBuaWNlX2xlbmd0aDtcclxuXHRcdHRoYXQubWF4X2NoYWluID0gbWF4X2NoYWluO1xyXG5cdFx0dGhhdC5mdW5jID0gZnVuYztcclxuXHR9XHJcblxyXG5cdHZhciBTVE9SRUQgPSAwO1xyXG5cdHZhciBGQVNUID0gMTtcclxuXHR2YXIgU0xPVyA9IDI7XHJcblx0dmFyIGNvbmZpZ190YWJsZSA9IFsgbmV3IENvbmZpZygwLCAwLCAwLCAwLCBTVE9SRUQpLCBuZXcgQ29uZmlnKDQsIDQsIDgsIDQsIEZBU1QpLCBuZXcgQ29uZmlnKDQsIDUsIDE2LCA4LCBGQVNUKSwgbmV3IENvbmZpZyg0LCA2LCAzMiwgMzIsIEZBU1QpLFxyXG5cdFx0XHRuZXcgQ29uZmlnKDQsIDQsIDE2LCAxNiwgU0xPVyksIG5ldyBDb25maWcoOCwgMTYsIDMyLCAzMiwgU0xPVyksIG5ldyBDb25maWcoOCwgMTYsIDEyOCwgMTI4LCBTTE9XKSwgbmV3IENvbmZpZyg4LCAzMiwgMTI4LCAyNTYsIFNMT1cpLFxyXG5cdFx0XHRuZXcgQ29uZmlnKDMyLCAxMjgsIDI1OCwgMTAyNCwgU0xPVyksIG5ldyBDb25maWcoMzIsIDI1OCwgMjU4LCA0MDk2LCBTTE9XKSBdO1xyXG5cclxuXHR2YXIgel9lcnJtc2cgPSBbIFwibmVlZCBkaWN0aW9uYXJ5XCIsIC8vIFpfTkVFRF9ESUNUXHJcblx0Ly8gMlxyXG5cdFwic3RyZWFtIGVuZFwiLCAvLyBaX1NUUkVBTV9FTkQgMVxyXG5cdFwiXCIsIC8vIFpfT0sgMFxyXG5cdFwiXCIsIC8vIFpfRVJSTk8gKC0xKVxyXG5cdFwic3RyZWFtIGVycm9yXCIsIC8vIFpfU1RSRUFNX0VSUk9SICgtMilcclxuXHRcImRhdGEgZXJyb3JcIiwgLy8gWl9EQVRBX0VSUk9SICgtMylcclxuXHRcIlwiLCAvLyBaX01FTV9FUlJPUiAoLTQpXHJcblx0XCJidWZmZXIgZXJyb3JcIiwgLy8gWl9CVUZfRVJST1IgKC01KVxyXG5cdFwiXCIsLy8gWl9WRVJTSU9OX0VSUk9SICgtNilcclxuXHRcIlwiIF07XHJcblxyXG5cdC8vIGJsb2NrIG5vdCBjb21wbGV0ZWQsIG5lZWQgbW9yZSBpbnB1dCBvciBtb3JlIG91dHB1dFxyXG5cdHZhciBOZWVkTW9yZSA9IDA7XHJcblxyXG5cdC8vIGJsb2NrIGZsdXNoIHBlcmZvcm1lZFxyXG5cdHZhciBCbG9ja0RvbmUgPSAxO1xyXG5cclxuXHQvLyBmaW5pc2ggc3RhcnRlZCwgbmVlZCBvbmx5IG1vcmUgb3V0cHV0IGF0IG5leHQgZGVmbGF0ZVxyXG5cdHZhciBGaW5pc2hTdGFydGVkID0gMjtcclxuXHJcblx0Ly8gZmluaXNoIGRvbmUsIGFjY2VwdCBubyBtb3JlIGlucHV0IG9yIG91dHB1dFxyXG5cdHZhciBGaW5pc2hEb25lID0gMztcclxuXHJcblx0Ly8gcHJlc2V0IGRpY3Rpb25hcnkgZmxhZyBpbiB6bGliIGhlYWRlclxyXG5cdHZhciBQUkVTRVRfRElDVCA9IDB4MjA7XHJcblxyXG5cdHZhciBJTklUX1NUQVRFID0gNDI7XHJcblx0dmFyIEJVU1lfU1RBVEUgPSAxMTM7XHJcblx0dmFyIEZJTklTSF9TVEFURSA9IDY2NjtcclxuXHJcblx0Ly8gVGhlIGRlZmxhdGUgY29tcHJlc3Npb24gbWV0aG9kXHJcblx0dmFyIFpfREVGTEFURUQgPSA4O1xyXG5cclxuXHR2YXIgU1RPUkVEX0JMT0NLID0gMDtcclxuXHR2YXIgU1RBVElDX1RSRUVTID0gMTtcclxuXHR2YXIgRFlOX1RSRUVTID0gMjtcclxuXHJcblx0dmFyIE1JTl9NQVRDSCA9IDM7XHJcblx0dmFyIE1BWF9NQVRDSCA9IDI1ODtcclxuXHR2YXIgTUlOX0xPT0tBSEVBRCA9IChNQVhfTUFUQ0ggKyBNSU5fTUFUQ0ggKyAxKTtcclxuXHJcblx0ZnVuY3Rpb24gc21hbGxlcih0cmVlLCBuLCBtLCBkZXB0aCkge1xyXG5cdFx0dmFyIHRuMiA9IHRyZWVbbiAqIDJdO1xyXG5cdFx0dmFyIHRtMiA9IHRyZWVbbSAqIDJdO1xyXG5cdFx0cmV0dXJuICh0bjIgPCB0bTIgfHwgKHRuMiA9PSB0bTIgJiYgZGVwdGhbbl0gPD0gZGVwdGhbbV0pKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIERlZmxhdGUoKSB7XHJcblxyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cdFx0dmFyIHN0cm07IC8vIHBvaW50ZXIgYmFjayB0byB0aGlzIHpsaWIgc3RyZWFtXHJcblx0XHR2YXIgc3RhdHVzOyAvLyBhcyB0aGUgbmFtZSBpbXBsaWVzXHJcblx0XHQvLyBwZW5kaW5nX2J1ZjsgLy8gb3V0cHV0IHN0aWxsIHBlbmRpbmdcclxuXHRcdHZhciBwZW5kaW5nX2J1Zl9zaXplOyAvLyBzaXplIG9mIHBlbmRpbmdfYnVmXHJcblx0XHQvLyBwZW5kaW5nX291dDsgLy8gbmV4dCBwZW5kaW5nIGJ5dGUgdG8gb3V0cHV0IHRvIHRoZSBzdHJlYW1cclxuXHRcdC8vIHBlbmRpbmc7IC8vIG5iIG9mIGJ5dGVzIGluIHRoZSBwZW5kaW5nIGJ1ZmZlclxyXG5cdFx0dmFyIG1ldGhvZDsgLy8gU1RPUkVEIChmb3IgemlwIG9ubHkpIG9yIERFRkxBVEVEXHJcblx0XHR2YXIgbGFzdF9mbHVzaDsgLy8gdmFsdWUgb2YgZmx1c2ggcGFyYW0gZm9yIHByZXZpb3VzIGRlZmxhdGUgY2FsbFxyXG5cclxuXHRcdHZhciB3X3NpemU7IC8vIExaNzcgd2luZG93IHNpemUgKDMySyBieSBkZWZhdWx0KVxyXG5cdFx0dmFyIHdfYml0czsgLy8gbG9nMih3X3NpemUpICg4Li4xNilcclxuXHRcdHZhciB3X21hc2s7IC8vIHdfc2l6ZSAtIDFcclxuXHJcblx0XHR2YXIgd2luZG93O1xyXG5cdFx0Ly8gU2xpZGluZyB3aW5kb3cuIElucHV0IGJ5dGVzIGFyZSByZWFkIGludG8gdGhlIHNlY29uZCBoYWxmIG9mIHRoZSB3aW5kb3csXHJcblx0XHQvLyBhbmQgbW92ZSB0byB0aGUgZmlyc3QgaGFsZiBsYXRlciB0byBrZWVwIGEgZGljdGlvbmFyeSBvZiBhdCBsZWFzdCB3U2l6ZVxyXG5cdFx0Ly8gYnl0ZXMuIFdpdGggdGhpcyBvcmdhbml6YXRpb24sIG1hdGNoZXMgYXJlIGxpbWl0ZWQgdG8gYSBkaXN0YW5jZSBvZlxyXG5cdFx0Ly8gd1NpemUtTUFYX01BVENIIGJ5dGVzLCBidXQgdGhpcyBlbnN1cmVzIHRoYXQgSU8gaXMgYWx3YXlzXHJcblx0XHQvLyBwZXJmb3JtZWQgd2l0aCBhIGxlbmd0aCBtdWx0aXBsZSBvZiB0aGUgYmxvY2sgc2l6ZS4gQWxzbywgaXQgbGltaXRzXHJcblx0XHQvLyB0aGUgd2luZG93IHNpemUgdG8gNjRLLCB3aGljaCBpcyBxdWl0ZSB1c2VmdWwgb24gTVNET1MuXHJcblx0XHQvLyBUbyBkbzogdXNlIHRoZSB1c2VyIGlucHV0IGJ1ZmZlciBhcyBzbGlkaW5nIHdpbmRvdy5cclxuXHJcblx0XHR2YXIgd2luZG93X3NpemU7XHJcblx0XHQvLyBBY3R1YWwgc2l6ZSBvZiB3aW5kb3c6IDIqd1NpemUsIGV4Y2VwdCB3aGVuIHRoZSB1c2VyIGlucHV0IGJ1ZmZlclxyXG5cdFx0Ly8gaXMgZGlyZWN0bHkgdXNlZCBhcyBzbGlkaW5nIHdpbmRvdy5cclxuXHJcblx0XHR2YXIgcHJldjtcclxuXHRcdC8vIExpbmsgdG8gb2xkZXIgc3RyaW5nIHdpdGggc2FtZSBoYXNoIGluZGV4LiBUbyBsaW1pdCB0aGUgc2l6ZSBvZiB0aGlzXHJcblx0XHQvLyBhcnJheSB0byA2NEssIHRoaXMgbGluayBpcyBtYWludGFpbmVkIG9ubHkgZm9yIHRoZSBsYXN0IDMySyBzdHJpbmdzLlxyXG5cdFx0Ly8gQW4gaW5kZXggaW4gdGhpcyBhcnJheSBpcyB0aHVzIGEgd2luZG93IGluZGV4IG1vZHVsbyAzMksuXHJcblxyXG5cdFx0dmFyIGhlYWQ7IC8vIEhlYWRzIG9mIHRoZSBoYXNoIGNoYWlucyBvciBOSUwuXHJcblxyXG5cdFx0dmFyIGluc19oOyAvLyBoYXNoIGluZGV4IG9mIHN0cmluZyB0byBiZSBpbnNlcnRlZFxyXG5cdFx0dmFyIGhhc2hfc2l6ZTsgLy8gbnVtYmVyIG9mIGVsZW1lbnRzIGluIGhhc2ggdGFibGVcclxuXHRcdHZhciBoYXNoX2JpdHM7IC8vIGxvZzIoaGFzaF9zaXplKVxyXG5cdFx0dmFyIGhhc2hfbWFzazsgLy8gaGFzaF9zaXplLTFcclxuXHJcblx0XHQvLyBOdW1iZXIgb2YgYml0cyBieSB3aGljaCBpbnNfaCBtdXN0IGJlIHNoaWZ0ZWQgYXQgZWFjaCBpbnB1dFxyXG5cdFx0Ly8gc3RlcC4gSXQgbXVzdCBiZSBzdWNoIHRoYXQgYWZ0ZXIgTUlOX01BVENIIHN0ZXBzLCB0aGUgb2xkZXN0XHJcblx0XHQvLyBieXRlIG5vIGxvbmdlciB0YWtlcyBwYXJ0IGluIHRoZSBoYXNoIGtleSwgdGhhdCBpczpcclxuXHRcdC8vIGhhc2hfc2hpZnQgKiBNSU5fTUFUQ0ggPj0gaGFzaF9iaXRzXHJcblx0XHR2YXIgaGFzaF9zaGlmdDtcclxuXHJcblx0XHQvLyBXaW5kb3cgcG9zaXRpb24gYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgY3VycmVudCBvdXRwdXQgYmxvY2suIEdldHNcclxuXHRcdC8vIG5lZ2F0aXZlIHdoZW4gdGhlIHdpbmRvdyBpcyBtb3ZlZCBiYWNrd2FyZHMuXHJcblxyXG5cdFx0dmFyIGJsb2NrX3N0YXJ0O1xyXG5cclxuXHRcdHZhciBtYXRjaF9sZW5ndGg7IC8vIGxlbmd0aCBvZiBiZXN0IG1hdGNoXHJcblx0XHR2YXIgcHJldl9tYXRjaDsgLy8gcHJldmlvdXMgbWF0Y2hcclxuXHRcdHZhciBtYXRjaF9hdmFpbGFibGU7IC8vIHNldCBpZiBwcmV2aW91cyBtYXRjaCBleGlzdHNcclxuXHRcdHZhciBzdHJzdGFydDsgLy8gc3RhcnQgb2Ygc3RyaW5nIHRvIGluc2VydFxyXG5cdFx0dmFyIG1hdGNoX3N0YXJ0OyAvLyBzdGFydCBvZiBtYXRjaGluZyBzdHJpbmdcclxuXHRcdHZhciBsb29rYWhlYWQ7IC8vIG51bWJlciBvZiB2YWxpZCBieXRlcyBhaGVhZCBpbiB3aW5kb3dcclxuXHJcblx0XHQvLyBMZW5ndGggb2YgdGhlIGJlc3QgbWF0Y2ggYXQgcHJldmlvdXMgc3RlcC4gTWF0Y2hlcyBub3QgZ3JlYXRlciB0aGFuIHRoaXNcclxuXHRcdC8vIGFyZSBkaXNjYXJkZWQuIFRoaXMgaXMgdXNlZCBpbiB0aGUgbGF6eSBtYXRjaCBldmFsdWF0aW9uLlxyXG5cdFx0dmFyIHByZXZfbGVuZ3RoO1xyXG5cclxuXHRcdC8vIFRvIHNwZWVkIHVwIGRlZmxhdGlvbiwgaGFzaCBjaGFpbnMgYXJlIG5ldmVyIHNlYXJjaGVkIGJleW9uZCB0aGlzXHJcblx0XHQvLyBsZW5ndGguIEEgaGlnaGVyIGxpbWl0IGltcHJvdmVzIGNvbXByZXNzaW9uIHJhdGlvIGJ1dCBkZWdyYWRlcyB0aGUgc3BlZWQuXHJcblx0XHR2YXIgbWF4X2NoYWluX2xlbmd0aDtcclxuXHJcblx0XHQvLyBBdHRlbXB0IHRvIGZpbmQgYSBiZXR0ZXIgbWF0Y2ggb25seSB3aGVuIHRoZSBjdXJyZW50IG1hdGNoIGlzIHN0cmljdGx5XHJcblx0XHQvLyBzbWFsbGVyIHRoYW4gdGhpcyB2YWx1ZS4gVGhpcyBtZWNoYW5pc20gaXMgdXNlZCBvbmx5IGZvciBjb21wcmVzc2lvblxyXG5cdFx0Ly8gbGV2ZWxzID49IDQuXHJcblx0XHR2YXIgbWF4X2xhenlfbWF0Y2g7XHJcblxyXG5cdFx0Ly8gSW5zZXJ0IG5ldyBzdHJpbmdzIGluIHRoZSBoYXNoIHRhYmxlIG9ubHkgaWYgdGhlIG1hdGNoIGxlbmd0aCBpcyBub3RcclxuXHRcdC8vIGdyZWF0ZXIgdGhhbiB0aGlzIGxlbmd0aC4gVGhpcyBzYXZlcyB0aW1lIGJ1dCBkZWdyYWRlcyBjb21wcmVzc2lvbi5cclxuXHRcdC8vIG1heF9pbnNlcnRfbGVuZ3RoIGlzIHVzZWQgb25seSBmb3IgY29tcHJlc3Npb24gbGV2ZWxzIDw9IDMuXHJcblxyXG5cdFx0dmFyIGxldmVsOyAvLyBjb21wcmVzc2lvbiBsZXZlbCAoMS4uOSlcclxuXHRcdHZhciBzdHJhdGVneTsgLy8gZmF2b3Igb3IgZm9yY2UgSHVmZm1hbiBjb2RpbmdcclxuXHJcblx0XHQvLyBVc2UgYSBmYXN0ZXIgc2VhcmNoIHdoZW4gdGhlIHByZXZpb3VzIG1hdGNoIGlzIGxvbmdlciB0aGFuIHRoaXNcclxuXHRcdHZhciBnb29kX21hdGNoO1xyXG5cclxuXHRcdC8vIFN0b3Agc2VhcmNoaW5nIHdoZW4gY3VycmVudCBtYXRjaCBleGNlZWRzIHRoaXNcclxuXHRcdHZhciBuaWNlX21hdGNoO1xyXG5cclxuXHRcdHZhciBkeW5fbHRyZWU7IC8vIGxpdGVyYWwgYW5kIGxlbmd0aCB0cmVlXHJcblx0XHR2YXIgZHluX2R0cmVlOyAvLyBkaXN0YW5jZSB0cmVlXHJcblx0XHR2YXIgYmxfdHJlZTsgLy8gSHVmZm1hbiB0cmVlIGZvciBiaXQgbGVuZ3Roc1xyXG5cclxuXHRcdHZhciBsX2Rlc2MgPSBuZXcgVHJlZSgpOyAvLyBkZXNjIGZvciBsaXRlcmFsIHRyZWVcclxuXHRcdHZhciBkX2Rlc2MgPSBuZXcgVHJlZSgpOyAvLyBkZXNjIGZvciBkaXN0YW5jZSB0cmVlXHJcblx0XHR2YXIgYmxfZGVzYyA9IG5ldyBUcmVlKCk7IC8vIGRlc2MgZm9yIGJpdCBsZW5ndGggdHJlZVxyXG5cclxuXHRcdC8vIHRoYXQuaGVhcF9sZW47IC8vIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgaGVhcFxyXG5cdFx0Ly8gdGhhdC5oZWFwX21heDsgLy8gZWxlbWVudCBvZiBsYXJnZXN0IGZyZXF1ZW5jeVxyXG5cdFx0Ly8gVGhlIHNvbnMgb2YgaGVhcFtuXSBhcmUgaGVhcFsyKm5dIGFuZCBoZWFwWzIqbisxXS4gaGVhcFswXSBpcyBub3QgdXNlZC5cclxuXHRcdC8vIFRoZSBzYW1lIGhlYXAgYXJyYXkgaXMgdXNlZCB0byBidWlsZCBhbGwgdHJlZXMuXHJcblxyXG5cdFx0Ly8gRGVwdGggb2YgZWFjaCBzdWJ0cmVlIHVzZWQgYXMgdGllIGJyZWFrZXIgZm9yIHRyZWVzIG9mIGVxdWFsIGZyZXF1ZW5jeVxyXG5cdFx0dGhhdC5kZXB0aCA9IFtdO1xyXG5cclxuXHRcdHZhciBsX2J1ZjsgLy8gaW5kZXggZm9yIGxpdGVyYWxzIG9yIGxlbmd0aHMgKi9cclxuXHJcblx0XHQvLyBTaXplIG9mIG1hdGNoIGJ1ZmZlciBmb3IgbGl0ZXJhbHMvbGVuZ3Rocy4gVGhlcmUgYXJlIDQgcmVhc29ucyBmb3JcclxuXHRcdC8vIGxpbWl0aW5nIGxpdF9idWZzaXplIHRvIDY0SzpcclxuXHRcdC8vIC0gZnJlcXVlbmNpZXMgY2FuIGJlIGtlcHQgaW4gMTYgYml0IGNvdW50ZXJzXHJcblx0XHQvLyAtIGlmIGNvbXByZXNzaW9uIGlzIG5vdCBzdWNjZXNzZnVsIGZvciB0aGUgZmlyc3QgYmxvY2ssIGFsbCBpbnB1dFxyXG5cdFx0Ly8gZGF0YSBpcyBzdGlsbCBpbiB0aGUgd2luZG93IHNvIHdlIGNhbiBzdGlsbCBlbWl0IGEgc3RvcmVkIGJsb2NrIGV2ZW5cclxuXHRcdC8vIHdoZW4gaW5wdXQgY29tZXMgZnJvbSBzdGFuZGFyZCBpbnB1dC4gKFRoaXMgY2FuIGFsc28gYmUgZG9uZSBmb3JcclxuXHRcdC8vIGFsbCBibG9ja3MgaWYgbGl0X2J1ZnNpemUgaXMgbm90IGdyZWF0ZXIgdGhhbiAzMksuKVxyXG5cdFx0Ly8gLSBpZiBjb21wcmVzc2lvbiBpcyBub3Qgc3VjY2Vzc2Z1bCBmb3IgYSBmaWxlIHNtYWxsZXIgdGhhbiA2NEssIHdlIGNhblxyXG5cdFx0Ly8gZXZlbiBlbWl0IGEgc3RvcmVkIGZpbGUgaW5zdGVhZCBvZiBhIHN0b3JlZCBibG9jayAoc2F2aW5nIDUgYnl0ZXMpLlxyXG5cdFx0Ly8gVGhpcyBpcyBhcHBsaWNhYmxlIG9ubHkgZm9yIHppcCAobm90IGd6aXAgb3IgemxpYikuXHJcblx0XHQvLyAtIGNyZWF0aW5nIG5ldyBIdWZmbWFuIHRyZWVzIGxlc3MgZnJlcXVlbnRseSBtYXkgbm90IHByb3ZpZGUgZmFzdFxyXG5cdFx0Ly8gYWRhcHRhdGlvbiB0byBjaGFuZ2VzIGluIHRoZSBpbnB1dCBkYXRhIHN0YXRpc3RpY3MuIChUYWtlIGZvclxyXG5cdFx0Ly8gZXhhbXBsZSBhIGJpbmFyeSBmaWxlIHdpdGggcG9vcmx5IGNvbXByZXNzaWJsZSBjb2RlIGZvbGxvd2VkIGJ5XHJcblx0XHQvLyBhIGhpZ2hseSBjb21wcmVzc2libGUgc3RyaW5nIHRhYmxlLikgU21hbGxlciBidWZmZXIgc2l6ZXMgZ2l2ZVxyXG5cdFx0Ly8gZmFzdCBhZGFwdGF0aW9uIGJ1dCBoYXZlIG9mIGNvdXJzZSB0aGUgb3ZlcmhlYWQgb2YgdHJhbnNtaXR0aW5nXHJcblx0XHQvLyB0cmVlcyBtb3JlIGZyZXF1ZW50bHkuXHJcblx0XHQvLyAtIEkgY2FuJ3QgY291bnQgYWJvdmUgNFxyXG5cdFx0dmFyIGxpdF9idWZzaXplO1xyXG5cclxuXHRcdHZhciBsYXN0X2xpdDsgLy8gcnVubmluZyBpbmRleCBpbiBsX2J1ZlxyXG5cclxuXHRcdC8vIEJ1ZmZlciBmb3IgZGlzdGFuY2VzLiBUbyBzaW1wbGlmeSB0aGUgY29kZSwgZF9idWYgYW5kIGxfYnVmIGhhdmVcclxuXHRcdC8vIHRoZSBzYW1lIG51bWJlciBvZiBlbGVtZW50cy4gVG8gdXNlIGRpZmZlcmVudCBsZW5ndGhzLCBhbiBleHRyYSBmbGFnXHJcblx0XHQvLyBhcnJheSB3b3VsZCBiZSBuZWNlc3NhcnkuXHJcblxyXG5cdFx0dmFyIGRfYnVmOyAvLyBpbmRleCBvZiBwZW5kaWdfYnVmXHJcblxyXG5cdFx0Ly8gdGhhdC5vcHRfbGVuOyAvLyBiaXQgbGVuZ3RoIG9mIGN1cnJlbnQgYmxvY2sgd2l0aCBvcHRpbWFsIHRyZWVzXHJcblx0XHQvLyB0aGF0LnN0YXRpY19sZW47IC8vIGJpdCBsZW5ndGggb2YgY3VycmVudCBibG9jayB3aXRoIHN0YXRpYyB0cmVlc1xyXG5cdFx0dmFyIG1hdGNoZXM7IC8vIG51bWJlciBvZiBzdHJpbmcgbWF0Y2hlcyBpbiBjdXJyZW50IGJsb2NrXHJcblx0XHR2YXIgbGFzdF9lb2JfbGVuOyAvLyBiaXQgbGVuZ3RoIG9mIEVPQiBjb2RlIGZvciBsYXN0IGJsb2NrXHJcblxyXG5cdFx0Ly8gT3V0cHV0IGJ1ZmZlci4gYml0cyBhcmUgaW5zZXJ0ZWQgc3RhcnRpbmcgYXQgdGhlIGJvdHRvbSAobGVhc3RcclxuXHRcdC8vIHNpZ25pZmljYW50IGJpdHMpLlxyXG5cdFx0dmFyIGJpX2J1ZjtcclxuXHJcblx0XHQvLyBOdW1iZXIgb2YgdmFsaWQgYml0cyBpbiBiaV9idWYuIEFsbCBiaXRzIGFib3ZlIHRoZSBsYXN0IHZhbGlkIGJpdFxyXG5cdFx0Ly8gYXJlIGFsd2F5cyB6ZXJvLlxyXG5cdFx0dmFyIGJpX3ZhbGlkO1xyXG5cclxuXHRcdC8vIG51bWJlciBvZiBjb2RlcyBhdCBlYWNoIGJpdCBsZW5ndGggZm9yIGFuIG9wdGltYWwgdHJlZVxyXG5cdFx0dGhhdC5ibF9jb3VudCA9IFtdO1xyXG5cclxuXHRcdC8vIGhlYXAgdXNlZCB0byBidWlsZCB0aGUgSHVmZm1hbiB0cmVlc1xyXG5cdFx0dGhhdC5oZWFwID0gW107XHJcblxyXG5cdFx0ZHluX2x0cmVlID0gW107XHJcblx0XHRkeW5fZHRyZWUgPSBbXTtcclxuXHRcdGJsX3RyZWUgPSBbXTtcclxuXHJcblx0XHRmdW5jdGlvbiBsbV9pbml0KCkge1xyXG5cdFx0XHR2YXIgaTtcclxuXHRcdFx0d2luZG93X3NpemUgPSAyICogd19zaXplO1xyXG5cclxuXHRcdFx0aGVhZFtoYXNoX3NpemUgLSAxXSA9IDA7XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBoYXNoX3NpemUgLSAxOyBpKyspIHtcclxuXHRcdFx0XHRoZWFkW2ldID0gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2V0IHRoZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVyczpcclxuXHRcdFx0bWF4X2xhenlfbWF0Y2ggPSBjb25maWdfdGFibGVbbGV2ZWxdLm1heF9sYXp5O1xyXG5cdFx0XHRnb29kX21hdGNoID0gY29uZmlnX3RhYmxlW2xldmVsXS5nb29kX2xlbmd0aDtcclxuXHRcdFx0bmljZV9tYXRjaCA9IGNvbmZpZ190YWJsZVtsZXZlbF0ubmljZV9sZW5ndGg7XHJcblx0XHRcdG1heF9jaGFpbl9sZW5ndGggPSBjb25maWdfdGFibGVbbGV2ZWxdLm1heF9jaGFpbjtcclxuXHJcblx0XHRcdHN0cnN0YXJ0ID0gMDtcclxuXHRcdFx0YmxvY2tfc3RhcnQgPSAwO1xyXG5cdFx0XHRsb29rYWhlYWQgPSAwO1xyXG5cdFx0XHRtYXRjaF9sZW5ndGggPSBwcmV2X2xlbmd0aCA9IE1JTl9NQVRDSCAtIDE7XHJcblx0XHRcdG1hdGNoX2F2YWlsYWJsZSA9IDA7XHJcblx0XHRcdGluc19oID0gMDtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBpbml0X2Jsb2NrKCkge1xyXG5cdFx0XHR2YXIgaTtcclxuXHRcdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgdHJlZXMuXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBMX0NPREVTOyBpKyspXHJcblx0XHRcdFx0ZHluX2x0cmVlW2kgKiAyXSA9IDA7XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBEX0NPREVTOyBpKyspXHJcblx0XHRcdFx0ZHluX2R0cmVlW2kgKiAyXSA9IDA7XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBCTF9DT0RFUzsgaSsrKVxyXG5cdFx0XHRcdGJsX3RyZWVbaSAqIDJdID0gMDtcclxuXHJcblx0XHRcdGR5bl9sdHJlZVtFTkRfQkxPQ0sgKiAyXSA9IDE7XHJcblx0XHRcdHRoYXQub3B0X2xlbiA9IHRoYXQuc3RhdGljX2xlbiA9IDA7XHJcblx0XHRcdGxhc3RfbGl0ID0gbWF0Y2hlcyA9IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgdHJlZSBkYXRhIHN0cnVjdHVyZXMgZm9yIGEgbmV3IHpsaWIgc3RyZWFtLlxyXG5cdFx0ZnVuY3Rpb24gdHJfaW5pdCgpIHtcclxuXHJcblx0XHRcdGxfZGVzYy5keW5fdHJlZSA9IGR5bl9sdHJlZTtcclxuXHRcdFx0bF9kZXNjLnN0YXRfZGVzYyA9IFN0YXRpY1RyZWUuc3RhdGljX2xfZGVzYztcclxuXHJcblx0XHRcdGRfZGVzYy5keW5fdHJlZSA9IGR5bl9kdHJlZTtcclxuXHRcdFx0ZF9kZXNjLnN0YXRfZGVzYyA9IFN0YXRpY1RyZWUuc3RhdGljX2RfZGVzYztcclxuXHJcblx0XHRcdGJsX2Rlc2MuZHluX3RyZWUgPSBibF90cmVlO1xyXG5cdFx0XHRibF9kZXNjLnN0YXRfZGVzYyA9IFN0YXRpY1RyZWUuc3RhdGljX2JsX2Rlc2M7XHJcblxyXG5cdFx0XHRiaV9idWYgPSAwO1xyXG5cdFx0XHRiaV92YWxpZCA9IDA7XHJcblx0XHRcdGxhc3RfZW9iX2xlbiA9IDg7IC8vIGVub3VnaCBsb29rYWhlYWQgZm9yIGluZmxhdGVcclxuXHJcblx0XHRcdC8vIEluaXRpYWxpemUgdGhlIGZpcnN0IGJsb2NrIG9mIHRoZSBmaXJzdCBmaWxlOlxyXG5cdFx0XHRpbml0X2Jsb2NrKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmVzdG9yZSB0aGUgaGVhcCBwcm9wZXJ0eSBieSBtb3ZpbmcgZG93biB0aGUgdHJlZSBzdGFydGluZyBhdCBub2RlIGssXHJcblx0XHQvLyBleGNoYW5naW5nIGEgbm9kZSB3aXRoIHRoZSBzbWFsbGVzdCBvZiBpdHMgdHdvIHNvbnMgaWYgbmVjZXNzYXJ5LFxyXG5cdFx0Ly8gc3RvcHBpbmdcclxuXHRcdC8vIHdoZW4gdGhlIGhlYXAgcHJvcGVydHkgaXMgcmUtZXN0YWJsaXNoZWQgKGVhY2ggZmF0aGVyIHNtYWxsZXIgdGhhbiBpdHNcclxuXHRcdC8vIHR3byBzb25zKS5cclxuXHRcdHRoYXQucHFkb3duaGVhcCA9IGZ1bmN0aW9uKHRyZWUsIC8vIHRoZSB0cmVlIHRvIHJlc3RvcmVcclxuXHRcdGsgLy8gbm9kZSB0byBtb3ZlIGRvd25cclxuXHRcdCkge1xyXG5cdFx0XHR2YXIgaGVhcCA9IHRoYXQuaGVhcDtcclxuXHRcdFx0dmFyIHYgPSBoZWFwW2tdO1xyXG5cdFx0XHR2YXIgaiA9IGsgPDwgMTsgLy8gbGVmdCBzb24gb2Yga1xyXG5cdFx0XHR3aGlsZSAoaiA8PSB0aGF0LmhlYXBfbGVuKSB7XHJcblx0XHRcdFx0Ly8gU2V0IGogdG8gdGhlIHNtYWxsZXN0IG9mIHRoZSB0d28gc29uczpcclxuXHRcdFx0XHRpZiAoaiA8IHRoYXQuaGVhcF9sZW4gJiYgc21hbGxlcih0cmVlLCBoZWFwW2ogKyAxXSwgaGVhcFtqXSwgdGhhdC5kZXB0aCkpIHtcclxuXHRcdFx0XHRcdGorKztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gRXhpdCBpZiB2IGlzIHNtYWxsZXIgdGhhbiBib3RoIHNvbnNcclxuXHRcdFx0XHRpZiAoc21hbGxlcih0cmVlLCB2LCBoZWFwW2pdLCB0aGF0LmRlcHRoKSlcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHQvLyBFeGNoYW5nZSB2IHdpdGggdGhlIHNtYWxsZXN0IHNvblxyXG5cdFx0XHRcdGhlYXBba10gPSBoZWFwW2pdO1xyXG5cdFx0XHRcdGsgPSBqO1xyXG5cdFx0XHRcdC8vIEFuZCBjb250aW51ZSBkb3duIHRoZSB0cmVlLCBzZXR0aW5nIGogdG8gdGhlIGxlZnQgc29uIG9mIGtcclxuXHRcdFx0XHRqIDw8PSAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdGhlYXBba10gPSB2O1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBTY2FuIGEgbGl0ZXJhbCBvciBkaXN0YW5jZSB0cmVlIHRvIGRldGVybWluZSB0aGUgZnJlcXVlbmNpZXMgb2YgdGhlIGNvZGVzXHJcblx0XHQvLyBpbiB0aGUgYml0IGxlbmd0aCB0cmVlLlxyXG5cdFx0ZnVuY3Rpb24gc2Nhbl90cmVlKHRyZWUsLy8gdGhlIHRyZWUgdG8gYmUgc2Nhbm5lZFxyXG5cdFx0bWF4X2NvZGUgLy8gYW5kIGl0cyBsYXJnZXN0IGNvZGUgb2Ygbm9uIHplcm8gZnJlcXVlbmN5XHJcblx0XHQpIHtcclxuXHRcdFx0dmFyIG47IC8vIGl0ZXJhdGVzIG92ZXIgYWxsIHRyZWUgZWxlbWVudHNcclxuXHRcdFx0dmFyIHByZXZsZW4gPSAtMTsgLy8gbGFzdCBlbWl0dGVkIGxlbmd0aFxyXG5cdFx0XHR2YXIgY3VybGVuOyAvLyBsZW5ndGggb2YgY3VycmVudCBjb2RlXHJcblx0XHRcdHZhciBuZXh0bGVuID0gdHJlZVswICogMiArIDFdOyAvLyBsZW5ndGggb2YgbmV4dCBjb2RlXHJcblx0XHRcdHZhciBjb3VudCA9IDA7IC8vIHJlcGVhdCBjb3VudCBvZiB0aGUgY3VycmVudCBjb2RlXHJcblx0XHRcdHZhciBtYXhfY291bnQgPSA3OyAvLyBtYXggcmVwZWF0IGNvdW50XHJcblx0XHRcdHZhciBtaW5fY291bnQgPSA0OyAvLyBtaW4gcmVwZWF0IGNvdW50XHJcblxyXG5cdFx0XHRpZiAobmV4dGxlbiA9PT0gMCkge1xyXG5cdFx0XHRcdG1heF9jb3VudCA9IDEzODtcclxuXHRcdFx0XHRtaW5fY291bnQgPSAzO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRyZWVbKG1heF9jb2RlICsgMSkgKiAyICsgMV0gPSAweGZmZmY7IC8vIGd1YXJkXHJcblxyXG5cdFx0XHRmb3IgKG4gPSAwOyBuIDw9IG1heF9jb2RlOyBuKyspIHtcclxuXHRcdFx0XHRjdXJsZW4gPSBuZXh0bGVuO1xyXG5cdFx0XHRcdG5leHRsZW4gPSB0cmVlWyhuICsgMSkgKiAyICsgMV07XHJcblx0XHRcdFx0aWYgKCsrY291bnQgPCBtYXhfY291bnQgJiYgY3VybGVuID09IG5leHRsZW4pIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoY291bnQgPCBtaW5fY291bnQpIHtcclxuXHRcdFx0XHRcdGJsX3RyZWVbY3VybGVuICogMl0gKz0gY291bnQ7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChjdXJsZW4gIT09IDApIHtcclxuXHRcdFx0XHRcdGlmIChjdXJsZW4gIT0gcHJldmxlbilcclxuXHRcdFx0XHRcdFx0YmxfdHJlZVtjdXJsZW4gKiAyXSsrO1xyXG5cdFx0XHRcdFx0YmxfdHJlZVtSRVBfM182ICogMl0rKztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGNvdW50IDw9IDEwKSB7XHJcblx0XHRcdFx0XHRibF90cmVlW1JFUFpfM18xMCAqIDJdKys7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGJsX3RyZWVbUkVQWl8xMV8xMzggKiAyXSsrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb3VudCA9IDA7XHJcblx0XHRcdFx0cHJldmxlbiA9IGN1cmxlbjtcclxuXHRcdFx0XHRpZiAobmV4dGxlbiA9PT0gMCkge1xyXG5cdFx0XHRcdFx0bWF4X2NvdW50ID0gMTM4O1xyXG5cdFx0XHRcdFx0bWluX2NvdW50ID0gMztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGN1cmxlbiA9PSBuZXh0bGVuKSB7XHJcblx0XHRcdFx0XHRtYXhfY291bnQgPSA2O1xyXG5cdFx0XHRcdFx0bWluX2NvdW50ID0gMztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bWF4X2NvdW50ID0gNztcclxuXHRcdFx0XHRcdG1pbl9jb3VudCA9IDQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ29uc3RydWN0IHRoZSBIdWZmbWFuIHRyZWUgZm9yIHRoZSBiaXQgbGVuZ3RocyBhbmQgcmV0dXJuIHRoZSBpbmRleCBpblxyXG5cdFx0Ly8gYmxfb3JkZXIgb2YgdGhlIGxhc3QgYml0IGxlbmd0aCBjb2RlIHRvIHNlbmQuXHJcblx0XHRmdW5jdGlvbiBidWlsZF9ibF90cmVlKCkge1xyXG5cdFx0XHR2YXIgbWF4X2JsaW5kZXg7IC8vIGluZGV4IG9mIGxhc3QgYml0IGxlbmd0aCBjb2RlIG9mIG5vbiB6ZXJvIGZyZXFcclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUgYml0IGxlbmd0aCBmcmVxdWVuY2llcyBmb3IgbGl0ZXJhbCBhbmQgZGlzdGFuY2UgdHJlZXNcclxuXHRcdFx0c2Nhbl90cmVlKGR5bl9sdHJlZSwgbF9kZXNjLm1heF9jb2RlKTtcclxuXHRcdFx0c2Nhbl90cmVlKGR5bl9kdHJlZSwgZF9kZXNjLm1heF9jb2RlKTtcclxuXHJcblx0XHRcdC8vIEJ1aWxkIHRoZSBiaXQgbGVuZ3RoIHRyZWU6XHJcblx0XHRcdGJsX2Rlc2MuYnVpbGRfdHJlZSh0aGF0KTtcclxuXHRcdFx0Ly8gb3B0X2xlbiBub3cgaW5jbHVkZXMgdGhlIGxlbmd0aCBvZiB0aGUgdHJlZSByZXByZXNlbnRhdGlvbnMsIGV4Y2VwdFxyXG5cdFx0XHQvLyB0aGUgbGVuZ3RocyBvZiB0aGUgYml0IGxlbmd0aHMgY29kZXMgYW5kIHRoZSA1KzUrNCBiaXRzIGZvciB0aGVcclxuXHRcdFx0Ly8gY291bnRzLlxyXG5cclxuXHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBudW1iZXIgb2YgYml0IGxlbmd0aCBjb2RlcyB0byBzZW5kLiBUaGUgcGt6aXAgZm9ybWF0XHJcblx0XHRcdC8vIHJlcXVpcmVzIHRoYXQgYXQgbGVhc3QgNCBiaXQgbGVuZ3RoIGNvZGVzIGJlIHNlbnQuIChhcHBub3RlLnR4dCBzYXlzXHJcblx0XHRcdC8vIDMgYnV0IHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpcyA0LilcclxuXHRcdFx0Zm9yIChtYXhfYmxpbmRleCA9IEJMX0NPREVTIC0gMTsgbWF4X2JsaW5kZXggPj0gMzsgbWF4X2JsaW5kZXgtLSkge1xyXG5cdFx0XHRcdGlmIChibF90cmVlW1RyZWUuYmxfb3JkZXJbbWF4X2JsaW5kZXhdICogMiArIDFdICE9PSAwKVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gVXBkYXRlIG9wdF9sZW4gdG8gaW5jbHVkZSB0aGUgYml0IGxlbmd0aCB0cmVlIGFuZCBjb3VudHNcclxuXHRcdFx0dGhhdC5vcHRfbGVuICs9IDMgKiAobWF4X2JsaW5kZXggKyAxKSArIDUgKyA1ICsgNDtcclxuXHJcblx0XHRcdHJldHVybiBtYXhfYmxpbmRleDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBPdXRwdXQgYSBieXRlIG9uIHRoZSBzdHJlYW0uXHJcblx0XHQvLyBJTiBhc3NlcnRpb246IHRoZXJlIGlzIGVub3VnaCByb29tIGluIHBlbmRpbmdfYnVmLlxyXG5cdFx0ZnVuY3Rpb24gcHV0X2J5dGUocCkge1xyXG5cdFx0XHR0aGF0LnBlbmRpbmdfYnVmW3RoYXQucGVuZGluZysrXSA9IHA7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gcHV0X3Nob3J0KHcpIHtcclxuXHRcdFx0cHV0X2J5dGUodyAmIDB4ZmYpO1xyXG5cdFx0XHRwdXRfYnl0ZSgodyA+Pj4gOCkgJiAweGZmKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBwdXRTaG9ydE1TQihiKSB7XHJcblx0XHRcdHB1dF9ieXRlKChiID4+IDgpICYgMHhmZik7XHJcblx0XHRcdHB1dF9ieXRlKChiICYgMHhmZikgJiAweGZmKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZW5kX2JpdHModmFsdWUsIGxlbmd0aCkge1xyXG5cdFx0XHR2YXIgdmFsLCBsZW4gPSBsZW5ndGg7XHJcblx0XHRcdGlmIChiaV92YWxpZCA+IEJ1Zl9zaXplIC0gbGVuKSB7XHJcblx0XHRcdFx0dmFsID0gdmFsdWU7XHJcblx0XHRcdFx0Ly8gYmlfYnVmIHw9ICh2YWwgPDwgYmlfdmFsaWQpO1xyXG5cdFx0XHRcdGJpX2J1ZiB8PSAoKHZhbCA8PCBiaV92YWxpZCkgJiAweGZmZmYpO1xyXG5cdFx0XHRcdHB1dF9zaG9ydChiaV9idWYpO1xyXG5cdFx0XHRcdGJpX2J1ZiA9IHZhbCA+Pj4gKEJ1Zl9zaXplIC0gYmlfdmFsaWQpO1xyXG5cdFx0XHRcdGJpX3ZhbGlkICs9IGxlbiAtIEJ1Zl9zaXplO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIGJpX2J1ZiB8PSAodmFsdWUpIDw8IGJpX3ZhbGlkO1xyXG5cdFx0XHRcdGJpX2J1ZiB8PSAoKCh2YWx1ZSkgPDwgYmlfdmFsaWQpICYgMHhmZmZmKTtcclxuXHRcdFx0XHRiaV92YWxpZCArPSBsZW47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZW5kX2NvZGUoYywgdHJlZSkge1xyXG5cdFx0XHR2YXIgYzIgPSBjICogMjtcclxuXHRcdFx0c2VuZF9iaXRzKHRyZWVbYzJdICYgMHhmZmZmLCB0cmVlW2MyICsgMV0gJiAweGZmZmYpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNlbmQgYSBsaXRlcmFsIG9yIGRpc3RhbmNlIHRyZWUgaW4gY29tcHJlc3NlZCBmb3JtLCB1c2luZyB0aGUgY29kZXMgaW5cclxuXHRcdC8vIGJsX3RyZWUuXHJcblx0XHRmdW5jdGlvbiBzZW5kX3RyZWUodHJlZSwvLyB0aGUgdHJlZSB0byBiZSBzZW50XHJcblx0XHRtYXhfY29kZSAvLyBhbmQgaXRzIGxhcmdlc3QgY29kZSBvZiBub24gemVybyBmcmVxdWVuY3lcclxuXHRcdCkge1xyXG5cdFx0XHR2YXIgbjsgLy8gaXRlcmF0ZXMgb3ZlciBhbGwgdHJlZSBlbGVtZW50c1xyXG5cdFx0XHR2YXIgcHJldmxlbiA9IC0xOyAvLyBsYXN0IGVtaXR0ZWQgbGVuZ3RoXHJcblx0XHRcdHZhciBjdXJsZW47IC8vIGxlbmd0aCBvZiBjdXJyZW50IGNvZGVcclxuXHRcdFx0dmFyIG5leHRsZW4gPSB0cmVlWzAgKiAyICsgMV07IC8vIGxlbmd0aCBvZiBuZXh0IGNvZGVcclxuXHRcdFx0dmFyIGNvdW50ID0gMDsgLy8gcmVwZWF0IGNvdW50IG9mIHRoZSBjdXJyZW50IGNvZGVcclxuXHRcdFx0dmFyIG1heF9jb3VudCA9IDc7IC8vIG1heCByZXBlYXQgY291bnRcclxuXHRcdFx0dmFyIG1pbl9jb3VudCA9IDQ7IC8vIG1pbiByZXBlYXQgY291bnRcclxuXHJcblx0XHRcdGlmIChuZXh0bGVuID09PSAwKSB7XHJcblx0XHRcdFx0bWF4X2NvdW50ID0gMTM4O1xyXG5cdFx0XHRcdG1pbl9jb3VudCA9IDM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAobiA9IDA7IG4gPD0gbWF4X2NvZGU7IG4rKykge1xyXG5cdFx0XHRcdGN1cmxlbiA9IG5leHRsZW47XHJcblx0XHRcdFx0bmV4dGxlbiA9IHRyZWVbKG4gKyAxKSAqIDIgKyAxXTtcclxuXHRcdFx0XHRpZiAoKytjb3VudCA8IG1heF9jb3VudCAmJiBjdXJsZW4gPT0gbmV4dGxlbikge1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChjb3VudCA8IG1pbl9jb3VudCkge1xyXG5cdFx0XHRcdFx0ZG8ge1xyXG5cdFx0XHRcdFx0XHRzZW5kX2NvZGUoY3VybGVuLCBibF90cmVlKTtcclxuXHRcdFx0XHRcdH0gd2hpbGUgKC0tY291bnQgIT09IDApO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoY3VybGVuICE9PSAwKSB7XHJcblx0XHRcdFx0XHRpZiAoY3VybGVuICE9IHByZXZsZW4pIHtcclxuXHRcdFx0XHRcdFx0c2VuZF9jb2RlKGN1cmxlbiwgYmxfdHJlZSk7XHJcblx0XHRcdFx0XHRcdGNvdW50LS07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRzZW5kX2NvZGUoUkVQXzNfNiwgYmxfdHJlZSk7XHJcblx0XHRcdFx0XHRzZW5kX2JpdHMoY291bnQgLSAzLCAyKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGNvdW50IDw9IDEwKSB7XHJcblx0XHRcdFx0XHRzZW5kX2NvZGUoUkVQWl8zXzEwLCBibF90cmVlKTtcclxuXHRcdFx0XHRcdHNlbmRfYml0cyhjb3VudCAtIDMsIDMpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzZW5kX2NvZGUoUkVQWl8xMV8xMzgsIGJsX3RyZWUpO1xyXG5cdFx0XHRcdFx0c2VuZF9iaXRzKGNvdW50IC0gMTEsIDcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb3VudCA9IDA7XHJcblx0XHRcdFx0cHJldmxlbiA9IGN1cmxlbjtcclxuXHRcdFx0XHRpZiAobmV4dGxlbiA9PT0gMCkge1xyXG5cdFx0XHRcdFx0bWF4X2NvdW50ID0gMTM4O1xyXG5cdFx0XHRcdFx0bWluX2NvdW50ID0gMztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGN1cmxlbiA9PSBuZXh0bGVuKSB7XHJcblx0XHRcdFx0XHRtYXhfY291bnQgPSA2O1xyXG5cdFx0XHRcdFx0bWluX2NvdW50ID0gMztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bWF4X2NvdW50ID0gNztcclxuXHRcdFx0XHRcdG1pbl9jb3VudCA9IDQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU2VuZCB0aGUgaGVhZGVyIGZvciBhIGJsb2NrIHVzaW5nIGR5bmFtaWMgSHVmZm1hbiB0cmVlczogdGhlIGNvdW50cywgdGhlXHJcblx0XHQvLyBsZW5ndGhzIG9mIHRoZSBiaXQgbGVuZ3RoIGNvZGVzLCB0aGUgbGl0ZXJhbCB0cmVlIGFuZCB0aGUgZGlzdGFuY2UgdHJlZS5cclxuXHRcdC8vIElOIGFzc2VydGlvbjogbGNvZGVzID49IDI1NywgZGNvZGVzID49IDEsIGJsY29kZXMgPj0gNC5cclxuXHRcdGZ1bmN0aW9uIHNlbmRfYWxsX3RyZWVzKGxjb2RlcywgZGNvZGVzLCBibGNvZGVzKSB7XHJcblx0XHRcdHZhciByYW5rOyAvLyBpbmRleCBpbiBibF9vcmRlclxyXG5cclxuXHRcdFx0c2VuZF9iaXRzKGxjb2RlcyAtIDI1NywgNSk7IC8vIG5vdCArMjU1IGFzIHN0YXRlZCBpbiBhcHBub3RlLnR4dFxyXG5cdFx0XHRzZW5kX2JpdHMoZGNvZGVzIC0gMSwgNSk7XHJcblx0XHRcdHNlbmRfYml0cyhibGNvZGVzIC0gNCwgNCk7IC8vIG5vdCAtMyBhcyBzdGF0ZWQgaW4gYXBwbm90ZS50eHRcclxuXHRcdFx0Zm9yIChyYW5rID0gMDsgcmFuayA8IGJsY29kZXM7IHJhbmsrKykge1xyXG5cdFx0XHRcdHNlbmRfYml0cyhibF90cmVlW1RyZWUuYmxfb3JkZXJbcmFua10gKiAyICsgMV0sIDMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHNlbmRfdHJlZShkeW5fbHRyZWUsIGxjb2RlcyAtIDEpOyAvLyBsaXRlcmFsIHRyZWVcclxuXHRcdFx0c2VuZF90cmVlKGR5bl9kdHJlZSwgZGNvZGVzIC0gMSk7IC8vIGRpc3RhbmNlIHRyZWVcclxuXHRcdH1cclxuXHJcblx0XHQvLyBGbHVzaCB0aGUgYml0IGJ1ZmZlciwga2VlcGluZyBhdCBtb3N0IDcgYml0cyBpbiBpdC5cclxuXHRcdGZ1bmN0aW9uIGJpX2ZsdXNoKCkge1xyXG5cdFx0XHRpZiAoYmlfdmFsaWQgPT0gMTYpIHtcclxuXHRcdFx0XHRwdXRfc2hvcnQoYmlfYnVmKTtcclxuXHRcdFx0XHRiaV9idWYgPSAwO1xyXG5cdFx0XHRcdGJpX3ZhbGlkID0gMDtcclxuXHRcdFx0fSBlbHNlIGlmIChiaV92YWxpZCA+PSA4KSB7XHJcblx0XHRcdFx0cHV0X2J5dGUoYmlfYnVmICYgMHhmZik7XHJcblx0XHRcdFx0YmlfYnVmID4+Pj0gODtcclxuXHRcdFx0XHRiaV92YWxpZCAtPSA4O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU2VuZCBvbmUgZW1wdHkgc3RhdGljIGJsb2NrIHRvIGdpdmUgZW5vdWdoIGxvb2thaGVhZCBmb3IgaW5mbGF0ZS5cclxuXHRcdC8vIFRoaXMgdGFrZXMgMTAgYml0cywgb2Ygd2hpY2ggNyBtYXkgcmVtYWluIGluIHRoZSBiaXQgYnVmZmVyLlxyXG5cdFx0Ly8gVGhlIGN1cnJlbnQgaW5mbGF0ZSBjb2RlIHJlcXVpcmVzIDkgYml0cyBvZiBsb29rYWhlYWQuIElmIHRoZVxyXG5cdFx0Ly8gbGFzdCB0d28gY29kZXMgZm9yIHRoZSBwcmV2aW91cyBibG9jayAocmVhbCBjb2RlIHBsdXMgRU9CKSB3ZXJlIGNvZGVkXHJcblx0XHQvLyBvbiA1IGJpdHMgb3IgbGVzcywgaW5mbGF0ZSBtYXkgaGF2ZSBvbmx5IDUrMyBiaXRzIG9mIGxvb2thaGVhZCB0byBkZWNvZGVcclxuXHRcdC8vIHRoZSBsYXN0IHJlYWwgY29kZS4gSW4gdGhpcyBjYXNlIHdlIHNlbmQgdHdvIGVtcHR5IHN0YXRpYyBibG9ja3MgaW5zdGVhZFxyXG5cdFx0Ly8gb2Ygb25lLiAoVGhlcmUgYXJlIG5vIHByb2JsZW1zIGlmIHRoZSBwcmV2aW91cyBibG9jayBpcyBzdG9yZWQgb3IgZml4ZWQuKVxyXG5cdFx0Ly8gVG8gc2ltcGxpZnkgdGhlIGNvZGUsIHdlIGFzc3VtZSB0aGUgd29yc3QgY2FzZSBvZiBsYXN0IHJlYWwgY29kZSBlbmNvZGVkXHJcblx0XHQvLyBvbiBvbmUgYml0IG9ubHkuXHJcblx0XHRmdW5jdGlvbiBfdHJfYWxpZ24oKSB7XHJcblx0XHRcdHNlbmRfYml0cyhTVEFUSUNfVFJFRVMgPDwgMSwgMyk7XHJcblx0XHRcdHNlbmRfY29kZShFTkRfQkxPQ0ssIFN0YXRpY1RyZWUuc3RhdGljX2x0cmVlKTtcclxuXHJcblx0XHRcdGJpX2ZsdXNoKCk7XHJcblxyXG5cdFx0XHQvLyBPZiB0aGUgMTAgYml0cyBmb3IgdGhlIGVtcHR5IGJsb2NrLCB3ZSBoYXZlIGFscmVhZHkgc2VudFxyXG5cdFx0XHQvLyAoMTAgLSBiaV92YWxpZCkgYml0cy4gVGhlIGxvb2thaGVhZCBmb3IgdGhlIGxhc3QgcmVhbCBjb2RlIChiZWZvcmVcclxuXHRcdFx0Ly8gdGhlIEVPQiBvZiB0aGUgcHJldmlvdXMgYmxvY2spIHdhcyB0aHVzIGF0IGxlYXN0IG9uZSBwbHVzIHRoZSBsZW5ndGhcclxuXHRcdFx0Ly8gb2YgdGhlIEVPQiBwbHVzIHdoYXQgd2UgaGF2ZSBqdXN0IHNlbnQgb2YgdGhlIGVtcHR5IHN0YXRpYyBibG9jay5cclxuXHRcdFx0aWYgKDEgKyBsYXN0X2VvYl9sZW4gKyAxMCAtIGJpX3ZhbGlkIDwgOSkge1xyXG5cdFx0XHRcdHNlbmRfYml0cyhTVEFUSUNfVFJFRVMgPDwgMSwgMyk7XHJcblx0XHRcdFx0c2VuZF9jb2RlKEVORF9CTE9DSywgU3RhdGljVHJlZS5zdGF0aWNfbHRyZWUpO1xyXG5cdFx0XHRcdGJpX2ZsdXNoKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0bGFzdF9lb2JfbGVuID0gNztcclxuXHRcdH1cclxuXHJcblx0XHQvLyBTYXZlIHRoZSBtYXRjaCBpbmZvIGFuZCB0YWxseSB0aGUgZnJlcXVlbmN5IGNvdW50cy4gUmV0dXJuIHRydWUgaWZcclxuXHRcdC8vIHRoZSBjdXJyZW50IGJsb2NrIG11c3QgYmUgZmx1c2hlZC5cclxuXHRcdGZ1bmN0aW9uIF90cl90YWxseShkaXN0LCAvLyBkaXN0YW5jZSBvZiBtYXRjaGVkIHN0cmluZ1xyXG5cdFx0bGMgLy8gbWF0Y2ggbGVuZ3RoLU1JTl9NQVRDSCBvciB1bm1hdGNoZWQgY2hhciAoaWYgZGlzdD09MClcclxuXHRcdCkge1xyXG5cdFx0XHR2YXIgb3V0X2xlbmd0aCwgaW5fbGVuZ3RoLCBkY29kZTtcclxuXHRcdFx0dGhhdC5wZW5kaW5nX2J1ZltkX2J1ZiArIGxhc3RfbGl0ICogMl0gPSAoZGlzdCA+Pj4gOCkgJiAweGZmO1xyXG5cdFx0XHR0aGF0LnBlbmRpbmdfYnVmW2RfYnVmICsgbGFzdF9saXQgKiAyICsgMV0gPSBkaXN0ICYgMHhmZjtcclxuXHJcblx0XHRcdHRoYXQucGVuZGluZ19idWZbbF9idWYgKyBsYXN0X2xpdF0gPSBsYyAmIDB4ZmY7XHJcblx0XHRcdGxhc3RfbGl0Kys7XHJcblxyXG5cdFx0XHRpZiAoZGlzdCA9PT0gMCkge1xyXG5cdFx0XHRcdC8vIGxjIGlzIHRoZSB1bm1hdGNoZWQgY2hhclxyXG5cdFx0XHRcdGR5bl9sdHJlZVtsYyAqIDJdKys7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bWF0Y2hlcysrO1xyXG5cdFx0XHRcdC8vIEhlcmUsIGxjIGlzIHRoZSBtYXRjaCBsZW5ndGggLSBNSU5fTUFUQ0hcclxuXHRcdFx0XHRkaXN0LS07IC8vIGRpc3QgPSBtYXRjaCBkaXN0YW5jZSAtIDFcclxuXHRcdFx0XHRkeW5fbHRyZWVbKFRyZWUuX2xlbmd0aF9jb2RlW2xjXSArIExJVEVSQUxTICsgMSkgKiAyXSsrO1xyXG5cdFx0XHRcdGR5bl9kdHJlZVtUcmVlLmRfY29kZShkaXN0KSAqIDJdKys7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICgobGFzdF9saXQgJiAweDFmZmYpID09PSAwICYmIGxldmVsID4gMikge1xyXG5cdFx0XHRcdC8vIENvbXB1dGUgYW4gdXBwZXIgYm91bmQgZm9yIHRoZSBjb21wcmVzc2VkIGxlbmd0aFxyXG5cdFx0XHRcdG91dF9sZW5ndGggPSBsYXN0X2xpdCAqIDg7XHJcblx0XHRcdFx0aW5fbGVuZ3RoID0gc3Ryc3RhcnQgLSBibG9ja19zdGFydDtcclxuXHRcdFx0XHRmb3IgKGRjb2RlID0gMDsgZGNvZGUgPCBEX0NPREVTOyBkY29kZSsrKSB7XHJcblx0XHRcdFx0XHRvdXRfbGVuZ3RoICs9IGR5bl9kdHJlZVtkY29kZSAqIDJdICogKDUgKyBUcmVlLmV4dHJhX2RiaXRzW2Rjb2RlXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG91dF9sZW5ndGggPj4+PSAzO1xyXG5cdFx0XHRcdGlmICgobWF0Y2hlcyA8IE1hdGguZmxvb3IobGFzdF9saXQgLyAyKSkgJiYgb3V0X2xlbmd0aCA8IE1hdGguZmxvb3IoaW5fbGVuZ3RoIC8gMikpXHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIChsYXN0X2xpdCA9PSBsaXRfYnVmc2l6ZSAtIDEpO1xyXG5cdFx0XHQvLyBXZSBhdm9pZCBlcXVhbGl0eSB3aXRoIGxpdF9idWZzaXplIGJlY2F1c2Ugb2Ygd3JhcGFyb3VuZCBhdCA2NEtcclxuXHRcdFx0Ly8gb24gMTYgYml0IG1hY2hpbmVzIGFuZCBiZWNhdXNlIHN0b3JlZCBibG9ja3MgYXJlIHJlc3RyaWN0ZWQgdG9cclxuXHRcdFx0Ly8gNjRLLTEgYnl0ZXMuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU2VuZCB0aGUgYmxvY2sgZGF0YSBjb21wcmVzc2VkIHVzaW5nIHRoZSBnaXZlbiBIdWZmbWFuIHRyZWVzXHJcblx0XHRmdW5jdGlvbiBjb21wcmVzc19ibG9jayhsdHJlZSwgZHRyZWUpIHtcclxuXHRcdFx0dmFyIGRpc3Q7IC8vIGRpc3RhbmNlIG9mIG1hdGNoZWQgc3RyaW5nXHJcblx0XHRcdHZhciBsYzsgLy8gbWF0Y2ggbGVuZ3RoIG9yIHVubWF0Y2hlZCBjaGFyIChpZiBkaXN0ID09PSAwKVxyXG5cdFx0XHR2YXIgbHggPSAwOyAvLyBydW5uaW5nIGluZGV4IGluIGxfYnVmXHJcblx0XHRcdHZhciBjb2RlOyAvLyB0aGUgY29kZSB0byBzZW5kXHJcblx0XHRcdHZhciBleHRyYTsgLy8gbnVtYmVyIG9mIGV4dHJhIGJpdHMgdG8gc2VuZFxyXG5cclxuXHRcdFx0aWYgKGxhc3RfbGl0ICE9PSAwKSB7XHJcblx0XHRcdFx0ZG8ge1xyXG5cdFx0XHRcdFx0ZGlzdCA9ICgodGhhdC5wZW5kaW5nX2J1ZltkX2J1ZiArIGx4ICogMl0gPDwgOCkgJiAweGZmMDApIHwgKHRoYXQucGVuZGluZ19idWZbZF9idWYgKyBseCAqIDIgKyAxXSAmIDB4ZmYpO1xyXG5cdFx0XHRcdFx0bGMgPSAodGhhdC5wZW5kaW5nX2J1ZltsX2J1ZiArIGx4XSkgJiAweGZmO1xyXG5cdFx0XHRcdFx0bHgrKztcclxuXHJcblx0XHRcdFx0XHRpZiAoZGlzdCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRzZW5kX2NvZGUobGMsIGx0cmVlKTsgLy8gc2VuZCBhIGxpdGVyYWwgYnl0ZVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Ly8gSGVyZSwgbGMgaXMgdGhlIG1hdGNoIGxlbmd0aCAtIE1JTl9NQVRDSFxyXG5cdFx0XHRcdFx0XHRjb2RlID0gVHJlZS5fbGVuZ3RoX2NvZGVbbGNdO1xyXG5cclxuXHRcdFx0XHRcdFx0c2VuZF9jb2RlKGNvZGUgKyBMSVRFUkFMUyArIDEsIGx0cmVlKTsgLy8gc2VuZCB0aGUgbGVuZ3RoXHJcblx0XHRcdFx0XHRcdC8vIGNvZGVcclxuXHRcdFx0XHRcdFx0ZXh0cmEgPSBUcmVlLmV4dHJhX2xiaXRzW2NvZGVdO1xyXG5cdFx0XHRcdFx0XHRpZiAoZXh0cmEgIT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRsYyAtPSBUcmVlLmJhc2VfbGVuZ3RoW2NvZGVdO1xyXG5cdFx0XHRcdFx0XHRcdHNlbmRfYml0cyhsYywgZXh0cmEpOyAvLyBzZW5kIHRoZSBleHRyYSBsZW5ndGggYml0c1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGRpc3QtLTsgLy8gZGlzdCBpcyBub3cgdGhlIG1hdGNoIGRpc3RhbmNlIC0gMVxyXG5cdFx0XHRcdFx0XHRjb2RlID0gVHJlZS5kX2NvZGUoZGlzdCk7XHJcblxyXG5cdFx0XHRcdFx0XHRzZW5kX2NvZGUoY29kZSwgZHRyZWUpOyAvLyBzZW5kIHRoZSBkaXN0YW5jZSBjb2RlXHJcblx0XHRcdFx0XHRcdGV4dHJhID0gVHJlZS5leHRyYV9kYml0c1tjb2RlXTtcclxuXHRcdFx0XHRcdFx0aWYgKGV4dHJhICE9PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGlzdCAtPSBUcmVlLmJhc2VfZGlzdFtjb2RlXTtcclxuXHRcdFx0XHRcdFx0XHRzZW5kX2JpdHMoZGlzdCwgZXh0cmEpOyAvLyBzZW5kIHRoZSBleHRyYSBkaXN0YW5jZSBiaXRzXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gLy8gbGl0ZXJhbCBvciBtYXRjaCBwYWlyID9cclxuXHJcblx0XHRcdFx0XHQvLyBDaGVjayB0aGF0IHRoZSBvdmVybGF5IGJldHdlZW4gcGVuZGluZ19idWYgYW5kIGRfYnVmK2xfYnVmIGlzXHJcblx0XHRcdFx0XHQvLyBvazpcclxuXHRcdFx0XHR9IHdoaWxlIChseCA8IGxhc3RfbGl0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VuZF9jb2RlKEVORF9CTE9DSywgbHRyZWUpO1xyXG5cdFx0XHRsYXN0X2VvYl9sZW4gPSBsdHJlZVtFTkRfQkxPQ0sgKiAyICsgMV07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRmx1c2ggdGhlIGJpdCBidWZmZXIgYW5kIGFsaWduIHRoZSBvdXRwdXQgb24gYSBieXRlIGJvdW5kYXJ5XHJcblx0XHRmdW5jdGlvbiBiaV93aW5kdXAoKSB7XHJcblx0XHRcdGlmIChiaV92YWxpZCA+IDgpIHtcclxuXHRcdFx0XHRwdXRfc2hvcnQoYmlfYnVmKTtcclxuXHRcdFx0fSBlbHNlIGlmIChiaV92YWxpZCA+IDApIHtcclxuXHRcdFx0XHRwdXRfYnl0ZShiaV9idWYgJiAweGZmKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRiaV9idWYgPSAwO1xyXG5cdFx0XHRiaV92YWxpZCA9IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ29weSBhIHN0b3JlZCBibG9jaywgc3RvcmluZyBmaXJzdCB0aGUgbGVuZ3RoIGFuZCBpdHNcclxuXHRcdC8vIG9uZSdzIGNvbXBsZW1lbnQgaWYgcmVxdWVzdGVkLlxyXG5cdFx0ZnVuY3Rpb24gY29weV9ibG9jayhidWYsIC8vIHRoZSBpbnB1dCBkYXRhXHJcblx0XHRsZW4sIC8vIGl0cyBsZW5ndGhcclxuXHRcdGhlYWRlciAvLyB0cnVlIGlmIGJsb2NrIGhlYWRlciBtdXN0IGJlIHdyaXR0ZW5cclxuXHRcdCkge1xyXG5cdFx0XHRiaV93aW5kdXAoKTsgLy8gYWxpZ24gb24gYnl0ZSBib3VuZGFyeVxyXG5cdFx0XHRsYXN0X2VvYl9sZW4gPSA4OyAvLyBlbm91Z2ggbG9va2FoZWFkIGZvciBpbmZsYXRlXHJcblxyXG5cdFx0XHRpZiAoaGVhZGVyKSB7XHJcblx0XHRcdFx0cHV0X3Nob3J0KGxlbik7XHJcblx0XHRcdFx0cHV0X3Nob3J0KH5sZW4pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGF0LnBlbmRpbmdfYnVmLnNldCh3aW5kb3cuc3ViYXJyYXkoYnVmLCBidWYgKyBsZW4pLCB0aGF0LnBlbmRpbmcpO1xyXG5cdFx0XHR0aGF0LnBlbmRpbmcgKz0gbGVuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNlbmQgYSBzdG9yZWQgYmxvY2tcclxuXHRcdGZ1bmN0aW9uIF90cl9zdG9yZWRfYmxvY2soYnVmLCAvLyBpbnB1dCBibG9ja1xyXG5cdFx0c3RvcmVkX2xlbiwgLy8gbGVuZ3RoIG9mIGlucHV0IGJsb2NrXHJcblx0XHRlb2YgLy8gdHJ1ZSBpZiB0aGlzIGlzIHRoZSBsYXN0IGJsb2NrIGZvciBhIGZpbGVcclxuXHRcdCkge1xyXG5cdFx0XHRzZW5kX2JpdHMoKFNUT1JFRF9CTE9DSyA8PCAxKSArIChlb2YgPyAxIDogMCksIDMpOyAvLyBzZW5kIGJsb2NrIHR5cGVcclxuXHRcdFx0Y29weV9ibG9jayhidWYsIHN0b3JlZF9sZW4sIHRydWUpOyAvLyB3aXRoIGhlYWRlclxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgYmVzdCBlbmNvZGluZyBmb3IgdGhlIGN1cnJlbnQgYmxvY2s6IGR5bmFtaWMgdHJlZXMsIHN0YXRpY1xyXG5cdFx0Ly8gdHJlZXMgb3Igc3RvcmUsIGFuZCBvdXRwdXQgdGhlIGVuY29kZWQgYmxvY2sgdG8gdGhlIHppcCBmaWxlLlxyXG5cdFx0ZnVuY3Rpb24gX3RyX2ZsdXNoX2Jsb2NrKGJ1ZiwgLy8gaW5wdXQgYmxvY2ssIG9yIE5VTEwgaWYgdG9vIG9sZFxyXG5cdFx0c3RvcmVkX2xlbiwgLy8gbGVuZ3RoIG9mIGlucHV0IGJsb2NrXHJcblx0XHRlb2YgLy8gdHJ1ZSBpZiB0aGlzIGlzIHRoZSBsYXN0IGJsb2NrIGZvciBhIGZpbGVcclxuXHRcdCkge1xyXG5cdFx0XHR2YXIgb3B0X2xlbmIsIHN0YXRpY19sZW5iOy8vIG9wdF9sZW4gYW5kIHN0YXRpY19sZW4gaW4gYnl0ZXNcclxuXHRcdFx0dmFyIG1heF9ibGluZGV4ID0gMDsgLy8gaW5kZXggb2YgbGFzdCBiaXQgbGVuZ3RoIGNvZGUgb2Ygbm9uIHplcm8gZnJlcVxyXG5cclxuXHRcdFx0Ly8gQnVpbGQgdGhlIEh1ZmZtYW4gdHJlZXMgdW5sZXNzIGEgc3RvcmVkIGJsb2NrIGlzIGZvcmNlZFxyXG5cdFx0XHRpZiAobGV2ZWwgPiAwKSB7XHJcblx0XHRcdFx0Ly8gQ29uc3RydWN0IHRoZSBsaXRlcmFsIGFuZCBkaXN0YW5jZSB0cmVlc1xyXG5cdFx0XHRcdGxfZGVzYy5idWlsZF90cmVlKHRoYXQpO1xyXG5cclxuXHRcdFx0XHRkX2Rlc2MuYnVpbGRfdHJlZSh0aGF0KTtcclxuXHJcblx0XHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgb3B0X2xlbiBhbmQgc3RhdGljX2xlbiBhcmUgdGhlIHRvdGFsIGJpdCBsZW5ndGhzXHJcblx0XHRcdFx0Ly8gb2ZcclxuXHRcdFx0XHQvLyB0aGUgY29tcHJlc3NlZCBibG9jayBkYXRhLCBleGNsdWRpbmcgdGhlIHRyZWUgcmVwcmVzZW50YXRpb25zLlxyXG5cclxuXHRcdFx0XHQvLyBCdWlsZCB0aGUgYml0IGxlbmd0aCB0cmVlIGZvciB0aGUgYWJvdmUgdHdvIHRyZWVzLCBhbmQgZ2V0IHRoZVxyXG5cdFx0XHRcdC8vIGluZGV4XHJcblx0XHRcdFx0Ly8gaW4gYmxfb3JkZXIgb2YgdGhlIGxhc3QgYml0IGxlbmd0aCBjb2RlIHRvIHNlbmQuXHJcblx0XHRcdFx0bWF4X2JsaW5kZXggPSBidWlsZF9ibF90cmVlKCk7XHJcblxyXG5cdFx0XHRcdC8vIERldGVybWluZSB0aGUgYmVzdCBlbmNvZGluZy4gQ29tcHV0ZSBmaXJzdCB0aGUgYmxvY2sgbGVuZ3RoIGluXHJcblx0XHRcdFx0Ly8gYnl0ZXNcclxuXHRcdFx0XHRvcHRfbGVuYiA9ICh0aGF0Lm9wdF9sZW4gKyAzICsgNykgPj4+IDM7XHJcblx0XHRcdFx0c3RhdGljX2xlbmIgPSAodGhhdC5zdGF0aWNfbGVuICsgMyArIDcpID4+PiAzO1xyXG5cclxuXHRcdFx0XHRpZiAoc3RhdGljX2xlbmIgPD0gb3B0X2xlbmIpXHJcblx0XHRcdFx0XHRvcHRfbGVuYiA9IHN0YXRpY19sZW5iO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9wdF9sZW5iID0gc3RhdGljX2xlbmIgPSBzdG9yZWRfbGVuICsgNTsgLy8gZm9yY2UgYSBzdG9yZWQgYmxvY2tcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKChzdG9yZWRfbGVuICsgNCA8PSBvcHRfbGVuYikgJiYgYnVmICE9IC0xKSB7XHJcblx0XHRcdFx0Ly8gNDogdHdvIHdvcmRzIGZvciB0aGUgbGVuZ3Roc1xyXG5cdFx0XHRcdC8vIFRoZSB0ZXN0IGJ1ZiAhPSBOVUxMIGlzIG9ubHkgbmVjZXNzYXJ5IGlmIExJVF9CVUZTSVpFID4gV1NJWkUuXHJcblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIHdlIGNhbid0IGhhdmUgcHJvY2Vzc2VkIG1vcmUgdGhhbiBXU0laRSBpbnB1dCBieXRlc1xyXG5cdFx0XHRcdC8vIHNpbmNlXHJcblx0XHRcdFx0Ly8gdGhlIGxhc3QgYmxvY2sgZmx1c2gsIGJlY2F1c2UgY29tcHJlc3Npb24gd291bGQgaGF2ZSBiZWVuXHJcblx0XHRcdFx0Ly8gc3VjY2Vzc2Z1bC4gSWYgTElUX0JVRlNJWkUgPD0gV1NJWkUsIGl0IGlzIG5ldmVyIHRvbyBsYXRlIHRvXHJcblx0XHRcdFx0Ly8gdHJhbnNmb3JtIGEgYmxvY2sgaW50byBhIHN0b3JlZCBibG9jay5cclxuXHRcdFx0XHRfdHJfc3RvcmVkX2Jsb2NrKGJ1Ziwgc3RvcmVkX2xlbiwgZW9mKTtcclxuXHRcdFx0fSBlbHNlIGlmIChzdGF0aWNfbGVuYiA9PSBvcHRfbGVuYikge1xyXG5cdFx0XHRcdHNlbmRfYml0cygoU1RBVElDX1RSRUVTIDw8IDEpICsgKGVvZiA/IDEgOiAwKSwgMyk7XHJcblx0XHRcdFx0Y29tcHJlc3NfYmxvY2soU3RhdGljVHJlZS5zdGF0aWNfbHRyZWUsIFN0YXRpY1RyZWUuc3RhdGljX2R0cmVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZW5kX2JpdHMoKERZTl9UUkVFUyA8PCAxKSArIChlb2YgPyAxIDogMCksIDMpO1xyXG5cdFx0XHRcdHNlbmRfYWxsX3RyZWVzKGxfZGVzYy5tYXhfY29kZSArIDEsIGRfZGVzYy5tYXhfY29kZSArIDEsIG1heF9ibGluZGV4ICsgMSk7XHJcblx0XHRcdFx0Y29tcHJlc3NfYmxvY2soZHluX2x0cmVlLCBkeW5fZHRyZWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBUaGUgYWJvdmUgY2hlY2sgaXMgbWFkZSBtb2QgMl4zMiwgZm9yIGZpbGVzIGxhcmdlciB0aGFuIDUxMiBNQlxyXG5cdFx0XHQvLyBhbmQgdUxvbmcgaW1wbGVtZW50ZWQgb24gMzIgYml0cy5cclxuXHJcblx0XHRcdGluaXRfYmxvY2soKTtcclxuXHJcblx0XHRcdGlmIChlb2YpIHtcclxuXHRcdFx0XHRiaV93aW5kdXAoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGZsdXNoX2Jsb2NrX29ubHkoZW9mKSB7XHJcblx0XHRcdF90cl9mbHVzaF9ibG9jayhibG9ja19zdGFydCA+PSAwID8gYmxvY2tfc3RhcnQgOiAtMSwgc3Ryc3RhcnQgLSBibG9ja19zdGFydCwgZW9mKTtcclxuXHRcdFx0YmxvY2tfc3RhcnQgPSBzdHJzdGFydDtcclxuXHRcdFx0c3RybS5mbHVzaF9wZW5kaW5nKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRmlsbCB0aGUgd2luZG93IHdoZW4gdGhlIGxvb2thaGVhZCBiZWNvbWVzIGluc3VmZmljaWVudC5cclxuXHRcdC8vIFVwZGF0ZXMgc3Ryc3RhcnQgYW5kIGxvb2thaGVhZC5cclxuXHRcdC8vXHJcblx0XHQvLyBJTiBhc3NlcnRpb246IGxvb2thaGVhZCA8IE1JTl9MT09LQUhFQURcclxuXHRcdC8vIE9VVCBhc3NlcnRpb25zOiBzdHJzdGFydCA8PSB3aW5kb3dfc2l6ZS1NSU5fTE9PS0FIRUFEXHJcblx0XHQvLyBBdCBsZWFzdCBvbmUgYnl0ZSBoYXMgYmVlbiByZWFkLCBvciBhdmFpbF9pbiA9PT0gMDsgcmVhZHMgYXJlXHJcblx0XHQvLyBwZXJmb3JtZWQgZm9yIGF0IGxlYXN0IHR3byBieXRlcyAocmVxdWlyZWQgZm9yIHRoZSB6aXAgdHJhbnNsYXRlX2VvbFxyXG5cdFx0Ly8gb3B0aW9uIC0tIG5vdCBzdXBwb3J0ZWQgaGVyZSkuXHJcblx0XHRmdW5jdGlvbiBmaWxsX3dpbmRvdygpIHtcclxuXHRcdFx0dmFyIG4sIG07XHJcblx0XHRcdHZhciBwO1xyXG5cdFx0XHR2YXIgbW9yZTsgLy8gQW1vdW50IG9mIGZyZWUgc3BhY2UgYXQgdGhlIGVuZCBvZiB0aGUgd2luZG93LlxyXG5cclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdG1vcmUgPSAod2luZG93X3NpemUgLSBsb29rYWhlYWQgLSBzdHJzdGFydCk7XHJcblxyXG5cdFx0XHRcdC8vIERlYWwgd2l0aCAhQCMkJSA2NEsgbGltaXQ6XHJcblx0XHRcdFx0aWYgKG1vcmUgPT09IDAgJiYgc3Ryc3RhcnQgPT09IDAgJiYgbG9va2FoZWFkID09PSAwKSB7XHJcblx0XHRcdFx0XHRtb3JlID0gd19zaXplO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9yZSA9PSAtMSkge1xyXG5cdFx0XHRcdFx0Ly8gVmVyeSB1bmxpa2VseSwgYnV0IHBvc3NpYmxlIG9uIDE2IGJpdCBtYWNoaW5lIGlmIHN0cnN0YXJ0ID09XHJcblx0XHRcdFx0XHQvLyAwXHJcblx0XHRcdFx0XHQvLyBhbmQgbG9va2FoZWFkID09IDEgKGlucHV0IGRvbmUgb25lIGJ5dGUgYXQgdGltZSlcclxuXHRcdFx0XHRcdG1vcmUtLTtcclxuXHJcblx0XHRcdFx0XHQvLyBJZiB0aGUgd2luZG93IGlzIGFsbW9zdCBmdWxsIGFuZCB0aGVyZSBpcyBpbnN1ZmZpY2llbnRcclxuXHRcdFx0XHRcdC8vIGxvb2thaGVhZCxcclxuXHRcdFx0XHRcdC8vIG1vdmUgdGhlIHVwcGVyIGhhbGYgdG8gdGhlIGxvd2VyIG9uZSB0byBtYWtlIHJvb20gaW4gdGhlXHJcblx0XHRcdFx0XHQvLyB1cHBlciBoYWxmLlxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoc3Ryc3RhcnQgPj0gd19zaXplICsgd19zaXplIC0gTUlOX0xPT0tBSEVBRCkge1xyXG5cdFx0XHRcdFx0d2luZG93LnNldCh3aW5kb3cuc3ViYXJyYXkod19zaXplLCB3X3NpemUgKyB3X3NpemUpLCAwKTtcclxuXHJcblx0XHRcdFx0XHRtYXRjaF9zdGFydCAtPSB3X3NpemU7XHJcblx0XHRcdFx0XHRzdHJzdGFydCAtPSB3X3NpemU7IC8vIHdlIG5vdyBoYXZlIHN0cnN0YXJ0ID49IE1BWF9ESVNUXHJcblx0XHRcdFx0XHRibG9ja19zdGFydCAtPSB3X3NpemU7XHJcblxyXG5cdFx0XHRcdFx0Ly8gU2xpZGUgdGhlIGhhc2ggdGFibGUgKGNvdWxkIGJlIGF2b2lkZWQgd2l0aCAzMiBiaXQgdmFsdWVzXHJcblx0XHRcdFx0XHQvLyBhdCB0aGUgZXhwZW5zZSBvZiBtZW1vcnkgdXNhZ2UpLiBXZSBzbGlkZSBldmVuIHdoZW4gbGV2ZWwgPT1cclxuXHRcdFx0XHRcdC8vIDBcclxuXHRcdFx0XHRcdC8vIHRvIGtlZXAgdGhlIGhhc2ggdGFibGUgY29uc2lzdGVudCBpZiB3ZSBzd2l0Y2ggYmFjayB0byBsZXZlbFxyXG5cdFx0XHRcdFx0Ly8gPiAwXHJcblx0XHRcdFx0XHQvLyBsYXRlci4gKFVzaW5nIGxldmVsIDAgcGVybWFuZW50bHkgaXMgbm90IGFuIG9wdGltYWwgdXNhZ2Ugb2ZcclxuXHRcdFx0XHRcdC8vIHpsaWIsIHNvIHdlIGRvbid0IGNhcmUgYWJvdXQgdGhpcyBwYXRob2xvZ2ljYWwgY2FzZS4pXHJcblxyXG5cdFx0XHRcdFx0biA9IGhhc2hfc2l6ZTtcclxuXHRcdFx0XHRcdHAgPSBuO1xyXG5cdFx0XHRcdFx0ZG8ge1xyXG5cdFx0XHRcdFx0XHRtID0gKGhlYWRbLS1wXSAmIDB4ZmZmZik7XHJcblx0XHRcdFx0XHRcdGhlYWRbcF0gPSAobSA+PSB3X3NpemUgPyBtIC0gd19zaXplIDogMCk7XHJcblx0XHRcdFx0XHR9IHdoaWxlICgtLW4gIT09IDApO1xyXG5cclxuXHRcdFx0XHRcdG4gPSB3X3NpemU7XHJcblx0XHRcdFx0XHRwID0gbjtcclxuXHRcdFx0XHRcdGRvIHtcclxuXHRcdFx0XHRcdFx0bSA9IChwcmV2Wy0tcF0gJiAweGZmZmYpO1xyXG5cdFx0XHRcdFx0XHRwcmV2W3BdID0gKG0gPj0gd19zaXplID8gbSAtIHdfc2l6ZSA6IDApO1xyXG5cdFx0XHRcdFx0XHQvLyBJZiBuIGlzIG5vdCBvbiBhbnkgaGFzaCBjaGFpbiwgcHJldltuXSBpcyBnYXJiYWdlIGJ1dFxyXG5cdFx0XHRcdFx0XHQvLyBpdHMgdmFsdWUgd2lsbCBuZXZlciBiZSB1c2VkLlxyXG5cdFx0XHRcdFx0fSB3aGlsZSAoLS1uICE9PSAwKTtcclxuXHRcdFx0XHRcdG1vcmUgKz0gd19zaXplO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHN0cm0uYXZhaWxfaW4gPT09IDApXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdC8vIElmIHRoZXJlIHdhcyBubyBzbGlkaW5nOlxyXG5cdFx0XHRcdC8vIHN0cnN0YXJ0IDw9IFdTSVpFK01BWF9ESVNULTEgJiYgbG9va2FoZWFkIDw9IE1JTl9MT09LQUhFQUQgLSAxICYmXHJcblx0XHRcdFx0Ly8gbW9yZSA9PSB3aW5kb3dfc2l6ZSAtIGxvb2thaGVhZCAtIHN0cnN0YXJ0XHJcblx0XHRcdFx0Ly8gPT4gbW9yZSA+PSB3aW5kb3dfc2l6ZSAtIChNSU5fTE9PS0FIRUFELTEgKyBXU0laRSArIE1BWF9ESVNULTEpXHJcblx0XHRcdFx0Ly8gPT4gbW9yZSA+PSB3aW5kb3dfc2l6ZSAtIDIqV1NJWkUgKyAyXHJcblx0XHRcdFx0Ly8gSW4gdGhlIEJJR19NRU0gb3IgTU1BUCBjYXNlIChub3QgeWV0IHN1cHBvcnRlZCksXHJcblx0XHRcdFx0Ly8gd2luZG93X3NpemUgPT0gaW5wdXRfc2l6ZSArIE1JTl9MT09LQUhFQUQgJiZcclxuXHRcdFx0XHQvLyBzdHJzdGFydCArIHMtPmxvb2thaGVhZCA8PSBpbnB1dF9zaXplID0+IG1vcmUgPj0gTUlOX0xPT0tBSEVBRC5cclxuXHRcdFx0XHQvLyBPdGhlcndpc2UsIHdpbmRvd19zaXplID09IDIqV1NJWkUgc28gbW9yZSA+PSAyLlxyXG5cdFx0XHRcdC8vIElmIHRoZXJlIHdhcyBzbGlkaW5nLCBtb3JlID49IFdTSVpFLiBTbyBpbiBhbGwgY2FzZXMsIG1vcmUgPj0gMi5cclxuXHJcblx0XHRcdFx0biA9IHN0cm0ucmVhZF9idWYod2luZG93LCBzdHJzdGFydCArIGxvb2thaGVhZCwgbW9yZSk7XHJcblx0XHRcdFx0bG9va2FoZWFkICs9IG47XHJcblxyXG5cdFx0XHRcdC8vIEluaXRpYWxpemUgdGhlIGhhc2ggdmFsdWUgbm93IHRoYXQgd2UgaGF2ZSBzb21lIGlucHV0OlxyXG5cdFx0XHRcdGlmIChsb29rYWhlYWQgPj0gTUlOX01BVENIKSB7XHJcblx0XHRcdFx0XHRpbnNfaCA9IHdpbmRvd1tzdHJzdGFydF0gJiAweGZmO1xyXG5cdFx0XHRcdFx0aW5zX2ggPSAoKChpbnNfaCkgPDwgaGFzaF9zaGlmdCkgXiAod2luZG93W3N0cnN0YXJ0ICsgMV0gJiAweGZmKSkgJiBoYXNoX21hc2s7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIElmIHRoZSB3aG9sZSBpbnB1dCBoYXMgbGVzcyB0aGFuIE1JTl9NQVRDSCBieXRlcywgaW5zX2ggaXNcclxuXHRcdFx0XHQvLyBnYXJiYWdlLFxyXG5cdFx0XHRcdC8vIGJ1dCB0aGlzIGlzIG5vdCBpbXBvcnRhbnQgc2luY2Ugb25seSBsaXRlcmFsIGJ5dGVzIHdpbGwgYmVcclxuXHRcdFx0XHQvLyBlbWl0dGVkLlxyXG5cdFx0XHR9IHdoaWxlIChsb29rYWhlYWQgPCBNSU5fTE9PS0FIRUFEICYmIHN0cm0uYXZhaWxfaW4gIT09IDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENvcHkgd2l0aG91dCBjb21wcmVzc2lvbiBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gdGhlIGlucHV0IHN0cmVhbSxcclxuXHRcdC8vIHJldHVyblxyXG5cdFx0Ly8gdGhlIGN1cnJlbnQgYmxvY2sgc3RhdGUuXHJcblx0XHQvLyBUaGlzIGZ1bmN0aW9uIGRvZXMgbm90IGluc2VydCBuZXcgc3RyaW5ncyBpbiB0aGUgZGljdGlvbmFyeSBzaW5jZVxyXG5cdFx0Ly8gdW5jb21wcmVzc2libGUgZGF0YSBpcyBwcm9iYWJseSBub3QgdXNlZnVsLiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWRcclxuXHRcdC8vIG9ubHkgZm9yIHRoZSBsZXZlbD0wIGNvbXByZXNzaW9uIG9wdGlvbi5cclxuXHRcdC8vIE5PVEU6IHRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIG9wdGltaXplZCB0byBhdm9pZCBleHRyYSBjb3B5aW5nIGZyb21cclxuXHRcdC8vIHdpbmRvdyB0byBwZW5kaW5nX2J1Zi5cclxuXHRcdGZ1bmN0aW9uIGRlZmxhdGVfc3RvcmVkKGZsdXNoKSB7XHJcblx0XHRcdC8vIFN0b3JlZCBibG9ja3MgYXJlIGxpbWl0ZWQgdG8gMHhmZmZmIGJ5dGVzLCBwZW5kaW5nX2J1ZiBpcyBsaW1pdGVkXHJcblx0XHRcdC8vIHRvIHBlbmRpbmdfYnVmX3NpemUsIGFuZCBlYWNoIHN0b3JlZCBibG9jayBoYXMgYSA1IGJ5dGUgaGVhZGVyOlxyXG5cclxuXHRcdFx0dmFyIG1heF9ibG9ja19zaXplID0gMHhmZmZmO1xyXG5cdFx0XHR2YXIgbWF4X3N0YXJ0O1xyXG5cclxuXHRcdFx0aWYgKG1heF9ibG9ja19zaXplID4gcGVuZGluZ19idWZfc2l6ZSAtIDUpIHtcclxuXHRcdFx0XHRtYXhfYmxvY2tfc2l6ZSA9IHBlbmRpbmdfYnVmX3NpemUgLSA1O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDb3B5IGFzIG11Y2ggYXMgcG9zc2libGUgZnJvbSBpbnB1dCB0byBvdXRwdXQ6XHJcblx0XHRcdHdoaWxlICh0cnVlKSB7XHJcblx0XHRcdFx0Ly8gRmlsbCB0aGUgd2luZG93IGFzIG11Y2ggYXMgcG9zc2libGU6XHJcblx0XHRcdFx0aWYgKGxvb2thaGVhZCA8PSAxKSB7XHJcblx0XHRcdFx0XHRmaWxsX3dpbmRvdygpO1xyXG5cdFx0XHRcdFx0aWYgKGxvb2thaGVhZCA9PT0gMCAmJiBmbHVzaCA9PSBaX05PX0ZMVVNIKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gTmVlZE1vcmU7XHJcblx0XHRcdFx0XHRpZiAobG9va2FoZWFkID09PSAwKVxyXG5cdFx0XHRcdFx0XHRicmVhazsgLy8gZmx1c2ggdGhlIGN1cnJlbnQgYmxvY2tcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHN0cnN0YXJ0ICs9IGxvb2thaGVhZDtcclxuXHRcdFx0XHRsb29rYWhlYWQgPSAwO1xyXG5cclxuXHRcdFx0XHQvLyBFbWl0IGEgc3RvcmVkIGJsb2NrIGlmIHBlbmRpbmdfYnVmIHdpbGwgYmUgZnVsbDpcclxuXHRcdFx0XHRtYXhfc3RhcnQgPSBibG9ja19zdGFydCArIG1heF9ibG9ja19zaXplO1xyXG5cdFx0XHRcdGlmIChzdHJzdGFydCA9PT0gMCB8fCBzdHJzdGFydCA+PSBtYXhfc3RhcnQpIHtcclxuXHRcdFx0XHRcdC8vIHN0cnN0YXJ0ID09PSAwIGlzIHBvc3NpYmxlIHdoZW4gd3JhcGFyb3VuZCBvbiAxNi1iaXQgbWFjaGluZVxyXG5cdFx0XHRcdFx0bG9va2FoZWFkID0gKHN0cnN0YXJ0IC0gbWF4X3N0YXJ0KTtcclxuXHRcdFx0XHRcdHN0cnN0YXJ0ID0gbWF4X3N0YXJ0O1xyXG5cclxuXHRcdFx0XHRcdGZsdXNoX2Jsb2NrX29ubHkoZmFsc2UpO1xyXG5cdFx0XHRcdFx0aWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gTmVlZE1vcmU7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gRmx1c2ggaWYgd2UgbWF5IGhhdmUgdG8gc2xpZGUsIG90aGVyd2lzZSBibG9ja19zdGFydCBtYXkgYmVjb21lXHJcblx0XHRcdFx0Ly8gbmVnYXRpdmUgYW5kIHRoZSBkYXRhIHdpbGwgYmUgZ29uZTpcclxuXHRcdFx0XHRpZiAoc3Ryc3RhcnQgLSBibG9ja19zdGFydCA+PSB3X3NpemUgLSBNSU5fTE9PS0FIRUFEKSB7XHJcblx0XHRcdFx0XHRmbHVzaF9ibG9ja19vbmx5KGZhbHNlKTtcclxuXHRcdFx0XHRcdGlmIChzdHJtLmF2YWlsX291dCA9PT0gMClcclxuXHRcdFx0XHRcdFx0cmV0dXJuIE5lZWRNb3JlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zmx1c2hfYmxvY2tfb25seShmbHVzaCA9PSBaX0ZJTklTSCk7XHJcblx0XHRcdGlmIChzdHJtLmF2YWlsX291dCA9PT0gMClcclxuXHRcdFx0XHRyZXR1cm4gKGZsdXNoID09IFpfRklOSVNIKSA/IEZpbmlzaFN0YXJ0ZWQgOiBOZWVkTW9yZTtcclxuXHJcblx0XHRcdHJldHVybiBmbHVzaCA9PSBaX0ZJTklTSCA/IEZpbmlzaERvbmUgOiBCbG9ja0RvbmU7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gbG9uZ2VzdF9tYXRjaChjdXJfbWF0Y2gpIHtcclxuXHRcdFx0dmFyIGNoYWluX2xlbmd0aCA9IG1heF9jaGFpbl9sZW5ndGg7IC8vIG1heCBoYXNoIGNoYWluIGxlbmd0aFxyXG5cdFx0XHR2YXIgc2NhbiA9IHN0cnN0YXJ0OyAvLyBjdXJyZW50IHN0cmluZ1xyXG5cdFx0XHR2YXIgbWF0Y2g7IC8vIG1hdGNoZWQgc3RyaW5nXHJcblx0XHRcdHZhciBsZW47IC8vIGxlbmd0aCBvZiBjdXJyZW50IG1hdGNoXHJcblx0XHRcdHZhciBiZXN0X2xlbiA9IHByZXZfbGVuZ3RoOyAvLyBiZXN0IG1hdGNoIGxlbmd0aCBzbyBmYXJcclxuXHRcdFx0dmFyIGxpbWl0ID0gc3Ryc3RhcnQgPiAod19zaXplIC0gTUlOX0xPT0tBSEVBRCkgPyBzdHJzdGFydCAtICh3X3NpemUgLSBNSU5fTE9PS0FIRUFEKSA6IDA7XHJcblx0XHRcdHZhciBfbmljZV9tYXRjaCA9IG5pY2VfbWF0Y2g7XHJcblxyXG5cdFx0XHQvLyBTdG9wIHdoZW4gY3VyX21hdGNoIGJlY29tZXMgPD0gbGltaXQuIFRvIHNpbXBsaWZ5IHRoZSBjb2RlLFxyXG5cdFx0XHQvLyB3ZSBwcmV2ZW50IG1hdGNoZXMgd2l0aCB0aGUgc3RyaW5nIG9mIHdpbmRvdyBpbmRleCAwLlxyXG5cclxuXHRcdFx0dmFyIHdtYXNrID0gd19tYXNrO1xyXG5cclxuXHRcdFx0dmFyIHN0cmVuZCA9IHN0cnN0YXJ0ICsgTUFYX01BVENIO1xyXG5cdFx0XHR2YXIgc2Nhbl9lbmQxID0gd2luZG93W3NjYW4gKyBiZXN0X2xlbiAtIDFdO1xyXG5cdFx0XHR2YXIgc2Nhbl9lbmQgPSB3aW5kb3dbc2NhbiArIGJlc3RfbGVuXTtcclxuXHJcblx0XHRcdC8vIFRoZSBjb2RlIGlzIG9wdGltaXplZCBmb3IgSEFTSF9CSVRTID49IDggYW5kIE1BWF9NQVRDSC0yIG11bHRpcGxlIG9mXHJcblx0XHRcdC8vIDE2LlxyXG5cdFx0XHQvLyBJdCBpcyBlYXN5IHRvIGdldCByaWQgb2YgdGhpcyBvcHRpbWl6YXRpb24gaWYgbmVjZXNzYXJ5LlxyXG5cclxuXHRcdFx0Ly8gRG8gbm90IHdhc3RlIHRvbyBtdWNoIHRpbWUgaWYgd2UgYWxyZWFkeSBoYXZlIGEgZ29vZCBtYXRjaDpcclxuXHRcdFx0aWYgKHByZXZfbGVuZ3RoID49IGdvb2RfbWF0Y2gpIHtcclxuXHRcdFx0XHRjaGFpbl9sZW5ndGggPj49IDI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERvIG5vdCBsb29rIGZvciBtYXRjaGVzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBpbnB1dC4gVGhpcyBpc1xyXG5cdFx0XHQvLyBuZWNlc3NhcnlcclxuXHRcdFx0Ly8gdG8gbWFrZSBkZWZsYXRlIGRldGVybWluaXN0aWMuXHJcblx0XHRcdGlmIChfbmljZV9tYXRjaCA+IGxvb2thaGVhZClcclxuXHRcdFx0XHRfbmljZV9tYXRjaCA9IGxvb2thaGVhZDtcclxuXHJcblx0XHRcdGRvIHtcclxuXHRcdFx0XHRtYXRjaCA9IGN1cl9tYXRjaDtcclxuXHJcblx0XHRcdFx0Ly8gU2tpcCB0byBuZXh0IG1hdGNoIGlmIHRoZSBtYXRjaCBsZW5ndGggY2Fubm90IGluY3JlYXNlXHJcblx0XHRcdFx0Ly8gb3IgaWYgdGhlIG1hdGNoIGxlbmd0aCBpcyBsZXNzIHRoYW4gMjpcclxuXHRcdFx0XHRpZiAod2luZG93W21hdGNoICsgYmVzdF9sZW5dICE9IHNjYW5fZW5kIHx8IHdpbmRvd1ttYXRjaCArIGJlc3RfbGVuIC0gMV0gIT0gc2Nhbl9lbmQxIHx8IHdpbmRvd1ttYXRjaF0gIT0gd2luZG93W3NjYW5dXHJcblx0XHRcdFx0XHRcdHx8IHdpbmRvd1srK21hdGNoXSAhPSB3aW5kb3dbc2NhbiArIDFdKVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdC8vIFRoZSBjaGVjayBhdCBiZXN0X2xlbi0xIGNhbiBiZSByZW1vdmVkIGJlY2F1c2UgaXQgd2lsbCBiZSBtYWRlXHJcblx0XHRcdFx0Ly8gYWdhaW4gbGF0ZXIuIChUaGlzIGhldXJpc3RpYyBpcyBub3QgYWx3YXlzIGEgd2luLilcclxuXHRcdFx0XHQvLyBJdCBpcyBub3QgbmVjZXNzYXJ5IHRvIGNvbXBhcmUgc2NhblsyXSBhbmQgbWF0Y2hbMl0gc2luY2UgdGhleVxyXG5cdFx0XHRcdC8vIGFyZSBhbHdheXMgZXF1YWwgd2hlbiB0aGUgb3RoZXIgYnl0ZXMgbWF0Y2gsIGdpdmVuIHRoYXRcclxuXHRcdFx0XHQvLyB0aGUgaGFzaCBrZXlzIGFyZSBlcXVhbCBhbmQgdGhhdCBIQVNIX0JJVFMgPj0gOC5cclxuXHRcdFx0XHRzY2FuICs9IDI7XHJcblx0XHRcdFx0bWF0Y2grKztcclxuXHJcblx0XHRcdFx0Ly8gV2UgY2hlY2sgZm9yIGluc3VmZmljaWVudCBsb29rYWhlYWQgb25seSBldmVyeSA4dGggY29tcGFyaXNvbjtcclxuXHRcdFx0XHQvLyB0aGUgMjU2dGggY2hlY2sgd2lsbCBiZSBtYWRlIGF0IHN0cnN0YXJ0KzI1OC5cclxuXHRcdFx0XHRkbyB7XHJcblx0XHRcdFx0fSB3aGlsZSAod2luZG93Wysrc2Nhbl0gPT0gd2luZG93WysrbWF0Y2hdICYmIHdpbmRvd1srK3NjYW5dID09IHdpbmRvd1srK21hdGNoXSAmJiB3aW5kb3dbKytzY2FuXSA9PSB3aW5kb3dbKyttYXRjaF1cclxuXHRcdFx0XHRcdFx0JiYgd2luZG93Wysrc2Nhbl0gPT0gd2luZG93WysrbWF0Y2hdICYmIHdpbmRvd1srK3NjYW5dID09IHdpbmRvd1srK21hdGNoXSAmJiB3aW5kb3dbKytzY2FuXSA9PSB3aW5kb3dbKyttYXRjaF1cclxuXHRcdFx0XHRcdFx0JiYgd2luZG93Wysrc2Nhbl0gPT0gd2luZG93WysrbWF0Y2hdICYmIHdpbmRvd1srK3NjYW5dID09IHdpbmRvd1srK21hdGNoXSAmJiBzY2FuIDwgc3RyZW5kKTtcclxuXHJcblx0XHRcdFx0bGVuID0gTUFYX01BVENIIC0gKHN0cmVuZCAtIHNjYW4pO1xyXG5cdFx0XHRcdHNjYW4gPSBzdHJlbmQgLSBNQVhfTUFUQ0g7XHJcblxyXG5cdFx0XHRcdGlmIChsZW4gPiBiZXN0X2xlbikge1xyXG5cdFx0XHRcdFx0bWF0Y2hfc3RhcnQgPSBjdXJfbWF0Y2g7XHJcblx0XHRcdFx0XHRiZXN0X2xlbiA9IGxlbjtcclxuXHRcdFx0XHRcdGlmIChsZW4gPj0gX25pY2VfbWF0Y2gpXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0c2Nhbl9lbmQxID0gd2luZG93W3NjYW4gKyBiZXN0X2xlbiAtIDFdO1xyXG5cdFx0XHRcdFx0c2Nhbl9lbmQgPSB3aW5kb3dbc2NhbiArIGJlc3RfbGVuXTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IHdoaWxlICgoY3VyX21hdGNoID0gKHByZXZbY3VyX21hdGNoICYgd21hc2tdICYgMHhmZmZmKSkgPiBsaW1pdCAmJiAtLWNoYWluX2xlbmd0aCAhPT0gMCk7XHJcblxyXG5cdFx0XHRpZiAoYmVzdF9sZW4gPD0gbG9va2FoZWFkKVxyXG5cdFx0XHRcdHJldHVybiBiZXN0X2xlbjtcclxuXHRcdFx0cmV0dXJuIGxvb2thaGVhZDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDb21wcmVzcyBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gdGhlIGlucHV0IHN0cmVhbSwgcmV0dXJuIHRoZSBjdXJyZW50XHJcblx0XHQvLyBibG9jayBzdGF0ZS5cclxuXHRcdC8vIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgcGVyZm9ybSBsYXp5IGV2YWx1YXRpb24gb2YgbWF0Y2hlcyBhbmQgaW5zZXJ0c1xyXG5cdFx0Ly8gbmV3IHN0cmluZ3MgaW4gdGhlIGRpY3Rpb25hcnkgb25seSBmb3IgdW5tYXRjaGVkIHN0cmluZ3Mgb3IgZm9yIHNob3J0XHJcblx0XHQvLyBtYXRjaGVzLiBJdCBpcyB1c2VkIG9ubHkgZm9yIHRoZSBmYXN0IGNvbXByZXNzaW9uIG9wdGlvbnMuXHJcblx0XHRmdW5jdGlvbiBkZWZsYXRlX2Zhc3QoZmx1c2gpIHtcclxuXHRcdFx0Ly8gc2hvcnQgaGFzaF9oZWFkID0gMDsgLy8gaGVhZCBvZiB0aGUgaGFzaCBjaGFpblxyXG5cdFx0XHR2YXIgaGFzaF9oZWFkID0gMDsgLy8gaGVhZCBvZiB0aGUgaGFzaCBjaGFpblxyXG5cdFx0XHR2YXIgYmZsdXNoOyAvLyBzZXQgaWYgY3VycmVudCBibG9jayBtdXN0IGJlIGZsdXNoZWRcclxuXHJcblx0XHRcdHdoaWxlICh0cnVlKSB7XHJcblx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UgYWx3YXlzIGhhdmUgZW5vdWdoIGxvb2thaGVhZCwgZXhjZXB0XHJcblx0XHRcdFx0Ly8gYXQgdGhlIGVuZCBvZiB0aGUgaW5wdXQgZmlsZS4gV2UgbmVlZCBNQVhfTUFUQ0ggYnl0ZXNcclxuXHRcdFx0XHQvLyBmb3IgdGhlIG5leHQgbWF0Y2gsIHBsdXMgTUlOX01BVENIIGJ5dGVzIHRvIGluc2VydCB0aGVcclxuXHRcdFx0XHQvLyBzdHJpbmcgZm9sbG93aW5nIHRoZSBuZXh0IG1hdGNoLlxyXG5cdFx0XHRcdGlmIChsb29rYWhlYWQgPCBNSU5fTE9PS0FIRUFEKSB7XHJcblx0XHRcdFx0XHRmaWxsX3dpbmRvdygpO1xyXG5cdFx0XHRcdFx0aWYgKGxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQgJiYgZmx1c2ggPT0gWl9OT19GTFVTSCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gTmVlZE1vcmU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAobG9va2FoZWFkID09PSAwKVxyXG5cdFx0XHRcdFx0XHRicmVhazsgLy8gZmx1c2ggdGhlIGN1cnJlbnQgYmxvY2tcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIEluc2VydCB0aGUgc3RyaW5nIHdpbmRvd1tzdHJzdGFydCAuLiBzdHJzdGFydCsyXSBpbiB0aGVcclxuXHRcdFx0XHQvLyBkaWN0aW9uYXJ5LCBhbmQgc2V0IGhhc2hfaGVhZCB0byB0aGUgaGVhZCBvZiB0aGUgaGFzaCBjaGFpbjpcclxuXHRcdFx0XHRpZiAobG9va2FoZWFkID49IE1JTl9NQVRDSCkge1xyXG5cdFx0XHRcdFx0aW5zX2ggPSAoKChpbnNfaCkgPDwgaGFzaF9zaGlmdCkgXiAod2luZG93WyhzdHJzdGFydCkgKyAoTUlOX01BVENIIC0gMSldICYgMHhmZikpICYgaGFzaF9tYXNrO1xyXG5cclxuXHRcdFx0XHRcdC8vIHByZXZbc3Ryc3RhcnQmd19tYXNrXT1oYXNoX2hlYWQ9aGVhZFtpbnNfaF07XHJcblx0XHRcdFx0XHRoYXNoX2hlYWQgPSAoaGVhZFtpbnNfaF0gJiAweGZmZmYpO1xyXG5cdFx0XHRcdFx0cHJldltzdHJzdGFydCAmIHdfbWFza10gPSBoZWFkW2luc19oXTtcclxuXHRcdFx0XHRcdGhlYWRbaW5zX2hdID0gc3Ryc3RhcnQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBGaW5kIHRoZSBsb25nZXN0IG1hdGNoLCBkaXNjYXJkaW5nIHRob3NlIDw9IHByZXZfbGVuZ3RoLlxyXG5cdFx0XHRcdC8vIEF0IHRoaXMgcG9pbnQgd2UgaGF2ZSBhbHdheXMgbWF0Y2hfbGVuZ3RoIDwgTUlOX01BVENIXHJcblxyXG5cdFx0XHRcdGlmIChoYXNoX2hlYWQgIT09IDAgJiYgKChzdHJzdGFydCAtIGhhc2hfaGVhZCkgJiAweGZmZmYpIDw9IHdfc2l6ZSAtIE1JTl9MT09LQUhFQUQpIHtcclxuXHRcdFx0XHRcdC8vIFRvIHNpbXBsaWZ5IHRoZSBjb2RlLCB3ZSBwcmV2ZW50IG1hdGNoZXMgd2l0aCB0aGUgc3RyaW5nXHJcblx0XHRcdFx0XHQvLyBvZiB3aW5kb3cgaW5kZXggMCAoaW4gcGFydGljdWxhciB3ZSBoYXZlIHRvIGF2b2lkIGEgbWF0Y2hcclxuXHRcdFx0XHRcdC8vIG9mIHRoZSBzdHJpbmcgd2l0aCBpdHNlbGYgYXQgdGhlIHN0YXJ0IG9mIHRoZSBpbnB1dCBmaWxlKS5cclxuXHRcdFx0XHRcdGlmIChzdHJhdGVneSAhPSBaX0hVRkZNQU5fT05MWSkge1xyXG5cdFx0XHRcdFx0XHRtYXRjaF9sZW5ndGggPSBsb25nZXN0X21hdGNoKGhhc2hfaGVhZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBsb25nZXN0X21hdGNoKCkgc2V0cyBtYXRjaF9zdGFydFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAobWF0Y2hfbGVuZ3RoID49IE1JTl9NQVRDSCkge1xyXG5cdFx0XHRcdFx0Ly8gY2hlY2tfbWF0Y2goc3Ryc3RhcnQsIG1hdGNoX3N0YXJ0LCBtYXRjaF9sZW5ndGgpO1xyXG5cclxuXHRcdFx0XHRcdGJmbHVzaCA9IF90cl90YWxseShzdHJzdGFydCAtIG1hdGNoX3N0YXJ0LCBtYXRjaF9sZW5ndGggLSBNSU5fTUFUQ0gpO1xyXG5cclxuXHRcdFx0XHRcdGxvb2thaGVhZCAtPSBtYXRjaF9sZW5ndGg7XHJcblxyXG5cdFx0XHRcdFx0Ly8gSW5zZXJ0IG5ldyBzdHJpbmdzIGluIHRoZSBoYXNoIHRhYmxlIG9ubHkgaWYgdGhlIG1hdGNoIGxlbmd0aFxyXG5cdFx0XHRcdFx0Ly8gaXMgbm90IHRvbyBsYXJnZS4gVGhpcyBzYXZlcyB0aW1lIGJ1dCBkZWdyYWRlcyBjb21wcmVzc2lvbi5cclxuXHRcdFx0XHRcdGlmIChtYXRjaF9sZW5ndGggPD0gbWF4X2xhenlfbWF0Y2ggJiYgbG9va2FoZWFkID49IE1JTl9NQVRDSCkge1xyXG5cdFx0XHRcdFx0XHRtYXRjaF9sZW5ndGgtLTsgLy8gc3RyaW5nIGF0IHN0cnN0YXJ0IGFscmVhZHkgaW4gaGFzaCB0YWJsZVxyXG5cdFx0XHRcdFx0XHRkbyB7XHJcblx0XHRcdFx0XHRcdFx0c3Ryc3RhcnQrKztcclxuXHJcblx0XHRcdFx0XHRcdFx0aW5zX2ggPSAoKGluc19oIDw8IGhhc2hfc2hpZnQpIF4gKHdpbmRvd1soc3Ryc3RhcnQpICsgKE1JTl9NQVRDSCAtIDEpXSAmIDB4ZmYpKSAmIGhhc2hfbWFzaztcclxuXHRcdFx0XHRcdFx0XHQvLyBwcmV2W3N0cnN0YXJ0JndfbWFza109aGFzaF9oZWFkPWhlYWRbaW5zX2hdO1xyXG5cdFx0XHRcdFx0XHRcdGhhc2hfaGVhZCA9IChoZWFkW2luc19oXSAmIDB4ZmZmZik7XHJcblx0XHRcdFx0XHRcdFx0cHJldltzdHJzdGFydCAmIHdfbWFza10gPSBoZWFkW2luc19oXTtcclxuXHRcdFx0XHRcdFx0XHRoZWFkW2luc19oXSA9IHN0cnN0YXJ0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBzdHJzdGFydCBuZXZlciBleGNlZWRzIFdTSVpFLU1BWF9NQVRDSCwgc28gdGhlcmUgYXJlXHJcblx0XHRcdFx0XHRcdFx0Ly8gYWx3YXlzIE1JTl9NQVRDSCBieXRlcyBhaGVhZC5cclxuXHRcdFx0XHRcdFx0fSB3aGlsZSAoLS1tYXRjaF9sZW5ndGggIT09IDApO1xyXG5cdFx0XHRcdFx0XHRzdHJzdGFydCsrO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0c3Ryc3RhcnQgKz0gbWF0Y2hfbGVuZ3RoO1xyXG5cdFx0XHRcdFx0XHRtYXRjaF9sZW5ndGggPSAwO1xyXG5cdFx0XHRcdFx0XHRpbnNfaCA9IHdpbmRvd1tzdHJzdGFydF0gJiAweGZmO1xyXG5cclxuXHRcdFx0XHRcdFx0aW5zX2ggPSAoKChpbnNfaCkgPDwgaGFzaF9zaGlmdCkgXiAod2luZG93W3N0cnN0YXJ0ICsgMV0gJiAweGZmKSkgJiBoYXNoX21hc2s7XHJcblx0XHRcdFx0XHRcdC8vIElmIGxvb2thaGVhZCA8IE1JTl9NQVRDSCwgaW5zX2ggaXMgZ2FyYmFnZSwgYnV0IGl0IGRvZXNcclxuXHRcdFx0XHRcdFx0Ly8gbm90XHJcblx0XHRcdFx0XHRcdC8vIG1hdHRlciBzaW5jZSBpdCB3aWxsIGJlIHJlY29tcHV0ZWQgYXQgbmV4dCBkZWZsYXRlIGNhbGwuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIE5vIG1hdGNoLCBvdXRwdXQgYSBsaXRlcmFsIGJ5dGVcclxuXHJcblx0XHRcdFx0XHRiZmx1c2ggPSBfdHJfdGFsbHkoMCwgd2luZG93W3N0cnN0YXJ0XSAmIDB4ZmYpO1xyXG5cdFx0XHRcdFx0bG9va2FoZWFkLS07XHJcblx0XHRcdFx0XHRzdHJzdGFydCsrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoYmZsdXNoKSB7XHJcblxyXG5cdFx0XHRcdFx0Zmx1c2hfYmxvY2tfb25seShmYWxzZSk7XHJcblx0XHRcdFx0XHRpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApXHJcblx0XHRcdFx0XHRcdHJldHVybiBOZWVkTW9yZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZsdXNoX2Jsb2NrX29ubHkoZmx1c2ggPT0gWl9GSU5JU0gpO1xyXG5cdFx0XHRpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcclxuXHRcdFx0XHRpZiAoZmx1c2ggPT0gWl9GSU5JU0gpXHJcblx0XHRcdFx0XHRyZXR1cm4gRmluaXNoU3RhcnRlZDtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRyZXR1cm4gTmVlZE1vcmU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZsdXNoID09IFpfRklOSVNIID8gRmluaXNoRG9uZSA6IEJsb2NrRG9uZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBTYW1lIGFzIGFib3ZlLCBidXQgYWNoaWV2ZXMgYmV0dGVyIGNvbXByZXNzaW9uLiBXZSB1c2UgYSBsYXp5XHJcblx0XHQvLyBldmFsdWF0aW9uIGZvciBtYXRjaGVzOiBhIG1hdGNoIGlzIGZpbmFsbHkgYWRvcHRlZCBvbmx5IGlmIHRoZXJlIGlzXHJcblx0XHQvLyBubyBiZXR0ZXIgbWF0Y2ggYXQgdGhlIG5leHQgd2luZG93IHBvc2l0aW9uLlxyXG5cdFx0ZnVuY3Rpb24gZGVmbGF0ZV9zbG93KGZsdXNoKSB7XHJcblx0XHRcdC8vIHNob3J0IGhhc2hfaGVhZCA9IDA7IC8vIGhlYWQgb2YgaGFzaCBjaGFpblxyXG5cdFx0XHR2YXIgaGFzaF9oZWFkID0gMDsgLy8gaGVhZCBvZiBoYXNoIGNoYWluXHJcblx0XHRcdHZhciBiZmx1c2g7IC8vIHNldCBpZiBjdXJyZW50IGJsb2NrIG11c3QgYmUgZmx1c2hlZFxyXG5cdFx0XHR2YXIgbWF4X2luc2VydDtcclxuXHJcblx0XHRcdC8vIFByb2Nlc3MgdGhlIGlucHV0IGJsb2NrLlxyXG5cdFx0XHR3aGlsZSAodHJ1ZSkge1xyXG5cdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlIGFsd2F5cyBoYXZlIGVub3VnaCBsb29rYWhlYWQsIGV4Y2VwdFxyXG5cdFx0XHRcdC8vIGF0IHRoZSBlbmQgb2YgdGhlIGlucHV0IGZpbGUuIFdlIG5lZWQgTUFYX01BVENIIGJ5dGVzXHJcblx0XHRcdFx0Ly8gZm9yIHRoZSBuZXh0IG1hdGNoLCBwbHVzIE1JTl9NQVRDSCBieXRlcyB0byBpbnNlcnQgdGhlXHJcblx0XHRcdFx0Ly8gc3RyaW5nIGZvbGxvd2luZyB0aGUgbmV4dCBtYXRjaC5cclxuXHJcblx0XHRcdFx0aWYgKGxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQpIHtcclxuXHRcdFx0XHRcdGZpbGxfd2luZG93KCk7XHJcblx0XHRcdFx0XHRpZiAobG9va2FoZWFkIDwgTUlOX0xPT0tBSEVBRCAmJiBmbHVzaCA9PSBaX05PX0ZMVVNIKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBOZWVkTW9yZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChsb29rYWhlYWQgPT09IDApXHJcblx0XHRcdFx0XHRcdGJyZWFrOyAvLyBmbHVzaCB0aGUgY3VycmVudCBibG9ja1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gSW5zZXJ0IHRoZSBzdHJpbmcgd2luZG93W3N0cnN0YXJ0IC4uIHN0cnN0YXJ0KzJdIGluIHRoZVxyXG5cdFx0XHRcdC8vIGRpY3Rpb25hcnksIGFuZCBzZXQgaGFzaF9oZWFkIHRvIHRoZSBoZWFkIG9mIHRoZSBoYXNoIGNoYWluOlxyXG5cclxuXHRcdFx0XHRpZiAobG9va2FoZWFkID49IE1JTl9NQVRDSCkge1xyXG5cdFx0XHRcdFx0aW5zX2ggPSAoKChpbnNfaCkgPDwgaGFzaF9zaGlmdCkgXiAod2luZG93WyhzdHJzdGFydCkgKyAoTUlOX01BVENIIC0gMSldICYgMHhmZikpICYgaGFzaF9tYXNrO1xyXG5cdFx0XHRcdFx0Ly8gcHJldltzdHJzdGFydCZ3X21hc2tdPWhhc2hfaGVhZD1oZWFkW2luc19oXTtcclxuXHRcdFx0XHRcdGhhc2hfaGVhZCA9IChoZWFkW2luc19oXSAmIDB4ZmZmZik7XHJcblx0XHRcdFx0XHRwcmV2W3N0cnN0YXJ0ICYgd19tYXNrXSA9IGhlYWRbaW5zX2hdO1xyXG5cdFx0XHRcdFx0aGVhZFtpbnNfaF0gPSBzdHJzdGFydDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIEZpbmQgdGhlIGxvbmdlc3QgbWF0Y2gsIGRpc2NhcmRpbmcgdGhvc2UgPD0gcHJldl9sZW5ndGguXHJcblx0XHRcdFx0cHJldl9sZW5ndGggPSBtYXRjaF9sZW5ndGg7XHJcblx0XHRcdFx0cHJldl9tYXRjaCA9IG1hdGNoX3N0YXJ0O1xyXG5cdFx0XHRcdG1hdGNoX2xlbmd0aCA9IE1JTl9NQVRDSCAtIDE7XHJcblxyXG5cdFx0XHRcdGlmIChoYXNoX2hlYWQgIT09IDAgJiYgcHJldl9sZW5ndGggPCBtYXhfbGF6eV9tYXRjaCAmJiAoKHN0cnN0YXJ0IC0gaGFzaF9oZWFkKSAmIDB4ZmZmZikgPD0gd19zaXplIC0gTUlOX0xPT0tBSEVBRCkge1xyXG5cdFx0XHRcdFx0Ly8gVG8gc2ltcGxpZnkgdGhlIGNvZGUsIHdlIHByZXZlbnQgbWF0Y2hlcyB3aXRoIHRoZSBzdHJpbmdcclxuXHRcdFx0XHRcdC8vIG9mIHdpbmRvdyBpbmRleCAwIChpbiBwYXJ0aWN1bGFyIHdlIGhhdmUgdG8gYXZvaWQgYSBtYXRjaFxyXG5cdFx0XHRcdFx0Ly8gb2YgdGhlIHN0cmluZyB3aXRoIGl0c2VsZiBhdCB0aGUgc3RhcnQgb2YgdGhlIGlucHV0IGZpbGUpLlxyXG5cclxuXHRcdFx0XHRcdGlmIChzdHJhdGVneSAhPSBaX0hVRkZNQU5fT05MWSkge1xyXG5cdFx0XHRcdFx0XHRtYXRjaF9sZW5ndGggPSBsb25nZXN0X21hdGNoKGhhc2hfaGVhZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBsb25nZXN0X21hdGNoKCkgc2V0cyBtYXRjaF9zdGFydFxyXG5cclxuXHRcdFx0XHRcdGlmIChtYXRjaF9sZW5ndGggPD0gNSAmJiAoc3RyYXRlZ3kgPT0gWl9GSUxURVJFRCB8fCAobWF0Y2hfbGVuZ3RoID09IE1JTl9NQVRDSCAmJiBzdHJzdGFydCAtIG1hdGNoX3N0YXJ0ID4gNDA5NikpKSB7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBJZiBwcmV2X21hdGNoIGlzIGFsc28gTUlOX01BVENILCBtYXRjaF9zdGFydCBpcyBnYXJiYWdlXHJcblx0XHRcdFx0XHRcdC8vIGJ1dCB3ZSB3aWxsIGlnbm9yZSB0aGUgY3VycmVudCBtYXRjaCBhbnl3YXkuXHJcblx0XHRcdFx0XHRcdG1hdGNoX2xlbmd0aCA9IE1JTl9NQVRDSCAtIDE7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBJZiB0aGVyZSB3YXMgYSBtYXRjaCBhdCB0aGUgcHJldmlvdXMgc3RlcCBhbmQgdGhlIGN1cnJlbnRcclxuXHRcdFx0XHQvLyBtYXRjaCBpcyBub3QgYmV0dGVyLCBvdXRwdXQgdGhlIHByZXZpb3VzIG1hdGNoOlxyXG5cdFx0XHRcdGlmIChwcmV2X2xlbmd0aCA+PSBNSU5fTUFUQ0ggJiYgbWF0Y2hfbGVuZ3RoIDw9IHByZXZfbGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRtYXhfaW5zZXJ0ID0gc3Ryc3RhcnQgKyBsb29rYWhlYWQgLSBNSU5fTUFUQ0g7XHJcblx0XHRcdFx0XHQvLyBEbyBub3QgaW5zZXJ0IHN0cmluZ3MgaW4gaGFzaCB0YWJsZSBiZXlvbmQgdGhpcy5cclxuXHJcblx0XHRcdFx0XHQvLyBjaGVja19tYXRjaChzdHJzdGFydC0xLCBwcmV2X21hdGNoLCBwcmV2X2xlbmd0aCk7XHJcblxyXG5cdFx0XHRcdFx0YmZsdXNoID0gX3RyX3RhbGx5KHN0cnN0YXJ0IC0gMSAtIHByZXZfbWF0Y2gsIHByZXZfbGVuZ3RoIC0gTUlOX01BVENIKTtcclxuXHJcblx0XHRcdFx0XHQvLyBJbnNlcnQgaW4gaGFzaCB0YWJsZSBhbGwgc3RyaW5ncyB1cCB0byB0aGUgZW5kIG9mIHRoZSBtYXRjaC5cclxuXHRcdFx0XHRcdC8vIHN0cnN0YXJ0LTEgYW5kIHN0cnN0YXJ0IGFyZSBhbHJlYWR5IGluc2VydGVkLiBJZiB0aGVyZSBpcyBub3RcclxuXHRcdFx0XHRcdC8vIGVub3VnaCBsb29rYWhlYWQsIHRoZSBsYXN0IHR3byBzdHJpbmdzIGFyZSBub3QgaW5zZXJ0ZWQgaW5cclxuXHRcdFx0XHRcdC8vIHRoZSBoYXNoIHRhYmxlLlxyXG5cdFx0XHRcdFx0bG9va2FoZWFkIC09IHByZXZfbGVuZ3RoIC0gMTtcclxuXHRcdFx0XHRcdHByZXZfbGVuZ3RoIC09IDI7XHJcblx0XHRcdFx0XHRkbyB7XHJcblx0XHRcdFx0XHRcdGlmICgrK3N0cnN0YXJ0IDw9IG1heF9pbnNlcnQpIHtcclxuXHRcdFx0XHRcdFx0XHRpbnNfaCA9ICgoKGluc19oKSA8PCBoYXNoX3NoaWZ0KSBeICh3aW5kb3dbKHN0cnN0YXJ0KSArIChNSU5fTUFUQ0ggLSAxKV0gJiAweGZmKSkgJiBoYXNoX21hc2s7XHJcblx0XHRcdFx0XHRcdFx0Ly8gcHJldltzdHJzdGFydCZ3X21hc2tdPWhhc2hfaGVhZD1oZWFkW2luc19oXTtcclxuXHRcdFx0XHRcdFx0XHRoYXNoX2hlYWQgPSAoaGVhZFtpbnNfaF0gJiAweGZmZmYpO1xyXG5cdFx0XHRcdFx0XHRcdHByZXZbc3Ryc3RhcnQgJiB3X21hc2tdID0gaGVhZFtpbnNfaF07XHJcblx0XHRcdFx0XHRcdFx0aGVhZFtpbnNfaF0gPSBzdHJzdGFydDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSB3aGlsZSAoLS1wcmV2X2xlbmd0aCAhPT0gMCk7XHJcblx0XHRcdFx0XHRtYXRjaF9hdmFpbGFibGUgPSAwO1xyXG5cdFx0XHRcdFx0bWF0Y2hfbGVuZ3RoID0gTUlOX01BVENIIC0gMTtcclxuXHRcdFx0XHRcdHN0cnN0YXJ0Kys7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGJmbHVzaCkge1xyXG5cdFx0XHRcdFx0XHRmbHVzaF9ibG9ja19vbmx5KGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0aWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBOZWVkTW9yZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1hdGNoX2F2YWlsYWJsZSAhPT0gMCkge1xyXG5cclxuXHRcdFx0XHRcdC8vIElmIHRoZXJlIHdhcyBubyBtYXRjaCBhdCB0aGUgcHJldmlvdXMgcG9zaXRpb24sIG91dHB1dCBhXHJcblx0XHRcdFx0XHQvLyBzaW5nbGUgbGl0ZXJhbC4gSWYgdGhlcmUgd2FzIGEgbWF0Y2ggYnV0IHRoZSBjdXJyZW50IG1hdGNoXHJcblx0XHRcdFx0XHQvLyBpcyBsb25nZXIsIHRydW5jYXRlIHRoZSBwcmV2aW91cyBtYXRjaCB0byBhIHNpbmdsZSBsaXRlcmFsLlxyXG5cclxuXHRcdFx0XHRcdGJmbHVzaCA9IF90cl90YWxseSgwLCB3aW5kb3dbc3Ryc3RhcnQgLSAxXSAmIDB4ZmYpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChiZmx1c2gpIHtcclxuXHRcdFx0XHRcdFx0Zmx1c2hfYmxvY2tfb25seShmYWxzZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRzdHJzdGFydCsrO1xyXG5cdFx0XHRcdFx0bG9va2FoZWFkLS07XHJcblx0XHRcdFx0XHRpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApXHJcblx0XHRcdFx0XHRcdHJldHVybiBOZWVkTW9yZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gVGhlcmUgaXMgbm8gcHJldmlvdXMgbWF0Y2ggdG8gY29tcGFyZSB3aXRoLCB3YWl0IGZvclxyXG5cdFx0XHRcdFx0Ly8gdGhlIG5leHQgc3RlcCB0byBkZWNpZGUuXHJcblxyXG5cdFx0XHRcdFx0bWF0Y2hfYXZhaWxhYmxlID0gMTtcclxuXHRcdFx0XHRcdHN0cnN0YXJ0Kys7XHJcblx0XHRcdFx0XHRsb29rYWhlYWQtLTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChtYXRjaF9hdmFpbGFibGUgIT09IDApIHtcclxuXHRcdFx0XHRiZmx1c2ggPSBfdHJfdGFsbHkoMCwgd2luZG93W3N0cnN0YXJ0IC0gMV0gJiAweGZmKTtcclxuXHRcdFx0XHRtYXRjaF9hdmFpbGFibGUgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZsdXNoX2Jsb2NrX29ubHkoZmx1c2ggPT0gWl9GSU5JU0gpO1xyXG5cclxuXHRcdFx0aWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XHJcblx0XHRcdFx0aWYgKGZsdXNoID09IFpfRklOSVNIKVxyXG5cdFx0XHRcdFx0cmV0dXJuIEZpbmlzaFN0YXJ0ZWQ7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIE5lZWRNb3JlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZmx1c2ggPT0gWl9GSU5JU0ggPyBGaW5pc2hEb25lIDogQmxvY2tEb25lO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGRlZmxhdGVSZXNldChzdHJtKSB7XHJcblx0XHRcdHN0cm0udG90YWxfaW4gPSBzdHJtLnRvdGFsX291dCA9IDA7XHJcblx0XHRcdHN0cm0ubXNnID0gbnVsbDsgLy9cclxuXHRcdFx0XHJcblx0XHRcdHRoYXQucGVuZGluZyA9IDA7XHJcblx0XHRcdHRoYXQucGVuZGluZ19vdXQgPSAwO1xyXG5cclxuXHRcdFx0c3RhdHVzID0gQlVTWV9TVEFURTtcclxuXHJcblx0XHRcdGxhc3RfZmx1c2ggPSBaX05PX0ZMVVNIO1xyXG5cclxuXHRcdFx0dHJfaW5pdCgpO1xyXG5cdFx0XHRsbV9pbml0KCk7XHJcblx0XHRcdHJldHVybiBaX09LO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoYXQuZGVmbGF0ZUluaXQgPSBmdW5jdGlvbihzdHJtLCBfbGV2ZWwsIGJpdHMsIF9tZXRob2QsIG1lbUxldmVsLCBfc3RyYXRlZ3kpIHtcclxuXHRcdFx0aWYgKCFfbWV0aG9kKVxyXG5cdFx0XHRcdF9tZXRob2QgPSBaX0RFRkxBVEVEO1xyXG5cdFx0XHRpZiAoIW1lbUxldmVsKVxyXG5cdFx0XHRcdG1lbUxldmVsID0gREVGX01FTV9MRVZFTDtcclxuXHRcdFx0aWYgKCFfc3RyYXRlZ3kpXHJcblx0XHRcdFx0X3N0cmF0ZWd5ID0gWl9ERUZBVUxUX1NUUkFURUdZO1xyXG5cclxuXHRcdFx0Ly8gYnl0ZVtdIG15X3ZlcnNpb249WkxJQl9WRVJTSU9OO1xyXG5cclxuXHRcdFx0Ly9cclxuXHRcdFx0Ly8gaWYgKCF2ZXJzaW9uIHx8IHZlcnNpb25bMF0gIT0gbXlfdmVyc2lvblswXVxyXG5cdFx0XHQvLyB8fCBzdHJlYW1fc2l6ZSAhPSBzaXplb2Yoel9zdHJlYW0pKSB7XHJcblx0XHRcdC8vIHJldHVybiBaX1ZFUlNJT05fRVJST1I7XHJcblx0XHRcdC8vIH1cclxuXHJcblx0XHRcdHN0cm0ubXNnID0gbnVsbDtcclxuXHJcblx0XHRcdGlmIChfbGV2ZWwgPT0gWl9ERUZBVUxUX0NPTVBSRVNTSU9OKVxyXG5cdFx0XHRcdF9sZXZlbCA9IDY7XHJcblxyXG5cdFx0XHRpZiAobWVtTGV2ZWwgPCAxIHx8IG1lbUxldmVsID4gTUFYX01FTV9MRVZFTCB8fCBfbWV0aG9kICE9IFpfREVGTEFURUQgfHwgYml0cyA8IDkgfHwgYml0cyA+IDE1IHx8IF9sZXZlbCA8IDAgfHwgX2xldmVsID4gOSB8fCBfc3RyYXRlZ3kgPCAwXHJcblx0XHRcdFx0XHR8fCBfc3RyYXRlZ3kgPiBaX0hVRkZNQU5fT05MWSkge1xyXG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3RybS5kc3RhdGUgPSB0aGF0O1xyXG5cclxuXHRcdFx0d19iaXRzID0gYml0cztcclxuXHRcdFx0d19zaXplID0gMSA8PCB3X2JpdHM7XHJcblx0XHRcdHdfbWFzayA9IHdfc2l6ZSAtIDE7XHJcblxyXG5cdFx0XHRoYXNoX2JpdHMgPSBtZW1MZXZlbCArIDc7XHJcblx0XHRcdGhhc2hfc2l6ZSA9IDEgPDwgaGFzaF9iaXRzO1xyXG5cdFx0XHRoYXNoX21hc2sgPSBoYXNoX3NpemUgLSAxO1xyXG5cdFx0XHRoYXNoX3NoaWZ0ID0gTWF0aC5mbG9vcigoaGFzaF9iaXRzICsgTUlOX01BVENIIC0gMSkgLyBNSU5fTUFUQ0gpO1xyXG5cclxuXHRcdFx0d2luZG93ID0gbmV3IFVpbnQ4QXJyYXkod19zaXplICogMik7XHJcblx0XHRcdHByZXYgPSBbXTtcclxuXHRcdFx0aGVhZCA9IFtdO1xyXG5cclxuXHRcdFx0bGl0X2J1ZnNpemUgPSAxIDw8IChtZW1MZXZlbCArIDYpOyAvLyAxNksgZWxlbWVudHMgYnkgZGVmYXVsdFxyXG5cclxuXHRcdFx0Ly8gV2Ugb3ZlcmxheSBwZW5kaW5nX2J1ZiBhbmQgZF9idWYrbF9idWYuIFRoaXMgd29ya3Mgc2luY2UgdGhlIGF2ZXJhZ2VcclxuXHRcdFx0Ly8gb3V0cHV0IHNpemUgZm9yIChsZW5ndGgsZGlzdGFuY2UpIGNvZGVzIGlzIDw9IDI0IGJpdHMuXHJcblx0XHRcdHRoYXQucGVuZGluZ19idWYgPSBuZXcgVWludDhBcnJheShsaXRfYnVmc2l6ZSAqIDQpO1xyXG5cdFx0XHRwZW5kaW5nX2J1Zl9zaXplID0gbGl0X2J1ZnNpemUgKiA0O1xyXG5cclxuXHRcdFx0ZF9idWYgPSBNYXRoLmZsb29yKGxpdF9idWZzaXplIC8gMik7XHJcblx0XHRcdGxfYnVmID0gKDEgKyAyKSAqIGxpdF9idWZzaXplO1xyXG5cclxuXHRcdFx0bGV2ZWwgPSBfbGV2ZWw7XHJcblxyXG5cdFx0XHRzdHJhdGVneSA9IF9zdHJhdGVneTtcclxuXHRcdFx0bWV0aG9kID0gX21ldGhvZCAmIDB4ZmY7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGVmbGF0ZVJlc2V0KHN0cm0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGF0LmRlZmxhdGVFbmQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKHN0YXR1cyAhPSBJTklUX1NUQVRFICYmIHN0YXR1cyAhPSBCVVNZX1NUQVRFICYmIHN0YXR1cyAhPSBGSU5JU0hfU1RBVEUpIHtcclxuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gRGVhbGxvY2F0ZSBpbiByZXZlcnNlIG9yZGVyIG9mIGFsbG9jYXRpb25zOlxyXG5cdFx0XHR0aGF0LnBlbmRpbmdfYnVmID0gbnVsbDtcclxuXHRcdFx0aGVhZCA9IG51bGw7XHJcblx0XHRcdHByZXYgPSBudWxsO1xyXG5cdFx0XHR3aW5kb3cgPSBudWxsO1xyXG5cdFx0XHQvLyBmcmVlXHJcblx0XHRcdHRoYXQuZHN0YXRlID0gbnVsbDtcclxuXHRcdFx0cmV0dXJuIHN0YXR1cyA9PSBCVVNZX1NUQVRFID8gWl9EQVRBX0VSUk9SIDogWl9PSztcclxuXHRcdH07XHJcblxyXG5cdFx0dGhhdC5kZWZsYXRlUGFyYW1zID0gZnVuY3Rpb24oc3RybSwgX2xldmVsLCBfc3RyYXRlZ3kpIHtcclxuXHRcdFx0dmFyIGVyciA9IFpfT0s7XHJcblxyXG5cdFx0XHRpZiAoX2xldmVsID09IFpfREVGQVVMVF9DT01QUkVTU0lPTikge1xyXG5cdFx0XHRcdF9sZXZlbCA9IDY7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKF9sZXZlbCA8IDAgfHwgX2xldmVsID4gOSB8fCBfc3RyYXRlZ3kgPCAwIHx8IF9zdHJhdGVneSA+IFpfSFVGRk1BTl9PTkxZKSB7XHJcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY29uZmlnX3RhYmxlW2xldmVsXS5mdW5jICE9IGNvbmZpZ190YWJsZVtfbGV2ZWxdLmZ1bmMgJiYgc3RybS50b3RhbF9pbiAhPT0gMCkge1xyXG5cdFx0XHRcdC8vIEZsdXNoIHRoZSBsYXN0IGJ1ZmZlcjpcclxuXHRcdFx0XHRlcnIgPSBzdHJtLmRlZmxhdGUoWl9QQVJUSUFMX0ZMVVNIKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGxldmVsICE9IF9sZXZlbCkge1xyXG5cdFx0XHRcdGxldmVsID0gX2xldmVsO1xyXG5cdFx0XHRcdG1heF9sYXp5X21hdGNoID0gY29uZmlnX3RhYmxlW2xldmVsXS5tYXhfbGF6eTtcclxuXHRcdFx0XHRnb29kX21hdGNoID0gY29uZmlnX3RhYmxlW2xldmVsXS5nb29kX2xlbmd0aDtcclxuXHRcdFx0XHRuaWNlX21hdGNoID0gY29uZmlnX3RhYmxlW2xldmVsXS5uaWNlX2xlbmd0aDtcclxuXHRcdFx0XHRtYXhfY2hhaW5fbGVuZ3RoID0gY29uZmlnX3RhYmxlW2xldmVsXS5tYXhfY2hhaW47XHJcblx0XHRcdH1cclxuXHRcdFx0c3RyYXRlZ3kgPSBfc3RyYXRlZ3k7XHJcblx0XHRcdHJldHVybiBlcnI7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoYXQuZGVmbGF0ZVNldERpY3Rpb25hcnkgPSBmdW5jdGlvbihzdHJtLCBkaWN0aW9uYXJ5LCBkaWN0TGVuZ3RoKSB7XHJcblx0XHRcdHZhciBsZW5ndGggPSBkaWN0TGVuZ3RoO1xyXG5cdFx0XHR2YXIgbiwgaW5kZXggPSAwO1xyXG5cclxuXHRcdFx0aWYgKCFkaWN0aW9uYXJ5IHx8IHN0YXR1cyAhPSBJTklUX1NUQVRFKVxyXG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcclxuXHJcblx0XHRcdGlmIChsZW5ndGggPCBNSU5fTUFUQ0gpXHJcblx0XHRcdFx0cmV0dXJuIFpfT0s7XHJcblx0XHRcdGlmIChsZW5ndGggPiB3X3NpemUgLSBNSU5fTE9PS0FIRUFEKSB7XHJcblx0XHRcdFx0bGVuZ3RoID0gd19zaXplIC0gTUlOX0xPT0tBSEVBRDtcclxuXHRcdFx0XHRpbmRleCA9IGRpY3RMZW5ndGggLSBsZW5ndGg7IC8vIHVzZSB0aGUgdGFpbCBvZiB0aGUgZGljdGlvbmFyeVxyXG5cdFx0XHR9XHJcblx0XHRcdHdpbmRvdy5zZXQoZGljdGlvbmFyeS5zdWJhcnJheShpbmRleCwgaW5kZXggKyBsZW5ndGgpLCAwKTtcclxuXHJcblx0XHRcdHN0cnN0YXJ0ID0gbGVuZ3RoO1xyXG5cdFx0XHRibG9ja19zdGFydCA9IGxlbmd0aDtcclxuXHJcblx0XHRcdC8vIEluc2VydCBhbGwgc3RyaW5ncyBpbiB0aGUgaGFzaCB0YWJsZSAoZXhjZXB0IGZvciB0aGUgbGFzdCB0d28gYnl0ZXMpLlxyXG5cdFx0XHQvLyBzLT5sb29rYWhlYWQgc3RheXMgbnVsbCwgc28gcy0+aW5zX2ggd2lsbCBiZSByZWNvbXB1dGVkIGF0IHRoZSBuZXh0XHJcblx0XHRcdC8vIGNhbGwgb2YgZmlsbF93aW5kb3cuXHJcblxyXG5cdFx0XHRpbnNfaCA9IHdpbmRvd1swXSAmIDB4ZmY7XHJcblx0XHRcdGluc19oID0gKCgoaW5zX2gpIDw8IGhhc2hfc2hpZnQpIF4gKHdpbmRvd1sxXSAmIDB4ZmYpKSAmIGhhc2hfbWFzaztcclxuXHJcblx0XHRcdGZvciAobiA9IDA7IG4gPD0gbGVuZ3RoIC0gTUlOX01BVENIOyBuKyspIHtcclxuXHRcdFx0XHRpbnNfaCA9ICgoKGluc19oKSA8PCBoYXNoX3NoaWZ0KSBeICh3aW5kb3dbKG4pICsgKE1JTl9NQVRDSCAtIDEpXSAmIDB4ZmYpKSAmIGhhc2hfbWFzaztcclxuXHRcdFx0XHRwcmV2W24gJiB3X21hc2tdID0gaGVhZFtpbnNfaF07XHJcblx0XHRcdFx0aGVhZFtpbnNfaF0gPSBuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBaX09LO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGF0LmRlZmxhdGUgPSBmdW5jdGlvbihfc3RybSwgZmx1c2gpIHtcclxuXHRcdFx0dmFyIGksIGhlYWRlciwgbGV2ZWxfZmxhZ3MsIG9sZF9mbHVzaCwgYnN0YXRlO1xyXG5cclxuXHRcdFx0aWYgKGZsdXNoID4gWl9GSU5JU0ggfHwgZmx1c2ggPCAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIV9zdHJtLm5leHRfb3V0IHx8ICghX3N0cm0ubmV4dF9pbiAmJiBfc3RybS5hdmFpbF9pbiAhPT0gMCkgfHwgKHN0YXR1cyA9PSBGSU5JU0hfU1RBVEUgJiYgZmx1c2ggIT0gWl9GSU5JU0gpKSB7XHJcblx0XHRcdFx0X3N0cm0ubXNnID0gel9lcnJtc2dbWl9ORUVEX0RJQ1QgLSAoWl9TVFJFQU1fRVJST1IpXTtcclxuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKF9zdHJtLmF2YWlsX291dCA9PT0gMCkge1xyXG5cdFx0XHRcdF9zdHJtLm1zZyA9IHpfZXJybXNnW1pfTkVFRF9ESUNUIC0gKFpfQlVGX0VSUk9SKV07XHJcblx0XHRcdFx0cmV0dXJuIFpfQlVGX0VSUk9SO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdHJtID0gX3N0cm07IC8vIGp1c3QgaW4gY2FzZVxyXG5cdFx0XHRvbGRfZmx1c2ggPSBsYXN0X2ZsdXNoO1xyXG5cdFx0XHRsYXN0X2ZsdXNoID0gZmx1c2g7XHJcblxyXG5cdFx0XHQvLyBXcml0ZSB0aGUgemxpYiBoZWFkZXJcclxuXHRcdFx0aWYgKHN0YXR1cyA9PSBJTklUX1NUQVRFKSB7XHJcblx0XHRcdFx0aGVhZGVyID0gKFpfREVGTEFURUQgKyAoKHdfYml0cyAtIDgpIDw8IDQpKSA8PCA4O1xyXG5cdFx0XHRcdGxldmVsX2ZsYWdzID0gKChsZXZlbCAtIDEpICYgMHhmZikgPj4gMTtcclxuXHJcblx0XHRcdFx0aWYgKGxldmVsX2ZsYWdzID4gMylcclxuXHRcdFx0XHRcdGxldmVsX2ZsYWdzID0gMztcclxuXHRcdFx0XHRoZWFkZXIgfD0gKGxldmVsX2ZsYWdzIDw8IDYpO1xyXG5cdFx0XHRcdGlmIChzdHJzdGFydCAhPT0gMClcclxuXHRcdFx0XHRcdGhlYWRlciB8PSBQUkVTRVRfRElDVDtcclxuXHRcdFx0XHRoZWFkZXIgKz0gMzEgLSAoaGVhZGVyICUgMzEpO1xyXG5cclxuXHRcdFx0XHRzdGF0dXMgPSBCVVNZX1NUQVRFO1xyXG5cdFx0XHRcdHB1dFNob3J0TVNCKGhlYWRlcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEZsdXNoIGFzIG11Y2ggcGVuZGluZyBvdXRwdXQgYXMgcG9zc2libGVcclxuXHRcdFx0aWYgKHRoYXQucGVuZGluZyAhPT0gMCkge1xyXG5cdFx0XHRcdHN0cm0uZmx1c2hfcGVuZGluZygpO1xyXG5cdFx0XHRcdGlmIChzdHJtLmF2YWlsX291dCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCIgYXZhaWxfb3V0PT0wXCIpO1xyXG5cdFx0XHRcdFx0Ly8gU2luY2UgYXZhaWxfb3V0IGlzIDAsIGRlZmxhdGUgd2lsbCBiZSBjYWxsZWQgYWdhaW4gd2l0aFxyXG5cdFx0XHRcdFx0Ly8gbW9yZSBvdXRwdXQgc3BhY2UsIGJ1dCBwb3NzaWJseSB3aXRoIGJvdGggcGVuZGluZyBhbmRcclxuXHRcdFx0XHRcdC8vIGF2YWlsX2luIGVxdWFsIHRvIHplcm8uIFRoZXJlIHdvbid0IGJlIGFueXRoaW5nIHRvIGRvLFxyXG5cdFx0XHRcdFx0Ly8gYnV0IHRoaXMgaXMgbm90IGFuIGVycm9yIHNpdHVhdGlvbiBzbyBtYWtlIHN1cmUgd2VcclxuXHRcdFx0XHRcdC8vIHJldHVybiBPSyBpbnN0ZWFkIG9mIEJVRl9FUlJPUiBhdCBuZXh0IGNhbGwgb2YgZGVmbGF0ZTpcclxuXHRcdFx0XHRcdGxhc3RfZmx1c2ggPSAtMTtcclxuXHRcdFx0XHRcdHJldHVybiBaX09LO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoZXJlIGlzIHNvbWV0aGluZyB0byBkbyBhbmQgYXZvaWQgZHVwbGljYXRlXHJcblx0XHRcdFx0Ly8gY29uc2VjdXRpdmVcclxuXHRcdFx0XHQvLyBmbHVzaGVzLiBGb3IgcmVwZWF0ZWQgYW5kIHVzZWxlc3MgY2FsbHMgd2l0aCBaX0ZJTklTSCwgd2Uga2VlcFxyXG5cdFx0XHRcdC8vIHJldHVybmluZyBaX1NUUkVBTV9FTkQgaW5zdGVhZCBvZiBaX0JVRkZfRVJST1IuXHJcblx0XHRcdH0gZWxzZSBpZiAoc3RybS5hdmFpbF9pbiA9PT0gMCAmJiBmbHVzaCA8PSBvbGRfZmx1c2ggJiYgZmx1c2ggIT0gWl9GSU5JU0gpIHtcclxuXHRcdFx0XHRzdHJtLm1zZyA9IHpfZXJybXNnW1pfTkVFRF9ESUNUIC0gKFpfQlVGX0VSUk9SKV07XHJcblx0XHRcdFx0cmV0dXJuIFpfQlVGX0VSUk9SO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBVc2VyIG11c3Qgbm90IHByb3ZpZGUgbW9yZSBpbnB1dCBhZnRlciB0aGUgZmlyc3QgRklOSVNIOlxyXG5cdFx0XHRpZiAoc3RhdHVzID09IEZJTklTSF9TVEFURSAmJiBzdHJtLmF2YWlsX2luICE9PSAwKSB7XHJcblx0XHRcdFx0X3N0cm0ubXNnID0gel9lcnJtc2dbWl9ORUVEX0RJQ1QgLSAoWl9CVUZfRVJST1IpXTtcclxuXHRcdFx0XHRyZXR1cm4gWl9CVUZfRVJST1I7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFN0YXJ0IGEgbmV3IGJsb2NrIG9yIGNvbnRpbnVlIHRoZSBjdXJyZW50IG9uZS5cclxuXHRcdFx0aWYgKHN0cm0uYXZhaWxfaW4gIT09IDAgfHwgbG9va2FoZWFkICE9PSAwIHx8IChmbHVzaCAhPSBaX05PX0ZMVVNIICYmIHN0YXR1cyAhPSBGSU5JU0hfU1RBVEUpKSB7XHJcblx0XHRcdFx0YnN0YXRlID0gLTE7XHJcblx0XHRcdFx0c3dpdGNoIChjb25maWdfdGFibGVbbGV2ZWxdLmZ1bmMpIHtcclxuXHRcdFx0XHRjYXNlIFNUT1JFRDpcclxuXHRcdFx0XHRcdGJzdGF0ZSA9IGRlZmxhdGVfc3RvcmVkKGZsdXNoKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgRkFTVDpcclxuXHRcdFx0XHRcdGJzdGF0ZSA9IGRlZmxhdGVfZmFzdChmbHVzaCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIFNMT1c6XHJcblx0XHRcdFx0XHRic3RhdGUgPSBkZWZsYXRlX3Nsb3coZmx1c2gpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChic3RhdGUgPT0gRmluaXNoU3RhcnRlZCB8fCBic3RhdGUgPT0gRmluaXNoRG9uZSkge1xyXG5cdFx0XHRcdFx0c3RhdHVzID0gRklOSVNIX1NUQVRFO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoYnN0YXRlID09IE5lZWRNb3JlIHx8IGJzdGF0ZSA9PSBGaW5pc2hTdGFydGVkKSB7XHJcblx0XHRcdFx0XHRpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcclxuXHRcdFx0XHRcdFx0bGFzdF9mbHVzaCA9IC0xOyAvLyBhdm9pZCBCVUZfRVJST1IgbmV4dCBjYWxsLCBzZWUgYWJvdmVcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBaX09LO1xyXG5cdFx0XHRcdFx0Ly8gSWYgZmx1c2ggIT0gWl9OT19GTFVTSCAmJiBhdmFpbF9vdXQgPT09IDAsIHRoZSBuZXh0IGNhbGxcclxuXHRcdFx0XHRcdC8vIG9mIGRlZmxhdGUgc2hvdWxkIHVzZSB0aGUgc2FtZSBmbHVzaCBwYXJhbWV0ZXIgdG8gbWFrZSBzdXJlXHJcblx0XHRcdFx0XHQvLyB0aGF0IHRoZSBmbHVzaCBpcyBjb21wbGV0ZS4gU28gd2UgZG9uJ3QgaGF2ZSB0byBvdXRwdXQgYW5cclxuXHRcdFx0XHRcdC8vIGVtcHR5IGJsb2NrIGhlcmUsIHRoaXMgd2lsbCBiZSBkb25lIGF0IG5leHQgY2FsbC4gVGhpcyBhbHNvXHJcblx0XHRcdFx0XHQvLyBlbnN1cmVzIHRoYXQgZm9yIGEgdmVyeSBzbWFsbCBvdXRwdXQgYnVmZmVyLCB3ZSBlbWl0IGF0IG1vc3RcclxuXHRcdFx0XHRcdC8vIG9uZSBlbXB0eSBibG9jay5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChic3RhdGUgPT0gQmxvY2tEb25lKSB7XHJcblx0XHRcdFx0XHRpZiAoZmx1c2ggPT0gWl9QQVJUSUFMX0ZMVVNIKSB7XHJcblx0XHRcdFx0XHRcdF90cl9hbGlnbigpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHsgLy8gRlVMTF9GTFVTSCBvciBTWU5DX0ZMVVNIXHJcblx0XHRcdFx0XHRcdF90cl9zdG9yZWRfYmxvY2soMCwgMCwgZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHQvLyBGb3IgYSBmdWxsIGZsdXNoLCB0aGlzIGVtcHR5IGJsb2NrIHdpbGwgYmUgcmVjb2duaXplZFxyXG5cdFx0XHRcdFx0XHQvLyBhcyBhIHNwZWNpYWwgbWFya2VyIGJ5IGluZmxhdGVfc3luYygpLlxyXG5cdFx0XHRcdFx0XHRpZiAoZmx1c2ggPT0gWl9GVUxMX0ZMVVNIKSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gc3RhdGUuaGVhZFtzLmhhc2hfc2l6ZS0xXT0wO1xyXG5cdFx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBoYXNoX3NpemUvKi0xKi87IGkrKylcclxuXHRcdFx0XHRcdFx0XHRcdC8vIGZvcmdldCBoaXN0b3J5XHJcblx0XHRcdFx0XHRcdFx0XHRoZWFkW2ldID0gMDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0c3RybS5mbHVzaF9wZW5kaW5nKCk7XHJcblx0XHRcdFx0XHRpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcclxuXHRcdFx0XHRcdFx0bGFzdF9mbHVzaCA9IC0xOyAvLyBhdm9pZCBCVUZfRVJST1IgYXQgbmV4dCBjYWxsLCBzZWUgYWJvdmVcclxuXHRcdFx0XHRcdFx0cmV0dXJuIFpfT0s7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZmx1c2ggIT0gWl9GSU5JU0gpXHJcblx0XHRcdFx0cmV0dXJuIFpfT0s7XHJcblx0XHRcdHJldHVybiBaX1NUUkVBTV9FTkQ7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Ly8gWlN0cmVhbVxyXG5cclxuXHRmdW5jdGlvbiBaU3RyZWFtKCkge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cdFx0dGhhdC5uZXh0X2luX2luZGV4ID0gMDtcclxuXHRcdHRoYXQubmV4dF9vdXRfaW5kZXggPSAwO1xyXG5cdFx0Ly8gdGhhdC5uZXh0X2luOyAvLyBuZXh0IGlucHV0IGJ5dGVcclxuXHRcdHRoYXQuYXZhaWxfaW4gPSAwOyAvLyBudW1iZXIgb2YgYnl0ZXMgYXZhaWxhYmxlIGF0IG5leHRfaW5cclxuXHRcdHRoYXQudG90YWxfaW4gPSAwOyAvLyB0b3RhbCBuYiBvZiBpbnB1dCBieXRlcyByZWFkIHNvIGZhclxyXG5cdFx0Ly8gdGhhdC5uZXh0X291dDsgLy8gbmV4dCBvdXRwdXQgYnl0ZSBzaG91bGQgYmUgcHV0IHRoZXJlXHJcblx0XHR0aGF0LmF2YWlsX291dCA9IDA7IC8vIHJlbWFpbmluZyBmcmVlIHNwYWNlIGF0IG5leHRfb3V0XHJcblx0XHR0aGF0LnRvdGFsX291dCA9IDA7IC8vIHRvdGFsIG5iIG9mIGJ5dGVzIG91dHB1dCBzbyBmYXJcclxuXHRcdC8vIHRoYXQubXNnO1xyXG5cdFx0Ly8gdGhhdC5kc3RhdGU7XHJcblx0fVxyXG5cclxuXHRaU3RyZWFtLnByb3RvdHlwZSA9IHtcclxuXHRcdGRlZmxhdGVJbml0IDogZnVuY3Rpb24obGV2ZWwsIGJpdHMpIHtcclxuXHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cdFx0XHR0aGF0LmRzdGF0ZSA9IG5ldyBEZWZsYXRlKCk7XHJcblx0XHRcdGlmICghYml0cylcclxuXHRcdFx0XHRiaXRzID0gTUFYX0JJVFM7XHJcblx0XHRcdHJldHVybiB0aGF0LmRzdGF0ZS5kZWZsYXRlSW5pdCh0aGF0LCBsZXZlbCwgYml0cyk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGRlZmxhdGUgOiBmdW5jdGlvbihmbHVzaCkge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdGlmICghdGhhdC5kc3RhdGUpIHtcclxuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRoYXQuZHN0YXRlLmRlZmxhdGUodGhhdCwgZmx1c2gpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRkZWZsYXRlRW5kIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHRcdFx0aWYgKCF0aGF0LmRzdGF0ZSlcclxuXHRcdFx0XHRyZXR1cm4gWl9TVFJFQU1fRVJST1I7XHJcblx0XHRcdHZhciByZXQgPSB0aGF0LmRzdGF0ZS5kZWZsYXRlRW5kKCk7XHJcblx0XHRcdHRoYXQuZHN0YXRlID0gbnVsbDtcclxuXHRcdFx0cmV0dXJuIHJldDtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGVmbGF0ZVBhcmFtcyA6IGZ1bmN0aW9uKGxldmVsLCBzdHJhdGVneSkge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdGlmICghdGhhdC5kc3RhdGUpXHJcblx0XHRcdFx0cmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xyXG5cdFx0XHRyZXR1cm4gdGhhdC5kc3RhdGUuZGVmbGF0ZVBhcmFtcyh0aGF0LCBsZXZlbCwgc3RyYXRlZ3kpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRkZWZsYXRlU2V0RGljdGlvbmFyeSA6IGZ1bmN0aW9uKGRpY3Rpb25hcnksIGRpY3RMZW5ndGgpIHtcclxuXHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cdFx0XHRpZiAoIXRoYXQuZHN0YXRlKVxyXG5cdFx0XHRcdHJldHVybiBaX1NUUkVBTV9FUlJPUjtcclxuXHRcdFx0cmV0dXJuIHRoYXQuZHN0YXRlLmRlZmxhdGVTZXREaWN0aW9uYXJ5KHRoYXQsIGRpY3Rpb25hcnksIGRpY3RMZW5ndGgpO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBSZWFkIGEgbmV3IGJ1ZmZlciBmcm9tIHRoZSBjdXJyZW50IGlucHV0IHN0cmVhbSwgdXBkYXRlIHRoZVxyXG5cdFx0Ly8gdG90YWwgbnVtYmVyIG9mIGJ5dGVzIHJlYWQuIEFsbCBkZWZsYXRlKCkgaW5wdXQgZ29lcyB0aHJvdWdoXHJcblx0XHQvLyB0aGlzIGZ1bmN0aW9uIHNvIHNvbWUgYXBwbGljYXRpb25zIG1heSB3aXNoIHRvIG1vZGlmeSBpdCB0byBhdm9pZFxyXG5cdFx0Ly8gYWxsb2NhdGluZyBhIGxhcmdlIHN0cm0tPm5leHRfaW4gYnVmZmVyIGFuZCBjb3B5aW5nIGZyb20gaXQuXHJcblx0XHQvLyAoU2VlIGFsc28gZmx1c2hfcGVuZGluZygpKS5cclxuXHRcdHJlYWRfYnVmIDogZnVuY3Rpb24oYnVmLCBzdGFydCwgc2l6ZSkge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdHZhciBsZW4gPSB0aGF0LmF2YWlsX2luO1xyXG5cdFx0XHRpZiAobGVuID4gc2l6ZSlcclxuXHRcdFx0XHRsZW4gPSBzaXplO1xyXG5cdFx0XHRpZiAobGVuID09PSAwKVxyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR0aGF0LmF2YWlsX2luIC09IGxlbjtcclxuXHRcdFx0YnVmLnNldCh0aGF0Lm5leHRfaW4uc3ViYXJyYXkodGhhdC5uZXh0X2luX2luZGV4LCB0aGF0Lm5leHRfaW5faW5kZXggKyBsZW4pLCBzdGFydCk7XHJcblx0XHRcdHRoYXQubmV4dF9pbl9pbmRleCArPSBsZW47XHJcblx0XHRcdHRoYXQudG90YWxfaW4gKz0gbGVuO1xyXG5cdFx0XHRyZXR1cm4gbGVuO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBGbHVzaCBhcyBtdWNoIHBlbmRpbmcgb3V0cHV0IGFzIHBvc3NpYmxlLiBBbGwgZGVmbGF0ZSgpIG91dHB1dCBnb2VzXHJcblx0XHQvLyB0aHJvdWdoIHRoaXMgZnVuY3Rpb24gc28gc29tZSBhcHBsaWNhdGlvbnMgbWF5IHdpc2ggdG8gbW9kaWZ5IGl0XHJcblx0XHQvLyB0byBhdm9pZCBhbGxvY2F0aW5nIGEgbGFyZ2Ugc3RybS0+bmV4dF9vdXQgYnVmZmVyIGFuZCBjb3B5aW5nIGludG8gaXQuXHJcblx0XHQvLyAoU2VlIGFsc28gcmVhZF9idWYoKSkuXHJcblx0XHRmbHVzaF9wZW5kaW5nIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHRcdFx0dmFyIGxlbiA9IHRoYXQuZHN0YXRlLnBlbmRpbmc7XHJcblxyXG5cdFx0XHRpZiAobGVuID4gdGhhdC5hdmFpbF9vdXQpXHJcblx0XHRcdFx0bGVuID0gdGhhdC5hdmFpbF9vdXQ7XHJcblx0XHRcdGlmIChsZW4gPT09IDApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0Ly8gaWYgKHRoYXQuZHN0YXRlLnBlbmRpbmdfYnVmLmxlbmd0aCA8PSB0aGF0LmRzdGF0ZS5wZW5kaW5nX291dCB8fCB0aGF0Lm5leHRfb3V0Lmxlbmd0aCA8PSB0aGF0Lm5leHRfb3V0X2luZGV4XHJcblx0XHRcdC8vIHx8IHRoYXQuZHN0YXRlLnBlbmRpbmdfYnVmLmxlbmd0aCA8ICh0aGF0LmRzdGF0ZS5wZW5kaW5nX291dCArIGxlbikgfHwgdGhhdC5uZXh0X291dC5sZW5ndGggPCAodGhhdC5uZXh0X291dF9pbmRleCArXHJcblx0XHRcdC8vIGxlbikpIHtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2codGhhdC5kc3RhdGUucGVuZGluZ19idWYubGVuZ3RoICsgXCIsIFwiICsgdGhhdC5kc3RhdGUucGVuZGluZ19vdXQgKyBcIiwgXCIgKyB0aGF0Lm5leHRfb3V0Lmxlbmd0aCArIFwiLCBcIiArXHJcblx0XHRcdC8vIHRoYXQubmV4dF9vdXRfaW5kZXggKyBcIiwgXCIgKyBsZW4pO1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcImF2YWlsX291dD1cIiArIHRoYXQuYXZhaWxfb3V0KTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0dGhhdC5uZXh0X291dC5zZXQodGhhdC5kc3RhdGUucGVuZGluZ19idWYuc3ViYXJyYXkodGhhdC5kc3RhdGUucGVuZGluZ19vdXQsIHRoYXQuZHN0YXRlLnBlbmRpbmdfb3V0ICsgbGVuKSwgdGhhdC5uZXh0X291dF9pbmRleCk7XHJcblxyXG5cdFx0XHR0aGF0Lm5leHRfb3V0X2luZGV4ICs9IGxlbjtcclxuXHRcdFx0dGhhdC5kc3RhdGUucGVuZGluZ19vdXQgKz0gbGVuO1xyXG5cdFx0XHR0aGF0LnRvdGFsX291dCArPSBsZW47XHJcblx0XHRcdHRoYXQuYXZhaWxfb3V0IC09IGxlbjtcclxuXHRcdFx0dGhhdC5kc3RhdGUucGVuZGluZyAtPSBsZW47XHJcblx0XHRcdGlmICh0aGF0LmRzdGF0ZS5wZW5kaW5nID09PSAwKSB7XHJcblx0XHRcdFx0dGhhdC5kc3RhdGUucGVuZGluZ19vdXQgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0Ly8gRGVmbGF0ZXJcclxuXHJcblx0ZnVuY3Rpb24gRGVmbGF0ZXIobGV2ZWwpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHRcdHZhciB6ID0gbmV3IFpTdHJlYW0oKTtcclxuXHRcdHZhciBidWZzaXplID0gNTEyO1xyXG5cdFx0dmFyIGZsdXNoID0gWl9OT19GTFVTSDtcclxuXHRcdHZhciBidWYgPSBuZXcgVWludDhBcnJheShidWZzaXplKTtcclxuXHJcblx0XHRpZiAodHlwZW9mIGxldmVsID09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdGxldmVsID0gWl9ERUZBVUxUX0NPTVBSRVNTSU9OO1xyXG5cdFx0ei5kZWZsYXRlSW5pdChsZXZlbCk7XHJcblx0XHR6Lm5leHRfb3V0ID0gYnVmO1xyXG5cclxuXHRcdHRoYXQuYXBwZW5kID0gZnVuY3Rpb24oZGF0YSwgb25wcm9ncmVzcykge1xyXG5cdFx0XHR2YXIgZXJyLCBidWZmZXJzID0gW10sIGxhc3RJbmRleCA9IDAsIGJ1ZmZlckluZGV4ID0gMCwgYnVmZmVyU2l6ZSA9IDAsIGFycmF5O1xyXG5cdFx0XHRpZiAoIWRhdGEubGVuZ3RoKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0ei5uZXh0X2luX2luZGV4ID0gMDtcclxuXHRcdFx0ei5uZXh0X2luID0gZGF0YTtcclxuXHRcdFx0ei5hdmFpbF9pbiA9IGRhdGEubGVuZ3RoO1xyXG5cdFx0XHRkbyB7XHJcblx0XHRcdFx0ei5uZXh0X291dF9pbmRleCA9IDA7XHJcblx0XHRcdFx0ei5hdmFpbF9vdXQgPSBidWZzaXplO1xyXG5cdFx0XHRcdGVyciA9IHouZGVmbGF0ZShmbHVzaCk7XHJcblx0XHRcdFx0aWYgKGVyciAhPSBaX09LKVxyXG5cdFx0XHRcdFx0dGhyb3cgXCJkZWZsYXRpbmc6IFwiICsgei5tc2c7XHJcblx0XHRcdFx0aWYgKHoubmV4dF9vdXRfaW5kZXgpXHJcblx0XHRcdFx0XHRpZiAoei5uZXh0X291dF9pbmRleCA9PSBidWZzaXplKVxyXG5cdFx0XHRcdFx0XHRidWZmZXJzLnB1c2gobmV3IFVpbnQ4QXJyYXkoYnVmKSk7XHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdGJ1ZmZlcnMucHVzaChuZXcgVWludDhBcnJheShidWYuc3ViYXJyYXkoMCwgei5uZXh0X291dF9pbmRleCkpKTtcclxuXHRcdFx0XHRidWZmZXJTaXplICs9IHoubmV4dF9vdXRfaW5kZXg7XHJcblx0XHRcdFx0aWYgKG9ucHJvZ3Jlc3MgJiYgei5uZXh0X2luX2luZGV4ID4gMCAmJiB6Lm5leHRfaW5faW5kZXggIT0gbGFzdEluZGV4KSB7XHJcblx0XHRcdFx0XHRvbnByb2dyZXNzKHoubmV4dF9pbl9pbmRleCk7XHJcblx0XHRcdFx0XHRsYXN0SW5kZXggPSB6Lm5leHRfaW5faW5kZXg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IHdoaWxlICh6LmF2YWlsX2luID4gMCB8fCB6LmF2YWlsX291dCA9PT0gMCk7XHJcblx0XHRcdGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyU2l6ZSk7XHJcblx0XHRcdGJ1ZmZlcnMuZm9yRWFjaChmdW5jdGlvbihjaHVuaykge1xyXG5cdFx0XHRcdGFycmF5LnNldChjaHVuaywgYnVmZmVySW5kZXgpO1xyXG5cdFx0XHRcdGJ1ZmZlckluZGV4ICs9IGNodW5rLmxlbmd0aDtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBhcnJheTtcclxuXHRcdH07XHJcblx0XHR0aGF0LmZsdXNoID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBlcnIsIGJ1ZmZlcnMgPSBbXSwgYnVmZmVySW5kZXggPSAwLCBidWZmZXJTaXplID0gMCwgYXJyYXk7XHJcblx0XHRcdGRvIHtcclxuXHRcdFx0XHR6Lm5leHRfb3V0X2luZGV4ID0gMDtcclxuXHRcdFx0XHR6LmF2YWlsX291dCA9IGJ1ZnNpemU7XHJcblx0XHRcdFx0ZXJyID0gei5kZWZsYXRlKFpfRklOSVNIKTtcclxuXHRcdFx0XHRpZiAoZXJyICE9IFpfU1RSRUFNX0VORCAmJiBlcnIgIT0gWl9PSylcclxuXHRcdFx0XHRcdHRocm93IFwiZGVmbGF0aW5nOiBcIiArIHoubXNnO1xyXG5cdFx0XHRcdGlmIChidWZzaXplIC0gei5hdmFpbF9vdXQgPiAwKVxyXG5cdFx0XHRcdFx0YnVmZmVycy5wdXNoKG5ldyBVaW50OEFycmF5KGJ1Zi5zdWJhcnJheSgwLCB6Lm5leHRfb3V0X2luZGV4KSkpO1xyXG5cdFx0XHRcdGJ1ZmZlclNpemUgKz0gei5uZXh0X291dF9pbmRleDtcclxuXHRcdFx0fSB3aGlsZSAoei5hdmFpbF9pbiA+IDAgfHwgei5hdmFpbF9vdXQgPT09IDApO1xyXG5cdFx0XHR6LmRlZmxhdGVFbmQoKTtcclxuXHRcdFx0YXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJTaXplKTtcclxuXHRcdFx0YnVmZmVycy5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rKSB7XHJcblx0XHRcdFx0YXJyYXkuc2V0KGNodW5rLCBidWZmZXJJbmRleCk7XHJcblx0XHRcdFx0YnVmZmVySW5kZXggKz0gY2h1bmsubGVuZ3RoO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIGFycmF5O1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHZhciBkZWZsYXRlcjtcclxuXHJcblx0aWYgKG9iai56aXApXHJcblx0XHRvYmouemlwLkRlZmxhdGVyID0gRGVmbGF0ZXI7XHJcblx0ZWxzZSB7XHJcblx0XHRkZWZsYXRlciA9IG5ldyBEZWZsYXRlcigpO1xyXG5cdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdHZhciBtZXNzYWdlID0gZXZlbnQuZGF0YTtcclxuXHRcdFx0aWYgKG1lc3NhZ2UuaW5pdCkge1xyXG5cdFx0XHRcdGRlZmxhdGVyID0gbmV3IERlZmxhdGVyKG1lc3NhZ2UubGV2ZWwpO1xyXG5cdFx0XHRcdG9iai5wb3N0TWVzc2FnZSh7XHJcblx0XHRcdFx0XHRvbmluaXQgOiB0cnVlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG1lc3NhZ2UuYXBwZW5kKVxyXG5cdFx0XHRcdG9iai5wb3N0TWVzc2FnZSh7XHJcblx0XHRcdFx0XHRvbmFwcGVuZCA6IHRydWUsXHJcblx0XHRcdFx0XHRkYXRhIDogZGVmbGF0ZXIuYXBwZW5kKG1lc3NhZ2UuZGF0YSwgZnVuY3Rpb24oY3VycmVudCkge1xyXG5cdFx0XHRcdFx0XHRvYmoucG9zdE1lc3NhZ2Uoe1xyXG5cdFx0XHRcdFx0XHRcdHByb2dyZXNzIDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50IDogY3VycmVudFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdGlmIChtZXNzYWdlLmZsdXNoKVxyXG5cdFx0XHRcdG9iai5wb3N0TWVzc2FnZSh7XHJcblx0XHRcdFx0XHRvbmZsdXNoIDogdHJ1ZSxcclxuXHRcdFx0XHRcdGRhdGEgOiBkZWZsYXRlci5mbHVzaCgpXHJcblx0XHRcdFx0fSk7XHJcblx0XHR9LCBmYWxzZSk7XHJcblx0fVxyXG5cclxufSkoc2VsZik7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0cmluZy1yZXBsYWNlLXdlYnBhY2stcGx1Z2luL2xvYWRlci5qcz9pZD1nNmQ5ZnNwNWRsZyEuL25vZGVfbW9kdWxlcy9zdHJpbmctcmVwbGFjZS13ZWJwYWNrLXBsdWdpbi9sb2FkZXIuanM/aWQ9ZGg1ZndydTB4cW8hLi9ub2RlX21vZHVsZXMvdGVycmlhanMvYnVpbGRwcm9jZXNzL3JlbW92ZUNlc2l1bURlYnVnUHJhZ21hcy5qcyEuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL1RoaXJkUGFydHkvV29ya2Vycy9kZWZsYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBOzs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9