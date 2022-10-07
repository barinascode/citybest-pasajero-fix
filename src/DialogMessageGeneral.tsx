import Button from '@main-components/Button'
import Modal from '@main-components/Modal'
import Text from '@main-components/Text'
import React from 'react'
import { View } from 'react-native'

export const DialogMessageGeneral = () => {
    return (
        <Modal statusBarTranslucent transparent visible={true} style={styles.modal} animationType="fade">
            <View style={styles.modalContainer}>
                {/* <Text variant='heading1' color="black2" >Connection Error</Text> */}
                {/* <AppIcon
            name="phone"
            size={35}
            color="white"
        /> */}

                <Text variant='heading1' color="white" style={styles.modalText}>
                    Este telefono ya esta siendo utilizado.
                </Text>
                <Button style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'white',
                }} color='white'>
                    Cerrar
                </Button>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    // ...
    modal: {
        justifyContent: 'flex-end',
        margin: 10,

    },
    modalContainer: {
        backgroundColor: '#441A7B',
        paddingHorizontal: 60,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        // borderWidth:1,
        // borderColor:'#fff',
        // borderBottomWidth:0,
        // borderTopLeftRadius:12,
        // borderTopRightRadius:12,
    },
    modalTitle: {
        fontSize: 18,
        margin: 10,
        fontWeight: 'bold',
        color: 'white',
        alignContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
    },
    modalText: {
        fontSize: 20,
        marginTop: 14,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'ptsans',
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
});