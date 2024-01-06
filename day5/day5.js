import {readinput} from './utils.js'


function applyMap(seed, map) {
    let destination = seed;
    map.forEach(m => {
        if (seed >= m.source && seed < (m.source +m.len) ) {
            destination = m.destination + seed - m.source;
        }
    });
    return destination
}

function applyMapToSeedRange(seed, map) {
    let destination = []

    let seedToMap = seed[0];
    let seedlenToMap = seed[1];

    for (let i=0; i< map.length; i++) {
        const m = map[i];

        if (seedToMap < m.source ) {
            const lengthToMap = Math.min(seedlenToMap,  m.source-seedToMap);
            destination.push([seedToMap, lengthToMap]);
            seedlenToMap -= lengthToMap;
            seedToMap += lengthToMap;

            if (seedlenToMap>0) {
                const length2 = Math.min(seedlenToMap, m.len);
                destination.push([m.destination, length2]);
                seedlenToMap -= length2;
                seedToMap += length2;
            }

        } else {

            if (seedToMap < (m.source + m.len)) {
                const lengthToMap = Math.min(seedlenToMap, m.len-(seedToMap-m.source));
                destination.push([m.destination + seedToMap - m.source, lengthToMap]);
                seedlenToMap -= lengthToMap;
                seedToMap += lengthToMap;
            }
        }

        if (seedlenToMap===0) {
            return destination
        }
    }

    if (seedlenToMap > 0) {
        destination.push([seedToMap,seedlenToMap]);
    }
    return destination
}


function parseInputPart1(input) {
    let seeds;
    let maps = [];
    let map = [];

    input.forEach( line => {
        const res = line.match(/seeds:\s+([\d\s]+)/);
        if (res) {
            seeds = res[1].split(/\s+/).map( s => +s );
        } else {
            if (line.match(/\w+\s+map:/)) {
                map = [];
                maps.push(map);
            } else {
                const res3 = line.match(/(\d+)\s(\d+)\s(\d+)/);
                if (res3) {
                    map.push( { destination: +res3[1], source: +res3[2], len: +res3[3]});
                }
            }
        }
    })

    return [seeds, maps];
}

function solvePart1(input) {

    const [seeds, maps] = parseInputPart1(input);

    let locations = seeds.map( (seed) => {
        return maps.reduce( (mappedSeeds, map) => applyMap(mappedSeeds, map), seed);
    });

    locations.sort((a,b) => a-b);

    return locations[0];
}

function parseInputPart2(input) {
    let seeds = [];
    let maps = [];
    let map = [];

    input.forEach( line => {
        const res = line.match(/seeds:\s+([\d\s]+)/);
        if (res) {
            const seedMatch = res[1].matchAll(/(\d+)\s(\d+)/g)
            for ( const a of seedMatch) {
                seeds.push( [+a[1],+a[2]] );
            }
        } else {
            if ( line.match(/\w+\s+map:/) ) {
                map = [];
                maps.push(map);
            } else {
                const res3 = line.match(/(\d+)\s(\d+)\s(\d+)/);
                if (res3) {
                    map.push({ destination: +res3[1], source: +res3[2], len: +res3[3]});
                }
            }
        }
    })
    maps.forEach( map => map.sort( (a,b) => a.source-b.source) );

    return [seeds, maps];
}

function solvePart2(input) {
    const [seeds, maps] = parseInputPart2(input);

    let locations = seeds.flatMap( (seed) => {
        return maps.reduce((mappedSeeds, map) => {
            return mappedSeeds.flatMap((seed) => applyMapToSeedRange(seed, map));
        }, [seed]);
    });

    locations.sort((a, b) => a[0] - b[0]);

    return locations[0][0];
}


console.log('Day 5');

const testinput = readinput('testinput.txt');
console.assert(solvePart1(testinput) ===35, 'solution for part 1 on testinput is wrong');
console.assert(solvePart2(testinput) ===46,'solution for part 2 on testinput is wrong');


const input = readinput('input.txt');
console.log('result for Part 1: ' +solvePart1(input) );

console.log('result for Part 2: ' +solvePart2(input));
