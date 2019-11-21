<template>
  <v-card class="mb-3" color="transparent" dark outlined>
    <v-card-text class="pa-0 pl-2">
      <div class="body-2 font-weight-black">Bulletin</div>
      <v-divider></v-divider>
      <v-list class="transparent">
        <v-list-item v-for="n in 5" :key="n" class="px-0 mb-2">
          <div class="mr-2">
            <span style="color: rgb(72,255,213)" class="subtitle-1"
              >20<br />
              NOV</span
            >
          </div>
          <div class="no-wrap">
            <span class="body-2"
              >Del Monte unit starts selling US Facilities</span
            ><br />
            <span class="caption font-weight-thin font-italic"
              >Source: www.philstar.com</span
            >
          </div>
        </v-list-item>
        <router-link to="/login" class="caption" style="text-decoration: none;">
          Show more
        </router-link>
      </v-list>
    </v-card-text>
  </v-card>
</template>
