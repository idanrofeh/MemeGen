'use strict';

var gCanvas;
var gCtx;

function init() {
    addListeners();
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

function onDown(ev) { }

function resizeCanvas() {
    // var elContainer = document.querySelector('.canvas-container');
    // gCanvas.height = elContainer.offsetHeight;
    // gCanvas.width = elContainer.offsetWidth;
}

function renderMeme() {
    var img = new Image();
    var imgIdx = gImgs.findIndex(el => el.id === gMeme.selectedImgId)
    img.src = gImgs[imgIdx].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        if (gMeme.lines[0]) {
            var elMemeLine1 = gMeme.lines[0];
            drawText(elMemeLine1, gCanvas.width / 2, gCanvas.height / 10);
        }
        if (gMeme.lines[1]) {
            var elMemeLine2 = gMeme.lines[1];
            drawText(elMemeLine2, gCanvas.width / 2, gCanvas.height * 0.9);
        }
    }
}

function drawText(line, x, y) {
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.strokeStyle = line['stroke-color'];
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillStyle = line['text-color'];
    gCtx.fillText(line.txt, x, y);
    gCtx.strokeText(line.txt, x, y);
}

function renderGenerator() {
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.about').classList.add('hidden');
    document.querySelector('.generator').classList.remove('hidden');
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas();
    renderMeme();
}

function setTextColor(color) {
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    selectedLine['text-color'] = color;
    renderMeme();
}

function setStrokeColor(color) {
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    selectedLine['stroke-color'] = color;
    renderMeme();
}

function onSwitchLine() {
    switchLines();
    renderMeme();
}

function onSetFontSize(size) {
    setFontSize(size);
    renderMeme();
}

function onRenoveLine() {
    removeLine();
    renderMeme();
}

function onSetFont(font) {
    setFont(font);
    renderMeme();
}


function onUpload() {
    var img = new Image()
    img.src = prompt('Please enter URL or img path');
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function onDownload(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas';
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onShare() {
    document.querySelector('.generator').classList.add('hidden');
    document.querySelector('.share-window-container').classList.remove('hidden');
}

function onSave() {
    saveToStorage(gMeme, 'memeDB');
}

function onFacebookShare() {
    uploadImg();
}