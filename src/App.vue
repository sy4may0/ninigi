<template>
  <v-app>
    <v-app-bar
      app
      v-bind:color="$store.state.color.sub"
      dark
    >
      <v-toolbar-title>NINIGI</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--
        ユーザー 
      -->
      <v-toolbar-items>
        <v-container>
          <span>
          <v-select
            label="User"
            v-model="user"
            :items="$store.state.users"
            :background-color="$store.state.color.sub + ' - darken-1'"
            item-text="text"
            item-value="value"
            v-on:change="changeUser"
            dense
            outlined
          ></v-select>
          </span>
        </v-container>
      </v-toolbar-items>
      <v-btn 
        v-on:click="openExcelDialog"
        outlined
      >
        <v-icon small>mdi-file-excel</v-icon>
        Export XLSX
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <v-dialog
      v-model="exportExcelDialog"
      max-width="720px"
    >
      <ExportExcel 
        @close="closeExcelDialog"
      ></ExportExcel>
    </v-dialog>

  </v-app>

</template>

<script>
import ExportExcel from '@/components/Forms/ExportExcel.vue'

export default {
  name: 'App',
  data: function() {
    return {
      user: null,
      exportExcelDialog: false,
      gte: "",
      lte: "",
    }
  },
  components: {
    ExportExcel,
  },
  created: async function(){
    this.$store.dispatch('getConfig');
  },
  methods: {
    changeUser: async function() {
      await this.$store.dispatch('setUser', this.user.user);
      await this.$store.dispatch('setExcel', this.user.excel);
      const t1 = this.$store.dispatch('getTasks');
      const t2 = this.$store.dispatch('getEvents');
      await t1;
      await t2;
    },
    openExcelDialog() {
      this.exportExcelDialog = true;
    },
    closeExcelDialog() {
      this.exportExcelDialog = false;
    }
  },
};
</script>
