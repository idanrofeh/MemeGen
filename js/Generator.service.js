'use strict';

var gMeme;

var gKeywordSearchCountMap = {};

function getMeme(imgId) {
    gMeme = {
        selectedImgId: +imgId,
        selectedLineIdx: 0,
        lines:
            [{ txt: 'Enter Text', size: 40, align: 'center', 'text-color': 'white', 'stroke-color': 'black', font: 'Impact' }]
    }
    renderMeme();
}

function setLineTxt(text) {
    if (!gMeme.lines.length) {
        console.log('Hi')
        gMeme.selectedLineIdx = 0;
        gMeme.lines[0] = { txt: 'Enter Text', size: 40, align: 'center', 'text-color': 'white', 'stroke-color': 'black', font: 'Impact' };
    }
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    renderMeme();
}

function switchLines() {
    if (gMeme.lines.length === 1) {
        var line2 = { txt: 'Enter Text', size: 40, align: 'center', color: 'white', 'border-color': 'black' };
        gMeme.lines.push(line2);
        gMeme.selectedLineIdx = 1;
    }
    else if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = 1;
    }
    else gMeme.selectedLineIdx = 0;
}

function setFontSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size = size;
    console.log(gMeme);
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
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
            console.error(err)
        })
}