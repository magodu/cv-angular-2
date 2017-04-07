/* Deprecated  */

/* 

import { ElementRef, HostListener, Directive, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ResumeService } from './resume.service';


@Directive({
    selector: '[track-scroll]'
})
export class TrackScrollDirective {

    MOBILE_WIDTH: number = 0;
    windowWidth: number = 0; 

    experienceSection: HTMLElement;
    experienceSectionTop: number = null;

    skillsSection: HTMLElement;
    skillsSectionTop: number = null;

    trainingSection: HTMLElement;
    trainingSectionTop: number = null;

    languagesSection: HTMLElement;
    languagesSectionTop: number = null;


    constructor(@Inject(DOCUMENT) private document: Document,
        private _elRef: ElementRef,
        private _resumeService: ResumeService) {

        this.MOBILE_WIDTH = 760;
        this.windowWidth = jQuery(window).width();
    }


    @HostListener(' window:scroll', ['$event']) onScroll($event: Event) {
        const headerHeigth: number = 769; 
        const scrollPosition = this.document.documentElement.scrollTop || document.body.scrollTop;
        const offsetTop = this._elRef.nativeElement.offsetTop;
        const height: number = this._elRef.nativeElement.clientHeight;
        const menuBarHeight: number = document.querySelector('.main-nav').clientHeight;
        let sectionTop: number = offsetTop + headerHeigth;

        if (scrollPosition <= headerHeigth - menuBarHeight) {
            if (this._elRef.nativeElement.attributes['id'].value === 'header') {
                document.querySelector('#nav-bar').classList.remove('fixed-nav-bar');
                document.querySelector('body').classList.remove('fixed-header-on');
                this._resumeService.sendScrollEvent(this._elRef.nativeElement.attributes['id'].value);
                this.photographHandler(scrollPosition, this.experienceSectionTop, false);
                this.resetValues();
            }
        } else {

            this.experienceSection =  document.getElementById('skills');
            this.experienceSectionTop = jQuery('#skills').offset().top + headerHeigth; //this.experienceSection.offsetTop + headerHeigth;

            this.skillsSection =  document.getElementById('training');
            this.skillsSectionTop = jQuery('#training').offset().top + headerHeigth; //this.skillsSection.offsetTop + headerHeigth;

            this.trainingSection = document.getElementById('languages');
            this.trainingSectionTop = jQuery('#languages').offset().top + headerHeigth; //this.trainingSection.offsetTop + headerHeigth;

            this.languagesSection = document.getElementById('contact');
            this.languagesSectionTop = jQuery('#contact').offset().top + headerHeigth; //this.languagesSection.offsetTop + headerHeigth;


            document.querySelector('#nav-bar').classList.add('fixed-nav-bar');
            document.querySelector('body').classList.add('fixed-header-on');

            if ((this._elRef.nativeElement.attributes['id'].value === 'experience') && (scrollPosition >= sectionTop) && (scrollPosition < this.experienceSectionTop)) {
               
                this.photographHandler(scrollPosition, this.experienceSectionTop, true);
                this._resumeService.sendScrollEvent(this._elRef.nativeElement.attributes['id'].value);
               
            } else  if ((this._elRef.nativeElement.attributes['id'].value === 'skills') && (scrollPosition >= sectionTop) && (scrollPosition < this.skillsSectionTop)) {
                this._resumeService.sendScrollEvent(this._elRef.nativeElement.attributes['id'].value);
                this.skillsHandler();
                this.photographHandler(scrollPosition, this.experienceSectionTop, false);
               
            } else  if ((this._elRef.nativeElement.attributes['id'].value === 'training') && (scrollPosition >= sectionTop) && (scrollPosition < this.trainingSectionTop)) {
                this._resumeService.sendScrollEvent(this._elRef.nativeElement.attributes['id'].value);
                this.photographHandler(scrollPosition, this.experienceSectionTop, false); 
               
            } else if  ((this._elRef.nativeElement.attributes['id'].value === 'languages') && (scrollPosition >= sectionTop) && (scrollPosition < this.languagesSectionTop)) {
                this._resumeService.sendScrollEvent(this._elRef.nativeElement.attributes['id'].value);
                this.languagesHandler();
                this.photographHandler(scrollPosition, this.experienceSectionTop, false);

            } else if  ((this._elRef.nativeElement.attributes['id'].value === 'contact') && (scrollPosition >= sectionTop)) {
                this._resumeService.sendScrollEvent(this._elRef.nativeElement.attributes['id'].value);
                this.photographHandler(scrollPosition, this.experienceSectionTop, false);
            }
        }
    }


    private resetValues() {
        let i: number;
        let progressBars: any;
        progressBars = document.querySelectorAll('.progress-bar');
        for (i = 0; i < progressBars.length; i++) {
            progressBars[i].style.width = '0%';
        }
    }

    private skillsHandler() {
        let i: number;
        let skillsProgressBars: any;

        skillsProgressBars = document.querySelectorAll('.skills-section .progress-bar');
        for (i = 0; i < skillsProgressBars.length; i++) {
            skillsProgressBars[i].style.width = skillsProgressBars[i].querySelector('span').innerText;
        }
    }

    private languagesHandler() {
        let i: number;
        let languagesProgressBars: any;

        languagesProgressBars = document.querySelectorAll('.languages-section .progress-bar');
        for (i = 0; i < languagesProgressBars.length; i++) {
            languagesProgressBars[i].style.width = languagesProgressBars[i].querySelector('span').innerText;
        }
    }

    private photographHandler(scrollPosition: number, begin: number, active: boolean) {
        let photograph: HTMLElement = document.getElementById('photograph'),
            photographImage: any = document.querySelector('#photograph img'),
            startPhotograph = 0,
            endPhotograph = begin - 350;

        if (this.windowWidth <= this.MOBILE_WIDTH) {
            return;
        }

        if (active && photograph.classList.contains('photograph')) {
            photograph.style.visibility = 'visible';
            photograph.classList.remove('photograph');
            photograph.classList.add('photographFixed');

        } else if (!active && photograph.classList.contains('photographFixed')) {
            photograph.classList.remove('photographFixed');
            photograph.classList.add('photograph');
        }

        if ((scrollPosition >= startPhotograph) && (scrollPosition <= endPhotograph)) {
           
            photographImage.classList.add('fade-in');
            photographImage.classList.remove('fade-out');
        } else {

            photographImage.classList.add('fade-out');
            photographImage.classList.remove('fade-in');
        }
    }

}
*/