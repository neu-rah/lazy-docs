var fs = require('fs');

var should = require('should');

var docs=require('../lazy-docs')();

describe('lazy-docs', function() {

  describe('module load', function() {
		it('should return a loader function', function() {
			result=require("lazy-docs");
			result.should.be.type('function');
		});
	});

  describe('loader function', function() {
		it('should return functional file', function() {
			result=docs("test/resources/text.txt");
			result.close.should.be.type('function');
		});
	});

  describe('functional file', function() {
		it('should load a file on demand and return a document', function() {
			result=docs("test/resources/text.txt")();
			result.should.be.type('string');
			result.should.match(/my text file\./);
		});
	});

});
