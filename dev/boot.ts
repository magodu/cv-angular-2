import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {AppComponent} from './app.component'
import {HttpService} from './shared/http.service';
import {
	MapsAPILoader,
	NoOpMapsAPILoader,
	MouseEvent,
	ANGULAR2_GOOGLE_MAPS_PROVIDERS,
	ANGULAR2_GOOGLE_MAPS_DIRECTIVES
} from 'angular2-google-maps/core';


//noinspection TypeScriptValidateTypes
bootstrap(AppComponent, [
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	ANGULAR2_GOOGLE_MAPS_PROVIDERS,
	HttpService
]).catch(err => console.error(err));