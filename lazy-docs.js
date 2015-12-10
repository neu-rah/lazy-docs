"use strict";
/*********
* Documents proxy with watcher
* documents are only reaload if changed and when requested
* external changes only flag the file to refresh at next request
* Rui Azevedo «neu-rah» (ruihfazevedo@gmail.com) [www.r-site.net]
*****/

var debug=module.id==="repl";
var log=debug?console.log:function(){};

//functionality is almost transfered to fProxy
//this module only wraps it and defaults to local file system
var fProxy=require("fproxy");
var lazyDocs=module.exports=function lazyDocs(fromString) {
  return fProxy(fProxy.mediaDescriptors.file,fromString||(o=>o.toString()));
}

if (debug) {//debuging with repl inside module [https://github.com/neu-rah/nit]
  console.log("Debug module lazy-docs loaded into ["+module.id+"] environment");
  var libxml=require('libxmljs');
  var textFile=lazyDocs();
  var xmlFile=lazyDocs(libxml.parseXml);
  var myTextFile=textFile("test/resources/test.txt");
  myTextFile((e,o)=>log("assync result:",e||o));
  var myXmlFile=xmlFile("test/resources/test.xml");
  myXmlFile((e,o)=>log("assync xml result:",e||o.toString()));
}
