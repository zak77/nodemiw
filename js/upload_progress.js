var bar =document.getElementById("brf");
			


function upload_image() 
{
	var dbut = document.getElementById("dbut");
			var gcg = document.getElementById("gcg");
			var upf = document.getElementById("upload_file").files[0].name;
	var gbut = document.getElementById("gcg");
	var upp = document.getElementById("flb");
	var upfl =document.getElementById("upload_file");
	var ado =document.getElementById("button1");
	var x = upf.split('.').pop();
	if(!(x == 'stl' || x == 'STL') ){
		
		
	}
	//var gbut = document.getElementById("gcg");
	
     partfile = 'gc/temp/'+timestamp+upf;
	 filen = "gc"+timestamp+".gcode";
	 upp.style.display= 'none';
	 upfl.style.height= '20px';
	 document.getElementById("dbut").href="download.php?nama=gc/"+filen;
	 //alert('gc/'+filen);
  var bar1 = $('#bar1');
  var percent = $('#percent1');
  $('#myForm').ajaxForm({
    beforeSubmit: function() {
      document.getElementById("progress_div").style.display="block";
      var percentVal = '0%';
      bar1.width(percentVal)
      percent.html(percentVal);
    },

    uploadProgress: function(event, position, total, percentComplete) {
      var percentVal = percentComplete + '%';
      bar1.width(percentVal)
      percent.html(percentVal);
    },
    
	success: function() {
		gbut.style.display = 'block'
	ado.style.display = 'block'
      var percentVal = '100%';
      bar1.width(percentVal)
      percent.html(percentVal);
	//  alert('uploaded');
    },

   
  }); 
}