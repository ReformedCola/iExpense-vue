<template>
  <div>
    <div>SORRY, PAGE NOT FOUND</div>
    <router-link to="/">Back to Homepage</router-link>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class NotFound extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>