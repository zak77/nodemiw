var exabs = 80,bedabs = 230,expla = 60,bedpla = 200;var exmat = exabs,bedmat = bedabs;
$('#printers').on('change', function() {
	alert(this.value);
	//if( header = htevo;
	});
$('#materials').on('change', function() {
	var matrl = document.getElementById("materials").value;
	if(matrl == 1){exmat = exabs;bedmat= bedabs;}
	if(matrl == 2){exmat = expla;bedmat= bedpla;}
	 
	});

function tevoHeader(layerno,extlen){
	alert(layerno,extlen);
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