import {Directive, OnInit, AfterContentChecked} from '@angular/core';
import {ElementRef, Renderer} from '@angular/core';

@Directive({
	selector: '[parallax]',
	inputs: [],
	host: {}
})

export class ParallaxDirective implements OnInit, AfterContentChecked {
	headerHeight: number = 0;

	constructor(private _elRef: ElementRef, private _renderer: Renderer) {
		ParallaxDirective.MOBILE_WIDTH = 760;
		ParallaxDirective.windowWidth = jQuery(window).width(); 

		_renderer.listenGlobal('window', 'scroll', (event) => {
			this._onScroll(); // Scroll event handler
		});
	}

	ngOnInit() {
		const _windowWidth = ParallaxDirective.windowWidth;
		const _MOBILE_WIDTH = ParallaxDirective.MOBILE_WIDTH;

		// Main Menu
		jQuery('body #menu-icon').click(function(event) {
			event.preventDefault();
			jQuery('#main-nav').fadeToggle();
			jQuery('#wrapper #top-nav').hide();
			jQuery(this).toggleClass('active');
		});


		// Show/hide dot lav labels on hover
		jQuery('nav#primary a').hover(
			function() {
				jQuery(this).prev('h1').show();
			},
			function() {
				jQuery(this).prev('h1').hide();
			}
		);

		// Next/prev and primary nav btn click handlers
		jQuery('a.main').click(function() {
			hideMenu(_windowWidth, _MOBILE_WIDTH);
			jQuery('html, body').animate({
				scrollTop: 0
			}, 1000, function() { });
			return false;
		});
		jQuery('a.experience').click(function() {
			hideMenu(_windowWidth, _MOBILE_WIDTH);
			jQuery('html, body').animate({
				scrollTop: jQuery('#experience').offset().top
			}, 1000, function() { });
			return false;
		});
		jQuery('a.skills').click(function() {
			hideMenu(_windowWidth, _MOBILE_WIDTH);
			jQuery('html, body').animate({
				scrollTop: jQuery('#skills').offset().top
			}, 1000, function() { });
			return false;
		});
		jQuery('a.training').click(function() {
			hideMenu(_windowWidth, _MOBILE_WIDTH);
			jQuery('html, body').animate({
				scrollTop: jQuery('#training').offset().top
			}, 1000, function() { });
			return false;
		});
		jQuery('a.languages').click(function() {
			hideMenu(_windowWidth, _MOBILE_WIDTH);
			jQuery('html, body').animate({
				scrollTop: jQuery('#languages').offset().top
			}, 1000, function() { });
			return false;
		});
		jQuery('a.contact').click(function() {
			hideMenu(_windowWidth, _MOBILE_WIDTH);
			jQuery('html, body').animate({
				scrollTop: jQuery('#contact').offset().top
			}, 1000, function() { });
			return false;
		});
	}

	ngAfterContentChecked() {
		this.init();	
    }

	private initFixedHeader() {
		let headerHeight = jQuery('#header hgroup').outerHeight() - jQuery('#nav-bar').outerHeight();

		if (jQuery('body').hasClass('ie')) {
			jQuery('html, body').addClass('iefix');
		}

		jQuery(window).scroll(activateFixedHeader(headerHeight));
	}

	// Set navigation dots to an active state as the user scrolls
	private redrawDotNav() {
		const section1Top = 0;
		// The top of each section is offset by half the distance to the previous section.
		const section2Top = jQuery('#experience').offset().top;
		const section3Top = jQuery('#skills').offset().top;
		const section4Top = jQuery('#training').offset().top;
		const section5Top = jQuery('#languages').offset().top;
		const section6Top = jQuery('#contact').offset().top;

		jQuery('nav#primary a').removeClass('active');
		jQuery('#main-nav li a').removeClass('current-page-item');

		if (jQuery(document).scrollTop() >= section1Top && jQuery(document).scrollTop() <= section1Top) {
			jQuery('nav#primary a.main').addClass('active');
			jQuery('#main-nav li.menu-item-main a').addClass('current-page-item');
		} else if (jQuery(document).scrollTop() >= section2Top && jQuery(document).scrollTop() < section3Top) {
			jQuery('nav#primary a.experience').addClass('active');
			jQuery('#main-nav li.menu-item-experience a').addClass('current-page-item');
		} else if (jQuery(document).scrollTop() >= section3Top && jQuery(document).scrollTop() < section4Top) {
			jQuery('nav#primary a.skills').addClass('active');
			jQuery('#main-nav li.menu-item-skills a').addClass('current-page-item');
		} else if (jQuery(document).scrollTop() >= section4Top && jQuery(document).scrollTop() < section5Top) {
			jQuery('nav#primary a.training').addClass('active');
			jQuery('#main-nav li.menu-item-training a').addClass('current-page-item');
		} else if (jQuery(document).scrollTop() >= section5Top && jQuery(document).scrollTop() < section6Top) {
			jQuery('nav#primary a.languages').addClass('active');
			jQuery('#main-nav li.menu-item-languages a').addClass('current-page-item');
		} else if (jQuery(document).scrollTop() >= section6Top) {
			jQuery('nav#primary a.contact').addClass('active');
			jQuery('#main-nav li.menu-item-contact a').addClass('current-page-item');
		}
	}

	private _onScroll() {
		this.redrawDotNav();
	}

	private init() {
		this.setSectionAbsolutePositions();
		this.redrawDotNav();
		this.initFixedHeader();
	}

	private setSectionAbsolutePositions() {
		const sections = ['experience', 'skills', 'training', 'languages', 'contact'];
		const MARGIN_BOTTOM = 100;
		let totalHeight = 0;
		let height = 0;
		let i = 0;
		let j = 1;

		for (j = 1; j <= sections.length; j++) {
			height = jQuery('#' + sections[i]).outerHeight() + totalHeight + MARGIN_BOTTOM;
			jQuery('#' + sections[j]).css('top', height);
			totalHeight = height;
			i += 1;
		}

		jQuery('body').css('height', totalHeight + jQuery('#header').outerHeight());
	}

}

function hideMenu(windowWidth: number, mobileWidth: number) {
	if (windowWidth <= mobileWidth) {
		jQuery('#main-nav').fadeOut();
		jQuery('#wrapper #top-nav').hide();
		jQuery('body #menu-icon').removeClass('active');
	}
}

function skillsHandler() {
	let section3Top = jQuery('#skills').offset().top,
		_article = jQuery('.skills-section').find('article').find('.progress-bar');

	if (jQuery(document).scrollTop() >= section3Top) {
		_article.each(function() {
			jQuery(this).css('width', jQuery(this).find('span').text());
		});
	}
}

function languagesHandler() {
	let section6Top = jQuery('#languages').offset().top,
		_article = jQuery('.languages-section').find('article').find('.progress-bar');

	if (jQuery(document).scrollTop() >= section6Top) {
		_article.each(function() {
			jQuery(this).css('width', jQuery(this).find('span').text());
		});
	}
}

function photographHandler(scroll: boolean) {
	let _photograph = jQuery('#photograph'),
		_document = jQuery(document),
		startPhotograph = jQuery('#experience').offset().top / 5,
		endPhotograph = jQuery('#skills').offset().top - (jQuery('#experience').offset().top / 3);

	if (ParallaxDirective.windowWidth <= ParallaxDirective.MOBILE_WIDTH) {
		return;
	}

	if (scroll && _photograph.hasClass('photograph')) {
		_photograph.css('visibility', 'visible');
		_photograph.removeClass('photograph');
		_photograph.addClass('photographFixed');

	} else if (!scroll && _photograph.hasClass('photographFixed')) {
		_photograph.removeClass('photographFixed');
		_photograph.addClass('photograph');
	}

	if ((_document.scrollTop() >= startPhotograph) && (_document.scrollTop() <= endPhotograph)) {
		jQuery('#photograph img').addClass('fade-in');
		jQuery('#photograph img').removeClass('fade-out');
	} else {
		jQuery('#photograph img').addClass('fade-out');
		jQuery('#photograph img').removeClass('fade-in');
	}
}

function resetValues() {
	jQuery('article').find('.progress-bar').css('width', '0%');
}

function scrollDisabledFixedHeader() {
	jQuery('#nav-bar').removeClass('fixed-nav-bar');
	jQuery('body').removeClass('fixed-header-on');
	photographHandler(false);
	resetValues();
}

function scrollEnabledFixedHeader() {
	jQuery('#nav-bar').addClass('fixed-nav-bar');
	jQuery('body').addClass('fixed-header-on');
	photographHandler(true);
	skillsHandler();
	languagesHandler();
}

function activateFixedHeader(headerHeight: number) {
	if (jQuery(window).scrollTop() <= headerHeight) {
		scrollDisabledFixedHeader();
	} else {
		scrollEnabledFixedHeader();
	}
}
