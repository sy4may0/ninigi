<template>  
  <v-container>
    <v-card
      class="mx-auto"
    >
      <v-toolbar
        v-bind:color="$store.state.color.sub"
      >
        <v-toolbar-title>Tasks</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn 
          icon
          v-on:click="openEditTask($store.state.initTask)"
        >
          <v-icon>mdi-table-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list 
        two-line
        style="max-height: 650px"
        class="overflow-y-auto"
      >
        <v-list-item-group>
          <template 
            v-for="item in $store.state.tasks"
          >
            <v-list-item 
              :key="item._id"
              v-on:mouseover="item.edit=true"
              v-on:mouseleave="item.edit=false"
            >
              <v-list-item-content>

                <v-list-item-title v-text="item.name">
                </v-list-item-title>

                <v-list-item-subtitle>
                  <v-chip
                    class="ma-2"
                    v-bind:color="$store.state.color.accent"
                    v-bind:text-color="$store.state.color.main"
                    small
                    label
                  >
                    <v-avatar left>
                      <v-icon
                        v-bind:color="$store.state.color.main"
                        small
                      >mdi-clipboard</v-icon>
                    </v-avatar>
                    {{ item.project }}
                  </v-chip> 
                  <v-chip
                    class="ma-2"
                    v-bind:color="$store.state.color.accent"
                    v-bind:text-color="$store.state.color.main"
                    small
                    label
                  >
                    <v-avatar left>
                      <v-icon 
                        v-bind:color="$store.state.color.main"
                        small
                      >mdi-cogs</v-icon>
                    </v-avatar>
                    {{ item.category }}
                  </v-chip> 
                </v-list-item-subtitle>

              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-icon
                  v-if="item.edit"
                  style="margin: 0px"
                >
                  <v-btn 
                    v-on:click="openEditTask(item)"
                    icon
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn
                    v-on:click="openRemoveTask(item)"
                    icon
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>

                  <v-btn 
                    v-on:click="openAchievement(item)"
                    icon
                  >
                    <v-icon>mdi-arrow-right-bold</v-icon>
                  </v-btn>

                </v-list-item-icon>
              </v-list-item-action>

            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>

    <v-dialog
      v-model="taskEditDialog"
      max-width="600px"
    >
      <EditTask 
        v-model="selected"
        @close="closeEditTask"
      ></EditTask>
    </v-dialog>

    <v-dialog
      v-model="taskRemoveDialog"
      max-width="600px"
    >
      <RemoveTask 
        v-model="selected"
        @close="closeRemoveTask"
      ></RemoveTask>
    </v-dialog>
    <v-dialog
      v-model="achievementDialog"
      max-width="720px"
    >
      <EditAchievement 
        v-model="selectedAchievement"
        :hidetask="false"
        :update="false"
        @close="closeAchievement"
      ></EditAchievement>

    </v-dialog>
  </v-container>
</template>

<script>
import EditTask from '@/components/Forms/EditTask.vue'
import RemoveTask from '@/components/Forms/RemoveTask.vue'
import EditAchievement from '@/components/Forms/EditAchievement.vue'

export default {
  name: 'TaskCtl',

  data: function() {
    return {
      selected: this.$store.state.initTask,
      selectedAchievement: this.$store.state.initAchievement,

      taskEditDialog: false,
      taskRemoveDialog: false,
      achievementDialog: false,
    }
  },
  created: async function() {
    await this.$store.dispatch('getTasks');
  },
  methods: {
    openEditTask: function(task) {
      this.selected = Object.assign({}, task);
      this.taskEditDialog = true;
    },
    closeEditTask: function() {
      this.selected = this.$store.state.initTask;
      this.taskEditDialog = false;
    },
    openRemoveTask: function(task) {
      this.selected = Object.assign({}, task);
      this.taskRemoveDialog = true;
    },
    closeRemoveTask: function() {
      this.selected = undefined;
      this.taskRemoveDialog = false;
    },
    openAchievement: function(task) {
      this.selected = Object.assign({}, task);
      this.selectedAchievement = 
            Object.assign({}, this.$store.state.initAchievement),
      this.selectedAchievement.project = task.project;
      this.selectedAchievement.category = task.category;
      this.selectedAchievement.description = 
            task.name + "\n---\n" +
            task.description;

      this.achievementDialog = true;
    },
    closeAchievement: function() {
      this.selected = undefined;
      this.achievementDialog = false;
    }
  },

  components: {
    EditTask,
    RemoveTask,
    EditAchievement,
  },
};
</script>
