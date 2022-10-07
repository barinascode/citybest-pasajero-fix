import BaseTextInput from '@main-components/BaseInputs/BaseTextInput';
import React from 'react';
import useInputSearchHandler from '../../../../hooks/useInputSearchHandler';

function RouteInput(props, ref) {
    useInputSearchHandler({ inputName: props.routeKey });

    return (
        <BaseTextInput
            {...props}
            ref={ref}
            showUnderline={false}
            textInputColor="black"
            inputPlaceholderColor="black"
        />
    );
}

export default React.forwardRef(RouteInput);
