import Carousel from '../dist/Carousel.min';

// console.log(carousel);
new Carousel('.carousel', {
  imgs: ['a', 'b', 'c', 'd'],
  urls: ['#','#','#','#'],
  draggable: true,
  showBtn: true,
  autoSwipe: true
});