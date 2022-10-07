import Box from '@main-components/Box';
import React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';

const Walkthrough = (props: any) => {
    const { onChanged, children } = props;

    const _renderItem = ({ item }: any) => {
        let { width } = Dimensions.get('window');
        return (
            <Box width={width} flex={1}>
                {item}
            </Box>
        );
    };

    const _onScrollEnd = (e: any) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        if (onChanged) {
            onChanged(pageNum);
        }
    };

    return (
        <FlatList
            style={styles.list}
            data={children}
            onMomentumScrollEnd={_onScrollEnd}
            keyExtractor={(item) => children.indexOf(item).toString()}
            pagingEnabled={true}
            horizontal
            // renderSeparator={() => null}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            directionalLockEnabled
            renderItem={_renderItem}
        ></FlatList>
    );
};

let styles = StyleSheet.create({
    list: {
        flex: 1
    },
    item: {
        flex: 1
    }
});

export default Walkthrough;
