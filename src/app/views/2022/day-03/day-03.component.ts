import { Component } from '@angular/core';
import { sum } from 'src/app/helpers/sum';

type Data = Array<{
    strings: string[][];
    letterInCommon: {
        label: string;
        value: number;
    }
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
  selector: 'year-2022-day-03',
  templateUrl: './day-03.component.html',
  styleUrls: ['./day-03.component.scss']
})
export class PuzzleYear2022Day03Component {
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
            const firstHalfSplit = line.slice(0, line.length / 2).split('');
            const secondHalf = line.slice(line.length / 2);
            const labelLetterInCommon = firstHalfSplit.find(char => secondHalf.includes(char)) ?? '';
            const valueLetterInCommon = getLetterPriority(labelLetterInCommon);
            
            return {
                strings: [firstHalfSplit, secondHalf.split('')],
                letterInCommon: {
                    label: labelLetterInCommon,
                    value: valueLetterInCommon,
                }
            };
        });

        this.part1Answer = sum(...this.part1Data.map(d => d.letterInCommon.value));
        this.part1Explanation = this.part1Data.map(d => `${d.letterInCommon.value} [${d.letterInCommon.label}]`).join(' + ');
    
        this.part2Data = [];

        let currentGroup = 0;
        for (let i = 0; i < lines.length / 3; i++) {
            const firstLineSplit = lines[currentGroup * 3].split('');
            const secondLine = lines[currentGroup * 3 + 1];
            const thirdLine = lines[currentGroup * 3 + 2];
            
            const letterInCommon = firstLineSplit.find(char => secondLine.includes(char) && thirdLine.includes(char)) ?? '';
            const valueLetterInCommon = getLetterPriority(letterInCommon);
            
            this.part2Data.push({
                strings: [firstLineSplit, secondLine.split(''), thirdLine.split('')],
                letterInCommon: {
                    label: letterInCommon,
                    value: valueLetterInCommon,
                }
            });

            currentGroup++;
        }

        this.part2Answer = sum(...this.part2Data.map(d => d.letterInCommon.value));
        this.part2Explanation = this.part2Data.map(d => `${d.letterInCommon.value} [${d.letterInCommon.label}]`).join(' + ');
    }
}
