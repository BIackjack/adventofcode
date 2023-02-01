import { Component } from '@angular/core';
import { Stack } from 'src/app/helpers/stack';
import { Move, State } from './definitions';

@Component({
  selector: 'year-2022-day-05',
  templateUrl: './day-05.component.html',
  styleUrls: ['./day-05.component.scss']
})
export class PuzzleYear2022Day05Component {
    stacks: Stack[] = [];
    moves: Move[] = [];

    part1States: State[] = [];

    part1Answer = '';
    part2Answer = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n').split('\n\n');
        const [labelRow, ...initialState] = input[0].split('\n').reverse();
        
        // Create the stacks with the correct labels
        this.stacks = labelRow.replaceAll(' ', '').split('').map(label => new Stack(label));

        // Populate the stacks with the initial state
        initialState.forEach(row => {
            row.match(/.{3,4}/g)?.forEach((rawElement, matchingIndex) => {
                const element = rawElement.replaceAll(/\W/g, '');
                if (element) {
                    this.stacks[matchingIndex].push(element);
                }
            });
        });

        const directions = input[1].split('\n').map(a => a.replace(/move |from |to /g, '').split(' '));
        this.moves = directions.map(([nbMoves, src, dst]) => ({src, dst, nbMoves: +nbMoves}));
        
        // ----- PART 1 -----

        // Save the first state
        this.part1States = [{
            message: "Initial state",
            stacks: this.stacks.map(stack => stack.clone())
        }];

        // Compute the different states, for as long as we have instructions
        this.moves.forEach(({src, dst, nbMoves}) => {
            for (let i = 0; i < nbMoves; i++) {
                const srcStack = this.stacks.find(stack => stack.label === src);
                const crateLabel = srcStack?.pop() ?? '?';
                const messageSuffix = `${crateLabel} from ${src} to ${dst} (move ${i + 1} out of ${nbMoves})`;
                
                this.part1States.push({
                    stacks: this.stacks.map(stack => stack.clone()),
                    message: `Moving ${messageSuffix}`,
                    movingCrate: {
                        crateLabel,
                        srcStack: src,
                        dstStack: dst,
                    }
                })
                
                const dstStack = this.stacks.find(stack => stack.label === dst);
                if (crateLabel && dstStack) {
                    dstStack.push(crateLabel);
                }
                
                this.part1States.push({
                    stacks: this.stacks.map(stack => stack.clone()),
                    message: `Moved ${messageSuffix}`,
                });
            }
        })

        // Add the final state
        this.part1States.push({
            stacks: this.stacks.map(stack => stack.clone()),
            message: 'Final state',
        });

        // Display answers
        this.part1Answer = this.stacks.map(s => s.peek()).join('');

        // // Log
        // console.log(this.part1States);
        // this.stacks.forEach(d => d.print())

        this.part2Answer = '';
    }
}
