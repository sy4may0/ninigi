<template>
  <v-container>
    <v-card
      class="mx-auto"
    >
      <v-toolbar
        v-bind:color="$store.state.color.sub"
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-btn 
          icon 
          v-on:click="prev()"
        >
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn 
          icon 
          v-on:click="setToday()"
        >
          <v-icon small>mdi-calendar-today</v-icon>
        </v-btn>
        <v-btn 
          icon 
          v-on:click="next()"
        >
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-on:click="openAchievement($store.state.initAchievement)"
          icon
        >
          <v-icon>mdi-table-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-calendar
          ref="calendar"
          v-model="focus"
          v-bind:color="$store.state.color.sub"
          v-bind:events="$store.state.events"
          v-bind:event-color="getEventColor"
          @click:event="openEvent"
        ></v-calendar>
      </v-container>
    </v-card>
    <v-dialog
      v-model="achievementDialog"
      max-width="720px"
    >
      <EditAchievement 
        v-model="selected"
        :hidetask="false"
        @close="closeAchievement"
      ></EditAchievement>

    </v-dialog>
  </v-container>
</template>

<script>
import EditAchievement from '@/components/Forms/EditAchievement.vue'

export default {
  name: 'CalendarCtl',
  data: function(){
    return {
      selected: this.$store.state.initAchievement,
      focus: '',
      achievementDialog: false,
    }
  },
  computed: {
    title: function() {
      return this.focus.substring(0,7);
    },
  },
  mounted: function () {
    const d = new Date();
    this.focus = d.toISOString().substring(0,10);
    this.$refs.calendar.checkChange();
  },
  methods: {
    getEventColor: function() {
      return "orange";
    },
    openAchievement: function(achievement) {
      this.selected = Object.assign({}, achievement);
      this.achievementDialog = true;
    },
    closeAchievement: function() {
      this.selected = this.$store.state.initAchievement;
      this.achievementDialog = false;
    },

    // Calendar control
    setToday: function() {
      const d = new Date();
      this.focus = d.toISOString().substring(0,10);
    },
    prev: function() {
      this.$refs.calendar.prev()
    },
    next: function() {
      this.$refs.calendar.next()
    },
    openEvent: function({nativeEvent, event}) {
      console.log(event);
      console.log(nativeEvent);
    },
  },
  components: {
    EditAchievement,
  }
};
</script>
