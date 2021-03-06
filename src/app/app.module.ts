import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ResumeComponent } from './resume-cv/resume.component';
import { ParallaxDirective } from './resume-cv/parallax.directive';
import { MenuDirective } from './resume-cv/menu.directive';
import { BackgroundDirective } from './resume-cv/background.directive';
import { AnimatedPhoneComponent } from './animated-phone/animated-phone.component';
import { ModalsComponent } from './modals-component/modals.component';
import { GoogleMapsComponent } from './google-maps-component/google-maps.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

import { CookiesPolicyComponent } from './policy/cookies-policy/cookies-policy.component';
import { PrivacityPolicyComponent } from './policy/privacity-policy/privacity-policy.component';


import { ResumeService } from './resume-cv/resume.service';
import { ContactFormService } from './contact-form/contact-form.service';
import { HttpService } from './shared/http.service';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2Bs3ModalModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD-xSxeguqtWK4kNUrDTTU0gsNK0iXIYK4'
        }),
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
        BackgroundDirective,
        CookiesPolicyComponent,
        PrivacityPolicyComponent
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ResumeService,
        HttpService,
        ContactFormService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
