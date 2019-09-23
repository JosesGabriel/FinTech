<template>
    <v-col xs="12" sm="10" md="6" lg="6">
        <v-card class="pa-4" dark outlined color="#142b46">
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
        <v-card class="mt-3 centerPanel__card" color="#142b46" dark outlined v-for="n in 4" :key="n">
            <v-list-item>
            <v-list-item-avatar class="mr-2">
                <v-img src="https://akns-images.eonline.com/eol_images/Entire_Site/201809/rs_600x600-180109101713-600.Margot-Robbie-Elle-Magazine-Kf.1918.png?fit=inside|900:auto&output-quality=90"></v-img>
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
            <v-list-item-content>
                <span>Post ID: {{id}}</span>
                <span>User ID: {{user_id}}</span>
                <span>Post Content: {{content}}</span>
                <span>API Response: {{message}}</span>
            </v-list-item-content>
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
                label="Write a comment..."
                prepend-inner-icon="mdi-account"
                class="postComment__field"
            >
            </v-text-field>
            </v-card-actions>
        </v-card>
    </v-col>
</template>
<script>
import axios from '~/node_modules/axios'
export default {
  data() {
      return {
          id: null,
          user_id: null,
          content: null,
          message: null

      }
  },
  mounted() {
    axios
      .get('https://dev-api.arbitrage.ph/api/social/posts/33937358302875648')
      .then(response => (
          this.id = response.data.data.post.id,
          this.user_id = response.data.data.post.user_id,
          this.content = response.data.data.post.content,
          this.message = response.data.message
        ))
  },
  head () {
    return {
      title: 'Arbitrage',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>