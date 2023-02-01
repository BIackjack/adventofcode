import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { State } from '../definitions';

@Component({
  selector: 'app-crates-animator',
  templateUrl: './crates-animator.component.html',
  styleUrls: ['./crates-animator.component.scss']
})
export class CratesAnimatorComponent implements OnChanges {
    @Input() states: State[] = [];
    currentState?: State;
    currentStateIndex = 0;
    
    ngOnChanges(changes: SimpleChanges) {
        this.currentStateIndex = 0;
        this.currentState = changes['states'].currentValue[0];
    }

    goToFirstState() {
        this.currentStateIndex = 0;
        this.currentState = this.states[this.currentStateIndex];
    }

    goToPreviousState() {
        this.currentStateIndex--;
        this.currentState = this.states[this.currentStateIndex];
    }

    goToNextState() {
        this.currentStateIndex++;
        this.currentState = this.states[this.currentStateIndex];
    }

    goToLastState() {
        this.currentStateIndex = this.states.length - 1;
        this.currentState = this.states[this.currentStateIndex];
    }
}
