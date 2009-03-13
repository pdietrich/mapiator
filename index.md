---
title: Mapiator - the straight forward online mapping application
layout: home
---

<h1>
	<a href="http://pdietrich.github.com/mapiator/">
		Mapiator
		<span class="subtitle">the straight forward online mapping application</span>
	</a>
</h1>

What is Mapiator?
------------------

Mapiator is an online mapping application like <a href="http://maps.google.com">Google Maps</a> or
<a href="http://openlayers.org">Openlayers</a>. You can use it without any charge. It was created by Patrick Dietrich in February 2009.

Try it:

<div id="map">
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

* it runs in most modern Browsers including Firefox, IE6, IE7, Safari and Google Chrome
* it runs on the iPhone (zooming by pinching fingers) - Try this page on you iPhone!
* it can be moved around with the mouse ("panning") and zoomed in and out
* it can draw paths and polygons
* you can attach any DOM element to a fixed geo position (latitute and longitude) on the map (e.g. to add a marker)
* it has a clean and simple JavaScript API
* it is very small (only about 600 lines of JavaScript code uncompressed)
* it can be used with a wide range of different map tiles, e.g. with <a href="http://www.openstreetmap.org/">Open Street Map</a> or the really great ones from <a href="http://www.maps-for-free.com/">maps-for-free.com</a>
* it can read WKT strings from geo databases like <a href="http://postgis.refractions.net/">PostGIS</a> to display paths and polygons

What features are missing?
------------------------------

* wrapping the map at the date border is not implemented, yet
* zoom level 0 and 1 (the ones zoomed out furthest) are not as nice, yet


What technologies are used for the Mapiator
-----------------------------------------------

* paths and polygons are drawn using Canvas tiles (i.e. tiles are built from Canvas elements which can be moved around like map tiles to avoid unnecessary drawing).
* the rest is just DOM magic

Read more...
-------------

* on [adding arbitrary (clickable) elements to the map](documentation.html#elements)
* on [creating paths and polygons](documentation.html#paths_and_polygons)
* on [manipulating the map with JavaScript](documentation.html#programmatical)
* on [loading different tiles](documentation.html#tiles)

{% include iphone_js.html %}
{% include mapiator_js.html %}




























