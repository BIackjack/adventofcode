import { Component } from '@angular/core';
import { QuantifiedSet } from 'src/app/helpers/quantified-set';
import { sum } from 'src/app/helpers/sum';

const HandValues = { 
    'Five of a kind': 7,
    'Four of a kind': 6,
    'Full house': 5,
    'Three of a kind': 4,
    'Two pairs': 3,
    'One pair': 2,
    'High card': 1,
} as const;
    

type Hand = {
    bid: number,
    cards: {
        label: string;
        value: number;
        part2Value: number;
    }[],
    value: keyof typeof HandValues,
    jokerStandsFor: string,
    valueWithJoker: keyof typeof HandValues,
}

type Data = Hand[];

const getHandValue = (set: QuantifiedSet<string>): keyof typeof HandValues => {
    switch (set.size) {
        case 1:
            return 'Five of a kind';
        case 4:
            return 'One pair'
        case 5:
            return 'High card'
    }

    if (set.size === 2) {
        return set.someSizes(s => s === 4) ? 'Four of a kind' : 'Full house';
    }

    return set.someSizes(s => s === 3) ? 'Three of a kind' : 'Two pairs';
}

const charToCardValue = (char: string): number => {
    switch (char) {
        case 'A':
            return 14;
        case 'K':
            return 13;
        case 'Q':
            return 12;
        case 'J':
            return 11;
        case 'T':
            return 10;
        default:
            return parseInt(char, 10);
    }
}

@Component({
  selector: 'year-2023-day-07',
  templateUrl: './day-07.component.html',
  styleUrls: ['./day-07.component.scss']
})
export class PuzzleYear2023Day07Component {
    
    part1Data: Data = [];
    part1Answer: number | string  = 0;
    part1Explanation = '';
    
    part2Data: Data = [];
    part2Answer: number | string  = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const lines = input.split('\n');
        
        const commonData: Data = lines.map((line) => {
            const charSet = new QuantifiedSet<string>();
            const cards = line.slice(0, 5).split('').map(char => {
                charSet.add(char);
                return {
                    label: char,
                    value: charToCardValue(char),
                    part2Value: char === 'J' ? 1 : charToCardValue(char),
                }
            });
            const value = getHandValue(charSet);
            
            const [jokerStandsFor] = charSet.reduce<[string, number]>(
                ([currentMinChar, currentMax], [item, size]) => {
                    if (item === 'J' || size < currentMax) {
                        return [currentMinChar, currentMax];
                    }

                    return [item, size];
                },
                ['A', -Infinity]
            );
            
            charSet.convertAll('J', jokerStandsFor); // Modifies the Set!
            const valueWithJoker = getHandValue(charSet);

            return {
                bid: Number(line.slice(6)),
                cards,
                value,
                jokerStandsFor,
                valueWithJoker,
            };
        });

        this.part1Data = [...commonData].sort((handA, handB) => {
            const handsValueDifference = HandValues[handA.value] - HandValues[handB.value];
            if (handsValueDifference !== 0) {
                return Math.sign(handsValueDifference);
            }

            for (let cardIndex = 0; cardIndex < 5; cardIndex++) {
                const cardDifference = handA.cards[cardIndex].value - handB.cards[cardIndex].value;
                if (cardDifference !== 0) {
                    return Math.sign(cardDifference);
                }
            }

            return 0;
        })

        this.part1Answer = sum(...this.part1Data.map(({bid}, index) => bid * (index + 1)));
        this.part1Explanation = this.part1Data.map(({bid}, index) => `${bid} * ${index + 1}`).join(' + ');

        this.part2Data = [...commonData].sort((handA, handB) => {
            const handsValueDifference = HandValues[handA.valueWithJoker] - HandValues[handB.valueWithJoker];
            if (handsValueDifference !== 0) {
                return Math.sign(handsValueDifference);
            }

            for (let cardIndex = 0; cardIndex < 5; cardIndex++) {
                const cardDifference = handA.cards[cardIndex].part2Value - handB.cards[cardIndex].part2Value;
                if (cardDifference !== 0) {
                    return Math.sign(cardDifference);
                }
            }

            return 0;
        })

        this.part2Answer = sum(...this.part2Data.map(({bid}, index) => bid * (index + 1)));
        this.part2Explanation = this.part2Data.map(({bid}, index) => `${bid} * ${index + 1}`).join(' + ');
    }
}
