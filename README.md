# jQuery.swipetouch

Lightweight and high performance jQuery plugin to handle touch, swipe and click events.
The library allows you to handle mouse and touch events independently.

## Usage

$("#my_elem").swipeTouch(handlers/options) - attach event handlers to the element.  
$("#my_elem").swipeTouchStop() - detach event handlers from the element. 


## Example

Attach swipeLeft and swipeRight event handlers to the element with threshold option set to 40px.

```js
$("#my_elem").swipeTouch({
    swipeLeft: function(){alert("Swiped left!!!")},
    swipeRight: function(){alert("Swiped right!!!")},
    threshold:40
})
```

## Available events:

swipeLeft, swipeRight, swipeUp, swipeDown, click, dblClick, tap, dblTap, touchStart, touchEnd, mouseDown, mouseUp

## Available options:

scroll (default: false) - enable page scrolling while swiping an element.  
threshold (default: 20) - min. number of pixels needed for triggering swipe event.

## Download:

[jquery.swipetouch-master.zip](https://github.com/Grzegorzsa/jquery.swipetouch/archive/master.zip)

## Online demo:

[jquery-swipe-touch.zen-dev.pl](http://jquery-swipe-touch.zen-dev.pl/)
