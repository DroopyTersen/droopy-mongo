var q = require("q");
var MongoQuery = require("./MongoQuery");

var MongoCollection = function (name, promise) {
	var self = this;
	self._name = name;
	self._dbConnected = promise;
	self._dbConnected.then(function(db){
		self._collection = db.collection(self._name);
	});
};

//calls a special Q helper to promisify node callbacks
MongoCollection.prototype._transaction = function(method, params) {
	var self = this;
	return self._dbConnected
		.then(function() {
			console.log(params);
			//return q.ninvoke(self._collection, method, params); 
			return q.npost(self._collection, method, params);
		});
};
/*  ====
	FIND
	==== */
MongoCollection.prototype.mongoFind = function(mongoQuery) {	
	var self = this;
	return self._dbConnected
		.then(function() {
			var lazyResults = self._collection.find(mongoQuery.query, mongoQuery.fields, mongoQuery.options);
			return q.nfcall(lazyResults.toArray);
		});
};

MongoCollection.prototype.find = function(query, fields, options) {	
	var mongoQuery = new MongoQuery(query, fields, options);
	return this.mongoFind(mongoQuery);
};

MongoCollection.prototype.findOne = function(query) {
	return this._transaction("findOne", [query]); 
};

MongoCollection.prototype.checkIfExists = function(query) {
	return this._transaction("count", [query]).then(function(count){
		return count > 0;
	}); 
};

/*  ======
	INSERT
	====== */
MongoCollection.prototype.insert = function(item) {
	return this._transaction("insert", [item]); 
};

/*  =======
	UPDATES
	======= */
MongoCollection.prototype._update = function(query, updateObj, options) {
	return this._transaction("update", [query, updateObj, options]); 
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
	return this._transaction("remove", [query]); 
};

/*  ======
	Extras
	====== */
MongoCollection.prototype.aggregate = function(aggregateActions) {
	return this._transaction("aggregate", [query]); 
};

module.exports = MongoCollection;