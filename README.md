bind-data-to-geojson
=============

	Bind data (JSON or CSV) to GeoJSON.
	Usage: bind-data-to-geojson

	Options:
	  -d, --data             the data file                                                       [required]
	  --dc, --dataColumn     the data column to bind on                                          [required]
	  -g, --geojson          the GeoJSON file                                                    [required]
	  --gc, --geojsonColumn  the GeoJSON column to bind on                                       [required]
	  -a, --ignoreCase       whether to ignore case when matching data column to GeoJSON column  [default: true]
	  -t, --type             whether the data file is JSON or CSV                                [default: "json"]
	  -o, --output           a GeoJSON file with the data bound to it                            [default: "output.json"]
