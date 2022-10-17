"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var verticesColors = new Float32Array( [
		//group1
		0.68, -0.49, 0.42, 0.7, 0.73,
		0.0, 0.71, 0.42, 0.7, 0.73,
		-0.24, 0.71, 0.42, 0.7, 0.73,
		0.31, -0.28, 0.42, 0.7, 0.73,
		-0.3, -0.28, 0.42, 0.7, 0.73,
		-0.42, -0.49, 0.42, 0.7, 0.73,	
		//group2
		-0.24, 0.71, 0.72, 0.85, 0.87, 
		-0.91, -0.49, 0.72, 0.85, 0.87,
		-0.78, -0.71, 0.72, 0.85, 0.87,
		-0.24, 0.28, 0.72, 0.85, 0.87,
		0.07, -0.28, 0.72, 0.85, 0.87,
		0.31, -0.28, 0.72, 0.85, 0.87,		
		//group3
		-0.78, -0.71, 0.9, 0.92, 0.93,
		0.56, -0.71, 0.9, 0.92, 0.93,
		0.68, -0.49, 0.9, 0.92, 0.93,
		-0.42, -0.49, 0.9, 0.92, 0.93,
		-0.11, 0.05, 0.9, 0.92, 0.93,	
		-0.24, 0.28, 0.9, 0.92, 0.93,		

	]);

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.09, 0.6, 0.57, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER,  verticesColors , gl.STATIC_DRAW );

	var FSIZE = verticesColors.BYTES_PER_ELEMENT;
	console.log(FSIZE);   //数组中每个元素的字节数

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, FSIZE*5, 0 );
	gl.enableVertexAttribArray( vPosition );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2 );
	gl.enableVertexAttribArray( vColor );

	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 6 );
	gl.drawArrays( gl.TRIANGLE_FAN, 6, 6 );
	gl.drawArrays( gl.TRIANGLE_FAN, 12, 6 );
}