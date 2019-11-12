<template>
  <div class="container composer__container py-0">
    <div class="row">
      <div class="col-9 pt-0">
        <v-textarea
          solo
          dark
          label="Send a message..."
          rows="1"
          hide-details
          background-color="transparent"
        ></v-textarea>
      </div>
      <div class="col-3">
        <v-btn text icon x-small color="grey">
          <v-icon>mdi-emoticon-excited-outline</v-icon>
        </v-btn>
        <v-btn text icon x-small color="grey">
          <v-icon>mdi-phone-outline</v-icon>
        </v-btn>
        <v-btn text icon x-small color="grey">
          <v-icon>mdi-video</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<style>
.composer__container {
  background-color: black;
}
</style>
