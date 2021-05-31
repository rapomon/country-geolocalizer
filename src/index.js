/**
 * GeoJSON with all country polygons.
 * Extracted from https://datahub.io/core/geo-countries
 */
const countriesData = require('./countries.json');

/**
 * Checks if a point is contained in a polygon
 * (based on the Jordan curve theorem), for more info:
 * http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
 * @param polygon array a series of the polygon's coordinates
 * @param point object representing the point's coordinates
 * @return boolean true if the point lies within the polygon, false otherwise
 */
const pointInPolygon = (polygon, point) => {
    let nvert = polygon.length;
    let c = false;
    for(let i = 0, j = nvert-1; i < nvert; j = i++) {
        let pI = polygon[i];
        let pJ = polygon[j];
        if(((pI[1] > point[1]) != (pJ[1] > point[1])) && 
           (point[0] < (pJ[0] - pI[0]) * (point[1] - pI[1]) / (pJ[1] - pI[1]) + pI[0]) ) {
          c = !c;
        }
    }
    return c;
};

/**
 * Get country information from coordinates
 * @param lat number latitude
 * @param lng number longitude
 * @return object { ADMIN: '', ISO_A3: '' }
 *         information about a country, null if not in a country
 */
module.exports = getCountry = (lat, lng) => {
    if(typeof lat !== 'number' || typeof lng!== 'number') {
        return new Error('Wrong coordinates (' + lat + ',' + lng + ')');
    }

    let point = [lng, lat];
    let i = 0;
    let found = false;
    const countries = countriesData.features;
    do {
        let country = countries[i];
        if(country.geometry.type === 'Polygon') {
            found = pointInPolygon(country.geometry.coordinates[0], point);
        } else if(country.geometry.type === 'MultiPolygon') {
            let j = 0;
            do {
                found = pointInPolygon(country.geometry.coordinates[j][0], point);
                j++;
            } while (j < country.geometry.coordinates.length && !found);
        }
        i++;
    } while (i < countries.length && !found);

    return found ? countries[i-1].properties : null;
};
