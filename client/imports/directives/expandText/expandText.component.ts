import { Component, Input, OnChanges, ChangeDetectorRef} from '@angular/core';

@Component({    
    selector: 'expand-text',
    template: 
    `
        <div [innerHTML]="currentText"></div>
        <button *ngIf="showExpandOption" (click)="toggleView()">{{isExpanded? 'Hide':'Show more'}}</button>
    `,
    styles:[`
        button{
            background-color: deepskyblue;
            color: aliceblue;
            border-radius: 12px;    
        }
    `]
})

export class ExpandTextComponent implements OnChanges {
    @Input() text: string;
    @Input() maxLength: number = 500; 
    private currentText: string;
    private showExpandOption: boolean = false;
    private isExpanded: boolean = false;

    constructor(private changeDetector: ChangeDetectorRef) {}

    toggleView() {
        this.isExpanded = !this.isExpanded;
        this.updateView();
    }

    updateView() {
        if (!this.text || this.text.length <= this.maxLength) { 
            this.showExpandOption = false;
            this.isExpanded = true;
            this.currentText = this.text;
            return;
        }

        this.showExpandOption = true;
        if(this.isExpanded == true){
            this.currentText = this.text;
        }else{
            this.currentText = this.text.substring(0, this.maxLength) + "...";
        }

        this.changeDetector.detectChanges();

    }

    ngOnChanges() {
        this.updateView();       
    }
}