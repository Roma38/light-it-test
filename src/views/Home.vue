<template>
  <b-container>
    <spinner v-if="$store.state.productListRequest === 'loading'"></spinner>
    <something-wrong v-else-if="$store.state.productListRequest === 'failure'"></something-wrong>
    <b-card-group v-else deck>      
      <b-card v-for="product in productList"
        :key="product.id" 
        :title="product.title"
        :img-src="'http://smktesting.herokuapp.com/static/' + product.img"
        :img-alt="product.title"
        img-top
        style="max-width: 15rem;">        
        <router-link :to="`/product/${product.id}`" tag="b-button" slot="footer">read more</router-link>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Spinner from "@/components/Spinner.vue";
import SomethingWrong from "@/components/SomethingWrong.vue";

export default {
  name: "home",
  components: { Spinner, SomethingWrong },
  computed: {
    productList() {
      return this.$store.state.productList;
    },
    token() {
      return this.$store.state.token;
    }
  },
  mounted() {
    this.$store.dispatch("getProducts");
  }
};
</script>

<style lang="scss" scoped>
.login-btn {
  background-color: #28a745;
}
</style>
