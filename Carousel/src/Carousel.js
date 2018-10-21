import './Carousel.css';

(function(window) {
  class Carousel {
    constructor(selector, options) {
      this.el = undefined, 
      this.selector = selector;
      this.div = undefined, 
      this.timer = undefined, 
      this.timer1 = undefined, 
      this.mouseX = undefined, 
      this.config = options,
      this.imgs = [],
      this.cur = 0;
      this.style = {
        overflow: 'hidden'
      };
      this.strategies = {
        style() {
          for (let key in this.style) {
            this.el.style[key] = this.style[key];
          }
        },
        imgs() {
          let fragment = window.document.createDocumentFragment();
          this.div = window.document.createElement('div');
          this.config.imgs.unshift(this.config.imgs[this.config.imgs.length - 1]);
          this.config.imgs.push(this.config.imgs[1]);
          this.config.imgs.forEach((img, i) => {
            let imgEl = window.document.createElement('img');
            if (i < 3) imgEl.src = img;
            fragment.appendChild(imgEl);
            imgEl.style.width = this.el.offsetWidth + 'px';
            imgEl.style.height = '100%';
            imgEl.style.float = 'left';
            imgEl.draggable = false;
            this.imgs.push(imgEl);
          });
          this.div.appendChild(fragment);
          this.el.appendChild(this.div);
          this.div.style.height = '100%';
          this.div.style.width = this.el.offsetWidth * this.config['imgs'].length + 'px';
        },
        draggable() {
          if (this.config.draggable) this.attachSwipeEvent();
        },
        showBtn() {
          if(!this.config.showBtn) {
            let nodes = window.document.querySelectorAll('.carousel-left, .carousel-right');
            for (let i=0; i<nodes.length; i++) {
              nodes[i].style.display = 'none';
            }
          } else {
            this.attachBtnEvent();
          }
        },
        urls() {
          let that = this;that
          if (this.config.urls instanceof Array) {
            if (this.config.urls.length !== this.imgs.length - 2) throw new TypeError('urls 配置项的长度必须与图片数量相匹配！')
            else {
              this.imgs.forEach((img, i) => {
                if (i === 0 || i === this.imgs.length - 1) return;
                this.imgs[i].addEventListener('mouseup', function(e) {
                  if (e.clientX === that.mouseX) window.open(that.config.urls[i]);
                });
              });
            }
          }
        },
        timeDuration() {
          this.config.timeDuration = this.config.timeDuration === void 0 ? 2000 : this.config.timeDuration;
          // div.style.transition = 'unset';
          this.div.style.transition = `all ${(+this.config.timeDuration) / 1000}s`;
        },
        // ...
        autoSwipe() {
          if (this.config.autoSwipe) this.setAuto();
        },
        hideBtn() {
          if (!this.config.hideBtn) {
            window.document.querySelector('.carousel-left').style.marginLeft = '-15px';
            window.document.querySelector('.carousel-right').style.marginRight = '-15px';
          }
        }
      };
      this.carousel(selector, options);
    }
    carousel(selector, options) {
      var nodes = window.document.querySelectorAll(selector);
      if (nodes.length !== 1) {
        throw new TypeError('Invalid selector!');
      } else {
        this.el = nodes[0];
        while (this.el.firstChild) {
          this.el.removeChild(this.el.firstChild);
        }
        this.el.className = this.el.className + " carousel";
        this.el.innerHTML = [
          '<div class="carousel-left"></div>',
          '<div class="carousel-right"></div>'
        ].join('');
        for (let key in this.style) {
          this.el.style[key] = this.style[key];
        }
        for (let key in this.strategies) {
          this.strategies[key].call(this);
        }
        this.lazyLoad(options.imgs);
      }
    }
    setOptions(options) {
      this.config = options;
      window.clearInterval(this.timer);
      window.clearTimeout(this.timer1);
      this.el = undefined, 
      this.div = undefined, 
      this.timer = undefined, 
      this.timer1 = undefined, 
      this.mouseX = undefined, 
      this.config = options,
      this.imgs = [],
      this.cur = 0;
      this.carousel(this.selector, options);
    }
    attachBtnEvent() {
      let that = this;
      window.document.querySelector('.carousel-left').addEventListener('click', function() {
        window.clearInterval(that.timer);
        that.goPrev();
        if (that.config.autoSwipe) that.timer1 = window.setTimeout(that.setAuto, that.config.timeDuration);
      });
      window.document.querySelector('.carousel-right').addEventListener('click', function() {
        window.clearInterval(that.timer);
        that.goNext();
        if (that.config.autoSwipe) that.timer1 = window.setTimeout(that.setAuto, that.config.timeDuration);
      });
    }
    attachSwipeEvent() {
      this.div.addEventListener('mousedown', this.swipeStart.bind(this));
      this.div.addEventListener('mouseup', this.swipeEnd.bind(this));
      if (this.config.hideBtn) {
        this.div.addEventListener('mouseover', function() {
          window.document.querySelector('.carousel-left').style.marginLeft = '-15px';
          window.document.querySelector('.carousel-right').style.marginRight = '-15px';
        });
        this.div.addEventListener('mouseleave', function() {
          window.setTimeout(function() {
            window.document.querySelector('.carousel-left').style.marginLeft = '-70px';
            window.document.querySelector('.carousel-right').style.marginRight = '-70px';
          }, 2000);
        });
      }
    }
    goPrev() {
      let that = this;
      if (this.cur > 1) {
        this.cur--;
        this.div.style.transform = `translateX(-${this.cur*this.el.offsetWidth}px)`;
      } else {
        this.cur = this.imgs.length - 2;
        this.div.style.transition = "all 0s";
        this.div.style.transform = `translateX(-${this.cur*this.el.offsetWidth}px)`;
        window.setTimeout(function() {
          that.div.style.transition = `all ${+(that.config.timeDuration) / 1000}s`;
          if (that.config.autoSwipe) that.setAuto();
        }, 100);
      }
    }
    goNext() {
      let that = this;
      if (this.cur < this.imgs.length - 2) {
        this.cur++;
        this.div.style.transform = `translateX(-${this.cur*this.el.offsetWidth}px)`;
      } else {
        this.cur = 0;
        this.div.style.transition = 'all 0s';
        this.div.style.transform = `translateX(0px)`;
        window.setTimeout(function() {
          that.div.style.transition = 'all ' + that.config.timeDuration/1000 + 's';
          if (that.config.autoSwipe) {
            that.setAuto();
            that.goNext();
          }
        }, 100);
      }
    }
    swipeStart(e) {
      this.mouseX = e.clientX;
      window.clearInterval(this.timer);
    }
    swipeEnd(e) {
      if (e.clientX - this.mouseX < 0) {
        this.goNext();
      } else if (e.clientX - this.mouseX > 0) {
        this.goPrev();
      }
      if (this.config.autoSwipe) this.setAuto();
    }
    lazyLoad(imgUrls) {
      if (this.imgs.length > 3) {
        for (let i=3; i < this.imgs.length; i++) {
          this.imgs[i].src = imgUrls[i];
        }
      }
    }
    setAuto() {
      let that = this;
      window.clearTimeout(this.timer1);
      window.clearInterval(this.timer);
      this.timer = window.setInterval(function() {
        that.goNext();
      }, that.config.timeDuration);
    }
  }
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = Carousel;
    }
    exports.Carousel = Carousel;
  } else {
    window.Carousel = Carousel;
  }
})(window)
