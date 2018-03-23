/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START app]
//var mysql = require('mysql');
const express = require('express');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var data,namear =[];
const app = express();
var fs = require('fs');
var THREE = require('three');
var request = require('request');
//var StlExporter = require(__dirname+'/js/STLExporter.js');
//var NodeStl = require('./js/nodestl.js');

//console.log(NodeStl);
var Volume = 0;
var wl,ht,b;
var router = express.Router();
var stl;

var model = 'https://myindustryworld.com/z/designs/100000027files/10000002720180202Super_Mario_Question_Block_Switch_Case.stl';

 var camera, scene1, renderer,u1,layht,controls,pgcd,gcodes = [],dne = 0,lval,efac = 30,
            geometry, material, mesh, light1, stats,points,line2 =[],pattern,printer;
var geom = new THREE.Geometry();
           var si = 0.3,pd = 5,exd = 0.3,sia = 0.2;
var ar = 1; 
			var wl; var gg;var g=0;var lt = 0.2;
			var wr;
var hb;
var b,kmax;
var an = 0;
var z = 0;
var dataimg;
var ln = 0;
function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}

function boundbox(geo){
				if(geo.boundingBox === null ) geo.computeBoundingBox ();
				geo.computeBoundingBox();
				var box = geo.BoundingBox;
				//console.log( geo.boundingBox.max.x-geo.boundingBox.min.x,geo.boundingBox.max.y-geo.boundingBox.min.y,geo.boundingBox.max.z-geo.boundingBox.min.z );
            wl = geo.boundingBox.max.x-geo.boundingBox.min.x;
			ht = geo.boundingBox.max.z-geo.boundingBox.min.z;
			b = geo.boundingBox.max.y-geo.boundingBox.min.y;
							}
///////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////

var volume = require('./js/volume.js');

var exabs = 80,bedabs = 230,expla = 60,bedpla = 200;var exmat = exabs,bedmat = bedabs;

	
	 
function tevoHeader(layerno,extlen){
	if(matrl == 1){exmat = exabs;bedmat= bedabs;}
	if(matrl == 2){exmat = expla;bedmat= bedpla;}
	//alert(layerno,extlen);
var htevo =';FLAVOR:Marlin \n\
;TIME:20981\n\
;Filament used: '+extlen+'m\n\
;Layer height: 0.2\n\
;Layer count: '+layerno+'\nM106 S255\n\
;Generated with Cura_SteamEngine 3.0.4\n\
M190 '+exmat+'\n\
M104 '+bedmat+'\n\
M109 '+bedmat+'\n\
M82 ; absolute extrusion mode\n\
G21 ;metric values\n\
G90 ;absolute positioning\n\
M82 ;set extruder to absolute mode\n\
M107 ;start with the fan off\n\
G28 X0 Y0 ;move X/Y to min endstops\n\
G28 Z0 ;move Z to min endstops\n\
G1 Z15.0 F9000 ;move the platform down 15mm\n\
G92 E0 ;zero the extruded length\n\
G1 F200 E3 ;extrude 3mm of feed stock\n\
G92 E0 ;zero the extruded length again\n\
G1 F9000\n\
;Put printing message on LCD screen\n\
M117 Printing...\n';
return htevo;
}
function tevoLower(){
var ltevo ='G1 F1500\n\
M107\n\
M104 S0 ;extruder heater off\n\
M140 S0 ;heated bed heater off (if you have it)\n\
G91 ;relative positioning\n\
G1 E-1 F300  ;retract the filament a bit before lifting the nozzle, to release some of the pressure\n\
G1 Z+0.5 E-5 X-20 Y-20 F9000 ;move Z up a bit and retract filament even more\n\
G28 X0 Y0 ;move X/Y to min endstops, so the head is out of the way\n\
M84 ;steppers off\n\
G90 ;absolute positioning\n\
G1 Y200 F3600 ;move baseplate to front for easier access to printed object\n\
M82 ; absolute extrusion mode\n\
M104 S0\n';
return ltevo;
}
/////////////////////////Maker bot//////////////////////////////////////////////////////////////////
function makerHeader(layerno,extlen){
	if(matrl == 1){exmat = exabs;bedmat= bedabs;}
	if(matrl == 2){exmat = expla;bedmat= bedpla;}
var hmakerbot =';FLAVOR:Marlin\n\
;TIME:18846\n\
;Filament used: '+extlen+'m\n\
;Layer height: '+sia+'\n\
;Generated with Cura_SteamEngine 3.0.4\n\
M190 S'+exmat+'\n\
M104 S'+bedmat+'\n\
M109 S'+bedmat+'\n\
M82 ; absolute extrusion mode\n\
G28 ;Home\n\
G1 Z15.0 F6000 ;Move the platform down 15mm\n\
;Prime the extruder\n\
G92 E0\n\
G1 F200 E3\n\
G92 E0\n\
;LAYER_COUNT:388\n';
return hmakerbot;
}
function makerFooter(){
var lmakerbot ='M107\n\
M104 S0\n\
M140 S0\n\
;Retract the filament\n\
G92 E1\n\
G1 E-1 F300\n\
G28 X0 Y0\n\
M84\n\
M82 ; absolute extrusion mode\n\
M104 S0\n';
return lmakerbot;
}

//--------------------------CR10-----------------------------------
var hcr10 = ';FLAVOR:Marlin\n\
;TIME:439\n\
;Filament used: 0.228272m\n\
;Layer height: 0.2\n\
;Generated with Cura_SteamEngine 3.0.4\n\
M190 S60\n\
M104 S200\n\
M109 S200\n\
M82 ; absolute extrusion mode\n\
G21 ;metric values\n\
G90 ;absolute Positioning\n\
G28 ; home all axes\n\
G1 Z5 F3000 ; lift\n\
G1 X20 Y2 F1500 ; avoid binder clips\n\
G1 Z0.2 F3000 ; get ready to prime\n\
G92 E0 ; reset extrusion distance\n\
G1 X120 E10 F600 ; prime nozzle\n\
G1 X150 F5000 ; quick wipe\n';
var lcr10 =';TIME_ELAPSED:439.725140\n\
G1 F2400 E223.27234\n\
M204 S4000\n\
M205 X20 Y20\n\
M107\n\
G91\n\
G1 F1800 E-3\n\
G1 F3000 Z10\n\
G90\n\
G28 X0 Y0 ; home x and y axis\n\
M106 S0 ; turn off cooling fan\n\
M104 S0 ; turn off extruder\n\
M140 S0 ; turn off bed\n\
M84 ; disable motors\n\
M82 ; absolute extrusion mode\n\
M104 S0\n';

////////////////////////////////////////////////////////////GC////////////////////////////////////////////////////////////////////////////////

  /* var Nstl = new NodeStl(body);
   var geom = Nstl.Geometry;*/
   function slicer(geom,callback){
  geom.computeBoundingBox();
				var box = geom.boundingBox;
	        wl = geom.boundingBox.max.x-geom.boundingBox.min.x;var wr = geom.boundingBox.max.x;
			  ht = geom.boundingBox.max.z-geom.boundingBox.min.z;var hb = geom.boundingBox.max.z;
          b = geom.boundingBox.max.y-geom.boundingBox.min.y;
		console.log('width-'+wl,'height-'+ht,'depth='+b);
				console.log( -box.min.x, -box.min.y, -box.min.z,-box.max.x, -box.max.y, -box.max.z );
				
				geom.translate( -(box.min.x+wl/2), -(box.min.y+b/2), -box.min.z );
		var pointsOfIntersection = new THREE.Geometry();
		var poi = new THREE.Geometry();
		
		var layers = [];
		
		//var pnt = new THREE.Geometry(); 
		var faces = geom.faces;console.log(faces);
		var pointOfIntersection = new THREE.Vector3();
		var zValues = [0]; var zm = 0;
		var curves = []; 
		var outer = []; //var infseg = [];
		var inner = []; 
		var ttt = []; 
		var infiller = []; 
		var zi = geom.boundingBox.min.z;var sp = 0;
		var xv = geom.boundingBox.max.x*2;
		//si = lt;
		layht = ht/si;
		var ty=0,h=0;
		var zmin = 0,zmax = 0;
		var flats = [];
		flats[0] = 1;
		var vi = geom.boundingBox.min.x;
		var zv = geom.boundingBox.max.z;
		var A = new THREE.Vector3(0,0,1);
		var B = new THREE.Vector3(1,0,0);
		var C = new THREE.Vector3(0.2,0.8,0);
		var D = new THREE.Vector3(0.8,-0.2,0);
		
		 var tmp = 0;
		
		 //console.log(Plane1);
		var Plane = [];
		var Plane1 = [];
		var polyline = [];
		for(var j = zi+0.001,k=0;j <= zv;j=j+sia){
			var pt = [];  pt[0] =  new THREE.Geometry();g=0;
			var ref = 0;	var planer = 0;
			for(var x=0;x < zValues.length ;x++){
				if((j+3*sia > zValues[x] && j <= zValues[x]) || (j+sia <= 3*sia)){planer = 1;j = j+0.001;
				
				console.log('at ----k ='+k+'%');}//console.log(j,tmp,j+si,zValues[tmp]);
			}
				Plane[k] =  new THREE.Plane(A,-j);//console.log(Plane[k],j);
				var tv = [];
				var lines = [];
				var seg = [];
				var nml = [];
				var ln=0,tmpv = 0;
				var initialize = 0;

		 //curves[k] = [];
		 var poi = new THREE.Geometry();
		//console.log(Plane[k]);
		for (var i = 0; i < faces.length ;i++ ) {
			var curve = [];var counter = 0;
          curve[h] =  new THREE.Vector3();
       var norm = faces[i].normal;
	   
				var v1 = geom.vertices[faces[i].a], 
					v2 = geom.vertices[faces[i].b], 
					v3 = geom.vertices[faces[i].c];
					if(v1.z == v2.z && v2.z == v3.z){
						if(zm < v1.z){zValues.push(v1.z);zm = v1.z;planer = 1;console.log('atttttttt',planer,k);}// console.log(zm,zValues);
							}
				//if(!(v1.z == v2.z || v2.z == v3.z || 1)){			
	var lineAB = new THREE.Line3(v1, v2);
    var lineBC = new THREE.Line3(v2, v3);
    var lineCA = new THREE.Line3(v3, v1);
    sPI(lineAB, Plane[k],norm);
    sPI(lineBC,Plane[k],norm);
    sPI(lineCA, Plane[k],norm);
			//	}
		}
		//console.log(zvalues);
		curves[k] = poi;//console.log(poi,k);//new THREE.Points(poi, new THREE.PointsMaterial({	size: .5,color: "blue"}));
		
//----------------------------------------------------------------------------	
		
//----------------------------------------------------------------------------
var ir =[];var ou =[];var curveNo =0;var inf =[];var tt=[];var infseg=[];var angle;
var segs = [];
//console.log(nml,seg);
for(var s=0; s < seg.length; s++){segs[s] = new THREE.Line3();segs[s].start = seg[s].start;segs[s].end = seg[s].end;}
var q =0;var end = 1;var nul = new THREE.Vector3(-100.254,-100.2489,-102.1654);
outerGen();
////////////////////////////////outergen//////////////////////////////////////////////////////////////
function outerGen(){//console.log('Pass ',curveNo);
var sp,ep,tn;var nl ;var arng = []; var norms =[]; //console.log(seg);
		sp = segs[q].end; ep = segs[q].start;
		arng[0] = sp;arng[1] = ep;segs[q].start = nul;segs[q].end = nul;
		tn = new THREE.Vector3(); norms[0] = new THREE.Vector3();
		tn.x = nml[q].x;tn.y = nml[q].y;tn.z = nml[q].z ;
		norms[0].x = nml[q].x;norms[0].y = nml[q].y;norms[0].z = nml[q].z;//norms[1]=nml[1];
		var change = 1;
		var ini = 0;var ab;
		//norms[1] = new THREE.Vector3();
		while(change != 0){
			change = 0;
		for(var w=1;w< segs.length;w++){
			
		 if((segs[w].start.x == segs[w].end.x) && (segs[w].start.y == segs[w].end.y) && (segs[w].start.z == segs[w].end.z)){
		 segs[w].start = nul;segs[w].end = nul;}else{
			//console.log(ep,segs[w].start,segs[w].end,w);
			//console.log(ep.x,segs[w].start.x,ep.y,segs[w].start.y);
			//console.log(ep.x,segs[w].end.x,ep.y,segs[w].end.y)
			nl = new THREE.Vector3();
			
			if(ep.x.toFixed(5) == segs[w].start.x.toFixed(5) && ep.y.toFixed(5) == segs[w].start.y.toFixed(5) )
			{if(ini == 0){tn.x = nml[w].x;tn.y = nml[w].y;tn.z = nml[w].z ; ini++;}
		         //angle = tn.angleTo(nml[w]); angle = angle*(90/Math.PI); //console.log(angle,Math.cos(angle));
				nl.x = (tn.x + nml[w].x)/2; nl.y = (tn.y + nml[w].y)/2; nl.z = (tn.z + nml[w].z)/2;tn = nml[w];//nl.x = nl.x/(Math.cos(angle));nl.y = nl.y/(Math.cos(angle));//if(Math.abs(nl.x) > Math.abs(nl.y)){ab = Math.abs(nl.x);nl.x = nl.x/ab;nl.y = nl.y/ab;}else{ab = Math.abs(nl.y);nl.x = nl.x/ab; nl.y = nl.y/ab;} 
				norms.push(nl);//console.log(nl);
				ep = segs[w].end;  arng.push(segs[w].end);  segs[w].start = nul;segs[w].end = nul;  change++; 
			}
			else if(ep.x.toFixed(5) == segs[w].end.x.toFixed(5) && ep.y.toFixed(5) == segs[w].end.y.toFixed(5))
			{if(ini == 0){tn.x = nml[w].x;tn.y = nml[w].y;tn.z = nml[w].z ; ini++;}
		    //angle = tn.angleTo(nml[w]); angle = angle*(90/Math.PI);//console.log(angle,Math.cos(angle));
			nl.x = (tn.x + nml[w].x)/2; nl.y = (tn.y + nml[w].y)/2; nl.z = (tn.z + nml[w].z)/2;tn = nml[w];//nl.x = nl.x/(Math.cos(angle));nl.y = nl.y/(Math.cos(angle));//if(Math.abs(nl.x) > Math.abs(nl.y)){ab = Math.abs(nl.x);nl.x = nl.x/ab;nl.y = nl.y/ab;}else{ab = Math.abs(nl.y);nl.x = nl.x/ab; nl.y = nl.y/ab;}
			norms.push(nl); //console.log(nl);
				ep = segs[w].start; arng.push(segs[w].start); segs[w].start = nul;segs[w].end = nul; change++;
			}
			var cou = norms.length;//console.log(cou);
		 }
		
		} //console.log(arng);
		}var cou = norms.length;
		//angle = norms[0].angleTo(norms[cou-1]);angle = angle*(90/Math.PI); console.log(angle);
		norms[0].x = (norms[0].x + norms[cou-1].x)/2;norms[0].y = (norms[0].y + norms[cou-1].y)/2;//norms[0].x = norms[0].x/(Math.cos(angle));norms[0].y = norms[0].y/(Math.cos(angle));//if(Math.abs(norms[0].x) >= Math.abs(norms[0].y)){ab = Math.abs(norms[0].x); norms[0].x = norms[0].x/ab; norms[0].y = norms[0].y/ab;}else{ab = Math.abs(norms[0].y); norms[0].x = norms[0].x/ab; norms[0].y = norms[0].y/ab;}
		norms[cou] = new THREE.Vector3();    norms[cou].x = norms[0].x;   norms[cou].y = norms[0].y;//norms[cou].x = norms[cou].x/(Math.cos(angle));norms[cou].y = norms[cou].y/(Math.cos(angle)); //console.log(arng,norms);   
		
		var out = new THREE.Geometry();
		var inn = new THREE.Geometry();
		var infl = [];
		for(var u=0; u < arng.length ;u++){
			
			
			out.vertices.push(arng[u]); 
			//out.vertices.push(arng[u]);
		}ou[curveNo] =  out;
		
		var tinn = [];
		var tinf = [];
		for(var u=0; u < arng.length ;u++){
			tinn[u] = new THREE.Vector3();
			tinn[u].x = arng[u].x - si*norms[u].x; tinn[u].y = arng[u].y - si*norms[u].y; tinn[u].z = arng[u].z - si*norms[u].z;
			
			inn.vertices.push(tinn[u]); 
			tinf[u] = new THREE.Vector3();
			tinf[u].x = arng[u].x - 2*si*norms[u].x; tinf[u].y = arng[u].y - 2*si*norms[u].y; tinf[u].z = arng[u].z - 2*si*norms[u].z;
			infl.push(tinf[u]);
			
			
			//out.vertices.push(arng[u]);
		}
		//console.log(infl);
for(var b=0;b < infl.length-1;b++){
			infseg.push(new THREE.Line3(infl[b],infl[b+1]));
		}
		
//console.log(infseg);
	
	
	
			
			
		
		var inter = new THREE.Geometry();
        for(var y =0;y< infl.length;y++){
             
			 inter.vertices.push(infl[y]);
		}
			
			//console.log(inter);
			
		tt[curveNo] = inter;
		ir[curveNo] = inn;
		inf[curveNo] = infl;
		
        
		}
		//////////////////////////////////////outergen///////////////////
		while(end == 1){
		end = 0;
	for(var w=0; w < segs.length; w++){    if(segs[w].start.x != nul.x && segs[w].start.y != nul.y){end = 1;q = w;curveNo++;outerGen();}else{  } }
		//if(!(segs[q])){end = 0;}
		}
		
		//console.log('final',infseg);
		
		
		
	/////////////////////////////fillers/////////////////////////////////////////////////////////////////////////////	
		var pdp;var patplane = [C,D];
		if(k == 0 || planer == 1 || pd == si){
		 pdp = si/1.1;var patplane = [B];}else{pdp = pd;}
		 for(var vf=0;vf < patplane.length;vf++){//console.log(patplane[vf]);
	for(var v = vi,l=0;v <= xv;v=v+pdp){
			
				tv[l] = new THREE.Geometry();
				var lp = [];
					Plane1[l] =  new THREE.Plane(patplane[vf],v);//console.log(Plane1[l],v);
			//console.log(seg);
			for(var c = 0;c < infseg.length;c++){
			setPointOfIntersection(infseg[c], Plane1[l]);
			}
		
		//ty = parseInt(h/2);if(ty > g){g = ty;pt[g] = new THREE.Geometry();}console.log(ty,g); pt[g].vertices.push(pointOfIntersection.clone());
		lp = tv[l].vertices;  
	//if(k ==0 ){	

		if(lp[0]){ 
		lp.sort(function(a, b) {   return parseFloat(a.y) - parseFloat(b.y);}); 
			//console.log(lp);
			//console.log(h,ty,g);
		//	console.log(l,tmpv,ref,h,ty);
		if(initialize == 0){tmpv =h;initialize = 1;}	if(h == tmpv){}else{ref = ty;}
			for(var d=0;d <=h;d++){ty =  Math.floor(d/2)+ ref;
			if(ty > g){g = ty;pt[g] = new THREE.Geometry();} if(lp[d]){lp[d].y = lp[d].y ;      pt[ty].vertices.push(lp[d]);}}
	 tmpv = h; 
	} 
	//}
	h = 0;	l++; sp++;}
		 }
	/////////////////////////////-----fller----///////////////////////////////////////////////////////////	
		
		
		ttt[k] = tt;
		outer[k] = ou;
		inner[k] = ir;
			
		//console.log(ttt[k]);
		//console.log(inner[k]);
	//console.log(segs);
//pt.forEach(func);
var fills = [];
for(var f = 0; f < pt.length; f++){
			sort1(pt[f]);	
				
				//console.log(f);
			}
for(var e = 0; e < pt.length-1; e++ ){
	fills[e] = pt[e]; //console.log(pt[e],e); 
}

layers[k] = fills;
//var kper,nol; nol = ht/sia;kper = Math.floor(k/nol*100);
console.log('Slicing...'+k+'%'); kmax =k;
//res.write('SC'+kper+"%");
//console.log(layers);
	k++;sp++;h = 0;	
		}
//----------------------------------------------------------------------------------------------------------------		
		
	
		
		
		
		function sPI(line, plane,nor) {
		pointOfIntersection = plane.intersectLine(line);//console.log(pointOfIntersection);
		if (pointOfIntersection) {//console.log(pointOfIntersection);
		//pointsOfIntersection.vertices.push(pointOfIntersection.clone());
		poi.vertices.push(pointOfIntersection.clone());
		//curves[h] = pointOfIntersection.clone();
		counter++; if(counter == 2){lines[ln] = poi.vertices[ln];lines[ln-1] = poi.vertices[ln-1];nml.push(nor);seg.push(new THREE.Line3(lines[ln-1],lines[ln]));} ln++;
		//curves[k][h] = pointOfIntersection.clone();h++;
		//console.log(k,h);
				};
				}
				function setPointOfIntersection(line, plane) {
					
		pointOfIntersection = plane.intersectLine(line);//console.log(pointOfIntersection);
		if (pointOfIntersection) {//console.log(pointOfIntersection);
		  tv[l].vertices.push(pointOfIntersection.clone());h++;//console.log(tv[l]);
		//pointsOfIntersection.vertices.push(pointOfIntersection.clone());
	//b4	//if(pointOfIntersection.z == zmin){tv[l].vertices.push(pointOfIntersection.clone());h++;console.log('zmin -'+zmin);}//console.log(pointOfIntersection);
		};
				}
				
				function sort1(geom){
					var temp;
					for(i=2;i<geom.vertices.length;i+=4){
					temp = geom.vertices[i];geom.vertices[i] = geom.vertices[i+1];geom.vertices[i+1] = temp;
					}
				}
				
			//console.log(pt[0]);
				
		//geom.rotateZ ( 0.5 )
		//console.log(seg);
		//console.log(layers);
			boundbox(geom);		
                scene1 = new THREE.Scene();
                 var geom1 = new THREE.SphereGeometry( 10,100);
				 
				  
	if(geom.boundingBox === null ) geom.computeBoundingBox ();
				geom.computeBoundingBox();
				var box = geom.BoundingBox;
				//console.log( geo.boundingBox.max.x-geo.boundingBox.min.x,geo.boundingBox.max.y-geo.boundingBox.min.y,geo.boundingBox.max.z-geo.boundingBox.min.z );
            wl = geom.boundingBox.max.x-geom.boundingBox.min.x;wr = geom.boundingBox.max.x;
			  ht = geom.boundingBox.max.z-geom.boundingBox.min.z;hb = geom.boundingBox.max.z;
          b = geom.boundingBox.max.y-geom.boundingBox.min.y;
		console.log('width-'+wl,'height-'+ht,'depth='+b);
				
				
				
				
  

   
      // faceuvmapper(geom);
	 
         ///////////MATERIAL/////////////////////////
	
				
				
	
				
///////////////MESH///////////////////////////////////////////////////////////////////
                  /*       
							mesh = new THREE.Mesh( geom,material);
                         scene.add(mesh); 
                			mesh.rotation.x = -1;
                            mesh.rotation.z = 1;
                            mesh.rotation.y = 0;					
							 
			         
					   var color = ['red','blue','green','orange','grey','red','blue','green','orange','grey','red','blue','green','orange','grey','red','blue','green','orange','grey']
					  */ 
	 ln = 2;

for(var y=0;y< outer.length; y++){
ln = y;
for(var i=0;i< inner[ln].length;i++){
var line3 = new THREE.Line(inner[ln][i], new THREE.LineBasicMaterial({color: "blue"}));
scene1.add(line3);line3.rotation.x = -1;line3.rotation.z = 1;
}
for(var i=0;i< outer[ln].length;i++){
var line4 = new THREE.Line(outer[ln][i], new THREE.LineBasicMaterial({color: "blue"}));
scene1.add(line4);line4.rotation.x = -1;line4.rotation.z = 1;
}
for(var i=0;i< layers[ln].length;i++){
	var ii = i; if(i > 10){ii = i%10;}
 line2[i] = new THREE.Line(layers[ln][i], new THREE.LineBasicMaterial({color: "blue"}));
scene1.add(line2[i]);;line2[i].rotation.x = -1;line2[i].rotation.z = 1;
}
}
ln = 0;
////////////////////////////////


//pt = Plane1.intersectLine(line2);	
//console.log(line2);
var header = ';Generated with Cura_SteamEngine 15.04.6 \n\
M104 S235; set the extruder temp and wait\n\
M140 S95\n\
G28 ; home all axes\n\
M190 S95 ; set the extruder temp and wait\n\
M109 S235\n\
G80 ; Probe\n\
G1 Z5 F5000 ; lift nozzle\n\
;Layer count: '+kmax+'\nM106 S255';

 gcodes = [];
var ofsetx = 100;
var ofsety = 100;
var stro = [];
var stri = [];
var strf = [];
var str = [];
var tempst =[];
var gval = "G00";var Eval =' E200';

var evalue = 0;
for(var ib = 0;ib < outer.length ;ib++){
	ln = ib;
	var zval = outer[ib][0].vertices[0].z.toFixed(5); //console.log(zval);
	var xval = parseFloat(inner[ib][0].vertices[3].x.toFixed(5))+ofsetx,yval = parseFloat(inner[ib][0].vertices[0].y.toFixed(3))+ofsety;
	var starter = 'G0 X'+xval+' Y'+yval+' Z'+zval;//;layer '+ln+'\nM106 S255';
	var fileo = [];
var filei = [];
var filep = [];//console.log(inner[ln]);

for(var i=0;i< inner[ln].length;i++){//console.log(inner[ln].length);
    
	for(var j=0;j< inner[ln][i].vertices.length;j++){
		if(j != 0){;var v11 = inner[ln][i].vertices[j];
		var v12 = inner[ln][i].vertices[j-1];
		evalue = evalue + (v11.distanceTo(v12).toFixed(6))/efac;}
		if(j == 0){gval = ';inner curve no '+i+'\nG0 F4800';Eval = "";}else if(j == 1){gval = "G1 F2400";Eval = ' E'+evalue.toFixed(5);}else{gval = "G1";Eval = ' E'+evalue.toFixed(5);}
		var xval = parseFloat(inner[ln][i].vertices[j].x.toFixed(5))+ofsetx;var yval = parseFloat(inner[ln][i].vertices[j].y.toFixed(5))+ofsety;//console.log(inner[ln][i].vertices[j]);
	filei[j] = ''+gval+' X'+xval.toFixed(5)+' Y'+yval.toFixed(5)+Eval;
	}
	tempst[i] = filei.join("\n");
	filei = [];
	
}stro = tempst.join("\n");var tempst =[];


for(var i=0;i< outer[ln].length;i++){ fileo = [];
  
for(var j=0;j< outer[ln][i].vertices.length;j++){
	if(j != 0){var v11 = outer[ln][i].vertices[j];
			var v12 = outer[ln][i].vertices[j-1];
			evalue = evalue +(v11.distanceTo(v12).toFixed(6))/efac;}
	if(j == 0){gval = ';outer curve no '+i+'\nG0 F4800';Eval = "";}else if(j == 1){gval = "G1 F1500";Eval = ' E'+evalue.toFixed(5);}else{gval = "G1";Eval = ' E'+evalue.toFixed(5);}
	var xval = parseFloat(outer[ln][i].vertices[j].x.toFixed(3))+ofsetx;var yval = parseFloat(outer[ln][i].vertices[j].y.toFixed(3))+ofsety;
	fileo[j] = gval+' X'+xval.toFixed(5)+' Y'+yval.toFixed(5)+Eval;
}
	tempst[i] =  fileo.join("\n");
	fileo = [];
	
}stri = tempst.join("\n");var tempst =[];
for(i=0;i< layers[ln].length;i++){
	 
	 for(j=0;j< layers[ln][i].vertices.length;j++){
	var v11 = layers[ln][i].vertices[j];
				
	  if(j != 0 || j%2 != 0){var v11 = layers[ln][i].vertices[j];
				var v12 = layers[ln][i].vertices[j-1];
				evalue = evalue +(v11.distanceTo(v12).toFixed(6))/efac;}
	 if(j == 0){gval = 'G0 F4800';Eval = "";}else{gval = "G1 F1500";Eval = ' E'+evalue.toFixed(5);}if(j%2 == 0){gval = 'G0 F4800';Eval = "";}
	  var xval = parseFloat(layers[ln][i].vertices[j].x.toFixed(3))+ofsetx;var yval = parseFloat(layers[ln][i].vertices[j].y.toFixed(3))+ofsety;
	filep[j] = gval+' X'+xval.toFixed(5)+' Y'+yval.toFixed(5)+Eval;
 }
	tempst[i] = filep.join("\n");
	filep = [];
	
	
}strf = tempst.join("\n");var tempst =[];
var mins = ";*layer "+ln;
str.push(starter,stro,stri,strf,mins);

}

var newvol = (evalue*30.1)*(3.14/4*sia*sia + sia*(exd*1.2 - sia));
var filament = newvol/(3.14*1.75*1.75/4)/1000;filament = filament.toFixed(4);
//alert(filament);
var footer = 'M107 \n\
G1 F2400 ' +evalue+ '.84735 \n\
G0 F4800 X136.106 Y119.865 Z63.419\n\
M104 S0\n\
M140 S0\n\
M84\n\
G90';
if(printer == 'T1'){header = tevoHeader(kmax,filament);footer = tevoLower();}
if(printer == 'M1'){header = makerHeader(kmax,filament);footer = makerFooter();}
if(printer == 'p1'){header = makerHeader(kmax,filament);footer = makerFooter();}

console.log(newvol);
var connector = [];
var content = str.join("\n");
connector.push(header,content,footer);
gcodes = connector.join("\n");
return gcodes;
//callback(gcodes);
   }
//pgcd = gcodes.match(/(.|[\r\n]){1,800000}/g); 
//console.log(gcodes.length);
//console.log(pgcd.length);
exports.slicer = slicer;