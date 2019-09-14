<template>
    <v-col cols="6">
        <v-card class="mr-3 pa-4" light color="rgba(238,238,238,0.15)">
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
        <v-card class="mr-3 mt-3 centerPanel__card" light color="rgba(238,238,238,0.15)" v-for="n in 4" :key="n">
            <v-list-item>
            <v-list-item-avatar class="mr-2">
                <v-img src="https://www.wweek.com/resizer/b-HUCDEnkqwBjq7-YgAUCWWeaJg=/1200x0/filters:quality(100)/s3.amazonaws.com/wapopartners.com/wweek-wp/wp-content/uploads/2016/08/23150411/IceCube_JohnGarrison.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="body-2">Ice Cube</v-list-item-title>
                <v-list-item-subtitle class="caption">5 hours ago</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>

            <v-img
            src="https://arbitrage.ph/wp-content/uploads/ultimatemember/12/stream_photo_f35dea505474fbd6320a67f0cc0bcdedd2f6b7c0.jpg"
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