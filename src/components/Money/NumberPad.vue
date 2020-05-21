<template>
  <div class="numberPad" :class="classPrefix && `${classPrefix}-numberPad`">
    <label class="notes">
      <div class="icon-wrapper">
        <Icon name="note"/>
      </div>
      <span class="name">Notes :</span>
      <input type="text" placeholder="Tap to input ~" class="input"
             :value="notes" @input="onValueChanged($event.target.value)">
    </label>
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">
        <Icon name="delete"/>
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">AC</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    @Prop({required: true, type: String}) notes!: string;
    @Prop(String) classPrefix?: string;
    @Prop(Number) readonly value!: number;

    output = this.value.toString();

    inputContent(event: MouseEvent) {
      const button = event.target as HTMLButtonElement;
      const input = button.textContent!;
      if (this.output.length === 8) {return;}
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0) {
        if (this.output.toString().split('.')[1].length >= 2) {
          return;
        }
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {return;}
      this.output += input;
    }

    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
    }

    clear() {
      this.output = '0';
    }

    ok() {
      const number = parseFloat(this.output);
      this.$emit('update:value', number);
      this.$emit('submit', number);
      this.output = '0';
    }

    onValueChanged(notes: string) {
      this.$emit('update:notes', notes);
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .numberPad {
    .output {
      @extend %clearFix;
      @extend %innerShadow;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;
      font-size: 24px;
      line-height: 24px;
    }

    .buttons {
      @extend %clearFix;

      > button {
        width: 25%;
        height: 64px;
        float: left;
        background: transparent;
        border: none;

        $bg: #f2f2f2;

        &.ok {
          float: right;
          height: 64 * 2px;
        }

        &.zero {
          width: 25*2%;
        }

        &:nth-child(1) {
          background: $bg;
        }

        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }

        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 4*2%);
        }

        &:nth-child(4), &:nth-child(7), &:nth-child(10) {
          background: darken($bg, 4*3%);
        }

        &:nth-child(8), &:nth-child(11), &:nth-child(13) {
          background: darken($bg, 4*4%);
        }

        &:nth-child(14) {
          background: darken($bg, 4*5%);
        }

        &:nth-child(12) {
          background: darken($bg, 4*6%);
        }
      }
    }

    .notes {
      display: flex;
      flex-direction: row;
      align-items: center;


      font-size: 14px;
      border-top: 1px solid #f5f5f5;

      .icon-wrapper {
        padding-left: 8px;
      }

      .name {
        padding-left: 8px;
      }

      .input {
        height: 32px;
        padding-left: 8px;
        flex-grow: 1;
        border: none;
        background: transparent;
      }
    }

  }
</style>