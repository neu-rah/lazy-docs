"use strict";
/*********
* Documents proxy with watcher
* documents are only reaload if changed and when requested
* external changes only flag the file to refresh at next request
* Rui Azevedo «neu-rah» (ruihfazevedo@gmail.com) [www.r-site.net]
*****/

var debug=module.id==="repl";
var log=debug?console.log:function(){};

var path=require("path");
var fProxy=require("fproxy");

var lazyDocs=module.exports=function lazyDocs(fromString) {
  fromString=fromString||(function(id){return id;});//defaults to text files
  return fProxy({
    tag:function(url) {return path.resolve(process.cwd(), url);},
    load:function(url) {
      log("reloading document");
      return fromString(fs.readFileSync(url).toString());
    },
    post:function(tag,item) {
      if (item.watche) item.watcher.close();
      item.watcher=fs.watch(tag, function(event, filename){item.refresh();});
    }
  });
}

if (debug) {//debuging with repl inside module [https://github.com/neu-rah/nit]
  console.log("Debug module lazy-docs loaded into ["+module.id+"] environment")
  var libxml=require('libxmljs');
  var textFile=lazyDocs();
  var xmlFile=lazyDocs(libxml.parseXml);
  var myTextFile=textFile("test/resources/test.txt");
  var myXmlFile=xmlFile("test/resources/test.xml")
}
