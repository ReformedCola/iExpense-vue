<template>
  <Layout>
    <header class="header">
      <select v-model="type" class="type">
        <option v-for="(t, index) in recordTypeList" :key="index" :value="t.value">{{t.name}}</option>
      </select>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    </header>
    <div class="chart">
      <div class="title">
        <span v-if="interval === 'week'">This Week</span>
        <span v-else-if="interval === 'month'">This Month</span>
        <span v-else>This Year</span>
      </div>
      <div class="total">Total Expense: {{total}}</div>
      <div class="average">Average: {{average}}</div>
      <div id="figure"></div>
    </div>
    <div class="ranking">
      <div class="caption">
        <span>Expense Ranking</span>
      </div>
      <ul class="tag-list" v-if="targetRecords.length > 0">
        <li class="tag-item" v-for="(item, index) in this.groupByTag()" :key="index">
          <div class="tag-info">
            <div class="icon-wrapper">
              <Icon :name="item.tag.name"/>
            </div>
            <span>{{item.tag.value}}</span>
            <span>{{item.percentage}}%</span>
          </div>
          <div>{{item.amount}}</div>
        </li>
      </ul>
      <div v-else class="noRecord">
        <Blank/>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import {twoDecimalPlaces} from '@/lib/decimal';
  import Blank from '@/components/Blank.vue';
  import echarts from 'echarts';

  @Component({
    components: {Blank, Tabs}
  })
  export default class Charts extends Vue {
    recordTypeList = recordTypeList;
    intervalList = intervalList;

    type: '+' | '-' = '-';
    interval: 'week' | 'month' | 'year' = 'week';

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get targetRecords() {
      const now = dayjs();
      return clone<RecordItem[]>(this.recordList)
        .filter(item => item.type === this.type)
        .filter(item => dayjs(item.createdAt).isSame(now, this.interval));
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    get total() {
      const amounts = [...this.groupByInterval().values()];
      let sum = 0;
      for (let i = 0; i < amounts.length; i++) {
        sum += amounts[i];
      }
      return sum;
    }

    get average() {
      const now = dayjs();
      switch (this.interval) {
        case 'week':
          return twoDecimalPlaces(this.total / (now.day() + 1));
        case 'month':
          return twoDecimalPlaces(this.total / now.date());
        case 'year':
          return twoDecimalPlaces(this.total / (now.month() + 1));
        default:
          return 0;
      }
    }

    groupByInterval(): Map<string, number> {
      let result = new Map<string, number>();
      switch (this.interval) {
        case 'week':
          result = this.groupByWeek(this.targetRecords);
          break;
        case 'month':
          result = this.groupByMonth(this.targetRecords);
          break;
        case 'year':
          result = this.groupByYear(this.targetRecords);
          break;
      }
      return result;
    }

    groupByTag(): ChartGroup[] {
      const tags: string[] = [];
      let result: ChartGroup[] = [];
      let record: RecordItem;
      for (record of this.targetRecords) {
        const index = tags.indexOf(record.tags.name);
        if (index < 0) {
          tags.push(record.tags.name);
          result.push({tag: record.tags, amount: record.amount, percentage: 0});
        } else {
          result[index].amount += record.amount;
        }
      }
      for (let i = 0; i < result.length; i++) {
        result[i].percentage = twoDecimalPlaces(result[i].amount * 100 / this.total);
      }
      result = result.sort((b, a) => a.percentage - b.percentage);
      return result;
    }

    get days() {
      const [year, month] = [dayjs().year(), dayjs().month()];
      const d = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
        if (month === 1) {
          return 29;
        } else {
          return d[month];
        }
      } else {
        return d[month];
      }
    }

    groupByWeek(records: RecordItem[]): Map<string, number> {
      const keys = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const result = new Map<string, number>();
      let i: number;
      for (i = 0; i < keys.length; i++) {
        result.set(keys[i], 0);
      }
      let record: RecordItem;
      for (record of records) {
        const key = keys[dayjs(record.createdAt).day()];
        const amount = result.get(key) as number;
        result.set(key, amount + record.amount);
      }
      return result;
    }

    groupByMonth(records: RecordItem[]): Map<string, number> {
      const keys: string[] = [];
      const result = new Map<string, number>();
      let i: number;
      for (i = 1; i < this.days; i++) {
        keys.push(i.toString());
      }
      for (i = 0; i < keys.length; i++) {
        result.set(keys[i], 0);
      }
      let record: RecordItem;
      for (record of records) {
        const key = dayjs(record.createdAt).date().toString();
        const amount = result.get(key) as number;
        result.set(key, amount + record.amount);
      }
      return result;
    }

    groupByYear(records: RecordItem[]): Map<string, number> {
      const keys = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const result = new Map<string, number>();
      let i: number;
      for (i = 0; i < keys.length; i++) {
        result.set(keys[i], 0);
      }
      let record: RecordItem;
      for (record of records) {
        const key = keys[dayjs(record.createdAt).month()];
        const amount = result.get(key) as number;
        result.set(key, amount + record.amount);
      }
      return result;
    }

    toArray(value: number, length: number): number[] {
      const result: number[] = [];
      for (let i = 0; i < length; i++) {
        result.push(value);
      }
      return result;
    }

    draw(data: Map<string, number>) {
      const x = [...data.keys()];
      const y = [...data.values()];

      const figure = echarts.init(document.getElementById('figure') as HTMLDivElement);
      figure.setOption({
        grid: {
          top: '5%',
          bottom: '10%'
        },
        xAxis: {
          data: x,
          axisTick: {
            interval: 0,
            lineStyle: {
              opacity: 0
            }
          },
          axisLabel: {
            interval: 0,
            fontSize: 8,
            color: '#999999'
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              opacity: 0
            }
          },
          splitLine: {
            lineStyle: {
              opacity: 0
            }
          },
          axisLabel: undefined,
          axisTick: undefined,
        },
        series: [{
          type: 'line',
          data: y,
        }, {
          name: 'average-line',
          type: 'line',
          data: this.toArray(this.average, x.length),
          symbol: 'none',
          lineStyle: {
            type: 'dashed',
            color: '#999999',
            width: 1,
            opacity: 0.5
          }
        }, {
          name: 'maximum-line',
          type: 'line',
          data: this.toArray(Math.max(...y), x.length),
          symbol: 'none',
          lineStyle: {
            color: '#999999',
            width: 1,
            opacity: 0.5
          }
        }]
      });
    }

    mounted() {
      this.draw(this.groupByInterval());
    }

    @Watch('type')
    onTypeChange() {
      this.draw(this.groupByInterval());
    }

    @Watch('interval')
    onIntervalChange() {
      this.draw(this.groupByInterval());
    }

  }
</script>

<style lang="scss" scoped>
  .header {
    background: #ffda47;
    padding: 4px 0;

    .type {
      font-size: 20px;
      padding: 4px 8px;
    }

    ::v-deep {
      .interval-tabs {
        display: flex;
        justify-content: center;
        margin: 8px 16px;

        .interval-tabs-item {
          font-size: 14px;
          width: 33%;
          border: 1px solid #333333;
          padding: 4px;
          height: 30px;

          &:first-child {
            border-radius: 4px 0 0 4px;
            border-right: none;
          }

          &:last-child {
            border-radius: 0 4px 4px 0;
            border-left: none;
          }

          &.selected {
            background: #333333;
            color: #ffda47;
          }

          &.selected::after {
            border-bottom: none;
          }
        }
      }
    }
  }

  .chart {
    padding: 6px 0;
    border-bottom: 1px solid #dddddd;

    .title {
      border-bottom: 1px solid #dddddd;
      display: flex;

      span {
        padding: 8px 16px;
        font-size: 14px;
      }
    }

    .total {
      font-size: 14px;
      color: #999999;
      text-align: left;
      padding: 6px 6px;
    }

    .average {
      font-size: 12px;
      color: #999999;
      text-align: left;
      padding: 0 6px;
      margin-bottom: 16px;
    }

    #figure {
      width: 100%;
      height: 150px;
    }
  }

  .ranking {
    .caption {
      text-align: left;
      font-size: 14px;
      padding: 6px 16px;
    }

    .tag-list {
      padding: 6px 16px;

      .tag-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        box-shadow: inset 0 -1px 1px -1px rgba(0, 0, 0, 0.1);
        font-size: 14px;

        .tag-info {
          display: flex;
          align-items: center;

          .icon-wrapper {
            background: #ffda47;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 8px;

            svg {
              width: 24px;
              height: 24px;
            }
          }

          span {
            margin-right: 8px;
            line-height: 32px;
          }
        }
      }
    }
  }

  .reverse {
    margin-top: 36px;
  }
</style>