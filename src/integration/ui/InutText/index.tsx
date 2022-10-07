import React from 'react'
import { TextInput, View } from 'react-native'
import PropTypes from 'prop-types';
import { useTheme } from 'styled-components';

interface PropTypes {
  value: string;
  placeholder: string;
  onBlur?: () => void
  onChangeText?: (text: string) => void
}

const InputText = (props: PropTypes) => {
  const theme = useTheme();

  return (
    <TextInput
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
  )
}


export default InputText