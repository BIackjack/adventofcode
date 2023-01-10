import {getInput} from '../../utils.mjs';

getInput('05')
.then(input => {

    // Part 1
    const dichotomy = (input, charForLow, [min, max]) => {
        if (min === max) return min;
        const [range, recInput] = [Math.ceil((max-min)/2), input.slice(1)];
        return input[0] === charForLow ? dichotomy(recInput, charForLow, [min, max - range]) : dichotomy(recInput, charForLow, [min + range, max]);
    }

    const BOARDING_PASS =
        input.map(ticket => [dichotomy(ticket.slice(0, -3), 'F', [0, 127]), dichotomy(ticket.slice(-3), 'L', [0, 7])])
             .map(([col, row]) => col * 8 + row);
    BOARDING_PASS.sort((a, b) => a - b);

    const part1 = BOARDING_PASS[BOARDING_PASS.length - 1];
    
    // Part 2
    const possibilities = Array.from(Array(part1 + 1).keys()).slice(BOARDING_PASS[0]);
    const part2 = possibilities.find(candidate => !BOARDING_PASS.includes(candidate));

    // Display
    console.log(part1);
    console.log(part2);
})
.catch(console.error);
