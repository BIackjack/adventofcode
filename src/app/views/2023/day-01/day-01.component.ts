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

type Part2Data = Array<{
    prefix: string;
    firstDigitChars: string;
    middle: string;
    secondDigitChars: string;
    suffix: string;
    combinedDigit: number;
}>

const getLetterPriority = (letter: string): number => {
    const charCode = letter.charCodeAt(0);
    if (97 <= charCode && charCode <= 122) {
        // Lowercase
        return charCode - 96;
    } else {
        // Uppercase
        return charCode - 38;
    }
}

@Component({
  selector: 'year-2023-day-01',
  templateUrl: './day-01.component.html',
  styleUrls: ['./day-01.component.scss']
})
export class PuzzleYear2023Day01Component {
    part1Data: Data | undefined;
    part1Answer = 0;
    part1Explanation = '';
    
    part2Data: Data | undefined;
    part2Answer = 0;
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

        this.part1Answer = sum(...this.part1Data.map(d => d.combinedDigit));
        this.part1Explanation = this.part1Data.map(d => d.combinedDigit).join(' + ');

        this.part2Data = lines.map(line => {
            const replaced = line
                .replace(/oneight/g, '18')
                .replace(/twone/g, '21')
                .replace(/threeight/g, '38')
                .replace(/fiveight/g, '58')
                .replace(/sevenine/g, '79')
                .replace(/eightwo/g, '82')
                .replace(/eighthree/g, '83')
                .replace(/nineight/g, '98')
                .replace(/one/g, '1')
                .replace(/two/g, '2')
                .replace(/three/g, '3')
                .replace(/four/g, '4')
                .replace(/five/g, '5')
                .replace(/six/g, '6')
                .replace(/seven/g, '7')
                .replace(/eight/g, '8')
                .replace(/nine/g, '9')
            const charArray = replaced.split('')
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
    
        // this.part2Data = lines.map(line => {
        //     const wordMatches = Array.from(line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine))/g));
        //     const digitMatches = Array.from(line.matchAll(/\d/g));
        //     const minWordIndex = Math.min(...wordMatches.map((m) => m.index ?? Infinity));
        //     const minDigitIndex = Math.min(...digitMatches.map((m) => m.index ?? Infinity));
        //     const maxWordIndex = Math.max(...wordMatches.map((m) => m.index ?? -Infinity));
        //     const maxDigitIndex = Math.max(...digitMatches.map((m) => m.index ?? -Infinity));

        //     if (minWordIndex < minDigitIndex && maxWordIndex < maxDigitIndex) {
        //         return {
        //             prefix: line.slice(0, minWordIndex),
        //             firstDigitChars
        //         }
        //     }

        //     return {
        //         prefix: line.slice(0, minWordIndex),
        //         firstDigitChars: wordMatches.find((m) => m.index === minWordIndex)?.[1],
        //         middle: line.slice(minWordIndex + 1)
        //     }

            // const charArray = line.split('')
            // const firstDigitIndex = charArray.findIndex(c => c.match(/\d/));
            // const lastDigitIndex = charArray.length - 1 - [...charArray].reverse().findIndex(c => c.match(/\d/));
            
            // const chars = charArray.map((char, index): CharData => {
            //     const isHighlighted = index === firstDigitIndex || index === lastDigitIndex;
            //     return {char, isHighlighted};
            // });
            
            // return {
            //     chars,
            //     firstDigit: charArray[firstDigitIndex],
            //     secondDigit: charArray[lastDigitIndex],
            //     combinedDigit: parseInt(`${charArray[firstDigitIndex]}${charArray[lastDigitIndex]}`),
            // };
        // });

        this.part2Answer = sum(...this.part2Data.map(d => d.combinedDigit));
        this.part2Explanation = this.part2Data.map(d => d.combinedDigit).join(' + ');
    }
}
