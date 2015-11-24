"use strict";
var fs = require('fs');
var should = require('should');
var lazyDocs;
var textFile;
var txt;

describe('lazy-docs', function() {

  describe('module load', function() {
		it('should return a setup function', function() {
			lazyDocs=require("lazy-docs");
			lazyDocs.should.be.type('function');
		});
	});

  describe('setup', function() {
		it('should return loader function', function() {
			textFile=lazyDocs();
			textFile.should.be.type('function');
		});
	});

  describe('loader function', function() {
		it('should return functional file', function() {
			txt=textFile("test/resources/test.txt");
			txt.proxy.close.should.be.type('function');
		});
	});

  describe('functional file', function() {
		it('should load a file on demand and return a document', function() {
			var result=txt();
			result.should.be.type('string');
			result.should.match(/my text file\./);
		});
	});

});
