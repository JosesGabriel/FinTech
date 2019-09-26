<template>
    <v-col class="pa-0">
        <v-card class="centerPanel__card mb-3" color="#142b46" dark outlined v-for="n in 4" :key="n">
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
            <v-list-item-content>
                <span>Post ID: {{id}}</span>
                <span>User ID: {{user_id}}</span>
                <span>Post Content: {{content}}</span>
                <span>API Response: {{message}}</span>
            </v-list-item-content>
            <v-card-actions>
            <v-btn v-on:click="bullcounter()" v-bind:class="{ active: bullcounterac }" icon outlined fab x-small color="green">
                <v-icon>mdi-cow</v-icon>
            </v-btn>
            <span class="px-2">{{ bull }}</span>
            <v-btn v-on:click="bearcounter()" v-bind:class="{ active: bearcounterac }" icon outlined fab x-small color="red">
                <v-icon>mdi-paw</v-icon>
            </v-btn>
            <span class="px-2">{{ bear }}</span>
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
          bullcounterac: false,
          bearcounterac: false,
          bull: 0,
          bear: 0,
          id: null,
          user_id: null,
          content: null,
          message: null
      }
  },
  methods: {
      bullcounter: function(){
        this.bull = 1
        this.bear = 0
        this.bearcounterac = false
        
    },
      bearcounter: function(){
        this.bear = 1
        this.bull = 0
        this.bearcounterac = true
        this.bullcounterac = false
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