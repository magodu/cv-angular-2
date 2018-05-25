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

    private subscription: Subscription;

    private datesLiterals: DateLiteral = {
        month: '',
        months: '',
        year: '',
        years: ''
    };

    private modalData: string;

    public dotsCollection: Object[];
    public cvData: any;
    public currentYear: number;

    public currentSection = '';

    public phoneDivOpened = false;

    constructor(private _resumeService: ResumeService, public _translate: TranslateService) {
        _translate.addLangs(['en', 'es']);
        _translate.setDefaultLang('en');

        const browserLang = _translate.getBrowserLang();
        _translate.use(browserLang.match(/en|es/) ? browserLang : 'en');

        this.subscription = this._resumeService.scrollEv$.subscribe(
            (section: string) => {
                this.currentSection = section;
            }
        );
    }

    getCurrentYear(): void {
        const currentDate = new Date();
        this.currentYear = currentDate.getFullYear();
    };

    private openAlertModal(size?: string): void {
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

    getData(): void {
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

    changeLanguage(language: string): void {

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


    showPhones(): void {
        this.phoneDivOpened = !this.phoneDivOpened;
    }

    onModalOutput(value): void {
        this.modalData = value;
    }

    changeSection(value: string): void {
        this.menu.changeSection(value);
    }

    toggleMobileMenu(): void {
        this.menu.toggleMobileMenu();
    }

    private getCookie(c_name: string) {
        let c_value = document.cookie;
        let c_start = c_value.indexOf(' ' + c_name + '=');
        let c_end;

        if (c_start === -1) {
            c_start = c_value.indexOf(c_name + '=');
        }
        if (c_start === -1) {
            c_value = null;
        } else {
            c_start = c_value.indexOf('=', c_start) + 1;
            c_end = c_value.indexOf(';', c_start);

            if (c_end === -1) {
                c_end = c_value.length;
            }
            c_value = decodeURI(c_value.substring(c_start, c_end));
        }
        return c_value;
    }

    private setCookie(c_name, value, exdays): void {
        const exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        const c_value = encodeURI(value) + ((exdays === null) ? '' : '; expires=' + exdate.toUTCString());
        document.cookie = c_name + '=' + c_value;
    }

    private showCookieAlert(): void {
        if (this.getCookie('mariogonzalezduarte-web-aviso-cookies') === '1') {
            jQuery('#warning-cookies').hide();
        }
    }

    acceptCookie(): void {
        this.setCookie('mariogonzalezduarte-web-aviso-cookies', '1', 365);
        jQuery('#warning-cookies').slideToggle('slow');
    }


    ngAfterViewInit() {
        this.getData();
    }

    ngOnInit() {
        this.showCookieAlert();
        this.getCurrentYear();
        this.dotsCollection = this._resumeService.getDotsCollection();
    }


    showFormContact(): void {
        this.modal.showModal('contactModal');
    }

    calculatePeriod(dateFrom: string, dateTo: string): string {
        let period = '',
            months = 0,
            years = 0,
            txtMonth = '',
            txtYear = '';

        const currentDate: Date = new Date(),
              currentDateFormated: string = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear(),
              dateF: any = dateFrom.split('/'),
              dateT: any = dateTo ? dateTo.split('/') : currentDateFormated.split('/'),
              fDate1: any = Date.UTC(dateF[2], dateF[1] - 1, dateF[0]),
              fDate2: any = Date.UTC(dateT[2], dateT[1] - 1, dateT[0]),
              dif: any = fDate2 - fDate1,
              days: number = Math.floor(dif / (1000 * 60 * 60 * 24));

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
