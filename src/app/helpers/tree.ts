export class Tree<Node extends {label: string}> {
    children: Tree<Node>[];
    node: Node;
    depth: number;

    constructor(node: Node, depth = 0) {
        this.node = node;
        this.depth = depth;
        this.children = [];
    }

    addNode(nodeData: Node, path: string[]): void {
        const [pathRoot, ...pathEnd] = path;

        if (pathRoot !== this.node.label) {
            throw new Error(`Error in path: ${pathRoot} is different from ${this.node.label}`);
        }

        if (pathEnd.length === 0) {
            this.children.push(new Tree(nodeData, this.depth + 1));
        } else {
            const child = this.children.find(c => c.node.label === pathEnd[0])

            if (child === undefined) {
                throw new Error(`Cannot find child in path: ${pathEnd[0]}`);
            }

            child.addNode(nodeData, pathEnd);
        }
    }

    print(): void {
        const indentation = ''.padStart(this.depth * 4, ' ');
        console.log(`${indentation}${this.node.label}`);
        this.children.forEach(c => c.print());
    }
}