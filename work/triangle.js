"use strict";

var gl;
var points;

window.onload = function init(){
	// a
	var canvas = document.getElementById( "triangle-canvas-a" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		0.0, 0.0,
		0.5, 0.0,
		0.25, 0.5, 
		
	];

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 0.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader-a", "fragment-shader-a" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	console.log('a');

	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );

	// b

	var canvas = document.getElementById( "triangle-canvas-b" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		0.0, 0.0,
		0.5, 0.5,
		0.0, 0.5,
		0.0, 0.0,
		0.5, 0.0,
		0.5, 0.5,
	];

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 0.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader-b", "fragment-shader-b" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	console.log('b');

	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, 6 );

	// c

	var canvas = document.getElementById( "triangle-canvas-c" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		0.0, 0.0,
		0.5, 0.5,
		0.0, 0.5,
		0.0, 0.0,
		0.5, 0.0,
		0.5, 0.5,
		-0.5, -0.5,
		0.0, -0.5,
		-0.25,0.0
		
	];

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 0.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader-c", "fragment-shader-c" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	console.log('c');

	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, 9 );

	// d

	var canvas = document.getElementById( "triangle-canvas-d" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		0.0, 0.0,
		0.5, 0.5,
		0.0, 0.5,
		0.0, 0.0,
		0.5, 0.0,
		0.5, 0.5,
		-0.5, -0.5,
		0.0, -0.5,
		-0.25,0.0
	];


	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 0.0 );

	// Load shaders and initialize attribute buffers  加载着色器并初始化属性缓冲区
	var program = initShaders( gl, "vertex-shader-d", "fragment-shader-d" );
	gl.useProgram( program );
	
	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
	
	// Associate external shader variables with data buffer  将外部着色器变量与数据缓冲区关联
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, 6 );
		
	program = initShaders( gl, "vertex-shader-d", "fragment-shader2-d" );
	gl.useProgram( program );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	console.log('d');

	gl.drawArrays( gl.TRIANGLES, 6, 9 );

	// e

	var canvas = document.getElementById( "triangle-canvas-e" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var verticesColors = new Float32Array( [
		0.0, 0.0, 1.0, 0.0, 0.0,
		0.5, 0.0, 0.0, 1.0, 0.0,
		0.25, 0.5, 0.0, 0.0, 1.0,
	]);
	
	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 0.0 );
	
	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader-e", "fragment-shader-e" );
	gl.useProgram( program );
	
	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER,  verticesColors , gl.STATIC_DRAW );
	
	var FSIZE = verticesColors.BYTES_PER_ELEMENT;
	// console.log(FSIZE);   //数组中每个元素的字节数

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, FSIZE*5, 0 );
	gl.enableVertexAttribArray( vPosition );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2 );
	gl.enableVertexAttribArray( vColor );
	console.log('e');

	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
}


