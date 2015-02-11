---
layout: step
title:  "Resource, Route, Model, Fixtures and Template"
part: 1
step: 3
permalink: /part1/step3/
summary: "summary3"
---
* create resource todos
  * `ember generate resource todos`
  * creates model, template & route as well as tests for model and route
* set routing
  * edit app/router.js:
{% highlight javascript linenos %}
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("todos", { path: '/' });
});

export default Router;
{% endhighlight %}
  * edit app/routes/todos.js:
{% highlight javascript linenos %}
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});
{% endhighlight %}
* write model with fixtures
  * edit app/models/todo.js:
{% highlight javascript linenos %}
import DS from 'ember-data';

var Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

Todo.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: 'Learn Ember.js',
      isCompleted: true
    },
    {
      id: 2,
      title: '...',
      isCompleted: false
    },
    {
      id: 3,
      title: 'Profit!',
      isCompleted: false
    }
  ]
});

export default Todo;
{% endhighlight %}
  * `mkdir app/adapters`
  * edit app/adapters/application.js:
{% highlight javascript linenos %}
import DS from 'ember-data';
 
export default DS.FixtureAdapter.extend();
{% endhighlight %}
* rewrite templates
  * we are moving big parts from app/templates/application.hbs to app/templates/todos.hbs
  * edit app/templates/application.hbs:
{% highlight html linenos %}
{{outlet}}

<footer id="info">
  <p>Double-click to edit a todo</p>
</footer>
{% endhighlight %}
  * edit app/templates/todos.hbs:
{% highlight html linenos %}
<section id="todoapp">
  <header id="header">
    <h1>todos</h1>
    <input type="text" id="new-todo" placeholder="What needs to be done?" />
  </header>

  <section id="main">
    <ul id="todo-list">
    {{#each}}
      <li>
        <input type="checkbox" class="toggle">
        <label>{{title}}</label><button class="destroy"></button>
      </li>
    {{/each}}
    </ul>

    <input type="checkbox" id="toggle-all">
  </section>

  <footer id="footer">
    <span id="todo-count">
      <strong>2</strong> todos left
    </span>
    <ul id="filters">
      <li>
        <a href="all" class="selected">All</a>
      </li>
      <li>
        <a href="active">Active</a>
      </li>
      <li>
        <a href="completed">Completed</a>
      </li>
    </ul>

    <button id="clear-completed">
      Clear completed (1)
    </button>
  </footer>
</section>
{% endhighlight %}
