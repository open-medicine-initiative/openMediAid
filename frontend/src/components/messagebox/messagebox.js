define(["knockout", "text!./messagebox.html"], function(ko, template) {

  var messages = [
    { subject: "Hello", body:"This is a message body", image: "resources/img/user2-160x160.jpg", tsReceived:"2 hours"},
    { subject: "Hello", body:"This is a message body", image: "resources/img/user3-128x128.jpg", tsReceived:"5 minutes"},
    { subject: "Hello", body:"This is a message body", image: "resources/img/user4-128x128.jpg", tsReceived:"1 hour"},
    { subject: "Hello", body:"This is a message body", image: "resources/img/user4-128x128.jpg", tsReceived:"today"}
  ];

  function MessageBox() {
    this.messages = ko.observableArray(messages);
  }

  return { viewModel: MessageBox, template: template };

});
