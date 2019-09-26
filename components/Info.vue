<template>
    <v-card class="mb-4" dark>
        <v-list color="#142a46">
            <v-list-item class="info__title">
                <v-list-item-icon class="my-2 mr-2">
                    <v-icon color="primary">mdi-information-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="py-1">
                    <v-list-item-title>Info</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content class="py-0 px-0">
                    <v-list-item-title class="caption pb-1 ma-0">
                        Lives in <strong>Davao City</strong>
                    </v-list-item-title>
                    <v-list-item-title class="caption pb-1 ma-0">
                        From <strong>Tugbok, Davao City, Philippines</strong>
                    </v-list-item-title>
                    <v-list-item-title class="caption pb-1 ma-0">
                        Works at <strong>Arbitrage Philippines</strong>
                    </v-list-item-title>
                    <v-list-item-title class="caption pb-1 ma-0">
                        Followed by <strong>152 people</strong>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-btn rounded outlined small color="primary">
                        Edit Details
                    </v-btn>
                </v-list-item-content>
            </v-list-item>
            <v-divider :inset="inset"></v-divider>
            <v-list-item>
                <v-list-item-content class="pb-0 pt-3 px-2">
                    <v-text class="caption text-center">Add a short bio to tell people more about yourself.</v-text>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-btn rounded outlined small color="primary">
                        Edit Bio
                    </v-btn>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>
<style scoped>
.info__title {
    min-height: auto;
}
</style>