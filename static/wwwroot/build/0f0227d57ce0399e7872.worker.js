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
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/babel-loader/lib/index.js?!./node_modules/terriajs/lib/ReactViews/Custom/Chart/downloadHrefWorker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/terriajs/lib/ReactViews/Custom/Chart/downloadHrefWorker.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--12!./node_modules/terriajs/lib/ReactViews/Custom/Chart/downloadHrefWorker.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _defined = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/defined */ "./node_modules/terriajs-cesium/Source/Core/defined.js"));

var _sortedIndices = _interopRequireDefault(__webpack_require__(/*! ../../../Core/sortedIndices */ "./node_modules/terriajs/lib/Core/sortedIndices.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* global onmessage:true */

/**
 * Create combined arrays from arrays of column values, eg. [[values1, values2, values3], [values4, values5]].
 * The first columns of each array must be of the same type (in the above example, values1 and values4).
 * These are combined and sorted into a single column.
 * Then the subsequent columns are added, filling with null where missing. (This could be an option in future.)
 * Eg. if the values of each col are: values1=[1,3]; values2=[10,30]; values3=[100,300]; values4=[1,2]; values5=[-1,-2];
 * then the resulting array of column values are, in order, [1,2,3]; [10,null,30]; [100,null,300]; [-1,-2,null].
 * @param {Array[]} valueArrays See description above.
 * @return {Array[]} The synthesized values which could be passed to a table structure.
 */
function combineValueArrays(valueArrays) {
  if (!(0, _defined["default"])(valueArrays) || valueArrays.length < 1) {
    return;
  }

  var combinedValueArrays = []; // Start by copying the first set of columns into the result.

  var firstArray = valueArrays[0];

  for (var j = 0; j < firstArray.length; j++) {
    var values = firstArray[j];
    combinedValueArrays.push(values.slice());
  } // Then add the subsequent sets of x-columns to the end of the first result column,
  // add nulls to the end of the other existing columns,
  // add nulls to the start of the new columns,
  // and add them to the end of the result.


  for (var i = 1; i < valueArrays.length; i++) {
    var currentValueArray = valueArrays[i];
    var currentFirstArray = currentValueArray[0];
    var preExistingValuesLength = combinedValueArrays[0].length;
    combinedValueArrays[0] = combinedValueArrays[0].concat(currentFirstArray);
    var empty1 = new Array(currentFirstArray.length); // elements are undefined.

    for (var k = 1; k < combinedValueArrays.length; k++) {
      combinedValueArrays[k] = combinedValueArrays[k].concat(empty1);
    }

    var empty2 = new Array(preExistingValuesLength); // elements are undefined.

    for (var _j = 1; _j < currentValueArray.length; _j++) {
      var _values = currentValueArray[_j];
      combinedValueArrays.push(empty2.concat(_values));
    }
  } // Sort by the first column.


  combinedValueArrays = sortByFirst(combinedValueArrays);
  combinedValueArrays = combineRepeated(combinedValueArrays);
  return combinedValueArrays;
}
/**
 * Eg. sortByFirst([['b', 'a', 'c'], [1, 2, 3]]) = [['a', 'b', 'c'], [2, 1, 3]].
 * @param  {Array[]} valueArrays The array of arrays of values to sort.
 * @return {Array[]} The values sorted by the first column.
 */


function sortByFirst(valueArrays) {
  var firstValues = valueArrays[0];
  var indices = (0, _sortedIndices["default"])(firstValues);
  return valueArrays.map(function (values) {
    return indices.map(function (sortedIndex) {
      return values[sortedIndex];
    });
  });
}
/**
 * @param  {Array[]} sortedJulianDateOrValueArrays The array of arrays of values to combine. These must be sortedByFirst. Dates must be JulianDates.
 * @param  {Integer} [firstColumnType] Eg. VarType.TIME.
 * @return {Array[]} The values, with any repeats in the first column combined into one. Dates are converted to ISO8601 string representation.
 *
 * Eg.
 * var x = [['a', 'b', 'b', 'c'], [1, 2, undefined, 3], [4, undefined, 5, undefined]];
 * combineRepeated(x);
 * # x is [['a', 'b', 'c'], [1, 2, 3], [4, 5, undefined]].
 */


function combineRepeated(sortedValueArrays) {
  var result = new Array(sortedValueArrays.length);

  for (var i = 0; i < result.length; i++) {
    result[i] = [sortedValueArrays[i][0]];
  }

  for (var j = 1; j < sortedValueArrays[0].length; j++) {
    if (sortedValueArrays[0][j] === sortedValueArrays[0][j - 1]) {
      var currentIndex = result[0].length - 1;

      for (var _i = 0; _i < result.length; _i++) {
        if (result[_i][currentIndex] === undefined) {
          result[_i][currentIndex] = sortedValueArrays[_i][j];
        }
      }
    } else {
      for (var _i2 = 0; _i2 < result.length; _i2++) {
        result[_i2].push(sortedValueArrays[_i2][j]);
      }
    }
  }

  return result;
}
/**
 * Convert an array of column values, with column names, to an array of row values.
 * @param  {Array[]} columnValueArrays Array of column values, eg. [[1,2,3], [4,5,6]].
 * @param  {String[]} columnNames Array of column names, eg ['x', 'y'].
 * @return {Array[]} Array of rows, starting with the column names, eg. [['x', 'y'], [1, 4], [2, 5], [3, 6]].
 */


function toArrayOfRows(columnValueArrays, columnNames) {
  if (columnValueArrays.length < 1) {
    return;
  }

  var rows = columnValueArrays[0].map(function (value0, rowIndex) {
    return columnValueArrays.map(function (values) {
      return values[rowIndex];
    });
  });
  rows.unshift(columnNames);
  return rows;
}

onmessage = function onmessage(event) {
  var valueArrays = event.data.values.map(function (valuesArray) {
    return valuesArray.map(function (values) {
      return Array.prototype.slice.call(values);
    });
  }); // Convert from typed arrays.

  var nameArrays = event.data.names;
  var combinedValues = combineValueArrays(valueArrays);
  var rows = toArrayOfRows(combinedValues, nameArrays);
  var joinedRows = rows.map(function (row) {
    return row.join(",");
  });
  var csvString = joinedRows.join("\n");
  postMessage(csvString);
};

/***/ }),

/***/ "./node_modules/terriajs-cesium/Source/Core/defined.js":
/*!*************************************************************!*\
  !*** ./node_modules/terriajs-cesium/Source/Core/defined.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @function
 *
 * @param {*} value The object.
 * @returns {Boolean} Returns true if the object is defined, returns false otherwise.
 *
 * @example
 * if (Cesium.defined(positions)) {
 *      doSomething();
 * } else {
 *      doSomethingElse();
 * }
 */
function defined(value) {
  return value !== undefined && value !== null;
}
/* harmony default export */ __webpack_exports__["default"] = (defined);


/***/ }),

/***/ "./node_modules/terriajs/lib/Core/sortedIndices.js":
/*!*********************************************************!*\
  !*** ./node_modules/terriajs/lib/Core/sortedIndices.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Returns indices such that array[indices[i]] = sortedArray[i].
 * Eg. sortedIndices(['c', 'a', 'b', 'd']) => [1, 2, 0, 3]. (The sorted array is [a, b, c, d], and "a" was in position 1, "b" in position 2, etc.)
 * @param {Array} array The array to sort.
 * @param {Function} [compareFunction] The usual compare function, eg. function(a, b) { return a - b }.
 * @return {Array} The sorted indices, such that array[sortedIndices[0]] = sortedArray[0].
 */

function sortedIndices(array, compareFunction) {
  var length = array.length;
  var indices = new Array(length);

  for (var i = 0; i < length; i++) {
    indices[i] = i;
  }

  if (!compareFunction) {
    compareFunction = function compareFunction(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    };
  }

  indices.sort(function (a, b) {
    return compareFunction(array[a], array[b]);
  });
  return indices;
} //
// Note: for indices which go in the other direction, just use indexOf like this:
//
// it('inverse indices work', function() {
//     var data = ['c', 'a', 'b', 'd'];
//     var sorted = data.slice().sort();
//     var inverseIndices = data.map(function(datum) { return sorted.indexOf(datum); });
//     expect(inverseIndices).toEqual([2, 0, 1, 3]);
// });


module.exports = sortedIndices;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMGYwMjI3ZDU3Y2UwMzk5ZTc4NzIud29ya2VyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy9saWIvUmVhY3RWaWV3cy9DdXN0b20vQ2hhcnQvZG93bmxvYWRIcmVmV29ya2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL0NvcmUvc29ydGVkSW5kaWNlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImJ1aWxkL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPyEuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy9saWIvUmVhY3RWaWV3cy9DdXN0b20vQ2hhcnQvZG93bmxvYWRIcmVmV29ya2VyLmpzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZGVmaW5lZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInRlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9kZWZpbmVkXCIpKTtcblxudmFyIF9zb3J0ZWRJbmRpY2VzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vLi4vQ29yZS9zb3J0ZWRJbmRpY2VzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cbi8qIGdsb2JhbCBvbm1lc3NhZ2U6dHJ1ZSAqL1xuXG4vKipcbiAqIENyZWF0ZSBjb21iaW5lZCBhcnJheXMgZnJvbSBhcnJheXMgb2YgY29sdW1uIHZhbHVlcywgZWcuIFtbdmFsdWVzMSwgdmFsdWVzMiwgdmFsdWVzM10sIFt2YWx1ZXM0LCB2YWx1ZXM1XV0uXG4gKiBUaGUgZmlyc3QgY29sdW1ucyBvZiBlYWNoIGFycmF5IG11c3QgYmUgb2YgdGhlIHNhbWUgdHlwZSAoaW4gdGhlIGFib3ZlIGV4YW1wbGUsIHZhbHVlczEgYW5kIHZhbHVlczQpLlxuICogVGhlc2UgYXJlIGNvbWJpbmVkIGFuZCBzb3J0ZWQgaW50byBhIHNpbmdsZSBjb2x1bW4uXG4gKiBUaGVuIHRoZSBzdWJzZXF1ZW50IGNvbHVtbnMgYXJlIGFkZGVkLCBmaWxsaW5nIHdpdGggbnVsbCB3aGVyZSBtaXNzaW5nLiAoVGhpcyBjb3VsZCBiZSBhbiBvcHRpb24gaW4gZnV0dXJlLilcbiAqIEVnLiBpZiB0aGUgdmFsdWVzIG9mIGVhY2ggY29sIGFyZTogdmFsdWVzMT1bMSwzXTsgdmFsdWVzMj1bMTAsMzBdOyB2YWx1ZXMzPVsxMDAsMzAwXTsgdmFsdWVzND1bMSwyXTsgdmFsdWVzNT1bLTEsLTJdO1xuICogdGhlbiB0aGUgcmVzdWx0aW5nIGFycmF5IG9mIGNvbHVtbiB2YWx1ZXMgYXJlLCBpbiBvcmRlciwgWzEsMiwzXTsgWzEwLG51bGwsMzBdOyBbMTAwLG51bGwsMzAwXTsgWy0xLC0yLG51bGxdLlxuICogQHBhcmFtIHtBcnJheVtdfSB2YWx1ZUFycmF5cyBTZWUgZGVzY3JpcHRpb24gYWJvdmUuXG4gKiBAcmV0dXJuIHtBcnJheVtdfSBUaGUgc3ludGhlc2l6ZWQgdmFsdWVzIHdoaWNoIGNvdWxkIGJlIHBhc3NlZCB0byBhIHRhYmxlIHN0cnVjdHVyZS5cbiAqL1xuZnVuY3Rpb24gY29tYmluZVZhbHVlQXJyYXlzKHZhbHVlQXJyYXlzKSB7XG4gIGlmICghKDAsIF9kZWZpbmVkW1wiZGVmYXVsdFwiXSkodmFsdWVBcnJheXMpIHx8IHZhbHVlQXJyYXlzLmxlbmd0aCA8IDEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY29tYmluZWRWYWx1ZUFycmF5cyA9IFtdOyAvLyBTdGFydCBieSBjb3B5aW5nIHRoZSBmaXJzdCBzZXQgb2YgY29sdW1ucyBpbnRvIHRoZSByZXN1bHQuXG5cbiAgdmFyIGZpcnN0QXJyYXkgPSB2YWx1ZUFycmF5c1swXTtcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IGZpcnN0QXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICB2YXIgdmFsdWVzID0gZmlyc3RBcnJheVtqXTtcbiAgICBjb21iaW5lZFZhbHVlQXJyYXlzLnB1c2godmFsdWVzLnNsaWNlKCkpO1xuICB9IC8vIFRoZW4gYWRkIHRoZSBzdWJzZXF1ZW50IHNldHMgb2YgeC1jb2x1bW5zIHRvIHRoZSBlbmQgb2YgdGhlIGZpcnN0IHJlc3VsdCBjb2x1bW4sXG4gIC8vIGFkZCBudWxscyB0byB0aGUgZW5kIG9mIHRoZSBvdGhlciBleGlzdGluZyBjb2x1bW5zLFxuICAvLyBhZGQgbnVsbHMgdG8gdGhlIHN0YXJ0IG9mIHRoZSBuZXcgY29sdW1ucyxcbiAgLy8gYW5kIGFkZCB0aGVtIHRvIHRoZSBlbmQgb2YgdGhlIHJlc3VsdC5cblxuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgdmFsdWVBcnJheXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY3VycmVudFZhbHVlQXJyYXkgPSB2YWx1ZUFycmF5c1tpXTtcbiAgICB2YXIgY3VycmVudEZpcnN0QXJyYXkgPSBjdXJyZW50VmFsdWVBcnJheVswXTtcbiAgICB2YXIgcHJlRXhpc3RpbmdWYWx1ZXNMZW5ndGggPSBjb21iaW5lZFZhbHVlQXJyYXlzWzBdLmxlbmd0aDtcbiAgICBjb21iaW5lZFZhbHVlQXJyYXlzWzBdID0gY29tYmluZWRWYWx1ZUFycmF5c1swXS5jb25jYXQoY3VycmVudEZpcnN0QXJyYXkpO1xuICAgIHZhciBlbXB0eTEgPSBuZXcgQXJyYXkoY3VycmVudEZpcnN0QXJyYXkubGVuZ3RoKTsgLy8gZWxlbWVudHMgYXJlIHVuZGVmaW5lZC5cblxuICAgIGZvciAodmFyIGsgPSAxOyBrIDwgY29tYmluZWRWYWx1ZUFycmF5cy5sZW5ndGg7IGsrKykge1xuICAgICAgY29tYmluZWRWYWx1ZUFycmF5c1trXSA9IGNvbWJpbmVkVmFsdWVBcnJheXNba10uY29uY2F0KGVtcHR5MSk7XG4gICAgfVxuXG4gICAgdmFyIGVtcHR5MiA9IG5ldyBBcnJheShwcmVFeGlzdGluZ1ZhbHVlc0xlbmd0aCk7IC8vIGVsZW1lbnRzIGFyZSB1bmRlZmluZWQuXG5cbiAgICBmb3IgKHZhciBfaiA9IDE7IF9qIDwgY3VycmVudFZhbHVlQXJyYXkubGVuZ3RoOyBfaisrKSB7XG4gICAgICB2YXIgX3ZhbHVlcyA9IGN1cnJlbnRWYWx1ZUFycmF5W19qXTtcbiAgICAgIGNvbWJpbmVkVmFsdWVBcnJheXMucHVzaChlbXB0eTIuY29uY2F0KF92YWx1ZXMpKTtcbiAgICB9XG4gIH0gLy8gU29ydCBieSB0aGUgZmlyc3QgY29sdW1uLlxuXG5cbiAgY29tYmluZWRWYWx1ZUFycmF5cyA9IHNvcnRCeUZpcnN0KGNvbWJpbmVkVmFsdWVBcnJheXMpO1xuICBjb21iaW5lZFZhbHVlQXJyYXlzID0gY29tYmluZVJlcGVhdGVkKGNvbWJpbmVkVmFsdWVBcnJheXMpO1xuICByZXR1cm4gY29tYmluZWRWYWx1ZUFycmF5cztcbn1cbi8qKlxuICogRWcuIHNvcnRCeUZpcnN0KFtbJ2InLCAnYScsICdjJ10sIFsxLCAyLCAzXV0pID0gW1snYScsICdiJywgJ2MnXSwgWzIsIDEsIDNdXS5cbiAqIEBwYXJhbSAge0FycmF5W119IHZhbHVlQXJyYXlzIFRoZSBhcnJheSBvZiBhcnJheXMgb2YgdmFsdWVzIHRvIHNvcnQuXG4gKiBAcmV0dXJuIHtBcnJheVtdfSBUaGUgdmFsdWVzIHNvcnRlZCBieSB0aGUgZmlyc3QgY29sdW1uLlxuICovXG5cblxuZnVuY3Rpb24gc29ydEJ5Rmlyc3QodmFsdWVBcnJheXMpIHtcbiAgdmFyIGZpcnN0VmFsdWVzID0gdmFsdWVBcnJheXNbMF07XG4gIHZhciBpbmRpY2VzID0gKDAsIF9zb3J0ZWRJbmRpY2VzW1wiZGVmYXVsdFwiXSkoZmlyc3RWYWx1ZXMpO1xuICByZXR1cm4gdmFsdWVBcnJheXMubWFwKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICByZXR1cm4gaW5kaWNlcy5tYXAoZnVuY3Rpb24gKHNvcnRlZEluZGV4KSB7XG4gICAgICByZXR1cm4gdmFsdWVzW3NvcnRlZEluZGV4XTtcbiAgICB9KTtcbiAgfSk7XG59XG4vKipcbiAqIEBwYXJhbSAge0FycmF5W119IHNvcnRlZEp1bGlhbkRhdGVPclZhbHVlQXJyYXlzIFRoZSBhcnJheSBvZiBhcnJheXMgb2YgdmFsdWVzIHRvIGNvbWJpbmUuIFRoZXNlIG11c3QgYmUgc29ydGVkQnlGaXJzdC4gRGF0ZXMgbXVzdCBiZSBKdWxpYW5EYXRlcy5cbiAqIEBwYXJhbSAge0ludGVnZXJ9IFtmaXJzdENvbHVtblR5cGVdIEVnLiBWYXJUeXBlLlRJTUUuXG4gKiBAcmV0dXJuIHtBcnJheVtdfSBUaGUgdmFsdWVzLCB3aXRoIGFueSByZXBlYXRzIGluIHRoZSBmaXJzdCBjb2x1bW4gY29tYmluZWQgaW50byBvbmUuIERhdGVzIGFyZSBjb252ZXJ0ZWQgdG8gSVNPODYwMSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gKlxuICogRWcuXG4gKiB2YXIgeCA9IFtbJ2EnLCAnYicsICdiJywgJ2MnXSwgWzEsIDIsIHVuZGVmaW5lZCwgM10sIFs0LCB1bmRlZmluZWQsIDUsIHVuZGVmaW5lZF1dO1xuICogY29tYmluZVJlcGVhdGVkKHgpO1xuICogIyB4IGlzIFtbJ2EnLCAnYicsICdjJ10sIFsxLCAyLCAzXSwgWzQsIDUsIHVuZGVmaW5lZF1dLlxuICovXG5cblxuZnVuY3Rpb24gY29tYmluZVJlcGVhdGVkKHNvcnRlZFZhbHVlQXJyYXlzKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoc29ydGVkVmFsdWVBcnJheXMubGVuZ3RoKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdFtpXSA9IFtzb3J0ZWRWYWx1ZUFycmF5c1tpXVswXV07XG4gIH1cblxuICBmb3IgKHZhciBqID0gMTsgaiA8IHNvcnRlZFZhbHVlQXJyYXlzWzBdLmxlbmd0aDsgaisrKSB7XG4gICAgaWYgKHNvcnRlZFZhbHVlQXJyYXlzWzBdW2pdID09PSBzb3J0ZWRWYWx1ZUFycmF5c1swXVtqIC0gMV0pIHtcbiAgICAgIHZhciBjdXJyZW50SW5kZXggPSByZXN1bHRbMF0ubGVuZ3RoIC0gMTtcblxuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHJlc3VsdC5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgaWYgKHJlc3VsdFtfaV1bY3VycmVudEluZGV4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0W19pXVtjdXJyZW50SW5kZXhdID0gc29ydGVkVmFsdWVBcnJheXNbX2ldW2pdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHJlc3VsdC5sZW5ndGg7IF9pMisrKSB7XG4gICAgICAgIHJlc3VsdFtfaTJdLnB1c2goc29ydGVkVmFsdWVBcnJheXNbX2kyXVtqXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBjb2x1bW4gdmFsdWVzLCB3aXRoIGNvbHVtbiBuYW1lcywgdG8gYW4gYXJyYXkgb2Ygcm93IHZhbHVlcy5cbiAqIEBwYXJhbSAge0FycmF5W119IGNvbHVtblZhbHVlQXJyYXlzIEFycmF5IG9mIGNvbHVtbiB2YWx1ZXMsIGVnLiBbWzEsMiwzXSwgWzQsNSw2XV0uXG4gKiBAcGFyYW0gIHtTdHJpbmdbXX0gY29sdW1uTmFtZXMgQXJyYXkgb2YgY29sdW1uIG5hbWVzLCBlZyBbJ3gnLCAneSddLlxuICogQHJldHVybiB7QXJyYXlbXX0gQXJyYXkgb2Ygcm93cywgc3RhcnRpbmcgd2l0aCB0aGUgY29sdW1uIG5hbWVzLCBlZy4gW1sneCcsICd5J10sIFsxLCA0XSwgWzIsIDVdLCBbMywgNl1dLlxuICovXG5cblxuZnVuY3Rpb24gdG9BcnJheU9mUm93cyhjb2x1bW5WYWx1ZUFycmF5cywgY29sdW1uTmFtZXMpIHtcbiAgaWYgKGNvbHVtblZhbHVlQXJyYXlzLmxlbmd0aCA8IDEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcm93cyA9IGNvbHVtblZhbHVlQXJyYXlzWzBdLm1hcChmdW5jdGlvbiAodmFsdWUwLCByb3dJbmRleCkge1xuICAgIHJldHVybiBjb2x1bW5WYWx1ZUFycmF5cy5tYXAoZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgcmV0dXJuIHZhbHVlc1tyb3dJbmRleF07XG4gICAgfSk7XG4gIH0pO1xuICByb3dzLnVuc2hpZnQoY29sdW1uTmFtZXMpO1xuICByZXR1cm4gcm93cztcbn1cblxub25tZXNzYWdlID0gZnVuY3Rpb24gb25tZXNzYWdlKGV2ZW50KSB7XG4gIHZhciB2YWx1ZUFycmF5cyA9IGV2ZW50LmRhdGEudmFsdWVzLm1hcChmdW5jdGlvbiAodmFsdWVzQXJyYXkpIHtcbiAgICByZXR1cm4gdmFsdWVzQXJyYXkubWFwKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh2YWx1ZXMpO1xuICAgIH0pO1xuICB9KTsgLy8gQ29udmVydCBmcm9tIHR5cGVkIGFycmF5cy5cblxuICB2YXIgbmFtZUFycmF5cyA9IGV2ZW50LmRhdGEubmFtZXM7XG4gIHZhciBjb21iaW5lZFZhbHVlcyA9IGNvbWJpbmVWYWx1ZUFycmF5cyh2YWx1ZUFycmF5cyk7XG4gIHZhciByb3dzID0gdG9BcnJheU9mUm93cyhjb21iaW5lZFZhbHVlcywgbmFtZUFycmF5cyk7XG4gIHZhciBqb2luZWRSb3dzID0gcm93cy5tYXAoZnVuY3Rpb24gKHJvdykge1xuICAgIHJldHVybiByb3cuam9pbihcIixcIik7XG4gIH0pO1xuICB2YXIgY3N2U3RyaW5nID0gam9pbmVkUm93cy5qb2luKFwiXFxuXCIpO1xuICBwb3N0TWVzc2FnZShjc3ZTdHJpbmcpO1xufTsiLCIvKipcbiAqIEBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIG9iamVjdCBpcyBkZWZpbmVkLCByZXR1cm5zIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaWYgKENlc2l1bS5kZWZpbmVkKHBvc2l0aW9ucykpIHtcbiAqICAgICAgZG9Tb21ldGhpbmcoKTtcbiAqIH0gZWxzZSB7XG4gKiAgICAgIGRvU29tZXRoaW5nRWxzZSgpO1xuICogfVxuICovXG5mdW5jdGlvbiBkZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsO1xufVxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBSZXR1cm5zIGluZGljZXMgc3VjaCB0aGF0IGFycmF5W2luZGljZXNbaV1dID0gc29ydGVkQXJyYXlbaV0uXG4gKiBFZy4gc29ydGVkSW5kaWNlcyhbJ2MnLCAnYScsICdiJywgJ2QnXSkgPT4gWzEsIDIsIDAsIDNdLiAoVGhlIHNvcnRlZCBhcnJheSBpcyBbYSwgYiwgYywgZF0sIGFuZCBcImFcIiB3YXMgaW4gcG9zaXRpb24gMSwgXCJiXCIgaW4gcG9zaXRpb24gMiwgZXRjLilcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzb3J0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmVGdW5jdGlvbl0gVGhlIHVzdWFsIGNvbXBhcmUgZnVuY3Rpb24sIGVnLiBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhIC0gYiB9LlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBzb3J0ZWQgaW5kaWNlcywgc3VjaCB0aGF0IGFycmF5W3NvcnRlZEluZGljZXNbMF1dID0gc29ydGVkQXJyYXlbMF0uXG4gKi9cblxuZnVuY3Rpb24gc29ydGVkSW5kaWNlcyhhcnJheSwgY29tcGFyZUZ1bmN0aW9uKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHZhciBpbmRpY2VzID0gbmV3IEFycmF5KGxlbmd0aCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGluZGljZXNbaV0gPSBpO1xuICB9XG5cbiAgaWYgKCFjb21wYXJlRnVuY3Rpb24pIHtcbiAgICBjb21wYXJlRnVuY3Rpb24gPSBmdW5jdGlvbiBjb21wYXJlRnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xuICAgIH07XG4gIH1cblxuICBpbmRpY2VzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGFycmF5W2FdLCBhcnJheVtiXSk7XG4gIH0pO1xuICByZXR1cm4gaW5kaWNlcztcbn0gLy9cbi8vIE5vdGU6IGZvciBpbmRpY2VzIHdoaWNoIGdvIGluIHRoZSBvdGhlciBkaXJlY3Rpb24sIGp1c3QgdXNlIGluZGV4T2YgbGlrZSB0aGlzOlxuLy9cbi8vIGl0KCdpbnZlcnNlIGluZGljZXMgd29yaycsIGZ1bmN0aW9uKCkge1xuLy8gICAgIHZhciBkYXRhID0gWydjJywgJ2EnLCAnYicsICdkJ107XG4vLyAgICAgdmFyIHNvcnRlZCA9IGRhdGEuc2xpY2UoKS5zb3J0KCk7XG4vLyAgICAgdmFyIGludmVyc2VJbmRpY2VzID0gZGF0YS5tYXAoZnVuY3Rpb24oZGF0dW0pIHsgcmV0dXJuIHNvcnRlZC5pbmRleE9mKGRhdHVtKTsgfSk7XG4vLyAgICAgZXhwZWN0KGludmVyc2VJbmRpY2VzKS50b0VxdWFsKFsyLCAwLCAxLCAzXSk7XG4vLyB9KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRlZEluZGljZXM7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hKQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=