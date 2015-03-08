import Ember from 'ember';
import Orbit from 'orbit/main';
import LocalStorageSource from 'orbit-common/local-storage-source';
import EO from 'ember-orbit';

var LocalStorageStore = EO.Store.extend({
  orbitSourceClass: LocalStorageSource,
  orbitSourceOptions: {
    namespace: 'ember-orbit-todos'
  }
});

export default {
  name: 'ember-orbit',
  initialize: function(container, application) {
    Orbit.Promise = Ember.RSVP.Promise;
    application.register('schema:main', EO.Schema);
    application.register('store:main', LocalStorageStore); 		
    application.inject('controller', 'store', 'store:main');
    application.inject('route', 'store', 'store:main');
  }
};
