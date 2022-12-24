export class TreeNode {
    data;
    label;

    constructor(data, label) {
        this.data = data;
        this.label = label;
    }
}

export class Tree {
    children;
    node;
    depth;

    constructor(node, depth = 0) {
        this.node = node;
        this.depth = depth;
        this.children = [];
    }

    addNode = (item, path) => {
        const [pathRoot, ...pathEnd] = path;

        if (pathRoot !== this.node.label) {
            throw new Error(`Error in path: ${pathRoot} is different from ${this.node.label}`);
        }

        if (pathEnd.length === 0) {
            this.children.push(new Tree(item, this.depth + 1));
        } else {
            const child = this.children.find(c => c.node.label === pathEnd[0])
            child.addNode(item, pathEnd);
        }
    }

    print = () => {
        const indentation = ''.padStart(this.depth * 4, ' ');
        console.log(`${indentation}${this.node.label} (${this.node.data})`);
        this.children.forEach(c => c.print());
    }
}