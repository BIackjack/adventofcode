import { Component } from '@angular/core';
import { sum } from 'src/app/helpers/sum';

type Copy = {
    copiedFrom: number;
    nbOfCopies: number;
}

type MyNumber = {
    value: number;
    isHighlighted: boolean;
    color: string;
}

type WinningNumber = Pick<MyNumber, 'value' | 'color'>

type FormattedLine = {
    winningNumbers: WinningNumber[];
    myNumbers: MyNumber[];
    nbOfMatches: number;
    copies: Copy[];
    totalNbOfCards: number;
    nbPoints: number;
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

    trackByIndex(index: number) {
        return index;
    }

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const lines = input.split('\n');
        
        this.data = lines.map((line) => {
            const allNumbers = line.split(': ')[1].split(' | ');
            const [winningNumbers, myNumbers] = allNumbers.map(numbers => numbers.split(' ').filter(x => !!x).map(Number))
            
            const myFormattedNumbers: MyNumber[] = myNumbers.map(myNumber => {
                const isHighlighted = winningNumbers.includes(myNumber);
                return {
                    value: myNumber,
                    isHighlighted,
                    color: isHighlighted ? `hsl(${myNumber * 3.6} 100% 50%)` : '#888'
                };
            });
            
            const nbOfMatches = myFormattedNumbers.filter(({isHighlighted}) => isHighlighted).length;
            
            return {
                myNumbers: myFormattedNumbers,
                winningNumbers: winningNumbers.map(value => ({value, color: `hsl(${value * 3.6} 100% 50%)`})),
                nbOfMatches,
                copies: [],
                totalNbOfCards: 1, // Original
                nbPoints: 0,
            };
        });

        this.data.forEach((data) => {
            data.nbPoints = data.nbOfMatches ? 2 ** (data.nbOfMatches - 1) : 0;
        });

        this.part1Answer = sum(...this.data.map(({nbPoints}) => nbPoints));
        this.part1Explanation = this.data.map(({nbPoints}) => nbPoints).filter(x => !!x).join(' + ');
        console.log(1);
        
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

        // Sort numbers to improve readability

        this.data.forEach(data => {
            data.winningNumbers.sort((a, b) => a.value - b.value);
            data.myNumbers.sort((a, b) => {
                if (a.isHighlighted === b.isHighlighted) {
                    return a.value - b.value;
                }

                return a.isHighlighted ? -1 : 1;
            })
        });
    }
}
