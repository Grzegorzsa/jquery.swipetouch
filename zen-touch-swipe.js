/*! Zen Touch-Swipe v 1.00 by Grzegorz Sarzyński | (c) 2015 zen-dev.pl */
(function ( $ ) {
  function timestamp() {
    return new Date().getTime();
  }
  $.fn.zenTouchSwipe = function(input) {
    var el = $(this),
      downX = 0,
      downY = 0,
      touchStarted = false,
      mouseStarted = false,
      downTime = 0,
      upTime = 0,
      touchCoords = false,
      options = {},
      initial = {
        click: blank,
        dblClick: blank,
        tap: blank,
        dblTap: blank,
        swipeLeft: blank,
        swipeRight: blank,
        swipeUp: blank,
        swipeDown: blank,
        threshold: 20,
        scroll: true
      };

    if (swipeActive()) initial.scroll = false;

    options = mergeOptions(initial, input);
    el.on('touchstart',function(ev) {touchStart(ev, this); });
    el.on('touchend',function() { touchEnd(this); });
    el.on('touchmove', touchMoveHandler);
    el.on('mousedown',function(ev) { mouseDown(ev, this); });
    el.on('mouseup',function(ev) { mouseUp(ev, this); });

    function mergeOptions(obj1,obj2){
      var out = {}, attr;
      for (attr in obj1) { out[attr] = obj1[attr]; }
      for (attr in obj2) { out[attr] = obj2[attr]; }
      return out;
    }

    function isDefined(obj) {
      return typeof obj !== "undefined";
    }

    function swipeActive() {
      return isDefined(input.swipeLeft) || isDefined(input.swipeRight) || isDefined(input.swipeDown) || isDefined(input.swipeUp);
    }

    function touchStart(e, that) {
      var offset = $(that).offset();
      touchStarted = true;
      touchCoords = false;
      mouseStarted = false;
      downTime = timestamp();
      downX = parseInt(e.originalEvent.touches[0].clientX - offset.left);
      downY = parseInt(e.originalEvent.touches[0].clientY - offset.top + $(window).scrollTop());
    }

    function touchEnd(that) {
      var offset, x, y, offsetX, offsetY, absOffsetX, absOffsetY;
      var time = timestamp();
      if(touchStarted) {
        if(touchCoords) {
          offset = $(that).offset();
          x = parseInt(touchCoords.clientX  - offset.left);
          y = parseInt(touchCoords.clientY - offset.top + $(window).scrollTop());
          offsetX = downX - x;
          offsetY = downY - y;
          absOffsetX = Math.abs(offsetX);
          absOffsetY = Math.abs(offsetY);
          if (absOffsetX > 2 * absOffsetY) {
            if(offsetX > options.threshold) {
              options.swipeLeft();
            } else if(offsetX < - options.threshold) {
              options.swipeRight();
            }
          } else if (absOffsetY > 2 * absOffsetX) {
            if(offsetY > options.threshold) {
              options.swipeUp();
            } else if(offsetY < - options.threshold) {
              options.swipeDown();
            }
          }
        } else {
          if (time - downTime < 200) {
            if (time < upTime + 300) {
              upTime = 0;
              options.dblTap();
            } else {
              options.tap();
              upTime = time;
            }
          }
        }
      }
    }

    function blank(){};

    function mouseDown(e, that) {
      var offset;
      if(!touchStarted) {
        mouseStarted = true;
        offset = $(that).offset();
        downX = parseInt(e.clientX - offset.left);
        downY = parseInt(e.clientY - offset.top + $(window).scrollTop());
        downTime = timestamp();
      }
    }

    function mouseUp(e, that) {
      var offset, x, y, time = timestamp();
      if(mouseStarted) {
        offset = $(that).offset();
        x = parseInt(e.clientX - offset.left);
        y = parseInt(e.clientY - offset.top + $(window).scrollTop());
        if (x == downX && y == downY || downTime > time - 150) {
          if (time < upTime + 300) {
            upTime = 0;
            options.dblClick();
          } else {
            options.click();
            upTime = time;
          }
        }
      }
    }

    function touchMoveHandler(ev) {
      if (!options.scroll) ev.preventDefault();
      touchCoords = ev.originalEvent.targetTouches[0];
    }
    return this;
  };
  $.fn.zenTouchSwipeStop = function() {
    $(this).off('touchstart touchend touchmove mousedown mouseup');
  }
}( jQuery ));
