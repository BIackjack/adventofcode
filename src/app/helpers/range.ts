export class Range {
    private start: number;
    private end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    contains(value: number): boolean
    contains(range: Range): boolean
    contains(toCheck: number | Range): boolean {
        if (typeof toCheck === 'number') {
            return this.start <= toCheck && toCheck <= this.end;
        } else {
            return this.start <= toCheck.start && toCheck.end <= this.end;
        }
    }

    shift(amount: number): void {
        this.start += amount;
        this.end += amount;
    }

    overlapsWith(range: Range): boolean {
        return this.contains(range.start) || this.contains(range.end) 
            || range.contains(this.start) || range.contains(this.end);
    }

    intersectsWith(range: Range): Range[] {
        if (!this.overlapsWith(range)) {
            return [this];
        }

        if (this.contains(range)) {
            return [
                new Range(this.start, range.start),
                range,
                new Range(range.end, this.end)
            ]
        }

        if (this.start < range.start) {
            return [
                new Range(this.start, range.start),
                new Range(range.start, this.start),
                new Range(this.start, range.end)
            ]
        }

        return [
            new Range(range.start, this.start),
            new Range(this.start, range.start),
            new Range(range.start, this.end)
        ]
    }

    static sliceIntersections(range1: Range, range2: Range): Range[] {
        if (!range1.overlapsWith(range2)) {
            return []
        }

        if (range1.contains(range2)) {
            return [
                new Range(range1.start, range2.start),
                range2,
                new Range(range2.end, range1.end)
            ]
        }
        
        if (range2.contains(range1)) {
            return [
                new Range(range2.start, range1.start),
                range1,
                new Range(range1.end, range2.end)
            ]
        }

        if (range1.start < range2.start) {
            return [
                new Range(range1.start, range2.start),
                new Range(range2.start, range1.start),
                new Range(range1.start, range2.end)
            ]
        }

        return [
            new Range(range2.start, range1.start),
            new Range(range1.start, range2.start),
            new Range(range2.start, range1.end)
        ]
    }
}