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
define('todos/components/edit-todo', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].TextField.extend({
    didInsertElement: function () {
      this.$().focus();
      this.$().addClass("focus");
    }
  });

});
define('todos/controllers/todo', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].ObjectController.extend({
    isEditing: false,

    actions: {
      removeTodo: function () {
        var todo = this.get("model");
        todo.deleteRecord();
        todo.save();
      },

      acceptChanges: function () {
        this.set("isEditing", false);

        if (Ember['default'].isEmpty(this.get("model.title"))) {
          this.send("removeTodo");
        } else {
          this.get("model").save();
        }
      },

      editTodo: function () {
        this.set("isEditing", true);
      }
    },

    isCompleted: (function (key, value) {
      var model = this.get("model");

      if (arguments.length === 2) {
        //property being used as a setter
        model.set("isCompleted", value);
        model.save();
        return value;
      } else {
        //property being used as a getter
        return model.get("isCompleted");
      }
    }).property("model.isCompleted")
  });

});
define('todos/controllers/todos', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].ArrayController.extend({
    actions: {
      clearCompleted: function () {
        var completed = this.filterBy("isCompleted", true);
        completed.invoke("deleteRecord");
        completed.invoke("save");
      },

      createTodo: function () {
        // Get the todo title set by the "New Todo" text field
        var title = this.get("newTitle");
        if (!title.trim()) {
          return;
        }

        // Create the new Todo model
        var todo = this.store.createRecord("todo", {
          title: title,
          isCompleted: false
        });

        // Clear the "New Todo" text field
        this.set("newTitle", "");

        // Save the new model
        todo.save();
      }
    },

    hasCompleted: (function () {
      return this.get("completed") > 0;
    }).property("completed"),

    completed: (function () {
      return this.filterBy("isCompleted", true).get("length");
    }).property("@each.isCompleted"),

    allAreDone: (function (key, value) {
      if (value === undefined) {
        return !!this.get("length") && this.isEvery("isCompleted", true);
      } else {
        this.setEach("isCompleted", value);
        this.invoke("save");
        return value;
      }
    }).property("@each.isCompleted"),

    remaining: (function () {
      return this.filterBy("isCompleted", false).get("length");
    }).property("@each.isCompleted"),

    inflection: (function () {
      var remaining = this.get("remaining");
      return remaining === 1 ? "todo" : "todos";
    }).property("remaining")
  });

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
    var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n      <li ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': ("isCompleted:completed isEditing:editing")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n      ");
    stack1 = helpers['if'].call(depth0, "isEditing", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      </li>\n    ");
    return buffer;
    }
  function program2(depth0,data) {
    
    var buffer = '', helper, options;
    data.buffer.push("\n        ");
    data.buffer.push(escapeExpression((helper = helpers['edit-todo'] || (depth0 && depth0['edit-todo']),options={hash:{
      'class': ("edit"),
      'value': ("title"),
      'focus-out': ("acceptChanges"),
      'insert-newline': ("acceptChanges")
    },hashTypes:{'class': "STRING",'value': "ID",'focus-out': "STRING",'insert-newline': "STRING"},hashContexts:{'class': depth0,'value': depth0,'focus-out': depth0,'insert-newline': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "edit-todo", options))));
    data.buffer.push("\n      ");
    return buffer;
    }

  function program4(depth0,data) {
    
    var buffer = '', stack1, helper, options;
    data.buffer.push("\n        ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("checkbox"),
      'checked': ("isCompleted"),
      'class': ("toggle")
    },hashTypes:{'type': "STRING",'checked': "ID",'class': "STRING"},hashContexts:{'type': depth0,'checked': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n        <label ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "editTodo", {hash:{
      'on': ("doubleClick")
    },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</label>\n        <button ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeTodo", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(" class=\"destroy\"></button>\n      ");
    return buffer;
    }

  function program6(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n    <button id=\"clear-completed\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "clearCompleted", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">Clear completed (");
    stack1 = helpers._triageMustache.call(depth0, "completed", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push(")</button>\n    ");
    return buffer;
    }

    data.buffer.push("<section id=\"todoapp\">\n  <header id=\"header\">\n    <h1>todos</h1>\n    ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("text"),
      'id': ("new-todo"),
      'placeholder': ("What needs to be done?"),
      'value': ("newTitle"),
      'action': ("createTodo")
    },hashTypes:{'type': "STRING",'id': "STRING",'placeholder': "STRING",'value': "ID",'action': "STRING"},hashContexts:{'type': depth0,'id': depth0,'placeholder': depth0,'value': depth0,'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n  </header>\n \n  <section id=\"main\">\n    <ul id=\"todo-list\">\n    ");
    stack1 = helpers.each.call(depth0, {hash:{
      'itemController': ("todo")
    },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    </ul>\n \n    ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("checkbox"),
      'id': ("toggle-all"),
      'checked': ("allAreDone")
    },hashTypes:{'type': "STRING",'id': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'id': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n  </section>\n \n  <footer id=\"footer\">\n    <span id=\"todo-count\">\n      <strong>");
    stack1 = helpers._triageMustache.call(depth0, "remaining", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</strong> ");
    stack1 = helpers._triageMustache.call(depth0, "inflection", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push(" left\n    </span>\n    <ul id=\"filters\">\n      <li>\n        <a href=\"all\" class=\"selected\">All</a>\n      </li>\n      <li>\n        <a href=\"active\">Active</a>\n      </li>\n      <li>\n        <a href=\"completed\">Completed</a>\n      </li>\n    </ul>\n \n    ");
    stack1 = helpers['if'].call(depth0, "hasCompleted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  </footer>\n</section>\n");
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
define('todos/tests/components/edit-todo.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/edit-todo.js should pass jshint', function() { 
    ok(true, 'components/edit-todo.js should pass jshint.'); 
  });

});
define('todos/tests/controllers/todo.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/todo.js should pass jshint', function() { 
    ok(true, 'controllers/todo.js should pass jshint.'); 
  });

});
define('todos/tests/controllers/todos.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/todos.js should pass jshint', function() { 
    ok(true, 'controllers/todos.js should pass jshint.'); 
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
define('todos/tests/todos/tests/unit/controllers/todo-test.jshint', function () {

  'use strict';

  module('JSHint - todos/tests/unit/controllers');
  test('todos/tests/unit/controllers/todo-test.js should pass jshint', function() { 
    ok(true, 'todos/tests/unit/controllers/todo-test.js should pass jshint.'); 
  });

});
define('todos/tests/todos/tests/unit/controllers/todos-test.jshint', function () {

  'use strict';

  module('JSHint - todos/tests/unit/controllers');
  test('todos/tests/unit/controllers/todos-test.js should pass jshint', function() { 
    ok(true, 'todos/tests/unit/controllers/todos-test.js should pass jshint.'); 
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
define('todos/tests/unit/controllers/todo-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:todo", "TodoController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('todos/tests/unit/controllers/todos-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:todos", "TodosController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

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