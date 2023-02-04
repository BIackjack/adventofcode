import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuzzleYear2022Day01Component } from './views/2022/day-01/day-01.component';
import { PuzzleYear2022Day02Component } from './views/2022/day-02/day-02.component';
import { PuzzleYear2022Day03Component } from './views/2022/day-03/day-03.component';
import { PuzzleYear2022Day04Component } from './views/2022/day-04/day-04.component';
import { PuzzleYear2022Day05Component } from './views/2022/day-05/day-05.component';
import { PuzzleYear2022Day06Component } from './views/2022/day-06/day-06.component';
import { PuzzleYear2022Day07Component } from './views/2022/day-07/day-07.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '2022/01', component: PuzzleYear2022Day01Component },
    { path: '2022/02', component: PuzzleYear2022Day02Component },
    { path: '2022/03', component: PuzzleYear2022Day03Component },
    { path: '2022/04', component: PuzzleYear2022Day04Component },
    { path: '2022/05', component: PuzzleYear2022Day05Component },
    { path: '2022/06', component: PuzzleYear2022Day06Component },
    { path: '2022/07', component: PuzzleYear2022Day07Component },
    { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
