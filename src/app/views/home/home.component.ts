import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    constructor(private readonly router: Router) {}

    dateFilterFunction = (date: Date) => {
        const day = date.getDate();
        const month = date.getMonth();
        const fullYear = date.getFullYear();

        // Return false for incorrect year
        if (fullYear < 2022 || fullYear > 2023) {
            return false;
        }

        // Advent Of Code is only available in December
        if (month !== 11) {
            return false;
        }
        
        // In the Advent Of Code is in progress, hide next days
        const todayDay = new Date().getDate();
        const todayYear = new Date().getFullYear();
        if (todayYear === fullYear && day > todayDay) {
            return false;
        }

        return day >= 1 && day <= 25;
    }

    public handleDateChange(date: Date) {
        const day = `${date.getDate()}`.padStart(2, '0');
        const year = date.getFullYear();
        
        this.router.navigate([`/${year}/${day}`]);
    }
}
