import { Component, Input, OnChanges } from '@angular/core';

export interface TreeWrapperInput {
    label: string;
    icon?: string;
    isHighlighted: boolean;
    depth: number;
    children: TreeWrapperInput[];
}

interface TreeWrapperRow {
    label: string;
    icon?: string;
    isHighlighted: boolean;
    depth: number;
    prefix: string;
}

@Component({
    selector: 'app-tree-wrapper',
    templateUrl: './tree-wrapper.component.html',
    styleUrls: ['./tree-wrapper.component.scss']
})
export class TreeWrapperComponent implements OnChanges {
    @Input() input: TreeWrapperInput[] = [];

    rows: Array<TreeWrapperRow> = [];

    ngOnChanges() {
        this.rows = this.formatElement(this.input);
    }

    formatElement(input: TreeWrapperInput[]): TreeWrapperRow[] {
        const rows: TreeWrapperRow[] = [];
        
        input.forEach(({label, children, icon, depth, isHighlighted}) => {
            const formattedChildren = this.formatElement(children);
            const lastChildIndex = formattedChildren.reduce((acc, currentChild, currentIndex) => currentChild.depth === depth + 1 ? currentIndex : acc, 0);
            
            formattedChildren.forEach((child, index) => {
                const isChild = child.depth === depth + 1;
                const isLastChild = index === lastChildIndex;
                const isAfterLastChild = index > lastChildIndex;
                
                if (isChild && isLastChild) {
                    child.prefix = ` └─${child.prefix}`;
                } else if (isChild) {
                    child.prefix = ` ├─${child.prefix}`;
                } else if (isAfterLastChild) {
                    child.prefix = `   ${child.prefix}`;
                } else {
                    child.prefix = ` │ ${child.prefix}`;
                }
            });

            rows.push({
                label,
                icon,
                depth,
                isHighlighted,
                prefix: '',
            }, ...formattedChildren);
        });

        return rows;
    }
}
