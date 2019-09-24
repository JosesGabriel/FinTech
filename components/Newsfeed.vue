<template>
    <v-col class="pa-0">
        <v-card class="mt-3 centerPanel__card" color="#142b46" dark outlined v-for="n in 4" :key="n">
            <v-list-item>
            <v-list-item-avatar class="mr-2">
                <v-img 
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="body-2"><strong>Ralph Tolipas</strong></v-list-item-title>
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