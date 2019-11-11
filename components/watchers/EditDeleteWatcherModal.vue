<template>
  <div>
    <v-dialog v-model="dialog" persistent dark max-width="590px">
      <template v-slot:activator="{ on }">
        <v-btn
          rounded
          outlined
          color="#48FFD5"
          dark
          class="text-capitalize mr-2"
          style="border-width: 2px"
          height="23"
          v-on="on"
          >Manage</v-btn
        >
      </template>
      <v-card color="#142b46" dark>
        <v-card-title>
          <span class="headline font-weight-light"
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
          <v-btn style="text-transform: none;" dark text @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-snackbar
      v-model="watchList__alert"
      :color="watchList__alertState ? 'success' : 'error'"
    >
      {{ post__responseMsg }}
      <v-btn color="white" text @click="watchList__alert = false">
        Close
      </v-btn>
    </v-snackbar> -->
  </div>
</template>
<script>
import EditDeleteTable from "~/components/watchers/EditDeleteTable";
export default {
  components: {
    EditDeleteTable
  },
  data: () => ({
    dialog: false
  })
};
</script>
