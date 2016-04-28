import {Injectable} from 'angular2/core';
import {HttpService} from '../shared/http.service';

@Injectable()
export class CurriculumVitaeService {

	urlData: string = 'https://dl.dropboxusercontent.com/u/2251063/appData/CVData/jsonCV_EN.json';

	constructor(private _httpService: HttpService) { }

	getData() {
		return this._httpService.httpGet(this.urlData));
	}


}