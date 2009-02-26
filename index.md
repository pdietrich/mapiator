---
title: Mapiator
layout: home
---

Welcome to Mapiator
====================

What is Mapiator?
------------------

Mapiator is a online mapping application like <a href="http://maps.google.com">Google Maps</a> or
<a href="http://openlayers.org">Openlayers</a>. You can use it without any charge.

It was created by Patrick Dietrich in February 2009.

Try it:

<div id="map" style="width:660px; height:300px; position:relative; margin-left:50px;">
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

* it can be used with a wide range of different map tiles, e.g. with <a href="http://www.openstreetmap.org/">Open Street Map</a>
* it can be moved around with the mouse (panning, except for IE6) and zoomed in and out
* it can draw your paths and polygons (currently not in IE, yet)
* you can attach any DOM element to a fixed geo position (latitute and longitude) on the map (e.g. to add a marker)
* it has a clean and simple JavaScript API
* it is very small (only about 500 lines of JavaScript code)
* it runs on standard conform browsers including inlcuding Firefox, Safari (also on iPhone) and Google Chrome
* it can read WKT strings from geo databases like PostGIS to display paths and polygons

What features are missing?
------------------------------

* drawing paths and polygons does not work in IE, yet
* moving the map with the mouse (panning), does not work in IE6, yet
* wrapping the map at the date border is not implemented, yet


What technologies are used for the Mapiator
-----------------------------------------------

* paths and polygons are drawn using Canvas tiles (i.e. tiles are built from Canvas elements which can be moved around like map tiles to avoid unnecessary drawing).

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

To draw a path or a polygon from WKT data do:

{% highlight html %}
<script type="text/javascript" src="WKTParser.js"></script>
{% endhighlight %}

<div><br /></div>

{% highlight javascript %}
var path = WKTParser.parse( "LINESTRING (9.0 50.0, 12.0 50.0, 11.5756 48.1371)" );
map.addElement( path );

var poly = WKTParser.parse( "POLYGON (7 50, 10 50, 9.5756 48.1371)" );
map.addElement( poly );
{% endhighlight %}

To style your path or polygon do:

{% highlight javascript %}
path.strokeWidth = 10; // pixels
path.strokeStyle = 'rgba(0, 100, 0, 0.5)'; // YES! transparency is supported!

poly.fillStyle = 'rgba(0, 0, 100, 0.5)';
{% endhighlight %}


{% include mapiator_js.html %}



























