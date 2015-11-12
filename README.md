# lazy-docs
Lazy document proxy with watcher

documents are only reaload if changed and when requested, external changes only flag the file to refresh at next request.

**create a pool of text documents**
```javascript
var docs=require('lazy-docs')(function(id){return id;});
var txt=docs.open("some-text-file.txt");//open with default method (id)
var xml=docs.open("data/some-xml-file.xml",libxml.parseXmlString);//open with alternative method
```
**create a pool of libxmljs documents**
```javascript
var xmldocs=require('lazy-docs')(libxml.parseXmlString);
var xml=xmldocs.open("data/test.xml");
// subsequent calls to open (of same file) will return the already opened file
// or a realoaded if file changed
```
### API ###

**constructor**
provide default parse from string method

**.open(url)**
open document at *url* with default method

**.open(url,fromString)**
open document at *url* with specific *fromString* method

**.open('file://url'[,fromString])**
same as above

**.open('mem://url',srcString)**
use default method to parse *srcString* and store it at memory *url*

**.open('mem://url',srcObjet)**
store *srcObject* at memory *url*

**.close(url)**
close file at *url* and quit watching it

** *note* **
memory files are not watched for changes
