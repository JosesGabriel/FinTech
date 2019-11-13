<template>
  <div class="message__wrap">
    <div v-for="n in 9" :key="n" class="message__list">
      <v-avatar class="profile" color="grey" size="34">
        <v-img src="test.jpg"></v-img>
      </v-avatar>
      <div class="message">
        <div class="px-2 message__sender">Orange</div>
        <p class="px-2 py-1">Lorem Ipsum</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1de9b6;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #1de9b6;
}
.message {
  position: relative;
  bottom: 7px;
}
.message__wrap {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  padding: 15px;
  overflow: auto;
  height: 410px;
}
.message__list {
  align-self: flex-start;
  max-width: 70%;
  display: inline-flex;
}
.message__list--me {
  align-self: flex-end;
}
.message__sender {
  color: orange;
}
</style>
