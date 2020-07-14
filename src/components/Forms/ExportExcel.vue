<template>
  <v-card>
    <v-card-title>
      <span class="headline">Export EXCEL XLSX file.</span>
    </v-card-title>
    <v-card-text>
      <v-alert
        border="bottom"
        colored-border
        type="warning"
        elevation="2"
        v-if="$store.state.user === undefined"
      >
        You have to select user.
      </v-alert>
      <v-container v-else>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="fromPicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="gte"
                  label="From"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker 
                v-model="gte" 
                no-title 
                @input="fromPicker = false"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="toPicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="lte"
                  label="To"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker 
                v-model="lte" 
                no-title 
                @input="toPicker = false"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="8" md="8">
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-btn 
              v-bind:disabled="state === 'processing'"
              :color="$store.state.color.accent + ' darken-1'"
              v-on:click="generate"
              outlined
            >
              <v-icon small>mdi-file-excel</v-icon>
              Generate
            </v-btn>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-divider></v-divider>
          </v-col>
          <v-col 
            v-if="state === 'processing'"
            cols="12" sm="4" md="4"
          >
            <v-progress-circular
              indeterminate
              color="$store.state.color.accent"
            ></v-progress-circular>
          </v-col>
          <v-col
            v-if="state === 'processing'"
            cols="12" sm="8" md="8"
          >
            <p>Processing...</p>
          </v-col>
          <v-col 
            v-if="state === 'download'"
            cols="12" 
          >
              <a target="_blank" v-bind:href="link" v-bind:download=$store.state.excel>Download XLSX</a>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        :color="$store.state.color.accent + ' darken-1'"
        text
        v-on:click="cancel"
      >Close</v-btn>
   </v-card-actions>
  </v-card>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
},
  responseType: 'json',
});

export default {
  name: 'ExportExcel',
  data: function() {
    return {
      fromPicker: false,
      toPicker: false,
      gte: undefined,
      lte: undefined,
      state: 'init',
      link: undefined,
    };
  },
  created: function() {
    // 初期値は先月の1日から現在まで。
    const gte = new Date();
    const lte = new Date();

    gte.setDate(1);
    gte.setMonth(gte.getMonth() - 1)

    this.gte = gte.getFullYear() + '-' +
               ('00' + (gte.getMonth()+1)).slice(-2) + '-' +
               ('00' + gte.getDate()).slice(-2);
    this.lte = lte.getFullYear() + '-' +
               ('00' + (lte.getMonth()+1)).slice(-2) + '-' +
               ('00' + lte.getDate()).slice(-2);
  },
  methods: {
    cancel: function() { 
      this.$emit('close'); 
    },
    generate: async function() { 
      const promise = request.get('/excel', {
        params: {
          user: this.$store.state.user,
          gte: this.gte,
          lte: this.lte
        }
      });
      this.state = 'processing';
      const result = await promise;
      this.link = result.data.download_link;
      this.state = 'download';
    },
  },
  components: {
  }
}
</script>