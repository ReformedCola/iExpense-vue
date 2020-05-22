<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="js">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    beforeCreate () {
      window.onload = function () {
        document.addEventListener('touchstart', function (event) {
          if (event.touches.length > 1) {
            event.preventDefault();
          }
        });
        document.addEventListener('gesturestart', function (event) {
          event.preventDefault();
        });}
    }

  }

</script>

<style lang="scss">
  @import '~@/assets/style/helper.scss';
  @import '~@/assets/style/reset.scss';

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333333;
    line-height: 1.5;
    font-family: $font-hei;
    font-size: 16px;
    /*background: #f5f5f5;*/
    background: #ffffff;
    text-align: center;
  }

</style>
