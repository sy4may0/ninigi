<template>
  <v-card
    v-if="achievement !== undefined"
  >
    <v-card-title>
      <span class="headline">Edit Achievement</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row
          v-if="hidetask === false"
        >
          <v-col cols="6">
            <v-select
              label="Project"
              v-model="achievement.project"
              :items="$store.state.projects"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              label="Task Category"
              v-model="achievement.category"
              :items="$store.state.categories"
            ></v-select>
          </v-col>
        </v-row>
        <v-row
          v-if="hidetask === false"
        >
          <v-col cols="12">
            <v-textarea
              label="Description"
              v-model="achievement.description"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-date-picker
              v-if='update'
              no-title
              v-model="achievement.date"
            ></v-date-picker>
            <v-date-picker
              v-else
              no-title
              v-model="dates"
              multiple
            ></v-date-picker>
          </v-col>
          <v-col cols="12" sm="6">
            <v-row>
              <v-btn
                v-bind:disabled="achievement.unexpected"
                v-on:click="decrementScheduled(60)"
                icon
              >
                <v-icon>mdi-chevron-double-left</v-icon>
              </v-btn>
              <v-btn
                v-bind:disabled="achievement.unexpected"
                v-on:click="decrementScheduled(15)"
                icon
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-text-field
                size="5"
                v-bind:disabled="achievement.unexpected"
                label="Scheduled"
                v-model="achievement.scheduled"
                hint="Scheduled time"
                required
              ></v-text-field>
              <v-btn
                v-bind:disabled="achievement.unexpected"
                v-on:click="incrementScheduled(15)"
                icon
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
              <v-btn
                v-bind:disabled="achievement.unexpected"
                v-on:click="incrementScheduled(60)"
                icon
              >
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-btn>

            </v-row>
            <v-row>
              <v-btn
                v-on:click="decrementActual(60)"
                icon
              >
                <v-icon>mdi-chevron-double-left</v-icon>
              </v-btn>
              <v-btn
                v-on:click="decrementActual(15)"
                icon
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-text-field
                size="5"
                label="Actual"
                v-model="achievement.actual"
                hint="Actual time in took to work."
                required
              ></v-text-field>
              <v-btn
                v-on:click="incrementActual(15)"
                icon
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
              <v-btn
                v-on:click="incrementActual(60)"
                icon
              >
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-btn>


            </v-row>
            <v-checkbox
              label="Unexpected"
              v-model="achievement.unexpected"
            ></v-checkbox>
            <v-checkbox
              label="Closing"
              v-model="achievement.closed"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
            label="Issues"
            v-model="achievement.issues"
            ></v-textarea>
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

function incrementTime(time, amount) {
  let h = Number(time.split(':')[0]);
  let m = Number(time.split(':')[1]);

  let mTmp = (h*60 + m);
  mTmp += amount;

  if (mTmp > 1440) {
    mTmp -= 1440;
  }

  h = Math.floor(mTmp/60);
  m = mTmp % 60;
  
 
  return ('00' + h).slice(-2) + 
         ':' + 
         ('00' + m).slice(-2)
}

function decrementTime(time, amount) {
  let h = Number(time.split(':')[0]);
  let m = Number(time.split(':')[1]);

  let mTmp = (h*60 + m);
  mTmp -= amount;

  if (mTmp < 0) {
    mTmp += 1440;
  }

  h = Math.floor(mTmp/60);
  m = mTmp % 60;

  return ('00' + h).slice(-2) + 
         ':' + 
         ('00' + m).slice(-2)

}

export default {
  name: 'EditAchievement',
  data: function() {
    return {
      dates: [],
    };
  },
  model: {
    prop: 'achievement',
    event: 'input',
  },
  props: {
    achievement: Object,
    hidetask: Boolean,
    update: Boolean,
  },
  methods: {
    cancel: function() { 
      this.dates=[]; 
      this.$emit('close'); 
    },
    apply: async function() { 
      this.achievement.user = this.$store.state.user;
      if(this.update) {
          await request.post(
            '/achievement/' + this.achievement._id,
            this.achievement
          );
      }else {
          this.achievement.dates = this.dates;
          await request.post(
            '/achievement',
            this.achievement
          );
      }
      await this.$store.dispatch('getEvents');
      this.dates = [];
      this.$emit('close'); 
    },

    incrementActual: function(amount) {
      this.achievement.actual = incrementTime(
          this.achievement.actual,
          amount
      );
    },
    decrementActual: function(amount) {
      this.achievement.actual = decrementTime(
          this.achievement.actual,
          amount
      );
    },
    incrementScheduled: function(amount) {
      this.achievement.scheduled = incrementTime(
          this.achievement.scheduled,
          amount
      );
    },
    decrementScheduled: function(amount) {
      this.achievement.scheduled = decrementTime(
          this.achievement.scheduled,
          amount
      );
    },
  },
  components: {
  }
}
</script>
