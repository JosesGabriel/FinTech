<template>
    <v-toolbar
        light
        color="#00121E"
        dark
        height="54"
        class="header__toolbar"
        style="border-bottom: 1px solid #000"
        elevation="0"
        >
        <div class="headerItems__wrapper">
            <router-link to="/">
                <img src="logo.png" alt="" width="45" height="45">
            </router-link>
            
            <v-spacer></v-spacer>
            <transition name="fade">
                <div class="searchBar__container hidden-md-only" v-if="!searchButtonIsVisible">
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
            </transition>
            <v-toolbar-items class="my-3">
                <transition name="slide-fade">
                    <router-link to="/" class="social__router" v-if="searchButtonIsVisible">
                        <v-btn icon @click="toggleSearch()" ref="header__searchButton"> 
                            <img src="/icon/header-icons/search.svg" width="20">
                        </v-btn>
                    </router-link>

                </transition>
                <router-link to="/" class="social__router">
                    <v-btn icon> 
                        <img src="/icon/header-icons/powertools.svg" width="20">
                    </v-btn>
                </router-link>
                <router-link to="/" class="social__router">
                    <v-btn icon>
                        <img src="/icon/header-icons/notif.svg" width="20">
                    </v-btn>
                </router-link>
                <router-link to="/login" class="social__router">
                    <v-btn icon>
                        <img src="/icon/header-icons/vyndue.svg" width="20">
                    </v-btn>
                </router-link>
                <v-avatar size="38" class="pt-3">
                <img
                alt="Avatar"
                src="test.jpg"
                width="100%"
                >
                <v-icon
                ></v-icon>
                </v-avatar>
            </v-toolbar-items>
        </div>
    </v-toolbar>
</template>
<style scoped>
.fade-enter-active,.fade-leave-active {
  transition: opacity .4s
}
.fade-enter,.fade-leave-active {
  opacity: 0
}
.slide-fade-enter, .slide-fade-leave-to{
   transform: translateX(10px);
    opacity: 0;
 }
.header__searchbar {
    margin-top: 17px !important;
    transform: scale(0.6);
    transform-origin: right;
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
    /* max-width: 1023px; */
}
.headerItems__wrapper--margin-left {
    margin-left: 19vw;
}
.header__btn--label {
    position: absolute;
    top: 30px;
    font-size: 0.6em;
}
</style>
<script>
export default {
    data() {
        return {
            searchButtonIsVisible: true
        }
    },
    methods: {
        toggleSearch() {
            this.searchButtonIsVisible ? this.searchButtonIsVisible = false : this.searchButtonIsVisible = true
        }
    }
}
</script>