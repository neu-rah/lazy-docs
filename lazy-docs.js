/*********
* Documents proxy with watcher
* documents are only reaload if changed and when requested
* external changes only flag the file to refresh at next request
* Rui Azevedo «neu-rah» (ruihfazevedo@gmail.com) [www.r-site.net]

usage:

    //create a pool of libxmljs documents
    docs=require('lazy-docs')(libxml.parseXmlString);
    xmlDoc=docs.open("data/test.xml");
*****/
var DEBUG=module.id==="repl";
var debug=DEBUG?console:function(){};

var expect = require('expect');
var fs = require('fs');
var path=require("path");

if (!String.prototype.startsWith)
  String.prototype.startsWith=function (prefix) {return this.slice(0, prefix.length) == prefix;}
else expect("oks".startsWith("ok")).to.be(true);

function docPool(fromString) {
  if (!fromString) {
    building
    fromString=function(id) {return id;}
  }
  var urls={};
  this.close=function (url) {
    if (!url) return;
    var absFile=path.resolve(process.cwd(), url);
    if (urls[absFile]) {
      debug.log("closing file",absFile);
      urls[absFile].watcher.close();
    }
  }
  this.open=function(url,src) {return this.load(url,src).doc;}
  this.load=function(url,src) {
    if (!url) return;
    if (url.startsWith("mem://"))
      return urls[url]=typeof src==="string"?fromString(src):src;
    if (url.startsWith("file://")) url=url.substr(7);

    var absFile=path.resolve(process.cwd(), url);
    if (urls[absFile]) {
      if(urls[absFile].needRefresh) {
        debug.log("refreshing file",absFile);
        urls[absFile].watcher.close();
      } else return urls[absFile];
    }
    var tmp=urls[absFile]={};
    tmp.docLoader=src?src:fromString;
    tmp.doc=tmp.docLoader(fs.readFileSync(url).toString());;
    tmp.needRefresh=false;
    //tmp.needSave=false;
    tmp.fileName=absFile;
    tmp.watcher=fs.watch(absFile, function(event, filename){
      tmp.needRefresh=true;
      switch(event) {
        case "change": console.log("File changed ",absFile);break;
        case "rename": console.log("File renamed ",absFile);break;
        default: console.log("File event",event,absFile);
      }
    });
    return tmp;
  }
}

if (module.id="repl") {//debuging with repl inside module [https://github.com/neu-rah/nit]
  console.log("Debug module lazy-docs loaded into repl env")
  libxml=require('libxmljs');
  docs=new docPool();//function(id){return id;})
}
module.exports=function(fromString) {return new docPool(fromString);}
