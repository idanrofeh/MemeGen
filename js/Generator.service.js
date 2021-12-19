'use strict';

var gMeme;
var gIsEdit = false;
var gSavedMemes;
var gImgs = [
    { id: 1, url: `meme-imgs (square)/1.jpg`, keywords: ['trump', 'politics'] },
    { id: 2, url: `meme-imgs (square)/2.jpg`, keywords: ['dog', 'animal'] },
    { id: 3, url: `meme-imgs (square)/3.jpg`, keywords: ['baby', 'animal'] },
    { id: 4, url: `meme-imgs (square)/4.jpg`, keywords: ['animal', 'funny'] },
    { id: 5, url: `meme-imgs (square)/5.jpg`, keywords: ['baby', 'funny'] },
    { id: 6, url: `meme-imgs (square)/6.jpg`, keywords: ['explaining', 'aliens'] },
    { id: 7, url: `meme-imgs (square)/7.jpg`, keywords: ['funny', 'baby'] },
    { id: 8, url: `meme-imgs (square)/8.jpg`, keywords: ['explaining', 'circus'] },
    { id: 9, url: `meme-imgs (square)/9.jpg`, keywords: ['laughing', 'baby'] },
    { id: 10, url: `meme-imgs (square)/10.jpg`, keywords: ['politics', 'laughing'] },
    { id: 11, url: `meme-imgs (square)/11.jpg`, keywords: ['funny', 'boxing'] },
    { id: 12, url: `meme-imgs (square)/12.jpg`, keywords: ['funny', 'israeli'] },
    { id: 13, url: `meme-imgs (square)/13.jpg`, keywords: ['celebs', 'party'] },
    { id: 14, url: `meme-imgs (square)/14.jpg`, keywords: ['matrix', 'wisdom'] },
    { id: 15, url: `meme-imgs (square)/15.jpg`, keywords: ['explaining', 'movies'] },
    { id: 16, url: `meme-imgs (square)/16.jpg`, keywords: ['laughing', 'movies'] },
    { id: 17, url: `meme-imgs (square)/17.jpg`, keywords: ['politics', 'putin'] },
    { id: 18, url: `meme-imgs (square)/18.jpg`, keywords: ['movies', 'explaining'] }
]

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
    gIsEdit = true;
    if (gMeme.lines.length === 1) {
        var line2 = { txt: 'Enter Text', size: 40, align: 'center', 'text-color': '#ffffff', 'stroke-color': '#000000', font: 'Impact', pos: { x: gCanvas.width / 2, y: gCanvas.height * 0.9 } };
        gMeme.lines.push(line2);
        gMeme.selectedLineIdx = 1;
    }
    else {
        gMeme.selectedLineIdx++;
        if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    }
}

function removeLine() {
    gIsEdit = true;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx--;
    if (!gMeme.length) cleanInputs();
}

function moveLine(value) {
    gIsEdit = true;
    var line = gMeme.lines[gMeme.selectedLineIdx];
    line.pos.y += value;
    renderMeme();
}

function setTextProperty(property, value) {
    gIsEdit = true;
    if (!gMeme.lines.length) return;
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    selectedLine[`${property}`] = value;
}

function addLine() {
    gIsEdit = true;
    var newLine = { txt: 'Enter Text', size: 40, align: 'center', 'text-color': '#ffffff', 'stroke-color': '#000000', font: 'Impact' };
    if (!gMeme.lines.length) {
        gMeme.lines[0] = newLine;
        gMeme.selectedLineIdx = 0
        addLinePos();
    }
    else if (gMeme.lines.length === 1) {
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
           Share on Facebook!   
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
