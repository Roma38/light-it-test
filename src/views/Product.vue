<template>
  <b-container>
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

    <hr>

    <spinner v-if="reviewsRequest === 'loading'"></spinner>
    <something-wrong v-else-if="reviewsRequest === 'failure'"></something-wrong>
    <b-card v-else v-for="review in shownReviews"
      :key="review.id"
      class="text-left my-3">           
      <div slot="header" class="text-left">{{ review.created_by.username }}
        <star-rating v-model="review.rate" class="float-right" :show-rating="false" :star-size="15" read-only></star-rating> 
        <i class="float-right mr-3 text-secondary">{{ new Date(review.created_at).toDateString() }}</i>        
      </div>
      <p class="card-text">{{ review.text }}</p>
    </b-card>

    <b-pagination v-if="reviews.length > 3"
      align="center"
      :total-rows="reviews.length"
      v-model="currentPage" :per-page="3">
    </b-pagination>

    <b-alert :show="addReviewAlert.dismissCountDown"
             dismissible
             :variant="addReviewAlert.successful ? 'success' : 'danger'"
             @dismissed="addReviewAlert.dismissCountDown=0"
             @dismiss-count-down="countDownChanged"
             class="add-review-alert">
      {{addReviewAlert.successful ? "Your comment was successfuly added" : "Sorry, your comment wasn't added. Please try again"}}
    </b-alert>

    <b-form @submit.prevent="addReview" class="border rounded my-3 p-3 container clearfix" v-if="token">
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
import Spinner from "@/components/Spinner.vue";
import SomethingWrong from "@/components/SomethingWrong.vue";

export default {
  name: "product",
  components: { StarRating, Spinner, SomethingWrong },
  data: function() {
    return {
      reviews: [],
      currentPage: 1,
      usersComment: "",
      usersRating: 0,
      reviewsRequest: "loading",
      addReviewAlert: {
        dismissSecs: 5,
        dismissCountDown: 0,
        successful: null
      }
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
    product() {
      return this.$store.state.productList.find(
        product => product.id === parseInt(this.$route.params.id)
      );
    },
    shownReviews() {
      return this.reviews.length > 3
        ? this.reviews.slice(this.currentPage * 3 - 3, this.currentPage * 3)
        : this.reviews;
    },
    productRating() {
      const rates = this.reviews.map(({ rate }) => rate);
      const productRating = rates.length
        ? rates.reduce((a, b) => a + b) / rates.length
        : null;
      return productRating;
    }
  },
  mounted() {
    this.getReviews();
    if (!this.product) {
      this.$store.dispatch("getProducts");
    }
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
      })
        .then(() => {
          this.getReviews();
          this.addReviewAlert.successful = true;
          this.showAlert();
          this.usersComment = "";
          this.usersRating = 0;
        })
        .catch(error => {
          this.addReviewAlert.successful = false;
          this.showAlert();
          console.error(error);
        });
    },
    getReviews() {
      const headers = this.token
        ? { headers: { Authorization: `Token ${this.token}` } }
        : {};
      axios
        .get(
          `http://smktesting.herokuapp.com/api/reviews/${
            this.$route.params.id
          }`,
          headers
        )
        .then(({ data }) => {
          this.reviews = data;
          this.reviewsRequest = "succes";
        })
        .catch(error => {
          this.reviewsRequest = "failure";
          console.error(error);
        });
    },
    countDownChanged(dismissCountDown) {
      this.addReviewAlert.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.addReviewAlert.dismissCountDown = this.addReviewAlert.dismissSecs;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-review-alert {
  width: 300px;
  position: fixed;
  top: 60px;
  right: 30px;
  opacity: 0.8;
}
</style>
