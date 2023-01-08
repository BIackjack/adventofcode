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
        if (fullYear < 2020 || fullYear > 2022) {
            return false;
        }
        
        return month === 11 && day >= 1 && day <= 25;
    }

    public handleDateChange(date: Date) {
        const day = `${date.getDate()}`.padStart(2, '0');
        const year = date.getFullYear();
        
        this.router.navigate([`/${year}/${day}`]);
    }
}
