import EO from 'ember-orbit';

export default EO.Model.extend({
  title: EO.attr('string'),
  isCompleted: EO.attr('boolean')
});
