import AsyncStorage from '@react-native-async-storage/async-storage';
import { interpolateCoordinate } from "integration/shared/tools/iterpolateCoordinates";
import { Coordinate } from "integration/shared/types";

const retrieveWayPoints = async () => {
    try {
      
        const value = await AsyncStorage.getItem('@wayPoints2');
      
      if (value !== null) {
        const ways:Coordinate[] = JSON.parse(value)
        const interpolatedWaypoints = interpolateCoordinate(2, ways)
        return ways
        return interpolatedWaypoints
      }

      return []

    } catch (error) {
      return []
    }
  }

export default retrieveWayPoints