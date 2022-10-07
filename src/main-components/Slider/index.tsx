import Icon from '@main-components/Icon';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { View } from 'react-native';
import { Slider as BaseSlider } from 'react-native-elements';

interface SliderProps {
    value: number;
    onChange: (num: number) => void;
    max: number;
    min: number;
    step?: number;
}

export default function Slider({ onChange, ...props }: SliderProps) {
    const theme = useTheme();

    return (
        <BaseSlider
            value={props.value || props.min}
            minimumValue={props.min}
            maximumValue={props.max}
            step={props.step}
            onValueChange={(value) => {
                onChange(value);
            }}
            trackStyle={{
                height: 10,
                backgroundColor: 'transparent',
                borderRadius: 10
            }}
            thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: 'transparent'
            }}
            minimumTrackTintColor={theme.colors.primaryLight}
            maximumTrackTintColor="#dcdcdc"
            thumbProps={{
                children: (
                    <View
                        style={{
                            transform: [
                                {
                                    rotateZ: '180deg'
                                },
                                {
                                    translateY: -14
                                }
                            ]
                        }}
                    >
                        <Icon
                            name="map-marker"
                            size="s"
                            color={theme.colors.black}
                        />
                    </View>
                )
            }}
        />
    );
}
