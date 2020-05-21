import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import NotFound from '@/views/NotFound.vue';
import EditLabel from '@/views/EditLabel.vue';
import EditTag from '@/views/EditTag.vue';
import Details from '@/views/Details.vue';
import EditRecord from '@/views/EditRecord.vue';
import Charts from '@/views/Charts.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/details'
  },
  {
    path: '/details',
    component: Details
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/edit-tag',
    component: EditTag
  },
  {
    path: '/charts',
    component: Charts
  },
  {
    path: '/record/edit/:id',
    component: EditRecord
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel
  },
  {
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
