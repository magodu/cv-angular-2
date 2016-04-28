import {Component} from 'angular2/core';
import {CVComponent} from "./cv/cv.component";

@Component({
    selector: 'my-app',
    template: `
    	<my-cv></my-cv>
    `,
    directives: [CVComponent]
})


export class AppComponent {

}