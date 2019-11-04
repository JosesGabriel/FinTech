<template>
    <v-toolbar
        light
        color="#0c1f33"
        dark
        height="50"
        class="header__toolbar"
        >
        <div class="headerItems__wrapper">
            <router-link to="/">
                <img src="logo.png" alt="" width="45" height="45">
            </router-link>
            <div class="searchBar__container hidden-md-only">
                <v-text-field
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    class="header__searchbar ml-3 headline"
                    outlined
                    rounded
                    solo
                    flat
                    background-color="transparent"
                ></v-text-field>
            </div>
            <v-spacer></v-spacer>
            <v-toolbar-items class="mb-3">
                <router-link to="/" class="social__router mr-7">
                    <v-btn icon>
                        <v-icon>mdi-apps</v-icon>
                        <span class="header__btn--label">Power Tools</span>
                    </v-btn>
                </router-link>
                <router-link to="/" class="social__router">
                    <v-btn icon>
                        <v-icon>mdi-bell</v-icon>
                        <span class="header__btn--label">Notifications</span>
                    </v-btn>
                </router-link>
                <router-link to="/login" class="social__router mx-3">
                    <v-btn icon>
                        <v-icon>mdi-scatter-plot</v-icon>
                        <span class="header__btn--label">Vyndue</span>
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
    </v-toolbar>
</template>
<style scoped>
.header__searchbar {
    margin-top: 17px !important;
    transform: scale(0.6);
    transform-origin: left;
}
.header__padding--left {
    margin-left: 150px;
}
.header__padding--right {
    margin-right: 150px;
}
/* .searchBar__container {
    width: 350px;
} */
.social__router {
    text-decoration: none;
}
.header__toolbar {
    position: fixed;
    width: 100%;
    z-index: 100;
}
.headerItems__wrapper {
    display: flex;
    align-items: center;
    height: 48px;
    z-index: 0;
    width: 100%;
    margin: 0 auto;
    max-width: 1023px;
}
.headerItems__wrapper--margin-left {
    margin-left: 19vw;
}
.header__btn--label {
    position: absolute;
    top: 25px;
    font-size: 0.6em;
}
</style>