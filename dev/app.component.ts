import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from "@angular/router";
import {CVComponent} from "./cv/cv.component";

@Component({
    selector: 'my-app',
    template: `
        <router-outlet [routerLink]="['']"></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    { path: '', component: CVComponent }
])


export class AppComponent {
    
}