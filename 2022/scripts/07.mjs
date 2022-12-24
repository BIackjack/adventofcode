import {getInput} from '../../utils.mjs';
import {Tree, TreeNode} from '../../tree.mjs';

const computeDirectoriesSize = (tree) => {
    tree.children.forEach(computeDirectoriesSize);
    
    if (tree.children.length) {
        tree.node.data = tree.children.reduce((acc, c) => acc + c.node.data, 0);
    }
}

const getDirectorySizes = (tree) => {
    if (tree.children.length === 0) {
        return [];
    } 

    return [tree.node.data, ...tree.children.reduce((acc, child) => {
        return [...acc, ...getDirectorySizes(child)];
    }, [])];
}

getInput('07')
.then(input => {
    const currentPath = [];
    const tree = new Tree(new TreeNode(0, '/'));
    
    input.forEach(line => {
        if (line === '$ cd ..') {
            currentPath.pop();
        } else if (line === '$ ls') {
            return;
        } else if (line.startsWith('$ cd')) {
            currentPath.push(line.split('$ cd ')[1]);
        } else if (line.startsWith('dir ')) {
            tree.addNode(new TreeNode(0, line.split('dir ')[1]), currentPath);
        } else {
            const [fileSize, fileName] = line.split(' ');
            tree.addNode(new TreeNode(+fileSize, fileName), currentPath);
        }
    });
    
    computeDirectoriesSize(tree);
    
    const sumOfDirectoriesUnder100k = getDirectorySizes(tree)
                                        .filter(dirSize => dirSize < 100000)
                                        .reduce((acc, d) => d + acc, 0);
    console.log(`Part1: ${sumOfDirectoriesUnder100k}`);
    
    const currentUnusedSpace = 70000000 - tree.node.data;
    const bestDirectoryToDelete = getDirectorySizes(tree)
                                    .sort((a, b) => b - a)
                                    .find(dirSize => dirSize <= currentUnusedSpace);
    console.log(`Part2: ${bestDirectoryToDelete}`);
});