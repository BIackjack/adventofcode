import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { number } from 'echarts';

@Component({
    selector: 'app-puzzle-input-switcher',
    templateUrl: './puzzle-input-switcher.component.html',
    styleUrls: ['./puzzle-input-switcher.component.scss']
})
export class PuzzleInputSwitcherComponent implements OnInit {
    @Input() day!: string;
    @Input() year!: string;
    @Input() nbOfExamples = 1;

    @Output() inputRun: EventEmitter<string> = new EventEmitter<string>();

    inputs = {
        personal: '',
        examples: [''],
    }
    currentInput = '';

    selectedMode: `example-${number}` | 'personal' = 'example-0';
    isTextAreaPristine = true;

    constructor(private readonly httpClient: HttpClient) {
    }

    ngOnInit(): void {
        this.checkInputs();

        this.inputs.examples = new Array(this.nbOfExamples).fill('');

        if (this.nbOfExamples === 1) {
            this.httpClient
            .get(`assets/inputs/${this.year}/${this.day}-example`, {responseType: 'text'})
            .subscribe((data) => {
                if (this.inputs.examples[0].length === 0) {
                    this.inputs.examples[0] = data;
                    this.currentInput = data;
                    this.onRunInput();
                }
            });
        } else {
            for (let exampleIndex = 0; exampleIndex < this.nbOfExamples; exampleIndex++) {
                this.httpClient
                .get(`assets/inputs/${this.year}/${this.day}-example-${exampleIndex + 1}`, {responseType: 'text'})
                .subscribe((data) => {
                    if (this.inputs.examples[exampleIndex].length === 0) {
                        this.inputs.examples[exampleIndex] = data;

                        if (exampleIndex === 0) {
                            this.currentInput = data;
                            this.onRunInput();
                        }
                    }
                });
            }
        }

        this.httpClient
        .get(`assets/inputs/${this.year}/${this.day}-personal`, {responseType: 'text'})
        .subscribe((data) => {
            if (this.inputs.personal.length === 0) {
                this.inputs.personal = data;
            }
        });
    }

    checkInputs(): void {
        if (!this.day) {
            throw "Day not provided!";
        }

        if (!this.year) {
            throw "Year not provided!";
        }
    }

    onModeChanged(event: number | 'personal'): void {
        this.selectedMode = event === 'personal' ? 'personal' : `example-${event}`;
        this.currentInput = event === 'personal' ? this.inputs.personal : this.inputs.examples[event];

        this.isTextAreaPristine = true;
        this.onRunInput();
    }

    onRunInput(): void {
        this.inputRun.emit(this.currentInput);
    }
}
