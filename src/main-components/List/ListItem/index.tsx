import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import * as React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';

interface ListItemProps {
    title: React.ReactNode | string;
    description?: React.ReactNode | string;
    titleStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    left?: (props: {
        color: string;
        style?: {
            marginLeft: number;
            marginRight: number;
            marginVertical?: number;
        };
    }) => React.ReactNode;
    right?: (props: {
        color: string;
        style?: {
            marginRight: number;
            marginVertical?: number;
        };
    }) => React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    titleNumberOfLines?: number;
    descriptionNumberOfLine?: number;
}

function ListItem(props: ListItemProps) {
    const theme = useTheme();
    return (
        <List.Item
            {...props}
            onPress={props.onPress}
            theme={{
                dark: false,
                fonts: {
                    regular: {
                        fontFamily: theme.textVariants.body.fontFamily
                    },
                    medium: {
                        fontFamily: theme.textVariants.body.fontFamily
                    },
                    light: {
                        fontFamily: theme.textVariants.body.fontFamily
                    }
                },
                colors: {
                    text: theme.colors.textColor
                }
            }}
            style={props.style}
            titleStyle={props.titleStyle}
            titleNumberOfLines={props.titleNumberOfLines}
            descriptionNumberOfLines={props.descriptionNumberOfLine}
        />
    );
}

export default ListItem;

interface ListItemIconProps {
    icon: any;
}
export function ListItemIcon(props: ListItemIconProps) {
    return <List.Icon icon={props.icon} />;
}
