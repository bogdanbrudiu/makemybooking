/*jshint expr: true*/
/*global describe, it, beforeEach, module, inject, expect*/
describe('Home', function () {

  beforeEach(module('makemybooking.home'));

  it('has a dummy test', inject( function() {
    expect(true).to.be.ok;
  }));

});