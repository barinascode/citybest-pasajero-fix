import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import React from 'react';

export default function RequestSectionItem(props: {
    iconName: string;
    iconBackground: string;
    left: JSX.Element;
    hideBorders?: boolean;
}) {
    const theme = useTheme();

    return (
        <Box
            style={
                !props.hideBorders && {
                    borderTopColor: theme.colors.greyLight,
                    borderTopWidth: 0
                }
            }
            p="s"
            flexDirection="row"
            alignItems="center"
            paddingHorizontal="l"
        >
            <Box mr="s">
                <Box
                    style={{
                        borderRadius: 45 / 2,
                        backgroundColor: props.iconBackground,
                        padding: 8,
                        width: 45,
                        height: 45,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <AppIcon name={props.iconName} size={25} color="white" />
                </Box>
            </Box>

            <Box justifyContent="center" mt="s" flex={1}>
                {props.left}
            </Box>
        </Box>
    );
}
