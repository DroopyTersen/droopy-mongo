var mongoClient = require("mongodb").MongoClient,
	q = require("q"),
	MongoCollection = require("./MongoCollection");

var MongoDao = function (url) {
	"use strict";

	this.mongoConnected = q.defer();
	this._db = null;
	var self = this;
	mongoClient.connect(url, function(err, database) {
		if (err) {
			self.mongoConnected.reject(err);
		}
		self._db = database;
		self.mongoConnected.resolve();
	});
};

MongoDao.prototype.getCollection = function(name) {
	var deferred = q.defer(),
		self = this;

	self.mongoConnected.promise.then(function(){
		var collection = self._db.collection(name);
		deferred.resolve(new MongoCollection(collection));
	});

	return deferred.promise;
};

module.exports = MongoDao;