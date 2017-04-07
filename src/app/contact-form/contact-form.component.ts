import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { Message } from './message';
import { ResumeService } from '../resume-cv/resume.service';
import { ContactFormService } from './contact-form.service';


@Component({
    selector: 'contact-form',
    templateUrl: 'contact-form.component.html',
    styleUrls: ['contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

    subscription: Subscription;
    contactForm: FormGroup;
    emailData: Message;
    isLoading: boolean = false;
    messageSent: boolean = false;
    messageSentError: boolean = false;


    constructor(private _resumeService: ResumeService,
                private _contactFormService: ContactFormService,
                private formBuilder: FormBuilder,
                private _translate: TranslateService) {}


    ngOnInit() {
        this.initForm();

        this.subscription = this._resumeService.resetFormEv$.subscribe(
            (reset: boolean) => {
                this.messageSent = reset;
                this.messageSentError = false;
            }
        );
    }


    private toggleDisableForm(isDisabled: boolean) {
        for (let field in this.contactForm.controls) {
            if(isDisabled) {
                this.contactForm.get(field).disable();
            } else {
                this.contactForm.get(field).enable();
            }
        }
    }

    private initForm() {
        const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        let name = '';
        let email = '';
        let message = '';

        this.contactForm = this.formBuilder.group({
            'name': [name, Validators.required],
            'email': [email, [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
            'message': [message, Validators.required]
        });

        this.toggleDisableForm(false);
    }

    sendEmailResult() {
        this.isLoading = false;
        this.messageSent = true;
        this.messageSentError = false;
        this.initForm();
    }


    sendEmail() {
        this.isLoading = true;
        this.toggleDisableForm(true);
        this.emailData = this.contactForm.value;

        let data: Object = {
            name: this.emailData.name,
            message:  this.emailData.message.replace(/\n/g, '<br>'),
            email:  this.emailData.email,
            subject: 'Mensaje desde curriculum online',
        }

        this._contactFormService.sendEmail(data).subscribe(
            data => { 
                this.sendEmailResult();
            },       
            err => {
                this.isLoading = false;
                this.messageSentError = true;
                console.error(err);
            },                  
            () => console.log('Message sent')
        );
    }

}
