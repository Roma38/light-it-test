<template>
  <div>
    <b-alert :show="addReviewAlert.dismissCountDown"
              dismissible
              :variant="addReviewAlert.successful ? 'success' : 'danger'"
              @dismissed="addReviewAlert.dismissCountDown=0"
              @dismiss-count-down="countDownChanged"
              class="add-review-alert">
      {{addReviewAlert.successful ? "Your comment was successfuly added" : "Sorry, your comment wasn't added. Please try again"}}
    </b-alert>

    <b-form @submit.prevent="addReview" class="border rounded my-3 p-3 container clearfix" v-if="$store.state.token">
      <star-rating v-model="usersRating" class="float-right mb-2" :star-size="25"></star-rating>
      
      <b-form-group label="Add comment: " horizontal label-text-align="sm-right" class="w-100">
        <b-form-textarea v-model="usersComment" rows="4" required></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";

export default {
  components: { StarRating },
  data: function() {
    return {
      usersComment: "",
      usersRating: 0,
      addReviewAlert: {
        dismissSecs: 5,
        dismissCountDown: 0,
        successful: null
      }
    };
  },
  methods: {
    addReview() {
      axios({
        method: "post",
        url: `http://smktesting.herokuapp.com/api/reviews/${
          this.$route.params.id
        }`,
        data: { rate: this.usersRating, text: this.usersComment },
        headers: { Authorization: `Token ${this.$store.state.token}` }
      })
        .then(() => {
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
