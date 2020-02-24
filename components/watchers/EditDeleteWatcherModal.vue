<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      :dark="lightSwitch == 0 ? false : true"
      max-width="590px"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="success"
          dark
          small
          class="text-capitalize mr-2 black--text font-weight-medium"
          style="border-width: 2px"
          height="23"
          v-on="on"
          >Manage</v-btn
        >
      </template>
      <v-card :dark="lightSwitch == 0 ? false : true">
        <v-card-title>
          <span class="body-1 font-weight-black"
            >Edit/Delete Watched Stock</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <EditDeleteTable />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="no-transform"
            :dark="lightSwitch == 0 ? false : true"
            text
            @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditDeleteTable from "~/components/watchers/EditDeleteTable";
export default {
  components: {
    EditDeleteTable
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  data: () => ({
    dialog: false
  })
};
</script>
