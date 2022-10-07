import React, { useState } from "react"
import { Modal, StyleSheet, View, Text } from 'react-native'
import { useFonts, PTSans_400Regular } from '@expo-google-fonts/pt-sans';
import AppLoading from 'expo-app-loading';
import GenderSelectorItem from "./GenderSelectorItem";
import { Ionicons } from '@expo/vector-icons';
import FakeInput from "../FakeInput";

interface genderOption {
    value: string;
    label: string;
    icon: 'man' | 'woman' | 'genderless'
}

interface propTypes {
    genderList: genderOption[]
    onConfirm: (payload: any) => void
    selectedGender: string;
    error?: boolean;
}


const InputGenderSelector = (props: propTypes) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedIitem] = useState<any>({
    })

    let [fontsLoaded] = useFonts({
        PTSans_400Regular
    });


    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const onConfirm = (payload: any) => {
        setModalVisible(false)
        setSelectedIitem(payload)
        props.onConfirm(payload.value)
    }

    return (

        <View style={styles.centeredView}>

            <FakeInput
                labelIcon={<Ionicons name="people-circle" size={35} color="#441a7b" />}
                // dividerRight
                error={props.error}
                dividerDropDownIcon={true}
                isDropDown
                dropDownRight
                onPressDropDownButton={() => setModalVisible(!modalVisible)}
                dividerContent={<></>}
                input={<>
                    <Text style={styles.datePlaceholderTitle}>
                        {(() => {
                            const result = props.genderList.filter((item) => (item.value == props.selectedGender))[0]
                            if (result) return result.label
                            return 'Selecciona tu género'
                        })()}
                    </Text>
                </>}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
                onTouchCancel={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView2}>
                    <View style={styles.modalView}>


                        <Text style={{
                            marginBottom: 20,
                            fontFamily: 'PTSans_400Regular',
                            fontSize: 16
                        }}>Selecciona una opción</Text>

                        {props.genderList.map((item) => (
                            <View style={{ marginBottom: 15 }} key={`value-${item.value}`}>
                                <GenderSelectorItem
                                    onPress={onConfirm}
                                    icon={item.icon}
                                    label={item.label}
                                    value={item.label}
                                />
                            </View>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>)

}

const styles = StyleSheet.create({


    datePlaceholderTitle: {
        fontSize: 16,
        color: 'grey',
        fontFamily: 'PTSans_400Regular',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        // shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})


export default InputGenderSelector