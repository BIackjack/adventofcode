import { Component } from '@angular/core';
import { sum } from 'src/app/helpers/sum';

type CharData = {
    char: string;
    isHighlighted: boolean;
}

type Data = Array<{
    chars: CharData[];
    firstDigit: string;
    secondDigit: string;
    combinedDigit: number;
}>

const digitToLetter = (digit: string): string => {
    switch (digit) {
        case '1':
            return 'one';
        case '2':
            return 'two';         
        case '3':
            return 'three';            
        case '4':
            return 'four';            
        case '5':
            return 'five';
        case '6':
            return 'six';
        case '7':
            return 'seven';
        case '8':
            return 'eight';
        case '9':
        default:
            return 'nine';
    }
}

@Component({
  selector: 'year-2023-day-01',
  templateUrl: './day-01.component.html',
  styleUrls: ['./day-01.component.scss']
})
export class PuzzleYear2023Day01Component {
    part1Data: Data | undefined;
    part1Answer: number | string = 0;
    part1Explanation = '';
    
    part2Data: Data | undefined;
    part2Answer: number | string  = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const lines = input.split('\n');

        this.part1Data = lines.map(line => {
            const charArray = line.split('')
            const firstDigitIndex = charArray.findIndex(c => c.match(/\d/));
            const lastDigitIndex = charArray.length - 1 - [...charArray].reverse().findIndex(c => c.match(/\d/));
            
            const chars = charArray.map((char, index): CharData => {
                const isHighlighted = index === firstDigitIndex || index === lastDigitIndex;
                return {char, isHighlighted};
            });
            
            return {
                chars,
                firstDigit: charArray[firstDigitIndex],
                secondDigit: charArray[lastDigitIndex],
                combinedDigit: parseInt(`${charArray[firstDigitIndex]}${charArray[lastDigitIndex]}`),
            };
        });

        const part1ComputedSum = sum(...this.part1Data.map(d => d.combinedDigit));
        this.part1Answer = isNaN(part1ComputedSum) ? 'This part does not yield a solution' : part1ComputedSum;
        this.part1Explanation = isNaN(part1ComputedSum) ? '' : this.part1Data.map(d => d.combinedDigit).join(' + ');

        this.part2Data = lines.map(line => {
            const replaced = line
                .replace(/oneight/g, '#1#8#')
                .replace(/twone/g, '#2#1#')
                .replace(/threeight/g, '#3#8#')
                .replace(/fiveight/g, '#5#8#')
                .replace(/sevenine/g, '#7#9#')
                .replace(/eightwo/g, '#8#2#')
                .replace(/eighthree/g, '#8#3#')
                .replace(/nineight/g, '#9#8#')
                .replace(/one/g, '#1#')
                .replace(/two/g, '#2#')
                .replace(/three/g, '#3#')
                .replace(/four/g, '#4#')
                .replace(/five/g, '#5#')
                .replace(/six/g, '#6#')
                .replace(/seven/g, '#7#')
                .replace(/eight/g, '#8#')
                .replace(/nine/g, '#9#')
            const charArray = replaced.split('')
            const firstDigitIndex = charArray.findIndex(c => c.match(/(#\d#)|\d/));
            const lastDigitIndex = charArray.length - 1 - [...charArray].reverse().findIndex(c => c.match(/(#\d#)|\d/));
            const isFirstDigitInLetters = replaced[firstDigitIndex - 1] === '#';
            const isLastDigitInLetters = replaced[lastDigitIndex + 1] === '#';

            const chars = charArray.map((char, index): CharData => {
                if (index === firstDigitIndex) {
                    return {
                        char: isFirstDigitInLetters ? digitToLetter(char) : char,
                        isHighlighted: true,
                    };
                } else if (index === lastDigitIndex) {
                    return {
                        char: isLastDigitInLetters ? digitToLetter(char) : char,
                        isHighlighted: true,
                    };
                } else {
                    return {char, isHighlighted: false};
                }
            }).filter(({char}) => char !== '#');
            
            return {
                chars,
                firstDigit: charArray[firstDigitIndex],
                secondDigit: charArray[lastDigitIndex],
                combinedDigit: parseInt(`${charArray[firstDigitIndex]}${charArray[lastDigitIndex]}`),
            };
        });

        const part2ComputedSum = sum(...this.part2Data.map(d => d.combinedDigit));
        this.part2Answer = isNaN(part2ComputedSum) ? 'This part does not yield a solution' : part2ComputedSum;
        this.part2Explanation = isNaN(part2ComputedSum) ? '' : this.part2Data.map(d => d.combinedDigit).join(' + ');
    }
}
