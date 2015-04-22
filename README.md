droopy-mongo
============

Wrapper for native mongodb driver to return promises.

`npm install droopy-mongo`

```javascript
// Initialize
var mongo = require("droopy-mongo");
var dao = new mongo.MongoDao(config.mongo.url);
var topics = dao.collection("topics");

// Utilize
topics.find({ category: "Mongo"}).then(function(results) {
	console.log(results);
});
```

Methods
--------------

### Collection
- `collection.find(query)` - 
- `collection.find(query, fields)` - fields param limit the fields to return
- `collection.find(query, fields, options)` - options let you specify things like sorting and limits
- `collection.findOne(query)` - returns a single object
- `collection.checkIfExists(query)` - returns true if the query has at least one result
- `collection.insert(item)` - item can be either a single object or an array of objects (for a batch insert)
- `collection.update(query, updates)` - peforms a merge, only updates properties specified in the `updates` param.
- `collection.updateOne(query, updates)` - performs a merge on the first item that matches the query
- `collection.overwrite(query, item)` - overwrites all matching documents with the passed in item
- `collection.remove(query)` - deletes all items that match the query

```javascript
//EXAMPLES
var mongo = require("droopy-mongo");
var dao = new mongo.MongoDao(config.mongo.url);
var topics = dao.collection("topics");

topics.find({title: "test"}).then(function(results){
	console.log("Found %s 'test' matches", results.length);
});

topics.insert({title:"test"}).then(function(doc) {
	console.log("Inserted:");
	console.log(doc);
});

topics.findOne({title: "test"}).then(function(result){
	console.log("Looking for one. Found: ");
	console.log(result);
});
	
topics.checkIfExists({title: "test"}).then(function(result){
	console.log("Checking if 'test' exists.  Answer is: %s", result);
});

topics.overwrite({title: "test"}, {title:"test2"}).then(function(updatedItem){
	console.log("Updated 'test' to 'test2', full overwrite");
});
```
