---
layout: step
title:  "Create, edit and delete todos"
part: 1
step: 5
permalink: /part1/step5/
summary: "You add functionality to create, update and delete todos.
At the end of this step you can add a new todo, change the title of an existing one and remove a single todo or all completed todos at once."
---

## Create a new todo
You already have a text input for the creation of new todos. Now you have to bind it to an action. So edit *app/templates/todos.hbs*:
{% highlight html %}
{% raw %}
<section id="todoapp">
  <header id="header">
    <h1>todos</h1>
    {{input type="text" id="new-todo" placeholder="What needs to be done?" value=newTitle action="createTodo"}}

<!-- ... -->
{% endraw %}
{% endhighlight %}
Then you have to add the corresponding action to *app/controllers/todos.js*:
{% highlight javascript %}
{% raw %}
import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    createTodo: function() {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    }
  },

// ...
{% endraw %}
{% endhighlight %}
If the text isn't empty, this action will create a new incomplete todo model instance with the given text, reset the text input and save the todo to the store.
## Toggle between showing and editing a todo
To edit the title of a todo inline in the list, you have to replace this line of the list on a certain event.
You can bind the text label for example to an action that is called, when the label is double clicked.
This action will set a property called *isEditing*. So you can add a condition to show a text input instead of the normal line in the list, if this property is true.
So edit *app/templates/todos.hbs*:
{% highlight html %}
{% raw %}
<!-- ... -->

    {{#each itemController="todo"}}
      <li {{bind-attr class="isCompleted:completed isEditing:editing"}}>
      {{#if isEditing}}
        <input class="edit">
      {{else}}
        {{input type="checkbox" checked=isCompleted class="toggle"}}
        <label {{action "editTodo" on="doubleClick"}}>{{title}}</label><button class="destroy"></button>
      {{/if}}
      </li>
    {{/each}}

<!-- ... -->
{% endraw %}
{% endhighlight %}
The missing action in *app/controllers/todo.js* looks like this:
{% highlight javascript %}
{% raw %}
import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    } 
  },

// ...
{% endraw %}
{% endhighlight %}

## Save edits
You can create a component for this text input to add special behaviour to it. So create *app/components/edit-todo.js* with the content:
{% highlight javascript %}
{% raw %}
import Ember from 'ember';

export default Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
    this.$().addClass('focus');
  }
});
{% endraw %}
{% endhighlight %}
You need to bind the input to an action. We want to accept changes when you leave the text input or press enter.
To use the defined component you call *edit-todo* instead of *input* in your template *app/templates/todos.hbs*:
{% highlight html %}
{% raw %}
<!-- ... -->

      {{#if isEditing}}
        {{edit-todo class="edit" value=title focus-out="acceptChanges" insert-newline="acceptChanges"}}
      {{else}}

<!-- ... -->
{% endraw %}
{% endhighlight %}
Now the action is still missing. You should add it to *app/controllers/todo.js*:
{% highlight javascript %}
{% raw %}
// ...

  actions: {
    acceptChanges: function() {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else {
        this.get('model').save();
      }
    },

// ...
{% endraw %}
{% endhighlight %}
As you can see in this action it will call the *removeTodo* action when all text is removed.
After you'll have add this action to the controller in the next section, you will be able to delete todos by removing it's title.
## Delete a todo
To delete a todo with the destroy button on the right of each line, you need to bind these buttons to an action by editing *app/templates/todos.hbs*:
{% highlight html %}
{% raw %}
<!-- ... -->

      {{else}}
        {{input type="checkbox" checked=isCompleted class="toggle"}}
        <label {{action "editTodo" on="doubleClick"}}>{{title}}</label>
        <button {{action "removeTodo"}} class="destroy"></button>
      {{/if}}

<!-- ... -->
{% endraw %}
{% endhighlight %}
You have to add the action in *app/controllers/todo.js*:
{% highlight javascript %}
{% raw %}
// ...

  actions: {
   removeTodo: function () {
      var todo = this.get('model');
      todo.deleteRecord();
      todo.save();
    },

// ...
{% endraw %}
{% endhighlight %}
This will remove the todo from store, as soon as you click the button or remove the text of the title in editing mode.
## Enable button to remove all completed todos
To activate the button on the right to remove all completed todos at once, you have to bind it to an action by editing *app/templates/todos.hbs*:
{% highlight html %}
{% raw %}
<!-- ... -->

    {{#if hasCompleted}}
    <button id="clear-completed" {{action "clearCompleted"}}>Clear completed ({{completed}})</button>
    {{/if}}
  </footer>
</section>
{% endraw %}
{% endhighlight %}
Then you can provide these action in *app/controllers/todos.js*:
{% highlight javascript %}
{% raw %}
import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    clearCompleted: function() {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    },

// ...
{% endraw %}
{% endhighlight %}

Now you're ready to run the application again and be able to create, edit and delete todos.
