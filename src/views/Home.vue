<template>
  <v-content>
    <v-row>
      <v-col cols="1">
      </v-col>
      <v-col cols="3">
        <TaskCtl></TaskCtl>
      </v-col>
      <v-col cols="7">
        <CalendarCtl></CalendarCtl>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
// @ is an alias to /src
import CalendarCtl from '@/components/CalendarCtl.vue'
import TaskCtl from '@/components/TaskCtl.vue'

export default {
  name: 'home',
  components: {
    TaskCtl,
    CalendarCtl,
  }
}
</script>
