
<template>
  <v-dialog v-model="show" max-width="450px">
    <v-card :dark="lightSwitch == true">
      <v-card-title class="text-center justify-center px-5 pt-10">
        <h1 class="font-weight-regular body-1">
          This action is final and cannot be undone.
          <br />Give me
          <span class="success--text font-weight-bold">HELL YEAH</span> to confirm.
        </h1>
      </v-card-title>
      <v-card color="transparent" class="d-flex justify-center" elevation="0"></v-card>
      <v-container class="pb-0">
        <v-row>
          <v-col class="px-8 pb-0" cols="12" sm="12" md="12">
            <v-text-field
              label="Solo"
              placeholder="HELL YEAH"
              v-model="confirmResetModel"
              solo
              :dark="lightSwitch == true"
              class="align-center justify-center headline font-weight-regular text-center confirmation_message-reset"
              :background-color="cardbackground"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-col class="pa-0 pt-3" cols="12" sm="12" md="12">
        <v-row no-gutters>
          <v-col class="pa-0" cols="5" sm="5" md="5" @click.stop="show=false">
            <v-card-title class="text-center justify-center px-5 py-3 confirmation_button-reset-ok">
              <h1 class="font-weight-regular body-1" style="color:#00080E;">I THINK NOT</h1>
            </v-card-title>
          </v-col>
          <v-col class="pa-0" cols="7" sm="7" md="7">
            <v-btn
              @click.stop="show=false"
              @click="resetNow"
              :disabled="disableReset"
              class="pa-0"
              style="height: 100%;width: 100%;"
            >
              <v-card-title
                class="text-center justify-center px-5 py-3"
                :class="cardbackgroundBtn"
                style="width: 100%;"
              >
                <h1 class="font-weight-regular body-1 success--text">I UNDERSTAND, DO IT</h1>
              </v-card-title>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["visible"],
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
          this.confirmResetModel = "";
        }
      }
    },
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * returns string hexcode background color based on theme mode
     *
     * @return  {string}  returns string
     */
    cardbackground() {
      return this.lightSwitch == 0 ? "#DADADA" : "#0C1A2B";
    },
    /**
     * returns string hexcode button background color based on theme mode
     *
     * @return  {string}  returns string
     */
    cardbackgroundBtn() {
      return this.lightSwitch == 0
        ? "confirmation_button-reset-not-light"
        : "confirmation_button-reset-not";
    }
  },
  data() {
    return {
      confirmResetModel: "",
      disableReset: true
    };
  },
  watch: {
    /**
     * works on validation, confirmation word "HELL YEAH"
     *
     * @return  returns property true or false to disable or enable button reset
     */
    confirmResetModel() {
      let confirmChecked = this.confirmResetModel.toUpperCase();
      if (confirmChecked === "HELL YEAH") {
        this.disableReset = false;
      } else {
        this.disableReset = true;
      }
    }
  },
  methods: {
    ...mapActions({
      setRenderPortfolioKey: "journal/setRenderPortfolioKey",
      setDefaultPortfolioId: "journal/setDefaultPortfolioId"
    }),
    /**
     * resetNow function
     *
     * @return  {object}  returns confirmation reset info
     */
    resetNow() {
      if (
        this.confirmResetModel == "HELL YEAH" ||
        this.defaultPortfolioId != null
      ) {
        let portfolio_id = this.defaultPortfolioId;
        this.$api.journal.portfolio.reset(portfolio_id).then(response => {
          if (response.success) {
            this.keyCreateCounter = this.renderPortfolioKey;
            this.keyCreateCounter++;
            this.setRenderPortfolioKey(this.keyCreateCounter);
          }
        });
      }
    }
  }
};
</script>
<style>
.confirmation_message-reset input {
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.confirmation_button-reset-ok {
  background: #00ffc3;
}
.confirmation_button-reset-not {
  background: #00080e;
}
.confirmation_button-reset-ok:hover {
  background: #00ffc3;
  cursor: pointer;
}
.confirmation_button-reset-not:hover {
  background: #00ffc3;
  cursor: pointer;
}
.confirmation_button-reset-ok:hover h1,
.confirmation_button-reset-not:hover h1 {
  color: #00080e !important;
}
</style>