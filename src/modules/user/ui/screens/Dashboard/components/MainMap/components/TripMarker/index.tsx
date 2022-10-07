import Image from '@main-components/Image';
import GeoPoint from '@modules/_shared/domain/models/geo-point';
import images from '@modules/_shared/domain/utils/constants/images';
import React, { useEffect, useRef, useState } from 'react';
import { Marker, AnimatedRegion } from 'react-native-maps';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import { Text, View } from 'react-native';
import AnimatedRingExample from './AnimatedRings';
import { useFonts, PTSans_400Regular } from '@expo-google-fonts/pt-sans';
import AppLoading from 'expo-app-loading';
import { useSelector } from 'react-redux';
import { getTravelState } from 'integration/modules/Travel/store/travel.slice';
import { enviroment } from 'config/Travel';


interface UserMarkerProps {
	position: GeoPoint;
	mapRef: any
}

export function TripMaker(props: UserMarkerProps) {

	const markerRef = useRef(null)
	const travelState = useSelector(getTravelState)
	const { trip } = useGetActiveTrip();
	// const mapRef = props.mapRef


	const coordinate = useState(
		new AnimatedRegion({
			latitude: travelState.currentPosition.latitude,
			longitude: travelState.currentPosition.longitude,
			latitudeDelta: 0.012,
			longitudeDelta: 0.012,
		}))[0]

	let [fontsLoaded] = useFonts({
		PTSans_400Regular
	});



	const retrieveLocation = async () => {

			coordinate.timing({
				latitude: travelState.currentPosition.latitude,
				longitude: travelState.currentPosition.longitude,
				latitudeDelta: 0.012,
				longitudeDelta: 0.012,
				useNativeDriver: false
			}).start()
	}

    useEffect(() => {
		
		// console.log(travelState.currentPosition)

		const timer = setInterval(() => {
		  (async ()=> await retrieveLocation())();

		}, 300);
	
		return () => {
		  clearInterval(timer);
		};
	
	  }, [travelState.currentPosition]);


	if (!fontsLoaded)
		return <AppLoading />

	return (
		<>

			<Marker.Animated
				ref={markerRef}
				coordinate={coordinate}
				rotation={travelState.currentPosition.heading}
			>
				<Image
					source={
					travelState.orderState === 'ON_THE_WAY_TO_DESTINATION'
						?
							(enviroment == 'DEVELOPMENT') ? images.TRAVEL_BEFORE_RUN : images.AUTOMOVING_PRODUCTION
						:
							images.PIXEL
					}
					style={{
						width: 50,
						height: 50,
						resizeMode: 'contain',
					}}
				/>
			</Marker.Animated>


			<Marker.Animated ref={markerRef} coordinate={coordinate}>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					{trip && trip?.status === 'ACCEPTED' && <Text
						style={{
							marginBottom: 10,
							color: 'black',
							backgroundColor: 'white',
							borderRadius: 5,
							padding: 3,
							fontFamily: 'PTSans_400Regular',
							fontSize: 16
						}}>Tu conductor te recogerá
						aquí</Text>}
					<Image
						source={images.PIXEL}
						style={{
							width: 50,
							height: 50,
							resizeMode: 'contain',
						}}
					/>

				</View>

			</Marker.Animated>

			{travelState.orderState === 'ACCEPTED' && <Marker.Animated
				anchor={{ x: 0.52, y: 0.51 }} 
				coordinate={travelState.travel.wayPoints[0]}>
				<View style={{ width: 200, height: 200 }}>
					<AnimatedRingExample />
				</View>
			</Marker.Animated>}

		</>
	);
}

export default TripMaker;
