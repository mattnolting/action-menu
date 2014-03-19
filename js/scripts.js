$(document).ready(function () {
	"use strict";

	var submenu = '#sub-menu',
		submenu_li = '#sub-menu li',
		toggle_actions = '#toggle-actions',
		actions_menu_nav = '#actions-menu-nav',
		actions_menu_nav_li = '#actions-menu-nav li';


	// Close Menu function
	function closeUpShop() {
		if ($(actions_menu_nav).hasClass('active')) {
			$(actions_menu_nav_li).removeClass('active-sub');
			$(submenu).slideUp(250, 'linear', function () {
				$(toggle_actions).add(actions_menu_nav).removeClass('active');
			});
		}
	}


	// Open menu on toggle click
	$(toggle_actions).click(function () {
		// If the toggle button is 'active,' remove the active-sub styling and close menu
		if($(this).hasClass('active') && $(submenu_li).removeClass('active-sub')) {
			$(actions_menu_nav_li).removeClass('active-sub');
			$(submenu).slideUp(250, 'linear', function () {
				$(toggle_actions).add(actions_menu_nav).removeClass('active');
			});
		} else {
			$(toggle_actions).add(actions_menu_nav).addClass('active');
		}
	});


	// Open sub menu on icon click
	$(actions_menu_nav_li).click(function () {
		// Define variables
		var rel = $(this).attr('rel');
		var current = submenu + ' li[rel=' + rel + ']';

		// if the sub-menu is active/visible
		if($(this).hasClass('active-sub')) {
			$(this).removeClass('active-sub');
			$(submenu).slideUp('fast', 'linear');
		} else {
			$(this).addClass('active-sub');
			$(submenu).slideUp(250, 'linear', function () {
				$(submenu_li).not(current).hide(0, function () {
				$(current).show();
					$(submenu).slideDown(250, 'linear');
				});
			});
		}

		$(actions_menu_nav_li).not(this).removeClass('active-sub');
	});


	// ESC event listener
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			closeUpShop();
		}
	});


	// Document click event listener
	$('html').click(function() {
		closeUpShop();
	});
	$('#actions-menu').click(function(event){
		event.stopPropagation();
	});

});

