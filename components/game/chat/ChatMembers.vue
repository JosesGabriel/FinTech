<template>
  <div class="d-flex chatMembers__wrap">
    <ul v-for="n in 4" :key="n" class="pl-0">
      <li>
        <div>
          <v-avatar class="profile" color="grey" size="14">
            <v-img src="test.jpg"></v-img>
          </v-avatar>
          <span class="pl-1">Orange</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
ul {
  list-style-type: none;
}
.chatMembers__wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  overflow: auto;
  height: calc(100vh - 650px);
}
</style>
