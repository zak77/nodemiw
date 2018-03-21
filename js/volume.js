	var THREE = require('three');
	
	
	function volumeOfT(p1, p2, p3){
    var v321 = p3.x*p2.y*p1.z;
    var v231 = p2.x*p3.y*p1.z;
    var v312 = p3.x*p1.y*p2.z;
    var v132 = p1.x*p3.y*p2.z;
    var v213 = p2.x*p1.y*p3.z;
    var v123 = p1.x*p2.y*p3.z;
    return (-v321 + v231 + v312 - v132 - v213 + v123)/6.0;
}


function calculateVolume(object){
    var volumes = 0.0;
	var Area = 0.0;

    for(var i = 0; i < object.geometry.faces.length; i++){
        var Pi = object.geometry.faces[i].a;
        var Qi = object.geometry.faces[i].b;
        var Ri = object.geometry.faces[i].c;

        var P = new THREE.Vector3(object.geometry.vertices[Pi].x, object.geometry.vertices[Pi].y, object.geometry.vertices[Pi].z);
        var Q = new THREE.Vector3(object.geometry.vertices[Qi].x, object.geometry.vertices[Qi].y, object.geometry.vertices[Qi].z);
        var R = new THREE.Vector3(object.geometry.vertices[Ri].x, object.geometry.vertices[Ri].y, object.geometry.vertices[Ri].z);
        var P1 = new THREE.Vector3();P1.x = P.x;P1.y = P.y;P1.z=P.z;
		var Q1 = new THREE.Vector3();Q1.x = Q.x;Q1.y = Q.y;Q1.z=Q.z;
		var R1 = new THREE.Vector3();R1.x = R.x;R1.y = R.y;R1.z=R.z;
	   volumes += volumeOfT(P, Q, R);
		/*var ab = {X:Q.x-P1.x,Y:Q1.y-P1.y,Z:Q1.z-P1.z};
          var ac = {X:R1.x-P1.x,Y:R1.y-P1.y,Z:P1.z-R1.z};
        var cross = new THREE.Vector3();
	  console.log(P1);
	   cross=crossVectors( ab, ac );
      Area += Math.sqrt(Math.pow(cross.X,2)+Math.pow(cross.Y,2)+Math.pow(cross.Z,2))/2;
      i+=9;*/
    }

    loadedObjectVolume = Math.abs(volumes);
	console.log('volume= '+volumes+'mm3');
	console.log('Sarea= '+Area+' mm3');
	return Math.abs(volumes);
}
				
function customRound(number,fractiondigits){
   with(Math){
      return round(number*pow(10,fractiondigits))/pow(10,fractiondigits);
   }
}	
function SuperficialAreaOfMesh(object) {

 
var Area = 0.0;
var _area =0.0;
var i= 0,vols=0;
   var va,vb,vc;
   //do  {
    for(var i = 0; i < object.geometry.faces.length; i++){
        var Pi = object.geometry.faces[i].a;
        var Qi = object.geometry.faces[i].b;
        var Ri = object.geometry.faces[i].c;

        var P = new THREE.Vector3(object.geometry.vertices[Pi].x, object.geometry.vertices[Pi].y, object.geometry.vertices[Pi].z);
        var Q = new THREE.Vector3(object.geometry.vertices[Qi].x, object.geometry.vertices[Qi].y, object.geometry.vertices[Qi].z);
        var R = new THREE.Vector3(object.geometry.vertices[Ri].x, object.geometry.vertices[Ri].y, object.geometry.vertices[Ri].z);
     
   
      va={X:object.geometry.vertices[Pi].x,Y:object.geometry.vertices[Pi].y,Z:object.geometry.vertices[Pi].z};
      vb={X:object.geometry.vertices[Qi].x,Y:object.geometry.vertices[Qi].y,Z:object.geometry.vertices[Qi].z};
      vc={X:object.geometry.vertices[Ri].x,Y:object.geometry.vertices[Ri].y,Z:object.geometry.vertices[Ri].z};

      var ab = {X:vb.X-va.X,Y:vb.Y-va.Y,Z:vb.Z-va.Z};
         //vb.clone().sub(va); 
		 var ac = {X:vc.X-va.X,Y:vc.Y-va.Y,Z:va.Z-vc.Z};
      //vc.clone().sub(va);  
	  var cross = new THREE.Vector3();
      cross=crossVectors( ab, ac );
      _area += Math.sqrt(Math.pow(cross.X,2)+Math.pow(cross.Y,2)+Math.pow(cross.Z,2))/2;
     // i+=9;
   }
   //while (i<points.length);
   console.log('surface'+_area);
   return customRound(Math.abs(_area),2);

}


 function crossVectors( a, b ) {
   var ax = a.X, ay = a.Y, az = a.Z;
   var bx = b.X, by = b.Y, bz = b.Z;
    var Pz={X:ay * bz - az * by,
          Y:az * bx - ax * bz,
          Z:ax * by - ay * bx}
//console.log(Pz.X,Pz.Y,Pz.Z)
   return Pz;
}	
	module.exports.SuperficialAreaOfMesh = SuperficialAreaOfMesh;
	module.exports.calculateVolume = calculateVolume;