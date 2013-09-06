var prefix = "tab_";
var had;
var run = false;
$(function () {
	var hash = document.location.hash;
	if (hash) {
    	$('.nav-tabs a[href='+hash.replace(prefix,"")+']').tab('show');
	}
});

$('.nav-tabs a').on('shown', function (e) {
	if(!run && e.target.hash == "#tab2")
	{
		window.location.hash = e.target.hash.replace("#", "#" + prefix);
		graphsInit();
		run = true;
	}
	else {
		window.location.hash = e.target.hash.replace("#", "#" + prefix);
	}
})

jQuery('ul.nav li.dropdown').hover(function() {
  jQuery(this).find('.dropdown-menu').stop(true, true).show();
  jQuery(this).addClass('open');
  had = jQuery(this).hasClass('active');
  jQuery(this).removeClass('active');
}, function() {
  jQuery(this).find('.dropdown-menu').stop(true, true).hide();
  jQuery(this).removeClass('open');
  if(had)
  	jQuery(this).addClass('active');
});
