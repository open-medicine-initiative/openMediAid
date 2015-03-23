
define(['jquery',
  'knockout',
  './router',
  'knockout-punches',
  'bootstrap',
  'knockout-projections',
  'adminLTE'] , function ( $, ko, router ) {
  var root = (typeof window === "object" && window) || this;
  root.ko = ko; // expose knockout globally

  // Syntactic sugar for template-only component registration
  var template = function(path){
    return {template : { require : path }};
  };

  // All component registration is defined here
  // This function is called after the dom is ready
  var registerComponents = function(){
    // Components packaged as AMD modules:
    ko.components.register( 'nav-bar', { require : 'components/nav-bar/nav-bar' } );
    ko.components.register( 'home-page', { require : 'components/home-page/home' } );
    ko.components.register( 'messagebox', { require : 'components/messagebox/messagebox' } );
    ko.components.register( 'notifications', { require : 'components/notifications/notifications' } );
    ko.components.register( 'tasks', { require : 'components/tasks/tasks' } );
    ko.components.register( 'usermenu', { require : 'components/usermenu/usermenu' } );
    ko.components.register( 'sidebar', { require : 'components/sidebar/sidebar' } );

    // ... Template-only components ( just pointing to a .html file ):
    ko.components.register( 'disclaimer', template('text!snippets/disclaimer.html'));
    ko.components.register( 'top-navigation', template('text!snippets/top-navigation.html'));
    ko.components.register( 'userlist', template('text!components/userlist/userlist.html'));
    ko.components.register( 'chatbox', template('text!components/chatbox/chatbox.html'));
    ko.components.register( 'recently-added', template('text!components/recently-added/recently-added.html'));

    // pages
    ko.components.register( 'home', template('text!pages/home.html'));
    ko.components.register( 'editor', template('text!pages/editor.html'));

    ko.components.register( 'jsoneditor', { require : 'components/jsoneditor/jsoneditor' } );
    ko.components.register( 'node', template("text!components/jsoneditor/jsoneditor.html"));
  };



  $( document ).ready( function () {
    // add components to knockout
    registerComponents();
    // activate the syntax extensions made by punches
    ko.punches.enableAll();
    // Start the application
    ko.applyBindings( { route : router.currentRoute } );
  } );

} );
