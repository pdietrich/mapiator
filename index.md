---
title: Mapiator
layout: home
---

Welcome to Mapiator
====================

What is Mapiator?
------------------

Mapiator is a online mapping application like <a href="http://maps.google.com">Google Maps</a> or
<a href="http://openlayers.org">Openlayers</a>. You can use it without any charge. It was created by Patrick Dietrich in February 2009.

Try it:

<div id="map" style="width:760px; height:350px; position:relative;">
</div>


How can I use Mapiator in my site or web application?
--------------------------------------------------------

In your page add a div element to contain the map:
{% highlight html %}
<script type="text/javascript" src="Mapiator.js"></script>
...
<div id="map" style="width:400px; height:300px; position:relative"></div>
{% endhighlight %}

Then in your javascript do:
{% highlight javascript %}
var map = new Mapiator.Map('map');
map.setZoomLevel( 6 );
map.setCenter(48.0, 10.0); // latitude, longitude
map.redraw();
{% endhighlight %}

That's what you need to set it up.


What are Mapiator's main featues?
-----------------------------------

* it can be used with a wide range of different map tiles, e.g. with <a href="http://www.openstreetmap.org/">Open Street Map</a> or the really great ones from <a href="http://www.maps-for-free.com/">maps-for-free.com</a>
* it can be moved around with the mouse ("panning", except in IE6) and zoomed in and out
* it can draw your paths and polygons (currently not in IE, yet)
* you can attach any DOM element to a fixed geo position (latitute and longitude) on the map (e.g. to add a marker)
* it has a clean and simple JavaScript API
* it is very small (only about 600 lines of JavaScript code)
* it runs on standard conform browsers including Firefox, Safari (also on iPhone) and Google Chrome
* it can read WKT strings from geo databases like <a href="http://postgis.refractions.net/">PostGIS</a> to display paths and polygons

What features are missing?
------------------------------

* drawing paths and polygons does not work in IE, yet
* moving the map with the mouse ("panning"), does not work in IE6, yet
* wrapping the map at the date border is not implemented, yet
* zoom level 0 and 1 (the ones zoomed out furthest) are not as nice, yet


What technologies are used for the Mapiator
-----------------------------------------------

* paths and polygons are drawn using Canvas tiles (i.e. tiles are built from Canvas elements which can be moved around like map tiles to avoid unnecessary drawing).
* the rest is just standard DOM magic

Adding (clickable) elements to the map
-------------------------------------------

To add a dom element to the map:

{% highlight javascript %}
var element = document.createElement('div');
map.overlayLayer.addElement(element, 48.0, 10.0); // latitude, longitude
{% endhighlight %}

The element will be positioned on the map so that its upper left corner is at the specified geo position.
The element may contain other elements. You can style the element with CSS.

Note: The element's "position" css attribute will be set to absolute and the "z-index" will be adjusted by the map.

To make the element clickable use your favorite JavaScript framework or simply do:
{% highlight javascript %}
element.addEventListener('click', function(e){
	alert('Ouch! I have been klicked');
});
{% endhighlight %}

Drawing paths and polygons
----------------------------

{% highlight javascript %}
var path = Mapiator.Path( [[50.0, 9.0], [50.0, 12.0], [48.1, 11.6]] );
                          // list of [lat, lng] pairs
map.addElement( path );

var poly = Mapiator.Polygon( [[50.0, 7.0], [50.0, 10.0], [48.13, 9.57]] );
map.addElement( poly );
{% endhighlight %}

You can append further points at the end of a path:

{% highlight javascript %}
path.appendPoint( 51.2, 10.3 ); // lat, lng
map.redraw(); // make sure the map displayes the updated path
{% endhighlight %}

Or modify the list of points directly:

{% highlight javascript %}
path.points[1] = [43.0, 12.1]; // lat, lng
path.recalc(); // always do this! forgetting it may leed to display errors
map.redraw();
{% endhighlight %}


To draw a path or a polygon from WKT data do:

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

Changing the tiles
-------------------

To load different tiles you need to write a function which returns the tile url for given x, y and zoom values. E.g.:

{% highlight javascript %}
map.getTileUrl = function(x, y, zoom){
  // return url for Open Street Map tile:
  return 'http://b.tile.openstreetmap.org/'+zoom+'/'+x+'/'+y+'.png';
};
{% endhighlight %}

If you want to learn about how the x, y and zoom values correspond to a position on the map or how tiles
are created I recommend you read this article:

<a href="http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/">Tiles à la Google Maps: Coordinates, Tile Bounds and Projection</a>


{% include mapiator_js.html %}



























