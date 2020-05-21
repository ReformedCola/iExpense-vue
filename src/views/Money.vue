<template>
  <div class="money">
    <div class="types">
      <Tabs class-prefix="types"
            :data-source="recordTypeList"
            :value.sync="record.type"/>
      <button class="cancel" @click="cancel">Cancel</button>
    </div>
    <Tags v-if="record.type === '-'" class-prefix="money"
          :dynamic="true" :selected-tag.sync="record.tags"
          :tag-list="tagList"
          class="tag-list"/>
    <Tags v-else-if="record.type === '+'" class-prefix="money"
          :selected-tag.sync="record.tags"
          :tag-list="incomeTags"
          class="tag-list"/>
    <NumberPad :value.sync="record.amount"
               @submit="saveRecord"
               class-prefix="money"
               :notes.sync="record.notes"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import {defaultIncomeTags} from '@/constants/defaultTags';
  import Tags from '@/components/Money/Tags.vue';

  @Component({
    components: {Tags, NumberPad, Tabs}
  })
  export default class Money extends Vue {
    record: RecordItem = this.initRecord();
    recordTypeList = recordTypeList;
    incomeTags = defaultIncomeTags;

    get tagList(): TagItem[] {
      return this.$store.state.tagList;
    }

    initRecord(): RecordItem {
      return {tags: {name: 'food', value: 'Food'}, notes: '', type: '-', amount: 0};
    }

    created() {
      this.$store.commit('fetchTags');
    }

    cancel() {
      this.$router.replace('/details');
    }

    saveRecord() {
      if (this.record.amount === 0) {
        return window.alert(`Amount Can't Be 0!`);
      }
      this.$store.commit('insertRecord', this.record);
      if (this.$store.state.createRecordError === null) {
        this.record.notes = '';
        this.record = this.initRecord();
        this.$router.replace('/details');
      }
    }

    @Watch('record.type')
    onTypeChange(type: string) {
      if (type === '+') {
        this.record.tags = {name: 'salary', value: 'Salary'};
      } else if (type === '-') {
        this.record.tags = {name: 'food', value: 'Food'};
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .types {
    background: $color-main;
    display: flex;
    justify-content: center;
    position: relative;

    ::v-deep .types-tabs-item {
      padding: 24px 16px 8px 16px;
    }

    .cancel {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      font-size: 14px;
      padding: 24px 16px 8px 16px;
    }
  }

  ::v-deep {
    .money-numberPad {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100vw;
    }
  }

  .money {
    .tag-list {
      padding-bottom: 76+56*4+12px;
    }
  }
</style>
