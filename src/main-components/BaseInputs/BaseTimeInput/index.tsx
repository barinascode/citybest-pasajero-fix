import DatePicker from '@main-components/DatePicker';
import { useUtils } from '@shared/domain/hooks/use-utils';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BaseTextInput, { BaseTextInputProps } from '../BaseTextInput';

export interface BaseTimeInputProps extends Omit<BaseTextInputProps, 'value'> {
    value?: Date;
}

const initialDate = new Date();
export default function BaseTimeInput(props: BaseTimeInputProps) {
    const [clear, setClear] = useState(false);

    const [showPicker, setShowPicker] = useState(false);

    const { date: DateUtils } = useUtils();
    const date = props.value || initialDate;
    return (
        <>
            <TouchableWithoutFeedback
                disabled={props.disabled}
                onPress={() => setShowPicker(true)}
            >
                <BaseTextInput
                    {...props}
                    value={date && DateUtils.format(date, 'HH:mm')}
                    pointerEvents={'none'}
                />
            </TouchableWithoutFeedback>
            <DatePicker
                show={showPicker}
                onClose={() => setShowPicker(false)}
                onChange={(date) => {
                    props.onChangeText && props.onChangeText(date);
                }}
                value={date}
                mode="time"
                is24Hour={false}
            />
        </>
    );
}
