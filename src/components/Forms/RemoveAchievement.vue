<template>
  <v-card
    v-if="achievement !== undefined"
  >
    <v-card-title>
      <span class="headline">Remove Achievement</span>
    </v-card-title>
    <v-card-text>
      <v-alert
        dense
        outlined
        type="error"
      >
        Are you sure want to remove following Achievement?<br>"{{ achievement.description }}"
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        :color="$store.state.color.accent + ' darken-1'"
        text
        v-on:click="cancel"
      >Cancel</v-btn>
      <v-btn 
        :color="$store.state.color.accent + ' darken-1'"
        text
        v-on:click="apply"
      >Remove</v-btn>
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
  name: 'RemoveAchievement',
  model: {
    prop: 'achievement',
    event: 'input',
  },
  props: {
    achievement: Object,
  },
  methods: {
    cancel: function() {
      this.$emit('close')
    },
    apply: async function() {
      await request.delete(
        '/achievement/' + this.achievement._id
      );
      await this.$store.dispatch('getEvents')
      this.$emit('close')
    },
  },
  components: {
  }
}
</script>
