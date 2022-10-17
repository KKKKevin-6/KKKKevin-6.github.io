"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;


//a
var pointsA = [];
var levelA = 4 ;

function initA(){
	canvas = document.getElementById( "gl-canvas-a" );
	
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}	
	
	// initialise data for Sierpinski gasket
	// first, initialise the corners of the gasket with three points.
	var vertices = [
		-1, -1,  0,
		 0,  1,  0,
		 1, -1,  0
	];

	// var u = vec3.create();
	// vec3.set( u, -1, -1, 0 );
	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	// var v = vec3.create();
	// vec3.set( v, 0, 1, 0 );
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	// var w = vec3.create();
	// vec3.set( w, 1, -1, 0 );
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

	divideTriangleA( u, v, w, levelA );

	// configure webgl
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// load shaders and initialise attribute buffers
	var program = initShaders( gl, "vertex-shader-a", "fragment-shader-a" );
	gl.useProgram( program );

	// load data into gpu
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( pointsA ), gl.STATIC_DRAW );

	// associate out shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	renderA();
	gl.drawArrays( gl.TRIANGLES, 0, pointsA.length/3 );
};

function triangleA( a, b, c ){
	//var k;
	pointsA.push( a[0], a[1], a[2] );
	pointsA.push( b[0], b[1], b[2] );
	pointsA.push( c[0], c[1], c[2] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( a[k] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( b[k] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( c[k] );
}

function divideTriangleA( a, b, c, count ){
	// check for end of recursion
	if( count == 0 ){
		triangleA( a, b, c );
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a, 0.5 );

		--count;

		// three new triangles
		divideTriangleA( a, ab, ca, count );
		divideTriangleA( b, bc, ab, count );
		divideTriangleA( c, ca, bc, count );
	}
}

function renderA(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, pointsA.length/3 );

}


function refreshA(){
	document.getElementById("levelA").onchange = function(event){
		levelA = event.target.value;
	}
	console.log("level-a="+levelA);
	pointsA = [];
	initA();
}


//b
var pointsB = [];
var colors = [];

var levelB = 3;

function initB() {
    canvas = document.getElementById("gl-canvas-b");
    
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    
    // initialise data for 3d sierpinski gasket
    // first initialize the vertices of the 3d gasket
    // four vertices on unit cicle
    // initial tetrahedron with equal length sides
    var vertices = [
    0.0000, 0.0000, -1.0000,
    0.0000, 0.9428, 0.3333,
    -0.8165, -0.4714, 0.3333,
    0.8165, -0.4714, 0.3333
    ];
    // var t = vec3.create();
    // vec3.set(t, vertices[0], vertices[1], vertices[2]);
    var t = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
    // var u = vec3.create();
    // vec3.set(u, vertices[3], vertices[4], vertices[5]);
    var u = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
    // var v = vec3.create();
    // vec3.set(v, vertices[6], vertices[7], vertices[8]);
    var v = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
    // var w = vec3.create();
    // vec3.set(w, vertices[9], vertices[10], vertices[11]);
    var w = vec3.fromValues( vertices[9], vertices[10], vertices[11] );

    divideTriangleB(t, u, v, w, levelB);

    // configure webgl
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // enable hidden-surface removal
    gl.enable(gl.DEPTH_TEST);

    // load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader-b", "fragment-shader-b");
    gl.useProgram(program);

    // create buffer object, initialize it, and associate it with
    // attribute variables in vertex shader

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointsB), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    renderB();
	gl.drawArrays(gl.TRIANGLES, 0, pointsB.length / 3);
};

function triangleB(a, b, c, color) {
    // add colors and vertices for one triangle
    var baseColor = [
        0.0, 0.7, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.3, 0.0,
        0.0, 0.0, 0.0
    ];

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        pointsB.push(a[k]);

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        pointsB.push(b[k]);

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        pointsB.push(c[k]);
}

function tetra(a, b, c, d) {
    triangleB(a, c, b, 0);
    triangleB(a, c, d, 1);
    triangleB(a, b, d, 2);
    triangleB(b, c, d, 3);
}

function divideTriangleB(a, b, c, d, count) {
    // check for end of recursion
    if (count == 0) {
        tetra(a, b, c, d);
    } else {
        var ab = vec3.create();
        vec3.lerp(ab, a, b, 0.5);
        var ac = vec3.create();
        vec3.lerp(ac, a, c, 0.5);
        var ad = vec3.create();
        vec3.lerp(ad, a, d, 0.5);
        var bc = vec3.create();
        vec3.lerp(bc, b, c, 0.5);
        var bd = vec3.create();
        vec3.lerp(bd, b, d, 0.5);
        var cd = vec3.create();
        vec3.lerp(cd, c, d, 0.5);

        --count;

        divideTriangleB(a, ab, ac, ad, count);
        divideTriangleB(ab, b, bc, bd, count);
        divideTriangleB(ac, bc, c, cd, count);
        divideTriangleB(ad, bd, cd, d, count);
    }

}

function renderB() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, pointsB.length / 3);
}

function refreshB(value){
	levelB = value;
	console.log("level-b="+levelB);
	pointsB = [];

    initB();
}


//C

var canvas;
var gl;

var pointsC = [];

/** Parameters */
var levelC = 4;
var thetaC =0;
var twistC =false;

// initialise data for Sierpinski gasket

// first, initialise the corners of the gasket with three points.
var vertices = [
	-1, -1,  0,
	0,  1,  0,
	1, -1,  0
];

function initC(){
	canvas = document.getElementById( "gl-canvas-c" );
	
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
	
	// R=0.6, Theta = 90, 210, -30

	// var u = vec3.create();
	// vec3.set( u, -1, -1, 0 );
	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	// var v = vec3.create();
	// vec3.set( v, 0, 1, 0 );
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	// var w = vec3.create();
	// vec3.set( w, 1, -1, 0 );
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

	divideTriangleC( u, v, w, levelC );

	// configure webgl
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// load shaders and initialise attribute buffers
	var program = initShaders( gl, "vertex-shader-c", "fragment-shader-c" );
	gl.useProgram( program );

	// load data into gpu
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( pointsC ), gl.STATIC_DRAW );

	// associate out shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	renderC();
	gl.drawArrays( gl.LINES, 0, pointsC.length/3 );
};

function tessellaTriangleC( a, b, c ){
    //var k;
    var zerovec3 = vec3.create();
    vec3.zero( zerovec3 );
    var radian = thetaC * Math.PI / 180.0;
    
    var a_new = vec3.create();
    var b_new = vec3.create();
    var c_new = vec3.create();

    if( twistC == false ){
        vec3.rotateZ( a_new, a, zerovec3, radian );
        vec3.rotateZ( b_new, b, zerovec3, radian );
        vec3.rotateZ( c_new, c, zerovec3, radian );
        
        pointsC.push( a_new[0], a_new[1], a_new[2] );
        pointsC.push( b_new[0], b_new[1], b_new[2] );
        pointsC.push( b_new[0], b_new[1], b_new[2] );
        pointsC.push( c_new[0], c_new[1], c_new[2] );
        pointsC.push( c_new[0], c_new[1], c_new[2] );
        pointsC.push( a_new[0], a_new[1], a_new[2] );
    }else{
        var d_a = Math.sqrt( a[0] * a[0] + a[1] * a[1] );
        var d_b = Math.sqrt( b[0] * b[0] + b[1] * b[1] );
        var d_c = Math.sqrt( c[0] * c[0] + c[1] * c[1] );

        vec3.set( a_new, a[0] * Math.cos(d_a * radian) - a[1] * Math.sin( d_a * radian ), 
            a[0] * Math.sin( d_a * radian ) + a[1] * Math.cos( d_a * radian ), 0 );
        vec3.set(b_new, b[0] * Math.cos(d_b * radian) - b[1] * Math.sin(d_b * radian),
            b[0] * Math.sin(d_b * radian) + b[1] * Math.cos(d_b * radian), 0);
        vec3.set(c_new, c[0] * Math.cos(d_c * radian) - c[1] * Math.sin(d_c * radian),
            c[0] * Math.sin(d_c * radian) + c[1] * Math.cos(d_c * radian), 0);
        
        pointsC.push(a_new[0], a_new[1], a_new[2]);
        pointsC.push(b_new[0], b_new[1], b_new[2]);
        pointsC.push(b_new[0], b_new[1], b_new[2]);
        pointsC.push(c_new[0], c_new[1], c_new[2]);
        pointsC.push(c_new[0], c_new[1], c_new[2]);
        pointsC.push(a_new[0], a_new[1], a_new[2]);
    
    }
}

function divideTriangleC( a, b, c, count ){
	// check for end of recursion
	if( count == 0 ){
		tessellaTriangleC( a, b, c );
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a, 0.5 );

		// three new triangles
		divideTriangleC( a, ab, ca, count-1 );
		divideTriangleC( ab, b, bc, count-1 );
        divideTriangleC( ca, bc, c, count-1 );
        divideTriangleC( ab, bc, ca, count-1 );
	}
}

function renderC(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.LINES, 0, pointsC.length/3 );
}

function refreshC(value){
	levelC = value;
	console.log("level-c="+levelC);
	pointsC = [];

	initC();
}


//d

var canvas;
var gl;

var pointsD = [];

/** Parameters */
var levelD = 4;
var thetaD=60;
var twistD=false;

var radiusD=1.0;

function initD(){
	canvas = document.getElementById( "gl-canvas-d" );

	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// initialise data for Sierpinski gasket

    // first, initialise the corners of the gasket with three points.
    // R=0.6, Theta = 90, 210, -30
	var vertices = [
        radiusD * Math.cos(90 * Math.PI / 180.0), radiusD * Math.sin(90 * Math.PI / 180.0),  0,
        radiusD * Math.cos(210 * Math.PI / 180.0), radiusD * Math.sin(210 * Math.PI / 180.0),  0,
        radiusD * Math.cos(-30 * Math.PI / 180.0), radiusD * Math.sin(-30 * Math.PI / 180.0),  0
	];

	// var u = vec3.create();
	// vec3.set( u, -1, -1, 0 );
	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	// var v = vec3.create();
	// vec3.set( v, 0, 1, 0 );
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	// var w = vec3.create();
	// vec3.set( w, 1, -1, 0 );
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

	divideTriangleD( u, v, w, levelD );

	// configure webgl
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// load shaders and initialise attribute buffers
	var program = initShaders( gl, "vertex-shader-d", "fragment-shader-d" );
	gl.useProgram( program );

	// load data into gpu
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( pointsD ), gl.STATIC_DRAW );

	// associate out shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	renderD();
	gl.drawArrays( gl.LINES, 0, pointsD.length/3 );
};

function tessellaTriangleD( a, b, c ){
    //var k;
    var zerovec3 = vec3.create();
    vec3.zero( zerovec3 );
    var radian = thetaD * Math.PI / 180.0;
    
    var a_new = vec3.create();
    var b_new = vec3.create();
    var c_new = vec3.create();

    if( twistD == false ){
        vec3.rotateZ( a_new, a, zerovec3, radian );
        vec3.rotateZ( b_new, b, zerovec3, radian );
        vec3.rotateZ( c_new, c, zerovec3, radian );
        
        pointsD.push( a_new[0], a_new[1], a_new[2] );
        pointsD.push( b_new[0], b_new[1], b_new[2] );
        pointsD.push( b_new[0], b_new[1], b_new[2] );
        pointsD.push( c_new[0], c_new[1], c_new[2] );
        pointsD.push( c_new[0], c_new[1], c_new[2] );
        pointsD.push( a_new[0], a_new[1], a_new[2] );
    }else{
        var d_a = Math.sqrt( a[0] * a[0] + a[1] * a[1] );
        var d_b = Math.sqrt( b[0] * b[0] + b[1] * b[1] );
        var d_c = Math.sqrt( c[0] * c[0] + c[1] * c[1] );

        vec3.set( a_new, a[0] * Math.cos(d_a * radian) - a[1] * Math.sin( d_a * radian ), 
            a[0] * Math.sin( d_a * radian ) + a[1] * Math.cos( d_a * radian ), 0 );
        vec3.set(b_new, b[0] * Math.cos(d_b * radian) - b[1] * Math.sin(d_b * radian),
            b[0] * Math.sin(d_b * radian) + b[1] * Math.cos(d_b * radian), 0);
        vec3.set(c_new, c[0] * Math.cos(d_c * radian) - c[1] * Math.sin(d_c * radian),
            c[0] * Math.sin(d_c * radian) + c[1] * Math.cos(d_c * radian), 0);
        
        pointsD.push(a_new[0], a_new[1], a_new[2]);
        pointsD.push(b_new[0], b_new[1], b_new[2]);
        pointsD.push(b_new[0], b_new[1], b_new[2]);
        pointsD.push(c_new[0], c_new[1], c_new[2]);
        pointsD.push(c_new[0], c_new[1], c_new[2]);
        pointsD.push(a_new[0], a_new[1], a_new[2]);
    
    }
}

function divideTriangleD( a, b, c, count ){
	// check for end of recursion
	if( count == 0 ){
		tessellaTriangleD( a, b, c );
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a, 0.5 );

		// three new triangles
		divideTriangleD( a, ab, ca, count-1 );
		divideTriangleD( ab, b, bc, count-1 );
        divideTriangleD( ca, bc, c, count-1 );
        divideTriangleD( ab, bc, ca, count-1 );
	}
}

function renderD(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.LINES, 0, pointsD.length/3 );
}

function refreshD(){
	document.getElementById("degreeD").onchange = function(event){
		thetaD = event.target.value;
	}
	console.log("thetaD="+thetaD);
	pointsD = [];

	initD();
	
}


//e
var canvas;
var gl;

var pointsE = [];

/** Parameters */
var levelE = 4;
var thetaE=180;
var twistE=true;

var radiusE=1.0;

function initE(){
	canvas = document.getElementById( "gl-canvas-e" );

	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// initialise data for Sierpinski gasket

    // first, initialise the corners of the gasket with three points.
    // R=0.6, Theta = 90, 210, -30
	var vertices = [
        radiusE * Math.cos(90 * Math.PI / 180.0), radiusE * Math.sin(90 * Math.PI / 180.0),  0,
        radiusE * Math.cos(210 * Math.PI / 180.0), radiusE * Math.sin(210 * Math.PI / 180.0),  0,
        radiusE * Math.cos(-30 * Math.PI / 180.0), radiusE * Math.sin(-30 * Math.PI / 180.0),  0
	];

	// var u = vec3.create();
	// vec3.set( u, -1, -1, 0 );
	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	// var v = vec3.create();
	// vec3.set( v, 0, 1, 0 );
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	// var w = vec3.create();
	// vec3.set( w, 1, -1, 0 );
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

	divideTriangleE( u, v, w, levelE );

	// configure webgl
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// load shaders and initialise attribute buffers
	var program = initShaders( gl, "vertex-shader-e", "fragment-shader-e" );
	gl.useProgram( program );

	// load data into gpu
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( pointsE ), gl.STATIC_DRAW );

	// associate out shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	renderE();
	gl.drawArrays( gl.LINES, 0, pointsE.length/3 );
};

function tessellaTriangleE( a, b, c ){
    //var k;
    var zerovec3 = vec3.create();
    vec3.zero( zerovec3 );
    var radian = thetaE * Math.PI / 180.0;
    
    var a_new = vec3.create();
    var b_new = vec3.create();
    var c_new = vec3.create();

    if( twistE == false ){
        vec3.rotateZ( a_new, a, zerovec3, radian );
        vec3.rotateZ( b_new, b, zerovec3, radian );
        vec3.rotateZ( c_new, c, zerovec3, radian );
        
        pointsE.push( a_new[0], a_new[1], a_new[2] );
        pointsE.push( b_new[0], b_new[1], b_new[2] );
        pointsE.push( b_new[0], b_new[1], b_new[2] );
        pointsE.push( c_new[0], c_new[1], c_new[2] );
        pointsE.push( c_new[0], c_new[1], c_new[2] );
        pointsE.push( a_new[0], a_new[1], a_new[2] );
    }else{
        var d_a = Math.sqrt( a[0] * a[0] + a[1] * a[1] );
        var d_b = Math.sqrt( b[0] * b[0] + b[1] * b[1] );
        var d_c = Math.sqrt( c[0] * c[0] + c[1] * c[1] );

        vec3.set( a_new, a[0] * Math.cos(d_a * radian) - a[1] * Math.sin( d_a * radian ), 
            a[0] * Math.sin( d_a * radian ) + a[1] * Math.cos( d_a * radian ), 0 );
        vec3.set(b_new, b[0] * Math.cos(d_b * radian) - b[1] * Math.sin(d_b * radian),
            b[0] * Math.sin(d_b * radian) + b[1] * Math.cos(d_b * radian), 0);
        vec3.set(c_new, c[0] * Math.cos(d_c * radian) - c[1] * Math.sin(d_c * radian),
            c[0] * Math.sin(d_c * radian) + c[1] * Math.cos(d_c * radian), 0);
        
        pointsE.push(a_new[0], a_new[1], a_new[2]);
        pointsE.push(b_new[0], b_new[1], b_new[2]);
        pointsE.push(b_new[0], b_new[1], b_new[2]);
        pointsE.push(c_new[0], c_new[1], c_new[2]);
        pointsE.push(c_new[0], c_new[1], c_new[2]);
        pointsE.push(a_new[0], a_new[1], a_new[2]);
    
    }
}

function divideTriangleE( a, b, c, count ){
	// check for end of recursion
	if( count == 0 ){
		tessellaTriangleE( a, b, c );
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a, 0.5 );

		// three new triangles
		divideTriangleE( a, ab, ca, count-1 );
		divideTriangleE( ab, b, bc, count-1 );
        divideTriangleE( ca, bc, c, count-1 );
        divideTriangleE( ab, bc, ca, count-1 );
	}
}

function renderE(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.LINES, 0, pointsE.length/3 );
}

function refreshE(){
	document.getElementById("degreeE").onchange = function(event){
		thetaE = event.target.value;
	}
	console.log("thetaE="+thetaE);
	pointsE = [];

	initE();
	
}


window.onload = function(){
	initA;
	initB;
	initC;
	initD;
	initE;
};