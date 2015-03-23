define(["knockout", "text!./usermenu.html"], function(ko, template) {

  var user = { key: "fdsjb38b4tßndw1d1", avatar: "resources/img/user2-160x160.jpg", tsJoined: "2 Nov. 2015"};

  function UserMenuWidget() {
    this.userkey = user.key;
    this.avatar = user.avatar;
    this.tsJoined = user.tsJoined;
  }

  return { viewModel: UserMenuWidget, template: template };

});
