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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjdmZmY5MDIxZmYzM2JmYmRjZWYud29ya2VyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGY3ZmZmOTAyMWZmMzNiZmJkY2VmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL2RlZmF1bHRWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL1JlYWN0Vmlld3MvQ3VzdG9tL0NoYXJ0L2Rvd25sb2FkSHJlZldvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL0NvcmUvRGF0YVVyaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL0ZlYXR1cmVEZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9mcmVlemVPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9GdWxsc2NyZWVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lUHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL0NvcmUvVGVycmlhRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzL2xpYi9Db3JlL3NvcnRlZEluZGljZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL3N0YXRpYy93d3dyb290L2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY3ZmZmOTAyMWZmMzNiZmJkY2VmIiwiLypnbG9iYWwgZGVmaW5lKi9cclxuZGVmaW5lKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGV4cG9ydHMgZGVmaW5lZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBUaGUgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgb2JqZWN0IGlzIGRlZmluZWQsIHJldHVybnMgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBpZiAoQ2VzaXVtLmRlZmluZWQocG9zaXRpb25zKSkge1xyXG4gICAgICogICAgICBkb1NvbWV0aGluZygpO1xyXG4gICAgICogfSBlbHNlIHtcclxuICAgICAqICAgICAgZG9Tb21ldGhpbmdFbHNlKCk7XHJcbiAgICAgKiB9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGRlZmluZWQodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVmaW5lZDtcclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qZ2xvYmFsIGRlZmluZSovXHJcbmRlZmluZShbXHJcbiAgICAgICAgJy4vZnJlZXplT2JqZWN0J1xyXG4gICAgXSwgZnVuY3Rpb24oXHJcbiAgICAgICAgZnJlZXplT2JqZWN0KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBwYXJhbWV0ZXIgaWYgbm90IHVuZGVmaW5lZCwgb3RoZXJ3aXNlIHRoZSBzZWNvbmQgcGFyYW1ldGVyLlxyXG4gICAgICogVXNlZnVsIGZvciBzZXR0aW5nIGEgZGVmYXVsdCB2YWx1ZSBmb3IgYSBwYXJhbWV0ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGV4cG9ydHMgZGVmYXVsdFZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhXHJcbiAgICAgKiBAcGFyYW0geyp9IGJcclxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmaXJzdCBwYXJhbWV0ZXIgaWYgbm90IHVuZGVmaW5lZCwgb3RoZXJ3aXNlIHRoZSBzZWNvbmQgcGFyYW1ldGVyLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBwYXJhbSA9IENlc2l1bS5kZWZhdWx0VmFsdWUocGFyYW0sICdkZWZhdWx0Jyk7XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGRlZmF1bHRWYWx1ZShhLCBiKSB7XHJcbiAgICAgICAgaWYgKGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGZyb3plbiBlbXB0eSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgZGVmYXVsdCB2YWx1ZSBmb3Igb3B0aW9ucyBwYXNzZWQgYXNcclxuICAgICAqIGFuIG9iamVjdCBsaXRlcmFsLlxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0VmFsdWUuRU1QVFlfT0JKRUNUID0gZnJlZXplT2JqZWN0KHt9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL2RlZmF1bHRWYWx1ZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfZGVmaW5lZCA9IHJlcXVpcmUoJ3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9kZWZpbmVkJyk7XG5cbnZhciBfZGVmaW5lZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVkKTtcblxudmFyIF9EYXRhVXJpID0gcmVxdWlyZSgnLi4vLi4vLi4vQ29yZS9EYXRhVXJpJyk7XG5cbnZhciBfRGF0YVVyaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EYXRhVXJpKTtcblxudmFyIF9zb3J0ZWRJbmRpY2VzID0gcmVxdWlyZSgnLi4vLi4vLi4vQ29yZS9zb3J0ZWRJbmRpY2VzJyk7XG5cbnZhciBfc29ydGVkSW5kaWNlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zb3J0ZWRJbmRpY2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXHJcbiAqIENyZWF0ZSBjb21iaW5lZCBhcnJheXMgZnJvbSBhcnJheXMgb2YgY29sdW1uIHZhbHVlcywgZWcuIFtbdmFsdWVzMSwgdmFsdWVzMiwgdmFsdWVzM10sIFt2YWx1ZXM0LCB2YWx1ZXM1XV0uXHJcbiAqIFRoZSBmaXJzdCBjb2x1bW5zIG9mIGVhY2ggYXJyYXkgbXVzdCBiZSBvZiB0aGUgc2FtZSB0eXBlIChpbiB0aGUgYWJvdmUgZXhhbXBsZSwgdmFsdWVzMSBhbmQgdmFsdWVzNCkuXHJcbiAqIFRoZXNlIGFyZSBjb21iaW5lZCBhbmQgc29ydGVkIGludG8gYSBzaW5nbGUgY29sdW1uLlxyXG4gKiBUaGVuIHRoZSBzdWJzZXF1ZW50IGNvbHVtbnMgYXJlIGFkZGVkLCBmaWxsaW5nIHdpdGggbnVsbCB3aGVyZSBtaXNzaW5nLiAoVGhpcyBjb3VsZCBiZSBhbiBvcHRpb24gaW4gZnV0dXJlLilcclxuICogRWcuIGlmIHRoZSB2YWx1ZXMgb2YgZWFjaCBjb2wgYXJlOiB2YWx1ZXMxPVsxLDNdOyB2YWx1ZXMyPVsxMCwzMF07IHZhbHVlczM9WzEwMCwzMDBdOyB2YWx1ZXM0PVsxLDJdOyB2YWx1ZXM1PVstMSwtMl07XHJcbiAqIHRoZW4gdGhlIHJlc3VsdGluZyBhcnJheSBvZiBjb2x1bW4gdmFsdWVzIGFyZSwgaW4gb3JkZXIsIFsxLDIsM107IFsxMCxudWxsLDMwXTsgWzEwMCxudWxsLDMwMF07IFstMSwtMixudWxsXS5cclxuICogQHBhcmFtIHtBcnJheVtdfSB2YWx1ZUFycmF5cyBTZWUgZGVzY3JpcHRpb24gYWJvdmUuXHJcbiAqIEByZXR1cm4ge0FycmF5W119IFRoZSBzeW50aGVzaXplZCB2YWx1ZXMgd2hpY2ggY291bGQgYmUgcGFzc2VkIHRvIGEgdGFibGUgc3RydWN0dXJlLlxyXG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVWYWx1ZUFycmF5cyh2YWx1ZUFycmF5cykge1xuICAgIGlmICghKDAsIF9kZWZpbmVkMi5kZWZhdWx0KSh2YWx1ZUFycmF5cykgfHwgdmFsdWVBcnJheXMubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjb21iaW5lZFZhbHVlQXJyYXlzID0gW107XG4gICAgLy8gU3RhcnQgYnkgY29weWluZyB0aGUgZmlyc3Qgc2V0IG9mIGNvbHVtbnMgaW50byB0aGUgcmVzdWx0LlxuICAgIHZhciBmaXJzdEFycmF5ID0gdmFsdWVBcnJheXNbMF07XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBmaXJzdEFycmF5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBmaXJzdEFycmF5W2pdO1xuICAgICAgICBjb21iaW5lZFZhbHVlQXJyYXlzLnB1c2godmFsdWVzLnNsaWNlKCkpO1xuICAgIH1cbiAgICAvLyBUaGVuIGFkZCB0aGUgc3Vic2VxdWVudCBzZXRzIG9mIHgtY29sdW1ucyB0byB0aGUgZW5kIG9mIHRoZSBmaXJzdCByZXN1bHQgY29sdW1uLFxuICAgIC8vIGFkZCBudWxscyB0byB0aGUgZW5kIG9mIHRoZSBvdGhlciBleGlzdGluZyBjb2x1bW5zLFxuICAgIC8vIGFkZCBudWxscyB0byB0aGUgc3RhcnQgb2YgdGhlIG5ldyBjb2x1bW5zLFxuICAgIC8vIGFuZCBhZGQgdGhlbSB0byB0aGUgZW5kIG9mIHRoZSByZXN1bHQuXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCB2YWx1ZUFycmF5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY3VycmVudFZhbHVlQXJyYXkgPSB2YWx1ZUFycmF5c1tpXTtcbiAgICAgICAgdmFyIGN1cnJlbnRGaXJzdEFycmF5ID0gY3VycmVudFZhbHVlQXJyYXlbMF07XG4gICAgICAgIHZhciBwcmVFeGlzdGluZ1ZhbHVlc0xlbmd0aCA9IGNvbWJpbmVkVmFsdWVBcnJheXNbMF0ubGVuZ3RoO1xuICAgICAgICBjb21iaW5lZFZhbHVlQXJyYXlzWzBdID0gY29tYmluZWRWYWx1ZUFycmF5c1swXS5jb25jYXQoY3VycmVudEZpcnN0QXJyYXkpO1xuICAgICAgICB2YXIgZW1wdHkxID0gbmV3IEFycmF5KGN1cnJlbnRGaXJzdEFycmF5Lmxlbmd0aCk7IC8vIGVsZW1lbnRzIGFyZSB1bmRlZmluZWQuXG4gICAgICAgIGZvciAodmFyIGsgPSAxOyBrIDwgY29tYmluZWRWYWx1ZUFycmF5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgY29tYmluZWRWYWx1ZUFycmF5c1trXSA9IGNvbWJpbmVkVmFsdWVBcnJheXNba10uY29uY2F0KGVtcHR5MSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVtcHR5MiA9IG5ldyBBcnJheShwcmVFeGlzdGluZ1ZhbHVlc0xlbmd0aCk7IC8vIGVsZW1lbnRzIGFyZSB1bmRlZmluZWQuXG4gICAgICAgIGZvciAodmFyIF9qID0gMTsgX2ogPCBjdXJyZW50VmFsdWVBcnJheS5sZW5ndGg7IF9qKyspIHtcbiAgICAgICAgICAgIHZhciBfdmFsdWVzID0gY3VycmVudFZhbHVlQXJyYXlbX2pdO1xuICAgICAgICAgICAgY29tYmluZWRWYWx1ZUFycmF5cy5wdXNoKGVtcHR5Mi5jb25jYXQoX3ZhbHVlcykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU29ydCBieSB0aGUgZmlyc3QgY29sdW1uLlxuICAgIGNvbWJpbmVkVmFsdWVBcnJheXMgPSBzb3J0QnlGaXJzdChjb21iaW5lZFZhbHVlQXJyYXlzKTtcbiAgICBjb21iaW5lZFZhbHVlQXJyYXlzID0gY29tYmluZVJlcGVhdGVkKGNvbWJpbmVkVmFsdWVBcnJheXMpO1xuXG4gICAgcmV0dXJuIGNvbWJpbmVkVmFsdWVBcnJheXM7XG59XG5cbi8qKlxyXG4gKiBFZy4gc29ydEJ5Rmlyc3QoW1snYicsICdhJywgJ2MnXSwgWzEsIDIsIDNdXSkgPSBbWydhJywgJ2InLCAnYyddLCBbMiwgMSwgM11dLlxyXG4gKiBAcGFyYW0gIHtBcnJheVtdfSB2YWx1ZUFycmF5cyBUaGUgYXJyYXkgb2YgYXJyYXlzIG9mIHZhbHVlcyB0byBzb3J0LlxyXG4gKiBAcmV0dXJuIHtBcnJheVtdfSBUaGUgdmFsdWVzIHNvcnRlZCBieSB0aGUgZmlyc3QgY29sdW1uLlxyXG4gKi9cbi8qIGdsb2JhbCBvbm1lc3NhZ2U6dHJ1ZSAqL1xuZnVuY3Rpb24gc29ydEJ5Rmlyc3QodmFsdWVBcnJheXMpIHtcbiAgICB2YXIgZmlyc3RWYWx1ZXMgPSB2YWx1ZUFycmF5c1swXTtcbiAgICB2YXIgaW5kaWNlcyA9ICgwLCBfc29ydGVkSW5kaWNlczIuZGVmYXVsdCkoZmlyc3RWYWx1ZXMpO1xuICAgIHJldHVybiB2YWx1ZUFycmF5cy5tYXAoZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gaW5kaWNlcy5tYXAoZnVuY3Rpb24gKHNvcnRlZEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzW3NvcnRlZEluZGV4XTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbi8qKlxyXG4gKiBAcGFyYW0gIHtBcnJheVtdfSBzb3J0ZWRKdWxpYW5EYXRlT3JWYWx1ZUFycmF5cyBUaGUgYXJyYXkgb2YgYXJyYXlzIG9mIHZhbHVlcyB0byBjb21iaW5lLiBUaGVzZSBtdXN0IGJlIHNvcnRlZEJ5Rmlyc3QuIERhdGVzIG11c3QgYmUgSnVsaWFuRGF0ZXMuXHJcbiAqIEBwYXJhbSAge0ludGVnZXJ9IFtmaXJzdENvbHVtblR5cGVdIEVnLiBWYXJUeXBlLlRJTUUuXHJcbiAqIEByZXR1cm4ge0FycmF5W119IFRoZSB2YWx1ZXMsIHdpdGggYW55IHJlcGVhdHMgaW4gdGhlIGZpcnN0IGNvbHVtbiBjb21iaW5lZCBpbnRvIG9uZS4gRGF0ZXMgYXJlIGNvbnZlcnRlZCB0byBJU084NjAxIHN0cmluZyByZXByZXNlbnRhdGlvbi5cclxuICpcclxuICogRWcuXHJcbiAqIHZhciB4ID0gW1snYScsICdiJywgJ2InLCAnYyddLCBbMSwgMiwgdW5kZWZpbmVkLCAzXSwgWzQsIHVuZGVmaW5lZCwgNSwgdW5kZWZpbmVkXV07XHJcbiAqIGNvbWJpbmVSZXBlYXRlZCh4KTtcclxuICogIyB4IGlzIFtbJ2EnLCAnYicsICdjJ10sIFsxLCAyLCAzXSwgWzQsIDUsIHVuZGVmaW5lZF1dLlxyXG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVSZXBlYXRlZChzb3J0ZWRWYWx1ZUFycmF5cykge1xuICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoc29ydGVkVmFsdWVBcnJheXMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gPSBbc29ydGVkVmFsdWVBcnJheXNbaV1bMF1dO1xuICAgIH1cbiAgICBmb3IgKHZhciBqID0gMTsgaiA8IHNvcnRlZFZhbHVlQXJyYXlzWzBdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChzb3J0ZWRWYWx1ZUFycmF5c1swXVtqXSA9PT0gc29ydGVkVmFsdWVBcnJheXNbMF1baiAtIDFdKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gcmVzdWx0WzBdLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgcmVzdWx0Lmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbX2ldW2N1cnJlbnRJbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbX2ldW2N1cnJlbnRJbmRleF0gPSBzb3J0ZWRWYWx1ZUFycmF5c1tfaV1bal07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgcmVzdWx0Lmxlbmd0aDsgX2kyKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbX2kyXS5wdXNoKHNvcnRlZFZhbHVlQXJyYXlzW19pMl1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxyXG4gKiBDb252ZXJ0IGFuIGFycmF5IG9mIGNvbHVtbiB2YWx1ZXMsIHdpdGggY29sdW1uIG5hbWVzLCB0byBhbiBhcnJheSBvZiByb3cgdmFsdWVzLlxyXG4gKiBAcGFyYW0gIHtBcnJheVtdfSBjb2x1bW5WYWx1ZUFycmF5cyBBcnJheSBvZiBjb2x1bW4gdmFsdWVzLCBlZy4gW1sxLDIsM10sIFs0LDUsNl1dLlxyXG4gKiBAcGFyYW0gIHtTdHJpbmdbXX0gY29sdW1uTmFtZXMgQXJyYXkgb2YgY29sdW1uIG5hbWVzLCBlZyBbJ3gnLCAneSddLlxyXG4gKiBAcmV0dXJuIHtBcnJheVtdfSBBcnJheSBvZiByb3dzLCBzdGFydGluZyB3aXRoIHRoZSBjb2x1bW4gbmFtZXMsIGVnLiBbWyd4JywgJ3knXSwgWzEsIDRdLCBbMiwgNV0sIFszLCA2XV0uXHJcbiAqL1xuZnVuY3Rpb24gdG9BcnJheU9mUm93cyhjb2x1bW5WYWx1ZUFycmF5cywgY29sdW1uTmFtZXMpIHtcbiAgICBpZiAoY29sdW1uVmFsdWVBcnJheXMubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciByb3dzID0gY29sdW1uVmFsdWVBcnJheXNbMF0ubWFwKGZ1bmN0aW9uICh2YWx1ZTAsIHJvd0luZGV4KSB7XG4gICAgICAgIHJldHVybiBjb2x1bW5WYWx1ZUFycmF5cy5tYXAoZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlc1tyb3dJbmRleF07XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJvd3MudW5zaGlmdChjb2x1bW5OYW1lcyk7XG4gICAgcmV0dXJuIHJvd3M7XG59XG5cbm9ubWVzc2FnZSA9IGZ1bmN0aW9uIG9ubWVzc2FnZShldmVudCkge1xuICAgIHZhciB2YWx1ZUFycmF5cyA9IGV2ZW50LmRhdGEudmFsdWVzLm1hcChmdW5jdGlvbiAodmFsdWVzQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc0FycmF5Lm1hcChmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodmFsdWVzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7IC8vIENvbnZlcnQgZnJvbSB0eXBlZCBhcnJheXMuXG4gICAgdmFyIG5hbWVBcnJheXMgPSBldmVudC5kYXRhLm5hbWVzO1xuICAgIHZhciBjb21iaW5lZFZhbHVlcyA9IGNvbWJpbmVWYWx1ZUFycmF5cyh2YWx1ZUFycmF5cyk7XG4gICAgdmFyIHJvd3MgPSB0b0FycmF5T2ZSb3dzKGNvbWJpbmVkVmFsdWVzLCBuYW1lQXJyYXlzKTtcbiAgICB2YXIgam9pbmVkUm93cyA9IHJvd3MubWFwKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgcmV0dXJuIHJvdy5qb2luKCcsJyk7XG4gICAgfSk7XG4gICAgdmFyIGNzdlN0cmluZyA9IGpvaW5lZFJvd3Muam9pbignXFxuJyk7XG4gICAgdmFyIGhyZWYgPSBfRGF0YVVyaTIuZGVmYXVsdC5tYWtlKCdjc3YnLCBjc3ZTdHJpbmcpO1xuICAgIHBvc3RNZXNzYWdlKGhyZWYpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliP3tcInNvdXJjZU1hcFwiOmZhbHNlLFwicHJlc2V0c1wiOltcImVzMjAxNVwiLFwicmVhY3RcIl0sXCJwbHVnaW5zXCI6W1wianN4LWNvbnRyb2wtc3RhdGVtZW50c1wiXX0hLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL1JlYWN0Vmlld3MvQ3VzdG9tL0NoYXJ0L2Rvd25sb2FkSHJlZldvcmtlci5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZpbmVkID0gcmVxdWlyZSgndGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL2RlZmluZWQnKTtcbnZhciBGZWF0dXJlRGV0ZWN0aW9uID0gcmVxdWlyZSgndGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL0ZlYXR1cmVEZXRlY3Rpb24nKTtcbnZhciBUZXJyaWFFcnJvciA9IHJlcXVpcmUoJy4uL0NvcmUvVGVycmlhRXJyb3InKTtcblxuLy8gVW5mb3J0dW5hdGVseSB0aGVyZSdzIG5vIHdheSB0byBmZWF0dXJlLWRldGVjdCBmb3IgdGhpcywgaXQncyBzb21ldGhpbmcgdGhhdCBvbmx5IE1TIGJyb3dzZXJzIGRpc2FsbG93IGZvciBzZWN1cml0eSByZWFzb25zLlxudmFyIGNhblVzZURhdGFVcmlJbkhyZWYgPSAhKEZlYXR1cmVEZXRlY3Rpb24uaXNJbnRlcm5ldEV4cGxvcmVyKCkgfHwgL0VkZ2UvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudCkpO1xuXG52YXIgRGF0YVVyaSA9IHtcbiAgICAvKipcclxuICAgICAqIFR1cm4gYSBmaWxlIHdpdGggdGhlIHN1cHBsaWVkIHR5cGUgYW5kIHN0cmluZ2lmaWVkIGRhdGEgaW50byBhIGRhdGEgdXJpIHRoYXQgY2FuIGJlIHNldCBhcyB0aGUgaHJlZiBvZiBhbiBhbmNob3IgdGFnLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgRGF0YSB0eXBlLCBlZy4gJ2pzb24nIG9yICdjc3YnLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFTdHJpbmcgVGhlIGRhdGEuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IEEgc3RyaW5nIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW4gYW4gYW5jaG9yIHRhZydzICdocmVmJyBhdHRyaWJ1dGUgdG8gcmVwcmVzZW50IGRvd25sb2FkYWJsZSBkYXRhLlxyXG4gICAgICovXG4gICAgbWFrZTogZnVuY3Rpb24gbWFrZSh0eXBlLCBkYXRhU3RyaW5nKSB7XG4gICAgICAgIGlmIChkYXRhU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBVc2luZyBhdHRhY2htZW50LyogbWltZSB0eXBlIG1ha2VzIHNhZmFyaSBkb3dubG9hZCBhcyBhdHRhY2htZW50LiB0ZXh0Lyogd29ya3Mgb24gQ2hyb21lIChhcyBkb2VzIGF0dGFjaG1lbnQpLlxuICAgICAgICAgICAgcmV0dXJuICdkYXRhOmF0dGFjaG1lbnQvJyArIHR5cGUgKyAnLCcgKyBlbmNvZGVVUklDb21wb25lbnQoZGF0YVN0cmluZyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZmxhZyBzdGF0aW5nIGlmIGRhdGEgdXJpIGxpbmtzIGFyZSBzdXBwb3J0ZWQgYnkgdGhlIHVzZXIncyBicm93c2VyLlxyXG4gICAgICogSWYgZXJyb3JFdmVudCBpcyBwcm92aWRlZCwgcHJlc2VudHMgYW4gZXJyb3IgbWVzc2FnZSBleHBsYWluaW5nIHdoeSBpdCB3b24ndCB3b3JrLlxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gW2Vycm9yRXZlbnRdIEEgQ2VzaXVtIEV2ZW50LCBlZy4gdGVycmlhLmVycm9yLCB1c2VkIHRvIHJhaXNlIGFuIGVycm9yIGlmIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgZGF0YSBkb3dubG9hZC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbaHJlZl0gVGhlIGxpbmsgdG8gcHJvdmlkZSBpbiB0aGUgZXJyb3IgbWVzc2FnZS4gUmVxdWlyZWQgaWYgZXJyb3JFdmVudCBpcyBwcm92aWRlZC5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZvcmNlRXJyb3JdIElmIHRydWUsIGFsd2F5cyBzaG93IHRoZSBlcnJvciBtZXNzYWdlLiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggb25seSBzaG93cyBpdCBpZiB0aGUgYnJvd3NlciBjYW5ub3QgZG93bmxvYWQgdXJpIGxpbmtzLlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB3aGV0aGVyIHRoZSBicm93c2VyIGlzIGNvbXBhdGlibGUgd2l0aCBkYXRhIHVyaXMuXHJcbiAgICAgKi9cbiAgICBjaGVja0NvbXBhdGliaWxpdHk6IGZ1bmN0aW9uIGNoZWNrQ29tcGF0aWJpbGl0eShlcnJvckV2ZW50LCBocmVmLCBmb3JjZUVycm9yKSB7XG4gICAgICAgIGlmICghY2FuVXNlRGF0YVVyaUluSHJlZiB8fCBmb3JjZUVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZGVmaW5lZChlcnJvckV2ZW50KSkge1xuICAgICAgICAgICAgICAgIGVycm9yRXZlbnQucmFpc2VFdmVudChuZXcgVGVycmlhRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0Jyb3dzZXIgRG9lcyBOb3QgU3VwcG9ydCBEYXRhIERvd25sb2FkJyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1VuZm9ydHVuYXRlbHkgTWljcm9zb2Z0IGJyb3dzZXJzIChpbmNsdWRpbmcgYWxsIHZlcnNpb25zIG9mIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlKSBkbyBub3QgJyArICdzdXBwb3J0IHRoZSBkYXRhIHVyaSBmdW5jdGlvbmFsaXR5IG5lZWRlZCB0byBkb3dubG9hZCBkYXRhIGFzIGEgZmlsZS4gVG8gZG93bmxvYWQsIGNvcHkgdGhlIGZvbGxvd2luZyB1cmkgJyArICdpbnRvIGFub3RoZXIgYnJvd3NlciBzdWNoIGFzIENocm9tZSwgRmlyZWZveCBvciBTYWZhcmk6ICcgKyBocmVmXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFVcmk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL0NvcmUvRGF0YVVyaS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmdsb2JhbCBkZWZpbmUqL1xyXG5kZWZpbmUoW1xyXG4gICAgICAgICcuL2RlZmF1bHRWYWx1ZScsXHJcbiAgICAgICAgJy4vZGVmaW5lZCcsXHJcbiAgICAgICAgJy4vRnVsbHNjcmVlbidcclxuICAgIF0sIGZ1bmN0aW9uKFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZSxcclxuICAgICAgICBkZWZpbmVkLFxyXG4gICAgICAgIEZ1bGxzY3JlZW4pIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhlTmF2aWdhdG9yO1xyXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdGhlTmF2aWdhdG9yID0gbmF2aWdhdG9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGVOYXZpZ2F0b3IgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHRyYWN0VmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHBhcnRzID0gdmVyc2lvblN0cmluZy5zcGxpdCgnLicpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICBwYXJ0c1tpXSA9IHBhcnNlSW50KHBhcnRzW2ldLCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNDaHJvbWVSZXN1bHQ7XHJcbiAgICB2YXIgY2hyb21lVmVyc2lvblJlc3VsdDtcclxuICAgIGZ1bmN0aW9uIGlzQ2hyb21lKCkge1xyXG4gICAgICAgIGlmICghZGVmaW5lZChpc0Nocm9tZVJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaXNDaHJvbWVSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gRWRnZSBjb250YWlucyBDaHJvbWUgaW4gdGhlIHVzZXIgYWdlbnQgdG9vXHJcbiAgICAgICAgICAgIGlmICghaXNFZGdlKCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaWVsZHMgPSAoLyBDaHJvbWVcXC8oW1xcLjAtOV0rKS8pLmV4ZWModGhlTmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaHJvbWVSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNocm9tZVZlcnNpb25SZXN1bHQgPSBleHRyYWN0VmVyc2lvbihmaWVsZHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaXNDaHJvbWVSZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hyb21lVmVyc2lvbigpIHtcclxuICAgICAgICByZXR1cm4gaXNDaHJvbWUoKSAmJiBjaHJvbWVWZXJzaW9uUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpc1NhZmFyaVJlc3VsdDtcclxuICAgIHZhciBzYWZhcmlWZXJzaW9uUmVzdWx0O1xyXG4gICAgZnVuY3Rpb24gaXNTYWZhcmkoKSB7XHJcbiAgICAgICAgaWYgKCFkZWZpbmVkKGlzU2FmYXJpUmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpc1NhZmFyaVJlc3VsdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hyb21lIGFuZCBFZGdlIGNvbnRhaW4gU2FmYXJpIGluIHRoZSB1c2VyIGFnZW50IHRvb1xyXG4gICAgICAgICAgICBpZiAoIWlzQ2hyb21lKCkgJiYgIWlzRWRnZSgpICYmICgvIFNhZmFyaVxcL1tcXC4wLTldKy8pLnRlc3QodGhlTmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaWVsZHMgPSAoLyBWZXJzaW9uXFwvKFtcXC4wLTldKykvKS5leGVjKHRoZU5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2FmYXJpUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzYWZhcmlWZXJzaW9uUmVzdWx0ID0gZXh0cmFjdFZlcnNpb24oZmllbGRzWzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlzU2FmYXJpUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNhZmFyaVZlcnNpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzU2FmYXJpKCkgJiYgc2FmYXJpVmVyc2lvblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNXZWJraXRSZXN1bHQ7XHJcbiAgICB2YXIgd2Via2l0VmVyc2lvblJlc3VsdDtcclxuICAgIGZ1bmN0aW9uIGlzV2Via2l0KCkge1xyXG4gICAgICAgIGlmICghZGVmaW5lZChpc1dlYmtpdFJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaXNXZWJraXRSZXN1bHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSAoLyBBcHBsZVdlYktpdFxcLyhbXFwuMC05XSspKFxcKz8pLykuZXhlYyh0aGVOYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICAgICAgaWYgKGZpZWxkcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaXNXZWJraXRSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2Via2l0VmVyc2lvblJlc3VsdCA9IGV4dHJhY3RWZXJzaW9uKGZpZWxkc1sxXSk7XHJcbiAgICAgICAgICAgICAgICB3ZWJraXRWZXJzaW9uUmVzdWx0LmlzTmlnaHRseSA9ICEhZmllbGRzWzJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaXNXZWJraXRSZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd2Via2l0VmVyc2lvbigpIHtcclxuICAgICAgICByZXR1cm4gaXNXZWJraXQoKSAmJiB3ZWJraXRWZXJzaW9uUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpc0ludGVybmV0RXhwbG9yZXJSZXN1bHQ7XHJcbiAgICB2YXIgaW50ZXJuZXRFeHBsb3JlclZlcnNpb25SZXN1bHQ7XHJcbiAgICBmdW5jdGlvbiBpc0ludGVybmV0RXhwbG9yZXIoKSB7XHJcbiAgICAgICAgaWYgKCFkZWZpbmVkKGlzSW50ZXJuZXRFeHBsb3JlclJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaXNJbnRlcm5ldEV4cGxvcmVyUmVzdWx0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmllbGRzO1xyXG4gICAgICAgICAgICBpZiAodGhlTmF2aWdhdG9yLmFwcE5hbWUgPT09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZHMgPSAvTVNJRSAoWzAtOV17MSx9W1xcLjAtOV17MCx9KS8uZXhlYyh0aGVOYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChmaWVsZHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0ludGVybmV0RXhwbG9yZXJSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVybmV0RXhwbG9yZXJWZXJzaW9uUmVzdWx0ID0gZXh0cmFjdFZlcnNpb24oZmllbGRzWzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGVOYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ05ldHNjYXBlJykge1xyXG4gICAgICAgICAgICAgICAgZmllbGRzID0gL1RyaWRlbnRcXC8uKnJ2OihbMC05XXsxLH1bXFwuMC05XXswLH0pLy5leGVjKHRoZU5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzSW50ZXJuZXRFeHBsb3JlclJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJuZXRFeHBsb3JlclZlcnNpb25SZXN1bHQgPSBleHRyYWN0VmVyc2lvbihmaWVsZHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0ludGVybmV0RXhwbG9yZXJSZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW50ZXJuZXRFeHBsb3JlclZlcnNpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzSW50ZXJuZXRFeHBsb3JlcigpICYmIGludGVybmV0RXhwbG9yZXJWZXJzaW9uUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpc0VkZ2VSZXN1bHQ7XHJcbiAgICB2YXIgZWRnZVZlcnNpb25SZXN1bHQ7XHJcbiAgICBmdW5jdGlvbiBpc0VkZ2UoKSB7XHJcbiAgICAgICAgaWYgKCFkZWZpbmVkKGlzRWRnZVJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaXNFZGdlUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSAoLyBFZGdlXFwvKFtcXC4wLTldKykvKS5leGVjKHRoZU5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICAgICAgICBpZiAoZmllbGRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpc0VkZ2VSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZWRnZVZlcnNpb25SZXN1bHQgPSBleHRyYWN0VmVyc2lvbihmaWVsZHNbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0VkZ2VSZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZWRnZVZlcnNpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzRWRnZSgpICYmIGVkZ2VWZXJzaW9uUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpc0ZpcmVmb3hSZXN1bHQ7XHJcbiAgICB2YXIgZmlyZWZveFZlcnNpb25SZXN1bHQ7XHJcbiAgICBmdW5jdGlvbiBpc0ZpcmVmb3goKSB7XHJcbiAgICAgICAgaWYgKCFkZWZpbmVkKGlzRmlyZWZveFJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaXNGaXJlZm94UmVzdWx0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmllbGRzID0gL0ZpcmVmb3hcXC8oW1xcLjAtOV0rKS8uZXhlYyh0aGVOYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICAgICAgaWYgKGZpZWxkcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaXNGaXJlZm94UmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZpcmVmb3hWZXJzaW9uUmVzdWx0ID0gZXh0cmFjdFZlcnNpb24oZmllbGRzWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNGaXJlZm94UmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpc1dpbmRvd3NSZXN1bHQ7XHJcbiAgICBmdW5jdGlvbiBpc1dpbmRvd3MoKSB7XHJcbiAgICAgICAgaWYgKCFkZWZpbmVkKGlzV2luZG93c1Jlc3VsdCkpIHtcclxuICAgICAgICAgICAgaXNXaW5kb3dzUmVzdWx0ID0gL1dpbmRvd3MvaS50ZXN0KHRoZU5hdmlnYXRvci5hcHBWZXJzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzV2luZG93c1Jlc3VsdDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gZmlyZWZveFZlcnNpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzRmlyZWZveCgpICYmIGZpcmVmb3hWZXJzaW9uUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBoYXNQb2ludGVyRXZlbnRzO1xyXG4gICAgZnVuY3Rpb24gc3VwcG9ydHNQb2ludGVyRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICghZGVmaW5lZChoYXNQb2ludGVyRXZlbnRzKSkge1xyXG4gICAgICAgICAgICAvL1doaWxlIG5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCBpcyBkZXByZWNhdGVkIGluIHRoZSBXM0Mgc3BlY2lmaWNhdGlvblxyXG4gICAgICAgICAgICAvL3dlIHN0aWxsIG5lZWQgdG8gdXNlIGl0IGlmIGl0IGV4aXN0cyBpbiBvcmRlciB0byBzdXBwb3J0IGJyb3dzZXJzXHJcbiAgICAgICAgICAgIC8vdGhhdCByZWx5IG9uIGl0LCBzdWNoIGFzIHRoZSBXaW5kb3dzIFdlYkJyb3dzZXIgY29udHJvbCB3aGljaCBkZWZpbmVzXHJcbiAgICAgICAgICAgIC8vUG9pbnRlckV2ZW50IGJ1dCBzZXRzIG5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCB0byBmYWxzZS5cclxuICAgICAgICAgICAgaGFzUG9pbnRlckV2ZW50cyA9IHR5cGVvZiBQb2ludGVyRXZlbnQgIT09ICd1bmRlZmluZWQnICYmICghZGVmaW5lZCh0aGVOYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQpIHx8IHRoZU5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoYXNQb2ludGVyRXZlbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbWFnZVJlbmRlcmluZ1ZhbHVlUmVzdWx0O1xyXG4gICAgdmFyIHN1cHBvcnRzSW1hZ2VSZW5kZXJpbmdQaXhlbGF0ZWRSZXN1bHQ7XHJcbiAgICBmdW5jdGlvbiBzdXBwb3J0c0ltYWdlUmVuZGVyaW5nUGl4ZWxhdGVkKCkge1xyXG4gICAgICAgIGlmICghZGVmaW5lZChzdXBwb3J0c0ltYWdlUmVuZGVyaW5nUGl4ZWxhdGVkUmVzdWx0KSkge1xyXG4gICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2UtcmVuZGVyaW5nOiAtbW96LWNyaXNwLWVkZ2VzOycgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZS1yZW5kZXJpbmc6IHBpeGVsYXRlZDsnKTtcclxuICAgICAgICAgICAgLy9jYW52YXMuc3R5bGUuaW1hZ2VSZW5kZXJpbmcgd2lsbCBiZSB1bmRlZmluZWQsIG51bGwgb3IgYW4gZW1wdHkgc3RyaW5nIG9uIHVuc3VwcG9ydGVkIGJyb3dzZXJzLlxyXG4gICAgICAgICAgICB2YXIgdG1wID0gY2FudmFzLnN0eWxlLmltYWdlUmVuZGVyaW5nO1xyXG4gICAgICAgICAgICBzdXBwb3J0c0ltYWdlUmVuZGVyaW5nUGl4ZWxhdGVkUmVzdWx0ID0gZGVmaW5lZCh0bXApICYmIHRtcCAhPT0gJyc7XHJcbiAgICAgICAgICAgIGlmIChzdXBwb3J0c0ltYWdlUmVuZGVyaW5nUGl4ZWxhdGVkUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZVJlbmRlcmluZ1ZhbHVlUmVzdWx0ID0gdG1wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdXBwb3J0c0ltYWdlUmVuZGVyaW5nUGl4ZWxhdGVkUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGltYWdlUmVuZGVyaW5nVmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRzSW1hZ2VSZW5kZXJpbmdQaXhlbGF0ZWQoKSA/IGltYWdlUmVuZGVyaW5nVmFsdWVSZXN1bHQgOiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHNldCBvZiBmdW5jdGlvbnMgdG8gZGV0ZWN0IHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0c1xyXG4gICAgICogdmFyaW91cyBmZWF0dXJlcy5cclxuICAgICAqXHJcbiAgICAgKiBAZXhwb3J0cyBGZWF0dXJlRGV0ZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIHZhciBGZWF0dXJlRGV0ZWN0aW9uID0ge1xyXG4gICAgICAgIGlzQ2hyb21lIDogaXNDaHJvbWUsXHJcbiAgICAgICAgY2hyb21lVmVyc2lvbiA6IGNocm9tZVZlcnNpb24sXHJcbiAgICAgICAgaXNTYWZhcmkgOiBpc1NhZmFyaSxcclxuICAgICAgICBzYWZhcmlWZXJzaW9uIDogc2FmYXJpVmVyc2lvbixcclxuICAgICAgICBpc1dlYmtpdCA6IGlzV2Via2l0LFxyXG4gICAgICAgIHdlYmtpdFZlcnNpb24gOiB3ZWJraXRWZXJzaW9uLFxyXG4gICAgICAgIGlzSW50ZXJuZXRFeHBsb3JlciA6IGlzSW50ZXJuZXRFeHBsb3JlcixcclxuICAgICAgICBpbnRlcm5ldEV4cGxvcmVyVmVyc2lvbiA6IGludGVybmV0RXhwbG9yZXJWZXJzaW9uLFxyXG4gICAgICAgIGlzRWRnZSA6IGlzRWRnZSxcclxuICAgICAgICBlZGdlVmVyc2lvbiA6IGVkZ2VWZXJzaW9uLFxyXG4gICAgICAgIGlzRmlyZWZveCA6IGlzRmlyZWZveCxcclxuICAgICAgICBmaXJlZm94VmVyc2lvbiA6IGZpcmVmb3hWZXJzaW9uLFxyXG4gICAgICAgIGlzV2luZG93cyA6IGlzV2luZG93cyxcclxuICAgICAgICBoYXJkd2FyZUNvbmN1cnJlbmN5IDogZGVmYXVsdFZhbHVlKHRoZU5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5LCAzKSxcclxuICAgICAgICBzdXBwb3J0c1BvaW50ZXJFdmVudHMgOiBzdXBwb3J0c1BvaW50ZXJFdmVudHMsXHJcbiAgICAgICAgc3VwcG9ydHNJbWFnZVJlbmRlcmluZ1BpeGVsYXRlZDogc3VwcG9ydHNJbWFnZVJlbmRlcmluZ1BpeGVsYXRlZCxcclxuICAgICAgICBpbWFnZVJlbmRlcmluZ1ZhbHVlOiBpbWFnZVJlbmRlcmluZ1ZhbHVlXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZWN0cyB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgdGhlIGZ1bGwgc2NyZWVuIHN0YW5kYXJkLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHRoZSBmdWxsIHNjcmVlbiBzdGFuZGFyZCwgZmFsc2UgaWYgbm90LlxyXG4gICAgICpcclxuICAgICAqIEBzZWUgRnVsbHNjcmVlblxyXG4gICAgICogQHNlZSB7QGxpbmsgaHR0cDovL2R2Y3MudzMub3JnL2hnL2Z1bGxzY3JlZW4vcmF3LWZpbGUvdGlwL092ZXJ2aWV3Lmh0bWx8VzNDIEZ1bGxzY3JlZW4gTGl2aW5nIFNwZWNpZmljYXRpb259XHJcbiAgICAgKi9cclxuICAgIEZlYXR1cmVEZXRlY3Rpb24uc3VwcG9ydHNGdWxsc2NyZWVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIEZ1bGxzY3JlZW4uc3VwcG9ydHNGdWxsc2NyZWVuKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZWN0cyB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cywgZmFsc2UgaWYgbm90LlxyXG4gICAgICpcclxuICAgICAqIEBzZWUge0BsaW5rIGh0dHA6Ly93d3cua2hyb25vcy5vcmcvcmVnaXN0cnkvdHlwZWRhcnJheS9zcGVjcy9sYXRlc3QvfFR5cGVkIEFycmF5IFNwZWNpZmljYXRpb259XHJcbiAgICAgKi9cclxuICAgIEZlYXR1cmVEZXRlY3Rpb24uc3VwcG9ydHNUeXBlZEFycmF5cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVjdHMgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIFdlYiBXb3JrZXJzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIHRoZSBicm93c2VycyBzdXBwb3J0cyBXZWIgV29ya2VycywgZmFsc2UgaWYgbm90LlxyXG4gICAgICpcclxuICAgICAqIEBzZWUge0BsaW5rIGh0dHA6Ly93d3cudzMub3JnL1RSL3dvcmtlcnMvfVxyXG4gICAgICovXHJcbiAgICBGZWF0dXJlRGV0ZWN0aW9uLnN1cHBvcnRzV2ViV29ya2VycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgV29ya2VyICE9PSAndW5kZWZpbmVkJztcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIEZlYXR1cmVEZXRlY3Rpb247XHJcbn0pO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvRmVhdHVyZURldGVjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmdsb2JhbCBkZWZpbmUqL1xyXG5kZWZpbmUoW1xyXG4gICAgICAgICcuL2RlZmluZWQnXHJcbiAgICBdLCBmdW5jdGlvbihcclxuICAgICAgICBkZWZpbmVkKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGcmVlemVzIGFuIG9iamVjdCwgdXNpbmcgT2JqZWN0LmZyZWV6ZSBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSByZXR1cm5zXHJcbiAgICAgKiB0aGUgb2JqZWN0IHVuY2hhbmdlZC4gIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIHVzZWQgaW4gc2V0dXAgY29kZSB0byBwcmV2ZW50XHJcbiAgICAgKiBlcnJvcnMgZnJvbSBjb21wbGV0ZWx5IGhhbHRpbmcgSmF2YVNjcmlwdCBleGVjdXRpb24gaW4gbGVnYWN5IGJyb3dzZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKlxyXG4gICAgICogQGV4cG9ydHMgZnJlZXplT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHZhciBmcmVlemVPYmplY3QgPSBPYmplY3QuZnJlZXplO1xyXG4gICAgaWYgKCFkZWZpbmVkKGZyZWV6ZU9iamVjdCkpIHtcclxuICAgICAgICBmcmVlemVPYmplY3QgPSBmdW5jdGlvbihvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZyZWV6ZU9iamVjdDtcclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9mcmVlemVPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypnbG9iYWwgZGVmaW5lKi9cclxuZGVmaW5lKFtcclxuICAgICAgICAnLi9kZWZpbmVkJyxcclxuICAgICAgICAnLi9kZWZpbmVQcm9wZXJ0aWVzJ1xyXG4gICAgXSwgZnVuY3Rpb24oXHJcbiAgICAgICAgZGVmaW5lZCxcclxuICAgICAgICBkZWZpbmVQcm9wZXJ0aWVzKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgdmFyIF9zdXBwb3J0c0Z1bGxzY3JlZW47XHJcbiAgICB2YXIgX25hbWVzID0ge1xyXG4gICAgICAgIHJlcXVlc3RGdWxsc2NyZWVuIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIGV4aXRGdWxsc2NyZWVuIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIGZ1bGxzY3JlZW5FbmFibGVkIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIGZ1bGxzY3JlZW5FbGVtZW50IDogdW5kZWZpbmVkLFxyXG4gICAgICAgIGZ1bGxzY3JlZW5jaGFuZ2UgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgZnVsbHNjcmVlbmVycm9yIDogdW5kZWZpbmVkXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3Nlci1pbmRlcGVuZGVudCBmdW5jdGlvbnMgZm9yIHdvcmtpbmcgd2l0aCB0aGUgc3RhbmRhcmQgZnVsbHNjcmVlbiBBUEkuXHJcbiAgICAgKlxyXG4gICAgICogQGV4cG9ydHMgRnVsbHNjcmVlblxyXG4gICAgICpcclxuICAgICAqIEBzZWUge0BsaW5rIGh0dHA6Ly9kdmNzLnczLm9yZy9oZy9mdWxsc2NyZWVuL3Jhdy1maWxlL3RpcC9PdmVydmlldy5odG1sfFczQyBGdWxsc2NyZWVuIExpdmluZyBTcGVjaWZpY2F0aW9ufVxyXG4gICAgICovXHJcbiAgICB2YXIgRnVsbHNjcmVlbiA9IHt9O1xyXG5cclxuICAgIGRlZmluZVByb3BlcnRpZXMoRnVsbHNjcmVlbiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBlbGVtZW50IHRoYXQgaXMgY3VycmVudGx5IGZ1bGxzY3JlZW4sIGlmIGFueS4gIFRvIHNpbXBseSBjaGVjayBpZiB0aGVcclxuICAgICAgICAgKiBicm93c2VyIGlzIGluIGZ1bGxzY3JlZW4gbW9kZSBvciBub3QsIHVzZSB7QGxpbmsgRnVsbHNjcmVlbiNmdWxsc2NyZWVufS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgRnVsbHNjcmVlblxyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICogQHJlYWRvbmx5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZWxlbWVudCA6IHtcclxuICAgICAgICAgICAgZ2V0IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUZ1bGxzY3JlZW4uc3VwcG9ydHNGdWxsc2NyZWVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFtfbmFtZXMuZnVsbHNjcmVlbkVsZW1lbnRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIG5hbWUgb2YgdGhlIGV2ZW50IG9uIHRoZSBkb2N1bWVudCB0aGF0IGlzIGZpcmVkIHdoZW4gZnVsbHNjcmVlbiBpc1xyXG4gICAgICAgICAqIGVudGVyZWQgb3IgZXhpdGVkLiAgVGhpcyBldmVudCBuYW1lIGlzIGludGVuZGVkIGZvciB1c2Ugd2l0aCBhZGRFdmVudExpc3RlbmVyLlxyXG4gICAgICAgICAqIEluIHlvdXIgZXZlbnQgaGFuZGxlciwgdG8gZGV0ZXJtaW5lIGlmIHRoZSBicm93c2VyIGlzIGluIGZ1bGxzY3JlZW4gbW9kZSBvciBub3QsXHJcbiAgICAgICAgICogdXNlIHtAbGluayBGdWxsc2NyZWVuI2Z1bGxzY3JlZW59LlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBGdWxsc2NyZWVuXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKiBAcmVhZG9ubHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBjaGFuZ2VFdmVudE5hbWUgOiB7XHJcbiAgICAgICAgICAgIGdldCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFGdWxsc2NyZWVuLnN1cHBvcnRzRnVsbHNjcmVlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX25hbWVzLmZ1bGxzY3JlZW5jaGFuZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIGEgZnVsbHNjcmVlbiBlcnJvclxyXG4gICAgICAgICAqIG9jY3Vycy4gIFRoaXMgZXZlbnQgbmFtZSBpcyBpbnRlbmRlZCBmb3IgdXNlIHdpdGggYWRkRXZlbnRMaXN0ZW5lci5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgRnVsbHNjcmVlblxyXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICogQHJlYWRvbmx5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXJyb3JFdmVudE5hbWUgOiB7XHJcbiAgICAgICAgICAgIGdldCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFGdWxsc2NyZWVuLnN1cHBvcnRzRnVsbHNjcmVlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX25hbWVzLmZ1bGxzY3JlZW5lcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERldGVybWluZSB3aGV0aGVyIHRoZSBicm93c2VyIHdpbGwgYWxsb3cgYW4gZWxlbWVudCB0byBiZSBtYWRlIGZ1bGxzY3JlZW4sIG9yIG5vdC5cclxuICAgICAgICAgKiBGb3IgZXhhbXBsZSwgYnkgZGVmYXVsdCwgaWZyYW1lcyBjYW5ub3QgZ28gZnVsbHNjcmVlbiB1bmxlc3MgdGhlIGNvbnRhaW5pbmcgcGFnZVxyXG4gICAgICAgICAqIGFkZHMgYW4gXCJhbGxvd2Z1bGxzY3JlZW5cIiBhdHRyaWJ1dGUgKG9yIHByZWZpeGVkIGVxdWl2YWxlbnQpLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBGdWxsc2NyZWVuXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICogQHJlYWRvbmx5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZW5hYmxlZCA6IHtcclxuICAgICAgICAgICAgZ2V0IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUZ1bGxzY3JlZW4uc3VwcG9ydHNGdWxsc2NyZWVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFtfbmFtZXMuZnVsbHNjcmVlbkVuYWJsZWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgYnJvd3NlciBpcyBjdXJyZW50bHkgaW4gZnVsbHNjcmVlbiBtb2RlLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBGdWxsc2NyZWVuXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICogQHJlYWRvbmx5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVsbHNjcmVlbiA6IHtcclxuICAgICAgICAgICAgZ2V0IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUZ1bGxzY3JlZW4uc3VwcG9ydHNGdWxsc2NyZWVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBGdWxsc2NyZWVuLmVsZW1lbnQgIT09IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVjdHMgd2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgc3RhbmRhcmQgZnVsbHNjcmVlbiBBUEkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHRoZSBzdGFuZGFyZCBmdWxsc2NyZWVuIEFQSSxcclxuICAgICAqIDxjb2RlPmZhbHNlPC9jb2RlPiBvdGhlcndpc2UuXHJcbiAgICAgKi9cclxuICAgIEZ1bGxzY3JlZW4uc3VwcG9ydHNGdWxsc2NyZWVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGRlZmluZWQoX3N1cHBvcnRzRnVsbHNjcmVlbikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9zdXBwb3J0c0Z1bGxzY3JlZW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfc3VwcG9ydHNGdWxsc2NyZWVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICBpZiAodHlwZW9mIGJvZHkucmVxdWVzdEZ1bGxzY3JlZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgLy8gZ28gd2l0aCB0aGUgdW5wcmVmaXhlZCwgc3RhbmRhcmQgc2V0IG9mIG5hbWVzXHJcbiAgICAgICAgICAgIF9uYW1lcy5yZXF1ZXN0RnVsbHNjcmVlbiA9ICdyZXF1ZXN0RnVsbHNjcmVlbic7XHJcbiAgICAgICAgICAgIF9uYW1lcy5leGl0RnVsbHNjcmVlbiA9ICdleGl0RnVsbHNjcmVlbic7XHJcbiAgICAgICAgICAgIF9uYW1lcy5mdWxsc2NyZWVuRW5hYmxlZCA9ICdmdWxsc2NyZWVuRW5hYmxlZCc7XHJcbiAgICAgICAgICAgIF9uYW1lcy5mdWxsc2NyZWVuRWxlbWVudCA9ICdmdWxsc2NyZWVuRWxlbWVudCc7XHJcbiAgICAgICAgICAgIF9uYW1lcy5mdWxsc2NyZWVuY2hhbmdlID0gJ2Z1bGxzY3JlZW5jaGFuZ2UnO1xyXG4gICAgICAgICAgICBfbmFtZXMuZnVsbHNjcmVlbmVycm9yID0gJ2Z1bGxzY3JlZW5lcnJvcic7XHJcbiAgICAgICAgICAgIF9zdXBwb3J0c0Z1bGxzY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gX3N1cHBvcnRzRnVsbHNjcmVlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2hlY2sgZm9yIHRoZSBjb3JyZWN0IGNvbWJpbmF0aW9uIG9mIHByZWZpeCBwbHVzIHRoZSB2YXJpb3VzIG5hbWVzIHRoYXQgYnJvd3NlcnMgdXNlXHJcbiAgICAgICAgdmFyIHByZWZpeGVzID0gWyd3ZWJraXQnLCAnbW96JywgJ28nLCAnbXMnLCAna2h0bWwnXTtcclxuICAgICAgICB2YXIgbmFtZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcHJlZml4ZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIHByZWZpeCA9IHByZWZpeGVzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gY2FzaW5nIG9mIEZ1bGxzY3JlZW4gZGlmZmVycyBhY3Jvc3MgYnJvd3NlcnNcclxuICAgICAgICAgICAgbmFtZSA9IHByZWZpeCArICdSZXF1ZXN0RnVsbHNjcmVlbic7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYm9keVtuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgX25hbWVzLnJlcXVlc3RGdWxsc2NyZWVuID0gbmFtZTtcclxuICAgICAgICAgICAgICAgIF9zdXBwb3J0c0Z1bGxzY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHByZWZpeCArICdSZXF1ZXN0RnVsbFNjcmVlbic7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvZHlbbmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBfbmFtZXMucmVxdWVzdEZ1bGxzY3JlZW4gPSBuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIF9zdXBwb3J0c0Z1bGxzY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBkaXNhZ3JlZW1lbnQgYWJvdXQgd2hldGhlciBpdCdzIFwiZXhpdFwiIGFzIHBlciBzcGVjLCBvciBcImNhbmNlbFwiXHJcbiAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnRXhpdEZ1bGxzY3JlZW4nO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50W25hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBfbmFtZXMuZXhpdEZ1bGxzY3JlZW4gPSBuYW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHByZWZpeCArICdDYW5jZWxGdWxsU2NyZWVuJztcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnRbbmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBfbmFtZXMuZXhpdEZ1bGxzY3JlZW4gPSBuYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjYXNpbmcgb2YgRnVsbHNjcmVlbiBkaWZmZXJzIGFjcm9zcyBicm93c2Vyc1xyXG4gICAgICAgICAgICBuYW1lID0gcHJlZml4ICsgJ0Z1bGxzY3JlZW5FbmFibGVkJztcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50W25hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIF9uYW1lcy5mdWxsc2NyZWVuRW5hYmxlZCA9IG5hbWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gcHJlZml4ICsgJ0Z1bGxTY3JlZW5FbmFibGVkJztcclxuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudFtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX25hbWVzLmZ1bGxzY3JlZW5FbmFibGVkID0gbmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY2FzaW5nIG9mIEZ1bGxzY3JlZW4gZGlmZmVycyBhY3Jvc3MgYnJvd3NlcnNcclxuICAgICAgICAgICAgbmFtZSA9IHByZWZpeCArICdGdWxsc2NyZWVuRWxlbWVudCc7XHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudFtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBfbmFtZXMuZnVsbHNjcmVlbkVsZW1lbnQgPSBuYW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHByZWZpeCArICdGdWxsU2NyZWVuRWxlbWVudCc7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnRbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9uYW1lcy5mdWxsc2NyZWVuRWxlbWVudCA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHRoYW5rZnVsbHksIGV2ZW50IG5hbWVzIGFyZSBhbGwgbG93ZXJjYXNlIHBlciBzcGVjXHJcbiAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnZnVsbHNjcmVlbmNoYW5nZSc7XHJcbiAgICAgICAgICAgIC8vIGV2ZW50IG5hbWVzIGRvIG5vdCBoYXZlICdvbicgaW4gdGhlIGZyb250LCBidXQgdGhlIHByb3BlcnR5IG9uIHRoZSBkb2N1bWVudCBkb2VzXHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudFsnb24nICsgbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy9leGNlcHQgb24gSUVcclxuICAgICAgICAgICAgICAgIGlmIChwcmVmaXggPT09ICdtcycpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gJ01TRnVsbHNjcmVlbkNoYW5nZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfbmFtZXMuZnVsbHNjcmVlbmNoYW5nZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnZnVsbHNjcmVlbmVycm9yJztcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50WydvbicgKyBuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvL2V4Y2VwdCBvbiBJRVxyXG4gICAgICAgICAgICAgICAgaWYgKHByZWZpeCA9PT0gJ21zJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAnTVNGdWxsc2NyZWVuRXJyb3InO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX25hbWVzLmZ1bGxzY3JlZW5lcnJvciA9IG5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfc3VwcG9ydHNGdWxsc2NyZWVuO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFzeW5jaHJvbm91c2x5IHJlcXVlc3RzIHRoZSBicm93c2VyIHRvIGVudGVyIGZ1bGxzY3JlZW4gbW9kZSBvbiB0aGUgZ2l2ZW4gZWxlbWVudC5cclxuICAgICAqIElmIGZ1bGxzY3JlZW4gbW9kZSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyLCBkb2VzIG5vdGhpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgVGhlIEhUTUwgZWxlbWVudCB3aGljaCB3aWxsIGJlIHBsYWNlZCBpbnRvIGZ1bGxzY3JlZW4gbW9kZS5cclxuICAgICAqIEBwYXJhbSB7SE1EVlJEZXZpY2V9IFt2ckRldmljZV0gVGhlIFZSIGRldmljZS5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gUHV0IHRoZSBlbnRpcmUgcGFnZSBpbnRvIGZ1bGxzY3JlZW4uXHJcbiAgICAgKiBDZXNpdW0uRnVsbHNjcmVlbi5yZXF1ZXN0RnVsbHNjcmVlbihkb2N1bWVudC5ib2R5KVxyXG4gICAgICpcclxuICAgICAqIC8vIFBsYWNlIG9ubHkgdGhlIENlc2l1bSBjYW52YXMgaW50byBmdWxsc2NyZWVuLlxyXG4gICAgICogQ2VzaXVtLkZ1bGxzY3JlZW4ucmVxdWVzdEZ1bGxzY3JlZW4oc2NlbmUuY2FudmFzKVxyXG4gICAgICovXHJcbiAgICBGdWxsc2NyZWVuLnJlcXVlc3RGdWxsc2NyZWVuID0gZnVuY3Rpb24oZWxlbWVudCwgdnJEZXZpY2UpIHtcclxuICAgICAgICBpZiAoIUZ1bGxzY3JlZW4uc3VwcG9ydHNGdWxsc2NyZWVuKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxlbWVudFtfbmFtZXMucmVxdWVzdEZ1bGxzY3JlZW5dKHsgdnJEaXNwbGF5OiB2ckRldmljZSB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBc3luY2hyb25vdXNseSBleGl0cyBmdWxsc2NyZWVuIG1vZGUuICBJZiB0aGUgYnJvd3NlciBpcyBub3QgY3VycmVudGx5XHJcbiAgICAgKiBpbiBmdWxsc2NyZWVuLCBvciBpZiBmdWxsc2NyZWVuIG1vZGUgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3NlciwgZG9lcyBub3RoaW5nLlxyXG4gICAgICovXHJcbiAgICBGdWxsc2NyZWVuLmV4aXRGdWxsc2NyZWVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCFGdWxsc2NyZWVuLnN1cHBvcnRzRnVsbHNjcmVlbigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50W19uYW1lcy5leGl0RnVsbHNjcmVlbl0oKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIEZ1bGxzY3JlZW47XHJcbn0pO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvRnVsbHNjcmVlbi5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKmdsb2JhbCBkZWZpbmUqL1xyXG5kZWZpbmUoW1xyXG4gICAgICAgICcuL2RlZmluZWQnXHJcbiAgICBdLCBmdW5jdGlvbihcclxuICAgICAgICBkZWZpbmVkKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgdmFyIGRlZmluZVByb3BlcnR5V29ya3MgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuICd4JyBpbiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd4Jywge30pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHByb3BlcnRpZXMgb24gYW4gb2JqZWN0LCB1c2luZyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyBpZiBhdmFpbGFibGUsXHJcbiAgICAgKiBvdGhlcndpc2UgcmV0dXJucyB0aGUgb2JqZWN0IHVuY2hhbmdlZC4gIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIHVzZWQgaW5cclxuICAgICAqIHNldHVwIGNvZGUgdG8gcHJldmVudCBlcnJvcnMgZnJvbSBjb21wbGV0ZWx5IGhhbHRpbmcgSmF2YVNjcmlwdCBleGVjdXRpb25cclxuICAgICAqIGluIGxlZ2FjeSBicm93c2Vycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICpcclxuICAgICAqIEBleHBvcnRzIGRlZmluZVByb3BlcnRpZXNcclxuICAgICAqL1xyXG4gICAgdmFyIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcztcclxuICAgIGlmICghZGVmaW5lUHJvcGVydHlXb3JrcyB8fCAhZGVmaW5lZChkZWZpbmVQcm9wZXJ0aWVzKSkge1xyXG4gICAgICAgIGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbihvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRlZmluZVByb3BlcnRpZXM7XHJcbn0pO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lUHJvcGVydGllcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qZ2xvYmFsIHJlcXVpcmUqL1xuXG52YXIgZGVmYXVsdFZhbHVlID0gcmVxdWlyZSgndGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL2RlZmF1bHRWYWx1ZScpO1xuXG4vKipcclxuICogUmVwcmVzZW50cyBhbiBlcnJvciB0aGF0IG9jY3VycmVkIGluIGEgVGVycmlhSlMgbW9kdWxlLCBlc3BlY2lhbGx5IGFuIGFzeW5jaHJvbm91cyBvbmUgdGhhdCBjYW5ub3QgYmUgcmFpc2VkXHJcbiAqIGJ5IHRocm93aW5nIGFuIGV4Y2VwdGlvbiBiZWNhdXNlIG5vIG9uZSB3b3VsZCBiZSBhYmxlIHRvIGNhdGNoIGl0LlxyXG4gKlxyXG4gKiBAYWxpYXMgVGVycmlhRXJyb3JcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnNlbmRlcl0gVGhlIG9iamVjdCByYWlzaW5nIHRoZSBlcnJvci5cclxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnRpdGxlPSdBbiBlcnJvciBvY2N1cnJlZCddIEEgc2hvcnQgdGl0bGUgZGVzY3JpYmluZyB0aGUgZXJyb3IuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLm1lc3NhZ2UgQSBkZXRhaWxlZCBtZXNzYWdlIGRlc2NyaWJpbmcgdGhlIGVycm9yLiAgVGhpcyBtZXNzYWdlIG1heSBiZSBIVE1MIGFuZCBpdCBzaG91bGQgYmUgc2FuaXRpemVkIGJlZm9yZSBkaXNwbGF5IHRvIHRoZSB1c2VyLlxyXG4gKi9cbnZhciBUZXJyaWFFcnJvciA9IGZ1bmN0aW9uIFRlcnJpYUVycm9yKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IGRlZmF1bHRWYWx1ZShvcHRpb25zLCBkZWZhdWx0VmFsdWUuRU1QVFlfT0JKRUNUKTtcblxuICAvKipcclxuICAgKiBHZXRzIG9yIHNldHMgdGhlIG9iamVjdCB0aGF0IHJhaXNlZCB0aGUgZXJyb3IuXHJcbiAgICogQHR5cGUge09iamVjdH1cclxuICAgKi9cbiAgdGhpcy5zZW5kZXIgPSBvcHRpb25zLnNlbmRlcjtcblxuICAvKipcclxuICAgKiBHZXRzIG9yIHNldHMgYSBzaG9ydCB0aXRsZSBkZXNjcmliaW5nIHRoZSBlcnJvci5cclxuICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAqL1xuICB0aGlzLnRpdGxlID0gZGVmYXVsdFZhbHVlKG9wdGlvbnMudGl0bGUsICdBbiBlcnJvciBvY2N1cnJlZCcpO1xuXG4gIC8qKlxyXG4gICAqIEdldHMgb3Igc2V0cyBhIG1ldGFpbGVkIG1lc3NhZ2UgZGVzY3JpYmluZyB0aGUgZXJyb3IuICBUaGlzIG1lc3NhZ2UgbWF5IGJlIEhUTUwgYW5kIGl0IHNob3VsZCBiZSBzYW5pdGl6ZWQgYmVmb3JlIGRpc3BsYXkgdG8gdGhlIHVzZXIuXHJcbiAgICogQHR5cGUge1N0cmluZ31cclxuICAgKi9cbiAgdGhpcy5tZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlO1xuXG4gIC8qKlxyXG4gICAqIFRydWUgaWYgdGhlIHVzZXIgaGFzIHNlZW4gdGhpcyBlcnJvcjsgb3RoZXJ3aXNlLCBmYWxzZS5cclxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAqL1xuICB0aGlzLnJhaXNlZFRvVXNlciA9IGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXJyaWFFcnJvcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy9saWIvQ29yZS9UZXJyaWFFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIGluZGljZXMgc3VjaCB0aGF0IGFycmF5W2luZGljZXNbaV1dID0gc29ydGVkQXJyYXlbaV0uXHJcbiAqIEVnLiBzb3J0ZWRJbmRpY2VzKFsnYycsICdhJywgJ2InLCAnZCddKSA9PiBbMSwgMiwgMCwgM10uIChUaGUgc29ydGVkIGFycmF5IGlzIFthLCBiLCBjLCBkXSwgYW5kIFwiYVwiIHdhcyBpbiBwb3NpdGlvbiAxLCBcImJcIiBpbiBwb3NpdGlvbiAyLCBldGMuKVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc29ydC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmVGdW5jdGlvbl0gVGhlIHVzdWFsIGNvbXBhcmUgZnVuY3Rpb24sIGVnLiBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhIC0gYiB9LlxyXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIHNvcnRlZCBpbmRpY2VzLCBzdWNoIHRoYXQgYXJyYXlbc29ydGVkSW5kaWNlc1swXV0gPSBzb3J0ZWRBcnJheVswXS5cclxuICovXG5cbmZ1bmN0aW9uIHNvcnRlZEluZGljZXMoYXJyYXksIGNvbXBhcmVGdW5jdGlvbikge1xuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgdmFyIGluZGljZXMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGluZGljZXNbaV0gPSBpO1xuICAgIH1cbiAgICBpZiAoIWNvbXBhcmVGdW5jdGlvbikge1xuICAgICAgICBjb21wYXJlRnVuY3Rpb24gPSBmdW5jdGlvbiBjb21wYXJlRnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpbmRpY2VzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhcnJheVthXSwgYXJyYXlbYl0pO1xuICAgIH0pO1xuICAgIHJldHVybiBpbmRpY2VzO1xufVxuXG4vL1xuLy8gTm90ZTogZm9yIGluZGljZXMgd2hpY2ggZ28gaW4gdGhlIG90aGVyIGRpcmVjdGlvbiwganVzdCB1c2UgaW5kZXhPZiBsaWtlIHRoaXM6XG4vL1xuLy8gaXQoJ2ludmVyc2UgaW5kaWNlcyB3b3JrJywgZnVuY3Rpb24oKSB7XG4vLyAgICAgdmFyIGRhdGEgPSBbJ2MnLCAnYScsICdiJywgJ2QnXTtcbi8vICAgICB2YXIgc29ydGVkID0gZGF0YS5zbGljZSgpLnNvcnQoKTtcbi8vICAgICB2YXIgaW52ZXJzZUluZGljZXMgPSBkYXRhLm1hcChmdW5jdGlvbihkYXR1bSkgeyByZXR1cm4gc29ydGVkLmluZGV4T2YoZGF0dW0pOyB9KTtcbi8vICAgICBleHBlY3QoaW52ZXJzZUluZGljZXMpLnRvRXF1YWwoWzIsIDAsIDEsIDNdKTtcbi8vIH0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gc29ydGVkSW5kaWNlcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90ZXJyaWFqcy9saWIvQ29yZS9zb3J0ZWRJbmRpY2VzLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBOzs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7OztBQ3JRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7O0FDOVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBIiwic291cmNlUm9vdCI6IiJ9