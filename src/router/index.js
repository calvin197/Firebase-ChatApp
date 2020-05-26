import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Chat from "../views/Chat.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    props: true,
    // prevent user going to chat view without logging in
    beforeEnter: (to, from, next) => {
      if (to.params.name) {
        next();
      } else {
        next({ name: "Login" });
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
