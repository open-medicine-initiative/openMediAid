define(["knockout", "text!./notifications.html"], function(ko, template) {

  var notifications = [
    {body:"5 new members joined today", types: {user:true}},
    {body:"5 new members joined today", types: {user:true}},
    {body:"Very long description here that may not fit into the page and may cause design problems",types: {user:true, warning:true}},
    {body:"5 new members joined", types: {users:true, important:true}},
    {body:"You changed your username", types: {users:true, important:true}}
  ];

  function NotificationsWidget() {
    this.notifications = ko.observableArray(notifications);
  }

  return { viewModel: NotificationsWidget, template: template };

});
