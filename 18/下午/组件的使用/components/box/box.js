const PubSub = require('../../utils/pubsub.js');

Component({
  methods: {
    sliderChangeAction(ev){
      console.log(ev.detail.value);
      PubSub.$emit('value-change', {value: ev.detail.value});
    }
  }
})
