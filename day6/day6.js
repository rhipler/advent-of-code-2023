import {readinput} from './utils.js'


function numberOfWaysToBeatRecord(race) {
    let result=0;

    //naive solution by trying all possibilities, would be more efficient to solve the equation
    for (let i=1; i<race.time; i++) {
        const distance = (race.time - i) * i;
        if (distance>race.distance) {
            result++;
        }
    }

    return result;
}

function solvePart1(input) {
    let times = [];
    let distances = []
    input.forEach( line => {
        const res = line.match(/Time:\s+([\d\s]+)/);
        if (res) {
            times = res[1].split(/\s+/).map(val => +val);
        }
        const res2 = line.match(/Distance:\s+([\d\s]+)/)
        if (res2) {
            distances = res2[1].split(/\s+/).map(val => +val);
        }
    })
    const races = times.map(function(_,i) {
        return {time: times[i], distance: distances[i]}
    });

    return races.reduce((acc, race) => {
        return acc * numberOfWaysToBeatRecord(race);
    }, 1);
}


function solvePart2(input) {

    const race = {time: 0, distance: 0}
    input.forEach( line => {
        const res = line.match(/Time:\s+([\d\s]+)/);
        if (res) {
            race.time = +res[1].split(/\s+/).join('');
        }
        const res2 = line.match(/Distance:\s+([\d\s]+)/)
        if (res2) {
            race.distance = +res2[1].split(/\s+/).join('');
        }
    })

    return numberOfWaysToBeatRecord(race);
}


console.log('Day 6');

const testinput = readinput('testinput.txt');
console.assert(solvePart1(testinput) === 288, 'solution for part 1 on testinput is wrong');
console.assert(solvePart2(testinput) === 71503,'solution for part 2 on testinput is wrong');


const input = readinput('input.txt');
console.log('result for Part 1: ' +solvePart1(input) );

console.log('result for Part 2: ' +solvePart2(input));
