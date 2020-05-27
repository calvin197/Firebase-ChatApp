import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);
function lazyLoad(view){
  return() => import(`@/views/${view}.vue`)
}
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/chat",
    name: "Chat",
    component: lazyLoad('Chat'),
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
