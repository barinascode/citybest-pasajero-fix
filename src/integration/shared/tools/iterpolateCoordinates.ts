export const interpolateCoordinate = (iterations,coordinates) =>  {


    function getMiddle(prop, markers) {
        let values = markers.map(m => m[prop]);
        let min = Math.min(...values);
        let max = Math.max(...values);
        if (prop === 'lng' && (max - min > 180)) {
          values = values.map(val => val < max - 180 ? val + 360 : val);
          min = Math.min(...values);
          max = Math.max(...values);
        }
        let result = (min + max) / 2;
        if (prop === 'lng' && result > 180) {
          result -= 360
        }
        return result;
      }
      


      function findCenter(markers) {
        return {
          lat: getMiddle('lat', markers),
          lng: getMiddle('lng', markers)
        }
      }



  const result = []
  let interpolateLatLng = {}
  
  for(let j=1; j <= iterations; j++ ){

  for (let i = 0; i < coordinates.length; i++) {

    interpolateLatLng = {}
    result.push(coordinates[i]);

    if (i < coordinates.length - 2) {

      interpolateLatLng = findCenter(
        [
          {
            lat: coordinates[i].latitude,
            lng: coordinates[i].longitude
          },
          {
            lat: coordinates[i + 1].latitude,
            lng: coordinates[i + 1].longitude
          },
        ]
      )
              result.push({ latitude: interpolateLatLng.lat, longitude: interpolateLatLng.lng });

          }

        }
    }

    return result
}