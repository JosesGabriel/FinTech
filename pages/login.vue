<template>
  <v-card class="investagram_bulok text-center" color="transparent" dark flat>
    <span class="display-4 text-center d-inline-block">
      <span class="font-weight-thin">
        <img
          class="pl-2 pt-1"
          src="lyduz_loader.gif"
          alt=""
          width="285"
          height="285"
        />
      </span>
    </span>
  </v-card>
</template>
<script>
export default {
  layout: "main",

  middleware: ["auth"],
  components: {},
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    toggle: function() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
<style>
.investagram_bulok {
  margin-top: 150px;
}
</style>
