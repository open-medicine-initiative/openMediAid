define(["knockout", "text!./userlist.html"], function(ko, template) {

  function UserMenuWidget() {}

  return { viewModel: UserMenuWidget, template: template };

});
