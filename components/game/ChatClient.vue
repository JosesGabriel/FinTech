<template>
  <div class="container py-0">
    <div class="row client__header">
      <div class="col-8">Lobby</div>
      <div class="col-4">Members</div>
    </div>
    <div class="row">
      <div class="col-8">
        <ChatMessages />
      </div>
      <div class="col-4">
        <ChatMembers />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ChatComposer />
      </div>
    </div>
  </div>
</template>
<style>
.container {
  color: white;
}
.client__header {
  background-color: black;
}
</style>
<script>
import ChatMessages from "~/components/game/ChatMessages";
import ChatMembers from "~/components/game/ChatMembers";
import ChatComposer from "~/components/game/ChatComposer";
export default {
  layout: "main",
  components: {
    ChatMessages,
    ChatMembers,
    ChatComposer
  }
};
</script>
