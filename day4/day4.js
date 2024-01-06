import {readinput} from './utils.js'


function solvePart1(input) {
    let result = 0;
    input.forEach( line => {
        const match = /Card\s+(\d+):([\d\s]+)\|([\d\s]+)/.exec(line);
        if (match) {
            const winning = match[2].trim().split(/\s+/);
            const ihave = match[3].trim().split(/\s+/);

            let cardValue = 0;
            ihave.forEach( num => {
                if (winning.includes(num)) {
                    cardValue = (cardValue > 0) ? cardValue * 2 : 1;
                }
            });

            result += cardValue;
        }
    });
    return result;
}

function solvePart2(input) {
    let lineNo = 0;
    let numCards = [];

    let totalNumCards = 0;

    input.forEach( line => {
        const match = /Card\s+(\d+):([\d\s]+)\|([\d\s]+)/.exec(line);
        if (match) {
            const winning = match[2].trim().split(/\s+/);
            const ihave = match[3].trim().split(/\s+/);

            let winningNumbers = 0;
            ihave.forEach( num => {
                if (winning.includes(num)) {
                    winningNumbers++;
                }
            });
            let countThisCard = (numCards[lineNo] ?? 0) + 1;
            totalNumCards += countThisCard;

            if (winningNumbers > 0) {
                for (let i=lineNo+1; i < lineNo+1+winningNumbers; i++) {
                    numCards[i] = (numCards[i] ?? 0) + countThisCard;
                }
            }
        }
        lineNo++
    });
    return totalNumCards;
}


console.log('Day 4');

const testinput = readinput('testinput.txt');
console.assert(solvePart1(testinput) ===13, 'solution for part 1 on testinput is wrong');
console.assert(solvePart2(testinput) ===30,'solution for part 2 on testinput is wrong');


const input = readinput('input.txt');
console.log('result for Part 1: ' +solvePart1(input) );

console.log('result for Part 2: ' +solvePart2(input));
