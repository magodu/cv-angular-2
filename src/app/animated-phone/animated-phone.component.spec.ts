import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { AnimatedPhoneComponent } from './animated-phone.component';


describe('BannerComponent (inline template)', () => {

    let comp:    AnimatedPhoneComponent;
    let fixture: ComponentFixture<AnimatedPhoneComponent>;
    let phoneEl: HTMLElement;

    let expectedNumber: string;

    beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [ AnimatedPhoneComponent ], // declare the test component
        });

        fixture = TestBed.createComponent(AnimatedPhoneComponent);
        comp = fixture.componentInstance;
        const phoneDataMock = ['+1 (555) 930-9154'];

        comp.phoneData = phoneDataMock;
       
        fixture.detectChanges(); // trigger initial data binding

        this.phoneEl = fixture.debugElement.query(By.css('.phone-number'));

        expectedNumber = phoneDataMock[0];
        
     });


    it('should display the phones in phoneData var content', () => {
        expect(this.phoneEl.nativeElement.textContent).toContain(expectedNumber);
    });
});