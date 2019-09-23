<template>
    <v-card>
        <v-container fluid class="py-0">
            <v-row align="center" justify="center">
                <v-col
                class="d-flex child-flex pa-0"
                cols="12"
                >
                    <v-card flat tile class="d-flex">
                        <v-img
                        :src="`https://picsum.photos/id/1011/5472/3648`"
                        :lazy-src="`https://picsum.photos/id/1011/5472/3648`"
                        aspect-ratio="1"
                        class="grey lighten-2"
                        max-height="300px"
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
    </v-card>
</template>