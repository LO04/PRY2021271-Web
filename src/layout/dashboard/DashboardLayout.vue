<template>
  <div v-if="currentUser" class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Home" icon="ti-panel" />
        <sidebar-link to="/typography" name="Actividades" icon="ti-text" />
        <sidebar-link to="/notifications" name="Mi equipo" icon="ti-bell" />
        <sidebar-link
          to="/table-list"
          name="Grupos"
          icon="ti-view-list-alt"
        />
        <sidebar-link to="/stats" name="Perfil" icon="ti-user" />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <!-- <content-footer></content-footer> -->
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
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
  },
};
</script>
