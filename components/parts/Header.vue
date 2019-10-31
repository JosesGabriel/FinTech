<template>
  <v-toolbar
        color="#213f58"  
        class="header__toolbar"
        dark
        dense
        >
        <v-toolbar-title>
            <router-link to="/">
                <img class="mt-2" src="logo.png" alt="Arbitrage Logo" width="45" height="45">
            </router-link>
        </v-toolbar-title>

        <div class="searchBar__container hidden-xs-only">
        <v-text-field
            label="Search"
            type="text"
            prepend-inner-icon="mdi-magnify"
            class="header__searchbar pa-0 ml-3"
            rounded
            outlined
        ></v-text-field>
        </div>

        <v-spacer></v-spacer>
        
        <v-toolbar-items>
                <v-btn icon>
                    <v-icon>mdi-apps</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-bell-outline</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-comment-outline</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-account-circle</v-icon>
                </v-btn>
        </v-toolbar-items>
        
        <div class="header--rainbow px-0"></div>
    </v-toolbar>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
.header__searchbar {
    margin-top: 20px !important;
    transform: scale(0.675);
    transform-origin: left;
}
.header__toolbar {
    position: fixed;
    width: 100%;
    z-index: 100;
}
.header--rainbow {
  position: absolute;
  width: 100%;
  bottom: -4px;
  height: 4px;
  margin-left: -16px;
  background-image: linear-gradient(to right, #894b9d, #eb8023, #c2b819, #49ba6f, #2581bc);
}
.searchBar__container{
    width: 400px;
}
</style>