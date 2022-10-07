import * as React from 'react';
import { Avatar } from 'react-native-paper';

interface AvatarImageProps {
    source: any;
    size?: number;
}

export default function AvatarImage(props: AvatarImageProps) {
    return (
        <Avatar.Image
            theme={{ colors: { primary: 'transparent' } }}
            size={props.size}
            source={props.source}
        />
    );
}

interface AvatarTextProps {
    source: any;
    size?: number;
    label: string;
}

export function AvatarText(props: AvatarTextProps) {
    return <Avatar.Text size={props.size} label={props.label} />;
}
