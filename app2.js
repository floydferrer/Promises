//PART TWO//
const shuffleCardsURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const drawCardURL = 'https://deckofcardsapi.com/api/deck';
const $drawCard = $('#draw-card');
const $shuffleDeck = $('#shuffle-deck');
$shuffleDeck.hide();
const $imgContainer = $('.image-container');
let deckID;
let cardCount = 0;

getRanNum = function() {
    return Math.floor(Math.random()*91)
}

$.getJSON(`${shuffleCardsURL}&json`)
    .then(data => {
        console.log(`Desk ID: ${data.deck_id}`);
        deckID = data.deck_id;
    })

$drawCard.on('click', () => {
    $.getJSON(`${drawCardURL}/${deckID}/draw/?count=1&json`)
    .then(data => {
        console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
        const $img = $('<img>');
        $img.attr('src', data.cards[0].image);
        $img.css('position', 'relative').css('transform', `rotate(${getRanNum()-45}deg)`);
        $imgContainer.append($img);
        $img.prev().css('position', 'absolute');
        cardCount++;
        console.log(`Remaining cards: ${52-cardCount}`);
        if (cardCount === 52) {
            $drawCard.hide();
            $shuffleDeck.show();
        }
    })
})

$shuffleDeck.on('click', () => {
    $.getJSON(`${shuffleCardsURL}&json`)
    .then(data => {
        console.log(`Desk ID: ${data.deck_id}`);
        deckID = data.deck_id;
        $('img').remove();
        cardCount = 0;
        $drawCard.show();
        $shuffleDeck.hide();
    })
})

