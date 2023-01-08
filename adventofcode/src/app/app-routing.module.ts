import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuzzleYear2022Day01Component } from './views/2022/day-01/day-01.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '2022/01', component: PuzzleYear2022Day01Component },
    { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
