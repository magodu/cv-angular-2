import {Directive} from 'angular2/core';
import {ElementRef} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Renderer} from 'angular2/core';

@Directive({
	selector: '[parallax]',
	inputs: [],
	host: {}
})


export class ParallaxDirective {
	/*private windowWidth = $(window).width(); */
	const MOBILE_WIDTH = 760;
	private FixedHeader;

	constructor(private _elRef: ElementRef, private _renderer: Renderer) { }

}
