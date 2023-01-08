import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    items: NbMenuItem[] = [
        {
            title: 'Year 2020',
            group: true,
            icon: 'calendar-outline',
        }, 
        {
            title: 'Year 2022',
            expanded: true,
            icon: 'calendar-outline',
            children: this.year2022MenuItems,
            badge: {
                text: `${this.year2022MenuItems.length}`,
                status: 'primary',
            },
        },
    ];

    private get year2022MenuItems(): NbMenuItem[] {
        return [
            {
                title: 'Day 1',
                icon: 'checkmark-circle-2-outline',
            },
            {
                title: 'Day 2',
                icon: 'checkmark-circle-2-outline',
            },
            {
                title: 'Day 3',
                icon: 'more-horizontal-outline',
            },
        ];
    }
    
}
