import BaseTextInput from '@main-components/BaseInputs/BaseTextInput';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import React, { useRef } from 'react';
import { useInputOnFocus } from '../..';
import useInputSearchHandler from '../../../../hooks/useInputSearchHandler';

export function OriginInput(props) {
    const originRef = useRef();
    const { origin, originValid, updateOriginLocation } =
        useDashboardContextProvider((state) => ({
            originValid: state.pickLocation?.originValid,
            origin: state.pickLocation?.origin,
            updateOriginLocation: state.updateOriginLocation
        }));

    useInputSearchHandler({ inputName: 'origin' });

    const { onFocus } = useInputOnFocus('origin', originRef);

    

    return (
        <InputWrapper
            {...props}
            value={ ( origin?.address ) ? origin?.address.replace('null,','').replace('null','') : ''  }
                
            ref={originRef}
            onFocus={() => {
                onFocus();
            }}
            onChangeText={(value) => {
                updateOriginLocation({
                    coords: null,
                    address: value,
                    valid: false
                });
            }}
            onBlur={() => {
                if (origin?.address === '' || !origin?.valid) {
                    updateOriginLocation({
                        ...originValid,
                        valid: true
                    });
                    return;
                }
            }}
        />
    );
}

const InputWrapper = React.forwardRef((props, ref) => {
    return (
        <BaseTextInput
            {...props}
            showUnderline={false}
            textInputColor="black"
            ref={ref}
            inputPlaceholderColor="black"
        />
    );
});
