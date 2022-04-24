<template>
  <card class="card-user">
    <div slot="image">
      <img src="@/assets/img/background.jpg" alt="..." />
    </div>
    <div>
      <div class="author">
        <img
          class="avatar border-white"
          src="@/assets/img/faces/face-2.jpg"
          alt="..."
        />
        <h4 class="title" style="margin: 0 0 1rem 0">
          {{ currentUser.firstName }} {{ currentUser.lastName }}
        </h4>
      </div>
    </div>
    <hr />
    <div class="text-center">
      <div class="row">
        <div class="col-lg-6">
          <h5>
            Invitaciones enviadas
            <br />
            <v-btn elevation="0" to="table-list">{{
              model.invitations_sent
            }}</v-btn>
          </h5>
        </div>
        <div class="col-lg-6">
          <h5>
            Invitaciones recibidas
            <br />
            <v-btn elevation="0" to="table-list">{{
              model.invitations_received
            }}</v-btn>
          </h5>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
import InvitationProxy from "@/proxies/invitation.proxy";
export default {
  data() {
    return {
      model: {
        invitations_sent: 0,
        invitations_received: 0,
      },
    };
  },
  methods: {
    async getUserInvitations() {
      if (this.currentUser) {
        await InvitationProxy.searchInvitation(this.currentUser.id, null)
          .then((response) => {
            this.model.invitations_sent = response.data.filter(
              (x) => !x.status
            ).length;
          })
          .catch((e) => {
            console.log(e);
          });

        await InvitationProxy.searchInvitation(null, this.currentUser.id)
          .then((response) => {
            this.model.invitations_received = response.data.filter(
              (x) => !x.status
            ).length;
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
    this.getUserInvitations();
  },
};
</script>
<style>
</style>
