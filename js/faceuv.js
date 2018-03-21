			function faceuvmapper(geo){
  geo.computeBoundingBox(); 
			var max = geo.boundingBox.max,
    min = geo.boundingBox.min;
var offset = new THREE.Vector3(0 - min.x, 0 - min.y,0-min.z);
var range = new THREE.Vector3(max.x - min.x, max.y - min.y,max.z - min.z);
var faces = geo.faces;
var d = 100;
var p =1;
var h = 0.1;
range.x = d;
range.y = d;
range.z = d;
var a = 5;
console.log(max);
			geo.faceVertexUvs[0]= [];

for (var i = 0; i < faces.length ; i++) {
 
    var v1 = geo.vertices[faces[i].a], 
        v2 = geo.vertices[faces[i].b], 
        v3 = geo.vertices[faces[i].c];
		
		//console.log(a+'p'+p);
	
		
	var X; if(Math.abs(v1.x - v2.x) >= Math.abs(v1.x - v3.x)){X = Math.abs(v1.x - v2.x) } else{X = Math.abs(v1.x - v3.x)}
	var Y; if(Math.abs(v1.y - v2.y) >= Math.abs(v1.y - v3.y)){Y = Math.abs(v1.y - v2.y) } else{Y = Math.abs(v1.y - v3.y)}
	var Z; if(Math.abs(v1.z - v2.z) >= Math.abs(v1.z - v3.z)){Z = Math.abs(v1.z - v2.z) } else{Z = Math.abs(v1.z - v3.z)}
	var pl;
	var t; if(X >= Y ){t = Y;pl = 'xz';}else{t = X;pl = 'yz';} if(t >= Z){ t = Z;pl = 'xy';}
		//console.log(v1.x,v2.x,v3.x);

if(pl == 'xy'){geo.faceVertexUvs[0].push([	
		
        new THREE.Vector2(  (v1.x + offset.x)/range.x,(v1.y + offset.y)/range.y),
		new THREE.Vector2((v2.x + offset.x)/range.x ,(v2.y + offset.y)/range.y),
        new THREE.Vector2((v3.x + offset.x)/range.x,(v3.y + offset.y)/range.y)
]); }
	
if(pl == 'yz'){geo.faceVertexUvs[0].push([
        new THREE.Vector2((v1.z + offset.z)/range.z ,(v1.y + offset.y)/range.y),
        new THREE.Vector2((v2.z + offset.z)/range.z ,(v2.y + offset.y)/range.y),
        new THREE.Vector2((v3.z + offset.z)/range.z ,(v3.y + offset.y)/range.y)
]); }
		 
		 if(pl == 'xz'){geo.faceVertexUvs[0].push([
       new THREE.Vector2((v1.z + offset.z)/range.z ,(v1.x + offset.x)/range.x),
        new THREE.Vector2((v2.z + offset.z)/range.z ,(v2.x + offset.x)/range.x),
        new THREE.Vector2((v3.z + offset.z)/range.z ,(v3.x + offset.x)/range.x)
		 ]);
		 }

	
	
}
 geo.uvsNeedUpdate = true;}