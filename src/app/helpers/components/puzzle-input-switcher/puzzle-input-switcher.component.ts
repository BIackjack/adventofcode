import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-puzzle-input-switcher',
    templateUrl: './puzzle-input-switcher.component.html',
    styleUrls: ['./puzzle-input-switcher.component.scss']
})
export class PuzzleInputSwitcherComponent implements OnInit {
    @Input() day!: string;
    @Input() year!: string;

    @Output() inputRun: EventEmitter<string> = new EventEmitter<string>();

    inputs = {
        personal: '',
        example: '',
    }
    currentInput = '';

    selectedMode: 'example' | 'personal' = 'example';
    isTextAreaPristine = true;

    constructor(private readonly httpClient: HttpClient) {
    }

    ngOnInit(): void {
        this.checkInputs();

        this.httpClient
        .get(`assets/inputs/${this.year}/${this.day}-example`, {
            responseType: 'text',
        })
        .subscribe((data) => {
            if (this.inputs.example.length === 0) {
                this.inputs.example = data;
                this.currentInput = data;
                this.onRunInput();
            }
        });

        this.httpClient
        .get(`assets/inputs/${this.year}/${this.day}-personal`, {
            responseType: 'text',
        })
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

    onModeChanged(event: Array<'example' | 'personal'>): void {
        this.selectedMode = event[0];
        this.currentInput = this.inputs[this.selectedMode];

        this.isTextAreaPristine = true;
        this.onRunInput();
    }

    onRunInput(): void {
        this.inputRun.emit(this.currentInput);
    }
}
