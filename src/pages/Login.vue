<template>
  <div style="background-color: #324755; height: 100vh">
    <v-card
      class="mx-auto top"
      max-width="500"
      style="border-radius: 10px; background-color: #324755"
      flat
    >
      <div class="pt-1">
        <img
          src="@/assets/img/montrac_logo.png"
          height="70px"
          style="
            margin-left: auto;
            margin-right: auto;
            display: block;
            padding-top: 1rem;
          "
        />
      </div>
      <v-card-title
        class="pt-3 mb-4"
        style="
          font-size: 2.25rem;
          text-align: center;
          display: block;
          color: #fff;
        "
        >Montrac</v-card-title
      >
      <v-form v-model="isValid">
        <v-text-field
          class="text"
          id="email"
          label="Email"
          type="email"
          clearable
          required
          :rules="emailRules"
          v-model="user.email"
          outlined
        ></v-text-field>
        <v-text-field
          class="text"
          id="password"
          label="Contraseña"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          v-model="user.password"
          clearable
          required
          :rules="rules"
          outlined
          @keyup.enter="handleLogin"
        ></v-text-field>
        <v-card-actions>
          <v-btn
            :disabled="!isValid"
            class="mx-auto"
            block
            style="border-radius: 10px"
            color="#D97D54"
            dark
            @click="handleLogin"
            >Iniciar Sesión</v-btn
          >
        </v-card-actions>
        <v-card-actions>
          <v-btn
            id="register"
            to="/register"
            block
            style="border-radius: 10px"
            class="mx-auto"
            dark
            color="#393e4e"
            type="submit"
            >Aun no tienes cuenta</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: Object,
      show: false,
      loading: false,
      isValid: true,
      emailRules: [
        (v) => !!v || "Email es requerido",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail inválido.",
      ],
      rules: [(v) => !!v || "Este campo es requerido"],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (!this.isValid) {
        this.loading = false;
        return;
      }
      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          (user) => {
            this.$router.push("/");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.top {
  padding-top: 4em;
  padding-bottom: 0.3em;
}
.text {
  margin-left: 1.5em;
  margin-right: 1em;
}
.text > label,
input {
  color: rgba(255, 255, 255, 0.7) !important;
}
@media screen and (max-width: 570px) {
  .top {
    margin-top: 0;
  }
}
</style>
