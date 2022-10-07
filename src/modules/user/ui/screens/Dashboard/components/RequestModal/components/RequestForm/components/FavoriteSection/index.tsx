import Box from '@main-components/Box';
import Icon from '@main-components/Icon';
import Text from '@main-components/Text';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import RequestSectionItem from '../../../../../RequestSectionInput';

function FavoriteSection() {
    const theme = useTheme();
    const fakeLastFavorites = [{ name: 'Casa', address: 'Calle Carrera 71B' }];

    return (
        <Box>
            {fakeLastFavorites.map((address) => {
                return (
                    <TouchableOpacity>
                        <RequestSectionItem
                            iconName="home"
                            iconBackground={theme.colors.successMain}
                            left={
                                <Box>
                                    <Text bold variant="heading3">
                                        {address.name}
                                    </Text>

                                    <Box mt="xs">
                                        <Text color="greyMain">
                                            {address.address}
                                        </Text>
                                    </Box>
                                </Box>
                            }
                        />
                    </TouchableOpacity>
                );
            })}

            <TouchableOpacity>
                <RequestSectionItem
                    iconName="favorite"
                    iconBackground={theme.colors.primaryMain}
                    hideBorders
                    left={
                        <Box
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Text variant="heading3" bold>
                                Favoritos
                            </Text>
                            <Icon
                                name="chevron-right"
                                size="s"
                                color="primaryMain"
                            />
                        </Box>
                    }
                />
            </TouchableOpacity>
        </Box>
    );
}
