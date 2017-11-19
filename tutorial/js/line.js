//var THREE = require('three');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
camera.position.z = 4;

var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
var geometry = new THREE.Geometry();
var j;
var speed;
var line;
var asnc = 0;
var x; var y; var z; var x1; var y1; var z1;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function path() 
{//	requestAnimationFrame( animate );
	// Compute Distance Between 2 Point
		var dist = Math.sqrt(Math.pow((x1-x), 2)+Math.pow((y1-y), 2)+Math.pow((z1-z), 2));
		console.log(dist);

		
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(x,y,z), new THREE.Vector3(x1,y1,z1));
		line = new THREE.Line(geometry, material);
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
	speed = parseFloat(str[j + 7]);
}

async function draw()
{
	var tmp = "L 0 0 0 1 0 0 10 L 1 0 0 1 1 0 10";
	str = tmp.split(" ");
	var strLength = str.length;
	var i = 0;
	for (i = 0; i < strLength; i += 8)
	{
		j = i;
		assign();
		var xs = (x1 - x)/500.0; var ys = (y1 - y ) / 500.0;
        	var p = 0;
        	for ( p = 0; p < 500; p++)
		{
                	x1 = x + p * xs;
               		y1 = y + p * ys;
                	path();
        		await sleep(10);
		}       

	}
}
draw();
