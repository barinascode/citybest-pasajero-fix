
export const  getMiddlePoint = (lat1:number, lng1:number, lat2:number, lng2:number) => {

  //-- Longitude difference
  let dLng = (lng2 - lng1) * Math.PI / 180;

  //-- Convert to radians
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;
  lng1 = lng1 * Math.PI / 180;

  let bX = Math.cos(lat2) * Math.cos(dLng);
  let bY = Math.cos(lat2) * Math.sin(dLng);
  let lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY));
  let lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

  //-- Return result
  return [ lng3 * (180 / Math.PI) , lat3 * (180 / Math.PI) ];
}


export const interpolateCoordinate2 = (coordinates:any[]) =>  {

  let midPoint:number[] = []
  let result = []

    for (let i = 0; i <= coordinates.length-1; i++) {
      

      result.push(coordinates[i])

      if(Number(coordinates.length-1) == i){
        console.log('fin', i)
        return result
      };

      midPoint = getMiddlePoint(
        coordinates[i].latitude,
        coordinates[i].longitude,
        coordinates[i+1].latitude,
        coordinates[i+1].longitude
      );

      result.push({
        latitude: midPoint[1],
        longitude: midPoint[0],
        active: true,
        type: 'generated'
      })

    
  }

  return result

}

// const data = [
//   {
//     latitude :48.2320728, 
//     longitude : 4.1482735,
//     active : true,
//     type : 'native'
//   },
//   {
//     latitude : 48.2320524,
//     longitude : 4.1480716,
//     active: true,
//     type: 'native'
//   }
// ]

// // const result = interpolateCoordinate2(data)

// // console.log(result)
