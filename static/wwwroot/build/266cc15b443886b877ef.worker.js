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
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
    'use strict';

    /**
     * @exports defined
     *
     * @param {Object} value The object.
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

    return defined;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(5)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
        freezeObject) {
    'use strict';

    /**
     * Returns the first parameter if not undefined, otherwise the second parameter.
     * Useful for setting a default value for a parameter.
     *
     * @exports defaultValue
     *
     * @param {*} a
     * @param {*} b
     * @returns {*} Returns the first parameter if not undefined, otherwise the second parameter.
     *
     * @example
     * param = Cesium.defaultValue(param, 'default');
     */
    function defaultValue(a, b) {
        if (a !== undefined) {
            return a;
        }
        return b;
    }

    /**
     * A frozen empty object that can be used as the default value for options passed as
     * an object literal.
     */
    defaultValue.EMPTY_OBJECT = freezeObject({});

    return defaultValue;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _defined = __webpack_require__(0);

var _defined2 = _interopRequireDefault(_defined);

var _DataUri = __webpack_require__(3);

var _DataUri2 = _interopRequireDefault(_DataUri);

var _sortedIndices = __webpack_require__(9);

var _sortedIndices2 = _interopRequireDefault(_sortedIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    if (!(0, _defined2.default)(valueArrays) || valueArrays.length < 1) {
        return;
    }
    var combinedValueArrays = [];
    // Start by copying the first set of columns into the result.
    var firstArray = valueArrays[0];
    for (var j = 0; j < firstArray.length; j++) {
        var values = firstArray[j];
        combinedValueArrays.push(values.slice());
    }
    // Then add the subsequent sets of x-columns to the end of the first result column,
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
    }

    // Sort by the first column.
    combinedValueArrays = sortByFirst(combinedValueArrays);
    combinedValueArrays = combineRepeated(combinedValueArrays);

    return combinedValueArrays;
}

/**
 * Eg. sortByFirst([['b', 'a', 'c'], [1, 2, 3]]) = [['a', 'b', 'c'], [2, 1, 3]].
 * @param  {Array[]} valueArrays The array of arrays of values to sort.
 * @return {Array[]} The values sorted by the first column.
 */
/* global onmessage:true */
function sortByFirst(valueArrays) {
    var firstValues = valueArrays[0];
    var indices = (0, _sortedIndices2.default)(firstValues);
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
        return row.join(',');
    });
    var csvString = joinedRows.join('\n');
    var href = _DataUri2.default.make('csv', csvString);
    postMessage(href);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defined = __webpack_require__(0);
var FeatureDetection = __webpack_require__(4);
var TerriaError = __webpack_require__(8);

// Unfortunately there's no way to feature-detect for this, it's something that only MS browsers disallow for security reasons.
var canUseDataUriInHref = !(FeatureDetection.isInternetExplorer() || /Edge/.exec(navigator.userAgent));

var DataUri = {
    /**
     * Turn a file with the supplied type and stringified data into a data uri that can be set as the href of an anchor tag.
     * @param {String} type Data type, eg. 'json' or 'csv'.
     * @param {String} dataString The data.
     * @return {String} A string that can be used to in an anchor tag's 'href' attribute to represent downloadable data.
     */
    make: function make(type, dataString) {
        if (dataString) {
            // Using attachment/* mime type makes safari download as attachment. text/* works on Chrome (as does attachment).
            return 'data:attachment/' + type + ',' + encodeURIComponent(dataString);
        }
    },

    /**
     * Returns a flag stating if data uri links are supported by the user's browser.
     * If errorEvent is provided, presents an error message explaining why it won't work.
     * @param {Error} [errorEvent] A Cesium Event, eg. terria.error, used to raise an error if the browser does not support data download.
     * @param {String} [href] The link to provide in the error message. Required if errorEvent is provided.
     * @param {Boolean} [forceError] If true, always show the error message. Defaults to false, which only shows it if the browser cannot download uri links.
     * @return {Boolean} Returns whether the browser is compatible with data uris.
     */
    checkCompatibility: function checkCompatibility(errorEvent, href, forceError) {
        if (!canUseDataUriInHref || forceError) {
            if (defined(errorEvent)) {
                errorEvent.raiseEvent(new TerriaError({
                    title: 'Browser Does Not Support Data Download',
                    message: 'Unfortunately Microsoft browsers (including all versions of Internet Explorer and Edge) do not ' + 'support the data uri functionality needed to download data as a file. To download, copy the following uri ' + 'into another browser such as Chrome, Firefox or Safari: ' + href
                }));
            }
            return false;
        } else {
            return true;
        }
    }
};

module.exports = DataUri;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(1),
        __webpack_require__(0),
        __webpack_require__(6)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
        defaultValue,
        defined,
        Fullscreen) {
    'use strict';

    var theNavigator;
    if (typeof navigator !== 'undefined') {
        theNavigator = navigator;
    } else {
        theNavigator = {};
    }

    function extractVersion(versionString) {
        var parts = versionString.split('.');
        for (var i = 0, len = parts.length; i < len; ++i) {
            parts[i] = parseInt(parts[i], 10);
        }
        return parts;
    }

    var isChromeResult;
    var chromeVersionResult;
    function isChrome() {
        if (!defined(isChromeResult)) {
            isChromeResult = false;
            // Edge contains Chrome in the user agent too
            if (!isEdge()) {
                var fields = (/ Chrome\/([\.0-9]+)/).exec(theNavigator.userAgent);
                if (fields !== null) {
                    isChromeResult = true;
                    chromeVersionResult = extractVersion(fields[1]);
                }
            }
        }

        return isChromeResult;
    }

    function chromeVersion() {
        return isChrome() && chromeVersionResult;
    }

    var isSafariResult;
    var safariVersionResult;
    function isSafari() {
        if (!defined(isSafariResult)) {
            isSafariResult = false;

            // Chrome and Edge contain Safari in the user agent too
            if (!isChrome() && !isEdge() && (/ Safari\/[\.0-9]+/).test(theNavigator.userAgent)) {
                var fields = (/ Version\/([\.0-9]+)/).exec(theNavigator.userAgent);
                if (fields !== null) {
                    isSafariResult = true;
                    safariVersionResult = extractVersion(fields[1]);
                }
            }
        }

        return isSafariResult;
    }

    function safariVersion() {
        return isSafari() && safariVersionResult;
    }

    var isWebkitResult;
    var webkitVersionResult;
    function isWebkit() {
        if (!defined(isWebkitResult)) {
            isWebkitResult = false;

            var fields = (/ AppleWebKit\/([\.0-9]+)(\+?)/).exec(theNavigator.userAgent);
            if (fields !== null) {
                isWebkitResult = true;
                webkitVersionResult = extractVersion(fields[1]);
                webkitVersionResult.isNightly = !!fields[2];
            }
        }

        return isWebkitResult;
    }

    function webkitVersion() {
        return isWebkit() && webkitVersionResult;
    }

    var isInternetExplorerResult;
    var internetExplorerVersionResult;
    function isInternetExplorer() {
        if (!defined(isInternetExplorerResult)) {
            isInternetExplorerResult = false;

            var fields;
            if (theNavigator.appName === 'Microsoft Internet Explorer') {
                fields = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(theNavigator.userAgent);
                if (fields !== null) {
                    isInternetExplorerResult = true;
                    internetExplorerVersionResult = extractVersion(fields[1]);
                }
            } else if (theNavigator.appName === 'Netscape') {
                fields = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(theNavigator.userAgent);
                if (fields !== null) {
                    isInternetExplorerResult = true;
                    internetExplorerVersionResult = extractVersion(fields[1]);
                }
            }
        }
        return isInternetExplorerResult;
    }

    function internetExplorerVersion() {
        return isInternetExplorer() && internetExplorerVersionResult;
    }

    var isEdgeResult;
    var edgeVersionResult;
    function isEdge() {
        if (!defined(isEdgeResult)) {
            isEdgeResult = false;
            var fields = (/ Edge\/([\.0-9]+)/).exec(theNavigator.userAgent);
            if (fields !== null) {
                isEdgeResult = true;
                edgeVersionResult = extractVersion(fields[1]);
            }
        }
        return isEdgeResult;
    }

    function edgeVersion() {
        return isEdge() && edgeVersionResult;
    }

    var isFirefoxResult;
    var firefoxVersionResult;
    function isFirefox() {
        if (!defined(isFirefoxResult)) {
            isFirefoxResult = false;

            var fields = /Firefox\/([\.0-9]+)/.exec(theNavigator.userAgent);
            if (fields !== null) {
                isFirefoxResult = true;
                firefoxVersionResult = extractVersion(fields[1]);
            }
        }
        return isFirefoxResult;
    }

    var isWindowsResult;
    function isWindows() {
        if (!defined(isWindowsResult)) {
            isWindowsResult = /Windows/i.test(theNavigator.appVersion);
        }
        return isWindowsResult;
    }


    function firefoxVersion() {
        return isFirefox() && firefoxVersionResult;
    }

    var hasPointerEvents;
    function supportsPointerEvents() {
        if (!defined(hasPointerEvents)) {
            //While navigator.pointerEnabled is deprecated in the W3C specification
            //we still need to use it if it exists in order to support browsers
            //that rely on it, such as the Windows WebBrowser control which defines
            //PointerEvent but sets navigator.pointerEnabled to false.
            hasPointerEvents = typeof PointerEvent !== 'undefined' && (!defined(theNavigator.pointerEnabled) || theNavigator.pointerEnabled);
        }
        return hasPointerEvents;
    }

    var imageRenderingValueResult;
    var supportsImageRenderingPixelatedResult;
    function supportsImageRenderingPixelated() {
        if (!defined(supportsImageRenderingPixelatedResult)) {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('style',
                                'image-rendering: -moz-crisp-edges;' +
                                'image-rendering: pixelated;');
            //canvas.style.imageRendering will be undefined, null or an empty string on unsupported browsers.
            var tmp = canvas.style.imageRendering;
            supportsImageRenderingPixelatedResult = defined(tmp) && tmp !== '';
            if (supportsImageRenderingPixelatedResult) {
                imageRenderingValueResult = tmp;
            }
        }
        return supportsImageRenderingPixelatedResult;
    }

    function imageRenderingValue() {
        return supportsImageRenderingPixelated() ? imageRenderingValueResult : undefined;
    }

    /**
     * A set of functions to detect whether the current browser supports
     * various features.
     *
     * @exports FeatureDetection
     */
    var FeatureDetection = {
        isChrome : isChrome,
        chromeVersion : chromeVersion,
        isSafari : isSafari,
        safariVersion : safariVersion,
        isWebkit : isWebkit,
        webkitVersion : webkitVersion,
        isInternetExplorer : isInternetExplorer,
        internetExplorerVersion : internetExplorerVersion,
        isEdge : isEdge,
        edgeVersion : edgeVersion,
        isFirefox : isFirefox,
        firefoxVersion : firefoxVersion,
        isWindows : isWindows,
        hardwareConcurrency : defaultValue(theNavigator.hardwareConcurrency, 3),
        supportsPointerEvents : supportsPointerEvents,
        supportsImageRenderingPixelated: supportsImageRenderingPixelated,
        imageRenderingValue: imageRenderingValue
    };

    /**
     * Detects whether the current browser supports the full screen standard.
     *
     * @returns {Boolean} true if the browser supports the full screen standard, false if not.
     *
     * @see Fullscreen
     * @see {@link http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html|W3C Fullscreen Living Specification}
     */
    FeatureDetection.supportsFullscreen = function() {
        return Fullscreen.supportsFullscreen();
    };

    /**
     * Detects whether the current browser supports typed arrays.
     *
     * @returns {Boolean} true if the browser supports typed arrays, false if not.
     *
     * @see {@link http://www.khronos.org/registry/typedarray/specs/latest/|Typed Array Specification}
     */
    FeatureDetection.supportsTypedArrays = function() {
        return typeof ArrayBuffer !== 'undefined';
    };

    /**
     * Detects whether the current browser supports Web Workers.
     *
     * @returns {Boolean} true if the browsers supports Web Workers, false if not.
     *
     * @see {@link http://www.w3.org/TR/workers/}
     */
    FeatureDetection.supportsWebWorkers = function() {
        return typeof Worker !== 'undefined';
    };

    return FeatureDetection;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(0)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
        defined) {
    'use strict';

    /**
     * Freezes an object, using Object.freeze if available, otherwise returns
     * the object unchanged.  This function should be used in setup code to prevent
     * errors from completely halting JavaScript execution in legacy browsers.
     *
     * @private
     *
     * @exports freezeObject
     */
    var freezeObject = Object.freeze;
    if (!defined(freezeObject)) {
        freezeObject = function(o) {
            return o;
        };
    }

    return freezeObject;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(0),
        __webpack_require__(7)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
        defined,
        defineProperties) {
    'use strict';

    var _supportsFullscreen;
    var _names = {
        requestFullscreen : undefined,
        exitFullscreen : undefined,
        fullscreenEnabled : undefined,
        fullscreenElement : undefined,
        fullscreenchange : undefined,
        fullscreenerror : undefined
    };

    /**
     * Browser-independent functions for working with the standard fullscreen API.
     *
     * @exports Fullscreen
     *
     * @see {@link http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html|W3C Fullscreen Living Specification}
     */
    var Fullscreen = {};

    defineProperties(Fullscreen, {
        /**
         * The element that is currently fullscreen, if any.  To simply check if the
         * browser is in fullscreen mode or not, use {@link Fullscreen#fullscreen}.
         * @memberof Fullscreen
         * @type {Object}
         * @readonly
         */
        element : {
            get : function() {
                if (!Fullscreen.supportsFullscreen()) {
                    return undefined;
                }

                return document[_names.fullscreenElement];
            }
        },

        /**
         * The name of the event on the document that is fired when fullscreen is
         * entered or exited.  This event name is intended for use with addEventListener.
         * In your event handler, to determine if the browser is in fullscreen mode or not,
         * use {@link Fullscreen#fullscreen}.
         * @memberof Fullscreen
         * @type {String}
         * @readonly
         */
        changeEventName : {
            get : function() {
                if (!Fullscreen.supportsFullscreen()) {
                    return undefined;
                }

                return _names.fullscreenchange;
            }
        },

        /**
         * The name of the event that is fired when a fullscreen error
         * occurs.  This event name is intended for use with addEventListener.
         * @memberof Fullscreen
         * @type {String}
         * @readonly
         */
        errorEventName : {
            get : function() {
                if (!Fullscreen.supportsFullscreen()) {
                    return undefined;
                }

                return _names.fullscreenerror;
            }
        },

        /**
         * Determine whether the browser will allow an element to be made fullscreen, or not.
         * For example, by default, iframes cannot go fullscreen unless the containing page
         * adds an "allowfullscreen" attribute (or prefixed equivalent).
         * @memberof Fullscreen
         * @type {Boolean}
         * @readonly
         */
        enabled : {
            get : function() {
                if (!Fullscreen.supportsFullscreen()) {
                    return undefined;
                }

                return document[_names.fullscreenEnabled];
            }
        },

        /**
         * Determines if the browser is currently in fullscreen mode.
         * @memberof Fullscreen
         * @type {Boolean}
         * @readonly
         */
        fullscreen : {
            get : function() {
                if (!Fullscreen.supportsFullscreen()) {
                    return undefined;
                }

                return Fullscreen.element !== null;
            }
        }
    });

    /**
     * Detects whether the browser supports the standard fullscreen API.
     *
     * @returns {Boolean} <code>true</code> if the browser supports the standard fullscreen API,
     * <code>false</code> otherwise.
     */
    Fullscreen.supportsFullscreen = function() {
        if (defined(_supportsFullscreen)) {
            return _supportsFullscreen;
        }

        _supportsFullscreen = false;

        var body = document.body;
        if (typeof body.requestFullscreen === 'function') {
            // go with the unprefixed, standard set of names
            _names.requestFullscreen = 'requestFullscreen';
            _names.exitFullscreen = 'exitFullscreen';
            _names.fullscreenEnabled = 'fullscreenEnabled';
            _names.fullscreenElement = 'fullscreenElement';
            _names.fullscreenchange = 'fullscreenchange';
            _names.fullscreenerror = 'fullscreenerror';
            _supportsFullscreen = true;
            return _supportsFullscreen;
        }

        //check for the correct combination of prefix plus the various names that browsers use
        var prefixes = ['webkit', 'moz', 'o', 'ms', 'khtml'];
        var name;
        for (var i = 0, len = prefixes.length; i < len; ++i) {
            var prefix = prefixes[i];

            // casing of Fullscreen differs across browsers
            name = prefix + 'RequestFullscreen';
            if (typeof body[name] === 'function') {
                _names.requestFullscreen = name;
                _supportsFullscreen = true;
            } else {
                name = prefix + 'RequestFullScreen';
                if (typeof body[name] === 'function') {
                    _names.requestFullscreen = name;
                    _supportsFullscreen = true;
                }
            }

            // disagreement about whether it's "exit" as per spec, or "cancel"
            name = prefix + 'ExitFullscreen';
            if (typeof document[name] === 'function') {
                _names.exitFullscreen = name;
            } else {
                name = prefix + 'CancelFullScreen';
                if (typeof document[name] === 'function') {
                    _names.exitFullscreen = name;
                }
            }

            // casing of Fullscreen differs across browsers
            name = prefix + 'FullscreenEnabled';
            if (document[name] !== undefined) {
                _names.fullscreenEnabled = name;
            } else {
                name = prefix + 'FullScreenEnabled';
                if (document[name] !== undefined) {
                    _names.fullscreenEnabled = name;
                }
            }

            // casing of Fullscreen differs across browsers
            name = prefix + 'FullscreenElement';
            if (document[name] !== undefined) {
                _names.fullscreenElement = name;
            } else {
                name = prefix + 'FullScreenElement';
                if (document[name] !== undefined) {
                    _names.fullscreenElement = name;
                }
            }

            // thankfully, event names are all lowercase per spec
            name = prefix + 'fullscreenchange';
            // event names do not have 'on' in the front, but the property on the document does
            if (document['on' + name] !== undefined) {
                //except on IE
                if (prefix === 'ms') {
                    name = 'MSFullscreenChange';
                }
                _names.fullscreenchange = name;
            }

            name = prefix + 'fullscreenerror';
            if (document['on' + name] !== undefined) {
                //except on IE
                if (prefix === 'ms') {
                    name = 'MSFullscreenError';
                }
                _names.fullscreenerror = name;
            }
        }

        return _supportsFullscreen;
    };

    /**
     * Asynchronously requests the browser to enter fullscreen mode on the given element.
     * If fullscreen mode is not supported by the browser, does nothing.
     *
     * @param {Object} element The HTML element which will be placed into fullscreen mode.
     * @param {HMDVRDevice} [vrDevice] The VR device.
     *
     * @example
     * // Put the entire page into fullscreen.
     * Cesium.Fullscreen.requestFullscreen(document.body)
     *
     * // Place only the Cesium canvas into fullscreen.
     * Cesium.Fullscreen.requestFullscreen(scene.canvas)
     */
    Fullscreen.requestFullscreen = function(element, vrDevice) {
        if (!Fullscreen.supportsFullscreen()) {
            return;
        }

        element[_names.requestFullscreen]({ vrDisplay: vrDevice });
    };

    /**
     * Asynchronously exits fullscreen mode.  If the browser is not currently
     * in fullscreen, or if fullscreen mode is not supported by the browser, does nothing.
     */
    Fullscreen.exitFullscreen = function() {
        if (!Fullscreen.supportsFullscreen()) {
            return;
        }

        document[_names.exitFullscreen]();
    };

    return Fullscreen;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(0)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
        defined) {
    'use strict';

    var definePropertyWorks = (function() {
        try {
            return 'x' in Object.defineProperty({}, 'x', {});
        } catch (e) {
            return false;
        }
    })();

    /**
     * Defines properties on an object, using Object.defineProperties if available,
     * otherwise returns the object unchanged.  This function should be used in
     * setup code to prevent errors from completely halting JavaScript execution
     * in legacy browsers.
     *
     * @private
     *
     * @exports defineProperties
     */
    var defineProperties = Object.defineProperties;
    if (!definePropertyWorks || !defined(defineProperties)) {
        defineProperties = function(o) {
            return o;
        };
    }

    return defineProperties;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*global require*/

var defaultValue = __webpack_require__(1);

/**
 * Represents an error that occurred in a TerriaJS module, especially an asynchronous one that cannot be raised
 * by throwing an exception because no one would be able to catch it.
 *
 * @alias TerriaError
 * @constructor
 *
 * @param {Object} options Object with the following properties:
 * @param {Object} [options.sender] The object raising the error.
 * @param {String} [options.title='An error occurred'] A short title describing the error.
 * @param {String} options.message A detailed message describing the error.  This message may be HTML and it should be sanitized before display to the user.
 */
var TerriaError = function TerriaError(options) {
  options = defaultValue(options, defaultValue.EMPTY_OBJECT);

  /**
   * Gets or sets the object that raised the error.
   * @type {Object}
   */
  this.sender = options.sender;

  /**
   * Gets or sets a short title describing the error.
   * @type {String}
   */
  this.title = defaultValue(options.title, 'An error occurred');

  /**
   * Gets or sets a metailed message describing the error.  This message may be HTML and it should be sanitized before display to the user.
   * @type {String}
   */
  this.message = options.message;

  /**
   * True if the user has seen this error; otherwise, false.
   * @type {Boolean}
   * @default false
   */
  this.raisedToUser = false;
};

module.exports = TerriaError;

/***/ }),
/* 9 */
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
}

//
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
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjY2Y2MxNWI0NDM4ODZiODc3ZWYud29ya2VyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDI2NmNjMTViNDQzODg2Yjg3N2VmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL2RlZmF1bHRWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL1JlYWN0Vmlld3MvQ3VzdG9tL0NoYXJ0L2Rvd25sb2FkSHJlZldvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL0NvcmUvRGF0YVVyaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL0ZlYXR1cmVEZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9mcmVlemVPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9GdWxsc2NyZWVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lUHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL0NvcmUvVGVycmlhRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzL2xpYi9Db3JlL3NvcnRlZEluZGljZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjY2Y2MxNWI0NDM4ODZiODc3ZWYiLCIvKmdsb2JhbCBkZWZpbmUqL1xyXG5kZWZpbmUoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZXhwb3J0cyBkZWZpbmVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBvYmplY3QgaXMgZGVmaW5lZCwgcmV0dXJucyBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGlmIChDZXNpdW0uZGVmaW5lZChwb3NpdGlvbnMpKSB7XHJcbiAgICAgKiAgICAgIGRvU29tZXRoaW5nKCk7XHJcbiAgICAgKiB9IGVsc2Uge1xyXG4gICAgICogICAgICBkb1NvbWV0aGluZ0Vsc2UoKTtcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZGVmaW5lZCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZWZpbmVkO1xyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypnbG9iYWwgZGVmaW5lKi9cclxuZGVmaW5lKFtcclxuICAgICAgICAnLi9mcmVlemVPYmplY3QnXHJcbiAgICBdLCBmdW5jdGlvbihcclxuICAgICAgICBmcmVlemVPYmplY3QpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGZpcnN0IHBhcmFtZXRlciBpZiBub3QgdW5kZWZpbmVkLCBvdGhlcndpc2UgdGhlIHNlY29uZCBwYXJhbWV0ZXIuXHJcbiAgICAgKiBVc2VmdWwgZm9yIHNldHRpbmcgYSBkZWZhdWx0IHZhbHVlIGZvciBhIHBhcmFtZXRlci5cclxuICAgICAqXHJcbiAgICAgKiBAZXhwb3J0cyBkZWZhdWx0VmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFcclxuICAgICAqIEBwYXJhbSB7Kn0gYlxyXG4gICAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZpcnN0IHBhcmFtZXRlciBpZiBub3QgdW5kZWZpbmVkLCBvdGhlcndpc2UgdGhlIHNlY29uZCBwYXJhbWV0ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHBhcmFtID0gQ2VzaXVtLmRlZmF1bHRWYWx1ZShwYXJhbSwgJ2RlZmF1bHQnKTtcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZGVmYXVsdFZhbHVlKGEsIGIpIHtcclxuICAgICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgZnJvemVuIGVtcHR5IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSBkZWZhdWx0IHZhbHVlIGZvciBvcHRpb25zIHBhc3NlZCBhc1xyXG4gICAgICogYW4gb2JqZWN0IGxpdGVyYWwuXHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRWYWx1ZS5FTVBUWV9PQkpFQ1QgPSBmcmVlemVPYmplY3Qoe30pO1xyXG5cclxuICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbn0pO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmYXVsdFZhbHVlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9kZWZpbmVkID0gcmVxdWlyZSgndGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL2RlZmluZWQnKTtcblxudmFyIF9kZWZpbmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZWQpO1xuXG52YXIgX0RhdGFVcmkgPSByZXF1aXJlKCcuLi8uLi8uLi9Db3JlL0RhdGFVcmknKTtcblxudmFyIF9EYXRhVXJpMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RhdGFVcmkpO1xuXG52YXIgX3NvcnRlZEluZGljZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9Db3JlL3NvcnRlZEluZGljZXMnKTtcblxudmFyIF9zb3J0ZWRJbmRpY2VzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NvcnRlZEluZGljZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcclxuICogQ3JlYXRlIGNvbWJpbmVkIGFycmF5cyBmcm9tIGFycmF5cyBvZiBjb2x1bW4gdmFsdWVzLCBlZy4gW1t2YWx1ZXMxLCB2YWx1ZXMyLCB2YWx1ZXMzXSwgW3ZhbHVlczQsIHZhbHVlczVdXS5cclxuICogVGhlIGZpcnN0IGNvbHVtbnMgb2YgZWFjaCBhcnJheSBtdXN0IGJlIG9mIHRoZSBzYW1lIHR5cGUgKGluIHRoZSBhYm92ZSBleGFtcGxlLCB2YWx1ZXMxIGFuZCB2YWx1ZXM0KS5cclxuICogVGhlc2UgYXJlIGNvbWJpbmVkIGFuZCBzb3J0ZWQgaW50byBhIHNpbmdsZSBjb2x1bW4uXHJcbiAqIFRoZW4gdGhlIHN1YnNlcXVlbnQgY29sdW1ucyBhcmUgYWRkZWQsIGZpbGxpbmcgd2l0aCBudWxsIHdoZXJlIG1pc3NpbmcuIChUaGlzIGNvdWxkIGJlIGFuIG9wdGlvbiBpbiBmdXR1cmUuKVxyXG4gKiBFZy4gaWYgdGhlIHZhbHVlcyBvZiBlYWNoIGNvbCBhcmU6IHZhbHVlczE9WzEsM107IHZhbHVlczI9WzEwLDMwXTsgdmFsdWVzMz1bMTAwLDMwMF07IHZhbHVlczQ9WzEsMl07IHZhbHVlczU9Wy0xLC0yXTtcclxuICogdGhlbiB0aGUgcmVzdWx0aW5nIGFycmF5IG9mIGNvbHVtbiB2YWx1ZXMgYXJlLCBpbiBvcmRlciwgWzEsMiwzXTsgWzEwLG51bGwsMzBdOyBbMTAwLG51bGwsMzAwXTsgWy0xLC0yLG51bGxdLlxyXG4gKiBAcGFyYW0ge0FycmF5W119IHZhbHVlQXJyYXlzIFNlZSBkZXNjcmlwdGlvbiBhYm92ZS5cclxuICogQHJldHVybiB7QXJyYXlbXX0gVGhlIHN5bnRoZXNpemVkIHZhbHVlcyB3aGljaCBjb3VsZCBiZSBwYXNzZWQgdG8gYSB0YWJsZSBzdHJ1Y3R1cmUuXHJcbiAqL1xuZnVuY3Rpb24gY29tYmluZVZhbHVlQXJyYXlzKHZhbHVlQXJyYXlzKSB7XG4gICAgaWYgKCEoMCwgX2RlZmluZWQyLmRlZmF1bHQpKHZhbHVlQXJyYXlzKSB8fCB2YWx1ZUFycmF5cy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNvbWJpbmVkVmFsdWVBcnJheXMgPSBbXTtcbiAgICAvLyBTdGFydCBieSBjb3B5aW5nIHRoZSBmaXJzdCBzZXQgb2YgY29sdW1ucyBpbnRvIHRoZSByZXN1bHQuXG4gICAgdmFyIGZpcnN0QXJyYXkgPSB2YWx1ZUFycmF5c1swXTtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGZpcnN0QXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IGZpcnN0QXJyYXlbal07XG4gICAgICAgIGNvbWJpbmVkVmFsdWVBcnJheXMucHVzaCh2YWx1ZXMuc2xpY2UoKSk7XG4gICAgfVxuICAgIC8vIFRoZW4gYWRkIHRoZSBzdWJzZXF1ZW50IHNldHMgb2YgeC1jb2x1bW5zIHRvIHRoZSBlbmQgb2YgdGhlIGZpcnN0IHJlc3VsdCBjb2x1bW4sXG4gICAgLy8gYWRkIG51bGxzIHRvIHRoZSBlbmQgb2YgdGhlIG90aGVyIGV4aXN0aW5nIGNvbHVtbnMsXG4gICAgLy8gYWRkIG51bGxzIHRvIHRoZSBzdGFydCBvZiB0aGUgbmV3IGNvbHVtbnMsXG4gICAgLy8gYW5kIGFkZCB0aGVtIHRvIHRoZSBlbmQgb2YgdGhlIHJlc3VsdC5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHZhbHVlQXJyYXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjdXJyZW50VmFsdWVBcnJheSA9IHZhbHVlQXJyYXlzW2ldO1xuICAgICAgICB2YXIgY3VycmVudEZpcnN0QXJyYXkgPSBjdXJyZW50VmFsdWVBcnJheVswXTtcbiAgICAgICAgdmFyIHByZUV4aXN0aW5nVmFsdWVzTGVuZ3RoID0gY29tYmluZWRWYWx1ZUFycmF5c1swXS5sZW5ndGg7XG4gICAgICAgIGNvbWJpbmVkVmFsdWVBcnJheXNbMF0gPSBjb21iaW5lZFZhbHVlQXJyYXlzWzBdLmNvbmNhdChjdXJyZW50Rmlyc3RBcnJheSk7XG4gICAgICAgIHZhciBlbXB0eTEgPSBuZXcgQXJyYXkoY3VycmVudEZpcnN0QXJyYXkubGVuZ3RoKTsgLy8gZWxlbWVudHMgYXJlIHVuZGVmaW5lZC5cbiAgICAgICAgZm9yICh2YXIgayA9IDE7IGsgPCBjb21iaW5lZFZhbHVlQXJyYXlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBjb21iaW5lZFZhbHVlQXJyYXlzW2tdID0gY29tYmluZWRWYWx1ZUFycmF5c1trXS5jb25jYXQoZW1wdHkxKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW1wdHkyID0gbmV3IEFycmF5KHByZUV4aXN0aW5nVmFsdWVzTGVuZ3RoKTsgLy8gZWxlbWVudHMgYXJlIHVuZGVmaW5lZC5cbiAgICAgICAgZm9yICh2YXIgX2ogPSAxOyBfaiA8IGN1cnJlbnRWYWx1ZUFycmF5Lmxlbmd0aDsgX2orKykge1xuICAgICAgICAgICAgdmFyIF92YWx1ZXMgPSBjdXJyZW50VmFsdWVBcnJheVtfal07XG4gICAgICAgICAgICBjb21iaW5lZFZhbHVlQXJyYXlzLnB1c2goZW1wdHkyLmNvbmNhdChfdmFsdWVzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTb3J0IGJ5IHRoZSBmaXJzdCBjb2x1bW4uXG4gICAgY29tYmluZWRWYWx1ZUFycmF5cyA9IHNvcnRCeUZpcnN0KGNvbWJpbmVkVmFsdWVBcnJheXMpO1xuICAgIGNvbWJpbmVkVmFsdWVBcnJheXMgPSBjb21iaW5lUmVwZWF0ZWQoY29tYmluZWRWYWx1ZUFycmF5cyk7XG5cbiAgICByZXR1cm4gY29tYmluZWRWYWx1ZUFycmF5cztcbn1cblxuLyoqXHJcbiAqIEVnLiBzb3J0QnlGaXJzdChbWydiJywgJ2EnLCAnYyddLCBbMSwgMiwgM11dKSA9IFtbJ2EnLCAnYicsICdjJ10sIFsyLCAxLCAzXV0uXHJcbiAqIEBwYXJhbSAge0FycmF5W119IHZhbHVlQXJyYXlzIFRoZSBhcnJheSBvZiBhcnJheXMgb2YgdmFsdWVzIHRvIHNvcnQuXHJcbiAqIEByZXR1cm4ge0FycmF5W119IFRoZSB2YWx1ZXMgc29ydGVkIGJ5IHRoZSBmaXJzdCBjb2x1bW4uXHJcbiAqL1xuLyogZ2xvYmFsIG9ubWVzc2FnZTp0cnVlICovXG5mdW5jdGlvbiBzb3J0QnlGaXJzdCh2YWx1ZUFycmF5cykge1xuICAgIHZhciBmaXJzdFZhbHVlcyA9IHZhbHVlQXJyYXlzWzBdO1xuICAgIHZhciBpbmRpY2VzID0gKDAsIF9zb3J0ZWRJbmRpY2VzMi5kZWZhdWx0KShmaXJzdFZhbHVlcyk7XG4gICAgcmV0dXJuIHZhbHVlQXJyYXlzLm1hcChmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBpbmRpY2VzLm1hcChmdW5jdGlvbiAoc29ydGVkSW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXNbc29ydGVkSW5kZXhdO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLyoqXHJcbiAqIEBwYXJhbSAge0FycmF5W119IHNvcnRlZEp1bGlhbkRhdGVPclZhbHVlQXJyYXlzIFRoZSBhcnJheSBvZiBhcnJheXMgb2YgdmFsdWVzIHRvIGNvbWJpbmUuIFRoZXNlIG11c3QgYmUgc29ydGVkQnlGaXJzdC4gRGF0ZXMgbXVzdCBiZSBKdWxpYW5EYXRlcy5cclxuICogQHBhcmFtICB7SW50ZWdlcn0gW2ZpcnN0Q29sdW1uVHlwZV0gRWcuIFZhclR5cGUuVElNRS5cclxuICogQHJldHVybiB7QXJyYXlbXX0gVGhlIHZhbHVlcywgd2l0aCBhbnkgcmVwZWF0cyBpbiB0aGUgZmlyc3QgY29sdW1uIGNvbWJpbmVkIGludG8gb25lLiBEYXRlcyBhcmUgY29udmVydGVkIHRvIElTTzg2MDEgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxyXG4gKlxyXG4gKiBFZy5cclxuICogdmFyIHggPSBbWydhJywgJ2InLCAnYicsICdjJ10sIFsxLCAyLCB1bmRlZmluZWQsIDNdLCBbNCwgdW5kZWZpbmVkLCA1LCB1bmRlZmluZWRdXTtcclxuICogY29tYmluZVJlcGVhdGVkKHgpO1xyXG4gKiAjIHggaXMgW1snYScsICdiJywgJ2MnXSwgWzEsIDIsIDNdLCBbNCwgNSwgdW5kZWZpbmVkXV0uXHJcbiAqL1xuZnVuY3Rpb24gY29tYmluZVJlcGVhdGVkKHNvcnRlZFZhbHVlQXJyYXlzKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShzb3J0ZWRWYWx1ZUFycmF5cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IFtzb3J0ZWRWYWx1ZUFycmF5c1tpXVswXV07XG4gICAgfVxuICAgIGZvciAodmFyIGogPSAxOyBqIDwgc29ydGVkVmFsdWVBcnJheXNbMF0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHNvcnRlZFZhbHVlQXJyYXlzWzBdW2pdID09PSBzb3J0ZWRWYWx1ZUFycmF5c1swXVtqIC0gMV0pIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50SW5kZXggPSByZXN1bHRbMF0ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCByZXN1bHQubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtfaV1bY3VycmVudEluZGV4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtfaV1bY3VycmVudEluZGV4XSA9IHNvcnRlZFZhbHVlQXJyYXlzW19pXVtqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCByZXN1bHQubGVuZ3RoOyBfaTIrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtfaTJdLnB1c2goc29ydGVkVmFsdWVBcnJheXNbX2kyXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXHJcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgY29sdW1uIHZhbHVlcywgd2l0aCBjb2x1bW4gbmFtZXMsIHRvIGFuIGFycmF5IG9mIHJvdyB2YWx1ZXMuXHJcbiAqIEBwYXJhbSAge0FycmF5W119IGNvbHVtblZhbHVlQXJyYXlzIEFycmF5IG9mIGNvbHVtbiB2YWx1ZXMsIGVnLiBbWzEsMiwzXSwgWzQsNSw2XV0uXHJcbiAqIEBwYXJhbSAge1N0cmluZ1tdfSBjb2x1bW5OYW1lcyBBcnJheSBvZiBjb2x1bW4gbmFtZXMsIGVnIFsneCcsICd5J10uXHJcbiAqIEByZXR1cm4ge0FycmF5W119IEFycmF5IG9mIHJvd3MsIHN0YXJ0aW5nIHdpdGggdGhlIGNvbHVtbiBuYW1lcywgZWcuIFtbJ3gnLCAneSddLCBbMSwgNF0sIFsyLCA1XSwgWzMsIDZdXS5cclxuICovXG5mdW5jdGlvbiB0b0FycmF5T2ZSb3dzKGNvbHVtblZhbHVlQXJyYXlzLCBjb2x1bW5OYW1lcykge1xuICAgIGlmIChjb2x1bW5WYWx1ZUFycmF5cy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHJvd3MgPSBjb2x1bW5WYWx1ZUFycmF5c1swXS5tYXAoZnVuY3Rpb24gKHZhbHVlMCwgcm93SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGNvbHVtblZhbHVlQXJyYXlzLm1hcChmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzW3Jvd0luZGV4XTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcm93cy51bnNoaWZ0KGNvbHVtbk5hbWVzKTtcbiAgICByZXR1cm4gcm93cztcbn1cblxub25tZXNzYWdlID0gZnVuY3Rpb24gb25tZXNzYWdlKGV2ZW50KSB7XG4gICAgdmFyIHZhbHVlQXJyYXlzID0gZXZlbnQuZGF0YS52YWx1ZXMubWFwKGZ1bmN0aW9uICh2YWx1ZXNBcnJheSkge1xuICAgICAgICByZXR1cm4gdmFsdWVzQXJyYXkubWFwKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh2YWx1ZXMpO1xuICAgICAgICB9KTtcbiAgICB9KTsgLy8gQ29udmVydCBmcm9tIHR5cGVkIGFycmF5cy5cbiAgICB2YXIgbmFtZUFycmF5cyA9IGV2ZW50LmRhdGEubmFtZXM7XG4gICAgdmFyIGNvbWJpbmVkVmFsdWVzID0gY29tYmluZVZhbHVlQXJyYXlzKHZhbHVlQXJyYXlzKTtcbiAgICB2YXIgcm93cyA9IHRvQXJyYXlPZlJvd3MoY29tYmluZWRWYWx1ZXMsIG5hbWVBcnJheXMpO1xuICAgIHZhciBqb2luZWRSb3dzID0gcm93cy5tYXAoZnVuY3Rpb24gKHJvdykge1xuICAgICAgICByZXR1cm4gcm93LmpvaW4oJywnKTtcbiAgICB9KTtcbiAgICB2YXIgY3N2U3RyaW5nID0gam9pbmVkUm93cy5qb2luKCdcXG4nKTtcbiAgICB2YXIgaHJlZiA9IF9EYXRhVXJpMi5kZWZhdWx0Lm1ha2UoJ2NzdicsIGNzdlN0cmluZyk7XG4gICAgcG9zdE1lc3NhZ2UoaHJlZik7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWI/e1wic291cmNlTWFwXCI6ZmFsc2UsXCJwcmVzZXRzXCI6W1wiZXMyMDE1XCIsXCJyZWFjdFwiXSxcInBsdWdpbnNcIjpbXCJqc3gtY29udHJvbC1zdGF0ZW1lbnRzXCJdfSEuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy9saWIvUmVhY3RWaWV3cy9DdXN0b20vQ2hhcnQvZG93bmxvYWRIcmVmV29ya2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmluZWQgPSByZXF1aXJlKCd0ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lZCcpO1xudmFyIEZlYXR1cmVEZXRlY3Rpb24gPSByZXF1aXJlKCd0ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvRmVhdHVyZURldGVjdGlvbicpO1xudmFyIFRlcnJpYUVycm9yID0gcmVxdWlyZSgnLi4vQ29yZS9UZXJyaWFFcnJvcicpO1xuXG4vLyBVbmZvcnR1bmF0ZWx5IHRoZXJlJ3Mgbm8gd2F5IHRvIGZlYXR1cmUtZGV0ZWN0IGZvciB0aGlzLCBpdCdzIHNvbWV0aGluZyB0aGF0IG9ubHkgTVMgYnJvd3NlcnMgZGlzYWxsb3cgZm9yIHNlY3VyaXR5IHJlYXNvbnMuXG52YXIgY2FuVXNlRGF0YVVyaUluSHJlZiA9ICEoRmVhdHVyZURldGVjdGlvbi5pc0ludGVybmV0RXhwbG9yZXIoKSB8fCAvRWRnZS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSk7XG5cbnZhciBEYXRhVXJpID0ge1xuICAgIC8qKlxyXG4gICAgICogVHVybiBhIGZpbGUgd2l0aCB0aGUgc3VwcGxpZWQgdHlwZSBhbmQgc3RyaW5naWZpZWQgZGF0YSBpbnRvIGEgZGF0YSB1cmkgdGhhdCBjYW4gYmUgc2V0IGFzIHRoZSBocmVmIG9mIGFuIGFuY2hvciB0YWcuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBEYXRhIHR5cGUsIGVnLiAnanNvbicgb3IgJ2NzdicuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVN0cmluZyBUaGUgZGF0YS5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gQSBzdHJpbmcgdGhhdCBjYW4gYmUgdXNlZCB0byBpbiBhbiBhbmNob3IgdGFnJ3MgJ2hyZWYnIGF0dHJpYnV0ZSB0byByZXByZXNlbnQgZG93bmxvYWRhYmxlIGRhdGEuXHJcbiAgICAgKi9cbiAgICBtYWtlOiBmdW5jdGlvbiBtYWtlKHR5cGUsIGRhdGFTdHJpbmcpIHtcbiAgICAgICAgaWYgKGRhdGFTdHJpbmcpIHtcbiAgICAgICAgICAgIC8vIFVzaW5nIGF0dGFjaG1lbnQvKiBtaW1lIHR5cGUgbWFrZXMgc2FmYXJpIGRvd25sb2FkIGFzIGF0dGFjaG1lbnQuIHRleHQvKiB3b3JrcyBvbiBDaHJvbWUgKGFzIGRvZXMgYXR0YWNobWVudCkuXG4gICAgICAgICAgICByZXR1cm4gJ2RhdGE6YXR0YWNobWVudC8nICsgdHlwZSArICcsJyArIGVuY29kZVVSSUNvbXBvbmVudChkYXRhU3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBmbGFnIHN0YXRpbmcgaWYgZGF0YSB1cmkgbGlua3MgYXJlIHN1cHBvcnRlZCBieSB0aGUgdXNlcidzIGJyb3dzZXIuXHJcbiAgICAgKiBJZiBlcnJvckV2ZW50IGlzIHByb3ZpZGVkLCBwcmVzZW50cyBhbiBlcnJvciBtZXNzYWdlIGV4cGxhaW5pbmcgd2h5IGl0IHdvbid0IHdvcmsuXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBbZXJyb3JFdmVudF0gQSBDZXNpdW0gRXZlbnQsIGVnLiB0ZXJyaWEuZXJyb3IsIHVzZWQgdG8gcmFpc2UgYW4gZXJyb3IgaWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBkYXRhIGRvd25sb2FkLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtocmVmXSBUaGUgbGluayB0byBwcm92aWRlIGluIHRoZSBlcnJvciBtZXNzYWdlLiBSZXF1aXJlZCBpZiBlcnJvckV2ZW50IGlzIHByb3ZpZGVkLlxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZm9yY2VFcnJvcl0gSWYgdHJ1ZSwgYWx3YXlzIHNob3cgdGhlIGVycm9yIG1lc3NhZ2UuIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBvbmx5IHNob3dzIGl0IGlmIHRoZSBicm93c2VyIGNhbm5vdCBkb3dubG9hZCB1cmkgbGlua3MuXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHdoZXRoZXIgdGhlIGJyb3dzZXIgaXMgY29tcGF0aWJsZSB3aXRoIGRhdGEgdXJpcy5cclxuICAgICAqL1xuICAgIGNoZWNrQ29tcGF0aWJpbGl0eTogZnVuY3Rpb24gY2hlY2tDb21wYXRpYmlsaXR5KGVycm9yRXZlbnQsIGhyZWYsIGZvcmNlRXJyb3IpIHtcbiAgICAgICAgaWYgKCFjYW5Vc2VEYXRhVXJpSW5IcmVmIHx8IGZvcmNlRXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChkZWZpbmVkKGVycm9yRXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JFdmVudC5yYWlzZUV2ZW50KG5ldyBUZXJyaWFFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQnJvd3NlciBEb2VzIE5vdCBTdXBwb3J0IERhdGEgRG93bmxvYWQnLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVW5mb3J0dW5hdGVseSBNaWNyb3NvZnQgYnJvd3NlcnMgKGluY2x1ZGluZyBhbGwgdmVyc2lvbnMgb2YgSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UpIGRvIG5vdCAnICsgJ3N1cHBvcnQgdGhlIGRhdGEgdXJpIGZ1bmN0aW9uYWxpdHkgbmVlZGVkIHRvIGRvd25sb2FkIGRhdGEgYXMgYSBmaWxlLiBUbyBkb3dubG9hZCwgY29weSB0aGUgZm9sbG93aW5nIHVyaSAnICsgJ2ludG8gYW5vdGhlciBicm93c2VyIHN1Y2ggYXMgQ2hyb21lLCBGaXJlZm94IG9yIFNhZmFyaTogJyArIGhyZWZcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVVyaTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy9saWIvQ29yZS9EYXRhVXJpLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZ2xvYmFsIGRlZmluZSovXHJcbmRlZmluZShbXHJcbiAgICAgICAgJy4vZGVmYXVsdFZhbHVlJyxcclxuICAgICAgICAnLi9kZWZpbmVkJyxcclxuICAgICAgICAnLi9GdWxsc2NyZWVuJ1xyXG4gICAgXSwgZnVuY3Rpb24oXHJcbiAgICAgICAgZGVmYXVsdFZhbHVlLFxyXG4gICAgICAgIGRlZmluZWQsXHJcbiAgICAgICAgRnVsbHNjcmVlbikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGVOYXZpZ2F0b3I7XHJcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB0aGVOYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoZU5hdmlnYXRvciA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGV4dHJhY3RWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcclxuICAgICAgICB2YXIgcGFydHMgPSB2ZXJzaW9uU3RyaW5nLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhcnRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgIHBhcnRzW2ldID0gcGFyc2VJbnQocGFydHNbaV0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpc0Nocm9tZVJlc3VsdDtcclxuICAgIHZhciBjaHJvbWVWZXJzaW9uUmVzdWx0O1xyXG4gICAgZnVuY3Rpb24gaXNDaHJvbWUoKSB7XHJcbiAgICAgICAgaWYgKCFkZWZpbmVkKGlzQ2hyb21lUmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpc0Nocm9tZVJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBFZGdlIGNvbnRhaW5zIENocm9tZSBpbiB0aGUgdXNlciBhZ2VudCB0b29cclxuICAgICAgICAgICAgaWYgKCFpc0VkZ2UoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkcyA9ICgvIENocm9tZVxcLyhbXFwuMC05XSspLykuZXhlYyh0aGVOYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChmaWVsZHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0Nocm9tZVJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lVmVyc2lvblJlc3VsdCA9IGV4dHJhY3RWZXJzaW9uKGZpZWxkc1sxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpc0Nocm9tZVJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaHJvbWVWZXJzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiBpc0Nocm9tZSgpICYmIGNocm9tZVZlcnNpb25SZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlzU2FmYXJpUmVzdWx0O1xyXG4gICAgdmFyIHNhZmFyaVZlcnNpb25SZXN1bHQ7XHJcbiAgICBmdW5jdGlvbiBpc1NhZmFyaSgpIHtcclxuICAgICAgICBpZiAoIWRlZmluZWQoaXNTYWZhcmlSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlzU2FmYXJpUmVzdWx0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBDaHJvbWUgYW5kIEVkZ2UgY29udGFpbiBTYWZhcmkgaW4gdGhlIHVzZXIgYWdlbnQgdG9vXHJcbiAgICAgICAgICAgIGlmICghaXNDaHJvbWUoKSAmJiAhaXNFZGdlKCkgJiYgKC8gU2FmYXJpXFwvW1xcLjAtOV0rLykudGVzdCh0aGVOYXZpZ2F0b3IudXNlckFnZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkcyA9ICgvIFZlcnNpb25cXC8oW1xcLjAtOV0rKS8pLmV4ZWModGhlTmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTYWZhcmlSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNhZmFyaVZlcnNpb25SZXN1bHQgPSBleHRyYWN0VmVyc2lvbihmaWVsZHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaXNTYWZhcmlSZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2FmYXJpVmVyc2lvbigpIHtcclxuICAgICAgICByZXR1cm4gaXNTYWZhcmkoKSAmJiBzYWZhcmlWZXJzaW9uUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpc1dlYmtpdFJlc3VsdDtcclxuICAgIHZhciB3ZWJraXRWZXJzaW9uUmVzdWx0O1xyXG4gICAgZnVuY3Rpb24gaXNXZWJraXQoKSB7XHJcbiAgICAgICAgaWYgKCFkZWZpbmVkKGlzV2Via2l0UmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpc1dlYmtpdFJlc3VsdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpZWxkcyA9ICgvIEFwcGxlV2ViS2l0XFwvKFtcXC4wLTldKykoXFwrPykvKS5leGVjKHRoZU5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICAgICAgICBpZiAoZmllbGRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpc1dlYmtpdFJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB3ZWJraXRWZXJzaW9uUmVzdWx0ID0gZXh0cmFjdFZlcnNpb24oZmllbGRzWzFdKTtcclxuICAgICAgICAgICAgICAgIHdlYmtpdFZlcnNpb25SZXN1bHQuaXNOaWdodGx5ID0gISFmaWVsZHNbMl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpc1dlYmtpdFJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3ZWJraXRWZXJzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiBpc1dlYmtpdCgpICYmIHdlYmtpdFZlcnNpb25SZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlzSW50ZXJuZXRFeHBsb3JlclJlc3VsdDtcclxuICAgIHZhciBpbnRlcm5ldEV4cGxvcmVyVmVyc2lvblJlc3VsdDtcclxuICAgIGZ1bmN0aW9uIGlzSW50ZXJuZXRFeHBsb3JlcigpIHtcclxuICAgICAgICBpZiAoIWRlZmluZWQoaXNJbnRlcm5ldEV4cGxvcmVyUmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpc0ludGVybmV0RXhwbG9yZXJSZXN1bHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaWVsZHM7XHJcbiAgICAgICAgICAgIGlmICh0aGVOYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcicpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkcyA9IC9NU0lFIChbMC05XXsxLH1bXFwuMC05XXswLH0pLy5leGVjKHRoZU5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzSW50ZXJuZXRFeHBsb3JlclJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJuZXRFeHBsb3JlclZlcnNpb25SZXN1bHQgPSBleHRyYWN0VmVyc2lvbihmaWVsZHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoZU5hdmlnYXRvci5hcHBOYW1lID09PSAnTmV0c2NhcGUnKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZHMgPSAvVHJpZGVudFxcLy4qcnY6KFswLTldezEsfVtcXC4wLTldezAsfSkvLmV4ZWModGhlTmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNJbnRlcm5ldEV4cGxvcmVyUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpbnRlcm5ldEV4cGxvcmVyVmVyc2lvblJlc3VsdCA9IGV4dHJhY3RWZXJzaW9uKGZpZWxkc1sxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzSW50ZXJuZXRFeHBsb3JlclJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbnRlcm5ldEV4cGxvcmVyVmVyc2lvbigpIHtcclxuICAgICAgICByZXR1cm4gaXNJbnRlcm5ldEV4cGxvcmVyKCkgJiYgaW50ZXJuZXRFeHBsb3JlclZlcnNpb25SZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlzRWRnZVJlc3VsdDtcclxuICAgIHZhciBlZGdlVmVyc2lvblJlc3VsdDtcclxuICAgIGZ1bmN0aW9uIGlzRWRnZSgpIHtcclxuICAgICAgICBpZiAoIWRlZmluZWQoaXNFZGdlUmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpc0VkZ2VSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGZpZWxkcyA9ICgvIEVkZ2VcXC8oW1xcLjAtOV0rKS8pLmV4ZWModGhlTmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlzRWRnZVJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBlZGdlVmVyc2lvblJlc3VsdCA9IGV4dHJhY3RWZXJzaW9uKGZpZWxkc1sxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRWRnZVJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlZGdlVmVyc2lvbigpIHtcclxuICAgICAgICByZXR1cm4gaXNFZGdlKCkgJiYgZWRnZVZlcnNpb25SZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlzRmlyZWZveFJlc3VsdDtcclxuICAgIHZhciBmaXJlZm94VmVyc2lvblJlc3VsdDtcclxuICAgIGZ1bmN0aW9uIGlzRmlyZWZveCgpIHtcclxuICAgICAgICBpZiAoIWRlZmluZWQoaXNGaXJlZm94UmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpc0ZpcmVmb3hSZXN1bHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSAvRmlyZWZveFxcLyhbXFwuMC05XSspLy5leGVjKHRoZU5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICAgICAgICBpZiAoZmllbGRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpc0ZpcmVmb3hSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZmlyZWZveFZlcnNpb25SZXN1bHQgPSBleHRyYWN0VmVyc2lvbihmaWVsZHNbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0ZpcmVmb3hSZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlzV2luZG93c1Jlc3VsdDtcclxuICAgIGZ1bmN0aW9uIGlzV2luZG93cygpIHtcclxuICAgICAgICBpZiAoIWRlZmluZWQoaXNXaW5kb3dzUmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpc1dpbmRvd3NSZXN1bHQgPSAvV2luZG93cy9pLnRlc3QodGhlTmF2aWdhdG9yLmFwcFZlcnNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNXaW5kb3dzUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBmaXJlZm94VmVyc2lvbigpIHtcclxuICAgICAgICByZXR1cm4gaXNGaXJlZm94KCkgJiYgZmlyZWZveFZlcnNpb25SZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGhhc1BvaW50ZXJFdmVudHM7XHJcbiAgICBmdW5jdGlvbiBzdXBwb3J0c1BvaW50ZXJFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKCFkZWZpbmVkKGhhc1BvaW50ZXJFdmVudHMpKSB7XHJcbiAgICAgICAgICAgIC8vV2hpbGUgbmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkIGlzIGRlcHJlY2F0ZWQgaW4gdGhlIFczQyBzcGVjaWZpY2F0aW9uXHJcbiAgICAgICAgICAgIC8vd2Ugc3RpbGwgbmVlZCB0byB1c2UgaXQgaWYgaXQgZXhpc3RzIGluIG9yZGVyIHRvIHN1cHBvcnQgYnJvd3NlcnNcclxuICAgICAgICAgICAgLy90aGF0IHJlbHkgb24gaXQsIHN1Y2ggYXMgdGhlIFdpbmRvd3MgV2ViQnJvd3NlciBjb250cm9sIHdoaWNoIGRlZmluZXNcclxuICAgICAgICAgICAgLy9Qb2ludGVyRXZlbnQgYnV0IHNldHMgbmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkIHRvIGZhbHNlLlxyXG4gICAgICAgICAgICBoYXNQb2ludGVyRXZlbnRzID0gdHlwZW9mIFBvaW50ZXJFdmVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgKCFkZWZpbmVkKHRoZU5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCkgfHwgdGhlTmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhhc1BvaW50ZXJFdmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGltYWdlUmVuZGVyaW5nVmFsdWVSZXN1bHQ7XHJcbiAgICB2YXIgc3VwcG9ydHNJbWFnZVJlbmRlcmluZ1BpeGVsYXRlZFJlc3VsdDtcclxuICAgIGZ1bmN0aW9uIHN1cHBvcnRzSW1hZ2VSZW5kZXJpbmdQaXhlbGF0ZWQoKSB7XHJcbiAgICAgICAgaWYgKCFkZWZpbmVkKHN1cHBvcnRzSW1hZ2VSZW5kZXJpbmdQaXhlbGF0ZWRSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnc3R5bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZS1yZW5kZXJpbmc6IC1tb3otY3Jpc3AtZWRnZXM7JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkOycpO1xyXG4gICAgICAgICAgICAvL2NhbnZhcy5zdHlsZS5pbWFnZVJlbmRlcmluZyB3aWxsIGJlIHVuZGVmaW5lZCwgbnVsbCBvciBhbiBlbXB0eSBzdHJpbmcgb24gdW5zdXBwb3J0ZWQgYnJvd3NlcnMuXHJcbiAgICAgICAgICAgIHZhciB0bXAgPSBjYW52YXMuc3R5bGUuaW1hZ2VSZW5kZXJpbmc7XHJcbiAgICAgICAgICAgIHN1cHBvcnRzSW1hZ2VSZW5kZXJpbmdQaXhlbGF0ZWRSZXN1bHQgPSBkZWZpbmVkKHRtcCkgJiYgdG1wICE9PSAnJztcclxuICAgICAgICAgICAgaWYgKHN1cHBvcnRzSW1hZ2VSZW5kZXJpbmdQaXhlbGF0ZWRSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlUmVuZGVyaW5nVmFsdWVSZXN1bHQgPSB0bXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRzSW1hZ2VSZW5kZXJpbmdQaXhlbGF0ZWRSZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW1hZ2VSZW5kZXJpbmdWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydHNJbWFnZVJlbmRlcmluZ1BpeGVsYXRlZCgpID8gaW1hZ2VSZW5kZXJpbmdWYWx1ZVJlc3VsdCA6IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgc2V0IG9mIGZ1bmN0aW9ucyB0byBkZXRlY3Qgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzXHJcbiAgICAgKiB2YXJpb3VzIGZlYXR1cmVzLlxyXG4gICAgICpcclxuICAgICAqIEBleHBvcnRzIEZlYXR1cmVEZXRlY3Rpb25cclxuICAgICAqL1xyXG4gICAgdmFyIEZlYXR1cmVEZXRlY3Rpb24gPSB7XHJcbiAgICAgICAgaXNDaHJvbWUgOiBpc0Nocm9tZSxcclxuICAgICAgICBjaHJvbWVWZXJzaW9uIDogY2hyb21lVmVyc2lvbixcclxuICAgICAgICBpc1NhZmFyaSA6IGlzU2FmYXJpLFxyXG4gICAgICAgIHNhZmFyaVZlcnNpb24gOiBzYWZhcmlWZXJzaW9uLFxyXG4gICAgICAgIGlzV2Via2l0IDogaXNXZWJraXQsXHJcbiAgICAgICAgd2Via2l0VmVyc2lvbiA6IHdlYmtpdFZlcnNpb24sXHJcbiAgICAgICAgaXNJbnRlcm5ldEV4cGxvcmVyIDogaXNJbnRlcm5ldEV4cGxvcmVyLFxyXG4gICAgICAgIGludGVybmV0RXhwbG9yZXJWZXJzaW9uIDogaW50ZXJuZXRFeHBsb3JlclZlcnNpb24sXHJcbiAgICAgICAgaXNFZGdlIDogaXNFZGdlLFxyXG4gICAgICAgIGVkZ2VWZXJzaW9uIDogZWRnZVZlcnNpb24sXHJcbiAgICAgICAgaXNGaXJlZm94IDogaXNGaXJlZm94LFxyXG4gICAgICAgIGZpcmVmb3hWZXJzaW9uIDogZmlyZWZveFZlcnNpb24sXHJcbiAgICAgICAgaXNXaW5kb3dzIDogaXNXaW5kb3dzLFxyXG4gICAgICAgIGhhcmR3YXJlQ29uY3VycmVuY3kgOiBkZWZhdWx0VmFsdWUodGhlTmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3ksIDMpLFxyXG4gICAgICAgIHN1cHBvcnRzUG9pbnRlckV2ZW50cyA6IHN1cHBvcnRzUG9pbnRlckV2ZW50cyxcclxuICAgICAgICBzdXBwb3J0c0ltYWdlUmVuZGVyaW5nUGl4ZWxhdGVkOiBzdXBwb3J0c0ltYWdlUmVuZGVyaW5nUGl4ZWxhdGVkLFxyXG4gICAgICAgIGltYWdlUmVuZGVyaW5nVmFsdWU6IGltYWdlUmVuZGVyaW5nVmFsdWVcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlY3RzIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyB0aGUgZnVsbCBzY3JlZW4gc3RhbmRhcmQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIGZ1bGwgc2NyZWVuIHN0YW5kYXJkLCBmYWxzZSBpZiBub3QuXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSBGdWxsc2NyZWVuXHJcbiAgICAgKiBAc2VlIHtAbGluayBodHRwOi8vZHZjcy53My5vcmcvaGcvZnVsbHNjcmVlbi9yYXctZmlsZS90aXAvT3ZlcnZpZXcuaHRtbHxXM0MgRnVsbHNjcmVlbiBMaXZpbmcgU3BlY2lmaWNhdGlvbn1cclxuICAgICAqL1xyXG4gICAgRmVhdHVyZURldGVjdGlvbi5zdXBwb3J0c0Z1bGxzY3JlZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gRnVsbHNjcmVlbi5zdXBwb3J0c0Z1bGxzY3JlZW4oKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlY3RzIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLCBmYWxzZSBpZiBub3QuXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSB7QGxpbmsgaHR0cDovL3d3dy5raHJvbm9zLm9yZy9yZWdpc3RyeS90eXBlZGFycmF5L3NwZWNzL2xhdGVzdC98VHlwZWQgQXJyYXkgU3BlY2lmaWNhdGlvbn1cclxuICAgICAqL1xyXG4gICAgRmVhdHVyZURldGVjdGlvbi5zdXBwb3J0c1R5cGVkQXJyYXlzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZWN0cyB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgV2ViIFdvcmtlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlIGJyb3dzZXJzIHN1cHBvcnRzIFdlYiBXb3JrZXJzLCBmYWxzZSBpZiBub3QuXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSB7QGxpbmsgaHR0cDovL3d3dy53My5vcmcvVFIvd29ya2Vycy99XHJcbiAgICAgKi9cclxuICAgIEZlYXR1cmVEZXRlY3Rpb24uc3VwcG9ydHNXZWJXb3JrZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBXb3JrZXIgIT09ICd1bmRlZmluZWQnO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gRmVhdHVyZURldGVjdGlvbjtcclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9GZWF0dXJlRGV0ZWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZ2xvYmFsIGRlZmluZSovXHJcbmRlZmluZShbXHJcbiAgICAgICAgJy4vZGVmaW5lZCdcclxuICAgIF0sIGZ1bmN0aW9uKFxyXG4gICAgICAgIGRlZmluZWQpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZyZWV6ZXMgYW4gb2JqZWN0LCB1c2luZyBPYmplY3QuZnJlZXplIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIHJldHVybnNcclxuICAgICAqIHRoZSBvYmplY3QgdW5jaGFuZ2VkLiAgVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgdXNlZCBpbiBzZXR1cCBjb2RlIHRvIHByZXZlbnRcclxuICAgICAqIGVycm9ycyBmcm9tIGNvbXBsZXRlbHkgaGFsdGluZyBKYXZhU2NyaXB0IGV4ZWN1dGlvbiBpbiBsZWdhY3kgYnJvd3NlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqXHJcbiAgICAgKiBAZXhwb3J0cyBmcmVlemVPYmplY3RcclxuICAgICAqL1xyXG4gICAgdmFyIGZyZWV6ZU9iamVjdCA9IE9iamVjdC5mcmVlemU7XHJcbiAgICBpZiAoIWRlZmluZWQoZnJlZXplT2JqZWN0KSkge1xyXG4gICAgICAgIGZyZWV6ZU9iamVjdCA9IGZ1bmN0aW9uKG8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG87XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnJlZXplT2JqZWN0O1xyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL2ZyZWV6ZU9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmdsb2JhbCBkZWZpbmUqL1xyXG5kZWZpbmUoW1xyXG4gICAgICAgICcuL2RlZmluZWQnLFxyXG4gICAgICAgICcuL2RlZmluZVByb3BlcnRpZXMnXHJcbiAgICBdLCBmdW5jdGlvbihcclxuICAgICAgICBkZWZpbmVkLFxyXG4gICAgICAgIGRlZmluZVByb3BlcnRpZXMpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgX3N1cHBvcnRzRnVsbHNjcmVlbjtcclxuICAgIHZhciBfbmFtZXMgPSB7XHJcbiAgICAgICAgcmVxdWVzdEZ1bGxzY3JlZW4gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgZXhpdEZ1bGxzY3JlZW4gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgZnVsbHNjcmVlbkVuYWJsZWQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgZnVsbHNjcmVlbkVsZW1lbnQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgZnVsbHNjcmVlbmNoYW5nZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICBmdWxsc2NyZWVuZXJyb3IgOiB1bmRlZmluZWRcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VyLWluZGVwZW5kZW50IGZ1bmN0aW9ucyBmb3Igd29ya2luZyB3aXRoIHRoZSBzdGFuZGFyZCBmdWxsc2NyZWVuIEFQSS5cclxuICAgICAqXHJcbiAgICAgKiBAZXhwb3J0cyBGdWxsc2NyZWVuXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSB7QGxpbmsgaHR0cDovL2R2Y3MudzMub3JnL2hnL2Z1bGxzY3JlZW4vcmF3LWZpbGUvdGlwL092ZXJ2aWV3Lmh0bWx8VzNDIEZ1bGxzY3JlZW4gTGl2aW5nIFNwZWNpZmljYXRpb259XHJcbiAgICAgKi9cclxuICAgIHZhciBGdWxsc2NyZWVuID0ge307XHJcblxyXG4gICAgZGVmaW5lUHJvcGVydGllcyhGdWxsc2NyZWVuLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGVsZW1lbnQgdGhhdCBpcyBjdXJyZW50bHkgZnVsbHNjcmVlbiwgaWYgYW55LiAgVG8gc2ltcGx5IGNoZWNrIGlmIHRoZVxyXG4gICAgICAgICAqIGJyb3dzZXIgaXMgaW4gZnVsbHNjcmVlbiBtb2RlIG9yIG5vdCwgdXNlIHtAbGluayBGdWxsc2NyZWVuI2Z1bGxzY3JlZW59LlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBGdWxsc2NyZWVuXHJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgKiBAcmVhZG9ubHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBlbGVtZW50IDoge1xyXG4gICAgICAgICAgICBnZXQgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICghRnVsbHNjcmVlbi5zdXBwb3J0c0Z1bGxzY3JlZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50W19uYW1lcy5mdWxsc2NyZWVuRWxlbWVudF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgb24gdGhlIGRvY3VtZW50IHRoYXQgaXMgZmlyZWQgd2hlbiBmdWxsc2NyZWVuIGlzXHJcbiAgICAgICAgICogZW50ZXJlZCBvciBleGl0ZWQuICBUaGlzIGV2ZW50IG5hbWUgaXMgaW50ZW5kZWQgZm9yIHVzZSB3aXRoIGFkZEV2ZW50TGlzdGVuZXIuXHJcbiAgICAgICAgICogSW4geW91ciBldmVudCBoYW5kbGVyLCB0byBkZXRlcm1pbmUgaWYgdGhlIGJyb3dzZXIgaXMgaW4gZnVsbHNjcmVlbiBtb2RlIG9yIG5vdCxcclxuICAgICAgICAgKiB1c2Uge0BsaW5rIEZ1bGxzY3JlZW4jZnVsbHNjcmVlbn0uXHJcbiAgICAgICAgICogQG1lbWJlcm9mIEZ1bGxzY3JlZW5cclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqIEByZWFkb25seVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNoYW5nZUV2ZW50TmFtZSA6IHtcclxuICAgICAgICAgICAgZ2V0IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUZ1bGxzY3JlZW4uc3VwcG9ydHNGdWxsc2NyZWVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBfbmFtZXMuZnVsbHNjcmVlbmNoYW5nZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0aGF0IGlzIGZpcmVkIHdoZW4gYSBmdWxsc2NyZWVuIGVycm9yXHJcbiAgICAgICAgICogb2NjdXJzLiAgVGhpcyBldmVudCBuYW1lIGlzIGludGVuZGVkIGZvciB1c2Ugd2l0aCBhZGRFdmVudExpc3RlbmVyLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBGdWxsc2NyZWVuXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKiBAcmVhZG9ubHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBlcnJvckV2ZW50TmFtZSA6IHtcclxuICAgICAgICAgICAgZ2V0IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUZ1bGxzY3JlZW4uc3VwcG9ydHNGdWxsc2NyZWVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBfbmFtZXMuZnVsbHNjcmVlbmVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGJyb3dzZXIgd2lsbCBhbGxvdyBhbiBlbGVtZW50IHRvIGJlIG1hZGUgZnVsbHNjcmVlbiwgb3Igbm90LlxyXG4gICAgICAgICAqIEZvciBleGFtcGxlLCBieSBkZWZhdWx0LCBpZnJhbWVzIGNhbm5vdCBnbyBmdWxsc2NyZWVuIHVubGVzcyB0aGUgY29udGFpbmluZyBwYWdlXHJcbiAgICAgICAgICogYWRkcyBhbiBcImFsbG93ZnVsbHNjcmVlblwiIGF0dHJpYnV0ZSAob3IgcHJlZml4ZWQgZXF1aXZhbGVudCkuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIEZ1bGxzY3JlZW5cclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAcmVhZG9ubHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBlbmFibGVkIDoge1xyXG4gICAgICAgICAgICBnZXQgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICghRnVsbHNjcmVlbi5zdXBwb3J0c0Z1bGxzY3JlZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50W19uYW1lcy5mdWxsc2NyZWVuRW5hYmxlZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBicm93c2VyIGlzIGN1cnJlbnRseSBpbiBmdWxsc2NyZWVuIG1vZGUuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIEZ1bGxzY3JlZW5cclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAcmVhZG9ubHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdWxsc2NyZWVuIDoge1xyXG4gICAgICAgICAgICBnZXQgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICghRnVsbHNjcmVlbi5zdXBwb3J0c0Z1bGxzY3JlZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZ1bGxzY3JlZW4uZWxlbWVudCAhPT0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZWN0cyB3aGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIHRoZSBzdGFuZGFyZCBmdWxsc2NyZWVuIEFQSS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIHN0YW5kYXJkIGZ1bGxzY3JlZW4gQVBJLFxyXG4gICAgICogPGNvZGU+ZmFsc2U8L2NvZGU+IG90aGVyd2lzZS5cclxuICAgICAqL1xyXG4gICAgRnVsbHNjcmVlbi5zdXBwb3J0c0Z1bGxzY3JlZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZGVmaW5lZChfc3VwcG9ydHNGdWxsc2NyZWVuKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3N1cHBvcnRzRnVsbHNjcmVlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9zdXBwb3J0c0Z1bGxzY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIGlmICh0eXBlb2YgYm9keS5yZXF1ZXN0RnVsbHNjcmVlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAvLyBnbyB3aXRoIHRoZSB1bnByZWZpeGVkLCBzdGFuZGFyZCBzZXQgb2YgbmFtZXNcclxuICAgICAgICAgICAgX25hbWVzLnJlcXVlc3RGdWxsc2NyZWVuID0gJ3JlcXVlc3RGdWxsc2NyZWVuJztcclxuICAgICAgICAgICAgX25hbWVzLmV4aXRGdWxsc2NyZWVuID0gJ2V4aXRGdWxsc2NyZWVuJztcclxuICAgICAgICAgICAgX25hbWVzLmZ1bGxzY3JlZW5FbmFibGVkID0gJ2Z1bGxzY3JlZW5FbmFibGVkJztcclxuICAgICAgICAgICAgX25hbWVzLmZ1bGxzY3JlZW5FbGVtZW50ID0gJ2Z1bGxzY3JlZW5FbGVtZW50JztcclxuICAgICAgICAgICAgX25hbWVzLmZ1bGxzY3JlZW5jaGFuZ2UgPSAnZnVsbHNjcmVlbmNoYW5nZSc7XHJcbiAgICAgICAgICAgIF9uYW1lcy5mdWxsc2NyZWVuZXJyb3IgPSAnZnVsbHNjcmVlbmVycm9yJztcclxuICAgICAgICAgICAgX3N1cHBvcnRzRnVsbHNjcmVlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBfc3VwcG9ydHNGdWxsc2NyZWVuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBmb3IgdGhlIGNvcnJlY3QgY29tYmluYXRpb24gb2YgcHJlZml4IHBsdXMgdGhlIHZhcmlvdXMgbmFtZXMgdGhhdCBicm93c2VycyB1c2VcclxuICAgICAgICB2YXIgcHJlZml4ZXMgPSBbJ3dlYmtpdCcsICdtb3onLCAnbycsICdtcycsICdraHRtbCddO1xyXG4gICAgICAgIHZhciBuYW1lO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwcmVmaXhlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gcHJlZml4ZXNbaV07XHJcblxyXG4gICAgICAgICAgICAvLyBjYXNpbmcgb2YgRnVsbHNjcmVlbiBkaWZmZXJzIGFjcm9zcyBicm93c2Vyc1xyXG4gICAgICAgICAgICBuYW1lID0gcHJlZml4ICsgJ1JlcXVlc3RGdWxsc2NyZWVuJztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBib2R5W25hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBfbmFtZXMucmVxdWVzdEZ1bGxzY3JlZW4gPSBuYW1lO1xyXG4gICAgICAgICAgICAgICAgX3N1cHBvcnRzRnVsbHNjcmVlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gcHJlZml4ICsgJ1JlcXVlc3RGdWxsU2NyZWVuJztcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYm9keVtuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9uYW1lcy5yZXF1ZXN0RnVsbHNjcmVlbiA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3N1cHBvcnRzRnVsbHNjcmVlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGRpc2FncmVlbWVudCBhYm91dCB3aGV0aGVyIGl0J3MgXCJleGl0XCIgYXMgcGVyIHNwZWMsIG9yIFwiY2FuY2VsXCJcclxuICAgICAgICAgICAgbmFtZSA9IHByZWZpeCArICdFeGl0RnVsbHNjcmVlbic7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnRbbmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIF9uYW1lcy5leGl0RnVsbHNjcmVlbiA9IG5hbWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gcHJlZml4ICsgJ0NhbmNlbEZ1bGxTY3JlZW4nO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudFtuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9uYW1lcy5leGl0RnVsbHNjcmVlbiA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNhc2luZyBvZiBGdWxsc2NyZWVuIGRpZmZlcnMgYWNyb3NzIGJyb3dzZXJzXHJcbiAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnRnVsbHNjcmVlbkVuYWJsZWQnO1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnRbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgX25hbWVzLmZ1bGxzY3JlZW5FbmFibGVkID0gbmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnRnVsbFNjcmVlbkVuYWJsZWQnO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50W25hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfbmFtZXMuZnVsbHNjcmVlbkVuYWJsZWQgPSBuYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjYXNpbmcgb2YgRnVsbHNjcmVlbiBkaWZmZXJzIGFjcm9zcyBicm93c2Vyc1xyXG4gICAgICAgICAgICBuYW1lID0gcHJlZml4ICsgJ0Z1bGxzY3JlZW5FbGVtZW50JztcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50W25hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIF9uYW1lcy5mdWxsc2NyZWVuRWxlbWVudCA9IG5hbWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gcHJlZml4ICsgJ0Z1bGxTY3JlZW5FbGVtZW50JztcclxuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudFtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX25hbWVzLmZ1bGxzY3JlZW5FbGVtZW50ID0gbmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdGhhbmtmdWxseSwgZXZlbnQgbmFtZXMgYXJlIGFsbCBsb3dlcmNhc2UgcGVyIHNwZWNcclxuICAgICAgICAgICAgbmFtZSA9IHByZWZpeCArICdmdWxsc2NyZWVuY2hhbmdlJztcclxuICAgICAgICAgICAgLy8gZXZlbnQgbmFtZXMgZG8gbm90IGhhdmUgJ29uJyBpbiB0aGUgZnJvbnQsIGJ1dCB0aGUgcHJvcGVydHkgb24gdGhlIGRvY3VtZW50IGRvZXNcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50WydvbicgKyBuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvL2V4Y2VwdCBvbiBJRVxyXG4gICAgICAgICAgICAgICAgaWYgKHByZWZpeCA9PT0gJ21zJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAnTVNGdWxsc2NyZWVuQ2hhbmdlJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9uYW1lcy5mdWxsc2NyZWVuY2hhbmdlID0gbmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbmFtZSA9IHByZWZpeCArICdmdWxsc2NyZWVuZXJyb3InO1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnRbJ29uJyArIG5hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vZXhjZXB0IG9uIElFXHJcbiAgICAgICAgICAgICAgICBpZiAocHJlZml4ID09PSAnbXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICdNU0Z1bGxzY3JlZW5FcnJvcic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfbmFtZXMuZnVsbHNjcmVlbmVycm9yID0gbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9zdXBwb3J0c0Z1bGxzY3JlZW47XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXN5bmNocm9ub3VzbHkgcmVxdWVzdHMgdGhlIGJyb3dzZXIgdG8gZW50ZXIgZnVsbHNjcmVlbiBtb2RlIG9uIHRoZSBnaXZlbiBlbGVtZW50LlxyXG4gICAgICogSWYgZnVsbHNjcmVlbiBtb2RlIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXIsIGRvZXMgbm90aGluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCBUaGUgSFRNTCBlbGVtZW50IHdoaWNoIHdpbGwgYmUgcGxhY2VkIGludG8gZnVsbHNjcmVlbiBtb2RlLlxyXG4gICAgICogQHBhcmFtIHtITURWUkRldmljZX0gW3ZyRGV2aWNlXSBUaGUgVlIgZGV2aWNlLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBQdXQgdGhlIGVudGlyZSBwYWdlIGludG8gZnVsbHNjcmVlbi5cclxuICAgICAqIENlc2l1bS5GdWxsc2NyZWVuLnJlcXVlc3RGdWxsc2NyZWVuKGRvY3VtZW50LmJvZHkpXHJcbiAgICAgKlxyXG4gICAgICogLy8gUGxhY2Ugb25seSB0aGUgQ2VzaXVtIGNhbnZhcyBpbnRvIGZ1bGxzY3JlZW4uXHJcbiAgICAgKiBDZXNpdW0uRnVsbHNjcmVlbi5yZXF1ZXN0RnVsbHNjcmVlbihzY2VuZS5jYW52YXMpXHJcbiAgICAgKi9cclxuICAgIEZ1bGxzY3JlZW4ucmVxdWVzdEZ1bGxzY3JlZW4gPSBmdW5jdGlvbihlbGVtZW50LCB2ckRldmljZSkge1xyXG4gICAgICAgIGlmICghRnVsbHNjcmVlbi5zdXBwb3J0c0Z1bGxzY3JlZW4oKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50W19uYW1lcy5yZXF1ZXN0RnVsbHNjcmVlbl0oeyB2ckRpc3BsYXk6IHZyRGV2aWNlIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFzeW5jaHJvbm91c2x5IGV4aXRzIGZ1bGxzY3JlZW4gbW9kZS4gIElmIHRoZSBicm93c2VyIGlzIG5vdCBjdXJyZW50bHlcclxuICAgICAqIGluIGZ1bGxzY3JlZW4sIG9yIGlmIGZ1bGxzY3JlZW4gbW9kZSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyLCBkb2VzIG5vdGhpbmcuXHJcbiAgICAgKi9cclxuICAgIEZ1bGxzY3JlZW4uZXhpdEZ1bGxzY3JlZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIUZ1bGxzY3JlZW4uc3VwcG9ydHNGdWxsc2NyZWVuKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jdW1lbnRbX25hbWVzLmV4aXRGdWxsc2NyZWVuXSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gRnVsbHNjcmVlbjtcclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9GdWxsc2NyZWVuLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZ2xvYmFsIGRlZmluZSovXHJcbmRlZmluZShbXHJcbiAgICAgICAgJy4vZGVmaW5lZCdcclxuICAgIF0sIGZ1bmN0aW9uKFxyXG4gICAgICAgIGRlZmluZWQpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgZGVmaW5lUHJvcGVydHlXb3JrcyA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3gnIGluIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3gnLCB7fSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgcHJvcGVydGllcyBvbiBhbiBvYmplY3QsIHVzaW5nIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIGlmIGF2YWlsYWJsZSxcclxuICAgICAqIG90aGVyd2lzZSByZXR1cm5zIHRoZSBvYmplY3QgdW5jaGFuZ2VkLiAgVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgdXNlZCBpblxyXG4gICAgICogc2V0dXAgY29kZSB0byBwcmV2ZW50IGVycm9ycyBmcm9tIGNvbXBsZXRlbHkgaGFsdGluZyBKYXZhU2NyaXB0IGV4ZWN1dGlvblxyXG4gICAgICogaW4gbGVnYWN5IGJyb3dzZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKlxyXG4gICAgICogQGV4cG9ydHMgZGVmaW5lUHJvcGVydGllc1xyXG4gICAgICovXHJcbiAgICB2YXIgZGVmaW5lUHJvcGVydGllcyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzO1xyXG4gICAgaWYgKCFkZWZpbmVQcm9wZXJ0eVdvcmtzIHx8ICFkZWZpbmVkKGRlZmluZVByb3BlcnRpZXMpKSB7XHJcbiAgICAgICAgZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uKG8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG87XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVmaW5lUHJvcGVydGllcztcclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9kZWZpbmVQcm9wZXJ0aWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLypnbG9iYWwgcmVxdWlyZSovXG5cbnZhciBkZWZhdWx0VmFsdWUgPSByZXF1aXJlKCd0ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmYXVsdFZhbHVlJyk7XG5cbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIGVycm9yIHRoYXQgb2NjdXJyZWQgaW4gYSBUZXJyaWFKUyBtb2R1bGUsIGVzcGVjaWFsbHkgYW4gYXN5bmNocm9ub3VzIG9uZSB0aGF0IGNhbm5vdCBiZSByYWlzZWRcclxuICogYnkgdGhyb3dpbmcgYW4gZXhjZXB0aW9uIGJlY2F1c2Ugbm8gb25lIHdvdWxkIGJlIGFibGUgdG8gY2F0Y2ggaXQuXHJcbiAqXHJcbiAqIEBhbGlhcyBUZXJyaWFFcnJvclxyXG4gKiBAY29uc3RydWN0b3JcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuc2VuZGVyXSBUaGUgb2JqZWN0IHJhaXNpbmcgdGhlIGVycm9yLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudGl0bGU9J0FuIGVycm9yIG9jY3VycmVkJ10gQSBzaG9ydCB0aXRsZSBkZXNjcmliaW5nIHRoZSBlcnJvci5cclxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMubWVzc2FnZSBBIGRldGFpbGVkIG1lc3NhZ2UgZGVzY3JpYmluZyB0aGUgZXJyb3IuICBUaGlzIG1lc3NhZ2UgbWF5IGJlIEhUTUwgYW5kIGl0IHNob3VsZCBiZSBzYW5pdGl6ZWQgYmVmb3JlIGRpc3BsYXkgdG8gdGhlIHVzZXIuXHJcbiAqL1xudmFyIFRlcnJpYUVycm9yID0gZnVuY3Rpb24gVGVycmlhRXJyb3Iob3B0aW9ucykge1xuICBvcHRpb25zID0gZGVmYXVsdFZhbHVlKG9wdGlvbnMsIGRlZmF1bHRWYWx1ZS5FTVBUWV9PQkpFQ1QpO1xuXG4gIC8qKlxyXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgb2JqZWN0IHRoYXQgcmFpc2VkIHRoZSBlcnJvci5cclxuICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAqL1xuICB0aGlzLnNlbmRlciA9IG9wdGlvbnMuc2VuZGVyO1xuXG4gIC8qKlxyXG4gICAqIEdldHMgb3Igc2V0cyBhIHNob3J0IHRpdGxlIGRlc2NyaWJpbmcgdGhlIGVycm9yLlxyXG4gICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICovXG4gIHRoaXMudGl0bGUgPSBkZWZhdWx0VmFsdWUob3B0aW9ucy50aXRsZSwgJ0FuIGVycm9yIG9jY3VycmVkJyk7XG5cbiAgLyoqXHJcbiAgICogR2V0cyBvciBzZXRzIGEgbWV0YWlsZWQgbWVzc2FnZSBkZXNjcmliaW5nIHRoZSBlcnJvci4gIFRoaXMgbWVzc2FnZSBtYXkgYmUgSFRNTCBhbmQgaXQgc2hvdWxkIGJlIHNhbml0aXplZCBiZWZvcmUgZGlzcGxheSB0byB0aGUgdXNlci5cclxuICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAqL1xuICB0aGlzLm1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2U7XG5cbiAgLyoqXHJcbiAgICogVHJ1ZSBpZiB0aGUgdXNlciBoYXMgc2VlbiB0aGlzIGVycm9yOyBvdGhlcndpc2UsIGZhbHNlLlxyXG4gICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICovXG4gIHRoaXMucmFpc2VkVG9Vc2VyID0gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRlcnJpYUVycm9yO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzL2xpYi9Db3JlL1RlcnJpYUVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIFJldHVybnMgaW5kaWNlcyBzdWNoIHRoYXQgYXJyYXlbaW5kaWNlc1tpXV0gPSBzb3J0ZWRBcnJheVtpXS5cclxuICogRWcuIHNvcnRlZEluZGljZXMoWydjJywgJ2EnLCAnYicsICdkJ10pID0+IFsxLCAyLCAwLCAzXS4gKFRoZSBzb3J0ZWQgYXJyYXkgaXMgW2EsIGIsIGMsIGRdLCBhbmQgXCJhXCIgd2FzIGluIHBvc2l0aW9uIDEsIFwiYlwiIGluIHBvc2l0aW9uIDIsIGV0Yy4pXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzb3J0LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyZUZ1bmN0aW9uXSBUaGUgdXN1YWwgY29tcGFyZSBmdW5jdGlvbiwgZWcuIGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgLSBiIH0uXHJcbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgc29ydGVkIGluZGljZXMsIHN1Y2ggdGhhdCBhcnJheVtzb3J0ZWRJbmRpY2VzWzBdXSA9IHNvcnRlZEFycmF5WzBdLlxyXG4gKi9cblxuZnVuY3Rpb24gc29ydGVkSW5kaWNlcyhhcnJheSwgY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgaW5kaWNlcyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaW5kaWNlc1tpXSA9IGk7XG4gICAgfVxuICAgIGlmICghY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbXBhcmVGdW5jdGlvbiA9IGZ1bmN0aW9uIGNvbXBhcmVGdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDA7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGluZGljZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGFycmF5W2FdLCBhcnJheVtiXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGluZGljZXM7XG59XG5cbi8vXG4vLyBOb3RlOiBmb3IgaW5kaWNlcyB3aGljaCBnbyBpbiB0aGUgb3RoZXIgZGlyZWN0aW9uLCBqdXN0IHVzZSBpbmRleE9mIGxpa2UgdGhpczpcbi8vXG4vLyBpdCgnaW52ZXJzZSBpbmRpY2VzIHdvcmsnLCBmdW5jdGlvbigpIHtcbi8vICAgICB2YXIgZGF0YSA9IFsnYycsICdhJywgJ2InLCAnZCddO1xuLy8gICAgIHZhciBzb3J0ZWQgPSBkYXRhLnNsaWNlKCkuc29ydCgpO1xuLy8gICAgIHZhciBpbnZlcnNlSW5kaWNlcyA9IGRhdGEubWFwKGZ1bmN0aW9uKGRhdHVtKSB7IHJldHVybiBzb3J0ZWQuaW5kZXhPZihkYXR1bSk7IH0pO1xuLy8gICAgIGV4cGVjdChpbnZlcnNlSW5kaWNlcykudG9FcXVhbChbMiwgMCwgMSwgM10pO1xuLy8gfSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRJbmRpY2VzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzL2xpYi9Db3JlL3NvcnRlZEluZGljZXMuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0E7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7O0FDclFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7QUM5UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0EiLCJzb3VyY2VSb290IjoiIn0=