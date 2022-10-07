import { createSlice } from '@reduxjs/toolkit';
import { Coordinate, CoordinateWaypoint } from 'integration/shared/types';

export const TRAVEL_FEATURE_KEY = 'travel';

interface CurrentPositionType extends Coordinate {
    heading: number;
    speed: number | null
}

type orderStateTypes = 
| 'ACCEPTED'
| 'ON_THE_WAY_TO_DESTINATION';

export interface TravelState {
    isHotelRequest : boolean;
    inputAdondeVas : string;
    orderState: orderStateTypes
    currentPosition: CurrentPositionType;
    getHeadingFromCurrentLocation: boolean,
    minutesToArrival: number,
    metersToArrival: number,
    travel: {
        origin: Coordinate;
        destine: Coordinate;
        wayPoints: CoordinateWaypoint[];
    };
    travel2: {
        origin: Coordinate;
        destine: Coordinate;
        wayPoints: CoordinateWaypoint[];
    };
}

export const initialTravelState: TravelState = {
    isHotelRequest: false,
    inputAdondeVas: '',
    orderState: 'ACCEPTED',
    getHeadingFromCurrentLocation: false,
    minutesToArrival: 0,
    currentPosition: {
        latitude: 0,
        longitude: 0,
        heading: 0,
        speed: 0,
    },
    travel: {
        origin: {
            latitude: 0,
            longitude: 0
        },
        destine: {
            latitude: 0,
            longitude: 0
        },
        wayPoints: [{
            latitude: 0,
            longitude: 0,
            active: false
        }]
    },
    travel2: {
        origin: {
            latitude: 0,
            longitude: 0
        },
        destine: {
            latitude: 0,
            longitude: 0
        },
        wayPoints: [{
            latitude: 0,
            longitude: 0,
            active: false
        }]
    },
    metersToArrival: 0
};

interface setOriginPayload {
    payload: Coordinate;
}
interface setDestinePayload {
    payload: Coordinate;
}
interface setCurrentPositionPayload {
    payload: CurrentPositionType;
}
interface setWaypointsPayload {
    payload: CoordinateWaypoint[];
}

interface setOrderStatePayload {
    payload: orderStateTypes;
}
interface setGetHeadingFromCurrentLocationPayload {
    payload: boolean
}

export const travelSlice = createSlice({
    name: TRAVEL_FEATURE_KEY,
    initialState: initialTravelState,
    reducers: {
        setIsHotelRequest: (state, payload:{payload: boolean})=>{
            state['isHotelRequest'] = payload.payload;
        },
        setInputAdondeVas: (state, payload:{payload: string})=>{
            state['inputAdondeVas'] = payload.payload;
        },
        setOrigin: (state, payload: setOriginPayload) => {
            state['travel']['origin'] = payload.payload;
        },
        setDestine: (state, payload: setDestinePayload) => {
            state['travel']['destine'] = payload.payload;
        },
        setWaypoints: (state, payload: setWaypointsPayload) => {
            state['travel']['wayPoints'] = payload.payload;
        },
        setWaypoints2: (state, payload: setWaypointsPayload) => {
            state['travel2']['wayPoints'] = payload.payload;
        },
        setCurrentPosition: (state, payload: setCurrentPositionPayload) => {
            state['currentPosition'] = payload.payload;
        },
        setDefaultState: (state) => {
            state['travel'] = initialTravelState.travel;
            state['currentPosition'] = initialTravelState.currentPosition
            state['orderState'] = initialTravelState.orderState
        },
        setOrderState: (state, payload: setOrderStatePayload) => {
            state['orderState'] = payload.payload;
        },
        setMinutesToArrival: (state, payload: {payload : number}) => {
            state['minutesToArrival'] = payload.payload;
        },
        setMetersToArrival: (state, payload: {payload : number}) => {
            state['metersToArrival'] = payload.payload;
        },
        
        setGetHeadingFromCurrentLocation: (state, payload: setGetHeadingFromCurrentLocationPayload) => {
            state['getHeadingFromCurrentLocation'] = payload.payload;
        }
    }
});

/*
 * Export reducer for store configuration.
 */
export const travelReducer = travelSlice.reducer;
export const travelActions = travelSlice.actions;
export const getTravelState = (rootState: any): TravelState =>
    rootState[TRAVEL_FEATURE_KEY];
