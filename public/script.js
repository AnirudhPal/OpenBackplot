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
	camera.position.y = 4;
	camera.position.x = 4;
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(w, h);

	// Link to HTML Division
	canvasArea.appendChild(renderer.domElement);

	// Controls
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.update();

	// Geometry Setup
	var material = new THREE.LineBasicMaterial( { color : 0x00ff00, linewidth: 10 } );

	// Draw
	function dataChange() {
		// Store Text Value
		previousTextValue = pad.value;

		// Parse
		gCodeInterpretor(pad.value);
		//dataParser(pad.value);
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

	//Draw curves 
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
		var materialC = new THREE.LineBasicMaterial( { color : 0xff0000, linewidth: 10 } );

		// Create the final object to add to the scene
		var curveObject = new THREE.Line( geometry, materialC );

		//Add the initialized curve to the scene
		scene.add( curveObject );
		//renderer.render( scene, camera );
	}

	// Clear Scene
	function clearScene() {
		while(scene.children.length > 0){ 
			scene.remove(scene.children[0]); 
		}	
	}

	// According to the speed it draws every line that is in the string
	function dataParser(str) {	
		// Null Handler
		var tmp = str
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
			if (str[0] === "L"){
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
			} else 
			{
				drawCurve(x,y,z,x1,y1,z1,speed);
			}

		}
	}

	// GCode --> LCode
	function gCodeInterpretor(str)
	{
		//if the string is null return
		if (!str)
		{
			return;
		}

		// Stores Output
		var out = '';

		//Convert lines to array of lines
		var lineArray = str.split("\n");

		// Previous XYZ
		var prevX = 0.0;
		var prevY = 0.0;
		var prevZ = 0.0;

		//Go through every line
		var i = 0;
		for (i = 0; i < lineArray.length; i++ )
		{
			var forceL = 0;

			// G18/G19 Skip
			if(lineArray[i].indexOf('G18') > -1 || lineArray[i].indexOf('G19') > -1)
				forceL = 1;

			// Split into Words
			var words = lineArray[i].split(" ");

			// Check Number, Length & G of Words
			var len = words.length;
			if(len < 1 || words[0].indexOf('N') < 0)
				continue;


			// Iterate till No G
			var j = 0;
			for(j = 1; j < len; j++) {
				// If Not G
				if(words[j].indexOf('G') < 0)
					break;
			}

			// Continue if Len
			if(j >= len)
				continue;

			// Else Get X Y Z
			var X = -9999.9999;
			var Y = -9999.9999;
			var Z = -9999.9999;
			var I = -9999.9999;
			var J = -9999.9999; 
			for(; j < len; j++) {
				// See if X
				if(words[j].indexOf('X') > -1) {
					X = parseFloat(words[j].substr(1));
				}

				// See if Y
				if(words[j].indexOf('Y') > -1) {
					Y = parseFloat(words[j].substr(1));	
				}

				// See if Z
				if(words[j].indexOf('Z') > -1) {
					Z = parseFloat(words[j].substr(1));
				}

				// See if I
				if(words[j].indexOf('I') > -1) {
					I = parseFloat(words[j].substr(1));
				}

				// See if J
				if(words[j].indexOf('J') > -1) {
					J = parseFloat(words[j].substr(1));
				}
			}

			// Continue if XYZ
			if(X === -9999.9999 && Y === -9999.9999 && Z === -9999.9999)
				continue;

			// Fix
			if(X === -9999.9999)
				X = prevX;
			if(Y === -9999.9999)
				Y = prevY;
			if(Z === -9999.9999)
				Z = prevZ;

			// For G02/G2/G03/G3
			if((lineArray[i].indexOf('G02') > -1 || lineArray[i].indexOf('G2') > -1 || lineArray[i].indexOf('G03') > -1 || lineArray[i].indexOf('G3') > -1) && forceL === 0) {
				// Skip if Missing I/J
				if (I === -9999.9999 || J === -9999.9999)
					continue;

				out += 'C ' + prevX + ' ' + prevY + ' ' + X + ' ' + Y + ' ' + (prevX + I) + ' ' + (prevY + J) + ' ' + Z + '\n';
			}
			// For G1/G01/G0/G/G00
			else {
				out += 'L ' + prevX + ' ' + prevY + ' ' + prevZ + ' ' + X + ' ' + Y + ' ' + Z + ' ' + '100\n';
			}

			// Set
			prevX = X;
			prevY = Y;
			prevZ = Z;
		}

		// Print
		console.log(out);
		dataParser(out);
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
	if(document.location.pathname.length > 1) {
		var documentName = document.location.pathname.substring(1);
		sharejs.open(documentName, 'text', function(error, doc) {
				doc.attach_textarea(pad);
				dataChange();
				});        
	}

}


