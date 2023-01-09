import { Component, OnInit } from '@angular/core';

import * as echarts from 'echarts/core';

@Component({
  selector: 'year-2022-day-01',
  templateUrl: './day-01.component.html',
  styleUrls: ['./day-01.component.scss']
})
export class PuzzleYear2022Day01Component implements OnInit {
    chart!: echarts.ECharts;

    ngOnInit(): void {
        this.chart = echarts.init(document.getElementById('chart') as HTMLElement, 'dark');
    }

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const elves = input.split('\n\n').map(e => e.split('\n'));

        const bestCalorieTotal = elves.reduce((bestTotalSoFar, currentElf) => {
            const currentElfTotal = currentElf.reduce((acc, val) => acc + parseInt(val), 0);
            return Math.max(currentElfTotal, bestTotalSoFar); 
        }, -Infinity);
        
        const maxNbOfItems = elves.reduce((maxLengthSoFar, currentElf) => {
            return Math.max(currentElf.length, maxLengthSoFar); 
        }, -Infinity);

        const data = elves.map((_, i) => `Elf #${i + 1}`);
        
        const series = []; 
        for (let i = 0; i < maxNbOfItems; i++) {
            series.push({
                name: `Item #${i + 1}`,
                type: 'bar',
                stack: 'total',
                data: elves.map(e => e[i]),
            });
        }

        this.chart.clear();
        this.chart.setOption({
            tooltip: {
                trigger: 'axis',
                order: 'seriesDesc',
                axisPointer: {
                    type: 'shadow',
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
    }
}
