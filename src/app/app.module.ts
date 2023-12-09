import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonGroupModule, NbButtonModule, NbCalendarModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule, NbTreeGridModule } from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';

import { PuzzleYear2022Day01Component } from './views/2022/day-01/day-01.component';
import { PuzzleYear2022Day02Component } from './views/2022/day-02/day-02.component';
import { PuzzleYear2022Day03Component } from './views/2022/day-03/day-03.component';
import { PuzzleYear2022Day04Component } from './views/2022/day-04/day-04.component';
import { PuzzleYear2022Day05Component } from './views/2022/day-05/day-05.component';
import { PuzzleYear2022Day06Component } from './views/2022/day-06/day-06.component';
import { PuzzleYear2022Day07Component } from './views/2022/day-07/day-07.component';
import { PuzzleYear2022Day08Component } from './views/2022/day-08/day-08.component';
import { PuzzleYear2022Day09Component } from './views/2022/day-09/day-09.component';

import { PuzzleYear2023Day01Component } from './views/2023/day-01/day-01.component';
import { PuzzleYear2023Day02Component } from './views/2023/day-02/day-02.component';
import { PuzzleYear2023Day03Component } from './views/2023/day-03/day-03.component';
import { PuzzleYear2023Day04Component } from './views/2023/day-04/day-04.component';
import { PuzzleYear2023Day05Component } from './views/2023/day-05/day-05.component';
import { PuzzleYear2023Day06Component } from './views/2023/day-06/day-06.component';
import { PuzzleYear2023Day07Component } from './views/2023/day-07/day-07.component';
import { PuzzleYear2023Day08Component } from './views/2023/day-08/day-08.component';

import { PuzzleInputSwitcherComponent } from './helpers/components/puzzle-input-switcher/puzzle-input-switcher.component';
import { PuzzleAnswerPrinterComponent } from './helpers/components/puzzle-answer-printer/puzzle-answer-printer.component';
import { CratesAnimatorComponent } from './views/2022/day-05/crates-animator/crates-animator.component';
import { TreeWrapperComponent } from './views/2022/day-07/tree-wrapper/tree-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    
    PuzzleYear2022Day01Component,
    PuzzleYear2022Day02Component,
    PuzzleYear2022Day03Component,
    PuzzleYear2022Day04Component,
    PuzzleYear2022Day05Component,
    PuzzleYear2022Day06Component,
    PuzzleYear2022Day07Component,
    PuzzleYear2022Day08Component,
    PuzzleYear2022Day09Component,

    PuzzleYear2023Day01Component,
    PuzzleYear2023Day02Component,
    PuzzleYear2023Day03Component,
    PuzzleYear2023Day04Component,
    PuzzleYear2023Day05Component,
    PuzzleYear2023Day06Component,
    PuzzleYear2023Day07Component,
    PuzzleYear2023Day08Component,

    PuzzleInputSwitcherComponent,
    PuzzleAnswerPrinterComponent,
    CratesAnimatorComponent,
    TreeWrapperComponent,
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(), 
    NbInputModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCalendarModule,
    NbTreeGridModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';

// Import all charts, all suffixed with Chart
import { BarChart, LineChart, HeatmapChart } from 'echarts/charts';

// Import the tooltip, title, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  MarkPointComponent,
  VisualMapPiecewiseComponent,
  VisualMapContinuousComponent,
} from 'echarts/components';

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features';

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';

import 'echarts-gl';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Register the required components
echarts.use([
  BarChart,
  LineChart,
  HeatmapChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  MarkPointComponent,
  LabelLayout,
  UniversalTransition,
  VisualMapPiecewiseComponent,
  VisualMapContinuousComponent,
  CanvasRenderer,
]);