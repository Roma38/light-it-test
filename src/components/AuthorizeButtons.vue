<template>
  <b-row class="text-right pb-3">
    <b-col>
      <b-button @click="$emit('logOut')" v-if="loggedIn">Log out</b-button>

      <b-button-group v-else>
        <router-link to="/register" tag="b-button">Registration</router-link>
        <router-link to="/login" tag="b-button">Login</router-link>
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "AuthorizeButtons",
  props: {
    loggedIn: Boolean
  }
};
</script>
