import { coordinate } from "../types";

// export function calculateHeading(cord1:coordinate, cord2:coordinate){
//     if (cord2) {
//       const {latitude: lat1, longitude: lng1} = cord1;
//       const {latitude: lat2, longitude: lng2} = cord2;
//       const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
//       const x =
//         Math.cos(lat1) * Math.sin(lat2) -
//         Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
//       const θ = Math.atan2(y, x);
//       const brng = ((θ * 180) / Math.PI + 360) % 360;
//       return brng;
//     }
//     return 0;
//   };

 export function calculateHeading(coord1:coordinate,coord2:coordinate) {
    var p1 = {
        x: coord1.latitude,
        y: coord1.longitude
    };

    var p2 = {
        x: coord2.latitude,
        y: coord2.longitude
    };
    // angle in radians
    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    // angle in degrees
    var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

    // document.getElementById('rotation').innerHTML ="Rotation : "+ angleDeg;
    return angleDeg;
    
}