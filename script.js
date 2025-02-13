let currentGame = null; // Az aktuálisan megnyitott játék

function startGame(gameNumber) {
    if (currentGame) {
        alert("Először fejezd be vagy zárd be az aktuális játékot!");
        return;
    }

    switch (gameNumber) {
        case 1:
            currentGame = startPuzzleGame();
            break;
        case 2:
            currentGame = startQuizGame();
            break;
        case 3:
            currentGame = startMemoryGame();
            break;
        case 4:
            currentGame = startTicTacToe();
            break;
        case 5:
            currentGame = startGuessNumberGame();
            break;
        case 6:
            currentGame = startWordSearchGame();
            break;
        default:
            alert("Játék indítása...");
    }
}

function closeCurrentGame() {
    if (currentGame) {
        currentGame.remove(); // Eltávolítja az aktuális játékot
        currentGame = null; // Törli az aktuális játék referenciáját
    }
}

// Puzzle Játék
// JavaScript (script.js)
function startGame(gameNumber) {
    switch (gameNumber) {
        case 1:
            // Átirányítás a külső puzzle oldalra
            window.location.href = "https://im-a-puzzle.com/share/f0f4f0ba7cc12cf";
            break;
        case 2:
            startQuizGame();
            break;
        case 3:
            startMemoryGame();
            break;
        // ... További játékok esetei
        default:
            alert("Játék indítása...");
    }
}

// Kérdések és Válaszok
function startQuizGame() {
    const quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-container';
    quizContainer.innerHTML = `
        <h2>Kérdések és Válaszok</h2>
        <div class="question">
            <p>Mi a kedvenc színem?</p>
            <input type="text" id="answer1">
        </div>
        <div class="question">
            <p>Mi a kedvenc ételem?</p>
            <input type="text" id="answer2">
        </div>
        <button onclick="checkAnswers()">Ellenőrzés</button>
        <button onclick="closeCurrentGame()">Bezárás</button>
    `;
    document.body.appendChild(quizContainer);
    return quizContainer;
}

function checkAnswers() {
    const answer1 = document.getElementById('answer1').value;
    const answer2 = document.getElementById('answer2').value;
    if (answer1 && answer2) {
        alert(`Köszönöm a válaszokat: ${answer1} és ${answer2}`);
        document.querySelector('.quiz-container').remove();
        showSuccessMessage();
        currentGame = null; // Törli az aktuális játék referenciáját
    } else {
        alert('Kérlek, válaszolj minden kérdésre!');
    }
}

// Memória Játék
function startMemoryGame() {
    const memoryContainer = document.createElement('div');
    memoryContainer.className = 'memory-container';
    memoryContainer.innerHTML = `
        <h2>Memória Játék</h2>
        <div class="memory-grid">
            <div class="memory-card" data-card="1">?</div>
            <div class="memory-card" data-card="1">?</div>
            <div class="memory-card" data-card="2">?</div>
            <div class="memory-card" data-card="2">?</div>
            <div class="memory-card" data-card="3">?</div>
            <div class="memory-card" data-card="3">?</div>
        </div>
        <button onclick="closeCurrentGame()">Bezárás</button>
    `;
    document.body.appendChild(memoryContainer);

    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.textContent = this.dataset.card === '1' ? '❤️' : this.dataset.card === '2' ? '🌸' : '🎀';
        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.card === secondCard.dataset.card;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;
        if (matchedPairs === 3) {
            setTimeout(() => {
                memoryContainer.remove();
                showSuccessMessage();
                currentGame = null; // Törli az aktuális játék referenciáját
            }, 1000);
        }
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.textContent = '?';
            secondCard.textContent = '?';
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
    return memoryContainer;
}

// Tic-Tac-Toe
function startTicTacToe() {
    const ticTacToeContainer = document.createElement('div');
    ticTacToeContainer.className = 'tic-tac-toe-container';
    ticTacToeContainer.innerHTML = `
        <h2>Tic-Tac-Toe</h2>
        <div class="tic-tac-toe-grid">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>
            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>
            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
        </div>
        <button onclick="resetTicTacToe()">Új játék</button>
        <button onclick="closeCurrentGame()">Bezárás</button>
    `;
    document.body.appendChild(ticTacToeContainer);

    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkForWinner();
    }

    function checkForWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            alert(`A játékos ${currentPlayer} nyert!`);
            gameActive = false;
            setTimeout(() => {
                ticTacToeContainer.remove();
                showSuccessMessage();
                currentGame = null; // Törli az aktuális játék referenciáját
            }, 1000);
            return;
        }

        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            alert('Döntetlen!');
            gameActive = false;
            setTimeout(() => {
                ticTacToeContainer.remove();
                showSuccessMessage();
                currentGame = null; // Törli az aktuális játék referenciáját
            }, 1000);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function resetTicTacToe() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
    }

    return ticTacToeContainer;
}


// Számkitalálós Játék
function startGuessNumberGame() {
    const guessNumberContainer = document.createElement('div');
    guessNumberContainer.className = 'guess-number-container';
    guessNumberContainer.innerHTML = `
        <h2>Számkitalálós Játék</h2>
        <p>Találd ki a számot 1 és 100 között!</p>
        <input type="number" id="guessInput" min="1" max="100">
        <button id="guessButton">Tippelés</button>
        <button onclick="closeCurrentGame()">Bezárás</button>
    `;
    document.body.appendChild(guessNumberContainer);

    // Újraindítás a változókhoz
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    // Eseménykezelő hozzáadása a gombhoz
    document.getElementById('guessButton').addEventListener('click', checkGuess);

    return guessNumberContainer;
}

function checkGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = parseInt(guessInput.value);

    // Hibakezelés
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("❌ Kérlek, adj meg egy számot 1 és 100 között!");
        return;
    }

    attempts++;

    // Tipp kiértékelése
    if (guess < targetNumber) {
        alert(`🔺 A szám NAGYOBB! (Próbálkozások: ${attempts})`);
    } else if (guess > targetNumber) {
        alert(`🔻 A szám KISEBB! (Próbálkozások: ${attempts})`);
    } else {
        alert(`🎉 Gratulálok, kitaláltad a számot ${attempts} próbálkozásból!\nA helyes szám: ${targetNumber}`);
        document.querySelector('.guess-number-container').remove();
        showSuccessMessage();
        currentGame = null;
    }

    guessInput.value = ''; // Mező törlése
}

function showSuccessMessage() {
    const successContainer = document.createElement('div');
    successContainer.className = 'success-container';
    successContainer.innerHTML = `
        <h2>❤️ Ügyes vagy, szerelmem! ❤️</h2>
        <button onclick="nextGame()">Új játék</button>
    `;
    document.body.appendChild(successContainer);
}

// Sikeres üzenet frissítve a helyes számmal
function showSuccessMessage(targetNumber) {
    const successContainer = document.createElement('div');
    successContainer.className = 'success-container';
    successContainer.innerHTML = `
        <h2>Ügyes vagy, szerelmem! ❤️</h2>
        <p>A helyes szám: ${targetNumber}</p>
        <button onclick="nextGame()">Következő játék</button>
    `;
    document.body.appendChild(successContainer);
}

// További játékok függvényei (Puzzle, Kérdések és Válaszok, Memória, Tic-Tac-Toe, Szókereső)...

// Szókereső
function startWordSearchGame() {
    const wordSearchContainer = document.createElement('div');
    wordSearchContainer.className = 'word-search-container';
    wordSearchContainer.innerHTML = `
        <h2>Szókereső</h2>
        <p>Találd meg a "Szeretlek" szót!</p>
        <div class="word-search-grid"></div>
        <button onclick="closeCurrentGame()">Bezárás</button>
    `;
    document.body.appendChild(wordSearchContainer);

    const grid = wordSearchContainer.querySelector('.word-search-grid');
    const targetWord = "SZERETLEK";
    const letters = createRandomGrid(targetWord); // Rács létrehozása a cél szóval és véletlenszerű betűkkel

    // Rács létrehozása (3x3-as rács)
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = letters[i];
        grid.appendChild(cell);
    }

    let foundWord = "";

    grid.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', () => {
            foundWord += cell.textContent;
            if (foundWord === targetWord) {
                wordSearchContainer.innerHTML = `
                    <h2>Szókereső</h2>
                    <p>Én is szeretlek! ❤️</p>
                `;
                setTimeout(() => {
                    wordSearchContainer.remove();
                    showSuccessMessage();
                    currentGame = null; // Törli az aktuális játék referenciáját
                }, 2000);
            }
        });
    });

    return wordSearchContainer;
}

// Segédfüggvény a rács létrehozásához
function createRandomGrid(targetWord) {
    const letters = targetWord.split(''); // Cél szó betűi
    const randomLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Véletlenszerű betűk forrása
    const gridSize = 9; // 3x3-as rács
    const grid = [];

    // Cél szó betűinek hozzáadása a rácshoz
    for (let i = 0; i < letters.length; i++) {
        grid.push(letters[i]);
    }

    // Véletlenszerű betűk hozzáadása a rács többi helyére
    for (let i = letters.length; i < gridSize; i++) {
        const randomIndex = Math.floor(Math.random() * randomLetters.length);
        grid.push(randomLetters[randomIndex]);
    }

    // Rács megkeverése
    for (let i = grid.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [grid[i], grid[j]] = [grid[j], grid[i]]; // Betűk megkeverése
    }

    return grid;
}

// Sikeres üzenet
function showSuccessMessage() {
    const successContainer = document.createElement('div');
    successContainer.className = 'success-container';
    successContainer.innerHTML = `
        <h2>Ügyes vagy, szerelmem! ❤️</h2>
        <button onclick="nextGame()">Következő játék</button>
        <button onclick="closeSuccessMessage()">Bezárás</button>
    `;
    document.body.appendChild(successContainer);
}

function nextGame() {
    const successContainer = document.querySelector('.success-container');
    if (successContainer) {
        successContainer.remove();
    }
    // Itt lehetne egy számláló, hogy melyik játék következik
}

function closeSuccessMessage() {
    const successContainer = document.querySelector('.success-container');
    if (successContainer) {
        successContainer.remove();
    }
}
