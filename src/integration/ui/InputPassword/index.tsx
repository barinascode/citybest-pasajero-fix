import React, { useState } from 'react'
import { TextInput, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import { useTheme } from 'styled-components';
import Icon from '@main-components/Icon';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';

interface PropTypes {
  value: string;
  placeholder: string;
  onBlur?: () => void
  onChangeText?: (text: string) => void
}

const InputPassword = (props: PropTypes) => {
  const [visible, setVisible] = useState(false)
  const theme = useTheme();

  return (
    <View>

    <TextInput
      secureTextEntry={!visible}
      onChangeText={(text: string) => props.onChangeText && props.onChangeText(text)}
      onBlur={() => props.onBlur && props.onBlur()}
      value={props.value}
      placeholder={props.placeholder}
      maxLength={320}
      style={{
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#717171',
        fontFamily:'CitybestFont',
        lineHeight: 36,
      }}

      />
      <TouchableOpacity
      onPress={()=>setVisible(!visible)}
      style={{
        position : 'absolute',
        right : 10,
      }}>

      <Icon
        name={(visible) ? 'visibility' : 'visibility-off' }
        color={'primaryTextDark'}
        type={'material'}
        numberSize={30}
        
        />
      </TouchableOpacity>
      </View>
  )
}


export default InputPassword