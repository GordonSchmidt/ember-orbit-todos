---
layout: step
title:  "Handling the complete state of todos"
part: 1
step: 4
permalink: /part1/step4/
summary: "You generate and use all the dynamic values and actions depending the complete state of todos.
At the end of this step you can complete and uncomplete a todo or all todos at once and all the complete states are displayed correctly in the application."
---
## Display the todos complete state
To mark completed todos in the list you need to add the class *completed* to the *<li>* tag and set the *checked* attribute of the checkbox on every completed todo.
In ember.js you can bind dom objects or its attributes to model properties. So the view gets automatically updated, when the model changes. To do so you need to edit *app/templates/todos.hbs*:
{% highlight html %}
{% raw %}
<!-- ... -->

    <ul id="todo-list">
    {{#each}}
      <li {{bind-attr class="isCompleted:completed"}}>
        {{input type="checkbox" checked=isCompleted class="toggle"}}
        <label>{{title}}</label><button class="destroy"></button>
      </li>
    {{/each}}
    </ul>

<!-- ... -->
{% endraw %}
{% endhighlight %}
With the *bind-attr* method you bind the model property *isCompleted* to the class attribute. The *input* method generates an input dom object.
It is used to create a checkbox and bind its *checked* attribute to the model property *isCompleted* as well.

If you start your application now completed todos will be checked and striked through. You even can check and uncheck todos and the *isCompleted* property of these todos will be changed. But these changes are not saved in the store yet.

## Mark a todo as complete or incomplete
To save the changes of the *isCompleted* model property you need to create a controller and provide a setter for this property. To generate the controller type the command:
{% highlight bash %}
{% raw %}
ember generate controller todo
{% endraw %}
{% endhighlight %}
This will generate the controller and a test. Now edit the *app/controllers/todo.js*:
{% highlight javascript %}
{% raw %}
import Ember from 'ember';

export default Ember.ObjectController.extend({
  isCompleted: function(key, value) {
    var model = this.get('model');

    if (arguments.length === 2) {
      //property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    } else {
      //property being used as a getter
      return model.get('isCompleted');
    }
  }.property('model.isCompleted')
});
{% endraw %}
{% endhighlight %}
You need to tell the template to use this controller. In ember.js templates are automatically bound to the corresponding controller, but in this case we want to use the controller of a single todo in the view of a todo collection.
So edit *app/templates/todos.hbs* and tell the each loop to use the right item controller:
{% highlight html %}
{% raw %}
<!-- ... -->

    <ul id="todo-list">
    {{#each itemController="todo"}}

<!-- ... -->
{% endraw %}
{% endhighlight %}
The *isCompleted* function of the controller supersedes the model property and changes will be saved to the store.
This does not make much sense jet since we still use the fixtures store, which will reset with every refresh of the application. But we will get to that.

## Display the number of incomplete todos
Beneath the list of todos the number of incomplete todos should be displayed. To do so you change *app/templates/todos.hbs* to:
{% highlight html %}
{% raw %}
<!-- ... -->

<span id="todo-count">
  <strong>{{remaining}}</strong> {{inflection}} left
</span>

<!-- ... -->
{% endraw %}
{% endhighlight %}
We also need the corresponding controller functions to fill these values.
As i said before you don't need to bind this controller manually to the template as long as there names match.
So Generate a controller for the todo collection by typing:
{% highlight bash %}
{% raw %}
ember generate controller todos
{% endraw %}
{% endhighlight %}
And then edit the new controller *app/controllers/todos.js*:
{% highlight javascript %}
{% raw %}
import Ember from 'ember';

export default Ember.ArrayController.extend({
  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'todo' : 'todos';
  }.property('remaining')
});
{% endraw %}
{% endhighlight %}
The remaining function loops over each item in the collection and counts all the items with the property *isCompleted* set to *false*. The inflection function returns the singular or plural version of the word todo depending on the amount of remaining todos.

If you start your application now the count of remaining todos will be correct and will change anytime you change the complete state of a todo item.

## Toggle all todos between complete and incomplete
Above the list of todos there is a checkbox, that shall be checked if every todo is completed. Also if checked manually all todos shall be set to completed and if unchecked all todos shall be set to uncompleted.
You need to edit *app/templates/todos.hbs*:
{% highlight html %}
{% raw %}
<!-- ... -->

  <section id="main">
    <ul id="todo-list">
      <!-- ... -->
    </ul>

    {{input type="checkbox" id="toggle-all" checked=allAreDone}}
  </section>

<!-- ... -->
{% endraw %}
{% endhighlight %}
The checkbox is now bound to the function *allAreDone* that you need to provide now in *app/controllers/todos.js*:
{% highlight javascript %}
{% raw %}
import Ember from 'ember';

export default Ember.ArrayController.extend({
  allAreDone: function(key, value) {
    if (value === undefined) {
      return !!this.get('length') && this.isEvery('isCompleted', true);
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('@each.isCompleted'),

// ...
{% endraw %}
{% endhighlight %}
The *allAreDone* function will loop through all the todo items in the collection and will check if all todos are completed if used as a getter and will set all todos to the provided complete state if used as a setter.

You can start the application to try out.

## Display button to remove all completed todos
The button to delete all completed todos needs to display the number of completed todos.
The button shall be hidden if no todo is completed.
Change the *app/templates/todos.hbs* to:
{% highlight html %}
{% raw %}
<!-- ... -->

    {{#if hasCompleted}}
    <button id="clear-completed">Clear completed ({{completed}})</button>
    {{/if}}
  </footer>
</section>
{% endraw %}
{% endhighlight %}
As you see, we introduced two new values that needs to be provided by the controller. So edit *app/controller/todos.js*:
{% highlight javascript %}
{% raw %}
import Ember from 'ember';

export default Ember.ArrayController.extend({
  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function() {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

// ...
{% endraw %}
{% endhighlight %}
The *completed* function loops through all todo items and counts the number of items with the property *isCompleted* set to *true*. It pretty much looks like the *remaining* function we wrote earlier.
In the function *hasCompleted* we check if the completed count is bigger than zero.

Now you're ready to run the application again and see all the correct complete states and interact with it.
