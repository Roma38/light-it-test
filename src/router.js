import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AuthorizeForm from "./views/AuthorizeForm.vue";
import Product from "./views/Product.vue";

Vue.use(Router);

/* function dynamicPropsFn(route) {

} */

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
      path: "/product/:id/:product",
      name: "product",
      component: Product
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
