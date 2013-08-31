bind-data-to-geojson
=============

	Bind JSON to GeoJSON.
	Usage: bind-data-to-geojson

	Options:
	  -j, --json             a JSON file                                                         [required]
	  -g, --geojson          a GeoJSON file                                                      [required]
	  --jc, --jsonColumn     the JSON column to bind on                                          [required]
	  --gc, --geojsonColumn  the GeoJSON column to bind on                                       [required]
	  -a, --ignoreCase       whether to ignore case when matching JSON column to GeoJSON column  [default: true]
	  -o, --output           a GeoJSON file with the JSON bound to it                            [default: "output.json"]