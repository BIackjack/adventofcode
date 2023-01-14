import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonGroupModule, NbButtonModule, NbCalendarModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { PuzzleYear2022Day01Component } from './views/2022/day-01/day-01.component';
import { PuzzleYear2022Day02Component } from './views/2022/day-02/day-02.component';
import { PuzzleYear2022Day03Component } from './views/2022/day-03/day-03.component';
import { PuzzleYear2022Day04Component } from './views/2022/day-04/day-04.component';
import { PuzzleInputSwitcherComponent } from './helpers/components/puzzle-input-switcher/puzzle-input-switcher.component';
import { PuzzleAnswerPrinterComponent } from './helpers/components/puzzle-answer-printer/puzzle-answer-printer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PuzzleYear2022Day01Component,
    PuzzleYear2022Day02Component,
    PuzzleYear2022Day03Component,
    PuzzleYear2022Day04Component,
    PuzzleInputSwitcherComponent,
    PuzzleAnswerPrinterComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';

// Import all charts, all suffixed with Chart
import { BarChart, LineChart } from 'echarts/charts';

// Import the tooltip, title, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  MarkPointComponent,
} from 'echarts/components';

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features';

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';

// Register the required components
echarts.use([
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  MarkPointComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);