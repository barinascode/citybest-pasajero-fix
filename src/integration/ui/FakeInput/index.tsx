import { AntDesign } from '@expo/vector-icons';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native';


interface propTypes {
    labelIcon: JSX.Element;
    divider?: boolean;
    dividerDropDownIcon?: boolean;
    dividerLeft?: boolean;
    dividerRight?: boolean;
    isDropDown?: boolean;
    dropDownRight?: boolean;
    dropDownLeft?: boolean;
    // onPressInput: () => void
    onPressDropDownButton: () => void
    dividerContent?: JSX.Element;
    input: JSX.Element;
    error?: boolean;
}


const FakeInput = (props: propTypes) => {

    const DorpDownButton = () => {
        if (typeof props.isDropDown != "undefined")
            return (
                <TouchableOpacity
                    onPress={() => props.onPressDropDownButton()}
                    style={styles.dropDownIconContainer}>
                    <AntDesign name="caretdown" size={12} color="grey" />
                    {(props.dividerContent) ? props.dividerContent : <></>}
                </TouchableOpacity>)

        return <></>
    }

    return <>
        <View style={styles.container}>

            <View style={styles.iconLabelContainer}>
                {props.labelIcon}
            </View>

            <View style={{
                ...styles.fakeInput,
                borderColor: props.error ? 'red' : THEME_PRIMARY_COLOR,
            }}>


                {props.dropDownLeft && <DorpDownButton />}
                {props.dividerLeft && <View style={styles.inputDividor}></View>}

                <View style={styles.inputContainer}>
                    <View style={styles.touchableInputStyle}>
                        {props.input}
                    </View>
                </View>

                {props.dividerRight && <View style={styles.inputDividor}></View>}
                {props.dropDownRight && <DorpDownButton />}

            </View>
        </View>
    </>
}

export default FakeInput


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },

    selectedGenderContainer: {
        display: 'flex',
        flex: 10,
    },

    fakeInput: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 30,
        borderStyle: 'solid',
        borderColor: THEME_PRIMARY_COLOR,
        borderWidth: 1,
        paddingLeft: 0,
        // paddingVertical: 10,
        height: 40,

    },

    dropDownIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor :'red',
        minWidth: 40,
        minHeight: 30,
    },

    inputDividor: {
        borderStyle: 'solid',
        borderLeftColor: THEME_PRIMARY_COLOR,
        borderLeftWidth: 1,
        // marginLeft : 10,
        marginRight: 10,
        height: 37,
    },

    inputContainer: {
        flex: 1
    },

    iconLabelContainer: {
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor : 'red',
        width: 35
    },

    touchableInputContainer: {
        backgroundColor: 'red',
        height: 36,
        width: '100%',
        justifyContent: 'center'
    },

    touchableInputStyle: {
        height: 34,
        justifyContent: 'center',
        marginLeft: 14

    }
})