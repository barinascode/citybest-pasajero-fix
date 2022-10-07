import BaseCheckboxInput from '@main-components/BaseInputs/BaseCheckboxInput';
import useChoices from '@shared/form/useChoices';
import * as React from 'react';

const CheckboxGroupInputItem = (props) => {
    const {
        classes: classesOverride,
        id,
        choice,
        onChange,
        optionText,
        optionValue,
        options,
        translateChoice,
        value,
        ...rest
    } = props;
    const { getChoiceText, getChoiceValue } = useChoices({
        optionText,
        optionValue,
        translateChoice
    });

    const choiceName = getChoiceText(choice);

    const isChecked = value
        ? value.find((v) => v == getChoiceValue(choice)) !== // eslint-disable-line
          undefined
        : false;

    let currentValue = getChoiceValue(choice);

    return (
        <BaseCheckboxInput
            key={getChoiceValue(choice)}
            onChange={(e) => {
                onChange({
                    checked: !!e,
                    value: currentValue
                });
            }}
            checked={isChecked}
            value={isChecked}
            label={choiceName}
            {...options}
            {...rest}
            style={{
                marginBottom: 15
            }}
            title={choiceName}
        />
    );
};

export default CheckboxGroupInputItem;
