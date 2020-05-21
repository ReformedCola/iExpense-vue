<template>
  <div class="tags">
    <div class="fixed">
      <header class="header">
        <div class="title">
          <button class="back" @click="back">
            <Icon name="left"/>
          </button>
          <span>Adding Tag</span>
        </div>
        <button class="save" @click="save">Save</button>
      </header>
      <div class="current">
        <div class="currentTag">
          <span>Selected Tag: </span>
          <div class="currentIcon">
            <Icon :name="tag.name"/>
          </div>
        </div>
        <span>{{tag.value}}</span>
      </div>
    </div>
    <div class="content">
      <div class="food">
        <div class="category">
          Food
        </div>
        <Tags class-prefix="main" :tag-list="foodTags" :selected-tag.sync="tag"/>
      </div>
      <div class="shopping">
        <div class="category">
          Shopping
        </div>
        <Tags class-prefix="main" :tag-list="shoppingTags" :selected-tag.sync="tag"/>
      </div>
      <div class="transport">
        <div class="category">
          Transport
        </div>
        <Tags class-prefix="main" :tag-list="transportTags" :selected-tag.sync="tag"/>
      </div>
      <div class="housing">
        <div class="category">
          Housing
        </div>
        <Tags class-prefix="main" :tag-list="houseTags" :selected-tag.sync="tag"/>
      </div>
      <div class="entertainment">
        <div class="category">
          Entertainment
        </div>
        <Tags class-prefix="main" :tag-list="entertainmentTags" :selected-tag.sync="tag"/>
      </div>
      <div class="medical">
        <div class="category">
          Medical
        </div>
        <Tags class-prefix="main" :tag-list="medicalTags" :selected-tag.sync="tag"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tags from '@/components/Money/Tags.vue';
  import {
    entertainmentTags,
    foodTags,
    houseTags,
    medicalTags,
    shoppingTags,
    transportTags
  } from '@/constants/defaultTags';
  @Component({
    components: {Tags}
  })
  export default class EditTag extends Vue {
    tag: TagItem = {name: 'food', value: 'Food'};
    foodTags = foodTags;
    shoppingTags = shoppingTags;
    transportTags = transportTags;
    houseTags = houseTags;
    entertainmentTags = entertainmentTags;
    medicalTags = medicalTags;

    get tagList(): TagItem[] {
      return this.$store.state.tagList;
    }

    save() {
      this.$store.commit('insertTag', this.tag);
      if (this.$store.state.createTagError === 'Duplicated Tag') {
        window.alert('Duplicated Tag')
      } else {
        this.$router.replace('/money');
      }
    }

    back() {
      this.$router.replace('/money');
    }
  }
</script>

<style lang="scss" scoped>
  @mixin icon($color) {
    background: white;
    border: 1px solid transparent;
    color: $color;
    svg {
      width: 30px;
      height: 30px;
    }
    &.selected {
      border: 1px solid $color;
    }
  }

  ::v-deep {
    .main-tags > li:nth-child(4n + 0) {
      .main-tags-item-icon {
        @include icon(#a4d09f);
      }
    }
    .main-tags > li:nth-child(4n + 1) {
      .main-tags-item-icon {
        @include icon(#ffda47);
      }
    }
    .main-tags > li:nth-child(4n + 2) {
      .main-tags-item-icon {
        @include icon(#b84e52);
      }
    }
    .main-tags > li:nth-child(4n + 3) {
      .main-tags-item-icon {
        @include icon(#5079c8);
      }
    }
  }

  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
  }

  .header {
    background: #ffda47;
    font-size: 20px;
    line-height: 24px;
    padding: 12px 16px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      display: flex;
      align-items: center;

      .back {
        background: inherit;
        border: none;
        margin-right: 8px;

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }

    .save {
      font-size: 16px;
      border: none;
      background: inherit;
    }
  }

  .current {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    box-shadow: inset 0 -1px 1px -1px rgba(0, 0, 0, 0.3);

    .currentTag {
      display: flex;
      align-items: center;

      .currentIcon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #f7da47;
        color: #f7da47;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 8px;

        svg {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  .content {
    padding-top: 120px;

    .category {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
</style>