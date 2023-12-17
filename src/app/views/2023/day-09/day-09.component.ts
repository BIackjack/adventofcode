import { Component } from '@angular/core';
import { sum } from 'src/app/helpers/sum';

@Component({
  selector: 'year-2023-day-09',
  templateUrl: './day-09.component.html',
  styleUrls: ['./day-09.component.scss']
})
export class PuzzleYear2023Day09Component {
    
    data: number[][][] = [];

    part1Answer: number | string  = 0;
    part1Explanation = '';
    
    part2Answer: number | string  = 0;
    part2Explanation = '';

    maxNbDigits: number[] = [];

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const lines = input.split('\n');

        const data = lines.map(line => {
            const values = line.split(' ').map(Number);
            const valueArrays = [values];
            
            // Create tree
            while (valueArrays[0].some(v => v !== 0)) {
                const nextValues = [];
                for (let i = 0; i < valueArrays[0].length - 1; i++) {
                    const value1 = valueArrays[0][i];
                    const value2 = valueArrays[0][i + 1];
                    nextValues.push(value2 - value1);
                }
                valueArrays.unshift(nextValues);
            }

            // Infer next value
            valueArrays[0].push(0);
            for (let i = 1; i < valueArrays.length; i++) {
                const lastValue = valueArrays[i].at(-1) as number;
                const nextValue = valueArrays[i - 1].at(-1) as number;
                valueArrays[i].push(lastValue + nextValue);
            }

            // Infer previous value
            valueArrays[0].unshift(0);
            for (let i = 1; i < valueArrays.length; i++) {
                const lastValue = valueArrays[i][0] as number;
                const nextValue = valueArrays[i - 1][0] as number;
                valueArrays[i].unshift(lastValue - nextValue);
            }

            return valueArrays;
        })

        const part1Digits = data.map(d => d.at(-1)?.at(-1) as number);
        this.part1Answer = sum(...part1Digits);
        this.part1Explanation = part1Digits.join(' + ');
        
        const part2Digits = data.map(d => d.at(-1)![0]);
        this.part2Answer = sum(...part2Digits);
        this.part2Explanation = part2Digits.join(' + ').replace(/\+ \-/g, '- ');

        this.data = data.map(d => d.reverse());
        this.maxNbDigits = this.data.map(sequence => Math.max(...sequence.flat().map(digit => String(digit).length)))
    }
}
