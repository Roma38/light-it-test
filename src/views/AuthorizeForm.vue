<template>
  <div class="wrapper">
    <b-form @submit.prevent="onSubmit">
      <b-form-group horizontal label="User name:" label-cols="5" label-text-align="sm-right">
        <b-form-input v-model="username" type="text" required></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Password:" label-cols="5" label-text-align="sm-right">
        <b-form-input v-model="password" type="password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>

      <b-alert class="mt-4" variant= "danger" dismissible :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
        {{ message }}
      </b-alert>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      username: "",
      password: "",
      showDismissibleAlert: false,
      success: null,
      message: ""
    };
  },
  methods: {
    onSubmit() {
      const { username, password } = this;

      axios
        .post(`http://smktesting.herokuapp.com/api/${this.$route.name}/`, {
          username,
          password
        })
        .then(({ data }) => {
          if (data.success) {
            localStorage.setItem("token", data.token);
            this.$store.commit("updateToken");
            this.$router.push("/");
          } else {
            this.success = data.success;
            this.showDismissibleAlert = true;
            this.message = data.message;
          }
        })
        .catch(error => {
          this.showDismissibleAlert = true;
          this.message = "Oops... something went wrong :(";
          console.error(error);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.wrapper {
  display: inline-block;
  margin: 0 auto;
}
</style>
