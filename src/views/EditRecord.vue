<template>
  <div class="edit">
    <header class="header">
      <button class="back" @click="back">
        <Icon name="left"/>
      </button>
      <div class="tag">
        <div class="icon-wrapper">
          <Icon :name="record.tags.name"/>
        </div>
        <span>{{record.tags.value}}</span>
      </div>
      <div class="back"></div>
    </header>
    <main>
      <ul class="main">
        <li>
          <label>
            <span class="name">Type</span>
            <div class="type">{{record.type === '-' ? 'Expense' : 'Income'}}</div>
          </label>
        </li>
        <li>
          <label>
            <span class="name">Amount</span>
            <input type="text" v-model="record.amount">
          </label>
        </li>
        <li>
          <label class="date">
            <span class="name">Date</span>
            <DateDisplayer :initial-date="dayjs(record.createdAt).toISOString()"
                           @update:year="updateYear"
                           @update:month="updateMonth"
                           @update:date="updateDate"/>
          </label>
        </li>
        <li>
          <label>
            <span class="name">Notes</span>
            <input type="text" v-model="record.notes">
          </label>
        </li>
      </ul>
    </main>
    <footer class="footer">
      <button @click="save">Save</button>
      <button @click="remove">Delete</button>
    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import clone from '@/lib/clone';
  import DateDisplayer from '@/components/DateDisplayer.vue';
  import dayjs from 'dayjs';

  @Component({
    components: {DateDisplayer}
  })
  export default class EditRecord extends Vue {
    record?: RecordItem;
    dayjs = dayjs;

    get currentRecord() {
      return this.$store.state.currentRecord;
    }

    created() {
      const id = parseInt(this.$route.params.id);
      this.$store.commit('fetchRecords');
      this.$store.commit('setCurrentRecord', id);
      this.record = clone<RecordItem>(this.currentRecord);
      if (!this.record) {
        this.record = {
          id: 0,
          tags: {name: 'food', value: 'Food'},
          type: '-',
          notes: '',
          amount: 0,
          createdAt: new Date().toISOString()
        };
        this.$router.replace('/error');
      }
    }

    updateYear(year: number) {
      if (this.record) {
        this.record.createdAt = dayjs(this.record.createdAt).year(year).toDate().toISOString();
      }
    }

    updateMonth(month: number) {
      if (this.record) {
        this.record.createdAt = dayjs(this.record.createdAt).month(month - 1).toDate().toISOString();
      }
    }

    updateDate(date: number) {
      if (this.record) {
        this.record.createdAt = dayjs(this.record.createdAt).date(date).toDate().toISOString();
      }
    }

    back() {
      this.$router.replace('/');
    }

    save() {
      if (this.record) {
        this.record.amount = parseFloat(this.record.amount.toString());
        this.$store.commit('updateRecord', {id: this.record.id, record: this.record});
      }
      this.$router.replace('/');
    }

    remove() {
      if (this.record) {
        this.$store.commit('removeRecord', this.record.id);
        if (this.$store.state.createRecordError === 'Not Found') {
          window.alert('Record does not exist');
        } else {
          this.$router.replace('/');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .edit {
    position: relative;
    height: 100vh;
  }

  .header {
    background: #ffda47;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;

    .back {
      width: 32px;
      height: 32px;

      svg {
        width: 24px;
        height: 24px;
      }
    }

    .tag {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;

      .icon-wrapper {
        background: #f5f5f5;
        padding: 8px;
        border-radius: 50%;
        margin-bottom: 8px;
        width: 48px;
        height: 48px;

        svg {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  .main {
    font-size: 16px;

    > li {
      margin-left: 16px;
      border-bottom: 1px solid #dddddd;

      > label {
        display: flex;
        align-items: center;

        .name {
          color: #999999;
          margin-right: 16px;
        }

        .type {
          display: flex;
          align-items: center;
          min-height: 40px;
        }

        input {
          flex-grow: 1;
          min-height: 40px;
          border: none;
          font-size: inherit;
        }
      }
    }
  }

  .footer {
    @extend %outerShadow;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #dddddd;
    padding: 0 16px;

    button {
      width: 50%;
      font-size: 14px;
      padding: 4px 0;
      margin: 12px 0;

      &:first-child {
        border-right: 1px solid #dddddd;
      }

      &:last-child {
        color: #b84e52;
      }
    }
  }
</style>