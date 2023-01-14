import { Component, OnInit } from '@angular/core';
import { BarSeriesOption, LineSeriesOption } from 'echarts';
import * as echarts from 'echarts/core';
import { CallbackDataParams } from 'echarts/types/dist/shared';

type Move = 'paper' | 'rock' | 'scissors';
type Result = 'win' | 'loss' | 'draw';
type FirstChar = 'A' | 'B' | 'C';
type SecondChar = 'X' | 'Y' | 'Z';
type BoutOutcome = {
    myMove: Move;
    opponentMove: Move;
    result: Result;
    nbPointsFromMyMove: number;
    nbPointsFromResult: number;
}

const getMatchOutcomePointsPart1 = (char1: FirstChar, char2: SecondChar): BoutOutcome => {
    const opponentMove: Move = char1 === 'A' ? 'rock' : char1 === 'B' ? 'paper' : 'scissors';
    const myMove: Move = char2 === 'X' ? 'rock' : char2 === 'Y' ? 'paper' : 'scissors';
    const nbPointsFromMyMove: number = myMove === 'rock' ? 1 : myMove === 'paper' ? 2 : 3;
    
    if (char1 === 'A' && char2 === 'X') {
        return {myMove, opponentMove, nbPointsFromMyMove, nbPointsFromResult: 3, result: 'draw'};
    } else if (char1 === 'A' && char2 === 'Y') {
        return {myMove, opponentMove, nbPointsFromMyMove, nbPointsFromResult: 6, result: 'win'};
    } else if (char1 === 'A' && char2 === 'Z') {
        return {myMove, opponentMove, nbPointsFromMyMove, nbPointsFromResult: 0, result: 'loss'};
    } else if (char1 === 'B' && char2 === 'X') {
        return {myMove, opponentMove, nbPointsFromMyMove, nbPointsFromResult: 0, result: 'loss'};
    } else if (char1 === 'B' && char2 === 'Y') {
        return {myMove, opponentMove, nbPointsFromMyMove, nbPointsFromResult: 3, result: 'draw'};
    } else if (char1 === 'B' && char2 === 'Z') {
        return {myMove, opponentMove, nbPointsFromMyMove, nbPointsFromResult: 6, result: 'win'};
    } else if (char1 === 'C' && char2 === 'X') {
        return {myMove, opponentMove, nbPointsFromMyMove, nbPointsFromResult: 6, result: 'win'};
    } else if (char1 === 'C' && char2 === 'Y') {
        return {myMove, opponentMove, nbPointsFromMyMove, nbPointsFromResult: 0, result: 'loss'};
    } else /* if (char1 === 'C' && char2 === 'Z') */ {
        return {myMove, opponentMove, nbPointsFromMyMove, nbPointsFromResult: 1, result: 'draw'};
    }
}

// const getMatchOutcomePointsPart2 = (char1, char2) => {
//     if (char1 === 'A' && char2 === 'X') {
//         return 0 + 3;
//     } else if (char1 === 'A' && char2 === 'Y') {
//         return 3 + 1;
//     } else if (char1 === 'A' && char2 === 'Z') {
//         return 6 + 2;
//     } else if (char1 === 'B' && char2 === 'X') {
//         return 0 + 1;
//     } else if (char1 === 'B' && char2 === 'Y') {
//         return 3 + 2;
//     } else if (char1 === 'B' && char2 === 'Z') {
//         return 6 + 3;
//     } else if (char1 === 'C' && char2 === 'X') {
//         return 0 + 2;
//     } else if (char1 === 'C' && char2 === 'Y') {
//         return 3 + 3;
//     } else if (char1 === 'C' && char2 === 'Z') {
//         return 6 + 1;
//     }
// }

@Component({
  selector: 'year-2022-day-02',
  templateUrl: './day-02.component.html',
  styleUrls: ['./day-02.component.scss']
})
export class PuzzleYear2022Day02Component implements OnInit {
    chart1!: echarts.ECharts;

    part1Answer = 0;
    part2Answer = 0;
    part2Explanation = '';

    ngOnInit(): void {
        this.chart1 = echarts.init(document.getElementById('chart1') as HTMLElement, 'dark');
    }

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const bouts = input.split('\n').map((bout, i) => ({name: `Bout #${i + 1}`, data: getMatchOutcomePointsPart1(bout[0] as FirstChar, bout[2] as SecondChar)}));

        const data = bouts.map(e => e.name);

        const sumData = bouts.reduce((acc: number[], bout) => {
            const currentBoutPoints = bout.data.nbPointsFromResult + bout.data.nbPointsFromMyMove;
            const boutsSum = acc[acc.length - 1] ?? 0;
            return [...acc, boutsSum + currentBoutPoints];
        }, []);

        const series: Array<LineSeriesOption | BarSeriesOption> = [
            {
                name: 'Points from my move',
                type: 'bar',
                stack: 'Total',
                yAxisIndex: 0,
                data: bouts.map(b => b.data.nbPointsFromMyMove),
            },
            {
                name: 'Points from bout result',
                type: 'bar',
                stack: 'Total',
                yAxisIndex: 0,
                data: bouts.map(b => b.data.nbPointsFromResult),
            },
            {
                name: 'Point sum',
                type: 'line',
                smooth: 0.5,
                lineStyle: {
                    color: '#EE6666',
                    width: 4,
                },
                itemStyle: {
                    color: '#EE6666',
                },
                yAxisIndex: 1,
                data: sumData,
                markPoint: {
                    symbol: 'roundRect',
                    emphasis: {
                        disabled: true,
                    },
                    data: [
                        { type: 'max', name: 'Max' },
                    ]
                },
            },
        ];

        this.chart1.clear();
        this.chart1.setOption({
            tooltip: {
                trigger: 'axis',
                order: 'seriesDesc',
                axisPointer: {
                    type: 'shadow',
                },
                formatter: function(params: CallbackDataParams[]) {
                    const dataTotal = params.pop();

                    const dataTooltip = params.map(e => `<div>${e.marker} ${e.seriesName}: <strong>${e.value ?? '-'}</strong></div>`);
                    let tooltip = `<div class="tooltip-label">${params[0].name}</div>`;
                    tooltip += dataTooltip.reverse().join('');
                    tooltip += '<hr>';
                    tooltip += `<div>${dataTotal?.marker} Current total: <strong>${dataTotal?.data}</strong></div>`;
                    console.log(params, tooltip);
                    return tooltip;
                }
            },
            legend: {
                top: 20,
            },
            grid: {
                top: 100,
            },
            xAxis: {
                type: 'category',
                data,
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'Bout points',
                    show: false,
                },
                {
                    type: 'value',
                    name: 'Point sum',
                },
            ],
            series,
        });

        this.part1Answer = sumData[sumData.length - 1];
        // const last3Elves = elves.slice(-3);
        // this.part2Answer = sum(...last3Elves.flatMap(e => e.data));
        // this.part2Explanation = last3Elves.map(e => sum(...e.data)).join(' + ');
    }
}
