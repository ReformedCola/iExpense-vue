<template>
  <div class="xn-container" >
    <button @click="showVuePopup(true)">Use Phone ( Click me ) <br/> for better experience</button>
    <div class="vue-popup">
      <div class="mask" v-show="show" @click="showVuePopup(false)"></div>
      <transition name="slide">
        <div class="popup-content" v-show="show">
          <div class="top">
            <span>Please use your phone to scan the QRCode for better experience!</span>
            <br/>
            <span>If not, you can use magic shortcuts to check it out ~ (see below)</span>
          </div>
          <img src="../assets/icons/qrcode.png" alt="Or you can use inspector with phone mode ~"/>
          <div>
            <span><strong>Mac</strong>: Cmd + Option + J, Cmd + Shift + M, then Cmd + R</span>
            <br/>
            <span><strong>Window</strong>: Ctrl + Shift + J, Ctrl + Shift + M, then Ctrl + R</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="js">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class QRCode extends Vue {
    name = 'fixed';
    show = false;
    showVuePopup(flag) {
      this.show = flag
    }
  }
</script>

<style lang="scss" scoped>
  .xn-container {
    height: 100%;
  }
  button {
    display: block;
    width: 300px;
    height: 15px;
    margin: 20px auto;
    border-radius: 4px;
    background-color: #ffda44;
    color: #333333;
    transform: translateY(-100%);
  }
  .vue-popup {
    .popup-content {
      position: absolute;
      height: 400px;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: white;
      -webkit-transition: all 0.2s ease-in;
      transition: all 0.2s ease-in;
      img {
        width: 150px;
        height: 150px;
        margin: 16px 0;
      }
      .top {
        padding-top: 32px;
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in;
  }

  .slide-enter-active {
    animation-name: slideInUp;
    animation-duration: 0.2s;
    animation-fill-mode: both;
  }
  .slide-leave-active {
    animation-name: slideOutDown;
    animation-duration: 0.2s;
    animation-fill-mode: both;
  }
  @keyframes slideInUp {
    0% {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      transform: translateZ(0);
    }
  }
  @keyframes slideOutDown {
    0% {
      transform: translateZ(0);
    }

    to {
      visibility: hidden;
      transform: translate3d(0, 100%, 0);
    }
  }
  .delay-leave-active {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    -o-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
</style>