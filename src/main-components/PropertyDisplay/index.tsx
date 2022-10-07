import Box from '@main-components/Box';
import Icon from '@main-components/Icon';
import Text from '@main-components/Text';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { TouchableOpacity } from 'react-native';
// import { ListItem as Item,  Icon } from "native-base";

interface PropertyDisplayProps {
    propertyValue: string | JSX.Element;
    propertyName: string | JSX.Element;
    isEditable?: boolean;
    editAction?: () => void;
    showAction?: () => void;
    addPlaceholder?: string;
    isLast?: boolean;
    custom?: boolean;
}

function PropertyDisplay({
    propertyValue,
    propertyName,
    isEditable = false,
    editAction,
    showAction,
    addPlaceholder,
    isLast = false,
    custom = false
}: PropertyDisplayProps) {
    const theme = useTheme();

    const onEdit = () => {
        if (editAction) editAction();
    };

    const isEmpty = () => {
        return (
            typeof propertyValue === 'undefined' ||
            propertyValue == null ||
            propertyValue === ''
        );
    };

    const empty = isEmpty();
    isEditable = typeof isEditable === 'undefined' ? true : isEditable;

    return (
        <TouchableOpacity
            onPress={showAction || (isEditable ? onEdit : undefined)}
            style={{
                marginVertical: theme.spacing.s
            }}
        >
            <Box flexDirection="row" f={1}>
                <Box flex={1} justifyContent="center">
                    {!empty ? (
                        <Box flexDirection="row">
                            <Text bold>{propertyName}: </Text>
                            <Text>{!custom ? propertyValue : ''}</Text>
                            {custom ? propertyValue : null}
                        </Box>
                    ) : (
                        <Text color="secondaryMain">
                            {addPlaceholder || `Fill ${propertyName}`}
                        </Text>
                    )}
                </Box>
                <Box flex={0.2} alignItems="flex-end" justifyContent="center">
                    {isEditable ? (
                        <Icon
                            type="font-awesome"
                            name={empty ? 'plus' : 'pencil'}
                            style={{
                                fontSize: 16,
                                color: theme.colors.secondaryMain
                            }}
                        />
                    ) : (
                        !!showAction && (
                            <Icon
                                name="arrow-forward"
                                style={{
                                    fontSize: 16,
                                    color: theme.colors.secondaryMain
                                }}
                            />
                        )
                    )}
                </Box>
            </Box>
        </TouchableOpacity>
    );
}

export default PropertyDisplay;
