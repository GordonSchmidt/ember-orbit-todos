---
layout: step
title:  "Adding child routes and filter todo list"
part: 1
step: 6
permalink: /part1/step6/
summary: "summary6"
---

## Filter todos in child routes
* edit *app/router.js*:
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
* create *app/routes/todos/active.js*:
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
* create *app/routes/todos/completed.js*:
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
* create *app/templates/todos/index.js*:
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
* edit *app/templates/todos.js*:
{% highlight html %}
{% raw %}
<!-- ... -->

  <section id="main">
    {{outlet}}

    {{input type="checkbox" id="toggle-all" checked=allAreDone}}
  </section>

<!-- ... -->
{% endraw %}
{% endhighlight %}

## Replace the Fixture Adapter with Another Adapter
* add dependency to localstorage adapter:
{% highlight javascript %}
{% raw %}
npm install --save-dev ember-localstorage-adapter
{% endraw %}
{% endhighlight %}
* edit *app/adapters/application.js*:
{% highlight javascript %}
{% raw %}
import DS from 'ember-data';

export default DS.LSAdapter.extend({
  namespace: 'ember-orbit-todos'
});
{% endraw %}
{% endhighlight %}
* create *app/serializers/application.js*:
{% highlight javascript %}
{% raw %}
import DS from 'ember-data';

export default DS.LSSerializer.extend();
{% endraw %}
{% endhighlight %}
