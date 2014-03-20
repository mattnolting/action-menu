/*global define, console, document, window */

define('action-menu', ['jquery'], function ($) {
	"use strict";
	var private_functions = {},
		template = "",
		public_functions = {};

	private_functions.build_menu = function (id) {
		var action_menu = {};

		action_menu.menu = $('<menu class="actions-menu">');
		action_menu.button = $('<button class="btn-actions"><span class="icon-cog"></span></button>');
		action_menu.nav = $('<ul class="actions-menu-nav">');
		action_menu.submenu = $('<ul class="sub-menu">');

		action_menu.menu.attr('id', id);
		action_menu.button.attr('id', id + "-toggle-actions");
		action_menu.nav.attr('id', id + "-nav");
		action_menu.submenu.attr('id', id + "-submenu");

		action_menu.menu.append(action_menu.button);
		action_menu.menu.append(action_menu.nav);
		action_menu.menu.append(action_menu.submenu);

		action_menu.addWidget = private_functions.addWidget;
		action_menu.expose = private_functions.expose;

		return action_menu;
	};

	// Close Menu function
	private_functions.closeUpShop = function (action_menu) {
		if (action_menu.nav.hasClass('active')) {
			action_menu.nav.find('li').removeClass('active-sub');
			action_menu.submenu.slideUp(250, 'linear', function () {
				action_menu.button.add(action_menu.nav).removeClass('active');
			});
		}
	};

	public_functions.generateMenu = function (id) {
		return private_functions.build_menu(id);
	};

	private_functions.addWidget = function (widget) {
		var action_menu = this;
		action_menu.nav.prepend('<li rel="' + widget.name + '"><a class="toggle"><span class="' + widget.style + '"></span></a></li>');
		action_menu.submenu.prepend('<li rel="' + widget.name + '" class="' + widget.name + '"><div class="cell">' + widget.submenu() + '</div></li>');
	};

	private_functions.expose = function (selector) {
		var action_menu = this;
		$(selector).prepend(action_menu.menu);
		// Open menu on toggle click
		action_menu.button.click(function () {
			// If the toggle button is 'active,' remove the active-sub styling and close menu
			if ($(this).hasClass('active') && action_menu.submenu.find('li').removeClass('active-sub')) {
				action_menu.nav.find('li').removeClass('active-sub');
				action_menu.submenu.slideUp(250, 'linear', function () {
					action_menu.button.add(action_menu.nav).removeClass('active');
				});
			} else {
				action_menu.button.add(action_menu.nav).addClass('active');
			}
		});


		// Open sub menu on icon click
		action_menu.nav.find('li').click(function () {
			// Define variables
			var rel = $(this).attr('rel'),
				current = action_menu.submenu.find('li[rel=' + rel + ']');

			// if the sub-menu is active/visible
			if ($(this).hasClass('active-sub')) {
				$(this).removeClass('active-sub');
				action_menu.submenu.slideUp('fast', 'linear');
			} else {
				$(this).addClass('active-sub');

				if (action_menu.submenu.find('li').length === 1) {
					current.show();
					action_menu.submenu.slideDown(250, 'linear');
				} else {
					action_menu.submenu.slideUp(250, 'linear', function () {
						action_menu.submenu.find('li').not(current).hide(0, function () {
							current.show();
							action_menu.submenu.slideDown(250, 'linear');
						});
					});
				}
			}

			action_menu.nav.find('li').not(this).removeClass('active-sub');
		});

		// ESC event listener
		$(document).keyup(function (e) {
			if (e.keyCode === 27) {
				private_functions.closeUpShop(action_menu);
			}
		});

		// Document click event listener
		$('html').click(function () {
			private_functions.closeUpShop(action_menu);
		});

		action_menu.menu.click(function (event) {
			event.stopPropagation();
		});

		return action_menu;
	};

	return public_functions;
});