# 2024-05-01 Projection domain

Jack asks:

> *I am able to successfully load and plot locations on a map of the US (see image below). But when I try to zoom in on a state such as the example shown for NC, I can’t figure out how to zoom and center, I’ve only been able to successfully get a very small rendering.*

You can zoom in on a projection by setting the **domain** option on the projection to determine the bounding box to the given GeoJSON feature.

```js echo
Plot.plot({
  title: "EPSG:32119",
  width: 640,
  height: 320, // Note: set manually.
  projection: {
    type: "conic-conformal",
    parallels: [34.3333, 36.1667],
    rotate: [79, 0],
    domain: ncstate
  },
  marks: [
    Plot.geo(ncstate),
    Plot.geo(nccounties, {strokeOpacity: 0.1})
  ]
})
```

You can do the same thing with the _albers_ projection that is commonly used to show the entire U.S. However, this isn’t a good projection for a specific state; the state will typically appear tilted or distorted and unfamiliar. You should use a corresponding [state plane projection](https://en.wikipedia.org/wiki/State_Plane_Coordinate_System) instead. For North Carolina, [EPSG:32119](https://epsg.io/32119) is shown above.

Here’s Albers’ equal-area projection cropped to North Carolina (not recommended):

```js echo
Plot.plot({
  title: "EPSG:5070",
  width: 640,
  height: 320, // Note: set manually.
  projection: {
    type: "albers",
    domain: ncstate
  },
  marks: [
    Plot.geo(ncstate),
    Plot.geo(nccounties, {strokeOpacity: 0.1})
  ]
})
```

You can find D3 implementations of state plane projections in [d3-stateplane](https://github.com/veltman/d3-stateplane). These can either be passed to Plot’s **projection** option, or you can adapt the code to the equivalent Plot projection options as shown above.

<div class="note">

You’ll typically have to set the **height** manually when using the **domain** option, as Plot isn’t currently smart enough to figure it out automatically. Please upvote [#2063](https://github.com/observablehq/plot/issues/2063) if you’re interested in this feature.

</div>

The data in this example is loaded as [TopoJSON](https://observablehq.com/framework/lib/topojson) from [us-atlas](https://github.com/topojson/us-atlas). 37 is the [FIPS code](https://en.wikipedia.org/wiki/Federal_Information_Processing_Standard_state_code) for the state of North Carolina.

```js echo
const us = fetch(import.meta.resolve("npm:us-atlas/counties-10m.json")).then((r) => r.json());
```

```js echo
const ncstate = topojson.feature(us, us.objects.states).features.find(d => d.id === "37");
const nccounties = topojson.feature(us, us.objects.counties).features.filter(d => d.id.startsWith("37"));
```
