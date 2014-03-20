Action Menu
===========

A pluggable menu system to house page actions. AMD/require ready!

##Usage
~~~
 require(['action-menu'], function (action_menu) {

	 // Generate a menu object
	 var menu = action_menu.generateMenu('some_id');


	 // Add a few widgets
	 menu.addWidget({
		 name: 'rate',
		 style: 'icon-thumbs-up',
		 submenu: function () {
			 return 'this is the rate content widget';
		 }
	 });

	 menu.addWidget({
		 name: 'comment',
		 style: 'icon-comment',
		 submenu: function () {
			 return '<form><label for="comment">Leave a Comment</label><br /><textarea name="comment"></textarea><button class="btn" type="submit">Submit</button></form>';
		 }
	 });

	 menu.addWidget({
		 name: 'follow',
		 style: 'icon-plus',
		 submenu: function () {
			 return 'this is the follow content widget';
		 }
	 });

	 // Expose the menu on the page
	 menu.expose('body');
 });
~~~