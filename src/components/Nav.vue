<template>
  <div class="nav">
    <router-link to="/labels">
      <Icon name="label"/>
      Tags
    </router-link>
    |
    <router-link to="/money">
      <Icon name="money"/>
      Expense
    </router-link>
    |
    <router-link to="/statistics">
      <Icon name="statistics"/>
      Statistics
    </router-link>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Nav extends Vue {

  }
</script>

<style lang="scss" scoped>
  .nav {
    border: 1px solid red;
  }
</style>