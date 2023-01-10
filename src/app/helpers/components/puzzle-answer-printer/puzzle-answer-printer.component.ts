import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-puzzle-answer-printer',
  templateUrl: './puzzle-answer-printer.component.html',
  styleUrls: ['./puzzle-answer-printer.component.scss']
})
export class PuzzleAnswerPrinterComponent {
    @Input() part: 1 | 2 = 1;
    @Input() answer: number | string = '';
    @Input() explanation?: string;
}
