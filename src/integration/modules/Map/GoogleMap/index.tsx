import React, { useEffect, useRef, useState } from 'react'
import RNMapView, { Callout, Camera } from 'react-native-maps';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { customMapStyle } from './CustomMapStyle';
// import TravelRoute from './components/TravelRoute';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { getTravelState, travelActions } from 'integration/modules/Travel/store/travel.slice';
import LatLngProvider from './providers/LatLngProvider';
import PassengerLocationMarker from './components/PassengerLocationMarker';
import images from '@modules/_shared/domain/utils/constants/images';
// import {PassengerLocationMarker, DestineMarker, TravelProgressMarker} from './components';
// import images from '@modules/_shared/domain/utils/constants/images';
import { Dimensions } from 'react-native';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';
import TravelRoute from './components/TravelRoute';
import DestineMarker from './components/DestineMarker';

import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import TripRequestRepository from '@modules/request/domain/repositories/trip-request-repository';
import useSubmitRequest from '@modules/user/ui/screens/Dashboard/components/RequestModal/hooks/useSubmitRequest';






const GoogleMap = () => {

  const {submit} = useSubmitRequest()

  

  const { orderState, travel, currentPosition } = useSelector(getTravelState)
  const [counter, setCounter] = useState(0);
  const [tempPickerLocation, setTempPickerLocation] = useState({
    latitude: 0,
    longitude: 0
  })
  const dispatch = useDispatch()
  const mapRef = useRef()

  const {
    updateOriginLocation,
    updateStopLocation,
    setShowRequestOptions,
    routeKey,
    updateFocusedInputKey,
    togglePickLocation,
    setShowRequestModal
} = useDashboardContextProvider((state) => ({
    routeKey: state.routeKey,
    updateOriginLocation: state.updateOriginLocation,
    updateStopLocation: state.updateStopLocation,
    updateFocusedInputKey: state.updateFocusedInputKey,
    togglePickLocation: state.togglePickLocation,
    showRequestModal : state.showRequestModal,
    setShowRequestModal : state.setShowRequestModal,
    setShowRequestOptions : state.setShowRequestOptions
    
}));

  // React.useEffect(() => {

  //   const timer = setInterval(() => {

  //     setCounter(prevCount => prevCount + 1);

  //     Location.getCurrentPositionAsync({
  //       accuracy: Location.Accuracy.High,
  //     })
  //       .then((location) => {
  //         dispatch(travelActions.setCurrentPosition({
  //           latitude: location.coords.latitude,
  //           longitude: location.coords.longitude,
  //           heading: location.coords.heading
  //         }))
  //       })
  //       .catch(error => {
  //         const { code, message } = error;
  //         console.warn(code, message);
  //       })

  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };

  // }, []);

  // useEffect(() => {
  //   mapRef.current.fitToCoordinates(
  //     [ currentPosition, travel ],
  //     {
  //       edgePadding: {
  //         top: 500,
  //         bottom: 160,
  //         left: 100,
  //         right: 100,
  //       }
  //     }
  //   )
  // }, [ mapRef, counter, travel ])

 

  const renderUi = () => {

    if (orderState === 'adress-picker')
      return (
        <>
          <PassengerLocationMarker />
        </>
      )


    if (orderState === 'latlng-picker')
      return (
        <>
          <PassengerLocationMarker />
          <DestineMarker />
        </>
      )
  }


  useEffect(()=>{
    if(orderState === 'main'){
      dispatch(travelActions.setDefaultState())
      
    }


    if(orderState === 'adress-picker'){
      

      mapRef?.current?.getCamera()
      .then((cam: Camera) => {
        cam.zoom = 15;
        mapRef?.current?.animateCamera(cam);
      }).then(()=>{
        
        mapRef.current.animateToRegion(
          { 
            latitude : currentPosition.latitude,
            longitude : currentPosition.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }
          ,
          2000
        )
      });


      


    }



    
  },[dispatch,orderState])

  return (
    <LatLngProvider>


      <View style={{ flex: 1 }}>
        <RNMapView
          ref={mapRef}
          customMapStyle={customMapStyle}
          // showsUserLocation={true}
          style={{ flex: 1 }}
          defaultZoom={20}
          options={{
            streetViewControl: false,
            mapTypeId: 'satellite',
          }}
          onRegionChangeComplete={(event) => {

            console.log(travel)

            if(orderState === 'latlng-picker')
              setTempPickerLocation({
                latitude : event.latitude,
                longitude : event.longitude
              })

          }}
          onRegionChange={(event) => {
            // console.log(event)
            // setPickerLocation(event)
          }}
          onPress={() => {
            // console.log('onPress')
          }}
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >

          <TravelRoute />
          {renderUi()}
        </RNMapView>
      </View>
      { orderState === 'latlng-picker' && <View style={styles.markerFixed}>
        <Image
          resizeMode='contain'
          style={styles.marker}
          source={{
            uri: 'https://cdn.picpng.com/google/google-map-marker-red-peg-77453.png',
            width: 100,
            height: 100
          }} />
      </View>}
        
      { orderState === 'latlng-picker' && <View style={{ 
          // backgroundColor : 'red', 
          position : 'absolute', 
          bottom : 0, 
          width : '100%', 
          height : 100,
          justifyContent : 'center',
          alignItems : 'center',
          paddingHorizontal : 15
          }}>
        <TouchableOpacity
        onPress={()=>{
          
          dispatch(travelActions.setOrigin({
            latitude : currentPosition.latitude,
            longitude : currentPosition.longitude,
          }))

          dispatch(travelActions.setDestine({
            latitude : tempPickerLocation.latitude,
            longitude : tempPickerLocation.longitude,
          }))



         
    

          mapRef.current.fitToCoordinates(
                [ currentPosition, {latitude: tempPickerLocation.latitude, longitude : tempPickerLocation.longitude} ],
                {
                  edgePadding: {
                    top: 800,
                    bottom: 280,
                    left: 100,
                    right: 100,
                  },
                }
              )
              
              
              setShowRequestOptions(true)
              setShowRequestModal(true)

              
              updateOriginLocation({
                address: 'Barinas origin 777', //parts,
                coords:{
                  latitude: travel.origin.latitude,
                  longitude: travel.origin.longitude,
                },
                valid: true
              });
      

              updateStopLocation({
                'updateStopLocation': {
                    address: 'Barinas destine', // parts
                    coords : {
                      latitude : travel.destine.latitude,
                      longitude : travel.destine.longitude
                    }
                }
              });

              


        }}
          style={{ 
            backgroundColor : THEME_PRIMARY_COLOR, 
            width : '100%', 
            height : 65, 
            borderRadius : 50, 
            justifyContent : 'center', 
            alignItems : 'center'
            }}>
              <Text style={{
                color : 'white',
                fontSize : 20
                }}>LISTO</Text>
        </TouchableOpacity>
      </View>}
      
    </LatLngProvider>
  );

};

export default GoogleMap;


const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  }
})

/* marker icono con foto */
/* 
<Image
source={images.TRAVEL_PASSENGER_MARKER}
style={{ width: 26, height: 28 }}
resizeMode="contain"
/> 
*/


/* 
<TravelProgressMarker />
<PassengerLocationMarker />
<DestineMarker />
<TravelRoute />

<View style={{flex: 1, justifyContent:'center', alignItems : 'center'}}>
  <Text>Latitude :{pickerLocation.latitude}</Text>
  <Text>Longitude :{pickerLocation.longitude}</Text>
  <Marker 
    coordinate={currentPosition} 
    />
</View> 
*/