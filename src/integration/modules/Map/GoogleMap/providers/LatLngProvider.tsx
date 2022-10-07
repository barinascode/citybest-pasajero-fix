import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { getTravelState, travelActions } from 'integration/modules/Travel/store/travel.slice';
import { useDispatch, useSelector } from 'react-redux';

const LatLngProvider = (props:any) => {

    const { children } = props;
    const dispatch = useDispatch()
    const travelState = useSelector(getTravelState)
    
        React.useEffect(() => {

          const timer = setInterval(() => {

        
            
            Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.High,
            })
              .then((location) => {
                dispatch(travelActions.setCurrentPosition({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  heading: location.coords.heading
                }))
              })
              .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
              })

          }, 5000);
            
          return () => {
            clearInterval(timer);
          };

        }, [dispatch]);


        useEffect(()=>{
            console.log(`LatLngProvider/${travelState.orderState} : `, JSON.stringify(travelState.currentPosition))
            console.log('orderState',travelState.orderState)
        },[travelState])

    // useEffect(() => {
    //     (async () => {

    //       let { status } = await Location.requestForegroundPermissionsAsync();
    //       if (status !== 'granted') {
    //             console.log('Permission to access location was denied');
    //         return;
    //       }
    
    //       let location = await Location.getCurrentPositionAsync({});
          
    //       setLocation(location);

    //     })();
    //   }, []);
  
      
    if(!travelState.currentPosition.latitude) return <></>

    return children
}

export default LatLngProvider