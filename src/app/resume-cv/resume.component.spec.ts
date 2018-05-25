/* tslint:disable:no-unused-variable */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockBackend, MockConnection } from '@angular/http/testing';

import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    BaseRequestOptions,
    XHRBackend,
    RequestMethod
} from '@angular/http';


import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { ResumeComponent } from '../resume-cv/resume.component';
import { ParallaxDirective } from '../resume-cv/parallax.directive';
import { MenuDirective } from '../resume-cv/menu.directive';
import { BackgroundDirective } from '../resume-cv/background.directive';
import { AnimatedPhoneComponent } from '../animated-phone/animated-phone.component';
import { ModalsComponent } from '../modals-component/modals.component';
import { GoogleMapsComponent } from '../google-maps-component/google-maps.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ResumeService } from '../resume-cv/resume.service';
import { ContactFormService } from '../contact-form/contact-form.service';
import { HttpService } from '../shared/http.service';



const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};


describe('ResumeComponent', () => {

    let fixture: ComponentFixture<ResumeComponent>;
    let comp: ResumeComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                HttpModule,
                FormsModule,
                ReactiveFormsModule,
                Ng2Bs3ModalModule,
                TranslateModule.forRoot(),
                AgmCoreModule.forRoot(),
                AppRoutingModule
            ],
            declarations: [
                AppComponent,
                ResumeComponent,
                ModalsComponent,
                GoogleMapsComponent,
                AnimatedPhoneComponent,
                ContactFormComponent,
                ParallaxDirective,
                MenuDirective,
                BackgroundDirective
            ],
            providers: [ {provide: APP_BASE_HREF, useValue : '/' }, ResumeService, HttpService, ContactFormService ],

        });
        TestBed.compileComponents();

    }));


    it('should create component', async(inject([ResumeService, HttpService, Http],(service) => {
        TestBed.compileComponents().then(() => {
            let fixture = TestBed.createComponent(ResumeComponent);
            fixture.detectChanges();
            let compiled = fixture.debugElement.nativeElement;
            let app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        });
    })));


    it('should retrieve data', done => {
        let actual;
        let expected = [
                'title',
                'personalData',
                'training',
                'complementaryTraining',
                'experience',
                'skills',
                'languages',
                'social',
                'contact'
            ].sort();

        let fixture = TestBed.createComponent(ResumeComponent);
        let app = fixture.debugElement.componentInstance;
        let resumeService = fixture.debugElement.injector.get(ResumeService);
        let spy = spyOn(resumeService,'getData').and.callThrough();

        fixture.detectChanges();

        expect(resumeService.getData).toHaveBeenCalled();

        spy.calls.mostRecent().returnValue.subscribe (() => {
            fixture.detectChanges();

            expect(app.cvData).toBeDefined();
            actual = Object.keys(app.cvData).sort();
            expect(actual).toEqual(expected);

            done();
        });
    });


    it('should display the data in the header: my name and a description', done => {
        let titleEl: HTMLElement;
        let descriptionEl: HTMLElement;
        let fixture = TestBed.createComponent(ResumeComponent);
        let app = fixture.debugElement.componentInstance;
        let resumeService = fixture.debugElement.injector.get(ResumeService);
        let spy = spyOn(resumeService,'getData').and.callThrough();

        this.titleEl = fixture.debugElement.query(By.css('.name'));
        this.descriptionEl = fixture.debugElement.query(By.css('.description'));

        fixture.detectChanges();

        expect(this.titleEl.nativeElement.textContent).toBe('');
        expect(this.descriptionEl.nativeElement.textContent).toBe('');

        spy.calls.mostRecent().returnValue.subscribe (() => {
            fixture.detectChanges();

            expect(this.titleEl.nativeElement.textContent).toBe(app.cvData.title.nameTitle);
            expect(this.descriptionEl.nativeElement.textContent).toBe(app.cvData.title.descriptionTitle);

            done();
        });
    });


    it('should return a string with the period between two dates', () => {
        let testSets = {
            datesLiterals: {
                today: 'Today',
                month: 'month',
                months: 'months',
                year: 'year',
                years: 'years'
            },
            set1: {
                dateFrom: '01/10/2011',
                dateTo: '01/04/2015'
            },
            set2: {
                dateFrom: '01/11/2008',
                dateTo: '01/10/2011'
            }
        };

        let fixture = TestBed.createComponent(ResumeComponent);
        let app = fixture.debugElement.componentInstance;

        app.datesLiterals = testSets.datesLiterals;

        let period1: string = app.calculatePeriod(testSets.set1.dateFrom, testSets.set1.dateTo);
        fixture.detectChanges();
        expect(period1).toEqual('(3 years, 7 months)');

        let period2: string = app.calculatePeriod(testSets.set2.dateFrom, testSets.set2.dateTo);
        fixture.detectChanges();
        expect(period2).toEqual('(3 years)');

    });

});
