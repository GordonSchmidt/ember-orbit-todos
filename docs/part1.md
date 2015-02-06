TodoMVC with ember-cli (Tutorial part 1)
========================================

Getting Started
----------------
* setup project folder
  * `mkdir todos`
  * `cd todos`
* setup environment
  * choose between local installation or vagrant vm installation
  * local installation
    * install nodejs, npm, phantomjs, bower and ember-cli
  * vagrant VM installation
    * install vagrant and virtualbox
    * create Vagrantfile
    * create vagrantProvision.sh
    * `vagrant up`
    * `vagrant ssh`
    * `cd todos`
* create skeleton application with ember-cli
  * `ember init`
* run skeleton application
  * `ember server`
  * goto http://localhost:4200
  * press ctrl+c to stop server

Build static mockup
-------------------
* edit app/templates/application.hbs
``` html
<section id="todoapp">
  <header id="header">
    <h1>todos</h1>
    <input type="text" id="new-todo" placeholder="What needs to be done?" />
  </header>
 
  <section id="main">
    <ul id="todo-list">
      <li class="completed">
        <input type="checkbox" class="toggle">
        <label>Learn Ember.js</label><button class="destroy"></button>
      </li>
      <li>
        <input type="checkbox" class="toggle">
        <label>...</label><button class="destroy"></button>
      </li>
      <li>
        <input type="checkbox" class="toggle">
        <label>Profit!</label><button class="destroy"></button>
      </li>
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
 
<footer id="info">
  <p>Double-click to edit a todo</p>
</footer>
```
* copy resources form getting-started tutorial of emberjs
  * `wget http://emberjs.com.s3.amazonaws.com/getting-started/style.css -Oapp/styles/todos.css`
  * `wget http://emberjs.com.s3.amazonaws.com/getting-started/bg.png -Opublic/bg.png`
* run application and see static template

Basic Application with Resource, Route, Model, Fixtures and Template
--------------------------------------------------------------------
* create resource todos
  * `ember generate resource todos`
  * creates model, template & route as well as tests for model and route
* set routing
  * edit app/router.js
``` javascript
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("todos", { path: '/' });
});

export default Router;
```
  * edit app/routes/todos.js
```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});
```
* write model with fixtures
  * edit app/models/todo.js:
```javascript
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
```
  * `mkdir app/adapters`
  * edit app/adapters/application.js
```javascript
import DS from 'ember-data';
 
export default DS.FixtureAdapter.extend();
```
* rewrite templates
  * we are moving big parts from app/templates/application.hbs to app/templates/todos.hbs
  * edit app/templates/application.hbs
```html
{{outlet}}

<footer id="info">
  <p>Double-click to edit a todo</p>
</footer>
```
  * edit app/templates/todos.hbs
```html
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
```

Adding interaction
------------------
* display models complete state
  * edit app/templates/todos.hbs
```html
<!-- ... -->

    <ul id="todo-list">
    {{#each}}
      <li {{bind-attr class="isCompleted:completed"}}>
        <input type="checkbox" class="toggle">
        <label>{{title}}</label><button class="destroy"></button>
      </li>
    {{/each}}
    </ul>

<!-- ... -->
```
* create a new todo
  * edit app/templates/todos.hbs
```html
<section id="todoapp">
  <header id="header">
    <h1>todos</h1>
    {{input type="text" id="new-todo" placeholder="What needs to be done?" value=newTitle action="createTodo"}}
  </header>

<!-- ... -->
```
  * edit app/controllers/todos.js
```javascript
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
  }
});
```
* mark a todo as complete or incomplete
  * edit app/templates/todos.hbs
```html
<!--- ... --->

    <ul id="todo-list">
    {{#each todo in model itemController="todo"}}
      <li {{bind-attr class="todo.isCompleted:completed"}}>
        {{input type="checkbox" checked=todo.isCompleted class="toggle"}}
        <label>{{todo.title}}</label><button class="destroy"></button>
      </li>
    {{/each}}
    </ul>

<!--- ... --->
```
  * edit app/controller/todos.js
```javascript

```
