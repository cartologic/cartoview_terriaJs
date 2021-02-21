((self || window)["webpackJsonp"] = (self || window)["webpackJsonp"] || []).push([["vendors~AugmentedVirtuality"],{

/***/ "./node_modules/terriajs/lib/Models/AugmentedVirtuality.js":
/*!*****************************************************************!*\
  !*** ./node_modules/terriajs/lib/Models/AugmentedVirtuality.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _defined = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/defined */ "./node_modules/terriajs-cesium/Source/Core/defined.js"));

var _defaultValue = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/defaultValue */ "./node_modules/terriajs-cesium/Source/Core/defaultValue.js"));

var _knockout = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/ThirdParty/knockout */ "./node_modules/terriajs-cesium/Source/ThirdParty/knockout.js"));

var _Math = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/Math.js */ "./node_modules/terriajs-cesium/Source/Core/Math.js"));

var _Matrix = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/Matrix3.js */ "./node_modules/terriajs-cesium/Source/Core/Matrix3.js"));

var _Cartesian = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/Cartesian3.js */ "./node_modules/terriajs-cesium/Source/Core/Cartesian3.js"));

var _EllipsoidTerrainProvider = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/EllipsoidTerrainProvider */ "./node_modules/terriajs-cesium/Source/Core/EllipsoidTerrainProvider.js"));

var _sampleTerrainMostDetailed = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/sampleTerrainMostDetailed */ "./node_modules/terriajs-cesium/Source/Core/sampleTerrainMostDetailed.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Manages state for Augmented Virtuality mode.
 *
 * This mode uses the devices orientation sensors to change the viewers viewport to match the change in orientation.
 *
 * Term Augmented Virtuality:
 * "The use of real-world sensor information (e.g., gyroscopes) to control a virtual environment is an additional form
 * of augmented virtuality, in which external inputs provide context for the virtual view."
 * {@link https://en.wikipedia.org/wiki/Mixed_reality}
 *
 * @alias AugmentedVirtuality
 * @constructor
 */
var AugmentedVirtuality = function AugmentedVirtuality(terria) {
  var that = this;
  this._terria = terria; // Note: We create a persistant object and define a transient property, since knockout needs a persistant variable
  //       to track, but for state we want a 'maybe' intervalId.

  this._eventLoopState = {};
  this._manualAlignment = false;
  this._maximumUpdatesPerSecond = AugmentedVirtuality.DEFAULT_MAXIMUM_UPDATES_PER_SECOND;
  this._orientationUpdated = false;
  this._alpha = 0;
  this._beta = 0;
  this._gamma = 0;
  this._realignAlpha = 0;
  this._realignHeading = 0; // Set the default height to be the last height so that when we first toggle (and increment) we cycle and go to the first height.

  this._hoverLevel = AugmentedVirtuality.PRESET_HEIGHTS.length - 1; // Always run the device orientation event, this way as soon as we enable we know where we are and set the
  // orientation rather then having to wait for the next update.
  // The following is disabled because chrome does not currently support deviceorientationabsolute correctly:
  // if ('ondeviceorientationabsolute' in window)
  // {
  //     window.addEventListener('deviceorientationabsolute', function(event) {that._orientationUpdate(event);} );
  // }
  // else

  if ("ondeviceorientation" in window) {
    window.addEventListener("deviceorientation", function (event) {
      that._storeOrientation(event);
    });
  } // Make the variables used by the object properties knockout observable so that changes in the state notify the UI
  // and cause a UI update. Note: These are all of the variables used just by the getters (not the setters), since
  // these unqiquely define what the current state is and are the only things that can effect/cause the state to change
  // (note: _eventLoopState is hidden behind ._eventLoopRunning() ).


  _knockout["default"].track(this, ["_eventLoopState", "_manualAlignment", "_maximumUpdatesPerSecond", "_realignAlpha", "_realignHeading", "_hoverLevel"]); // Note: The following properties are defined as knockout properties so that they can be used to trigger updates on the UI.

  /**
   * Gets or sets whether Augmented Virtuality mode is currently enabled (true) or not (false).
   *
   * Note: If {@link AugmentedVirtuality#manualAlignment} is enabled and the state is changed it will be disabled.
   *
   * @memberOf AugmentedVirtuality.prototype
   * @member {Boolean} enabled
   */


  _knockout["default"].defineProperty(this, "enabled", {
    get: function get() {
      return this._eventLoopRunning() || this._manualAlignment;
    },
    set: function set(enable) {
      if (enable !== true) {
        enable = false;
        this.resetAlignment();
      }

      if (enable !== this.enabled) {
        // If we are changing the enabled state then disable manual alignment.
        // We only do this if we are changing the enabled state so that the client can repeatedly call the
        // setting without having any effect if they aren't changing the enabled state, but so that every time
        // that the state is changed that the manual alignment is turned back off initally.
        this._manualAlignment = false;

        this._startEventLoop(enable);
      }
    }
  });
  /**
   * Gets or sets whether manual realignment mode is currently enabled (true) or not (false).
   *
   * @memberOf AugmentedVirtuality.prototype
   * @member {Boolean} manualAlignment
   */


  _knockout["default"].defineProperty(this, "manualAlignment", {
    get: function get() {
      return this._getManualAlignment();
    },
    set: function set(startEnd) {
      this._setManualAlignment(startEnd);
    }
  });
  /**
   * Gets whether a manual realignment has been specified (true) or not (false).
   *
   * @memberOf AugmentedVirtuality.prototype
   * @member {Boolean} manualAlignmentSet
   */


  _knockout["default"].defineProperty(this, "manualAlignmentSet", {
    get: function get() {
      return this._realignAlpha !== 0.0 || this._realignHeading !== 0.0;
    }
  });
  /**
   * Gets the index of the current hover level.
   *
   * Use <code>AugmentedVirtuality.PRESET_HEIGHTS.length</code> to find the total avaliable levels.
   *
   * @memberOf AugmentedVirtuality.prototype
   * @member {int} hoverLevel
   */


  _knockout["default"].defineProperty(this, "hoverLevel", {
    get: function get() {
      return this._hoverLevel;
    }
  });
  /**
   * Gets or sets the the maximum number of times that the camera orientation will be updated per second. This is
   * the number of camera orientation updates per seconds is capped to (explicitly the number of times the
   * orientation is updated per second might be less but it won't be more then this number). We want the number of
   * times that the orientation is updated capped so that we don't consume to much battery life updating to
   * frequently, but responsiveness is still acceptable.
   *
   * @memberOf AugmentedVirtuality.prototype
   * @member {Float} maximumUpdatesPerSecond
   */


  _knockout["default"].defineProperty(this, "maximumUpdatesPerSecond", {
    get: function get() {
      return this._maximumUpdatesPerSecond;
    },
    set: function set(maximumUpdatesPerSecond) {
      this._maximumUpdatesPerSecond = maximumUpdatesPerSecond; // If we are currently enabled reset to update the timing interval used.

      if (this._eventLoopRunning()) {
        this._startEventLoop(false);

        this._startEventLoop(true);
      }
    }
  });

  this.enabled = false;
};
/**
 * Gets the the maximum number of times that the camera orientation will be updated per second by default. This is the
 * number of camera orientation updates per seconds is capped to by default (explicitly the number of times the
 * orientation is updated per second might be less but it won't be more then this number). We want the number of times
 * that the orientation is updated capped so that we don't consume to much battery life updating to frequently, but
 * responsiveness is still acceptable.
 */


AugmentedVirtuality.DEFAULT_MAXIMUM_UPDATES_PER_SECOND = 10.0;
/**
 * The minimum height that the viewer is allowed to hover at.
 */

AugmentedVirtuality.MINIMUM_HOVER_HEIGHT = 20.0;
/* These are the heights that we can toggle through (in meters - above the surface height).
 */

AugmentedVirtuality.PRESET_HEIGHTS = [1000, 250, 20];
/**
 * Toggles whether the AugmentedVirutuality mode is enabled or disabled.
 */

AugmentedVirtuality.prototype.toggleEnabled = function () {
  this.enabled = !this.enabled;
};
/**
 * Toggles whether manual alignement is enabled or disabled.
 */


AugmentedVirtuality.prototype.toggleManualAlignment = function () {
  this.manualAlignment = !this.manualAlignment;
};
/**
 * Resets the alignment so that the alignement matches the devices absolute alignment.
 */


AugmentedVirtuality.prototype.resetAlignment = function () {
  this._orientationUpdated = true;
  this._realignAlpha = 0;
  this._realignHeading = 0;
};
/**
 * Toggles the viewer between a range of predefined heights, setting the cameras orientation so that it matches the
 * correct orientation.
 */


AugmentedVirtuality.prototype.toggleHoverHeight = function () {
  this._hoverLevel = (this._hoverLevel + 1) % AugmentedVirtuality.PRESET_HEIGHTS.length;
  this.hover(AugmentedVirtuality.PRESET_HEIGHTS[this._hoverLevel]);
};
/**
 * Moves the viewer to a specified height, setting the orientation so that it matches the correct Augmented Virtuality
 * orientation.
 *
 * @param {Float} height The height in Meters above the globe surface. Note: If height is below
 *                       {@link AugmentedVirtuality.MINIMUM_HOVER_HEIGHT} the height will be set to
 *                       {@link AugmentedVirtuality.MINIMUM_HOVER_HEIGHT} to avoid visual artifacts when the viewer
 *                       becomes to close to the surface.
 * @param {Cartographic} [position] The location to hover over. If not specified the current camera location will be used.
 * @param {Boolean} [flyTo=true] Whether to fly to the location (true) or whether to jump to the location (false).
 */


AugmentedVirtuality.prototype.hover = function (height, position, flyTo) {
  var that = this; // Get access to the camera...if it is not avaliable we can't set the new height so just return now.

  if (!(0, _defined["default"])(this._terria.cesium) || !(0, _defined["default"])(this._terria.cesium.viewer) || !(0, _defined["default"])(this._terria.cesium.viewer.camera)) {
    return;
  }

  var camera = this._terria.cesium.viewer.camera;

  if (!(0, _defined["default"])(position)) {
    position = camera.positionCartographic.clone();
  }

  flyTo = (0, _defaultValue["default"])(flyTo, true); // Clamp the minimum hover height (heights below this value could lead to poor visual artifacts).

  if (height < AugmentedVirtuality.MINIMUM_HOVER_HEIGHT) {
    height = AugmentedVirtuality.MINIMUM_HOVER_HEIGHT;
  } // Reset the viewer height.


  function flyToHeight(surfaceHeight) {
    if ((0, _defined["default"])(surfaceHeight)) {
      height += surfaceHeight;
    }

    var newPosition = _Cartesian["default"].fromRadians(position.longitude, position.latitude, height);

    var pose = that._getCurrentOrientation();

    pose.destination = newPosition;

    if (flyTo) {
      camera.flyTo(pose);
    } else {
      camera.setView(pose);
    } // Needed on mobile to make sure that the render is marked as dirty so that once AV mode has been disabled for a
    // while and then is reenabled the .setView() function still has effect (otherwise dispite the call the .setView()
    // the view orientation does not visually update until the user manualy moves the camera position).


    that._terria.currentViewer.notifyRepaintRequired();
  } // Get the ground surface height at this location and offset the height by it.


  if (!(0, _defined["default"])(this._terria.cesium) || !(0, _defined["default"])(this._terria.cesium.scene) || !(0, _defined["default"])(this._terria.cesium.scene.terrainProvider) || this._terria.cesium.scene.terrainProvider instanceof _EllipsoidTerrainProvider["default"]) {
    // If we can't get access to the terrain provider or we can get access to the terrain provider and the provider is just the Ellipsoid then use the height of 0.
    flyToHeight(0);
  } else {
    var terrainProvider = this._terria.cesium.scene.terrainProvider;
    (0, _sampleTerrainMostDetailed["default"])(terrainProvider, [position]).then(function (updatedPosition) {
      flyToHeight(updatedPosition[0].height);
    });
  }
};
/**
 * Moves the viewer to a specified location while maintaining the current height and the correct Augmented Virtuality
 * orientation.
 *
 * @param {Cartographic} position The location to hover move to.
 * @param {Float} [maximumHeight] The maximum height (in meters) to cap the current camera height to (if this value is
 *                                specified and the viewer is above this height the camera will be restricted to this height).
 * @param {Boolean} [flyTo] Whether to fly to the location (true) or whether to jump to the location (false).
 *
 * When the manual alignment is enabled this function has no effect.
 */


AugmentedVirtuality.prototype.moveTo = function (position, maximumHeight, flyTo) {
  var that = this; // If we are in manual alignment mode we don't allow the viewer to move (since this would create a jaring UX for most use cases).

  if (this._manualAlignment) {
    return;
  } // Get access to the camera...if it is not avaliable we can't get the current height (or set the new location) so just return now.


  if (!(0, _defined["default"])(this._terria.cesium) || !(0, _defined["default"])(this._terria.cesium.viewer) || !(0, _defined["default"])(this._terria.cesium.viewer.camera)) {
    return;
  }

  var camera = this._terria.cesium.viewer.camera;
  var cameraPosition = camera.positionCartographic.clone();
  var viewerHeight = cameraPosition.height; // Reset the viewer height.

  function moveToLocation(surfaceHeight) {
    if (!(0, _defined["default"])(surfaceHeight)) {
      surfaceHeight = 0;
    }

    var hoverHeight = viewerHeight - surfaceHeight;

    if ((0, _defined["default"])(maximumHeight) && hoverHeight > maximumHeight) {
      hoverHeight = maximumHeight;
    }

    that.hover(hoverHeight, position, flyTo);
  } // Get the ground surface height at this location and offset the height by it.


  if (!(0, _defined["default"])(this._terria.cesium) || !(0, _defined["default"])(this._terria.cesium.scene) || !(0, _defined["default"])(this._terria.cesium.scene.terrainProvider) || this._terria.cesium.scene.terrainProvider instanceof _EllipsoidTerrainProvider["default"]) {
    // If we can't get access to the terrain provider or we can get access to the terrain provider and the provider is just the Ellipsoid then use the height of 0.
    moveToLocation(undefined);
  } else {
    var terrainProvider = this._terria.cesium.scene.terrainProvider;
    (0, _sampleTerrainMostDetailed["default"])(terrainProvider, [cameraPosition]).then(function (updatedPosition) {
      moveToLocation(updatedPosition[0].height);
    });
  }
};
/**
 * Whether the user is currently setting a manual alignment.
 *
 * See also {@link AugmentedVirtuality#_setManualAlignment}.
 *
 * @return {Boolean} Whether the user is currently setting a manual alignment (true) or not (false).
 * @private
 */


AugmentedVirtuality.prototype._getManualAlignment = function () {
  return this.enabled && this._manualAlignment;
};
/**
 * Starts / stops manual alignment.
 *
 * When manual realignment is enabled it allows the user to specify a new origin for the alignment between the devices
 * physical and virtual alignment. When manual alignment is enabled the orientation is locked, to allow the user to
 * realign a visual landmark with a physical landmark.
 *
 * Note: Manual alignment is only done for the heading axis, this is because in practice we have found that the heading
 * axis is often out as mobile devices seem to have difficulty obtaining the compass direction, but seem to perform
 * relatively well in the other axes.
 *
 * Note: Realignment is only possible when AugmentedVirtuality is enabled. If AugmentedVirtuality is disabled while
 *       manual alignment is in progress it will be cancelled.
 *
 * See also {@link AugmentedVirtuality#_getManualAlignment}.
 *
 * @param {Boolean} startEnd Whether the user is starting (true) or ending (false) the realignment.
 * @private
 */


AugmentedVirtuality.prototype._setManualAlignment = function (startEnd) {
  // Only allow manual alignment changes when the module is enabled.
  if (this.enabled !== true) {
    return;
  } // Sanitise the input value to a boolean.


  if (startEnd !== true) {
    startEnd = false;
  }

  if (startEnd === false && (0, _defined["default"])(this._terria.cesium) && (0, _defined["default"])(this._terria.cesium.viewer) && (0, _defined["default"])(this._terria.cesium.viewer.camera)) {
    this._realignAlpha = this._alpha;
    this._realignHeading = _Math["default"].toDegrees(this._terria.cesium.viewer.camera.heading);
  }

  if (this._manualAlignment !== startEnd) {
    this._manualAlignment = startEnd;

    this._startEventLoop(!this._manualAlignment);
  }
};
/**
 * Whether the event loop is currently running.
 *
 * @return {Boolean} enable Whether to start the event loop is currently running (true) or not (false).
 * @private
 */


AugmentedVirtuality.prototype._eventLoopRunning = function () {
  return (0, _defined["default"])(this._eventLoopState.intervalId);
};
/**
 * Start or stop the Augmented Virutuality mode event loop. When enabled the orientation will effect the cameras
 * view and when disabled the device orientation will not effect the cameras view.
 *
 * @param {Boolean} enable Whether to start the event loop (true) or stop the event loop (false).
 * @private
 */


AugmentedVirtuality.prototype._startEventLoop = function (enable) {
  // Are we actually changing the state?
  if (this._eventLoopRunning() !== enable) {
    if (enable === true) {
      var that = this;
      this._orientationUpdated = true;
      var intervalMs = 1000 / this._maximumUpdatesPerSecond;
      var id = setInterval(function () {
        that._updateOrientation();
      }, intervalMs);
      this._eventLoopState = {
        intervalId: id
      };
    } else {
      clearInterval(this._eventLoopState.intervalId);
      this._eventLoopState = {};
    }
  }
};
/**
 * Device orientation update event callback function. Stores the updated orientation into the object state.
 *
 * @param {Object} event Contains the updated device orientation (in .alpha, .beta, .gamma).
 * @private
 */


AugmentedVirtuality.prototype._storeOrientation = function (event) {
  this._alpha = event.alpha;
  this._beta = event.beta;
  this._gamma = event.gamma;
  this._orientationUpdated = true;
};
/**
 * This function updates the cameras orientation using the last orientation recorded and the current screen orientation.
 *
 * @private
 */


AugmentedVirtuality.prototype._updateOrientation = function () {
  // Check if the screen orientation has changed and mark the orientation updated if it has.
  var screenOrientation = this._getCurrentScreenOrientation();

  if (screenOrientation !== this._lastScreenOrientation) {
    this._orientationUpdated = true;
  }

  this._lastScreenOrientation = screenOrientation; // Optomise by only updating the camera view if some part of the orientation calculation has changed.

  if (!this._orientationUpdated) {
    // The orientation has not been updated so don't waste time changing the orientation.
    return;
  }

  this._orientationUpdated = false; // Get access to the camera...if it is not avaliable we can't set the orientation so just return now.

  if (!(0, _defined["default"])(this._terria.cesium) || !(0, _defined["default"])(this._terria.cesium.viewer) || !(0, _defined["default"])(this._terria.cesium.viewer.camera)) {
    return;
  }

  var camera = this._terria.cesium.viewer.camera;
  camera.setView(this._getCurrentOrientation(screenOrientation)); // Needed on mobile to make sure that the render is marked as dirty so that once AV mode has been disabled for a
  // while and then is reenabled the .setView() function still has effect (otherwise dispite the call the .setView()
  // the view orientation does not visually update until the user manualy moves the camera position).

  this._terria.currentViewer.notifyRepaintRequired();
};
/**
 * Gets the current orientation stored in the object state and returns the roll, pitch and heading which can be used to set the cameras orientation.
 *
 * @param {Float} screenOrientation The screen orientation in degrees. Note: This field is optional, if supplied this value will be used for the screen orientation, otherwise the screen orientation will be obtained during the execution of this function.
 * @return {Object} A object with the roll, pitch and heading stored into the orientation.
 * @private
 */


AugmentedVirtuality.prototype._getCurrentOrientation = function (screenOrientation) {
  var alpha = this._alpha;
  var beta = this._beta;
  var gamma = this._gamma;
  var realignAlpha = this._realignAlpha;
  var realignHeading = this._realignHeading;

  if (!(0, _defined["default"])(screenOrientation)) {
    screenOrientation = this._getCurrentScreenOrientation();
  }

  return this._computeTerriaOrientation(alpha, beta, gamma, screenOrientation, realignAlpha, realignHeading);
};
/**
 * Turns the orientation in the device frame of reference into an orientation suitable for specifying the Terria camera orientation.
 *
 * @param {Float} alpha The alpha value of the device orientation in degrees (this is the alpha value in the device's frame of reference).
 * @param {Float} beta  The beta  value of the device orientation in degrees (this is the beta  value in the device's frame of reference).
 * @param {Float} gamma The gamma value of the device orientation in degrees (this is the gamma value in the device's frame of reference).
 * @param {Float} screenOrientation The screen orientation in degrees.
 * @param {Float} realignAlpha   The value of the alpha   value the last time realignment was completed (supply zero if realignment is not supported).
 * @param {Float} realignHeading The value of the heading value the last time realignment was completed (supply zero if realignment is not supported).
 * @return {Object} An object with the roll, pitch and heading stored into the orientation.
 * @private
 */


AugmentedVirtuality.prototype._computeTerriaOrientation = function (alpha, beta, gamma, screenOrientation, realignAlpha, realignHeading) {
  // Note: The algorithmic formulation in this function is for simplicity of mathematical expression, readability,
  //       maintainability and modification (i.e. it is easy to understand how to update or insert new offsets or features).
  //       This is not the simplest form which clearly flows from the current formuleation and clearly simplify the
  //       logic and operations but would increase the cost of future modifications and reduce the readability of the
  //       expression. It is not anticipated that the current verbose implementation would have a significant impact
  //       on performance or accuracy, but obviously there will be some impact on both and it can be simplified in
  //       future if needed.
  var rotation = _Matrix["default"].clone(_Matrix["default"].IDENTITY, rotation);

  var rotationIncrement; // Roll - Counteract the change in the (orientation) frame of reference when the screen is rotated and the
  //        rotation lock is not on (the browser reorients the frame of reference to align with the new screen
  //        orientation - where as we want it of the device relative to the world).

  rotationIncrement = _Matrix["default"].fromRotationZ(_Math["default"].toRadians(screenOrientation));

  _Matrix["default"].multiply(rotation, rotationIncrement, rotation); // Pitch - Align the device orientation frame with the ceasium orientation frame.


  rotationIncrement = _Matrix["default"].fromRotationX(_Math["default"].toRadians(90));

  _Matrix["default"].multiply(rotation, rotationIncrement, rotation); // Roll - Apply the deivce roll.


  rotationIncrement = _Matrix["default"].fromRotationZ(_Math["default"].toRadians(gamma));

  _Matrix["default"].multiply(rotation, rotationIncrement, rotation); // Pitch - Apply the deivce pitch.


  rotationIncrement = _Matrix["default"].fromRotationX(_Math["default"].toRadians(-beta));

  _Matrix["default"].multiply(rotation, rotationIncrement, rotation); // Heading - Apply the incremental deivce heading (from when start was last triggered).


  rotationIncrement = _Matrix["default"].fromRotationY(_Math["default"].toRadians(-(alpha - realignAlpha)));

  _Matrix["default"].multiply(rotation, rotationIncrement, rotation); // Heading - Use the offset when the orientation was last started.
  //           Note: This is logically different from the alpha value and can only be applied here in the same way
  //                 since Cesium camera is RPH (Heading last - most local). See Cesium camera rotation decomposition
  //                 for more information on the Cesium camera formuleation.


  rotationIncrement = _Matrix["default"].fromRotationY(_Math["default"].toRadians(realignHeading));

  _Matrix["default"].multiply(rotation, rotationIncrement, rotation); // Decompose rotation matrix into roll, pitch and heading to supply to Cesium camera.
  //
  // Use notation:
  //     R = Roll, P = Pitch, H = Heading
  //     SH = Sin(Heading), CH = Cos(Heading)
  //
  // Ceasium camera rotation = RPH:
  //     [ CR, -SR,   0][  1,   0,   0][ CH,   0,  SH]   [CRCH-SRSPSH, -SRCP, CRSH-SRSPCH]
  //     [ SR,  CR,   0][  0,  CP,  SP][  0,   1,   0] = [SRCH-CRSPSH,  CRCP, SRSH+CRSPCH]
  //     [  0,   0,   1][  0, -SP,  CP][-SH,   0,  CH]   [   -CPSH   ,   -SP,    CPCH    ]
  //     Note: The sign difference of the Sin terms in pitch is different to the standard right handed rotation since
  //           Cesium rotates pitch in the left handed direction. Both heading and roll are right handed rotations.
  //
  // Use the following notation to refer to elements in the Cesium camera rotation matrix:
  //     [R00, R10, R20]
  //     [R01, R11, R21]
  //     [R02, R12, R22]
  //
  // Also note: Tan(X) = Sin(X) / Cos(X)
  //
  // Decompose matrix:
  //    H = ATan(Tan(H)) = ATan(Sin(H)/Cos(H)) = ATan (SH / CH) = ATan(CPSH/CPCH) = ATan (-R02 / R22)
  //    R = ATan(Tan(R)) = ATan(Sin(R)/Cos(R)) = ATan (SR / CR) = ATan(SRCP/CRCP) = ATan (-R10 / R11)
  //    P = ATan(Tan(P)) = ATan(Sin(P)/Cos(P)) = ATan (SP / CP)
  //                                             SP = -R12
  //                                             Need to find CP:
  //                                                 CP = Sqrt(CP^2)
  //                                                    = Sqrt(CP^2*(CH^2+SH^2))              Since: (Cos@^2 + Sin@^2) = 1
  //                                                    = Sqrt((CP^2)*(CH^2) + (CP^2)*(SH^2)) Expand
  //                                                    = Sqrt((CPCH)^2 + (CPSH)^2)           Since: N^2*M^2 = (NM)^2
  //                                                    = Sqrt(R22^2 + (-R02)^2)              Substitute
  //                                                    = Sqrt(R22^2 + R02^2)                 Since: (-N)^2 = N^2
  //  So P = ATan (-R12 / Sqrt(R22^2 + R02^2))
  // Simplify notation for readability:


  var r10 = rotation[_Matrix["default"].COLUMN1ROW0];
  var r11 = rotation[_Matrix["default"].COLUMN1ROW1];
  var r02 = rotation[_Matrix["default"].COLUMN0ROW2];
  var r12 = rotation[_Matrix["default"].COLUMN1ROW2];
  var r22 = rotation[_Matrix["default"].COLUMN2ROW2];

  var heading = _Math["default"].toDegrees(Math.atan2(-r02, r22));

  var roll = _Math["default"].toDegrees(Math.atan2(-r10, r11));

  var pitch = _Math["default"].toDegrees(Math.atan2(-r12, Math.sqrt(r02 * r02 + r22 * r22))); // Create an object with the roll, pitch and heading we just computed.


  return {
    orientation: {
      roll: _Math["default"].toRadians(roll),
      pitch: _Math["default"].toRadians(pitch),
      heading: _Math["default"].toRadians(heading)
    }
  };
};
/**
 * Gets the current screen orientation.
 *
 * @return {Object} The current screen orientation in degrees.
 * @private
 */


AugmentedVirtuality.prototype._getCurrentScreenOrientation = function () {
  if ((0, _defined["default"])(screen.orientation) && (0, _defined["default"])(screen.orientation.angle)) {
    return screen.orientation.angle;
  }

  if ((0, _defined["default"])(window.orientation)) {
    return window.orientation;
  }

  return 0;
};

module.exports = AugmentedVirtuality;

/***/ }),

/***/ "./node_modules/terriajs/lib/ReactViews/Map/Navigation/AugmentedVirtualityTool.jsx":
/*!*****************************************************************************************!*\
  !*** ./node_modules/terriajs/lib/ReactViews/Map/Navigation/AugmentedVirtualityTool.jsx ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _createReactClass = _interopRequireDefault(__webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _ObserveModelMixin = _interopRequireDefault(__webpack_require__(/*! ../../ObserveModelMixin */ "./node_modules/terriajs/lib/ReactViews/ObserveModelMixin.js"));

var _augmented_virtuality_tool = _interopRequireDefault(__webpack_require__(/*! ./augmented_virtuality_tool.scss */ "./node_modules/terriajs/lib/ReactViews/Map/Navigation/augmented_virtuality_tool.scss"));

var _Icon = _interopRequireDefault(__webpack_require__(/*! ../../Icon */ "./node_modules/terriajs/lib/ReactViews/Icon.jsx"));

var _ViewerMode = _interopRequireDefault(__webpack_require__(/*! ../../../Models/ViewerMode */ "./node_modules/terriajs/lib/Models/ViewerMode.js"));

var _defined = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/defined */ "./node_modules/terriajs-cesium/Source/Core/defined.js"));

var _reactI18next = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");

var _AugmentedVirtuality = _interopRequireDefault(__webpack_require__(/*! ../../../Models/AugmentedVirtuality */ "./node_modules/terriajs/lib/Models/AugmentedVirtuality.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AugmentedVirtualityTool = (0, _createReactClass["default"])({
  displayName: "AugmentedVirtualityTool",
  mixins: [_ObserveModelMixin["default"]],
  propTypes: {
    terria: _propTypes["default"].object.isRequired,
    viewState: _propTypes["default"].object.isRequired,
    experimentalWarning: _propTypes["default"].bool,
    t: _propTypes["default"].func.isRequired
  },
  getInitialState: function getInitialState() {
    return {
      augmentedVirtuality: new _AugmentedVirtuality["default"](this.props.terria),
      experimentalWarningShown: false,
      realignHelpShown: false,
      resetRealignHelpShown: false
    };
  },
  handleClickAVTool: function handleClickAVTool() {
    // Make the AugmentedVirtuality module avaliable elsewhere.
    this.props.terria.augmentedVirtuality = this.state.augmentedVirtuality;

    if ((0, _defined["default"])(this.props.experimentalWarning) && this.props.experimentalWarning !== false && !this.state.experimentalWarningShown) {
      this.setState({
        experimentalWarningShown: true
      });
      var t = this.props.t;
      this.props.viewState.notifications.push({
        title: t("AR.title"),
        message: t("AR.experimentalFeatureMessage"),
        confirmText: t("AR.confirmText")
      });
    }

    this.state.augmentedVirtuality.toggleEnabled();
  },
  handleClickRealign: function handleClickRealign() {
    if (!this.state.realignHelpShown) {
      this.setState({
        realignHelpShown: true
      });
      var t = this.props.t;
      this.props.viewState.notifications.push({
        title: t("AR.manualAlignmentTitle"),
        message: t("AR.manualAlignmentMessage", {
          img: '<img width="100%" src="./build/TerriaJS/images/ar-realign-guide.gif" />'
        }),
        confirmText: t("AR.confirmText")
      });
    }

    this.state.augmentedVirtuality.toggleManualAlignment();
  },
  handleClickResetRealign: function handleClickResetRealign() {
    if (!this.state.resetRealignHelpShown) {
      this.setState({
        resetRealignHelpShown: true
      });
      var t = this.props.t;
      this.props.viewState.notifications.push({
        title: t("AR.resetAlignmentTitle"),
        message: t("AR.resetAlignmentMessage"),
        confirmText: t("AR.confirmText")
      });
    }

    this.state.augmentedVirtuality.resetAlignment();
  },
  handleClickHover: function handleClickHover() {
    this.state.augmentedVirtuality.toggleHoverHeight();
  },
  render: function render() {
    var enabled = this.state.augmentedVirtuality.enabled;
    var toggleImage = _Icon["default"].GLYPHS.arOff;
    var toggleStyle = _augmented_virtuality_tool["default"].btn;

    if (enabled) {
      toggleImage = _Icon["default"].GLYPHS.arOn;
      toggleStyle = _augmented_virtuality_tool["default"].btnPrimary;
    }

    var t = this.props.t;
    var realignment = this.state.augmentedVirtuality.manualAlignment;
    var realignmentStyle = _augmented_virtuality_tool["default"].btn;

    if (realignment) {
      realignmentStyle = _augmented_virtuality_tool["default"].btnBlink;
    }

    var hoverLevel = this.state.augmentedVirtuality.hoverLevel;
    var hoverImage = _Icon["default"].GLYPHS.arHover0; // Note: We use the image of the next level that we will be changing to, not the level the we are currently at.

    switch (hoverLevel) {
      case 0:
        hoverImage = _Icon["default"].GLYPHS.arHover0;
        break;

      case 1:
        hoverImage = _Icon["default"].GLYPHS.arHover1;
        break;

      case 2:
        hoverImage = _Icon["default"].GLYPHS.arHover2;
        break;
    }

    return this.props.terria.viewerMode !== _ViewerMode["default"].Leaflet ? _react["default"].createElement("div", {
      className: _augmented_virtuality_tool["default"].augmentedVirtualityTool
    }, _react["default"].createElement("button", {
      type: "button",
      className: toggleStyle,
      title: t("AR.arTool"),
      onClick: this.handleClickAVTool
    }, _react["default"].createElement(_Icon["default"], {
      glyph: toggleImage
    })), enabled ? [_react["default"].createElement("button", {
      type: "button",
      className: _augmented_virtuality_tool["default"].btn,
      title: t("AR.btnHover"),
      onClick: this.handleClickHover,
      key: "0"
    }, _react["default"].createElement(_Icon["default"], {
      glyph: hoverImage
    })), !this.state.augmentedVirtuality.manualAlignmentSet ? _react["default"].createElement("button", {
      type: "button",
      className: realignmentStyle,
      title: t("AR.btnRealign"),
      onClick: this.handleClickRealign,
      key: "1"
    }, _react["default"].createElement(_Icon["default"], {
      glyph: _Icon["default"].GLYPHS.arRealign
    })) : null, this.state.augmentedVirtuality.manualAlignmentSet && !realignment ? _react["default"].createElement("button", {
      type: "button",
      className: _augmented_virtuality_tool["default"].btn,
      title: t("AR.btnResetRealign"),
      onClick: this.handleClickResetRealign,
      key: "2"
    }, _react["default"].createElement(_Icon["default"], {
      glyph: _Icon["default"].GLYPHS.arResetAlignment
    })) : null] : null) : null;
  }
});
module.exports = (0, _reactI18next.withTranslation)()(AugmentedVirtualityTool);

/***/ }),

/***/ "./node_modules/terriajs/lib/ReactViews/Map/Navigation/augmented_virtuality_tool.scss":
/*!********************************************************************************************!*\
  !*** ./node_modules/terriajs/lib/ReactViews/Map/Navigation/augmented_virtuality_tool.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"btn":"tjs-augmented_virtuality_tool__btn tjs-_buttons__btn tjs-_buttons__btn tjs-nav__btn tjs-_buttons__btn","btn-primary":"tjs-augmented_virtuality_tool__btn-primary tjs-_buttons__btn tjs-_buttons__btn tjs-nav__btn tjs-_buttons__btn","btnPrimary":"tjs-augmented_virtuality_tool__btn-primary tjs-_buttons__btn tjs-_buttons__btn tjs-nav__btn tjs-_buttons__btn","btn-blink":"tjs-augmented_virtuality_tool__btn-blink tjs-_buttons__btn tjs-_buttons__btn tjs-nav__btn tjs-_buttons__btn","btnBlink":"tjs-augmented_virtuality_tool__btn-blink tjs-_buttons__btn tjs-_buttons__btn tjs-nav__btn tjs-_buttons__btn","btn-primary--hover":"tjs-augmented_virtuality_tool__btn-primary--hover","btnPrimaryHover":"tjs-augmented_virtuality_tool__btn-primary--hover","blinker":"tjs-augmented_virtuality_tool__blinker","toolButton":"tjs-augmented_virtuality_tool__toolButton","augmentedVirtualityTool":"tjs-augmented_virtuality_tool__augmentedVirtualityTool tjs-tool_button__toolButton"};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVuZG9yc35BdWdtZW50ZWRWaXJ0dWFsaXR5LlRlcnJpYU1hcC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyaWFqcy9saWIvTW9kZWxzL0F1Z21lbnRlZFZpcnR1YWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzL2xpYi9SZWFjdFZpZXdzL01hcC9OYXZpZ2F0aW9uL0F1Z21lbnRlZFZpcnR1YWxpdHlUb29sLmpzeCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMvbGliL1JlYWN0Vmlld3MvTWFwL05hdmlnYXRpb24vYXVnbWVudGVkX3ZpcnR1YWxpdHlfdG9vbC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2RlZmluZWQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvZGVmaW5lZFwiKSk7XG5cbnZhciBfZGVmYXVsdFZhbHVlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwidGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL2RlZmF1bHRWYWx1ZVwiKSk7XG5cbnZhciBfa25vY2tvdXQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy1jZXNpdW0vU291cmNlL1RoaXJkUGFydHkva25vY2tvdXRcIikpO1xuXG52YXIgX01hdGggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvTWF0aC5qc1wiKSk7XG5cbnZhciBfTWF0cml4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwidGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL01hdHJpeDMuanNcIikpO1xuXG52YXIgX0NhcnRlc2lhbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInRlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9DYXJ0ZXNpYW4zLmpzXCIpKTtcblxudmFyIF9FbGxpcHNvaWRUZXJyYWluUHJvdmlkZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy1jZXNpdW0vU291cmNlL0NvcmUvRWxsaXBzb2lkVGVycmFpblByb3ZpZGVyXCIpKTtcblxudmFyIF9zYW1wbGVUZXJyYWluTW9zdERldGFpbGVkID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwidGVycmlhanMtY2VzaXVtL1NvdXJjZS9Db3JlL3NhbXBsZVRlcnJhaW5Nb3N0RGV0YWlsZWRcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuLyoqXG4gKiBNYW5hZ2VzIHN0YXRlIGZvciBBdWdtZW50ZWQgVmlydHVhbGl0eSBtb2RlLlxuICpcbiAqIFRoaXMgbW9kZSB1c2VzIHRoZSBkZXZpY2VzIG9yaWVudGF0aW9uIHNlbnNvcnMgdG8gY2hhbmdlIHRoZSB2aWV3ZXJzIHZpZXdwb3J0IHRvIG1hdGNoIHRoZSBjaGFuZ2UgaW4gb3JpZW50YXRpb24uXG4gKlxuICogVGVybSBBdWdtZW50ZWQgVmlydHVhbGl0eTpcbiAqIFwiVGhlIHVzZSBvZiByZWFsLXdvcmxkIHNlbnNvciBpbmZvcm1hdGlvbiAoZS5nLiwgZ3lyb3Njb3BlcykgdG8gY29udHJvbCBhIHZpcnR1YWwgZW52aXJvbm1lbnQgaXMgYW4gYWRkaXRpb25hbCBmb3JtXG4gKiBvZiBhdWdtZW50ZWQgdmlydHVhbGl0eSwgaW4gd2hpY2ggZXh0ZXJuYWwgaW5wdXRzIHByb3ZpZGUgY29udGV4dCBmb3IgdGhlIHZpcnR1YWwgdmlldy5cIlxuICoge0BsaW5rIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01peGVkX3JlYWxpdHl9XG4gKlxuICogQGFsaWFzIEF1Z21lbnRlZFZpcnR1YWxpdHlcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgQXVnbWVudGVkVmlydHVhbGl0eSA9IGZ1bmN0aW9uIEF1Z21lbnRlZFZpcnR1YWxpdHkodGVycmlhKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdGhpcy5fdGVycmlhID0gdGVycmlhOyAvLyBOb3RlOiBXZSBjcmVhdGUgYSBwZXJzaXN0YW50IG9iamVjdCBhbmQgZGVmaW5lIGEgdHJhbnNpZW50IHByb3BlcnR5LCBzaW5jZSBrbm9ja291dCBuZWVkcyBhIHBlcnNpc3RhbnQgdmFyaWFibGVcbiAgLy8gICAgICAgdG8gdHJhY2ssIGJ1dCBmb3Igc3RhdGUgd2Ugd2FudCBhICdtYXliZScgaW50ZXJ2YWxJZC5cblxuICB0aGlzLl9ldmVudExvb3BTdGF0ZSA9IHt9O1xuICB0aGlzLl9tYW51YWxBbGlnbm1lbnQgPSBmYWxzZTtcbiAgdGhpcy5fbWF4aW11bVVwZGF0ZXNQZXJTZWNvbmQgPSBBdWdtZW50ZWRWaXJ0dWFsaXR5LkRFRkFVTFRfTUFYSU1VTV9VUERBVEVTX1BFUl9TRUNPTkQ7XG4gIHRoaXMuX29yaWVudGF0aW9uVXBkYXRlZCA9IGZhbHNlO1xuICB0aGlzLl9hbHBoYSA9IDA7XG4gIHRoaXMuX2JldGEgPSAwO1xuICB0aGlzLl9nYW1tYSA9IDA7XG4gIHRoaXMuX3JlYWxpZ25BbHBoYSA9IDA7XG4gIHRoaXMuX3JlYWxpZ25IZWFkaW5nID0gMDsgLy8gU2V0IHRoZSBkZWZhdWx0IGhlaWdodCB0byBiZSB0aGUgbGFzdCBoZWlnaHQgc28gdGhhdCB3aGVuIHdlIGZpcnN0IHRvZ2dsZSAoYW5kIGluY3JlbWVudCkgd2UgY3ljbGUgYW5kIGdvIHRvIHRoZSBmaXJzdCBoZWlnaHQuXG5cbiAgdGhpcy5faG92ZXJMZXZlbCA9IEF1Z21lbnRlZFZpcnR1YWxpdHkuUFJFU0VUX0hFSUdIVFMubGVuZ3RoIC0gMTsgLy8gQWx3YXlzIHJ1biB0aGUgZGV2aWNlIG9yaWVudGF0aW9uIGV2ZW50LCB0aGlzIHdheSBhcyBzb29uIGFzIHdlIGVuYWJsZSB3ZSBrbm93IHdoZXJlIHdlIGFyZSBhbmQgc2V0IHRoZVxuICAvLyBvcmllbnRhdGlvbiByYXRoZXIgdGhlbiBoYXZpbmcgdG8gd2FpdCBmb3IgdGhlIG5leHQgdXBkYXRlLlxuICAvLyBUaGUgZm9sbG93aW5nIGlzIGRpc2FibGVkIGJlY2F1c2UgY2hyb21lIGRvZXMgbm90IGN1cnJlbnRseSBzdXBwb3J0IGRldmljZW9yaWVudGF0aW9uYWJzb2x1dGUgY29ycmVjdGx5OlxuICAvLyBpZiAoJ29uZGV2aWNlb3JpZW50YXRpb25hYnNvbHV0ZScgaW4gd2luZG93KVxuICAvLyB7XG4gIC8vICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb25hYnNvbHV0ZScsIGZ1bmN0aW9uKGV2ZW50KSB7dGhhdC5fb3JpZW50YXRpb25VcGRhdGUoZXZlbnQpO30gKTtcbiAgLy8gfVxuICAvLyBlbHNlXG5cbiAgaWYgKFwib25kZXZpY2VvcmllbnRhdGlvblwiIGluIHdpbmRvdykge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlb3JpZW50YXRpb25cIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB0aGF0Ll9zdG9yZU9yaWVudGF0aW9uKGV2ZW50KTtcbiAgICB9KTtcbiAgfSAvLyBNYWtlIHRoZSB2YXJpYWJsZXMgdXNlZCBieSB0aGUgb2JqZWN0IHByb3BlcnRpZXMga25vY2tvdXQgb2JzZXJ2YWJsZSBzbyB0aGF0IGNoYW5nZXMgaW4gdGhlIHN0YXRlIG5vdGlmeSB0aGUgVUlcbiAgLy8gYW5kIGNhdXNlIGEgVUkgdXBkYXRlLiBOb3RlOiBUaGVzZSBhcmUgYWxsIG9mIHRoZSB2YXJpYWJsZXMgdXNlZCBqdXN0IGJ5IHRoZSBnZXR0ZXJzIChub3QgdGhlIHNldHRlcnMpLCBzaW5jZVxuICAvLyB0aGVzZSB1bnFpcXVlbHkgZGVmaW5lIHdoYXQgdGhlIGN1cnJlbnQgc3RhdGUgaXMgYW5kIGFyZSB0aGUgb25seSB0aGluZ3MgdGhhdCBjYW4gZWZmZWN0L2NhdXNlIHRoZSBzdGF0ZSB0byBjaGFuZ2VcbiAgLy8gKG5vdGU6IF9ldmVudExvb3BTdGF0ZSBpcyBoaWRkZW4gYmVoaW5kIC5fZXZlbnRMb29wUnVubmluZygpICkuXG5cblxuICBfa25vY2tvdXRbXCJkZWZhdWx0XCJdLnRyYWNrKHRoaXMsIFtcIl9ldmVudExvb3BTdGF0ZVwiLCBcIl9tYW51YWxBbGlnbm1lbnRcIiwgXCJfbWF4aW11bVVwZGF0ZXNQZXJTZWNvbmRcIiwgXCJfcmVhbGlnbkFscGhhXCIsIFwiX3JlYWxpZ25IZWFkaW5nXCIsIFwiX2hvdmVyTGV2ZWxcIl0pOyAvLyBOb3RlOiBUaGUgZm9sbG93aW5nIHByb3BlcnRpZXMgYXJlIGRlZmluZWQgYXMga25vY2tvdXQgcHJvcGVydGllcyBzbyB0aGF0IHRoZXkgY2FuIGJlIHVzZWQgdG8gdHJpZ2dlciB1cGRhdGVzIG9uIHRoZSBVSS5cblxuICAvKipcbiAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgQXVnbWVudGVkIFZpcnR1YWxpdHkgbW9kZSBpcyBjdXJyZW50bHkgZW5hYmxlZCAodHJ1ZSkgb3Igbm90IChmYWxzZSkuXG4gICAqXG4gICAqIE5vdGU6IElmIHtAbGluayBBdWdtZW50ZWRWaXJ0dWFsaXR5I21hbnVhbEFsaWdubWVudH0gaXMgZW5hYmxlZCBhbmQgdGhlIHN0YXRlIGlzIGNoYW5nZWQgaXQgd2lsbCBiZSBkaXNhYmxlZC5cbiAgICpcbiAgICogQG1lbWJlck9mIEF1Z21lbnRlZFZpcnR1YWxpdHkucHJvdG90eXBlXG4gICAqIEBtZW1iZXIge0Jvb2xlYW59IGVuYWJsZWRcbiAgICovXG5cblxuICBfa25vY2tvdXRbXCJkZWZhdWx0XCJdLmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZW5hYmxlZFwiLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnRMb29wUnVubmluZygpIHx8IHRoaXMuX21hbnVhbEFsaWdubWVudDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGVuYWJsZSkge1xuICAgICAgaWYgKGVuYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBlbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNldEFsaWdubWVudCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZW5hYmxlICE9PSB0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGNoYW5naW5nIHRoZSBlbmFibGVkIHN0YXRlIHRoZW4gZGlzYWJsZSBtYW51YWwgYWxpZ25tZW50LlxuICAgICAgICAvLyBXZSBvbmx5IGRvIHRoaXMgaWYgd2UgYXJlIGNoYW5naW5nIHRoZSBlbmFibGVkIHN0YXRlIHNvIHRoYXQgdGhlIGNsaWVudCBjYW4gcmVwZWF0ZWRseSBjYWxsIHRoZVxuICAgICAgICAvLyBzZXR0aW5nIHdpdGhvdXQgaGF2aW5nIGFueSBlZmZlY3QgaWYgdGhleSBhcmVuJ3QgY2hhbmdpbmcgdGhlIGVuYWJsZWQgc3RhdGUsIGJ1dCBzbyB0aGF0IGV2ZXJ5IHRpbWVcbiAgICAgICAgLy8gdGhhdCB0aGUgc3RhdGUgaXMgY2hhbmdlZCB0aGF0IHRoZSBtYW51YWwgYWxpZ25tZW50IGlzIHR1cm5lZCBiYWNrIG9mZiBpbml0YWxseS5cbiAgICAgICAgdGhpcy5fbWFudWFsQWxpZ25tZW50ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fc3RhcnRFdmVudExvb3AoZW5hYmxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICAvKipcbiAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgbWFudWFsIHJlYWxpZ25tZW50IG1vZGUgaXMgY3VycmVudGx5IGVuYWJsZWQgKHRydWUpIG9yIG5vdCAoZmFsc2UpLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXVnbWVudGVkVmlydHVhbGl0eS5wcm90b3R5cGVcbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbWFudWFsQWxpZ25tZW50XG4gICAqL1xuXG5cbiAgX2tub2Nrb3V0W1wiZGVmYXVsdFwiXS5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1hbnVhbEFsaWdubWVudFwiLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2V0TWFudWFsQWxpZ25tZW50KCk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChzdGFydEVuZCkge1xuICAgICAgdGhpcy5fc2V0TWFudWFsQWxpZ25tZW50KHN0YXJ0RW5kKTtcbiAgICB9XG4gIH0pO1xuICAvKipcbiAgICogR2V0cyB3aGV0aGVyIGEgbWFudWFsIHJlYWxpZ25tZW50IGhhcyBiZWVuIHNwZWNpZmllZCAodHJ1ZSkgb3Igbm90IChmYWxzZSkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBdWdtZW50ZWRWaXJ0dWFsaXR5LnByb3RvdHlwZVxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtYW51YWxBbGlnbm1lbnRTZXRcbiAgICovXG5cblxuICBfa25vY2tvdXRbXCJkZWZhdWx0XCJdLmRlZmluZVByb3BlcnR5KHRoaXMsIFwibWFudWFsQWxpZ25tZW50U2V0XCIsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZWFsaWduQWxwaGEgIT09IDAuMCB8fCB0aGlzLl9yZWFsaWduSGVhZGluZyAhPT0gMC4wO1xuICAgIH1cbiAgfSk7XG4gIC8qKlxuICAgKiBHZXRzIHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBob3ZlciBsZXZlbC5cbiAgICpcbiAgICogVXNlIDxjb2RlPkF1Z21lbnRlZFZpcnR1YWxpdHkuUFJFU0VUX0hFSUdIVFMubGVuZ3RoPC9jb2RlPiB0byBmaW5kIHRoZSB0b3RhbCBhdmFsaWFibGUgbGV2ZWxzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXVnbWVudGVkVmlydHVhbGl0eS5wcm90b3R5cGVcbiAgICogQG1lbWJlciB7aW50fSBob3ZlckxldmVsXG4gICAqL1xuXG5cbiAgX2tub2Nrb3V0W1wiZGVmYXVsdFwiXS5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImhvdmVyTGV2ZWxcIiwge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2hvdmVyTGV2ZWw7XG4gICAgfVxuICB9KTtcbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgdGhlIG1heGltdW0gbnVtYmVyIG9mIHRpbWVzIHRoYXQgdGhlIGNhbWVyYSBvcmllbnRhdGlvbiB3aWxsIGJlIHVwZGF0ZWQgcGVyIHNlY29uZC4gVGhpcyBpc1xuICAgKiB0aGUgbnVtYmVyIG9mIGNhbWVyYSBvcmllbnRhdGlvbiB1cGRhdGVzIHBlciBzZWNvbmRzIGlzIGNhcHBlZCB0byAoZXhwbGljaXRseSB0aGUgbnVtYmVyIG9mIHRpbWVzIHRoZVxuICAgKiBvcmllbnRhdGlvbiBpcyB1cGRhdGVkIHBlciBzZWNvbmQgbWlnaHQgYmUgbGVzcyBidXQgaXQgd29uJ3QgYmUgbW9yZSB0aGVuIHRoaXMgbnVtYmVyKS4gV2Ugd2FudCB0aGUgbnVtYmVyIG9mXG4gICAqIHRpbWVzIHRoYXQgdGhlIG9yaWVudGF0aW9uIGlzIHVwZGF0ZWQgY2FwcGVkIHNvIHRoYXQgd2UgZG9uJ3QgY29uc3VtZSB0byBtdWNoIGJhdHRlcnkgbGlmZSB1cGRhdGluZyB0b1xuICAgKiBmcmVxdWVudGx5LCBidXQgcmVzcG9uc2l2ZW5lc3MgaXMgc3RpbGwgYWNjZXB0YWJsZS5cbiAgICpcbiAgICogQG1lbWJlck9mIEF1Z21lbnRlZFZpcnR1YWxpdHkucHJvdG90eXBlXG4gICAqIEBtZW1iZXIge0Zsb2F0fSBtYXhpbXVtVXBkYXRlc1BlclNlY29uZFxuICAgKi9cblxuXG4gIF9rbm9ja291dFtcImRlZmF1bHRcIl0uZGVmaW5lUHJvcGVydHkodGhpcywgXCJtYXhpbXVtVXBkYXRlc1BlclNlY29uZFwiLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbWF4aW11bVVwZGF0ZXNQZXJTZWNvbmQ7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChtYXhpbXVtVXBkYXRlc1BlclNlY29uZCkge1xuICAgICAgdGhpcy5fbWF4aW11bVVwZGF0ZXNQZXJTZWNvbmQgPSBtYXhpbXVtVXBkYXRlc1BlclNlY29uZDsgLy8gSWYgd2UgYXJlIGN1cnJlbnRseSBlbmFibGVkIHJlc2V0IHRvIHVwZGF0ZSB0aGUgdGltaW5nIGludGVydmFsIHVzZWQuXG5cbiAgICAgIGlmICh0aGlzLl9ldmVudExvb3BSdW5uaW5nKCkpIHtcbiAgICAgICAgdGhpcy5fc3RhcnRFdmVudExvb3AoZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuX3N0YXJ0RXZlbnRMb29wKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG59O1xuLyoqXG4gKiBHZXRzIHRoZSB0aGUgbWF4aW11bSBudW1iZXIgb2YgdGltZXMgdGhhdCB0aGUgY2FtZXJhIG9yaWVudGF0aW9uIHdpbGwgYmUgdXBkYXRlZCBwZXIgc2Vjb25kIGJ5IGRlZmF1bHQuIFRoaXMgaXMgdGhlXG4gKiBudW1iZXIgb2YgY2FtZXJhIG9yaWVudGF0aW9uIHVwZGF0ZXMgcGVyIHNlY29uZHMgaXMgY2FwcGVkIHRvIGJ5IGRlZmF1bHQgKGV4cGxpY2l0bHkgdGhlIG51bWJlciBvZiB0aW1lcyB0aGVcbiAqIG9yaWVudGF0aW9uIGlzIHVwZGF0ZWQgcGVyIHNlY29uZCBtaWdodCBiZSBsZXNzIGJ1dCBpdCB3b24ndCBiZSBtb3JlIHRoZW4gdGhpcyBudW1iZXIpLiBXZSB3YW50IHRoZSBudW1iZXIgb2YgdGltZXNcbiAqIHRoYXQgdGhlIG9yaWVudGF0aW9uIGlzIHVwZGF0ZWQgY2FwcGVkIHNvIHRoYXQgd2UgZG9uJ3QgY29uc3VtZSB0byBtdWNoIGJhdHRlcnkgbGlmZSB1cGRhdGluZyB0byBmcmVxdWVudGx5LCBidXRcbiAqIHJlc3BvbnNpdmVuZXNzIGlzIHN0aWxsIGFjY2VwdGFibGUuXG4gKi9cblxuXG5BdWdtZW50ZWRWaXJ0dWFsaXR5LkRFRkFVTFRfTUFYSU1VTV9VUERBVEVTX1BFUl9TRUNPTkQgPSAxMC4wO1xuLyoqXG4gKiBUaGUgbWluaW11bSBoZWlnaHQgdGhhdCB0aGUgdmlld2VyIGlzIGFsbG93ZWQgdG8gaG92ZXIgYXQuXG4gKi9cblxuQXVnbWVudGVkVmlydHVhbGl0eS5NSU5JTVVNX0hPVkVSX0hFSUdIVCA9IDIwLjA7XG4vKiBUaGVzZSBhcmUgdGhlIGhlaWdodHMgdGhhdCB3ZSBjYW4gdG9nZ2xlIHRocm91Z2ggKGluIG1ldGVycyAtIGFib3ZlIHRoZSBzdXJmYWNlIGhlaWdodCkuXG4gKi9cblxuQXVnbWVudGVkVmlydHVhbGl0eS5QUkVTRVRfSEVJR0hUUyA9IFsxMDAwLCAyNTAsIDIwXTtcbi8qKlxuICogVG9nZ2xlcyB3aGV0aGVyIHRoZSBBdWdtZW50ZWRWaXJ1dHVhbGl0eSBtb2RlIGlzIGVuYWJsZWQgb3IgZGlzYWJsZWQuXG4gKi9cblxuQXVnbWVudGVkVmlydHVhbGl0eS5wcm90b3R5cGUudG9nZ2xlRW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbmFibGVkID0gIXRoaXMuZW5hYmxlZDtcbn07XG4vKipcbiAqIFRvZ2dsZXMgd2hldGhlciBtYW51YWwgYWxpZ25lbWVudCBpcyBlbmFibGVkIG9yIGRpc2FibGVkLlxuICovXG5cblxuQXVnbWVudGVkVmlydHVhbGl0eS5wcm90b3R5cGUudG9nZ2xlTWFudWFsQWxpZ25tZW50ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm1hbnVhbEFsaWdubWVudCA9ICF0aGlzLm1hbnVhbEFsaWdubWVudDtcbn07XG4vKipcbiAqIFJlc2V0cyB0aGUgYWxpZ25tZW50IHNvIHRoYXQgdGhlIGFsaWduZW1lbnQgbWF0Y2hlcyB0aGUgZGV2aWNlcyBhYnNvbHV0ZSBhbGlnbm1lbnQuXG4gKi9cblxuXG5BdWdtZW50ZWRWaXJ0dWFsaXR5LnByb3RvdHlwZS5yZXNldEFsaWdubWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fb3JpZW50YXRpb25VcGRhdGVkID0gdHJ1ZTtcbiAgdGhpcy5fcmVhbGlnbkFscGhhID0gMDtcbiAgdGhpcy5fcmVhbGlnbkhlYWRpbmcgPSAwO1xufTtcbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlld2VyIGJldHdlZW4gYSByYW5nZSBvZiBwcmVkZWZpbmVkIGhlaWdodHMsIHNldHRpbmcgdGhlIGNhbWVyYXMgb3JpZW50YXRpb24gc28gdGhhdCBpdCBtYXRjaGVzIHRoZVxuICogY29ycmVjdCBvcmllbnRhdGlvbi5cbiAqL1xuXG5cbkF1Z21lbnRlZFZpcnR1YWxpdHkucHJvdG90eXBlLnRvZ2dsZUhvdmVySGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9ob3ZlckxldmVsID0gKHRoaXMuX2hvdmVyTGV2ZWwgKyAxKSAlIEF1Z21lbnRlZFZpcnR1YWxpdHkuUFJFU0VUX0hFSUdIVFMubGVuZ3RoO1xuICB0aGlzLmhvdmVyKEF1Z21lbnRlZFZpcnR1YWxpdHkuUFJFU0VUX0hFSUdIVFNbdGhpcy5faG92ZXJMZXZlbF0pO1xufTtcbi8qKlxuICogTW92ZXMgdGhlIHZpZXdlciB0byBhIHNwZWNpZmllZCBoZWlnaHQsIHNldHRpbmcgdGhlIG9yaWVudGF0aW9uIHNvIHRoYXQgaXQgbWF0Y2hlcyB0aGUgY29ycmVjdCBBdWdtZW50ZWQgVmlydHVhbGl0eVxuICogb3JpZW50YXRpb24uXG4gKlxuICogQHBhcmFtIHtGbG9hdH0gaGVpZ2h0IFRoZSBoZWlnaHQgaW4gTWV0ZXJzIGFib3ZlIHRoZSBnbG9iZSBzdXJmYWNlLiBOb3RlOiBJZiBoZWlnaHQgaXMgYmVsb3dcbiAqICAgICAgICAgICAgICAgICAgICAgICB7QGxpbmsgQXVnbWVudGVkVmlydHVhbGl0eS5NSU5JTVVNX0hPVkVSX0hFSUdIVH0gdGhlIGhlaWdodCB3aWxsIGJlIHNldCB0b1xuICogICAgICAgICAgICAgICAgICAgICAgIHtAbGluayBBdWdtZW50ZWRWaXJ0dWFsaXR5Lk1JTklNVU1fSE9WRVJfSEVJR0hUfSB0byBhdm9pZCB2aXN1YWwgYXJ0aWZhY3RzIHdoZW4gdGhlIHZpZXdlclxuICogICAgICAgICAgICAgICAgICAgICAgIGJlY29tZXMgdG8gY2xvc2UgdG8gdGhlIHN1cmZhY2UuXG4gKiBAcGFyYW0ge0NhcnRvZ3JhcGhpY30gW3Bvc2l0aW9uXSBUaGUgbG9jYXRpb24gdG8gaG92ZXIgb3Zlci4gSWYgbm90IHNwZWNpZmllZCB0aGUgY3VycmVudCBjYW1lcmEgbG9jYXRpb24gd2lsbCBiZSB1c2VkLlxuICogQHBhcmFtIHtCb29sZWFufSBbZmx5VG89dHJ1ZV0gV2hldGhlciB0byBmbHkgdG8gdGhlIGxvY2F0aW9uICh0cnVlKSBvciB3aGV0aGVyIHRvIGp1bXAgdG8gdGhlIGxvY2F0aW9uIChmYWxzZSkuXG4gKi9cblxuXG5BdWdtZW50ZWRWaXJ0dWFsaXR5LnByb3RvdHlwZS5ob3ZlciA9IGZ1bmN0aW9uIChoZWlnaHQsIHBvc2l0aW9uLCBmbHlUbykge1xuICB2YXIgdGhhdCA9IHRoaXM7IC8vIEdldCBhY2Nlc3MgdG8gdGhlIGNhbWVyYS4uLmlmIGl0IGlzIG5vdCBhdmFsaWFibGUgd2UgY2FuJ3Qgc2V0IHRoZSBuZXcgaGVpZ2h0IHNvIGp1c3QgcmV0dXJuIG5vdy5cblxuICBpZiAoISgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHRoaXMuX3RlcnJpYS5jZXNpdW0pIHx8ICEoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKSh0aGlzLl90ZXJyaWEuY2VzaXVtLnZpZXdlcikgfHwgISgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHRoaXMuX3RlcnJpYS5jZXNpdW0udmlld2VyLmNhbWVyYSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY2FtZXJhID0gdGhpcy5fdGVycmlhLmNlc2l1bS52aWV3ZXIuY2FtZXJhO1xuXG4gIGlmICghKDAsIF9kZWZpbmVkW1wiZGVmYXVsdFwiXSkocG9zaXRpb24pKSB7XG4gICAgcG9zaXRpb24gPSBjYW1lcmEucG9zaXRpb25DYXJ0b2dyYXBoaWMuY2xvbmUoKTtcbiAgfVxuXG4gIGZseVRvID0gKDAsIF9kZWZhdWx0VmFsdWVbXCJkZWZhdWx0XCJdKShmbHlUbywgdHJ1ZSk7IC8vIENsYW1wIHRoZSBtaW5pbXVtIGhvdmVyIGhlaWdodCAoaGVpZ2h0cyBiZWxvdyB0aGlzIHZhbHVlIGNvdWxkIGxlYWQgdG8gcG9vciB2aXN1YWwgYXJ0aWZhY3RzKS5cblxuICBpZiAoaGVpZ2h0IDwgQXVnbWVudGVkVmlydHVhbGl0eS5NSU5JTVVNX0hPVkVSX0hFSUdIVCkge1xuICAgIGhlaWdodCA9IEF1Z21lbnRlZFZpcnR1YWxpdHkuTUlOSU1VTV9IT1ZFUl9IRUlHSFQ7XG4gIH0gLy8gUmVzZXQgdGhlIHZpZXdlciBoZWlnaHQuXG5cblxuICBmdW5jdGlvbiBmbHlUb0hlaWdodChzdXJmYWNlSGVpZ2h0KSB7XG4gICAgaWYgKCgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHN1cmZhY2VIZWlnaHQpKSB7XG4gICAgICBoZWlnaHQgKz0gc3VyZmFjZUhlaWdodDtcbiAgICB9XG5cbiAgICB2YXIgbmV3UG9zaXRpb24gPSBfQ2FydGVzaWFuW1wiZGVmYXVsdFwiXS5mcm9tUmFkaWFucyhwb3NpdGlvbi5sb25naXR1ZGUsIHBvc2l0aW9uLmxhdGl0dWRlLCBoZWlnaHQpO1xuXG4gICAgdmFyIHBvc2UgPSB0aGF0Ll9nZXRDdXJyZW50T3JpZW50YXRpb24oKTtcblxuICAgIHBvc2UuZGVzdGluYXRpb24gPSBuZXdQb3NpdGlvbjtcblxuICAgIGlmIChmbHlUbykge1xuICAgICAgY2FtZXJhLmZseVRvKHBvc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW1lcmEuc2V0Vmlldyhwb3NlKTtcbiAgICB9IC8vIE5lZWRlZCBvbiBtb2JpbGUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHJlbmRlciBpcyBtYXJrZWQgYXMgZGlydHkgc28gdGhhdCBvbmNlIEFWIG1vZGUgaGFzIGJlZW4gZGlzYWJsZWQgZm9yIGFcbiAgICAvLyB3aGlsZSBhbmQgdGhlbiBpcyByZWVuYWJsZWQgdGhlIC5zZXRWaWV3KCkgZnVuY3Rpb24gc3RpbGwgaGFzIGVmZmVjdCAob3RoZXJ3aXNlIGRpc3BpdGUgdGhlIGNhbGwgdGhlIC5zZXRWaWV3KClcbiAgICAvLyB0aGUgdmlldyBvcmllbnRhdGlvbiBkb2VzIG5vdCB2aXN1YWxseSB1cGRhdGUgdW50aWwgdGhlIHVzZXIgbWFudWFseSBtb3ZlcyB0aGUgY2FtZXJhIHBvc2l0aW9uKS5cblxuXG4gICAgdGhhdC5fdGVycmlhLmN1cnJlbnRWaWV3ZXIubm90aWZ5UmVwYWludFJlcXVpcmVkKCk7XG4gIH0gLy8gR2V0IHRoZSBncm91bmQgc3VyZmFjZSBoZWlnaHQgYXQgdGhpcyBsb2NhdGlvbiBhbmQgb2Zmc2V0IHRoZSBoZWlnaHQgYnkgaXQuXG5cblxuICBpZiAoISgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHRoaXMuX3RlcnJpYS5jZXNpdW0pIHx8ICEoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKSh0aGlzLl90ZXJyaWEuY2VzaXVtLnNjZW5lKSB8fCAhKDAsIF9kZWZpbmVkW1wiZGVmYXVsdFwiXSkodGhpcy5fdGVycmlhLmNlc2l1bS5zY2VuZS50ZXJyYWluUHJvdmlkZXIpIHx8IHRoaXMuX3RlcnJpYS5jZXNpdW0uc2NlbmUudGVycmFpblByb3ZpZGVyIGluc3RhbmNlb2YgX0VsbGlwc29pZFRlcnJhaW5Qcm92aWRlcltcImRlZmF1bHRcIl0pIHtcbiAgICAvLyBJZiB3ZSBjYW4ndCBnZXQgYWNjZXNzIHRvIHRoZSB0ZXJyYWluIHByb3ZpZGVyIG9yIHdlIGNhbiBnZXQgYWNjZXNzIHRvIHRoZSB0ZXJyYWluIHByb3ZpZGVyIGFuZCB0aGUgcHJvdmlkZXIgaXMganVzdCB0aGUgRWxsaXBzb2lkIHRoZW4gdXNlIHRoZSBoZWlnaHQgb2YgMC5cbiAgICBmbHlUb0hlaWdodCgwKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdGVycmFpblByb3ZpZGVyID0gdGhpcy5fdGVycmlhLmNlc2l1bS5zY2VuZS50ZXJyYWluUHJvdmlkZXI7XG4gICAgKDAsIF9zYW1wbGVUZXJyYWluTW9zdERldGFpbGVkW1wiZGVmYXVsdFwiXSkodGVycmFpblByb3ZpZGVyLCBbcG9zaXRpb25dKS50aGVuKGZ1bmN0aW9uICh1cGRhdGVkUG9zaXRpb24pIHtcbiAgICAgIGZseVRvSGVpZ2h0KHVwZGF0ZWRQb3NpdGlvblswXS5oZWlnaHQpO1xuICAgIH0pO1xuICB9XG59O1xuLyoqXG4gKiBNb3ZlcyB0aGUgdmlld2VyIHRvIGEgc3BlY2lmaWVkIGxvY2F0aW9uIHdoaWxlIG1haW50YWluaW5nIHRoZSBjdXJyZW50IGhlaWdodCBhbmQgdGhlIGNvcnJlY3QgQXVnbWVudGVkIFZpcnR1YWxpdHlcbiAqIG9yaWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7Q2FydG9ncmFwaGljfSBwb3NpdGlvbiBUaGUgbG9jYXRpb24gdG8gaG92ZXIgbW92ZSB0by5cbiAqIEBwYXJhbSB7RmxvYXR9IFttYXhpbXVtSGVpZ2h0XSBUaGUgbWF4aW11bSBoZWlnaHQgKGluIG1ldGVycykgdG8gY2FwIHRoZSBjdXJyZW50IGNhbWVyYSBoZWlnaHQgdG8gKGlmIHRoaXMgdmFsdWUgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZWQgYW5kIHRoZSB2aWV3ZXIgaXMgYWJvdmUgdGhpcyBoZWlnaHQgdGhlIGNhbWVyYSB3aWxsIGJlIHJlc3RyaWN0ZWQgdG8gdGhpcyBoZWlnaHQpLlxuICogQHBhcmFtIHtCb29sZWFufSBbZmx5VG9dIFdoZXRoZXIgdG8gZmx5IHRvIHRoZSBsb2NhdGlvbiAodHJ1ZSkgb3Igd2hldGhlciB0byBqdW1wIHRvIHRoZSBsb2NhdGlvbiAoZmFsc2UpLlxuICpcbiAqIFdoZW4gdGhlIG1hbnVhbCBhbGlnbm1lbnQgaXMgZW5hYmxlZCB0aGlzIGZ1bmN0aW9uIGhhcyBubyBlZmZlY3QuXG4gKi9cblxuXG5BdWdtZW50ZWRWaXJ0dWFsaXR5LnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbiAocG9zaXRpb24sIG1heGltdW1IZWlnaHQsIGZseVRvKSB7XG4gIHZhciB0aGF0ID0gdGhpczsgLy8gSWYgd2UgYXJlIGluIG1hbnVhbCBhbGlnbm1lbnQgbW9kZSB3ZSBkb24ndCBhbGxvdyB0aGUgdmlld2VyIHRvIG1vdmUgKHNpbmNlIHRoaXMgd291bGQgY3JlYXRlIGEgamFyaW5nIFVYIGZvciBtb3N0IHVzZSBjYXNlcykuXG5cbiAgaWYgKHRoaXMuX21hbnVhbEFsaWdubWVudCkge1xuICAgIHJldHVybjtcbiAgfSAvLyBHZXQgYWNjZXNzIHRvIHRoZSBjYW1lcmEuLi5pZiBpdCBpcyBub3QgYXZhbGlhYmxlIHdlIGNhbid0IGdldCB0aGUgY3VycmVudCBoZWlnaHQgKG9yIHNldCB0aGUgbmV3IGxvY2F0aW9uKSBzbyBqdXN0IHJldHVybiBub3cuXG5cblxuICBpZiAoISgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHRoaXMuX3RlcnJpYS5jZXNpdW0pIHx8ICEoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKSh0aGlzLl90ZXJyaWEuY2VzaXVtLnZpZXdlcikgfHwgISgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHRoaXMuX3RlcnJpYS5jZXNpdW0udmlld2VyLmNhbWVyYSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY2FtZXJhID0gdGhpcy5fdGVycmlhLmNlc2l1bS52aWV3ZXIuY2FtZXJhO1xuICB2YXIgY2FtZXJhUG9zaXRpb24gPSBjYW1lcmEucG9zaXRpb25DYXJ0b2dyYXBoaWMuY2xvbmUoKTtcbiAgdmFyIHZpZXdlckhlaWdodCA9IGNhbWVyYVBvc2l0aW9uLmhlaWdodDsgLy8gUmVzZXQgdGhlIHZpZXdlciBoZWlnaHQuXG5cbiAgZnVuY3Rpb24gbW92ZVRvTG9jYXRpb24oc3VyZmFjZUhlaWdodCkge1xuICAgIGlmICghKDAsIF9kZWZpbmVkW1wiZGVmYXVsdFwiXSkoc3VyZmFjZUhlaWdodCkpIHtcbiAgICAgIHN1cmZhY2VIZWlnaHQgPSAwO1xuICAgIH1cblxuICAgIHZhciBob3ZlckhlaWdodCA9IHZpZXdlckhlaWdodCAtIHN1cmZhY2VIZWlnaHQ7XG5cbiAgICBpZiAoKDAsIF9kZWZpbmVkW1wiZGVmYXVsdFwiXSkobWF4aW11bUhlaWdodCkgJiYgaG92ZXJIZWlnaHQgPiBtYXhpbXVtSGVpZ2h0KSB7XG4gICAgICBob3ZlckhlaWdodCA9IG1heGltdW1IZWlnaHQ7XG4gICAgfVxuXG4gICAgdGhhdC5ob3Zlcihob3ZlckhlaWdodCwgcG9zaXRpb24sIGZseVRvKTtcbiAgfSAvLyBHZXQgdGhlIGdyb3VuZCBzdXJmYWNlIGhlaWdodCBhdCB0aGlzIGxvY2F0aW9uIGFuZCBvZmZzZXQgdGhlIGhlaWdodCBieSBpdC5cblxuXG4gIGlmICghKDAsIF9kZWZpbmVkW1wiZGVmYXVsdFwiXSkodGhpcy5fdGVycmlhLmNlc2l1bSkgfHwgISgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHRoaXMuX3RlcnJpYS5jZXNpdW0uc2NlbmUpIHx8ICEoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKSh0aGlzLl90ZXJyaWEuY2VzaXVtLnNjZW5lLnRlcnJhaW5Qcm92aWRlcikgfHwgdGhpcy5fdGVycmlhLmNlc2l1bS5zY2VuZS50ZXJyYWluUHJvdmlkZXIgaW5zdGFuY2VvZiBfRWxsaXBzb2lkVGVycmFpblByb3ZpZGVyW1wiZGVmYXVsdFwiXSkge1xuICAgIC8vIElmIHdlIGNhbid0IGdldCBhY2Nlc3MgdG8gdGhlIHRlcnJhaW4gcHJvdmlkZXIgb3Igd2UgY2FuIGdldCBhY2Nlc3MgdG8gdGhlIHRlcnJhaW4gcHJvdmlkZXIgYW5kIHRoZSBwcm92aWRlciBpcyBqdXN0IHRoZSBFbGxpcHNvaWQgdGhlbiB1c2UgdGhlIGhlaWdodCBvZiAwLlxuICAgIG1vdmVUb0xvY2F0aW9uKHVuZGVmaW5lZCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRlcnJhaW5Qcm92aWRlciA9IHRoaXMuX3RlcnJpYS5jZXNpdW0uc2NlbmUudGVycmFpblByb3ZpZGVyO1xuICAgICgwLCBfc2FtcGxlVGVycmFpbk1vc3REZXRhaWxlZFtcImRlZmF1bHRcIl0pKHRlcnJhaW5Qcm92aWRlciwgW2NhbWVyYVBvc2l0aW9uXSkudGhlbihmdW5jdGlvbiAodXBkYXRlZFBvc2l0aW9uKSB7XG4gICAgICBtb3ZlVG9Mb2NhdGlvbih1cGRhdGVkUG9zaXRpb25bMF0uaGVpZ2h0KTtcbiAgICB9KTtcbiAgfVxufTtcbi8qKlxuICogV2hldGhlciB0aGUgdXNlciBpcyBjdXJyZW50bHkgc2V0dGluZyBhIG1hbnVhbCBhbGlnbm1lbnQuXG4gKlxuICogU2VlIGFsc28ge0BsaW5rIEF1Z21lbnRlZFZpcnR1YWxpdHkjX3NldE1hbnVhbEFsaWdubWVudH0uXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciB0aGUgdXNlciBpcyBjdXJyZW50bHkgc2V0dGluZyBhIG1hbnVhbCBhbGlnbm1lbnQgKHRydWUpIG9yIG5vdCAoZmFsc2UpLlxuICogQHByaXZhdGVcbiAqL1xuXG5cbkF1Z21lbnRlZFZpcnR1YWxpdHkucHJvdG90eXBlLl9nZXRNYW51YWxBbGlnbm1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVuYWJsZWQgJiYgdGhpcy5fbWFudWFsQWxpZ25tZW50O1xufTtcbi8qKlxuICogU3RhcnRzIC8gc3RvcHMgbWFudWFsIGFsaWdubWVudC5cbiAqXG4gKiBXaGVuIG1hbnVhbCByZWFsaWdubWVudCBpcyBlbmFibGVkIGl0IGFsbG93cyB0aGUgdXNlciB0byBzcGVjaWZ5IGEgbmV3IG9yaWdpbiBmb3IgdGhlIGFsaWdubWVudCBiZXR3ZWVuIHRoZSBkZXZpY2VzXG4gKiBwaHlzaWNhbCBhbmQgdmlydHVhbCBhbGlnbm1lbnQuIFdoZW4gbWFudWFsIGFsaWdubWVudCBpcyBlbmFibGVkIHRoZSBvcmllbnRhdGlvbiBpcyBsb2NrZWQsIHRvIGFsbG93IHRoZSB1c2VyIHRvXG4gKiByZWFsaWduIGEgdmlzdWFsIGxhbmRtYXJrIHdpdGggYSBwaHlzaWNhbCBsYW5kbWFyay5cbiAqXG4gKiBOb3RlOiBNYW51YWwgYWxpZ25tZW50IGlzIG9ubHkgZG9uZSBmb3IgdGhlIGhlYWRpbmcgYXhpcywgdGhpcyBpcyBiZWNhdXNlIGluIHByYWN0aWNlIHdlIGhhdmUgZm91bmQgdGhhdCB0aGUgaGVhZGluZ1xuICogYXhpcyBpcyBvZnRlbiBvdXQgYXMgbW9iaWxlIGRldmljZXMgc2VlbSB0byBoYXZlIGRpZmZpY3VsdHkgb2J0YWluaW5nIHRoZSBjb21wYXNzIGRpcmVjdGlvbiwgYnV0IHNlZW0gdG8gcGVyZm9ybVxuICogcmVsYXRpdmVseSB3ZWxsIGluIHRoZSBvdGhlciBheGVzLlxuICpcbiAqIE5vdGU6IFJlYWxpZ25tZW50IGlzIG9ubHkgcG9zc2libGUgd2hlbiBBdWdtZW50ZWRWaXJ0dWFsaXR5IGlzIGVuYWJsZWQuIElmIEF1Z21lbnRlZFZpcnR1YWxpdHkgaXMgZGlzYWJsZWQgd2hpbGVcbiAqICAgICAgIG1hbnVhbCBhbGlnbm1lbnQgaXMgaW4gcHJvZ3Jlc3MgaXQgd2lsbCBiZSBjYW5jZWxsZWQuXG4gKlxuICogU2VlIGFsc28ge0BsaW5rIEF1Z21lbnRlZFZpcnR1YWxpdHkjX2dldE1hbnVhbEFsaWdubWVudH0uXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBzdGFydEVuZCBXaGV0aGVyIHRoZSB1c2VyIGlzIHN0YXJ0aW5nICh0cnVlKSBvciBlbmRpbmcgKGZhbHNlKSB0aGUgcmVhbGlnbm1lbnQuXG4gKiBAcHJpdmF0ZVxuICovXG5cblxuQXVnbWVudGVkVmlydHVhbGl0eS5wcm90b3R5cGUuX3NldE1hbnVhbEFsaWdubWVudCA9IGZ1bmN0aW9uIChzdGFydEVuZCkge1xuICAvLyBPbmx5IGFsbG93IG1hbnVhbCBhbGlnbm1lbnQgY2hhbmdlcyB3aGVuIHRoZSBtb2R1bGUgaXMgZW5hYmxlZC5cbiAgaWYgKHRoaXMuZW5hYmxlZCAhPT0gdHJ1ZSkge1xuICAgIHJldHVybjtcbiAgfSAvLyBTYW5pdGlzZSB0aGUgaW5wdXQgdmFsdWUgdG8gYSBib29sZWFuLlxuXG5cbiAgaWYgKHN0YXJ0RW5kICE9PSB0cnVlKSB7XG4gICAgc3RhcnRFbmQgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChzdGFydEVuZCA9PT0gZmFsc2UgJiYgKDAsIF9kZWZpbmVkW1wiZGVmYXVsdFwiXSkodGhpcy5fdGVycmlhLmNlc2l1bSkgJiYgKDAsIF9kZWZpbmVkW1wiZGVmYXVsdFwiXSkodGhpcy5fdGVycmlhLmNlc2l1bS52aWV3ZXIpICYmICgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHRoaXMuX3RlcnJpYS5jZXNpdW0udmlld2VyLmNhbWVyYSkpIHtcbiAgICB0aGlzLl9yZWFsaWduQWxwaGEgPSB0aGlzLl9hbHBoYTtcbiAgICB0aGlzLl9yZWFsaWduSGVhZGluZyA9IF9NYXRoW1wiZGVmYXVsdFwiXS50b0RlZ3JlZXModGhpcy5fdGVycmlhLmNlc2l1bS52aWV3ZXIuY2FtZXJhLmhlYWRpbmcpO1xuICB9XG5cbiAgaWYgKHRoaXMuX21hbnVhbEFsaWdubWVudCAhPT0gc3RhcnRFbmQpIHtcbiAgICB0aGlzLl9tYW51YWxBbGlnbm1lbnQgPSBzdGFydEVuZDtcblxuICAgIHRoaXMuX3N0YXJ0RXZlbnRMb29wKCF0aGlzLl9tYW51YWxBbGlnbm1lbnQpO1xuICB9XG59O1xuLyoqXG4gKiBXaGV0aGVyIHRoZSBldmVudCBsb29wIGlzIGN1cnJlbnRseSBydW5uaW5nLlxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGVuYWJsZSBXaGV0aGVyIHRvIHN0YXJ0IHRoZSBldmVudCBsb29wIGlzIGN1cnJlbnRseSBydW5uaW5nICh0cnVlKSBvciBub3QgKGZhbHNlKS5cbiAqIEBwcml2YXRlXG4gKi9cblxuXG5BdWdtZW50ZWRWaXJ0dWFsaXR5LnByb3RvdHlwZS5fZXZlbnRMb29wUnVubmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHRoaXMuX2V2ZW50TG9vcFN0YXRlLmludGVydmFsSWQpO1xufTtcbi8qKlxuICogU3RhcnQgb3Igc3RvcCB0aGUgQXVnbWVudGVkIFZpcnV0dWFsaXR5IG1vZGUgZXZlbnQgbG9vcC4gV2hlbiBlbmFibGVkIHRoZSBvcmllbnRhdGlvbiB3aWxsIGVmZmVjdCB0aGUgY2FtZXJhc1xuICogdmlldyBhbmQgd2hlbiBkaXNhYmxlZCB0aGUgZGV2aWNlIG9yaWVudGF0aW9uIHdpbGwgbm90IGVmZmVjdCB0aGUgY2FtZXJhcyB2aWV3LlxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlIFdoZXRoZXIgdG8gc3RhcnQgdGhlIGV2ZW50IGxvb3AgKHRydWUpIG9yIHN0b3AgdGhlIGV2ZW50IGxvb3AgKGZhbHNlKS5cbiAqIEBwcml2YXRlXG4gKi9cblxuXG5BdWdtZW50ZWRWaXJ0dWFsaXR5LnByb3RvdHlwZS5fc3RhcnRFdmVudExvb3AgPSBmdW5jdGlvbiAoZW5hYmxlKSB7XG4gIC8vIEFyZSB3ZSBhY3R1YWxseSBjaGFuZ2luZyB0aGUgc3RhdGU/XG4gIGlmICh0aGlzLl9ldmVudExvb3BSdW5uaW5nKCkgIT09IGVuYWJsZSkge1xuICAgIGlmIChlbmFibGUgPT09IHRydWUpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICB2YXIgaW50ZXJ2YWxNcyA9IDEwMDAgLyB0aGlzLl9tYXhpbXVtVXBkYXRlc1BlclNlY29uZDtcbiAgICAgIHZhciBpZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhhdC5fdXBkYXRlT3JpZW50YXRpb24oKTtcbiAgICAgIH0sIGludGVydmFsTXMpO1xuICAgICAgdGhpcy5fZXZlbnRMb29wU3RhdGUgPSB7XG4gICAgICAgIGludGVydmFsSWQ6IGlkXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuX2V2ZW50TG9vcFN0YXRlLmludGVydmFsSWQpO1xuICAgICAgdGhpcy5fZXZlbnRMb29wU3RhdGUgPSB7fTtcbiAgICB9XG4gIH1cbn07XG4vKipcbiAqIERldmljZSBvcmllbnRhdGlvbiB1cGRhdGUgZXZlbnQgY2FsbGJhY2sgZnVuY3Rpb24uIFN0b3JlcyB0aGUgdXBkYXRlZCBvcmllbnRhdGlvbiBpbnRvIHRoZSBvYmplY3Qgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IENvbnRhaW5zIHRoZSB1cGRhdGVkIGRldmljZSBvcmllbnRhdGlvbiAoaW4gLmFscGhhLCAuYmV0YSwgLmdhbW1hKS5cbiAqIEBwcml2YXRlXG4gKi9cblxuXG5BdWdtZW50ZWRWaXJ0dWFsaXR5LnByb3RvdHlwZS5fc3RvcmVPcmllbnRhdGlvbiA9IGZ1bmN0aW9uIChldmVudCkge1xuICB0aGlzLl9hbHBoYSA9IGV2ZW50LmFscGhhO1xuICB0aGlzLl9iZXRhID0gZXZlbnQuYmV0YTtcbiAgdGhpcy5fZ2FtbWEgPSBldmVudC5nYW1tYTtcbiAgdGhpcy5fb3JpZW50YXRpb25VcGRhdGVkID0gdHJ1ZTtcbn07XG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgY2FtZXJhcyBvcmllbnRhdGlvbiB1c2luZyB0aGUgbGFzdCBvcmllbnRhdGlvbiByZWNvcmRlZCBhbmQgdGhlIGN1cnJlbnQgc2NyZWVuIG9yaWVudGF0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cblxuXG5BdWdtZW50ZWRWaXJ0dWFsaXR5LnByb3RvdHlwZS5fdXBkYXRlT3JpZW50YXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gIC8vIENoZWNrIGlmIHRoZSBzY3JlZW4gb3JpZW50YXRpb24gaGFzIGNoYW5nZWQgYW5kIG1hcmsgdGhlIG9yaWVudGF0aW9uIHVwZGF0ZWQgaWYgaXQgaGFzLlxuICB2YXIgc2NyZWVuT3JpZW50YXRpb24gPSB0aGlzLl9nZXRDdXJyZW50U2NyZWVuT3JpZW50YXRpb24oKTtcblxuICBpZiAoc2NyZWVuT3JpZW50YXRpb24gIT09IHRoaXMuX2xhc3RTY3JlZW5PcmllbnRhdGlvbikge1xuICAgIHRoaXMuX29yaWVudGF0aW9uVXBkYXRlZCA9IHRydWU7XG4gIH1cblxuICB0aGlzLl9sYXN0U2NyZWVuT3JpZW50YXRpb24gPSBzY3JlZW5PcmllbnRhdGlvbjsgLy8gT3B0b21pc2UgYnkgb25seSB1cGRhdGluZyB0aGUgY2FtZXJhIHZpZXcgaWYgc29tZSBwYXJ0IG9mIHRoZSBvcmllbnRhdGlvbiBjYWxjdWxhdGlvbiBoYXMgY2hhbmdlZC5cblxuICBpZiAoIXRoaXMuX29yaWVudGF0aW9uVXBkYXRlZCkge1xuICAgIC8vIFRoZSBvcmllbnRhdGlvbiBoYXMgbm90IGJlZW4gdXBkYXRlZCBzbyBkb24ndCB3YXN0ZSB0aW1lIGNoYW5naW5nIHRoZSBvcmllbnRhdGlvbi5cbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLl9vcmllbnRhdGlvblVwZGF0ZWQgPSBmYWxzZTsgLy8gR2V0IGFjY2VzcyB0byB0aGUgY2FtZXJhLi4uaWYgaXQgaXMgbm90IGF2YWxpYWJsZSB3ZSBjYW4ndCBzZXQgdGhlIG9yaWVudGF0aW9uIHNvIGp1c3QgcmV0dXJuIG5vdy5cblxuICBpZiAoISgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHRoaXMuX3RlcnJpYS5jZXNpdW0pIHx8ICEoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKSh0aGlzLl90ZXJyaWEuY2VzaXVtLnZpZXdlcikgfHwgISgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHRoaXMuX3RlcnJpYS5jZXNpdW0udmlld2VyLmNhbWVyYSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY2FtZXJhID0gdGhpcy5fdGVycmlhLmNlc2l1bS52aWV3ZXIuY2FtZXJhO1xuICBjYW1lcmEuc2V0Vmlldyh0aGlzLl9nZXRDdXJyZW50T3JpZW50YXRpb24oc2NyZWVuT3JpZW50YXRpb24pKTsgLy8gTmVlZGVkIG9uIG1vYmlsZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgcmVuZGVyIGlzIG1hcmtlZCBhcyBkaXJ0eSBzbyB0aGF0IG9uY2UgQVYgbW9kZSBoYXMgYmVlbiBkaXNhYmxlZCBmb3IgYVxuICAvLyB3aGlsZSBhbmQgdGhlbiBpcyByZWVuYWJsZWQgdGhlIC5zZXRWaWV3KCkgZnVuY3Rpb24gc3RpbGwgaGFzIGVmZmVjdCAob3RoZXJ3aXNlIGRpc3BpdGUgdGhlIGNhbGwgdGhlIC5zZXRWaWV3KClcbiAgLy8gdGhlIHZpZXcgb3JpZW50YXRpb24gZG9lcyBub3QgdmlzdWFsbHkgdXBkYXRlIHVudGlsIHRoZSB1c2VyIG1hbnVhbHkgbW92ZXMgdGhlIGNhbWVyYSBwb3NpdGlvbikuXG5cbiAgdGhpcy5fdGVycmlhLmN1cnJlbnRWaWV3ZXIubm90aWZ5UmVwYWludFJlcXVpcmVkKCk7XG59O1xuLyoqXG4gKiBHZXRzIHRoZSBjdXJyZW50IG9yaWVudGF0aW9uIHN0b3JlZCBpbiB0aGUgb2JqZWN0IHN0YXRlIGFuZCByZXR1cm5zIHRoZSByb2xsLCBwaXRjaCBhbmQgaGVhZGluZyB3aGljaCBjYW4gYmUgdXNlZCB0byBzZXQgdGhlIGNhbWVyYXMgb3JpZW50YXRpb24uXG4gKlxuICogQHBhcmFtIHtGbG9hdH0gc2NyZWVuT3JpZW50YXRpb24gVGhlIHNjcmVlbiBvcmllbnRhdGlvbiBpbiBkZWdyZWVzLiBOb3RlOiBUaGlzIGZpZWxkIGlzIG9wdGlvbmFsLCBpZiBzdXBwbGllZCB0aGlzIHZhbHVlIHdpbGwgYmUgdXNlZCBmb3IgdGhlIHNjcmVlbiBvcmllbnRhdGlvbiwgb3RoZXJ3aXNlIHRoZSBzY3JlZW4gb3JpZW50YXRpb24gd2lsbCBiZSBvYnRhaW5lZCBkdXJpbmcgdGhlIGV4ZWN1dGlvbiBvZiB0aGlzIGZ1bmN0aW9uLlxuICogQHJldHVybiB7T2JqZWN0fSBBIG9iamVjdCB3aXRoIHRoZSByb2xsLCBwaXRjaCBhbmQgaGVhZGluZyBzdG9yZWQgaW50byB0aGUgb3JpZW50YXRpb24uXG4gKiBAcHJpdmF0ZVxuICovXG5cblxuQXVnbWVudGVkVmlydHVhbGl0eS5wcm90b3R5cGUuX2dldEN1cnJlbnRPcmllbnRhdGlvbiA9IGZ1bmN0aW9uIChzY3JlZW5PcmllbnRhdGlvbikge1xuICB2YXIgYWxwaGEgPSB0aGlzLl9hbHBoYTtcbiAgdmFyIGJldGEgPSB0aGlzLl9iZXRhO1xuICB2YXIgZ2FtbWEgPSB0aGlzLl9nYW1tYTtcbiAgdmFyIHJlYWxpZ25BbHBoYSA9IHRoaXMuX3JlYWxpZ25BbHBoYTtcbiAgdmFyIHJlYWxpZ25IZWFkaW5nID0gdGhpcy5fcmVhbGlnbkhlYWRpbmc7XG5cbiAgaWYgKCEoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKShzY3JlZW5PcmllbnRhdGlvbikpIHtcbiAgICBzY3JlZW5PcmllbnRhdGlvbiA9IHRoaXMuX2dldEN1cnJlbnRTY3JlZW5PcmllbnRhdGlvbigpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2NvbXB1dGVUZXJyaWFPcmllbnRhdGlvbihhbHBoYSwgYmV0YSwgZ2FtbWEsIHNjcmVlbk9yaWVudGF0aW9uLCByZWFsaWduQWxwaGEsIHJlYWxpZ25IZWFkaW5nKTtcbn07XG4vKipcbiAqIFR1cm5zIHRoZSBvcmllbnRhdGlvbiBpbiB0aGUgZGV2aWNlIGZyYW1lIG9mIHJlZmVyZW5jZSBpbnRvIGFuIG9yaWVudGF0aW9uIHN1aXRhYmxlIGZvciBzcGVjaWZ5aW5nIHRoZSBUZXJyaWEgY2FtZXJhIG9yaWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7RmxvYXR9IGFscGhhIFRoZSBhbHBoYSB2YWx1ZSBvZiB0aGUgZGV2aWNlIG9yaWVudGF0aW9uIGluIGRlZ3JlZXMgKHRoaXMgaXMgdGhlIGFscGhhIHZhbHVlIGluIHRoZSBkZXZpY2UncyBmcmFtZSBvZiByZWZlcmVuY2UpLlxuICogQHBhcmFtIHtGbG9hdH0gYmV0YSAgVGhlIGJldGEgIHZhbHVlIG9mIHRoZSBkZXZpY2Ugb3JpZW50YXRpb24gaW4gZGVncmVlcyAodGhpcyBpcyB0aGUgYmV0YSAgdmFsdWUgaW4gdGhlIGRldmljZSdzIGZyYW1lIG9mIHJlZmVyZW5jZSkuXG4gKiBAcGFyYW0ge0Zsb2F0fSBnYW1tYSBUaGUgZ2FtbWEgdmFsdWUgb2YgdGhlIGRldmljZSBvcmllbnRhdGlvbiBpbiBkZWdyZWVzICh0aGlzIGlzIHRoZSBnYW1tYSB2YWx1ZSBpbiB0aGUgZGV2aWNlJ3MgZnJhbWUgb2YgcmVmZXJlbmNlKS5cbiAqIEBwYXJhbSB7RmxvYXR9IHNjcmVlbk9yaWVudGF0aW9uIFRoZSBzY3JlZW4gb3JpZW50YXRpb24gaW4gZGVncmVlcy5cbiAqIEBwYXJhbSB7RmxvYXR9IHJlYWxpZ25BbHBoYSAgIFRoZSB2YWx1ZSBvZiB0aGUgYWxwaGEgICB2YWx1ZSB0aGUgbGFzdCB0aW1lIHJlYWxpZ25tZW50IHdhcyBjb21wbGV0ZWQgKHN1cHBseSB6ZXJvIGlmIHJlYWxpZ25tZW50IGlzIG5vdCBzdXBwb3J0ZWQpLlxuICogQHBhcmFtIHtGbG9hdH0gcmVhbGlnbkhlYWRpbmcgVGhlIHZhbHVlIG9mIHRoZSBoZWFkaW5nIHZhbHVlIHRoZSBsYXN0IHRpbWUgcmVhbGlnbm1lbnQgd2FzIGNvbXBsZXRlZCAoc3VwcGx5IHplcm8gaWYgcmVhbGlnbm1lbnQgaXMgbm90IHN1cHBvcnRlZCkuXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIHRoZSByb2xsLCBwaXRjaCBhbmQgaGVhZGluZyBzdG9yZWQgaW50byB0aGUgb3JpZW50YXRpb24uXG4gKiBAcHJpdmF0ZVxuICovXG5cblxuQXVnbWVudGVkVmlydHVhbGl0eS5wcm90b3R5cGUuX2NvbXB1dGVUZXJyaWFPcmllbnRhdGlvbiA9IGZ1bmN0aW9uIChhbHBoYSwgYmV0YSwgZ2FtbWEsIHNjcmVlbk9yaWVudGF0aW9uLCByZWFsaWduQWxwaGEsIHJlYWxpZ25IZWFkaW5nKSB7XG4gIC8vIE5vdGU6IFRoZSBhbGdvcml0aG1pYyBmb3JtdWxhdGlvbiBpbiB0aGlzIGZ1bmN0aW9uIGlzIGZvciBzaW1wbGljaXR5IG9mIG1hdGhlbWF0aWNhbCBleHByZXNzaW9uLCByZWFkYWJpbGl0eSxcbiAgLy8gICAgICAgbWFpbnRhaW5hYmlsaXR5IGFuZCBtb2RpZmljYXRpb24gKGkuZS4gaXQgaXMgZWFzeSB0byB1bmRlcnN0YW5kIGhvdyB0byB1cGRhdGUgb3IgaW5zZXJ0IG5ldyBvZmZzZXRzIG9yIGZlYXR1cmVzKS5cbiAgLy8gICAgICAgVGhpcyBpcyBub3QgdGhlIHNpbXBsZXN0IGZvcm0gd2hpY2ggY2xlYXJseSBmbG93cyBmcm9tIHRoZSBjdXJyZW50IGZvcm11bGVhdGlvbiBhbmQgY2xlYXJseSBzaW1wbGlmeSB0aGVcbiAgLy8gICAgICAgbG9naWMgYW5kIG9wZXJhdGlvbnMgYnV0IHdvdWxkIGluY3JlYXNlIHRoZSBjb3N0IG9mIGZ1dHVyZSBtb2RpZmljYXRpb25zIGFuZCByZWR1Y2UgdGhlIHJlYWRhYmlsaXR5IG9mIHRoZVxuICAvLyAgICAgICBleHByZXNzaW9uLiBJdCBpcyBub3QgYW50aWNpcGF0ZWQgdGhhdCB0aGUgY3VycmVudCB2ZXJib3NlIGltcGxlbWVudGF0aW9uIHdvdWxkIGhhdmUgYSBzaWduaWZpY2FudCBpbXBhY3RcbiAgLy8gICAgICAgb24gcGVyZm9ybWFuY2Ugb3IgYWNjdXJhY3ksIGJ1dCBvYnZpb3VzbHkgdGhlcmUgd2lsbCBiZSBzb21lIGltcGFjdCBvbiBib3RoIGFuZCBpdCBjYW4gYmUgc2ltcGxpZmllZCBpblxuICAvLyAgICAgICBmdXR1cmUgaWYgbmVlZGVkLlxuICB2YXIgcm90YXRpb24gPSBfTWF0cml4W1wiZGVmYXVsdFwiXS5jbG9uZShfTWF0cml4W1wiZGVmYXVsdFwiXS5JREVOVElUWSwgcm90YXRpb24pO1xuXG4gIHZhciByb3RhdGlvbkluY3JlbWVudDsgLy8gUm9sbCAtIENvdW50ZXJhY3QgdGhlIGNoYW5nZSBpbiB0aGUgKG9yaWVudGF0aW9uKSBmcmFtZSBvZiByZWZlcmVuY2Ugd2hlbiB0aGUgc2NyZWVuIGlzIHJvdGF0ZWQgYW5kIHRoZVxuICAvLyAgICAgICAgcm90YXRpb24gbG9jayBpcyBub3Qgb24gKHRoZSBicm93c2VyIHJlb3JpZW50cyB0aGUgZnJhbWUgb2YgcmVmZXJlbmNlIHRvIGFsaWduIHdpdGggdGhlIG5ldyBzY3JlZW5cbiAgLy8gICAgICAgIG9yaWVudGF0aW9uIC0gd2hlcmUgYXMgd2Ugd2FudCBpdCBvZiB0aGUgZGV2aWNlIHJlbGF0aXZlIHRvIHRoZSB3b3JsZCkuXG5cbiAgcm90YXRpb25JbmNyZW1lbnQgPSBfTWF0cml4W1wiZGVmYXVsdFwiXS5mcm9tUm90YXRpb25aKF9NYXRoW1wiZGVmYXVsdFwiXS50b1JhZGlhbnMoc2NyZWVuT3JpZW50YXRpb24pKTtcblxuICBfTWF0cml4W1wiZGVmYXVsdFwiXS5tdWx0aXBseShyb3RhdGlvbiwgcm90YXRpb25JbmNyZW1lbnQsIHJvdGF0aW9uKTsgLy8gUGl0Y2ggLSBBbGlnbiB0aGUgZGV2aWNlIG9yaWVudGF0aW9uIGZyYW1lIHdpdGggdGhlIGNlYXNpdW0gb3JpZW50YXRpb24gZnJhbWUuXG5cblxuICByb3RhdGlvbkluY3JlbWVudCA9IF9NYXRyaXhbXCJkZWZhdWx0XCJdLmZyb21Sb3RhdGlvblgoX01hdGhbXCJkZWZhdWx0XCJdLnRvUmFkaWFucyg5MCkpO1xuXG4gIF9NYXRyaXhbXCJkZWZhdWx0XCJdLm11bHRpcGx5KHJvdGF0aW9uLCByb3RhdGlvbkluY3JlbWVudCwgcm90YXRpb24pOyAvLyBSb2xsIC0gQXBwbHkgdGhlIGRlaXZjZSByb2xsLlxuXG5cbiAgcm90YXRpb25JbmNyZW1lbnQgPSBfTWF0cml4W1wiZGVmYXVsdFwiXS5mcm9tUm90YXRpb25aKF9NYXRoW1wiZGVmYXVsdFwiXS50b1JhZGlhbnMoZ2FtbWEpKTtcblxuICBfTWF0cml4W1wiZGVmYXVsdFwiXS5tdWx0aXBseShyb3RhdGlvbiwgcm90YXRpb25JbmNyZW1lbnQsIHJvdGF0aW9uKTsgLy8gUGl0Y2ggLSBBcHBseSB0aGUgZGVpdmNlIHBpdGNoLlxuXG5cbiAgcm90YXRpb25JbmNyZW1lbnQgPSBfTWF0cml4W1wiZGVmYXVsdFwiXS5mcm9tUm90YXRpb25YKF9NYXRoW1wiZGVmYXVsdFwiXS50b1JhZGlhbnMoLWJldGEpKTtcblxuICBfTWF0cml4W1wiZGVmYXVsdFwiXS5tdWx0aXBseShyb3RhdGlvbiwgcm90YXRpb25JbmNyZW1lbnQsIHJvdGF0aW9uKTsgLy8gSGVhZGluZyAtIEFwcGx5IHRoZSBpbmNyZW1lbnRhbCBkZWl2Y2UgaGVhZGluZyAoZnJvbSB3aGVuIHN0YXJ0IHdhcyBsYXN0IHRyaWdnZXJlZCkuXG5cblxuICByb3RhdGlvbkluY3JlbWVudCA9IF9NYXRyaXhbXCJkZWZhdWx0XCJdLmZyb21Sb3RhdGlvblkoX01hdGhbXCJkZWZhdWx0XCJdLnRvUmFkaWFucygtKGFscGhhIC0gcmVhbGlnbkFscGhhKSkpO1xuXG4gIF9NYXRyaXhbXCJkZWZhdWx0XCJdLm11bHRpcGx5KHJvdGF0aW9uLCByb3RhdGlvbkluY3JlbWVudCwgcm90YXRpb24pOyAvLyBIZWFkaW5nIC0gVXNlIHRoZSBvZmZzZXQgd2hlbiB0aGUgb3JpZW50YXRpb24gd2FzIGxhc3Qgc3RhcnRlZC5cbiAgLy8gICAgICAgICAgIE5vdGU6IFRoaXMgaXMgbG9naWNhbGx5IGRpZmZlcmVudCBmcm9tIHRoZSBhbHBoYSB2YWx1ZSBhbmQgY2FuIG9ubHkgYmUgYXBwbGllZCBoZXJlIGluIHRoZSBzYW1lIHdheVxuICAvLyAgICAgICAgICAgICAgICAgc2luY2UgQ2VzaXVtIGNhbWVyYSBpcyBSUEggKEhlYWRpbmcgbGFzdCAtIG1vc3QgbG9jYWwpLiBTZWUgQ2VzaXVtIGNhbWVyYSByb3RhdGlvbiBkZWNvbXBvc2l0aW9uXG4gIC8vICAgICAgICAgICAgICAgICBmb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiB0aGUgQ2VzaXVtIGNhbWVyYSBmb3JtdWxlYXRpb24uXG5cblxuICByb3RhdGlvbkluY3JlbWVudCA9IF9NYXRyaXhbXCJkZWZhdWx0XCJdLmZyb21Sb3RhdGlvblkoX01hdGhbXCJkZWZhdWx0XCJdLnRvUmFkaWFucyhyZWFsaWduSGVhZGluZykpO1xuXG4gIF9NYXRyaXhbXCJkZWZhdWx0XCJdLm11bHRpcGx5KHJvdGF0aW9uLCByb3RhdGlvbkluY3JlbWVudCwgcm90YXRpb24pOyAvLyBEZWNvbXBvc2Ugcm90YXRpb24gbWF0cml4IGludG8gcm9sbCwgcGl0Y2ggYW5kIGhlYWRpbmcgdG8gc3VwcGx5IHRvIENlc2l1bSBjYW1lcmEuXG4gIC8vXG4gIC8vIFVzZSBub3RhdGlvbjpcbiAgLy8gICAgIFIgPSBSb2xsLCBQID0gUGl0Y2gsIEggPSBIZWFkaW5nXG4gIC8vICAgICBTSCA9IFNpbihIZWFkaW5nKSwgQ0ggPSBDb3MoSGVhZGluZylcbiAgLy9cbiAgLy8gQ2Vhc2l1bSBjYW1lcmEgcm90YXRpb24gPSBSUEg6XG4gIC8vICAgICBbIENSLCAtU1IsICAgMF1bICAxLCAgIDAsICAgMF1bIENILCAgIDAsICBTSF0gICBbQ1JDSC1TUlNQU0gsIC1TUkNQLCBDUlNILVNSU1BDSF1cbiAgLy8gICAgIFsgU1IsICBDUiwgICAwXVsgIDAsICBDUCwgIFNQXVsgIDAsICAgMSwgICAwXSA9IFtTUkNILUNSU1BTSCwgIENSQ1AsIFNSU0grQ1JTUENIXVxuICAvLyAgICAgWyAgMCwgICAwLCAgIDFdWyAgMCwgLVNQLCAgQ1BdWy1TSCwgICAwLCAgQ0hdICAgWyAgIC1DUFNIICAgLCAgIC1TUCwgICAgQ1BDSCAgICBdXG4gIC8vICAgICBOb3RlOiBUaGUgc2lnbiBkaWZmZXJlbmNlIG9mIHRoZSBTaW4gdGVybXMgaW4gcGl0Y2ggaXMgZGlmZmVyZW50IHRvIHRoZSBzdGFuZGFyZCByaWdodCBoYW5kZWQgcm90YXRpb24gc2luY2VcbiAgLy8gICAgICAgICAgIENlc2l1bSByb3RhdGVzIHBpdGNoIGluIHRoZSBsZWZ0IGhhbmRlZCBkaXJlY3Rpb24uIEJvdGggaGVhZGluZyBhbmQgcm9sbCBhcmUgcmlnaHQgaGFuZGVkIHJvdGF0aW9ucy5cbiAgLy9cbiAgLy8gVXNlIHRoZSBmb2xsb3dpbmcgbm90YXRpb24gdG8gcmVmZXIgdG8gZWxlbWVudHMgaW4gdGhlIENlc2l1bSBjYW1lcmEgcm90YXRpb24gbWF0cml4OlxuICAvLyAgICAgW1IwMCwgUjEwLCBSMjBdXG4gIC8vICAgICBbUjAxLCBSMTEsIFIyMV1cbiAgLy8gICAgIFtSMDIsIFIxMiwgUjIyXVxuICAvL1xuICAvLyBBbHNvIG5vdGU6IFRhbihYKSA9IFNpbihYKSAvIENvcyhYKVxuICAvL1xuICAvLyBEZWNvbXBvc2UgbWF0cml4OlxuICAvLyAgICBIID0gQVRhbihUYW4oSCkpID0gQVRhbihTaW4oSCkvQ29zKEgpKSA9IEFUYW4gKFNIIC8gQ0gpID0gQVRhbihDUFNIL0NQQ0gpID0gQVRhbiAoLVIwMiAvIFIyMilcbiAgLy8gICAgUiA9IEFUYW4oVGFuKFIpKSA9IEFUYW4oU2luKFIpL0NvcyhSKSkgPSBBVGFuIChTUiAvIENSKSA9IEFUYW4oU1JDUC9DUkNQKSA9IEFUYW4gKC1SMTAgLyBSMTEpXG4gIC8vICAgIFAgPSBBVGFuKFRhbihQKSkgPSBBVGFuKFNpbihQKS9Db3MoUCkpID0gQVRhbiAoU1AgLyBDUClcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTUCA9IC1SMTJcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZWVkIHRvIGZpbmQgQ1A6XG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENQID0gU3FydChDUF4yKVxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IFNxcnQoQ1BeMiooQ0heMitTSF4yKSkgICAgICAgICAgICAgIFNpbmNlOiAoQ29zQF4yICsgU2luQF4yKSA9IDFcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBTcXJ0KChDUF4yKSooQ0heMikgKyAoQ1BeMikqKFNIXjIpKSBFeHBhbmRcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBTcXJ0KChDUENIKV4yICsgKENQU0gpXjIpICAgICAgICAgICBTaW5jZTogTl4yKk1eMiA9IChOTSleMlxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IFNxcnQoUjIyXjIgKyAoLVIwMileMikgICAgICAgICAgICAgIFN1YnN0aXR1dGVcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBTcXJ0KFIyMl4yICsgUjAyXjIpICAgICAgICAgICAgICAgICBTaW5jZTogKC1OKV4yID0gTl4yXG4gIC8vICBTbyBQID0gQVRhbiAoLVIxMiAvIFNxcnQoUjIyXjIgKyBSMDJeMikpXG4gIC8vIFNpbXBsaWZ5IG5vdGF0aW9uIGZvciByZWFkYWJpbGl0eTpcblxuXG4gIHZhciByMTAgPSByb3RhdGlvbltfTWF0cml4W1wiZGVmYXVsdFwiXS5DT0xVTU4xUk9XMF07XG4gIHZhciByMTEgPSByb3RhdGlvbltfTWF0cml4W1wiZGVmYXVsdFwiXS5DT0xVTU4xUk9XMV07XG4gIHZhciByMDIgPSByb3RhdGlvbltfTWF0cml4W1wiZGVmYXVsdFwiXS5DT0xVTU4wUk9XMl07XG4gIHZhciByMTIgPSByb3RhdGlvbltfTWF0cml4W1wiZGVmYXVsdFwiXS5DT0xVTU4xUk9XMl07XG4gIHZhciByMjIgPSByb3RhdGlvbltfTWF0cml4W1wiZGVmYXVsdFwiXS5DT0xVTU4yUk9XMl07XG5cbiAgdmFyIGhlYWRpbmcgPSBfTWF0aFtcImRlZmF1bHRcIl0udG9EZWdyZWVzKE1hdGguYXRhbjIoLXIwMiwgcjIyKSk7XG5cbiAgdmFyIHJvbGwgPSBfTWF0aFtcImRlZmF1bHRcIl0udG9EZWdyZWVzKE1hdGguYXRhbjIoLXIxMCwgcjExKSk7XG5cbiAgdmFyIHBpdGNoID0gX01hdGhbXCJkZWZhdWx0XCJdLnRvRGVncmVlcyhNYXRoLmF0YW4yKC1yMTIsIE1hdGguc3FydChyMDIgKiByMDIgKyByMjIgKiByMjIpKSk7IC8vIENyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGUgcm9sbCwgcGl0Y2ggYW5kIGhlYWRpbmcgd2UganVzdCBjb21wdXRlZC5cblxuXG4gIHJldHVybiB7XG4gICAgb3JpZW50YXRpb246IHtcbiAgICAgIHJvbGw6IF9NYXRoW1wiZGVmYXVsdFwiXS50b1JhZGlhbnMocm9sbCksXG4gICAgICBwaXRjaDogX01hdGhbXCJkZWZhdWx0XCJdLnRvUmFkaWFucyhwaXRjaCksXG4gICAgICBoZWFkaW5nOiBfTWF0aFtcImRlZmF1bHRcIl0udG9SYWRpYW5zKGhlYWRpbmcpXG4gICAgfVxuICB9O1xufTtcbi8qKlxuICogR2V0cyB0aGUgY3VycmVudCBzY3JlZW4gb3JpZW50YXRpb24uXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgY3VycmVudCBzY3JlZW4gb3JpZW50YXRpb24gaW4gZGVncmVlcy5cbiAqIEBwcml2YXRlXG4gKi9cblxuXG5BdWdtZW50ZWRWaXJ0dWFsaXR5LnByb3RvdHlwZS5fZ2V0Q3VycmVudFNjcmVlbk9yaWVudGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICBpZiAoKDAsIF9kZWZpbmVkW1wiZGVmYXVsdFwiXSkoc2NyZWVuLm9yaWVudGF0aW9uKSAmJiAoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKShzY3JlZW4ub3JpZW50YXRpb24uYW5nbGUpKSB7XG4gICAgcmV0dXJuIHNjcmVlbi5vcmllbnRhdGlvbi5hbmdsZTtcbiAgfVxuXG4gIGlmICgoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKSh3aW5kb3cub3JpZW50YXRpb24pKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5vcmllbnRhdGlvbjtcbiAgfVxuXG4gIHJldHVybiAwO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBdWdtZW50ZWRWaXJ0dWFsaXR5OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuXG52YXIgX2NyZWF0ZVJlYWN0Q2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJjcmVhdGUtcmVhY3QtY2xhc3NcIikpO1xuXG52YXIgX3Byb3BUeXBlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInByb3AtdHlwZXNcIikpO1xuXG52YXIgX09ic2VydmVNb2RlbE1peGluID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vT2JzZXJ2ZU1vZGVsTWl4aW5cIikpO1xuXG52YXIgX2F1Z21lbnRlZF92aXJ0dWFsaXR5X3Rvb2wgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2F1Z21lbnRlZF92aXJ0dWFsaXR5X3Rvb2wuc2Nzc1wiKSk7XG5cbnZhciBfSWNvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL0ljb25cIikpO1xuXG52YXIgX1ZpZXdlck1vZGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi8uLi9Nb2RlbHMvVmlld2VyTW9kZVwiKSk7XG5cbnZhciBfZGVmaW5lZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInRlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9kZWZpbmVkXCIpKTtcblxudmFyIF9yZWFjdEkxOG5leHQgPSByZXF1aXJlKFwicmVhY3QtaTE4bmV4dFwiKTtcblxudmFyIF9BdWdtZW50ZWRWaXJ0dWFsaXR5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vLi4vTW9kZWxzL0F1Z21lbnRlZFZpcnR1YWxpdHlcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxudmFyIEF1Z21lbnRlZFZpcnR1YWxpdHlUb29sID0gKDAsIF9jcmVhdGVSZWFjdENsYXNzW1wiZGVmYXVsdFwiXSkoe1xuICBkaXNwbGF5TmFtZTogXCJBdWdtZW50ZWRWaXJ0dWFsaXR5VG9vbFwiLFxuICBtaXhpbnM6IFtfT2JzZXJ2ZU1vZGVsTWl4aW5bXCJkZWZhdWx0XCJdXSxcbiAgcHJvcFR5cGVzOiB7XG4gICAgdGVycmlhOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB2aWV3U3RhdGU6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGV4cGVyaW1lbnRhbFdhcm5pbmc6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmJvb2wsXG4gICAgdDogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uZnVuYy5pc1JlcXVpcmVkXG4gIH0sXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhdWdtZW50ZWRWaXJ0dWFsaXR5OiBuZXcgX0F1Z21lbnRlZFZpcnR1YWxpdHlbXCJkZWZhdWx0XCJdKHRoaXMucHJvcHMudGVycmlhKSxcbiAgICAgIGV4cGVyaW1lbnRhbFdhcm5pbmdTaG93bjogZmFsc2UsXG4gICAgICByZWFsaWduSGVscFNob3duOiBmYWxzZSxcbiAgICAgIHJlc2V0UmVhbGlnbkhlbHBTaG93bjogZmFsc2VcbiAgICB9O1xuICB9LFxuICBoYW5kbGVDbGlja0FWVG9vbDogZnVuY3Rpb24gaGFuZGxlQ2xpY2tBVlRvb2woKSB7XG4gICAgLy8gTWFrZSB0aGUgQXVnbWVudGVkVmlydHVhbGl0eSBtb2R1bGUgYXZhbGlhYmxlIGVsc2V3aGVyZS5cbiAgICB0aGlzLnByb3BzLnRlcnJpYS5hdWdtZW50ZWRWaXJ0dWFsaXR5ID0gdGhpcy5zdGF0ZS5hdWdtZW50ZWRWaXJ0dWFsaXR5O1xuXG4gICAgaWYgKCgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHRoaXMucHJvcHMuZXhwZXJpbWVudGFsV2FybmluZykgJiYgdGhpcy5wcm9wcy5leHBlcmltZW50YWxXYXJuaW5nICE9PSBmYWxzZSAmJiAhdGhpcy5zdGF0ZS5leHBlcmltZW50YWxXYXJuaW5nU2hvd24pIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBleHBlcmltZW50YWxXYXJuaW5nU2hvd246IHRydWVcbiAgICAgIH0pO1xuICAgICAgdmFyIHQgPSB0aGlzLnByb3BzLnQ7XG4gICAgICB0aGlzLnByb3BzLnZpZXdTdGF0ZS5ub3RpZmljYXRpb25zLnB1c2goe1xuICAgICAgICB0aXRsZTogdChcIkFSLnRpdGxlXCIpLFxuICAgICAgICBtZXNzYWdlOiB0KFwiQVIuZXhwZXJpbWVudGFsRmVhdHVyZU1lc3NhZ2VcIiksXG4gICAgICAgIGNvbmZpcm1UZXh0OiB0KFwiQVIuY29uZmlybVRleHRcIilcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUuYXVnbWVudGVkVmlydHVhbGl0eS50b2dnbGVFbmFibGVkKCk7XG4gIH0sXG4gIGhhbmRsZUNsaWNrUmVhbGlnbjogZnVuY3Rpb24gaGFuZGxlQ2xpY2tSZWFsaWduKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5yZWFsaWduSGVscFNob3duKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcmVhbGlnbkhlbHBTaG93bjogdHJ1ZVxuICAgICAgfSk7XG4gICAgICB2YXIgdCA9IHRoaXMucHJvcHMudDtcbiAgICAgIHRoaXMucHJvcHMudmlld1N0YXRlLm5vdGlmaWNhdGlvbnMucHVzaCh7XG4gICAgICAgIHRpdGxlOiB0KFwiQVIubWFudWFsQWxpZ25tZW50VGl0bGVcIiksXG4gICAgICAgIG1lc3NhZ2U6IHQoXCJBUi5tYW51YWxBbGlnbm1lbnRNZXNzYWdlXCIsIHtcbiAgICAgICAgICBpbWc6ICc8aW1nIHdpZHRoPVwiMTAwJVwiIHNyYz1cIi4vYnVpbGQvVGVycmlhSlMvaW1hZ2VzL2FyLXJlYWxpZ24tZ3VpZGUuZ2lmXCIgLz4nXG4gICAgICAgIH0pLFxuICAgICAgICBjb25maXJtVGV4dDogdChcIkFSLmNvbmZpcm1UZXh0XCIpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlLmF1Z21lbnRlZFZpcnR1YWxpdHkudG9nZ2xlTWFudWFsQWxpZ25tZW50KCk7XG4gIH0sXG4gIGhhbmRsZUNsaWNrUmVzZXRSZWFsaWduOiBmdW5jdGlvbiBoYW5kbGVDbGlja1Jlc2V0UmVhbGlnbigpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUucmVzZXRSZWFsaWduSGVscFNob3duKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcmVzZXRSZWFsaWduSGVscFNob3duOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHZhciB0ID0gdGhpcy5wcm9wcy50O1xuICAgICAgdGhpcy5wcm9wcy52aWV3U3RhdGUubm90aWZpY2F0aW9ucy5wdXNoKHtcbiAgICAgICAgdGl0bGU6IHQoXCJBUi5yZXNldEFsaWdubWVudFRpdGxlXCIpLFxuICAgICAgICBtZXNzYWdlOiB0KFwiQVIucmVzZXRBbGlnbm1lbnRNZXNzYWdlXCIpLFxuICAgICAgICBjb25maXJtVGV4dDogdChcIkFSLmNvbmZpcm1UZXh0XCIpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlLmF1Z21lbnRlZFZpcnR1YWxpdHkucmVzZXRBbGlnbm1lbnQoKTtcbiAgfSxcbiAgaGFuZGxlQ2xpY2tIb3ZlcjogZnVuY3Rpb24gaGFuZGxlQ2xpY2tIb3ZlcigpIHtcbiAgICB0aGlzLnN0YXRlLmF1Z21lbnRlZFZpcnR1YWxpdHkudG9nZ2xlSG92ZXJIZWlnaHQoKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIGVuYWJsZWQgPSB0aGlzLnN0YXRlLmF1Z21lbnRlZFZpcnR1YWxpdHkuZW5hYmxlZDtcbiAgICB2YXIgdG9nZ2xlSW1hZ2UgPSBfSWNvbltcImRlZmF1bHRcIl0uR0xZUEhTLmFyT2ZmO1xuICAgIHZhciB0b2dnbGVTdHlsZSA9IF9hdWdtZW50ZWRfdmlydHVhbGl0eV90b29sW1wiZGVmYXVsdFwiXS5idG47XG5cbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgdG9nZ2xlSW1hZ2UgPSBfSWNvbltcImRlZmF1bHRcIl0uR0xZUEhTLmFyT247XG4gICAgICB0b2dnbGVTdHlsZSA9IF9hdWdtZW50ZWRfdmlydHVhbGl0eV90b29sW1wiZGVmYXVsdFwiXS5idG5QcmltYXJ5O1xuICAgIH1cblxuICAgIHZhciB0ID0gdGhpcy5wcm9wcy50O1xuICAgIHZhciByZWFsaWdubWVudCA9IHRoaXMuc3RhdGUuYXVnbWVudGVkVmlydHVhbGl0eS5tYW51YWxBbGlnbm1lbnQ7XG4gICAgdmFyIHJlYWxpZ25tZW50U3R5bGUgPSBfYXVnbWVudGVkX3ZpcnR1YWxpdHlfdG9vbFtcImRlZmF1bHRcIl0uYnRuO1xuXG4gICAgaWYgKHJlYWxpZ25tZW50KSB7XG4gICAgICByZWFsaWdubWVudFN0eWxlID0gX2F1Z21lbnRlZF92aXJ0dWFsaXR5X3Rvb2xbXCJkZWZhdWx0XCJdLmJ0bkJsaW5rO1xuICAgIH1cblxuICAgIHZhciBob3ZlckxldmVsID0gdGhpcy5zdGF0ZS5hdWdtZW50ZWRWaXJ0dWFsaXR5LmhvdmVyTGV2ZWw7XG4gICAgdmFyIGhvdmVySW1hZ2UgPSBfSWNvbltcImRlZmF1bHRcIl0uR0xZUEhTLmFySG92ZXIwOyAvLyBOb3RlOiBXZSB1c2UgdGhlIGltYWdlIG9mIHRoZSBuZXh0IGxldmVsIHRoYXQgd2Ugd2lsbCBiZSBjaGFuZ2luZyB0bywgbm90IHRoZSBsZXZlbCB0aGUgd2UgYXJlIGN1cnJlbnRseSBhdC5cblxuICAgIHN3aXRjaCAoaG92ZXJMZXZlbCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBob3ZlckltYWdlID0gX0ljb25bXCJkZWZhdWx0XCJdLkdMWVBIUy5hckhvdmVyMDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaG92ZXJJbWFnZSA9IF9JY29uW1wiZGVmYXVsdFwiXS5HTFlQSFMuYXJIb3ZlcjE7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhvdmVySW1hZ2UgPSBfSWNvbltcImRlZmF1bHRcIl0uR0xZUEhTLmFySG92ZXIyO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcm9wcy50ZXJyaWEudmlld2VyTW9kZSAhPT0gX1ZpZXdlck1vZGVbXCJkZWZhdWx0XCJdLkxlYWZsZXQgPyBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBfYXVnbWVudGVkX3ZpcnR1YWxpdHlfdG9vbFtcImRlZmF1bHRcIl0uYXVnbWVudGVkVmlydHVhbGl0eVRvb2xcbiAgICB9LCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xuICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgIGNsYXNzTmFtZTogdG9nZ2xlU3R5bGUsXG4gICAgICB0aXRsZTogdChcIkFSLmFyVG9vbFwiKSxcbiAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2tBVlRvb2xcbiAgICB9LCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX0ljb25bXCJkZWZhdWx0XCJdLCB7XG4gICAgICBnbHlwaDogdG9nZ2xlSW1hZ2VcbiAgICB9KSksIGVuYWJsZWQgPyBbX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcbiAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICBjbGFzc05hbWU6IF9hdWdtZW50ZWRfdmlydHVhbGl0eV90b29sW1wiZGVmYXVsdFwiXS5idG4sXG4gICAgICB0aXRsZTogdChcIkFSLmJ0bkhvdmVyXCIpLFxuICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDbGlja0hvdmVyLFxuICAgICAga2V5OiBcIjBcIlxuICAgIH0sIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfSWNvbltcImRlZmF1bHRcIl0sIHtcbiAgICAgIGdseXBoOiBob3ZlckltYWdlXG4gICAgfSkpLCAhdGhpcy5zdGF0ZS5hdWdtZW50ZWRWaXJ0dWFsaXR5Lm1hbnVhbEFsaWdubWVudFNldCA/IF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XG4gICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgY2xhc3NOYW1lOiByZWFsaWdubWVudFN0eWxlLFxuICAgICAgdGl0bGU6IHQoXCJBUi5idG5SZWFsaWduXCIpLFxuICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDbGlja1JlYWxpZ24sXG4gICAgICBrZXk6IFwiMVwiXG4gICAgfSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9JY29uW1wiZGVmYXVsdFwiXSwge1xuICAgICAgZ2x5cGg6IF9JY29uW1wiZGVmYXVsdFwiXS5HTFlQSFMuYXJSZWFsaWduXG4gICAgfSkpIDogbnVsbCwgdGhpcy5zdGF0ZS5hdWdtZW50ZWRWaXJ0dWFsaXR5Lm1hbnVhbEFsaWdubWVudFNldCAmJiAhcmVhbGlnbm1lbnQgPyBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xuICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgIGNsYXNzTmFtZTogX2F1Z21lbnRlZF92aXJ0dWFsaXR5X3Rvb2xbXCJkZWZhdWx0XCJdLmJ0bixcbiAgICAgIHRpdGxlOiB0KFwiQVIuYnRuUmVzZXRSZWFsaWduXCIpLFxuICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDbGlja1Jlc2V0UmVhbGlnbixcbiAgICAgIGtleTogXCIyXCJcbiAgICB9LCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX0ljb25bXCJkZWZhdWx0XCJdLCB7XG4gICAgICBnbHlwaDogX0ljb25bXCJkZWZhdWx0XCJdLkdMWVBIUy5hclJlc2V0QWxpZ25tZW50XG4gICAgfSkpIDogbnVsbF0gOiBudWxsKSA6IG51bGw7XG4gIH1cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSAoMCwgX3JlYWN0STE4bmV4dC53aXRoVHJhbnNsYXRpb24pKCkoQXVnbWVudGVkVmlydHVhbGl0eVRvb2wpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJidG5cIjpcInRqcy1hdWdtZW50ZWRfdmlydHVhbGl0eV90b29sX19idG4gdGpzLV9idXR0b25zX19idG4gdGpzLV9idXR0b25zX19idG4gdGpzLW5hdl9fYnRuIHRqcy1fYnV0dG9uc19fYnRuXCIsXCJidG4tcHJpbWFyeVwiOlwidGpzLWF1Z21lbnRlZF92aXJ0dWFsaXR5X3Rvb2xfX2J0bi1wcmltYXJ5IHRqcy1fYnV0dG9uc19fYnRuIHRqcy1fYnV0dG9uc19fYnRuIHRqcy1uYXZfX2J0biB0anMtX2J1dHRvbnNfX2J0blwiLFwiYnRuUHJpbWFyeVwiOlwidGpzLWF1Z21lbnRlZF92aXJ0dWFsaXR5X3Rvb2xfX2J0bi1wcmltYXJ5IHRqcy1fYnV0dG9uc19fYnRuIHRqcy1fYnV0dG9uc19fYnRuIHRqcy1uYXZfX2J0biB0anMtX2J1dHRvbnNfX2J0blwiLFwiYnRuLWJsaW5rXCI6XCJ0anMtYXVnbWVudGVkX3ZpcnR1YWxpdHlfdG9vbF9fYnRuLWJsaW5rIHRqcy1fYnV0dG9uc19fYnRuIHRqcy1fYnV0dG9uc19fYnRuIHRqcy1uYXZfX2J0biB0anMtX2J1dHRvbnNfX2J0blwiLFwiYnRuQmxpbmtcIjpcInRqcy1hdWdtZW50ZWRfdmlydHVhbGl0eV90b29sX19idG4tYmxpbmsgdGpzLV9idXR0b25zX19idG4gdGpzLV9idXR0b25zX19idG4gdGpzLW5hdl9fYnRuIHRqcy1fYnV0dG9uc19fYnRuXCIsXCJidG4tcHJpbWFyeS0taG92ZXJcIjpcInRqcy1hdWdtZW50ZWRfdmlydHVhbGl0eV90b29sX19idG4tcHJpbWFyeS0taG92ZXJcIixcImJ0blByaW1hcnlIb3ZlclwiOlwidGpzLWF1Z21lbnRlZF92aXJ0dWFsaXR5X3Rvb2xfX2J0bi1wcmltYXJ5LS1ob3ZlclwiLFwiYmxpbmtlclwiOlwidGpzLWF1Z21lbnRlZF92aXJ0dWFsaXR5X3Rvb2xfX2JsaW5rZXJcIixcInRvb2xCdXR0b25cIjpcInRqcy1hdWdtZW50ZWRfdmlydHVhbGl0eV90b29sX190b29sQnV0dG9uXCIsXCJhdWdtZW50ZWRWaXJ0dWFsaXR5VG9vbFwiOlwidGpzLWF1Z21lbnRlZF92aXJ0dWFsaXR5X3Rvb2xfX2F1Z21lbnRlZFZpcnR1YWxpdHlUb29sIHRqcy10b29sX2J1dHRvbl9fdG9vbEJ1dHRvblwifTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6b0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JLQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=