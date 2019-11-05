<template>
    <v-card class="navbar__card" flat color="#0c1f33">
        <v-list nav dense rounded color="transparent" class="px-0">
            <v-list-item-group>
                <router-link to="/user">
                    <v-list-item-avatar>
                        <v-img src="test.jpg"></v-img>
                    </v-list-item-avatar>
                </router-link>
                <router-link to="/" class="navbar__links">
                    <v-list-item>
                        <v-list-item-icon class="mr-4"><v-icon color="#dc8607">mdi-vector-square</v-icon></v-list-item-icon>
                    </v-list-item>
                </router-link>
                <router-link to="/chart" class="navbar__links">
                    <v-list-item>
                        <v-list-item-icon class="mr-4"><v-icon color="#bfb538">mdi-chart-bar</v-icon></v-list-item-icon>
                    </v-list-item>
                </router-link>
                <router-link to="/journal" class="navbar__links">
                    <v-list-item>
                        <v-list-item-icon class="mr-4"><v-icon color="#367e45">mdi-library-books</v-icon></v-list-item-icon>
                    </v-list-item>
                </router-link>

                <router-link to="/watchlist" class="navbar__links">
                    <v-list-item>
                        <v-list-item-icon class="mr-4"><v-icon color="#1a71b8">mdi-eye-plus-outline</v-icon></v-list-item-icon>
                    </v-list-item>
                </router-link>
                <router-link to="/game" class="navbar__links">
                    <v-list-item>
                        <v-list-item-icon class="mr-4"><v-icon color="#9126a7">mdi-gamepad</v-icon></v-list-item-icon>
                    </v-list-item>
                </router-link>

                <router-link to="/vyndue" class="navbar__links">
                    <v-list-item>
                        <v-list-item-icon class="mr-4"><v-icon color="#e01d61">mdi-alpha-v-circle-outline</v-icon></v-list-item-icon>
                    </v-list-item>
                </router-link>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>
<style scoped>
.navbarDrawer__card {
    /* background-color: #fbfcfe; */
}
.navbar__card {
    position: fixed;
}
.navbar__links {
    color: white;
    text-decoration: none;
}
</style>
