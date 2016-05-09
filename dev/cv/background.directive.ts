import {Directive, OnInit} from 'angular2/core';
import {ElementRef} from 'angular2/core';
import {Renderer} from 'angular2/core';

@Directive({
	selector: '[background]'
})


export class BackgroundDirective implements OnInit {

	constructor(private _elRef: ElementRef, private _renderer: Renderer) {}

	ngOnInit() {
		const urlBase = '../../images/';
		const images = ['background1.jpg', 'background2.png', 'background4.jpg'];
		let num = Math.floor(Math.random() * images.length);
		let randomImage = images[num];
		let	backgroundImage = urlBase + randomImage;

		this._renderer.setElementStyle(this._elRef.nativeElement, 'background-image', 'url("' + backgroundImage + '")');

}