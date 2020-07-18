import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store';
const Home = () => import(`../views/Home.vue`);
const Note = () => import(`../views/Note.vue`);
const NotFound = () => import(`../views/NotFound.vue`);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:id",
    name: "Note",
    component: Note,
    async beforeEnter(to, from, next) {
      let exists = store.state.notes.find(item => to.params.id === item.id);
      if (exists) next();
      else {
        await store.dispatch('A_GET_NOTES');
        exists = store.state.notes.find(item => to.params.id === item.id);
        if (exists) next();
        else next({name: 'NotFound'});
      }
    }
  },
  {
    path: '/404',
    alias: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

export default router;
