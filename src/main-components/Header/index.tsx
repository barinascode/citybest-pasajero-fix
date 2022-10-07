import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { Header as RNEHeader } from 'react-native-elements';

interface HeaderProps {
    leftComponent?: React.ReactElement<{}>;
    centerComponent?: React.ReactElement<{}>;
    rightComponent?: React.ReactElement<{}>;
    style?: any;
    leftContainerStyle?: any;
    centerContainerStyle?: any;
}

export default function Header(props: HeaderProps) {
    const theme = useTheme();

    return (
        <RNEHeader
            leftComponent={props.leftComponent}
            centerComponent={props.centerComponent}
            rightComponent={props.rightComponent}
            leftContainerStyle={props.leftContainerStyle}
            centerContainerStyle={props.centerContainerStyle}
            backgroundColor="transparent"
            style={{
                borderBottomColor: 'transparent'
            }}
            containerStyle={{
                ...(props.style || {})
            }}
        />
    );
}
