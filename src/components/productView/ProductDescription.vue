<template>
  <spinner v-if="$store.state.productListRequest === 'loading'"></spinner>
  <something-wrong v-else-if="$store.state.productListRequest === 'failure'"></something-wrong>
  <div v-else>
    <img :src="'http://smktesting.herokuapp.com/static/' + product.img" :alt="product.title">
    <h2>{{ product.title }}</h2>
    <star-rating v-model="productRating"
      class="justify-content-center mb-2"
      :star-size="25"      
      read-only
      :fixed-points="1"
      :increment="0.01"></star-rating>
    <p>{{ product.text }}</p>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import Spinner from "@/components/Spinner.vue";
import SomethingWrong from "@/components/SomethingWrong.vue";

export default {
  components: { StarRating, Spinner, SomethingWrong },
  data: function() {
    return {
      productRating: 0
    };
  },
  computed: {
    product() {
      return this.$store.state.productList.find(
        product => product.id === parseInt(this.$route.params.id)
      );
    }
  },
  mounted() {
    this.$parent.$on(
      "gotRating",
      productRating => (this.productRating = productRating)
    );

    if (!this.product) {
      this.$store.dispatch("getProducts");
    }
  }
};
</script>
