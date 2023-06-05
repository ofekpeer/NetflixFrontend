import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './List.scss';
import ListItem from '../ListItem/ListItem';

function List({ list }) {
  const responsive = {
    superLargeDesktop5: {
      breakpoint: { max: 4000, min: 2100 },
      items: 9,
    },
    superLargeDesktop4: {
      breakpoint: { max: 2100, min: 1875 },
      items: 8,
    },
    superLargeDesktop3: {
      breakpoint: { max: 1875, min: 1650 },
      items: 6,
    },
    superLargeDesktop2: {
      breakpoint: { max: 1650, min: 1425 },
      items: 5,
    },
    superLargeDesktop: {
      breakpoint: { max: 1425, min: 1200 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1200, min: 900 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 900, min: 676 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 676, min: 0 },
      items: 2,
    },
  };
  return (
    <div className="list">
      <span className="list-title">{list.title}</span>
      <Carousel
        centerMode
        showStatus={false}
        dynamicHeight={false}
        emulateTouch
        swipeScrollTolerance={50}
        centerSlidePercentage={30}
        showThumbs={false}
        infiniteLoop
        showIndicators
        className="carousel"
        responsive={responsive}
        infinite={true}
        swipeable={false}
        draggable={false}
      >
        {list.contents.map((item, i) => (
          <ListItem item={item} key={i}></ListItem>
        ))}
      </Carousel>
    </div>
  );
}

export default List;
