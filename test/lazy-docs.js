var fs = require('fs');

var should = require('should');

var libxslt =
var docs=require('../lazy-docs')();

describe('lazy-docs', function() {
  describe('loadfile', function() {
		it('should load a file', function() {
			var result = docs.load("resources/test.txt");
			result.should.be.type('string');
			result.should.match(/text/)
		});
	});
}
