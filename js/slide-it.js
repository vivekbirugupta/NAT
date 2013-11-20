/**
 * Created by chbymnky on 11/10/13.
 */

// create slideshow functionality for nat
function slideshow($slideContIn, intervalIn) {
	this.$slideCont = $slideContIn;
	this.$slides = this.$slideCont.children();
	this.$imgs = this.$slideCont.find('img');
	this.$thmbCont = $('<div class="slide-thumb-cont"></div>');
	this.sWidth = this.$slides.width();
	this.sHeight = this.$slides.height();
	this.interval = intervalIn;
	this.intervalID = null;

	this.initiate();
}

slideshow.prototype = {
	initiate: function() {
		// constrict the slideshow container for visual congruency
		this.$slideCont.width(this.sWidth)
				.height(this.sHeight)
				.css('postion', 'relative');
		// position all slides for transition effect
		this.$slides.css('position', 'absolute');

		// mark first slide as the active slide and hide the rest
		$(this.$slides[0]).addClass('is-active').show().siblings().hide();

		// create individual thumbnails for the carousel
		this.$thmbCont.insertAfter(this.$slideCont);
		this.createThmbs();
		this.resume();
	},
	transSlide: function($inSlidesCont, $inThumbsCont) {
		var $slides = $inSlidesCont.children(),
				$thumbs = $inThumbsCont.children(),
				activeIndex = $slides.filter('.is-active').index(),
				activeThmb = $thumbs.filter('.is-active').index(),
				maxSlides = $slides.length;

		// change active slide index the next slide
		if (activeIndex !== activeThmb) {
			activeIndex = activeThmb;
		}
		else if (activeIndex < (maxSlides - 1)) {
			activeIndex = activeIndex + 1;
		}
		else {
			activeIndex = 0;
		}

		// alter active slide based on new index
		$slides.removeClass('is-active').eq(activeIndex).addClass('is-active');
		$slides.fadeOut().filter('.is-active').fadeIn();
		$thumbs.removeClass('is-active').eq(activeIndex).addClass('is-active');

		// halting slideshow functionality
		/*$slides.bind('mouseover', { slct: this }, function () {
			console.log(event.data.slct);
			//event.data.slct.pause;
		});
		$slides.bind('mouseout', { slct: this }, function () {
			console.log(event.data.slct);
			//event.data.slct.resume;
		});*/
	},
	createThmbs: function () {
		// place HTML markup for each thumbnail in the carousel
		for (var i = 0; i < this.$slides.length; i++) {
			this.$thmbCont.append('<div class="slide-thumb-item left" data-num="' + [i] + '">' +
					'<img src="' + this.$imgs[i].src + '">' +
					'</dvi>');
		}

		// set active thumbnail and bind click event to all
		this.$thmbCont.children()
				.eq(0)
				.addClass('is-active');
	},
	transThmb: function (thmbIndex) {
		var $thmbs = this.$thmbCont.children();
		$thmbs.removeClass('is-active').eq(thmbIndex).addClass('is-active');
		this.pause();
		this.transSlide(this.$slideCont, this.$thmbCont);
		this.resume();
	},
	pause: function () {
		clearInterval(this.intervalID);
	},
	resume: function () {
		var $slideCont = this.$slideCont,
				$thmbCont = this.$thmbCont,
				transSlide = this.transSlide;
		this.intervalID = setInterval(function () {
			transSlide($slideCont, $thmbCont);
		}, this.interval);
	}
};

var $slideshowSlct = $('.slideshow'),
		slideIt = new slideshow($slideshowSlct, 2000);


// change active class for thumbnails
var thmbs = $('.slide-thumb-item');
thmbs.bind('click', function () {
	var elm = $(this),
			elmIndex = elm.index();

	//elm.addClass('is-active').siblings().removeClass('is-active');
	slideIt.transThmb(elmIndex);
});