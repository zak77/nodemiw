 var camera, scene, renderer,
            geometry, material, mesh, light1, stats;
var geom = new THREE.Geometry();
           
var ar = window.innerWidth / window.innerHeight; 
			var wl; var gg;
var wr;
var ht;
var hb;
var b;
var z = 0;
var dataimg;

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
/////////////////////////////////////////////////////
					  
var texture =  new THREE.TextureLoader().load('metal1.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );
var texture1 =  new THREE.TextureLoader().load('plred.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );
var texture2 =  new THREE.TextureLoader().load('cloth.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );
var texture3 =  new THREE.TextureLoader().load('blasted.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );
var texture4 =  new THREE.TextureLoader().load('copp.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );
var texture5 =  new THREE.TextureLoader().load('3dpr.jpg', function ( texture ) { texture.wrapS = texture.wrapT = THREE.RepeatWrapping;texture.offset.set( 0, 0 ); texture.repeat.set( 2, 2 );} );

                renderer = new THREE.WebGLRenderer({antialias: true,preserveDrawingBuffer: true}); //new THREE.CanvasRenderer();
                renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(600, 600);
				renderer.setClearColor(0xffffff);
				document.body.appendChild( renderer.domElement );
function boundbox(geo){
				if(geo.boundingBox === null ) geo.computeBoundingBox ();
				geo.computeBoundingBox();
				var box = geo.BoundingBox;
				//console.log( geo.boundingBox.max.x-geo.boundingBox.min.x,geo.boundingBox.max.y-geo.boundingBox.min.y,geo.boundingBox.max.z-geo.boundingBox.min.z );
            wl = geo.boundingBox.max.x-geo.boundingBox.min.x;
			ht = geo.boundingBox.max.z-geo.boundingBox.min.z;
			b = geo.boundingBox.max.y-geo.boundingBox.min.y;
							}
			
			
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
            var def = 'cube.stl';
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
							 
        console.log(geom.faces);
       faceuvmapper(geom);
	 
         ///////////MATERIAL/////////////////////////
		 $('#s2').on('change', function() {
                 var t = document.getElementById("s2").value;console.log(t);
	var material0 = new THREE.MeshPhongMaterial({overdraw:true,color: 0xffffff,specular:0x333333,bumpScale : 0.1,shininess: 200,reflectivity: 1,shading: THREE.FlatShading, map: texture});
	var material1 = new THREE.MeshPhongMaterial({overdraw:true,color: 0xffffff,specular:0x333333,bumpScale : 0.1,shininess: 1,reflectivity: 0.2,shading: THREE.FlatShading, map: texture1});
	var material2 = new THREE.MeshPhongMaterial({overdraw:true,color: 0xffffff,specular:0x333333,bumpScale : 1,shininess: 0.5,reflectivity: 1,shading: THREE.FlatShading, map: texture2});
	var material3 = new THREE.MeshPhongMaterial({overdraw:true,color: 0xffffff,specular:0x333333,bumpScale : 0.1,shininess: 0.01,reflectivity: 0,shading: THREE.FlatShading, map: texture3});
	var material4 = new THREE.MeshPhongMaterial({overdraw:true,color: 0xffffff,specular:0x777777,bumpScale : 1,shininess: 200,reflectivity: 1,shading: THREE.FlatShading, map: texture4});
	var material5 = new THREE.MeshPhongMaterial({overdraw:true,color: 0xffffff,specular:0x333333,bumpScale : 0.1,shininess: 20,reflectivity: 1,shading: THREE.FlatShading, map: texture5});
	var material6 = new THREE.MeshPhongMaterial({overdraw:true,color: 0x00ccff,specular:0x333333,bumpScale : 0.1,shininess: 50,reflectivity: 1,shading: THREE.FlatShading});
				var materials = [material6,material0,material1,material2,material3,material4,material5];
				mesh.material = materials[t];			
				}	);
				
				
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
                         scene.add(mesh); 
                			mesh.rotation.x = -1;
                            mesh.rotation.z = 1;
                            mesh.rotation.y = 0;					
							 
			           mesh1 = new THREE.Mesh(geom1, material );
                       mesh1.position.set(50,150,600);
				       //scene.add( mesh1 );
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
                var Volume;Volume = calculateVolume(mesh); 
		         console.log('Volume = '+Volume+'mm3');
				 document.getElementById("data").innerHTML = 'Volume = '+Volume+			
				 '   /nCost = '+Volume*0.13+'Rs.';
				 
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
				
				//renderer.render( scene, camera );
				
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
            function animate() {
                 
                requestAnimationFrame( animate );
                render();
               

            }

            function render() {
                
               // mesh.rotation.x += 0.0;
                if (mesh) {
                    mesh.rotation.z += 0.01;
                    //mesh.rotation.y += 0.01;
                }
                //light1.position.z -= 1;
              dataimg = renderer.domElement.toDataURL("image/png").replace('data:image/png;base64,', '');
                renderer.render( scene, camera );
				//if(z == 10 ){img(dataimg);}  //take image
				z++
				//console.log(dataimg);

            }
 
	
     //window.location.reload(false);

		</script>
<script>
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
