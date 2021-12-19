'use strict';

var gCanvas;
var gCtx;
var gStartPos;

function renderGenerator() {
    addListeners();
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    addLinePos();
    renderMeme();
    cleanInputs();
    movePage('generator');
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function addMouseListeners() {
    document.body.addEventListener('mousedown', stopEdit);
}

function addTouchListeners() {
    document.body.addEventListener('touchstart', stopEdit);
}

function stopEdit() {
    gIsEdit = false;
    renderMeme();
}

function startEdit() {
    gIsEdit = true;
    renderMeme();
}

function renderMeme() {
    var img = new Image();
    var imgIdx = gImgs.findIndex(el => el.id === gMeme.selectedImgId)
    img.src = gImgs[imgIdx].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        gMeme.lines.forEach((el) => drawText(el, el.pos.x, el.pos.y))
        if (gIsEdit && gMeme.lines.length) {
            focusEditedLine();
        }
    }
}

function focusEditedLine() {
    if (!gMeme.lines) return;
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    let text = gCtx.measureText(`${selectedLine.txt}`);
    gCtx.strokeStyle = 'black';
    gCtx.beginPath();
    gCtx.rect(
        selectedLine.pos.x - text.width / 2,
        selectedLine.pos.y - selectedLine.size / 2,
        text.width,
        selectedLine.size
    )
    gCtx.stroke();
}

function cleanInputs() {
    var defaultLine = {
        txt: '',
        size: '40',
        font: 'Impact',
        'stroke-color': '#000000',
        'txt-color': '#ffffff'
    }
    syncControls(defaultLine);
}

function syncControls(line) {
    document.getElementById('txt').value = line.txt;
    document.getElementById('stroke-color').value = line['stroke-color'];
    document.getElementById('txt-color').value = line['text-color'];
    document.getElementById('text-size').value = line.size;
    document.getElementById('font').value = line.font;
}

function onSetTextProperty(property, value) {
    setTextProperty(property, value);
    renderMeme();
}

function onSwitchLine() {
    if (!gMeme.lines.length) return;
    switchLines(selectedLine);
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    syncControls(selectedLine);
    renderMeme();
}

function onMoveLine(value) {
    moveLine(value);
    renderMeme();
}

function onRemoveLine() {
    removeLine();
    renderMeme();
}

function onAddLine() {
    addLine();
    renderMeme();
}

function drawText(line, x, y, ctx = gCtx) {
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.strokeStyle = line['stroke-color'];
    ctx.font = `${line.size}px ${line.font}`;
    ctx.fillStyle = line['text-color'];
    ctx.fillText(line.txt, x, y);
    ctx.strokeText(line.txt, x, y);
}

function onDownload(elLink) {
    gIsEdit = false;
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas';
}

function onShare() {
    gIsEdit = false;
    movePage('share-window')
}

function onSave() {
    gSavedMemes = loadFromStorage(STORAGE_KEY);
    if (!gSavedMemes) {
        gSavedMemes = [gMeme];
    } else {
        gSavedMemes.push(gMeme);
    }
    saveToStorage(STORAGE_KEY, gSavedMemes);
    renderSavedMemes();
}

function onUpload() {
    uploadImg();
}

function renderSavedMemes() {
    gSavedMemes = loadFromStorage(STORAGE_KEY);
    if (gSavedMemes) {
        document.querySelector('.saved-memes-section').innerHTML = '';
        gSavedMemes.forEach((el, idx) => {
            document.querySelector('.saved-memes-section').innerHTML += `
         <canvas class="saved-meme" onclick="onSavedMeme(this.id)" id="canvas-${idx}" height="900" width="900"></canvas>`

            var img = new Image();
            var imgIdx = gImgs.findIndex(img => img.id === el.selectedImgId)
            img.src = gImgs[imgIdx].url;
            img.onload = () => {
                var canvas = document.querySelector(`#canvas-${idx}`);
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                el.lines.forEach((line) => { drawText(line, line.pos.x, line.pos.y, ctx) });
            }
        }
        )
    }
    movePage('saved-memes');
}

function onSavedMeme(id) {
    var idx = getSavedMemeIdx(id);
    gMeme = gSavedMemes[idx];
    renderGenerator();
}

function getSavedMemeIdx(id) {
    var words = id.split('-');
    return words[1];
}