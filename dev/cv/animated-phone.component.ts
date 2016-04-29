import {Component, Input} from 'angular2/core';

@Component({
	selector: 'animated-phone',
	template:`
		<div class="phone_container" id="flip-toggle" [ngClass]="{hover: phoneDivOpened}">
	        <div class="phone_card">
		        <div class="front"></div>
		        <div class="back">
		        	<div id="phone-wrapper">
		        		<div class="phone-number" *ngFor="#phone of phoneData">{{phone}}</div>
		        	</div>
		        </div>
	        </div>
        </div>
	`
})

export class AnimatedPhoneComponent {
	@Input() phoneDivOpened = false;
	@Input() phoneData;

}