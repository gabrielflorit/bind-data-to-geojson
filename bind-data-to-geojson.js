// TODO: warn if the new data will overwrite an existing property
// TODO: don't include the entire datum

module.exports.bindData = function(data, geojson, dataColumn, geojsonColumn, ignoreCase, showProgress) {

	// for each datum,
	data.forEach(function(datum) {

		// find the geojson feature that contains a geojsonColumn property
		// that matches dataColumn
		var features = geojson.features.filter(function(feature) {

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

		features.forEach(function(feature) {
			feature.properties.data = datum;
		});

	});

	return geojson;

};