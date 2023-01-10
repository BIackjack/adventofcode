import { Component, OnInit } from '@angular/core';

import * as echarts from 'echarts/core';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { sum } from 'src/app/helpers/sum';

@Component({
  selector: 'year-2022-day-01',
  templateUrl: './day-01.component.html',
  styleUrls: ['./day-01.component.scss']
})
export class PuzzleYear2022Day01Component implements OnInit {
    chart!: echarts.ECharts;

    part1Answer = 0;
    part2Answer = 0;
    part2Explanation = '';

    ngOnInit(): void {
        this.chart = echarts.init(document.getElementById('chart') as HTMLElement, 'dark');
    }

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const elves = input.split('\n\n').map((e, i) => ({name:  `Elf #${i + 1}`, data: e.split('\n')}));

        elves.sort((a, b) => sum(...a.data) - sum(...b.data));
        
        const maxNbOfItems = elves.reduce((maxLengthSoFar, currentElf) => {
            return Math.max(currentElf.data.length, maxLengthSoFar); 
        }, -Infinity);

        const data = elves.map(e => e.name);
        
        const series = []; 
        for (let i = 0; i < maxNbOfItems; i++) {
            series.push({
                name: `Item #${i + 1}`,
                type: 'bar',
                stack: 'total',
                data: elves.map(e => e.data[i]),
            });
        }

        this.chart.clear();
        this.chart.setOption({
            tooltip: {
                trigger: 'axis',
                order: 'seriesDesc',
                axisPointer: {
                    type: 'shadow',
                },
                formatter: function(params: CallbackDataParams[]) {
                    const dataTotal = params.reduce((acc, e) => acc + parseInt((e.value ?? '0') as string), 0);

                    const dataTooltip = params.map(e => `<div>${e.marker} ${e.seriesName}: <strong>${e.value ?? '-'}</strong></div>`);
                    let tooltip = `<div class="tooltip-label">${params[0].name}</div>`;
                    tooltip += dataTooltip.reverse().join('');
                    tooltip += '<hr>';
                    tooltip += `<div>Total: <strong>${dataTotal}</strong></div>`;
                    console.log(params, tooltip);
                    return tooltip;
                }
            },
            xAxis: {
                type: 'category',
                data,
            },
            yAxis: {
                type: 'value',
            },
            series,
        });

        this.part1Answer = sum(...elves[elves.length - 1].data);
        const last3Elves = elves.slice(-3);
        this.part2Answer = sum(...last3Elves.flatMap(e => e.data));
        this.part2Explanation = last3Elves.map(e => sum(...e.data)).join(' + ');
    }
}
