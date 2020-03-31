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
          @click:event="showEvent"
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
    <v-dialog
      v-model="removeAchievementDialog"
      max-width="720px"
    >
      <RemoveAchievement 
        v-model="selected"
        @close="closeRemoveAchievement"
      ></RemoveAchievement>

    </v-dialog>
    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
    >
      <v-card
        color="$store.state.color.main + 'darker-3"
        min-width="350px"
        flat
      >
        <v-toolbar
          :color="selectedColor"
          dark
        >

          <span v-html="selected.project"></span>
          <v-spacer></v-spacer>
          <v-btn 
            icon
            v-on:click="openAchievement(selected)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn 
            icon
            v-on:click="openRemoveAchievement(selected)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-textarea
              v-model="selected.description"
              readonly
            >
            </v-textarea>
            <span>SCHEDULED : {{selected.scheduled}}</span><br>
            <span>ACTUAL : {{selected.actual}}</span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="$store.state.color.accent"
            @click="selectedOpen=false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script>
import EditAchievement from '@/components/Forms/EditAchievement.vue'
import RemoveAchievement from '@/components/Forms/RemoveAchievement.vue'

export default {
  name: 'CalendarCtl',
  data: function(){
    return {
      selected: this.$store.state.initAchievement,
      selectedElement: undefined, 
      focus: '',
      selectedOpen: false, 
      selectedColor: 'orange',
      achievementDialog: false,
      removeAchievementDialog: false,
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
  created: async function() {
    await this.$store.dispatch('getEvents');

  },
  methods: {
    getEventColor: function() {
      return "orange";
    },

    // Handle @click some Achievement Create/Update buttons.
    // - Copy achievement Object to be it to editable.
    // - Toggle <achievementDialog> dialog switch.
    openAchievement: function(achievement) {
      this.selected = Object.assign({}, achievement);
      if(this.selected.date === undefined) {
        this.selected.dates = [];
      }else if(!Array.isArray(this.selected.date)) {
        const arr = [this.selected.date];
        this.selected.dates = arr;
      }
      this.achievementDialog = true;
    },
    openRemoveAchievement: function(achievement) {
      this.selected =  achievement;
      this.removeAchievementDialog = true;
    },
    closeAchievement: function() {
      this.selected = this.$store.state.initAchievement;
      this.achievementDialog = false;
    },
    closeRemoveAchievement: function() {
      this.selected = this.$store.state.initAchievement;
      this.removeAchievementDialog = false;
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

    // Handle @click calendar event.
    // - Set achievement object to <selected> valiable. 
    // - Toggle <selectedOpen> dialog switch.
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selected = event.obj;
        this.selectedColor = event.color;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => this.selectedOpen = true, 10);
      }
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation();
    },


  },
  components: {
    EditAchievement,
    RemoveAchievement,
  }
};
</script>
