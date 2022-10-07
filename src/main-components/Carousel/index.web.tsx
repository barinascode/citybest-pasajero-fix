import Box from '@main-components/Box';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React, { useEffect, useState } from 'react';
import BaseCarousel from 'react-leaf-carousel';

interface CarouselProps {
    renderItem: any;
    itemWidth: number;
    itemHeight: number;
    sliderWidth: number;
    data: any[];
    loop?: boolean;
    autoplay?: boolean;
    autoplayDelay?: number;
    autoplayInterval?: number;
    showPagination?: boolean;
    itemsInSlide?: number;
    itemsToScroll?: number;
}

export default function Carousel(props: CarouselProps) {
    const [activeSlide, setActiveSlide] = useState(0);
    const theme = useTheme();

    let carousel = null;

    useEffect(() => {
        setActiveSlide(0);
    }, []);

    return (
        <Box>
            <BaseCarousel
                ref={(c) => {
                    carousel = c;
                }}
                /*    sliderWidth={props.sliderWidth}
        layout={"default"}
        itemWidth={props.itemWidth}
        itemHeight={props.itemHeight}
        firstItem={0}
        activeSlideAlignment="start"
        loop={props.loop}
        data={props.data}
        renderItem={props.renderItem}
        autoplay={props.autoplay}
        autoplayInterval={props.autoplayInterval}
        autoplayDelay={props.autoplayDelay}
        onSnapToItem={(index) => setActiveSlide(index)} */
                dots={props.showPagination}
                slidesToShow={props.itemsInSlide || 1}
                sideSize={0.2}
                slidesSpacing={10}
                autoCycle={props.autoplay}
                cycleInterval={props.autoplayInterval}
                slidesToScroll={props.itemsToScroll || 1}
            >
                {props.data.map((item, index) => (
                    <Box>{props.renderItem({ item, index })} </Box>
                ))}
            </BaseCarousel>
            {/*  {props.showPagination && (
        <Pagination
          activeDotIndex={activeSlide}
          dotsLength={props.data.length}
          containerStyle={{ marginTop: -10 }}
          dotStyle={{
            width: 6,
            height: 6,
            borderRadius: 3,
            marginHorizontal: 0,
            backgroundColor: theme.colors.primaryMain,
          }}
          inactiveDotStyle={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: theme.colors.greyMedium,
          }}
          inactiveDotOpacity={0.5}
          inactiveDotScale={1}
        />
      )} */}
        </Box>
    );
}

Carousel.defaultProps = {
    showPagination: true
};
