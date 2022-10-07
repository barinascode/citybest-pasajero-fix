import StatusBar from '@main-components/StatusBar';
import Text from '@main-components/Text';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Dimensions, View } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Welcome() {
    const { navigate } = useNavigation();

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <StatusBar translucent />
            <Text>Here goes the welcome page</Text>
        </View>
    );
}
