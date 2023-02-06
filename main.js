const prompt = require('prompt-sync')({sigint: true});
// use prompt-sync to get user input...more info:
// https://www.codecademy.com/article/getting-user-input-in-node-js

let totalColumns = 0;
let totalRows = 0;
//set current row, column
let currentLocation = [0,0];
let gameOver = false;

class Field {
  constructor(field) {
    this.field = field;
  }
  
  // instance method to print field
  print() {
  	let outputArray = [];
    for (let i = 0; i < this.field.length; i++) {
    	for (let j = 0; j < this.field[i].length; j++) {
    		outputArray.push(this.field[i][j]);
    	}
    }
    let arrayOutput = outputArray.toString();
    let output = arrayOutput.replaceAll(',', '');
    totalColumns = this.field[0].length;
    totalRows = this.field.length;
    let counter = 0;
    for (let i = 0; i < totalColumns; i++) {
      console.log(output.slice(counter, counter + totalColumns));
      counter += totalColumns;
    }
  }
  
  // static method to generate field based on width & height input
  static generateField(width, height) {
    const outputArrayLength = width * height;
    let outputArray = [];
    let finalOutputArray = [];
    for (let i = 0; i < outputArrayLength; i++) {
      let randomNumber = Math.floor(Math.random() * 10);
      if (randomNumber < 7) {
        outputArray.push('░');
      } else {
        outputArray.push('0');
      }
    }
    // set location for hat...this should never be the same as the starting point
    const hatLocation = (Math.floor(Math.random() * (outputArrayLength - 1))) + 1;
    outputArray[hatLocation] = '^';
    let counter = 0;
    for (let i = 0; i < height; i++) {
      let innerArray = [];
      for (let j = 0; j < width; j++) {
        innerArray.push(outputArray[counter]);
        counter++;
      }
      finalOutputArray.push(innerArray);
    }
  finalOutputArray[0][0] = '*';
  return finalOutputArray;
  }

}

function playerLost(message) {
  console.clear();
  console.log('Game Over - ' + message);
  gameOver = true;
}

function playerWon() {
  console.log('You won!');
  gameOver = true; 
}

function moveUp() {
  if (currentLocation[0] === 0) {
    playerLost('You fell off the board!');
  } else if (myField.field[currentLocation[0]-1][currentLocation[1]] === '0') {
    playerLost('You fell into a hole!');
  } else if (myField.field[currentLocation[0]-1][currentLocation[1]] === '^') {
    playerWon();
  } else if (currentLocation[0] > 0) {
    //move up and print again
    currentLocation[0] -= 1;
    myField.field[currentLocation[0]][currentLocation[1]] = '*';
    console.clear();
    console.log(' ');
    myField.print();
  }
}

function moveDown() {
  if (currentLocation[0] === (totalRows-1)) {
    playerLost('You fell off the board!');    
  } else if (myField.field[currentLocation[0]+1][currentLocation[1]] === '0') {
    playerLost('You fell into a hole!');
  } else if (myField.field[currentLocation[0]+1][currentLocation[1]] === '^') {
    playerWon();
  } else if (currentLocation[0] < totalRows) {
    //move down and print again
    currentLocation[0] += 1;
    myField.field[currentLocation[0]][currentLocation[1]] = '*';
    //myField.field[currentLocation[0]-1][currentLocation[1]] = '░';
    console.clear();
    console.log(' ');
    myField.print();
  }
}

function moveLeft() {
  if (currentLocation[1] === 0) {
    playerLost('You fell off the board!');  
  } else if (myField.field[currentLocation[0]][currentLocation[1]-1] === '0') {
    playerLost('You fell into a hole!');
  } else if (myField.field[currentLocation[0]][currentLocation[1]-1] === '^') {
    playerWon();
  } else if (currentLocation[1] > 0) {
    //move left and print again
    currentLocation[1] -= 1;
    myField.field[currentLocation[0]][currentLocation[1]] = '*';
    //myField.field[currentLocation[0]][currentLocation[1]+1] = '░';
    console.clear();
    console.log(' ');
    myField.print();
  }
}

function moveRight() {
  if (currentLocation[1] === (totalColumns-1)) {
    playerLost('You fell off the board!');  
  } else if (myField.field[currentLocation[0]][currentLocation[1]+1] === '0') {
    playerLost('You fell into a hole!');
  } else if (myField.field[currentLocation[0]][currentLocation[1]+1] === '^') {
    playerWon();
  } else if (currentLocation[0] < totalColumns) {
    //move right and print again
    currentLocation[1] += 1;
    myField.field[currentLocation[0]][currentLocation[1]] = '*';
    console.clear();
    console.log(' ');
    myField.print();
  }
}

// create a new playing field
let myField = new Field(Field.generateField(4,4));

//clear console and display initial field
console.clear();
console.log(' ');
myField.print();

//play game
while (gameOver === false) {
  let direction = prompt('Which way? ');

  if (direction == 'U' || direction == 'u') {
    moveUp();
  } else if (direction == 'D' || direction == 'd') {
    moveDown();
  } else if (direction == 'L' || direction == 'l') {
    moveLeft();
  } else if (direction == 'R' || direction == 'r') {
    moveRight();
  } else {
    console.clear();
    console.log('Invalid direction please try again.');
    myField.print();
  }
}