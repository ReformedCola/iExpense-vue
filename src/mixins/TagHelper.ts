import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('Please enter the name of tag:');
    if (!name) {
      return window.alert('Tag name can not be empty');
    }
    this.$store.commit('createTag', name);
  }
}
