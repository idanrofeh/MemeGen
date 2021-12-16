'use strict';

var gImgs = [
    { id: 1, url: `meme-imgs (various aspect ratios)/1.jpg`, keywords: ['trump', 'politics'] },
    { id: 2, url: `meme-imgs (various aspect ratios)/2.jpg`, keywords: ['dog', 'animal'] },
    { id: 3, url: `meme-imgs (various aspect ratios)/3.jpg`, keywords: ['baby', 'animal'] },
    { id: 4, url: `meme-imgs (various aspect ratios)/4.jpg`, keywords: ['animal', 'funny'] },
    { id: 5, url: `meme-imgs (various aspect ratios)/5.jpg`, keywords: ['baby', 'funny'] },
    { id: 6, url: `meme-imgs (various aspect ratios)/6.jpg`, keywords: ['explaining', 'aliens'] },
    { id: 7, url: `meme-imgs (various aspect ratios)/7.jpg`, keywords: ['funny', 'baby'] },
    { id: 8, url: `meme-imgs (various aspect ratios)/8.jpg`, keywords: ['explaining', 'circus'] },
    { id: 9, url: `meme-imgs (various aspect ratios)/9.jpg`, keywords: ['laughing', 'baby'] },
    { id: 10, url: `meme-imgs (various aspect ratios)/10.jpg`, keywords: ['politics', 'laughing'] },
    { id: 11, url: `meme-imgs (various aspect ratios)/11.jpg`, keywords: ['funny', 'boxing'] },
    { id: 12, url: `meme-imgs (various aspect ratios)/12.jpg`, keywords: ['funny', 'israeli'] },
    { id: 13, url: `meme-imgs (various aspect ratios)/13.jpg`, keywords: ['celebs', 'party'] },
    { id: 14, url: `meme-imgs (various aspect ratios)/14.jpg`, keywords: ['matrix', 'wisdom'] },
    { id: 15, url: `meme-imgs (various aspect ratios)/15.jpg`, keywords: ['explaining', 'movies'] },
    { id: 16, url: `meme-imgs (various aspect ratios)/16.jpg`, keywords: ['laughing', 'movies'] },
    { id: 17, url: `meme-imgs (various aspect ratios)/17.jpg`, keywords: ['politics', 'putint'] },
    { id: 18, url: `meme-imgs (various aspect ratios)/18.jpg`, keywords: ['movies', 'explaining'] }
];

function renderGallery() {
    document.querySelector('.gallery').classList.remove('hidden');
    document.querySelector('.generator').classList.add('hidden');
}

function onImgSelect(id) {
    getMeme(id);
    renderGenerator()
}