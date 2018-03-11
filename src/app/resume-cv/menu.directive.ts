import { Directive, HostBinding, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Directive({
    selector: '[menu]'
})
export class MenuDirective {

    sectionTop: number = null;
    windowWidth: number = 0;
    isAnimationblocked: boolean = false;


    constructor(@Inject(DOCUMENT) private document: any) {
        this.windowWidth =  document.querySelector('body').clientWidth;
    }

    toggleMobileMenu() {
        let menu: Element = document.querySelector('#main-nav');
        menu.classList.toggle('show-menu');
    }

    private hideDotLabels() {
        let dotLabels = document.querySelectorAll('#dots li h1');

        for (let i = 0; i < dotLabels.length; i++) {
            dotLabels[i].classList.remove('hover');
        }
    }

    changeSection(value: string) {

        if (this.isAnimationblocked) {
            return;
        }

        this.hideDotLabels();

        this.sectionTop = jQuery('#' + value).offset().top;
        //const elem: Element = this.detectIEFirefox() ? this.document.documentElement : document.body;
        const elem: Element = this.document.documentElement;

        const scroll: number = this.document.documentElement.scrollTop || document.body.scrollTop;
        const speed: number = 1 / 1000;

        if (value === 'header') {
            this.sectionTop = 0;
        }

        this.hideMenu(this.windowWidth);
        this.isAnimationblocked = true;

        this.scrollToX(elem, scroll, this.sectionTop, 0, speed, 20, this.easeOutQuad);

    }
    
    private hideMenu(windowWidth: number) {
        const mobileWidth: number = 760;
        let menu: Element = document.querySelector('#main-nav');

        if (windowWidth <= mobileWidth) {  
            menu.classList.remove('show-menu');
        }
    }

    private scrollToX(element: any, xFrom: number, xTo: number, t01: number, speed: number, step: number, motion: Function) {
        let _this: any = this;

        if (t01 < 0 || t01 > 1 || speed <= 0) {
            element.scrollTop = xTo;
            this.isAnimationblocked = false;
            return;
        }
        element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
        t01 += speed * step;
        
        setTimeout(function() {
            _this.scrollToX(element, xFrom, xTo, t01, speed, step, motion);
        }, step);
    }


    private easeOutQuad(t: number) {
        return -t*(t-2);
    }

    // Other animation functions
    
    /*
    private easeOutCuaic(t: number){
        t--;
        return t*t*t+1;
    }

    private easeOutCirc(t: number){
        t--;
        return Math.sqrt(1-t*t);
    }

    private linearTween(t: number){
        return t;
    }

    private easeOutExpo(t: number){
        return -Math.pow(2,-10*t)+1;
    }

    private easeInQuad(t: number){
        return t*t;
    }

    private easeOutQuart(t: number){
        t--;
        return -(t*t*t*t-1);
    }

    */


    private detectIEFirefox() {
        let ua = window.navigator.userAgent;
        let isIE: boolean = false;
        let isFirefox: boolean = false;


        if (ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0) {
            isIE = true;
        } else if(ua.indexOf('Firefox') > 0) {
            isFirefox = true;
        }

        return isIE || isFirefox;
    }

}
