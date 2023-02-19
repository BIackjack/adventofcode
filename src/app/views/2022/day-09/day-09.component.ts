import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';

type TailPositionHistory = Record<`${number}~${number}`, number>

type Direction = 'U' | 'L' | 'D' | 'R';
type Coordinates = [number, number];

type Part1BoardState = {
    tailPositionHistory: TailPositionHistory;
    currentTailPosition: Coordinates;
    currentHeadPosition: Coordinates;
}

type Part2BoardState = {
    tailPositionHistory: TailPositionHistory;
    currentHeadPosition: Coordinates;
    currentTailsPosition: Coordinates[];
}

const moveHead = (currentHeadPosition: Coordinates, direction: Direction): Coordinates => {
    const [currentX, currentY] = currentHeadPosition;
    switch (direction) {
        case 'L':
            return [currentX - 1, currentY];
        case 'R':
            return [currentX + 1, currentY];
        case 'D':
            return [currentX, currentY - 1];
        case 'U':
            return [currentX, currentY + 1];
        default:
            throw "Unknown Direction";
    }
}

const moveTail = (currentTailPosition: Coordinates, targetPosition: Coordinates): Coordinates => {
    const [tailX, tailY] = currentTailPosition;
    const [targetX, targetY] = targetPosition;
    const [offsetX, offsetY] = [targetX - tailX, targetY - tailY];
    
    const shouldMoveTheTail = Math.abs(offsetX) > 1 || Math.abs(offsetY) > 1;
    if (shouldMoveTheTail) {
        const newTailX = tailX + Math.min(1, Math.abs(offsetX)) * Math.sign(offsetX);
        const newTailY = tailY + Math.min(1, Math.abs(offsetY)) * Math.sign(offsetY);
        
        return [newTailX, newTailY];
    } else {
        return currentTailPosition;
    }
}

const getChartOptions = (dataset: [number, number, string][], minX: number, maxX: number, maxValue: number) => ({
    grid: {
        height: '70%',
        top: '10%'
    },
    xAxis: {
        type: 'category',
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: 1,
        max: maxValue,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        text: ['Highest', 'Lowest'],
    },
    title: {
        text: 'Number of times the tail visited each cell',
        left: 'center',
        top: 20,
    },
    series: [
        {
            type: 'heatmap',
            data: dataset,
            label: {
                show: Math.abs(maxX - minX) < 20,
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 15,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
})

@Component({
  selector: 'year-2022-day-09',
  templateUrl: './day-09.component.html',
  styleUrls: ['./day-09.component.scss']
})
export class PuzzleYear2022Day09Component implements OnInit {
    chart1!: echarts.ECharts;
    chart2!: echarts.ECharts;

    part1BoardState!: Part1BoardState;
    part1Answer = 0;
    
    part2BoardState!: Part2BoardState;
    part2Answer = 0;

    ngOnInit(): void {
        this.chart1 = echarts.init(document.getElementById('chart1') as HTMLElement, 'dark');
        this.chart2 = echarts.init(document.getElementById('chart2') as HTMLElement, 'dark');
    }

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const instructions: [Direction, number][] = input.split('\n').map(row => [row[0] as Direction, parseInt(row.slice(2))]);

        // Part 1
        
        this.part1BoardState = {
            currentHeadPosition: [0, 0],
            currentTailPosition: [0, 0],
            tailPositionHistory: {'0~0': 1},
        };

        instructions.forEach(([direction, nbOfCells]) => {
            for (let i = 0; i < nbOfCells; i++) {
                // Move the head
                this.part1BoardState.currentHeadPosition = moveHead(this.part1BoardState.currentHeadPosition, direction);
                
                // Adjust the tail according to the head
                const newTailPosition = moveTail(this.part1BoardState.currentTailPosition, this.part1BoardState.currentHeadPosition);
                const hasTailMoved = this.part1BoardState.currentTailPosition !== newTailPosition;
                this.part1BoardState.currentTailPosition = newTailPosition;
                
                // Increment the count for the current tail position
                const [tailPositionX, tailPositionY] = this.part1BoardState.currentTailPosition;
                const tailPositionHistory: number | undefined = this.part1BoardState.tailPositionHistory[`${tailPositionX}~${tailPositionY}`];
                this.part1BoardState.tailPositionHistory[`${tailPositionX}~${tailPositionY}`] = (tailPositionHistory ?? 0) + (hasTailMoved ? 1 : 0);
            }
        });

        // Find the min/max points in each dimension in order to plot the chart
        let [minX, maxX, minY, maxY, maxValue] = Object.keys(this.part1BoardState.tailPositionHistory).reduce(([minX, maxX, minY, maxY, maxValue], currentKey) => {
            const [currentX, currentY] = currentKey.split('~');
            
            return [
                Math.min(parseInt(currentX), minX),
                Math.max(parseInt(currentX), maxX),
                Math.min(parseInt(currentY), minY),
                Math.max(parseInt(currentY), maxY),
                Math.max(this.part1BoardState.tailPositionHistory[currentKey as keyof TailPositionHistory], maxValue),
            ]
        }, [0, 0, 0, 0, 0]);

        // Build the dataset
        const chart1Dataset: [number, number, string][] = [];
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                chart1Dataset.push([x, y, this.part1BoardState.tailPositionHistory[`${x}~${y}`]?.toString() ?? '-']);
            }
        }
        
        this.chart1.clear();
        this.chart1.setOption(getChartOptions(chart1Dataset, minX, maxX, maxValue));

        this.part1Answer = Object.keys(this.part1BoardState.tailPositionHistory).length;

        // Part 2

        this.part2BoardState = {
            currentHeadPosition: [0, 0],
            currentTailsPosition: Array(9).fill([0, 0]),
            tailPositionHistory: {'0~0': 1},
        };

        instructions.forEach(([direction, nbOfCells]) => {
            for (let i = 0; i < nbOfCells; i++) {
                // Move the head
                this.part2BoardState.currentHeadPosition = moveHead(this.part2BoardState.currentHeadPosition, direction);
                
                // Adjust the tails according to the head
                for (let tailIndex = 0; tailIndex < 9; tailIndex++) {
                    const tailCoordinates = this.part2BoardState.currentTailsPosition[tailIndex];
                    const targetCoordinates = tailIndex === 0 ? this.part2BoardState.currentHeadPosition : this.part2BoardState.currentTailsPosition[tailIndex - 1];
                    const newTailCoordinates = moveTail(tailCoordinates, targetCoordinates);
                    // Save new tail coordinates
                    this.part2BoardState.currentTailsPosition[tailIndex] = newTailCoordinates; 

                    // Handling the last tail
                    if (tailIndex === 8) {
                        const hasTailMoved = tailCoordinates !== newTailCoordinates;
                        
                        // Increment the count for the current tail position
                        const [tailPositionX, tailPositionY] = newTailCoordinates;
                        const tailPositionHistory: number | undefined = this.part2BoardState.tailPositionHistory[`${tailPositionX}~${tailPositionY}`];
                        this.part2BoardState.tailPositionHistory[`${tailPositionX}~${tailPositionY}`] = (tailPositionHistory ?? 0) + (hasTailMoved ? 1 : 0);
                    }
                }
            }
        });

        // Find the min/max points in each dimension in order to plot the chart
        [minX, maxX, minY, maxY, maxValue] = Object.keys(this.part2BoardState.tailPositionHistory).reduce(([minX, maxX, minY, maxY, maxValue], currentKey) => {
            const [currentX, currentY] = currentKey.split('~');
            
            return [
                Math.min(parseInt(currentX), minX),
                Math.max(parseInt(currentX), maxX),
                Math.min(parseInt(currentY), minY),
                Math.max(parseInt(currentY), maxY),
                Math.max(this.part2BoardState.tailPositionHistory[currentKey as keyof TailPositionHistory], maxValue),
            ]
        }, [0, 0, 0, 0, 0]);

        // Build the dataset
        const chart2Dataset: [number, number, string][] = [];
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                chart2Dataset.push([x, y, this.part2BoardState.tailPositionHistory[`${x}~${y}`]?.toString() ?? '-']);
            }
        }

        this.chart2.clear();
        this.chart2.setOption(getChartOptions(chart2Dataset, minX, maxX, maxValue));

        this.part2Answer = Object.keys(this.part2BoardState.tailPositionHistory).length;;
    }
}
