import { Component } from '@angular/core';

type Hand = {}

type Data = Hand[];

const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
const lcm = (...n: number[]) => n.reduce((x, y) => (x * y) / gcd(x, y));

@Component({
  selector: 'year-2023-day-08',
  templateUrl: './day-08.component.html',
  styleUrls: ['./day-08.component.scss']
})
export class PuzzleYear2023Day08Component {
    
    part1Data: Data = [];
    part1Answer: number | string  = 0;
    part1Explanation = '';
    
    part2Data: Data = [];
    part2Answer: number | string  = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const lines = input.split('\n');

        const directions = lines[0].split('');
        const dictionary: Record<string, {left: string, right: string}> = {};
        
        lines.slice(2).forEach((line) => {
            const [node, left, right] = line.split(/[( = \()|(, )|\)]/g).filter(x => !!x);
            dictionary[node] = {left, right};
        });

        // Part 1

        try {
            const iterations = [];
            let node = "AAA";
            while (node !== "ZZZ") {
                const direction = directions[iterations.length % directions.length];
                if (direction === 'R') {
                    node = dictionary[node].right;
                } else {
                    node = dictionary[node].left
                }
                iterations.push(node);
            }

            this.part1Answer = iterations.length;
        } catch (err) {
            this.part1Answer = `This part does not yield an answer`;
        }

        // Part 2
        let nodes = Object.keys(dictionary).filter(k => k.endsWith('A'));

        const quickestPaths = nodes.map(node => {
            let currentNode = node;
            const iterations = [];
            while (!currentNode.endsWith('Z')) {
                const direction = directions[iterations.length % directions.length];
                if (direction === 'R') {
                    currentNode = dictionary[currentNode].right;
                } else {
                    currentNode = dictionary[currentNode].left;
                }
                iterations.push(currentNode);
            }
            return iterations;
        });

        this.part2Answer = lcm(...quickestPaths.map(path => path.length));
    }
}
