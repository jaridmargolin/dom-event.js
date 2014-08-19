/*
 * test/_umd.js
 * 
 * Copyright (c) 2014
 */

define([
  'jquery',
  'proclaim',
  'dom-event/dom-event'
], function ($, assert, DOMEvent) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('umd - dom-event.js', function () {

  it('Should create instance.', function () {
    var $workboard = $('#workboard');
    $workboard.html('<input type="text">');
    $inpt = $workboard.find('input');

    var listener = new DOMEvent($inpt[0], 'keypress', function () {});
    assert.isInstanceOf(listener, DOMEvent);
  });

});


});