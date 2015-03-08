import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    removeTodo: function () {
      var todo = this.get('model');
      todo.remove();
    },

    acceptChanges: function() {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else {
        this.get('model').save();
      }
    },

    editTodo: function() {
      this.set('isEditing', true);
    }
  },

  isCompleted: function(key, value) {
    var model = this.get('model');

    if (arguments.length === 2) {
      //property being used as a setter
      model.set('isCompleted', value);
      return value;
    } else {
      //property being used as a getter
      return model.get('isCompleted');
    }
  }.property('model.isCompleted')
});
