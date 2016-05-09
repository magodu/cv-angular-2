import {Component, OnInit, AfterViewInit, ViewChild} from 'angular2/core';
import {HttpService} from "../shared/http.service";
import {Http, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {GoogleMapsComponent} from './google-maps.component';
import {AnimatedPhoneComponent} from './animated-phone.component';
import {ParallaxDirective} from './parallax.directive';
import {BackgroundDirective} from './background.directive';
import {CurriculumVitaeService} from './cv.service';
import {ModalsComponent} from '../shared/modals.component';


@Component({
	selector: 'my-cv',
	templateUrl: 'templates/cv/cv.tpl.html',
	providers: [CurriculumVitaeService],
	directives: [ParallaxDirective, BackgroundDirective, GoogleMapsComponent, AnimatedPhoneComponent, ModalsComponent]
})

export class CVComponent implements OnInit, AfterViewInit {

	@ViewChild(ModalsComponent) _modals: ModalsComponent;

	mapOptions: Object = {
		zoom: 4,
		lat: 42.3133735,
        lng: -71.0571571
	};
	response: string;
	cvData: Object;
	currentYear: number;

	public phoneDivOpened: boolean = false;
	public phoneData: string[] = [];

	constructor(private _curriculumVitaeService: CurriculumVitaeService) { }

    getCurrentYear() {
		let currentDate = new Date();
		this.currentYear = currentDate.getFullYear();
	}

	openAlertModal(size?: string) {
		let modalData: Object {
			type: 'danger',
			title: 'Error',
			bodyText: 'Error loading data has occurred. Try to reload the site.'
		};
		this._modals.showAlertModal(modalData);
	}

	getData() {
		this._modals.showLoadingModal();
		
		this._curriculumVitaeService.getData().subscribe(
			data => {   // the first argument is a function which runs on success
						this.cvData = data.data;
						this._modals.hideLoadingModal();
			},       
			err => {    // the second argument is a function which runs on error
						console.error(err);
						this._modals.hideLoadingModal();
						this.openAlertModal();

			},                  
			() => console.log('loading data: done')     // the third argument is a function which runs on completion
		);
	}

	changeLanguage(language: string) {
		// Angular 2 functionality not yet released
		console.log('Change language to ' + language);
	}

	ngAfterViewInit() {
        this.getData();
    }
    ngOnInit(): any {
        this.getCurrentYear();
    }

    showPhones() {
		this.phoneDivOpened = !this.phoneDivOpened;
		this.phoneData = this.cvData.personalData.phones;
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
            txtMonth = '',
            txtYear = '';

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
