import { Component } from '@angular/core';

const isValidMarker = (substring: string): boolean => {
    return new Set(substring.split('')).size === substring.length;
}

@Component({
  selector: 'year-2022-day-06',
  templateUrl: './day-06.component.html',
  styleUrls: ['./day-06.component.scss']
})
export class PuzzleYear2022Day06Component {
    line: string = '';

    part1Answer = 0;
    part1Explanation = '';

    part2Answer = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        this.line = input.split('\n')[0];

        let currentIndex = 4;
        let currentSubstring = input.slice(0, 4);
        while (!isValidMarker(currentSubstring)) {
            currentIndex++;
            currentSubstring = input.slice(currentIndex - 4, currentIndex);
        }

        this.part1Answer = currentIndex;
        this.part1Explanation = this.line[this.part1Answer];

        currentIndex = 14;
        currentSubstring = input.slice(0, 14);
        while (!isValidMarker(currentSubstring)) {
            currentIndex++;
            currentSubstring = input.slice(currentIndex - 14, currentIndex);
        }

        this.part2Answer = currentIndex;
        this.part2Explanation = this.line[this.part2Answer];
    }

    
    public get iterableLine(): string[] {
        return this.line.split('');
    }
    
}
