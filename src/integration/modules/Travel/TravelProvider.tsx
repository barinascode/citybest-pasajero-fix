
import { useEffect } from "react"
import useGetActiveTrip from "@modules/request/application/hooks/use-get-active-trip"
import { useDispatch, useSelector } from "react-redux"
import { getTravelState, travelActions } from "./store/travel.slice"
import retrieveLocation from "./services/retrieveLocation";
import retrieveWayPoints from "./services/retrieveWayPoints";
import retrieveWayPoints2 from "./services/retrieveWayPoints2";

import { calculateHeading } from "../Map/GoogleMap/tools/calculateHeading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import getKilometros from "integration/shared/tools/getKilometros";
import getDirections from "./services/getDirections";

const TravelProvider = (props: any) => {

    const travelState = useSelector(getTravelState)
    const dispatch = useDispatch()
    const { trip } = useGetActiveTrip()


    useEffect(()=>{
        if(trip?.status == 'ACCEPTED' || trip?.status == 'ON_THE_WAY_TO_DESTINATION'){

            dispatch(travelActions.setOrderState(trip?.status));

            const timer = setInterval(() => {

                console.log('interval ON_THE_WAY_TO_DESTINATION')
                

                retrieveLocation().then((location) => {

                    console.log('interval retrieveLocation 1')

                    /*
                        Ruta por defecto
                    */
                    retrieveWayPoints().then( async (wayPoints) => {

                        let tempWayPoints = [ ...wayPoints ]
                      
                        // console.log('Ruta por defecto : ', tempWayPoints[0],tempWayPoints[1], '...')
                        
                            try {
    
    
                                const lat = location.latitude;
                                const lon = location.longitude;
                                

                                for (let i=0; i < tempWayPoints.length; i++){
                                    
                                    const distance = parseFloat(getKilometros(
                                        lat,
                                        lon,
                                        tempWayPoints[i].latitude,
                                        tempWayPoints[i].longitude)
                                        ) * 1000

                                 
                                    if( distance <= 20 ) {
                                        tempWayPoints[i].active = false
                                    }
                                
                                } // Endfor

                                await AsyncStorage.setItem( '@wayPoints', JSON.stringify(tempWayPoints));
                                dispatch(travelActions.setWaypoints(wayPoints))
    
                                
                                


                            } catch (error) {
                              console.log('Error al actualizar WayPoints')
                            }
                    })


                    /* Ruta personalizada */

                        retrieveWayPoints2().then( async ( wayPoints2 ) => {

                            let tempWayPoints2 = [ ...wayPoints2 ]
                          

                            /*
                                Buscar ultimo elemento activo
                            */

                            const lastActiveIndex = wayPoints2.findIndex( item => item.active )


                            /* Calcular la distancia hasta el punto de llegada */
                            let distanciaUbicacionHastaDestino = 0;
                            let elementosActivos = []
                            let tiempoLlegada = 0
                            
                            elementosActivos = wayPoints2.filter((item) => (item.active))

                            for(let i=0; i < elementosActivos.length-1; i++)
                            {   
                                

                            if(elementosActivos.length-1 !== i)
                                {
                                    distanciaUbicacionHastaDestino += parseFloat(getKilometros(
                                        elementosActivos[i].latitude,
                                        elementosActivos[i].longitude,
                                        elementosActivos[i+1].latitude,
                                        elementosActivos[i+1].longitude
                                        )
                                    ) * 1000
                                }
                            }

                            console.log('DESDE ACTUAL HASTA DESTINO: ', distanciaUbicacionHastaDestino)
                            console.log('Velocidad: ', distanciaUbicacionHastaDestino)
                            tiempoLlegada = distanciaUbicacionHastaDestino / location.speed
                            console.log('Tiempo llegada: ', tiempoLlegada / 60)
                            
                            dispatch(travelActions.setMinutesToArrival(tiempoLlegada))
                            dispatch(travelActions.setMetersToArrival(distanciaUbicacionHastaDestino))

                            /*
                                Calcular la distancia entre la ubicacion actual y el ultimo waypoint activo del viaje personalizado
                            */
                            const distanceToLastActiveWaypoint = parseFloat(getKilometros(
                                location.latitude,
                                location.longitude,
                                tempWayPoints2[lastActiveIndex].latitude,
                                tempWayPoints2[lastActiveIndex].longitude)
                                ) * 1000

                                console.log('distanceToLastActiveWaypoint = = = > >', distanceToLastActiveWaypoint)


                                if(distanceToLastActiveWaypoint > 100 ){
                                    
                                    /* Recalcular la ruta desde la ubicacion actual hasta el origen */
                                    
                                    const from = `${location.latitude},${location.longitude}`;
                                    const to = `${wayPoints2[wayPoints2.length - 1].latitude},${wayPoints2[wayPoints2.length - 1].longitude}`;

                                    const newWayPoints = await getDirections(from,to)
                                    
                                    console.log('recalcular ', distanceToLastActiveWaypoint)

                                    await AsyncStorage.setItem( '@wayPoints2', JSON.stringify(newWayPoints));
                                    dispatch(travelActions.setWaypoints2(newWayPoints))

                                    return
                                }



                                try {
        
        
                                    const lat = location.latitude;
                                    const lon = location.longitude;
                                    
    
                                    for (var i=0; i < tempWayPoints2.length; i++){
                                        
                                        const distance = parseFloat(getKilometros(
                                            lat,
                                            lon,
                                            tempWayPoints2[i].latitude,
                                            tempWayPoints2[i].longitude)
                                            ) * 1000
    
                                     
                                        if( distance <= 20 ) {
                                            tempWayPoints2[i].active = false
                                        }
                                    
                                    } // Endfor
    
                                    await AsyncStorage.setItem( '@wayPoints2', JSON.stringify(tempWayPoints2));
                                    dispatch(travelActions.setWaypoints2(wayPoints2))
        
                                    
                                } catch (error) {
                                  console.log('Error al actualizar WayPoints 2')
                                }
                        })



                    let speed = location.speed || 0;
                    let heading = 0

                    
                    /*
                        VIAJE ACEPTADO
                    */
                    if(travelState.orderState === 'ACCEPTED' && travelState.getHeadingFromCurrentLocation === false){

                        heading = calculateHeading(
                            travelState.travel.wayPoints[0],
                            travelState.travel.wayPoints[1]
                        );

                        dispatch(travelActions.setCurrentPosition({
                            latitude : location.latitude,
                            longitude : location.longitude,
                            heading : heading,
                            speed : speed
                        }))

                        return
                    }
                        

                    /*
                        VIAJE INICIADO PERO EL AUTOMOVIL NO ESTA EN MOVIMIENTO
                    */

                    if(
                        travelState.orderState === 'ON_THE_WAY_TO_DESTINATION' 
                        && travelState.getHeadingFromCurrentLocation === false
                    ){

                        if( speed > 2 ){
                            dispatch(travelActions.setGetHeadingFromCurrentLocation(true))
                        }


                        heading = calculateHeading(
                            travelState.travel.wayPoints[0],
                            travelState.travel.wayPoints[1]
                        );

                        dispatch(travelActions.setCurrentPosition({
                            latitude : travelState.travel.wayPoints[0].latitude,
                            longitude : travelState.travel.wayPoints[0].longitude,
                            heading : heading,
                            speed : speed
                        }))

                        return
                    }
                        
                       
                    /* VIAJE INICIADO YA EL AUTO ESTA EN MOVIMIENTO */

                        if(
                            travelState.orderState === 'ON_THE_WAY_TO_DESTINATION'
                            && travelState.getHeadingFromCurrentLocation === true
                        ){
                            
                            dispatch(travelActions.setCurrentPosition({
                                latitude : location.latitude,
                                longitude : location.longitude,
                                heading : location.heading || 0,
                                speed : location.speed
                            }))
                        

                        }
                })
    
                

            }, 5000);
        // }, 300);

            return () => {
                clearInterval(timer);
            };
        }
    
            

    },[trip,dispatch,travelState])


        return props.children


}


export default TravelProvider