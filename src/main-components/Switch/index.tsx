import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import * as React from 'react';
import { Switch as BaseSwitch } from 'react-native-paper';

interface SwitchProps {
    active: boolean;
    onValueChange: (value: boolean) => any;
}

function Switch(props: SwitchProps) {
    const theme = useTheme();
    const [isSwitchOn, setIsSwitchOn] = React.useState(props.active);

    React.useEffect(() => {
        if (isSwitchOn !== props.active) {
            setIsSwitchOn(props.active);
        }
    }, [props.active]);

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        props.onValueChange(!isSwitchOn);
    };

    return (
        <BaseSwitch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            trackColor={{
                true: theme.colors.successMain,
                false: theme.colors.greyMedium
            }}
            thumbColor={theme.colors.white}
        />
    );
}

export default Switch;
