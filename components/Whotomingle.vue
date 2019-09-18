<template>
    <v-card class="mb-3" light outlined>
        <v-card-text>
            <div class="body-2 text--white">Who To Mingle</div>
            <v-divider ></v-divider>
            <v-list class="whotomingle__list">
                <v-list-item class="px-0">
                    <v-list-item-avatar class="mr-2">
                        <v-img src="https://m.media-amazon.com/images/M/MV5BMjE2OTUwNTk4NF5BMl5BanBnXkFtZTcwMjMwOTk0NA@@._V1_UX214_CR0,0,214,317_AL_.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="caption"><strong>Snoop Dogg</strong></v-list-item-title>
                        <v-list-item-subtitle>
                            <v-btn outlined x-small rounded color="#e77e24">
                                <v-icon left>mdi-account</v-icon> Mingle
                            </v-btn>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="px-0">
                    <v-list-item-avatar class="mr-2">
                        <v-img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/04/20/10/tupac.jpg?w968h681"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="caption"><strong>2Pac</strong></v-list-item-title>
                        <v-list-item-subtitle>
                            <v-btn outlined x-small rounded color="#e77e24">
                                <v-icon left>mdi-account</v-icon> Mingle
                            </v-btn>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="px-0">
                    <v-list-item-avatar class="mr-2">
                        <v-img src="http://www.brooklynvegan.com/files/2019/05/notoriousbig.jpg?zc=1&s=0&a=t&q=89&w=630"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="caption"><strong>Biggie Smalls</strong></v-list-item-title>
                        <v-list-item-subtitle>
                            <v-btn outlined x-small rounded color="#e77e24">
                                <v-icon left>mdi-account</v-icon> Mingle
                            </v-btn>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <router-link to="/login" class="whoToMingle__link--viewMembers caption">
                    View All Members
                </router-link>
            </v-list>
        </v-card-text>
    </v-card>
</template>
<style scoped>
    .whotomingle__list {
        background-color: transparent;
    }
    .whoToMingle__link--viewMembers {
        text-decoration: none;
    }
</style>