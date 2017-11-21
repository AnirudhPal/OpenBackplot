// Wait for things to Load
window.onload = function() {	
	// Stores Previous Values
	var previousTextValue;

	// Get HTML Divisions
	var pad = document.getElementById('pad');
	var canvasArea = document.getElementById('canvas');

	// Get HTML Division Dimensions
	var w = canvasArea.offsetWidth;
	var h = canvasArea.offsetHeight;

	// Three JS Setup
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
	camera.position.z = 4;
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(w, h);
	
	// Link to HTML Division
	canvasArea.appendChild(renderer.domElement);

	// Controls
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.update();

	// Geometry Setup
	var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

	// Draw
	function dataChange() {
		// Store Text Value
		previousTextValue = pad.value;

		// Generate
		console.log(pad.value);
		dataParser();
	}

	// Animate
	function animate() {
		// Update Camera
		controls.update();
		
		// Render
		renderer.render(scene, camera);
	}

	// Sleep  Function to put the thread to sleep
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	// Function to draw the lines, it draws the lines between the points
	function drawLine(x,y,z,x1,y1,z1)
	{
		//Initialize the basis to create lines
		var geometry = new THREE.Geometry();
		
		//Add the line
		geometry.vertices.push(new THREE.Vector3(x,y,z), new THREE.Vector3(x1,y1,z1));
		
		//Initialize the line
		var line = new THREE.Line(geometry, material);
		
		//Add the newline to scene
		scene.add(line);
	}

	// Clear Scene
	function clearScene() {
		while(scene.children.length > 0){ 
			scene.remove(scene.children[0]); 
		}	
	}

	// According to the speed it draws every line that is in the string
	function dataParser() {	
		// Null Handler
		var tmp = previousTextValue;
		console.log(tmp);
		if(!tmp) {
			return;
		}

		// Clear Scene
		clearScene();

		// Split the string according to the delimeter	
		tmp = tmp.split("\n");
		var strLength = tmp.length;

		// Loop to go through each line and draw it on the screen according to the speed
		var i = 0;
		for (i = 0; i < strLength; i++)
		{
			// Split the string according to the delimeter
			var str = tmp[i].split(" ");
			if (str.length < 8)
				break;
			// Initialize the instance variables required for this function
			var x = parseFloat(str[1]);
			if (str[1] === "")
				break;
			var y = parseFloat(str[2]);
			if (str[2] === "")
				break;
			var z = parseFloat(str[3]);
			if (str[3] === "")
				break;
			var x1 = parseFloat(str[4]);
			if (str[4] === "")
				break;
			var y1 = parseFloat(str[5]);
			if (str[5] === "")
				break;
			var z1 = parseFloat(str[6]);
			if (str[6] === "")
				break;
			var speed = parseFloat(str[7]);
			if (str[7] === "")
				break;
			// Convert speed to 1 second speed
			speed /=  60;
			var p = 0;

			// Get the line distance
			var dist = Math.sqrt(Math.pow((x1-x), 2)+Math.pow((y1-y), 2)+Math.pow((z1-z), 2));
	
			// If speed is greater than the distance then just draw the line
			if (dist < speed)
			{
				//Draw the Line
				drawLine(x,y,z,x1,y1,z1);
			}
			else{
				// Get how many units are needed
				var n = dist / speed;
				//Get the unit distance for each time unit
				var xn = (x1 - x) / n; var yn = (y1-y) / n; var zn = (z1 - z) / n;

				//According to the units draw the line in each step
				for ( p = 0; p <= n; p++)
				{
					//Calculate the line size to draw according to the axises
					x1 = x + p * xn;
					y1 = y + p * yn;
					z1 = z + p * zn;

					//Draw the line
					drawLine(x,y,z,x1,y1,z1);

					//Sleep for the process to finish
					//await sleep(1000);
				}

				//Draw the remaining part of the line in case it is not a multiple of the speed
				x1 = parseFloat(str[4]);
				y1 = parseFloat(str[5]);
				z1 = parseFloat(str[6]);
				drawLine(x,y,z,x1,y1,z1);
			}

		}
	}

	// Track Change
	var didChangeOccur = function() {
		if(previousTextValue != pad.value){
			return true;
		}
		return false;
	};

	// Check after Interval of 1000
	setInterval(function()	{
			if(didChangeOccur()){
			dataChange();
			}
			}, 1000);

	// Render after Interval of 10
	setInterval(function() {
		animate();
	}, 10);

	// Called Upon Input
	pad.addEventListener('input', dataChange);
	dataChange();

	// ShareJS Stuff (Stores Stuff)
	sharejs.open('home', 'text', function(error, doc) {
			doc.attach_textarea(pad);
			dataChange();
			});
}
