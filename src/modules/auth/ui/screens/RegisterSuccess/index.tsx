import { THEME_PRIMARY_COLOR } from 'integration/Contants'
import React from 'react'
import {View,Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import images from '@modules/_shared/domain/utils/constants/images';
import { useNavigation } from '@react-navigation/native';

const RegisterSuccess = ()=> {

    const { navigate } = useNavigation();


    const  onPressHandler = ()=>{
        navigate('Login', {
            goBack: false
        });
    }

    return(
        <View style={styles.container}>
            <Image
                source={images.ISO_LOGO}
                resizeMode='cover'
                style={{
                    resizeMode : 'cover',
                    marginBottom : 20
                }}
            />
            <Text style={styles.mainTitle}>Registro satisfactorio</Text>
            <Text style={styles.subTitle}>Felicidades, ya puedes acceder a tu cuenta</Text>
            <TouchableOpacity 
            onPress={()=>onPressHandler()}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        paddingHorizontal : 35
    },
    mainTitle : {
        fontSize : 22,
        color : THEME_PRIMARY_COLOR
    },
    subTitle : {
        fontSize : 16,
        color : 'black'
    },
    buttonContainer : {
        width : '100%',
        height: 50,
        backgroundColor : THEME_PRIMARY_COLOR,
        borderRadius : 18,
        padding : 10,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 40,
        
    },
    buttonText: {
        fontSize : 14,
        color : 'white'
    }
})

export default RegisterSuccess