import ActivityIndicator from '@main-components/ActivityIndicator';
import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Icon from '@main-components/Icon';
import Text from '@main-components/Text';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import { OptionText } from '@shared/form/useChoices';
import React, { cloneElement, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { BaseSelectInputProps } from '../BaseSelectInput_';

export interface BaseSelectPickerInputProps extends BaseSelectInputProps {
    value?: string;
    error?: string;
    onChange?: any;
    options?: any[];
    placeholder?: string;
    style?: any;
    optionText?: OptionText;
    optionValue?: string;
    label?: any;
    helperText?: string;
    multiple?: boolean;
    searchPlaceholderText?: string;
    hideSearch?: boolean;
    loaded?: boolean;
    loading?: boolean;
}

export default function BaseSelectPickerInput(
    props: BaseSelectPickerInputProps
) {
    const {
        value,
        onChange,
        options = [],
        placeholder = 'Selecciona',
        error,
        optionText,
        optionValue,
        multiple = false,
        searchPlaceholderText,
        hideSearch = false,
        loading,
        showUnderline = true,
        inputMode = 'flat',
        ...rest
    } = props;

    const theme = useTheme();
    const finalOptionValue = optionValue ? optionValue : 'id';
    const finalOptionText = optionText ? optionText : 'name';

    const leftCompWidth = props.left?.width ? props.left?.width : 0;
    const leftBoxWidth =
        props.leftIcon?.size == 'm'
            ? 25
            : props.leftIcon?.size
            ? theme.iconSizes[props.leftIcon?.size]
            : 25;

    const [selectedItems, setSelectedItems] = useState<any>([]);

    const onSelectedItemsChange = (e) => {
        if (!multiple) {
            onChange && onChange(e[0]);
        } else setSelectedItems(e);
    };

    const onConfirm = () => {
        onChange && onChange(selectedItems);
    };

    useEffect(() => {
        if (value) {
            multiple ? setSelectedItems(value) : setSelectedItems([value]);
        }
    }, [value]);

    return (
        <Box>
            {props.label && (
                <Text
                    variant="inputLabel"
                    color={props.error ? 'dangerMain' : 'inputLabelColor'}
                >
                    {props.label}
                </Text>
            )}
            <Box
                justifyContent="center"
                style={{
                    borderBottomWidth:
                        showUnderline && inputMode == 'flat'
                            ? 1
                            : inputMode == 'outlined'
                            ? 1
                            : 0,
                    borderBottomColor: error
                        ? theme.colors.dangerMain
                        : inputMode == 'outlined'
                        ? theme.colors.greyMain
                        : theme.colors.greyMain,
                    borderColor:
                        inputMode == 'outlined'
                            ? error
                                ? theme.colors.dangerMain
                                : theme.colors.greyMain
                            : undefined,
                    borderWidth: inputMode == 'outlined' ? 1 : undefined,
                    borderRadius: inputMode == 'outlined' ? 4 : undefined,
                    paddingVertical: props.dense ? 10 : 12,
                    marginVertical: props.dense ? theme.spacing.s : 16
                }}
            >
                <Box
                    position="absolute"
                    left={10}
                    flexDirection="row"
                    alignItems="center"
                    width={leftCompWidth + leftBoxWidth}
                    zIndex={9999}
                >
                    {props.leftIcon && (
                        <Box
                            position="relative"
                            bottom={0}
                            right={0}
                            zIndex={9999}
                        >
                            <AppIcon
                                name={props.leftIcon.name}
                                color={theme.colors.inputPlaceholderColor}
                                size={leftBoxWidth}
                            />
                        </Box>
                    )}
                    {props.left && (
                        <Box
                            justifyContent="center"
                            top={Platform.OS === 'web' ? 0 : 6}
                            width={props.left.width}
                            left={props.leftIcon ? 0 : 0}
                            zIndex={9999}
                        >
                            {props.left.component &&
                                cloneElement(props.left.component, {
                                    control: props.control
                                })}
                        </Box>
                    )}
                </Box>
                <Box
                    style={{
                        paddingLeft: props.leftIcon
                            ? leftCompWidth + leftBoxWidth + 10
                            : undefined,
                        justifyContent: 'center'
                    }}
                >
                    <SectionedMultiSelect
                        loading={loading}
                        items={options}
                        hideSearch={hideSearch}
                        styles={{
                            selectToggle: {
                                paddingHorizontal:
                                    inputMode == 'outlined'
                                        ? theme.spacing.m
                                        : theme.spacing.s
                            },
                            searchTextInput: {
                                color: theme.colors.primaryMain,
                                fontSize: theme.textVariants.body.fontSize,
                                fontFamily: theme.textVariants.body.fontFamily
                            },
                            subItemText: {
                                color: theme.colors.primaryMain,
                                fontSize: theme.textVariants.body.fontSize,
                                fontFamily: theme.textVariants.body.fontFamily
                            },
                            selectedItemText: {
                                fontWeight: 'bold',
                                color: theme.colors.primaryMain,
                                fontSize: theme.textVariants.body.fontSize,
                                fontFamily: theme.textVariants.body.fontFamily
                            },
                            itemText: {
                                fontWeight: '300',
                                color: theme.colors.black,
                                fontSize: theme.textVariants.body.fontSize,
                                fontFamily: theme.textVariants.body.fontFamily
                            },

                            button: {
                                borderRadius: 20,
                                paddingBottom: 10,
                                paddingTop: 5,
                                margin: 10
                            },
                            container: {
                                backgroundColor: 'white'
                            }
                        }}
                        colors={{
                            primary: theme.colors.black,
                            success: theme.colors.black,
                            chipColor: theme.colors.black,
                            selectToggleTextColor: theme.colors.black
                        }}
                        uniqueKey={finalOptionValue}
                        hideSelect={false}
                        single={!multiple}
                        subKey="children"
                        // disabled={disabled}
                        displayKey={finalOptionText as string}
                        selectText={placeholder}
                        showDropDowns={false}
                        showChips
                        searchPlaceholderText={
                            searchPlaceholderText || 'Busca en la lista'
                        }
                        readOnlyHeadings={false}
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        onConfirm={onConfirm}
                        hideConfirm={!multiple}
                        IconRenderer={IconRenderer as any}
                        icons={
                            {
                                search: {
                                    name: 'search', // search input
                                    size: 24
                                },
                                arrowUp: {
                                    name: 'caret-up', // dropdown toggle
                                    size: 22
                                },
                                arrowDown: {
                                    name: 'caret-down', // dropdown toggle
                                    size: 22
                                },
                                selectArrowDown: {
                                    name: 'caret-down', // select
                                    size: 24
                                },
                                close: {
                                    name: 'close', // chip close
                                    size: 16
                                },
                                check: {
                                    name: 'check', // selected item
                                    size: 16
                                },
                                cancel: {
                                    name: 'cancel', // cancel button
                                    size: 18
                                }
                            } as any
                        }
                        filterItems={(searchText) => {
                            const q = new RegExp(searchText.toLowerCase(), 'g');
                            return options.filter((item) =>
                                item[finalOptionText as string]
                                    .toLowerCase()
                                    .match(q)
                            );
                        }}
                        selectToggleIconComponent={
                            loading ? <ActivityIndicator /> : undefined
                        }
                    />
                </Box>
            </Box>
            {error && (
                <Box style={{ marginTop: 8, marginLeft: 10 }}>
                    <Text color="dangerMain" variant="small">
                        {error ? error : undefined}
                    </Text>
                </Box>
            )}
        </Box>
    );
}

function IconRenderer(props) {
    return <Icon {...props} type="font-awesome-5" />;
}
