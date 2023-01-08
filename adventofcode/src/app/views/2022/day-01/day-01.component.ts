import { Component, OnInit } from '@angular/core';

import * as echarts from 'echarts/core';

@Component({
  selector: 'year-2022-day-01',
  templateUrl: './day-01.component.html',
  styleUrls: ['./day-01.component.scss']
})
export class PuzzleYear2022Day01Component implements OnInit {
    ngOnInit(): void {
        const chart = echarts.init(document.getElementById('chart') as HTMLElement, 'dark');
        
        chart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
              backgroundColor: 'transparent'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
            },
            series: [
              {
                name: 'Direct',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                data: [320, 302, 301, 334, 390, 330, 320]
              },
              {
                name: 'Mail Ad',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: 'Affiliate Ad',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                data: [220, 182, undefined, 234, 290, 330, 310]
              },
              {
                name: 'Video Ad',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                data: [150, 212, 201, 154, 190, 330, 410]
              },
              {
                name: 'Search Engine',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320]
              },
            ]
        });
    }
}
