<template>
  <v-card
    v-if="task !== undefined"
  >
    <v-card-title>
      <span class="headline">Edit Task</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-col cols="12">
          <v-text-field
            label="Title"
            v-model="task.name"
            hint="Task Title"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            label="Project"
            v-model="task.project"
            :items="$store.state.projects"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            label="Task Category"
            v-model="task.category"
            :items="$store.state.categories"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="Description"
            v-model="task.description"
          ></v-textarea>
        </v-col>

      </v-container>
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
      >Apply</v-btn>
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
  name: 'EditTask',
  model: {
    prop: 'task',
    event: 'input',
  },
  props: {
    task: Object,
  },
  methods: {
    cancel: function() {
      this.$emit('close')
    },
    apply: async function() {
      this.task.user = this.$store.state.user;
      if(this.task._id) {
        await request.post(
          '/task/' + this.task._id,
          this.task
        );
      } else {
        await request.post(
          '/task',
          this.task
        );
      }
      await this.$store.dispatch('getTasks');
      this.$emit('close')
    },
  },
  components: {
  }
}
</script>
