import Box from '@main-components/Box';
import Image from '@main-components/Image';
import Text from '@main-components/Text';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import React from 'react';

interface ProfileHeaderProps {
    profilePictureUrl?: string;
    firstName: string;
    lastName: string;
}

export function ProfileHeader(props: ProfileHeaderProps) {
    const theme = useTheme();

    return (
        <Box>
            <Box alignItems="center">
                <Box
                    style={{
                        width: 100 - 2,
                        height: 100 - 2,
                        borderRadius: 50
                    }}
                >
                    <Image
                        source={
                            props.profilePictureUrl
                                ? { uri: props.profilePictureUrl }
                                : images.DEFAULT_PHOTO
                        }
                        resizeMode={'cover'}
                        style={{
                            borderWidth: 1,
                            borderRadius: (100 - 2) / 2,
                            borderColor: theme.colors.primaryMain,
                            width: 100 - 2,
                            height: 100 - 2,
                            resizeMode: 'cover'
                        }}
                    />
                </Box>
                {/*<Box mt="s">
                    <Text variant="body1" color="black2">
                        Conductor
                    </Text>
                    </Box>*/}
            </Box>

            <Box mt="s">
                <Text align="center" variant="heading2" bold color="greyMain">
                    {props.firstName} {props.lastName}
                </Text>
            </Box>
        </Box>
    );
}
