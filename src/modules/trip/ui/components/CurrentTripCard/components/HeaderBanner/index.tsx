import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Icon from '@main-components/Icon';
import Image from '@main-components/Image';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import images from '@modules/_shared/domain/utils/constants/images';
import { SearchCountryUser } from 'Hooks/useSearchPlaces';
import { UseLinkingHonor } from 'Hooks/useLinkingHonor';

interface HeaderBannerProps {
    title: string;
    featureImageUrl?: string;
    description: string;
    link?: string;
}

export function HeaderBanner(props: HeaderBannerProps) {
    const theme = useTheme();
    const { linking, sharing } = useUtils();
    const [like, setLike] = useState(false);
    const [countryUser, setcountryUser] = useState({
        name: '',
        countryCode: '',
    })

    useEffect(() => {
        SearchCountryUser().then((res: any) => {
            setcountryUser({
                name: res.country_name,
                countryCode: res.country_code,
            })
        })
    }, [])

    return (
        <Box
            borderWidth={1}
            borderRadius={10}
            borderColor="greyMain"
            height={60}
            flexDirection="row"
            flex={1}
        >

            <Box width="60%" flexShrink={1} height="100%" >
                <TouchableOpacity
                    onPress={() => {
                        linking.openURL(UseLinkingHonor(countryUser.countryCode));
                    }}
                >
                    <Image
                        source={images.HONORAPP}
                        style={{
                            resizeMode: 'contain',
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </TouchableOpacity>

            </Box>
            <Box
                width="40%"
                // width={60}
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
            >


                <Box justifyContent="center" height="100%" mr="m">
                    <TouchableOpacity
                        onPress={() => {
                            linking.openURL(UseLinkingHonor(countryUser.countryCode));
                        }}
                    >
                        <AntDesign name="earth" size={22} color="#441A7B" />
                    </TouchableOpacity>
                </Box>

                <Box
                    alignItems="center"
                    flexDirection="row"
                    height="100%"
                    mr="s"
                >
                    <Box justifyContent="center" height="100%" mr="m">
                        <TouchableOpacity
                            onPress={() => {
                                setLike(!like);
                            }}
                        >
                            <Icon
                                name={!like ? 'heart-o' : 'heart'}
                                color="primaryMain"
                                type="font-awesome"
                                numberSize={20}
                            />
                        </TouchableOpacity>
                    </Box>

                    <Box justifyContent="center" height="100%" mr="m">
                        <TouchableOpacity
                            onPress={() => {
                                sharing.share({
                                    message: '',
                                    url: UseLinkingHonor(countryUser.countryCode)
                                });
                            }}
                        >
                            <AppIcon
                                name="share"
                                color={theme.colors.primaryMain}
                                size={20}
                            />
                        </TouchableOpacity>
                    </Box>


                </Box>
            </Box>
        </Box>
    );
}
