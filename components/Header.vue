<template>
    <v-toolbar
        dark
        src="https://w.wallhaven.cc/full/eo/wallhaven-eoz9gl.jpg"
        dense
        class="header__toolbar"
        >
        <img src="logo.png" alt="" width="45" height="45" class="header__padding--left">
        <div class="searchBar__container">
            <v-text-field
                label="Search"
                type="email"
                prepend-inner-icon="mdi-magnify"
                class="header__searchbar ml-3"
                shaped
                outlined
            ></v-text-field>
        </div>
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <router-link to="/login" class="social__router">
                <v-btn icon>
                    <v-icon>mdi-scatter-plot</v-icon>
                </v-btn>
            </router-link>
        </v-toolbar-items>
        <v-avatar size="36px" class="header__padding--right">
        <img
        alt="Avatar"
        src="https://static.hiphopdx.com/2015/03/Screen-Shot-2015-03-26-at-10.43.59-AM.png"
        >
        <v-icon
        ></v-icon>
        </v-avatar>
        <div class="header--rainbow"></div>
    </v-toolbar>
</template>
<style>
.header__searchbar {
    margin-top: 20px !important;
    transform: scale(0.675);
    transform-origin: left;
}
.header__padding--left {
    margin-left: 150px;
}
.header__padding--right {
    margin-right: 150px;
}
.searchBar__container {
    width: 350px;
}
.header--rainbow {
  position: absolute;
  width: 100%;
  bottom: -4px;
  height: 4px;
  margin-left: -16px;
  background-image: linear-gradient(to right, #894b9d, #eb8023, #c2b819, #49ba6f, #2581bc);
}
.social__router {
    text-decoration: none;
}
.header__toolbar {
    position: fixed;
    width: 100%;
    z-index: 1;
}
</style>