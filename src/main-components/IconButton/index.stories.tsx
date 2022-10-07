import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import IconButton from '.';

storiesOf('IconButton', module).add('default', () => (
    <IconButton
        borderRadius="s"
        onPress={action('tapped-default')}
        iconType="material"
        iconName="g-translate"
    />
));
