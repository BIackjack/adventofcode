import {getInput} from '../../utils.mjs';

const getCurrentPairBounds = (currentPair) => {
    return currentPair.split(',')
                      .flatMap(a => a.split('-').map(b => +b));
}

const doThePairsEntirelyOverlap = (firstLowerBound, firstUpperBound, secondLowerBound, secondUpperBound) => {
    const isFirstIncludedInTheSecond = firstLowerBound >= secondLowerBound && firstUpperBound <= secondUpperBound;
    const isSecondIncludedInTheFirst = firstLowerBound <= secondLowerBound && firstUpperBound >= secondUpperBound;
    return isFirstIncludedInTheSecond || isSecondIncludedInTheFirst;
}

const doThePairsPartiallyOverlap = (firstLowerBound, firstUpperBound, secondLowerBound, secondUpperBound) => {
    return firstUpperBound >= secondLowerBound && secondUpperBound >= firstLowerBound;
}

getInput('04')
.then(input => {
    const totalTotallyOverlappingPairs = input.reduce((acc, currentPair) => {
        const bounds = getCurrentPairBounds(currentPair);
        return doThePairsEntirelyOverlap(...bounds) ? acc + 1 : acc;
    }, 0);

    console.log(`Part1: ${totalTotallyOverlappingPairs}`);

    const totalPartiallyOverlappingPairs = input.reduce((acc, currentPair) => {
        const bounds = getCurrentPairBounds(currentPair);
        return doThePairsPartiallyOverlap(...bounds) ? acc + 1 : acc;
    }, 0);

    console.log(`Part2: ${totalPartiallyOverlappingPairs}`);
});