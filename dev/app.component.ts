import {Component} from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';
import {CVComponent} from "./cv/cv.component";

@Component({
    selector: 'my-app',
    template: `
    <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
		{ path: '/', name: 'CurriculumVitae', component: CVComponent, useAsDefault: true }
])

export class AppComponent { }
