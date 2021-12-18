'use strict';

var gMeme;
var gIsEdit = false;
var gSavedMemes;

function getMeme(imgId) {
    gMeme = {
        selectedImgId: +imgId,
        selectedLineIdx: 0,
        lines:
            [{
                txt: 'Enter Text', size: 40, align: 'center', 'text-color': '#ffffff', 'stroke-color': '#000000', font: 'Impact'
            }]
    }
}

function addLinePos() {
    gMeme.lines[0].pos = { x: gCanvas.width / 2, y: gCanvas.height * 0.1 };
}

function switchLines() {
    if (gMeme.lines.length === 1) {
        var line2 = { txt: 'Enter Text', size: 40, align: 'center', 'text-color': '#ffffff', 'stroke-color': '#000000', font: 'Impact', pos: { x: gCanvas.width / 2, y: gCanvas.height * 0.9 } };
        gMeme.lines.push(line2);
        gMeme.selectedLineIdx = 1;
    }
    else {
        gMeme.selectedLineIdx++;
        if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    }
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    document.getElementById('txt').value = selectedLine.txt;
    document.getElementById('stroke-color').value = selectedLine['stroke-color'];
    document.getElementById('txt-color').value = selectedLine['text-color'];
    document.getElementById('text-size').value = selectedLine.size;
    document.getElementById('font').value = selectedLine.font;
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function moveLine(value) {
    var line = gMeme.lines[gMeme.selectedLineIdx];
    line.pos.y += value;
    renderMeme();
}

function setTextProperty(property, value) {
    if (!gMeme.lines.length) return;
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    selectedLine[`${property}`] = value;
}

function addLine() {
    var newLine = { txt: 'Enter Text', size: 40, align: 'center', 'text-color': '#ffffff', 'stroke-color': '#000000', font: 'Impact' };
    if (gMeme.lines.length === 1) {
        newLine.pos = { x: gCanvas.width / 2, y: gCanvas.height * 0.9 };
        gMeme.lines.push(newLine);
        gMeme.selectedLineIdx = 1;
    } else if (gMeme.lines.length > 1) {
        newLine.pos = { x: gCanvas.width / 2, y: gCanvas.height / 2 };
        gMeme.lines.push(newLine);
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
    }
}

function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        document.querySelector('h5').innerText += `Your photo is available here: ${uploadedImgUrl}`;

        document.querySelector('.facebook-share').innerHTML = `
        <a class="share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err);
        })
}
