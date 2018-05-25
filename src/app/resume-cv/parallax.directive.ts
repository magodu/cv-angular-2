import { Directive } from '@angular/core';
import { HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ResumeService } from './resume.service';

@Directive({
    selector: '[parallax]'
})
export class ParallaxDirective {
    headerHeight: number = 0;
    MOBILE_WIDTH: number = 0;
    windowWidth: number = 0;


    constructor(@Inject(DOCUMENT) private document: any, private _resumeService: ResumeService) {

        this.MOBILE_WIDTH = 760;
        this.windowWidth = jQuery(window).width();
    }

    @HostListener(' window:scroll', ['$event']) onScroll($event: Event) {
        const scrollPosition: number = this.document.documentElement.scrollTop || document.body.scrollTop;
        this.redrawDotNav(scrollPosition);
    }

    private commonSectionActions(section: string, scrollPosition: number, section2Top: number, section3Top: number) {
        this._resumeService.sendScrollEvent(section);
        this.photographHandler(scrollPosition, section2Top, section3Top, true);
        document.querySelector('#nav-bar').classList.add('fixed-nav-bar');
        document.querySelector('body').classList.add('fixed-header-on');
    }

    // Set navigation dots to an active state as the user scrolls
    private redrawDotNav(scrollPosition: number) {

        const section1Top: number = 0;
        // The top of each section is offset by half the distance to the previous section.
        const section2Top: number = (jQuery('#experience').offset().top) - 1;
        const section3Top: number = (jQuery('#skills').offset().top) - 1;
        const section4Top: number = (jQuery('#training').offset().top) - 1;
        const section5Top: number = (jQuery('#languages').offset().top) - 1;
        const section6Top: number = (jQuery('#contact').offset().top) - 1;
        const menuBarHeight: number = this.windowWidth <= this.MOBILE_WIDTH ? document.querySelector('.clearfix nav').clientHeight : document.querySelector('.main-nav').clientHeight;

        if (scrollPosition < (section2Top - menuBarHeight)) {
            this._resumeService.sendScrollEvent('header');
            document.querySelector('#nav-bar').classList.remove('fixed-nav-bar');
            document.querySelector('body').classList.remove('fixed-header-on');
            this.photographHandler(scrollPosition, section2Top, section3Top, false);
            this.resetValues();

        } else if (scrollPosition >= section2Top - menuBarHeight && scrollPosition < section3Top) {
            this.commonSectionActions('experience', scrollPosition, section2Top, section3Top);

        } else if (scrollPosition >= section3Top && scrollPosition < section4Top) {
            this.commonSectionActions('skills', scrollPosition, section2Top, section3Top);
            this.skillsHandler();

        } else if (scrollPosition >= section4Top && scrollPosition < section5Top) {
            this.commonSectionActions('training', scrollPosition, section2Top, section3Top);

        } else if (scrollPosition >= section5Top && scrollPosition < section6Top) {
            this.commonSectionActions('languages', scrollPosition, section2Top, section3Top);
            this.languagesHandler();

        } else if (scrollPosition >= section6Top) {
            this.commonSectionActions('contact', scrollPosition, section2Top, section3Top);
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

    private photographHandler(scrollPosition: number, begin: number, end: number, active: boolean) {
        let photograph: HTMLElement = document.getElementById('photograph'),
            photographImage: any = document.querySelector('#photograph img'),
            startPhotograph =  begin / 5,
            endPhotograph =  end - (begin / 3);


        if (this.windowWidth <= this.MOBILE_WIDTH) {
            return;
        }

        if (active && photograph.classList.contains('photograph')) {
            photograph.style.visibility = 'visible';
            photograph.classList.remove('photograph');
            photograph.classList.add('photograph-fixed');

        } else if (!active && photograph.classList.contains('photograph-fixed')) {
            photograph.classList.remove('photograph-fixed');
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
