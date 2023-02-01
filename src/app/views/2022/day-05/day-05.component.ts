import { Component } from '@angular/core';
import { Stack } from 'src/app/helpers/stack';
import { Move, State } from './definitions';

@Component({
  selector: 'year-2022-day-05',
  templateUrl: './day-05.component.html',
  styleUrls: ['./day-05.component.scss']
})
export class PuzzleYear2022Day05Component {
    moves: Move[] = [];
    
    part1Stacks: Stack[] = [];
    part1States: State[] = [];
    part1Answer = '';
    
    part2Stacks: Stack[] = [];
    part2States: State[] = [];
    part2Answer = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n').split('\n\n');
        const [labelRow, ...initialState] = input[0].split('\n').reverse();
        
        // Create the stacks with the correct labels
        const stacks = labelRow.replaceAll(' ', '').split('').map(label => new Stack(label));

        // Populate the stacks with the initial state
        initialState.forEach(row => {
            row.match(/.{3,4}/g)?.forEach((rawElement, matchingIndex) => {
                const element = rawElement.replaceAll(/\W/g, '');
                if (element) {
                    stacks[matchingIndex].push(element);
                }
            });
        });
        this.part1Stacks = stacks.map(stack => stack.clone());
        this.part2Stacks = stacks.map(stack => stack.clone());

        const directions = input[1].split('\n').map(a => a.replace(/move |from |to /g, '').split(' '));
        this.moves = directions.map(([nbMoves, src, dst]) => ({src, dst, nbMoves: +nbMoves}));
        
        // ----- PART 1 -----

        // Save the first state
        this.part1States = [{
            message: "Initial state",
            stacks: this.part1Stacks.map(stack => stack.clone())
        }];

        // Compute the different states, for as long as we have instructions
        this.moves.forEach(({src, dst, nbMoves}) => {
            for (let i = 0; i < nbMoves; i++) {
                const srcStack = this.part1Stacks.find(stack => stack.label === src);
                const dstStack = this.part1Stacks.find(stack => stack.label === dst);
                const [crateLabel] = srcStack?.peek() ?? ['?'];
                const messageSuffix = `${crateLabel} from ${src} to ${dst} (move ${i + 1} out of ${nbMoves})`;
                
                dstStack?.push(crateLabel);
                
                this.part1States.push({
                    stacks: this.part1Stacks.map(stack => stack.clone()),
                    message: `Moving ${messageSuffix}`,
                    movingCrates: {
                        nbCratesMoved: 1,
                        srcStack: src,
                        dstStack: dst,
                    }
                })

                srcStack?.pop();
                
                this.part1States.push({
                    stacks: this.part1Stacks.map(stack => stack.clone()),
                    message: `Moved ${messageSuffix}`,
                });
            }
        })

        // Add the final state
        this.part1States.push({
            stacks: this.part1Stacks.map(stack => stack.clone()),
            message: 'Final state',
        });

        // Display answers
        this.part1Answer = this.part1Stacks.map(s => s.peek()).join('');

        // ----- PART 2 -----

        // Save the first state
        this.part2States = [{
            message: "Initial state",
            stacks: this.part2Stacks.map(stack => stack.clone())
        }];

        // Compute the different states, for as long as we have instructions
        this.moves.forEach(({src, dst, nbMoves}) => {
            const srcStack = this.part2Stacks.find(stack => stack.label === src);
            const dstStack = this.part2Stacks.find(stack => stack.label === dst);
            const crateLabels = srcStack?.peek(nbMoves) ?? ['?'];
            const messageSuffix = `${nbMoves} crate${nbMoves > 1 ? 's' : ''} (${crateLabels.join(', ')}) from ${src} to ${dst}`;
            
            dstStack?.push(...crateLabels);
            
            this.part2States.push({
                stacks: this.part2Stacks.map(stack => stack.clone()),
                message: `Moving ${messageSuffix}`,
                movingCrates: {
                    nbCratesMoved: nbMoves,
                    srcStack: src,
                    dstStack: dst,
                }
            })

            srcStack?.slice(nbMoves);
            
            this.part2States.push({
                stacks: this.part2Stacks.map(stack => stack.clone()),
                message: `Moved ${messageSuffix}`,
            });
        })

        // Add the final state
        this.part2States.push({
            stacks: this.part2Stacks.map(stack => stack.clone()),
            message: 'Final state',
        });

        // Display answers
        this.part2Answer = this.part2Stacks.map(s => s.peek()).join('');
    }
}
