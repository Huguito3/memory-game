
//Variables definition
let timer;
let stars;
let allCards;
let cardsFlop;
let cardClasses=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];
const timeout = 1000;
let erradas;
let acertadas;
let startingTime;
let endingTime;
let controlClick= false;



let input = {
   minutes: 0,
    seconds: 0
};

let timestamp = new Date(input.minutes, input.seconds);
let interval = 1;

let myInterval;

let moves;
const lblMoves=document.querySelector('.moves');
const starts=document.querySelector('.stars');

function addCard(card){
    cardsFlop.push(card);
}

function displayCard(card){
    card.classList.add('open','show');
}
function matchard(card){
    card.classList.add('match');
}

function hideCard(card){
    card.classList.remove('open');
    card.classList.remove('show');
}

function removeDisplay(){
    allCards.forEach( 
        function(card){
            if (card.classList.length>=2){
                card.className='';
                card.classList.add('card');
                if (card.childNodes.length >3) {
                    card.removeChild(card.lastElementChild)
                }
            }
        }
);
}
//Initil Function
function reset(){
    clearInterval(myInterval);
    document.getElementById('timerS').innerHTML = '';
    timestamp = new Date(input.minutes, input.seconds);
    init();
}
function init(){
    myInterval = setInterval(function () {
        timestamp = new Date(timestamp.getTime() + interval * 1000);
        document.getElementById('timerS').innerHTML = timestamp.getMinutes() + 'm:' + timestamp.getSeconds() + 's';
    }, Math.abs(interval) * 1000);

    while (starts.firstChild) {
        starts.removeChild(starts.firstChild);
    }
  
    startingTime = performance.now();
    allCards = document.querySelectorAll('.card');
    cardsFlop = [];
    timer=0;
    stars=0;
    removeDisplay();
    shuffle(cardClasses);
    resetCards();
    createCards();
    moves=0;
    erradas=0;
    acertadas=0;
    lblMoves.innerHTML=moves;
    createStars();
    endingTime = performance.now();
    console.log("Tempo Total de carregamento: " +(endingTime - startingTime));
}
init();
// Function Shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// Function to create Cards
function createCards(){
    
    let indice=0;
    allCards.forEach(function (cardli) {
        let newLi = document.createElement('i');
        newLi.classList.add('fa',cardClasses[indice]);
        cardli.appendChild(newLi);
        indice+=1;
    });
}
// Function to reset Cards
function resetCards(){
    
    allCards.forEach(function (cardli) {
        if (cardli.lastElementChild) {
            cardli.removeChild(cardli.lastElementChild);
        }
        
    });
}
// Function to create starts
function createStars(){
    let indice=0;
    
    while(indice<3){
        let newLin = document.createElement('li');
        let newi = document.createElement('i');
        newi.classList.add('fa','fa-star');
        newLin.appendChild(newi);
        starts.appendChild(newLin);
        indice+=1;
    }
}

// Function to remove starts
function removeStars() {
    if(starts.hasChildNodes()){
        starts.removeChild(starts.lastElementChild);
}
}
//Function that is launch when the game is won.
function winGame() {
    alert("You Win!!! You made "+moves+" moves. Your time was "+  document.getElementById('timerS').innerHTML);
}
//Setting the event listeners.
allCards.forEach(function(cards){
    cards.addEventListener('click', function (param) {
        if(!controlClick && !cards.classList.contains('open')){
        if(cardsFlop.length<1){
            addCard(cards);
            displayCard(cards);
        }else if(cardsFlop.length==1){
            moves+=1;
            displayCard(cards);
            if(cardsFlop[0].lastElementChild.className==cards.lastElementChild.className){
                matchard(cards);
                matchard(cardsFlop[0]);
                cardsFlop= [];
                acertadas+=1;
            }else{
                controlClick= true;
                erradas+=1;
                setTimeout(() => {
                    hideCard(cards);
                    hideCard(cardsFlop[0]);
                    cardsFlop= [];
                    controlClick= false;
                }, timeout);
                
            }
           
    }
    lblMoves.innerHTML=moves;
    if(erradas==2 ){
        erradas=0;
        removeStars(); 
    }
    if(acertadas==8){
        setTimeout(() => {
            winGame()
        }, timeout/2);
    }
}
    
    })
});

