import {readinput} from './utils.js'


console.log('Day 2');

const input = readinput();

const testgame = { red: 12, green: 13, blue: 14}

const regExpLine = /Game\s*(\d+):(.*)$/

let result = 0;
input.forEach( line => {
    const lineMatch = regExpLine.exec(line);
    if (!lineMatch) {
        return;
    }

    let gamePossible = true;
    const subsets = lineMatch[2].split(';');
    subsets.forEach( subset => {
        const [red,green,blue] = parseSubset(subset);
        if (red > testgame.red || green > testgame.green || blue > testgame.blue ) {
            gamePossible = false;
        }
    });
    if (gamePossible) {
        result += +lineMatch[1];
    }

});
console.log("result: " +result);



let result2 = 0;
input.forEach( line => {
    const lineMatch = regExpLine.exec(line);
    if (!lineMatch) {
        return;
    }

    const subsets = lineMatch[2].split(';');
    let minred = 0;
    let mingreen = 0;
    let minblue = 0;
    subsets.forEach(subset => {
        const [red, green, blue] = parseSubset(subset);
        minred = Math.max(red, minred);
        mingreen = Math.max(green, mingreen);
        minblue = Math.max(blue, minblue);
    });
    result2 += minred * mingreen * minblue;
});

console.log('result for Part Two: ' +result2);


function parseSubset(subset) {
    const matchRed = subset.match(/(\d+)\s+red/);
    const red = matchRed ? +matchRed[1] : 0;

    const matchGreen = subset.match(/(\d+)\s+green/);
    const green = matchGreen ? +matchGreen[1] : 0;

    const matchBlue = subset.match(/(\d+)\s+blue/);
    const blue = matchBlue ?  +matchBlue[1] : 0;

    return [red,green,blue]
}
