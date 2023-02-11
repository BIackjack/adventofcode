import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';

type Visibility = {
    isVisible: boolean;
    isVisibleFromLeft?: boolean;
    isVisibleFromRight?: boolean;
    isVisibleFromTop?: boolean;
    isVisibleFromBottom?: boolean;
}

type GlobalVisibility = 'Visible from outside' | 'Not visible from ouside';

type ScenicScore = {
    total: number;
    nbTreesSeenTop: number;
    nbTreesSeenRight: number;
    nbTreesSeenBottom: number;
    nbTreesSeenLeft: number;
}

@Component({
  selector: 'year-2022-day-08',
  templateUrl: './day-08.component.html',
  styleUrls: ['./day-08.component.scss']
})
export class PuzzleYear2022Day08Component implements OnInit {
    chart1!: echarts.ECharts;
    chart2!: echarts.ECharts;

    visibilities: Record<`${number}-${number}`, Visibility> = {}
    part1Answer = 0;
    
    scenicScores: Record<`${number}-${number}`, ScenicScore> = {}
    part2Answer = 0;

    ngOnInit(): void {
        this.chart1 = echarts.init(document.getElementById('chart1') as HTMLElement, 'dark');
        this.chart2 = echarts.init(document.getElementById('chart2') as HTMLElement, 'dark');
    }

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');

        const matrix: string[][] = input.split('\n').map(row => row.split(''));
        const matrixSize = matrix.length;

        // Part 1

        let currentTallestTree = -Infinity;
        this.visibilities = {};

        // Visible from the left side
        for (let lineIndex = 0; lineIndex < matrixSize; lineIndex++) {
            for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
                const element = parseInt(matrix[lineIndex][columnIndex]);
                if (element > currentTallestTree) {
                    this.visibilities[`${lineIndex}-${columnIndex}`] = {
                        isVisible: true,
                        isVisibleFromLeft: true,
                    }
                    currentTallestTree = element;
                }
            }
            currentTallestTree = -Infinity;
        }

        // Visible from the top side
        for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
            for (let lineIndex = 0; lineIndex < matrixSize; lineIndex++) {
                const element = parseInt(matrix[lineIndex][columnIndex]);
                if (element > currentTallestTree) {
                    this.visibilities[`${lineIndex}-${columnIndex}`] = {
                        ...this.visibilities[`${lineIndex}-${columnIndex}`],
                        isVisible: true,
                        isVisibleFromTop: true,
                    }
                    currentTallestTree = element;
                }
            }
            currentTallestTree = -Infinity;
        }

        // Visible from the right side
        for (let lineIndex = 0; lineIndex < matrixSize; lineIndex++) {
            for (let columnIndex = matrixSize - 1; columnIndex >= 0; columnIndex--) {
                const element = parseInt(matrix[lineIndex][columnIndex]);
                if (element > currentTallestTree) {
                    this.visibilities[`${lineIndex}-${columnIndex}`] = {
                        ...this.visibilities[`${lineIndex}-${columnIndex}`],
                        isVisible: true,
                        isVisibleFromRight: true,
                    }
                    currentTallestTree = element;
                }
            }
            currentTallestTree = -Infinity;
        }

        // Visible from the bottom side
        for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
            for (let lineIndex = matrixSize - 1; lineIndex >= 0; lineIndex--) {
                const element = parseInt(matrix[lineIndex][columnIndex]);
                if (element > currentTallestTree) {
                    this.visibilities[`${lineIndex}-${columnIndex}`] = {
                        ...this.visibilities[`${lineIndex}-${columnIndex}`],
                        isVisible: true,
                        isVisibleFromBottom: true,
                    }
                    currentTallestTree = element;
                }
            }
            currentTallestTree = -Infinity;
        }

        const chart1Data: [number, number, string, Visibility, GlobalVisibility][] = [];
        matrix.forEach((row, rowIndex) => {
            row.forEach((item, itemIndex) => {
                const visibility = this.visibilities[`${rowIndex}-${itemIndex}`] ?? {isVisible: false};
                const globalVisibility: GlobalVisibility = visibility.isVisible ? 'Visible from outside' : 'Not visible from ouside';
                chart1Data.push([rowIndex, itemIndex, item, visibility, globalVisibility]);
            });
        });

        this.chart1.clear();
        this.chart1.setOption({
            tooltip: {
                formatter: function(params: any) {
                    const value: string = params.value[2];
                    const visibility: Visibility = params.value[3];
                    
                    const valueTooltip = `<span class="value">${value}</span>`
                    
                    const {isVisible, ...visibilityDetails} = visibility;
                    const header = isVisible ?
                        `<strong class="green-text">Visible from outside</strong>` :
                        `<strong class="red-text">Not visible from outside</strong>`;
                    
                    let visibilitiesDetailsTooltip = '';
                    Object.keys(visibilityDetails).forEach(detail => {
                        const direction = detail.split('isVisibleFrom')[1].toLowerCase();
                        visibilitiesDetailsTooltip += `<li>Visible from the ${direction}</li>`;
                    })
                    visibilitiesDetailsTooltip = `<ul>${visibilitiesDetailsTooltip}</ul>`;
                    
                    return `<div class="tooltip">${valueTooltip}${header}${visibilitiesDetailsTooltip}</div>`; 
                },
            },
            visualMap: [
                {
                    left: 20,
                    bottom: 20,
                    selectedMode: false,
                    dimension: 4,
                    categories: ['Visible from outside', 'Not visible from ouside'],
                    inRange: {
                        color: {
                            'Visible from outside': '#258e38',
                            '': '#d43434',
                        }
                    },
                    outOfRange: {
                        color: {
                            'Not visible from ouside': '#d43434',
                            '': '#258e38',
                        }
                    }
                }
            ],
            xAxis3D: {
                type: 'category',
                name: 'Rows',
            },
            yAxis3D: {
                type: 'category',
                name: 'Columns',
            },
            zAxis3D: {
                type: 'value',
                name: 'Tree height',
                splitNumber: 9,
                minInterval: 1,
            },
            grid3D: {
                axisLine: {
                    lineStyle: { color: '#fff' }
                },
                axisPointer: {
                    show: false,
                },
            },
            series: [
                {
                    type: 'bar3D',
                    bevelSize: .2,
                    data: chart1Data,
                    emphasis: {
                        label: {
                            show: false,
                        },
                    },
                    light: {
                        main: {
                            shadow: true,
                            intensity: 0
                        },
                        ambiant: {
                            color: '#fff',
                            intensity: 50
                        }
                    },
                    shading: 'lambert',
                }
            ]
        });

        this.part1Answer = chart1Data.filter(d => d[4] === 'Visible from outside').length;

        // Part 2

        for (let lineIndex = 0; lineIndex < matrixSize; lineIndex++) {
            for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
                const currentTree = parseInt(matrix[lineIndex][columnIndex]);
                const scenicScore: ScenicScore = {
                    total: 0,
                    nbTreesSeenTop: 0,
                    nbTreesSeenRight: 0,
                    nbTreesSeenBottom: 0,
                    nbTreesSeenLeft: 0,
                };
    
                // Get scenic score to the bottom of the current tree
                for (let i = lineIndex + 1; i < matrixSize; i++) {
                    const bottomTree = parseInt(matrix[i][columnIndex]);
                    scenicScore.nbTreesSeenBottom++;
                    if (bottomTree >= currentTree) break;
                }
    
                // Get scenic score to the top of the current tree
                for (let i = lineIndex - 1; i >= 0; i--) {
                    const topTree = parseInt(matrix[i][columnIndex]);
                    scenicScore.nbTreesSeenTop++;
                    if (topTree >= currentTree) break;
                }
    
                // Get scenic score to the right of the current tree
                for (let i = columnIndex + 1; i < matrixSize; i++) {
                    const rightTree = parseInt(matrix[lineIndex][i]);
                    scenicScore.nbTreesSeenRight++;
                    if (rightTree >= currentTree) break;
                }
    
                // Get scenic score to the left of the current tree
                for (let i = columnIndex - 1; i >= 0; i--) {
                    const leftTree = parseInt(matrix[lineIndex][i]);
                    scenicScore.nbTreesSeenLeft++;
                    if (leftTree >= currentTree) break;
                }
    
                scenicScore.total = scenicScore.nbTreesSeenTop * scenicScore.nbTreesSeenRight * scenicScore.nbTreesSeenBottom * scenicScore.nbTreesSeenLeft;
                this.scenicScores[`${lineIndex}-${columnIndex}`] = scenicScore;
            }
        }

        const chart2Data: [number, number, string, ScenicScore, number][] = [];
        matrix.forEach((row, rowIndex) => {
            row.forEach((item, itemIndex) => {
                const scenicScore = this.scenicScores[`${rowIndex}-${itemIndex}`];
                chart2Data.push([rowIndex, itemIndex, item, scenicScore, scenicScore.total]);
            });
        });

        const scenicScoreTotals = chart2Data.map(d => d[3].total);
        const scenicScoreMin = Math.min(...scenicScoreTotals);
        const scenicScoreMax = Math.max(...scenicScoreTotals);

        this.chart2.clear();
        this.chart2.setOption({
            tooltip: {
                formatter: function(params: any) {
                    const value: string = params.value[2];
                    const scenicScore: ScenicScore = params.value[3];
                    
                    const valueTooltip = `<span class="value">${value}</span>`
                    
                    const {total, ...scenicScoreDetails} = scenicScore;
                    const header = `<strong>Scenic score: ${total}</strong>`;
                    
                    let scenicScoreDetailsTooltip = '';
                    Object.entries(scenicScoreDetails).forEach(([scenicScoreDetail, nbTreesSeenDirection]) => {
                        const direction = scenicScoreDetail.split('nbTreesSeen')[1].toLowerCase();
                        scenicScoreDetailsTooltip += `<li>Scenic score for the ${direction}: ${nbTreesSeenDirection}</li>`;
                    })
                    scenicScoreDetailsTooltip = `<ul>${scenicScoreDetailsTooltip}</ul>`;
                    
                    return `<div class="tooltip">${valueTooltip}${header}${scenicScoreDetailsTooltip}</div>`; 
                },
            },
            xAxis3D: {
                type: 'category',
                name: 'Rows',
            },
            yAxis3D: {
                type: 'category',
                name: 'Columns',
            },
            zAxis3D: {
                type: 'value',
                name: 'Tree height',
                splitNumber: 9,
                minInterval: 1,
            },
            visualMap: [
                {
                    left: 20,
                    bottom: 20,
                    selectedMode: false,
                    type: 'continuous',
                    dimension: 4,
                    min: scenicScoreMin,
                    max: scenicScoreMax,
                    text: ['High scenic score', 'Low scenic score'],
                }
            ],
            grid3D: {
                axisLine: {
                    lineStyle: { color: '#fff' }
                },
                axisPointer: {
                    show: false,
                },
            },
            series: [
                {
                    type: 'bar3D',
                    bevelSize: .2,
                    data: chart2Data,
                    emphasis: {
                        label: {
                            show: false,
                        },
                    },
                    light: {
                        main: {
                            shadow: true,
                            intensity: 0
                        },
                        ambiant: {
                            color: '#fff',
                            intensity: 50
                        }
                    },
                    shading: 'lambert',
                }
            ]
        });

        this.part2Answer = scenicScoreMax;
    }
}
