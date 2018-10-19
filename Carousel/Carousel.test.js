import carousel from './Carousel.min';

// console.log(carousel);
carousel('.carousel', {
  imgs: ['a', 'b', 'c', 'd'],
  urls: ['#','#','#','#'],
  draggable: true,
  showBtn: true,
  autoSwipe: true
});