---
layout: step
title:  "Build static mockup"
part: 1
step: 2
permalink: /part1/step2/
summary: "Now it's time to envision the desired application and build a static mockup within ember.js.
At the end of this step you have a mockup up and running that pretty much looks like the desired application but doesn't provide any interactive abilities."
---
## Planning the application
TodoMVC contains all the typical behaviours of an single page application. You have some kind of data objects and provide listing, creating, changing and deleting of these objects.
For TodoMVC you can edit the name and completion status of a todo independently. All these interactions are integrated in a single list view. There are no seperate views for creating or editing.
A pretty good overview of all features can be found on [emberjs.com](http://emberjs.com/guides/getting-started/planning-the-application).

## Creating the mockup
The job of a mockup is to provide a visual impression of the application. For single page web applications it is basically one html file some assets like css and images.
An ember application starts of with a single template as well. So for the mockup to work you only need to fill these template with the html and add the needed assets.
First put this html to the template *app/templates/application.hbs*:
{% highlight html %}
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
{% endhighlight %}
You can copy the assets from the getting-started tutorial of [emberjs](http://emberjs.com/guides/getting-started/creating-a-static-mockup) and remove the default css from ember with this commands:
{% highlight bash %}
wget http://emberjs.com.s3.amazonaws.com/getting-started/style.css -Oapp/styles/todos.css
wget http://emberjs.com.s3.amazonaws.com/getting-started/bg.png -Oapp/styles/bg.png
rm app/styles/app.css
{% endhighlight %}
Now you're ready to run the application again and see the static mockup.

