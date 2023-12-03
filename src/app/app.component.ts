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
            title: 'Year 2023',
            expanded: true,
            icon: 'calendar-outline',
            children: this.year2023MenuItems,
            badge: {
                text: `${this.year2023MenuItems.length}`,
                status: 'primary',
            },
        },
        {
            title: 'Year 2022',
            expanded: true, // 2022 is expanded by default
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
                link: '/2022/01',
                pathMatch: 'full',
            },
            {
                title: 'Day 2',
                icon: 'checkmark-circle-2-outline',
                link: '/2022/02',
                pathMatch: 'full',
            },
            {
                title: 'Day 3',
                icon: 'checkmark-circle-2-outline',
                link: '/2022/03',
                pathMatch: 'full',
            },
            {
                title: 'Day 4',
                icon: 'checkmark-circle-2-outline',
                link: '/2022/04',
                pathMatch: 'full',
            },
            {
                title: 'Day 5',
                icon: 'checkmark-circle-2-outline',
                link: '/2022/05',
                pathMatch: 'full',
            },
            {
                title: 'Day 6',
                icon: 'checkmark-circle-2-outline',
                link: '/2022/06',
                pathMatch: 'full',
            },
            {
                title: 'Day 7',
                icon: 'checkmark-circle-2-outline',
                link: '/2022/07',
                pathMatch: 'full',
            },
            {
                title: 'Day 8',
                icon: 'checkmark-circle-2-outline',
                link: '/2022/08',
                pathMatch: 'full',
            },
            {
                title: 'Day 9',
                icon: 'more-horizontal-outline',
                link: '/2022/09',
                pathMatch: 'full',
            },
            // {
            //     title: 'Day 10',
            //     icon: 'more-horizontal-outline',
            //     link: '/2022/10',
            //     pathMatch: 'full',
            // },
        ];
    }

    private get year2023MenuItems(): NbMenuItem[] {
        return [
            {
                title: 'Day 1',
                icon: 'checkmark-circle-2-outline',
                link: '/2023/01',
                pathMatch: 'full',
            },
            {
                title: 'Day 2',
                icon: 'checkmark-circle-2-outline',
                link: '/2023/02',
                pathMatch: 'full',
            },
            {
                title: 'Day 3',
                icon: 'more-horizontal-outline',
                link: '/2023/03',
                pathMatch: 'full',
            },
        ];
    }
    
}
