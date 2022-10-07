import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimeUtils from '@shared/domain/utils/misc/datetime-utils';
import * as React from 'react';

interface DatePickerProps {
    mode: 'date' | 'time' | 'datetime' | 'countdown';
    value: Date;
    is24Hour?: boolean;
    onChange?: any;
    show?: boolean;
    onClose?: any;
    minDate?: Date;
    maxDate?: Date;
}

export default function DatePicker(props: DatePickerProps) {
    const onChange = (event, selectedDate) => {
        const currentDate = DateTimeUtils.utc(selectedDate);

        props.onClose && props.onClose();
        if (event.type == 'set') {
            props.onChange && props.onChange(currentDate);
        } else {
            props.onClose && props.onClose();
        }
    };

    return (
        <>
            {props.show && (
                <DateTimePicker
                    value={props.value}
                    mode={props.mode as any}
                    is24Hour={props.is24Hour}
                    display="default"
                    onChange={onChange}
                    minimumDate={props.minDate}
                    maximumDate={props.maxDate}
                    timeZoneOffsetInMinutes={0}
                    timeZoneOffsetInSeconds={0}
                />
            )}
        </>
    );
}
