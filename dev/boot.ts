import {bootstrap} from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {AppComponent} from './app.component'
import {HttpService} from './shared/http.service';

//noinspection TypeScriptValidateTypes
bootstrap(AppComponent, [
	HTTP_PROVIDERS,
	HttpService
]);
