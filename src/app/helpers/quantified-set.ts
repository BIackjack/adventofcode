export class QuantifiedSet<T> {
    private amounts = new Map<T, number>();

    public get size(): number {
        let size = 0;
        for (const [, amount] of this.amounts) {
            if (amount) {
                size++;
            }
        }
        return size;
    }

    public add(item: T, amount = 1): void {
        this.amounts.set(item, this.getCount(item) + amount);
    }

    public removeOne(item: T): void {
        const nbOfItems = this.getCount(item);
        if (nbOfItems === 0) {
            throw new Error('Cannot remove element since it does not exist in the set');
        }
        this.amounts.set(item, nbOfItems - 1);
    }

    public removeAll(item: T): void {
        this.amounts.delete(item);
    }

    public convertAll(itemSrc: T, itemDst: T): void {
        const itemSrcAmount = this.getCount(itemSrc);
        const itemDstAmount = this.getCount(itemDst);

        this.amounts.set(itemSrc, 0);
        this.amounts.set(itemDst, itemDstAmount + itemSrcAmount);
    }

    public getCount(item: T): number {
        return this.amounts.get(item) ?? 0;
    }

    public someSizes(predicate: (size: number) => boolean): boolean {
        for (const [, amount] of this.amounts) {
            if (predicate(amount)) {
                return true;
            }
        }
        return false;
    }

    public find(predicate: (item: T, size: number) => boolean): [T, number] | undefined {
        for (const [key, amount] of this.amounts) {
            if (predicate(key, amount)) {
                return [key, amount];
            }
        }
        return undefined;
    }

    public reduce<U>(reducer: (previousValue: U, currentValue: [T, number]) => U, startValue: U): U {
        let result = startValue;

        for (const item of this.amounts) {
            result = reducer(result, item);
        }
        return result;
    }
}