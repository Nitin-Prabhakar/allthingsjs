/*Reference for 2D rotation
https://en.wikipedia.org/wiki/Rotation_matrix
*/
function Point3D(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;

	this.rotateX = function(angle)
	{
		var rad, cosa, sina, y, z
		rad = angle * Math.PI / 180
		cosa = Math.cos(rad)
		sina = Math.sin(rad)
		y = this.y * cosa - this.z * sina
		z = this.y * sina + this.z * cosa
		return new Point3D(this.x, y, z)
	}

	this.rotateY = function(angle)
	{
		var rad, cosa, sina, x, z
		rad = angle * Math.PI / 180
		cosa = Math.cos(rad)
		sina = Math.sin(rad)
		z = this.z * cosa - this.x * sina
		x = this.z * sina + this.x * cosa
		return new Point3D(x, this.y, z)
	}

	this.rotateZ = function(angle)
	{
		var rad, cosa, sina, x, y
		rad = angle * Math.PI / 180
		cosa = Math.cos(rad)
		sina = Math.sin(rad)
		x = this.x * cosa - this.y * sina
		y = this.x * sina + this.y * cosa
		return new Point3D(x, y, this.z)
	}

	this.project = function(viewWidth, viewHeight, fov, viewDistance)
	{
		console.log(this.x, this.y, this.z)
		var factor, x, y
		factor = fov / (viewDistance + this.z)
		x = this.x * factor + viewWidth / 2
		y = this.y * factor + viewHeight / 2
		console.log(x, y, this.z)
		return new Point3D(x, y, this.z)
	}

	this.perspective = function(v, vw, vh)
	{

		var x, y, xN, yN, xR, yR, viewDistanceinCoordinates;
		viewDistanceinCoordinates = new Object();
		viewDistanceinCoordinates.x = viewDistanceinCoordinates.y = 0;
		viewDistanceinCoordinates.z = v;

		//project the points onto the canvas

		x = this.x / (viewDistanceinCoordinates.z + this.z);
		y = this.y / (viewDistanceinCoordinates.z + this.z);

		//normalize

		xN = (x + cw / 2) / cw;
		yN = (y + ch / 2) / ch;

		//rasterize

		xR = Math.ceil(x * vw);
		yR = Math.ceil(y * vh);


		return new Point3D(xR, yR, this.z);
	}
};

function Cube()
{
	this.vertices = [
		new Point3D(-1, 1, -1),
		new Point3D(1, 1, -1),
		new Point3D(1, -1, -1),
		new Point3D(-1, -1, -1),
		new Point3D(-1, 1, 1),
		new Point3D(1, 1, 1),
		new Point3D(1, -1, 1),
		new Point3D(-1, -1, 1)
	];

	this.faces = [
		[0, 1, 2, 3],
		[1, 5, 6, 2],
		[5, 4, 7, 6],
		[4, 0, 3, 7],
		[0, 4, 5, 1],
		[3, 2, 6, 7]
	];
	this.angle = 0;
	this.draw = function()
	{
		var angle = this.angle;
		var vertices = this.vertices;
		var faces = this.faces;

		contextTransform.restore();
		contextTransform.setTransform(1, 0, 0, 1, 0, 0);
		contextTransform.translate(64, 123.4);
		contextTransform.clearRect(0, 0, cw, ch);
		contextTransform.translate(cw / 2, ch / 2);
		contextTransform.strokeStyle = "rgba(0,0,0,0.25)";
		var trajectory = [];
		for (var i = 0; i < vertices.length; i++)
		{
			var vertex = vertices[i];
			var rotation = vertex.rotateX(angle).rotateY(angle).rotateZ(angle).rotateZ(-angle).rotateX(angle);
			var projection = //rotation.project(0,0,128,3.5)
				rotation.perspective(4.59, cw, ch);
			trajectory.push(projection);
		}
		var colors = ["violet", "indigo", "blue", "green", "yellow", "orange"];
		var avg_z = new Array();
		for (var i = 0; i < faces.length; i++)
		{
			var f = faces[i];
			var avgZ = (trajectory[f[0]].z + trajectory[f[1]].z + trajectory[f[2]].z + trajectory[f[3]].z) / 4.0;
			avg_z[i] = {
				"index": i,
				"z": avgZ
			};
		}
		avg_z.sort(function(a, b)
		{
			return b.z - a.z;
		});
		for (var i = 0; i < faces.length; i++)
		{
			//var face = faces[i];
			//contextTransform.fillStyle = colors[i];
			var face = faces[avg_z[i].index];
			contextTransform.fillStyle = colors[avg_z[i].index];

			contextTransform.beginPath();
			contextTransform.moveTo(trajectory[face[0]].x, trajectory[face[0]].y);

			for (var j = 1; j < face.length; j++)
			{
				contextTransform.lineTo(trajectory[face[j]].x, trajectory[face[j]].y);
			}

			contextTransform.lineTo(trajectory[face[0]].x, trajectory[face[0]].y);

			contextTransform.closePath();
			contextTransform.fill();
			contextTransform.stroke();
		}
	};
	this.rotate = function()
	{
		this.draw();
		this.angle += 1 / 1;
	}
};

function loop()
{
	cube.rotate();
}

var canvasTransform = document.querySelector("#canvas-transform");
var contextTransform = canvasTransform.getContext("2d");
var imageTransform = new Image();
imageTransform.src = "schro.jpg";
var beginX = 0;
var beginY = 0;
var cw = canvasTransform.width / 1.5;
var ch = canvasTransform.height / 2.25;
contextTransform.save();
var cube = new Cube();
imageTransform.onload = function()
{
	console.clear();
	contextTransform.drawImage(image, beginX, beginY, canvas.width, canvas.height);
	setInterval(loop, 33);
	//loop();
};
