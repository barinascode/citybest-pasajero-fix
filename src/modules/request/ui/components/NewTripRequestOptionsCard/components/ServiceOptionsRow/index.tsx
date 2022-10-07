import Box from '@main-components/Box';
import Image from '@main-components/Image';
import Text from '@main-components/Text';
import images from '@modules/_shared/domain/utils/constants/images';
import React from 'react';
import { ImageSourcePropType } from 'react-native';
import CardButton from '../CardButton';

interface ServiceOptionsRowProps {
    onSelect: any;
    selected: string;
}

export default function ServiceOptionsRow(props: ServiceOptionsRowProps) {
    return (
        <Box height={60} alignItems="center" flexDirection="row">
            <Box mr="s" flex={1}>
                <ServiceOption
                    label=""
                    image={images.CITYGAS}
                    selected={props.selected === 'city_economic'}
                    onPress={() => {
                        props.onSelect('city_economic');
                    }}
                />
            </Box>
            <Box mr="s" flex={1}>
                <ServiceOption
                    label=""
                    image={images.CITYFULL}
                    statImage={images.ECOLOGIC_STAT}
                    selected={props.selected === 'city_electric'}
                    onPress={() => {
                        props.onSelect('city_electric');
                    }}
                />
            </Box>
            <Box flex={1}>
                <ServiceOption
                    label=""
                    image={images.CITYBASIC}
                    statImage={images.PACKAGE_STAT}
                    selected={props.selected === 'city_ecologic'}
                    onPress={() => {
                        props.onSelect('city_ecologic');
                    }}
                />
            </Box>
        </Box>
    );
}
function ServiceOption({
    selected = false,
    image,
    statImage,
    label,
    onPress
}: {
    selected?: boolean;
    image: ImageSourcePropType;
    statImage?: ImageSourcePropType;
    label: string;
    onPress?: any;
}) {
    return (
        <CardButton selected={selected} color="white" onPress={onPress}>
            <Box alignItems="center" justifyContent="center">
                <Box
                    flexGrow={1}
                    flexShrink={0}
                    alignItems="center"
                    flexDirection="row"
                    
                >
                   <Image
                            source={image}
                            style={{
                                width: 130,
                                height: 90,
                                resizeMode: 'contain',
                                marginLeft:10,
                                position : 'relative',
                                top:10,
                                left : -6
                            }}
                        />
                        
                </Box>

                {/* <Box
                    mt="xs"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                >
                    <Box
                        justifyContent="center"
                        alignItems="center"
                        mr="xs"
                        width={10}
                        flexGrow={0}
                        flexShrink={0}
                    >
                        <Image
                            source={statImage&&statImage}
                            style={{
                                width: 10,
                                height: 10,
                                resizeMode: 'contain'
                            }}
                        />
                    </Box>
                    <Box>
                        <Text variant="xsmall" numberOfLines={1} color="black">
                            {label}
                        </Text>
                    </Box>
                        </Box>*/}
            </Box>
        </CardButton>
    );
}
