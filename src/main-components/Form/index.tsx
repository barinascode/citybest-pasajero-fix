import Box from '@main-components/Box';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import createContext from '@modules/_shared/infrastructure/utils/context-selector';
import FormField from '@shared/form/FormField';
import React, { cloneElement, FC, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormToolbar } from './FormToolbar';
import SaveButton, { SaveButtonProps } from './SaveButton';

export interface BaseInputProps {
    source: string;
    isRequired?: boolean;
    meta?: {
        invalid: boolean;
        isTouched: boolean;
        isDirty: boolean;
    };
    ref?: any;
    validate?: any;
    error?: string;
    onBlur?: any;
    onFocus?: any;
    onChange?: any;
}

interface FormProps {
    defaultValues?: any;
    children: any;
    onSubmit: any;
    toolbar?: React.ReactElement;
    saveButtonProps?: SaveButtonProps;
    Wrapper?: FC;
}

function DefaultWrapper(props: any) {
    return (
        <Box width="100%" flex={1}>
            {props.children}
        </Box>
    );
}

export function checkInputSource(props: any) {
    if (!props.source) throw new Error('No source defined');
}
export function Form({
    defaultValues,
    children,
    onSubmit,
    saveButtonProps,
    toolbar = <DefaultFormToolbar />,
    Wrapper = DefaultWrapper
}: FormProps) {
    const methods = useForm({
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues])
    });
    
    const { control, reset } = methods;

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    return (
        <FormProvider {...methods}>
            <Wrapper>
                <Box>
                    {React.Children.map(children, (child) => {
                        return child.props.source && !!!child.props.manual ? (
                            <FormField
                                component={cloneElement(child, {
                                    control: control
                                })}
                                control={control}
                                defaultValue={
                                    child.props.defaultValue ||
                                    (defaultValues &&
                                        defaultValues[child.props.source])
                                }
                                source={child.props.source}
                                validate={child.props.validate}
                            />
                        ) : (
                            cloneElement(child, {
                                control,
                                defaultValues
                            })
                        );
                    })}
                </Box>
                <>
                    {toolbar &&
                        cloneElement(toolbar, {
                            onSubmit,
                            saveButtonProps: saveButtonProps
                        })}
                </>
            </Wrapper>
        </FormProvider>
    );
}

const DefaultFormToolbar = (props: {
    onSubmit?: any;
    saveButtonProps?: any;
}) => {
    return (
        <FormToolbar {...props}>
            <SaveButton {...props.saveButtonProps} />
        </FormToolbar>
    );
};

export function WizardForm({
    defaultValues,
    children,
    onSubmit,
    saveButtonProps,
    toolbar = <DefaultFormToolbar />,
    Wrapper = DefaultWrapper
}: FormProps) {
    const methods = useForm({
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues])
    });
    const { control, reset } = methods;

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    return (
        <FormProvider {...methods}>
            <Box>
                <WizardFormContainer
                    toolbar={({
                        goPrev,
                        goNext,
                        canGoPrev,
                        canGoNext,
                        isLastStep,
                        updateState,
                        state
                    }) => (
                        <>
                            {toolbar &&
                                cloneElement(toolbar, {
                                    onSubmit: (values) => {
                                        updateState(values);
                                        onSubmit({ ...state, ...values });
                                    },
                                    goPrev,
                                    goNext,
                                    canGoPrev,
                                    canGoNext,
                                    isLastStep,
                                    values: state,
                                    saveButtonProps: {
                                        ...saveButtonProps,
                                        onSubmit(values) {
                                            updateState(values);
                                            onSubmit({ ...state, ...values });
                                        }
                                    }
                                })}
                        </>
                    )}
                >
                    {children}
                </WizardFormContainer>
            </Box>
        </FormProvider>
    );
}

const WizardFormContext = createContext({
    currentStep: 0
});

function WizardFormContainer({ children, toolbar }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [state, updateState] = useState({});

    const value = {
        goPrev() {
            setCurrentStep(currentStep - 1);
        },
        goNext() {
            setCurrentStep(currentStep + 1);
        },
        currentStep,
        state,
        updateState(values) {
            updateState({ ...state, ...values });
        },
        get isLastStep() {
            return currentStep === children.length - 1;
        },
        get canGoPrev() {
            return currentStep > 0;
        },
        get canGoNext() {
            return currentStep < children.length - 1;
        }
    };
    const { goPrev, goNext, canGoPrev, canGoNext, isLastStep } = value;

    return (
        <WizardFormContext.Provider value={value}>
            <Box>
                <Box>
                    {React.Children.map(children, (child) => {
                        return cloneElement(child, {
                            isCurrent: child.props.stepKey == currentStep
                        });
                    })}
                </Box>
                <Box>
                    {toolbar({
                        goPrev,
                        goNext,
                        canGoPrev,
                        canGoNext,
                        isLastStep,
                        updateState,
                        state
                    })}
                </Box>
            </Box>
        </WizardFormContext.Provider>
    );
}

export function FormStep(props) {
    const { stepKey, isCurrent, children } = props;
    const dimensions = useDimensions();

    if (!isCurrent) {
        return <Box />;
    }
    return <Box>{children}</Box>;
}
