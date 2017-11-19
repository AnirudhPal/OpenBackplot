var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 4;

var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
var geometry = new THREE.Geometry();
var j;
var x; var y; var z; var x1; var y1; var z1;
function path() 
{	
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(x,y,z), new THREE.Vector3(x1,y1,z1));
		var line = new THREE.Line(geometry, material);
		scene.add(line);
		renderer.render( scene, camera );
}
function assign()
{
	x = parseFloat(str[j + 1]);
	y = parseFloat(str[j + 2]);
	z = parseFloat(str[j + 3]);
	x1 = parseFloat(str[j + 4]);
	y1 = parseFloat(str[j + 5]);
	z1 = parseFloat(str[j + 6]);
}

function draw()
{
	var tmp = "L 0 0 0 0 0.89 0 10"
	str = tmp.split(" ");
	var strLength = str.length;
	var i = 0;
	for (i = 0; i < strLength; i += 8)
	{
		j = i;
		assign();
		path();
	}
}
draw();
