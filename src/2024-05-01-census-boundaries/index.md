# 2024-05-01 Census boundaries

Here’s how to fetch high-resolution shapefiles from the [U.S. Census Bureau](https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html) and convert them into a web-friendly format in a bash data loader.

First, you’ll need to install a few packages:

```sh
npm install shapefile topojson-client topojson-server topojson-simplify
```

Next, here’s a bash script, `ca.json.exe`:

```bash
#!/bin/bash

# Download the ZIP archive from the Census Bureau (if needed).
if [ ! -f src/.observablehq/cache/cb_2023_06_cousub_500k.zip ]; then
  curl -o src/.observablehq/cache/cb_2023_06_cousub_500k.zip 'https://www2.census.gov/geo/tiger/GENZ2023/shp/cb_2023_06_cousub_500k.zip'
fi

# Unzip the ZIP archive to extract the shapefile.
unzip -oqd src/.observablehq/cache src/.observablehq/cache/cb_2023_06_cousub_500k.zip

# Convert the shapefile to TopoJSON, simplify, and merge counties.
geo2topo -q 1e5 -n counties=<( \
    shp2json --encoding utf-8 -n src/.observablehq/cache/cb_2023_06_cousub_500k.shp) \
  | toposimplify -f -s 1e-7 \
  | topomerge state=counties
```

<div class="note">

When using `.exe` data loader, you must set the executable bit by running `chmod +x ca.json.exe`.

</div>

The census.gov URL comes from the Census Bureau page linked above. Here “06” is the state of California’s FIPS code, and “cousub” means county subdivisions.

And here’s the result displayed with Plot:

```js echo
Plot.plot({
  width: 640,
  height: 720,
  projection: {
    type: "conic-conformal",
    parallels: [37 + 4 / 60, 38 + 26 / 60],
    rotate: [120 + 30 / 60, 0],
    domain: castate
  },
  marks: [
    Plot.geo(castate),
    Plot.geo(cacounties, {strokeOpacity: 0.1})
  ]
})
```

```js echo
const ca = FileAttachment("./ca.json").json();
```
```js echo
const castate = topojson.feature(ca, ca.objects.state);
const cacounties = topojson.feature(ca, ca.objects.counties);
```
