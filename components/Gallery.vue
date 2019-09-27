<template>
    <v-card dark>
        <v-list color="#142a46">
        <v-list-item class="info__title">
            <v-list-item-icon class="my-2 mr-2">
                <v-icon color="#dc8607">mdi-image-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="py-1">
                <v-list-item-title>Gallery</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-container fluid class="py-0">
            <v-row class="px-2">
                <v-col v-for="n in 6" :key="n" class="d-flex child-flex pa-1" cols="4">
                    <v-card flat tile class="d-flex">
                        <v-img
                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                        aspect-ratio="1"
                        class="grey lighten-2"
                        >
                        <template v-slot:placeholder>
                            <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                            >
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                        </v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        </v-list>
    </v-card>
</template>

<style scoped>
.info__title {
    min-height: auto;
}
</style>