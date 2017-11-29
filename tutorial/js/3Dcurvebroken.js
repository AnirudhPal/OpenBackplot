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
function drawCurve(x1,y1,x4,y4,xc,yc,prevx,prevy,prevz,plcnt)
{ 
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
	if ( plcnt === 0) {
	var curve = new THREE.CubicBezierCurve3(
		
		//Initialize the vectors
		new THREE.Vector2( ax, ay , prevz),
		new THREE.Vector2( x2, y2 , prevz),
		new THREE.Vector2( x3, y3 , prevz),
		new THREE.Vector2( bx, by , prevz)
		
	);}
	
	//Intialize the curve for xz plane
	if ( plcnt === 1) {
	var curve = new THREE.CubicBezierCurve3(
		
		//Initialize the vectors
		new THREE.Vector2( ax, prevy ,ay),
		new THREE.Vector2( x2, prevy ,y2),
		new THREE.Vector2( x3, prevy ,y3),
		new THREE.Vector2( bx, prevy ,by)
		
	);}

	//Intialize the curve for yz plane
	if ( plcnt === 2) {
	var curve = new THREE.CubicBezierCurve3(
		
		//Initialize the vectors
		new THREE.Vector2( prevx, ax, ay),
		new THREE.Vector2( prevx, x2, y2),
		new THREE.Vector2( prevx, x3, y3),
		new THREE.Vector2( prevx, bx, by)
		
	);}

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
drawCurve(1,0,0,1,0,0,0,0,0,0);
drawCurve(1,0,0,1,0,0,0,1,0,2);
animate();
