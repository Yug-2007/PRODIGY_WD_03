const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');

let isXTurn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove('X', 'O');
    cell.innerText = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.innerText = "Player X's turn";
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  cell.classList.add(currentClass);
  cell.innerText = currentClass;

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
    message.innerText = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
  }
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

function endGame(draw) {
  if (draw) {
    message.innerText = "It's a Draw!";
  } else {
    message.innerText = `Player ${isXTurn ? 'X' : 'O'} Wins!`;
  }
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

// Start the game on load
startGame();
