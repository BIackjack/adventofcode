import { Component } from '@angular/core';
import { LineSeriesOption, BarSeriesOption } from 'echarts';
import * as echarts from 'echarts/core';
import { product } from 'src/app/helpers/product';

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

type Data = FormattedLine[];

@Component({
  selector: 'year-2023-day-06',
  templateUrl: './day-06.component.html',
  styleUrls: ['./day-06.component.scss']
})
export class PuzzleYear2023Day06Component {
    data: Data = [];
    charts: echarts.ECharts[] = [];

    part1Answer: number | string  = 0;
    part1Explanation = '';
    
    part2Answer: number | string  = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n').split('\n');

        const times = input[0].split(/:/)[1].split(' ').filter(x => !!x).map(Number);
        const distances = input[1].split(/:/)[1].split(' ').filter(x => !!x).map(Number);
        
        const allValidTries = times.map((time, timeIndex) => {
            const distanceToBeat = distances[timeIndex];
            const tries: number[] = [];
            for (let currentTryWaitTime = 0; currentTryWaitTime <= time; currentTryWaitTime++) {
                tries.push((time - currentTryWaitTime) * currentTryWaitTime);
            }
            const validTriesNb = tries.reduce((acc, curr) => curr > distanceToBeat ? acc + 1 : acc, 0);
            return validTriesNb;
        });

        this.part1Answer = product(...allValidTries);
        this.part1Explanation = allValidTries.join(' x ');
        
        const globalTime = parseInt(input[0].split(/:/)[1].split(' ').join(''), 10);
        const globalDistance = parseInt(input[1].split(/:/)[1].split(' ').join(''), 10);
        
        const validTriesPart2 = [];
        for (let currentTryWaitTime = 0; currentTryWaitTime <= globalTime; currentTryWaitTime++) {
            const currentDistance = (globalTime - currentTryWaitTime) * currentTryWaitTime;
            if (currentDistance > globalDistance) {
                validTriesPart2.push(currentTryWaitTime);
            }
        }

        this.part2Answer = validTriesPart2.length;
        console.log(validTriesPart2);
        
        this.part2Explanation = `Between ${validTriesPart2[0]} and ${validTriesPart2.at(-1)}`;

        // Display

        if (times.length < 4) {
            document.getElementById(`chart-3`)!.style.height = '0px';
            this.charts.forEach(c => c.dispose());
        }
        
        this.charts = [];
        for (let i = 0; i < times.length; i++) {
            const series: Array<LineSeriesOption | BarSeriesOption> = []; 

            const chartData = [];
            for (let timeIndex = 0; timeIndex <= times[i]; timeIndex++) {
                const distance = (times[i] - timeIndex) * timeIndex;
                chartData.push([timeIndex, distance]);
            }

            const minValid = chartData.findIndex(([_time, distance]) => distance > distances[i]);
            const maxValid = chartData.length - 1 - [...chartData].reverse().findIndex(([_time, distance]) => distance > distances[i]);

            series.push({
                name: `Distance`,
                type: 'line',
                data: chartData,
                smooth: 0.2,
                lineStyle: {
                    width: 4,
                },
                tooltip: {
                    valueFormatter: function (value: unknown) {
                        return value + ' mm';
                    }
                },
                markLine: {
                    silent: true,
                    label: {
                        show: false
                    },
                    symbol: ['none', 'none'],
                    data: [
                        {
                            name: 'Record distance',
                            yAxis: distances[i],
                            label: {
                                show: true,
                                position: 'insideEndTop',
                                distance: [0, 5],
                                formatter: '{b}: {c}'
                            }
                        },
                    ]
                },
                markArea: {
                    itemStyle: {
                        color: 'rgba(40, 173, 247, 0.2)'
                    },
                    data: [
                        [
                            {
                                xAxis: minValid
                            },
                            {
                                xAxis: maxValid
                            }
                        ],
                    ]
                }
            });

            const data = [...Array(times[i] + 1).fill('')];

            const element = document.getElementById(`chart-${i}`) as HTMLElement;
            element.style.height = '300px';
            const chart = echarts.init(element, 'dark');

            chart.setOption({
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data,
                    name: 'Time spent holding button',
                    nameLocation: 'middle',
                    nameGap: 40,
                    axisLabel: {
                        formatter: function (_value: number, index: number) {
                            return `${index} ms`;
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    name: 'Distance',
                    axisLabel: {
                        formatter: '{value} mm'
                    }
                },
                series,
            });

            this.charts.push(chart);
        }
    }
}
