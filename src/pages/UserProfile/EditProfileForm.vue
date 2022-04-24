<template>
  <card class="card" title="Editar Perfil">
    <div>
      <v-form @submit.prevent v-model="isValid">
        <div class="row">
          <div class="col-md-6">
            <v-text-field
              type="text"
              label="Nombres"
              :disabled="true"
              placeholder="Nombres"
              v-model="user.firstName"
            >
            </v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              type="text"
              label="Apellidos"
              :disabled="true"
              placeholder="Apellidos"
              v-model="user.lastName"
            >
            </v-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <v-text-field
              type="text"
              label="Teléfono"
              placeholder="Teléfono"
              v-model="user.phoneNumber"
              :rules="phoneNumberRules"
              maxlength="9"
            >
            </v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              type="identification"
              label="DNI"
              :disabled="true"
              placeholder="DNI"
              v-model="user.identification"
            >
            </v-text-field>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <v-text-field
              type="email"
              label="Correo"
              placeholder="Correo"
              :rules="emailRules"
              v-model="user.email"
            >
            </v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              label="Contraseña"
              placeholder="Contraseña"
              v-model="user.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="passwordRules"
              @click:append="show = !show"
            >
            </v-text-field>
          </div>
        </div>
        <div class="text-center">
          <p-button
            type="info"
            round
            @click.native.prevent="updateProfile"
            :disabled="!isValid"
          >
            Actualizar Perfil
          </p-button>
        </div>
        <div class="clearfix"></div>
      </v-form>
    </div>
  </card>
</template>
<script>
import UserProxy from "@/proxies/user.proxy";
export default {
  data() {
    return {
      show: false,
      isValid: true,
      user: {
        id: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        identification: "",
        phoneNumber: "",
      },
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
  methods: {
    async updateProfile() {
      if (this.currentUser) {
        await UserProxy.updateUser(this.user)
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    async getUser() {
      if (this.currentUser) {
        await UserProxy.searchUser(null, this.currentUser.id, null)
          .then((response) => {
            this.user.id = response.data[0].id;
            this.user.email = response.data[0].email;
            this.user.password = response.data[0].password;
            this.user.firstName = response.data[0].firstName;
            this.user.lastName = response.data[0].lastName;
            this.user.identification = response.data[0].identification;
            this.user.phoneNumber = response.data[0].phoneNumber;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.getUser();
  },
};
</script>
<style>
</style>
