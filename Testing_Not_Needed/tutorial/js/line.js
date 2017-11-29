/**Global Variables For The View**/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
camera.position.z = 5;
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

function animate()
{
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}

//Function to draw the curve in the view
function drawCurve(x1,y1,x4,y4,xc,yc,z)
{ 
	// Shift Grid
	var xoff = xc;
	var yoff = yc;
	
	// Fix
	xc = 0;
	yc = 0;
	x1 = x1 - xoff;
	y1 = y1 - yoff;
	x4 = x4 - xoff;
	y4 = y4 - yoff;
	
	//Compute Bezier Curve
	var ax = x1 - xc;
	var ay = y1 - yc;
	var bx = x4 - xc;
	var by = y4 - yc;
	var q1 = Math.pow(ax,2) + Math.pow(ay,2);
	var q2 = q1 + (ax * bx) + (ay * by);
	var k2 = (4.0 / 3.0) * (parseFloat(Math.sqrt(2 * q1 * q2) - q2) / parseFloat((ax * by) - (ay * bx)));
	var x2 = xc + ax - (k2 * ay);
	var y2 = yc + ay + (k2 * ax);
	var x3 = xc + bx + (k2 * by);
	var y3 = yc + by - (k2 * bx);
	
	//Intialize the curve for xy plane
	var curve = new THREE.CubicBezierCurve3(
		
		//Initialize the vectors
		new THREE.Vector3( ax + xoff, ay + yoff, z),
		new THREE.Vector3( x2 + xoff, y2 + yoff, z),
		new THREE.Vector3( x3 + xoff, y3 + yoff, z),
		new THREE.Vector3( bx + xoff, by + yoff, z)
		
	);
	


	//Set the points
	var points = curve.getPoints( 50 );
	var geometry = new THREE.BufferGeometry().setFromPoints( points );
	
	//Set the material to draw
	var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

	// Create the final object to add to the scene
	var curveObject = new THREE.Line( geometry, material );

	//Add the initialized curve to the scene
	scene.add( curveObject );
	//renderer.render( scene, camera );
}
drawCurve(2,1,1,2,1,1,0);
drawCurve(1,0,0,1,0,0,0);
//drawCurve(0,0.3147,0,1.6103,0,0.9625,-0.025);
animate();
