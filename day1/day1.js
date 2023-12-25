import {readinput} from './utils.js'


console.log('Day 1');

const input = readinput();

let result = 0;

input.forEach( line => {
    const match = line.match(/^\D*(\d)(.*(\d))?\D*$/);
    if (match) {
        result += 10 * +match[1] + +(match[3] ?? match[1]);
    }
})

console.log("result: " +result);



let result2 = 0;
input.forEach( line => {
    const match = line.match(/^\D*?(\d|one|two|three|four|five|six|seven|eight|nine)(.*(\d|one|two|three|four|five|six|seven|eight|nine))?\D*$/);
    if (match) {
        result2 += 10 * toNumber(match[1]) + toNumber( match[3] ?? match[1]);
    }
})

console.log("result for Part Two: " +result2);


function toNumber(val) {
    switch (val) {
        case 'one': return 1;
        case 'two': return 2;
        case 'three': return 3;
        case 'four': return 4;
        case 'five': return 5;
        case 'six': return 6;
        case 'seven': return 7;
        case 'eight': return 8;
        case 'nine': return 9;
    }
    return +val;
}
