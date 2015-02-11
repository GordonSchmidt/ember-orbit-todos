---
layout: step
title:  "Resource, Model, Fixtures, Route and Template"
part: 1
step: 3
permalink: /part1/step3/
summary: "You create your first model and route with ember.js and setup a data store with fixture data.
At the end of this step your application displays the real data from the data store (just fixtures for now, still no interactive abilities)."
---
# Autogenerating blueprints
You can use ember-cli to generate various blueprints. Instead of generating a route, template and model seperately you can create a whole resource with the command:
{% highlight bash %}
ember generate resource todos
{% endhighlight %}
This will create a model with the name todo, a template and route with the name todos as well as tests for the model and the route.
Since the right naming is very important is very important to ember.js you should stick to these generators for creating new entities as long as you don't know what you're doing.
## Write model with fixtures
All you have to do now is to fill these blueprints with some content. We'll start with the model *app/models/todo.js* and add some test data straight away.
{% highlight javascript %}
{% raw %}
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
{% endraw %}
{% endhighlight %}
In the blueprint a empty model class is created and immediately exported. You need to add some properties to todo model first.
Each todo will have the properties *title* and *isCompleted*.

Then you need to add test data with some valid examples of your model. In order to do so, you need to put your model class to a variable first to extend it with the fixtures and export is afterwards. 
# Create a fixture storage adapter
To access data from the router ember.js uses stores. You need to set up a default store using the fixtures to create instances of your models.
First you generate an application adapter with the command:
{% highlight bash %}
ember generate adapter application
{% endhighlight %}
This will create the adapter and a test. Now put these lines to the adapter *app/adapters/application.js*:
{% highlight javascript %}
{% raw %}
import DS from 'ember-data';
 
export default DS.FixtureAdapter.extend();
{% endraw %}
{% endhighlight %}
## Edit routing
Now we are working on the routing. First you need to edit the *app/router.js*:
{% highlight javascript %}
{% raw %}
// ...

Router.map(function() {
  this.resource("todos", { path: '/' }, function() {});
});

export default Router;
{% endraw %}
{% endhighlight %}
You only have to inject a second parameter to the resource to set the path this route will be attached to. Now the todos route will be the starting point of the application.
Then you need to edit *app/routes/todos.js* to fetch all todos and return it to the template:
{% highlight javascript %}
{% raw %}
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});
{% endraw %}
{% endhighlight %}
## Refactoring the templates
Last but not least are the templates. You need to move all the dynamic content to the todos template and add some magic to display the todos provided by the router.
First move the template:
{% highlight bash %}
{% raw %}
mv app/templates/application.hbs app/templates/todos.hbs
{% endraw %}
{% endhighlight %}
You can create a new *app/templates/application.hbs* with just the static part:
{% highlight html %}
{% raw %}
{{outlet}}

<footer id="info">
  <p>Double-click to edit a todo</p>
</footer>
{% endraw %}
{% endhighlight %}
Remove the static part from the bottom of *app/templates/todos.hbs* and replace the static content with a foreach loop for the todos models:
{% highlight html %}
{% raw %}
<section id="todoapp">
  <!-- ... -->

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

  <!-- ... -->
</section>
{% endraw %}
{% endhighlight %}
If you're looping the default model (your collection of todos) you don't even need to tell it to the loop. Within the loop all properties of the todo instance will be globally available.

Now you're ready to run the application again and see the fixture data.
Try to change the fixture data and restart the server to see the results.
