import { Routes, RouterModule } from "@angular/router";

import { ResumeComponent } from "./resume-cv/resume.component";

const APP_ROUTES: Routes = [
    { path: '', component: ResumeComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);