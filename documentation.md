---
title: Mapiator - Documentation
layout: home
---

<h1><a href="http://pdietrich.github.com/mapiator/">Mapiator</a> - Documentation</h1>

Here you will find information on:
* [adding arbitrary (clickable) elements to the map](#elements)
* [creating paths and polygons](#paths_and_polygons)
* [manipulating the map with JavaScript](#programmatical)
* [loading different tiles](#tiles)


<h2 id="elements">Adding DOM elements to the map</h2>

To add a dom element to the map:

{% highlight javascript %}
var element = document.createElement('div');
map.overlayLayer.addElement(element, 48.0, 10.0); // latitude, longitude
{% endhighlight %}

The element will be positioned on the map so that its upper left corner is at the specified geo position.
It will move around with the map.
The element may contain other elements. You can style it with CSS.

Note: The element's "position" css attribute will be set to absolute and the "z-index" will be adjusted by the map.

To make the element clickable use your favorite JavaScript framework or simply do:
{% highlight javascript %}
element.onclick = function(e){
    alert('Ouch! I have been klicked');
};
{% endhighlight %}


<h2 id="paths_and_polygons">Paths and polygons</h2>

Drawing a path:
{% highlight javascript %}
var path = Mapiator.Path( [[50.0, 9.0], [50.0, 12.0], [48.1, 11.6]] );
                          // list of [lat, lng] pairs
map.addElement( path );
{% endhighlight %}

Drawing a polygon:
{% highlight javascript %}
var poly = Mapiator.Polygon( [[50.0, 7.0], [50.0, 10.0], [48.13, 9.57]] );
map.addElement( poly );
{% endhighlight %}

Append further points at the end of a path:
{% highlight javascript %}
path.appendPoint( 51.2, 10.3 ); // lat, lng
{% endhighlight %}

Modify the list of points directly:
{% highlight javascript %}
path.points[1] = [43.0, 12.1]; // lat, lng
{% endhighlight %}

Important: After manipulating a path or a polygon:

{% highlight javascript %}
path.recalc(); // forgetting it may lead to display errors
map.redraw(); // make sure the map displays the updated path
{% endhighlight %}

To draw a path or a polygon from [WKT](http://www.wikipedia.org/WKT) data do:

{% highlight javascript %}
var path = Mapiator.parseWKT( "LINESTRING (9.0 50.0, 12.0 50.0, 11.6 48.1)" );
map.addElement( path );

var poly = Mapiator.parseWKT( "POLYGON (7.0 50.0, 10.0 50.0, 9.57 48.13)" );
map.addElement( poly );
{% endhighlight %}

To style your path or polygon do:

{% highlight javascript %}
path.strokeWidth = 5; // pixels
path.strokeStyle = 'rgba(0, 100, 0, 0.5)'; // YES! transparency is supported!

poly.fillStyle = 'rgba(0, 0, 100, 0.5)';
map.redraw();
{% endhighlight %}


<h2 id="programmatical">Manipulate the map with JavaScript</h2>

Center the map on a specific point:
{% highlight javascript %}
map.setCenter( 53, 10 ); // latitude, longitude
{% endhighlight %}

Moving the map:
{% highlight javascript %}
// move the center of the map 20 pixels west and 30 pixels north:
map.moveByPx( 20, 30 );
{% endhighlight %}

Zooming:
{% highlight javascript %}
// zoom in 1 level:
map.zoomIn(); // the map automatically redraws after this

// zoom out 1 level:
map.zoomOut(); // the map automatically redraws after this

// set a specific zoom level:
map.setZoom( 7 ); // you need to redraw after this

{% endhighlight %}


<h2 id="tiles">Changing the tiles</h2>

To load different tiles you need to write a function which returns the tile url for given x, y and zoom values. E.g.:

{% highlight javascript %}
map.getTileUrl = function(x, y, zoom){
  // return url for Open Street Map tile:
  return 'http://b.tile.openstreetmap.org/'+zoom+'/'+x+'/'+y+'.png';
};
{% endhighlight %}

If you want to learn about how the x, y and zoom values correspond to a position on the map or how tiles
are created I recommend you read this article: <a href="http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/" target="#blank">Tiles à la Google Maps: Coordinates, Tile Bounds and Projection</a>

If you want to draw tiles of a size different from 256x256 you need to tell [Mapiator](http://pdietrich.github.com/mapiator/) about it:
{% highlight javascript %}
map.setTileSizeInPx( 512 );
{% endhighlight %}

You need to redraw afterwards. Usually you would do this before (re)drawing the map the first time.