//wait for the page to load
window.addEventListener('load', initGame);

//setup variables
const petList = {
    hipodoge: {
        petName: 'Hipodoge',
    },
    capipepo: {
        petName: 'Capipepo',
    },
    ratigueya: {
        petName: 'Ratigueya',
    },
    langostelvis: {
        petName: 'Langostelvis',
    },
    tucapalma: {
        petName: 'Tucapalma',
    },
    pydos: {
        petName: 'Pydos',
    },
};
const elements = ['fire', 'water', 'earth'];
//key wins content
let fightLogic = {
    fire: 'earth',
    water: 'fire',
    earth: 'water',
};
const petListLenght = Object.keys(petList).length;
let playerPet = '';
let enemyPet = '';
let playerAttack = '';
let enemyAttack = '';
let fightResult = '';
let playerLives = 3;
let enemyLives = 3;

//usefull functions
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//initial state of the gam: select the pet
/** 1.0 intGame
 * @name initGame
 * @description initializates the logic behind the game
 *
 */
function initGame() {
    //hide the attack section until the pet is chosen
    let attackSection = document.getElementById('attack-selection');
    attackSection.style.display = 'none';
    let petSelectionSection = document.getElementById('pet-selection');
    let messageSection = document.getElementById('messages');
    messageSection.style.display = 'none';
    //listener for the player pet selection
    let buttonPlayerPet = document.getElementById('button-pet');
    buttonPlayerPet.addEventListener('click', function () {
        selectPlayerPet(petSelectionSection, attackSection);
    });
    let restartSection = document.getElementById('restart');
    restartSection.style.display = 'none';

    //listener for the player attack selection
    let buttonFire = document.getElementById('button-fire');
    buttonFire.addEventListener('click', fireAttack);
    let buttonWater = document.getElementById('button-water');
    buttonWater.addEventListener('click', waterAttack);
    let buttonEarth = document.getElementById('button-earth');
    buttonEarth.addEventListener('click', earthAttack);
    let restartbutton = document.getElementById('button-restart');
    restartbutton.addEventListener('click', restartGame);
}

//function to retrieve the pet the user selected
/** 1.1 selectPlayerPet
 * @name selectPlayerPet
 * @description begins the logic of the game, selecting the pet of the player from the UI
 *
 */
function selectPlayerPet(pickSection, displaySection) {
    // get all the pets
    const pets = document.getElementsByName('pet');
    let spanPlayerPet = document.getElementById('player-pet');
    //turn pets into an array
    const petlist = Array.prototype.slice.call(pets);
    //find selected pet
    playerPet = petlist.find((element) => element.checked == true)?.id;
    spanPlayerPet.innerHTML =
        playerPet.charAt(0).toUpperCase() + playerPet.slice(1);
    //change the visivility of the required sections
    pickSection.style.display = 'none';
    displaySection.style.display = 'block';
    let messageSection = document.getElementById('messages');
    messageSection.style.display = 'flex';
    //pick a random pet for the enemy
    selectEnemyPet();
}

//enemy pet generation
/** 1.1.1 selectEnemyPet
 * @name selectEnemyPet
 * @description randomly selects the pet of the enemy from the pool
 *
 */
function selectEnemyPet() {
    spanEnemyPet = document.getElementById('enemy-pet');
    //make a random pick of the pet
    const enemyPick = random(0, petListLenght - 1);

    enemyPet = Object.values(petList)[enemyPick].petName;
    spanEnemyPet.innerHTML = enemyPet;
}

//functions for the different element attacks logic
/** 1.2 fireAttack
 *  @name fireAttack
 * @description logic for the fire attack
 */
function fireAttack() {
    playerAttack = 'fire';
    enemyRandomAttack();
}
/** 1.3 waterAttack
 *  @name waterAttack
 * @description logic for the fire attack
 */
function waterAttack() {
    playerAttack = 'water';
    enemyRandomAttack();
}
/**  1.3 earthAttack
 *  @name earthAttack
 * @description logic for the fire attack
 */
function earthAttack() {
    playerAttack = 'earth';
    enemyRandomAttack();
}

//enemy attack randomizer
/** 1.4 enemyRandomAttack
 *  @name enemyRandomAttack
 * @description logic for the random enemy attack selection
 */
function enemyRandomAttack() {
    let randomElement = random(0, 2);
    enemyAttack = elements[randomElement];

    //create the parragraph with the resoult
    createMessage();
}

//battle result depending on the global variables
/**1.5 createMessage
 * @name createMessage
 * @description append a message with the attacks and resoult of the fight to the DOM
 */
function createMessage() {
    fightResultCalc();
    let newPlayerAttack = document.createElement('p');
    let newEnemyAttack = document.createElement('p');
    newPlayerAttack.innerHTML = playerAttack;
    newEnemyAttack.innerHTML = enemyAttack;

    document.getElementById('result-message').innerHTML = result;
    document.getElementById('player-attacks').append(newPlayerAttack);
    document.getElementById('enemy-attacks').append(newEnemyAttack);
    reviewLives();
}

//calculation of the fight result
/** 1.5.1 fightResultCalc
 * @name fightResultCalc
 * @description comparison and logic behind the message result
 *
 */
function fightResultCalc() {
    let spanPlayerLives = document.getElementById('player-lives');
    let spanEnemyLives = document.getElementById('enemy-lives');
    let playerWinsIf = Object.keys(fightLogic).find(
        (key) => fightLogic[key] == enemyAttack
    );
    if (playerAttack == playerWinsIf) {
        result = 'YOU WON ✌!';
        enemyLives--;
        spanEnemyLives.innerHTML = enemyLives;
    } else if (playerAttack == enemyAttack) {
        result = 'Draw 👉👈';
    } else {
        result = 'You Lost! 😢';
        playerLives--;
        spanPlayerLives.innerHTML = playerLives;
    }
    //check if someone already won this battle
}

/** 1.5.1.1 reviewLives
 * @name reviewLives
 * @description verification of the player and enemy lives to continue the game
 *
 */
function reviewLives() {
    if (enemyLives == 0) {
        let parragraph =
            "Enemy's " + enemyPet + ' has fainted, You WON the Battle!!';
        document.getElementById('result-message').innerHTML = parragraph;
        disableAttacks();
    } else if (playerLives == 0) {
        let parragraph =
            'Your ' + playerPet + ' has fainted, You LOST the Battle!!';
        document.getElementById('result-message').innerHTML = parragraph;
        disableAttacks();
    }
}

/** 1.5.1.2 disableAttacks
 * @name DisableAttacks
 * @description Disable the attacks of the player
 *
 */
function disableAttacks() {
    let fireButton = document.getElementById('button-fire');
    let waterButton = document.getElementById('button-water');
    let earthButton = document.getElementById('button-earth');
    fireButton.disabled = true;
    waterButton.disabled = true;
    earthButton.disabled = true;
    let restartSection = document.getElementById('restart');
    restartSection.style.display = 'block';
}

/**1.3 restartGame
 * @name restartGame
 * @description restart the game when the user wants
 *
 */
function restartGame() {
    location.reload();
}
