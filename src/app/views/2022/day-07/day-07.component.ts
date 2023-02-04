import { Component } from '@angular/core';
import { sum } from 'src/app/helpers/sum';
import { Tree } from 'src/app/helpers/tree';
import { TreeWrapperInput } from './tree-wrapper/tree-wrapper.component';

class DirectoryData {
    label: string;
    type: 'directory' | 'file';
    size: number | null;

    constructor(label: string, type: 'directory' | 'file', size?: number) {
        this.label = label;
        this.type = type;
        this.size = size ?? null;
    }
}

@Component({
  selector: 'year-2022-day-07',
  templateUrl: './day-07.component.html',
  styleUrls: ['./day-07.component.scss']
})
export class PuzzleYear2022Day07Component {
    tree?: Tree<DirectoryData>;

    part1TreeWrapperInput: TreeWrapperInput[] = [];
    part1Answer = 0;
    part1Explanation = '';
    
    part2TreeWrapperInput: TreeWrapperInput[] = [];
    part2Answer = 0;
    part2Explanation = '';

    onInputRun(rawInput: string) {
        const input = rawInput.replaceAll('\r\n', '\n');
        const lines = input.split('\n');
        
        const currentPath: string[] = [];
        this.tree = new Tree(new DirectoryData('/', 'directory'));

        lines.forEach(line => {
            if (line === '$ cd ..') {
                currentPath.pop();
            } else if (line === '$ ls') {
                return;
            } else if (line.startsWith('$ cd')) {
                currentPath.push(line.split('$ cd ')[1]);
            } else if (line.startsWith('dir ')) {
                this.tree?.addNode(
                    new DirectoryData(line.split('dir ')[1], 'directory'),
                    currentPath
                );
            } else {
                const [fileSize, fileName] = line.split(' ');
                this.tree?.addNode(
                    new DirectoryData(fileName, 'file', parseInt(fileSize)),
                    currentPath
                );
            }
        });
            
        PuzzleYear2022Day07Component.computeDirectoriesSize(this.tree);
        
        // Part 1

        const validDirectoriesForPart1 =
        PuzzleYear2022Day07Component.getDirectorySizes(this.tree)
        .filter(dirSize => dirSize <= 100000);
        
        this.part1Answer = sum(...validDirectoriesForPart1);
        this.part1Explanation = validDirectoriesForPart1.join(' + ');
        
        this.part1TreeWrapperInput = PuzzleYear2022Day07Component.formatPart1Tree(this.tree ? [this.tree] : [], validDirectoriesForPart1);
        
        // Part 2

        const minimalDirectorySize = (this.tree?.node.size ?? 0) - 40000000;
        const sortedDirectoriesForPart2 = PuzzleYear2022Day07Component.getDirectorySizes(this.tree).sort((a, b) => a - b);
        const part2AnswerIndex = sortedDirectoriesForPart2.findIndex(dirSize => dirSize >= minimalDirectorySize);
        
        this.part2Answer = sortedDirectoriesForPart2[part2AnswerIndex];
        
        this.part2Explanation = `We need to free up ${minimalDirectorySize}.`;
        if (part2AnswerIndex > 0) {
            this.part2Explanation += ` ${sortedDirectoriesForPart2[part2AnswerIndex - 1]} is less than the required amount.`;
        }
        if (part2AnswerIndex < sortedDirectoriesForPart2.length - 1) {
            this.part2Explanation += ` ${sortedDirectoriesForPart2[part2AnswerIndex + 1]} is valid but is greater than ${this.part2Answer}.`;
        }

        this.part2TreeWrapperInput = PuzzleYear2022Day07Component.formatPart2Tree(this.tree ? [this.tree] : [], minimalDirectorySize, this.part2Answer);
    }

    private static computeDirectoriesSize(tree: Tree<DirectoryData> | undefined) {
        if (tree === undefined) {
            return;
        }

        tree.children.forEach(PuzzleYear2022Day07Component.computeDirectoriesSize);
        const childrenSizes = tree.children.map(({node}) => node.size ?? 0);
        tree.node.size = Math.max(sum(...childrenSizes), tree.node.size ?? 0);
    }

    private static getDirectorySizes(tree: Tree<DirectoryData> | undefined): number[] {
        if (tree === undefined || tree.children.length === 0 || tree.node.size === null) {
            return [];
        } 
    
        return [tree.node.size, ...tree.children.flatMap(PuzzleYear2022Day07Component.getDirectorySizes)];
    }

    private static formatPart1Tree(fileSystemElements: Tree<DirectoryData>[], validDirectoriesForPart1: number[]): TreeWrapperInput[] {
        return fileSystemElements.map(({node, children, depth}) => {
            const {label, size, type} = node;

            const isDirectory = type === 'directory';

            return {
                label: `${label} (${size ?? 'Unknown'})`,
                icon: isDirectory ? 'folder-outline' : 'file-outline',
                isHighlighted: !!size && validDirectoriesForPart1.includes(size) && isDirectory,
                depth,
                children: PuzzleYear2022Day07Component.formatPart1Tree(children, validDirectoriesForPart1),
            };
        });
    }

    private static formatPart2Tree(fileSystemElements: Tree<DirectoryData>[], minimalDirectorySize: number, part2Answer: number): TreeWrapperInput[] {
        return fileSystemElements.map(({node, children, depth}) => {
            const {label, size, type} = node;

            const isDirectory = type === 'directory';

            return {
                label: `${label} (${size ?? 'Unknown'})`,
                icon: isDirectory ? 'folder-outline' : 'file-outline',
                isHighlighted: size === part2Answer && isDirectory,
                depth,
                children: PuzzleYear2022Day07Component.formatPart2Tree(children, minimalDirectorySize, part2Answer),
            };
        });
    }
}
