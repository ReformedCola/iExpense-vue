<template>
  <label class="notes">
    {{value}}
    <span class="name">Notes:</span>
    <input type="text"
           v-model="value"
           placeholder="Type your notes here ~">
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';
  }
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    background: #f5f5f5;
    padding-left: 16px;
    display: flex;
    align-items: center;

    .name {
      padding-right: 16px;
    }

    input {
      height: 64px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>