# :warning: DEPRECATION WARNING!

### Version no longer supported.
#### Use https://www.npmjs.com/package/geojson-places instead.

---

# country-geolocalizer

This module takes a latitude and longitude and determine the country where it is contained.


## Install

```
npm install --save country-geolocalizer
```

## Testing the library

```
npm run test
```

## Examples

Get country from the following latitude/longitude (Madrid):

```js
const result = getCountry(40.4167047, -3.7035825);

console.log(result);
// {
//     ADMIN: 'Spain',
//      ISO_A3: 'ESP'
// }
```

Get null from a latitude/longitude in the middle of the sea:

```js
const result = getCountry(0.0, 0.0);

console.log(result);
// null
```

## Acknowledgment

* GeoJSON with all country polygons extracted from https://datahub.io/core/geo-countries

* Checks if a point is contained in a polygon (based on the Jordan curve theorem), for more info: http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
