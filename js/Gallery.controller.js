'use strict';

function loadSearchedImgs(searchKey = '') {
    var searchedImgs = getSearchedImgs(searchKey);
    renderSearchedImgs(searchedImgs);
}

function getSearchedImgs(searchKey) {
    if (!searchKey) return gImgs;
    else {
        return gImgs.filter(img => img.keywords.includes(searchKey))
    }
}

function renderSearchedImgs(searchedImgs) {
    var gallery = document.querySelector('.gallery')
    gallery.innerHTML = ''
    searchedImgs.forEach(img =>
        gallery.innerHTML +=
        `<div class="img-container">
            <img class="meme-img" id=${img.id} onclick="onImgSelect(this.id)" src='meme-imgs (square)/${img.id}.jpg'>
        </div>`
    )
}

function renderGallery() {
    document.querySelector('.search-bar input').value = '';
    loadSearchedImgs();
    movePage('gallery');
}

function movePage(page) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    var pageSections = document.querySelectorAll(`.${page}-section`);
    pageSections.forEach(section => {
        section.classList.remove('hidden');
    });
}

function onImgSelect(id) {
    getMeme(id);
    renderGenerator();
    renderMeme();
}