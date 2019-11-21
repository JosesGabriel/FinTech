<template>
  <v-card class="mb-3" color="transparent" dark outlined>
    <v-card-text class="pa-0 pl-2">
      <div class="body-2 font-weight-black">Trending Stocks</div>
      <v-divider></v-divider>
      <v-list class="mt-1 transparent">
        <v-list-item class="px-0">
          <v-list-item-content class="pt-0">
            <div v-for="n in 4" :key="n" class="pb-3">
              <v-list-item-title class="body-2 d-flex justify-space-between"
                ><span><strong>DNL</strong></span
                ><span>1.06</span></v-list-item-title
              >
              <v-list-item-subtitle
                class="overline d-flex justify-space-between"
                ><span>D&L Industries</span
                ><span style="color: rgb(72,255,213)"
                  >+2.91%</span
                ></v-list-item-subtitle
              >
            </div>
          </v-list-item-content>
        </v-list-item>
        <router-link to="/login" class="caption" style="text-decoration: none;">
          Show more
        </router-link>
      </v-list>
    </v-card-text>
  </v-card>
</template>
