<template>
  <v-row no-gutters class="mt-12 mb-10">
    <v-col cols="12">
      <v-sheet tile color="success" min-height="250">
        <v-row no-gutters>
          <v-col cols="3" class="pt-12">
            <v-content class="float-right mr-12 mt-3" style="width:15rem;">
              <v-img contain :src="imageurl" />
            </v-content>
          </v-col>
          <v-col cols="7" class="pt-6">
            <slot> </slot>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Banner",
  props: {
    imageurl: {
      default: "",
      type: String
    }
  }
};
</script>
