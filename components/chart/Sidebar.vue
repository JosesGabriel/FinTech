<template>
  <v-content>
    <v-card style="height:280px" color="#0B1F33" elevation="12" dark>
      <v-card-text class="pa-0 py-3">
        <v-row class="ma-0">
          <v-col class="pa-0">
            <Headline />
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col class="pa-0">
            <Status />
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col class="pa-0">
            <Sentiment />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <v-card color="#0B1F33">
      <v-card-text class="pa-0 ma-0">
        <Tabs />
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
import Headline from "../chart/sidebar/Headline";
import Status from "../chart/sidebar/Status";
import Sentiment from "../chart/sidebar/Sentiment";
import Tabs from "../chart/sidebar/Tabs";

export default {
  name: "Sidebar",
  components: {
    Headline,
    Status,
    Sentiment,
    Tabs
  }
};
</script>

<style></style>
