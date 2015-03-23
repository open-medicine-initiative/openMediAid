define( ["knockout", "text!./tasks.html"], function ( ko, template ) {

  var tasks = [
    new Task( {subject : "Fill out personal data", steps : 5, completed : 2} ),
    new Task( {subject : "Add treatment", steps : 1, completed : 0} ),
    new Task( {subject : "Expand your support network", steps : 5, completed : 3} )

  ];

  function Task ( data ) {
    this.steps = data.steps;
    this.completed = data.completed;
    this.subject = data.subject;
  }

  Task.prototype.completion = function () {
    return (this.completed / this.steps) * 100;
  };

  function TasksWidget () {
    this.tasks = ko.observableArray( tasks );
  }

  TasksWidget.prototype.notification = function () {
    return "You have " + this.tasks().length + " tasks";
  };

  return { viewModel : TasksWidget, template : template };

} );
