import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import {defaultExpenseTags} from '@/constants/defaultTags';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentRecord: undefined,
    createRecordError: null,
    createTagError: null,
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    insertRecord(state, record: RecordItem) {
      state.createRecordError = null;
      record.id = createId();
      const record2 = clone(record);
      record2.createdAt = new Date().toISOString();
      console.log(record2);
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    setCurrentRecord(state, id: number) {
      state.currentRecord = undefined;
      const record = state.recordList.filter(item => item.id === id)[0];
      if (record) {
        state.currentRecord = record;
      }
    },
    updateRecord(state, payload: { id: number; record: RecordItem }) {
      const {id, record} = payload;
      let index = 0;
      for (index = 0; index < state.recordList.length; index++) {
        if (state.recordList[index].id === id) {
          state.recordList[index] = record;
          break;
        }
      }
      store.commit('saveRecords');
    },
    removeRecord(state, id: number) {
      state.createRecordError = null;
      let index = 0;
      for (index = 0; index < state.recordList.length; index++) {
        if (state.recordList[index].id === id) {
          break;
        }
      }
      if (index === state.recordList.length) {
        state.createRecordError = new Error('Not Found');
      } else {
        state.recordList.splice(index, 1);
        store.commit('saveRecords');
      }
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '0') || defaultExpenseTags;
    },
    insertTag(state, tag: TagItem) {
      state.createTagError = null;
      const tag2 = clone(tag);
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('Duplicated Tag');
        return;
      }
      state.tagList.push(tag2);
      store.commit('saveTags');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
  }
});

export default store;
