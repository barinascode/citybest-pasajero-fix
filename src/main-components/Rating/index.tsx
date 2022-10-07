import { Theme, useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { AirbnbRating as BaseRating } from 'react-native-elements';

export interface RatingProps {
    isDisabled: boolean;
    count: number;
    iconSize?: number;
    onFinish?: (value: number) => void;
    selectedColor?: keyof Theme['colors'];
    unSelectedColor?: keyof Theme['colors'];
}

export default function Rating({
    count,
    iconSize = 15,
    onFinish,
    isDisabled,
    selectedColor = 'primaryLight',
    unSelectedColor = 'greyMedium'
}: RatingProps) {
    const theme = useTheme();

    return (
        <BaseRating
            showRating={false}
            count={5}
            defaultRating={count}
            onFinishRating={onFinish}
            size={iconSize}
            selectedColor={theme.colors[selectedColor]}
            unSelectedColor={theme.colors[unSelectedColor]}
            isDisabled={isDisabled}
        />
    );
}
