<template>
  <div>
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
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
import Spinner from "@/components/Spinner.vue";
import SomethingWrong from "@/components/SomethingWrong.vue";

export default {
  components: { StarRating, Spinner, SomethingWrong },
  data: function() {
    return {
      reviews: [],
      currentPage: 1,
      reviewsRequest: "loading"
    };
  },
  computed: {
    shownReviews() {
      return this.reviews.length > 3
        ? this.reviews.slice(this.currentPage * 3 - 3, this.currentPage * 3)
        : this.reviews;
    }
  },
  methods: {
    averageRating() {
      const rates = this.reviews.map(({ rate }) => rate);
      const averageRating = rates.length
        ? rates.reduce((a, b) => a + b) / rates.length
        : null;
      this.$parent.$emit("gotRating", averageRating);
    }
  },
  mounted() {
    const headers = this.$store.state.token
      ? { headers: { Authorization: `Token ${this.$store.state.token}` } }
      : {};
    axios
      .get(
        `http://smktesting.herokuapp.com/api/reviews/${this.$route.params.id}`,
        headers
      )
      .then(({ data }) => {
        this.reviews = data;
        this.reviewsRequest = "succes";
        this.averageRating();
      })
      .catch(error => {
        this.reviewsRequest = "failure";
        console.error(error);
      });
  }
};
</script>
