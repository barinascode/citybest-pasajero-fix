import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

interface FabProps {
    icon?: any;
    small?: boolean;
    onPress?: () => void;
    style?: any;
    disabled?: boolean;
}

export default function Fab({ icon = 'plus', ...props }: FabProps) {
    const theme = useTheme();

    return (
        <FAB
            disabled={props.disabled}
            style={[styles.fab, props.style]}
            small={props.small}
            icon={icon}
            theme={{
                colors: {
                    primary: theme.colors.primaryMain,
                    background: theme.colors.primaryMain,
                    accent: theme.colors.primaryMain,
                    disabled: theme.colors.greyMedium
                }
            }}
            onPress={props.onPress}
        />
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
});
