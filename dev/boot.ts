///<reference path="../typings/browser.d.ts"/>
import 'rxjs/add/operator/map';
import { enableProdMode }   from '@angular/core';
import { bootstrap }        from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from "@angular/router";
import { HTTP_PROVIDERS }   from '@angular/http';
import { AppComponent }     from "./app.component";
import { HttpService }      from './shared/http.service';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

enableProdMode();

bootstrap(AppComponent, [
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	ANGULAR2_GOOGLE_MAPS_PROVIDERS,
	HttpService
]);