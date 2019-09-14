<template>
    <v-card color="rgba(238, 238, 238, 0.15)" class="mb-3" light>
        <v-card-text>
            <div class="body-2">Trending Stocks</div>
            <v-divider></v-divider>
            <v-list class="mt-1 trendingstocks__list">
                <v-list-item class="px-0">
                    <v-btn outlined fab small color="#d84038" class="mr-3">JFC</v-btn>
                    <v-list-item-content>
                        <v-list-item-title class="caption"><strong>Jollibee Foods Corporation</strong></v-list-item-title>
                        <v-list-item-subtitle class="overline">13 Hits</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="px-0">
                    <v-btn outlined fab small color="#902457" class="mr-3">NIKL</v-btn>
                    <v-list-item-content>
                        <v-list-item-title class="caption"><strong>Nickel Asia Corporation</strong></v-list-item-title>
                        <v-list-item-subtitle class="overline">9 Hits</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="px-0">
                    <v-btn outlined fab small color="#732990" class="mr-3">IRC</v-btn>
                    <v-list-item-content>
                        <v-list-item-title class="caption"><strong>Philippine Infradev Housing</strong></v-list-item-title>
                        <v-list-item-subtitle class="overline">7 Hits</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="px-0">
                    <v-btn outlined fab small color="#35489b" class="mr-3">VUL</v-btn>
                    <v-list-item-content>
                        <v-list-item-title class="caption"><strong>Vulcan Industrial & Mining</strong></v-list-item-title>
                        <v-list-item-subtitle class="overline">3 Hits</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>
<style scoped>
    .trendingstocks__list {
        background-color: transparent;
    }
</style>