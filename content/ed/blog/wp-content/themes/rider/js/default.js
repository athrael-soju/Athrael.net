jQuery(document).ready(function () {
    var stickyHeaderTop = jQuery('.scroll-header').offset().top;
    jQuery(window).scroll(function () {
        if (jQuery(document).width() > 750) {
            if (jQuery(window).scrollTop() > stickyHeaderTop) {
                if (jQuery('body').hasClass('logged-in'))
                    jQuery('.scroll-header').css({position: 'fixed', padding: '15px 0', top: '32px'});
                else
                    jQuery('.scroll-header').css({position: 'fixed', padding: '15px 0', top: '0px'});
            }
            else {
                jQuery('.scroll-header').css({position: 'absolute', top: '0px', padding: '20px 0'});
                jQuery('body > section').css({'padding-top': jQuery('.scroll-header').height() + 90});

            }
        }
    });

    if (window.matchMedia('(max-width: 767px)').matches) {
        if (jQuery('.res-nav-header').is(':visible'))
            jQuery('.scroll-header .social-icon').css({position: 'absolute'});
        else {
            jQuery('.scroll-header .social-icon').css({position: 'relative'});
        }
    }
});
jQuery(document).ready(function (e) {

    if (window.matchMedia('(max-width: 767px)').matches) {
        if (jQuery('.res-nav-header').is(':visible'))
            jQuery('.scroll-header .social-icon').css({position: 'absolute'});
        else {
            jQuery('.scroll-header .social-icon').css({position: 'relative'});
        }
    } 
    
    jQuery(".arrow").on("click", function () {
		
		
        if (jQuery('body').hasClass('logged-in')) {
			jQuery("html, body").animate({scrollTop: jQuery("#myId").offset().top+jQuery('#wpadminbar').height()}, 1e3)                
        }
        else {
            jQuery("html, body").animate({scrollTop: jQuery("#myId").offset().top}, 1e3)
        }
		
		
        
    })
});
