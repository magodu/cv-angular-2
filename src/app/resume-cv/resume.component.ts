import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

import { ResumeService } from './resume.service';
import { MenuDirective } from './menu.directive';
import { ModalsComponent } from '../modals-component/modals.component';

// interface
interface DateLiteral {
    today?: string;
    month: string;
    months: string;
    year: string;
    years: string;
}


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
    datesLiterals: DateLiteral = {
        month: '',
        months: '',
        year: '',
        years: ''
    };

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

                        this._translate.get('dates').subscribe((literals: DateLiteral) => {
                            this.datesLiterals = literals;
                        }); 

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

    private getCookie(c_name) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(' ' + c_name + '=');
        
        if (c_start === -1) {
            c_start = c_value.indexOf(c_name + '=');
        }
        if (c_start === -1) {
            c_value = null;
        } else {
            c_start = c_value.indexOf('=', c_start) + 1;
            var c_end = c_value.indexOf(';', c_start);
            if (c_end === -1){
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    }

    private setCookie(c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays === null) ? '' : '; expires=' + exdate.toUTCString());
        document.cookie = c_name + '=' + c_value;
    }

    private showCookieAlert() {
        if (this.getCookie('mariogonzalezduarte-web-aviso-cookies') === '1') {
            jQuery('#aviso-cookies').hide();
        }
    }

    acceptCookie() {
        this.setCookie('mariogonzalezduarte-web-aviso-cookies', '1', 365);
        jQuery('#aviso-cookies').slideToggle('slow');
    }


    ngAfterViewInit() {
        this.getData();
    }

    ngOnInit() {
        this.showCookieAlert();
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
        period = months > 1 ? '(' + months + ' LIT_MONTHS)' : '(' + months + ' LIT_MONTH)';

        if (months >= 12) {
            years = Math.floor(months / 12);

            if (months % 12 === 0) {
                period = years > 1 ? '(' + years + ' LIT_YEARS)' : '(' + years + ' LIT_YEAR)';
            } else {
                txtYear = years !== 1 ? ' LIT_YEARS' : ' LIT_YEAR';
                txtMonth = months % 12 !== 1 ? ' LIT_MONTHS' : ' LIT_MONTH';
                period = '(' + years + txtYear + ', ' + (months % 12) + txtMonth + ')';
            }
        }

        period = period.replace(/LIT_YEARS/,  this.datesLiterals.years)
                       .replace(/LIT_YEAR/,   this.datesLiterals.year)
                       .replace(/LIT_MONTHS/, this.datesLiterals.months)
                       .replace(/LIT_MONTH/,  this.datesLiterals.month);

        return period;
    }

}
