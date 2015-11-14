####lazy-docs####
Functional documents for node

functional documents (a function that returns a document) combines watching changes, document parsing and proxy.

documents only reload if changed and when requested, external changes only flag the file to refresh at next request.

###usage###

module only exports a setup function
>require("lazy-docs")([*loader function*]);
**where**
*loader function* is optional (default to text load) is a function to parse the document from a string.

This will return document loader function to load document defaulting to the given format loader

loader function expects 1 or two arguments:

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
**text documents loader**
```javascript
txtDocs=require('lazy-docs')();
var txtDoc=docs.open("data/test.txt");
var xmlDoc=docs.open("data/test.xml",libxml.parseXml);//with alternative format
console.log(txtDoc());
```
**libxmljs documents loader**
```javascript
xmlDocs=require('lazy-docs')(libxml.parseXmlString);
var xmlDoc=docs.open("data/test.xml");
console.log(xmlDoc().toString());
```
**one liner document request**
```javascript
console.log(require("lazy-docs")()("myfile.txt")());
```
**closing a document**
stops watching the file, thats really all it does, if you recall the document it will load and watch again
```javascript
var ctrl=require("lazy-docs")()("myfile.txt");
console.log(ctrl());//print updated fileName
ctrl.close();//stop watching the file
```
**TODO LIST:**

- add some assync
- add more sources (http:,sql:,etc..)
- optional callback onchange (doesn't OS optimize multi watchers?)
