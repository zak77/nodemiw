/**
 * @author aleeper / http://adamleeper.com/
 * @author mrdoob / http://mrdoob.com/
 * @author gero3 / https://github.com/gero3
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Description: A THREE loader for STL ASCII files, as created by Solidworks and other CAD programs.
 *
 * Supports both binary and ASCII encoded files, with automatic detection of type.
 *
 * The loader returns a non-indexed buffer geometry.
 *
 * Limitations:
 *  Binary decoding supports "Magics" color format (http://en.wikipedia.org/wiki/STL_(file_format)#Color_in_binary_STL).
 *  There is perhaps some question as to how valid it is to always assume little-endian-ness.
 *  ASCII decoding assumes file is UTF-8.
 *
 * Usage:
 *  var loader = new THREE.STLLoader();
 *  loader.load( './models/stl/slotted_disk.stl', function ( geometry ) {
 *    scene.add( new THREE.Mesh( geometry ) );
 *  });
 *
 * For binary STLs geometry might contain colors for vertices. To use it:
 *  // use the same code to load STL as above
 *  if (geometry.hasColors) {
 *    material = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
 *  } else { .... }
 *  var mesh = new THREE.Mesh( geometry, material );
 var fs = require('fs');
 
 */
 function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}
 var fs = require('fs');
 var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var xhr = new XMLHttpRequest();
var THREE = require('three');

 THREE.STLLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};
var bufs;
THREE.STLLoader.prototype = {

	constructor: THREE.STLLoader,

	load: function ( url, onLoad, onProgress, onError ) {


	var buf;
	//if(Object.prototype.toString.call(url)=='[object String]')
	fs.readFile("cube.stl",   function(err, data) {if(err) {       return console.log(err);    } buf = data;console.log('data= ');
var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }bufs = ab;
});
		//buf = fs.readFile(url);
//	else if(Object.prototype.toString.call(url)=='[object Uint8Array]')
	//	buf=url;
	isAscii = true;
	//bufs = toArrayBuffer(buf);
		console.log(url,'bur='+bufs);
		//this.parse(buf);
	/*for (var i=0, len=buf.length; i<len; i++) {
		if (buf[i] > 127) { isAscii=false; break; }
	}

	if (isAscii)
		return _parseSTLString(buf.toString());
	else
		return _parseSTLBinary(buf);


	
	*/
	
	/*	var scope = this;

		var loader = new THREE.FileLoader( scope.manager );
		loader.setResponseType( 'arraybuffer' );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( text ) );

		}, onProgress, onError );
*/
	},

	parse: function ( data ) {
//console.log(data);
		var isBinary = function () {

			var expect, face_size, n_faces, reader;
			reader = new DataView( binData );
			face_size = ( 32 / 8 * 3 ) + ( ( 32 / 8 * 3 ) * 3 ) + ( 16 / 8 );
			n_faces = reader.getUint32( 80, true );
			expect = 80 + ( 32 / 8 ) + ( n_faces * face_size );

			if ( expect === reader.byteLength ) {

				return true;

			}

			// An ASCII STL data must begin with 'solid ' as the first six bytes.
			// However, ASCII STLs lacking the SPACE after the 'd' are known to be
			// plentiful.  So, check the first 5 bytes for 'solid'.

			// US-ASCII ordinal values for 's', 'o', 'l', 'i', 'd'
			var solid = [ 115, 111, 108, 105, 100 ];

			for ( var i = 0; i < 5; i ++ ) {

				// If solid[ i ] does not match the i-th byte, then it is not an
				// ASCII STL; hence, it is binary and return true.

				if ( solid[ i ] != reader.getUint8( i, false ) ) return true;

 			}

			// First 5 bytes read "solid"; declare it to be an ASCII STL
			return false;

		};

		var binData = this.ensureBinary( data );

		return isBinary() ? this.parseBinary( binData ) : this.parseASCII( this.ensureString( data ) );

	},

	parseBinary: function ( data ) {

		var reader = new DataView( data );
		var faces = reader.getUint32( 80, true );
       
		var r, g, b, hasColors = false, colors;
		var defaultR, defaultG, defaultB, alpha;

		// process STL header
		// check for default color in header ("COLOR=rgba" sequence).
        //console.log(faces);
		

		var dataOffset = 84;
		var faceLength = 12 * 4 + 2;

		var geometry = new THREE.Geometry();

		var vertices = [];
		var normals = [];

		for ( var face = 0; face < faces; face ++ ) {

			var start = dataOffset + face * faceLength;
			var normalX = reader.getFloat32( start, true );
			var normalY = reader.getFloat32( start + 4, true );
			var normalZ = reader.getFloat32( start + 8, true );
            var normal = new THREE.Vector3(normalX, normalY, normalZ); //console.log(normal);
		/*	if ( hasColors ) {

				var packedColor = reader.getUint16( start + 48, true );

				if ( ( packedColor & 0x8000 ) === 0 ) {

					// facet has its own unique color

					r = ( packedColor & 0x1F ) / 31;
					g = ( ( packedColor >> 5 ) & 0x1F ) / 31;
					b = ( ( packedColor >> 10 ) & 0x1F ) / 31;

				} else {

					r = defaultR;
					g = defaultG;
					b = defaultB;

				}

			}*/

			for ( var i = 1; i <= 3; i ++ ) {

				var vertexstart = start + i * 12;

				geometry.vertices.push( 
				new THREE.Vector3(	reader.getFloat32( vertexstart, true ) ,
									reader.getFloat32( vertexstart + 4, true ),
									reader.getFloat32( vertexstart + 8, true ) ));
                // console.log(reader.getFloat32( vertexstart, true ), reader.getFloat32( vertexstart + 4, true ),reader.getFloat32( vertexstart + 8, true )  );
				//normals.push( normalX, normalY, normalZ );
              //
			/*	if ( hasColors ) {

					colors.push( r, g, b );

				}*/

			}
          geometry.faces.push(new THREE.Face3(face*3, face*3+1, face*3+2, normal));//console.log(normal);
		}

		//geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
		//geometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( normals ), 3 ) );

	/*	if ( hasColors ) {

			geometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( colors ), 3 ) );
			geometry.hasColors = true;
			geometry.alpha = alpha;

		}*/

		return geometry;

	},

	parseASCII: function ( data ) {
         // console.log('zz');
		var geometry, length, patternFace, patternNormal, patternVertex, result, text;
		geometry = new THREE.Geometry();
		patternFace = /facet([\s\S]*?)endfacet/g;

		var vertices = [];
		var normals = [];

		var normal = new THREE.Vector3();
var i = 0;
		while ( ( result = patternFace.exec( data ) ) !== null ) {

			text = result[ 0 ];
			patternNormal = /normal[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;

			while ( ( result = patternNormal.exec( text ) ) !== null ) {

				normal.x = parseFloat( result[ 1 ] );
				normal.y = parseFloat( result[ 3 ] );
				normal.z = parseFloat( result[ 5 ] );

			}

			patternVertex = /vertex[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;

			while ( ( result = patternVertex.exec( text ) ) !== null ) {

				geometry.vertices.push( new THREE.Vector3(parseFloat( result[ 1 ] ), parseFloat( result[ 3 ] ), parseFloat( result[ 5 ] ) ));
				normals.push( normal.x, normal.y, normal.z );
                
			}
geometry.faces.push(new THREE.Face3(i*3, i*3+1, i*3+2, normal)); i++;
		}

		//geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
		//geometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( normals ), 3 ) );

		return geometry;

	},

	ensureString: function ( buf ) {
//console.log(buf);
		if ( typeof buf !== "string" ) {

			var array_buffer = new Uint8Array( buf );

			if ( window.TextDecoder !== undefined ) {

				return new TextDecoder().decode( array_buffer );

			}

			var str = '';

			for ( var i = 0, il = buf.byteLength; i < il; i ++ ) {

				str += String.fromCharCode( array_buffer[ i ] ); // implicitly assumes little-endian

			}

			return str;

		} else {
   //console.log(buf);
			return buf;

		}

	},

	ensureBinary: function ( buf ) {
//console.log(buf);
		if ( typeof buf === "string" ) {

			var array_buffer = new Uint8Array( buf.length );
			for ( var i = 0; i < buf.length; i ++ ) {

				array_buffer[ i ] = buf.charCodeAt( i ) & 0xff; // implicitly assumes little-endian

			}
			return array_buffer.buffer || array_buffer;

		} else {

			return buf;

		}

	}

};
module.exports.STLLoader = THREE.STLLoader;