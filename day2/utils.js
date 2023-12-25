
import {readFileSync} from 'node:fs'


function readinput() {
    const finput = readFileSync('input.txt',{encoding: 'utf8'});

    return finput.split(/\r?\n/);
}


export {readinput };
