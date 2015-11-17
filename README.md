lazy-docs
=========

**functional documents for node.**

functional documents (a function that returns a document) combines watching changes, document parsing and proxy.

documents only reload if changed and when requested, external changes only flag the file to refresh at next request.

###usage###

module only exports a setup function

>require("lazy-docs")([*loader functio*]);

**where**

*loader function* is optional (default to text load) is a function to parse the document from a string.

This will return a document loader function to load documents defaulting to the given format loader.

loader function expects one or two arguments:

>require("lazy-docs")()(*filename*,[*loader function*])

**where**

*filename* is a file name string

*loader function* is an optional alternative to the default

The loader function will return a functional document.
You can associate it with a variable or call it directly

>var myfile=require("lazy-docs")()("myfile.txt");

then the file can be recalled and will update himself
ex:

```javascript
console.log(myfile());//will print updated file
```

###examples###

**text documents loader**
```javascript
var txtDoc=require('lazy-docs')();
var txt=txtDoc("test/resources/test.txt");
console.log(txt());
```
**libxmljs documents loader**
```javascript
var xmlDoc=require('lazy-docs')(libxml.parseXml);
var xml=xmlDoc("test/resources/test.xml");
console.log(xml().toString());
```
**closing a document**
stops watching the file, if you recall the document it will load and watch again
```javascript
var file=require("lazy-docs")()("myfile.txt");
console.log(file());//print updated fileName
file.close();//stop watching the file
```
**TODO LIST:**

- add some assync
- add more sources (http:,sql:,etc..) (do a register thing)
- optional callback onchange (doesn't OS optimize multi watchers?)
