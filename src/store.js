import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productList: [],
    productListRequest: "loading",
    token: localStorage.getItem("token")
  },
  mutations: {
    setProductList(state, productList) {
      state.productList = productList;
    },
    setProductListRequest(state, requestState) {
      state.productListRequest = requestState;
    },
    updateToken(state) {
      state.token = localStorage.getItem("token");
    }
  },
  actions: {
    getProducts({ commit }) {
      const headers = this.state.token
        ? { headers: { Authorization: `Token ${this.state.token}` } }
        : {};
      axios
        .get("http://smktesting.herokuapp.com/api/products/", headers)
        .then(({ data }) => {
          commit("setProductList", data);
          commit("setProductListRequest", "success");
        })
        .catch(error => {
          commit("setProductListRequest", "failure");
          console.log(error);
        });
    }
  }
});
