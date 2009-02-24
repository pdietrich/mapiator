var WKTParser = new (function(){
	
	var nextID = 1;
	
    var Point = function( lat,lng ) {
		this['id'] = nextID++;
        this.lat = lat;
        this.lng = lng;
    };
	Point.prototype = {type:'POINT'};
    
	var PathOrPolygon = function( points ) {
		this['id'] = nextID++;
        this.points = points || [];
		this.appendPoint = function( lat, lng ) {
			this.points[this.points.length] = [lat,lng];
		};
		this.recalc = function() {
			this.projectedPoints = [];
			var l,t,r,b;
			var p = this.points;
			for(var i=0; i < p.length; ++i){
				var pp = this.projectedPoints[i] = Mapiator.util.project(p[i][0], p[i][1]);
				l = (l && l<pp[0]) ? l : pp[0];
				t = (t && t<pp[1]) ? t : pp[1];
				r = (r && r>pp[0]) ? r : pp[0];
				b = (b && b>pp[1]) ? b : pp[1];				
			}
			this.bbLeft = l;
			this.bbTop = t;
			this.bbRight = r;
			this.bbBottom = b;
			// console.log('l=',l,'t=',t,'r=',r,'b=',b);
		};
		// this.mapPoints = function( callback ) {
		// 	var res = [];
		// 	var p = this.points;
		// 	for(var i=0; i < p.length; ++i)
		// 		res[i] = callback(p[i][0], p[i][1], i);
		// 	return res;
		// };
		// this.eachPoint = this.mapPoints;
    };
	PathOrPolygon.prototype = {
		strokeStyle: "rgba(0,0,0, 1.0)",
		fillStyle: "rgba(0,0,0, 1.0)",
		strokeWidth: 2.0
	};

    regex = {
        point: /^\s*POINT\s*\(\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*\)\s*$/i, // POINT (11.5757639569603175 48.1365236143369373)
        lineString: /^LINESTRING\s*\((.*)\)\s*$/i, // LINESTRING (11.5752 48.1372, 11.5750 48.1376, 11.5756 48.1371)
		polygon: /^POLYGON\s*\((.*)\)\s*$/i // POLYGON (11.5752 48.1372, 11.5750 48.1376, 11.5756 48.1371)
    };
    this.parse = function( wkt ) {
		var m;
        if( m = regex.point.exec( wkt ) ){
            return new Point( parseFloat(m[2]), parseFloat(m[1]) );
        }
        else {
			var p;
			if( m = regex.lineString.exec( wkt ) ){
				p = new PathOrPolygon();
				p.type = 'Path';
	        }
			else if( m = regex.polygon.exec( wkt ) ){
				p = new PathOrPolygon();
				p.type = 'Polygon';
			}
			else return null;
			
			var pointStrings = m[1].split(/\s*,\s*/);
			Mapiator.util.forEach( pointStrings, function(ps){
				var m2;
				if( m2 = /^\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*$/.exec(ps) )
					p.appendPoint( parseFloat(m2[2]), parseFloat(m2[1]) );
			});
			p.recalc();
			return p;
		}
    };
})();