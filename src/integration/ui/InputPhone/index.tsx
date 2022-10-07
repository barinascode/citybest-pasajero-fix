import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { validCountries } from 'config/Countries/types'
import { THEME_PRIMARY_COLOR } from 'integration/Contants';
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import FakeInput from "../FakeInput"
import Flags from '../Flags'
import Modal from './Modal'
import CountrySelectorItem from './CountrySelectorItem'

type onSelectHandlerType = {
    iso2: validCountries;
    prefix: string;
    phone: string;
}

interface PropTyes {
    autoFocus?: boolean;
    iso2: validCountries;
    phone: string;
    prefix: string;
    onChangeHandler: (param: onSelectHandlerType) => void,
    error?: any;
}

const InputPhone = (props: PropTyes) => {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [filterText, setFilterText] = useState("");

    const countries = [
        { "iso2": "AR", long_name: "Argentina", 'prefix': '+54' },
        { "iso2": "CL", long_name: "Chile", 'prefix': '+56' },
        { "iso2": "CO", long_name: "Colombia", 'prefix': '+57' },
        { "iso2": "MX", long_name: "Mexico", 'prefix': '+52' },
        { "iso2": "PE", long_name: "Peru", 'prefix': '+51' },
        { "iso2": "UY", long_name: "Uruguay", 'prefix': '+598' },
    ]

    const filteredCountries = countries.filter(
        (item: any) =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const onSelectItemHandler = (param: onSelectHandlerType) => {
        // console.log('onSelectItemHandler to onChangeHandler',param)
        props.onChangeHandler({
            prefix: param.prefix,
            phone: props.phone.replace(/[^\d]/g, ''),
            iso2: param.iso2,
        })
        setIsOpenModal(false)
    }

    const onChangeInputHandler = (text: string) => {
        props.onChangeHandler({
            prefix: props.prefix,
            phone: text.replace(/[^\d]/g, ''),
            iso2: props.iso2,
        })
    }

    return (<>

        <FakeInput
            divider={true}
            error={props.error}
            dividerDropDownIcon={true}
            isDropDown
            onPressDropDownButton={() => {
                setIsOpenModal(true)
            }}

            labelIcon={<>
                <Flags iso2={props.iso2} width={25} height={25} />
            </>

            }
            dividerContent={
                <>
                    <Text style={{ marginLeft: 10 }}>{props.prefix}</Text>
                </>
            }
            input={<View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    onPress={() => setIsOpenModal(true)}
                    style={{
                        flexDirection: 'row',
                        // backgroundColor:'red',
                        width: 50,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <AntDesign name="caretdown" size={12} color="grey" />
                    <Text style={{ marginLeft: 10 }}>{props.prefix}</Text>
                </TouchableOpacity>

                <View style={styles.inputDividor}></View>

                <TextInput
                    value={props.phone}
                    onChangeText={onChangeInputHandler}
                    keyboardType={'phone-pad'}
                    maxLength={15}
                    placeholder={'Número telefónico'}
                    autoFocus={props.autoFocus}
                    style={{
                        fontSize: 16,
                        color: 'grey',
                        // fontFamily: 'PTSans_400Regular',
                    }}
                />
            </View>}
        />

        <Modal
            isVisible={isOpenModal}
            onCloseRequest={() => setIsOpenModal(false)}>
            <View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: 20
                }}>
                    <TouchableOpacity
                        style={{ marginRight: 20 }}
                        onPress={() => {
                            setFilterText('')
                            setIsOpenModal(false)
                        }}
                    >
                        <MaterialIcons name="clear" size={30} color="black" />
                    </TouchableOpacity>
                    <TextInput
                        value={filterText}
                        onChangeText={setFilterText}
                        placeholder={'Selecciona un pais'}
                        autoFocus={true}
                    />
                </View>
                {filteredCountries.map((item) => {
                    if (item.iso2 !== props.iso2)
                        return <View style={{ marginBottom: 15 }}
                            key={`country-selector-${item.iso2}`}>
                            <CountrySelectorItem
                                iso2={item.iso2}
                                longName={item.long_name}
                                prefix={item.prefix}
                                onSelecItem={onSelectItemHandler}
                            />
                        </View>
                }
                )}

            </View>
        </Modal>

    </>)


}

export default InputPhone



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
        marginLeft: 10,
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