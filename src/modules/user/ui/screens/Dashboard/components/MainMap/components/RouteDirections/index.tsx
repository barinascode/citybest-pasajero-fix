import { GOOGLE_MAPS_KEY } from '@env';
import { MapView } from '@main-components/FullScreenMap';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import useIsDev from '@modules/_shared/domain/hooks/use-is-dev';
import GeoPoint from '@modules/_shared/domain/models/geo-point';
import images from '@modules/_shared/domain/utils/constants/images';
import retrieveLocation from 'integration/modules/Travel/services/retrieveLocation';
import { getTravelState } from 'integration/modules/Travel/store/travel.slice';
import React, { MutableRefObject, useEffect, useMemo, useState } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import AnimatedMapViewDirections from '../AnimatedMapViewDirections';
import { DestinationInfoCard } from '../DestinationInfoCard';
import DestinationMaker from '../DestinationMarker';
import { OriginInfoCard } from '../OriginInfoCard';
import UserMaker from '../UserMarker';
import { Polyline } from 'react-native-maps';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';

export function RouteDirections({
    mapRef,
    origin,
    destination,
    stop,
    markersRefs,
    animated = true,
    showOriginMarker = true
}: {
    mapRef?: MutableRefObject<MapView | null>;
    origin?: GeoPoint & { address: string };
    destination?: GeoPoint & { address: string; duration: any };
    stop?: GeoPoint & { address: string };
    markersRefs: any;
    animated?: boolean;
    showOriginMarker?: boolean;
}) {
    const handleDestinationUser = (dest: any) => {
        setdestinationUser(dest);
    }
    const [destinationUser, setdestinationUser] = useState(null);
    const { lineDashPattern } = useSetLineDashPattern({ destination: destination }, handleDestinationUser)
    const travelState = useSelector(getTravelState)
    const { trip } = useGetActiveTrip()



    useEffect(() => {
        
        console.log('Centrando')

        if (origin && mapRef && destination) {
            
            mapRef?.current?.fitToCoordinates([{
                latitude : origin.latitude,
                longitude : origin.longitude
            }, {
                latitude : destination.latitude,
                longitude : destination.longitude
            }],{
                edgePadding: {
                    top: 200,
                    bottom: 400,
                    left: 50,
                    right: 50,
                }
            })

            // mapRef.current?.setCamera({
            //     center: origin,
            //     zoom: 5
            // });
        
        }
    }, [origin, destination]);


    useEffect(() => {

        const timer = setInterval(() => {

       
            if (origin && destination) {
    


                retrieveLocation().then((location) => {

                    

                    if(trip?.status == 'ACCEPTED'){
                        
                        mapRef?.current?.fitToCoordinates([{
                            latitude : location.latitude,
                            longitude : location.longitude
                        }, destination],{
                            edgePadding: {
                                top: 160,
                                bottom: 300,
                                left: 50,
                                right: 50,
                            }
                        })
                    }
        
                    if(trip?.status == 'ON_THE_WAY_TO_DESTINATION'){

                        mapRef?.current?.fitToCoordinates([{
                            latitude : location.latitude,
                            longitude : location.longitude
                        }, destination],{
                            edgePadding: {
                                top:120,
                                bottom:160,
                                left:50,
                                right:50,
                            }
                        })
                        
                        return
                    }
        
                })
            

            }


        },10000)

        return () => {
            clearInterval(timer);
        };

    }, [mapRef , origin, destination, trip]);

    const DirectionsComponent = animated
        ? AnimatedMapViewDirections
        : MapViewDirections;

    return (
        <>
            {origin && showOriginMarker && (
                <UserMaker
                    ref={markersRefs[0]}
                    position={origin}
                    auto={true}
                    address={origin.address}
                    destinationUser={destinationUser}
                    //pictureUrl={user?.profilePictureUrl ?? images.DEFAULT_PHOTO}
                    pictureUrl={images.AUTOMOVING3}
                    renderCallout={() => {
                        return (
                            <OriginInfoCard
                                origin={origin}
                                address={origin.address}
                            />
                        );
                    }}
                />
            )}

            {stop?.address ? (
                <>
                    <DestinationMaker ref={markersRefs[2]} position={stop} />

                    <DirectionsComponent
                        lineDashPattern={lineDashPattern}
                        strokeWidth={6}
                        strokeColor="#727272"
                        origin={origin}
                        destination={stop}
                        apikey={GOOGLE_MAPS_KEY}
                    />

                    <DirectionsComponent
                        lineDashPattern={lineDashPattern}
                        strokeWidth={6}
                        strokeColor="#727272"
                        origin={stop}
                        destination={destination}
                        apikey={GOOGLE_MAPS_KEY}
                    />
                </>
            ) : (
                destination && (
                    (trip?.status == 'ON_THE_WAY_TO_DESTINATION' ) ? 
                    <>
                        <Polyline
                            strokeWidth={6}
                            strokeColor={'#852cd5'}
                            coordinates={[
                                ...travelState.travel.wayPoints.filter((item)=>( item.active ))
                            ] || []
                        }
                        />

                        <Polyline
                            strokeWidth={6}
                            strokeColor={THEME_PRIMARY_COLOR}
                            coordinates={[
                                ...travelState.travel2.wayPoints.filter((item)=>( item.active ))
                            ] || []
                        }
                        /> 
                    </>
                    
                    :
                    <DirectionsComponent
                    lineDashPattern={lineDashPattern}
                    strokeWidth={8}
                    strokeColor="#727272"
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_KEY}
                /> 
                    
                )
            )}

            {destination && (
                <>
                    <DestinationMaker
                        ref={markersRefs[1]}
                        position={destination}
                        address={destination.address}
                        renderCallout={() => {
                            return (
                                <DestinationInfoCard
                                    destination={destination}
                                    address={destination.address}
                                    duration={destination.duration}
                                />
                            );
                        }}
                    />
                </>
            )}
        </>
    );
}

function useSetLineDashPattern({ destination }: { destination: any }, callback: any) {
    const [lineDashPattern, setLineDashPattern] = useState([1]);
    const isDev = useIsDev();

    useMemo(() => {
        if (destination && lineDashPattern !== null && !isDev) {
            setTimeout(() => {
                setLineDashPattern([1, 1]);
            }, 8000);
            //console.log("Destination", destination);
            callback(destination);

        }
    }, [destination])




    return {
        lineDashPattern
    }
}