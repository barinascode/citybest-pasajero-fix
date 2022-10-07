import React from 'react'
import { useSelector } from 'react-redux';
import { Polyline } from 'react-native-maps';
import { getTravelState } from 'integration/modules/Travel/store/travel.slice';

const TravelRoute = () => {

    const travelState = useSelector(getTravelState)
    const wayPoints = travelState.travel.wayPoints 

    if (!wayPoints.length) return <></>;

        return (
            <Polyline
            coordinates={wayPoints}
            strokeWidth={10}
            strokeColor="#000"
            lineDashPattern={[1]}
            />
        )
}

export default TravelRoute