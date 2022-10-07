import { Theme, useTheme } from '@shared/domain/utils/constants/AppTheme';
import * as React from 'react';
import { ProgressBar as BaseProgressBar } from 'react-native-paper';

interface ProgressBarProps {
    progress: number;
    color?: keyof Theme['colors'];
    height?: number;
}

function ProgressBar(props: ProgressBarProps) {
    const theme = useTheme();

    return (
        <BaseProgressBar
            progress={props.progress / 100}
            style={
                props.height
                    ? {
                          height: props.height
                      }
                    : {}
            }
            color={
                props.color
                    ? theme.colors[props.color]
                    : theme.colors['primaryMain']
            }
        />
    );
}

export default ProgressBar;
