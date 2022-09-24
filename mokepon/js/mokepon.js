//wait for the page to load
window.addEventListener('load', initGame);

//setup variables

//key wins content
let fightLogic = {
    fire: 'earth',
    water: 'fire',
    earth: 'water',
};
let playerPet = '';
let playerPetAttacks;
let enemyPet = '';
let playerAttacks = [];
let enemyAttacks = [];
let mokeponOptions;
let playerWins = 0;
let enemyWins = 0;
let enemyPetAttacks = [];
let fightResults = [];

//html elements
const attackSection = document.getElementById('attack-selection');
const attacks = document.getElementById('attacks-container');
const petSelectionSection = document.getElementById('pet-selection');
const messageSection = document.getElementById('messages');
const buttonPlayerPet = document.getElementById('button-pet');
const restartSection = document.getElementById('restart');
const restartbutton = document.getElementById('button-restart');
const cardsContainer = document.getElementById('cardsContainer');

let fireButton;
let waterButton;
let earthButton;
let buttons = [];

const spanPlayerPet = document.getElementById('player-pet');

const spanEnemyPet = document.getElementById('enemy-pet');

const spanPlayerWins = document.getElementById('player-lives');
const spanEnemyWins = document.getElementById('enemy-lives');
spanPlayerWins.innerHTML = '0';
spanEnemyWins.innerHTML = '0';

//Mokepon class
let mokepons = [];
class Mokepon {
    constructor(name, picture, life) {
        this.name = name;
        this.picture = picture;
        this.life = life;

        this.attacks = [];
    }
}

let hipodoge = new Mokepon(
    'Hipodoge',
    './assets/mokepons_mokepon_hipodoge_attack.png',
    5
);

let capipepo = new Mokepon(
    'Capipepo',
    './assets/mokepons_mokepon_capipepo_attack.png',
    5
);

let ratigueya = new Mokepon(
    'Ratigueya',
    './assets/mokepons_mokepon_ratigueya_attack.png',
    5
);

let langostelvis = new Mokepon(
    'Langostelvis',
    './assets/mokepons_mokepon_langostelvis_attack.png',
    5
);

let pydos = new Mokepon(
    'Pydos',
    './assets/mokepons_mokepon_pydos_attack.png',
    5
);

let tucapalma = new Mokepon(
    'Tucapalma',
    './assets/mokepons_mokepon_tucapalma_attack.png',
    5
);
hipodoge.attacks.push(
    { name: '💧', id: 'button-water' },
    { name: '💧', id: 'button-water' },
    { name: '💧', id: 'button-water' },
    { name: '🔥', id: 'button-fire' },
    { name: '🌱', id: 'button-earth' }
);
capipepo.attacks.push(
    { name: '🌱', id: 'button-earth' },
    { name: '🌱', id: 'button-earth' },
    { name: '🌱', id: 'button-earth' },
    { name: '💧', id: 'button-water' },
    { name: '🔥', id: 'button-fire' }
);
ratigueya.attacks.push(
    { name: '🔥', id: 'button-fire' },
    { name: '🔥', id: 'button-fire' },
    { name: '🔥', id: 'button-fire' },
    { name: '💧', id: 'button-water' },
    { name: '🌱', id: 'button-earth' }
);
langostelvis.attacks.push(
    { name: '💧', id: 'button-water' },
    { name: '💧', id: 'button-water' },
    { name: '🔥', id: 'button-fire' },
    { name: '🔥', id: 'button-fire' },
    { name: '🌱', id: 'button-earth' }
);
pydos.attacks.push(
    { name: '🔥', id: 'button-fire' },
    { name: '🔥', id: 'button-fire' },
    { name: '🌱', id: 'button-earth' },
    { name: '🌱', id: 'button-earth' },
    { name: '💧', id: 'button-water' }
);
tucapalma.attacks.push(
    { name: '💧', id: 'button-water' },
    { name: '💧', id: 'button-water' },
    { name: '🌱', id: 'button-earth' },
    { name: '🌱', id: 'button-earth' },
    { name: '🔥', id: 'button-fire' }
);

mokepons.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma);

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
    attackSection.style.display = 'none';
    messageSection.style.display = 'none';

    //generation of the buttons for each mokepon
    mokepons.forEach((mokepon) => {
        mokeponOptions = `
        <input type="radio" name="pet" id=${mokepon.name} />
        <label class="mokepon-card" for=${mokepon.name}>
            <img src=${mokepon.picture} alt=${mokepon.name} />
            <p>${mokepon.name}</p>
        </label>
        `;

        cardsContainer.innerHTML += mokeponOptions;
    });

    //listener for the player pet selectio
    buttonPlayerPet.addEventListener('click', function () {
        selectPlayerPet();
    });
    restartSection.style.display = 'none';

    //listener for the player attack selectio
    restartbutton.addEventListener('click', restartGame);
}

//function to retrieve the pet the user selected
/** 1.1 selectPlayerPet
 * @name selectPlayerPet
 * @description begins the logic of the game, selecting the pet of the player from the UI
 *
 */
function selectPlayerPet() {
    // get all the pets
    const pets = document.getElementsByName('pet');
    //turn pets into an array
    const HTMLpetlist = Array.prototype.slice.call(pets);
    //find selected pet
    playerPet = HTMLpetlist.find((element) => element.checked == true)?.id;
    spanPlayerPet.innerHTML =
        playerPet.charAt(0).toUpperCase() + playerPet.slice(1);
    //change the visivility of the required sections
    petSelectionSection.style.display = 'none';
    attackSection.style.display = 'block';
    messageSection.style.display = 'flex';

    //add attacks depending on the selected pet
    playerPetAttacks = mokepons.find(
        (element) => element.name == playerPet
    ).attacks;

    playerPetAttacks.forEach((attack) => {
        attacks.innerHTML += `
        <button class="attack-button AttackButton" id="${attack.id}">${attack.name}</button>
        `;
    });

    //assign the buttons to the variables
    fireButton = document.getElementById('button-fire');
    waterButton = document.getElementById('button-water');
    earthButton = document.getElementById('button-earth');
    buttons = document.querySelectorAll('.AttackButton');
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
    //make a random pick of the pet
    const enemyPick = random(0, mokepons.length - 1);

    enemyPet = mokepons[enemyPick].name;
    spanEnemyPet.innerHTML = enemyPet;
    enemyPetAttacks = mokepons[enemyPick].attacks;
    attackSequence();
}
/** 1.1.1.1 attackSequence()
 * @name attackSequence
 * @description logs the attack sequence of the player
 *
 */
function attackSequence() {
    //run through the attack buttons to set the event listeners
    buttons.forEach((button) => {
        //listen the event itself of the button to get the related info of the attack selected
        button.addEventListener('click', (e) => {
            // logs the attack picked by the player and stores it in an array and change the style of the button to record it has already been used
            if (e.target.textContent == '🔥') {
                playerAttacks.push('fire');
                button.disabled = true;
            } else if (e.target.textContent == '💧') {
                playerAttacks.push('water');
                button.disabled = true;
            } else {
                playerAttacks.push('earth');
                button.disabled = true;
            }
            // calculates a random attack for the enemy for each player pick
            enemyRandomAttack();
            // generates the message for the combat result
            if (playerAttacks.length == buttons.length) {
                createMessage();
            }
        });
    });
}

//enemy attack randomizer
/** 1.4 enemyRandomAttack
 *  @name enemyRandomAttack
 * @description logic for the random enemy attack selection
 */
function enemyRandomAttack() {
    let randomElement = random(0, enemyPetAttacks.length - 1);
    if (enemyPetAttacks[randomElement].name == '🌱') {
        enemyAttacks.push('earth');
    } else if (enemyPetAttacks[randomElement].name == '🔥') {
        enemyAttacks.push('fire');
    } else {
        enemyAttacks.push('water');
    }
    enemyPetAttacks.pop();
}

//battle result depending on the global variables
/**1.5 createMessage
 * @name createMessage
 * @description append a message with the attacks and result of the fight to the DOM
 */
function createMessage() {
    fightResultCalc();

    for (let attack = 0; attack < playerAttacks.length; attack++) {
        let newPlayerAttack = document.createElement('p');
        let newEnemyAttack = document.createElement('p');
        let newBattleResult = document.createElement('p');

        newPlayerAttack.innerHTML = playerAttacks[attack];
        newEnemyAttack.innerHTML = enemyAttacks[attack];
        newBattleResult.innerHTML = fightResults[attack];
        document.getElementById('player-messages').append(newPlayerAttack);
        document.getElementById('enemy-messages').append(newEnemyAttack);
        document.getElementById('result-messages').append(newBattleResult);
    }

    document.getElementById('result-message').innerHTML = '';
    reviewResult();
}

//calculation of the fight result
/** 1.5.1 fightResultCalc
 * @name fightResultCalc
 * @description comparison and logic behind the message result
 *
 */
function fightResultCalc() {
    for (let attack = 0; attack < playerAttacks.length; attack++) {
        let playerWinsIf = Object.keys(fightLogic).find(
            (key) => fightLogic[key] == enemyAttacks[attack]
        );
        if (playerAttacks[attack] == playerWinsIf) {
            fightResults[attack] = 'YOU WON ✌!';
            enemyWins++;
        } else if (playerAttacks[attack] == enemyAttacks[attack]) {
            fightResults[attack] = 'Draw 👉👈';
        } else {
            fightResults[attack] = 'You Lost! 😢';
            playerWins++;
        }
    }
    spanEnemyWins.innerHTML = enemyWins;
    spanPlayerWins.innerHTML = playerWins;
}

/** 1.5.1.1 reviewLives
 * @name reviewLives
 * @description verification of the player and enemy lives to continue the game
 *
 */
function reviewResult() {
    if (enemyWins < playerWins) {
        let parragraph =
            "Enemy's " + enemyPet + ' has fainted, You WON the Battle!!';
        document.getElementById('result-message').innerHTML = parragraph;
    } else if (playerWins < enemyWins) {
        let parragraph =
            'Your ' + playerPet + ' has fainted, You LOST the Battle!!';
        document.getElementById('result-message').innerHTML = parragraph;
    } else if (playerWins == enemyWins) {
        let parragraph = 'Its a Draw! press restart to try again!';
        document.getElementById('result-message').innerHTML = parragraph;
    }

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
