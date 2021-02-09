const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data; //seperated the cards because that will be the main data we use
//const data = require('../data/flashcardData.json').data;
//cards = data.cards; 

router.get('/', (req, res) => {
    const numOfCards = cards.length;
    const flashCardId = Math.floor(Math.random() * numOfCards);
    res.redirect(`/cards/${flashCardId}`);
});

router.get('/:id', (req, res) => { //because we're directing traffic into this file, 
//every route in this file would start with cards. So we can delete /cards to /
    const {side} = req.query;
    const {id} = req.params;

    if (!side || side !== 'question' && side != 'answer') {
        return res.redirect(`/cards/${id}?side=question`);
    }  

    const name = req.cookies.username;
    const text = cards[id][side];
    const {hint} = cards[id];
    
    const templateData = {id, text, name};

        if (side === 'question') {
            templateData.hint = hint;
            templateData.sideShown = 'answer';
            templateData.showDisplayedSide = 'Answer';

        } else if (side === 'answer') {
            templateData.sideShown = 'question';
            templateData.showDisplayedSide = 'Question';
        }
        res.render('card', templateData);

});


module.exports = router;

