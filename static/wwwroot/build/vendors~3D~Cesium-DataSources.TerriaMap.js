((self || window)["webpackJsonp"] = (self || window)["webpackJsonp"] || []).push([["vendors~3D~Cesium-DataSources"],{

/***/ "./node_modules/terriajs-cesium/Source/Core/CornerType.js":
/*!****************************************************************!*\
  !*** ./node_modules/terriajs-cesium/Source/Core/CornerType.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Style options for corners.
 *
 * @demo The {@link https://sandcastle.cesium.com/index.html?src=Corridor.html&label=Geometries|Corridor Demo}
 * demonstrates the three corner types, as used by {@link CorridorGraphics}.
 *
 * @enum {Number}
 */
var CornerType = {
  /**
   * <img src="Images/CornerTypeRounded.png" style="vertical-align: middle;" width="186" height="189" />
   *
   * Corner has a smooth edge.
   * @type {Number}
   * @constant
   */
  ROUNDED: 0,

  /**
   * <img src="Images/CornerTypeMitered.png" style="vertical-align: middle;" width="186" height="189" />
   *
   * Corner point is the intersection of adjacent edges.
   * @type {Number}
   * @constant
   */
  MITERED: 1,

  /**
   * <img src="Images/CornerTypeBeveled.png" style="vertical-align: middle;" width="186" height="189" />
   *
   * Corner is clipped.
   * @type {Number}
   * @constant
   */
  BEVELED: 2,
};
/* harmony default export */ __webpack_exports__["default"] = (Object.freeze(CornerType));


/***/ }),

/***/ "./node_modules/terriajs-cesium/Source/DataSources/CompositePositionProperty.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/terriajs-cesium/Source/DataSources/CompositePositionProperty.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Core_defaultValue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/defaultValue.js */ "./node_modules/terriajs-cesium/Source/Core/defaultValue.js");
/* harmony import */ var _Core_defined_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Core/defined.js */ "./node_modules/terriajs-cesium/Source/Core/defined.js");
/* harmony import */ var _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Core/DeveloperError.js */ "./node_modules/terriajs-cesium/Source/Core/DeveloperError.js");
/* harmony import */ var _Core_Event_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Core/Event.js */ "./node_modules/terriajs-cesium/Source/Core/Event.js");
/* harmony import */ var _Core_ReferenceFrame_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Core/ReferenceFrame.js */ "./node_modules/terriajs-cesium/Source/Core/ReferenceFrame.js");
/* harmony import */ var _CompositeProperty_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CompositeProperty.js */ "./node_modules/terriajs-cesium/Source/DataSources/CompositeProperty.js");
/* harmony import */ var _Property_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Property.js */ "./node_modules/terriajs-cesium/Source/DataSources/Property.js");








/**
 * A {@link CompositeProperty} which is also a {@link PositionProperty}.
 *
 * @alias CompositePositionProperty
 * @constructor
 *
 * @param {ReferenceFrame} [referenceFrame=ReferenceFrame.FIXED] The reference frame in which the position is defined.
 */
function CompositePositionProperty(referenceFrame) {
  this._referenceFrame = Object(_Core_defaultValue_js__WEBPACK_IMPORTED_MODULE_0__["default"])(referenceFrame, _Core_ReferenceFrame_js__WEBPACK_IMPORTED_MODULE_4__["default"].FIXED);
  this._definitionChanged = new _Core_Event_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
  this._composite = new _CompositeProperty_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
  this._composite.definitionChanged.addEventListener(
    CompositePositionProperty.prototype._raiseDefinitionChanged,
    this
  );
}

Object.defineProperties(CompositePositionProperty.prototype, {
  /**
   * Gets a value indicating if this property is constant.  A property is considered
   * constant if getValue always returns the same result for the current definition.
   * @memberof CompositePositionProperty.prototype
   *
   * @type {Boolean}
   * @readonly
   */
  isConstant: {
    get: function () {
      return this._composite.isConstant;
    },
  },
  /**
   * Gets the event that is raised whenever the definition of this property changes.
   * The definition is changed whenever setValue is called with data different
   * than the current value.
   * @memberof CompositePositionProperty.prototype
   *
   * @type {Event}
   * @readonly
   */
  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },
  /**
   * Gets the interval collection.
   * @memberof CompositePositionProperty.prototype
   *
   * @type {TimeIntervalCollection}
   */
  intervals: {
    get: function () {
      return this._composite.intervals;
    },
  },
  /**
   * Gets or sets the reference frame which this position presents itself as.
   * Each PositionProperty making up this object has it's own reference frame,
   * so this property merely exposes a "preferred" reference frame for clients
   * to use.
   * @memberof CompositePositionProperty.prototype
   *
   * @type {ReferenceFrame}
   */
  referenceFrame: {
    get: function () {
      return this._referenceFrame;
    },
    set: function (value) {
      this._referenceFrame = value;
    },
  },
});

/**
 * Gets the value of the property at the provided time in the fixed frame.
 *
 * @param {JulianDate} time The time for which to retrieve the value.
 * @param {Object} [result] The object to store the value into, if omitted, a new instance is created and returned.
 * @returns {Object} The modified result parameter or a new instance if the result parameter was not supplied.
 */
CompositePositionProperty.prototype.getValue = function (time, result) {
  return this.getValueInReferenceFrame(time, _Core_ReferenceFrame_js__WEBPACK_IMPORTED_MODULE_4__["default"].FIXED, result);
};

/**
 * Gets the value of the property at the provided time and in the provided reference frame.
 *
 * @param {JulianDate} time The time for which to retrieve the value.
 * @param {ReferenceFrame} referenceFrame The desired referenceFrame of the result.
 * @param {Cartesian3} [result] The object to store the value into, if omitted, a new instance is created and returned.
 * @returns {Cartesian3} The modified result parameter or a new instance if the result parameter was not supplied.
 */
CompositePositionProperty.prototype.getValueInReferenceFrame = function (
  time,
  referenceFrame,
  result
) {
  

  var innerProperty = this._composite._intervals.findDataForIntervalContainingDate(
    time
  );
  if (Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_1__["default"])(innerProperty)) {
    return innerProperty.getValueInReferenceFrame(time, referenceFrame, result);
  }
  return undefined;
};

/**
 * Compares this property to the provided property and returns
 * <code>true</code> if they are equal, <code>false</code> otherwise.
 *
 * @param {Property} [other] The other property.
 * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
 */
CompositePositionProperty.prototype.equals = function (other) {
  return (
    this === other || //
    (other instanceof CompositePositionProperty && //
      this._referenceFrame === other._referenceFrame && //
      this._composite.equals(other._composite, _Property_js__WEBPACK_IMPORTED_MODULE_6__["default"].equals))
  );
};

/**
 * @private
 */
CompositePositionProperty.prototype._raiseDefinitionChanged = function () {
  this._definitionChanged.raiseEvent(this);
};
/* harmony default export */ __webpack_exports__["default"] = (CompositePositionProperty);


/***/ }),

/***/ "./node_modules/terriajs-cesium/Source/DataSources/CompositeProperty.js":
/*!******************************************************************************!*\
  !*** ./node_modules/terriajs-cesium/Source/DataSources/CompositeProperty.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Core_defined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/defined.js */ "./node_modules/terriajs-cesium/Source/Core/defined.js");
/* harmony import */ var _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Core/DeveloperError.js */ "./node_modules/terriajs-cesium/Source/Core/DeveloperError.js");
/* harmony import */ var _Core_Event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Core/Event.js */ "./node_modules/terriajs-cesium/Source/Core/Event.js");
/* harmony import */ var _Core_EventHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Core/EventHelper.js */ "./node_modules/terriajs-cesium/Source/Core/EventHelper.js");
/* harmony import */ var _Core_TimeIntervalCollection_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Core/TimeIntervalCollection.js */ "./node_modules/terriajs-cesium/Source/Core/TimeIntervalCollection.js");
/* harmony import */ var _Property_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Property.js */ "./node_modules/terriajs-cesium/Source/DataSources/Property.js");







function subscribeAll(property, eventHelper, definitionChanged, intervals) {
  function callback() {
    definitionChanged.raiseEvent(property);
  }
  var items = [];
  eventHelper.removeAll();
  var length = intervals.length;
  for (var i = 0; i < length; i++) {
    var interval = intervals.get(i);
    if (Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(interval.data) && items.indexOf(interval.data) === -1) {
      eventHelper.add(interval.data.definitionChanged, callback);
    }
  }
}

/**
 * A {@link Property} which is defined by a {@link TimeIntervalCollection}, where the
 * data property of each {@link TimeInterval} is another Property instance which is
 * evaluated at the provided time.
 *
 * @alias CompositeProperty
 * @constructor
 *
 *
 * @example
 * var constantProperty = ...;
 * var sampledProperty = ...;
 *
 * //Create a composite property from two previously defined properties
 * //where the property is valid on August 1st, 2012 and uses a constant
 * //property for the first half of the day and a sampled property for the
 * //remaining half.
 * var composite = new Cesium.CompositeProperty();
 * composite.intervals.addInterval(Cesium.TimeInterval.fromIso8601({
 *     iso8601 : '2012-08-01T00:00:00.00Z/2012-08-01T12:00:00.00Z',
 *     data : constantProperty
 * }));
 * composite.intervals.addInterval(Cesium.TimeInterval.fromIso8601({
 *     iso8601 : '2012-08-01T12:00:00.00Z/2012-08-02T00:00:00.00Z',
 *     isStartIncluded : false,
 *     isStopIncluded : false,
 *     data : sampledProperty
 * }));
 *
 * @see CompositeMaterialProperty
 * @see CompositePositionProperty
 */
function CompositeProperty() {
  this._eventHelper = new _Core_EventHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
  this._definitionChanged = new _Core_Event_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
  this._intervals = new _Core_TimeIntervalCollection_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
  this._intervals.changedEvent.addEventListener(
    CompositeProperty.prototype._intervalsChanged,
    this
  );
}

Object.defineProperties(CompositeProperty.prototype, {
  /**
   * Gets a value indicating if this property is constant.  A property is considered
   * constant if getValue always returns the same result for the current definition.
   * @memberof CompositeProperty.prototype
   *
   * @type {Boolean}
   * @readonly
   */
  isConstant: {
    get: function () {
      return this._intervals.isEmpty;
    },
  },
  /**
   * Gets the event that is raised whenever the definition of this property changes.
   * The definition is changed whenever setValue is called with data different
   * than the current value.
   * @memberof CompositeProperty.prototype
   *
   * @type {Event}
   * @readonly
   */
  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },
  /**
   * Gets the interval collection.
   * @memberof CompositeProperty.prototype
   *
   * @type {TimeIntervalCollection}
   */
  intervals: {
    get: function () {
      return this._intervals;
    },
  },
});

/**
 * Gets the value of the property at the provided time.
 *
 * @param {JulianDate} time The time for which to retrieve the value.
 * @param {Object} [result] The object to store the value into, if omitted, a new instance is created and returned.
 * @returns {Object} The modified result parameter or a new instance if the result parameter was not supplied.
 */
CompositeProperty.prototype.getValue = function (time, result) {
  

  var innerProperty = this._intervals.findDataForIntervalContainingDate(time);
  if (Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(innerProperty)) {
    return innerProperty.getValue(time, result);
  }
  return undefined;
};

/**
 * Compares this property to the provided property and returns
 * <code>true</code> if they are equal, <code>false</code> otherwise.
 *
 * @param {Property} [other] The other property.
 * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
 */
CompositeProperty.prototype.equals = function (other) {
  return (
    this === other || //
    (other instanceof CompositeProperty && //
      this._intervals.equals(other._intervals, _Property_js__WEBPACK_IMPORTED_MODULE_5__["default"].equals))
  );
};

/**
 * @private
 */
CompositeProperty.prototype._intervalsChanged = function () {
  subscribeAll(
    this,
    this._eventHelper,
    this._definitionChanged,
    this._intervals
  );
  this._definitionChanged.raiseEvent(this);
};
/* harmony default export */ __webpack_exports__["default"] = (CompositeProperty);


/***/ }),

/***/ "./node_modules/terriajs-cesium/Source/DataSources/ReferenceProperty.js":
/*!******************************************************************************!*\
  !*** ./node_modules/terriajs-cesium/Source/DataSources/ReferenceProperty.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Core_defined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/defined.js */ "./node_modules/terriajs-cesium/Source/Core/defined.js");
/* harmony import */ var _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Core/DeveloperError.js */ "./node_modules/terriajs-cesium/Source/Core/DeveloperError.js");
/* harmony import */ var _Core_Event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Core/Event.js */ "./node_modules/terriajs-cesium/Source/Core/Event.js");
/* harmony import */ var _Property_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Property.js */ "./node_modules/terriajs-cesium/Source/DataSources/Property.js");





function resolve(that) {
  var targetProperty = that._targetProperty;

  if (!Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(targetProperty)) {
    var targetEntity = that._targetEntity;

    if (!Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(targetEntity)) {
      targetEntity = that._targetCollection.getById(that._targetId);

      if (!Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(targetEntity)) {
        // target entity not found
        that._targetEntity = that._targetProperty = undefined;
        return;
      }

      // target entity was found. listen for changes to entity definition
      targetEntity.definitionChanged.addEventListener(
        ReferenceProperty.prototype._onTargetEntityDefinitionChanged,
        that
      );
      that._targetEntity = targetEntity;
    }

    // walk the list of property names and resolve properties
    var targetPropertyNames = that._targetPropertyNames;
    targetProperty = that._targetEntity;
    for (
      var i = 0, len = targetPropertyNames.length;
      i < len && Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(targetProperty);
      ++i
    ) {
      targetProperty = targetProperty[targetPropertyNames[i]];
    }

    // target property may or may not be defined, depending on if it was found
    that._targetProperty = targetProperty;
  }

  return targetProperty;
}

/**
 * A {@link Property} which transparently links to another property on a provided object.
 *
 * @alias ReferenceProperty
 * @constructor
 *
 * @param {EntityCollection} targetCollection The entity collection which will be used to resolve the reference.
 * @param {String} targetId The id of the entity which is being referenced.
 * @param {String[]} targetPropertyNames The names of the property on the target entity which we will use.
 *
 * @example
 * var collection = new Cesium.EntityCollection();
 *
 * //Create a new entity and assign a billboard scale.
 * var object1 = new Cesium.Entity({id:'object1'});
 * object1.billboard = new Cesium.BillboardGraphics();
 * object1.billboard.scale = new Cesium.ConstantProperty(2.0);
 * collection.add(object1);
 *
 * //Create a second entity and reference the scale from the first one.
 * var object2 = new Cesium.Entity({id:'object2'});
 * object2.model = new Cesium.ModelGraphics();
 * object2.model.scale = new Cesium.ReferenceProperty(collection, 'object1', ['billboard', 'scale']);
 * collection.add(object2);
 *
 * //Create a third object, but use the fromString helper function.
 * var object3 = new Cesium.Entity({id:'object3'});
 * object3.billboard = new Cesium.BillboardGraphics();
 * object3.billboard.scale = Cesium.ReferenceProperty.fromString(collection, 'object1#billboard.scale');
 * collection.add(object3);
 *
 * //You can refer to an entity with a # or . in id and property names by escaping them.
 * var object4 = new Cesium.Entity({id:'#object.4'});
 * object4.billboard = new Cesium.BillboardGraphics();
 * object4.billboard.scale = new Cesium.ConstantProperty(2.0);
 * collection.add(object4);
 *
 * var object5 = new Cesium.Entity({id:'object5'});
 * object5.billboard = new Cesium.BillboardGraphics();
 * object5.billboard.scale = Cesium.ReferenceProperty.fromString(collection, '\\#object\\.4#billboard.scale');
 * collection.add(object5);
 */
function ReferenceProperty(targetCollection, targetId, targetPropertyNames) {
  

  this._targetCollection = targetCollection;
  this._targetId = targetId;
  this._targetPropertyNames = targetPropertyNames;
  this._targetProperty = undefined;
  this._targetEntity = undefined;
  this._definitionChanged = new _Core_Event_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

  targetCollection.collectionChanged.addEventListener(
    ReferenceProperty.prototype._onCollectionChanged,
    this
  );
}

Object.defineProperties(ReferenceProperty.prototype, {
  /**
   * Gets a value indicating if this property is constant.
   * @memberof ReferenceProperty.prototype
   * @type {Boolean}
   * @readonly
   */
  isConstant: {
    get: function () {
      return _Property_js__WEBPACK_IMPORTED_MODULE_3__["default"].isConstant(resolve(this));
    },
  },
  /**
   * Gets the event that is raised whenever the definition of this property changes.
   * The definition is changed whenever the referenced property's definition is changed.
   * @memberof ReferenceProperty.prototype
   * @type {Event}
   * @readonly
   */
  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },
  /**
   * Gets the reference frame that the position is defined in.
   * This property is only valid if the referenced property is a {@link PositionProperty}.
   * @memberof ReferenceProperty.prototype
   * @type {ReferenceFrame}
   * @readonly
   */
  referenceFrame: {
    get: function () {
      var target = resolve(this);
      return Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target) ? target.referenceFrame : undefined;
    },
  },
  /**
   * Gets the id of the entity being referenced.
   * @memberof ReferenceProperty.prototype
   * @type {String}
   * @readonly
   */
  targetId: {
    get: function () {
      return this._targetId;
    },
  },
  /**
   * Gets the collection containing the entity being referenced.
   * @memberof ReferenceProperty.prototype
   * @type {EntityCollection}
   * @readonly
   */
  targetCollection: {
    get: function () {
      return this._targetCollection;
    },
  },
  /**
   * Gets the array of property names used to retrieve the referenced property.
   * @memberof ReferenceProperty.prototype
   * @type {String[]}
   * @readonly
   */
  targetPropertyNames: {
    get: function () {
      return this._targetPropertyNames;
    },
  },
  /**
   * Gets the resolved instance of the underlying referenced property.
   * @memberof ReferenceProperty.prototype
   * @type {Property|undefined}
   * @readonly
   */
  resolvedProperty: {
    get: function () {
      return resolve(this);
    },
  },
});

/**
 * Creates a new instance given the entity collection that will
 * be used to resolve it and a string indicating the target entity id and property.
 * The format of the string is "objectId#foo.bar", where # separates the id from
 * property path and . separates sub-properties.  If the reference identifier or
 * or any sub-properties contains a # . or \ they must be escaped.
 *
 * @param {EntityCollection} targetCollection
 * @param {String} referenceString
 * @returns {ReferenceProperty} A new instance of ReferenceProperty.
 *
 * @exception {DeveloperError} invalid referenceString.
 */
ReferenceProperty.fromString = function (targetCollection, referenceString) {
  

  var identifier;
  var values = [];

  var inIdentifier = true;
  var isEscaped = false;
  var token = "";
  for (var i = 0; i < referenceString.length; ++i) {
    var c = referenceString.charAt(i);

    if (isEscaped) {
      token += c;
      isEscaped = false;
    } else if (c === "\\") {
      isEscaped = true;
    } else if (inIdentifier && c === "#") {
      identifier = token;
      inIdentifier = false;
      token = "";
    } else if (!inIdentifier && c === ".") {
      values.push(token);
      token = "";
    } else {
      token += c;
    }
  }
  values.push(token);

  return new ReferenceProperty(targetCollection, identifier, values);
};

/**
 * Gets the value of the property at the provided time.
 *
 * @param {JulianDate} time The time for which to retrieve the value.
 * @param {Object} [result] The object to store the value into, if omitted, a new instance is created and returned.
 * @returns {Object} The modified result parameter or a new instance if the result parameter was not supplied.
 */
ReferenceProperty.prototype.getValue = function (time, result) {
  var target = resolve(this);
  return Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target) ? target.getValue(time, result) : undefined;
};

/**
 * Gets the value of the property at the provided time and in the provided reference frame.
 * This method is only valid if the property being referenced is a {@link PositionProperty}.
 *
 * @param {JulianDate} time The time for which to retrieve the value.
 * @param {ReferenceFrame} referenceFrame The desired referenceFrame of the result.
 * @param {Cartesian3} [result] The object to store the value into, if omitted, a new instance is created and returned.
 * @returns {Cartesian3} The modified result parameter or a new instance if the result parameter was not supplied.
 */
ReferenceProperty.prototype.getValueInReferenceFrame = function (
  time,
  referenceFrame,
  result
) {
  var target = resolve(this);
  return Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target)
    ? target.getValueInReferenceFrame(time, referenceFrame, result)
    : undefined;
};

/**
 * Gets the {@link Material} type at the provided time.
 * This method is only valid if the property being referenced is a {@link MaterialProperty}.
 *
 * @param {JulianDate} time The time for which to retrieve the type.
 * @returns {String} The type of material.
 */
ReferenceProperty.prototype.getType = function (time) {
  var target = resolve(this);
  return Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target) ? target.getType(time) : undefined;
};

/**
 * Compares this property to the provided property and returns
 * <code>true</code> if they are equal, <code>false</code> otherwise.
 *
 * @param {Property} [other] The other property.
 * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
 */
ReferenceProperty.prototype.equals = function (other) {
  if (this === other) {
    return true;
  }

  var names = this._targetPropertyNames;
  var otherNames = other._targetPropertyNames;

  if (
    this._targetCollection !== other._targetCollection || //
    this._targetId !== other._targetId || //
    names.length !== otherNames.length
  ) {
    return false;
  }

  var length = this._targetPropertyNames.length;
  for (var i = 0; i < length; i++) {
    if (names[i] !== otherNames[i]) {
      return false;
    }
  }

  return true;
};

ReferenceProperty.prototype._onTargetEntityDefinitionChanged = function (
  targetEntity,
  name,
  value,
  oldValue
) {
  if (Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this._targetProperty) && this._targetPropertyNames[0] === name) {
    this._targetProperty = undefined;
    this._definitionChanged.raiseEvent(this);
  }
};

ReferenceProperty.prototype._onCollectionChanged = function (
  collection,
  added,
  removed
) {
  var targetEntity = this._targetEntity;
  if (Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(targetEntity) && removed.indexOf(targetEntity) !== -1) {
    targetEntity.definitionChanged.removeEventListener(
      ReferenceProperty.prototype._onTargetEntityDefinitionChanged,
      this
    );
    this._targetEntity = this._targetProperty = undefined;
  } else if (!Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(targetEntity)) {
    targetEntity = resolve(this);
    if (Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(targetEntity)) {
      this._definitionChanged.raiseEvent(this);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (ReferenceProperty);


/***/ }),

/***/ "./node_modules/terriajs-cesium/Source/DataSources/ScaledPositionProperty.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/terriajs-cesium/Source/DataSources/ScaledPositionProperty.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Core_defined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/defined.js */ "./node_modules/terriajs-cesium/Source/Core/defined.js");
/* harmony import */ var _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Core/DeveloperError.js */ "./node_modules/terriajs-cesium/Source/Core/DeveloperError.js");
/* harmony import */ var _Core_Ellipsoid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Core/Ellipsoid.js */ "./node_modules/terriajs-cesium/Source/Core/Ellipsoid.js");
/* harmony import */ var _Core_Event_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Core/Event.js */ "./node_modules/terriajs-cesium/Source/Core/Event.js");
/* harmony import */ var _Core_ReferenceFrame_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Core/ReferenceFrame.js */ "./node_modules/terriajs-cesium/Source/Core/ReferenceFrame.js");
/* harmony import */ var _Property_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Property.js */ "./node_modules/terriajs-cesium/Source/DataSources/Property.js");







/**
 * This is a temporary class for scaling position properties to the WGS84 surface.
 * It will go away or be refactored to support data with arbitrary height references.
 * @private
 */
function ScaledPositionProperty(value) {
  this._definitionChanged = new _Core_Event_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
  this._value = undefined;
  this._removeSubscription = undefined;
  this.setValue(value);
}

Object.defineProperties(ScaledPositionProperty.prototype, {
  isConstant: {
    get: function () {
      return _Property_js__WEBPACK_IMPORTED_MODULE_5__["default"].isConstant(this._value);
    },
  },
  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },
  referenceFrame: {
    get: function () {
      return Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this._value)
        ? this._value.referenceFrame
        : _Core_ReferenceFrame_js__WEBPACK_IMPORTED_MODULE_4__["default"].FIXED;
    },
  },
});

ScaledPositionProperty.prototype.getValue = function (time, result) {
  return this.getValueInReferenceFrame(time, _Core_ReferenceFrame_js__WEBPACK_IMPORTED_MODULE_4__["default"].FIXED, result);
};

ScaledPositionProperty.prototype.setValue = function (value) {
  if (this._value !== value) {
    this._value = value;

    if (Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this._removeSubscription)) {
      this._removeSubscription();
      this._removeSubscription = undefined;
    }

    if (Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value)) {
      this._removeSubscription = value.definitionChanged.addEventListener(
        this._raiseDefinitionChanged,
        this
      );
    }
    this._definitionChanged.raiseEvent(this);
  }
};

ScaledPositionProperty.prototype.getValueInReferenceFrame = function (
  time,
  referenceFrame,
  result
) {
  

  if (!Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this._value)) {
    return undefined;
  }

  result = this._value.getValueInReferenceFrame(time, referenceFrame, result);
  return Object(_Core_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(result)
    ? _Core_Ellipsoid_js__WEBPACK_IMPORTED_MODULE_2__["default"].WGS84.scaleToGeodeticSurface(result, result)
    : undefined;
};

ScaledPositionProperty.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof ScaledPositionProperty && this._value === other._value)
  );
};

ScaledPositionProperty.prototype._raiseDefinitionChanged = function () {
  this._definitionChanged.raiseEvent(this);
};
/* harmony default export */ __webpack_exports__["default"] = (ScaledPositionProperty);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVuZG9yc34zRH5DZXNpdW0tRGF0YVNvdXJjZXMuVGVycmlhTWFwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9Db3JuZXJUeXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy1jZXNpdW0vU291cmNlL0RhdGFTb3VyY2VzL0NvbXBvc2l0ZVBvc2l0aW9uUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvRGF0YVNvdXJjZXMvQ29tcG9zaXRlUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvRGF0YVNvdXJjZXMvUmVmZXJlbmNlUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvRGF0YVNvdXJjZXMvU2NhbGVkUG9zaXRpb25Qcm9wZXJ0eS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFN0eWxlIG9wdGlvbnMgZm9yIGNvcm5lcnMuXG4gKlxuICogQGRlbW8gVGhlIHtAbGluayBodHRwczovL3NhbmRjYXN0bGUuY2VzaXVtLmNvbS9pbmRleC5odG1sP3NyYz1Db3JyaWRvci5odG1sJmxhYmVsPUdlb21ldHJpZXN8Q29ycmlkb3IgRGVtb31cbiAqIGRlbW9uc3RyYXRlcyB0aGUgdGhyZWUgY29ybmVyIHR5cGVzLCBhcyB1c2VkIGJ5IHtAbGluayBDb3JyaWRvckdyYXBoaWNzfS5cbiAqXG4gKiBAZW51bSB7TnVtYmVyfVxuICovXG52YXIgQ29ybmVyVHlwZSA9IHtcbiAgLyoqXG4gICAqIDxpbWcgc3JjPVwiSW1hZ2VzL0Nvcm5lclR5cGVSb3VuZGVkLnBuZ1wiIHN0eWxlPVwidmVydGljYWwtYWxpZ246IG1pZGRsZTtcIiB3aWR0aD1cIjE4NlwiIGhlaWdodD1cIjE4OVwiIC8+XG4gICAqXG4gICAqIENvcm5lciBoYXMgYSBzbW9vdGggZWRnZS5cbiAgICogQHR5cGUge051bWJlcn1cbiAgICogQGNvbnN0YW50XG4gICAqL1xuICBST1VOREVEOiAwLFxuXG4gIC8qKlxuICAgKiA8aW1nIHNyYz1cIkltYWdlcy9Db3JuZXJUeXBlTWl0ZXJlZC5wbmdcIiBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCIgd2lkdGg9XCIxODZcIiBoZWlnaHQ9XCIxODlcIiAvPlxuICAgKlxuICAgKiBDb3JuZXIgcG9pbnQgaXMgdGhlIGludGVyc2VjdGlvbiBvZiBhZGphY2VudCBlZGdlcy5cbiAgICogQHR5cGUge051bWJlcn1cbiAgICogQGNvbnN0YW50XG4gICAqL1xuICBNSVRFUkVEOiAxLFxuXG4gIC8qKlxuICAgKiA8aW1nIHNyYz1cIkltYWdlcy9Db3JuZXJUeXBlQmV2ZWxlZC5wbmdcIiBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCIgd2lkdGg9XCIxODZcIiBoZWlnaHQ9XCIxODlcIiAvPlxuICAgKlxuICAgKiBDb3JuZXIgaXMgY2xpcHBlZC5cbiAgICogQHR5cGUge051bWJlcn1cbiAgICogQGNvbnN0YW50XG4gICAqL1xuICBCRVZFTEVEOiAyLFxufTtcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5mcmVlemUoQ29ybmVyVHlwZSk7XG4iLCJpbXBvcnQgZGVmYXVsdFZhbHVlIGZyb20gXCIuLi9Db3JlL2RlZmF1bHRWYWx1ZS5qc1wiO1xuaW1wb3J0IGRlZmluZWQgZnJvbSBcIi4uL0NvcmUvZGVmaW5lZC5qc1wiO1xuaW1wb3J0IERldmVsb3BlckVycm9yIGZyb20gXCIuLi9Db3JlL0RldmVsb3BlckVycm9yLmpzXCI7XG5pbXBvcnQgRXZlbnQgZnJvbSBcIi4uL0NvcmUvRXZlbnQuanNcIjtcbmltcG9ydCBSZWZlcmVuY2VGcmFtZSBmcm9tIFwiLi4vQ29yZS9SZWZlcmVuY2VGcmFtZS5qc1wiO1xuaW1wb3J0IENvbXBvc2l0ZVByb3BlcnR5IGZyb20gXCIuL0NvbXBvc2l0ZVByb3BlcnR5LmpzXCI7XG5pbXBvcnQgUHJvcGVydHkgZnJvbSBcIi4vUHJvcGVydHkuanNcIjtcblxuLyoqXG4gKiBBIHtAbGluayBDb21wb3NpdGVQcm9wZXJ0eX0gd2hpY2ggaXMgYWxzbyBhIHtAbGluayBQb3NpdGlvblByb3BlcnR5fS5cbiAqXG4gKiBAYWxpYXMgQ29tcG9zaXRlUG9zaXRpb25Qcm9wZXJ0eVxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtSZWZlcmVuY2VGcmFtZX0gW3JlZmVyZW5jZUZyYW1lPVJlZmVyZW5jZUZyYW1lLkZJWEVEXSBUaGUgcmVmZXJlbmNlIGZyYW1lIGluIHdoaWNoIHRoZSBwb3NpdGlvbiBpcyBkZWZpbmVkLlxuICovXG5mdW5jdGlvbiBDb21wb3NpdGVQb3NpdGlvblByb3BlcnR5KHJlZmVyZW5jZUZyYW1lKSB7XG4gIHRoaXMuX3JlZmVyZW5jZUZyYW1lID0gZGVmYXVsdFZhbHVlKHJlZmVyZW5jZUZyYW1lLCBSZWZlcmVuY2VGcmFtZS5GSVhFRCk7XG4gIHRoaXMuX2RlZmluaXRpb25DaGFuZ2VkID0gbmV3IEV2ZW50KCk7XG4gIHRoaXMuX2NvbXBvc2l0ZSA9IG5ldyBDb21wb3NpdGVQcm9wZXJ0eSgpO1xuICB0aGlzLl9jb21wb3NpdGUuZGVmaW5pdGlvbkNoYW5nZWQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBDb21wb3NpdGVQb3NpdGlvblByb3BlcnR5LnByb3RvdHlwZS5fcmFpc2VEZWZpbml0aW9uQ2hhbmdlZCxcbiAgICB0aGlzXG4gICk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKENvbXBvc2l0ZVBvc2l0aW9uUHJvcGVydHkucHJvdG90eXBlLCB7XG4gIC8qKlxuICAgKiBHZXRzIGEgdmFsdWUgaW5kaWNhdGluZyBpZiB0aGlzIHByb3BlcnR5IGlzIGNvbnN0YW50LiAgQSBwcm9wZXJ0eSBpcyBjb25zaWRlcmVkXG4gICAqIGNvbnN0YW50IGlmIGdldFZhbHVlIGFsd2F5cyByZXR1cm5zIHRoZSBzYW1lIHJlc3VsdCBmb3IgdGhlIGN1cnJlbnQgZGVmaW5pdGlvbi5cbiAgICogQG1lbWJlcm9mIENvbXBvc2l0ZVBvc2l0aW9uUHJvcGVydHkucHJvdG90eXBlXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKiBAcmVhZG9ubHlcbiAgICovXG4gIGlzQ29uc3RhbnQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb21wb3NpdGUuaXNDb25zdGFudDtcbiAgICB9LFxuICB9LFxuICAvKipcbiAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyByYWlzZWQgd2hlbmV2ZXIgdGhlIGRlZmluaXRpb24gb2YgdGhpcyBwcm9wZXJ0eSBjaGFuZ2VzLlxuICAgKiBUaGUgZGVmaW5pdGlvbiBpcyBjaGFuZ2VkIHdoZW5ldmVyIHNldFZhbHVlIGlzIGNhbGxlZCB3aXRoIGRhdGEgZGlmZmVyZW50XG4gICAqIHRoYW4gdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAqIEBtZW1iZXJvZiBDb21wb3NpdGVQb3NpdGlvblByb3BlcnR5LnByb3RvdHlwZVxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnR9XG4gICAqIEByZWFkb25seVxuICAgKi9cbiAgZGVmaW5pdGlvbkNoYW5nZWQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uQ2hhbmdlZDtcbiAgICB9LFxuICB9LFxuICAvKipcbiAgICogR2V0cyB0aGUgaW50ZXJ2YWwgY29sbGVjdGlvbi5cbiAgICogQG1lbWJlcm9mIENvbXBvc2l0ZVBvc2l0aW9uUHJvcGVydHkucHJvdG90eXBlXG4gICAqXG4gICAqIEB0eXBlIHtUaW1lSW50ZXJ2YWxDb2xsZWN0aW9ufVxuICAgKi9cbiAgaW50ZXJ2YWxzOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcG9zaXRlLmludGVydmFscztcbiAgICB9LFxuICB9LFxuICAvKipcbiAgICogR2V0cyBvciBzZXRzIHRoZSByZWZlcmVuY2UgZnJhbWUgd2hpY2ggdGhpcyBwb3NpdGlvbiBwcmVzZW50cyBpdHNlbGYgYXMuXG4gICAqIEVhY2ggUG9zaXRpb25Qcm9wZXJ0eSBtYWtpbmcgdXAgdGhpcyBvYmplY3QgaGFzIGl0J3Mgb3duIHJlZmVyZW5jZSBmcmFtZSxcbiAgICogc28gdGhpcyBwcm9wZXJ0eSBtZXJlbHkgZXhwb3NlcyBhIFwicHJlZmVycmVkXCIgcmVmZXJlbmNlIGZyYW1lIGZvciBjbGllbnRzXG4gICAqIHRvIHVzZS5cbiAgICogQG1lbWJlcm9mIENvbXBvc2l0ZVBvc2l0aW9uUHJvcGVydHkucHJvdG90eXBlXG4gICAqXG4gICAqIEB0eXBlIHtSZWZlcmVuY2VGcmFtZX1cbiAgICovXG4gIHJlZmVyZW5jZUZyYW1lOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVmZXJlbmNlRnJhbWU7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5fcmVmZXJlbmNlRnJhbWUgPSB2YWx1ZTtcbiAgICB9LFxuICB9LFxufSk7XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IGF0IHRoZSBwcm92aWRlZCB0aW1lIGluIHRoZSBmaXhlZCBmcmFtZS5cbiAqXG4gKiBAcGFyYW0ge0p1bGlhbkRhdGV9IHRpbWUgVGhlIHRpbWUgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSB2YWx1ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzdWx0XSBUaGUgb2JqZWN0IHRvIHN0b3JlIHRoZSB2YWx1ZSBpbnRvLCBpZiBvbWl0dGVkLCBhIG5ldyBpbnN0YW5jZSBpcyBjcmVhdGVkIGFuZCByZXR1cm5lZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBtb2RpZmllZCByZXN1bHQgcGFyYW1ldGVyIG9yIGEgbmV3IGluc3RhbmNlIGlmIHRoZSByZXN1bHQgcGFyYW1ldGVyIHdhcyBub3Qgc3VwcGxpZWQuXG4gKi9cbkNvbXBvc2l0ZVBvc2l0aW9uUHJvcGVydHkucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKHRpbWUsIHJlc3VsdCkge1xuICByZXR1cm4gdGhpcy5nZXRWYWx1ZUluUmVmZXJlbmNlRnJhbWUodGltZSwgUmVmZXJlbmNlRnJhbWUuRklYRUQsIHJlc3VsdCk7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSBhdCB0aGUgcHJvdmlkZWQgdGltZSBhbmQgaW4gdGhlIHByb3ZpZGVkIHJlZmVyZW5jZSBmcmFtZS5cbiAqXG4gKiBAcGFyYW0ge0p1bGlhbkRhdGV9IHRpbWUgVGhlIHRpbWUgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSB2YWx1ZS5cbiAqIEBwYXJhbSB7UmVmZXJlbmNlRnJhbWV9IHJlZmVyZW5jZUZyYW1lIFRoZSBkZXNpcmVkIHJlZmVyZW5jZUZyYW1lIG9mIHRoZSByZXN1bHQuXG4gKiBAcGFyYW0ge0NhcnRlc2lhbjN9IFtyZXN1bHRdIFRoZSBvYmplY3QgdG8gc3RvcmUgdGhlIHZhbHVlIGludG8sIGlmIG9taXR0ZWQsIGEgbmV3IGluc3RhbmNlIGlzIGNyZWF0ZWQgYW5kIHJldHVybmVkLlxuICogQHJldHVybnMge0NhcnRlc2lhbjN9IFRoZSBtb2RpZmllZCByZXN1bHQgcGFyYW1ldGVyIG9yIGEgbmV3IGluc3RhbmNlIGlmIHRoZSByZXN1bHQgcGFyYW1ldGVyIHdhcyBub3Qgc3VwcGxpZWQuXG4gKi9cbkNvbXBvc2l0ZVBvc2l0aW9uUHJvcGVydHkucHJvdG90eXBlLmdldFZhbHVlSW5SZWZlcmVuY2VGcmFtZSA9IGZ1bmN0aW9uIChcbiAgdGltZSxcbiAgcmVmZXJlbmNlRnJhbWUsXG4gIHJlc3VsdFxuKSB7XG4gIFxuXG4gIHZhciBpbm5lclByb3BlcnR5ID0gdGhpcy5fY29tcG9zaXRlLl9pbnRlcnZhbHMuZmluZERhdGFGb3JJbnRlcnZhbENvbnRhaW5pbmdEYXRlKFxuICAgIHRpbWVcbiAgKTtcbiAgaWYgKGRlZmluZWQoaW5uZXJQcm9wZXJ0eSkpIHtcbiAgICByZXR1cm4gaW5uZXJQcm9wZXJ0eS5nZXRWYWx1ZUluUmVmZXJlbmNlRnJhbWUodGltZSwgcmVmZXJlbmNlRnJhbWUsIHJlc3VsdCk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogQ29tcGFyZXMgdGhpcyBwcm9wZXJ0eSB0byB0aGUgcHJvdmlkZWQgcHJvcGVydHkgYW5kIHJldHVybnNcbiAqIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZXkgYXJlIGVxdWFsLCA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7UHJvcGVydHl9IFtvdGhlcl0gVGhlIG90aGVyIHByb3BlcnR5LlxuICogQHJldHVybnMge0Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIGxlZnQgYW5kIHJpZ2h0IGFyZSBlcXVhbCwgPGNvZGU+ZmFsc2U8L2NvZGU+IG90aGVyd2lzZS5cbiAqL1xuQ29tcG9zaXRlUG9zaXRpb25Qcm9wZXJ0eS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIHJldHVybiAoXG4gICAgdGhpcyA9PT0gb3RoZXIgfHwgLy9cbiAgICAob3RoZXIgaW5zdGFuY2VvZiBDb21wb3NpdGVQb3NpdGlvblByb3BlcnR5ICYmIC8vXG4gICAgICB0aGlzLl9yZWZlcmVuY2VGcmFtZSA9PT0gb3RoZXIuX3JlZmVyZW5jZUZyYW1lICYmIC8vXG4gICAgICB0aGlzLl9jb21wb3NpdGUuZXF1YWxzKG90aGVyLl9jb21wb3NpdGUsIFByb3BlcnR5LmVxdWFscykpXG4gICk7XG59O1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbkNvbXBvc2l0ZVBvc2l0aW9uUHJvcGVydHkucHJvdG90eXBlLl9yYWlzZURlZmluaXRpb25DaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9kZWZpbml0aW9uQ2hhbmdlZC5yYWlzZUV2ZW50KHRoaXMpO1xufTtcbmV4cG9ydCBkZWZhdWx0IENvbXBvc2l0ZVBvc2l0aW9uUHJvcGVydHk7XG4iLCJpbXBvcnQgZGVmaW5lZCBmcm9tIFwiLi4vQ29yZS9kZWZpbmVkLmpzXCI7XG5pbXBvcnQgRGV2ZWxvcGVyRXJyb3IgZnJvbSBcIi4uL0NvcmUvRGV2ZWxvcGVyRXJyb3IuanNcIjtcbmltcG9ydCBFdmVudCBmcm9tIFwiLi4vQ29yZS9FdmVudC5qc1wiO1xuaW1wb3J0IEV2ZW50SGVscGVyIGZyb20gXCIuLi9Db3JlL0V2ZW50SGVscGVyLmpzXCI7XG5pbXBvcnQgVGltZUludGVydmFsQ29sbGVjdGlvbiBmcm9tIFwiLi4vQ29yZS9UaW1lSW50ZXJ2YWxDb2xsZWN0aW9uLmpzXCI7XG5pbXBvcnQgUHJvcGVydHkgZnJvbSBcIi4vUHJvcGVydHkuanNcIjtcblxuZnVuY3Rpb24gc3Vic2NyaWJlQWxsKHByb3BlcnR5LCBldmVudEhlbHBlciwgZGVmaW5pdGlvbkNoYW5nZWQsIGludGVydmFscykge1xuICBmdW5jdGlvbiBjYWxsYmFjaygpIHtcbiAgICBkZWZpbml0aW9uQ2hhbmdlZC5yYWlzZUV2ZW50KHByb3BlcnR5KTtcbiAgfVxuICB2YXIgaXRlbXMgPSBbXTtcbiAgZXZlbnRIZWxwZXIucmVtb3ZlQWxsKCk7XG4gIHZhciBsZW5ndGggPSBpbnRlcnZhbHMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGludGVydmFsID0gaW50ZXJ2YWxzLmdldChpKTtcbiAgICBpZiAoZGVmaW5lZChpbnRlcnZhbC5kYXRhKSAmJiBpdGVtcy5pbmRleE9mKGludGVydmFsLmRhdGEpID09PSAtMSkge1xuICAgICAgZXZlbnRIZWxwZXIuYWRkKGludGVydmFsLmRhdGEuZGVmaW5pdGlvbkNoYW5nZWQsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBIHtAbGluayBQcm9wZXJ0eX0gd2hpY2ggaXMgZGVmaW5lZCBieSBhIHtAbGluayBUaW1lSW50ZXJ2YWxDb2xsZWN0aW9ufSwgd2hlcmUgdGhlXG4gKiBkYXRhIHByb3BlcnR5IG9mIGVhY2gge0BsaW5rIFRpbWVJbnRlcnZhbH0gaXMgYW5vdGhlciBQcm9wZXJ0eSBpbnN0YW5jZSB3aGljaCBpc1xuICogZXZhbHVhdGVkIGF0IHRoZSBwcm92aWRlZCB0aW1lLlxuICpcbiAqIEBhbGlhcyBDb21wb3NpdGVQcm9wZXJ0eVxuICogQGNvbnN0cnVjdG9yXG4gKlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgY29uc3RhbnRQcm9wZXJ0eSA9IC4uLjtcbiAqIHZhciBzYW1wbGVkUHJvcGVydHkgPSAuLi47XG4gKlxuICogLy9DcmVhdGUgYSBjb21wb3NpdGUgcHJvcGVydHkgZnJvbSB0d28gcHJldmlvdXNseSBkZWZpbmVkIHByb3BlcnRpZXNcbiAqIC8vd2hlcmUgdGhlIHByb3BlcnR5IGlzIHZhbGlkIG9uIEF1Z3VzdCAxc3QsIDIwMTIgYW5kIHVzZXMgYSBjb25zdGFudFxuICogLy9wcm9wZXJ0eSBmb3IgdGhlIGZpcnN0IGhhbGYgb2YgdGhlIGRheSBhbmQgYSBzYW1wbGVkIHByb3BlcnR5IGZvciB0aGVcbiAqIC8vcmVtYWluaW5nIGhhbGYuXG4gKiB2YXIgY29tcG9zaXRlID0gbmV3IENlc2l1bS5Db21wb3NpdGVQcm9wZXJ0eSgpO1xuICogY29tcG9zaXRlLmludGVydmFscy5hZGRJbnRlcnZhbChDZXNpdW0uVGltZUludGVydmFsLmZyb21Jc284NjAxKHtcbiAqICAgICBpc284NjAxIDogJzIwMTItMDgtMDFUMDA6MDA6MDAuMDBaLzIwMTItMDgtMDFUMTI6MDA6MDAuMDBaJyxcbiAqICAgICBkYXRhIDogY29uc3RhbnRQcm9wZXJ0eVxuICogfSkpO1xuICogY29tcG9zaXRlLmludGVydmFscy5hZGRJbnRlcnZhbChDZXNpdW0uVGltZUludGVydmFsLmZyb21Jc284NjAxKHtcbiAqICAgICBpc284NjAxIDogJzIwMTItMDgtMDFUMTI6MDA6MDAuMDBaLzIwMTItMDgtMDJUMDA6MDA6MDAuMDBaJyxcbiAqICAgICBpc1N0YXJ0SW5jbHVkZWQgOiBmYWxzZSxcbiAqICAgICBpc1N0b3BJbmNsdWRlZCA6IGZhbHNlLFxuICogICAgIGRhdGEgOiBzYW1wbGVkUHJvcGVydHlcbiAqIH0pKTtcbiAqXG4gKiBAc2VlIENvbXBvc2l0ZU1hdGVyaWFsUHJvcGVydHlcbiAqIEBzZWUgQ29tcG9zaXRlUG9zaXRpb25Qcm9wZXJ0eVxuICovXG5mdW5jdGlvbiBDb21wb3NpdGVQcm9wZXJ0eSgpIHtcbiAgdGhpcy5fZXZlbnRIZWxwZXIgPSBuZXcgRXZlbnRIZWxwZXIoKTtcbiAgdGhpcy5fZGVmaW5pdGlvbkNoYW5nZWQgPSBuZXcgRXZlbnQoKTtcbiAgdGhpcy5faW50ZXJ2YWxzID0gbmV3IFRpbWVJbnRlcnZhbENvbGxlY3Rpb24oKTtcbiAgdGhpcy5faW50ZXJ2YWxzLmNoYW5nZWRFdmVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgIENvbXBvc2l0ZVByb3BlcnR5LnByb3RvdHlwZS5faW50ZXJ2YWxzQ2hhbmdlZCxcbiAgICB0aGlzXG4gICk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKENvbXBvc2l0ZVByb3BlcnR5LnByb3RvdHlwZSwge1xuICAvKipcbiAgICogR2V0cyBhIHZhbHVlIGluZGljYXRpbmcgaWYgdGhpcyBwcm9wZXJ0eSBpcyBjb25zdGFudC4gIEEgcHJvcGVydHkgaXMgY29uc2lkZXJlZFxuICAgKiBjb25zdGFudCBpZiBnZXRWYWx1ZSBhbHdheXMgcmV0dXJucyB0aGUgc2FtZSByZXN1bHQgZm9yIHRoZSBjdXJyZW50IGRlZmluaXRpb24uXG4gICAqIEBtZW1iZXJvZiBDb21wb3NpdGVQcm9wZXJ0eS5wcm90b3R5cGVcbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqIEByZWFkb25seVxuICAgKi9cbiAgaXNDb25zdGFudDoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2ludGVydmFscy5pc0VtcHR5O1xuICAgIH0sXG4gIH0sXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBldmVudCB0aGF0IGlzIHJhaXNlZCB3aGVuZXZlciB0aGUgZGVmaW5pdGlvbiBvZiB0aGlzIHByb3BlcnR5IGNoYW5nZXMuXG4gICAqIFRoZSBkZWZpbml0aW9uIGlzIGNoYW5nZWQgd2hlbmV2ZXIgc2V0VmFsdWUgaXMgY2FsbGVkIHdpdGggZGF0YSBkaWZmZXJlbnRcbiAgICogdGhhbiB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICogQG1lbWJlcm9mIENvbXBvc2l0ZVByb3BlcnR5LnByb3RvdHlwZVxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnR9XG4gICAqIEByZWFkb25seVxuICAgKi9cbiAgZGVmaW5pdGlvbkNoYW5nZWQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uQ2hhbmdlZDtcbiAgICB9LFxuICB9LFxuICAvKipcbiAgICogR2V0cyB0aGUgaW50ZXJ2YWwgY29sbGVjdGlvbi5cbiAgICogQG1lbWJlcm9mIENvbXBvc2l0ZVByb3BlcnR5LnByb3RvdHlwZVxuICAgKlxuICAgKiBAdHlwZSB7VGltZUludGVydmFsQ29sbGVjdGlvbn1cbiAgICovXG4gIGludGVydmFsczoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2ludGVydmFscztcbiAgICB9LFxuICB9LFxufSk7XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IGF0IHRoZSBwcm92aWRlZCB0aW1lLlxuICpcbiAqIEBwYXJhbSB7SnVsaWFuRGF0ZX0gdGltZSBUaGUgdGltZSBmb3Igd2hpY2ggdG8gcmV0cmlldmUgdGhlIHZhbHVlLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXN1bHRdIFRoZSBvYmplY3QgdG8gc3RvcmUgdGhlIHZhbHVlIGludG8sIGlmIG9taXR0ZWQsIGEgbmV3IGluc3RhbmNlIGlzIGNyZWF0ZWQgYW5kIHJldHVybmVkLlxuICogQHJldHVybnMge09iamVjdH0gVGhlIG1vZGlmaWVkIHJlc3VsdCBwYXJhbWV0ZXIgb3IgYSBuZXcgaW5zdGFuY2UgaWYgdGhlIHJlc3VsdCBwYXJhbWV0ZXIgd2FzIG5vdCBzdXBwbGllZC5cbiAqL1xuQ29tcG9zaXRlUHJvcGVydHkucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKHRpbWUsIHJlc3VsdCkge1xuICBcblxuICB2YXIgaW5uZXJQcm9wZXJ0eSA9IHRoaXMuX2ludGVydmFscy5maW5kRGF0YUZvckludGVydmFsQ29udGFpbmluZ0RhdGUodGltZSk7XG4gIGlmIChkZWZpbmVkKGlubmVyUHJvcGVydHkpKSB7XG4gICAgcmV0dXJuIGlubmVyUHJvcGVydHkuZ2V0VmFsdWUodGltZSwgcmVzdWx0KTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuLyoqXG4gKiBDb21wYXJlcyB0aGlzIHByb3BlcnR5IHRvIHRoZSBwcm92aWRlZCBwcm9wZXJ0eSBhbmQgcmV0dXJuc1xuICogPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhleSBhcmUgZXF1YWwsIDxjb2RlPmZhbHNlPC9jb2RlPiBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtQcm9wZXJ0eX0gW290aGVyXSBUaGUgb3RoZXIgcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgbGVmdCBhbmQgcmlnaHQgYXJlIGVxdWFsLCA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxuICovXG5Db21wb3NpdGVQcm9wZXJ0eS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIHJldHVybiAoXG4gICAgdGhpcyA9PT0gb3RoZXIgfHwgLy9cbiAgICAob3RoZXIgaW5zdGFuY2VvZiBDb21wb3NpdGVQcm9wZXJ0eSAmJiAvL1xuICAgICAgdGhpcy5faW50ZXJ2YWxzLmVxdWFscyhvdGhlci5faW50ZXJ2YWxzLCBQcm9wZXJ0eS5lcXVhbHMpKVxuICApO1xufTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5Db21wb3NpdGVQcm9wZXJ0eS5wcm90b3R5cGUuX2ludGVydmFsc0NoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHN1YnNjcmliZUFsbChcbiAgICB0aGlzLFxuICAgIHRoaXMuX2V2ZW50SGVscGVyLFxuICAgIHRoaXMuX2RlZmluaXRpb25DaGFuZ2VkLFxuICAgIHRoaXMuX2ludGVydmFsc1xuICApO1xuICB0aGlzLl9kZWZpbml0aW9uQ2hhbmdlZC5yYWlzZUV2ZW50KHRoaXMpO1xufTtcbmV4cG9ydCBkZWZhdWx0IENvbXBvc2l0ZVByb3BlcnR5O1xuIiwiaW1wb3J0IGRlZmluZWQgZnJvbSBcIi4uL0NvcmUvZGVmaW5lZC5qc1wiO1xuaW1wb3J0IERldmVsb3BlckVycm9yIGZyb20gXCIuLi9Db3JlL0RldmVsb3BlckVycm9yLmpzXCI7XG5pbXBvcnQgRXZlbnQgZnJvbSBcIi4uL0NvcmUvRXZlbnQuanNcIjtcbmltcG9ydCBQcm9wZXJ0eSBmcm9tIFwiLi9Qcm9wZXJ0eS5qc1wiO1xuXG5mdW5jdGlvbiByZXNvbHZlKHRoYXQpIHtcbiAgdmFyIHRhcmdldFByb3BlcnR5ID0gdGhhdC5fdGFyZ2V0UHJvcGVydHk7XG5cbiAgaWYgKCFkZWZpbmVkKHRhcmdldFByb3BlcnR5KSkge1xuICAgIHZhciB0YXJnZXRFbnRpdHkgPSB0aGF0Ll90YXJnZXRFbnRpdHk7XG5cbiAgICBpZiAoIWRlZmluZWQodGFyZ2V0RW50aXR5KSkge1xuICAgICAgdGFyZ2V0RW50aXR5ID0gdGhhdC5fdGFyZ2V0Q29sbGVjdGlvbi5nZXRCeUlkKHRoYXQuX3RhcmdldElkKTtcblxuICAgICAgaWYgKCFkZWZpbmVkKHRhcmdldEVudGl0eSkpIHtcbiAgICAgICAgLy8gdGFyZ2V0IGVudGl0eSBub3QgZm91bmRcbiAgICAgICAgdGhhdC5fdGFyZ2V0RW50aXR5ID0gdGhhdC5fdGFyZ2V0UHJvcGVydHkgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gdGFyZ2V0IGVudGl0eSB3YXMgZm91bmQuIGxpc3RlbiBmb3IgY2hhbmdlcyB0byBlbnRpdHkgZGVmaW5pdGlvblxuICAgICAgdGFyZ2V0RW50aXR5LmRlZmluaXRpb25DaGFuZ2VkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFJlZmVyZW5jZVByb3BlcnR5LnByb3RvdHlwZS5fb25UYXJnZXRFbnRpdHlEZWZpbml0aW9uQ2hhbmdlZCxcbiAgICAgICAgdGhhdFxuICAgICAgKTtcbiAgICAgIHRoYXQuX3RhcmdldEVudGl0eSA9IHRhcmdldEVudGl0eTtcbiAgICB9XG5cbiAgICAvLyB3YWxrIHRoZSBsaXN0IG9mIHByb3BlcnR5IG5hbWVzIGFuZCByZXNvbHZlIHByb3BlcnRpZXNcbiAgICB2YXIgdGFyZ2V0UHJvcGVydHlOYW1lcyA9IHRoYXQuX3RhcmdldFByb3BlcnR5TmFtZXM7XG4gICAgdGFyZ2V0UHJvcGVydHkgPSB0aGF0Ll90YXJnZXRFbnRpdHk7XG4gICAgZm9yIChcbiAgICAgIHZhciBpID0gMCwgbGVuID0gdGFyZ2V0UHJvcGVydHlOYW1lcy5sZW5ndGg7XG4gICAgICBpIDwgbGVuICYmIGRlZmluZWQodGFyZ2V0UHJvcGVydHkpO1xuICAgICAgKytpXG4gICAgKSB7XG4gICAgICB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFByb3BlcnR5W3RhcmdldFByb3BlcnR5TmFtZXNbaV1dO1xuICAgIH1cblxuICAgIC8vIHRhcmdldCBwcm9wZXJ0eSBtYXkgb3IgbWF5IG5vdCBiZSBkZWZpbmVkLCBkZXBlbmRpbmcgb24gaWYgaXQgd2FzIGZvdW5kXG4gICAgdGhhdC5fdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRQcm9wZXJ0eTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXRQcm9wZXJ0eTtcbn1cblxuLyoqXG4gKiBBIHtAbGluayBQcm9wZXJ0eX0gd2hpY2ggdHJhbnNwYXJlbnRseSBsaW5rcyB0byBhbm90aGVyIHByb3BlcnR5IG9uIGEgcHJvdmlkZWQgb2JqZWN0LlxuICpcbiAqIEBhbGlhcyBSZWZlcmVuY2VQcm9wZXJ0eVxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtFbnRpdHlDb2xsZWN0aW9ufSB0YXJnZXRDb2xsZWN0aW9uIFRoZSBlbnRpdHkgY29sbGVjdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmVzb2x2ZSB0aGUgcmVmZXJlbmNlLlxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldElkIFRoZSBpZCBvZiB0aGUgZW50aXR5IHdoaWNoIGlzIGJlaW5nIHJlZmVyZW5jZWQuXG4gKiBAcGFyYW0ge1N0cmluZ1tdfSB0YXJnZXRQcm9wZXJ0eU5hbWVzIFRoZSBuYW1lcyBvZiB0aGUgcHJvcGVydHkgb24gdGhlIHRhcmdldCBlbnRpdHkgd2hpY2ggd2Ugd2lsbCB1c2UuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBjb2xsZWN0aW9uID0gbmV3IENlc2l1bS5FbnRpdHlDb2xsZWN0aW9uKCk7XG4gKlxuICogLy9DcmVhdGUgYSBuZXcgZW50aXR5IGFuZCBhc3NpZ24gYSBiaWxsYm9hcmQgc2NhbGUuXG4gKiB2YXIgb2JqZWN0MSA9IG5ldyBDZXNpdW0uRW50aXR5KHtpZDonb2JqZWN0MSd9KTtcbiAqIG9iamVjdDEuYmlsbGJvYXJkID0gbmV3IENlc2l1bS5CaWxsYm9hcmRHcmFwaGljcygpO1xuICogb2JqZWN0MS5iaWxsYm9hcmQuc2NhbGUgPSBuZXcgQ2VzaXVtLkNvbnN0YW50UHJvcGVydHkoMi4wKTtcbiAqIGNvbGxlY3Rpb24uYWRkKG9iamVjdDEpO1xuICpcbiAqIC8vQ3JlYXRlIGEgc2Vjb25kIGVudGl0eSBhbmQgcmVmZXJlbmNlIHRoZSBzY2FsZSBmcm9tIHRoZSBmaXJzdCBvbmUuXG4gKiB2YXIgb2JqZWN0MiA9IG5ldyBDZXNpdW0uRW50aXR5KHtpZDonb2JqZWN0Mid9KTtcbiAqIG9iamVjdDIubW9kZWwgPSBuZXcgQ2VzaXVtLk1vZGVsR3JhcGhpY3MoKTtcbiAqIG9iamVjdDIubW9kZWwuc2NhbGUgPSBuZXcgQ2VzaXVtLlJlZmVyZW5jZVByb3BlcnR5KGNvbGxlY3Rpb24sICdvYmplY3QxJywgWydiaWxsYm9hcmQnLCAnc2NhbGUnXSk7XG4gKiBjb2xsZWN0aW9uLmFkZChvYmplY3QyKTtcbiAqXG4gKiAvL0NyZWF0ZSBhIHRoaXJkIG9iamVjdCwgYnV0IHVzZSB0aGUgZnJvbVN0cmluZyBoZWxwZXIgZnVuY3Rpb24uXG4gKiB2YXIgb2JqZWN0MyA9IG5ldyBDZXNpdW0uRW50aXR5KHtpZDonb2JqZWN0Myd9KTtcbiAqIG9iamVjdDMuYmlsbGJvYXJkID0gbmV3IENlc2l1bS5CaWxsYm9hcmRHcmFwaGljcygpO1xuICogb2JqZWN0My5iaWxsYm9hcmQuc2NhbGUgPSBDZXNpdW0uUmVmZXJlbmNlUHJvcGVydHkuZnJvbVN0cmluZyhjb2xsZWN0aW9uLCAnb2JqZWN0MSNiaWxsYm9hcmQuc2NhbGUnKTtcbiAqIGNvbGxlY3Rpb24uYWRkKG9iamVjdDMpO1xuICpcbiAqIC8vWW91IGNhbiByZWZlciB0byBhbiBlbnRpdHkgd2l0aCBhICMgb3IgLiBpbiBpZCBhbmQgcHJvcGVydHkgbmFtZXMgYnkgZXNjYXBpbmcgdGhlbS5cbiAqIHZhciBvYmplY3Q0ID0gbmV3IENlc2l1bS5FbnRpdHkoe2lkOicjb2JqZWN0LjQnfSk7XG4gKiBvYmplY3Q0LmJpbGxib2FyZCA9IG5ldyBDZXNpdW0uQmlsbGJvYXJkR3JhcGhpY3MoKTtcbiAqIG9iamVjdDQuYmlsbGJvYXJkLnNjYWxlID0gbmV3IENlc2l1bS5Db25zdGFudFByb3BlcnR5KDIuMCk7XG4gKiBjb2xsZWN0aW9uLmFkZChvYmplY3Q0KTtcbiAqXG4gKiB2YXIgb2JqZWN0NSA9IG5ldyBDZXNpdW0uRW50aXR5KHtpZDonb2JqZWN0NSd9KTtcbiAqIG9iamVjdDUuYmlsbGJvYXJkID0gbmV3IENlc2l1bS5CaWxsYm9hcmRHcmFwaGljcygpO1xuICogb2JqZWN0NS5iaWxsYm9hcmQuc2NhbGUgPSBDZXNpdW0uUmVmZXJlbmNlUHJvcGVydHkuZnJvbVN0cmluZyhjb2xsZWN0aW9uLCAnXFxcXCNvYmplY3RcXFxcLjQjYmlsbGJvYXJkLnNjYWxlJyk7XG4gKiBjb2xsZWN0aW9uLmFkZChvYmplY3Q1KTtcbiAqL1xuZnVuY3Rpb24gUmVmZXJlbmNlUHJvcGVydHkodGFyZ2V0Q29sbGVjdGlvbiwgdGFyZ2V0SWQsIHRhcmdldFByb3BlcnR5TmFtZXMpIHtcbiAgXG5cbiAgdGhpcy5fdGFyZ2V0Q29sbGVjdGlvbiA9IHRhcmdldENvbGxlY3Rpb247XG4gIHRoaXMuX3RhcmdldElkID0gdGFyZ2V0SWQ7XG4gIHRoaXMuX3RhcmdldFByb3BlcnR5TmFtZXMgPSB0YXJnZXRQcm9wZXJ0eU5hbWVzO1xuICB0aGlzLl90YXJnZXRQcm9wZXJ0eSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5fdGFyZ2V0RW50aXR5ID0gdW5kZWZpbmVkO1xuICB0aGlzLl9kZWZpbml0aW9uQ2hhbmdlZCA9IG5ldyBFdmVudCgpO1xuXG4gIHRhcmdldENvbGxlY3Rpb24uY29sbGVjdGlvbkNoYW5nZWQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBSZWZlcmVuY2VQcm9wZXJ0eS5wcm90b3R5cGUuX29uQ29sbGVjdGlvbkNoYW5nZWQsXG4gICAgdGhpc1xuICApO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZWZlcmVuY2VQcm9wZXJ0eS5wcm90b3R5cGUsIHtcbiAgLyoqXG4gICAqIEdldHMgYSB2YWx1ZSBpbmRpY2F0aW5nIGlmIHRoaXMgcHJvcGVydHkgaXMgY29uc3RhbnQuXG4gICAqIEBtZW1iZXJvZiBSZWZlcmVuY2VQcm9wZXJ0eS5wcm90b3R5cGVcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqIEByZWFkb25seVxuICAgKi9cbiAgaXNDb25zdGFudDoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFByb3BlcnR5LmlzQ29uc3RhbnQocmVzb2x2ZSh0aGlzKSk7XG4gICAgfSxcbiAgfSxcbiAgLyoqXG4gICAqIEdldHMgdGhlIGV2ZW50IHRoYXQgaXMgcmFpc2VkIHdoZW5ldmVyIHRoZSBkZWZpbml0aW9uIG9mIHRoaXMgcHJvcGVydHkgY2hhbmdlcy5cbiAgICogVGhlIGRlZmluaXRpb24gaXMgY2hhbmdlZCB3aGVuZXZlciB0aGUgcmVmZXJlbmNlZCBwcm9wZXJ0eSdzIGRlZmluaXRpb24gaXMgY2hhbmdlZC5cbiAgICogQG1lbWJlcm9mIFJlZmVyZW5jZVByb3BlcnR5LnByb3RvdHlwZVxuICAgKiBAdHlwZSB7RXZlbnR9XG4gICAqIEByZWFkb25seVxuICAgKi9cbiAgZGVmaW5pdGlvbkNoYW5nZWQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uQ2hhbmdlZDtcbiAgICB9LFxuICB9LFxuICAvKipcbiAgICogR2V0cyB0aGUgcmVmZXJlbmNlIGZyYW1lIHRoYXQgdGhlIHBvc2l0aW9uIGlzIGRlZmluZWQgaW4uXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgb25seSB2YWxpZCBpZiB0aGUgcmVmZXJlbmNlZCBwcm9wZXJ0eSBpcyBhIHtAbGluayBQb3NpdGlvblByb3BlcnR5fS5cbiAgICogQG1lbWJlcm9mIFJlZmVyZW5jZVByb3BlcnR5LnByb3RvdHlwZVxuICAgKiBAdHlwZSB7UmVmZXJlbmNlRnJhbWV9XG4gICAqIEByZWFkb25seVxuICAgKi9cbiAgcmVmZXJlbmNlRnJhbWU6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0YXJnZXQgPSByZXNvbHZlKHRoaXMpO1xuICAgICAgcmV0dXJuIGRlZmluZWQodGFyZ2V0KSA/IHRhcmdldC5yZWZlcmVuY2VGcmFtZSA6IHVuZGVmaW5lZDtcbiAgICB9LFxuICB9LFxuICAvKipcbiAgICogR2V0cyB0aGUgaWQgb2YgdGhlIGVudGl0eSBiZWluZyByZWZlcmVuY2VkLlxuICAgKiBAbWVtYmVyb2YgUmVmZXJlbmNlUHJvcGVydHkucHJvdG90eXBlXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqIEByZWFkb25seVxuICAgKi9cbiAgdGFyZ2V0SWQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl90YXJnZXRJZDtcbiAgICB9LFxuICB9LFxuICAvKipcbiAgICogR2V0cyB0aGUgY29sbGVjdGlvbiBjb250YWluaW5nIHRoZSBlbnRpdHkgYmVpbmcgcmVmZXJlbmNlZC5cbiAgICogQG1lbWJlcm9mIFJlZmVyZW5jZVByb3BlcnR5LnByb3RvdHlwZVxuICAgKiBAdHlwZSB7RW50aXR5Q29sbGVjdGlvbn1cbiAgICogQHJlYWRvbmx5XG4gICAqL1xuICB0YXJnZXRDb2xsZWN0aW9uOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0Q29sbGVjdGlvbjtcbiAgICB9LFxuICB9LFxuICAvKipcbiAgICogR2V0cyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgdXNlZCB0byByZXRyaWV2ZSB0aGUgcmVmZXJlbmNlZCBwcm9wZXJ0eS5cbiAgICogQG1lbWJlcm9mIFJlZmVyZW5jZVByb3BlcnR5LnByb3RvdHlwZVxuICAgKiBAdHlwZSB7U3RyaW5nW119XG4gICAqIEByZWFkb25seVxuICAgKi9cbiAgdGFyZ2V0UHJvcGVydHlOYW1lczoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldFByb3BlcnR5TmFtZXM7XG4gICAgfSxcbiAgfSxcbiAgLyoqXG4gICAqIEdldHMgdGhlIHJlc29sdmVkIGluc3RhbmNlIG9mIHRoZSB1bmRlcmx5aW5nIHJlZmVyZW5jZWQgcHJvcGVydHkuXG4gICAqIEBtZW1iZXJvZiBSZWZlcmVuY2VQcm9wZXJ0eS5wcm90b3R5cGVcbiAgICogQHR5cGUge1Byb3BlcnR5fHVuZGVmaW5lZH1cbiAgICogQHJlYWRvbmx5XG4gICAqL1xuICByZXNvbHZlZFByb3BlcnR5OiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzKTtcbiAgICB9LFxuICB9LFxufSk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBnaXZlbiB0aGUgZW50aXR5IGNvbGxlY3Rpb24gdGhhdCB3aWxsXG4gKiBiZSB1c2VkIHRvIHJlc29sdmUgaXQgYW5kIGEgc3RyaW5nIGluZGljYXRpbmcgdGhlIHRhcmdldCBlbnRpdHkgaWQgYW5kIHByb3BlcnR5LlxuICogVGhlIGZvcm1hdCBvZiB0aGUgc3RyaW5nIGlzIFwib2JqZWN0SWQjZm9vLmJhclwiLCB3aGVyZSAjIHNlcGFyYXRlcyB0aGUgaWQgZnJvbVxuICogcHJvcGVydHkgcGF0aCBhbmQgLiBzZXBhcmF0ZXMgc3ViLXByb3BlcnRpZXMuICBJZiB0aGUgcmVmZXJlbmNlIGlkZW50aWZpZXIgb3JcbiAqIG9yIGFueSBzdWItcHJvcGVydGllcyBjb250YWlucyBhICMgLiBvciBcXCB0aGV5IG11c3QgYmUgZXNjYXBlZC5cbiAqXG4gKiBAcGFyYW0ge0VudGl0eUNvbGxlY3Rpb259IHRhcmdldENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7U3RyaW5nfSByZWZlcmVuY2VTdHJpbmdcbiAqIEByZXR1cm5zIHtSZWZlcmVuY2VQcm9wZXJ0eX0gQSBuZXcgaW5zdGFuY2Ugb2YgUmVmZXJlbmNlUHJvcGVydHkuXG4gKlxuICogQGV4Y2VwdGlvbiB7RGV2ZWxvcGVyRXJyb3J9IGludmFsaWQgcmVmZXJlbmNlU3RyaW5nLlxuICovXG5SZWZlcmVuY2VQcm9wZXJ0eS5mcm9tU3RyaW5nID0gZnVuY3Rpb24gKHRhcmdldENvbGxlY3Rpb24sIHJlZmVyZW5jZVN0cmluZykge1xuICBcblxuICB2YXIgaWRlbnRpZmllcjtcbiAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gIHZhciBpbklkZW50aWZpZXIgPSB0cnVlO1xuICB2YXIgaXNFc2NhcGVkID0gZmFsc2U7XG4gIHZhciB0b2tlbiA9IFwiXCI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVmZXJlbmNlU3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGMgPSByZWZlcmVuY2VTdHJpbmcuY2hhckF0KGkpO1xuXG4gICAgaWYgKGlzRXNjYXBlZCkge1xuICAgICAgdG9rZW4gKz0gYztcbiAgICAgIGlzRXNjYXBlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gXCJcXFxcXCIpIHtcbiAgICAgIGlzRXNjYXBlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChpbklkZW50aWZpZXIgJiYgYyA9PT0gXCIjXCIpIHtcbiAgICAgIGlkZW50aWZpZXIgPSB0b2tlbjtcbiAgICAgIGluSWRlbnRpZmllciA9IGZhbHNlO1xuICAgICAgdG9rZW4gPSBcIlwiO1xuICAgIH0gZWxzZSBpZiAoIWluSWRlbnRpZmllciAmJiBjID09PSBcIi5cIikge1xuICAgICAgdmFsdWVzLnB1c2godG9rZW4pO1xuICAgICAgdG9rZW4gPSBcIlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2tlbiArPSBjO1xuICAgIH1cbiAgfVxuICB2YWx1ZXMucHVzaCh0b2tlbik7XG5cbiAgcmV0dXJuIG5ldyBSZWZlcmVuY2VQcm9wZXJ0eSh0YXJnZXRDb2xsZWN0aW9uLCBpZGVudGlmaWVyLCB2YWx1ZXMpO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgYXQgdGhlIHByb3ZpZGVkIHRpbWUuXG4gKlxuICogQHBhcmFtIHtKdWxpYW5EYXRlfSB0aW1lIFRoZSB0aW1lIGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgdmFsdWUuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3VsdF0gVGhlIG9iamVjdCB0byBzdG9yZSB0aGUgdmFsdWUgaW50bywgaWYgb21pdHRlZCwgYSBuZXcgaW5zdGFuY2UgaXMgY3JlYXRlZCBhbmQgcmV0dXJuZWQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgbW9kaWZpZWQgcmVzdWx0IHBhcmFtZXRlciBvciBhIG5ldyBpbnN0YW5jZSBpZiB0aGUgcmVzdWx0IHBhcmFtZXRlciB3YXMgbm90IHN1cHBsaWVkLlxuICovXG5SZWZlcmVuY2VQcm9wZXJ0eS5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAodGltZSwgcmVzdWx0KSB7XG4gIHZhciB0YXJnZXQgPSByZXNvbHZlKHRoaXMpO1xuICByZXR1cm4gZGVmaW5lZCh0YXJnZXQpID8gdGFyZ2V0LmdldFZhbHVlKHRpbWUsIHJlc3VsdCkgOiB1bmRlZmluZWQ7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSBhdCB0aGUgcHJvdmlkZWQgdGltZSBhbmQgaW4gdGhlIHByb3ZpZGVkIHJlZmVyZW5jZSBmcmFtZS5cbiAqIFRoaXMgbWV0aG9kIGlzIG9ubHkgdmFsaWQgaWYgdGhlIHByb3BlcnR5IGJlaW5nIHJlZmVyZW5jZWQgaXMgYSB7QGxpbmsgUG9zaXRpb25Qcm9wZXJ0eX0uXG4gKlxuICogQHBhcmFtIHtKdWxpYW5EYXRlfSB0aW1lIFRoZSB0aW1lIGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgdmFsdWUuXG4gKiBAcGFyYW0ge1JlZmVyZW5jZUZyYW1lfSByZWZlcmVuY2VGcmFtZSBUaGUgZGVzaXJlZCByZWZlcmVuY2VGcmFtZSBvZiB0aGUgcmVzdWx0LlxuICogQHBhcmFtIHtDYXJ0ZXNpYW4zfSBbcmVzdWx0XSBUaGUgb2JqZWN0IHRvIHN0b3JlIHRoZSB2YWx1ZSBpbnRvLCBpZiBvbWl0dGVkLCBhIG5ldyBpbnN0YW5jZSBpcyBjcmVhdGVkIGFuZCByZXR1cm5lZC5cbiAqIEByZXR1cm5zIHtDYXJ0ZXNpYW4zfSBUaGUgbW9kaWZpZWQgcmVzdWx0IHBhcmFtZXRlciBvciBhIG5ldyBpbnN0YW5jZSBpZiB0aGUgcmVzdWx0IHBhcmFtZXRlciB3YXMgbm90IHN1cHBsaWVkLlxuICovXG5SZWZlcmVuY2VQcm9wZXJ0eS5wcm90b3R5cGUuZ2V0VmFsdWVJblJlZmVyZW5jZUZyYW1lID0gZnVuY3Rpb24gKFxuICB0aW1lLFxuICByZWZlcmVuY2VGcmFtZSxcbiAgcmVzdWx0XG4pIHtcbiAgdmFyIHRhcmdldCA9IHJlc29sdmUodGhpcyk7XG4gIHJldHVybiBkZWZpbmVkKHRhcmdldClcbiAgICA/IHRhcmdldC5nZXRWYWx1ZUluUmVmZXJlbmNlRnJhbWUodGltZSwgcmVmZXJlbmNlRnJhbWUsIHJlc3VsdClcbiAgICA6IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUge0BsaW5rIE1hdGVyaWFsfSB0eXBlIGF0IHRoZSBwcm92aWRlZCB0aW1lLlxuICogVGhpcyBtZXRob2QgaXMgb25seSB2YWxpZCBpZiB0aGUgcHJvcGVydHkgYmVpbmcgcmVmZXJlbmNlZCBpcyBhIHtAbGluayBNYXRlcmlhbFByb3BlcnR5fS5cbiAqXG4gKiBAcGFyYW0ge0p1bGlhbkRhdGV9IHRpbWUgVGhlIHRpbWUgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSB0eXBlLlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIHR5cGUgb2YgbWF0ZXJpYWwuXG4gKi9cblJlZmVyZW5jZVByb3BlcnR5LnByb3RvdHlwZS5nZXRUeXBlID0gZnVuY3Rpb24gKHRpbWUpIHtcbiAgdmFyIHRhcmdldCA9IHJlc29sdmUodGhpcyk7XG4gIHJldHVybiBkZWZpbmVkKHRhcmdldCkgPyB0YXJnZXQuZ2V0VHlwZSh0aW1lKSA6IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogQ29tcGFyZXMgdGhpcyBwcm9wZXJ0eSB0byB0aGUgcHJvdmlkZWQgcHJvcGVydHkgYW5kIHJldHVybnNcbiAqIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZXkgYXJlIGVxdWFsLCA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7UHJvcGVydHl9IFtvdGhlcl0gVGhlIG90aGVyIHByb3BlcnR5LlxuICogQHJldHVybnMge0Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIGxlZnQgYW5kIHJpZ2h0IGFyZSBlcXVhbCwgPGNvZGU+ZmFsc2U8L2NvZGU+IG90aGVyd2lzZS5cbiAqL1xuUmVmZXJlbmNlUHJvcGVydHkucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlcikge1xuICBpZiAodGhpcyA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHZhciBuYW1lcyA9IHRoaXMuX3RhcmdldFByb3BlcnR5TmFtZXM7XG4gIHZhciBvdGhlck5hbWVzID0gb3RoZXIuX3RhcmdldFByb3BlcnR5TmFtZXM7XG5cbiAgaWYgKFxuICAgIHRoaXMuX3RhcmdldENvbGxlY3Rpb24gIT09IG90aGVyLl90YXJnZXRDb2xsZWN0aW9uIHx8IC8vXG4gICAgdGhpcy5fdGFyZ2V0SWQgIT09IG90aGVyLl90YXJnZXRJZCB8fCAvL1xuICAgIG5hbWVzLmxlbmd0aCAhPT0gb3RoZXJOYW1lcy5sZW5ndGhcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IHRoaXMuX3RhcmdldFByb3BlcnR5TmFtZXMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG5hbWVzW2ldICE9PSBvdGhlck5hbWVzW2ldKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5SZWZlcmVuY2VQcm9wZXJ0eS5wcm90b3R5cGUuX29uVGFyZ2V0RW50aXR5RGVmaW5pdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoXG4gIHRhcmdldEVudGl0eSxcbiAgbmFtZSxcbiAgdmFsdWUsXG4gIG9sZFZhbHVlXG4pIHtcbiAgaWYgKGRlZmluZWQodGhpcy5fdGFyZ2V0UHJvcGVydHkpICYmIHRoaXMuX3RhcmdldFByb3BlcnR5TmFtZXNbMF0gPT09IG5hbWUpIHtcbiAgICB0aGlzLl90YXJnZXRQcm9wZXJ0eSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9kZWZpbml0aW9uQ2hhbmdlZC5yYWlzZUV2ZW50KHRoaXMpO1xuICB9XG59O1xuXG5SZWZlcmVuY2VQcm9wZXJ0eS5wcm90b3R5cGUuX29uQ29sbGVjdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoXG4gIGNvbGxlY3Rpb24sXG4gIGFkZGVkLFxuICByZW1vdmVkXG4pIHtcbiAgdmFyIHRhcmdldEVudGl0eSA9IHRoaXMuX3RhcmdldEVudGl0eTtcbiAgaWYgKGRlZmluZWQodGFyZ2V0RW50aXR5KSAmJiByZW1vdmVkLmluZGV4T2YodGFyZ2V0RW50aXR5KSAhPT0gLTEpIHtcbiAgICB0YXJnZXRFbnRpdHkuZGVmaW5pdGlvbkNoYW5nZWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgIFJlZmVyZW5jZVByb3BlcnR5LnByb3RvdHlwZS5fb25UYXJnZXRFbnRpdHlEZWZpbml0aW9uQ2hhbmdlZCxcbiAgICAgIHRoaXNcbiAgICApO1xuICAgIHRoaXMuX3RhcmdldEVudGl0eSA9IHRoaXMuX3RhcmdldFByb3BlcnR5ID0gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKCFkZWZpbmVkKHRhcmdldEVudGl0eSkpIHtcbiAgICB0YXJnZXRFbnRpdHkgPSByZXNvbHZlKHRoaXMpO1xuICAgIGlmIChkZWZpbmVkKHRhcmdldEVudGl0eSkpIHtcbiAgICAgIHRoaXMuX2RlZmluaXRpb25DaGFuZ2VkLnJhaXNlRXZlbnQodGhpcyk7XG4gICAgfVxuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgUmVmZXJlbmNlUHJvcGVydHk7XG4iLCJpbXBvcnQgZGVmaW5lZCBmcm9tIFwiLi4vQ29yZS9kZWZpbmVkLmpzXCI7XG5pbXBvcnQgRGV2ZWxvcGVyRXJyb3IgZnJvbSBcIi4uL0NvcmUvRGV2ZWxvcGVyRXJyb3IuanNcIjtcbmltcG9ydCBFbGxpcHNvaWQgZnJvbSBcIi4uL0NvcmUvRWxsaXBzb2lkLmpzXCI7XG5pbXBvcnQgRXZlbnQgZnJvbSBcIi4uL0NvcmUvRXZlbnQuanNcIjtcbmltcG9ydCBSZWZlcmVuY2VGcmFtZSBmcm9tIFwiLi4vQ29yZS9SZWZlcmVuY2VGcmFtZS5qc1wiO1xuaW1wb3J0IFByb3BlcnR5IGZyb20gXCIuL1Byb3BlcnR5LmpzXCI7XG5cbi8qKlxuICogVGhpcyBpcyBhIHRlbXBvcmFyeSBjbGFzcyBmb3Igc2NhbGluZyBwb3NpdGlvbiBwcm9wZXJ0aWVzIHRvIHRoZSBXR1M4NCBzdXJmYWNlLlxuICogSXQgd2lsbCBnbyBhd2F5IG9yIGJlIHJlZmFjdG9yZWQgdG8gc3VwcG9ydCBkYXRhIHdpdGggYXJiaXRyYXJ5IGhlaWdodCByZWZlcmVuY2VzLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gU2NhbGVkUG9zaXRpb25Qcm9wZXJ0eSh2YWx1ZSkge1xuICB0aGlzLl9kZWZpbml0aW9uQ2hhbmdlZCA9IG5ldyBFdmVudCgpO1xuICB0aGlzLl92YWx1ZSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5fcmVtb3ZlU3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoU2NhbGVkUG9zaXRpb25Qcm9wZXJ0eS5wcm90b3R5cGUsIHtcbiAgaXNDb25zdGFudDoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFByb3BlcnR5LmlzQ29uc3RhbnQodGhpcy5fdmFsdWUpO1xuICAgIH0sXG4gIH0sXG4gIGRlZmluaXRpb25DaGFuZ2VkOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbkNoYW5nZWQ7XG4gICAgfSxcbiAgfSxcbiAgcmVmZXJlbmNlRnJhbWU6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBkZWZpbmVkKHRoaXMuX3ZhbHVlKVxuICAgICAgICA/IHRoaXMuX3ZhbHVlLnJlZmVyZW5jZUZyYW1lXG4gICAgICAgIDogUmVmZXJlbmNlRnJhbWUuRklYRUQ7XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5TY2FsZWRQb3NpdGlvblByb3BlcnR5LnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uICh0aW1lLCByZXN1bHQpIHtcbiAgcmV0dXJuIHRoaXMuZ2V0VmFsdWVJblJlZmVyZW5jZUZyYW1lKHRpbWUsIFJlZmVyZW5jZUZyYW1lLkZJWEVELCByZXN1bHQpO1xufTtcblxuU2NhbGVkUG9zaXRpb25Qcm9wZXJ0eS5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKHRoaXMuX3ZhbHVlICE9PSB2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAoZGVmaW5lZCh0aGlzLl9yZW1vdmVTdWJzY3JpcHRpb24pKSB7XG4gICAgICB0aGlzLl9yZW1vdmVTdWJzY3JpcHRpb24oKTtcbiAgICAgIHRoaXMuX3JlbW92ZVN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZVN1YnNjcmlwdGlvbiA9IHZhbHVlLmRlZmluaXRpb25DaGFuZ2VkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIHRoaXMuX3JhaXNlRGVmaW5pdGlvbkNoYW5nZWQsXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuX2RlZmluaXRpb25DaGFuZ2VkLnJhaXNlRXZlbnQodGhpcyk7XG4gIH1cbn07XG5cblNjYWxlZFBvc2l0aW9uUHJvcGVydHkucHJvdG90eXBlLmdldFZhbHVlSW5SZWZlcmVuY2VGcmFtZSA9IGZ1bmN0aW9uIChcbiAgdGltZSxcbiAgcmVmZXJlbmNlRnJhbWUsXG4gIHJlc3VsdFxuKSB7XG4gIFxuXG4gIGlmICghZGVmaW5lZCh0aGlzLl92YWx1ZSkpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmVzdWx0ID0gdGhpcy5fdmFsdWUuZ2V0VmFsdWVJblJlZmVyZW5jZUZyYW1lKHRpbWUsIHJlZmVyZW5jZUZyYW1lLCByZXN1bHQpO1xuICByZXR1cm4gZGVmaW5lZChyZXN1bHQpXG4gICAgPyBFbGxpcHNvaWQuV0dTODQuc2NhbGVUb0dlb2RldGljU3VyZmFjZShyZXN1bHQsIHJlc3VsdClcbiAgICA6IHVuZGVmaW5lZDtcbn07XG5cblNjYWxlZFBvc2l0aW9uUHJvcGVydHkucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlcikge1xuICByZXR1cm4gKFxuICAgIHRoaXMgPT09IG90aGVyIHx8XG4gICAgKG90aGVyIGluc3RhbmNlb2YgU2NhbGVkUG9zaXRpb25Qcm9wZXJ0eSAmJiB0aGlzLl92YWx1ZSA9PT0gb3RoZXIuX3ZhbHVlKVxuICApO1xufTtcblxuU2NhbGVkUG9zaXRpb25Qcm9wZXJ0eS5wcm90b3R5cGUuX3JhaXNlRGVmaW5pdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2RlZmluaXRpb25DaGFuZ2VkLnJhaXNlRXZlbnQodGhpcyk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2NhbGVkUG9zaXRpb25Qcm9wZXJ0eTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0lBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyVkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=