"use strict";
/*********
* Documents proxy with watcher
* documents are only reaload if changed and when requested
* external changes only flag the file to refresh at next request
* Rui Azevedo «neu-rah» (ruihfazevedo@gmail.com) [www.r-site.net]
*****/

var debug=module.id==="repl";
var log=debug?console.log:function(){};

var fs=require("fs");
var path=require("path");
var fProxy=require("fproxy");
//var swear=require("node-swear");

//sync or assync document loader
//initialize with parser function
//call result with filename and optinoal callback
//call result to fetch the file
//note: same file should not be used with both sync and assync at same time
var li;
var lazyDocs=module.exports=function lazyDocs(fromString) {
  fromString=fromString||(function(id){return id;});//defaults to text files
  //handle internal callback, parse, then call user callback
  function parse(userCall,err,data) {
    if (err) userCall(err);
    else userCall(err,fromString(data.toString()));
  }
  var mediaAssyncFs={//media descriptor for sync/assync fs
    tag:function(url,callback) {
      return (callback?"(assync)":"(sync)")+path.resolve(process.cwd(),url);
    },
    load:function(url,callback) {
      if (callback) fs.readFile(url,parse.bind(this,callback));
      else return fromString(fs.readFileSync(url).toString());
    },
    post:function(tag,item) {
      li=item;
      if (item.watcher) item.watcher.close();
      item.watcher=fs.watch(tag, item.refresh);
    }
  };
  return fProxy(mediaAssyncFs);
}

if (debug) {//debuging with repl inside module [https://github.com/neu-rah/nit]
  console.log("Debug module lazy-docs loaded into ["+module.id+"] environment");
  var libxml=require('libxmljs');
  var textFile=lazyDocs();
  var xmlFile=lazyDocs(libxml.parseXml);
  var myTextFile=textFile("test/resources/test.txt");
  var myAssyncTextFile=textFile("test/resources/test.txt",(e,o)=>log("assync result:",e||o));
  var myAssyncXmlFile=xmlFile("test/resources/test.xml",(e,o)=>log("assync result:",e||o));
}
