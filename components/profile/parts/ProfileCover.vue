<template>
  <v-container dark class="pa-0 profile_cover-cont">
    <v-row no-gutters>
      <v-col cols="12" class="pa-0" elevation="10">
        <v-img
          src="https://cdn.pixabay.com/photo/2016/09/10/17/18/book-1659717_960_720.jpg"
          aspect-ratio="3"
          class="white--text align-end"
        >
          <v-overlay absolute color="darkchart" :opacity=".9" :value="overlay">
            <v-btn icon>
              <v-icon large color="success">mdi-plus</v-icon>
            </v-btn>
          </v-overlay>
        </v-img>
      </v-col>
      <v-col cols="12" class="cover_info pa-0">
        <v-list-item>
          <v-list-item-avatar size="200">
            <span class="profile-badge">ALPHA</span>
            <v-img
              class="profile_photo"
              src="https://www.thefamouspeople.com/profiles/images/liza-soberano-4.jpg"
              lazy-src="https://www.thefamouspeople.com/profiles/images/liza-soberano-4.jpg"
            >
              <v-overlay absolute color="darkchart" :opacity=".9" :value="overlay">
                <v-btn icon>
                  <v-icon large color="success">mdi-plus</v-icon>
                </v-btn>
              </v-overlay>
            </v-img>
          </v-list-item-avatar>
          <v-card
            class="d-flex align-start flex-column cover_bottom-x"
            :height="85"
            color="transparent"
            flat
            tile
          >
            <v-card class="pa-2 mb-auto" color="transparent" outlined tile>
              <div class>
                <v-list-item-title
                  class="white--text font-weight-bold display-1 text-shadow"
                >Liza Soberano</v-list-item-title>
                <v-list-item-title class="white--text subtitle-1 text-shadow">@LizaSoberano</v-list-item-title>
              </div>
            </v-card>
            <v-card class="pa-2 profile_suminfo d-block" color="transparent" outlined tile>
              <v-row no-gutters>
                <div class="text-center pr-4">
                  <v-list-item-title class="white--text caption">Reputation</v-list-item-title>
                  <v-list-item-title class="success--text font-weight-medium body-1">10,000</v-list-item-title>
                </div>
                <div class="text-center pr-4">
                  <v-list-item-title class="white--text caption">Connections</v-list-item-title>
                  <v-list-item-title class="success--text font-weight-medium body-1">10,000</v-list-item-title>
                </div>
                <div class="text-center pr-4">
                  <v-list-item-title class="white--text caption">Followers</v-list-item-title>
                  <v-list-item-title class="success--text font-weight-medium body-1">10,000</v-list-item-title>
                </div>
                <v-spacer></v-spacer>
                <div class="text-center pt-2">
                  <v-btn
                    background-color="transparent"
                    color="success"
                    class="text-capitalize caption"
                    small
                    dark
                    icon
                    @click="overlay = !overlay"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
              </v-row>
            </v-card>
          </v-card>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    overlay: false,
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  })
};
</script>
<style scoped>
.cover_info {
  margin-top: -150px;
}
.profile_photo {
  border: 4px solid #fff;
}
.profile_cover-cont {
  border: thin solid hsla(0, 0%, 100%, 0.12);
  border-radius: 0 0 5px 5px;
}
.profile_suminfo {
  /* margin-top: 26px; */
  width: 100%;
}
.cover_bottom-x {
  width: 100% !important;
}
.text-shadow {
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}
.profile-badge {
  padding: 2px 12px;
  position: absolute;
  z-index: 1;
  font-weight: 600;
  background: #d42083;
  border-radius: 50px;
  bottom: 13px;
  right: 0;
  box-shadow: 0px 0px 7px 0px black;
}
</style>