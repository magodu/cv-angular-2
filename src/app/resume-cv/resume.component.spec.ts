/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { ResumeComponent } from './resume.component';


describe('ResumeComponent', () => {
    let comp:    ResumeComponent;
    let fixture: ComponentFixture<ResumeComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;


    beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [
            ResumeComponent
          ],
        });
        TestBed.compileComponents();
    });

    it('true is true', () => expect(true).toBe(true));

});
