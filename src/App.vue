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
    changeUser: async function() {
      await this.$store.dispatch('setUser', this.user);
      const t1 = this.$store.dispatch('getTasks');
      const t2 = this.$store.dispatch('getEvents');
      await t1;
      await t2;
    },
  },
  data: () => ({
    user: null,
  }),
};
</script>
