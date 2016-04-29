import {Component, OnInit} from 'angular2/core';

@Component({
	selector: 'animated-phone',
	template:`
		<div class="phone_container" id="flip-toggle">
	        <div class="phone_card">
		        <div class="front"></div>
		        <div class="back">
		        	<div id="phone-wrapper"></div>
		        </div>
	        </div>
        </div>
	`
})


export class AnimatedPhoneComponent implements OnInit {


	ngOnInit() {
		console.log('AnimatedPhoneComponent ngOnInit');
	}
}