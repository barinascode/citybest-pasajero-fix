import React from 'react';
import {
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { BlurView } from 'expo-blur';

const BlurredBackground = ({ onPress }: { onPress?: any }) =>
    Platform.OS === 'ios' ? (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onPress}>
                <BlurView tint="dark" style={styles.blurView} />
            </TouchableWithoutFeedback>
        </View>
    ) : (
        <View style={[styles.container, styles.androidContainer]}>
            <TouchableWithoutFeedback onPress={onPress}>
                <BlurView tint="dark" style={styles.blurView} />
            </TouchableWithoutFeedback>
        </View>
    );

const styles = StyleSheet.create({
    blurView: {
        ...StyleSheet.absoluteFillObject
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        zIndex: 9
    },
    androidContainer: {
        // backgroundColor: "rgba(255,255,255, 0.95)",
    }
});

export default BlurredBackground;
