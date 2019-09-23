<template>
    <v-col class="pa-0">
        <v-card class="pa-4" light outlined>
            <v-form>
                <v-textarea
                label="Hey Eazy, penny for your thoughts?"
                prepend-inner-icon="mdi-account"
                rows="3"
                row-height="25"
                ></v-textarea>
                <v-btn rounded outlined small color="#1e3554">
                    <v-icon left>mdi-image</v-icon> Photo
                </v-btn>
                <v-btn rounded outlined small right absolute color="#2481bc">
                    Post
                </v-btn>
            </v-form>
        </v-card>
        <v-card class="mt-3 centerPanel__card" light outlined v-for="n in 4" :key="n">
            <v-list-item>
            <v-list-item-avatar class="mr-2">
                <v-img 
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="body-2"><strong>Sven Mithreel</strong></v-list-item-title>
                <v-list-item-subtitle class="caption">5 hours ago</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>

            <v-img
            src="https://storage.arbitrage.ph/dev/2018/10/mainhero-1024x682.jpg"
            height="350"
            ></v-img>

            <v-card-actions>
            <v-btn icon outlined fab x-small color="green">
                <v-icon>mdi-cow</v-icon>
            </v-btn>
            <v-btn icon outlined fab x-small color="red">
                <v-icon>mdi-paw</v-icon>
            </v-btn>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-actions>
            <v-text-field
                outlined
                shaped
                label="Write a comment..."
                prepend-inner-icon="mdi-account"
                class="postComment__field"
            >
            </v-text-field>
            </v-card-actions>
        </v-card>
    </v-col>
</template>