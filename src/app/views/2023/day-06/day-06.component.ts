import { Component } from '@angular/core';
import { product } from 'src/app/helpers/product';
import { sum } from 'src/app/helpers/sum';

type Copy = {
    copiedFrom: number;
    nbOfCopies: number;
}

type MyNumber = {
    value: number;
    isHighlighted: boolean;
}

type FormattedLine = {
    winningNumbers: number[];
    myNumbers: MyNumber[];
    nbOfMatches: number;
    copies: Copy[];
    totalNbOfCards: number;
}

type Data = FormattedLine[];

@Component({
  selector: 'year-2023-day-06',
  templateUrl: './day-06.component.html',
  styleUrls: ['./day-06.component.scss']
})
export class PuzzleYear2023Day06Component {
    data: Data = [];

    part1Answer: number | string  = 0;
    part1Explanation = '';
    
    part2Answer: number | string  = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n').split('\n');

        const times = input[0].split(/:/)[1].split(' ').filter(x => !!x).map(Number);
        const distances = input[1].split(/:/)[1].split(' ').filter(x => !!x).map(Number);
        
        const allValidTries = times.map((time, timeIndex) => {
            const distanceToBeat = distances[timeIndex];
            const tries = [];
            for (let currentTryWaitTime = 0; currentTryWaitTime <= time; currentTryWaitTime++) {
                tries.push((time - currentTryWaitTime) * currentTryWaitTime);
            }
            const validTriesNb = tries.reduce((acc, curr) => curr > distanceToBeat ? acc + 1 : acc, 0);
            return validTriesNb;
        });

        this.part1Answer = product(...allValidTries);
        this.part1Explanation = allValidTries.join(' + ');

        const globalTime = parseInt(input[0].split(/:/)[1].split(' ').join(''), 10);
        const globalDistance = parseInt(input[1].split(/:/)[1].split(' ').join(''), 10);

        let nb = 0
        for (let currentTryWaitTime = 0; currentTryWaitTime <= globalTime; currentTryWaitTime++) {
            const currentDistance = (globalTime - currentTryWaitTime) * currentTryWaitTime;
            if (currentDistance > globalDistance) {
                nb++;
            }
        }
        debugger
    }
}
