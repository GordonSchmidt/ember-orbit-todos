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
define('todos/router', ['exports', 'ember', 'todos/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;

});
define('todos/templates/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    


    data.buffer.push("<section id=\"todoapp\">\n  <header id=\"header\">\n    <h1>todos</h1>\n    <input type=\"text\" id=\"new-todo\" placeholder=\"What needs to be done?\" />\n  </header>\n \n  <section id=\"main\">\n    <ul id=\"todo-list\">\n      <li class=\"completed\">\n        <input type=\"checkbox\" class=\"toggle\">\n        <label>Learn Ember.js</label><button class=\"destroy\"></button>\n      </li>\n      <li>\n        <input type=\"checkbox\" class=\"toggle\">\n        <label>...</label><button class=\"destroy\"></button>\n      </li>\n      <li>\n        <input type=\"checkbox\" class=\"toggle\">\n        <label>Profit!</label><button class=\"destroy\"></button>\n      </li>\n    </ul>\n \n    <input type=\"checkbox\" id=\"toggle-all\">\n  </section>\n \n  <footer id=\"footer\">\n    <span id=\"todo-count\">\n      <strong>2</strong> todos left\n    </span>\n    <ul id=\"filters\">\n      <li>\n        <a href=\"all\" class=\"selected\">All</a>\n      </li>\n      <li>\n        <a href=\"active\">Active</a>\n      </li>\n      <li>\n        <a href=\"completed\">Completed</a>\n      </li>\n    </ul>\n \n    <button id=\"clear-completed\">\n      Clear completed (1)\n    </button>\n  </footer>\n</section>\n \n<footer id=\"info\">\n  <p>Double-click to edit a todo</p>\n</footer>\n");
    
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
define('todos/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
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