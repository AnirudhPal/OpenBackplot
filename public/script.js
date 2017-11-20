// Wait for things to Load
window.onload = function() {	
	// Get HTML Divisions
	var pad = document.getElementById('pad');
	var canvasArea = document.getElementById('canvas');

	// Get HTML Division Dimensions
	var w = canvasArea.offsetWidth;
	var h = canvasArea.offsetHeight;

	// Three JS Setup
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
	camera.position.z = 5;
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(w, h);

	// Link to HTML Division
	canvasArea.appendChild(renderer.domElement);

	// Geometry Setup
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	var cube = new THREE.Mesh(geometry, material);

	// Add to Scene	
	scene.add(cube);

	// Draw
	function animate() {
		cube.rotation.x += 0.1;
		cube.rotation.y += 0.1;
		renderer.render( scene, camera );
	}

	// Called Upon Input
	pad.addEventListener('input', animate);
	animate();
}
