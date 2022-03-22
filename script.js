let movies = ['whiplash', 'psycho', 'kimi', 'shawshank redemption', 'hatter']
let rightGuessString = movies[Math.floor(Math.random() * movies.length)]
let guess = []
let nextLetter = 0
let totalBoxes = rightGuessString.length
let totalGuesses = Math.floor(Math.random() * 4) + 4;
let currentGuesses = 0;
console.log(totalGuesses);
console.log(rightGuessString);

// Creates the gameboard based on the length of the movie to be guessed

function boardDisplay() {
    let board = document.getElementById("game-board");

    for (let r = 0; r < totalGuesses; r++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let b = 0; b < totalBoxes; b++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

boardDisplay()

// Pickups what key was selected and runs from the functions below

document.addEventListener("keyup", function(letter) {

    if (totalGuesses === 0) {
        return
    }

    let pressedKey = String(letter.key)
    console.log(pressedKey);
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"," "].includes(pressedKey)
    console.log(found);
    if (found) {
         insertLetter(pressedKey)
    }
})

// Adds a letter to the gameboard

function insertLetter (pressedKey) {
    if (nextLetter === totalBoxes) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[currentGuesses]
    console.log(row);
    let box = row.children[nextLetter]
    console.log(box);
    box.textContent = pressedKey
    box.classList.add("filled-box")
    guess.push(pressedKey)
    nextLetter += 1
}

// Removes a letter from the gameboard

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[currentGuesses]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    guess.pop()
    nextLetter -= 1
}

// Check the guess

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[currentGuesses]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of guess) {
        guessString += val
    }

    // Checks if there's enough letters for the guess
    if (guessString.length != totalBoxes) {
        alert("Not enough letters!")
        return
    }
    // Checks if it's a valid movie from the list
    if (!movies.includes(guessString)) {
        alert("Word not in list!")
        return
    }

    
    for (let i = 0; i < totalBoxes; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = guess[i]
        
        let letterPosition = rightGuess.indexOf(guess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (guess[i] === rightGuess[i]) {
                // shade green 
                letterColor = 'green'
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        alert("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        guess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${rightGuessString}"`)
        }
    }
}