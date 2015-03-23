define(['knockout', 'text!./sidebar.html'], function(ko, template) {

  function SideBar(params) {
    this.route = params.route;
  }

  SideBar.prototype.isHome = function(){
    return this.route().page === 'home';
  };

  return { viewModel: SideBar, template: template };
});
