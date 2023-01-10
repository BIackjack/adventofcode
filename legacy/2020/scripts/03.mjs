import {getInput} from '../../utils.mjs';

getInput('03')
.then(input => {

    // Part 1
    const part1 = input.reduce((acc, curr, index) => {
        if (index === 0) return acc;
        const character = curr[index*3 % curr.length];
        return character === '#' ? acc + 1 : acc;
    }, 0)
    
    // Part 2
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ];

    const part2 = slopes.reduce((acc, [dx, dy]) => {
        return acc * input.reduce((acc, curr, index) => {
            if (index === 0 || index % dy !== 0) return acc;
            const character = curr[index/dy*dx % curr.length];
            return character === '#' ? acc + 1 : acc;
        }, 0);
    }, 1)
        

    // Display
    console.log(part1);
    console.log(part2);
})
.catch(console.error);
