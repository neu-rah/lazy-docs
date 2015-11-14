###lazy-docs###
Lazy document proxy with watcher

functional documents (a function that returns a document) combines watching changes, document parsing

documents only reload if changed and when requested, external changes only flag the file to refresh at next request.

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
stops watching the file, thats really all it does, i you recall the document it will load and watch again
```javascript
var ctrl=require("lazy-docs")()("myfile.txt");
console.log(ctrl());//print updated fileName
ctrl.close();//stop watching the file
```
**TODO LIST:**

- add some assync
- add more sources (http:,sql:,etc..)
- optional callback onchange (doesn't OS optimize multi watchers?)
