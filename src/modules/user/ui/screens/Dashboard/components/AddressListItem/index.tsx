import Box from '@main-components/Box';
import Text from '@main-components/Text';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RequestSectionItem from '../RequestSectionInput';

export default function AddressListItem({
    iconName,
    iconBackground,
    addressName,
    city,
    onPress
}: {
    iconName: string;
    iconBackground?: string;
    addressName: string;
    city: string;
    onPress: any;
}) {
    const theme = useTheme();

    return (
        <TouchableOpacity onPress={onPress} >
            <RequestSectionItem
            
                iconName={iconName}
                iconBackground={iconBackground ?? theme.colors.greyLight2}
                left={
                    <Box >
                        <Box mb="xs">
                            <Text style={{
                                fontSize: 15,
                                fontFamily: 'ptsans',
                            }} variant="heading3" numberOfLines={1}>
                                {addressName}
                            </Text>
                        </Box>
                        {city ? (
                            <Text color="greyMain">{city}</Text>
                        ) : undefined}
                    </Box>
                }
            />
        </TouchableOpacity>
    );
}
