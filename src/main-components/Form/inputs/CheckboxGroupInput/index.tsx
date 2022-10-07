import Box from '@main-components/Box';
import Text from '@main-components/Text';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FunctionComponent, useCallback } from 'react';
import { HelperText } from 'react-native-paper';
import CheckboxGroupInputItem from './item';

const sanitizeRestProps = ({
    setFilter,
    setPagination,
    setSort,
    loaded,
    ...rest
}: any) => rest;

const CheckboxGroupInput: FunctionComponent<any> = (props) => {
    const theme = useTheme();

    const {
        choices = [],
        className,
        classes: classesOverride,
        format,
        helperText,
        error,
        label,
        margin = 'dense',
        onBlur,
        onFocus,
        optionText,
        optionValue,
        options,
        parse,
        resource,
        row,
        source,
        translate,
        translateChoice,
        validate,
        formGroupClassName,
        value,
        onChange,
        id,
        ...rest
    } = props;

    const handleCheck = useCallback(
        (e) => {
            let newValue = e.value;

            const isChecked = !!e.checked;

            if (isChecked) {
                onChange([...(value || []), ...[newValue]]);
            } else {
                onChange(value.filter((v) => v != newValue)); // eslint-disable-line eqeqeq
            }
            onBlur(); // HACK: See https://github.com/final-form/react-final-form/issues/365#issuecomment-515045503
        },
        [onChange, onBlur, value]
    );

    return (
        <Box>
            {label && (
                <Text
                    variant="inputLabel"
                    color={error ? 'dangerMain' : 'inputLabelColor'}
                >
                    {label}
                </Text>
            )}

            <Box>
                {choices.map((choice) => (
                    <CheckboxGroupInputItem
                        key={get(choice, optionValue)}
                        choice={choice}
                        id={id}
                        onChange={handleCheck}
                        options={options}
                        optionText={optionText}
                        optionValue={optionValue}
                        translateChoice={translateChoice}
                        value={value}
                    />
                ))}
            </Box>

            {!!error && (
                <Box>
                    <HelperText
                        type="error"
                        theme={{ colors: { error: theme.colors.dangerMain } }}
                        visible={!!error}
                    >
                        {error}
                    </HelperText>
                </Box>
            )}
        </Box>
    );
};

CheckboxGroupInput.propTypes = {
    /* @ts-ignore */
    choices: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    formGroupClassName: PropTypes.string,
    label: PropTypes.string,
    source: PropTypes.string,
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element
    ]),
    optionValue: PropTypes.string,
    row: PropTypes.bool,
    resource: PropTypes.string,
    translateChoice: PropTypes.bool
};

CheckboxGroupInput.defaultProps = {
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true,
    fullWidth: true,
    row: false
};

export default CheckboxGroupInput;
