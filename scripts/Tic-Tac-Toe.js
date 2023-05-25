const threeDimensionalArray = [
  [0,0,0],
  [0,0,0],
  [0,0,0]];

let isPlaying = false;
let score = 0;
let isAllowedToPick = true;
let didPlayerWin = false;
let playerTries = 0;
let computerTries = 0;
let plays = 0;
let chooseAgain = false;
let playing = false;
const allButtons = document.querySelectorAll('.buttons-style');
const scoreElement = document.querySelector('.score-para');
const resultElement = document.querySelector('.result');

const resetOnly = () => {

  setTimeout(() => {
        resetButtonAndGame();
        isAllowedToPick = true;
      }, 1500);

      didPlayerWin = false;
};

const returnIfWon = isWon => {
  return isWon === true;
}

const updateScore = num => {
  scoreElement.innerHTML = `Score: ${score += num}`;
}

const resetButtonAndGame = () => {
  allButtons.forEach(element => {
    element.innerHTML = '&nbsp; &nbsp;';
    element.classList.remove('userPick');
    element.classList.remove('compPick');
  });


  for (let outIndex = 0; outIndex < 3; ++outIndex) {
    for (let innerIndex = 0; innerIndex < 3; ++innerIndex) {
      threeDimensionalArray[outIndex][innerIndex] = 0;
    }
  }
}

const checkXcounters = xCounter => {
  // console.log('inside checkXcounter counter: ' + xCounter);
  if (xCounter === 3) {
    // console.log('You won!');
    updateScore(1);
    setTimeout(() => {
      resetButtonAndGame();
      isAllowedToPick = true;
    }, 1000);
    isPlayerWon = true;
    didPlayerWin = true;
    return true;
    } else {
      return false;
    }
}

const checkOcounters = oCounter => {
  // console.log('inside checkOcounter counter: ' + oCounter);
  if (oCounter === 3) {
    // console.log('O counter is 3');
    // console.log('You Lost!');
    updateScore(-1);
    // console.log(threeDimensionalArray);
    setTimeout(() => {
      resetButtonAndGame();
      isAllowedToPick = true;
    }, 1000);
    didPlayerWin = true;
    return true;
    } else {
      return false;
    }
}

const checkAllWinningCombinations = () => {
  let isPlayerWon = false;

  // Combination 1 (horizontally)
  threeDimensionalArray.forEach(outerArray => {
    if (isPlayerWon)  return true;
    let xCounter = 0;
    outerArray.forEach(innerArrayElement => {
      if (innerArrayElement === 'X') ++xCounter;
    });

    if (checkXcounters(xCounter)) {
      isPlayerWon = true;
      return true;
    }
  });

  // console.log(isPlayerWon);
  if (returnIfWon(isPlayerWon)) return true;
  

  // Combination 2 (perpendicular)
  // isPlayerWon = false;
  for (let columnIndex = 0; columnIndex < 3; ++columnIndex) {
    if (isPlayerWon)  return true;

    let horizonXCounter = 0;
    for (let rowIndex = 0; rowIndex < 3; ++rowIndex) {
      if (threeDimensionalArray[rowIndex][columnIndex] === 'X') ++horizonXCounter;
    }

    if (checkXcounters(horizonXCounter))  {
      isPlayerWon = true;
      return true;
    }
  }

  // console.log(isPlayerWon);
  if (returnIfWon(isPlayerWon)) return true;

  /*
  Combination 3 (cross)

      0 1 2
    0 0,1,2 [0][0] == x
    1 1,1,2 [1][1] == x
    2 2,1,2 [2][2] == x


      0 1 2
    0 0,1,2 [0][2] == x
    1 1,1,2 [1][1] == x
    2 2,1,2 [2][0] == x  

  */
  
  // top left to bottom right cross combination
  let crossXCounter = 0;
  let crossXCounter2 = 0;
  let rightToLeftColumnIndex = 2;
  for (let rowIndex = 0; rowIndex < 3; ++rowIndex) {
    if (isPlayerWon)  return true;
    // console.log('do i commem here');

    if (threeDimensionalArray[rowIndex][rowIndex] === 'X') {
      ++crossXCounter;
    }

    if (checkXcounters(crossXCounter)) {
      crossXCounter = 0;
      isPlayerWon = true;
      return true;
    }

    if (threeDimensionalArray[rowIndex][rightToLeftColumnIndex] === 'X') {
      ++crossXCounter2;
    }
    --rightToLeftColumnIndex;

    if (checkXcounters(crossXCounter2)) {
      crossXCounter2 = 0;
      isPlayerWon = true;
      return true;
    }
  }
  
}

const checkAllLosingCombinations = () => {
  let isPlayerWon = false;

  // Combination 1 (horizontally)
  threeDimensionalArray.forEach(outerArray => {
    // console.log('Inside Combination 1 (horizontally --)');
    if (isPlayerWon)  return true;
    let xCounter = 0;
    outerArray.forEach(innerArrayElement => {
      if (innerArrayElement == 'O') {
        xCounter += 1;
      }
    });

    if (checkOcounters(xCounter)) {
      isPlayerWon = true;
      return true;
    }
  });

  // console.log(isPlayerWon);
  if (returnIfWon(isPlayerWon)) return true;
  

  // Combination 2 (perpendicular)
  for (let columnIndex = 0; columnIndex < 3; ++columnIndex) {
    // console.log('Inside Combination 2 (perpendicular ||)');
    if (isPlayerWon)  return true;

    let horizonXCounter = 0;
    for (let rowIndex = 0; rowIndex < 3; ++rowIndex) {
      if (threeDimensionalArray[rowIndex][columnIndex] == 'O') {
        horizonXCounter += 1;
      };
    }
    
    if (checkOcounters(horizonXCounter))  {
      isPlayerWon = true;
      return true;
    }
  }

  // console.log(isPlayerWon);
  if (returnIfWon(isPlayerWon)) return true;
  
  // top left to bottom right cross combination
  let crossXCounter = 0;
  let crossXCounter2 = 0;
  let rightToLeftColumnIndex = 2;
  for (let rowIndex = 0; rowIndex < 3; ++rowIndex) {
    // console.log('Inside Combination 3 (cross X)');
    if (isPlayerWon)  return true;

    if (threeDimensionalArray[rowIndex][rowIndex] == 'O') {
      crossXCounter += 1;
    }

    if (checkOcounters(crossXCounter)) {
      crossXCounter = 0;
      isPlayerWon = true;
      return true;
    }

    if (threeDimensionalArray[rowIndex][rightToLeftColumnIndex] == 'O') {
      crossXCounter2 += 1;
    }
    --rightToLeftColumnIndex;

    if (checkOcounters(crossXCounter2)) {
      crossXCounter2 = 0;
      isPlayerWon = true;
      return true;
    }
  }
  
}

const checkWinner = () => {
  // let xCounter = 0;

  // threeDimensionalArray.forEach(array => {
  //   array.forEach(element => {
      
  //     if (element === 'X') ++xCounter;
  //   });
  // });

  // if (xCounter === 3) {
  //   console.log('x is 3 now. checking combinations');
  //   // console.log(threeDimensionalArray);
  //   // allButtons.forEach(eleement => eleement.onclick = '');
  //   isAllowedToPick = false;
    
  //   checkAllWinningCombinations();
    
  //   if (didPlayerWin) {
  //     console.log('good jjob');
  //     resetOnly();
      
  //   } else {
  //     console.log('unlucky try again');
  //     // console.log(threeDimensionalArray);
  //     resetOnly();
  //   }
  // }

  if (true) {
    console.log('x is 3 now. checking combinations');
    isAllowedToPick = false;
    
    checkAllWinningCombinations();
    
    if (didPlayerWin) {
      console.log('good jjob');
      resetOnly();
      
    } else {
      console.log('unlucky try again');
      // console.log(threeDimensionalArray);
      resetOnly();
    }
  }

}

const userPick = (outerArrayIndex,innerArrayIndex,buttonIndex) => {

  if (allButtons[buttonIndex].classList.contains('active-button')) {
    console.log('Please Choose another button!');
    chooseAgain = true;
    playing = false;
    return;
  } else {
    chooseAgain = false;
  }

  threeDimensionalArray[outerArrayIndex][innerArrayIndex] = 'X';
  allButtons[buttonIndex].innerHTML = threeDimensionalArray[outerArrayIndex][innerArrayIndex];
  allButtons[buttonIndex].classList.add('active-button');
  allButtons[buttonIndex].classList.add('userPick');
}

const getButtonIndex = (rowIndex, columnIndex) => {
  if (rowIndex === 0 && columnIndex === 0) return 0;
  else if (rowIndex === 0 && columnIndex === 1) return 1;
  else if (rowIndex === 0 && columnIndex === 2) return 2;
  else if (rowIndex === 1 && columnIndex === 0) return 3;
  else if (rowIndex === 1 && columnIndex === 1) return 4;
  else if (rowIndex === 1 && columnIndex === 2) return 5;
  else if (rowIndex === 2 && columnIndex === 0) return 6;
  else if (rowIndex === 2 && columnIndex === 1) return 7;
  else if (rowIndex === 2 && columnIndex === 2) return 8;
}
const computerPick = user => {
  let rowIndex = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  let columnIndex = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  
  // threeDimensionalArray[rowIndex][columnIndex] = 'O';
  // allButtons[getButtonIndex(rowIndex,columnIndex)].innerHTML = threeDimensionalArray[rowIndex][columnIndex];
  return {rowIndex: rowIndex,columnIndex: columnIndex};
}

const removeActive = () => {
  allButtons.forEach(element => {
    element.classList.remove('active-button');
  });
}

const emptyResult = () => {
  setTimeout(() => {
    resultElement.innerHTML = '';
  }, 1000);
}

const pick = (buttonIndex, outerArrayIndex, innerArrayIndex) => {

  if (playing) return;

  if (!playing) {
    playing = true;
    let computerPicking = true;
    userPick(outerArrayIndex,innerArrayIndex,buttonIndex);
    if (chooseAgain) {
      return;
    }

    plays += 1;
    // let loopCounter = 0;
    console.log('plays: ' + plays);
    if (plays === 9) {
      computerPicking = false;
      playing = false;
    }

    while (computerPicking) {
      // console.log(`Loop Counter: ${loopCounter}`);

      let computerPicks = computerPick();
      
      if (threeDimensionalArray[computerPicks.rowIndex][computerPicks.columnIndex] === 'X' || threeDimensionalArray[computerPicks.rowIndex][computerPicks.columnIndex] === 'O') {
        continue;
      } else {
        threeDimensionalArray[computerPicks.rowIndex][computerPicks.columnIndex] = 'O';
        plays += 1;
        // console.log('plays: ' + plays);
        allButtons[getButtonIndex(computerPicks.rowIndex,computerPicks.columnIndex)].classList.add('active-button');
        setTimeout(() => {
          allButtons[getButtonIndex(computerPicks.rowIndex,computerPicks.columnIndex)].innerHTML = threeDimensionalArray[computerPicks.rowIndex][computerPicks.columnIndex];
          allButtons[getButtonIndex(computerPicks.rowIndex,computerPicks.columnIndex)].classList.add('compPick');
          playing = false;
        }, 1000);
        computerPicking = false;
      }
    }
    let isUserWinner = checkAllWinningCombinations();
    let isCompWinner = checkAllLosingCombinations();
    if (isUserWinner && (isCompWinner === undefined || isCompWinner === false)) {
      didPlayerWin = false;
      computerPicking = false;
      plays = 0;
      console.log('You Win!');
      resultElement.innerHTML = 'You Win!';
      emptyResult();
      removeActive();
    } else if (isCompWinner) {
      computerPicking = false;
      plays = 0;
      console.log('good job commp!!');
      resultElement.innerHTML = 'You lost!';
      emptyResult();
      removeActive();
    } else if (plays === 9 && isUserWinner === undefined && isCompWinner === undefined) {
      resultElement.innerHTML = 'Tie!';
      console.log('Tie!');
      plays = 0;
      emptyResult();
      removeActive();
      setTimeout(() => {
        resetButtonAndGame();
      }, 1000);
    }
  }
  
}
