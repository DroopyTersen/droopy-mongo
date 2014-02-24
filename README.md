droopy-mongo
============

Wrapper for mongodb module to return promises and allow passed in transform functions.

I'm not a big fan of callbacks so I generally promisify everything I do.  What I like about the "transaction" technique below is that I do not have to create a new deferred in every service method whose results I want to transform.

```javascript
//EXAMPLE OF A SERVICE LAYER YOU MIGHT IMPLEMENT USING droopy-mongo
var mongo = require("droopy-mongo");
var dao = new mongo.MongoDao(config.mongo.url);

//private helper that can be used by all the service methods
var transaction = function(func) {
	var deferred = q.defer();
	//it seems redundant to "getCollection" everytime, but it is just exposing an 
	//internal promise property on the dao so once it is resolved
	//there will be no more waiting
	dao.getCollection("movies").then(function(movies) {
		func(movies, deferred);
	}, function() {
		console.log("Error retrieving movies collection.");
	});
	return deferred.promise;
};

MovieService.prototype.findOne = function(query) {
	return transaction(function(movies, deferred) {
	  //we have passed this to transaction helper as a delegate
	  //so we can rely on getting a deferred from the transaction
		movies.findOne(query).then(function(result) {
			deferred.resolve(models.FullMovie.create(result));
		});
	});
};

MovieService.prototype.insert = function(movie) {
	movie.addedToDb = new Date();
	return transaction(function(movies, deferred) {
		movies.insert(movie).then(deferred.resolve);
	});
};
```
