<template>
  <b-container>
    <authorize-buttons :loggedIn="loggedIn" @logOut="logOut"></authorize-buttons>
    <img :src="'http://smktesting.herokuapp.com/static/' + product.img" :alt="product.title">
    <h2>{{ product.title }}</h2>
    <star-rating v-model="productRating"
      class="justify-content-center mb-2"
      :star-size="25"      
      read-only
      :fixed-points="1"
      :increment="0.01"></star-rating>
    <p>{{ product.text }}</p>
    <hr>

    <b-card v-for="review in shownReviews"
      :key="review.id"
      :header="'Rate:' + review.rate"
      header-class="text-right"
      class="text-left my-2">
      <star-rating slot="header" v-model="review.rate" class="float-right" :show-rating="false" :star-size="15" read-only></star-rating>
      <p class="card-text">
        {{ review.text }}
      </p>
      <div slot="footer" class="text-right">{{ review.created_by.username }},
        <i>{{ new Date(review.created_at).toDateString() }}</i>
      </div>
    </b-card>

    <b-pagination v-if="reviews.length > 3"
      align="center"
      :total-rows="reviews.length"
      v-model="currentPage" :per-page="3">
    </b-pagination>

    <b-form @submit.prevent="addReview" class="border rounded my-3 p-3 container clearfix" v-if="loggedIn">
      <star-rating v-model="usersRating" class="float-right mb-2" :star-size="25"></star-rating>
      
      <b-form-group label="Add comment: " horizontal label-text-align="sm-right" class="w-100">
        <b-form-textarea v-model="usersComment" rows="4" required></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
import AuthorizeButtons from "@/components/AuthorizeButtons.vue";

export default {
  name: "product",
  components: { AuthorizeButtons, StarRating },
  data: function() {
    return {
      token: localStorage.getItem("token"),
      product: JSON.parse(this.$route.params.product),
      reviews: [],
      currentPage: 1,
      usersComment: "",
      usersRating: 0
    };
  },
  computed: {
    loggedIn() {
      return this.token ? true : false;
    },
    shownReviews() {
      return this.reviews.length > 3
        ? this.reviews.slice(this.currentPage * 3 - 3, this.currentPage * 3)
        : this.reviews;
    },
    productRating() {
      const rates = this.reviews.map(({ rate }) => rate);
      const productRating = rates.length ? rates.reduce((a, b) => a + b) / rates.length : null;
      return productRating;
    },
  },
  mounted() {
    this.getReviews();
  },
  methods: {
    addReview() {
      axios({
        method: "post",
        url: `http://smktesting.herokuapp.com/api/reviews/${
          this.$route.params.id
        }`,
        data: { rate: this.usersRating, text: this.usersComment },
        headers: { Authorization: `Token ${this.token}` }
      }).then(response => {
        this.getReviews();
        this.usersComment = "";
        this.usersRating = 0;
      });
    },
    getReviews() {
      axios
        .get(
          `http://smktesting.herokuapp.com/api/reviews/${this.$route.params.id}`
        )
        .then(({ data }) => {
          this.reviews = data;
          /* const rates = this.reviews.map(({ rate }) => rate);
          const productRating = rates.reduce((a, b) => a + b) / rates.length;
          console.log(rates);
          console.log(this.reviews);
          console.log(productRating); */
        });
    },
    logOut() {
      this.token = "";
      localStorage.removeItem("token");
    }
  }
};
</script>
