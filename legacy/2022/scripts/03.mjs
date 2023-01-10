import {getInput} from '../../utils.mjs';

const getLetterPriority = (letter) => {
    const charCode = letter.charCodeAt(0);
    if (97 <= charCode && charCode <= 122) {
        // Lowercase
        return charCode - 96;
    } else {
        // Uppercase
        return charCode - 38;
    }
}

getInput('03')
.then(input => {
    const lettersPart1 = input.map(line => {
        const firstHalf = line.slice(0, line.length / 2);
        const secondHalf = line.slice(line.length / 2);
        return firstHalf.split('').find(char => secondHalf.includes(char));
    });

    const prioritiesPart1 = lettersPart1.map(getLetterPriority);
    const sumPart1 = prioritiesPart1.reduce((acc, value) => acc + value, 0);

    console.log(`Part1: ${sumPart1}`);

    const lettersPart2 = [];
    let currentGroup = 0;
    
    for (let i = 0; i < input.length / 3; i++) {
        const firstLine = input[currentGroup * 3];
        const secondLine = input[currentGroup * 3 + 1];
        const thirdLine = input[currentGroup * 3 + 2];
        
        const letter = firstLine.split('').find(char => secondLine.includes(char) && thirdLine.includes(char));
        lettersPart2.push(letter);

        currentGroup++;
    }

    const prioritiesPart2 = lettersPart2.map(getLetterPriority);
    const sumPart2 = prioritiesPart2.reduce((acc, value) => acc + value, 0);

    console.log(`Part2: ${sumPart2}`);
});