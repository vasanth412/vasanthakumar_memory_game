const gameContainer = document.getElementById('game');

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
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
  let index = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    newDiv.id = String(index);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    index++;
  }
}
// TODO: Implement this function!

let matches = [];
let clickBox = [];
let noClick = false;
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const currentID = event.target.id;
  if (
    matches.includes(currentID) ||
    (clickBox.length !== 0 && clickBox[0].id === currentID) ||
    noClick
  ) {
    return;
  }
  const currentColor = event.target.className;
  event.target.style.backgroundColor = currentColor;

  if (clickBox.length === 0) {
    clickBox.push({ id: currentID, color: currentColor });
  } else {
    noClick = true;
    if (currentColor === clickBox[0].color) {
      matches.push(currentID, clickBox[0].id);
      clickBox = [];
      setTimeout(() => {
        noClick = false;
      }, 1 * 1000);
    } else {
      setTimeout(() => {
        document.getElementById(clickBox[0].id).removeAttribute('style');
        event.target.removeAttribute('style');
        clickBox = [];
        noClick = false;
      }, 1 * 1000);
    }
  }

  // console.log(currentTarget);
}

// when the DOM loads
createDivsForColors(shuffledColors);
