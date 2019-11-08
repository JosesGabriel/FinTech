<template>
  <div>
    <v-dialog v-model="dialog" persistent dark max-width="590px">
      <template v-slot:activator="{ on }">
        <div class="text-center">
          <v-btn class="mx-2" fab dark large color="#132b46" v-on="on">
            <v-icon dark>mdi-dots-horizontal</v-icon>
          </v-btn>
        </div>
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
          <v-btn color="error darken-1" text @click="dialog = false"
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
