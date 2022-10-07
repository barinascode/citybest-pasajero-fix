import React, { ReactComponentElement } from 'react';
import { FlatList as BaseFlatList } from 'react-native';

interface FlatListProps {
    items: any[];
    renderItem: (params: any) => any;
    contentContainerStyle?: any;
    style?: any;
    ListHeaderComponent?: ReactComponentElement<any>;
    ListEmptyComponent?: ReactComponentElement<any>;
    onScroll?: any;
    keyExtractor?: ((item: any, index: number) => string) | undefined;
}

export default class FlatList extends React.Component<FlatListProps> {
    /*  shouldComponentUpdate(nextProps) {
    return !ArrayUtils.isEqual(
      this.props?.items as any[],
      nextProps?.items as any[]
    );
  }
 */

    render() {
        return (
            <BaseFlatList
                keyExtractor={this.props.keyExtractor}
                contentContainerStyle={this.props.contentContainerStyle}
                style={this.props.style}
                data={this.props.items}
                ListEmptyComponent={this.props.ListEmptyComponent}
                ListHeaderComponent={this.props.ListHeaderComponent}
                renderItem={this.props.renderItem}
                onScroll={this.props.onScroll}
            />
        );
    }
}
