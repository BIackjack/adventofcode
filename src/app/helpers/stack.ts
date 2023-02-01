export class Stack<T = string> {
    label: string;
    elements: T[];

    constructor(label: string, ...elements: T[]) {
        this.label = label;
        this.elements = elements;
    }

    pop = () => {
        return this.elements.pop();
    }

    slice = (nbToSlice: number) => {
        return this.elements.splice(this.elements.length - nbToSlice);
    }

    push = (...newElements: T[]): void => {
        this.elements.push(...newElements);
    }

    peek = (nbElements = 1) => {
        return this.elements.slice(-1 * nbElements);
    }

    print = () => {
        console.log(`"${this.label}" (${this.elements.length} items): ${this.elements.join(', ')}`);
    }

    clone = () => {
        return new Stack(this.label, ...this.elements);
    }
}