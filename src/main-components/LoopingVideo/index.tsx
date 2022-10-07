import { Video } from 'expo-av';
import { AVPlaybackSource } from 'expo-av/build/AV';
import React, { useEffect } from 'react';

interface LoopingVideoProps {
    source: AVPlaybackSource | undefined;
    style: any;
    resizeMode: 'cover' | 'contain';
}

export default function LoopingVideo(props: LoopingVideoProps) {
    const video = React.useRef<any>(null);

    useEffect(() => {
        video.current?.playAsync();
    }, []);

    return (
        <Video
            ref={video}
            style={props.style}
            source={props.source}
            useNativeControls={false}
            resizeMode={props.resizeMode}
            isLooping
            isMuted
        />
    );
}
