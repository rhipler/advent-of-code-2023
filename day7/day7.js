import {readinput} from './utils.js'

function typeByFreq(freq) {
    if (freq[0]===5) {
        return 6
    } else if (freq[0]===4) {
        //four of a kind
        return 5
    } else  if (freq[0]===3 && freq[1]===2) {
        //full house
        return 4;
    } else  if(freq[0]===3) {
        //three of a kind
        return 3;
    } else if (freq[0]===2 && freq[1]===2) {
        //two pair
        return 2;
    } else if (freq[0]===2) {
        //one pair
        return 1;
    } else {
        return 0
    }
}

function typeOfHand(hand) {
    const freq = new Map();
    for (let c of hand) {
        freq.set(c, (freq.get(c)??0) +1);
    }
    const cardFreqSorted = Array.from(freq.values()).sort((a,b) => b-a);

    return typeByFreq(cardFreqSorted);
}


function typeOfHandWithJokers(hand) {
    const freq = new Map();
    for (let c of hand) {
        freq.set(c, (freq.get(c) ?? 0) + 1);
    }

    const jokers = freq.get('J');
    freq.delete('J');
    const cardFreqSorted = Array.from(freq.values()).sort((a, b) => b - a);

    if (jokers > 0) {
        if (jokers===5) {
            // 5 of a kind
            return 6;
        }
        cardFreqSorted[0] += jokers
    }

    return typeByFreq(cardFreqSorted);
}

const cardValues = new Map([
    ['A', 14],
    ['K', 13],
    ['Q', 12],
    ['J', 11],
    ['T', 10],
    ['9', 9],
    ['8', 8],
    ['7', 7],
    ['6', 6],
    ['5', 5],
    ['4', 4],
    ['3', 3],
    ['2', 2]
]);

const cardValues2 = new Map([
    ['A', 14],
    ['K', 13],
    ['Q', 12],
    ['T', 10],
    ['9', 9],
    ['8', 8],
    ['7', 7],
    ['6', 6],
    ['5', 5],
    ['4', 4],
    ['3', 3],
    ['2', 2],
    ['J', 1]
]);

function compareCards(a,b) {
    return cardValues.get(a) - cardValues.get(b);
}

function compareCardsWithJokers(a,b) {
    return cardValues2.get(a) - cardValues2.get(b);
}

function parseInput(input) {
    const hands = [];
    input.forEach(line => {
        const match = line.match(/(\w{5})\s+(\d+)/)
        if (match) {
            hands.push({hand: match[1], bid: +match[2]});
        }
    })
    return hands;
}
function solvePart1(input) {
    const hands = parseInput(input);

    hands.sort( (a,b) => {
        const cmpType = typeOfHand(a.hand) - typeOfHand(b.hand);
        if (cmpType !==0) {
            return cmpType;
        }

        for (let i=0; i<5; i++) {
            const comp = compareCards(a.hand[i], b.hand[i]);
            if (comp !==0) {
                return comp;
            }
        }
    });

    return hands.reduce((acc,hand, index) => {
        return acc + (index+1)*hand.bid;
    },0);
}


function solvePart2(input) {
    const hands = parseInput(input);

    hands.sort( (a,b) => {
        const cmpType = typeOfHandWithJokers(a.hand) - typeOfHandWithJokers(b.hand);
        if (cmpType !== 0) {
            return cmpType;
        }

        for (let i=0; i<5; i++) {
            const comp = compareCardsWithJokers(a.hand[i], b.hand[i]);
            if (comp !==0) {
                return comp;
            }
        }
    });

    return hands.reduce((acc,hand, index) => {
        return acc +(index+1)*hand.bid;
    },0);
}


console.log('Day 7');

const testinput = readinput('testinput.txt');
console.assert(solvePart1(testinput) === 6440, 'solution for part 1 on testinput is wrong');
console.assert(solvePart2(testinput) === 5905,'solution for part 2 on testinput is wrong');


const input = readinput('input.txt');
console.log('result for Part 1: ' +solvePart1(input) );
console.log('result for Part 2: ' +solvePart2(input));
