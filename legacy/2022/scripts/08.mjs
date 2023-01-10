import {getInput} from '../../utils.mjs';

getInput('08')
.then(input => {
    let currentTallestTree = -Infinity;
    const highestTrees = new Set();
    const matrixSize = input.length;

    // Visible from the left side
    for (let lineIndex = 0; lineIndex < matrixSize; lineIndex++) {
        for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
            const element = input[lineIndex][columnIndex];
            if (element > currentTallestTree) {
                highestTrees.add(`${lineIndex}-${columnIndex}`)
                currentTallestTree = element;
            }
        }
        currentTallestTree = -Infinity;
    }
    
    // Visible from the top side
    for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
        for (let lineIndex = 0; lineIndex < matrixSize; lineIndex++) {
            const element = input[lineIndex][columnIndex];
            if (element > currentTallestTree) {
                highestTrees.add(`${lineIndex}-${columnIndex}`)
                currentTallestTree = element;
            }
        }
        currentTallestTree = -Infinity;
    }

    // Visible from the right side
    for (let lineIndex = 0; lineIndex < matrixSize; lineIndex++) {
        for (let columnIndex = matrixSize - 1; columnIndex >= 0; columnIndex--) {
            const element = input[lineIndex][columnIndex];
            if (element > currentTallestTree) {
                highestTrees.add(`${lineIndex}-${columnIndex}`)
                currentTallestTree = element;
            }
        }
        currentTallestTree = -Infinity;
    }

    // Visible from the bottom side
    for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
        for (let lineIndex = matrixSize - 1; lineIndex >= 0; lineIndex--) {
            const element = input[lineIndex][columnIndex];
            if (element > currentTallestTree) {
                highestTrees.add(`${lineIndex}-${columnIndex}`)
                currentTallestTree = element;
            }
        }
        currentTallestTree = -Infinity;
    }

    console.log(`Part1: ${highestTrees.size}`);

    let bestScenicScore = -Infinity;

    for (let lineIndex = 0; lineIndex < matrixSize; lineIndex++) {
        for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
            const currentTree = input[lineIndex][columnIndex];
            let nbTreesSeenTop = 0;
            let nbTreesSeenRight = 0;
            let nbTreesSeenBottom = 0;
            let nbTreesSeenLeft = 0;

            // Get scenic score to the bottom of the current tree
            for (let i = lineIndex + 1; i < matrixSize; i++) {
                const bottomTree = input[i][columnIndex];
                nbTreesSeenBottom++;
                if (bottomTree >= currentTree) break;
            }

            // Get scenic score to the top of the current tree
            for (let i = lineIndex - 1; i >= 0; i--) {
                const topTree = input[i][columnIndex];
                nbTreesSeenTop++;
                if (topTree >= currentTree) break;
            }

            // Get scenic score to the right of the current tree
            for (let i = columnIndex + 1; i < matrixSize; i++) {
                const rightTree = input[lineIndex][i];
                nbTreesSeenRight++;
                if (rightTree >= currentTree) break;
            }

            // Get scenic score to the left of the current tree
            for (let i = columnIndex - 1; i >= 0; i--) {
                const leftTree = input[lineIndex][i];
                nbTreesSeenLeft++;
                if (leftTree >= currentTree) break;
            }

            const scenicScoreForCurrentTree = nbTreesSeenTop * nbTreesSeenRight * nbTreesSeenBottom * nbTreesSeenLeft;
            bestScenicScore = Math.max(bestScenicScore, scenicScoreForCurrentTree); 
        }
    }

    console.log(`Part2: ${bestScenicScore}`);
});