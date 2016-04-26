import {Injectable} from 'angular2/core';
import {HttpService} from '../shared/http.service';

@Injectable()
export class CurriculumVitaeService {

	constructor(private _httpService: HttpService) { }

	getData(urlData: string) {
		return this._httpService.httpGet(urlData));
	}


}