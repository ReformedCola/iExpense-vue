<template>
  <Layout>
    <div class="tags">
      <ul class="current">
        <li>Clothing</li>
        <li>Food</li>
        <li>Housing</li>
        <li>Transportation</li>
      </ul>
      <div class="new">
        <button>New Tag</button>
      </div>
    </div>
    <div>
      <label class="notes">
        <span class="name">Notes: </span>
        <input type="text">
      </label>
    </div>
    <div>
      <ul class="types">
        <li class="selected">Expense</li>
        <li>Income</li>
      </ul>
    </div>
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>Delete</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>AC</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>OK</button>
        <button>0</button>
        <button>.</button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Money extends Vue {

  }
</script>

<style lang="scss" scoped>
</style>