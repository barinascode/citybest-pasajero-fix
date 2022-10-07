import Box from '@main-components/Box';
import { Form } from '@main-components/Form';
import EmailTextInput from '@main-components/Form/inputs/EmailTextInput';
import ImageInput from '@main-components/Form/inputs/ImageInput';
import TextInput from '@main-components/Form/inputs/TextInput';
import SaveButton from '@main-components/Form/SaveButton';
import Image from '@main-components/Image';
import PasswordInput from '@main-components/PasswordInput';
import StatusBar from '@main-components/StatusBar';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { onlyLetters } from '@shared/form/filters';
import { required } from '@shared/form/validate';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, SafeAreaView, View, Text, ImageBackground, Image as Image2 } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RepeatPasswordInput from './components/ConfirmPassword';
import useRegistrationState from './hooks/register-auth-listener';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisterState, registerActions } from 'integration/modules/Register/store/register.slice';
// import { getDeviceState } from 'config/Device/store/device.slice';
import RegisterInputPhoneImplementation from 'integration/modules/Register/RegisterInputPhoneImplementation';
import RegisterInputGenderSelectorInplementation from 'integration/modules/Register/RegisterInputGenderSelectorImplementation';
import RegisterInputDatePickerImplementation from 'integration/modules/Register/RegisterInputDatePickerImplementation';
import AppIcon from '@main-components/AppIcon';
import { ExistInFieldErrors } from 'Hooks/FormHooks';
import useValidRegisterForm from 'integration/modules/Register/hooks/useValidRegisterForm';
import RegisterInputEmailImplementation from 'integration/modules/Register/RegisterInputEmailImplementation';
import useForm from '@main-components/Form/hooks/useForm';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';
import {TextInput as TextInput2} from 'react-native'
import InputEmail from 'integration/ui/InputEmail';
import FakeInput from 'integration/ui/FakeInput';
import TextError from 'integration/ui/TextError';
import InputText from 'integration/ui/InutText';
import InputPassword from 'integration/ui/InputPassword';
 // import RegisterInputEmailImplementation from 'integration/modules/Register/RegisterInputEmailImplementation';
// import useValidRegisterForm from 'integration/modules/Register/hooks/useValidRegisterForm';
// import { THEME_DISABLED_BG_COLOR, THEME_DISABLED_TEXT_COLOR, THEME_PRIMARY_COLOR } from 'integration/Contants';
// import InputPhone from 'integration/ui/InputPhone';


function RegisterForm() {
    const [sendedForm, setSendedForm] = useState(false)
    const [firstNameState, setFirstNameState] = useState('')
    const [lastNameState, setLastNameState] = useState('')
    const [pass, setPass] = useState('')
    const theme = useTheme();
    const imageSize = 150;
    const [fieldsError, setfieldsError] = useState([])
    const handleFieldsError = (fields: any) => {
        setfieldsError(fields)
    }


    function FormToolbar({
        handleFieldsError,
        fieldsError = []
    }) {
    
        const dispatch = useDispatch()
        const registerState = useSelector(getRegisterState)
        const { isValidRegisterForm } = useValidRegisterForm()
        const { register, loading, data } = useRegistrationState()
        const [processing, setprocessing] = useState(false)
        const [validating, setvalidating] = useState(false)
        const { getValues } = useForm();
    
    
        useEffect(() => {
            const subscription = getValues();
            let temp: any = [];
            Object.keys(subscription).forEach((key) => {
                if (typeof subscription[key] === 'string' && subscription[key].length === 0) {
                    temp.push(key);
                } else if (typeof subscription[key] === 'string' && subscription[key].length > 0) {
                    temp = temp.filter((item: any) => item !== subscription[key])
                }
            })
    
            Object.keys(registerState).map((key) => {
                if (typeof registerState[key] === 'string' && registerState[key].length === 0 && key !== 'profilePictureUrl' || registerState[key] === " ") {
                    temp.push(key)
                }
            })
            if (validating) {
                // console.log("temp=>>", temp)
                handleFieldsError(temp)
            }
        }, [registerState])
    
    
        useEffect(() => {
            const backAction: any = () => {
                handleFieldsError([])
                setvalidating(false)
            }
            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => backHandler.remove();
        }, [BackHandler])
    
        
        return (
            <Box mt="m" style={{
                position : 'relative',
                top : -170,
                padding : 15
            }}>
                <SaveButton
                    disabled={false}
                    label={processing ? 'Registrando...' : 'Registrarse'}
                    uppercase={false}
                    loading={processing}
                    preSubmitHandler={async () => {
                        setSendedForm(true)
                        dispatch(registerActions.updateRegisterInfo({ key: 'formSended', value: true }))
                    }}
                    onSubmit={async (data2: any) => {

                        setvalidating(true)

                        data2.firstName = firstNameState
                        data2.lastName = lastNameState
                        data2.email = registerState.email
                        data2.gender = registerState.gender
                        data2.birthday = registerState.birthday
                        data2.prefix = registerState.iso2Country
                        data2.phone =  registerState.phoneNumber
                        data2.password =  pass
                        // data2.cpassword =  pass
                        
                        

                        const credentials = {
                            
                        };
    
                        let fields: any = [];
                        Object.keys(data2).map((key) => {
                            if (typeof data2[key] === 'string' && data2[key].length === 0 && key !== 'profilePictureUrl' || data2[key] === " ") {
                                fields.push(key)
                            }
                        })
    
                        Object.keys(registerState).map((key) => {
                            if (typeof registerState[key] === 'string' && registerState[key].length === 0 && key !== 'profilePictureUrl' || registerState[key] === " ") {
                                fields.push(key)
                            }
                        })
    
                        // console.log(data2)

                        if (fields.length > 0 && fields[0] !== "fieldErrors") {
                            handleFieldsError(fields)

                        } else if (isValidRegisterForm) {
                            
                            setprocessing(true);
                            
                            const info = {
                                ...data2,
                                // credentials: credentials
                            }
                            
                            // console.log('registrando',info)


                            await register(info);

                            setprocessing(false);
                            setvalidating(false);

                            dispatch(registerActions.setDefaultState())
                            setFirstNameState('')
                            setLastNameState('')
                            setPass('')
                            setSendedForm(false)
                            
                        }
                    }}
                />
            </Box>
        );
    }



    return (
        <Form
        
            onSubmit={() => {
                setSendedForm(true)
            }}
            toolbar={<FormToolbar fieldsError={fieldsError} handleFieldsError={handleFieldsError} />}
        >
           
           

            <View>
            
            <ImageBackground
                source={images.CRESPA_SOLA}
                resizeMode="cover"
                
                style={{ 
                    flex: 1,
                    justifyContent: "center",
                    height : 300,
                    backgroundColor : 'white',
                    overflow : 'hidden'
                }}
                >     

            </ImageBackground>
            
            
            <View
                style={{
                    position : 'relative',
                            top : -130,
                            // backgroundColor : 'green',
                            height : 250,
                            justifyContent : 'center',
                            alignItems :'center'
                            // overflow : 'hidden',
                            
                }}
                
            >

                
                <ImageInput
                    source="profilePictureUrl"
                    renderImage={(url) => (
                        <Box
                            position="relative"
                            width={imageSize}
                            height={imageSize}
                            flex={0}
                            borderRadius={imageSize / 2}
                            justifyContent="center"
                            alignItems="center"

                        >
                            <Image
                                source={{ uri: url }}
                                style={{
                                    resizeMode: 'cover',
                                    height: imageSize,
                                    width: imageSize,
                                    borderRadius: 9999
                                }}
                            />
                        </Box>
                    )}
                    defaultImage={
                        <Box
                            position="relative"
                            width={imageSize}
                            height={imageSize}
                            flex={0}
                            borderRadius={imageSize / 100}
                            justifyContent="center"
                            alignItems="center"
                            style={{
                                borderWidth : 7,
                                borderRadius : 100,
                                borderColor : '#36d98f',
                                overflow : 'hidden'
                            }}
                        >
                            <Image
                                source={images.DEFAULT_PHOTO}
                                style={{
                                    resizeMode: 'cover',
                                    height: 200,
                                    width: 200
                                }}
                            />
                       
                        </Box>
                    }
                    fullWidth={false}
                    imageSize={200}
                />
            </View>

            <View style={{ 
                // backgroundColor : 'red',
                position : 'relative',
                top : -150,
                padding : 15
                }}>


            <View style={{ marginBottom: 15 }}>
                        <FakeInput
                            labelIcon={
                            <Image
                                source={images.ICON_USER}
                                style={{
                                    resizeMode: 'contain',
                                    height: 30,
                                    width: 30
                                }}
                            />
                            }
                            error={ (sendedForm === true && firstNameState === '') }
                            input={
                                <InputText
                                    value={firstNameState}
                                    placeholder="Nombre"
                                    onChangeText={(text) => {
                                        setFirstNameState(text)
                                    }} />
                            }
                        />
                        { sendedForm === true && firstNameState === '' && <TextError message={'Ingrese su nombre'} />}
            </View>

            <View style={{ marginBottom: 15 }}>
            <FakeInput
                            labelIcon={
                            <Image
                                source={images.ICON_USER}
                                style={{
                                    resizeMode: 'contain',
                                    height: 30,
                                    width: 30
                                }}
                            />
                            }
                            error={ (sendedForm === true && firstNameState === '') }
                            input={
                                <InputText
                                    value={lastNameState}
                                    placeholder="Apellido"
                                    onChangeText={(text) => {
                                        setLastNameState(text)
                                    }} />
                            }
                        />
                        { sendedForm === true && lastNameState === '' && <TextError message={'Ingrese su apellido'} />}
                        
            </View>


            

           
          

            {/* <TextInput
                image={images.ICON_USER}
                source="lastName"
                filterText={onlyLetters}
                placeholder="Ingresa tu apellido"
                isError={ExistInFieldErrors('lastName', fieldsError)}
                mode="outlined"
                onChange={(text:string)=>{
                    setLastNameState(text)
                }}
            /> */}
      

            {/* <EmailTextInput
                image={images.EMAILICON}
                source="email"
                mode="outlined"
                placeholder="ingresa tu correo"
                isError={ExistInFieldErrors('email', fieldsError)}
            /> */}

            <View style={{ marginBottom: 15 }}>
                <RegisterInputEmailImplementation error={ExistInFieldErrors('email', fieldsError)} />
            </View>

            <View style={{ marginBottom: 15 }}>
                <RegisterInputPhoneImplementation error={ExistInFieldErrors('phoneNumber', fieldsError)} />
            </View>

            <View style={{ marginBottom: 15 }}>
                    <FakeInput
                            labelIcon={
                            <Image
                                source={images.CONTRAUPDATE}
                                style={{
                                    resizeMode: 'contain',
                                    height: 30,
                                    width: 30
                                }}
                            />
                            }
                            error={ (sendedForm === true && pass === '') }
                            input={
                                <InputPassword
                                    value={pass}
                                    placeholder="Contraseña"
                                    onChangeText={setPass}
                                />
                            }
                        />
                        { sendedForm === true && pass === '' && <TextError message={'Ingrese una contraseña'} />}
            </View>


            {/* <PasswordInput
            
                source="password"
                placeholder="Contraseña"
                image={images.CONTRAUPDATE}
                mode="outlined"
                isError={ExistInFieldErrors('password', fieldsError)}
                rightIcon={{
                    color: 'primaryMain'
                }}
            /> */}


            <View style={{ marginBottom: 15 }}>
                <RegisterInputDatePickerImplementation isError={ExistInFieldErrors('birthday', fieldsError)} />
            </View>

            <View style={{ marginBottom: 15 }}>
                <RegisterInputGenderSelectorInplementation isError={ExistInFieldErrors('gender', fieldsError)} />
            </View>

            </View>

            </View>
        </Form>
    );
}


export default function Register() {
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar />
            <ScrollView keyboardShouldPersistTaps="always">
            <View style={{
                backgroundColor : THEME_PRIMARY_COLOR,
                paddingTop : 10,
                paddingVertical : 15,
                justifyContent : 'center',
                alignItems : 'center',
                flexDirection : 'row'
            }}> 
                   
                <Text style={{marginLeft : 4,color : 'white', fontWeight : 'bold'}}>Viajes 100% vehículos eléctricos</Text>
                <Image2
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
                <Box bg="white" style={{ 
                    marginTop: 0,
                    padding : 0,
                    // backgroundColor:'orange'
                    }} flex={1}>
                    <RegisterForm />
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
}

