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
            @click="overlay = !overlay"
            ></v-img>
            <v-list-item-content>
                <span>Post ID: {{id}}</span>
                <span>User ID: {{user_id}}</span>
                <span>Post Content: {{content}}</span>
                <span>API Response: {{message}}</span>
            </v-list-item-content>
            <v-overlay :absolute="absolute" :opacity="opacity" :value="overlay" :z-index="zIndex">
                <v-container>
                    <v-row>
                        <v-col xs="12" sm="12" md="8" lg="8" style="background: #142b46">
                            <v-img
                            src="https://storage.arbitrage.ph/dev/2018/10/mainhero-1024x682.jpg"
                            lazy-src="https://storage.arbitrage.ph/dev/2018/10/mainhero-1024x682.jpg"
                            height="350"
                            @click="overlay = false"
                            ></v-img>
                        </v-col>
                        <v-col xs="12" sm="12" md="4" lg="4" class="py-0" style="background: #142b46">
                            <v-list-item class="px-0">
                                <v-list-item-avatar class="mr-2">
                                    <v-img 
                                    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="body-2 ma-0"><strong>Ralph Tolipas</strong></v-list-item-title>
                                    <v-list-item-subtitle class="caption">5 hours ago</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item class="pa-0">
                                <v-list-item-content class="font-weight-thin caption py-0">
                                    <span>Post ID: {{id}}</span>
                                    <span>User ID: {{user_id}}</span>
                                    <span>Post Content: {{content}}</span>
                                    <span>API Response: {{message}}</span>
                                </v-list-item-content>
                            </v-list-item>
                            <v-card-actions class="px-0">
                                <v-btn v-on:click="bullcounter()" :class="{ active: bullactive }" class="bull__button" v-bind:id="id" icon outlined fab x-small color="green">
                                    <v-icon>mdi-cow</v-icon>
                                </v-btn>
                                <span class="px-2">{{ bull }}</span>
                                <v-btn v-on:click="bearcounter()" v-bind:class="{ active: bearactive }" class="bear__button" v-bind:id="id" icon outlined fab x-small color="red">
                                    <v-icon>mdi-paw</v-icon>
                                </v-btn>
                                <span class="px-2">{{ bear }}</span>
                                <span class="px-2"></span>
                            </v-card-actions>
                            <v-card-actions class="pa-0">
                                <v-list-item-avatar class="mr-2">
                                    <v-img 
                                    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-text-field
                                    label="Write a comment..."
                                >
                                </v-text-field>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-container>
            </v-overlay>
            <v-card-actions>
            <v-btn v-on:click="bullcounter()" :class="{ active: bullactive }" class="bull__button" v-bind:id="id" icon outlined fab x-small color="green">
                <v-icon>mdi-cow</v-icon>
            </v-btn>
            <span class="px-2">{{ bull }}</span>
            <v-btn v-on:click="bearcounter()" v-bind:class="{ active: bearactive }" class="bear__button" v-bind:id="id" icon outlined fab x-small color="red">
                <v-icon>mdi-paw</v-icon>
            </v-btn>
            <span class="px-2">{{ bear }}</span>
            <span class="px-2"></span>
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
          bull: 0,
          bear: 0,
          bullactive: false,
          bearactive: false,
          id: null,
          user_id: null,
          content: null,
          message: null,
          sintementID: null,
        absolute: false,
        opacity: 0.46,
        overlay: false,
        zIndex: 1,
      }
  },
  methods: {
    if (bullactive = true) {
    this.sintementID = this.id
    axios
        .post(`https://dev-api.arbitrage.ph/api/social/posts/${this.sentimentID}/unbull`, {
            user_id: '76f0f772-0de8-47cb-944e-c903d810a7ca',
        })
        .then((response) => {
            this.bull = 0
            console.log(response)
        })
    },
    bullcounter: function (event) {
    this.sintementID = this.id
    this.bullactive = true
    this.bearactive = false
    axios
        .post(`https://dev-api.arbitrage.ph/api/social/posts/${this.sintementID}/bull`, {
            user_id: '76f0f772-0de8-47cb-944e-c903d810a7ca',
        })
        .then((response) => {
            this.bull = 1
            this.bear = 0
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        })
    },
    if (bearactive = true) {
    this.sintementID = this.id
    axios
        .post(`https://dev-api.arbitrage.ph/api/social/posts/${this.sintementID}/unbear`, {
            user_id: '76f0f772-0de8-47cb-944e-c903d810a7ca',
        })
        .then((response) => {
            this.bear = 0
            console.log(response)
        })
    },
    bearcounter: function (event) {
    this.sintementID = this.id
    this.bearactive = true
    this.bullactive = false
    axios
        .post(`https://dev-api.arbitrage.ph/api/social/posts/${this.sintementID}/bear`, {
            user_id: '76f0f772-0de8-47cb-944e-c903d810a7ca',
        })
        .then((response) => {
            this.bear = 1
            this.bull = 0
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
  },    
  mounted() {
    axios
        .get('https://dev-api.arbitrage.ph/api/social/posts/34711650032553984')
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