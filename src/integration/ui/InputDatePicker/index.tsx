import React, { useState } from "react"
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useFonts, PTSans_400Regular } from '@expo-google-fonts/pt-sans';
import AppLoading from 'expo-app-loading';
import FakeInput from "../FakeInput";
import { THEME_PRIMARY_COLOR } from "integration/Contants";
// import DatePicker from 'react-native-neat-date-picker'
import DatePicker from 'react-native-date-picker'
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface propTypes {
    selectedDate: any;
    onConfirm: (payload: any) => void,
    error?: boolean;
}


const InputDatePicker = (props: propTypes) => {

    const [showDatePicker, setShowDatePicker] = useState(false)
    const openDatePicker = () => setShowDatePicker(true)
    const onCancel = () => setShowDatePicker(false)

    let [fontsLoaded] = useFonts({
        PTSans_400Regular
    });

   

    if (!fontsLoaded)
        return <AppLoading />

    return (
        <>
            <View style={styles.container}>

                <FakeInput
                    divider={true}
                    error={props.error}
                    dividerDropDownIcon={true}
                    isDropDown
                    dropDownRight
                    onPressDropDownButton={openDatePicker}
                    labelIcon={
                        <AntDesign
                            name="calendar"
                            size={33}
                            color={THEME_PRIMARY_COLOR} />
                    }
                    dividerContent={
                        <></>
                    }
                    input={
                        <Text
                            style={styles.datePlaceholderTitle}>
                            {props.selectedDate || 'Fecha de nacimiento'}
                        </Text>
                    }
                />

    
        <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            onConfirm={(payload)=>{
                props.onConfirm(`${payload.getDay()}-${payload.getMonth()}-${payload.getFullYear()}`)
                console.log('waaa',`${payload.getDay()}-${payload.getMonth()}-${payload.getFullYear()}`)
                setShowDatePicker(false)
            }}
            onCancel={onCancel}
            />


            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',

    },
    datePlaceholderTitle: {
        fontSize: 16,
        color: 'grey',
        fontFamily: 'PTSans_400Regular',
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
})




export default InputDatePicker