import {readinput} from './utils.js'

console.log('Day 3');

const input = readinput();



let sumOfParts = 0;

let lineNumber=0;
input.forEach( line => {
    const matches = line.matchAll(/(\d+)/g);

    for (const match of matches) {
        const start = match.index
        const end = match.index+match[1].length;

        if (isSymbolLeft(line, start) || isSymbolRight(line, end) || isSymbolAbove(input, lineNumber, start, end)
            || isSymbolBelow(input, lineNumber, start, end)) {
            sumOfParts +=  +match[1];
        }
    }

    lineNumber++
});

console.log('result: ' +sumOfParts);



lineNumber=0;
let gearRatio = 0;
input.forEach( line => {
    const matches = line.matchAll(/\*/g);

    for (const match of matches) {
        let numbers = getNumbersAbove(input, lineNumber, match.index);
        numbers = numbers.concat(getNumberLeft(input, lineNumber, match.index));
        numbers = numbers.concat(getNumberRight(input, lineNumber, match.index));
        numbers = numbers.concat(getNumbersbelow(input, lineNumber, match.index));

        if (numbers.length === 2) {
            gearRatio += numbers[0] * numbers[1];
        }
    }

    lineNumber++
});

console.log('Sum of gear ratios (result for Part Two): ' +gearRatio);



function isSymbolLeft(line, col) {
    return (col > 0 && line[col - 1] !== '.');
}

function isSymbolRight(line, col) {
    return (col < line.length && line[col] !== '.');
}

function isSymbolAbove(input , lineNumber, start, end) {
    if (lineNumber > 0) {
        const substr = input[lineNumber-1].substring( (start > 0 ? start-1 : 0) , (end < input[lineNumber].length - 1) ? end + 1 : end);
        return (substr.search(/[^\\.\d]/) !== -1 );
    }
    return false;
}

function isSymbolBelow(input, lineNumber, start,end) {
    if (input.length > lineNumber+1 && input[lineNumber+1].length>1) {
        const substr = input[lineNumber+1].substring( (start > 0 ? start-1 : 0), (end < input[lineNumber+1].length-1) ? end+1 : end);
        return (substr.search(/[^\\.\d]/) !== -1 );
    }
    return false;
}


function getNumberLeft(input, lineNumber,col) {
    const match = input[lineNumber].substring(0,col).match(/(\d+)$/);
    if (match) {
        return [+match[1]];
    }
    return []
}

function getNumberRight(input, lineNumber,col) {
    const match = input[lineNumber].substring(col+1).match(/^(\d+)/);
    if (match) {
        return [+match[1]];
    }
    return [];
}


function getNumbersAbove(input, lineNumber,col) {
    if (lineNumber > 0) {
        const matchLeft = input[lineNumber-1].substring(0,col).match(/(\d+)$/);
        const numberL = matchLeft ? matchLeft[1] : '';
        
        const matchRight = input[lineNumber-1].substring(col+1).match(/^(\d+)/);
        const numberR = matchRight ? matchRight[1] : '';
        if (input[lineNumber-1][col].match(/\d/)) {
            return [ +(numberL +input[lineNumber-1][col] + numberR)];
        } else {
            let res = Array();
            if (numberL) {
                res.push(+numberL)
            }
            if (numberR){
                res.push(+numberR);
            }
            return res;
        }
    }
    return [];
}

function getNumbersbelow(input, lineNumber, col) {
    if (lineNumber+1 < input.length) {
        const matchLeft = input[lineNumber+1].substring(0,col).match(/(\d+)$/);
        const numberL = matchLeft ? matchLeft[1] : '';
        
        const matchRight = input[lineNumber+1].substring(col+1).match(/^(\d+)/);
        const numberR = matchRight ? matchRight[1] : '';
        
        if (input[lineNumber+1][col].match(/\d/)) {
            return [ +(numberL +input[lineNumber+1][col] + numberR)];
        } else {
            let res = Array();
            if (numberL) {
                res.push(+numberL)
            }
            if (numberR){
                res.push(+numberR);
            }
            return res;
        }
    }
    return [];
}
