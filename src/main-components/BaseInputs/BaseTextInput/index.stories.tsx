import { storiesOf } from '@storybook/react-native';
import React from 'react';
import BaseTextInput from '.';

storiesOf('Input', module)
    .add('default', () => <BaseTextInput placeholder="Hello" />)
    .add('with left icon', () => (
        <BaseTextInput placeholder="Enter your destination" />
    ));
