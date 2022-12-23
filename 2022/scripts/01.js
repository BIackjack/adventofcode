const Utils = require('../../utils');
Utils.getInput('01')
.then(input => {
    
    const elves = [[]];
    input.forEach(value => {
        if (value === '') {
            elves.unshift([]);
        } else {
            elves[0].unshift(value);
        }
    });

    const bestTotal = elves.reduce((bestTotalSoFar, currentElf) => {
        const currentElfTotal = currentElf.reduce((acc, val) =>  parseInt(acc) + parseInt(val));
        return Math.max(currentElfTotal, bestTotalSoFar); 
    }, -Infinity);
    
    console.log(`Part1: ${bestTotal}`);

    const [elf3, elf2, elf1] = elves.reduce((bestTotalsSoFar, currentElf) => {
        const currentElfTotal = currentElf.reduce((acc, val) =>  parseInt(acc) + parseInt(val));
        bestTotalsSoFar.push(currentElfTotal);
        bestTotalsSoFar.sort();
        return bestTotalsSoFar.slice(-3);
    }, [-Infinity, -Infinity, -Infinity]);
    
    console.log(`Part2: ${parseInt(elf1) + parseInt(elf2) + parseInt(elf3)}`);
});