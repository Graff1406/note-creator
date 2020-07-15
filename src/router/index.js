import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import(`../views/Home.vue`);
const Note = () => import(`../views/Note.vue`);

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
    component: Note
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
