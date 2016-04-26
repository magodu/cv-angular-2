import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DemoService {

	constructor(private http: Http) { }

	// Uses http.get() to load a single JSON file
	getData() {
		return this.http.get('https://dl.dropboxusercontent.com/u/2251063/appData/CVData/jsonCV_EN.json').map((res: Response) => res.json());
	}


}