$(document).ready(function() {
    const fYear = document.querySelector('.fullyear');
    fYear.innerHTML = new Date().getFullYear();
    const nav = document.querySelector('.nav');
    let topOfNav = nav.offsetTop;
    const hamburgerBtn = document.querySelector('.hamburger');

    function sticky() {

        if (window.scrollY >= topOfNav) {
            nav.classList.add('sticky');
            document.body.style.paddingTop = nav.clientHeight + "px"
        } else {
            nav.classList.remove('sticky');
            document.body.style.paddingTop = "0px";
        }

    }
    window.addEventListener('scroll', sticky);

    hamburgerBtn.addEventListener('click', function() {
        nav.classList.toggle('openNav');
    });

    //   $(window).scroll(function() {
    //     if ($(window).scrollTop() > amountScrolled) {
    //         $('.social-icons').fadeIn('100');
    //     } else {
    //         $('.social-icons').fadeOut('100');
    //     }
    // });
    //   $('#topReturn').click(function() {
    //     $('html, body').animate({
    //         scrollTop: 0
    //     }, 700);
    //     return false;
    // });

    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 75
            }, 400);
        }
    });
    let $slider = $(".slider"),
        $slideBGs = $(".slide__bg"),
        diff = 0,
        curSlide = 0,
        numOfSlides = $(".slide").length - 1,
        animating = false,
        animTime = 500,
        autoSlideTimeout,
        autoSlideDelay = 7000,
        $pagination = $(".slider-pagi");

    function createBullets() {
        for (let i = 0; i < numOfSlides + 1; i++) {
            let $li = $("<li class='slider-pagi__elem'></li>");
            $li.addClass("slider-pagi__elem-" + i).data("page", i);
            if (!i) $li.addClass("active");
            $pagination.append($li);
        }
    };

    createBullets();

    function manageControls() {
        $(".slider-control").removeClass("inactive");
        if (!curSlide) $(".slider-control.left").addClass("inactive");
        if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
    };

    function autoSlide() {
        autoSlideTimeout = setTimeout(function() {
            curSlide++;
            if (curSlide > numOfSlides) curSlide = 0;
            changeSlides();
        }, autoSlideDelay);
    };

    autoSlide();

    function changeSlides(instant) {
        if (!instant) {
            animating = true;
            manageControls();
            $slider.addClass("animating");
            $slider.css("top");
            $(".slide").removeClass("active");
            $(".slide-" + curSlide).addClass("active");
            setTimeout(function() {
                $slider.removeClass("animating");
                animating = false;
            }, animTime);
        }
        clearTimeout(autoSlideTimeout);
        $(".slider-pagi__elem").removeClass("active");
        $(".slider-pagi__elem-" + curSlide).addClass("active");
        $slider.css("transform", "translate3d(" + -curSlide * 100 + "%,0,0)");
        $slideBGs.css("transform", "translate3d(" + curSlide * 50 + "%,0,0)");
        diff = 0;
        autoSlide();
    }

    function navigateLeft() {
        if (animating) return;
        if (curSlide > 0) curSlide--;
        changeSlides();
    }

    function navigateRight() {
        if (animating) return;
        if (curSlide < numOfSlides) curSlide++;
        changeSlides();
    }

    $(document).on("mousedown touchstart", ".slider", function(e) {
        if (animating) return;
        clearTimeout(autoSlideTimeout);
        let startX = e.pageX || e.originalEvent.touches[0].pageX,
            winW = $(window).width();
        diff = 0;

        $(document).on("mousemove touchmove", function(e) {
            var x = e.pageX || e.originalEvent.touches[0].pageX;
            diff = (startX - x) / winW * 70;
            if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
            $slider.css("transform", "translate3d(" + (-curSlide * 100 - diff) + "%,0,0)");
            $slideBGs.css("transform", "translate3d(" + (curSlide * 50 + diff / 2) + "%,0,0)");
        });
    });

    $(document).on("mouseup touchend", function(e) {
        $(document).off("mousemove touchmove");
        if (animating) return;
        if (!diff) {
            changeSlides(true);
            return;
        }
        if (diff > -8 && diff < 8) {
            changeSlides();
            return;
        }
        if (diff <= -8) {
            navigateLeft();
        }
        if (diff >= 8) {
            navigateRight();
        }
    });

    $(document).on("click", ".slider-control", function() {
        if ($(this).hasClass("left")) {
            navigateLeft();
        } else {
            navigateRight();
        }
    });

    $(document).on("click", ".slider-pagi__elem", function() {
        curSlide = $(this).data("page");
        changeSlides();
    });

});

(function countdown() {

    // Make extra fix to make it work on ios
    let launch_date = "2021-12-31 0:00:00";
    const t = launch_date.split(/[- :]/);
    const d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
    launch_date = new Date(d);

    const now = new Date();

    let days;
    let hours;
    let minutes;
    let seconds;
    let rest;

    seconds = rest = Math.floor(((launch_date.getTime() - now.getTime()) / 1000));

    days = zero(Math.floor(seconds / 86400));
    seconds -= days * 86400;

    hours = zero(Math.floor(seconds / 3600));
    seconds -= hours * 3600;

    minutes = zero(Math.floor(seconds / 60));
    seconds -= minutes * 60;

    seconds = zero(Math.floor(seconds));

    function zero(n) {
        return (n < 10 ? '0' : false) + n;
    }

    rest <= 0 ? days = hours = minutes = seconds = '00' : setTimeout(countdown, 1000);
    document.getElementById('countdown').innerHTML =
        '<li><div><span>' + days + '</span>day' + (days > 1 ? 's' : '') + '</div></li>' +
        '<li><div><span>' + hours + '</span>hour' + (hours > 1 ? 's' : '') + '</div></li>' +
        '<li><div><span>' + minutes + '</span>min' + (minutes > 1 ? 's' : '') + '</div></li>' +
        '<li><div><span class="secs">' + seconds + '</span>sec' + (seconds > 1 ? 's' : '') + '</div></li>';
})();