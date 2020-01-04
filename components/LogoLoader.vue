<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-container fill-height fluid>
        <v-row justify="center">
          <v-img
            src="lyduz_loader.gif"
            aspect-ratio="1"
            :contain="true"
            max-width="500px"
          ></v-img>
        </v-row>
        <v-row v-if="statusText" justify="center">
          <div>{{ statusText }}</div>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    statusText: {
      default: "",
      required: false,
      type: String
    }
  }
};
</script>
