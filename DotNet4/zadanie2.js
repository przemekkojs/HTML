"use strict";
 
function ready(callback) {
    if (document.readyState != 'loading')
		callback();	
    else if (document.addEventListener)
		document.addEventListener('DOMContentLoaded', callback);	
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState == 'complete') callback();
    });
}

ready(function() {
    init2();
});

function init2() {
	let drawingCanvases = document.getElementsByClassName('drawingX');
	console.log(drawingCanvases);
	
	for (let drawingCanvas of drawingCanvases) {
		let context = drawingCanvas.getContext('2d');
		context.strokeStyle = 'white';
		drawLine(drawingCanvas, context, null, 0, drawingCanvas.height, drawingCanvas.width, 0);
		drawLine(drawingCanvas, context, null, drawingCanvas.width, drawingCanvas.height, 0, 0);
		
		drawingCanvas.addEventListener('mousemove', (evt) => {	
			context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
		
			drawLineToMouse(drawingCanvas, context, evt, 0, 0);
			drawLineToMouse(drawingCanvas, context, evt, drawingCanvas.width, 0);
			drawLineToMouse(drawingCanvas, context, evt, drawingCanvas.width, drawingCanvas.height);
			drawLineToMouse(drawingCanvas, context, evt, 0, drawingCanvas.height);
		});
		
		drawingCanvas.addEventListener('mouseleave', (evt) => {			
			context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
		
			drawLine(drawingCanvas, context, evt, 0, drawingCanvas.height, drawingCanvas.width, 0);
			drawLine(drawingCanvas, context, evt, drawingCanvas.width, drawingCanvas.height, 0, 0);
		});
	}
	
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function drawLine(canvas, context, evt, startX, startY, endX, endY) {
	context.beginPath();
	context.moveTo(endX, endY);
	context.lineTo(startX, startY);
	context.closePath();		
	
	context.stroke();
}

function drawLineToMouse(canvas, context, evt, startX, startY) {
	let pos = getMousePos(canvas, evt);
	
	context.beginPath();
	context.moveTo(pos.x, pos.y);
	context.lineTo(startX, startY);
	context.closePath();		
	
	context.stroke();
}