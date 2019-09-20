<template>
    <v-toolbar
        light
        color="#fcfbfe"
        dense
        class="header__toolbar"
        >
        <div class="headerItems__wrapper" :class="{'headerItems__wrapper--margin-left' : !$vuetify.breakpoint.xsOnly}">
            <img src="logo.png" alt="" width="45" height="45">
            <v-divider vertical inset class="mx-2"></v-divider>
            <v-toolbar-title class="hidden-xs-only">Arbitrage</v-toolbar-title>
            <!-- <div class="searchBar__container hidden-md-only">
                <v-text-field
                    label="Search"
                    type="email"
                    prepend-inner-icon="mdi-magnify"
                    class="header__searchbar ml-3"
                    shaped
                    outlined
                ></v-text-field>
            </div> -->
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
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
                <v-avatar size="38" class="pt-3">
                <img
                alt="Avatar"
                src="test.jpg"
                >
                <v-icon
                ></v-icon>
                </v-avatar>
            </v-toolbar-items>
        </div>
        <!-- <div class="header--rainbow px-0"></div> -->
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
.headerItems__wrapper {
    display: flex;
    align-items: center;
    height: 48px;
    z-index: 0;
    width: 100%;
    /* margin-left: 19vw; */
    /* margin-right: 11vw; */
}
.headerItems__wrapper--margin-left {
    margin-left: 19vw;
}
</style>