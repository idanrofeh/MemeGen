'use strict';

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
    { id: 17, url: `meme-imgs (square)/17.jpg`, keywords: ['politics', 'putint'] },
    { id: 18, url: `meme-imgs (square)/18.jpg`, keywords: ['movies', 'explaining'] }
];

function onImgSelect(id) {
    getMeme(id);
    renderGenerator();
    renderMeme();
}