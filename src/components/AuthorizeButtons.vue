<template>
  <b-row class="text-right pb-3">
    <b-col>
      <b-button @click="logOut" v-if="loggedIn" class="my-buttons">Log out</b-button>

      <b-button-group v-else>
        <router-link to="/register" tag="b-button" class="my-buttons">Registration</router-link>
        <router-link to="/login" tag="b-button" class="my-buttons">Login</router-link>
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "AuthorizeButtons",
  computed: {
    loggedIn() {
      return this.$store.state.token ? true : false;
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$store.commit("updateToken");
    }
  }
};
</script>
