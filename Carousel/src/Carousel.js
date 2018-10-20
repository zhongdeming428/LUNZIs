import './Carousel.css';

(function(window) {
  var el, div, timer, timer1, mouseX, config,
    imgs = [],
    cur = 0;
  var style = {
    overflow: 'hidden'
  };
  // Strategy 
  var strategies = {
    style() {
      for (let key in config[style]) {
        el.style[key] = config[style][key];
      }
    },
    imgs() {
      var fragment = window.document.createDocumentFragment();
      div = window.document.createElement('div');
      config.imgs.unshift(config.imgs[config.imgs.length - 1]);
      config.imgs.push(config.imgs[1]);
      config.imgs.forEach((img, i) => {
        let imgEl = window.document.createElement('img');
        if (i < 3) imgEl.src = img;
        fragment.appendChild(imgEl);
        imgEl.style.width = el.offsetWidth + 'px';
        imgEl.style.height = '100%';
        imgEl.style.float = 'left';
        imgEl.draggable = false;
        imgs.push(imgEl);
      });
      div.appendChild(fragment);
      el.appendChild(div);
      div.style.height = '100%';
      div.style.width = el.offsetWidth * config['imgs'].length + 'px';
    },
    draggable() {
      if (config.draggable) attachSwipeEvent();
    },
    showBtn() {
      if(!config.showBtn) {
        let nodes = window.document.querySelectorAll('.carousel-left, .carousel-right');
        for (let i=0; i<nodes.length; i++) {
          nodes[i].style.display = 'none';
        }
      } else {
        attachBtnEvent();
      }
    },
    urls() {
      if (config.urls instanceof Array) {
        if (config.urls.length !== imgs.length - 2) throw new TypeError('urls 配置项的长度必须与图片数量相匹配！')
        else {
          imgs.forEach((img, i) => {
            if (i === 0 || i === imgs.length - 1) return;
            imgs[i].addEventListener('mouseup', function(e) {
              if (e.clientX === mouseX) window.open(config.urls[i]);
            });
          });
        }
      }
    },
    timeDuration() {
      config.timeDuration = config.timeDuration === void 0 ? 2000 : config.timeDuration;
      // div.style.transition = 'unset';
      div.style.transition = `all ${(+config.timeDuration) / 1000}s`;
    },
    // ...
    autoSwipe() {
      if (config.autoSwipe) setAuto();
    }
  };
  function carousel(selector, options) {
    config = options;
    var nodes = window.document.querySelectorAll(selector);
    if (nodes.length !== 1) {
      throw new TypeError('Invalid selector!');
    } else {
      el = nodes[0];
      el.innerHTML = [
        '<div class="carousel-left"></div>',
        '<div class="carousel-right"></div>'
      ].join('');
      for (let key in style) {
        el.style[key] = style[key];
      }
      for (let key in strategies) {
        strategies[key]();
      }
      lazyLoad(options.imgs);
    }
  }
  function attachBtnEvent() {
    window.document.querySelector('.carousel-left').addEventListener('click', function() {
      window.clearInterval(timer);
      goPrev();
      if (config.autoSwipe) timer1 = window.setTimeout(setAuto, config.timeDuration);
    });
    window.document.querySelector('.carousel-right').addEventListener('click', function() {
      window.clearInterval(timer);
      goNext();
      if (config.autoSwipe) timer1 = window.setTimeout(setAuto, config.timeDuration);
    });
  }
  function attachSwipeEvent() {
    div.addEventListener('mousedown', swipeStart);
    div.addEventListener('mouseup', swipeEnd);
  }
  function goPrev() {
    if (cur > 1) {
      cur--;
      div.style.transform = `translateX(-${cur*el.offsetWidth}px)`;
    } else {
      cur = imgs.length - 2;
      div.style.transition = "all 0s";
      div.style.transform = `translateX(-${cur*el.offsetWidth}px)`;
      window.setTimeout(function() {
        div.style.transition = `all ${+(config.timeDuration) / 1000}s`;
        if (config.autoSwipe) setAuto();
      }, 100);
    }
  }
  function goNext() {
    if (cur < imgs.length - 2) {
      cur++;
      div.style.transform = `translateX(-${cur*el.offsetWidth}px)`;
    } else {
      cur = 0;
      div.style.transition = 'all 0s';
      div.style.transform = `translateX(0px)`;
      window.setTimeout(function() {
        div.style.transition = 'all ' + config.timeDuration/1000 + 's';
        if (config.autoSwipe) setAuto();
      }, 100);
    }
  }
  function swipeStart(e) {
    mouseX = e.clientX;
    window.clearInterval(timer);
  }
  function swipeEnd(e) {
    if (e.clientX - mouseX < 0) {
      goNext();
    } else if (e.clientX - mouseX > 0) {
      goPrev();
    }
    if (config.autoSwipe) setAuto();
  }
  function lazyLoad(imgUrls) {
    if (imgs.length > 3) {
      for (let i=3; i < imgs.length; i++) {
        imgs[i].src = imgUrls[i];
      }
    }
  }
  function setAuto() {
    window.clearTimeout(timer1);
    window.clearInterval(timer);
    timer = window.setInterval(function() {
      goNext();
    }, config.timeDuration);
  }
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = carousel;
    }
    exports.carousel = carousel;
  } else {
    window.carousel = carousel;
  }
})(window)