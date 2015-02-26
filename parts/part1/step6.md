---
layout: step
title:  "Adding child routes and filter todo list"
part: 1
step: 6
permalink: /part1/step6/
summary: "Last but not least you add child routes for filted lists of your todos to show only completed or only uncompleted todos.
At the end of this step you will be able to switch between the filtered lists and also persist your tasks in the local storage of your browser."
---

## Filter todos in child routes
To add the filtered pages you need to add child routes to your router by editing *app/router.js*:
{% highlight javascript %}
{% raw %}
//...

  this.resource("todos", { path: '/' }, function() {
    this.route("active");
    this.route("completed");
  });

//...
{% endraw %}
{% endhighlight %}
This will create the three routes active, completed and index. You need to create *app/routes/todos/active.js* with the content:
{% highlight javascript %}
{% raw %}
import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.filter('todo', function(todo) {
      return !todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});
{% endraw %}
{% endhighlight %}
This route will filter the todos from the store and will return only these todos where the attribute *isCompleted* is not set. You can redirect all three routes to one template.
Now create the *app/routes/todos/completed.js* like this:
{% highlight javascript %}
{% raw %}
import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});
{% endraw %}
{% endhighlight %}
As you see it almost looks like the active route, only the model filter is inverted. You don't need to create routing file for the index route, because it will inherit it's model funktion from the *app/routes/todos.js* and uses the default settings for the template.
But you need to move some parts of the todos template to *app/templates/todos/index.hbs*:
{% highlight html %}
{% raw %}
   <ul id="todo-list">
    {{#each itemController="todo"}}
      <li {{bind-attr class="isCompleted:completed isEditing:editing"}}>
      {{#if isEditing}}
        {{edit-todo class="edit" value=title focus-out="acceptChanges" insert-newline="acceptChanges"}}
      {{else}}
        {{input type="checkbox" checked=isCompleted class="toggle"}}
        <label {{action "editTodo" on="doubleClick"}}>{{title}}</label>
        <button {{action "removeTodo"}} class="destroy"></button>
      {{/if}}
      </li>
    {{/each}}
    </ul>
{% endraw %}
{% endhighlight %}
The *app/templates/todos.hbs* now looks like this:
{% highlight html %}
{% raw %}
<section id="todoapp">
  <header id="header">
    <h1>todos</h1>
    {{input type="text" id="new-todo" placeholder="What needs to be done?" value=newTitle action="createTodo"}}
  </header>
 
  <section id="main">
    {{outlet}}
 
    {{input type="checkbox" id="toggle-all" checked=allAreDone}}
  </section>
 
  <footer id="footer">
    <span id="todo-count">
      <strong>{{remaining}}</strong> {{inflection}} left
    </span>
    <ul id="filters">
      <li>
        {{#link-to "todos.index" activeClass="selected"}}All{{/link-to}}
      </li>
      <li>
        {{#link-to "todos.active" activeClass="selected"}}Active{{/link-to}}
      </li>
      <li>
        {{#link-to "todos.completed" activeClass="selected"}}Completed{{/link-to}}
      </li>
    </ul>
 
    {{#if hasCompleted}}
    <button id="clear-completed" {{action "clearCompleted"}}>Clear completed ({{completed}})</button>
    {{/if}}
  </footer>
</section>
{% endraw %}
{% endhighlight %}
The part moved to the index route is replaced by the outlet and the links to the filtered pages are linked to the routes.

## Replace the Fixture Adapter with Another Adapter
Until now you worked with fixture data, so all changes to the store are lost as soon as you reload the page in your browser.
You should replace the fixture adapter by the localstorage adapter, so your todos will be saved in your browser and you will be able to reload the page.
The localstorage adapter is available as a seperate module. First you need to add this module as a dependency by executing this command in a shell:
{% highlight bash %}
{% raw %}
npm install --save-dev ember-localstorage-adapter
{% endraw %}
{% endhighlight %}
Now you can edit *app/adapters/application.js* and replace the adapter:
{% highlight javascript %}
{% raw %}
import DS from 'ember-data';

export default DS.LSAdapter.extend({
  namespace: 'ember-orbit-todos'
});
{% endraw %}
{% endhighlight %}
You can choose a random name as namespace to save your data in. The localstorage adapter also needs a serializer. So create *app/serializers/application.js* with the content:
{% highlight javascript %}
{% raw %}
import DS from 'ember-data';

export default DS.LSSerializer.extend();
{% endraw %}
{% endhighlight %}

Now you’re ready to run the application again and be able to see the filtered lists. The list will start empty, because the fixtures are no longer used.
You might remove the fixture data from the model now. If you reload the page in the browser all the previous entered todos will still be available.
