import {Component, OnInit} from 'angular2/core';
import {HttpService} from "../shared/http.service";
import {Http, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {CurriculumVitaeService} from './cv.service';
import {GoogleMapsComponent} from './google-maps.component';
import {ParallaxDirective} from './parallax.directive';


@Component({
	selector: 'my-cv',
	templateUrl: 'templates/cv/cv.tpl.html',
	providers: [CurriculumVitaeService],
	directives: [ParallaxDirective, GoogleMapsComponent]
})

export class CVComponent implements OnInit {

	mapOptions: Object = {
		zoom: 4,
		lat: 42.3133735,
        lng: -71.0571571
	};
	//urlData: string = 'https://dl.dropboxusercontent.com/u/2251063/appData/CVData/jsonCV_EN.json';
	response: string;
	cvData: Object;
	currentYear: Date;


	constructor(private _curriculumVitaeService: CurriculumVitaeService) { }

    getCurrentYear() {
		let currentDate = new Date();
		this.currentYear = currentDate.getFullYear();
	}

	getData() {
		this._curriculumVitaeService.getData().subscribe(
			data => { this.cvData = data.data },       // the first argument is a function which runs on success
			err => console.error(err),                 // the second argument is a function which runs on error
			() => console.log('done loading data')     // the third argument is a function which runs on completion
		);
	}

	ngOnInit(): any {
        this.getData();
        this.getCurrentYear();
    }


    calculatePeriod(dateFrom: string, dateTo: string) {
        let period = '',
            currentDate = new Date(),
            currentDateFormated = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear(),
            dateF = dateFrom.split('/'),
            dateT = dateTo ? dateTo.split('/') : currentDateFormated.split('/'),
            fDate1 = Date.UTC(dateF[2], dateF[1] - 1, dateF[0]),
            fDate2 = Date.UTC(dateT[2], dateT[1] - 1, dateT[0]),
            dif = fDate2 - fDate1,
            days = Math.floor(dif / (1000 * 60 * 60 * 24)),
            months = 0,
            years = 0,
            txtYear = '',
            txtMonth = '';

        months = Math.ceil(days / 30);
        period = months > 1 ? '(' + months + ' months)' : '(' + months + ' month)';

        if (months >= 12) {
            years = Math.floor(months / 12);

            if (months % 12 === 0) {
                period = years > 1 ? '(' + years + ' years)' : '(' + years + ' year)';
            } else {
                txtYear = years !== 1 ? ' years' : ' year';
                txtMonth = months % 12 !== 1 ? ' months' : ' month');
                period = '(' + years + txtYear + ', ' + (months % 12) + txtMonth + ')';
            }
        }

        return period;
    }

}
