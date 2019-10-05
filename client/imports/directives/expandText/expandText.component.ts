import { Component, Input, OnChanges, ChangeDetectorRef} from '@angular/core';
import template from "./expandText.component.html";
import "./expandText.component.css"; //import with 'styles' or 'styleUrls' doesn't work

@Component({    
    selector: 'expand-text',
    templateUrl: template
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