import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

import { ResumeService } from './resume.service';
import { MenuDirective } from './menu.directive';
import { ModalsComponent } from '../modals-component/modals.component';


@Component({
    selector: 'my-resume',
    templateUrl: 'resume.component.html',
    styleUrls: ['resume.component.scss']
})


export class ResumeComponent implements OnInit, AfterViewInit {

    @ViewChild(MenuDirective) menu: MenuDirective;
    @ViewChild(ModalsComponent) modal: ModalsComponent;

    subscription: Subscription;
    dotsCollection: Object[];
    
    mapOptions: Object = {
        zoom: 4,
        lat: 42.3133735,
        lng: -71.0571571
    };

    response: string;
    cvData: any;
    currentYear: number;

    modalData: string;

    currentSection: string = '';
    labelActive: boolean = false;

    public phoneDivOpened: boolean = false;

    constructor(private _resumeService: ResumeService, public _translate: TranslateService) {
        _translate.addLangs(['en', 'es']);
        _translate.setDefaultLang('en');

        let browserLang = _translate.getBrowserLang();
        _translate.use(browserLang.match(/en|es/) ? browserLang : 'en');

        this.subscription = this._resumeService.scrollEv$.subscribe(
            (section: string) => {
                this.currentSection = section;
            }
        );
    }

    getCurrentYear() {
        let currentDate = new Date();
        this.currentYear = currentDate.getFullYear();
    };

    private openAlertModal(size?: string) {
        let modalData: Object;
        this._translate.get('loadingError').subscribe((literal: string) => {
            modalData = {
                type: 'danger',
                title: 'Error',
                bodyText: literal
            };
            this.modal.showAlertModal(modalData);
        }); 
    }

    getData() {
        this.modal.showLoadingModal();
        this._resumeService.getData().subscribe(
            data => {   // the first argument is a function which runs on success
                        this.cvData = data.data;
                        this.modal.hideLoadingModal();
            },       
            err => {    // the second argument is a function which runs on error
                        console.error(err);
                        this.modal.hideLoadingModal();
                        this.openAlertModal();

            },                  
            () => console.log('loading data: done')     // the third argument is a function which runs on completion
        );
    }

    changeLanguage(language: string) {

        if (this._translate.currentLang === language) {
            return;
        }

        this._translate.use(language).subscribe(
            data => {
                this.getData();
            },       
            err => {
                console.error(err);
            }
        );
    }


    showPhones() {
        this.phoneDivOpened = !this.phoneDivOpened; 
    }

    onModalOutput(value) {
        this.modalData = value;
        //console.log('Modal Output', typeof value, this.modalData);
    }

    changeSection(value: string) {
        this.menu.changeSection(value);
    }

    toggleMobileMenu() {
        this.menu.toggleMobileMenu();
    }

    ngAfterViewInit() {
        this.getData();
    }

    ngOnInit() {
        this.getCurrentYear();
        this.dotsCollection = this._resumeService.getDotsCollection();
    }


    showFormContact() {
        this.modal.showModal('contactModal');
    }

    calculatePeriod(dateFrom: string, dateTo: string) {
        let period: string = '',
            currentDate: Date = new Date(),
            currentDateFormated: string = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear(),
            dateF: any = dateFrom.split('/'),
            dateT: any = dateTo ? dateTo.split('/') : currentDateFormated.split('/'),
            fDate1: any = Date.UTC(dateF[2], dateF[1] - 1, dateF[0]),
            fDate2: any = Date.UTC(dateT[2], dateT[1] - 1, dateT[0]),
            dif: any = fDate2 - fDate1,
            days: number = Math.floor(dif / (1000 * 60 * 60 * 24)),
            months: number = 0,
            years: number = 0,
            txtMonth: string = '',
            txtYear: string = '';

        months = Math.ceil(days / 30);
        period = months > 1 ? '(' + months + ' months)' : '(' + months + ' month)';

        if (months >= 12) {
            years = Math.floor(months / 12);

            if (months % 12 === 0) {
                period = years > 1 ? '(' + years + ' years)' : '(' + years + ' year)';
            } else {
                txtYear = years !== 1 ? ' years' : ' year';
                txtMonth = months % 12 !== 1 ? ' months' : ' month';
                period = '(' + years + txtYear + ', ' + (months % 12) + txtMonth + ')';
            }
        }

        return period;
    }


}
