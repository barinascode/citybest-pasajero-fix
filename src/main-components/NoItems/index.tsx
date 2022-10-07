import Image from '@main-components/Image';
import Text from '@main-components/Text';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
`;

const Wrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export interface NoItemsProps {
    image?: any;
    icon?: any;
    title: string;
}

export default function NoItems({ icon, image, title }: NoItemsProps) {
    return (
        <Container>
            <Wrapper>
                {image && (
                    <Image uri={image} style={{ width: 150, height: 150 }} />
                )}
                {icon && !image && icon}
                <Text note align="center" style={{ paddingHorizontal: 20 }}>
                    {title}
                </Text>
            </Wrapper>
        </Container>
    );
}
