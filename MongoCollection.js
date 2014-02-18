var q = require("q");

var MongoCollection = function (collection) {
	this._collection = collection;
};

/*  ====
	FIND
	==== */
MongoCollection.prototype.find = function(mongoQuery) {
	var deferred = q.defer();
	this._collection.find(mongoQuery.query, mongoQuery.fields, mongoQuery.options)
	.toArray(function(err, results){
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(results);
		}
	});
	return deferred.promise;
};

MongoCollection.prototype.findOne = function(query) {
	var deferred = q.defer();
	this._collection.findOne(query, function(err, result) {
		if (err) {
			deferred.reject(err);
		}
		deferred.resolve(result);
	});
	return deferred.promise;
};

MongoCollection.prototype.checkIfExists = function(query) {
	var deferred = q.defer();
	this._collection.count(query, function(err, count) {
		if (err) {
			deferred.reject(err);
		}
		deferred.resolve(count > 0);
	});
	return deferred.promise;
};

/*  ======
	INSERT
	====== */
MongoCollection.prototype.insert = function(item) {
	var deferred = q.defer();
	this._collection.insert(item, function(err, doc){
		if (err) {
			console.log(err);
			deferred.reject(err);
		}
		deferred.resolve(doc);
	});
	return deferred.promise;
};

/*  =======
	UPDATES
	======= */
MongoCollection.prototype._update = function(query, updateObj, options) {
	var deferred = q.defer();
	this._collection.update(query, updateObj, options, function(err){
		if (err) {
			console.log(err);
			deferred.reject(err);
		}
		deferred.resolve();
	});
	return deferred.promise;
};

MongoCollection.prototype.overwrite = function(query, item) {
	return this._update(query, item);
};

MongoCollection.prototype.updateOne = function(query, update) {
	return this._update(query, {$set: update });
};

MongoCollection.prototype.update = function(query, update) {
	return this._update(query, {$set: update }, { multi: true });
};

MongoCollection.prototype.remove = function (query) {
	var deferred = q.defer();
	this._collection.remove(query, function(err){
		if(err) deferred.reject(err);
		else deferred.resolve();
	})
	return deferred.promise();
};
module.exports = MongoCollection;