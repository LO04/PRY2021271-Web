<template>
  <v-card
    class="mx-auto top"
    max-width="500"
    style="border-radius: 10px; background-color: #324755"
    flat
  >
    <div class="pt-1">
      <img
        src="@/assets/montrac_logo.png"
        class="white--text align-end"
        height="50px"
        style="
          margin-left: auto;
          margin-right: auto;
          display: block;
          padding-top: 1rem;
        "
      />
    </div>
    <v-card-title class="justify-center pt-3" style="font-size: 2.25rem"
      >Montrac</v-card-title
    >
    <v-form v-model="isValid">
      <v-text-field
        class="text"
        id="email"
        label="Nombres"
        type="email"
        clearable
        required
        v-model="model.firstName"
        :rules="rules"
      ></v-text-field>
      <v-text-field
        class="text"
        id="email"
        label="Apellidos"
        type="email"
        clearable
        v-model="model.lastName"
        required
        :rules="rules"
      ></v-text-field>
      <v-text-field
        class="text"
        id="email"
        label="DNI"
        clearable
        :rules="identificationRules"
        v-model="model.identification"
        required
        maxlength="8"
      ></v-text-field>
      <v-text-field
        class="text"
        id="email"
        label="Teléfono"
        clearable
        v-model="model.phoneNumber"
        required
        maxlength="9"
        :rules="phoneNumberRules"
      ></v-text-field>
      <v-text-field
        class="text"
        id="email"
        label="Correo"
        type="email"
        v-model="model.email"
        clearable
        required
        :rules="emailRules"
      ></v-text-field>
      <v-text-field
        class="text"
        label="Contraseña"
        v-model="model.password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        counter
        clearable
        required
      ></v-text-field>
      <v-card-actions>
        <v-btn
          :disabled="!isValid"
          class="mx-auto"
          block
          style="border-radius: 10px"
          color="#D97D54"
          dark
          @click="handleRegister()"
          >Registrar</v-btn
        >
      </v-card-actions>
      <v-card-actions>
        <v-btn
          id="login"
          to="/login"
          block
          style="border-radius: 10px"
          class="mx-auto"
          dark
          color="#393e4e"
          >¿Ya tienes cuenta?</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import UserService from "@/services/user-service";
export default {
  name: "register",
  data() {
    return {
      show: false,
      show1: false,
      isValid: true,
      model: {
        firstName: "",
        lastName: "",
        identification: "",
        phoneNumber: "",
        email: "",
        password: "",
      },
      rules: [(v) => !!v || "Este campo es requerido"],
      identificationRules: [
        (v) => !!v || "DNI es requerido",
        (v) => !/(?=.*[A-Z])/.test(v) || "No puede contener letras",
        (v) => !/(?=.*[a-z])/.test(v) || "No puede contener letras",
        (v) =>
          !/([!@#$*/?¡¿%])/.test(v) ||
          "No puede contener caracteres especiales [!@#$%]",
        (v) => (v && v.length === 8) || "Debe tener 8 números",
      ],
      phoneNumberRules: [
        (v) => !!v || "Teléfono es requerido",
        (v) => !/(?=.*[A-Z])/.test(v) || "No puede contener letras",
        (v) => !/(?=.*[a-z])/.test(v) || "No puede contener letras",
        (v) =>
          !/([!@#$*/?¡¿%])/.test(v) ||
          "No puede contener caracteres especiales [!@#$%]",
        (v) => (v && v.length === 9) || "Debe tener 9 números",
      ],
      emailRules: [
        (v) => !!v || "Email es requerido",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail inválido.",
      ],
      passwordRules: [
        (v) => !!v || "Contraseña es requerido",
        (v) =>
          /(?=.*[A-Z])/.test(v) || "La contraseña debe contener una mayúscula",
        (v) =>
          /(?=.*[a-z])/.test(v) || "La contraseña debe contener una minúscula",
        (v) =>
          /([!@#$*/?¡¿%])/.test(v) ||
          "La contraseña debe contener caracteres especiales [!@#$%]",
        (v) =>
          /([1-9])/.test(v) || "La contraseña debe contener al menos un número",
        (v) => (v && v.length >= 8) || "Debe contener como mínimo 8 caracteres",
      ],
    };
  },
  computed: {},
  methods: {
    handleRegister() {
      UserService.createUser(this.model)
        .then(() => {
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.top {
  margin-top: 4em;
  padding-bottom: 1em;
}
.text {
  margin-left: 1.5em;
  margin-right: 1em;
}
.text2 {
  margin-left: 0.7em;
  margin-right: 0.3em;
}
@media screen and (max-width: 570px) {
  .top {
    margin-top: 0;
  }
}
</style>
