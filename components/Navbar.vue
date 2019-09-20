<template>
        <v-card class="mb-3" light outlined>
        <v-card-text class="pt-0">
        <v-list>
            <v-list-item class="pa-0">
                <v-list-item-avatar class="mr-2">
                    <v-img src="test.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="caption"><strong>Eazy-E</strong></v-list-item-title>
                    <v-list-item-subtitle class="overline">@cruisindown</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav dense rounded class="px-0">
            <v-list-item-group>
                <v-list-item class="mb-0">
                    <v-list-item-icon class="mr-2">
                    <v-icon color="#dc8607">mdi-vector-square</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>Social Wall</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="mb-0">
                    <v-list-item-icon class="mr-2">
                    <v-icon color="#bfb538">mdi-chart-bar</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>Interactive Chart</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="mb-0">
                    <v-list-item-icon class="mr-2">
                    <v-icon color="#367e45">mdi-library-books</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>Trading Journal</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="mb-0">
                    <v-list-item-icon class="mr-2">
                    <v-icon color="#1a71b8">mdi-eye-plus-outline</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>Watchers & Alerts</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="mb-0">
                    <v-list-item-icon class="mr-2">
                    <v-icon color="#9126a7">mdi-gamepad</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>Games</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="mb-0">
                    <v-list-item-icon class="mr-2">
                    <v-icon color="#e01d61">mdi-alpha-v-circle-outline</v-icon>
                    </v-list-item-icon>

                <router-link to="/vyndue" class="navbar__links">
                    <v-list-item>
                        <v-list-item-icon><v-icon color="#e01d61">mdi-alpha-v-circle-outline</v-icon></v-list-item-icon>
                        <v-list-item-content><v-list-item-title>Vyndue</v-list-item-title></v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list-item-group>

            <v-list-item-group>
                <v-list-item-icon class="mx-0 my-2">
                    <v-list-item-title class="caption">Power Tools</v-list-item-title>
                </v-list-item-icon>
                <v-list-item class="mb-0">
                    <v-list-item-icon class="mr-2">
                    <v-icon color="#3283a6">mdi-calculator</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>Buy/Sell Calculators</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="mb-0">
                    <v-list-item-icon class="mr-2">
                    <v-icon color="#823289">mdi-page-layout-header-footer</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>VAR Calculator</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="mb-0">
                    <v-list-item-icon class="mr-2">
                    <v-icon color="#b81f78">mdi-tag-text-outline</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>Average Price Calculator</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="mb-0">
                    <v-list-item-icon class="mr-2">
                    <v-icon color="#b4be26">mdi-chart-areaspline</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>Multicharts</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        </v-card-text>
        </v-card>
</template>
<style scoped>
.navbarDrawer__card {
    background-color: #fbfcfe;
}
.navbar__card {
    position: fixed; 
}
.navbar__links {
    color: white;
    text-decoration: none;
}
</style>