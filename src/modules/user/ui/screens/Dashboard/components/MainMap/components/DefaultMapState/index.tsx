import { MapView } from '@main-components/FullScreenMap';
import useGetCurrentGeoPosition from '@modules/user/application/hooks/use-get-current-geo-position';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import images from '@modules/_shared/domain/utils/constants/images';
import React, { MutableRefObject, useEffect } from 'react';
import { NearDrivers } from '../NearDrivers';
import UserMarker from '../UserMarker';


export function DefaultMapState({
    mapRef,
    animate = true
}: {
    mapRef: MutableRefObject<MapView | null>;
    animate?: boolean;
}) {
    const { data: user } = useGetProfile();
    const { loading, data: position, error } = useGetCurrentGeoPosition();

    useEffect(() => {
        if (position) {
            if (animate) {
                mapRef?.current?.animateCamera({
                    center: position,
                    zoom: 15
                });
            } else {
                mapRef.current?.setCamera({
                    center: position,
                    zoom: 15
                });
            }
        }
    }, [position]);

    return (
        <>
            {position && (
                <UserMarker
                    position={position}
                    pictureUrl={user?.profilePictureUrl ?? images.DEFAULT_PHOTO}
                    user={user}
                />
            )}

            {position && <NearDrivers origin={position} />}
        </>
    );
}
