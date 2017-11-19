var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
camera.position.z = 4;

var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
var geometry = new THREE.Geometry();
var j;
var line;
var asnc = 0;
var x; var y; var z; var x1; var y1; var z1; var xf; var yf; var zf;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function path() 
{	
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
	xf = x1;
	yf = y1;
	zf = z1;
	
}

async function draw()
{
	var tmp = "L 0 0 0 1 0 0 7 L 1 0 0 1 1 0 80";
	str = tmp.split(" ");
	var strLength = str.length;
	var i = 0;
	for (i = 0; i < strLength; i += 8)
	{
		var speed = parseFloat(str[i + 7]);
		speed /=  60; 
		j = i;
		assign();
        	var p = 0;
		var dist = Math.sqrt(Math.pow((x1-x), 2)+Math.pow((y1-y), 2)+Math.pow((z1-z), 2));
		if (dist < speed)
		{
			path();
		}
		else{
			var n = dist / speed;
			var xn = (x1 - x) / n; var yn = (y1-y) / n; 
        		for ( p = 0; p <= n; p++)
			{
                		x1 = x + p * xn;
               			y1 = y + p * yn;
                		path();
        			await sleep(1000);
			}
			x1 = xf
			y1 = yf;
			z1 = zf;
			path(); 
		}   

	}
}
draw();
