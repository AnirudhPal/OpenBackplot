// Set Window Stuff
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Position the Camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Set Scene
var scene = new THREE.Scene();

// Define a Material
var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

// Define Geometry
var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));

var line = new THREE.Line(geometry, material);
scene.add(line);

function animate() {
	requestAnimationFrame( animate );
	line.scale.set(x,x,x);
	scene.add(line);
	renderer.render( scene, camera );
}



if (Detector.webgl) {
    // Initiate function or other initializations here
    animate();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
