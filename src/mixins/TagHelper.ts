import Vue from 'vue';
import Component from 'vue-class-component';

const map: { [key: string]: string } = {
  'Duplicated Tag': 'Duplicated Tag'
};

@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('Please enter the name of tag:');
    if (!name) {
      return window.alert('Tag name can not be empty');
    }
    this.$store.commit('createTag', name);
    if (this.$store.state.createTagError) {
      window.alert(map[this.$store.state.createTagError.message] || 'Unknown Error');
    }
  }
}
