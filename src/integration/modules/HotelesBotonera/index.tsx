import React from 'react'
import { View, Image, Text, TouchableOpacity, ImageBackground, Linking, Alert } from "react-native"
import images from '@modules/_shared/domain/utils/constants/images'
import { THEME_PRIMARY_COLOR } from 'integration/Contants'


const HotelesBotonera = ()=>{

    return (
        <View>
            <View style={{
                paddingHorizontal : 15, 
                paddingTop: 30,
                
            }}>
                
                <TouchableOpacity style={{
                    flexDirection : 'row',
                    alignItems : 'center'
                }}
                onPress={()=>{
                    Linking.openURL(`whatsapp://send?phone=+56994179310&text=`);
                }}>
                    <Image
                        source={images.AUTO_WHATSAPP}
                        style={{
                            width : 60,
                            height : 60
                        }}
                    />
                    <Text style={{marginLeft : 10,  fontSize: 14}}>Recibe asistencia de un ejecutivo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flexDirection : 'row',
                    alignItems : 'center',
                    marginBottom : 10,
                    marginTop : 10
                }}
                onPress={()=>{
                    Alert.alert(
                        "Estamos trabajando",
                        "Función habilitada próximamente.",
                        [
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                      );
                  
                }}
                >
                    <Image
                        source={images.AUTO_AVION}
                        style={{
                            width : 60,
                            height : 60
                        }}
                    />
                    <Text style={{marginLeft : 10,  fontSize: 14}}>Reserva tu viaje con un ejecutivo</Text>
                </TouchableOpacity>

            </View>
            
            <View style={{
                backgroundColor : THEME_PRIMARY_COLOR,
                paddingVertical : 10,
                justifyContent : 'center',
                alignItems : 'center',
                flexDirection : 'row'
            }}> 
                    <Image
                        source={images.BATERIA_SOLA}
                        style={{
                            width : 22,
                            height : 22
                        }}
                    />
                <Text style={{marginLeft : 4,color : 'white', fontWeight : 'bold'}}>Viajes 100% vehículos eléctricos</Text>
                <Image
                        source={images.HOJAS_SOLAS}
                        style={{
                            width : 22,
                            height : 22,
                            position : 'relative',
                            top : -7,
                            left : -10


                        }}
                    />
            </View>

            <ImageBackground 
            source={images.FONDO_HOTELES} 
            resizeMode="cover"
            style={{
                width : '100%',
                height : 400
            }}>

                    <Image
                        source={images.PROMO_HOTELES}
                        style={{
                            width : 180,
                            height : 180,
                            position : 'relative',
                            top : 100,
                            left: 40
                        }}
                    />

                <TouchableOpacity
                style={{
                    position : 'relative',
                            top : -150,
                            left: -5,
                            width : 155,
                            height : 55,
                }}
                onPress={()=>{
                    // Linking.openURL('https://novotelsantiagoprovidenciahotel.com-hotel.com');
                    Linking.openURL('https://eb3.autocab.net/#/32283');
                }}
                >

                    <Image
                        source={images.NOVOTEL_LOGO}
                        style={{
                            width : 155,
                            height : 55,
                        }}
                        />
                </TouchableOpacity>


            </ImageBackground>
               
                
                

            </View>
            


     

    )

}

export default HotelesBotonera