<template>
  <div>
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
</style>
