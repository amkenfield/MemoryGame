const gameContainer = document.getElementById("game");
let cardsFlipped = 0;
//Better style to use Arabic numerals in variable names?
let cardOne = null;
let cardTwo = null;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(event.target.classList.contains('flipped')) return;

  // Better const or let?
  const currCard = event.target;
  //Has to be classList index - need to have multiple classes (ie 'flipped) on each card
  currCard.style.backgroundColor = currCard.classList[0];

  //If still one "open" card
  if(!cardOne || !cardTwo) {
    currCard.classList.add('flipped');
    if(!cardOne) {
      cardOne = currCard;
    }
    else if(currCard === cardOne) {
      return;
    } else {
      cardTwo = currCard;
    }
  }

  //Since this isn't an else-if, it will always execute after completion of above-
  //That way, cards can stil be assigned/persist
  if(cardOne && cardTwo) {
    //Assigns these in order to be able to compare
    colorOne = cardOne.classList[0];
    colorTwo = cardTwo.classList[0];

    if(colorOne === colorTwo) {
      //So once they're matched, they can't be further manipulated
      cardOne.removeEventListener('click', handleCardClick);
      cardTwo.removeEventListener('click', handleCardClick);

      //Clears/turns back to falsy, allows to resume the first if statement of handle ftn
      cardOne = null;
      cardTwo = null;
      cardsFlipped += 2;
    } else {
      setTimeout(function() {
        cardOne.style.backgroundColor = '';
        cardTwo.style.backgroundColor = '';
        cardOne.classList.remove('flipped');
        cardTwo.classList.remove('flipped');
        cardOne = null;
        cardTwo = null;
      }, 1000);
    }

  }

  if(COLORS.length === cardsFlipped) {
    alert("You Win!!!");
  }

  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);
