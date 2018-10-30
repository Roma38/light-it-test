<template>
  <b-container>
    <product-descrition></product-descrition>
<!--  :productRating="productRating" -->
    <hr>
    <comments-cards></comments-cards>
    <comment-form></comment-form>
  </b-container>
</template>

<script>
import ProductDescrition from "@/components/productView/ProductDescription.vue";
import CommentsCards from "@/components/productView/CommentsCards.vue";
import CommentForm from "@/components/productView/CommentForm.vue";

export default {
  name: "product",
  components: { ProductDescrition, CommentsCards, CommentForm }
};
</script>
