import { Component } from '@angular/core';
import { product } from 'src/app/helpers/product';
import { sum } from 'src/app/helpers/sum';

type FormattedCell = {
    text: string;
    isHighlighted: boolean;
    hasAreaOfEffect: boolean;
}
type Data = FormattedCell[][];

type DigitCell = {
    type: 'digit';
    char: string;
    originOfCorrespondingNumber: StringIndex;
}

type SymbolCell = {
    type: 'symbol';
    char: string;
    adjacentNumberIndexes: Set<StringIndex>;
}

type Index = {
    line: number;
    column: number;
};

type StringIndex = `${Index['line']}_${Index['column']}`;

type NumberDictionary = Record<StringIndex, {
    value: string;
    isAccepted: boolean;
}>

type DigitDictionary = Record<StringIndex, {
    char: string;
    originOfCorrespondingNumber: StringIndex;
}>

type SymbolDictionary = Record<StringIndex, {
    char: string;
    adjacentNumberIndexes: Set<StringIndex>;
}>

type CellDictionary = Record<StringIndex, DigitCell | SymbolCell>

@Component({
  selector: 'year-2023-day-03',
  templateUrl: './day-03.component.html',
  styleUrls: ['./day-03.component.scss']
})
export class PuzzleYear2023Day03Component {
    data: Data | undefined;
    
    part1Answer: number | string = 0;
    part1Explanation = '';
    
    part2Data: Data = [];
    part2Answer: number | string  = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const lines = input.split('\n');

        const symbolRegex = /[-!$%^#@&*()_+|~=`{}\[\]:";'<>?,\/]/g;
        const isSymbolArray = lines.map(line => line.split('').map(char => char.search(symbolRegex) >= 0));
        const isAdjacentToSymbolArray = isSymbolArray.map((innerArray, lineIndex) => innerArray.map((cell, colIndex) => {
            return cell
                || isSymbolArray[lineIndex - 1]?.[colIndex - 1]
                || isSymbolArray[lineIndex - 1]?.[colIndex]
                || isSymbolArray[lineIndex - 1]?.[colIndex + 1]
                || isSymbolArray[lineIndex]?.[colIndex - 1]
                || isSymbolArray[lineIndex]?.[colIndex + 1]
                || isSymbolArray[lineIndex + 1]?.[colIndex - 1]
                || isSymbolArray[lineIndex + 1]?.[colIndex]
                || isSymbolArray[lineIndex + 1]?.[colIndex + 1]
        }));

        const validDigits: string[] = [];
        lines.forEach((line, lineIndex) => {
            const matchedNumbers = [...line.matchAll(/\d+/g)];
            matchedNumbers.forEach(matchedNumber => {
                const startIndex = matchedNumber.index ?? 0;
                const numberLength = matchedNumber[0].length;
                if (isAdjacentToSymbolArray[lineIndex].slice(startIndex, startIndex + numberLength).some(b => b)) {
                    validDigits.push(matchedNumber[0]);
                }
            })
        });

        const part1 = sum(...validDigits.map(Number))
        console.log(part1);

        // ------------------------

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
                    isAccepted: false
                };
            });
        });

        // Handle adjacentNumbers for star characters
        lines.forEach((line, lineIndex) => {
            line.split('').forEach((char, columnIndex) => {
                if (char !== '*') {return;}

                for (let innerLineIndex = -1; innerLineIndex <= 1; innerLineIndex++) {
                    for (let innerColumnIndex = -1; innerColumnIndex <= 1; innerColumnIndex++) {
                        const indexToCheck = `${lineIndex + innerLineIndex}_${columnIndex + innerColumnIndex}` as const;
                        const origin = digitDictionary[indexToCheck]?.originOfCorrespondingNumber;
                        if (origin) {
                            symbolDictionary[`${lineIndex}_${columnIndex}`]?.adjacentNumberIndexes.add(origin);
                        }
                    }
                }
            });
        });

        const part2Numbers = Object.values(symbolDictionary)
        .filter(({adjacentNumberIndexes}) => adjacentNumberIndexes.size === 2)
        .map(({adjacentNumberIndexes}) => {
            return [...adjacentNumberIndexes].map(numberStringIndex => {
                // Side effect in map 😱
                numberDictionary[numberStringIndex].isAccepted = true;
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
                        isHighlighted: numberDictionary[origin].isAccepted,
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
