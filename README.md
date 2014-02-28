droopy-mongo
============

Wrapper for mongodb module to return promises.

I'm not a big fan of callbacks so I generally promisify everything I do.
```javascript
//EXAMPLE OF A SERVICE LAYER YOU MIGHT IMPLEMENT USING droopy-mongo
var mongo = require("droopy-mongo");
var dao = new mongo.MongoDao(config.mongo.url);


dao.collection("test").find({title: "test"})
.then(function(results){
	console.log("Found %s 'test' matches", results.length);
});

dao.collection("test").insert({title:"test"})
.then(function(doc){
	console.log("Inserted ");
	console.log(doc);

	dao.collection("test").find({title: "test"})
	.then(function(results){
		console.log("Found %s 'test' matches", results.length);
	});

	dao.collection("test").findOne({title: "test"})
	.then(function(result){
		console.log("Looking for one. Found: ");
		console.log(result);
	});
	
	dao.collection("test").checkIfExists({title: "test"})
	.then(function(result){
		console.log("Checking if 'test' exists.  Answer is: %s", result);
	});

	dao.collection("test").overwrite({title: "test"}, {title:"test2"})
	.then(function(updatedItem){
		console.log("Updated 'test' to 'test2', full overwrite");

		dao.collection("test").update({title: "test2"}, { description: "test description"})
		.then(function(){
			console.log("Updated test2 items to add a description");
		});

		dao.collection("test").find({title: "test2"})
		.then(function(results){
			console.log("Here are all the 'test2' docs in the collection:");
			console.log(results);
		});


		dao.collection("test").remove({title:"test2"})
		.then(function(){
			console.log("Deleted all the 'test2' docs");

			dao.collection("test").checkIfExists({title: "test2"})
			.then(function(result){
				console.log("Checking if 'test2' exists.  Answer is: %s", result);
			});
		});
	});
});	
```
