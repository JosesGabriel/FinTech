<template>
  <v-card height="584px">
    <div class="headline font-weight-bold loginCard--intro">
      Forgot Password
    </div>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="10">
            <span
              >Enter the email address you use to sign in to Lyduz and we’ll
              send you a link to reset your password</span
            >
          </v-col>
        </v-row>
        <v-row class="pt-4">
          <v-col cols="12">
            <v-text-field label="Email Address"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <div class="loginButtons--wrapper">
      <v-btn
        class="mb-2 no-transform"
        block
        outlined
        rounded
        color="success"
        @click="login()"
      >
        Submit
      </v-btn>
      <v-btn
        class="mb-2 no-transform"
        block
        outlined
        rounded
        color="success"
        @click="$emit('stepper', 2)"
      >
        Back to Sign In
      </v-btn>
      <span class="text-center d-block caption w-100"
        >New to Lyduz?
        <a class="text-center success--text" @click="$emit('stepper', 3)"
          >Sign Up</a
        ></span
      >
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
