<template>
  <v-content>
    <v-card class="mx-auto" color="#0B1F33" elevation="10" dark>
      <v-card-text>
        <v-row>
          <v-col class="pa-0 ma-0">
            <Headline />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 ma-0">
            <Status />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 ma-0">
            <Sentiment />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
import Headline from "../chart/sidebar/Headline";
import Status from "../chart/sidebar/Status";
import Sentiment from "../chart/sidebar/Sentiment";

export default {
  name: "Sidebar",
  components: {
    Headline,
    Status,
    Sentiment
  }
};
</script>

<style></style>
