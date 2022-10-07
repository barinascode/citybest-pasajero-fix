import BaseRadioInput from '@main-components/BaseInputs/BaseRadioInput';
import useChoices from '@shared/form/useChoices';
import * as React from 'react';

const RadioButtonGroupInputItem = ({
    choice,
    optionText,
    optionValue,
    source,
    onChange,
    value = undefined
}) => {
    const { getChoiceText, getChoiceValue } = useChoices({
        optionText,
        optionValue
    });
    const label = getChoiceText(choice);
    const choiceValue = getChoiceValue(choice);
    const nodeId = `${source}_${choiceValue}`;

    return (
        <BaseRadioInput
            id={nodeId}
            color="primaryMain"
            uncheckedColor="greyMain"
            onChange={(isChecked) => {
                return onChange(isChecked ? choiceValue : undefined);
            }}
            value={choiceValue}
            title={label}
            checked={value === choiceValue}
            style={{ marginBottom: 10 }}
        />
    );
};

export default RadioButtonGroupInputItem;
