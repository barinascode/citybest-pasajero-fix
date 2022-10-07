import { storiesOf } from '@storybook/react-native';
import React from 'react';
import BaseCheckboxInput from '.';

storiesOf('Checkbox', module).add('default', () => (
    <BaseCheckboxInput title="Are you sure?" checked />
));
