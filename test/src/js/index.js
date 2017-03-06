//var Vue = require('vue');
import Vue from 'vue';

Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})

var app1 = new Vue({
  el: '#app',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue.js' },
      { text: 'Build Something Awesome' }
    ],
    title: "titleee",
    ok: true
  },
  methods: {
  	reverseType: function(){
  		this.ok = false
  	}
  }
})
app1.title=111;
require("../sass/index.sass");