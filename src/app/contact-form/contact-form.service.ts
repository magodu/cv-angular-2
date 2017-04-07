import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpService } from '../shared/http.service';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ContactFormService {
    
    // TODO: change to /api/email.php
    urlData: string = 'http://mariogonzalezduarte.es/api/email.php';

    constructor(private _httpService: HttpService) { }

    sendEmail(data) {
        let body = `name=${data.name}&email=${data.email}&message=${data.message}&subject=${data.subject}`;
        return this._httpService.httpPost(this.urlData, body);
    }

}