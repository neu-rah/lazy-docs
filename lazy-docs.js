"use strict";
/*********
* Documents proxy with watcher
* documents are only reaload if changed and when requested
* external changes only flag the file to refresh at next request
* Rui Azevedo «neu-rah» (ruihfazevedo@gmail.com) [www.r-site.net]
*****/
process.stdin.resume();

var debug=module.id==="repl";
var log=debug?console.log:function(){};

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}
process.on('exit', exitHandler.bind(null,{cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

var expect = require('expect');
var fs = require('fs');
var path=require("path");

if (!String.prototype.startsWith)
  String.prototype.startsWith=function (prefix) {return this.slice(0, prefix.length) == prefix;}
else expect("oks".startsWith("ok")).toBe(true);

module.exports=(()=>{
  var urls={};
  return (fromString)=> {
    fromString=fromString||((id)=>id);

    return (url,src)=>{
      if (!url) return;
      var absFile=url;
      var r= ()=> {
        if (url.startsWith("mem://")) {
          urls[url].fileName=url;
          return urls[url].doc=typeof src==="string"?fromString(src):src;
        }
        if (url.startsWith("file://")) url=url.substr(7);

        absFile=path.resolve(process.cwd(), url);
        if (urls[absFile]) {
          log("serving from pool");
          if(urls[absFile].needRefresh) {
            log("refreshing file (quit watching)",absFile);
            urls[absFile].watcher.close();
          } else return urls[absFile].doc;
        }
        var tmp=urls[absFile]={};
        tmp.docLoader=src?src:fromString;
        log("parsing file",url);
        tmp.needRefresh=false;
        //tmp.needSave=false;
        tmp.fileName=absFile;
        log("watching:",absFile);
        tmp.watcher=fs.watch(absFile, function(event, filename){
          tmp.needRefresh=true;
          /*switch(event) {
            case "change": console.log("File changed ",absFile);break;
            case "rename": console.log("File renamed ",absFile);break;
            default: console.log("File event",event,absFile);
          }*/
        });
        return tmp.doc=tmp.docLoader(fs.readFileSync(url).toString());;
      }
      r.close=()=>{
        //var absFile=path.resolve(process.cwd(), url);
        if (urls[absFile]) {
          log("closing file",absFile);
          urls[absFile].watcher.close();
          delete urls[absFile];
        }
      }
      return r;
    }
  }
})();

  /*this.close=function (url) {
    if (!url) return;
    var absFile=path.resolve(process.cwd(), url);
    if (urls[absFile]) {
      log("closing file",absFile);
      urls[absFile].watcher.close();
    }
  }
  this.open=function(url,src) {return this.load(url,src).doc;}
  this.load=function(url,src) {
  }*/


if (debug) {//debuging with repl inside module [https://github.com/neu-rah/nit]
  console.log("Debug module lazy-docs loaded into ["+module.id+"] environment")
  var libxml=require('libxmljs');
  var docs=module.exports(libxml.parseXml);
  var ctrl=docs("../rxserver/data/ctrl.xml");
}
//module.exports=function(fromString) {return new docPool(fromString);}
