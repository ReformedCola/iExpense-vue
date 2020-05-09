<template>
  <nav>
    <router-link to="/labels" class="item">
      <Icon name="label"/>
      Tags
    </router-link>
    <router-link to="/money" class="item">
      <Icon name="money"/>
      Expense
    </router-link>
    <router-link to="/statistics" class="item">
      <Icon name="statistics"/>
      Statistics
    </router-link>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Nav extends Vue {

  }
</script>

<style lang="scss" scoped>
  nav {
    display: flex;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    flex-direction: row;
    font-size: 12px;
    > .item {
      padding: 2px 0;
      width: 33.33333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon {
        width: 32px;
        height: 32px;
      }
    }
  }
</style>