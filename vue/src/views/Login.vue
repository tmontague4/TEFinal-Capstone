<template>
<div id= globalmenu>
  <global-menu :login="true"/>
  <div id="login" class="text-center">
    <form class="form-signin" @submit.prevent="login">
      <h2> Please Sign In To Get Started</h2>
      <div
        class="alert alert-danger"
        role="alert"
        v-if="invalidCredentials"
      >Invalid username and password!</div>
      <div
        class="alert alert-success"
        role="alert"
        v-if="this.$route.query.registration"
      >Thank you for registering, please sign in.</div>
      <label for="username" class="sr-only">Username</label>
      <input
        type="text"
        id="username"
        class="form-control"
        placeholder="Username"
        v-model="user.username"
        required
        autofocus
      />
      <br>
      <label for="password" class="sr-only">Password</label>
      <input
        type="password"
        id="password"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      />
      <br>
      <router-link :to="{ name: 'register' }">Not yet a member? Click here to register.</router-link>
      <br>
      <button type="submit">Sign in</button>
    </form>
  </div>
  </div>
</template>

<script>
import authService from "../services/AuthService";
import GlobalMenu from "../components/GlobalMenu.vue";

export default {
  name: "login",
  components: {
    GlobalMenu
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      invalidCredentials: false
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then(response => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch(error => {
          const response = error.response;

          if (response.status === 401) {
            this.invalidCredentials = true;
          }
        });
    }
  }
};
</script>
<style>
body{
  text-align: center;
}
#paw-print {
  height:400px;
  width: auto;
}
#login{

  
}
</style>

