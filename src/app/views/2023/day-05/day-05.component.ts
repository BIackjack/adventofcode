import { Component } from '@angular/core';
import { Range } from '../../../helpers/range';

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

type Segment = {
    range: Range;
    offset: number;
}

type Data = FormattedLine[];

@Component({
  selector: 'year-2023-day-05',
  templateUrl: './day-05.component.html',
  styleUrls: ['./day-05.component.scss']
})
export class PuzzleYear2023Day05Component {
    data: Data = [];

    part1Answer: number | string  = 0;
    part1Explanation = '';
    
    part2Answer: number | string  = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const blocks = input.split('\n\n');
        const seeds = blocks.shift()?.split(':')[1].split(' ').filter(x => !!x).map(Number) ?? [];

        const maps: Segment[][] = [];
        let mappedValuesPart1 = [...seeds];
        // let {array: mappedValuesPart2} = seeds.reduce<{array: number[], nextRangeStart?: number}>((acc, curr) => {
        //     if (acc.nextRangeStart === undefined) {
        //         return {array: acc.array, nextRangeStart: curr}
        //     }

        //     let a = 0

        //     for (let i = 0; i < curr; i++) {
        //         // acc.array.push(acc.nextRangeStart + i);
        //         a += 1;
        //     }
        //     debugger
        //     return {array: acc.array, nextRangeStart: undefined}
        // }, {array: [], nextRangeStart: undefined});

        blocks.forEach((block, blockIndex) => {
            maps.push([]);
            const lines = block.split('\n').slice(1);

            lines.forEach(line => {
                const [destStart, srcStart, range] = line.split(' ').map(Number);
                maps[blockIndex].push({range: new Range(srcStart, srcStart + range), offset: destStart - srcStart});
            });

            mappedValuesPart1 = mappedValuesPart1.map(mappedValue => {
                const offset = maps[blockIndex].find(({range}) => range.contains(mappedValue))?.offset ?? 0;
                return mappedValue + offset;
            });
        });

        this.part1Answer = Math.min(...mappedValuesPart1);

        debugger

        const findMinForRange = (initialRange: Range, startingBlockIndex: number) => {
            const a = maps[startingBlockIndex].flatMap(({range}) => {
                const allRanges = [initialRange];
                while (allRanges.some(r => !r.contains(initialRange) && !initialRange.contains(r))) {

                }
                return allRanges
            });
            console.log(a);
            
        }

        findMinForRange(new Range(79, 79 + 14), 0);
        // let part2CurrentMin = Infinity;
        // for (let initialSeedIndex = 0; initialSeedIndex < seeds.length - 1; initialSeedIndex += 2) {
        //     const currentSeedStart = seeds[initialSeedIndex];
        //     const nbOfSeeds = seeds[initialSeedIndex + 1];

        //     for (let seedIndex = 0; seedIndex < nbOfSeeds; seedIndex++) {
        //         const currentSeed = currentSeedStart + seedIndex;
        //         let currentValue = currentSeed;
        //         for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
        //             const offset = maps[blockIndex].find(({start, end}) => start <= currentSeed && currentSeed <= end)?.offset ?? 0;
        //             currentValue += offset;
        //         }
        //         part2CurrentMin = Math.min(part2CurrentMin, currentValue);
        //     }
        // }

        // this.part2Answer = part2CurrentMin;
    }
}
