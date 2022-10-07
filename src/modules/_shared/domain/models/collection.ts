import ArrayUtils from '../utils/misc/array-utils';

export default class Collection<T> {
    constructor(private _items: Array<T>) {}

    get items() {
        return this._items;
    }

    get count() {
        return this.items.length;
    }

    get isEmpty() {
        return this.count === 0;
    }

    each(callback: (item: T) => any) {
        this.items.forEach(callback);
    }

    concat(newItems: Collection<T>) {
        return new Collection(this.items.concat(newItems.items));
    }

    map(callback: (item: T) => any) {
        return this.items.map(callback);
    }

    find(properties: Partial<T> | any) {
        return ArrayUtils.find(this.items, properties);
    }

    add(...items: T[]) {
        this.items.push(...items);
    }

    getAt(index: number): T {
        if (index >= this.items.length) {
            throw new Error('Invalid Index');
        }

        if (index < 0) {
            throw new Error('Invalid Index');
        }

        return this.items[index];
    }

    findIndex(item: T) {}

    filter(criteria: any): Collection<T> {
        return new Collection(ArrayUtils.filter(this.items, criteria));
    }

    removeBy(criteria: any) {
        this._items = ArrayUtils.filter(this._items, criteria);

        return this._items;
    }

    static isEqual<T>(collectionA: Collection<T>, collectionB: Collection<T>) {
        return ArrayUtils.isEqual(
            collectionA.toPrimitives(),
            collectionB.toPrimitives()
        );
    }

    sortItemsBy(sortBy: string, sortMethod: 'asc' | 'desc') {
        return new Collection(
            ArrayUtils.orderBy(this.items, sortBy, sortMethod)
        );
    }

    toPrimitives() {
        return this.items.map((item: any) => {
            if (typeof item.toPrimitives === 'function') {
                return item.toPrimitives();
            }
            return item;
        });
    }
}
