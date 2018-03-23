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
var StlExporter = require(__dirname+'/js/STLExporter.js');
var NodeStl = require('./js/nodestl.js');
var gcode = require('./gcode.js');
var slicer = gcode.slicer;
//console.log(NodeStl);
var Volume = 0;
var wl,ht,b;
var router = express.Router();
var stl;

var model = 'https://myindustryworld.com/z/designs/100000027files/10000002720180202Super_Mario_Question_Block_Switch_Case.stl';

 var camera, scene, renderer,u1,layht,controls,pgcd,gcodes = [],dne = 0,lval,
            geometry, material, mesh, light1, stats,points,line2 =[],pattern,printer = 'p1',matrl = 1;
var geom = new THREE.Geometry();
           var si = 0.3,pd = 5,exd = 0.3,sia = 0.2; si = 2*exd;
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
function saveSTL( myscene, name,callback){  
  var exporter = new StlExporter();
  var stlString = exporter.parse( myscene );
  console.log('scenes',myscene.children[0].geometry.vertices.length,stlString.length);
// console.log('stl= '+stlString);
 fs.writeFile(name, stlString, (err) => {
  if (err) throw err;
  console.log('The STL file has been saved!'); callback();
});
  
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
var Mesh;

   var camera, scene, renderer,
            geometry, material, mesh, light1, stats,controls,quantity = 1;

var gg,textGeo1,
				//size = 12,
				hover = 2,
				//height = 20,
				curveSegments = 4,
				bevelThickness = 0.3,
				bevelSize = 0.5,
				bevelSegments = 3,
				bevelEnabled = true,
				font = '',
				fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
				fontWeight = "bold"; 
				//var text1 = 'ZEESHAN';// normal bold
var filen = "testt.txt"
fs.writeFile(filen, "ZEESHAN Ahmad khan", function(err) {
    

    console.log("The file was saved!");
}); 
function loadFont(scenez,text1,positionx,positiony,positionz,rotationx,rotationy,rotationz,textheight,textsize,callback) {
				
			
			fs.readFile('font.json', 'utf8', function ( err, data){
				var fontjson = JSON.parse(data); 
				font = "";
                   font  = new THREE.Font(fontjson);				
				var textGeo = new THREE.TextGeometry( text1, {
				    font: font,
					size: textsize,
					height: textheight,
					curveSegments: curveSegments,
					bevelThickness: bevelThickness,
					bevelSize: bevelSize,
					bevelEnabled: bevelEnabled,
					material: material,
					extrudeMaterial: 0
				});
				//var rot = rotation.split(",");
				//textGeo.rotate(-1,1,1);
				textGeo.rotateX(rotationx);
				textGeo.rotateY(rotationy);
				textGeo.rotateZ(rotationz);
				textGeo.translate(parseFloat(positionx),parseFloat(positiony),parseFloat(positionz));
				console.log('height '+textheight,'x- '+rotationx,'y- '+rotationy,'z- '+rotationz,positionx,positiony,positionz);
                     var textmesh = new THREE.Mesh( textGeo, material );
					 //textmesh.scale.x = -1;
				//	 textmesh.position.set(50,0,-100);
					// textmesh.rotation.y = Math.PI;
					
					 scenez.add(textmesh);
					 
					 
			console.log(text1,'-ppt');
			var Rx = Math.floor((Math.random() * 100000) + 1);
			const file1 = fs.createWriteStream('tempstl/'+Rx+'tempstl.stl');
			saveSTL(scenez,'tempstl/'+Rx+'tempstl.stl',function(){
				
			 //res.sendFile('tempcutome.stl');
			callback(Rx);
			});
			
return textmesh;
			 // console.log(font);
			
				
				} );
				}
//loadFont();
/*app.get('/deletetemp', function(req, res){
 
  var directory = __dirname +'/tempstl';
fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(directory + file), err => {
      if (err) throw err;
    });
  }
});
 res.sendFile(file);
  //res.download(file); // Set disposition and send it.
});*/
app.get('/download', function(req, res){
  var file = __dirname + '/new.stl';
   res.sendFile(file);
  //res.download(file); // Set disposition and send it.
});


app.get('/merge', function(req, res){
	var partfile = req.param('file');
	var posx = parseFloat(req.param('posx'));
	var posy = parseFloat(req.param('posy'));
	var posz = parseFloat(req.param('posz'));
	var rotx = parseFloat(req.param('rotx'));
	var roty = parseFloat(req.param('roty'));
	var rotz = parseFloat(req.param('rotz'));
	var theight = parseFloat(req.param('height'));
	var tsize = parseFloat(req.param('size'));
	var customtext = decodeURIComponent(req.param('textval'));
	const http = require("http");

   //pos = pos.replace("(", "");
   //pos = pos.replace(")", "");
  //rot = rot.replace("(", "");
  // rot = rot.replace(")", "");
  //http://localhost:3000/merge?file=https://myindustryworld.com/z/designs/100000017files/10000001720171229iphone7.stl&textval=Zeeshan&pos=(2,0,0)&rotx=1.2&roty=0.2&rotz=0&height=3&size=12
 //const file1 = fs.createWriteStream('tempstl/'+Rx+'tempstl.stl');
var requestSettings = { method: 'GET', url: partfile,  encoding: null,};
console.log(partfile);
request(requestSettings, function(error, response, body) {
   var Nstl = new NodeStl(body);
  console.log('geom bef',Nstl.Geometry.vertices.length)
   var geom = Nstl.Geometry;
  
      console.log('geom',geom.vertices.length,Nstl.Geometry.vertices.length); 
	
   geom.computeBoundingBox();
				var box = geom.boundingBox;
				//console.log( geo.boundingBox.max.x-geo.boundingBox.min.x,geo.boundingBox.max.y-geo.boundingBox.min.y,geo.boundingBox.max.z-geo.boundingBox.min.z );
            wl = geom.boundingBox.max.x-geom.boundingBox.min.x;var wr = geom.boundingBox.max.x;
			  ht = geom.boundingBox.max.z-geom.boundingBox.min.z;var hb = geom.boundingBox.max.z;
          b = geom.boundingBox.max.y-geom.boundingBox.min.y;
		console.log('width-'+wl,'height-'+ht,'depth='+b);
				console.log( -box.min.x, -box.min.y, -box.min.z,-box.max.x, -box.max.y, -box.max.z );
				
				geom.translate( -(box.min.x+wl/2), -(box.min.y+b/2), -box.min.z );
	var scenez = new THREE.Scene();			
				
	var partmesh = new THREE.Mesh(Nstl.Geometry,material);
	//console.log(Nstl.Geometry);
	scenez.add(partmesh);
	var tmesh = loadFont(scenez,customtext,posx,posy,posz,rotx,roty,rotz,theight,tsize,function(Rx){
		res.sendFile(__dirname +'/tempstl/'+Rx+'tempstl.stl');});
	  
	//scene.add(tmesh);
//console.log(scene.children)
	
	
	//response.send({vol: Volume});
    //assert.equal(stl.volume, 21.87511539650792);
   // done(null);
});
	
	//res.jsonp({File: partfile,Text: customtext});
});	




app.get('/', (req, res,body) => {

  var obj = { name: "Zeeshan"};
  //var vval = vl();
 // var geom = new THREE.CubeGeometry( 200, 200, 200 );
  var objj = [{a: 4, b: 6},{doc: "sss"}];
  console.log(objj);
  //console.log(stl);
// res.jsonp({volume: Volume});
  res.jsonp({ name: "Zeeshan"})
  //res.status(200).send(namear).end();
});

////////////////////////////////////////////////////////////GC////////////////////////////////////////////////////////////////////////////////
app.get('/slice', function(req, res){
	var efac = 30;
	var partfile = decodeURI(req.param('file'));
	var printerb = req.param('printer');
	var layerheight = req.param('lh');
	var infill = req.param('infill');
	var fmaterial = req.param('material');
	if(layerheight){sia = layerheight;}
	if(infill){pd = infill;}
	if(printerb){printer = printerb;}
	if(fmaterial){matrl = fmaterial;}
	var Rx = Math.floor((Math.random() * 100000) + 1);
	//var customtext = req.param('textval');
	var requestSettings = { method: 'GET', url: partfile,  encoding: null,};
request(requestSettings, function(error, response, body) {
   var Nstl = new NodeStl(body);
   var geom = Nstl.Geometry;

gcodes = slicer(geom);

fs.writeFile('gfiles/'+Rx+'Gcodes.gcode',gcodes,function(){console.log('Gcode file created');res.sendFile(__dirname +'/gfiles/'+Rx+'Gcodes.gcode');
if(layerheight){console.log('lh='+layerheight+'pd = '+pd+'printer = '+printer+'material = '+matrl);}else{console.log('undef');}
});
//});
});
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
