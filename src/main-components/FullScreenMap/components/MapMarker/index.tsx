import GeoPoint from '@modules/_shared/domain/models/geo-point';
import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Marker } from 'react-native-maps';

interface MapMarkerProps {
    coordinates: GeoPoint;
    title?: string;
    description?: string;
    children?: any; // JSX.Element;
    style?: any;
    onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
}

export function MapMarker(props: MapMarkerProps, ref) {
    return (
        <Marker
            ref={ref}
            coordinate={props.coordinates}
            title={props.title}
            description={props.description}
            style={props.style}
            onLayout={props.onLayout}
        >
            {props.children}
        </Marker>
    );
}

export function MapCallout(props) {
    return <Marker {...props} />;
}

export default React.forwardRef(MapMarker);
