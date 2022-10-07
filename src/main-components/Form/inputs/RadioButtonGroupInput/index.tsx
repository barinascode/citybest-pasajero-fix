import Box from '@main-components/Box';
import Text from '@main-components/Text';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { HelperText } from 'react-native-paper';
import RadioButtonGroupInputItem from './item';

const RadioButtonGroupInput: FunctionComponent<RadioButtonGroupInputProps> = (
    props
) => {
    const {
        choices = [],
        classes: classesOverride,
        format,
        helperText,
        label,
        loaded,
        loading,
        margin = 'dense',
        options,
        optionText,
        optionValue,
        parse,
        onBlur,
        onFocus,
        resource,
        row,
        source,
        validate,
        meta,
        value,
        error,
        onChange,
        ...rest
    } = props;

    const theme = useTheme();

    const hasError = meta?.invalid;

    return (
        <Box>
            {label && (
                <Text
                    variant="inputLabel"
                    color={hasError ? 'dangerMain' : 'inputLabelColor'}
                >
                    {label}
                </Text>
            )}

            <Box {...options}>
                {choices.map((choice) => (
                    <RadioButtonGroupInputItem
                        onChange={onChange}
                        value={value}
                        key={get(choice, optionValue)}
                        choice={choice}
                        optionText={optionText}
                        optionValue={optionValue}
                        source={source}
                    />
                ))}
            </Box>
            {!!hasError && (
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

RadioButtonGroupInput.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.any),
    label: PropTypes.string,
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element
    ]),
    optionValue: PropTypes.string,
    resource: PropTypes.string,
    source: PropTypes.string
};

RadioButtonGroupInput.defaultProps = {
    options: {},
    optionText: 'name',
    optionValue: 'id',
    row: true,
    translateChoice: true
};

const sanitizeRestProps = ({
    addLabel,
    afterSubmit,
    allowNull,
    beforeSubmit,
    choices,
    className,
    crudGetMatching,
    crudGetOne,
    data,
    filter,
    filterToQuery,
    formatOnBlur,
    isEqual,
    limitChoicesToValue,
    multiple,
    name,
    pagination,
    perPage,
    ref,
    reference,
    refetch,
    render,
    setFilter,
    setPagination,
    setSort,
    sort,
    subscription,
    type,
    validateFields,
    validation,
    value,
    ...rest
}: any) => rest;

export type RadioButtonGroupInputProps = any;
export default RadioButtonGroupInput;
