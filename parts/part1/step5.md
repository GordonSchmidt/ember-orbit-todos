---
layout: step
title:  "Create, edit and delete todos"
part: 1
step: 5
permalink: /part1/step5/
summary: "summary5"
---

## Create a new todo
* edit *app/templates/todos.hbs*:
{% highlight html %}
{% raw %}
<section id="todoapp">
  <header id="header">
    <h1>todos</h1>
    {{input type="text" id="new-todo" placeholder="What needs to be done?" value=newTitle action="createTodo"}}

<!-- ... -->
{% endraw %}
{% endhighlight %}
* edit *app/controllers/todos.js*:
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

## Toggle between showing and editing a todo
* edit *app/templates/todos.hbs*:
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


* edit *app/controllers/todo.js*:
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
* create component *app/components/edit-todo.js*:
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
* edit *app/templates/todos.hbs*:
{% highlight html %}
{% raw %}
<!-- ... -->

      {{#if isEditing}}
        {{edit-todo class="edit" value=title focus-out="acceptChanges" insert-newline="acceptChanges"}}
      {{else}}

<!-- ... -->
{% endraw %}
{% endhighlight %}
* edit *app/controllers/todo.js*:
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

## Delete a todo
* edit *app/templates/todos.hbs*:
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
* edit *app/controllers/todo.js*:
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

## Enable button to remove all completed todos
* edit *app/templates/todos.hbs*:
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
* edit *app/controllers/todos.js*:
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
