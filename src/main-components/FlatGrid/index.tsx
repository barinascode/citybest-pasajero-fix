import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { FlatGrid as BaseFlatGrid } from 'react-native-super-grid';

export interface FlatGridProps {
    itemDimension?: number;
    maxDimension?: number;
    staticDimension?: number;
    data: any[];
    renderItem: any;
    spacing?: number;
    scrollEnabled?: boolean;
    contentContainerStyle?: StyleProp<ViewStyle>;
    numColumns?: number;
    ListHeaderComponent?:
        | React.ComponentType<any>
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | null
        | undefined;
    columnWrapperStyle?: StyleProp<ViewStyle>;
    onScroll?: any;
    nestedScrollEnabled?: boolean;
    ListEmptyComponent?:
        | React.ComponentType<any>
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | null
        | undefined;
    itemContainerStyle?: StyleProp<ViewStyle>;
    showsVerticalScrollIndicator?: boolean;
    showsHorizontalScrollIndicator?: boolean;
}

export default class FlatGrid extends React.Component<FlatGridProps> {
    render() {
        return (
            <BaseFlatGrid
                ListEmptyComponent={this.props.ListEmptyComponent}
                ListHeaderComponent={this.props.ListHeaderComponent}
                scrollEnabled={this.props.scrollEnabled}
                nestedScrollEnabled={this.props.nestedScrollEnabled}
                spacing={this.props.spacing}
                itemDimension={this.props.itemDimension}
                maxDimension={this.props.maxDimension}
                staticDimension={this.props.staticDimension}
                data={this.props.data}
                renderItem={this.props.renderItem}
                numColumns={this.props.numColumns}
                contentContainerStyle={this.props.contentContainerStyle}
                columnWrapperStyle={this.props.columnWrapperStyle}
                itemContainerStyle={this.props.itemContainerStyle || {}}
                onScroll={this.props.onScroll}
                showsVerticalScrollIndicator={
                    this.props.showsVerticalScrollIndicator
                }
                showsHorizontalScrollIndicator={
                    this.props.showsHorizontalScrollIndicator
                }
            />
        );
    }
}
