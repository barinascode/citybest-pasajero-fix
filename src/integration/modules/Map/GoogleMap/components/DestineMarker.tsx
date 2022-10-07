import React from 'react'
import { Marker } from 'react-native-maps';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getTravelState } from 'integration/modules/Travel/store/travel.slice';



const DestineMarker = () => {

    const travelState = useSelector(getTravelState)
    const wayPoints = travelState.travel.wayPoints 

    if (!wayPoints.length) return <></>;

    return (
        <Marker coordinate={wayPoints[wayPoints.length - 1]}>
            <Image
                source={{ uri: 'https://w7.pngwing.com/pngs/409/413/png-transparent-map-drawing-pin-map-marker-thumbnail.png' }}
                style={{ width: 26, height: 28 }}
                resizeMode="contain"
            />
        </Marker>
    )
};

export default DestineMarker;