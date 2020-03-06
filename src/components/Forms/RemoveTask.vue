<template>
  <v-card
    v-if="task !== undefined"
  >
    <v-card-title>
      <span class="headline">Remove Task</span>
    </v-card-title>
    <v-card-text>
      <v-alert
        dense
        outlined
        type="error"
      >
        Are you sure want to remove following task?<br>"{{ task.title }}"
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

export default {
  name: 'RemoveTask',
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
    apply: function() {
      this.$emit('close')
    },
  },
  components: {
  }
}
</script>
