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
/******/ 	__webpack_require__.p = "/static/build/";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjI0YWNhODEwZjM5N2ZiYmU1YTAud29ya2VyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGYyNGFjYTgxMGYzOTdmYmJlNWEwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL2RlZmF1bHRWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL1JlYWN0Vmlld3MvQ3VzdG9tL0NoYXJ0L2Rvd25sb2FkSHJlZldvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL0NvcmUvRGF0YVVyaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL0ZlYXR1cmVEZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9mcmVlemVPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9GdWxsc2NyZWVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lUHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL0NvcmUvVGVycmlhRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzL2xpYi9Db3JlL3NvcnRlZEluZGljZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL3N0YXRpYy9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmMjRhY2E4MTBmMzk3ZmJiZTVhMCIsIi8qZ2xvYmFsIGRlZmluZSovXHJcbmRlZmluZShmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBleHBvcnRzIGRlZmluZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgVGhlIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIG9iamVjdCBpcyBkZWZpbmVkLCByZXR1cm5zIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogaWYgKENlc2l1bS5kZWZpbmVkKHBvc2l0aW9ucykpIHtcclxuICAgICAqICAgICAgZG9Tb21ldGhpbmcoKTtcclxuICAgICAqIH0gZWxzZSB7XHJcbiAgICAgKiAgICAgIGRvU29tZXRoaW5nRWxzZSgpO1xyXG4gICAgICogfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBkZWZpbmVkKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRlZmluZWQ7XHJcbn0pO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmdsb2JhbCBkZWZpbmUqL1xyXG5kZWZpbmUoW1xyXG4gICAgICAgICcuL2ZyZWV6ZU9iamVjdCdcclxuICAgIF0sIGZ1bmN0aW9uKFxyXG4gICAgICAgIGZyZWV6ZU9iamVjdCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZmlyc3QgcGFyYW1ldGVyIGlmIG5vdCB1bmRlZmluZWQsIG90aGVyd2lzZSB0aGUgc2Vjb25kIHBhcmFtZXRlci5cclxuICAgICAqIFVzZWZ1bCBmb3Igc2V0dGluZyBhIGRlZmF1bHQgdmFsdWUgZm9yIGEgcGFyYW1ldGVyLlxyXG4gICAgICpcclxuICAgICAqIEBleHBvcnRzIGRlZmF1bHRWYWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYVxyXG4gICAgICogQHBhcmFtIHsqfSBiXHJcbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZmlyc3QgcGFyYW1ldGVyIGlmIG5vdCB1bmRlZmluZWQsIG90aGVyd2lzZSB0aGUgc2Vjb25kIHBhcmFtZXRlci5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcGFyYW0gPSBDZXNpdW0uZGVmYXVsdFZhbHVlKHBhcmFtLCAnZGVmYXVsdCcpO1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBkZWZhdWx0VmFsdWUoYSwgYikge1xyXG4gICAgICAgIGlmIChhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBmcm96ZW4gZW1wdHkgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIGRlZmF1bHQgdmFsdWUgZm9yIG9wdGlvbnMgcGFzc2VkIGFzXHJcbiAgICAgKiBhbiBvYmplY3QgbGl0ZXJhbC5cclxuICAgICAqL1xyXG4gICAgZGVmYXVsdFZhbHVlLkVNUFRZX09CSkVDVCA9IGZyZWV6ZU9iamVjdCh7fSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9kZWZhdWx0VmFsdWUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2RlZmluZWQgPSByZXF1aXJlKCd0ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lZCcpO1xuXG52YXIgX2RlZmluZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lZCk7XG5cbnZhciBfRGF0YVVyaSA9IHJlcXVpcmUoJy4uLy4uLy4uL0NvcmUvRGF0YVVyaScpO1xuXG52YXIgX0RhdGFVcmkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRGF0YVVyaSk7XG5cbnZhciBfc29ydGVkSW5kaWNlcyA9IHJlcXVpcmUoJy4uLy4uLy4uL0NvcmUvc29ydGVkSW5kaWNlcycpO1xuXG52YXIgX3NvcnRlZEluZGljZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc29ydGVkSW5kaWNlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxyXG4gKiBDcmVhdGUgY29tYmluZWQgYXJyYXlzIGZyb20gYXJyYXlzIG9mIGNvbHVtbiB2YWx1ZXMsIGVnLiBbW3ZhbHVlczEsIHZhbHVlczIsIHZhbHVlczNdLCBbdmFsdWVzNCwgdmFsdWVzNV1dLlxyXG4gKiBUaGUgZmlyc3QgY29sdW1ucyBvZiBlYWNoIGFycmF5IG11c3QgYmUgb2YgdGhlIHNhbWUgdHlwZSAoaW4gdGhlIGFib3ZlIGV4YW1wbGUsIHZhbHVlczEgYW5kIHZhbHVlczQpLlxyXG4gKiBUaGVzZSBhcmUgY29tYmluZWQgYW5kIHNvcnRlZCBpbnRvIGEgc2luZ2xlIGNvbHVtbi5cclxuICogVGhlbiB0aGUgc3Vic2VxdWVudCBjb2x1bW5zIGFyZSBhZGRlZCwgZmlsbGluZyB3aXRoIG51bGwgd2hlcmUgbWlzc2luZy4gKFRoaXMgY291bGQgYmUgYW4gb3B0aW9uIGluIGZ1dHVyZS4pXHJcbiAqIEVnLiBpZiB0aGUgdmFsdWVzIG9mIGVhY2ggY29sIGFyZTogdmFsdWVzMT1bMSwzXTsgdmFsdWVzMj1bMTAsMzBdOyB2YWx1ZXMzPVsxMDAsMzAwXTsgdmFsdWVzND1bMSwyXTsgdmFsdWVzNT1bLTEsLTJdO1xyXG4gKiB0aGVuIHRoZSByZXN1bHRpbmcgYXJyYXkgb2YgY29sdW1uIHZhbHVlcyBhcmUsIGluIG9yZGVyLCBbMSwyLDNdOyBbMTAsbnVsbCwzMF07IFsxMDAsbnVsbCwzMDBdOyBbLTEsLTIsbnVsbF0uXHJcbiAqIEBwYXJhbSB7QXJyYXlbXX0gdmFsdWVBcnJheXMgU2VlIGRlc2NyaXB0aW9uIGFib3ZlLlxyXG4gKiBAcmV0dXJuIHtBcnJheVtdfSBUaGUgc3ludGhlc2l6ZWQgdmFsdWVzIHdoaWNoIGNvdWxkIGJlIHBhc3NlZCB0byBhIHRhYmxlIHN0cnVjdHVyZS5cclxuICovXG5mdW5jdGlvbiBjb21iaW5lVmFsdWVBcnJheXModmFsdWVBcnJheXMpIHtcbiAgICBpZiAoISgwLCBfZGVmaW5lZDIuZGVmYXVsdCkodmFsdWVBcnJheXMpIHx8IHZhbHVlQXJyYXlzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY29tYmluZWRWYWx1ZUFycmF5cyA9IFtdO1xuICAgIC8vIFN0YXJ0IGJ5IGNvcHlpbmcgdGhlIGZpcnN0IHNldCBvZiBjb2x1bW5zIGludG8gdGhlIHJlc3VsdC5cbiAgICB2YXIgZmlyc3RBcnJheSA9IHZhbHVlQXJyYXlzWzBdO1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgZmlyc3RBcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgdmFsdWVzID0gZmlyc3RBcnJheVtqXTtcbiAgICAgICAgY29tYmluZWRWYWx1ZUFycmF5cy5wdXNoKHZhbHVlcy5zbGljZSgpKTtcbiAgICB9XG4gICAgLy8gVGhlbiBhZGQgdGhlIHN1YnNlcXVlbnQgc2V0cyBvZiB4LWNvbHVtbnMgdG8gdGhlIGVuZCBvZiB0aGUgZmlyc3QgcmVzdWx0IGNvbHVtbixcbiAgICAvLyBhZGQgbnVsbHMgdG8gdGhlIGVuZCBvZiB0aGUgb3RoZXIgZXhpc3RpbmcgY29sdW1ucyxcbiAgICAvLyBhZGQgbnVsbHMgdG8gdGhlIHN0YXJ0IG9mIHRoZSBuZXcgY29sdW1ucyxcbiAgICAvLyBhbmQgYWRkIHRoZW0gdG8gdGhlIGVuZCBvZiB0aGUgcmVzdWx0LlxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdmFsdWVBcnJheXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZUFycmF5ID0gdmFsdWVBcnJheXNbaV07XG4gICAgICAgIHZhciBjdXJyZW50Rmlyc3RBcnJheSA9IGN1cnJlbnRWYWx1ZUFycmF5WzBdO1xuICAgICAgICB2YXIgcHJlRXhpc3RpbmdWYWx1ZXNMZW5ndGggPSBjb21iaW5lZFZhbHVlQXJyYXlzWzBdLmxlbmd0aDtcbiAgICAgICAgY29tYmluZWRWYWx1ZUFycmF5c1swXSA9IGNvbWJpbmVkVmFsdWVBcnJheXNbMF0uY29uY2F0KGN1cnJlbnRGaXJzdEFycmF5KTtcbiAgICAgICAgdmFyIGVtcHR5MSA9IG5ldyBBcnJheShjdXJyZW50Rmlyc3RBcnJheS5sZW5ndGgpOyAvLyBlbGVtZW50cyBhcmUgdW5kZWZpbmVkLlxuICAgICAgICBmb3IgKHZhciBrID0gMTsgayA8IGNvbWJpbmVkVmFsdWVBcnJheXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGNvbWJpbmVkVmFsdWVBcnJheXNba10gPSBjb21iaW5lZFZhbHVlQXJyYXlzW2tdLmNvbmNhdChlbXB0eTEpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbXB0eTIgPSBuZXcgQXJyYXkocHJlRXhpc3RpbmdWYWx1ZXNMZW5ndGgpOyAvLyBlbGVtZW50cyBhcmUgdW5kZWZpbmVkLlxuICAgICAgICBmb3IgKHZhciBfaiA9IDE7IF9qIDwgY3VycmVudFZhbHVlQXJyYXkubGVuZ3RoOyBfaisrKSB7XG4gICAgICAgICAgICB2YXIgX3ZhbHVlcyA9IGN1cnJlbnRWYWx1ZUFycmF5W19qXTtcbiAgICAgICAgICAgIGNvbWJpbmVkVmFsdWVBcnJheXMucHVzaChlbXB0eTIuY29uY2F0KF92YWx1ZXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNvcnQgYnkgdGhlIGZpcnN0IGNvbHVtbi5cbiAgICBjb21iaW5lZFZhbHVlQXJyYXlzID0gc29ydEJ5Rmlyc3QoY29tYmluZWRWYWx1ZUFycmF5cyk7XG4gICAgY29tYmluZWRWYWx1ZUFycmF5cyA9IGNvbWJpbmVSZXBlYXRlZChjb21iaW5lZFZhbHVlQXJyYXlzKTtcblxuICAgIHJldHVybiBjb21iaW5lZFZhbHVlQXJyYXlzO1xufVxuXG4vKipcclxuICogRWcuIHNvcnRCeUZpcnN0KFtbJ2InLCAnYScsICdjJ10sIFsxLCAyLCAzXV0pID0gW1snYScsICdiJywgJ2MnXSwgWzIsIDEsIDNdXS5cclxuICogQHBhcmFtICB7QXJyYXlbXX0gdmFsdWVBcnJheXMgVGhlIGFycmF5IG9mIGFycmF5cyBvZiB2YWx1ZXMgdG8gc29ydC5cclxuICogQHJldHVybiB7QXJyYXlbXX0gVGhlIHZhbHVlcyBzb3J0ZWQgYnkgdGhlIGZpcnN0IGNvbHVtbi5cclxuICovXG4vKiBnbG9iYWwgb25tZXNzYWdlOnRydWUgKi9cbmZ1bmN0aW9uIHNvcnRCeUZpcnN0KHZhbHVlQXJyYXlzKSB7XG4gICAgdmFyIGZpcnN0VmFsdWVzID0gdmFsdWVBcnJheXNbMF07XG4gICAgdmFyIGluZGljZXMgPSAoMCwgX3NvcnRlZEluZGljZXMyLmRlZmF1bHQpKGZpcnN0VmFsdWVzKTtcbiAgICByZXR1cm4gdmFsdWVBcnJheXMubWFwKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGluZGljZXMubWFwKGZ1bmN0aW9uIChzb3J0ZWRJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlc1tzb3J0ZWRJbmRleF07XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vKipcclxuICogQHBhcmFtICB7QXJyYXlbXX0gc29ydGVkSnVsaWFuRGF0ZU9yVmFsdWVBcnJheXMgVGhlIGFycmF5IG9mIGFycmF5cyBvZiB2YWx1ZXMgdG8gY29tYmluZS4gVGhlc2UgbXVzdCBiZSBzb3J0ZWRCeUZpcnN0LiBEYXRlcyBtdXN0IGJlIEp1bGlhbkRhdGVzLlxyXG4gKiBAcGFyYW0gIHtJbnRlZ2VyfSBbZmlyc3RDb2x1bW5UeXBlXSBFZy4gVmFyVHlwZS5USU1FLlxyXG4gKiBAcmV0dXJuIHtBcnJheVtdfSBUaGUgdmFsdWVzLCB3aXRoIGFueSByZXBlYXRzIGluIHRoZSBmaXJzdCBjb2x1bW4gY29tYmluZWQgaW50byBvbmUuIERhdGVzIGFyZSBjb252ZXJ0ZWQgdG8gSVNPODYwMSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXHJcbiAqXHJcbiAqIEVnLlxyXG4gKiB2YXIgeCA9IFtbJ2EnLCAnYicsICdiJywgJ2MnXSwgWzEsIDIsIHVuZGVmaW5lZCwgM10sIFs0LCB1bmRlZmluZWQsIDUsIHVuZGVmaW5lZF1dO1xyXG4gKiBjb21iaW5lUmVwZWF0ZWQoeCk7XHJcbiAqICMgeCBpcyBbWydhJywgJ2InLCAnYyddLCBbMSwgMiwgM10sIFs0LCA1LCB1bmRlZmluZWRdXS5cclxuICovXG5mdW5jdGlvbiBjb21iaW5lUmVwZWF0ZWQoc29ydGVkVmFsdWVBcnJheXMpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KHNvcnRlZFZhbHVlQXJyYXlzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gW3NvcnRlZFZhbHVlQXJyYXlzW2ldWzBdXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaiA9IDE7IGogPCBzb3J0ZWRWYWx1ZUFycmF5c1swXS5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoc29ydGVkVmFsdWVBcnJheXNbMF1bal0gPT09IHNvcnRlZFZhbHVlQXJyYXlzWzBdW2ogLSAxXSkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHJlc3VsdFswXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHJlc3VsdC5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0W19pXVtjdXJyZW50SW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W19pXVtjdXJyZW50SW5kZXhdID0gc29ydGVkVmFsdWVBcnJheXNbX2ldW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHJlc3VsdC5sZW5ndGg7IF9pMisrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W19pMl0ucHVzaChzb3J0ZWRWYWx1ZUFycmF5c1tfaTJdW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcclxuICogQ29udmVydCBhbiBhcnJheSBvZiBjb2x1bW4gdmFsdWVzLCB3aXRoIGNvbHVtbiBuYW1lcywgdG8gYW4gYXJyYXkgb2Ygcm93IHZhbHVlcy5cclxuICogQHBhcmFtICB7QXJyYXlbXX0gY29sdW1uVmFsdWVBcnJheXMgQXJyYXkgb2YgY29sdW1uIHZhbHVlcywgZWcuIFtbMSwyLDNdLCBbNCw1LDZdXS5cclxuICogQHBhcmFtICB7U3RyaW5nW119IGNvbHVtbk5hbWVzIEFycmF5IG9mIGNvbHVtbiBuYW1lcywgZWcgWyd4JywgJ3knXS5cclxuICogQHJldHVybiB7QXJyYXlbXX0gQXJyYXkgb2Ygcm93cywgc3RhcnRpbmcgd2l0aCB0aGUgY29sdW1uIG5hbWVzLCBlZy4gW1sneCcsICd5J10sIFsxLCA0XSwgWzIsIDVdLCBbMywgNl1dLlxyXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXlPZlJvd3MoY29sdW1uVmFsdWVBcnJheXMsIGNvbHVtbk5hbWVzKSB7XG4gICAgaWYgKGNvbHVtblZhbHVlQXJyYXlzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcm93cyA9IGNvbHVtblZhbHVlQXJyYXlzWzBdLm1hcChmdW5jdGlvbiAodmFsdWUwLCByb3dJbmRleCkge1xuICAgICAgICByZXR1cm4gY29sdW1uVmFsdWVBcnJheXMubWFwKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXNbcm93SW5kZXhdO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByb3dzLnVuc2hpZnQoY29sdW1uTmFtZXMpO1xuICAgIHJldHVybiByb3dzO1xufVxuXG5vbm1lc3NhZ2UgPSBmdW5jdGlvbiBvbm1lc3NhZ2UoZXZlbnQpIHtcbiAgICB2YXIgdmFsdWVBcnJheXMgPSBldmVudC5kYXRhLnZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbHVlc0FycmF5KSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXNBcnJheS5tYXAoZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHZhbHVlcyk7XG4gICAgICAgIH0pO1xuICAgIH0pOyAvLyBDb252ZXJ0IGZyb20gdHlwZWQgYXJyYXlzLlxuICAgIHZhciBuYW1lQXJyYXlzID0gZXZlbnQuZGF0YS5uYW1lcztcbiAgICB2YXIgY29tYmluZWRWYWx1ZXMgPSBjb21iaW5lVmFsdWVBcnJheXModmFsdWVBcnJheXMpO1xuICAgIHZhciByb3dzID0gdG9BcnJheU9mUm93cyhjb21iaW5lZFZhbHVlcywgbmFtZUFycmF5cyk7XG4gICAgdmFyIGpvaW5lZFJvd3MgPSByb3dzLm1hcChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHJldHVybiByb3cuam9pbignLCcpO1xuICAgIH0pO1xuICAgIHZhciBjc3ZTdHJpbmcgPSBqb2luZWRSb3dzLmpvaW4oJ1xcbicpO1xuICAgIHZhciBocmVmID0gX0RhdGFVcmkyLmRlZmF1bHQubWFrZSgnY3N2JywgY3N2U3RyaW5nKTtcbiAgICBwb3N0TWVzc2FnZShocmVmKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYj97XCJzb3VyY2VNYXBcIjpmYWxzZSxcInByZXNldHNcIjpbXCJlczIwMTVcIixcInJlYWN0XCJdLFwicGx1Z2luc1wiOltcImpzeC1jb250cm9sLXN0YXRlbWVudHNcIl19IS4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzL2xpYi9SZWFjdFZpZXdzL0N1c3RvbS9DaGFydC9kb3dubG9hZEhyZWZXb3JrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJ3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9kZWZpbmVkJyk7XG52YXIgRmVhdHVyZURldGVjdGlvbiA9IHJlcXVpcmUoJ3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9GZWF0dXJlRGV0ZWN0aW9uJyk7XG52YXIgVGVycmlhRXJyb3IgPSByZXF1aXJlKCcuLi9Db3JlL1RlcnJpYUVycm9yJyk7XG5cbi8vIFVuZm9ydHVuYXRlbHkgdGhlcmUncyBubyB3YXkgdG8gZmVhdHVyZS1kZXRlY3QgZm9yIHRoaXMsIGl0J3Mgc29tZXRoaW5nIHRoYXQgb25seSBNUyBicm93c2VycyBkaXNhbGxvdyBmb3Igc2VjdXJpdHkgcmVhc29ucy5cbnZhciBjYW5Vc2VEYXRhVXJpSW5IcmVmID0gIShGZWF0dXJlRGV0ZWN0aW9uLmlzSW50ZXJuZXRFeHBsb3JlcigpIHx8IC9FZGdlLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpKTtcblxudmFyIERhdGFVcmkgPSB7XG4gICAgLyoqXHJcbiAgICAgKiBUdXJuIGEgZmlsZSB3aXRoIHRoZSBzdXBwbGllZCB0eXBlIGFuZCBzdHJpbmdpZmllZCBkYXRhIGludG8gYSBkYXRhIHVyaSB0aGF0IGNhbiBiZSBzZXQgYXMgdGhlIGhyZWYgb2YgYW4gYW5jaG9yIHRhZy5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIERhdGEgdHlwZSwgZWcuICdqc29uJyBvciAnY3N2Jy5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhU3RyaW5nIFRoZSBkYXRhLlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBBIHN0cmluZyB0aGF0IGNhbiBiZSB1c2VkIHRvIGluIGFuIGFuY2hvciB0YWcncyAnaHJlZicgYXR0cmlidXRlIHRvIHJlcHJlc2VudCBkb3dubG9hZGFibGUgZGF0YS5cclxuICAgICAqL1xuICAgIG1ha2U6IGZ1bmN0aW9uIG1ha2UodHlwZSwgZGF0YVN0cmluZykge1xuICAgICAgICBpZiAoZGF0YVN0cmluZykge1xuICAgICAgICAgICAgLy8gVXNpbmcgYXR0YWNobWVudC8qIG1pbWUgdHlwZSBtYWtlcyBzYWZhcmkgZG93bmxvYWQgYXMgYXR0YWNobWVudC4gdGV4dC8qIHdvcmtzIG9uIENocm9tZSAoYXMgZG9lcyBhdHRhY2htZW50KS5cbiAgICAgICAgICAgIHJldHVybiAnZGF0YTphdHRhY2htZW50LycgKyB0eXBlICsgJywnICsgZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFTdHJpbmcpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGZsYWcgc3RhdGluZyBpZiBkYXRhIHVyaSBsaW5rcyBhcmUgc3VwcG9ydGVkIGJ5IHRoZSB1c2VyJ3MgYnJvd3Nlci5cclxuICAgICAqIElmIGVycm9yRXZlbnQgaXMgcHJvdmlkZWQsIHByZXNlbnRzIGFuIGVycm9yIG1lc3NhZ2UgZXhwbGFpbmluZyB3aHkgaXQgd29uJ3Qgd29yay5cclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IFtlcnJvckV2ZW50XSBBIENlc2l1bSBFdmVudCwgZWcuIHRlcnJpYS5lcnJvciwgdXNlZCB0byByYWlzZSBhbiBlcnJvciBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGRhdGEgZG93bmxvYWQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2hyZWZdIFRoZSBsaW5rIHRvIHByb3ZpZGUgaW4gdGhlIGVycm9yIG1lc3NhZ2UuIFJlcXVpcmVkIGlmIGVycm9yRXZlbnQgaXMgcHJvdmlkZWQuXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmb3JjZUVycm9yXSBJZiB0cnVlLCBhbHdheXMgc2hvdyB0aGUgZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG8gZmFsc2UsIHdoaWNoIG9ubHkgc2hvd3MgaXQgaWYgdGhlIGJyb3dzZXIgY2Fubm90IGRvd25sb2FkIHVyaSBsaW5rcy5cclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgd2hldGhlciB0aGUgYnJvd3NlciBpcyBjb21wYXRpYmxlIHdpdGggZGF0YSB1cmlzLlxyXG4gICAgICovXG4gICAgY2hlY2tDb21wYXRpYmlsaXR5OiBmdW5jdGlvbiBjaGVja0NvbXBhdGliaWxpdHkoZXJyb3JFdmVudCwgaHJlZiwgZm9yY2VFcnJvcikge1xuICAgICAgICBpZiAoIWNhblVzZURhdGFVcmlJbkhyZWYgfHwgZm9yY2VFcnJvcikge1xuICAgICAgICAgICAgaWYgKGRlZmluZWQoZXJyb3JFdmVudCkpIHtcbiAgICAgICAgICAgICAgICBlcnJvckV2ZW50LnJhaXNlRXZlbnQobmV3IFRlcnJpYUVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdCcm93c2VyIERvZXMgTm90IFN1cHBvcnQgRGF0YSBEb3dubG9hZCcsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdVbmZvcnR1bmF0ZWx5IE1pY3Jvc29mdCBicm93c2VycyAoaW5jbHVkaW5nIGFsbCB2ZXJzaW9ucyBvZiBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSkgZG8gbm90ICcgKyAnc3VwcG9ydCB0aGUgZGF0YSB1cmkgZnVuY3Rpb25hbGl0eSBuZWVkZWQgdG8gZG93bmxvYWQgZGF0YSBhcyBhIGZpbGUuIFRvIGRvd25sb2FkLCBjb3B5IHRoZSBmb2xsb3dpbmcgdXJpICcgKyAnaW50byBhbm90aGVyIGJyb3dzZXIgc3VjaCBhcyBDaHJvbWUsIEZpcmVmb3ggb3IgU2FmYXJpOiAnICsgaHJlZlxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVXJpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzL2xpYi9Db3JlL0RhdGFVcmkuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypnbG9iYWwgZGVmaW5lKi9cclxuZGVmaW5lKFtcclxuICAgICAgICAnLi9kZWZhdWx0VmFsdWUnLFxyXG4gICAgICAgICcuL2RlZmluZWQnLFxyXG4gICAgICAgICcuL0Z1bGxzY3JlZW4nXHJcbiAgICBdLCBmdW5jdGlvbihcclxuICAgICAgICBkZWZhdWx0VmFsdWUsXHJcbiAgICAgICAgZGVmaW5lZCxcclxuICAgICAgICBGdWxsc2NyZWVuKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgdmFyIHRoZU5hdmlnYXRvcjtcclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHRoZU5hdmlnYXRvciA9IG5hdmlnYXRvcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhlTmF2aWdhdG9yID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXh0cmFjdFZlcnNpb24odmVyc2lvblN0cmluZykge1xyXG4gICAgICAgIHZhciBwYXJ0cyA9IHZlcnNpb25TdHJpbmcuc3BsaXQoJy4nKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgcGFydHNbaV0gPSBwYXJzZUludChwYXJ0c1tpXSwgMTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlzQ2hyb21lUmVzdWx0O1xyXG4gICAgdmFyIGNocm9tZVZlcnNpb25SZXN1bHQ7XHJcbiAgICBmdW5jdGlvbiBpc0Nocm9tZSgpIHtcclxuICAgICAgICBpZiAoIWRlZmluZWQoaXNDaHJvbWVSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlzQ2hyb21lUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIEVkZ2UgY29udGFpbnMgQ2hyb21lIGluIHRoZSB1c2VyIGFnZW50IHRvb1xyXG4gICAgICAgICAgICBpZiAoIWlzRWRnZSgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRzID0gKC8gQ2hyb21lXFwvKFtcXC4wLTldKykvKS5leGVjKHRoZU5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2hyb21lUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjaHJvbWVWZXJzaW9uUmVzdWx0ID0gZXh0cmFjdFZlcnNpb24oZmllbGRzWzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlzQ2hyb21lUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNocm9tZVZlcnNpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzQ2hyb21lKCkgJiYgY2hyb21lVmVyc2lvblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNTYWZhcmlSZXN1bHQ7XHJcbiAgICB2YXIgc2FmYXJpVmVyc2lvblJlc3VsdDtcclxuICAgIGZ1bmN0aW9uIGlzU2FmYXJpKCkge1xyXG4gICAgICAgIGlmICghZGVmaW5lZChpc1NhZmFyaVJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaXNTYWZhcmlSZXN1bHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIENocm9tZSBhbmQgRWRnZSBjb250YWluIFNhZmFyaSBpbiB0aGUgdXNlciBhZ2VudCB0b29cclxuICAgICAgICAgICAgaWYgKCFpc0Nocm9tZSgpICYmICFpc0VkZ2UoKSAmJiAoLyBTYWZhcmlcXC9bXFwuMC05XSsvKS50ZXN0KHRoZU5hdmlnYXRvci51c2VyQWdlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRzID0gKC8gVmVyc2lvblxcLyhbXFwuMC05XSspLykuZXhlYyh0aGVOYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChmaWVsZHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc1NhZmFyaVJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FmYXJpVmVyc2lvblJlc3VsdCA9IGV4dHJhY3RWZXJzaW9uKGZpZWxkc1sxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpc1NhZmFyaVJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzYWZhcmlWZXJzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiBpc1NhZmFyaSgpICYmIHNhZmFyaVZlcnNpb25SZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlzV2Via2l0UmVzdWx0O1xyXG4gICAgdmFyIHdlYmtpdFZlcnNpb25SZXN1bHQ7XHJcbiAgICBmdW5jdGlvbiBpc1dlYmtpdCgpIHtcclxuICAgICAgICBpZiAoIWRlZmluZWQoaXNXZWJraXRSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlzV2Via2l0UmVzdWx0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmllbGRzID0gKC8gQXBwbGVXZWJLaXRcXC8oW1xcLjAtOV0rKShcXCs/KS8pLmV4ZWModGhlTmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlzV2Via2l0UmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdlYmtpdFZlcnNpb25SZXN1bHQgPSBleHRyYWN0VmVyc2lvbihmaWVsZHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgd2Via2l0VmVyc2lvblJlc3VsdC5pc05pZ2h0bHkgPSAhIWZpZWxkc1syXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlzV2Via2l0UmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdlYmtpdFZlcnNpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzV2Via2l0KCkgJiYgd2Via2l0VmVyc2lvblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNJbnRlcm5ldEV4cGxvcmVyUmVzdWx0O1xyXG4gICAgdmFyIGludGVybmV0RXhwbG9yZXJWZXJzaW9uUmVzdWx0O1xyXG4gICAgZnVuY3Rpb24gaXNJbnRlcm5ldEV4cGxvcmVyKCkge1xyXG4gICAgICAgIGlmICghZGVmaW5lZChpc0ludGVybmV0RXhwbG9yZXJSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlzSW50ZXJuZXRFeHBsb3JlclJlc3VsdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpZWxkcztcclxuICAgICAgICAgICAgaWYgKHRoZU5hdmlnYXRvci5hcHBOYW1lID09PSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJykge1xyXG4gICAgICAgICAgICAgICAgZmllbGRzID0gL01TSUUgKFswLTldezEsfVtcXC4wLTldezAsfSkvLmV4ZWModGhlTmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNJbnRlcm5ldEV4cGxvcmVyUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpbnRlcm5ldEV4cGxvcmVyVmVyc2lvblJlc3VsdCA9IGV4dHJhY3RWZXJzaW9uKGZpZWxkc1sxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhlTmF2aWdhdG9yLmFwcE5hbWUgPT09ICdOZXRzY2FwZScpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkcyA9IC9UcmlkZW50XFwvLipydjooWzAtOV17MSx9W1xcLjAtOV17MCx9KS8uZXhlYyh0aGVOYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChmaWVsZHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0ludGVybmV0RXhwbG9yZXJSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVybmV0RXhwbG9yZXJWZXJzaW9uUmVzdWx0ID0gZXh0cmFjdFZlcnNpb24oZmllbGRzWzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNJbnRlcm5ldEV4cGxvcmVyUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGludGVybmV0RXhwbG9yZXJWZXJzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiBpc0ludGVybmV0RXhwbG9yZXIoKSAmJiBpbnRlcm5ldEV4cGxvcmVyVmVyc2lvblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNFZGdlUmVzdWx0O1xyXG4gICAgdmFyIGVkZ2VWZXJzaW9uUmVzdWx0O1xyXG4gICAgZnVuY3Rpb24gaXNFZGdlKCkge1xyXG4gICAgICAgIGlmICghZGVmaW5lZChpc0VkZ2VSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlzRWRnZVJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgZmllbGRzID0gKC8gRWRnZVxcLyhbXFwuMC05XSspLykuZXhlYyh0aGVOYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICAgICAgaWYgKGZpZWxkcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaXNFZGdlUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVkZ2VWZXJzaW9uUmVzdWx0ID0gZXh0cmFjdFZlcnNpb24oZmllbGRzWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNFZGdlUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVkZ2VWZXJzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiBpc0VkZ2UoKSAmJiBlZGdlVmVyc2lvblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNGaXJlZm94UmVzdWx0O1xyXG4gICAgdmFyIGZpcmVmb3hWZXJzaW9uUmVzdWx0O1xyXG4gICAgZnVuY3Rpb24gaXNGaXJlZm94KCkge1xyXG4gICAgICAgIGlmICghZGVmaW5lZChpc0ZpcmVmb3hSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlzRmlyZWZveFJlc3VsdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpZWxkcyA9IC9GaXJlZm94XFwvKFtcXC4wLTldKykvLmV4ZWModGhlTmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlzRmlyZWZveFJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmaXJlZm94VmVyc2lvblJlc3VsdCA9IGV4dHJhY3RWZXJzaW9uKGZpZWxkc1sxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRmlyZWZveFJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNXaW5kb3dzUmVzdWx0O1xyXG4gICAgZnVuY3Rpb24gaXNXaW5kb3dzKCkge1xyXG4gICAgICAgIGlmICghZGVmaW5lZChpc1dpbmRvd3NSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlzV2luZG93c1Jlc3VsdCA9IC9XaW5kb3dzL2kudGVzdCh0aGVOYXZpZ2F0b3IuYXBwVmVyc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc1dpbmRvd3NSZXN1bHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGZpcmVmb3hWZXJzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiBpc0ZpcmVmb3goKSAmJiBmaXJlZm94VmVyc2lvblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaGFzUG9pbnRlckV2ZW50cztcclxuICAgIGZ1bmN0aW9uIHN1cHBvcnRzUG9pbnRlckV2ZW50cygpIHtcclxuICAgICAgICBpZiAoIWRlZmluZWQoaGFzUG9pbnRlckV2ZW50cykpIHtcclxuICAgICAgICAgICAgLy9XaGlsZSBuYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgaXMgZGVwcmVjYXRlZCBpbiB0aGUgVzNDIHNwZWNpZmljYXRpb25cclxuICAgICAgICAgICAgLy93ZSBzdGlsbCBuZWVkIHRvIHVzZSBpdCBpZiBpdCBleGlzdHMgaW4gb3JkZXIgdG8gc3VwcG9ydCBicm93c2Vyc1xyXG4gICAgICAgICAgICAvL3RoYXQgcmVseSBvbiBpdCwgc3VjaCBhcyB0aGUgV2luZG93cyBXZWJCcm93c2VyIGNvbnRyb2wgd2hpY2ggZGVmaW5lc1xyXG4gICAgICAgICAgICAvL1BvaW50ZXJFdmVudCBidXQgc2V0cyBuYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgdG8gZmFsc2UuXHJcbiAgICAgICAgICAgIGhhc1BvaW50ZXJFdmVudHMgPSB0eXBlb2YgUG9pbnRlckV2ZW50ICE9PSAndW5kZWZpbmVkJyAmJiAoIWRlZmluZWQodGhlTmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkKSB8fCB0aGVOYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFzUG9pbnRlckV2ZW50cztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaW1hZ2VSZW5kZXJpbmdWYWx1ZVJlc3VsdDtcclxuICAgIHZhciBzdXBwb3J0c0ltYWdlUmVuZGVyaW5nUGl4ZWxhdGVkUmVzdWx0O1xyXG4gICAgZnVuY3Rpb24gc3VwcG9ydHNJbWFnZVJlbmRlcmluZ1BpeGVsYXRlZCgpIHtcclxuICAgICAgICBpZiAoIWRlZmluZWQoc3VwcG9ydHNJbWFnZVJlbmRlcmluZ1BpeGVsYXRlZFJlc3VsdCkpIHtcclxuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdzdHlsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlLXJlbmRlcmluZzogLW1vei1jcmlzcC1lZGdlczsnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2UtcmVuZGVyaW5nOiBwaXhlbGF0ZWQ7Jyk7XHJcbiAgICAgICAgICAgIC8vY2FudmFzLnN0eWxlLmltYWdlUmVuZGVyaW5nIHdpbGwgYmUgdW5kZWZpbmVkLCBudWxsIG9yIGFuIGVtcHR5IHN0cmluZyBvbiB1bnN1cHBvcnRlZCBicm93c2Vycy5cclxuICAgICAgICAgICAgdmFyIHRtcCA9IGNhbnZhcy5zdHlsZS5pbWFnZVJlbmRlcmluZztcclxuICAgICAgICAgICAgc3VwcG9ydHNJbWFnZVJlbmRlcmluZ1BpeGVsYXRlZFJlc3VsdCA9IGRlZmluZWQodG1wKSAmJiB0bXAgIT09ICcnO1xyXG4gICAgICAgICAgICBpZiAoc3VwcG9ydHNJbWFnZVJlbmRlcmluZ1BpeGVsYXRlZFJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VSZW5kZXJpbmdWYWx1ZVJlc3VsdCA9IHRtcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VwcG9ydHNJbWFnZVJlbmRlcmluZ1BpeGVsYXRlZFJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbWFnZVJlbmRlcmluZ1ZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0c0ltYWdlUmVuZGVyaW5nUGl4ZWxhdGVkKCkgPyBpbWFnZVJlbmRlcmluZ1ZhbHVlUmVzdWx0IDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBzZXQgb2YgZnVuY3Rpb25zIHRvIGRldGVjdCB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHNcclxuICAgICAqIHZhcmlvdXMgZmVhdHVyZXMuXHJcbiAgICAgKlxyXG4gICAgICogQGV4cG9ydHMgRmVhdHVyZURldGVjdGlvblxyXG4gICAgICovXHJcbiAgICB2YXIgRmVhdHVyZURldGVjdGlvbiA9IHtcclxuICAgICAgICBpc0Nocm9tZSA6IGlzQ2hyb21lLFxyXG4gICAgICAgIGNocm9tZVZlcnNpb24gOiBjaHJvbWVWZXJzaW9uLFxyXG4gICAgICAgIGlzU2FmYXJpIDogaXNTYWZhcmksXHJcbiAgICAgICAgc2FmYXJpVmVyc2lvbiA6IHNhZmFyaVZlcnNpb24sXHJcbiAgICAgICAgaXNXZWJraXQgOiBpc1dlYmtpdCxcclxuICAgICAgICB3ZWJraXRWZXJzaW9uIDogd2Via2l0VmVyc2lvbixcclxuICAgICAgICBpc0ludGVybmV0RXhwbG9yZXIgOiBpc0ludGVybmV0RXhwbG9yZXIsXHJcbiAgICAgICAgaW50ZXJuZXRFeHBsb3JlclZlcnNpb24gOiBpbnRlcm5ldEV4cGxvcmVyVmVyc2lvbixcclxuICAgICAgICBpc0VkZ2UgOiBpc0VkZ2UsXHJcbiAgICAgICAgZWRnZVZlcnNpb24gOiBlZGdlVmVyc2lvbixcclxuICAgICAgICBpc0ZpcmVmb3ggOiBpc0ZpcmVmb3gsXHJcbiAgICAgICAgZmlyZWZveFZlcnNpb24gOiBmaXJlZm94VmVyc2lvbixcclxuICAgICAgICBpc1dpbmRvd3MgOiBpc1dpbmRvd3MsXHJcbiAgICAgICAgaGFyZHdhcmVDb25jdXJyZW5jeSA6IGRlZmF1bHRWYWx1ZSh0aGVOYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSwgMyksXHJcbiAgICAgICAgc3VwcG9ydHNQb2ludGVyRXZlbnRzIDogc3VwcG9ydHNQb2ludGVyRXZlbnRzLFxyXG4gICAgICAgIHN1cHBvcnRzSW1hZ2VSZW5kZXJpbmdQaXhlbGF0ZWQ6IHN1cHBvcnRzSW1hZ2VSZW5kZXJpbmdQaXhlbGF0ZWQsXHJcbiAgICAgICAgaW1hZ2VSZW5kZXJpbmdWYWx1ZTogaW1hZ2VSZW5kZXJpbmdWYWx1ZVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVjdHMgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHRoZSBmdWxsIHNjcmVlbiBzdGFuZGFyZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgZnVsbCBzY3JlZW4gc3RhbmRhcmQsIGZhbHNlIGlmIG5vdC5cclxuICAgICAqXHJcbiAgICAgKiBAc2VlIEZ1bGxzY3JlZW5cclxuICAgICAqIEBzZWUge0BsaW5rIGh0dHA6Ly9kdmNzLnczLm9yZy9oZy9mdWxsc2NyZWVuL3Jhdy1maWxlL3RpcC9PdmVydmlldy5odG1sfFczQyBGdWxsc2NyZWVuIExpdmluZyBTcGVjaWZpY2F0aW9ufVxyXG4gICAgICovXHJcbiAgICBGZWF0dXJlRGV0ZWN0aW9uLnN1cHBvcnRzRnVsbHNjcmVlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBGdWxsc2NyZWVuLnN1cHBvcnRzRnVsbHNjcmVlbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVjdHMgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMsIGZhbHNlIGlmIG5vdC5cclxuICAgICAqXHJcbiAgICAgKiBAc2VlIHtAbGluayBodHRwOi8vd3d3Lmtocm9ub3Mub3JnL3JlZ2lzdHJ5L3R5cGVkYXJyYXkvc3BlY3MvbGF0ZXN0L3xUeXBlZCBBcnJheSBTcGVjaWZpY2F0aW9ufVxyXG4gICAgICovXHJcbiAgICBGZWF0dXJlRGV0ZWN0aW9uLnN1cHBvcnRzVHlwZWRBcnJheXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlY3RzIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBXZWIgV29ya2Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGUgYnJvd3NlcnMgc3VwcG9ydHMgV2ViIFdvcmtlcnMsIGZhbHNlIGlmIG5vdC5cclxuICAgICAqXHJcbiAgICAgKiBAc2VlIHtAbGluayBodHRwOi8vd3d3LnczLm9yZy9UUi93b3JrZXJzL31cclxuICAgICAqL1xyXG4gICAgRmVhdHVyZURldGVjdGlvbi5zdXBwb3J0c1dlYldvcmtlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIFdvcmtlciAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBGZWF0dXJlRGV0ZWN0aW9uO1xyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL0ZlYXR1cmVEZXRlY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypnbG9iYWwgZGVmaW5lKi9cclxuZGVmaW5lKFtcclxuICAgICAgICAnLi9kZWZpbmVkJ1xyXG4gICAgXSwgZnVuY3Rpb24oXHJcbiAgICAgICAgZGVmaW5lZCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnJlZXplcyBhbiBvYmplY3QsIHVzaW5nIE9iamVjdC5mcmVlemUgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgcmV0dXJuc1xyXG4gICAgICogdGhlIG9iamVjdCB1bmNoYW5nZWQuICBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSB1c2VkIGluIHNldHVwIGNvZGUgdG8gcHJldmVudFxyXG4gICAgICogZXJyb3JzIGZyb20gY29tcGxldGVseSBoYWx0aW5nIEphdmFTY3JpcHQgZXhlY3V0aW9uIGluIGxlZ2FjeSBicm93c2Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICpcclxuICAgICAqIEBleHBvcnRzIGZyZWV6ZU9iamVjdFxyXG4gICAgICovXHJcbiAgICB2YXIgZnJlZXplT2JqZWN0ID0gT2JqZWN0LmZyZWV6ZTtcclxuICAgIGlmICghZGVmaW5lZChmcmVlemVPYmplY3QpKSB7XHJcbiAgICAgICAgZnJlZXplT2JqZWN0ID0gZnVuY3Rpb24obykge1xyXG4gICAgICAgICAgICByZXR1cm4gbztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmcmVlemVPYmplY3Q7XHJcbn0pO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZnJlZXplT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZ2xvYmFsIGRlZmluZSovXHJcbmRlZmluZShbXHJcbiAgICAgICAgJy4vZGVmaW5lZCcsXHJcbiAgICAgICAgJy4vZGVmaW5lUHJvcGVydGllcydcclxuICAgIF0sIGZ1bmN0aW9uKFxyXG4gICAgICAgIGRlZmluZWQsXHJcbiAgICAgICAgZGVmaW5lUHJvcGVydGllcykge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBfc3VwcG9ydHNGdWxsc2NyZWVuO1xyXG4gICAgdmFyIF9uYW1lcyA9IHtcclxuICAgICAgICByZXF1ZXN0RnVsbHNjcmVlbiA6IHVuZGVmaW5lZCxcclxuICAgICAgICBleGl0RnVsbHNjcmVlbiA6IHVuZGVmaW5lZCxcclxuICAgICAgICBmdWxsc2NyZWVuRW5hYmxlZCA6IHVuZGVmaW5lZCxcclxuICAgICAgICBmdWxsc2NyZWVuRWxlbWVudCA6IHVuZGVmaW5lZCxcclxuICAgICAgICBmdWxsc2NyZWVuY2hhbmdlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIGZ1bGxzY3JlZW5lcnJvciA6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXItaW5kZXBlbmRlbnQgZnVuY3Rpb25zIGZvciB3b3JraW5nIHdpdGggdGhlIHN0YW5kYXJkIGZ1bGxzY3JlZW4gQVBJLlxyXG4gICAgICpcclxuICAgICAqIEBleHBvcnRzIEZ1bGxzY3JlZW5cclxuICAgICAqXHJcbiAgICAgKiBAc2VlIHtAbGluayBodHRwOi8vZHZjcy53My5vcmcvaGcvZnVsbHNjcmVlbi9yYXctZmlsZS90aXAvT3ZlcnZpZXcuaHRtbHxXM0MgRnVsbHNjcmVlbiBMaXZpbmcgU3BlY2lmaWNhdGlvbn1cclxuICAgICAqL1xyXG4gICAgdmFyIEZ1bGxzY3JlZW4gPSB7fTtcclxuXHJcbiAgICBkZWZpbmVQcm9wZXJ0aWVzKEZ1bGxzY3JlZW4sIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgZWxlbWVudCB0aGF0IGlzIGN1cnJlbnRseSBmdWxsc2NyZWVuLCBpZiBhbnkuICBUbyBzaW1wbHkgY2hlY2sgaWYgdGhlXHJcbiAgICAgICAgICogYnJvd3NlciBpcyBpbiBmdWxsc2NyZWVuIG1vZGUgb3Igbm90LCB1c2Uge0BsaW5rIEZ1bGxzY3JlZW4jZnVsbHNjcmVlbn0uXHJcbiAgICAgICAgICogQG1lbWJlcm9mIEZ1bGxzY3JlZW5cclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqIEByZWFkb25seVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVsZW1lbnQgOiB7XHJcbiAgICAgICAgICAgIGdldCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFGdWxsc2NyZWVuLnN1cHBvcnRzRnVsbHNjcmVlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRbX25hbWVzLmZ1bGxzY3JlZW5FbGVtZW50XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBuYW1lIG9mIHRoZSBldmVudCBvbiB0aGUgZG9jdW1lbnQgdGhhdCBpcyBmaXJlZCB3aGVuIGZ1bGxzY3JlZW4gaXNcclxuICAgICAgICAgKiBlbnRlcmVkIG9yIGV4aXRlZC4gIFRoaXMgZXZlbnQgbmFtZSBpcyBpbnRlbmRlZCBmb3IgdXNlIHdpdGggYWRkRXZlbnRMaXN0ZW5lci5cclxuICAgICAgICAgKiBJbiB5b3VyIGV2ZW50IGhhbmRsZXIsIHRvIGRldGVybWluZSBpZiB0aGUgYnJvd3NlciBpcyBpbiBmdWxsc2NyZWVuIG1vZGUgb3Igbm90LFxyXG4gICAgICAgICAqIHVzZSB7QGxpbmsgRnVsbHNjcmVlbiNmdWxsc2NyZWVufS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgRnVsbHNjcmVlblxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICogQHJlYWRvbmx5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2hhbmdlRXZlbnROYW1lIDoge1xyXG4gICAgICAgICAgICBnZXQgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICghRnVsbHNjcmVlbi5zdXBwb3J0c0Z1bGxzY3JlZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9uYW1lcy5mdWxsc2NyZWVuY2hhbmdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRoYXQgaXMgZmlyZWQgd2hlbiBhIGZ1bGxzY3JlZW4gZXJyb3JcclxuICAgICAgICAgKiBvY2N1cnMuICBUaGlzIGV2ZW50IG5hbWUgaXMgaW50ZW5kZWQgZm9yIHVzZSB3aXRoIGFkZEV2ZW50TGlzdGVuZXIuXHJcbiAgICAgICAgICogQG1lbWJlcm9mIEZ1bGxzY3JlZW5cclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqIEByZWFkb25seVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVycm9yRXZlbnROYW1lIDoge1xyXG4gICAgICAgICAgICBnZXQgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICghRnVsbHNjcmVlbi5zdXBwb3J0c0Z1bGxzY3JlZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9uYW1lcy5mdWxsc2NyZWVuZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgYnJvd3NlciB3aWxsIGFsbG93IGFuIGVsZW1lbnQgdG8gYmUgbWFkZSBmdWxsc2NyZWVuLCBvciBub3QuXHJcbiAgICAgICAgICogRm9yIGV4YW1wbGUsIGJ5IGRlZmF1bHQsIGlmcmFtZXMgY2Fubm90IGdvIGZ1bGxzY3JlZW4gdW5sZXNzIHRoZSBjb250YWluaW5nIHBhZ2VcclxuICAgICAgICAgKiBhZGRzIGFuIFwiYWxsb3dmdWxsc2NyZWVuXCIgYXR0cmlidXRlIChvciBwcmVmaXhlZCBlcXVpdmFsZW50KS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgRnVsbHNjcmVlblxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqIEByZWFkb25seVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVuYWJsZWQgOiB7XHJcbiAgICAgICAgICAgIGdldCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFGdWxsc2NyZWVuLnN1cHBvcnRzRnVsbHNjcmVlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRbX25hbWVzLmZ1bGxzY3JlZW5FbmFibGVkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERldGVybWluZXMgaWYgdGhlIGJyb3dzZXIgaXMgY3VycmVudGx5IGluIGZ1bGxzY3JlZW4gbW9kZS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgRnVsbHNjcmVlblxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqIEByZWFkb25seVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bGxzY3JlZW4gOiB7XHJcbiAgICAgICAgICAgIGdldCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFGdWxsc2NyZWVuLnN1cHBvcnRzRnVsbHNjcmVlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRnVsbHNjcmVlbi5lbGVtZW50ICE9PSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlY3RzIHdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIHN0YW5kYXJkIGZ1bGxzY3JlZW4gQVBJLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgc3RhbmRhcmQgZnVsbHNjcmVlbiBBUEksXHJcbiAgICAgKiA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxyXG4gICAgICovXHJcbiAgICBGdWxsc2NyZWVuLnN1cHBvcnRzRnVsbHNjcmVlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChkZWZpbmVkKF9zdXBwb3J0c0Z1bGxzY3JlZW4pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfc3VwcG9ydHNGdWxsc2NyZWVuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3N1cHBvcnRzRnVsbHNjcmVlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5LnJlcXVlc3RGdWxsc2NyZWVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIC8vIGdvIHdpdGggdGhlIHVucHJlZml4ZWQsIHN0YW5kYXJkIHNldCBvZiBuYW1lc1xyXG4gICAgICAgICAgICBfbmFtZXMucmVxdWVzdEZ1bGxzY3JlZW4gPSAncmVxdWVzdEZ1bGxzY3JlZW4nO1xyXG4gICAgICAgICAgICBfbmFtZXMuZXhpdEZ1bGxzY3JlZW4gPSAnZXhpdEZ1bGxzY3JlZW4nO1xyXG4gICAgICAgICAgICBfbmFtZXMuZnVsbHNjcmVlbkVuYWJsZWQgPSAnZnVsbHNjcmVlbkVuYWJsZWQnO1xyXG4gICAgICAgICAgICBfbmFtZXMuZnVsbHNjcmVlbkVsZW1lbnQgPSAnZnVsbHNjcmVlbkVsZW1lbnQnO1xyXG4gICAgICAgICAgICBfbmFtZXMuZnVsbHNjcmVlbmNoYW5nZSA9ICdmdWxsc2NyZWVuY2hhbmdlJztcclxuICAgICAgICAgICAgX25hbWVzLmZ1bGxzY3JlZW5lcnJvciA9ICdmdWxsc2NyZWVuZXJyb3InO1xyXG4gICAgICAgICAgICBfc3VwcG9ydHNGdWxsc2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIF9zdXBwb3J0c0Z1bGxzY3JlZW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NoZWNrIGZvciB0aGUgY29ycmVjdCBjb21iaW5hdGlvbiBvZiBwcmVmaXggcGx1cyB0aGUgdmFyaW91cyBuYW1lcyB0aGF0IGJyb3dzZXJzIHVzZVxyXG4gICAgICAgIHZhciBwcmVmaXhlcyA9IFsnd2Via2l0JywgJ21veicsICdvJywgJ21zJywgJ2todG1sJ107XHJcbiAgICAgICAgdmFyIG5hbWU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHByZWZpeGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSBwcmVmaXhlc1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNhc2luZyBvZiBGdWxsc2NyZWVuIGRpZmZlcnMgYWNyb3NzIGJyb3dzZXJzXHJcbiAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnUmVxdWVzdEZ1bGxzY3JlZW4nO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGJvZHlbbmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIF9uYW1lcy5yZXF1ZXN0RnVsbHNjcmVlbiA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgICBfc3VwcG9ydHNGdWxsc2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnUmVxdWVzdEZ1bGxTY3JlZW4nO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBib2R5W25hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX25hbWVzLnJlcXVlc3RGdWxsc2NyZWVuID0gbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBfc3VwcG9ydHNGdWxsc2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZGlzYWdyZWVtZW50IGFib3V0IHdoZXRoZXIgaXQncyBcImV4aXRcIiBhcyBwZXIgc3BlYywgb3IgXCJjYW5jZWxcIlxyXG4gICAgICAgICAgICBuYW1lID0gcHJlZml4ICsgJ0V4aXRGdWxsc2NyZWVuJztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudFtuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgX25hbWVzLmV4aXRGdWxsc2NyZWVuID0gbmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnQ2FuY2VsRnVsbFNjcmVlbic7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50W25hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX25hbWVzLmV4aXRGdWxsc2NyZWVuID0gbmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY2FzaW5nIG9mIEZ1bGxzY3JlZW4gZGlmZmVycyBhY3Jvc3MgYnJvd3NlcnNcclxuICAgICAgICAgICAgbmFtZSA9IHByZWZpeCArICdGdWxsc2NyZWVuRW5hYmxlZCc7XHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudFtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBfbmFtZXMuZnVsbHNjcmVlbkVuYWJsZWQgPSBuYW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHByZWZpeCArICdGdWxsU2NyZWVuRW5hYmxlZCc7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnRbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9uYW1lcy5mdWxsc2NyZWVuRW5hYmxlZCA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNhc2luZyBvZiBGdWxsc2NyZWVuIGRpZmZlcnMgYWNyb3NzIGJyb3dzZXJzXHJcbiAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnRnVsbHNjcmVlbkVsZW1lbnQnO1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnRbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgX25hbWVzLmZ1bGxzY3JlZW5FbGVtZW50ID0gbmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnRnVsbFNjcmVlbkVsZW1lbnQnO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50W25hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfbmFtZXMuZnVsbHNjcmVlbkVsZW1lbnQgPSBuYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB0aGFua2Z1bGx5LCBldmVudCBuYW1lcyBhcmUgYWxsIGxvd2VyY2FzZSBwZXIgc3BlY1xyXG4gICAgICAgICAgICBuYW1lID0gcHJlZml4ICsgJ2Z1bGxzY3JlZW5jaGFuZ2UnO1xyXG4gICAgICAgICAgICAvLyBldmVudCBuYW1lcyBkbyBub3QgaGF2ZSAnb24nIGluIHRoZSBmcm9udCwgYnV0IHRoZSBwcm9wZXJ0eSBvbiB0aGUgZG9jdW1lbnQgZG9lc1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnRbJ29uJyArIG5hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vZXhjZXB0IG9uIElFXHJcbiAgICAgICAgICAgICAgICBpZiAocHJlZml4ID09PSAnbXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICdNU0Z1bGxzY3JlZW5DaGFuZ2UnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX25hbWVzLmZ1bGxzY3JlZW5jaGFuZ2UgPSBuYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuYW1lID0gcHJlZml4ICsgJ2Z1bGxzY3JlZW5lcnJvcic7XHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudFsnb24nICsgbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy9leGNlcHQgb24gSUVcclxuICAgICAgICAgICAgICAgIGlmIChwcmVmaXggPT09ICdtcycpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gJ01TRnVsbHNjcmVlbkVycm9yJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9uYW1lcy5mdWxsc2NyZWVuZXJyb3IgPSBuYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX3N1cHBvcnRzRnVsbHNjcmVlbjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBc3luY2hyb25vdXNseSByZXF1ZXN0cyB0aGUgYnJvd3NlciB0byBlbnRlciBmdWxsc2NyZWVuIG1vZGUgb24gdGhlIGdpdmVuIGVsZW1lbnQuXHJcbiAgICAgKiBJZiBmdWxsc2NyZWVuIG1vZGUgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3NlciwgZG9lcyBub3RoaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IFRoZSBIVE1MIGVsZW1lbnQgd2hpY2ggd2lsbCBiZSBwbGFjZWQgaW50byBmdWxsc2NyZWVuIG1vZGUuXHJcbiAgICAgKiBAcGFyYW0ge0hNRFZSRGV2aWNlfSBbdnJEZXZpY2VdIFRoZSBWUiBkZXZpY2UuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIFB1dCB0aGUgZW50aXJlIHBhZ2UgaW50byBmdWxsc2NyZWVuLlxyXG4gICAgICogQ2VzaXVtLkZ1bGxzY3JlZW4ucmVxdWVzdEZ1bGxzY3JlZW4oZG9jdW1lbnQuYm9keSlcclxuICAgICAqXHJcbiAgICAgKiAvLyBQbGFjZSBvbmx5IHRoZSBDZXNpdW0gY2FudmFzIGludG8gZnVsbHNjcmVlbi5cclxuICAgICAqIENlc2l1bS5GdWxsc2NyZWVuLnJlcXVlc3RGdWxsc2NyZWVuKHNjZW5lLmNhbnZhcylcclxuICAgICAqL1xyXG4gICAgRnVsbHNjcmVlbi5yZXF1ZXN0RnVsbHNjcmVlbiA9IGZ1bmN0aW9uKGVsZW1lbnQsIHZyRGV2aWNlKSB7XHJcbiAgICAgICAgaWYgKCFGdWxsc2NyZWVuLnN1cHBvcnRzRnVsbHNjcmVlbigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnRbX25hbWVzLnJlcXVlc3RGdWxsc2NyZWVuXSh7IHZyRGlzcGxheTogdnJEZXZpY2UgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXN5bmNocm9ub3VzbHkgZXhpdHMgZnVsbHNjcmVlbiBtb2RlLiAgSWYgdGhlIGJyb3dzZXIgaXMgbm90IGN1cnJlbnRseVxyXG4gICAgICogaW4gZnVsbHNjcmVlbiwgb3IgaWYgZnVsbHNjcmVlbiBtb2RlIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXIsIGRvZXMgbm90aGluZy5cclxuICAgICAqL1xyXG4gICAgRnVsbHNjcmVlbi5leGl0RnVsbHNjcmVlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghRnVsbHNjcmVlbi5zdXBwb3J0c0Z1bGxzY3JlZW4oKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2N1bWVudFtfbmFtZXMuZXhpdEZ1bGxzY3JlZW5dKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBGdWxsc2NyZWVuO1xyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL0Z1bGxzY3JlZW4uanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypnbG9iYWwgZGVmaW5lKi9cclxuZGVmaW5lKFtcclxuICAgICAgICAnLi9kZWZpbmVkJ1xyXG4gICAgXSwgZnVuY3Rpb24oXHJcbiAgICAgICAgZGVmaW5lZCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBkZWZpbmVQcm9wZXJ0eVdvcmtzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiAneCcgaW4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAneCcsIHt9KTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBwcm9wZXJ0aWVzIG9uIGFuIG9iamVjdCwgdXNpbmcgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgaWYgYXZhaWxhYmxlLFxyXG4gICAgICogb3RoZXJ3aXNlIHJldHVybnMgdGhlIG9iamVjdCB1bmNoYW5nZWQuICBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSB1c2VkIGluXHJcbiAgICAgKiBzZXR1cCBjb2RlIHRvIHByZXZlbnQgZXJyb3JzIGZyb20gY29tcGxldGVseSBoYWx0aW5nIEphdmFTY3JpcHQgZXhlY3V0aW9uXHJcbiAgICAgKiBpbiBsZWdhY3kgYnJvd3NlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqXHJcbiAgICAgKiBAZXhwb3J0cyBkZWZpbmVQcm9wZXJ0aWVzXHJcbiAgICAgKi9cclxuICAgIHZhciBkZWZpbmVQcm9wZXJ0aWVzID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXM7XHJcbiAgICBpZiAoIWRlZmluZVByb3BlcnR5V29ya3MgfHwgIWRlZmluZWQoZGVmaW5lUHJvcGVydGllcykpIHtcclxuICAgICAgICBkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24obykge1xyXG4gICAgICAgICAgICByZXR1cm4gbztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0aWVzO1xyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL2RlZmluZVByb3BlcnRpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKmdsb2JhbCByZXF1aXJlKi9cblxudmFyIGRlZmF1bHRWYWx1ZSA9IHJlcXVpcmUoJ3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9kZWZhdWx0VmFsdWUnKTtcblxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3IgdGhhdCBvY2N1cnJlZCBpbiBhIFRlcnJpYUpTIG1vZHVsZSwgZXNwZWNpYWxseSBhbiBhc3luY2hyb25vdXMgb25lIHRoYXQgY2Fubm90IGJlIHJhaXNlZFxyXG4gKiBieSB0aHJvd2luZyBhbiBleGNlcHRpb24gYmVjYXVzZSBubyBvbmUgd291bGQgYmUgYWJsZSB0byBjYXRjaCBpdC5cclxuICpcclxuICogQGFsaWFzIFRlcnJpYUVycm9yXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5zZW5kZXJdIFRoZSBvYmplY3QgcmFpc2luZyB0aGUgZXJyb3IuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy50aXRsZT0nQW4gZXJyb3Igb2NjdXJyZWQnXSBBIHNob3J0IHRpdGxlIGRlc2NyaWJpbmcgdGhlIGVycm9yLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5tZXNzYWdlIEEgZGV0YWlsZWQgbWVzc2FnZSBkZXNjcmliaW5nIHRoZSBlcnJvci4gIFRoaXMgbWVzc2FnZSBtYXkgYmUgSFRNTCBhbmQgaXQgc2hvdWxkIGJlIHNhbml0aXplZCBiZWZvcmUgZGlzcGxheSB0byB0aGUgdXNlci5cclxuICovXG52YXIgVGVycmlhRXJyb3IgPSBmdW5jdGlvbiBUZXJyaWFFcnJvcihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBkZWZhdWx0VmFsdWUob3B0aW9ucywgZGVmYXVsdFZhbHVlLkVNUFRZX09CSkVDVCk7XG5cbiAgLyoqXHJcbiAgICogR2V0cyBvciBzZXRzIHRoZSBvYmplY3QgdGhhdCByYWlzZWQgdGhlIGVycm9yLlxyXG4gICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICovXG4gIHRoaXMuc2VuZGVyID0gb3B0aW9ucy5zZW5kZXI7XG5cbiAgLyoqXHJcbiAgICogR2V0cyBvciBzZXRzIGEgc2hvcnQgdGl0bGUgZGVzY3JpYmluZyB0aGUgZXJyb3IuXHJcbiAgICogQHR5cGUge1N0cmluZ31cclxuICAgKi9cbiAgdGhpcy50aXRsZSA9IGRlZmF1bHRWYWx1ZShvcHRpb25zLnRpdGxlLCAnQW4gZXJyb3Igb2NjdXJyZWQnKTtcblxuICAvKipcclxuICAgKiBHZXRzIG9yIHNldHMgYSBtZXRhaWxlZCBtZXNzYWdlIGRlc2NyaWJpbmcgdGhlIGVycm9yLiAgVGhpcyBtZXNzYWdlIG1heSBiZSBIVE1MIGFuZCBpdCBzaG91bGQgYmUgc2FuaXRpemVkIGJlZm9yZSBkaXNwbGF5IHRvIHRoZSB1c2VyLlxyXG4gICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICovXG4gIHRoaXMubWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZTtcblxuICAvKipcclxuICAgKiBUcnVlIGlmIHRoZSB1c2VyIGhhcyBzZWVuIHRoaXMgZXJyb3I7IG90aGVyd2lzZSwgZmFsc2UuXHJcbiAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgKi9cbiAgdGhpcy5yYWlzZWRUb1VzZXIgPSBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGVycmlhRXJyb3I7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL0NvcmUvVGVycmlhRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogUmV0dXJucyBpbmRpY2VzIHN1Y2ggdGhhdCBhcnJheVtpbmRpY2VzW2ldXSA9IHNvcnRlZEFycmF5W2ldLlxyXG4gKiBFZy4gc29ydGVkSW5kaWNlcyhbJ2MnLCAnYScsICdiJywgJ2QnXSkgPT4gWzEsIDIsIDAsIDNdLiAoVGhlIHNvcnRlZCBhcnJheSBpcyBbYSwgYiwgYywgZF0sIGFuZCBcImFcIiB3YXMgaW4gcG9zaXRpb24gMSwgXCJiXCIgaW4gcG9zaXRpb24gMiwgZXRjLilcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNvcnQuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJlRnVuY3Rpb25dIFRoZSB1c3VhbCBjb21wYXJlIGZ1bmN0aW9uLCBlZy4gZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYSAtIGIgfS5cclxuICogQHJldHVybiB7QXJyYXl9IFRoZSBzb3J0ZWQgaW5kaWNlcywgc3VjaCB0aGF0IGFycmF5W3NvcnRlZEluZGljZXNbMF1dID0gc29ydGVkQXJyYXlbMF0uXHJcbiAqL1xuXG5mdW5jdGlvbiBzb3J0ZWRJbmRpY2VzKGFycmF5LCBjb21wYXJlRnVuY3Rpb24pIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIHZhciBpbmRpY2VzID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpbmRpY2VzW2ldID0gaTtcbiAgICB9XG4gICAgaWYgKCFjb21wYXJlRnVuY3Rpb24pIHtcbiAgICAgICAgY29tcGFyZUZ1bmN0aW9uID0gZnVuY3Rpb24gY29tcGFyZUZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogMDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaW5kaWNlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oYXJyYXlbYV0sIGFycmF5W2JdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaW5kaWNlcztcbn1cblxuLy9cbi8vIE5vdGU6IGZvciBpbmRpY2VzIHdoaWNoIGdvIGluIHRoZSBvdGhlciBkaXJlY3Rpb24sIGp1c3QgdXNlIGluZGV4T2YgbGlrZSB0aGlzOlxuLy9cbi8vIGl0KCdpbnZlcnNlIGluZGljZXMgd29yaycsIGZ1bmN0aW9uKCkge1xuLy8gICAgIHZhciBkYXRhID0gWydjJywgJ2EnLCAnYicsICdkJ107XG4vLyAgICAgdmFyIHNvcnRlZCA9IGRhdGEuc2xpY2UoKS5zb3J0KCk7XG4vLyAgICAgdmFyIGludmVyc2VJbmRpY2VzID0gZGF0YS5tYXAoZnVuY3Rpb24oZGF0dW0pIHsgcmV0dXJuIHNvcnRlZC5pbmRleE9mKGRhdHVtKTsgfSk7XG4vLyAgICAgZXhwZWN0KGludmVyc2VJbmRpY2VzKS50b0VxdWFsKFsyLCAwLCAxLCAzXSk7XG4vLyB9KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRlZEluZGljZXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL0NvcmUvc29ydGVkSW5kaWNlcy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QTs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7QUNyUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7OztBQzlQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QSIsInNvdXJjZVJvb3QiOiIifQ==