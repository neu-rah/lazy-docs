# lazy-docs
Lazy document proxy with watcher

documents are only reaload if changed and when requested, external changes only flag the file to refresh at next request.

´´´javascript
//create a pool of libxmljs documents
docs=require('lazy-docs')(libxml.parseXmlString);
xmlDoc=docs.open("data/test.xml");
// subsequent calls to open (of same file) will return the already opened file
// or a realoaded if file changed
´´´
