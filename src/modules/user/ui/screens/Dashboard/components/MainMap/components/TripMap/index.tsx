import Box from '@main-components/Box';
import FullScreenMap, { MapView } from '@main-components/FullScreenMap';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import useActiveTripDriverLocation from '@modules/trip/application/hooks/use-active-trip-driver-location';
import React, {useMemo, useRef} from 'react';
import MapOptions from '../MapOptions';
import { RouteDirections } from '../RouteDirections';
import { TripMapState } from '../TripMapState';
import {Text} from 'react-native';
import { useSelector } from 'react-redux';
import { getTravelState } from 'integration/modules/Travel/store/travel.slice';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';

export function TripMap(props:any) {

    const travelState = useSelector(getTravelState)

    const mapRef = useRef<MapView | null>(null);

    const markerRef = useRef(null);
    const destMarkerRef = useRef(null);
    const stopMarkerRef = useRef(null);

    const { trip } = useGetActiveTrip();
    const { driverLocation } = useActiveTripDriverLocation(
        trip?.acceptedDriver.id,
        trip?.requestInfo.serviceType
    );

    const stop =
        trip && trip.routes.length > 1
            ? {
                latitude: trip.routes[0].destination.geoLocation[0],
                longitude: trip.routes[0].destination.geoLocation[1],
                address: trip.routes[0].destination.address
            }
            : undefined;

    // useEffect(()=>{

    //     if (trip) {
    //         const timer = setInterval(() => {

    //             Location.getCurrentPositionAsync({
    //                 accuracy: Location.Accuracy.High,
    //               })
    //                 .then((location) => {
            
                        
    //                     let origin = {
    //                         latitude : trip.requestInfo.origin.geoLocation[0],
    //                         longitude : trip.requestInfo.origin.geoLocation[1]
    //                     }
                        
    //                     let destination = {
    //                         latitude: travelState.currentPosition.latitude,
    //                         longitude: travelState.currentPosition.longitude
    //                     }
                        

    //                     mapRef?.current?.fitToCoordinates([origin, destination], 
    //                         {
    //                             edgePadding: {
    //                             top: 600,
    //                             bottom: 600,
    //                             left: 100,
    //                             right: 100,
    //                             }
    //                         }
    //                     );

    //                 })
    //                 .catch(error => {
    //                   const { code, message } = error;
    //                   console.warn(code, message);
    //                 })

                    

    //         }, 10000);
            
    //     }


    // },[trip])


    const Directions = useMemo(() => {
        if (!trip) return <Box />;
        return (
            <RouteDirections
                mapRef={mapRef}
                origin={{
                    latitude: trip.requestInfo.origin.geoLocation[0],
                    longitude: trip.requestInfo.origin.geoLocation[1],
                    address: trip.requestInfo.origin.address
                }}
                destination={{
                    latitude: trip.requestInfo.destination.geoLocation[0],
                    longitude: trip.requestInfo.destination.geoLocation[1],
                    address: trip.requestInfo.destination.address,
                    duration: trip.tripDuration
                }}
                stop={stop}
                markersRefs={
                    stop?.address
                        ? [markerRef, destMarkerRef, stopMarkerRef]
                        : [markerRef, destMarkerRef]
                }
                animated={false}
                showOriginMarker={false}
            />
        );
    }, [trip?.requestInfo]);

    function renderMapMode() {
        
        
        
        

        if (!trip) return <Box></Box>;
        if (!driverLocation) return <Box></Box>;
        return (
            <>
                {Directions}
               
                <TripMapState
                    mapRef={mapRef}
                    carPosition={{
                        latitude: driverLocation.latitude,
                        longitude: driverLocation.longitude
                    }}
                />
            </>
        );
    }

    return (
        <>
            <FullScreenMap
                ref={mapRef}
                onRegionChange={() => {/*
                        props.onRegionChange()
                */}}
                initialRegion={null}
            >
                {renderMapMode()}
             
            </FullScreenMap>

            {/* {trip && trip.status === 'ON_THE_WAY_TO_DESTINATION'&& <Text 
                style={{position:'absolute', top : 120, right : 20,fontSize : 16 , color : THEME_PRIMARY_COLOR, fontWeight : 'bold'}}>
                    { CalcVelocidad(travelState.minutesToArrival / 60 || 0)} min /  { CalcVelocidad(travelState.currentPosition.speed || 0)} km/h</Text>
            } */}

         
           
            <MapOptions />
        </>
    );
}

const CalcVelocidad = (v:number) => {
    let velocidad = Number(v)
    const metro_por_segundo = 3.60
    let result = metro_por_segundo * velocidad
    result = Math.ceil(result) 
    console.log(result)
    if(result === Infinity) return '0';

    return result
}