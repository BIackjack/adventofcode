import {getInput} from '../../utils.mjs';

const getMatchOutcomePointsPart1 = (char1, char2) => {
    if (char1 === 'A' && char2 === 'X') {
        return 3 + 1;
    } else if (char1 === 'A' && char2 === 'Y') {
        return 6 + 2;
    } else if (char1 === 'A' && char2 === 'Z') {
        return 0 + 3;
    } else if (char1 === 'B' && char2 === 'X') {
        return 0 + 1;
    } else if (char1 === 'B' && char2 === 'Y') {
        return 3 + 2;
    } else if (char1 === 'B' && char2 === 'Z') {
        return 6 + 3;
    } else if (char1 === 'C' && char2 === 'X') {
        return 6 + 1;
    } else if (char1 === 'C' && char2 === 'Y') {
        return 0 + 2;
    } else if (char1 === 'C' && char2 === 'Z') {
        return 3 + 3;
    }
}

const getMatchOutcomePointsPart2 = (char1, char2) => {
    if (char1 === 'A' && char2 === 'X') {
        return 0 + 3;
    } else if (char1 === 'A' && char2 === 'Y') {
        return 3 + 1;
    } else if (char1 === 'A' && char2 === 'Z') {
        return 6 + 2;
    } else if (char1 === 'B' && char2 === 'X') {
        return 0 + 1;
    } else if (char1 === 'B' && char2 === 'Y') {
        return 3 + 2;
    } else if (char1 === 'B' && char2 === 'Z') {
        return 6 + 3;
    } else if (char1 === 'C' && char2 === 'X') {
        return 0 + 2;
    } else if (char1 === 'C' && char2 === 'Y') {
        return 3 + 3;
    } else if (char1 === 'C' && char2 === 'Z') {
        return 6 + 1;
    }
}

getInput('02')
.then(input => {
    const totalPart1 = input.reduce((acc, curr) => {
        const matchOutcomePoints = getMatchOutcomePointsPart1(curr[0], curr[2]);
        return parseInt(acc) + parseInt(matchOutcomePoints);
    }, 0);

    console.log(`Part1: ${totalPart1}`);

    const totalPart2 = input.reduce((acc, curr) => {
        const matchOutcomePoints = getMatchOutcomePointsPart2(curr[0], curr[2]);
        return parseInt(acc) + parseInt(matchOutcomePoints);
    }, 0);

    console.log(`Part2: ${totalPart2}`);
});