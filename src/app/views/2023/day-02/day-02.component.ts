import { Component } from '@angular/core';
import { sum } from 'src/app/helpers/sum';

type RoundData = {
    nbRed: number;
    nbBlue: number;
    nbGreen: number;
    isRoundValid: boolean;
}

type Data = Array<{
    rounds: RoundData[];
    gameId: number;
    isGameValid: boolean;
    minimalNbBlue: number;
    minimalNbRed: number;
    minimalNbGreen: number;
    power: number;
}>

@Component({
  selector: 'year-2023-day-02',
  templateUrl: './day-02.component.html',
  styleUrls: ['./day-02.component.scss']
})
export class PuzzleYear2023Day02Component {
    data: Data | undefined;
    
    part1Answer: number | string = 0;
    part1Explanation = '';
    
    part2Answer: number | string  = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const lines = input.split('\n');

        this.data = lines.map(line => {
            const [gameLabel, gameDetails] = line.split(':');
            const gameId = parseInt(gameLabel.slice(5));
            const gameRounds = gameDetails.trim().split(';');

            const rounds = gameRounds.map(round => {
                const nbBlue = parseInt(round.match(/\d+ blue/)?.[0].slice(0, -5) ?? '0');
                const nbGreen = parseInt(round.match(/\d+ green/)?.[0].slice(0, -6) ?? '0');
                const nbRed = parseInt(round.match(/\d+ red/)?.[0].slice(0, -4) ?? '0');
                const isRoundValid = nbBlue <= 14 && nbRed <= 12 && nbGreen <= 13;
                return {nbBlue, nbGreen, nbRed, isRoundValid};
            });

            const minimalNbBlue = Math.max(...rounds.map(({nbBlue}) => nbBlue));
            const minimalNbRed = Math.max(...rounds.map(({nbRed}) => nbRed));
            const minimalNbGreen = Math.max(...rounds.map(({nbGreen}) => nbGreen));

            return {
                gameId,
                isGameValid: rounds.every(({isRoundValid}) => isRoundValid),
                rounds,
                minimalNbBlue,
                minimalNbRed,
                minimalNbGreen,
                power: minimalNbBlue * minimalNbGreen * minimalNbRed,
            }
        });

        const validGameIds = this.data.filter(({isGameValid}) => isGameValid).map(({gameId}) => gameId);
        this.part1Answer = sum(...validGameIds);
        this.part1Explanation = validGameIds.join(' + ');
        
        const powers = this.data.map(({power}) => power);
        this.part2Answer = sum(...powers);
        this.part2Explanation = powers.join(' + ');
    }
}
