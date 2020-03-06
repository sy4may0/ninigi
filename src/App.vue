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
      <v-select
        v-model="user"
        :items="$store.state.users"
        item-text="text"
        item-value="value"
        v-on:change="changeUser"
      ></v-select>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

  </v-app>

</template>

<script>

export default {
  name: 'App',

  components: {
  },
  methods: {
    changeUser: function() {
      this.$store.dispatch('setUser', this.user);
    },
  },
  data: () => ({
    user: null,
  }),
};
</script>
