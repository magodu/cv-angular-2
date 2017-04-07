//// <reference path="../../../node_modules/@types/gapi/index.d.ts" />

import { Component, OnInit} from '@angular/core';
//import 'rxjs/add/operator/toPromise';
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



//declare var gapi: any;



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


    //private clientId = '89071364240-5n1dh927g2mda84dv674ve3keqhaj2ff.apps.googleusercontent.com';
    //private apiKey = 'AIzaSyD-xSxeguqtWK4kNUrDTTU0gsNK0iXIYK4';
    //private clientId = '726362529687-8m2tmovrp07ght96j9h46jm5m891i8ue.apps.googleusercontent.com';
    //private apiKey = 'AIzaSyCsK7TT6qM0JiQCWre8yo-mJA88pWZ9zD8';
    //private scopes = 'https://www.googleapis.com/auth/gmail.send';


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

        /*if (!(gapi && gapi.client && gapi.auth)) {
            this.getGmailAuth();
        } else {
            this.sendMessage(
                {
                'To': 'magodu.pral@gmail.com',
                'Subject': 'Mensaje desde curriculum online'
                },
                this.composeMessage(),
                this.sendEmailResult
            );
        }*/
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


    /*sendMessage(headers_obj, message, callback) {
        let email = '';

        for (let header in headers_obj) {
            email += header += ': ' + headers_obj[header] + '\r\n';
        }

        email += "\r\n" + message;

        let sendRequest = gapi.client.gmail.users.messages.send({
            'userId': 'me',
            'resource': {
                'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
                       
            }
        });
        console.log('Sending Message...');
        return sendRequest.execute(callback.bind(this));
    };


    composeMessage() {
        return 'Mensaje de: ' + this.emailData.name + '\nEmail: ' + this.emailData.email + ' \n\nMensaje:\n\n ' +  this.emailData.message;
    }

    handleAuthResult(authResult) {
        var _self = this;

        if (authResult && !authResult.error) {

            gapi.client.load('gmail', 'v1').then(function() {
                console.log('Gmail loaded');
                _self.sendMessage(
                    {
                    'To': 'magodu.pral@gmail.com',
                    'Subject': 'Mensaje desde curriculum online'
                    },
                    _self.composeMessage(),
                    _self.sendEmailResult
                );  
            });

        } else {
            // Error
            this.zone.run(() => {
                this.isLoading = false;
                this.messageSentError = true;
            });
            this.initForm();
            gapi.auth.authorize({
                client_id: this.clientId,
                scope: this.scopes,
                immediate: false
            }, this.handleAuthResult.bind(this));
        }
    };

    checkAuth(gapi) {
        gapi.auth.authorize({
            client_id: this.clientId,
            scope: this.scopes,
            immediate: true
        }, this.handleAuthResult.bind(this));
    };

    handleClientLoad(gapi) {
        gapi.client.setApiKey(this.apiKey);
    };


    loadClient(): Promise<any> {
        return new Promise(resolve => {
            gapi.load('client', resolve);
        });
    };


    getGmailAuth() {
        var _self = this;

        this.loadClient().then(function() {
            console.log('Google Client loaded');
            _self.handleClientLoad(gapi);
            _self.checkAuth(gapi);
        });
    };*/

    
    
}
