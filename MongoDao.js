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
		console.log("Connected");
		self._db = database;
		self.mongoConnected.resolve(database);
	});
};

MongoDao.prototype.collection = function(name) {
	return new MongoCollection(name, this.mongoConnected.promise);
};

module.exports = MongoDao;