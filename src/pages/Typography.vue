<template>
  <div class="row">
    <h3 class="ml-4">Actividades</h3>
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <div slot="raw-content" class="table-responsive">
          <paper-table :data="table1.data" :columns="table1.columns">
          </paper-table>
        </div>
      </card>
    </div>

    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <paper-table
            type="hover"
            :title="table2.title"
            :sub-title="table2.subTitle"
            :data="table2.data"
            :columns="table2.columns"
          >
          </paper-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import UrlProxy from "@/proxies/url.proxy";
import { PaperTable } from "@/components";
const tableColumns = ["Id", "Title", "Uri", "Time", "Date"];

export default {
  components: {
    PaperTable,
  },
  data() {
    return {
      table1: {
        title: "Chrome",
        subTitle: "Historial de navegación para el browser Chrome",
        columns: [...tableColumns],
        data: [],
      },
      table2: {
        title: "Table on Plain Background",
        subTitle: "Historial de navegación para el browser Opera",
        columns: [...tableColumns],
        data: [],
      },
    };
  },
  methods: {
    async getUrls() {
      if (this.currentUser) {
        await UrlProxy.searchUrl(null, this.currentUser.id)
          .then((response) => {
            console.log(response.data);
            this.table1.data = response.data.filter(x => x.browser === "Chrome");
            this.table2.data = response.data.filter(x => x.browser === "Opera");
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
