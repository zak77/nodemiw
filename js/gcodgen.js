		 var camera, scene, renderer,layht,
            geometry, material, mesh, light1, stats,points,line2 =[],pattern;
var geom = new THREE.Geometry();
           
var ar = window.innerWidth / window.innerHeight; 
			var wl; var gg;var g=0;
			var wr;var bar =document.getElementById("brf");
var ht;
var hb;
var b,kmax;
var an = 0;
var z = 0;
var dataimg;
var ln = 0;
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
/////////////////////////////////////////////////////
/*					  
var texture =  new THREE.TextureLoader().load('metal1.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );
var texture1 =  new THREE.TextureLoader().load('plred.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );
var texture2 =  new THREE.TextureLoader().load('cloth.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );
var texture3 =  new THREE.TextureLoader().load('blasted.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );
var texture4 =  new THREE.TextureLoader().load('copp.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );
var texture5 =  new THREE.TextureLoader().load('3dpr.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );
*/
               
function boundbox(geo){
	//geo.rotate.z = 0.5;
				if(geo.boundingBox === null ) geo.computeBoundingBox ();
				geo.computeBoundingBox();
				var box = geo.BoundingBox;
				//console.log( geo.boundingBox.max.x-geo.boundingBox.min.x,geo.boundingBox.max.y-geo.boundingBox.min.y,geo.boundingBox.max.z-geo.boundingBox.min.z );
            wl = geo.boundingBox.max.x-geo.boundingBox.min.x;
			ht = geo.boundingBox.max.z-geo.boundingBox.min.z;
			b = geo.boundingBox.max.y-geo.boundingBox.min.y;
			console.log('z max = '+geo.boundingBox.max.z+'z min = '+geo.boundingBox.min.z);
			console.log('x max = '+geo.boundingBox.max.x+'x min = '+geo.boundingBox.min.x);
			console.log('y max = '+geo.boundingBox.max.y+'y min = '+geo.boundingBox.min.y);
							}
			
		$(document).keydown(function(e) {
    if (e.which === 38) {
	if(ln < 30){
	
	 ln += 1;}
	 console.log(up);
		}	});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
           
		   var def = partfile;
		function gcodgen(){	
			init(def);
			
            animate();

            function init(x) {
	
                //Detector.addGetWebGLMessage();
	var param = function(data){
		var type;
		//type = idn(data);
		console.log(data);
		//console.log(type);
		///GEOMETRY////////
		//geom = parseStl(data);}
		//geom = parseStlBinary(data); console.log(geom);
		var geom = data; //console.log(data);
		
		boundbox(geom);
        faceuvmapper(geom);		
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
		var si = 0.3;
		layht = ht/si;
		var pd = 5;var ty=0,h=0;
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
		 bar.style.width = 0.2*300+'px';
bar.innerHTML = 0.2*100+ '%';
		 //console.log(Plane1);
		var Plane = [];
		var Plane1 = [];
		var polyline = [];
		for(j = zi+0.001,k=0;j <= zv;j=j+si){
			var pt = [];  pt[0] =  new THREE.Geometry();g=0;
			var ref = 0;	var planer = 0;
			for(x=0;x < zValues.length ;x++){
				if((j+3*si > zValues[x] && j <= zValues[x]) || (j+si <= 3*si)){planer = 1;j = j+0.001;console.log('at ----k ='+k);}//console.log(j,tmp,j+si,zValues[tmp]);
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
	lineAB = new THREE.Line3(v1, v2);
    lineBC = new THREE.Line3(v2, v3);
    lineCA = new THREE.Line3(v3, v1);
    sPI(lineAB, Plane[k],norm);
    sPI(lineBC,Plane[k],norm);
    sPI(lineCA, Plane[k],norm);
			//	}
		}
		//console.log(zvalues);
		curves[k] = poi;//console.log(poi,k);//new THREE.Points(poi, new THREE.PointsMaterial({	size: .5,color: "blue"}));
		
//----------------------------------------------------------------------------	
		
//----------------------------------------------------------------------------
var ir =[];var ou =[];var curveNo =0;var inf =[];var tt=[];infseg=[];var angle;
var segs = [];
//console.log(nml,seg);
for(s=0; s < seg.length; s++){segs[s] = new THREE.Line3();segs[s].start = seg[s].start;segs[s].end = seg[s].end;}
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
		for(w=1;w< segs.length;w++){
			
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
		for(u=0; u < arng.length ;u++){
			
			
			out.vertices.push(arng[u]); 
			//out.vertices.push(arng[u]);
		}ou[curveNo] =  out;
		
		var tinn = [];
		var tinf = [];
		for(u=0; u < arng.length ;u++){
			tinn[u] = new THREE.Vector3();
			tinn[u].x = arng[u].x - si*norms[u].x; tinn[u].y = arng[u].y - si*norms[u].y; tinn[u].z = arng[u].z - si*norms[u].z;
			
			inn.vertices.push(tinn[u]); 
			tinf[u] = new THREE.Vector3();
			tinf[u].x = arng[u].x - 2*si*norms[u].x; tinf[u].y = arng[u].y - 2*si*norms[u].y; tinf[u].z = arng[u].z - 2*si*norms[u].z;
			infl.push(tinf[u]);
			
			
			//out.vertices.push(arng[u]);
		}
		//console.log(infl);
for(b=0;b < infl.length-1;b++){
			infseg.push(new THREE.Line3(infl[b],infl[b+1]));
		}
		
//console.log(infseg);
	
	
	
			
			
		
		var inter = new THREE.Geometry();
        for(y =0;y< infl.length;y++){
             
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
	for(w=0; w < segs.length; w++){    if(segs[w].start.x != nul.x && segs[w].start.y != nul.y){end = 1;q = w;curveNo++;outerGen();}else{  } }
		//if(!(segs[q])){end = 0;}
		}
		
		//console.log('final',infseg);
		
		
		
	/////////////////////////////fillers/////////////////////////////////////////////////////////////////////////////	
		var pdp;var patplane = [C,D];
		if(k == 0 || planer == 1){
		 pdp = si;var patplane = [B];}else{pdp = pd;}
		 for(vf=0;vf < patplane.length;vf++){//console.log(patplane[vf]);
	for(v = vi,l=0;v <= xv;v=v+pdp){
			
				tv[l] = new THREE.Geometry();
				lp = [];
					Plane1[l] =  new THREE.Plane(patplane[vf],v);//console.log(Plane1[l],v);
			//console.log(seg);
			for(c = 0;c < infseg.length;c++){
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
			for(d=0;d <=h;d++){ty =  Math.floor(d/2)+ ref;
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
for( f = 0; f < pt.length; f++){
			sort1(pt[f]);	
				
				//console.log(f);
			}
for(e = 0; e < pt.length-1; e++ ){
	fills[e] = pt[e]; //console.log(pt[e],e); 
}

layers[k] = fills;
console.log('k = ',k); kmax =k;

//console.log(layers);
	k++;sp++;h = 0;	
		}
//----------------------------------------------------------------------------------------------------------------		
		
	bar.style.width = 70*300+'px';
bar.innerHTML = 70+ '%';	
		
		
		
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
                scene = new THREE.Scene();
                 var geom1 = new THREE.SphereGeometry( 10,100);
				 
				  
	if(geom.boundingBox === null ) geom.computeBoundingBox ();
				geom.computeBoundingBox();
				var box = geom.BoundingBox;
				//console.log( geo.boundingBox.max.x-geo.boundingBox.min.x,geo.boundingBox.max.y-geo.boundingBox.min.y,geo.boundingBox.max.z-geo.boundingBox.min.z );
            wl = geom.boundingBox.max.x-geom.boundingBox.min.x;wr = geom.boundingBox.max.x;
			  ht = geom.boundingBox.max.z-geom.boundingBox.min.z;hb = geom.boundingBox.max.z;
          b = geom.boundingBox.max.y-geom.boundingBox.min.y;
		console.log('width-'+wl,'height-'+ht,'depth='+b);
				
				
				
				
     //////////////////CAMERA//////////////////////////           				
                //if(ht >= wl){wl = ht*0.5;}else{wl=wl*0.4;};camera = new THREE.PerspectiveCamera( wl, ar, 1, 1000 );
				if(ht > wl){wl = ht;}else{wl=wl*0.7+b*0.5;} camera = new THREE.OrthographicCamera(-wl,wl,wl,-wl, 1, 10000 );
				console.log(wl);
                camera.position.z = wl*10;
                camera.position.y = 1+ ht*0.5;
                camera.position.x = 0 ;
                scene.add( camera );
//scene.add(Plane);
////////////////////LIGHTS//////////////////////////////////////////////				
		
                var directionalLight = new THREE.DirectionalLight( 0xffffff ,0.7);
                directionalLight.position.x = -0.5; 
                directionalLight.position.y = 0; 
                directionalLight.position.z = 1; 
                directionalLight.position.normalize();
                scene.add( directionalLight );
				
				var light1 = new THREE.PointLight( 0xffffff,1.2 );
				console.log('wl' +wl);
				light1.position.set(wl*1.3,wl*1.3,wl*3 );
				scene.add(light1);			 
							 
       // console.log(geom.faces);
       faceuvmapper(geom);
	 
         ///////////MATERIAL/////////////////////////
	
				
				
				var material = new THREE.MeshPhongMaterial({
                        overdraw:true,
                        color: 0x990088,
						  specular:0xffffff,
                          bumpScale : 0.1,
                         // envMapIntensity: 1,
						shininess: 10,
						reflectivity: 1,
						
                        shading: THREE.FlatShading
						                    }
                );
				
///////////////MESH///////////////////////////////////////////////////////////////////
                         
							mesh = new THREE.Mesh( geom,material);
                         //scene.add(mesh); 
                			mesh.rotation.x = -1;
                            mesh.rotation.z = 1;
                            mesh.rotation.y = 0;					
							 
			         
					   var color = ['red','blue','green','orange','grey','red','blue','green','orange','grey','red','blue','green','orange','grey','red','blue','green','orange','grey']
					   
	 ln = 2;


for(i=0;i< inner[ln].length;i++){
line3 = new THREE.Line(inner[ln][i], new THREE.LineBasicMaterial({color: "blue"}));
scene.add(line3);//line3.rotation.x = -1;line3.rotation.z = 1;
}
for(i=0;i< outer[ln].length;i++){
line4 = new THREE.Line(outer[ln][i], new THREE.LineBasicMaterial({color: "red"}));
scene.add(line4);console.log(line4);//line4.rotation.x = -1;line4.rotation.z = 1;
}
for(i=0;i< layers[ln].length;i++){
	var ii = i; if(i > 10){ii = i%10;}
 line2[i] = new THREE.Line(layers[ln][i], new THREE.LineBasicMaterial({color: color[ii]}));
scene.add(line2[i]);//;line2[i].rotation.x = -1;line2[i].rotation.z = 1;
}
ln = 0;
bar.style.width = 0.9*300+'px';
bar.innerHTML = 90+ '%';
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
var footer = 'M107 \n\
G1 F2400 E7868.84735 \n\
G0 F4800 X136.106 Y119.865 Z63.419\n\
M104 S0\n\
M140 S0\n\
M84\n\
G90';
var gcodes = [];

var stro = [];
var stri = [];
var strf = [];
var str = [];
var tempst =[];
var gval = "G00";var Eval =' E200';

var eval = 0;
for(ib = 0;ib < outer.length ;ib++){
	ln = ib;
	var zval = outer[ib][0].vertices[0].z.toFixed(6); //console.log(zval);
	var starter = 'G0 X'+inner[ib][0].vertices[0].x.toFixed(6)+' Y'+inner[ib][0].vertices[0].y.toFixed(6)+' Z'+zval;//;layer '+ln+'\nM106 S255';
	var fileo = [];
var filei = [];
var filep = [];//console.log(inner[ln]);

for(i=0;i< inner[ln].length;i++){//console.log(inner[ln].length);
    
	for(j=0;j< inner[ln][i].vertices.length;j++){
		if(j != 0){;var v11 = inner[ln][i].vertices[j];
		var v12 = inner[ln][i].vertices[j-1];
		eval = eval + (v11.distanceTo(v12))/30; }
		if(j == 0){gval = ';inner curve no '+i+'\nG0 F2400';Eval = "";}else{gval = "G1";Eval = ' E'+eval;}
		var xval = inner[ln][i].vertices[j].x.toFixed(6);var yval = inner[ln][i].vertices[j].y.toFixed(6);//console.log(inner[ln][i].vertices[j]);
	filei[j] = ''+gval+' X'+xval+' Y'+yval+Eval;
	}
	tempst[i] = filei.join("\n");
	filei = [];
	
}stro = tempst.join("\n");var tempst =[];


for(i=0;i< outer[ln].length;i++){ fileo = [];
  
for(j=0;j< outer[ln][i].vertices.length;j++){
	if(j != 0){var v11 = outer[ln][i].vertices[j];
			var v12 = outer[ln][i].vertices[j-1];
			eval = eval +(v11.distanceTo(v12))/30;}
	if(j == 0){gval = ';outer curve no '+i+'\nG0 F2400';Eval = "";}else{gval = "G1";Eval = ' E'+eval;}
	var xval = outer[ln][i].vertices[j].x.toFixed(6);var yval = outer[ln][i].vertices[j].y.toFixed(6);
	fileo[j] = gval+' X'+xval+' Y'+yval+Eval;
}
	tempst[i] =  fileo.join("\n");
	fileo = [];
	
}stri = tempst.join("\n");var tempst =[];
for(i=0;i< layers[ln].length;i++){
	 
	 for(j=0;j< layers[ln][i].vertices.length;j++){
	 if(j != 0 && j%2 == 0){var v11 = layers[ln][i].vertices[j];
				var v12 = layers[ln][i].vertices[j-1];
				eval = eval +(v11.distanceTo(v12))/30;}
	 if(j == 0){gval = 'G0 F1300';Eval = "";}else{gval = "G1";Eval = ' E'+eval;}if(j%2 == 0){gval = 'G0 F2400';Eval = "";}
	 var xval = layers[ln][i].vertices[j].x.toFixed(6);var yval = layers[ln][i].vertices[j].y.toFixed(6);
	filep[j] = gval+' X'+xval+' Y'+yval+Eval;
 }
	tempst[i] = filep.join("\n");
	filep = [];
	
	
}strf = tempst.join("\n");var tempst =[];
var mins = ";layer "+ln;
str.push(starter,stro,stri,strf,mins);

}
var newvol = (eval*30)*3.14*0.4*0.4;
//alert(newvol);
console.log(newvol);
var connector = [];
var content = str.join("\n");
connector.push(header,content,footer);
gcodes = connector.join("\n");
//console.log(gcodes);
//console.log(str);
////////////////////////////////////////G Code writer////////////////////////////////////////////////////////////
function fgcod(x){
	 $.ajax({
  type: "POST",
  url: "gcodegen.php",
  data: { 
     gcod : x,
	 filename : partfile,
	 ts : timestamp
  }
})
//console.log(x);
}

fgcod(gcodes);
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
         var Volume;Volume = calculateVolume(mesh); 
		         console.log('Volume = '+Volume+'mm3');
		         console.log('ACtual Volume = '+newvol+'mm3');
		         console.log('%infill = '+newvol*100/Volume+'mm3');
				 var vol = Volume.toFixed(2); console.log(vol);
				 var density = 1.2; var volcm = (vol/1000).toFixed(2);var cost = (vol*0.013).toFixed(2); var weight = (volcm*1.2).toFixed(2);var FinalCost = cost*1;
				// document.getElementById("data").innerHTML = '<p> <b>Volume</b> = '+volcm+' cm3  <p> <b>Weight</b> = '+weight+' grams<p> <b>Cost</b> = &#8377;'+cost+'  </p><p> <b>Final Cost</b> = &#8377;'+FinalCost+'  </p>';
				 $('#fc').val(FinalCost);
				 console.log('final cost' +FinalCost);
					
					bar.style.width = 1*300+'px';
bar.innerHTML = 100+ '%';
					
					};
					
				
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
              
					
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
				var file = x;
				console.log(x);
				//stlLoader(file,param);
				console.log(22222222223333)   ;
				var loader = new THREE.STLLoader();
				loader.load( file, param);
				//console.log(geom)   ;
				 renderer = new THREE.WebGLRenderer({antialias: true,preserveDrawingBuffer: true}); //new THREE.CanvasRenderer();
                renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(500, 500);
				renderer.setClearColor(0xffffff);
				var ss = document.getElementById("3dv");
				console.log(ss);
                ss.appendChild( renderer.domElement );
				renderer.render( scene, camera );
				

				//ss = document.getElementById("se");
                //ss.appendChild( renderer.domElement );
            
				
				$("#ww").click(function() {
               // window.open( renderer.domElement.toDataURL("image/png"), "Final");
			  // dataimg = renderer.domElement.toDataURL("image/png").replace('data:image/png;base64,', '');
			   
			   $.ajax({
  type: "POST",
  url: "upimg.php",
  data: { 
     base64: dataimg
  }
})
console.log(dataimg);
				/*renderer.domElement.toBlob(function(blob) {
					saveAs(blob, "Final");
					});*/
                //return false;
            });
				
 











				
//console.log(fov);
//console.log(objectSize)
            }
console.log(22222222222222);

function img(x){
	 $.ajax({
  type: "POST",
  url: "upimg.php",
  data: { 
     base64: x
  }
})
console.log(x);
}
}
//gcodgen();
            function animate() {
                 
                requestAnimationFrame( animate );
                render();
               

            }

            function render() {
              //points.rotation.z += 0.01;
              //pattern.rotation.x += 0.01;
              //line2.rotation.y += 0.01;
              //line2.rotation.z += 0.01;
                if (mesh) {
					bar.style.display = 'none';
                    //mesh.rotation.z += 0.01;
                   // mesh.rotation.y += 0.01;
                    //mesh.rotation.x += 0.01;
                }
                //light1.position.z -= 1;
              dataimg = renderer.domElement.toDataURL("image/png").replace('data:image/png;base64,', '');
                renderer.render( scene, camera );
				//if(z == 10 ){img(dataimg);}  //take image
				z++
				//console.log(dataimg);

            }
 
	
     //window.location.reload(false);

		
		$('#fl').on('change', function() {
    var file_data = $('#fl').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append('file', file_data);
    //alert(form_data);                             
    $.ajax({
                url: 'upload.php', // point to server-side PHP script 
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         
                type: 'post',
                success: function(php_script_response){
                // alert(php_script_response); // display response from the PHP script, if any
                }
     });   var x = document.getElementById("fl").files.item(0).name; console.log(x);
	 init(x);
		render();  
});	

	