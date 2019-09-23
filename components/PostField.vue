<template>
    <v-card class="pa-4" color="#142a46" dark outlined>
        <v-form>
            <v-textarea
            label="Hey Eazy, penny for your thoughts?"
            prepend-inner-icon="mdi-account"
            rows="3"
            row-height="25"
            ></v-textarea>
            <v-btn rounded outlined small dark>
                <v-icon color="yellow" left>mdi-image</v-icon> Photo
            </v-btn>
            <v-btn rounded outlined small right absolute color="#2481bc">
                Post
            </v-btn>
        </v-form>
    </v-card>
</template>