import { Component, OnInit } from '@angular/core';
import { BarSeriesOption, LineSeriesOption } from 'echarts';
import * as echarts from 'echarts/core';
import { CallbackDataParams, DatasetOption } from 'echarts/types/dist/shared';

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

const getMatchOutcomePointsPart2 = (char1: FirstChar, char2: SecondChar): BoutOutcome => {
    const opponentMove: Move = char1 === 'A' ? 'rock' : char1 === 'B' ? 'paper' : 'scissors';
    const nbPointsFromResult: number = char2 === 'X' ? 0 : char2 === 'Y' ? 3 : 6;
    const result: Result = char2 === 'X' ? 'loss' : char2 === 'Y' ? 'draw' : 'win';

    if (char1 === 'A' && char2 === 'X') {
        return {result, opponentMove, nbPointsFromResult, nbPointsFromMyMove: 3, myMove: 'scissors'};
    } else if (char1 === 'A' && char2 === 'Y') {
        return {result, opponentMove, nbPointsFromResult, nbPointsFromMyMove: 1, myMove: 'rock'};
    } else if (char1 === 'A' && char2 === 'Z') {
        return {result, opponentMove, nbPointsFromResult, nbPointsFromMyMove: 2, myMove: 'paper'};
    } else if (char1 === 'B' && char2 === 'X') {
        return {result, opponentMove, nbPointsFromResult, nbPointsFromMyMove: 1, myMove: 'rock'};
    } else if (char1 === 'B' && char2 === 'Y') {
        return {result, opponentMove, nbPointsFromResult, nbPointsFromMyMove: 2, myMove: 'paper'};
    } else if (char1 === 'B' && char2 === 'Z') {
        return {result, opponentMove, nbPointsFromResult, nbPointsFromMyMove: 3, myMove: 'scissors'};
    } else if (char1 === 'C' && char2 === 'X') {
        return {result, opponentMove, nbPointsFromResult, nbPointsFromMyMove: 2, myMove: 'paper'};
    } else if (char1 === 'C' && char2 === 'Y') {
        return {result, opponentMove, nbPointsFromResult, nbPointsFromMyMove: 3, myMove: 'scissors'};
    } else /* if (char1 === 'C' && char2 === 'Z') */ {
        return {result, opponentMove, nbPointsFromResult, nbPointsFromMyMove: 1, myMove: 'rock'};
    }
}

@Component({
  selector: 'year-2022-day-02',
  templateUrl: './day-02.component.html',
  styleUrls: ['./day-02.component.scss']
})
export class PuzzleYear2022Day02Component implements OnInit {
    chart1!: echarts.ECharts;
    chart2!: echarts.ECharts;

    part1Answer = 0;
    part2Answer = 0;

    ngOnInit(): void {
        this.chart1 = echarts.init(document.getElementById('chart1') as HTMLElement, 'dark');
        this.chart2 = echarts.init(document.getElementById('chart2') as HTMLElement, 'dark');
    }

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');

        // Part 1

        const boutsPart1 = input.split('\n').map((bout, i) => ({name: `Bout #${i + 1}`, data: getMatchOutcomePointsPart1(bout[0] as FirstChar, bout[2] as SecondChar)}));

        const data = boutsPart1.map(e => e.name);

        const sumDataPart1 = boutsPart1.reduce((acc: number[], bout) => {
            const currentBoutPoints = bout.data.nbPointsFromResult + bout.data.nbPointsFromMyMove;
            const boutsSum = acc[acc.length - 1] ?? 0;
            return [...acc, boutsSum + currentBoutPoints];
        }, []);

        const datasetPart1: DatasetOption = {
            source: [
                ['Bout', 'My move', 'Nb of points from my move', 'Opponent\'s move', 'Bout result', 'Nb of points from result'],
                ...boutsPart1.map(({data, name}) => [name, data.myMove, data.nbPointsFromMyMove, data.opponentMove, data.result, data.nbPointsFromResult]),
            ]
        }

        const seriesPart1: Array<LineSeriesOption | BarSeriesOption> = [
            {
                name: 'Points from my move',
                type: 'bar',
                stack: 'Total',
                yAxisIndex: 0,
                encode: {
                    x: 'Bout',
                    y: 'Nb of points from my move',
                },
            },
            {
                name: 'Points from bout result',
                type: 'bar',
                stack: 'Total',
                yAxisIndex: 0,
                encode: {
                    x: 'Bout',
                    y: 'Nb of points from result',
                },
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
                data: sumDataPart1,
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
                    const sumData = params.pop();
                    const sumTooltip = `<div>${sumData?.marker} Current point sum: <strong>${sumData?.data}</strong></div>`;

                    const [, myMove, nbPointsFromMyMove, opponentMove, boutResult, nbPointsFromResult] = params[0].value as unknown[];

                    const nbPointsFromMyMoveTooltip = `<div>${params[0].marker} ${params[0].seriesName}: <strong>${nbPointsFromMyMove ?? '-'}</strong></div>`;
                    const nbPointsFromResultTooltip = `<div>${params[1].marker} ${params[1].seriesName}: <strong>${nbPointsFromResult ?? '-'}</strong></div>`;

                    const opoonentMoveTooltip = `<img src="assets/icons/${opponentMove}.svg" width="${boutResult === 'loss' ? '40px' : 'auto'}"/>`;
                    const myMoveTooltip = `<img src="assets/icons/${myMove}.svg" width="${boutResult === 'win' ? '40px' : 'auto'}"/>`;
                    const boutTooltip = `
                    <table>
                        <tr><td>         Me         </td><td>          </td><td>         Opponent         </td></tr>
                        <tr><td>  ${myMoveTooltip}  </td><td>  versus  </td><td>  ${opoonentMoveTooltip}  </td></tr>
                    </table>
                    `;

                    let tooltip = `<div class="tooltip-label">${params[0].name}</div>`;
                    tooltip += boutTooltip;
                    tooltip += nbPointsFromResultTooltip;
                    tooltip += nbPointsFromMyMoveTooltip;
                    tooltip += '<hr>';
                    tooltip += sumTooltip;
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
            dataset: datasetPart1,
            series: seriesPart1,
        });

        this.part1Answer = sumDataPart1[sumDataPart1.length - 1];

        // Part 2

        const boutsPart2 = input.split('\n').map((bout, i) => ({name: `Bout #${i + 1}`, data: getMatchOutcomePointsPart2(bout[0] as FirstChar, bout[2] as SecondChar)}));

        const sumDataPart2 = boutsPart2.reduce((acc: number[], bout) => {
            const currentBoutPoints = bout.data.nbPointsFromResult + bout.data.nbPointsFromMyMove;
            const boutsSum = acc[acc.length - 1] ?? 0;
            return [...acc, boutsSum + currentBoutPoints];
        }, []);

        const datasetPart2: DatasetOption = {
            source: [
                ['Bout', 'My move', 'Nb of points from my move', 'Opponent\'s move', 'Bout result', 'Nb of points from result'],
                ...boutsPart2.map(({data, name}) => [name, data.myMove, data.nbPointsFromMyMove, data.opponentMove, data.result, data.nbPointsFromResult]),
            ]
        }

        const seriesPart2: Array<LineSeriesOption | BarSeriesOption> = [
            {
                name: 'Points from my move',
                type: 'bar',
                stack: 'Total',
                yAxisIndex: 0,
                encode: {
                    x: 'Bout',
                    y: 'Nb of points from my move',
                },
            },
            {
                name: 'Points from bout result',
                type: 'bar',
                stack: 'Total',
                yAxisIndex: 0,
                encode: {
                    x: 'Bout',
                    y: 'Nb of points from result',
                },
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
                data: sumDataPart2,
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

        this.chart2.clear();
        this.chart2.setOption({
            tooltip: {
                trigger: 'axis',
                order: 'seriesDesc',
                axisPointer: {
                    type: 'shadow',
                },
                formatter: function(params: CallbackDataParams[]) {
                    const sumData = params.pop();
                    const sumTooltip = `<div>${sumData?.marker} Current point sum: <strong>${sumData?.data}</strong></div>`;

                    const [, myMove, nbPointsFromMyMove, opponentMove, boutResult, nbPointsFromResult] = params[0].value as unknown[];

                    const nbPointsFromMyMoveTooltip = `<div>${params[0].marker} ${params[0].seriesName}: <strong>${nbPointsFromMyMove ?? '-'}</strong></div>`;
                    const nbPointsFromResultTooltip = `<div>${params[1].marker} ${params[1].seriesName}: <strong>${nbPointsFromResult ?? '-'}</strong></div>`;

                    const opoonentMoveTooltip = `<img src="assets/icons/${opponentMove}.svg" width="${boutResult === 'loss' ? '40px' : 'auto'}"/>`;
                    const myMoveTooltip = `<img src="assets/icons/${myMove}.svg" width="${boutResult === 'win' ? '40px' : 'auto'}"/>`;
                    const boutTooltip = `
                    <table>
                        <tr><td>         Me         </td><td>          </td><td>         Opponent         </td></tr>
                        <tr><td>  ${myMoveTooltip}  </td><td>  versus  </td><td>  ${opoonentMoveTooltip}  </td></tr>
                    </table>
                    `;

                    let tooltip = `<div class="tooltip-label">${params[0].name}</div>`;
                    tooltip += boutTooltip;
                    tooltip += nbPointsFromResultTooltip;
                    tooltip += nbPointsFromMyMoveTooltip;
                    tooltip += '<hr>';
                    tooltip += sumTooltip;
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
            dataset: datasetPart2,
            series: seriesPart2,
        });

        this.part2Answer = sumDataPart2[sumDataPart2.length - 1];
    }
}
