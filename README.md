droopy-mongo
============

Wrapper for mongodb module to return promises.

```javascript
//EXAMPLE OF A SERVICE LAYER YOU MIGHT IMPLEMENT USING droopy-mongo
var mongo = require("droopy-mongo");
var dao = new mongo.MongoDao(config.mongo.url);
var testsCollection = dao.collection("tests");

testsCollection.find({title: "test"})
.then(function(results){
	console.log("Found %s 'test' matches", results.length);
});

testsCollection.insert({title:"test"})
.then(function(doc){
	console.log("Inserted ");
	console.log(doc);

	testsCollection.find({title: "test"})
	.then(function(results){
		console.log("Found %s 'test' matches", results.length);
	});

	testsCollection.findOne({title: "test"})
	.then(function(result){
		console.log("Looking for one. Found: ");
		console.log(result);
	});
	
	testsCollection.checkIfExists({title: "test"})
	.then(function(result){
		console.log("Checking if 'test' exists.  Answer is: %s", result);
	});

	testsCollection.overwrite({title: "test"}, {title:"test2"})
	.then(function(updatedItem){
		console.log("Updated 'test' to 'test2', full overwrite");

		testsCollection.update({title: "test2"}, { description: "test description"})
		.then(function(){
			console.log("Updated test2 items to add a description");
		});

		testsCollection.find({title: "test2"})
		.then(function(results){
			console.log("Here are all the 'test2' docs in the collection:");
			console.log(results);
		});


		testsCollection.remove({title:"test2"})
		.then(function(){
			console.log("Deleted all the 'test2' docs");

			testsCollection.checkIfExists({title: "test2"})
			.then(function(result){
				console.log("Checking if 'test2' exists.  Answer is: %s", result);
			});
		});
	});
});	
```
