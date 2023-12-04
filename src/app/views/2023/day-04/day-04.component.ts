import { Component } from '@angular/core';
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
  selector: 'year-2023-day-04',
  templateUrl: './day-04.component.html',
  styleUrls: ['./day-04.component.scss']
})
export class PuzzleYear2023Day04Component {
    data: Data = [];

    part1Answer: number | string  = 0;
    part1Explanation = '';
    
    part2Answer: number | string  = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const lines = input.split('\n');
        
        this.data = lines.map((line) => {
            const allNumbers = line.split(': ')[1].split(' | ');
            const [winningNumbers, myNumbers] = allNumbers.map(numbers => numbers.split(' ').filter(x => !!x).map(Number))
            const myFormattedNumbers: MyNumber[] = myNumbers.map(myNumber => ({
                value: myNumber,
                isHighlighted: winningNumbers.includes(myNumber),
            }))
            const nbOfMatches = myFormattedNumbers.filter(({isHighlighted}) => isHighlighted).length;
            return {
                myNumbers: myFormattedNumbers,
                winningNumbers,
                nbOfMatches,
                copies: [],
                totalNbOfCards: 1, // Original
            };
        });

        const nbOfMatchesPart1 = this.data.map(({nbOfMatches}) => nbOfMatches ? 2 ** (nbOfMatches - 1) : 0);
        this.part1Answer = sum(...nbOfMatchesPart1);
        this.part1Explanation = nbOfMatchesPart1.filter(x => !!x).join(' + ');
        
        // Handles copies for part 2
        this.data.forEach((line, lineIndex) => {
            const nbOfCopies = line.copies.reduce((acc, curr) => acc + curr.nbOfCopies, 0);
            line.totalNbOfCards += nbOfCopies;

            for (let index = 0; index < line.nbOfMatches; index++) {
                const dataIndex = lineIndex + 1 + index;
                this.data[dataIndex]?.copies.push({
                    copiedFrom: lineIndex,
                    nbOfCopies: nbOfCopies + 1, // Add original
                });
            }
        })

        const part2Data = this.data.map(({totalNbOfCards}) => totalNbOfCards);
        this.part2Answer = sum(...part2Data);
        this.part2Explanation = part2Data.join(' + ');
    }
}
