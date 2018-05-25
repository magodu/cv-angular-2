import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumeComponent } from './resume-cv/resume.component';
import { CookiesPolicyComponent } from './policy/cookies-policy/cookies-policy.component';
import { PrivacityPolicyComponent } from './policy/privacity-policy/privacity-policy.component';

const APP_ROUTES: Routes = [
    { path: '', component: ResumeComponent },
    { path: 'cookies-policy', component: CookiesPolicyComponent },
    { path: 'privacity-policy', component: PrivacityPolicyComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(APP_ROUTES) ],
    exports: [ RouterModule ],
    providers: []
})

export class AppRoutingModule { }
