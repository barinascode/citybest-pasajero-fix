import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import getDirections from "../services/getDirections";
import { getTravelState, travelActions } from "../store/travel.slice";

export const fetchGenerateRoute = createAsyncThunk('travel/fetchGenerateRoute',
  async (_, thunkAPI) => {
    
  

    const {travel} = thunkAPI.getState()
    
    const {origin, destine} = travel

    console.log('Generando ruta...')
    console.log(travel)

    if(
        !travel.travel.origin.latitude || 
        !travel.travel.origin.longitude || 
        !travel.travel.destine.latitude ||
        !travel.travel.destine.longitude) return;

    
    try {

        const from = `${travel.travel.origin.latitude},${travel.travel.origin.longitude}`;
        const to = `${travel.travel.destine.latitude},${travel.travel.destine.longitude}`;

        const wayPoints = await getDirections(from,to)
        
        console.log('wayPoints')

        thunkAPI.dispatch(travelActions.setWaypoints(wayPoints));
      
    } catch (error) {
      console.warn(JSON.stringify(error))
    }
  
  }
);