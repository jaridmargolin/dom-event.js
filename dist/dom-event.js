(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['DOMEvent'] = factory();
  }
}(this, function () {

/*!
 * dom-event.js
 * 
 * Copyright (c) 2014
 */
var domEvent;
domEvent = function () {
  /* -----------------------------------------------------------------------------
   * DOMEvent
   * ---------------------------------------------------------------------------*/
  /**
   * Convenient class used to work with addEventListener.
   *
   * @example
   * var listener = new DOMEvent(document, 'touchstart', handler, this);
   *
   * @constructor
   * @public
   *
   * @param {object} el - Element to add the EventListener on.
   * @param {string} eventName - Name of the event to listen for.
   * @param {function} handler - Function called when event is fired.
   *   Passed `evt` as the first argument.
   * @param {object} context - Conetext to call handler with.
   */
  var DOMEvent = function (el, eventName, handler, context) {
    // Make args available to instance
    this.el = el;
    this.eventName = eventName;
    this.handler = handler;
    this.context = context;
    // Attach
    this.add();
  };
  /**
   * Remove the EventListener
   *
   * @example
   * listener.remove();
   *
   * @public
   */
  DOMEvent.prototype.remove = function () {
    this.el.removeEventListener(this.eventName, this.cachedHandler);
  };
  /**
   * Add the `EventListener`. This method is called internally in
   * the constructor. It can also be used to re-attach a listener
   * that was previously removed.
   *
   * @private
   */
  DOMEvent.prototype.add = function () {
    // Cache this
    var self = this;
    // Cache handler so it can be removed.
    self.cachedHandler = function (e) {
      self._handler.call(self, e, this);
    };
    // Modified handler
    self.el.addEventListener(self.eventName, self.cachedHandler, false);
  };
  /**
   * Handler that manages context, and normalizes both 
   * preventDefault and stopPropagation.
   *
   * @private
   *
   * @param {string} name - Name of event to listen for.
   * @param {object} event - Raw event object. 
   */
  DOMEvent.prototype._handler = function (e, context) {
    // Copy props to new evt object. This is shallow.
    // Only done so that I can modify stopPropagation
    // and preventDefault.
    var evt = {};
    for (var k in e) {
      evt[k] = e[k];
    }
    // Normalize stopPropagation
    evt.stopPropagation = function () {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    };
    // Normalize preventDefault
    evt.preventDefault = function () {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    };
    // Call with context and modified evt.
    this.handler.call(this.context || context, evt);
  };
  /* -----------------------------------------------------------------------------
   * export
   * ---------------------------------------------------------------------------*/
  return DOMEvent;
}();

return domEvent;


}));