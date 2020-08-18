<template>
  <ul class="tags" :class="{[classPrefix+'-tags']: classPrefix}">
    <li v-for="(tag, index) in tagList" :key="index"
        class="tags-item"
        @click="select(tag)"
        :class="{[classPrefix+'-tags-item']: classPrefix }">
      <div class="tags-item-icon"
           :class="{'selected': tag.name === selectedTag.name,
                    [classPrefix+'-tags-item-icon']: classPrefix}">
        <Icon :name="tag.name"/>
      </div>
      <span>{{ tag.value }}</span>
    </li>
    <li v-if="dynamic" class="tags-item">
      <div class="tags-item-icon" @click="add">
        <Icon name="addTag"/>
      </div>
      <span>More</span>
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import {TagHelper} from '@/mixins/TagHelper';

@Component
export default class Tags extends mixins(TagHelper) {
  @Prop(String) classPrefix?: string;
  @Prop({required: true, type: Object}) selectedTag!: TagItem;
  @Prop({type: Boolean, default: false}) dynamic!: boolean;
  @Prop({required: true, type: Array}) tagList!: TagItem[];

  // created() {
  //   this.$store.commit('fetchTags');
  // }


  select(tag: TagItem) {
    this.$emit('update:selectedTag', tag);
  }

  add() {
    this.$router.replace('/edit-tag');
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

.tags {
  padding: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;

  &-item {
    width: 25%;
    padding: 12px 0;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-icon {
      width: 48px;
      height: 48px;
      padding: 4px;
      border-radius: 50%;
      background: #f5f5f5;
      margin-bottom: 4px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.selected {
        background: #ffda47;
      }

      svg {
        width: 30px;
        height: 30px;
      }
    }
  }

  ::v-deep {
    li:nth-child(4n + 0) {
      .tags-item-icon {
        @include icon(#a4d09f);
      }
    }
    li:nth-child(4n + 1) {
      .tags-item-icon {
        @include icon(#ffda47);
      }
    }
    li:nth-child(4n + 2) {
      .tags-item-icon {
        @include icon(#b84e52);
      }
    }
    li:nth-child(4n + 3) {
      .tags-item-icon {
        @include icon(#5079c8);
      }
    }
  }
}
</style>
