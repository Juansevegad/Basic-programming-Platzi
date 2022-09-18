//1 for rock, 2 for Paper, 3 for Scissors
const emojis = {
    1: '🥌',
    2: '📰',
    3: '✂',
};
let winCount = 0;
let pcWins = 0;

while (pcWins < 3 && winCount < 3) {
    let player = 0;
    let pc = Math.floor(Math.random() * 3) + 1;

    function choice(move) {
        let result = '';
        if (move == 1) {
            result = 'Rock 🥌';
        } else if (move == 2) {
            result = 'Paper 📰';
        } else if (move == 3) {
            result = 'Scissors ✂';
        } else {
            result = 'Pick a valid option, you LOSE';
        }
        return result;
    }
    player = prompt('Pick an option: 1.rock, 2.Paper, 3.Scissors');
    alert('PC picks: ' + choice(pc));
    alert('Player picks: ' + choice(player));

    //Combat
    if (pc == player) {
        alert('DRAW Player: ' + emojis[player] + ' == PC: ' + emojis[pc]);
    } else if (
        (player == 1 && pc == 3) ||
        (player == 2 && pc == 1) ||
        (player == 3 && pc == 2)
    ) {
        alert('YOU WIN!!! Player: ' + emojis[player] + ' >> PC: ' + emojis[pc]);
        winCount++;
    } else {
        alert(
            'YOU LOSE!!! PC: ' + emojis[pc] + ' >> Player: ' + emojis[player]
        );
        pcWins++;
    }
}
if (winCount < 3) {
    alert('You lost the game: ' + winCount + '/' + pcWins);
} else {
    alert('You won the game: ' + winCount + '/' + pcWins);
}
