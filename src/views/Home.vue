<template>
  <b-container>
    <authorize-buttons :loggedIn="loggedIn" @logOut="logOut"></authorize-buttons>
    <b-card-group deck>
      <b-card v-for="product in productList"
        :key="product.id" 
        :title="product.title"
        :img-src="'http://smktesting.herokuapp.com/static/' + product.img"
        :img-alt="product.title"
        img-top
        style="max-width: 15rem;">        
        <router-link :to="'/product/' + product.id + '/' + JSON.stringify(product)" tag="b-button" slot="footer">read more</router-link>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import AuthorizeButtons from "@/components/AuthorizeButtons.vue";

export default {
  name: "home",
  components: { AuthorizeButtons },
  data: function() {
    return {
      token: localStorage.getItem("token"),
      productList: []
    };
  },
  computed: {
    loggedIn() {
      return this.token ? true : false;
    }
  },
  methods: {
    logOut() {
      this.token = "";
      localStorage.removeItem("token");
    }
  },
  mounted() {
    axios
      .get("http://smktesting.herokuapp.com/api/products/")
      .then(({ data }) => {
        this.productList = data;
      });
  }
};
</script>

<style lang="scss" scoped>
.login-btn {
  background-color: #28a745;
}
</style>
