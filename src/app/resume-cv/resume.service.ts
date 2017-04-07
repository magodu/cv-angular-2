import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpService } from '../shared/http.service';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ResumeService {
    // Observable navItem source
    scrollEvent = new BehaviorSubject<string>('');
    resetFormEvent = new BehaviorSubject<boolean>(false);

    // Observable scrollEvent stream
    scrollEv$ = this.scrollEvent.asObservable();
    resetFormEv$ = this.resetFormEvent.asObservable();

    urlData: string = 'https://cv-data-42f26.firebaseio.com/LANGUAGE.json';

    constructor(private _httpService: HttpService, private _translate: TranslateService) { }

    dotsCollection: Object[] = [
        {
            title: 'title_main',
            id: 'header'
        }, {
            title: 'title_experience',
            id: 'experience'
        }, {
            title: 'title_skills',
            id: 'skills'
        }, {
            title: 'title_training',
            id: 'training'
        }, {
            title: 'title_languages',
            id: 'languages'
        }, {
            title: 'title_contact',
            id: 'contact'
        }
    ];

    getDotsCollection() {
        return this.dotsCollection;
    }

    getData() {
        let language = this._translate.currentLang,
            serviceUrl = this.urlData.replace(/LANGUAGE/, language);

        return this._httpService.httpGet(serviceUrl);
    }


    sendScrollEvent(section: string) {
        this.scrollEvent.next(section);
    }

    resetContactFormEvent(reset: boolean) {
        this.resetFormEvent.next(reset);
    }


}