import { Stack } from '../../stack.mjs';
import {getInput} from '../../utils.mjs';

getInput('05')
.then(input => {
    const stacksPart1 = [
        new Stack('1', 'B', 'G', 'S', 'C'),
        new Stack('2', 'T', 'M', 'W', 'H', 'J', 'N', 'V', 'G'),
        new Stack('3', 'M', 'Q', 'S'),
        new Stack('4', 'B', 'S', 'L', 'T', 'W', 'N', 'M'),
        new Stack('5', 'J', 'Z', 'F', 'T', 'V', 'G', 'W', 'P'),
        new Stack('6', 'C', 'T', 'B', 'G', 'Q', 'H', 'S'),
        new Stack('7', 'T', 'J', 'P', 'B', 'W'),
        new Stack('8', 'G', 'D', 'C', 'Z', 'F', 'T', 'Q', 'M'),
        new Stack('9', 'N', 'S', 'H', 'B', 'P', 'F'),
    ];

    const directions = input.slice(10).map(a => a.replace(/move |from |to /g, '').split(' '));
    directions.forEach(([nbItemsToMove, srcStackLabel, dstStackLabel]) => {
        for (let i = 0; i < nbItemsToMove; i++) {
            const srcStack = stacksPart1.find(s => s.name === srcStackLabel);
            const dstStack = stacksPart1.find(s => s.name === dstStackLabel);
            
            const element = srcStack.pop();
            dstStack.push(element);
        }
    });

    console.log(`Part1: ${stacksPart1.map(s => s.peek()).join('')}`);

    const stacksPart2 = [
        new Stack('1', 'B', 'G', 'S', 'C'),
        new Stack('2', 'T', 'M', 'W', 'H', 'J', 'N', 'V', 'G'),
        new Stack('3', 'M', 'Q', 'S'),
        new Stack('4', 'B', 'S', 'L', 'T', 'W', 'N', 'M'),
        new Stack('5', 'J', 'Z', 'F', 'T', 'V', 'G', 'W', 'P'),
        new Stack('6', 'C', 'T', 'B', 'G', 'Q', 'H', 'S'),
        new Stack('7', 'T', 'J', 'P', 'B', 'W'),
        new Stack('8', 'G', 'D', 'C', 'Z', 'F', 'T', 'Q', 'M'),
        new Stack('9', 'N', 'S', 'H', 'B', 'P', 'F'),
    ];

    directions.forEach(([nbItemsToMove, srcStackLabel, dstStackLabel]) => {
        const srcStack = stacksPart2.find(s => s.name === srcStackLabel);
        const dstStack = stacksPart2.find(s => s.name === dstStackLabel);
        
        const elements = srcStack.slice(nbItemsToMove);
        dstStack.push(...elements);
    });

    console.log(`Part2: ${stacksPart2.map(s => s.peek()).join('')}`);
});