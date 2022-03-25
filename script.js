let movies = ['the shawshank redemption','the godfather','the godfather part ii','the dark knight','twelve angry men','schindlers list','pulp fiction','the good the bad and the ugly','the lord of the rings the return of the king','fight club','the lord of the rings: the fellowship of the ring','star wars episode v the empire strikes back','forrest gump','inception','one flew over the cuckoos nest','the lord of the rings: the two towers','goodfellas','the matrix','star wars','seven samurai','city of god','se7en','the silence of the lambs','the usual suspects','its a wonderful life','life is beautiful','léon the professional','once upon a time in the west','interstellar','saving private ryan','american history x','spirited away','casablanca','raiders of the lost ark','psycho','city lights','rear window','the intouchables','modern times','terminator 2 judgment day','whiplash','the green mile','the pianist','memento','the departed','gladiator','apocalypse now','back to the future','sunset blvd','dr strangelove or how i learned to stop worrying and love the bomb','the prestige','alien','the lion king','the lives of others','the great dictator','inside out','cinema paradiso','the shining','paths of glory','django unchained','the dark knight rises','wall e','american beauty','grave of the fireflies','aliens','citizen kane','north by northwest','princess mononoke','vertigo','oldboy','das boot','m','star wars episode vi return of the jedi','once upon a time in america','amelie','witness for the prosecution','reservoir dogs','braveheart','toy story 3','a clockwork orange','double indemnity','taxi driver','requiem for a dream','to kill a mockingbird','lawrence of arabia','eternal sunshine of the spotless mind','full metal jacket','the sting','amadeus','bicycle thieves','singin in the rain','monty python and the holy grail','snatch','2001 a space odyssey','the kid','l.a. confidential','rashomon','for a few dollars more','toy story','the apartment','inglourious bastards','all about eve','the treasure of the sierra madre','jodaeiye nader az simin','indiana jones and the last crusade','metropolis','yojimbo','the third man','batman begins','scarface','some like it hot','unforgiven','3 idiots','up','raging bull','downfall','mad max fury road','jagten','chinatown','the great escape','die hard','good will hunting','heat','on the waterfront','pans labyrinth','mr smith goes to washington','the bridge on the river kwai','my neighbor totoro','ran','the gold rush','ikiru','the seventh seal','blade runner','the secret in their eyes','wild strawberries','the general','lock, stock and two smoking barrels','the elephant man','casino','the wolf of wall street','howls moving castle','warrior','gran torino','v for vendetta','the big lebowski','rebecca','judgment at nuremberg','a beautiful mind','cool hand luke','the deer hunter','how to train your dragon','gone with the wind','fargo','trainspotting','it happened one night','dial m for murder','into the wild','gone girl','the sixth sense','rush','finding nemo','the maltese falcon','mary and max','no country for old men','the thing','incendies','hotel rwanda','kill bill vol 1','life of brian','platoon','the wages of fear','butch cassidy and the sundance kid','there will be blood','network','touch of evil','the 400 blows','stand by me','12 years a slave','the princess bride','annie hall','persona','the grand budapest hotel','amores perros','in the name of the father','million dollar baby','ben-hur','the grapes of wrath','hachi a dogs tale','nausicaa of the valley of the wind','shutter island','diabolique','sin city','the wizard of oz','gandhi','stalker','the bourne ultimatum','the best years of our lives','donnie darko','relatos salvajes','8 and a half','strangers on a train','jurassic park','the avengers','before sunrise','twelve monkeys','the terminator','infernal affairs','jaws','the battle of algiers','groundhog day','memories of murder','guardians of the galaxy','monsters inc','harry potter and the deathly hallows part 2','throne of blood','the truman show','fanny and alexander','barry lyndon','rocky','dog day afternoon','the imitation game','yip man','the kings speech','high noon','la haine','a fistful of dollars','pirates of the caribbean the curse of the black pearl','notorious','castle in the sky','prisoners','the help','whos afraid of virginia woolf','roman holiday','spring summer fall winter and spring','the night of the hunter','beauty and the beast','la strada','papillon','xmen days of future past','before sunset','anatomy of a murder','the hustler','the graduate','the big sleep','underground','elite squad the enemy within','gangs of wasseypur','lagaan once upon a time in india','paris texas','akira']
let rightGuessString = movies[Math.floor(Math.random() * movies.length)]
let guess = []
let nextLetter = 0
let totalBoxes = rightGuessString.length
let totalGuesses = Math.floor(Math.random() * 8) + 4;
let currentGuesses = 0;
console.log(totalGuesses);
console.log(rightGuessString);

// Creates the gameboard based on the length of the movie to be guessed

function createBoard() {
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

createBoard()

// Pickups what key was selected and runs from the functions below

document.addEventListener("keyup", function(letter) {

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
         addLetter(pressedKey)
    }
})

// What was pressed on the virtual keyboard

document.getElementById("keyboard").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keys")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})


// Adds a letter to the gameboard

function addLetter (pressedKey) {
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
    
    for (let i = 0; i < totalBoxes; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = guess[i]
        
        let letterPosition = rightGuess.indexOf(guess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            if (guess[i] === rightGuess[i]) {

                letterColor = 'green'
            } else {
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
        guessesRemaining = 0
        return
    } else {
        currentGuesses++;
        guess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${rightGuessString}"`)
        }
    }
}


