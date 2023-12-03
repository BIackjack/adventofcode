import { Component } from '@angular/core';
import { product } from 'src/app/helpers/product';
import { sum } from 'src/app/helpers/sum';

type FormattedCell = {
    text: string;
    isHighlighted: boolean;
    hasAreaOfEffect: boolean;
}
type Data = FormattedCell[][];

type Index = {
    line: number;
    column: number;
};
type StringIndex = `${Index['line']}_${Index['column']}`;

type NumberDictionary = Record<StringIndex, {
    value: string;
    isAccepted: {
        inPart1: boolean;
        inPart2: boolean;
    };
}>

type DigitDictionary = Record<StringIndex, {
    char: string;
    originOfCorrespondingNumber: StringIndex;
}>

type SymbolDictionary = Record<StringIndex, {
    char: string;
    adjacentNumberIndexes: Set<StringIndex>;
}>

@Component({
  selector: 'year-2023-day-03',
  templateUrl: './day-03.component.html',
  styleUrls: ['./day-03.component.scss']
})
export class PuzzleYear2023Day03Component {
    part1Data: Data = [];
    part1Answer: number | string = 0;
    part1Explanation = '';
    
    part2Data: Data = [];
    part2Answer: number | string  = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const lines = input.split('\n');
        const symbolDictionary: SymbolDictionary = {};
        const digitDictionary: DigitDictionary = {};
        const numberDictionary: NumberDictionary = {};
        
        lines.forEach((line, lineIndex) => {
            line.split('').forEach((char, columnIndex) => {
                if (char === '.') return;
                if (char.search(/\d+/g) >= 0) {
                    digitDictionary[`${lineIndex}_${columnIndex}`] = {
                        char,
                        originOfCorrespondingNumber: `${lineIndex}_${columnIndex}`,
                    };
                    return;
                }

                symbolDictionary[`${lineIndex}_${columnIndex}`] = {
                    char,
                    adjacentNumberIndexes: new Set(),
                };
                return;
            });

            // Match digits to the number they compose
            const matchedNumbers = [...line.matchAll(/\d+/g)];
            matchedNumbers.forEach(matchedNumber => {
                const startIndex = matchedNumber.index ?? 0;
                const numberLength = matchedNumber[0].length;
                for (let i = 0; i < numberLength; i++) {
                    const digitStringIndex = `${lineIndex}_${startIndex + i}` as const;
                    digitDictionary[digitStringIndex] = {
                        ...digitDictionary[digitStringIndex],
                        originOfCorrespondingNumber: `${lineIndex}_${startIndex}`,
                    };
                }

                numberDictionary[`${lineIndex}_${startIndex}`] = {
                    value: matchedNumber[0],
                    isAccepted: {
                        inPart1: false,
                        inPart2: false,
                    }
                };
            });
        });

        Object.entries(symbolDictionary).forEach(([stringIndex, {char, adjacentNumberIndexes}]) => {
            const [lineIndex, columnIndex] = stringIndex.split('_');
            
            for (let innerLineIndex = -1; innerLineIndex <= 1; innerLineIndex++) {
                for (let innerColumnIndex = -1; innerColumnIndex <= 1; innerColumnIndex++) {
                    const indexToCheck = `${+lineIndex + innerLineIndex}_${+columnIndex + innerColumnIndex}` as const;
                    const origin = digitDictionary[indexToCheck]?.originOfCorrespondingNumber;
                    
                    // Handle number adjacent to digits (part 1)
                    if (origin) {
                        numberDictionary[origin].isAccepted.inPart1 = true;
                    }

                    // Handle adjacentNumbers for star characters (part 2)
                    if (origin && char === '*') {
                        adjacentNumberIndexes.add(origin);
                    }
                }
            }
        });

        const part1Numbers = Object.values(numberDictionary).filter(({isAccepted}) => isAccepted.inPart1).map(({value}) => value);
        this.part1Answer = sum(...part1Numbers);
        this.part1Explanation = part1Numbers.join(' + ');

        this.part1Data = lines.map((line, lineIndex) => {
            return line.split('').map((char, columnIndex): FormattedCell => {
                const stringIndex = `${lineIndex}_${columnIndex}` as const;
                if (symbolDictionary[stringIndex]) {
                    return {
                        text: char,
                        hasAreaOfEffect: true,
                        isHighlighted: true,
                    }
                } else if (digitDictionary[stringIndex]) {
                    const origin = digitDictionary[stringIndex].originOfCorrespondingNumber;
                    return {
                        text: char,
                        isHighlighted: numberDictionary[origin].isAccepted.inPart1,
                        hasAreaOfEffect: false,
                    }
                } else {
                    return {
                        text: ' ',
                        hasAreaOfEffect: false,
                        isHighlighted: false,
                    }
                }
            });
        });

        const part2Numbers = Object.values(symbolDictionary)
        .filter(({adjacentNumberIndexes}) => adjacentNumberIndexes.size === 2)
        .map(({adjacentNumberIndexes}) => {
            return [...adjacentNumberIndexes].map(numberStringIndex => {
                // Side effect in map 😱
                numberDictionary[numberStringIndex].isAccepted.inPart2 = true;
                return numberDictionary[numberStringIndex].value;
            });
        });
        
        this.part2Answer = sum(...part2Numbers.map(numbers => product(...numbers)));
        this.part2Explanation = part2Numbers.map(numbers => numbers.join('x')).join(' + ');

        this.part2Data = lines.map((line, lineIndex) => {
            return line.split('').map((char, columnIndex): FormattedCell => {
                const stringIndex = `${lineIndex}_${columnIndex}` as const;
                if (symbolDictionary[stringIndex]) {
                    const isHighlighted = symbolDictionary[stringIndex].adjacentNumberIndexes.size === 2;
                    return {
                        text: char,
                        hasAreaOfEffect: isHighlighted && char === "*",
                        isHighlighted,
                    }
                } else if (digitDictionary[stringIndex]) {
                    const origin = digitDictionary[stringIndex].originOfCorrespondingNumber;
                    return {
                        text: char,
                        isHighlighted: numberDictionary[origin].isAccepted.inPart2,
                        hasAreaOfEffect: false,
                    }
                } else {
                    return {
                        text: ' ',
                        hasAreaOfEffect: false,
                        isHighlighted: false,
                    }
                }
            });
        });
    }
}
