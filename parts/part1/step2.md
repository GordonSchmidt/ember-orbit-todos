---
layout: step
title:  "Build static mockup"
part: 1
step: 2
permalink: /part1/step2/
summary: "summary2"
---

* edit app/templates/application.hbs:
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
* copy resources form getting-started tutorial of emberjs
  * `wget http://emberjs.com.s3.amazonaws.com/getting-started/style.css -Oapp/styles/todos.css`
  * `wget http://emberjs.com.s3.amazonaws.com/getting-started/bg.png -Oapp/styles/bg.png`
  * `rm app/styles/app.css`
* run application and see static template

