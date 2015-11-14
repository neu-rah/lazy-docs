###lazy-docs###
Lazy document proxy with watcher

documents only reload if changed and when requested, external changes only flag the file to refresh at next request.

functional documents (a function that returns a document) combines both watching changes and document parsing

**create a pool of text documents**
```javascript
txtDocs=require('lazy-docs')();
var txtDoc=docs.open("data/test.txt");
var xmlDoc=docs.open("data/test.xml",libxml.parseXml);//with alternative format
```
**create a pool of libxmljs documents**
```javascript
xmlDocs=require('lazy-docs')(libxml.parseXmlString);
var xmlDoc=docs.open("data/test.xml");
console.log(xmlDoc().toString());
```
##one liner document request##
```javascript
console.log(require("lazy-docs")()("myfile.txt")());
```
##TODO LIST:##

- add some assync
- add more sources (http:,sql:,etc..)
- optional callback onchange (doesn't OS optimize multi watchers?)
