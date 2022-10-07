import Box from '@main-components/Box';
import InputTextHelper from '@main-components/Form/InputTextHelper';
import Icon from '@main-components/Icon';
import Modal from '@main-components/Modal';
import Text from '@main-components/Text';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import { useUtils } from '@shared/domain/hooks/use-utils';
import useDimensions from '@shared/domain/utils/hooks/useDimensions';
import { OptionText } from '@shared/form/useChoices';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { BaseTextInputProps } from '../BaseTextInput';

export interface BaseSelectInputProps
    extends Pick<BaseTextInputProps, 'dense' | 'leftIcon' | 'left' | 'right'> {
    value?: string;
    ref?: any;
    error?: string;
    onChange?: any;
    options: {
        [prop: string]: any;
        value?: any;
        name: string;
        id: string | number;
    }[];
    optionText?: OptionText;
    optionValue?: string;
    mode?: 'dialog' | 'dropdown';
    inputMode?: 'outlined' | 'flat';
    placeholder?: string;
    style?: any;
    label?: string;
    showUnderline?: boolean;
    containerStyle?: any;
    inputStyle?: any;
}

const BaseSelectInput = (props: BaseSelectInputProps) => {
    const {
        ref,
        value,
        onChange,
        options,
        mode,
        placeholder,
        showUnderline = true,
        inputMode = 'flat',
        error,
        optionValue,
        optionText,
        ...rest
    } = props;
    const theme = useTheme();
    const utils = useUtils();
    const leftCompWidth = props.left?.width ? props.left?.width : 0;
    const leftBoxWidth =
        props.leftIcon?.size == 'm'
            ? 25
            : props.leftIcon?.size
            ? theme.iconSizes[props.leftIcon?.size]
            : 25;

    const finalOptionValue = optionValue ? optionValue : 'id';
    const finalOptionText = optionText ? optionText : 'name';

    const [showModal, setShowModal] = useState(false);
    const { height } = useDimensions();

    const selected = options.find((o) => {
        if (o?.shortName) return o.shortName == value;
        return o[finalOptionValue] == value;
    });
    const hasShortName = selected && Boolean(selected.shortName);

    return (
        <Box>
            <Box
                justifyContent="center"
                position="relative"
                mb="m"
                style={{
                    ...(props.inputStyle || {}),
                    padding: 4,
                    paddingVertical: 12,
                    borderBottomWidth: showUnderline ? 1 : 0,
                    borderBottomColor: theme.colors.greyMedium
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setShowModal(true);
                    }}
                >
                    <Box
                        alignItems="center"
                        justifyContent="space-between"
                        flexDirection="row"
                    >
                        <Box>
                            <Text variant="body" color="greyMain">
                                {selected
                                    ? hasShortName
                                        ? selected.shortName
                                        : selected[finalOptionText.toString()]
                                    : props.placeholder ?? 'Selecciona...'}
                            </Text>
                        </Box>
                        <Box>
                            <Icon
                                numberSize={16}
                                name="caret-down"
                                color="textColor"
                            />
                        </Box>
                    </Box>
                </TouchableOpacity>

                {error && (
                    <Box>
                        <InputTextHelper error={props.error} />
                    </Box>
                )}
            </Box>
            <Modal
                visible={showModal}
                dismissable={true}
                onDismiss={() => {
                    setShowModal(false);
                }}
                contentContainerStyle={{
                    width: '90%',
                    top: 0,
                    // backgroundColor: 'white',
                    alignSelf: 'center',
                    padding: 0,
                    ...props.containerStyle
                }}
            >
                <Box maxHeight={height - 40} width="100%" bg="white">
                    <ScrollView>
                        {props.options.map((e) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        onChange && onChange(e.id);
                                        setShowModal(false);
                                    }}
                                >
                                    <Box bg="white" padding="m">
                                        <Text>{e.name}</Text>
                                    </Box>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </Box>
            </Modal>
        </Box>
    );
};

export default BaseSelectInput;
