import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AuthorizeForm from "./views/AuthorizeForm.vue";
import Product from "./views/Product.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      component: AuthorizeForm
    },
    {
      path: "/login",
      name: "login",
      component: AuthorizeForm
    },
    {
      path: "/product/:id",
      name: "product",
      component: Product
    }
  ]
});
