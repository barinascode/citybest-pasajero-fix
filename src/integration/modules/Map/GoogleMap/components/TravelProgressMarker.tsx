import React from 'react'
import { Marker } from 'react-native-maps';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getTravelState } from 'integration/modules/Travel/store/travel.slice';
import images from '@modules/_shared/domain/utils/constants/images';

const TravelProgressMarker = () => {

    const travelState = useSelector(getTravelState)
    const {currentPosition} = travelState

    return (
        <Marker.Animated
            coordinate={currentPosition}
            rotation={currentPosition.heading}
          >
            <Image
              source={images.TRAVEL_CARRITO}
              style={{ width: 26, height: 28 }}
              resizeMode="contain"
            />
          </Marker.Animated>
    )
};

export default TravelProgressMarker;