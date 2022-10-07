import {decode} from "@mapbox/polyline"; //please install this package before running!
import axios from 'axios'
import { GOOGLE_MAPS_KEY } from '@env';
import { Coordinate } from "integration/shared/types";


const getDirections = async (startLoc:string, destinationLoc:string) => {

  try {

    const KEY = GOOGLE_MAPS_KEY;
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`)
    
    let points = decode(data.routes[0].overview_polyline.points);

    let coords:Coordinate[] = points.map((coordinate:number[]) => {
      return { 
        latitude  : coordinate[0],
        longitude : coordinate[1],
        active : true
      }
    });
    
    return coords;

  } catch (error) {
      console.warn(JSON.stringify(error));
    return []
  }
};

export default getDirections