<template>
  <card class="card" :title="title">
    <div>
      <ul class="list-unstyled team-members">
        <li>
          <div class="row" v-for="member in members" :key="member.name">
            <div class="col-3">
              <div class="avatar">
                <img
                  src="@/assets/img/faces/face-1.jpg"
                  alt="Circle Image"
                  class="rounded img-fluid"
                />
              </div>
            </div>
            <div class="col-6">
              {{ member.name }}
              <br />
              <span class="text-success">
                <small>Disponible</small>
              </span>
            </div>

            <div class="col-3">
              <p-button type="success" outline icon>
                <i class="fa fa-envelope"></i>
              </p-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </card>
</template>
<script>
import InvitationProxy from "@/proxies/invitation.proxy";
import UserProxy from "@/proxies/user.proxy";
export default {
  data() {
    return {
      title: "Mi grupo",
      members: [],
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
              this.members.push({ name: user.data[0].firstName });
            }
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
    this.getTeamMembers();
  },
};
</script>
<style>
</style>
