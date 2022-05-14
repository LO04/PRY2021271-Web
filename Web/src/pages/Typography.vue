<template>
  <div class="row">
    <h3 class="ml-4">Actividades</h3>
    <div class="col-12">
      <v-card class="mx-auto mt-8" flat>
        <h4 class="ml-2">Historial de navegación de Chrome</h4>
        <v-data-table
          :headers="headers"
          :items="model.chrome.data"
          :items-per-page="10"
        >
        </v-data-table>
      </v-card>
    </div>

    <div class="col-12">
      <v-card class="mx-auto mt-8" flat>
        <h4 class="ml-2">Historial de navegación de Opera</h4>
        <v-data-table
          :headers="headers"
          :items="model.chrome.opera"
          :items-per-page="10"
        >
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>
<script>
import UrlProxy from "@/proxies/url.proxy";
import { PaperTable } from "@/components";

export default {
  components: {
    PaperTable,
  },
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Titulo", value: "title" },
        { text: "Url", value: "uri" },
        { text: "Tiempo", value: "time" },
        { text: "Fecha", value: "date" },
      ],
      model: {
        chrome: {
          name: "Chrome",
          data: [],
        },
        opera: {
          name: "Opera",
          data: [],
        },
        firefox: {
          name: "Firefox",
          data: [],
        },
        edge: {
          name: "Edge",
          data: [],
        },
      },
    };
  },
  methods: {
    async getUrls() {
      if (this.currentUser) {
        await UrlProxy.searchUrl(null, this.currentUser.id)
          .then((response) => {
            console.log(response.data);
            this.model.chrome.data = response.data.filter(
              (x) => x.browser === "Chrome"
            );
            this.model.opera.data = response.data.filter(
              (x) => x.browser === "Opera"
            );
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
    this.getUrls();
  },
};
</script>
<style>
</style>
