import React from 'react';
import styled from 'styled-components/native';

const Indicator = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 3px;
    border-color: #fff;
    border-width: 1px;
    margin-horizontal: 5px;
    background-color: ${(props: { selected: boolean }) =>
        props.selected ? 'white' : 'transparent'};
`;

const Container = styled.View`
    flex-direction: row;
`;

const PaginationIndicator = (props: any) => {
    const { length, current } = props;

    const _renderItem = (index: number, selected: boolean) => {
        return <Indicator key={index} selected={selected} />;
    };

    const _renderIndicators = () => {
        let indicators = [];
        for (let i = 0; i < length; i++) {
            indicators.push(_renderItem(i, i === current));
        }

        return indicators;
    };

    return <Container>{_renderIndicators()}</Container>;
};

export default PaginationIndicator;
