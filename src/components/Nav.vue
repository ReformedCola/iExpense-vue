<template>
  <nav>
    <router-link to="/details" class="item" active-class="selected">
      <Icon name="details"/>
      Details
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="add"/>
      Expense
    </router-link>
    <router-link to="/charts" class="item" active-class="selected">
      <Icon name="statistics"/>
      Charts
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
  @import "~@/assets/style/helper.scss";

  nav {
    @extend %outerShadow;
    display: flex;
    padding: 4px 12px;
    flex-direction: row;
    font-size: 12px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;

    > .item {
      padding: 2px 0;
      width: 33.33333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .icon {
        width: 30px;
        height: 30px;
      }
    }

    > .item.selected {
      color: $color-highlight;
    }
  }
</style>