<template>
  <div class="blank">
    <div class="icon">
      <Icon name="empty"/>
    </div>
    <span>You have no records yet. Go add one ~</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Blank extends Vue {

  }
</script>

<style lang="scss" scoped>
  .blank {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon {
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      padding-bottom: 8px;

      svg {
        width: 80px;
        height: 80px;

      }
    }

    span {
      color: #999999;
      font-size: 16px;
    }
  }
</style>