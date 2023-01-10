export class Stack {
    name;
    elements;

    constructor(name, ...elements) {
        this.name = name;
        this.elements = elements;
    }

    pop = () => {
        return this.elements.pop();
    }

    slice = (nbToSlice) => {
        return this.elements.splice(this.elements.length - nbToSlice);
    }

    push = (...newElements) => {
        this.elements.push(...newElements);
    }

    peek = () => {
        return this.elements[this.elements.length - 1];
    }

    print = () => {
        console.log(`"${this.name}" (${this.elements.length} items): ${this.elements.join(', ')}`);
    }
}