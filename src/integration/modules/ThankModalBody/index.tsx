import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import images from '@modules/_shared/domain/utils/constants/images';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import { useFonts, PTSans_700Bold, PTSans_400Regular } from '@expo-google-fonts/pt-sans';


const StatIcon = (props:any)=>{
    return <View style={{flexDirection : 'column', alignItems : 'center'}}>
        <Image 
            source={props.imageSource}
            resizeMode="cover"
            style={{width: props.imageWidth || 50, height: props.imageHeight || 80}}
        />
        {props.label}
    </View>
}



const ThankModalBody = (props:any) => {
    const { data: user } = useGetProfile();
    
    let [fontsLoaded] = useFonts({
        PTSans_700Bold, PTSans_400Regular
    });


    if (!fontsLoaded)
        return <AppLoading />

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>props.onPressClose()}
                style={{
                    position : 'absolute',
                    width : 35,
                    height : 35,
                    right : 0,
                    top: -10,
                    borderRadius : 100,
                    justifyContent : 'center',
                    alignItems : 'center',
                    backgroundColor : THEME_PRIMARY_COLOR,

                }}>
                    <Text style={{color : 'white'}}>X</Text>
            </TouchableOpacity>
            <View style={styles.profileContainer}>
                <ImageBackground source={(user?.profilePictureUrl) ? { uri : user?.profilePictureUrl}  : images.DEFAULT_PHOTO}
                    resizeMode="cover" 
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 100,
                    }}
                    imageStyle={{ 
                        borderRadius: 100,
                        width : 75,
                        height : 75,
                        
                    }}
                >
                    <Image 
                    source={images.MODAL_RESOURCE_MARKUP_PROFILE_IMAGE} 
                    resizeMode="cover"
                    style={{
                        width : 100,
                        height : 100,
                        position : 'absolute',
                        top : -10,
                        left : -11
                    }}/>
               
                </ImageBackground>
                
            </View>

            <View style={styles.messageContainer}>
                <Text style={{
                        fontSize :16 ,
                        color: THEME_PRIMARY_COLOR,
                        textAlign : 'center',
                        fontFamily: 'PTSans_400Regular',
                        }}>¿Cuál fue tu aporte en la</Text>
                        
                    <Text style={{
                        fontSize :16 ,
                        fontFamily : 'PTSans_400Regular',
                        color: THEME_PRIMARY_COLOR,
                        textAlign : 'center'
                        }}>disminución de la huella de carbono?</Text>
            </View>
            
            <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <View style={styles.resultContainer}>
                    <ImageBackground 
                        source={images.MODAL_RESOURCE_BACKGRONUND_WITH_CO2} 
                        resizeMode="cover" 
                        style={{
                            width : 190,
                            height : 90,
                            justifyContent : 'center',
                            alignItems : 'center',
                        }}>
                            <Text style={{fontSize :40 , color: 'white',fontFamily : 'PTSans_700Bold',}}> -230 </Text>
                            <Text style={{fontSize :14 , color: 'white', marginBottom : 15, fontFamily : 'PTSans_400Regular',}}> Huella de carbono </Text>
                    </ImageBackground>
                        
                </View>
            </View>

            <View style={styles.statsContainer}>
                   
                   <View style={{marginRight : 15, paddingTop : 0}}>
                    <StatIcon
                        imageSource={images.MODAL_RESOURCE_GREEN_CLOCK}
                        imageWidth={40}
                        imageHeight={36}

                        label={
                        <>  
                            <Text style={{color : THEME_PRIMARY_COLOR, fontSize : 30, fontFamily : 'PTSans_700Bold', marginTop : 2}}>51</Text>
                            <Text style={{color : THEME_PRIMARY_COLOR, textAlign :'center', fontFamily : 'PTSans_400Regular',}}>Minutos</Text>
                            <Text style={{color : THEME_PRIMARY_COLOR, textAlign :'center', fontFamily : 'PTSans_400Regular',}} >manejados</Text>
                        </>
                            }
                        />
                    </View>

                    <View style={{marginTop : 3}}>
                        <StatIcon 
                        imageSource={images.MODAL_RESOURCE_GREEN_CAR}
                        imageWidth={75}
                        imageHeight={35}
                       
                        label={
                        <>  
                            <Text style={{color : THEME_PRIMARY_COLOR, fontSize : 30, marginTop : 2, fontFamily : 'PTSans_700Bold'}}>22</Text>
                            <Text style={{color : THEME_PRIMARY_COLOR, fontFamily : 'PTSans_400Regular'}}>Distancia</Text>
                            <Text style={{color : THEME_PRIMARY_COLOR, fontFamily : 'PTSans_400Regular'}}>(Kms)</Text>
                        </>
                            }
                        />
                    </View>
            </View>

            <View style={{
                    flexDirection : 'column', 
                    justifyContent : 'center',
                    alignItems:'center',
                    marginTop : 15,
                    marginBottom : 15
                    
                    }}>
                <Text style={{
                    marginTop : 10,
                    marginBottom: 10,
                    backgroundColor : THEME_PRIMARY_COLOR,
                    padding : 2,
                    width : 100,
                    textAlign : 'center',
                    borderRadius : 15,
                    color: 'white',
                    fontFamily : 'PTSans_400Regular'
                    }}>Certifica</Text>
                <Image 
                source={images.MODAL_RESOURCE_UNIVERSIDAD_CONCEPCION_LOGO}
                resizeMode={'cover'}
                style={{width : 135, height : 55}}
                />
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginTop : 40,
        marginHorizontal : 5,
        paddingVertical : 10,
        borderRadius : 25,
        backgroundColor : 'white'
    },
    profileContainer:{
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 15
    },
    messageContainer:{
        marginBottom : 10,
        marginTop : 10,
        marginHorizontal : 30,
    },
    resultContainer:{
        borderRadius : 30,
        justifyContent :'center',
        alignItems : 'center',
        backgroundColor : '#4d137e',
        // marginHorizontal : 30,
        overflow : 'hidden',
        marginBottom : 20,
        marginTop : 20,
        width : 190,
        height : 90,
    },
    statsContainer:{
        flexDirection : 'row',
        justifyContent : 'center',
    },

    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    }
  });

  export default ThankModalBody