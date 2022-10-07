import Box from '@main-components/Box';
import Icon from '@main-components/Icon';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

export default function BackButton() {
    const { navigate, goBack } = useNavigation();

    if (Platform.OS === 'android') return <Box></Box>;
    return (
        <Box
            style={{
                position: 'absolute',
                top: -15,
                left: 10,
                height: 40,
                width: 40,
                borderRadius: 40 / 2,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999
            }}
            backgroundColor="greyMedium"
        >
            <TouchableOpacity
                onPress={() => {
                    goBack();
                }}
            >
                <Icon name="arrow-left" color="white" size="s" />
            </TouchableOpacity>
        </Box>
    );
}
