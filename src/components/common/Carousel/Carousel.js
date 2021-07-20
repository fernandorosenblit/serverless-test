import React, { useEffect, createRef, isValidElement } from 'react';
import { arrayOf, node, object, string } from 'prop-types';
import Slider from 'react-slick';
import { useIntl } from 'react-intl';

import { CAROUSEL_THRESHOLD } from 'constants/constants';

let firstClientX;
let clientX;

function getValidChildren(children) {
  return React.Children.toArray(children).filter(child => isValidElement(child));
}

const preventTouch = e => {
  // threshold
  const minValue = CAROUSEL_THRESHOLD;

  clientX = e.touches[0].clientX - firstClientX;

  // Vertical scrolling does not work when you start swiping horizontally.
  if (Math.abs(clientX) > minValue && e.cancelable) {
    e.returnValue = false;

    return false;
  }
};

const touchStart = e => {
  firstClientX = e.touches[0].clientX;
};

const shouldShowDot = (index, slidesToShow, totalItems) => {
  if (index % slidesToShow === 0) return true;
  if (totalItems % slidesToShow !== 0) return index === totalItems - slidesToShow;
};

const Carousel = ({ children, carouselSettings, className }) => {
  const intl = useIntl();
  const containerRef = createRef();

  const { customPaging, disableHollywoodPaging, slidesToShow } = carouselSettings;

  const hollywoodPaging = disableHollywoodPaging
    ? customPaging
    : index =>
        shouldShowDot(index, slidesToShow, getValidChildren(children).length) ? (
          <span
            role="button"
            aria-label={intl.formatMessage({ id: 'common.carouselScrollTo' }, { slide: index })}
            className="slick-custom-dot"
          >
            <span className="slick-custom-line" />
          </span>
        ) : (
          <></>
        );

  carouselSettings = { ...carouselSettings, customPaging: hollywoodPaging };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('touchstart', touchStart);
      containerRef.current.addEventListener('touchmove', preventTouch, {
        passive: false
      });
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('touchstart', touchStart);
        containerRef.current.removeEventListener('touchmove', preventTouch, {
          passive: false
        });
      }
    };
  });

  return (
    <div ref={containerRef}>
      <Slider className={className} {...carouselSettings}>
        {children}
      </Slider>
    </div>
  );
};

Carousel.propTypes = {
  children: arrayOf(node),
  carouselSettings: object.isRequired,
  className: string
};

export default Carousel;
