<template>
  <v-card flat>
    <v-tabs centered class="pt-8">
      <v-tab> Equipo </v-tab>
      <v-tab> Invitaciones </v-tab>
      <v-tab-item>
        <v-card class="mx-auto mt-8" flat max-width="800">
          <v-data-table
            :headers="headers"
            :items="members"
            :items-per-page="10"
          >
          </v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="mx-auto mt-8" flat max-width="800">
          <h4>Invita a tus colaboradores</h4>
          <v-form class="pt-2" @submit.prevent v-model="isValid">
            <div class="row">
              <div class="col-md-6">
                <v-text-field
                  type="text"
                  label="Nombre"
                  :rules="nameRules"
                  v-model="model.fullName"
                >
                </v-text-field>
              </div>
              <div class="col-md-6">
                <v-text-field
                  label="Email"
                  type="email"
                  :rules="emailRules"
                  v-model="model.email"
                >
                </v-text-field>
              </div>
            </div>
            <div class="text-center">
              <p-button
                type="info"
                round
                @click.native.prevent="sendInvitation"
                :disabled="!isValid"
              >
                Enviar
              </p-button>
            </div>
            <div class="clearfix pb-4"></div>
          </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import { PaperTable } from "@/components";
import UserProxy from "@/proxies/user.proxy";
import InvitationProxy from "@/proxies/invitation.proxy";
export default {
  components: {
    PaperTable,
  },
  data() {
    return {
      isValid: true,
      headers: [
        { text: "Nombre", value: "firstName" },
        { text: "Apellido", value: "lastName" },
        { text: "Email", value: "email" },
      ],
      members: [],
      nameRules: [(v) => !!v || "Nombre es requerido"],
      emailRules: [
        (v) => !!v || "Email es requerido",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail inválido.",
      ],
      model: {
        fullName: "",
        email: "",
        managerId: 0,
      },
    };
  },
  methods: {
    async getTeamMembers() {
      if (this.currentUser) {
        await InvitationProxy.searchInvitation()
          .then(async (response) => {
            const filter = response.data.filter(
              (x) => x.managerId == this.currentUser.id && x.status
            );
            for (let index = 0; index < filter.length; index++) {
              let user = await UserProxy.searchUser(
                filter[index].email,
                null,
                null
              );
              this.members.push({
                firstName: user.data[0].firstName,
                lastName: user.data[0].lastName,
                email: user.data[0].email,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    async sendInvitation() {
      if (this.currentUser) {
        const model = {
          managerId: this.currentUser.id,
          fullName: this.model.fullName,
          email: this.model.email,
        };
        await InvitationProxy.createInvitation(model)
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => {
            this.$notify({
              title: this.getErrorMessage(e.response.data),
              icon: "fa-solid fa-circle-exclamation",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "warning",
            });
            console.log(e);
          });
      }
    },
      getErrorMessage(e) {
      switch (e) {
        case (e = "The guest that you try to invite doesnt exist"):
          return "El usuario que tratas de invitar no existe.";
        case (e =
          "Cannot create another invitation to this guest user because you have an existing one"):
          return "No se puede invitar a este usuario porque tiene una invitación pendiente.";
        default:
          return e;
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
    this.getTeamMembers();
  },
};
</script>
<style>
</style>
