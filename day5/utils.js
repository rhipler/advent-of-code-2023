import {readFileSync} from 'node:fs'


function readinput(filename) {
    const finput = readFileSync(filename, {encoding: 'utf8'});
    return finput.split(/\r?\n/);
}

export {readinput };
