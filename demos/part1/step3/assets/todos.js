define('todos/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].FixtureAdapter.extend();

});
define('todos/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'todos/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('todos/initializers/export-application-global', ['exports', 'ember', 'todos/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  };

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('todos/models/todo', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Todo = DS['default'].Model.extend({
    title: DS['default'].attr("string"),
    isCompleted: DS['default'].attr("boolean")
  });

  Todo.reopenClass({
    FIXTURES: [{
      id: 1,
      title: "Learn Ember.js",
      isCompleted: true
    }, {
      id: 2,
      title: "...",
      isCompleted: false
    }, {
      id: 3,
      title: "Profit!",
      isCompleted: false
    }]
  });

  exports['default'] = Todo;

});
define('todos/router', ['exports', 'ember', 'todos/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.resource("todos", { path: "/" }, function () {});
  });

  exports['default'] = Router;

});
define('todos/routes/todos', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return this.store.find("todo");
    }
  });

});
define('todos/templates/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n<footer id=\"info\">\n  <p>Double-click to edit a todo</p>\n</footer>\n");
    return buffer;
    
  });

});
define('todos/templates/todos', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n      <li>\n        <input type=\"checkbox\" class=\"toggle\">\n        <label>");
    stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</label><button class=\"destroy\"></button>\n      </li>\n    ");
    return buffer;
    }

    data.buffer.push("<section id=\"todoapp\">\n  <header id=\"header\">\n    <h1>todos</h1>\n    <input type=\"text\" id=\"new-todo\" placeholder=\"What needs to be done?\" />\n  </header>\n \n  <section id=\"main\">\n    <ul id=\"todo-list\">\n    ");
    stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    </ul>\n \n    <input type=\"checkbox\" id=\"toggle-all\">\n  </section>\n \n  <footer id=\"footer\">\n    <span id=\"todo-count\">\n      <strong>2</strong> todos left\n    </span>\n    <ul id=\"filters\">\n      <li>\n        <a href=\"all\" class=\"selected\">All</a>\n      </li>\n      <li>\n        <a href=\"active\">Active</a>\n      </li>\n      <li>\n        <a href=\"completed\">Completed</a>\n      </li>\n    </ul>\n \n    <button id=\"clear-completed\">\n      Clear completed (1)\n    </button>\n  </footer>\n</section>\n");
    return buffer;
    
  });

});
define('todos/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('todos/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('todos/tests/helpers/resolver', ['exports', 'ember/resolver', 'todos/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('todos/tests/helpers/start-app', ['exports', 'ember', 'todos/app', 'todos/router', 'todos/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';

  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
  exports['default'] = startApp;

});
define('todos/tests/models/todo.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/todo.js should pass jshint', function() { 
    ok(true, 'models/todo.js should pass jshint.'); 
  });

});
define('todos/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('todos/tests/routes/todos.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/todos.js should pass jshint', function() { 
    ok(true, 'routes/todos.js should pass jshint.'); 
  });

});
define('todos/tests/test-helper', ['todos/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

	document.write("<div id=\"ember-testing-container\"><div id=\"ember-testing\"></div></div>");

	QUnit.config.urlConfig.push({ id: "nocontainer", label: "Hide container" });
	var containerVisibility = QUnit.urlParams.nocontainer ? "hidden" : "visible";
	document.getElementById("ember-testing-container").style.visibility = containerVisibility;

});
define('todos/tests/todos/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - todos/tests/helpers');
  test('todos/tests/helpers/resolver.js should pass jshint', function() { 
    ok(true, 'todos/tests/helpers/resolver.js should pass jshint.'); 
  });

});
define('todos/tests/todos/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - todos/tests/helpers');
  test('todos/tests/helpers/start-app.js should pass jshint', function() { 
    ok(true, 'todos/tests/helpers/start-app.js should pass jshint.'); 
  });

});
define('todos/tests/todos/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - todos/tests');
  test('todos/tests/test-helper.js should pass jshint', function() { 
    ok(true, 'todos/tests/test-helper.js should pass jshint.'); 
  });

});
define('todos/tests/todos/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - todos/tests/unit/adapters');
  test('todos/tests/unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'todos/tests/unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('todos/tests/todos/tests/unit/models/todo-test.jshint', function () {

  'use strict';

  module('JSHint - todos/tests/unit/models');
  test('todos/tests/unit/models/todo-test.js should pass jshint', function() { 
    ok(true, 'todos/tests/unit/models/todo-test.js should pass jshint.'); 
  });

});
define('todos/tests/todos/tests/unit/routes/todos-test.jshint', function () {

  'use strict';

  module('JSHint - todos/tests/unit/routes');
  test('todos/tests/unit/routes/todos-test.js should pass jshint', function() { 
    ok(true, 'todos/tests/unit/routes/todos-test.js should pass jshint.'); 
  });

});
define('todos/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("adapter:application", "ApplicationAdapter", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var adapter = this.subject();
    ok(adapter);
  });
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('todos/tests/unit/models/todo-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("todo", "Todo", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function () {
    var model = this.subject();
    // var store = this.store();
    ok(!!model);
  });

});
define('todos/tests/unit/routes/todos-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:todos", "TodosRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
/* jshint ignore:start */

define('todos/config/environment', ['ember'], function(Ember) {
  var prefix = 'todos';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("todos/tests/test-helper");
} else {
  require("todos/app")["default"].create({});
}

/* jshint ignore:end */
//# sourceMappingURL=todos.map