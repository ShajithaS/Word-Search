const gridContainer = document.getElementById('grid-container');
const grid = [
    ['C', 'R', 'P', 'R', 'O', 'G', 'R', 'A', 'M', 'T', 'A', 'P', 'I', 'R', 'A'],
    ['O', 'I', 'T', 'E', 'R', 'M', 'A', 'L', 'I', 'T', 'D', 'M', 'A', 'V', 'B'],
    ['M', 'I', 'E', 'P', 'T', 'E', 'M', 'A', 'L', 'E', 'A', 'R', 'A', 'A', 'C'],
    ['P', 'R', 'R', 'E', 'M', 'E', 'A', 'S', 'I', 'G', 'N', 'J', 'C', 'E', 'F'],
    ['U', 'A', 'R', 'T', 'S', 'L', 'H', 'D', 'M', 'P', 'G', 'K', 'A', 'K', 'G'],
    ['T', 'K', 'E', 'S', 'Y', 'I', 'W', 'H', 'E', 'E', 'T', 'R', 'K', 'N', 'H'],
    ['E', 'R', 'C', 'C', 'R', 'D', 'T', 'A', 'E', 'R', 'L', 'I', 'L', 'I', 'J'],
    ['R', 'E', 'A', 'A', 'A', 'I', 'R', 'R', 'A', 'O', 'N', 'Z', 'L', 'K', 'M'],
    ['H', 'E', 'N', 'M', 'R', 'T', 'M', 'C', 'T', 'Y', 'R', 'L', 'Z', 'S', 'N'],
    ['A', 'M', 'A', 'O', 'L', 'F', 'K', 'U', 'N', 'C', 'T', 'R', 'T', 'U', 'P'],
    ['A', 'L', 'G', 'L', 'G', 'E', 'S', 'R', 'E', 'V', 'E', 'R', 'N', 'N', 'P'],
    ['I', 'L', 'D', 'M', 'W', 'M', 'T', 'E', 'S', 'N', 'T', 'E', 'O', 'L', 'R'],
    ['A', 'G', 'O', 'T', 'E', 'G', 'D', 'Y', 'N', 'A', 'M', 'I', 'C', 'N', 'S'],
    ['I', 'T', 'O', 'H', 'E', 'R', 'O', 'H', 'G', 'T', 'P', 'N', 'R', 'E', 'U']
];

const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]
];

function createGrid() {
    gridContainer.innerHTML = '';
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-item';
            cell.textContent = grid[row][col];
            gridContainer.appendChild(cell);
        }
    }
}

function isValid(x, y) {
    return x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;
}

function searchWord(word, x, y, dx, dy) {
    let posX = x;
    let posY = y;
    for (let i = 0; i < word.length; i++) {
        if (!isValid(posX, posY) || grid[posX][posY] !== word[i]) {
            return false;
        }
        posX += dx;
        posY += dy;
    }
    return true;
}
const colors = ['yellow', 'red', 'blue']; // Add more colors as needed

function highlightWord(word, x, y, dx, dy, color) {
    let posX = x;
    let posY = y;
    for (let i = 0; i < word.length; i++) {
        gridContainer.children[posX * grid[0].length + posY].classList.add(`highlight-${color}`);
        posX += dx;
        posY += dy;
    }
}

function findWord(word, color) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === word[0]) {
                for (const [dx, dy] of directions) {
                    if (searchWord(word, row, col, dx, dy)) {
                        highlightWord(word, row, col, dx, dy, color);
                        return;
                    }
                }
            }
        }
    }
}

function solve() {
    const wordList = document.getElementById('word-list').value.split(',').map(word => word.trim());
    let colorIndex = 0;
    for (const word of wordList) {
        findWord(word, colors[colorIndex % colors.length]);
        colorIndex++;
    }
}

function clearGrid() {
    document.getElementById('word-list').value = '';
    createGrid();
}

createGrid();
