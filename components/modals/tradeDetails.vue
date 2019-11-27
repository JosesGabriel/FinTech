<template>
    <v-dialog v-model="show" max-width="450px">
        <span>Trade Details</span>
    </v-dialog>
</template>
<script>
export default {
  props: ['visible', 'author'],
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    getDetails() {
        this.author
    }
  },
  mounted() {
    console.log(this.author)
  }
}
</script>