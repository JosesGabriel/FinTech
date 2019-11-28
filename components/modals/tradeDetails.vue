<template>
    <v-dialog v-model="show" max-width="450px">
        <span>Trade Details</span>
    </v-dialog>
</template>
<script>
export default {
  props: ['visible', 'itemDetails'],
  computed: {
    show: {
      get () {
        console.log(this.itemDetails)
        return this.visible, this.itemDetails
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      },
        getDetails() {
            this.visible
    console.log(this.itemDetails)
        }
    }
  },
  mounted() {
  }
}
</script>