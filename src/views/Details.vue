<template>
  <Layout>
    <header class="header">
      <div class="info">
        <div class="calendar">
          <select v-model="year" class="year">
            <option v-for="y in years" :key="y" :value="y">{{y}}</option>
          </select>
          <div class="month">
            <select v-model="month">
              <option v-for="m in 12" :key="m" :value="m">{{beautifyMonth(m)}}</option>
            </select>
          </div>
        </div>
        <div class="total">
          <div>
            <div class="label">Income</div>
            <div class="value">
              <span>{{totalIncome.toString().split('.')[0] || 0}}</span>.{{totalIncome.toString().split('.')[1] ||
              '00'}}
            </div>
          </div>
          <div>
            <div class="label">Expense</div>
            <div class="value">
              <span>{{totalExpense.toString().split('.')[0] || 0}}</span>.{{totalExpense.toString().split('.')[1] ||
              '00'}}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </header>
    <ul v-if="groupedList.length > 0" class="record">
      <li v-for="(group, index) in groupedList" :key="index">
        <div class="title">
          <span>{{getTitle(group)}}</span>
          <div class="money">
            <span>
            {{getIncome(group)}}
            </span>
            <span>
            {{getExpense(group)}}
            </span>
          </div>
        </div>
        <div class="items">
          <router-link class="item" v-for="(item, index) in group.items" :key="index" :to="`/record/edit/${item.id}`">
            <div class="tag">
              <Icon :name="item.tags.name" class="icon"/>
              <span>{{item.tags.value}}</span>
            </div>
            <span>{{getAmount(item)}}</span>
          </router-link>
        </div>
      </li>
    </ul>

    <div v-else class="noRecord">
      <Blank/>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import Blank from '@/components/Blank.vue';

  @Component({
    components: {Blank}
  })
  export default class Details extends Vue {
    year = window.sessionStorage.getItem('year') || dayjs().year().toString();
    month = window.sessionStorage.getItem('month') || (dayjs().month() + 1).toString();

    width = window.document.documentElement.clientWidth;

    get years() {
      const endYear = dayjs().year();
      let y = 1970;
      const result: number[] = [];
      while (y <= endYear) {
        result.push(y);
        y++;
      }
      return result;
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    beautifyMonth(m: number) {
      return m < 10 ? '0' + m.toString() : m.toString();
    }

    get groupedList() {
      const result: Group[] = [];
      const names: string[] = [];
      const {recordList} = this;

      const sortedRecordList = clone(recordList)
        .filter(item => (dayjs(item.createdAt).year() === parseInt(this.year)) && (dayjs(item.createdAt).month() + 1 === parseInt(this.month)))
        .sort((b, a) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf());

      let record: RecordItem;
      for (record of sortedRecordList) {
        let date: string;
        if (this.year === dayjs().year().toString()) {
          date = dayjs(record.createdAt).toISOString().split('T')[0];
        } else {
          date = dayjs(record.createdAt).format('MMMM, YYYY');
        }
        const index = names.indexOf(date);
        if (index < 0) {
          names.push(date);
          result.push({name: date, items: [record]});
        } else {
          result[index].items.push(record);
        }
      }
      return result;
    }

    get totalIncome() {
      let total = 0;
      let group: Group;
      for (group of this.groupedList) {
        let record: RecordItem;
        for (record of group.items) {
          if (record.type === '+') {
            total += record.amount;
          }
        }
      }
      return total;
    }

    get totalExpense() {
      let total = 0;
      let group: Group;
      for (group of this.groupedList) {
        let record: RecordItem;
        for (record of group.items) {
          if (record.type === '-') {
            total += record.amount;
          }
        }
      }
      return total;
    }

    toWeekday(value: number) {
      if (value >= 0 && value <= 6) {
        return [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat'
        ][value];
      }
    }

    getTitle(group: Group) {
      const day = dayjs(group.name);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return `Today, ${this.toWeekday(day.day())}`;
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return `Yesterday, ${this.toWeekday(day.day())}`;
      } else if (day.isSame(now, 'year')) {
        return `${day.format('MMMM DD')}, ${this.toWeekday(day.day())}`;
      } else {
        return `${day.format('MMMM, YYYY')}`;
      }
    }

    getIncome(group: Group) {
      let total = 0;
      let item: RecordItem;
      for (item of group.items) {
        if (item.type === '+') {
          total += item.amount;
        }
      }
      return `Income: ${total}`;
    }

    getExpense(group: Group) {
      let total = 0;
      let item: RecordItem;
      for (item of group.items) {
        if (item.type === '-') {
          total += item.amount;
        }
      }
      return `Expense: ${total}`;
    }

    getAmount(record: RecordItem) {
      if (record.type === '+') {
        return record.amount;
      } else {
        return -record.amount;
      }
    }

    @Watch('year')
    saveYear(year: string) {
      window.sessionStorage.setItem('year', year);
    }

    @Watch('month')
    saveMonth(month: string) {
      window.sessionStorage.setItem('month', month);
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .header {
    background: #ffda47;

    .info {
      display: flex;
      align-items: center;
      padding: 4px 0;

      .calendar {
        position: relative;
        padding: 0 16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .year {
          font-size: 12px;
          color: #a38932;
          padding: 0 3px;
          margin-bottom: 5px;
        }

        .month {
          font-size: 12px;
          padding: 0 3px;
          display: flex;
          align-items: center;

          select {
            font-size: 20px;
          }
        }

        &::after {
          content: '';
          display: block;
          width: 1px;
          height: 24px;
          background: #333333;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }

      .label {
        font-size: 12px;
        color: #a38932;
        margin-bottom: 4px;
      }

      .value {
        font-size: 12px;

        span {
          font-size: 20px;
        }
      }

      .total {
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        padding: 4px 16px;
      }
    }
  }

  .record {
    > li {
      .title {
        font-size: 12px;
        color: #999999;
        display: flex;
        justify-content: space-between;
        padding: 4px 16px;
        border-bottom: 1px solid #dddddd;

        .money {
          display: flex;
          justify-content: space-between;

          span {
            padding-left: 8px;
            padding-right: -2px;
          }
        }
      }

      .items {
        display: flex;
        flex-direction: column;
        padding: 12px 16px;

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          box-shadow: inset 0 -0.5px 0.5px -0.5px rgba(0, 0, 0, 0.2);

          .tag {
            display: flex;
            align-items: center;

            .icon {
              background: #ffda47;
              width: 30px;
              height: 30px;
              padding: 4px;
              border-radius: 50%;
              margin-right: 16px;
            }
          }
        }
      }
    }
  }

  .noRecord {
    margin-top: 20vh;
  }

</style>