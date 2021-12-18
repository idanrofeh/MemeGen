'use strict';

var gCanvas;
var gCtx;
var gStartPos;

function renderGenerator() {
    addListeners();
    showGenerator();
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    addLinePos();
    renderMeme();
    cleanInputs();
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

function showGenerator() {
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.about').classList.add('hidden');
    document.querySelector('.generator').classList.remove('hidden');
    document.querySelector('.saved-memes').classList.add('hidden');
}

function renderMeme() {
    var img = new Image();
    var imgIdx = gImgs.findIndex(el => el.id === gMeme.selectedImgId)
    img.src = gImgs[imgIdx].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        gMeme.lines.forEach((el) => drawText(el, el.pos.x, el.pos.y))
        if (gIsEdit) {
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
    // Starting top left corner
    gCtx.moveTo(
        selectedLine.pos.x - text.width,
        selectedLine.pos.y + selectedLine.size
    );
    gCtx.lineTo(
        selectedLine.pos.x + text.width,
        selectedLine.pos.y + selectedLine.size
    );
    gCtx.lineTo(
        selectedLine.pos.x + text.width,
        selectedLine.pos.y - selectedLine.size
    );
    gCtx.lineTo(
        selectedLine.pos.x - text.width,
        selectedLine.pos.y - selectedLine.size
    );
    gCtx.closePath();
    gCtx.stroke();
}

function cleanInputs() {
    document.querySelector('.line-txt').value = 'Enter Text';
    document.querySelector('.txt-size').value = '40';
    document.querySelector('.input-font').value = 'Impact';
    document.getElementById('txt-color').value = '#ffffff';
    document.getElementById('stroke-color').value = '#000000';
}

function onSetTextProperty(property, value) {
    gIsEdit = true;
    setTextProperty(property, value);
    renderMeme();
}

function onSwitchLine() {
    gIsEdit = true;
    switchLines();
    renderMeme();
}

function onMoveLine(value) {
    gIsEdit = true;
    moveLine(value);
    renderMeme();
}

function onRemoveLine() {
    removeLine();
    renderMeme();
}

function onAddLine() {
    gIsEdit = true;
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
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas';
}

function onShare() {
    document.querySelector('.generator').classList.add('hidden');
    document.querySelector('.share-window-container').classList.remove('hidden');
}

function onSave() {
    gSavedMemes = loadFromStorage(STORAGE_KEY);
    if (!gSavedMemes) {
        gSavedMemes = [gMeme];
    } else {
        gSavedMemes.push(gMeme);
    }
    saveToStorage(STORAGE_KEY, gSavedMemes);
}

function onFacebookShare() {
    uploadImg();
}

function renderSavedMemes() {
    showSavedMemes();
    gSavedMemes = loadFromStorage(STORAGE_KEY);
    if (gSavedMemes) {
        document.querySelector('.saved-memes').innerHTML = '';
        gSavedMemes.forEach((el, idx) => {
            document.querySelector('.saved-memes').innerHTML += `
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

}

function showSavedMemes() {
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.about').classList.add('hidden');
    document.querySelector('.generator').classList.add('hidden');
    document.querySelector('.share-window-container').classList.add('hidden');
    document.querySelector('.saved-memes').classList.remove('hidden');
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

function renderGallery() {
    document.querySelector('.gallery').classList.remove('hidden');
    document.querySelector('.about').classList.remove('hidden');
    document.querySelector('.generator').classList.add('hidden');
    document.querySelector('.share-window-container').classList.add('hidden');
    document.querySelector('.saved-memes').classList.add('hidden');
}