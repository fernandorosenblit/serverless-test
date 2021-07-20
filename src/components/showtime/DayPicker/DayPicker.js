import React from 'react';
import { string, func, arrayOf, object } from 'prop-types';
import cn from 'classnames';

import { useStdMediaQuery } from 'hooks';
import Carousel from 'components/common/Carousel/Carousel';
import SliderArrow from 'components/common/Carousel/SliderArrow/SliderArrow';
import DayCard from './DayCard';

const DayPicker = ({ className, handleClick, options = [], selectedDay }) => {
  const { isLarge } = useStdMediaQuery();
  const numberOfSlides = isLarge ? 6 : 5;

  const carouselSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: numberOfSlides,
    slidesToScroll: numberOfSlides,
    swipeToSlide: true,
    nextArrow: <SliderArrow customClassName="day-picker__arrow day-picker__arrow--right" />,
    prevArrow: <SliderArrow customClassName="day-picker__arrow day-picker__arrow--left" previous />
  };

  return (
    <div className={cn('day-picker', className)}>
      <Carousel carouselSettings={carouselSettings}>
        {options.map(({ time }) => (
          <DayCard
            key={`${time}-${selectedDay}`}
            time={time}
            isSelected={selectedDay === time}
            onClick={() => handleClick(time)}
          />
        ))}
      </Carousel>
    </div>
  );
};

DayPicker.propTypes = {
  className: string,
  handleClick: func.isRequired,
  options: arrayOf(object),
  selectedDay: string
};

export default DayPicker;
