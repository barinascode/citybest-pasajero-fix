import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

interface MainScreenProps extends PropsWithChildren<any> {}

export default function MainScreen(props: MainScreenProps) {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {props.children}
        </View>
    );
}
