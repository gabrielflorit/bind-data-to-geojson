var _ = require('lodash');

module.exports.bindData = function(data, geojson, dataColumn, geojsonColumn, ignoreCase) {

	// get geojson columns (don't include geojsonColumn)
	var geojsonColumns = _(geojson.features)
		.map(function(feature) {
			return _.keys(feature.properties);
		})
		.flatten()
		.uniq()
		.sortBy(function(v, i) {
			return v;	
		})
		.reject(function(v) {
			return v === geojsonColumn;
		})
		.value();

	// get data columns (don't include dataColumn)
	var dataColumns = _(data)
		.map(function(datum) {
			return _.keys(datum);
		})
		.flatten()
		.uniq()
		.sortBy(function(v, i) {
			return v;	
		})
		.reject(function(v) {
			return v === dataColumn;
		})
		.value();

	// get the intersection of geojson and data columns
	var commonColumns = _.intersection(geojsonColumns, dataColumns);

	// don't allow data overwrite
	if (commonColumns.length) {
		throw "Found duplicate columns: " + JSON.stringify(commonColumns, null, 4);
	}

	var noMatches = [];

	// for each datum,
	_.each(data, function(datum) {

		// find the geojson feature that contains a geojsonColumn property
		// that matches dataColumn
		var features = _.filter(geojson.features, function(feature) {

			var match = false;

			var left = feature.properties[geojsonColumn];
			var right = datum[dataColumn];

			if (left && right) {
				if (ignoreCase) {
					left = left.toLowerCase();
					right = right.toLowerCase();
				}
				match = left === right;
			}

			return match;
		});

		// add datum to each feature,
		// without adding dataColumn
		_.each(features, function(feature) {
			_.assign(feature.properties, _.omit(datum, dataColumn));
		});

		// this datum doesn't have a matching feature
		if (!features.length) {
			noMatches.push(datum[dataColumn]);
		}

	});

	return {
		geojson: geojson,
		noMatches: noMatches.sort()
	};

};