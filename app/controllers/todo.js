import Ember from 'ember';

export default Ember.ObjectController.extend({
  isCompleted: function(key, value) {
    var model = this.get('model');

    if (arguments.length === 2) {
      //property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    } else {
      //property being used as a getter
      return model.get('isCompleted');
    }
  }.property('model.isCompleted')
});
