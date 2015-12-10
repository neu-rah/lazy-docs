lazy-docs
=========

**functional documents for node.**

functional documents (a function that returns a document) combines watching changes, document parsing and proxy.

documents only reload if changed and when requested, external changes only flag the file to refresh at next request.

```javascript
var myfile=require("lazy-docs")()("test/resources/test.txt");
console.log(myfile());//sync mode
myfile((e,o)=>console.log("content:",e||o));//assync mode
```


### usage

this module only exports a setup function, on setup a file creator function is returned.
The file creator function should be used to create functional files

>require("lazy-docs")([*loader function*]);

**where**

*loader function* is optional (default to text load) and should be a function to parse the document from a string/buffer.

This will return a document loader function that expects a filename.

>require("lazy-docs")(*parser*)(*filename*)

**where**

*filename* is a file name string

The loader function will return a functional document.
You can associate it with a variable or call it directly

```javascript
//default parser
var myfile=require("lazy-docs")(/*use default parser*/)("test/resources/test.txt");
```

then the file can be recalled and will update himself in case of external change

```javascript
console.log(myfile());//sync mode
myfile(o=>console.log("content:",o));//assync mode
```

### examples

**text documents loader**
```javascript
var txtDoc=require('lazy-docs')();//setup for text format
var txt=txtDoc("test/resources/test.txt");//functional file
console.log(txt());//sync file content with cache and watcher
txt(o=>console.log(o));//assync file content with cache and watcher
```
**libxmljs documents loader**
```javascript
var libxml=require('libxmljs');
var xmlDoc=require('lazy-docs')(libxml.parseXml);//setup for libxml documents
var xml=xmlDoc("test/resources/test.xml");
console.log(xml().toString());
```
**closing a document**
stops watching the file, if you recall the document it will load and watch again
```javascript
var file=require("lazy-docs")()("myfile.txt");
console.log(file());//print updated text file content
file.proxy.close();//stop watching the file
```
**TODO LIST:**

this module defaults to local sync/assync file system, see [fProxy](https://www.npmjs.com/package/fproxy) for more flexibility
