'use strict';

var gCanvas;
var gCtx;
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animals', 'puppy'] }
]

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas();
    addListeners();
    renderMeme();
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function addMouseListeners() {
    // gCanvas.addEventListener('mousemove', onMove);
    // gCanvas.addEventListener('mousedown', onDown);
    // gCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    // gCanvas.addEventListener('touchmove', onMove);
    // gCanvas.addEventListener('touchstart', onDown);
    // gCanvas.addEventListener('touchend', onUp);
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.height = elContainer.offsetHeight;
    gCanvas.width = elContainer.offsetWidth;
}

function renderMeme() {
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend
    }
    drawText('Enter Text', gCanvas.width / 2, 0);
}

function drawText(txt, x, y) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(txt, x, y);
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    // gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.font = '50px monospace';
    gCtx.fillStyle = 'white';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}