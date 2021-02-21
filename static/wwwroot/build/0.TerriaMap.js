((self || window)["webpackJsonp"] = (self || window)["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/DatePickers.jsx":
/*!******************************************************************************!*\
  !*** ./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/DatePickers.jsx ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dateformat = _interopRequireDefault(__webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js"));

var _defined = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/defined */ "./node_modules/terriajs-cesium/Source/Core/defined.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _DateFormats = __webpack_require__(/*! ../../BottomDock/Timeline/DateFormats */ "./node_modules/terriajs/lib/ReactViews/BottomDock/Timeline/DateFormats.js");

var _DateTimePicker = _interopRequireDefault(__webpack_require__(/*! ../../../ReactViews/BottomDock/Timeline/DateTimePicker.jsx */ "./node_modules/terriajs/lib/ReactViews/BottomDock/Timeline/DateTimePicker.jsx"));

var _Icon = _interopRequireDefault(__webpack_require__(/*! ../../Icon.jsx */ "./node_modules/terriajs/lib/ReactViews/Icon.jsx"));

var _deltaTool = _interopRequireDefault(__webpack_require__(/*! ./delta-tool.scss */ "./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/delta-tool.scss"));

var _reactI18next = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Primary and secondary date pickers for delta tool
 */
function DatePickers(_ref) {
  var item = _ref.item,
      primaryDate = _ref.primaryDate,
      setPrimaryDate = _ref.setPrimaryDate,
      secondaryDate = _ref.secondaryDate,
      setSecondaryDate = _ref.setSecondaryDate,
      t = _ref.t;
  var pickers = [useDatePickerState(), useDatePickerState()]; // Set a pickers state. If the target picker opens, close the other.

  var _setIsOpen = function setIsOpen(pickerId, isOpen) {
    var _ref2 = pickerId === 0 ? pickers : [pickers[1], pickers[0]],
        _ref3 = _slicedToArray(_ref2, 2),
        thisPicker = _ref3[0],
        otherPicker = _ref3[1];

    thisPicker.setIsOpen(isOpen);

    if (isOpen) {
      otherPicker.setIsOpen(false); // close other picker
    }
  };

  var availableDates = item.availableDates;
  var dateFormatting = item.dateFormat && item.dateFormat.currentTime;
  return _react["default"].createElement("div", {
    className: _deltaTool["default"].datePickers
  }, _react["default"].createElement("section", null, _react["default"].createElement("h4", null, t("deltaTool.primaryImage")), _react["default"].createElement("div", {
    title: "Select a time"
  }, _react["default"].createElement(DatePicker, {
    date: primaryDate,
    setDate: setPrimaryDate,
    availableDates: availableDates,
    dateFormatting: dateFormatting,
    isOpen: pickers[0].isOpen,
    setIsOpen: function setIsOpen(isOpen) {
      return _setIsOpen(0, isOpen);
    }
  }))), _react["default"].createElement("section", null, _react["default"].createElement("h4", null, t("deltaTool.secondaryImage")), _react["default"].createElement("div", {
    title: "Select a time"
  }, _react["default"].createElement(DatePicker, {
    date: secondaryDate,
    setDate: setSecondaryDate,
    availableDates: availableDates,
    dateFormatting: dateFormatting,
    isOpen: pickers[1].isOpen,
    setIsOpen: function setIsOpen(isOpen) {
      return _setIsOpen(1, isOpen);
    }
  }))));
}

DatePickers.propTypes = {
  item: _propTypes["default"].object.isRequired,
  primaryDate: _propTypes["default"].object.isRequired,
  setPrimaryDate: _propTypes["default"].func.isRequired,
  secondaryDate: _propTypes["default"].object.isRequired,
  setSecondaryDate: _propTypes["default"].func.isRequired,
  t: _propTypes["default"].func.isRequired
};
/**
 * Delta tool date picker
 */

function DatePicker(_ref4) {
  var date = _ref4.date,
      availableDates = _ref4.availableDates,
      setDate = _ref4.setDate,
      dateFormatting = _ref4.dateFormatting,
      isOpen = _ref4.isOpen,
      setIsOpen = _ref4.setIsOpen;

  var toggleOpen = function toggleOpen(e) {
    setIsOpen(!isOpen);
    e.stopPropagation();
  };

  var formattedDate = (0, _defined["default"])(dateFormatting) ? (0, _dateformat["default"])(date, dateFormatting) : (0, _DateFormats.formatDateTime)(date);

  var _findNextAndPrevDates = findNextAndPrevDates(date, availableDates),
      prevDate = _findNextAndPrevDates.prevDate,
      nextDate = _findNextAndPrevDates.nextDate;

  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    className: _deltaTool["default"].pickerButtons
  }, _react["default"].createElement("button", {
    className: _deltaTool["default"].previousDate,
    title: "Previous time",
    disabled: !(0, _defined["default"])(prevDate),
    onClick: function onClick() {
      return setDate(prevDate);
    }
  }, _react["default"].createElement(_Icon["default"], {
    glyph: _Icon["default"].GLYPHS.previous
  })), _react["default"].createElement("button", {
    className: _deltaTool["default"].currentDate,
    onClick: toggleOpen,
    title: "Select a time"
  }, (0, _defined["default"])(formattedDate) ? formattedDate : "Currently out of range."), _react["default"].createElement("button", {
    className: _deltaTool["default"].nextDate,
    title: "Next time",
    disabled: !(0, _defined["default"])(nextDate),
    onClick: function onClick() {
      return setDate(nextDate);
    }
  }, _react["default"].createElement(_Icon["default"], {
    glyph: _Icon["default"].GLYPHS.next
  }))), _react["default"].createElement("div", {
    className: _deltaTool["default"].picker
  }, _react["default"].createElement(_DateTimePicker["default"], {
    currentDate: date,
    dates: availableDates,
    onChange: setDate,
    popupStyle: _deltaTool["default"].datePickerPopup,
    openDirection: "none",
    isOpen: isOpen,
    showCalendarButton: false,
    onOpen: function onOpen() {
      return setIsOpen(true);
    },
    onClose: function onClose() {
      return setIsOpen(false);
    }
  })));
}

DatePicker.propTypes = {
  date: _propTypes["default"].object.isRequired,
  setDate: _propTypes["default"].func.isRequired,
  availableDates: _propTypes["default"].array.isRequired,
  dateFormatting: _propTypes["default"].string,
  isOpen: _propTypes["default"].bool,
  setIsOpen: _propTypes["default"].func.isRequired
};

function findNextAndPrevDates(date, availableDates) {
  var dateIndex = availableDates.indexOf(date);
  var prevDate = dateIndex > 0 ? availableDates[dateIndex - 1] : undefined;
  var nextDate = dateIndex < availableDates.length - 1 ? availableDates[dateIndex + 1] : undefined;
  return {
    prevDate: prevDate,
    nextDate: nextDate
  };
}

function useDatePickerState() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  return {
    isOpen: isOpen,
    setIsOpen: setIsOpen
  };
}

var _default = (0, _reactI18next.withTranslation)()(DatePickers);

exports["default"] = _default;

/***/ }),

/***/ "./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/DeltaTool.jsx":
/*!****************************************************************************!*\
  !*** ./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/DeltaTool.jsx ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dateformat = _interopRequireDefault(__webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _raiseErrorToUser = _interopRequireDefault(__webpack_require__(/*! ../../../Models/raiseErrorToUser */ "./node_modules/terriajs/lib/Models/raiseErrorToUser.js"));

var _deltaTool = _interopRequireDefault(__webpack_require__(/*! ./delta-tool.scss */ "./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/delta-tool.scss"));

var _DatePickers = _interopRequireDefault(__webpack_require__(/*! ./DatePickers */ "./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/DatePickers.jsx"));

var _LocationPicker = _interopRequireDefault(__webpack_require__(/*! ./LocationPicker */ "./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/LocationPicker.jsx"));

var _duplicateItem = _interopRequireDefault(__webpack_require__(/*! ../../../Models/duplicateItem */ "./node_modules/terriajs/lib/Models/duplicateItem.js"));

var _prettifyCoordinates = _interopRequireDefault(__webpack_require__(/*! ../../../Map/prettifyCoordinates */ "./node_modules/terriajs/lib/Map/prettifyCoordinates.js"));

var _reactI18next = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * A tool for comparing imagery at two points in time.
 */
function DeltaTool(_ref) {
  var terria = _ref.terria,
      tool = _ref.tool,
      onCloseTool = _ref.onCloseTool,
      t = _ref.t;
  var type = tool.type,
      catalogItem = tool.item;

  if (type !== "delta" || !(catalogItem && catalogItem.supportsDeltaComparison)) {
    return null;
  }

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      item = _useState2[0],
      setItem = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      location = _useState4[0],
      setLocation = _useState4[1];

  var _useState5 = (0, _react.useState)(catalogItem.discreteTime),
      _useState6 = _slicedToArray(_useState5, 2),
      primaryDate = _useState6[0],
      setPrimaryDate = _useState6[1];

  var _useState7 = (0, _react.useState)(catalogItem.discreteTime),
      _useState8 = _slicedToArray(_useState7, 2),
      secondaryDate = _useState8[0],
      setSecondaryDate = _useState8[1];

  var _useState9 = (0, _react.useState)({
    beforePick: "Select a point by clicking on the map",
    afterPick: "Click another point to change the selection"
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      pickerMessages = _useState10[0],
      setPickerMessages = _useState10[1];

  (0, _react.useEffect)(function () {
    // On mount; to avoid showing both imageries at once, we temporarily disable the parent catalog item.
    catalogItem.isShown = false;
    return function () {
      // Re-enable on unmount
      catalogItem.isShown = true;
    };
  }, []); // Duplicate the catalog item

  (0, _react.useEffect)(function () {
    var newItem = (0, _duplicateItem["default"])(catalogItem, undefined, catalogItem.name + " (copy)");
    newItem.isEnabled = true;
    newItem.isShown = true;
    newItem.useOwnClock = true;
    setItem(newItem);
  }, [catalogItem]);

  function onUserPickLocation(picked, latLong) {
    // TODO: If the item imagery has not loaded yet, features[] will be empty.
    // Ideally, pick location should be called only after the item imagery has been loaded
    // and we need some way to check that.
    // IE has no array.find() so we use the clunkier for loop to find the feature.
    var feature;

    for (var i = 0; i < picked.features.length; i++) {
      if (picked.features[i].imageryLayer === item.imageryLayer) {
        feature = picked.features[i];
        break;
      }
    }

    if (feature) {
      try {
        item.filterIntervalsByFeature(feature, picked);
        setDatesFromAvailableDates(item.availableDates);
        setLocation(latLong);
        setPickerMessages({
          beforePick: "Click another point to change the selection",
          afterPick: "Click another point to change the selection"
        });
      } catch (e) {
        (0, _raiseErrorToUser["default"])(terria, e);
      }
    } else {
      setPickerMessages({
        beforePick: "Error when trying to resolve imagery at location! Please select a different location or zoom level.",
        afterPick: "Click another point to change the selection"
      });
    }
  }

  function cancelDeltaTool() {
    if (item) item.isEnabled = false;
    onCloseTool();
  }

  function generateDelta() {
    var timestamp = (0, _dateformat["default"])(new Date(), "yyyy-mm-dd'T'HH:MM:ss.l'Z'");
    item.name = "Change Detection: ".concat(catalogItem.name, " ").concat(timestamp);
    item.featureTimesProperty = undefined; // Hide the location filter

    item.clock = undefined; // Make it a non-time-dynamic item

    item.intervals = undefined;
    item.supportsDeltaComparison = false;
    item.disableUserChanges = true; // Hide controls like the style selector

    var firstDateStr = dateDisplayFormat(primaryDate);
    var secondDateStr = dateDisplayFormat(secondaryDate); // Trim lines to prevent <pre> wrapping during markdown conversion

    item.shortReport = trimLines("\n      ".concat(t("deltaTool.catalogItem.description"), "\n\n      **").concat(t("deltaTool.primaryImage"), "**:   ").concat(firstDateStr, "<br/>\n      **").concat(t("deltaTool.secondaryImage"), "**: ").concat(secondDateStr, "\n    ")); // item.loadingMessage = "Loading difference map";
    // item.isLoading = true;

    var firstDateParam = dateParamFormat(primaryDate);
    var secondDateParam = dateParamFormat(secondaryDate);
    item.parameters["time"] = "".concat(firstDateParam, ",").concat(secondDateParam);
    item.showDeltaImagery(firstDateParam, secondDateParam);
    onCloseTool();
  } // Set primary & secondary dates to the last 2 available dates


  function setDatesFromAvailableDates(availableDates) {
    var _availableDates$slice = availableDates.slice(availableDates.length - 2),
        _availableDates$slice2 = _slicedToArray(_availableDates$slice, 2),
        primaryDate = _availableDates$slice2[0],
        secondaryDate = _availableDates$slice2[1];

    if (primaryDate) {
      setPrimaryDate(primaryDate);
      setSecondaryDate(secondaryDate || primaryDate);
    }
  }

  return _react["default"].createElement("div", {
    className: _deltaTool["default"].deltaTool
  }, _react["default"].createElement("h1", {
    className: _deltaTool["default"].title
  }, t("deltaTool.titlePrefix"), ": ", catalogItem.name), _react["default"].createElement("div", {
    className: _deltaTool["default"].body
  }, _react["default"].createElement("div", null, _react["default"].createElement("span", null, t("deltaTool.description")), location && _react["default"].createElement(PrettyLocation, {
    location: location
  }), location === undefined ? _react["default"].createElement("h3", null, t("deltaTool.pickLocation")) : _react["default"].createElement(_DatePickers["default"], {
    item: item,
    primaryDate: primaryDate,
    setPrimaryDate: setPrimaryDate,
    secondaryDate: secondaryDate,
    setSecondaryDate: setSecondaryDate
  })), _react["default"].createElement("div", {
    className: _deltaTool["default"].buttons
  }, _react["default"].createElement("button", {
    className: _deltaTool["default"].cancelBtn,
    onClick: cancelDeltaTool
  }, t("deltaTool.cancelBtn")), _react["default"].createElement("button", {
    className: _deltaTool["default"].generateDeltaBtn,
    onClick: generateDelta,
    disabled: location === undefined
  }, t("deltaTool.generateDeltaBtn")))), _react["default"].createElement(_LocationPicker["default"], {
    terria: terria,
    location: location,
    onPick: onUserPickLocation,
    messages: pickerMessages
  }));
}

DeltaTool.propTypes = {
  terria: _propTypes["default"].object.isRequired,
  tool: _propTypes["default"].object.isRequired,
  onCloseTool: _propTypes["default"].func.isRequired,
  t: _propTypes["default"].func.isRequired
};
DeltaTool.displayName = "DeltaTool";

function PrettyLocation(_ref2) {
  var location = _ref2.location;

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var prettyLocation = (0, _prettifyCoordinates["default"])(location.longitude, location.latitude);
  return _react["default"].createElement("section", null, _react["default"].createElement("h4", null, t("deltaTool.selectedLocation")), _react["default"].createElement("div", {
    className: _deltaTool["default"].location
  }, prettyLocation.latitude, ", ", prettyLocation.longitude));
}

PrettyLocation.propTypes = {
  location: _propTypes["default"].object.isRequired
};
PrettyLocation.displayName = "PrettyLocation";

function trimLines(text) {
  return text.split("\n").map(function (ln) {
    return ln.trim();
  }).join("\n");
}

function dateParamFormat(date) {
  return (0, _dateformat["default"])(date, "yyyy-mm-dd'T'HH:MM:ss.l'Z'", true);
}

function dateDisplayFormat(date) {
  return (0, _dateformat["default"])(date, "dd-mm-yyyy", true);
}

var _default = (0, _reactI18next.withTranslation)()(DeltaTool);

exports["default"] = _default;

/***/ }),

/***/ "./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/LocationPicker.jsx":
/*!*********************************************************************************!*\
  !*** ./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/LocationPicker.jsx ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _Ellipsoid = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/Ellipsoid */ "./node_modules/terriajs-cesium/Source/Core/Ellipsoid.js"));

var _Math = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/Math */ "./node_modules/terriajs-cesium/Source/Core/Math.js"));

var _knockout = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/ThirdParty/knockout */ "./node_modules/terriajs-cesium/Source/ThirdParty/knockout.js"));

var _LocationMarkerUtils = __webpack_require__(/*! ../../../Models/LocationMarkerUtils.js */ "./node_modules/terriajs/lib/Models/LocationMarkerUtils.js");

var _MapInteractionMode = _interopRequireDefault(__webpack_require__(/*! ../../../Models/MapInteractionMode */ "./node_modules/terriajs/lib/Models/MapInteractionMode.js"));

var _Loader = _interopRequireDefault(__webpack_require__(/*! ../../Loader */ "./node_modules/terriajs/lib/ReactViews/Loader.jsx"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Allows user to pick a point on the map
 */
function LocationPicker(_ref) {
  var terria = _ref.terria,
      messages = _ref.messages,
      location = _ref.location,
      onPick = _ref.onPick;
  (0, _react.useEffect)(function () {
    var currentPick;
    var pickPointMode = new _MapInteractionMode["default"]({
      message: messages.beforePick
    });
    terria.mapInteractionModeStack.push(pickPointMode);
    showMarker(location);

    var subscription = _knockout["default"].getObservable(pickPointMode, "pickedFeatures").subscribe(function (thisPick) {
      currentPick = thisPick;

      pickPointMode.customUi =
      /* eslint-disable-line react/display-name */
      function () {
        return _react["default"].createElement(_Loader["default"], {
          message: "Querying ".concat(location ? "new" : "", " position...")
        });
      };

      pickPointMode.message = function () {
        return messages.afterPick;
      };

      var position = cartesianToDegrees(thisPick.pickPosition);
      showMarker(position);
      currentPick.allFeaturesAvailablePromise.then(function () {
        if (currentPick === thisPick) {
          onPick(thisPick, position);
        }
      });
    });

    return function () {
      // disposer
      currentPick = undefined;
      subscription.dispose();
      stopInteractionMode(pickPointMode);
      (0, _LocationMarkerUtils.removeMarker)(terria);
    };
  });

  var showMarker = function showMarker(location) {
    if (location) {
      (0, _LocationMarkerUtils.addMarker)(terria, {
        name: "User selection",
        location: location
      });
    }
  };

  var stopInteractionMode = function stopInteractionMode(pickPointMode) {
    var _terria$mapInteractio = terria.mapInteractionModeStack.slice(-1),
        _terria$mapInteractio2 = _slicedToArray(_terria$mapInteractio, 1),
        currentMode = _terria$mapInteractio2[0];

    if (currentMode === pickPointMode) {
      terria.mapInteractionModeStack.pop();
    }
  };

  return null;
}

LocationPicker.propTypes = {
  terria: _propTypes["default"].object.isRequired,
  messages: _propTypes["default"].object.isRequired,
  location: _propTypes["default"].object,
  onPick: _propTypes["default"].func.isRequired
};
LocationPicker.displayName = "LocationPicker";

function cartesianToDegrees(cartesian) {
  var carto = _Ellipsoid["default"].WGS84.cartesianToCartographic(cartesian);

  return {
    longitude: _Math["default"].toDegrees(carto.longitude),
    latitude: _Math["default"].toDegrees(carto.latitude)
  };
}

var _default = LocationPicker;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/delta-tool.scss":
/*!******************************************************************************!*\
  !*** ./node_modules/terriajs/lib/ReactViews/Tools/DeltaTool/delta-tool.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"deltaTool":"tjs-delta-tool__deltaTool tjs-tool-panel__tool","title":"tjs-delta-tool__title","body":"tjs-delta-tool__body","buttons":"tjs-delta-tool__buttons","cancelBtn":"tjs-delta-tool__cancelBtn tjs-_buttons__btn-grey","generateDeltaBtn":"tjs-delta-tool__generateDeltaBtn tjs-_buttons__btn tjs-_buttons__btn-primary","location":"tjs-delta-tool__location","datePickers":"tjs-delta-tool__datePickers","pickerButtons":"tjs-delta-tool__pickerButtons","currentDate":"tjs-delta-tool__currentDate tjs-_buttons__btn","previousDate":"tjs-delta-tool__previousDate tjs-_buttons__btn","nextDate":"tjs-delta-tool__nextDate tjs-_buttons__btn","picker":"tjs-delta-tool__picker","datePickerPopup":"tjs-delta-tool__datePickerPopup"};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5UZXJyaWFNYXAuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL1JlYWN0Vmlld3MvVG9vbHMvRGVsdGFUb29sL0RhdGVQaWNrZXJzLmpzeCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL1JlYWN0Vmlld3MvVG9vbHMvRGVsdGFUb29sL0RlbHRhVG9vbC5qc3giLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzL2xpYi9SZWFjdFZpZXdzL1Rvb2xzL0RlbHRhVG9vbC9Mb2NhdGlvblBpY2tlci5qc3giLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzL2xpYi9SZWFjdFZpZXdzL1Rvb2xzL0RlbHRhVG9vbC9kZWx0YS10b29sLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9kYXRlZm9ybWF0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiZGF0ZWZvcm1hdFwiKSk7XG5cbnZhciBfZGVmaW5lZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInRlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9kZWZpbmVkXCIpKTtcblxudmFyIF9wcm9wVHlwZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpKTtcblxudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cbnZhciBfRGF0ZUZvcm1hdHMgPSByZXF1aXJlKFwiLi4vLi4vQm90dG9tRG9jay9UaW1lbGluZS9EYXRlRm9ybWF0c1wiKTtcblxudmFyIF9EYXRlVGltZVBpY2tlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uLy4uL1JlYWN0Vmlld3MvQm90dG9tRG9jay9UaW1lbGluZS9EYXRlVGltZVBpY2tlci5qc3hcIikpO1xuXG52YXIgX0ljb24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9JY29uLmpzeFwiKSk7XG5cbnZhciBfZGVsdGFUb29sID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9kZWx0YS10b29sLnNjc3NcIikpO1xuXG52YXIgX3JlYWN0STE4bmV4dCA9IHJlcXVpcmUoXCJyZWFjdC1pMThuZXh0XCIpO1xuXG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7IGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDsgdmFyIGNhY2hlID0gbmV3IFdlYWtNYXAoKTsgX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkgeyByZXR1cm4gY2FjaGU7IH07IHJldHVybiBjYWNoZTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGlmIChvYmogPT09IG51bGwgfHwgX3R5cGVvZihvYmopICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikgeyByZXR1cm4geyBcImRlZmF1bHRcIjogb2JqIH07IH0gdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCk7IGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkgeyByZXR1cm4gY2FjaGUuZ2V0KG9iaik7IH0gdmFyIG5ld09iaiA9IHt9OyB2YXIgaGFzUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHsgdmFyIGRlc2MgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IG51bGw7IGlmIChkZXNjICYmIChkZXNjLmdldCB8fCBkZXNjLnNldCkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTsgfSBlbHNlIHsgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IH0gbmV3T2JqW1wiZGVmYXVsdFwiXSA9IG9iajsgaWYgKGNhY2hlKSB7IGNhY2hlLnNldChvYmosIG5ld09iaik7IH0gcmV0dXJuIG5ld09iajsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAoIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpKSB7IHJldHVybjsgfSB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qKlxuICogUHJpbWFyeSBhbmQgc2Vjb25kYXJ5IGRhdGUgcGlja2VycyBmb3IgZGVsdGEgdG9vbFxuICovXG5mdW5jdGlvbiBEYXRlUGlja2VycyhfcmVmKSB7XG4gIHZhciBpdGVtID0gX3JlZi5pdGVtLFxuICAgICAgcHJpbWFyeURhdGUgPSBfcmVmLnByaW1hcnlEYXRlLFxuICAgICAgc2V0UHJpbWFyeURhdGUgPSBfcmVmLnNldFByaW1hcnlEYXRlLFxuICAgICAgc2Vjb25kYXJ5RGF0ZSA9IF9yZWYuc2Vjb25kYXJ5RGF0ZSxcbiAgICAgIHNldFNlY29uZGFyeURhdGUgPSBfcmVmLnNldFNlY29uZGFyeURhdGUsXG4gICAgICB0ID0gX3JlZi50O1xuICB2YXIgcGlja2VycyA9IFt1c2VEYXRlUGlja2VyU3RhdGUoKSwgdXNlRGF0ZVBpY2tlclN0YXRlKCldOyAvLyBTZXQgYSBwaWNrZXJzIHN0YXRlLiBJZiB0aGUgdGFyZ2V0IHBpY2tlciBvcGVucywgY2xvc2UgdGhlIG90aGVyLlxuXG4gIHZhciBfc2V0SXNPcGVuID0gZnVuY3Rpb24gc2V0SXNPcGVuKHBpY2tlcklkLCBpc09wZW4pIHtcbiAgICB2YXIgX3JlZjIgPSBwaWNrZXJJZCA9PT0gMCA/IHBpY2tlcnMgOiBbcGlja2Vyc1sxXSwgcGlja2Vyc1swXV0sXG4gICAgICAgIF9yZWYzID0gX3NsaWNlZFRvQXJyYXkoX3JlZjIsIDIpLFxuICAgICAgICB0aGlzUGlja2VyID0gX3JlZjNbMF0sXG4gICAgICAgIG90aGVyUGlja2VyID0gX3JlZjNbMV07XG5cbiAgICB0aGlzUGlja2VyLnNldElzT3Blbihpc09wZW4pO1xuXG4gICAgaWYgKGlzT3Blbikge1xuICAgICAgb3RoZXJQaWNrZXIuc2V0SXNPcGVuKGZhbHNlKTsgLy8gY2xvc2Ugb3RoZXIgcGlja2VyXG4gICAgfVxuICB9O1xuXG4gIHZhciBhdmFpbGFibGVEYXRlcyA9IGl0ZW0uYXZhaWxhYmxlRGF0ZXM7XG4gIHZhciBkYXRlRm9ybWF0dGluZyA9IGl0ZW0uZGF0ZUZvcm1hdCAmJiBpdGVtLmRhdGVGb3JtYXQuY3VycmVudFRpbWU7XG4gIHJldHVybiBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogX2RlbHRhVG9vbFtcImRlZmF1bHRcIl0uZGF0ZVBpY2tlcnNcbiAgfSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBudWxsLCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJoNFwiLCBudWxsLCB0KFwiZGVsdGFUb29sLnByaW1hcnlJbWFnZVwiKSksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgdGl0bGU6IFwiU2VsZWN0IGEgdGltZVwiXG4gIH0sIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChEYXRlUGlja2VyLCB7XG4gICAgZGF0ZTogcHJpbWFyeURhdGUsXG4gICAgc2V0RGF0ZTogc2V0UHJpbWFyeURhdGUsXG4gICAgYXZhaWxhYmxlRGF0ZXM6IGF2YWlsYWJsZURhdGVzLFxuICAgIGRhdGVGb3JtYXR0aW5nOiBkYXRlRm9ybWF0dGluZyxcbiAgICBpc09wZW46IHBpY2tlcnNbMF0uaXNPcGVuLFxuICAgIHNldElzT3BlbjogZnVuY3Rpb24gc2V0SXNPcGVuKGlzT3Blbikge1xuICAgICAgcmV0dXJuIF9zZXRJc09wZW4oMCwgaXNPcGVuKTtcbiAgICB9XG4gIH0pKSksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgbnVsbCwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiaDRcIiwgbnVsbCwgdChcImRlbHRhVG9vbC5zZWNvbmRhcnlJbWFnZVwiKSksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgdGl0bGU6IFwiU2VsZWN0IGEgdGltZVwiXG4gIH0sIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChEYXRlUGlja2VyLCB7XG4gICAgZGF0ZTogc2Vjb25kYXJ5RGF0ZSxcbiAgICBzZXREYXRlOiBzZXRTZWNvbmRhcnlEYXRlLFxuICAgIGF2YWlsYWJsZURhdGVzOiBhdmFpbGFibGVEYXRlcyxcbiAgICBkYXRlRm9ybWF0dGluZzogZGF0ZUZvcm1hdHRpbmcsXG4gICAgaXNPcGVuOiBwaWNrZXJzWzFdLmlzT3BlbixcbiAgICBzZXRJc09wZW46IGZ1bmN0aW9uIHNldElzT3Blbihpc09wZW4pIHtcbiAgICAgIHJldHVybiBfc2V0SXNPcGVuKDEsIGlzT3Blbik7XG4gICAgfVxuICB9KSkpKTtcbn1cblxuRGF0ZVBpY2tlcnMucHJvcFR5cGVzID0ge1xuICBpdGVtOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5vYmplY3QuaXNSZXF1aXJlZCxcbiAgcHJpbWFyeURhdGU6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm9iamVjdC5pc1JlcXVpcmVkLFxuICBzZXRQcmltYXJ5RGF0ZTogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uZnVuYy5pc1JlcXVpcmVkLFxuICBzZWNvbmRhcnlEYXRlOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5vYmplY3QuaXNSZXF1aXJlZCxcbiAgc2V0U2Vjb25kYXJ5RGF0ZTogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uZnVuYy5pc1JlcXVpcmVkLFxuICB0OiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5mdW5jLmlzUmVxdWlyZWRcbn07XG4vKipcbiAqIERlbHRhIHRvb2wgZGF0ZSBwaWNrZXJcbiAqL1xuXG5mdW5jdGlvbiBEYXRlUGlja2VyKF9yZWY0KSB7XG4gIHZhciBkYXRlID0gX3JlZjQuZGF0ZSxcbiAgICAgIGF2YWlsYWJsZURhdGVzID0gX3JlZjQuYXZhaWxhYmxlRGF0ZXMsXG4gICAgICBzZXREYXRlID0gX3JlZjQuc2V0RGF0ZSxcbiAgICAgIGRhdGVGb3JtYXR0aW5nID0gX3JlZjQuZGF0ZUZvcm1hdHRpbmcsXG4gICAgICBpc09wZW4gPSBfcmVmNC5pc09wZW4sXG4gICAgICBzZXRJc09wZW4gPSBfcmVmNC5zZXRJc09wZW47XG5cbiAgdmFyIHRvZ2dsZU9wZW4gPSBmdW5jdGlvbiB0b2dnbGVPcGVuKGUpIHtcbiAgICBzZXRJc09wZW4oIWlzT3Blbik7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICB2YXIgZm9ybWF0dGVkRGF0ZSA9ICgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKGRhdGVGb3JtYXR0aW5nKSA/ICgwLCBfZGF0ZWZvcm1hdFtcImRlZmF1bHRcIl0pKGRhdGUsIGRhdGVGb3JtYXR0aW5nKSA6ICgwLCBfRGF0ZUZvcm1hdHMuZm9ybWF0RGF0ZVRpbWUpKGRhdGUpO1xuXG4gIHZhciBfZmluZE5leHRBbmRQcmV2RGF0ZXMgPSBmaW5kTmV4dEFuZFByZXZEYXRlcyhkYXRlLCBhdmFpbGFibGVEYXRlcyksXG4gICAgICBwcmV2RGF0ZSA9IF9maW5kTmV4dEFuZFByZXZEYXRlcy5wcmV2RGF0ZSxcbiAgICAgIG5leHREYXRlID0gX2ZpbmROZXh0QW5kUHJldkRhdGVzLm5leHREYXRlO1xuXG4gIHJldHVybiBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IF9kZWx0YVRvb2xbXCJkZWZhdWx0XCJdLnBpY2tlckJ1dHRvbnNcbiAgfSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcbiAgICBjbGFzc05hbWU6IF9kZWx0YVRvb2xbXCJkZWZhdWx0XCJdLnByZXZpb3VzRGF0ZSxcbiAgICB0aXRsZTogXCJQcmV2aW91cyB0aW1lXCIsXG4gICAgZGlzYWJsZWQ6ICEoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKShwcmV2RGF0ZSksXG4gICAgb25DbGljazogZnVuY3Rpb24gb25DbGljaygpIHtcbiAgICAgIHJldHVybiBzZXREYXRlKHByZXZEYXRlKTtcbiAgICB9XG4gIH0sIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfSWNvbltcImRlZmF1bHRcIl0sIHtcbiAgICBnbHlwaDogX0ljb25bXCJkZWZhdWx0XCJdLkdMWVBIUy5wcmV2aW91c1xuICB9KSksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XG4gICAgY2xhc3NOYW1lOiBfZGVsdGFUb29sW1wiZGVmYXVsdFwiXS5jdXJyZW50RGF0ZSxcbiAgICBvbkNsaWNrOiB0b2dnbGVPcGVuLFxuICAgIHRpdGxlOiBcIlNlbGVjdCBhIHRpbWVcIlxuICB9LCAoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKShmb3JtYXR0ZWREYXRlKSA/IGZvcm1hdHRlZERhdGUgOiBcIkN1cnJlbnRseSBvdXQgb2YgcmFuZ2UuXCIpLCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xuICAgIGNsYXNzTmFtZTogX2RlbHRhVG9vbFtcImRlZmF1bHRcIl0ubmV4dERhdGUsXG4gICAgdGl0bGU6IFwiTmV4dCB0aW1lXCIsXG4gICAgZGlzYWJsZWQ6ICEoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKShuZXh0RGF0ZSksXG4gICAgb25DbGljazogZnVuY3Rpb24gb25DbGljaygpIHtcbiAgICAgIHJldHVybiBzZXREYXRlKG5leHREYXRlKTtcbiAgICB9XG4gIH0sIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfSWNvbltcImRlZmF1bHRcIl0sIHtcbiAgICBnbHlwaDogX0ljb25bXCJkZWZhdWx0XCJdLkdMWVBIUy5uZXh0XG4gIH0pKSksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBfZGVsdGFUb29sW1wiZGVmYXVsdFwiXS5waWNrZXJcbiAgfSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9EYXRlVGltZVBpY2tlcltcImRlZmF1bHRcIl0sIHtcbiAgICBjdXJyZW50RGF0ZTogZGF0ZSxcbiAgICBkYXRlczogYXZhaWxhYmxlRGF0ZXMsXG4gICAgb25DaGFuZ2U6IHNldERhdGUsXG4gICAgcG9wdXBTdHlsZTogX2RlbHRhVG9vbFtcImRlZmF1bHRcIl0uZGF0ZVBpY2tlclBvcHVwLFxuICAgIG9wZW5EaXJlY3Rpb246IFwibm9uZVwiLFxuICAgIGlzT3BlbjogaXNPcGVuLFxuICAgIHNob3dDYWxlbmRhckJ1dHRvbjogZmFsc2UsXG4gICAgb25PcGVuOiBmdW5jdGlvbiBvbk9wZW4oKSB7XG4gICAgICByZXR1cm4gc2V0SXNPcGVuKHRydWUpO1xuICAgIH0sXG4gICAgb25DbG9zZTogZnVuY3Rpb24gb25DbG9zZSgpIHtcbiAgICAgIHJldHVybiBzZXRJc09wZW4oZmFsc2UpO1xuICAgIH1cbiAgfSkpKTtcbn1cblxuRGF0ZVBpY2tlci5wcm9wVHlwZXMgPSB7XG4gIGRhdGU6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm9iamVjdC5pc1JlcXVpcmVkLFxuICBzZXREYXRlOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5mdW5jLmlzUmVxdWlyZWQsXG4gIGF2YWlsYWJsZURhdGVzOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5hcnJheS5pc1JlcXVpcmVkLFxuICBkYXRlRm9ybWF0dGluZzogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uc3RyaW5nLFxuICBpc09wZW46IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmJvb2wsXG4gIHNldElzT3BlbjogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5mdW5jdGlvbiBmaW5kTmV4dEFuZFByZXZEYXRlcyhkYXRlLCBhdmFpbGFibGVEYXRlcykge1xuICB2YXIgZGF0ZUluZGV4ID0gYXZhaWxhYmxlRGF0ZXMuaW5kZXhPZihkYXRlKTtcbiAgdmFyIHByZXZEYXRlID0gZGF0ZUluZGV4ID4gMCA/IGF2YWlsYWJsZURhdGVzW2RhdGVJbmRleCAtIDFdIDogdW5kZWZpbmVkO1xuICB2YXIgbmV4dERhdGUgPSBkYXRlSW5kZXggPCBhdmFpbGFibGVEYXRlcy5sZW5ndGggLSAxID8gYXZhaWxhYmxlRGF0ZXNbZGF0ZUluZGV4ICsgMV0gOiB1bmRlZmluZWQ7XG4gIHJldHVybiB7XG4gICAgcHJldkRhdGU6IHByZXZEYXRlLFxuICAgIG5leHREYXRlOiBuZXh0RGF0ZVxuICB9O1xufVxuXG5mdW5jdGlvbiB1c2VEYXRlUGlja2VyU3RhdGUoKSB7XG4gIHZhciBfdXNlU3RhdGUgPSAoMCwgX3JlYWN0LnVzZVN0YXRlKShmYWxzZSksXG4gICAgICBfdXNlU3RhdGUyID0gX3NsaWNlZFRvQXJyYXkoX3VzZVN0YXRlLCAyKSxcbiAgICAgIGlzT3BlbiA9IF91c2VTdGF0ZTJbMF0sXG4gICAgICBzZXRJc09wZW4gPSBfdXNlU3RhdGUyWzFdO1xuXG4gIHJldHVybiB7XG4gICAgaXNPcGVuOiBpc09wZW4sXG4gICAgc2V0SXNPcGVuOiBzZXRJc09wZW5cbiAgfTtcbn1cblxudmFyIF9kZWZhdWx0ID0gKDAsIF9yZWFjdEkxOG5leHQud2l0aFRyYW5zbGF0aW9uKSgpKERhdGVQaWNrZXJzKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2RhdGVmb3JtYXQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJkYXRlZm9ybWF0XCIpKTtcblxudmFyIF9wcm9wVHlwZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpKTtcblxudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cbnZhciBfcmFpc2VFcnJvclRvVXNlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uLy4uL01vZGVscy9yYWlzZUVycm9yVG9Vc2VyXCIpKTtcblxudmFyIF9kZWx0YVRvb2wgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2RlbHRhLXRvb2wuc2Nzc1wiKSk7XG5cbnZhciBfRGF0ZVBpY2tlcnMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL0RhdGVQaWNrZXJzXCIpKTtcblxudmFyIF9Mb2NhdGlvblBpY2tlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vTG9jYXRpb25QaWNrZXJcIikpO1xuXG52YXIgX2R1cGxpY2F0ZUl0ZW0gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi8uLi9Nb2RlbHMvZHVwbGljYXRlSXRlbVwiKSk7XG5cbnZhciBfcHJldHRpZnlDb29yZGluYXRlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uLy4uL01hcC9wcmV0dGlmeUNvb3JkaW5hdGVzXCIpKTtcblxudmFyIF9yZWFjdEkxOG5leHQgPSByZXF1aXJlKFwicmVhY3QtaTE4bmV4dFwiKTtcblxuZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkgeyBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7IHZhciBjYWNoZSA9IG5ldyBXZWFrTWFwKCk7IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSA9IGZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpIHsgcmV0dXJuIGNhY2hlOyB9OyByZXR1cm4gY2FjaGU7IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBpZiAob2JqID09PSBudWxsIHx8IF90eXBlb2Yob2JqKSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqICE9PSBcImZ1bmN0aW9uXCIpIHsgcmV0dXJuIHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9IHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpOyBpZiAoY2FjaGUgJiYgY2FjaGUuaGFzKG9iaikpIHsgcmV0dXJuIGNhY2hlLmdldChvYmopOyB9IHZhciBuZXdPYmogPSB7fTsgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsOyBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IG5ld09ialtcImRlZmF1bHRcIl0gPSBvYmo7IGlmIChjYWNoZSkgeyBjYWNoZS5zZXQob2JqLCBuZXdPYmopOyB9IHJldHVybiBuZXdPYmo7IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKCEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSkgeyByZXR1cm47IH0gdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcbiAqIEEgdG9vbCBmb3IgY29tcGFyaW5nIGltYWdlcnkgYXQgdHdvIHBvaW50cyBpbiB0aW1lLlxuICovXG5mdW5jdGlvbiBEZWx0YVRvb2woX3JlZikge1xuICB2YXIgdGVycmlhID0gX3JlZi50ZXJyaWEsXG4gICAgICB0b29sID0gX3JlZi50b29sLFxuICAgICAgb25DbG9zZVRvb2wgPSBfcmVmLm9uQ2xvc2VUb29sLFxuICAgICAgdCA9IF9yZWYudDtcbiAgdmFyIHR5cGUgPSB0b29sLnR5cGUsXG4gICAgICBjYXRhbG9nSXRlbSA9IHRvb2wuaXRlbTtcblxuICBpZiAodHlwZSAhPT0gXCJkZWx0YVwiIHx8ICEoY2F0YWxvZ0l0ZW0gJiYgY2F0YWxvZ0l0ZW0uc3VwcG9ydHNEZWx0YUNvbXBhcmlzb24pKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgX3VzZVN0YXRlID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkodW5kZWZpbmVkKSxcbiAgICAgIF91c2VTdGF0ZTIgPSBfc2xpY2VkVG9BcnJheShfdXNlU3RhdGUsIDIpLFxuICAgICAgaXRlbSA9IF91c2VTdGF0ZTJbMF0sXG4gICAgICBzZXRJdGVtID0gX3VzZVN0YXRlMlsxXTtcblxuICB2YXIgX3VzZVN0YXRlMyA9ICgwLCBfcmVhY3QudXNlU3RhdGUpKHVuZGVmaW5lZCksXG4gICAgICBfdXNlU3RhdGU0ID0gX3NsaWNlZFRvQXJyYXkoX3VzZVN0YXRlMywgMiksXG4gICAgICBsb2NhdGlvbiA9IF91c2VTdGF0ZTRbMF0sXG4gICAgICBzZXRMb2NhdGlvbiA9IF91c2VTdGF0ZTRbMV07XG5cbiAgdmFyIF91c2VTdGF0ZTUgPSAoMCwgX3JlYWN0LnVzZVN0YXRlKShjYXRhbG9nSXRlbS5kaXNjcmV0ZVRpbWUpLFxuICAgICAgX3VzZVN0YXRlNiA9IF9zbGljZWRUb0FycmF5KF91c2VTdGF0ZTUsIDIpLFxuICAgICAgcHJpbWFyeURhdGUgPSBfdXNlU3RhdGU2WzBdLFxuICAgICAgc2V0UHJpbWFyeURhdGUgPSBfdXNlU3RhdGU2WzFdO1xuXG4gIHZhciBfdXNlU3RhdGU3ID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkoY2F0YWxvZ0l0ZW0uZGlzY3JldGVUaW1lKSxcbiAgICAgIF91c2VTdGF0ZTggPSBfc2xpY2VkVG9BcnJheShfdXNlU3RhdGU3LCAyKSxcbiAgICAgIHNlY29uZGFyeURhdGUgPSBfdXNlU3RhdGU4WzBdLFxuICAgICAgc2V0U2Vjb25kYXJ5RGF0ZSA9IF91c2VTdGF0ZThbMV07XG5cbiAgdmFyIF91c2VTdGF0ZTkgPSAoMCwgX3JlYWN0LnVzZVN0YXRlKSh7XG4gICAgYmVmb3JlUGljazogXCJTZWxlY3QgYSBwb2ludCBieSBjbGlja2luZyBvbiB0aGUgbWFwXCIsXG4gICAgYWZ0ZXJQaWNrOiBcIkNsaWNrIGFub3RoZXIgcG9pbnQgdG8gY2hhbmdlIHRoZSBzZWxlY3Rpb25cIlxuICB9KSxcbiAgICAgIF91c2VTdGF0ZTEwID0gX3NsaWNlZFRvQXJyYXkoX3VzZVN0YXRlOSwgMiksXG4gICAgICBwaWNrZXJNZXNzYWdlcyA9IF91c2VTdGF0ZTEwWzBdLFxuICAgICAgc2V0UGlja2VyTWVzc2FnZXMgPSBfdXNlU3RhdGUxMFsxXTtcblxuICAoMCwgX3JlYWN0LnVzZUVmZmVjdCkoZnVuY3Rpb24gKCkge1xuICAgIC8vIE9uIG1vdW50OyB0byBhdm9pZCBzaG93aW5nIGJvdGggaW1hZ2VyaWVzIGF0IG9uY2UsIHdlIHRlbXBvcmFyaWx5IGRpc2FibGUgdGhlIHBhcmVudCBjYXRhbG9nIGl0ZW0uXG4gICAgY2F0YWxvZ0l0ZW0uaXNTaG93biA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBSZS1lbmFibGUgb24gdW5tb3VudFxuICAgICAgY2F0YWxvZ0l0ZW0uaXNTaG93biA9IHRydWU7XG4gICAgfTtcbiAgfSwgW10pOyAvLyBEdXBsaWNhdGUgdGhlIGNhdGFsb2cgaXRlbVxuXG4gICgwLCBfcmVhY3QudXNlRWZmZWN0KShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG5ld0l0ZW0gPSAoMCwgX2R1cGxpY2F0ZUl0ZW1bXCJkZWZhdWx0XCJdKShjYXRhbG9nSXRlbSwgdW5kZWZpbmVkLCBjYXRhbG9nSXRlbS5uYW1lICsgXCIgKGNvcHkpXCIpO1xuICAgIG5ld0l0ZW0uaXNFbmFibGVkID0gdHJ1ZTtcbiAgICBuZXdJdGVtLmlzU2hvd24gPSB0cnVlO1xuICAgIG5ld0l0ZW0udXNlT3duQ2xvY2sgPSB0cnVlO1xuICAgIHNldEl0ZW0obmV3SXRlbSk7XG4gIH0sIFtjYXRhbG9nSXRlbV0pO1xuXG4gIGZ1bmN0aW9uIG9uVXNlclBpY2tMb2NhdGlvbihwaWNrZWQsIGxhdExvbmcpIHtcbiAgICAvLyBUT0RPOiBJZiB0aGUgaXRlbSBpbWFnZXJ5IGhhcyBub3QgbG9hZGVkIHlldCwgZmVhdHVyZXNbXSB3aWxsIGJlIGVtcHR5LlxuICAgIC8vIElkZWFsbHksIHBpY2sgbG9jYXRpb24gc2hvdWxkIGJlIGNhbGxlZCBvbmx5IGFmdGVyIHRoZSBpdGVtIGltYWdlcnkgaGFzIGJlZW4gbG9hZGVkXG4gICAgLy8gYW5kIHdlIG5lZWQgc29tZSB3YXkgdG8gY2hlY2sgdGhhdC5cbiAgICAvLyBJRSBoYXMgbm8gYXJyYXkuZmluZCgpIHNvIHdlIHVzZSB0aGUgY2x1bmtpZXIgZm9yIGxvb3AgdG8gZmluZCB0aGUgZmVhdHVyZS5cbiAgICB2YXIgZmVhdHVyZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGlja2VkLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocGlja2VkLmZlYXR1cmVzW2ldLmltYWdlcnlMYXllciA9PT0gaXRlbS5pbWFnZXJ5TGF5ZXIpIHtcbiAgICAgICAgZmVhdHVyZSA9IHBpY2tlZC5mZWF0dXJlc1tpXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZlYXR1cmUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGl0ZW0uZmlsdGVySW50ZXJ2YWxzQnlGZWF0dXJlKGZlYXR1cmUsIHBpY2tlZCk7XG4gICAgICAgIHNldERhdGVzRnJvbUF2YWlsYWJsZURhdGVzKGl0ZW0uYXZhaWxhYmxlRGF0ZXMpO1xuICAgICAgICBzZXRMb2NhdGlvbihsYXRMb25nKTtcbiAgICAgICAgc2V0UGlja2VyTWVzc2FnZXMoe1xuICAgICAgICAgIGJlZm9yZVBpY2s6IFwiQ2xpY2sgYW5vdGhlciBwb2ludCB0byBjaGFuZ2UgdGhlIHNlbGVjdGlvblwiLFxuICAgICAgICAgIGFmdGVyUGljazogXCJDbGljayBhbm90aGVyIHBvaW50IHRvIGNoYW5nZSB0aGUgc2VsZWN0aW9uXCJcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICgwLCBfcmFpc2VFcnJvclRvVXNlcltcImRlZmF1bHRcIl0pKHRlcnJpYSwgZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFBpY2tlck1lc3NhZ2VzKHtcbiAgICAgICAgYmVmb3JlUGljazogXCJFcnJvciB3aGVuIHRyeWluZyB0byByZXNvbHZlIGltYWdlcnkgYXQgbG9jYXRpb24hIFBsZWFzZSBzZWxlY3QgYSBkaWZmZXJlbnQgbG9jYXRpb24gb3Igem9vbSBsZXZlbC5cIixcbiAgICAgICAgYWZ0ZXJQaWNrOiBcIkNsaWNrIGFub3RoZXIgcG9pbnQgdG8gY2hhbmdlIHRoZSBzZWxlY3Rpb25cIlxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsRGVsdGFUb29sKCkge1xuICAgIGlmIChpdGVtKSBpdGVtLmlzRW5hYmxlZCA9IGZhbHNlO1xuICAgIG9uQ2xvc2VUb29sKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZURlbHRhKCkge1xuICAgIHZhciB0aW1lc3RhbXAgPSAoMCwgX2RhdGVmb3JtYXRbXCJkZWZhdWx0XCJdKShuZXcgRGF0ZSgpLCBcInl5eXktbW0tZGQnVCdISDpNTTpzcy5sJ1onXCIpO1xuICAgIGl0ZW0ubmFtZSA9IFwiQ2hhbmdlIERldGVjdGlvbjogXCIuY29uY2F0KGNhdGFsb2dJdGVtLm5hbWUsIFwiIFwiKS5jb25jYXQodGltZXN0YW1wKTtcbiAgICBpdGVtLmZlYXR1cmVUaW1lc1Byb3BlcnR5ID0gdW5kZWZpbmVkOyAvLyBIaWRlIHRoZSBsb2NhdGlvbiBmaWx0ZXJcblxuICAgIGl0ZW0uY2xvY2sgPSB1bmRlZmluZWQ7IC8vIE1ha2UgaXQgYSBub24tdGltZS1keW5hbWljIGl0ZW1cblxuICAgIGl0ZW0uaW50ZXJ2YWxzID0gdW5kZWZpbmVkO1xuICAgIGl0ZW0uc3VwcG9ydHNEZWx0YUNvbXBhcmlzb24gPSBmYWxzZTtcbiAgICBpdGVtLmRpc2FibGVVc2VyQ2hhbmdlcyA9IHRydWU7IC8vIEhpZGUgY29udHJvbHMgbGlrZSB0aGUgc3R5bGUgc2VsZWN0b3JcblxuICAgIHZhciBmaXJzdERhdGVTdHIgPSBkYXRlRGlzcGxheUZvcm1hdChwcmltYXJ5RGF0ZSk7XG4gICAgdmFyIHNlY29uZERhdGVTdHIgPSBkYXRlRGlzcGxheUZvcm1hdChzZWNvbmRhcnlEYXRlKTsgLy8gVHJpbSBsaW5lcyB0byBwcmV2ZW50IDxwcmU+IHdyYXBwaW5nIGR1cmluZyBtYXJrZG93biBjb252ZXJzaW9uXG5cbiAgICBpdGVtLnNob3J0UmVwb3J0ID0gdHJpbUxpbmVzKFwiXFxuICAgICAgXCIuY29uY2F0KHQoXCJkZWx0YVRvb2wuY2F0YWxvZ0l0ZW0uZGVzY3JpcHRpb25cIiksIFwiXFxuXFxuICAgICAgKipcIikuY29uY2F0KHQoXCJkZWx0YVRvb2wucHJpbWFyeUltYWdlXCIpLCBcIioqOiAgIFwiKS5jb25jYXQoZmlyc3REYXRlU3RyLCBcIjxici8+XFxuICAgICAgKipcIikuY29uY2F0KHQoXCJkZWx0YVRvb2wuc2Vjb25kYXJ5SW1hZ2VcIiksIFwiKio6IFwiKS5jb25jYXQoc2Vjb25kRGF0ZVN0ciwgXCJcXG4gICAgXCIpKTsgLy8gaXRlbS5sb2FkaW5nTWVzc2FnZSA9IFwiTG9hZGluZyBkaWZmZXJlbmNlIG1hcFwiO1xuICAgIC8vIGl0ZW0uaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgIHZhciBmaXJzdERhdGVQYXJhbSA9IGRhdGVQYXJhbUZvcm1hdChwcmltYXJ5RGF0ZSk7XG4gICAgdmFyIHNlY29uZERhdGVQYXJhbSA9IGRhdGVQYXJhbUZvcm1hdChzZWNvbmRhcnlEYXRlKTtcbiAgICBpdGVtLnBhcmFtZXRlcnNbXCJ0aW1lXCJdID0gXCJcIi5jb25jYXQoZmlyc3REYXRlUGFyYW0sIFwiLFwiKS5jb25jYXQoc2Vjb25kRGF0ZVBhcmFtKTtcbiAgICBpdGVtLnNob3dEZWx0YUltYWdlcnkoZmlyc3REYXRlUGFyYW0sIHNlY29uZERhdGVQYXJhbSk7XG4gICAgb25DbG9zZVRvb2woKTtcbiAgfSAvLyBTZXQgcHJpbWFyeSAmIHNlY29uZGFyeSBkYXRlcyB0byB0aGUgbGFzdCAyIGF2YWlsYWJsZSBkYXRlc1xuXG5cbiAgZnVuY3Rpb24gc2V0RGF0ZXNGcm9tQXZhaWxhYmxlRGF0ZXMoYXZhaWxhYmxlRGF0ZXMpIHtcbiAgICB2YXIgX2F2YWlsYWJsZURhdGVzJHNsaWNlID0gYXZhaWxhYmxlRGF0ZXMuc2xpY2UoYXZhaWxhYmxlRGF0ZXMubGVuZ3RoIC0gMiksXG4gICAgICAgIF9hdmFpbGFibGVEYXRlcyRzbGljZTIgPSBfc2xpY2VkVG9BcnJheShfYXZhaWxhYmxlRGF0ZXMkc2xpY2UsIDIpLFxuICAgICAgICBwcmltYXJ5RGF0ZSA9IF9hdmFpbGFibGVEYXRlcyRzbGljZTJbMF0sXG4gICAgICAgIHNlY29uZGFyeURhdGUgPSBfYXZhaWxhYmxlRGF0ZXMkc2xpY2UyWzFdO1xuXG4gICAgaWYgKHByaW1hcnlEYXRlKSB7XG4gICAgICBzZXRQcmltYXJ5RGF0ZShwcmltYXJ5RGF0ZSk7XG4gICAgICBzZXRTZWNvbmRhcnlEYXRlKHNlY29uZGFyeURhdGUgfHwgcHJpbWFyeURhdGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogX2RlbHRhVG9vbFtcImRlZmF1bHRcIl0uZGVsdGFUb29sXG4gIH0sIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImgxXCIsIHtcbiAgICBjbGFzc05hbWU6IF9kZWx0YVRvb2xbXCJkZWZhdWx0XCJdLnRpdGxlXG4gIH0sIHQoXCJkZWx0YVRvb2wudGl0bGVQcmVmaXhcIiksIFwiOiBcIiwgY2F0YWxvZ0l0ZW0ubmFtZSksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBfZGVsdGFUb29sW1wiZGVmYXVsdFwiXS5ib2R5XG4gIH0sIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHQoXCJkZWx0YVRvb2wuZGVzY3JpcHRpb25cIikpLCBsb2NhdGlvbiAmJiBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoUHJldHR5TG9jYXRpb24sIHtcbiAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgfSksIGxvY2F0aW9uID09PSB1bmRlZmluZWQgPyBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCB0KFwiZGVsdGFUb29sLnBpY2tMb2NhdGlvblwiKSkgOiBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX0RhdGVQaWNrZXJzW1wiZGVmYXVsdFwiXSwge1xuICAgIGl0ZW06IGl0ZW0sXG4gICAgcHJpbWFyeURhdGU6IHByaW1hcnlEYXRlLFxuICAgIHNldFByaW1hcnlEYXRlOiBzZXRQcmltYXJ5RGF0ZSxcbiAgICBzZWNvbmRhcnlEYXRlOiBzZWNvbmRhcnlEYXRlLFxuICAgIHNldFNlY29uZGFyeURhdGU6IHNldFNlY29uZGFyeURhdGVcbiAgfSkpLCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogX2RlbHRhVG9vbFtcImRlZmF1bHRcIl0uYnV0dG9uc1xuICB9LCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xuICAgIGNsYXNzTmFtZTogX2RlbHRhVG9vbFtcImRlZmF1bHRcIl0uY2FuY2VsQnRuLFxuICAgIG9uQ2xpY2s6IGNhbmNlbERlbHRhVG9vbFxuICB9LCB0KFwiZGVsdGFUb29sLmNhbmNlbEJ0blwiKSksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XG4gICAgY2xhc3NOYW1lOiBfZGVsdGFUb29sW1wiZGVmYXVsdFwiXS5nZW5lcmF0ZURlbHRhQnRuLFxuICAgIG9uQ2xpY2s6IGdlbmVyYXRlRGVsdGEsXG4gICAgZGlzYWJsZWQ6IGxvY2F0aW9uID09PSB1bmRlZmluZWRcbiAgfSwgdChcImRlbHRhVG9vbC5nZW5lcmF0ZURlbHRhQnRuXCIpKSkpLCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX0xvY2F0aW9uUGlja2VyW1wiZGVmYXVsdFwiXSwge1xuICAgIHRlcnJpYTogdGVycmlhLFxuICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICBvblBpY2s6IG9uVXNlclBpY2tMb2NhdGlvbixcbiAgICBtZXNzYWdlczogcGlja2VyTWVzc2FnZXNcbiAgfSkpO1xufVxuXG5EZWx0YVRvb2wucHJvcFR5cGVzID0ge1xuICB0ZXJyaWE6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm9iamVjdC5pc1JlcXVpcmVkLFxuICB0b29sOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25DbG9zZVRvb2w6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdDogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uZnVuYy5pc1JlcXVpcmVkXG59O1xuRGVsdGFUb29sLmRpc3BsYXlOYW1lID0gXCJEZWx0YVRvb2xcIjtcblxuZnVuY3Rpb24gUHJldHR5TG9jYXRpb24oX3JlZjIpIHtcbiAgdmFyIGxvY2F0aW9uID0gX3JlZjIubG9jYXRpb247XG5cbiAgdmFyIF91c2VUcmFuc2xhdGlvbiA9ICgwLCBfcmVhY3RJMThuZXh0LnVzZVRyYW5zbGF0aW9uKSgpLFxuICAgICAgdCA9IF91c2VUcmFuc2xhdGlvbi50O1xuXG4gIHZhciBwcmV0dHlMb2NhdGlvbiA9ICgwLCBfcHJldHRpZnlDb29yZGluYXRlc1tcImRlZmF1bHRcIl0pKGxvY2F0aW9uLmxvbmdpdHVkZSwgbG9jYXRpb24ubGF0aXR1ZGUpO1xuICByZXR1cm4gX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBudWxsLCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJoNFwiLCBudWxsLCB0KFwiZGVsdGFUb29sLnNlbGVjdGVkTG9jYXRpb25cIikpLCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogX2RlbHRhVG9vbFtcImRlZmF1bHRcIl0ubG9jYXRpb25cbiAgfSwgcHJldHR5TG9jYXRpb24ubGF0aXR1ZGUsIFwiLCBcIiwgcHJldHR5TG9jYXRpb24ubG9uZ2l0dWRlKSk7XG59XG5cblByZXR0eUxvY2F0aW9uLnByb3BUeXBlcyA9IHtcbiAgbG9jYXRpb246IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm9iamVjdC5pc1JlcXVpcmVkXG59O1xuUHJldHR5TG9jYXRpb24uZGlzcGxheU5hbWUgPSBcIlByZXR0eUxvY2F0aW9uXCI7XG5cbmZ1bmN0aW9uIHRyaW1MaW5lcyh0ZXh0KSB7XG4gIHJldHVybiB0ZXh0LnNwbGl0KFwiXFxuXCIpLm1hcChmdW5jdGlvbiAobG4pIHtcbiAgICByZXR1cm4gbG4udHJpbSgpO1xuICB9KS5qb2luKFwiXFxuXCIpO1xufVxuXG5mdW5jdGlvbiBkYXRlUGFyYW1Gb3JtYXQoZGF0ZSkge1xuICByZXR1cm4gKDAsIF9kYXRlZm9ybWF0W1wiZGVmYXVsdFwiXSkoZGF0ZSwgXCJ5eXl5LW1tLWRkJ1QnSEg6TU06c3MubCdaJ1wiLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gZGF0ZURpc3BsYXlGb3JtYXQoZGF0ZSkge1xuICByZXR1cm4gKDAsIF9kYXRlZm9ybWF0W1wiZGVmYXVsdFwiXSkoZGF0ZSwgXCJkZC1tbS15eXl5XCIsIHRydWUpO1xufVxuXG52YXIgX2RlZmF1bHQgPSAoMCwgX3JlYWN0STE4bmV4dC53aXRoVHJhbnNsYXRpb24pKCkoRGVsdGFUb29sKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX3Byb3BUeXBlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInByb3AtdHlwZXNcIikpO1xuXG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcInJlYWN0XCIpKTtcblxudmFyIF9FbGxpcHNvaWQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvRWxsaXBzb2lkXCIpKTtcblxudmFyIF9NYXRoID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwidGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL01hdGhcIikpO1xuXG52YXIgX2tub2Nrb3V0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwidGVycmlhanMtY2VzaXVtL1NvdXJjZS9UaGlyZFBhcnR5L2tub2Nrb3V0XCIpKTtcblxudmFyIF9Mb2NhdGlvbk1hcmtlclV0aWxzID0gcmVxdWlyZShcIi4uLy4uLy4uL01vZGVscy9Mb2NhdGlvbk1hcmtlclV0aWxzLmpzXCIpO1xuXG52YXIgX01hcEludGVyYWN0aW9uTW9kZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uLy4uL01vZGVscy9NYXBJbnRlcmFjdGlvbk1vZGVcIikpO1xuXG52YXIgX0xvYWRlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL0xvYWRlclwiKSk7XG5cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpIHsgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsOyB2YXIgY2FjaGUgPSBuZXcgV2Vha01hcCgpOyBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7IHJldHVybiBjYWNoZTsgfTsgcmV0dXJuIGNhY2hlOyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gaWYgKG9iaiA9PT0gbnVsbCB8fCBfdHlwZW9mKG9iaikgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKSB7IHJldHVybiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfSB2YXIgY2FjaGUgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKTsgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7IHJldHVybiBjYWNoZS5nZXQob2JqKTsgfSB2YXIgbmV3T2JqID0ge307IHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgeyB2YXIgZGVzYyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDogbnVsbDsgaWYgKGRlc2MgJiYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpOyB9IGVsc2UgeyBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gfSBuZXdPYmpbXCJkZWZhdWx0XCJdID0gb2JqOyBpZiAoY2FjaGUpIHsgY2FjaGUuc2V0KG9iaiwgbmV3T2JqKTsgfSByZXR1cm4gbmV3T2JqOyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICghKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikpIHsgcmV0dXJuOyB9IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuLyoqXG4gKiBBbGxvd3MgdXNlciB0byBwaWNrIGEgcG9pbnQgb24gdGhlIG1hcFxuICovXG5mdW5jdGlvbiBMb2NhdGlvblBpY2tlcihfcmVmKSB7XG4gIHZhciB0ZXJyaWEgPSBfcmVmLnRlcnJpYSxcbiAgICAgIG1lc3NhZ2VzID0gX3JlZi5tZXNzYWdlcyxcbiAgICAgIGxvY2F0aW9uID0gX3JlZi5sb2NhdGlvbixcbiAgICAgIG9uUGljayA9IF9yZWYub25QaWNrO1xuICAoMCwgX3JlYWN0LnVzZUVmZmVjdCkoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjdXJyZW50UGljaztcbiAgICB2YXIgcGlja1BvaW50TW9kZSA9IG5ldyBfTWFwSW50ZXJhY3Rpb25Nb2RlW1wiZGVmYXVsdFwiXSh7XG4gICAgICBtZXNzYWdlOiBtZXNzYWdlcy5iZWZvcmVQaWNrXG4gICAgfSk7XG4gICAgdGVycmlhLm1hcEludGVyYWN0aW9uTW9kZVN0YWNrLnB1c2gocGlja1BvaW50TW9kZSk7XG4gICAgc2hvd01hcmtlcihsb2NhdGlvbik7XG5cbiAgICB2YXIgc3Vic2NyaXB0aW9uID0gX2tub2Nrb3V0W1wiZGVmYXVsdFwiXS5nZXRPYnNlcnZhYmxlKHBpY2tQb2ludE1vZGUsIFwicGlja2VkRmVhdHVyZXNcIikuc3Vic2NyaWJlKGZ1bmN0aW9uICh0aGlzUGljaykge1xuICAgICAgY3VycmVudFBpY2sgPSB0aGlzUGljaztcblxuICAgICAgcGlja1BvaW50TW9kZS5jdXN0b21VaSA9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L2Rpc3BsYXktbmFtZSAqL1xuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9Mb2FkZXJbXCJkZWZhdWx0XCJdLCB7XG4gICAgICAgICAgbWVzc2FnZTogXCJRdWVyeWluZyBcIi5jb25jYXQobG9jYXRpb24gPyBcIm5ld1wiIDogXCJcIiwgXCIgcG9zaXRpb24uLi5cIilcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBwaWNrUG9pbnRNb2RlLm1lc3NhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlcy5hZnRlclBpY2s7XG4gICAgICB9O1xuXG4gICAgICB2YXIgcG9zaXRpb24gPSBjYXJ0ZXNpYW5Ub0RlZ3JlZXModGhpc1BpY2sucGlja1Bvc2l0aW9uKTtcbiAgICAgIHNob3dNYXJrZXIocG9zaXRpb24pO1xuICAgICAgY3VycmVudFBpY2suYWxsRmVhdHVyZXNBdmFpbGFibGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY3VycmVudFBpY2sgPT09IHRoaXNQaWNrKSB7XG4gICAgICAgICAgb25QaWNrKHRoaXNQaWNrLCBwb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGRpc3Bvc2VyXG4gICAgICBjdXJyZW50UGljayA9IHVuZGVmaW5lZDtcbiAgICAgIHN1YnNjcmlwdGlvbi5kaXNwb3NlKCk7XG4gICAgICBzdG9wSW50ZXJhY3Rpb25Nb2RlKHBpY2tQb2ludE1vZGUpO1xuICAgICAgKDAsIF9Mb2NhdGlvbk1hcmtlclV0aWxzLnJlbW92ZU1hcmtlcikodGVycmlhKTtcbiAgICB9O1xuICB9KTtcblxuICB2YXIgc2hvd01hcmtlciA9IGZ1bmN0aW9uIHNob3dNYXJrZXIobG9jYXRpb24pIHtcbiAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICgwLCBfTG9jYXRpb25NYXJrZXJVdGlscy5hZGRNYXJrZXIpKHRlcnJpYSwge1xuICAgICAgICBuYW1lOiBcIlVzZXIgc2VsZWN0aW9uXCIsXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBzdG9wSW50ZXJhY3Rpb25Nb2RlID0gZnVuY3Rpb24gc3RvcEludGVyYWN0aW9uTW9kZShwaWNrUG9pbnRNb2RlKSB7XG4gICAgdmFyIF90ZXJyaWEkbWFwSW50ZXJhY3RpbyA9IHRlcnJpYS5tYXBJbnRlcmFjdGlvbk1vZGVTdGFjay5zbGljZSgtMSksXG4gICAgICAgIF90ZXJyaWEkbWFwSW50ZXJhY3RpbzIgPSBfc2xpY2VkVG9BcnJheShfdGVycmlhJG1hcEludGVyYWN0aW8sIDEpLFxuICAgICAgICBjdXJyZW50TW9kZSA9IF90ZXJyaWEkbWFwSW50ZXJhY3RpbzJbMF07XG5cbiAgICBpZiAoY3VycmVudE1vZGUgPT09IHBpY2tQb2ludE1vZGUpIHtcbiAgICAgIHRlcnJpYS5tYXBJbnRlcmFjdGlvbk1vZGVTdGFjay5wb3AoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbkxvY2F0aW9uUGlja2VyLnByb3BUeXBlcyA9IHtcbiAgdGVycmlhOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5vYmplY3QuaXNSZXF1aXJlZCxcbiAgbWVzc2FnZXM6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm9iamVjdC5pc1JlcXVpcmVkLFxuICBsb2NhdGlvbjogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0ub2JqZWN0LFxuICBvblBpY2s6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmZ1bmMuaXNSZXF1aXJlZFxufTtcbkxvY2F0aW9uUGlja2VyLmRpc3BsYXlOYW1lID0gXCJMb2NhdGlvblBpY2tlclwiO1xuXG5mdW5jdGlvbiBjYXJ0ZXNpYW5Ub0RlZ3JlZXMoY2FydGVzaWFuKSB7XG4gIHZhciBjYXJ0byA9IF9FbGxpcHNvaWRbXCJkZWZhdWx0XCJdLldHUzg0LmNhcnRlc2lhblRvQ2FydG9ncmFwaGljKGNhcnRlc2lhbik7XG5cbiAgcmV0dXJuIHtcbiAgICBsb25naXR1ZGU6IF9NYXRoW1wiZGVmYXVsdFwiXS50b0RlZ3JlZXMoY2FydG8ubG9uZ2l0dWRlKSxcbiAgICBsYXRpdHVkZTogX01hdGhbXCJkZWZhdWx0XCJdLnRvRGVncmVlcyhjYXJ0by5sYXRpdHVkZSlcbiAgfTtcbn1cblxudmFyIF9kZWZhdWx0ID0gTG9jYXRpb25QaWNrZXI7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJkZWx0YVRvb2xcIjpcInRqcy1kZWx0YS10b29sX19kZWx0YVRvb2wgdGpzLXRvb2wtcGFuZWxfX3Rvb2xcIixcInRpdGxlXCI6XCJ0anMtZGVsdGEtdG9vbF9fdGl0bGVcIixcImJvZHlcIjpcInRqcy1kZWx0YS10b29sX19ib2R5XCIsXCJidXR0b25zXCI6XCJ0anMtZGVsdGEtdG9vbF9fYnV0dG9uc1wiLFwiY2FuY2VsQnRuXCI6XCJ0anMtZGVsdGEtdG9vbF9fY2FuY2VsQnRuIHRqcy1fYnV0dG9uc19fYnRuLWdyZXlcIixcImdlbmVyYXRlRGVsdGFCdG5cIjpcInRqcy1kZWx0YS10b29sX19nZW5lcmF0ZURlbHRhQnRuIHRqcy1fYnV0dG9uc19fYnRuIHRqcy1fYnV0dG9uc19fYnRuLXByaW1hcnlcIixcImxvY2F0aW9uXCI6XCJ0anMtZGVsdGEtdG9vbF9fbG9jYXRpb25cIixcImRhdGVQaWNrZXJzXCI6XCJ0anMtZGVsdGEtdG9vbF9fZGF0ZVBpY2tlcnNcIixcInBpY2tlckJ1dHRvbnNcIjpcInRqcy1kZWx0YS10b29sX19waWNrZXJCdXR0b25zXCIsXCJjdXJyZW50RGF0ZVwiOlwidGpzLWRlbHRhLXRvb2xfX2N1cnJlbnREYXRlIHRqcy1fYnV0dG9uc19fYnRuXCIsXCJwcmV2aW91c0RhdGVcIjpcInRqcy1kZWx0YS10b29sX19wcmV2aW91c0RhdGUgdGpzLV9idXR0b25zX19idG5cIixcIm5leHREYXRlXCI6XCJ0anMtZGVsdGEtdG9vbF9fbmV4dERhdGUgdGpzLV9idXR0b25zX19idG5cIixcInBpY2tlclwiOlwidGpzLWRlbHRhLXRvb2xfX3BpY2tlclwiLFwiZGF0ZVBpY2tlclBvcHVwXCI6XCJ0anMtZGVsdGEtdG9vbF9fZGF0ZVBpY2tlclBvcHVwXCJ9OyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaElBO0FBQ0E7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==