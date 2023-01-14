import { Component } from '@angular/core';

type IntervalGraph = {left: number, width: number};
type Interval = {start: number, end: number, graph?: IntervalGraph};
type Data = Array<{
    firstInterval: Interval;
    secondInterval: Interval;
    inCommon: null | Interval;
    isOneIntervalContainedInTheOther: boolean;
}>

const isOneIntervalContainedInTheOther = (firstLowerBound: number, firstUpperBound: number, secondLowerBound: number, secondUpperBound: number): boolean => {
    const isFirstIncludedInTheSecond = firstLowerBound >= secondLowerBound && firstUpperBound <= secondUpperBound;
    const isSecondIncludedInTheFirst = firstLowerBound <= secondLowerBound && firstUpperBound >= secondUpperBound;
    return isFirstIncludedInTheSecond || isSecondIncludedInTheFirst;
}

const getPairsOverlap = (firstLowerBound: number, firstUpperBound: number, secondLowerBound: number, secondUpperBound: number): Interval | null => {
    if (firstLowerBound > secondUpperBound || firstUpperBound < secondLowerBound) {
        return null;
    }

    return {
        start: Math.max(firstLowerBound, secondLowerBound),
        end: Math.min(firstUpperBound, secondUpperBound),
    }
}

@Component({
  selector: 'year-2022-day-04',
  templateUrl: './day-04.component.html',
  styleUrls: ['./day-04.component.scss']
})
export class PuzzleYear2022Day04Component {
    data: Data | undefined;

    part1Answer = 0;
    part2Answer = 0;

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const lines = input.split('\n');

        this.data = lines.map(line => {
            const [a1, a2, b1, b2] = line.split(',').flatMap(arr => arr.split('-').map(a => +a));
            return {
                firstInterval: {
                    start: a1,
                    end: a2,
                },
                secondInterval: {
                    start: b1,
                    end: b2,
                },
                inCommon: getPairsOverlap(a1, a2, b1, b2),
                isOneIntervalContainedInTheOther: isOneIntervalContainedInTheOther(a1, a2, b1, b2),
            }
        });

        // Normalize data (between 0 and 100, to work with widths)

        const dataMin = this.data.reduce((acc, d) => Math.min(acc, d.firstInterval.start, d.secondInterval.start), Infinity);
        const dataMax = this.data.reduce((acc, d) => Math.max(acc, d.firstInterval.end, d.secondInterval.end), -Infinity);

        const normalizeData = (originalValue: number) => Math.floor((originalValue - dataMin) / (dataMax - dataMin) * 100);

        this.data.forEach(d => {
            const firstIntervalLeft = normalizeData(d.firstInterval.start);
            d.firstInterval.graph = {
                left: firstIntervalLeft,
                width: normalizeData(d.firstInterval.end) - firstIntervalLeft,
            }

            const secondIntervalLeft = normalizeData(d.secondInterval.start);
            d.secondInterval.graph = {
                left: secondIntervalLeft,
                width: normalizeData(d.secondInterval.end) - secondIntervalLeft,
            }
            
            if (d.inCommon) {
                const inCommonIntervalLeft = normalizeData(d.inCommon.start);
                d.inCommon.graph = {
                    left: inCommonIntervalLeft,
                    width: normalizeData(d.inCommon.end) - inCommonIntervalLeft,
                }
            }
        });

        // Display answers

        this.part1Answer = this.data.reduce((acc: number, d) => d.isOneIntervalContainedInTheOther ? acc + 1 : acc, 0);
        this.part2Answer = this.data.reduce((acc: number, d) => d.inCommon !== null ? acc + 1 : acc, 0);
    }
}
