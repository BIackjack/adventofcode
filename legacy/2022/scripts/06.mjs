import {getInput} from '../../utils.mjs';

const isValidMarker = (substring) => {
    return new Set(substring.split('')).size === substring.length;
}

getInput('06')
.then(([input]) => {
    let currentIndex = 4;
    let currentSubstring = input.slice(0, 4);
    while (!isValidMarker(currentSubstring)) {
        currentIndex++;
        currentSubstring = input.slice(currentIndex - 4, currentIndex);
    }
    console.log(`Part1: ${currentIndex}`);

    currentIndex = 14;
    currentSubstring = input.slice(0, 14);
    while (!isValidMarker(currentSubstring)) {
        currentIndex++;
        currentSubstring = input.slice(currentIndex - 14, currentIndex);
    }
    console.log(`Part2: ${currentIndex}`);
})