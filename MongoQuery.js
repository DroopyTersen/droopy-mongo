var MongoQuery = function(query, fields, options) {
	"use strict";
	this.query = query;
	this.fields = fields;
	this.options = options;
};

module.exports = MongoQuery;

// Available Options: https://github.com/mongodb/node-mongodb-native/blob/master/lib/mongodb/cursor.js
// this.skipValue = options.skip == null ? 0 : options.skip;
// this.limitValue = options.limit == null ? 0 : options.limit;
// this.sortValue = options.sort;
// this.hint = options.hint;
// this.explainValue = options.explain;
// this.snapshot = options.snapshot;
// this.timeout = options.timeout == null ? true : options.timeout;
// this.tailable = options.tailable;
// this.awaitdata = options.awaitdata;
// this.numberOfRetries = options.numberOfRetries == null ? 5 : options.numberOfRetries;
// this.currentNumberOfRetries = this.numberOfRetries;
// this.batchSizeValue = options.batchSize == null ? 0 : options.batchSize;
// this.raw = options.raw == null ? false : options.raw;
// this.read = options.read == null ? ReadPreference.PRIMARY : options.read;
// this.returnKey = options.returnKey;
// this.maxScan = options.maxScan;
// this.min = options.min;
// this.max = options.max;
// this.showDiskLoc = options.showDiskLoc;
// this.comment = options.comment;
// this.tailableRetryInterval = options.tailableRetryInterval || 100;
// this.exhaust = options.exhaust || false;
// this.partial = options.partial || false;
// this.slaveOk = options.slaveOk || false;