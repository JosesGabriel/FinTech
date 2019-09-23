<template>
   <v-container>
        <div class="text-center">
            <logo/>
            <v-img src="/Arbitrage.png" class="arbitrage__logo" width="181px"></v-img>
        </div>
        <v-row class="center mt-3">
            <v-card class="mx-auto loginForm__card" width="400" elevation="24" dark raised>
                <form class="ma-5 loginForm" v-show="isOpen">
                    <v-text-field
                    prepend-inner-icon="mdi-at"
                    label="Email Address"
                    type="email"
                    required
                    outlined
                    shaped
                    dark
                    ></v-text-field>
                    <v-text-field
                    label="Password"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    required
                    outlined
                    dark
                    shaped
                    ></v-text-field>
                    <v-checkbox
                    label="Keep me signed in"
                    required
                    ></v-checkbox>

                    
                    <router-link to="/" class="login__router">
                        <v-btn color="primary" block rounded outlined>
                            login
                        </v-btn>
                    </router-link>
                </form>
                <form class="ma-5 signupForm" v-show="!isOpen">
                    <v-row>
                        <v-col cols="12" sm="6">
                        <v-text-field
                            label="First Name"
                            prepend-inner-icon="mdi-account"
                            required
                            dark
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                        <v-text-field
                            label="Last Name"
                            required
                            dark
                        ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field
                        label="Username or Trading Name"
                        prepend-inner-icon="mdi-account"
                        required
                        dark
                    ></v-text-field>
                    <v-text-field
                        label="Email"
                        prepend-inner-icon="mdi-at"
                        type="email"
                        required
                        dark
                    ></v-text-field>
                    <v-text-field
                        label="Password"
                        type="password"
                        prepend-inner-icon="mdi-lock"
                        required
                        dark
                    ></v-text-field>
                    <v-text-field
                        label="Confirm Password"
                        type="password"
                        prepend-inner-icon="mdi-lock"
                        required
                        dark
                    ></v-text-field>
                    <v-btn class="mb-3" color="primary" block outlined rounded>
                        Sign Up
                    </v-btn>
                    <v-btn class="mb-3" color="secondary" block outlined rounded>
                        Secondary
                    </v-btn>
                    <v-btn class="mb-3" color="success" block outlined rounded>
                        Success
                    </v-btn>
                    <v-btn class="mb-3" color="warning" block outlined rounded>
                        Warning
                    </v-btn>
                    <v-btn class="mb-3" color="error" block outlined rounded>
                        Error
                    </v-btn>
                    <v-btn class="mb-3" color="info" block outlined rounded>
                        Info
                    </v-btn>
                </form>
                <v-btn class="loginButton__toggle" fab absolute light @click="toggle()">
                    <v-icon>mdi-account-plus</v-icon>
                </v-btn>
            </v-card>
        </v-row>
    </v-container>
</template>
<style scoped>
    .loginForm__card {
        background-color: rgba(20, 44, 70, 0.69);
    }
    .arbitrage__logo {
        position: absolute;
        right: 612px;
        top: 54px;
    }
    .loginButton__toggle {
        position: absolute;
        bottom: -70px;
        left: 175px;
    }
    .button__toggleContainer {
        width: 100%;
        bottom: 0;
        text-align: center;
    }
    .login__router {
        text-decoration: none;
    }
</style>
<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  },
  data() {
      return {
          isOpen: true
      }
  },
  methods: {
    toggle: function(){
        this.isOpen = !this.isOpen
    }
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